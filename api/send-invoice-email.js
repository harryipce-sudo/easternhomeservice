const { getSupabaseConfig, supabaseFetch, allInvoiceRows } = require("./_invoice-import-utils");

const MAX_ATTACHMENT_BYTES = 10 * 1024 * 1024;
const MAX_RECIPIENTS = 20;
const MAX_PHOTO_BYTES = 3 * 1024 * 1024;

async function readJsonBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

function getEmailConfig() {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const replyTo = process.env.RESEND_REPLY_TO || "";
  return apiKey && from ? { apiKey, from, replyTo } : null;
}

function parseAddresses(value) {
  const entries = Array.isArray(value) ? value : String(value || "").split(/[;,\n]+/);
  const addresses = [...new Set(entries.map((entry) => String(entry || "").trim().toLowerCase()).filter(Boolean))];
  if (!addresses.length || addresses.length > MAX_RECIPIENTS || addresses.some((entry) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(entry))) {
    throw Object.assign(new Error("Enter valid email addresses."), { statusCode:400 });
  }
  return addresses;
}

function escapeHtml(value) {
  return String(value || "").replace(/[&<>\"']/g, (character) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" })[character]);
}

function displayDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(value || ""))) return "Not available";
  return new Date(`${value}T00:00:00`).toLocaleDateString("en-AU", { day:"numeric", month:"long", year:"numeric" });
}

function money(value) {
  return new Intl.NumberFormat("en-AU", { style:"currency", currency:"AUD" }).format(Number(value) || 0);
}

function safeFilename(value) {
  const base = String(value || "invoice").replace(/[^a-z0-9._-]+/gi, "-").replace(/^-+|-+$/g, "");
  return `${base || "invoice"}.pdf`;
}

function emailContent({ record, kind, message }) {
  const job = record.payload?.job || {};
  const invoice = job.invoice || {};
  const invoiceNumber = String(job.invoiceNumber || invoice.number || "Invoice");
  const amount = money(job.quote || invoice.total);
  const dueDate = displayDate(invoice.dueDate || "");
  const intro = kind === "reminder" ? `Invoice ${invoiceNumber} remains unpaid. Amount due: ${amount}. Due date: ${dueDate}.` : `Invoice ${invoiceNumber} is ready for your review. Amount due: ${amount}${dueDate !== "Not available" ? `. Due date: ${dueDate}.` : "."}`;
  const text = `${message.trim()}\n\n${intro}`.trim();
  return {
    invoiceNumber,
    text,
    html:`<div style="max-width:600px;margin:auto;font-family:Arial,sans-serif;color:#1d2b3a"><div style="padding:22px 26px;background:#07365c;color:#fff"><strong style="font-size:19px">Eastern Home Service</strong><br><span style="font-size:13px">Your Home Maintenance and Service Solution</span></div><div style="padding:26px"><h2 style="margin:0 0 14px">${kind === "reminder" ? "Payment reminder" : "Your invoice"}</h2><p style="font-size:16px;line-height:1.55">${escapeHtml(message.trim()).replace(/\n/g,"<br>")}</p><div style="margin:20px 0;padding:16px;border-left:4px solid #12804b;background:#f1f7f4"><strong>${escapeHtml(invoiceNumber)}</strong><br>${escapeHtml(intro)}</div><p style="color:#526277;font-size:13px">The invoice PDF is attached. Please reply to this email if you need any assistance.</p></div><div style="padding:14px 26px;background:#edf2f7;color:#526277;font-size:12px">Eastern Home Service</div></div>`
  };
}

function photoAttachments(value) {
  const photos = Array.isArray(value) ? value : [];
  if (photos.length > 8) throw Object.assign(new Error("Choose up to 8 evidence photos."), { statusCode:413 });
  let total = 0;
  return photos.map((photo, index) => { const content = String(photo?.content || ""); const bytes = Buffer.from(content, "base64"); const type = String(photo?.type || ""); if (!content || !["image/jpeg","image/png","image/webp"].includes(type) || !bytes.length) throw Object.assign(new Error("Evidence photos must be JPG, PNG or WebP."), { statusCode:400 }); total += bytes.length; if (total > MAX_PHOTO_BYTES) throw Object.assign(new Error("Evidence photos must be 3 MB total or less."), { statusCode:413 }); return { filename:String(photo?.filename || `evidence-${index + 1}.jpg`).replace(/[^a-z0-9._-]+/gi,"-"), content:bytes.toString("base64") }; });
}

async function updateEmailStatus(config, record, values) {
  const payload = record.payload && typeof record.payload === "object" ? record.payload : {};
  const job = payload.job && typeof payload.job === "object" ? payload.job : {};
  const invoice = job.invoice && typeof job.invoice === "object" ? job.invoice : {};
  const activity = Array.isArray(invoice.activity) ? invoice.activity : [];
  const event = values.status === "sent" ? `${values.kind === "reminder" ? "Payment reminder" : "Invoice email"} sent to ${(values.recipient || []).join(", ")}${values.photoCount ? ` with ${values.photoCount} evidence photo(s)` : ""}.` : "Invoice email sending failed.";
  const nextPayload = { ...payload, job:{ ...job, invoice:{ ...invoice, email:{ ...(invoice.email || {}), ...values }, activity:[...activity, { at:new Date().toISOString(), type:"email", message:event }].slice(-100) } } };
  const response = await supabaseFetch(config, `/rest/v1/quote_records?id=eq.${encodeURIComponent(record.id)}`, {
    method:"PATCH",
    headers:{ "Content-Type":"application/json", Prefer:"return=representation" },
    body:JSON.stringify({ payload:nextPayload })
  });
  if (!response.ok) throw new Error("The email was sent, but its tracker status could not be saved.");
  const rows = await response.json();
  return rows[0] || { ...record, payload:nextPayload };
}

async function loadPdf(config, source, invoiceNumber) {
  const bucket = String(source.bucket || "invoice-documents");
  const path = String(source.path || "").split("/").map(encodeURIComponent).join("/");
  if (!path) throw Object.assign(new Error("This invoice does not have a stored PDF. Import the Odoo PDF before emailing it."), { statusCode:422 });
  const response = await supabaseFetch(config, `/storage/v1/object/${encodeURIComponent(bucket)}/${path}`);
  if (!response.ok) throw new Error("Unable to load the private invoice PDF.");
  const bytes = Buffer.from(await response.arrayBuffer());
  if (!bytes.length || bytes.length > MAX_ATTACHMENT_BYTES) {
    throw Object.assign(new Error("The invoice PDF is too large to attach by email."), { statusCode:413 });
  }
  return { filename:safeFilename(invoiceNumber), content:bytes.toString("base64") };
}

async function sendWithResend(config, payload) {
  const response = await fetch("https://api.resend.com/emails", {
    method:"POST",
    headers:{ Authorization:`Bearer ${config.apiKey}`, "Content-Type":"application/json" },
    body:JSON.stringify(payload)
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data?.message || "Resend could not send this invoice email.");
  return data;
}

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).json({ error:"Method not allowed." });
  const config = getSupabaseConfig();
  const emailConfig = getEmailConfig();
  if (!config) return res.status(503).json({ error:"Invoice email storage is not configured." });
  if (!emailConfig) return res.status(503).json({ error:"Invoice email is not configured yet. Add RESEND_API_KEY and RESEND_FROM_EMAIL in Vercel." });

  let record;
  let recipients = [];
  let cc = [];
  let kind = "invoice";
  try {
    const body = await readJsonBody(req);
    const recordId = String(body.recordId || "").trim();
    kind = body.kind === "reminder" ? "reminder" : "invoice";
    const subject = String(body.subject || "").trim().slice(0, 200);
    const message = String(body.message || "").trim().slice(0, 10000);
    if (!recordId || !subject || !message) return res.status(400).json({ error:"Recipient, subject and message are required." });
    recipients = parseAddresses(body.to);
    cc = String(body.cc || "").trim() ? parseAddresses(body.cc) : [];
    const rows = await allInvoiceRows(config);
    record = rows.find((row) => String(row.id) === recordId);
    if (!record || record?.payload?.job?.status !== "invoiced") return res.status(404).json({ error:"Invoice not found." });
    if (kind === "reminder" && record.payload.job.payment === "paid") return res.status(400).json({ error:"Reminders can only be sent for unpaid invoices." });

    const source = record.payload?.job?.invoice?.sourceDocument;
    const content = emailContent({ record, kind, message });
    const attachment = await loadPdf(config, source || {}, content.invoiceNumber);
    const photos = photoAttachments(body.photos);
    const resend = await sendWithResend(emailConfig, {
      from:emailConfig.from,
      to:recipients,
      cc:cc.length ? cc : undefined,
      reply_to:emailConfig.replyTo ? [emailConfig.replyTo] : undefined,
      subject,
      html:content.html,
      text:content.text,
      attachments:[attachment, ...photos]
    });
    const sentAt = new Date().toISOString();
    const updated = await updateEmailStatus(config, record, { status:"sent", sentAt, recipient:recipients, cc, kind, messageId:String(resend?.id || ""), photoCount:photos.length });
    return res.status(200).json({ ok:true, sentAt, record:{ id:updated.id, email:updated.payload?.job?.invoice?.email || {}, activity:updated.payload?.job?.invoice?.activity || [] } });
  } catch (error) {
    if (record) {
      try {
        await updateEmailStatus(config, record, { status:"failed", attemptedAt:new Date().toISOString(), recipient:recipients, cc, kind });
      } catch (_) {
        // The original error is more useful to the user than a status-write failure.
      }
    }
    const status = error?.statusCode || 500;
    return res.status(status).json({ error:error instanceof Error ? error.message : "Unable to send this invoice email." });
  }
};

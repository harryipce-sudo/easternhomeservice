const { getSupabaseConfig, supabaseFetch, allInvoiceRows } = require("./_invoice-import-utils");
const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

const MAX_ATTACHMENT_BYTES = 10 * 1024 * 1024;
const MAX_RECIPIENTS = 20;
const MAX_PHOTO_BYTES = 3 * 1024 * 1024;
const REQUIRED_INTERNAL_CC = "easternhomeservice@gmail.com";

// Kept with the active email handler so the deployed function always renders
// the same saved invoice lines that it emails.
function createEmailInvoicePdf(job = {}) {
  return new Promise((resolve, reject) => {
    const invoice = job.invoice || {};
    const number = String(job.invoiceNumber || invoice.number || "Invoice");
    const source = Array.isArray(invoice.lineItems) && invoice.lineItems.length
      ? invoice.lineItems
      : [{ description:invoice.description || job.detail || "Service", quantity:invoice.quantity || 1, unitPrice:invoice.unitPrice || 0 }];
    const lines = source.reduce((result, line) => {
      const description = String(line?.description || "").trim();
      if (description) result.push({ description, quantity:Math.max(0, Number(line?.quantity) || 0), unitPrice:Math.max(0, Number(line?.unitPrice) || 0) });
      return result;
    }, []);
    const subtotal = Number(invoice.subtotal ?? lines.reduce((sum, line) => sum + line.quantity * line.unitPrice, 0)) || 0;
    const gst = Number(invoice.gst ?? subtotal * 0.1) || 0;
    const total = Number(invoice.total ?? subtotal + gst) || 0;
    const moneyValue = (value) => new Intl.NumberFormat("en-AU", { style:"currency", currency:"AUD" }).format(Number(value) || 0);
    const displayDate = (value) => /^\d{4}-\d{2}-\d{2}$/.test(String(value || "")) ? new Date(`${value}T00:00:00`).toLocaleDateString("en-AU") : "—";
    const doc = new PDFDocument({ size:"A4", margin:0, info:{ Title:`Tax Invoice ${number}`, Author:"Eastern Home Service", Subject:"Email invoice detail lines v3" } });
    const chunks = [];
    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("error", reject);
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    const width = 595.28; const height = 841.89; const margin = 34; const tableWidth = width - margin * 2;
    const cols = { quantity:332, price:390, tax:462, amount:520 };
    const navy = "#073f78"; const ink = "#16263b"; const muted = "#5d6878";
    doc.fillColor(ink).font("Helvetica").fontSize(9).text("Melbourne VIC Australia", margin, 22);
    doc.font("Helvetica-Bold").text("ABN: 67651973711", margin, 36);
    const logo = path.join(process.cwd(), "assets", "eastern-home-service-logo-clean.png");
    if (fs.existsSync(logo)) doc.image(logo, width - margin - 102, 28, { fit:[102, 76] });
    doc.fillColor(navy).font("Helvetica").fontSize(25).text(`Tax Invoice ${number}`, margin, 166, { width:width - margin * 2, align:"center" });
    doc.fillColor(ink).font("Helvetica-Bold").fontSize(10).text(String(invoice.client || "Client"), margin, 202);
    doc.font("Helvetica").text(String(invoice.address || ""), margin, 218, { width:280, lineGap:2 });
    doc.fillColor("#96a69e").font("Helvetica-Bold").fontSize(9).text("Invoice Date", margin, 260);
    doc.fillColor(ink).fontSize(10).text(displayDate(invoice.date || job.invoiceDate), margin, 276);
    doc.strokeColor("#b7c7bf").lineWidth(1).moveTo(202, 253).lineTo(202, 303).stroke();
    doc.fillColor("#96a69e").font("Helvetica-Bold").fontSize(9).text("Due Date", 214, 260);
    doc.fillColor(ink).fontSize(10).text(displayDate(invoice.dueDate), 214, 276);
    let y = 326;
    doc.fillColor("#aebdb4").rect(margin, y, tableWidth, 30).fill();
    doc.fillColor("#172333").font("Helvetica").fontSize(8);
    doc.text("Description", margin + 5, y + 11, { width:cols.quantity - margin - 10 });
    [["Quantity", cols.quantity, 50], ["Unit Price", cols.price, 58], ["Taxes", cols.tax, 44], ["Amount", cols.amount, 38]].forEach(([label, x, w]) => doc.text(label, x, y + 11, { width:w, align:"right" }));
    y += 30;
    lines.forEach((line) => {
      doc.font("Helvetica-Bold").fontSize(9);
      const rowHeight = Math.max(32, doc.heightOfString(line.description, { width:cols.quantity - margin - 14, lineGap:2 }) + 16);
      // Keep enough table space for a priced service followed by its
      // description-only detail line. The previous cutoff silently dropped
      // the second row when both descriptions were several lines long.
      if (y + rowHeight > 570) return;
      doc.fillColor(ink).text(line.description, margin + 5, y + 10, { width:cols.quantity - margin - 14, lineGap:2 });
      if (line.quantity > 0 && line.unitPrice > 0) {
        doc.font("Helvetica").fontSize(10);
        doc.text(line.quantity.toFixed(line.quantity % 1 ? 2 : 0), cols.quantity, y + 11, { width:50, align:"right" });
        doc.text(moneyValue(line.unitPrice), cols.price, y + 11, { width:58, align:"right" });
        doc.text("10% GST", cols.tax, y + 11, { width:44, align:"right" });
        doc.text(moneyValue(line.quantity * line.unitPrice), cols.amount, y + 11, { width:38, align:"right" });
      }
      y += rowHeight; doc.strokeColor("#9ba8b6").lineWidth(0.6).moveTo(margin, y).lineTo(width - margin, y).stroke();
    });
    const termsY = Math.min(y + 18, 545); const totalsY = Math.max(termsY + 72, 505);
    doc.fillColor(ink).font("Helvetica").fontSize(9).text(`Payment terms: ${Number(invoice.termsDays) || 0} Days`, margin, termsY);
    [["Untaxed Amount", subtotal, 0], ["GST 10%", gst, 28]].forEach(([label, value, offset]) => { doc.font("Helvetica").fontSize(10).text(label, 404, totalsY + offset, { width:100 }); doc.font("Helvetica-Bold").text(moneyValue(value), 500, totalsY + offset, { width:61, align:"right" }); });
    doc.strokeColor(navy).lineWidth(1).moveTo(400, totalsY + 52).lineTo(561, totalsY + 52).stroke();
    doc.fillColor(navy).font("Helvetica-Bold").fontSize(12).text("Total", 404, totalsY + 63, { width:100 }); doc.text(moneyValue(total), 485, totalsY + 63, { width:76, align:"right" }); doc.strokeColor(navy).moveTo(400, totalsY + 84).lineTo(561, totalsY + 84).stroke();
    doc.fillColor(ink).font("Helvetica-Bold").fontSize(8).text(`Payment Communication: ${number}`, margin, 586);
    doc.text("Note:", margin, 616); doc.fillColor(muted).font("Helvetica").text(String(invoice.note || "Price includes labour and material costs. Not including rubbish disposal unless mentioned."), margin, 630, { width:360, lineGap:2 });
    doc.fillColor(ink).font("Helvetica-Bold").text("Bank Detail", margin, 677); doc.fillColor(muted).font("Helvetica").text("SWIFT: CTBAAU2S\nBank Name: Commonwealth Bank\nAccount Name: Eastern Group VIC\nBSB: 063 109\nAccount Number: 13349243 (AUD ONLY)\nBank Address: 28 Main Street, Box Hill, VIC 3128\n\"Please mark 'AUD only' on bank instruction.\"", margin, 691, { lineGap:3 });
    doc.fillColor(ink).font("Helvetica-Bold").text("Your Home Maintenance and Service Solution", margin, height - 45, { width:width - margin * 2, align:"right" }); doc.fillColor(muted).font("Helvetica").fontSize(7).text("Page 1 / 1", margin, height - 32, { width:width - margin * 2, align:"right" });
    doc.end();
  });
}

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
  const total = Math.max(0, Number(job.quote || invoice.total) || 0);
  const received = job.payment === "paid" ? total : Math.min(total, Math.max(0, Number(job.paymentAmount) || 0));
  const balance = Math.max(0, total - received);
  const amount = money(balance);
  const dueDate = displayDate(invoice.dueDate || "");
  const hasPartPayment = received > 0 && balance > 0;
  const intro = kind === "reminder"
    ? hasPartPayment
      ? `Invoice ${invoiceNumber} has received ${money(received)}. Remaining balance due: ${amount}. Due date: ${dueDate}.`
      : `Invoice ${invoiceNumber} remains unpaid. Amount due: ${amount}. Due date: ${dueDate}.`
    : hasPartPayment
      ? `Invoice ${invoiceNumber} has received ${money(received)}. Remaining balance: ${amount}${dueDate !== "Not available" ? `. Due date: ${dueDate}.` : "."}`
      : `Invoice ${invoiceNumber} is ready for your review. Amount due: ${amount}${dueDate !== "Not available" ? `. Due date: ${dueDate}.` : "."}`;
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
  const recipientDetails = [`To: ${(values.recipient || []).join(", ")}`, values.cc?.length ? `CC: ${values.cc.join(", ")}` : "", values.bcc?.length ? `BCC: ${values.bcc.join(", ")}` : ""].filter(Boolean).join(" · ");
  const event = values.status === "sent" ? `${values.kind === "reminder" ? "Payment reminder" : "Invoice email"} sent. ${recipientDetails}${values.photoCount ? ` · ${values.photoCount} evidence photo(s) attached` : ""}.` : "Invoice email sending failed.";
  const nextPayload = { ...payload, job:{ ...job, invoice:{ ...invoice, email:{ ...(invoice.email || {}), ...values }, activity:[...activity, { at:new Date().toISOString(), type:"email", message:event, recipient:values.recipient || [], cc:values.cc || [], bcc:values.bcc || [] }].slice(-100) } } };
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

async function generatedPdf(record, invoiceNumber) {
  const bytes = await createEmailInvoicePdf(record?.payload?.job || {});
  if (!bytes.length || bytes.length > MAX_ATTACHMENT_BYTES) {
    throw Object.assign(new Error("The generated invoice PDF is too large to attach by email."), { statusCode:413 });
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
  let bcc = [];
  let kind = "invoice";
  try {
    const body = await readJsonBody(req);
    const recordId = String(body.recordId || "").trim();
    kind = body.kind === "reminder" ? "reminder" : "invoice";
    const subject = String(body.subject || "").trim().slice(0, 200);
    const message = String(body.message || "").trim().slice(0, 10000);
    if (!recordId || !subject || !message) return res.status(400).json({ error:"Recipient, subject and message are required." });
    recipients = parseAddresses(body.to);
    cc = [...new Set([...(String(body.cc || "").trim() ? parseAddresses(body.cc) : []), REQUIRED_INTERNAL_CC])].filter((address) => !recipients.includes(address));
    bcc = String(body.bcc || "").trim() ? parseAddresses(body.bcc) : [];
    const rows = await allInvoiceRows(config);
    record = rows.find((row) => String(row.id) === recordId);
    if (!record || record?.payload?.job?.status !== "invoiced") return res.status(404).json({ error:"Invoice not found." });
    if (kind === "reminder" && record.payload.job.payment === "paid") return res.status(400).json({ error:"Reminders can only be sent for unpaid invoices." });

    const source = record.payload?.job?.invoice?.sourceDocument;
    const content = emailContent({ record, kind, message });
    const attachment = source?.path
      ? await loadPdf(config, source, content.invoiceNumber)
      : await generatedPdf(record, content.invoiceNumber);
    const photos = photoAttachments(body.photos);
    const resend = await sendWithResend(emailConfig, {
      from:emailConfig.from,
      to:recipients,
      cc:cc.length ? cc : undefined,
      bcc:bcc.length ? bcc : undefined,
      reply_to:emailConfig.replyTo ? [emailConfig.replyTo] : undefined,
      subject,
      html:content.html,
      text:content.text,
      attachments:[attachment, ...photos]
    });
    const sentAt = new Date().toISOString();
    const updated = await updateEmailStatus(config, record, { status:"sent", sentAt, recipient:recipients, cc, bcc, kind, messageId:String(resend?.id || ""), photoCount:photos.length });
    return res.status(200).json({ ok:true, sentAt, record:{ id:updated.id, email:updated.payload?.job?.invoice?.email || {}, activity:updated.payload?.job?.invoice?.activity || [] } });
  } catch (error) {
    if (record) {
      try {
        await updateEmailStatus(config, record, { status:"failed", attemptedAt:new Date().toISOString(), recipient:recipients, cc, bcc, kind });
      } catch (_) {
        // The original error is more useful to the user than a status-write failure.
      }
    }
    const status = error?.statusCode || 500;
    return res.status(status).json({ error:error instanceof Error ? error.message : "Unable to send this invoice email." });
  }
};

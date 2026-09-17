const crypto = require("crypto");

function getSupabaseConfig() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serverKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;
  if (!supabaseUrl || !serverKey) return null;
  const headers = { apikey: serverKey, "Content-Type": "application/json", Prefer: "return=representation" };
  if (!serverKey.startsWith("sb_secret_")) headers.Authorization = `Bearer ${serverKey}`;
  return { supabaseUrl, headers };
}

function hashAccessCode(value) {
  return crypto.createHash("sha256").update(String(value || "")).digest("hex");
}

function matchesAccessCode(actual, expected) {
  if (!actual || !expected || actual.length !== expected.length) return false;
  return crypto.timingSafeEqual(Buffer.from(actual), Buffer.from(expected));
}

async function readBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed." });

  const config = getSupabaseConfig();
  if (!config) return res.status(503).json({ error: "This invoice link is unavailable." });

  try {
    const body = await readBody(req);
    const accessCode = String(body.access || "");
    const invoiceNumber = String(body.invoiceNumber || "").trim();
    const paidDate = String(body.paidDate || "");
    const note = String(body.note || "").trim().slice(0, 1000);
    if (!accessCode || !invoiceNumber || !/^\d{4}-\d{2}-\d{2}$/.test(paidDate)) return res.status(400).json({ error: "Enter a valid paid date." });

    const recordsResponse = await fetch(`${config.supabaseUrl}/rest/v1/quote_records?select=*`, { headers: config.headers });
    if (!recordsResponse.ok) return res.status(recordsResponse.status).json({ error: "Unable to update this invoice." });
    const rows = await recordsResponse.json();
    const settings = rows.find((row) => row?.payload?.recordType === "tracker-board-settings");
    const token = (settings?.payload?.job?.clientPortalTokens || []).find((entry) => matchesAccessCode(hashAccessCode(accessCode), entry?.tokenHash));
    if (!settings?.id || !token?.clientName) return res.status(404).json({ error: "This invoice link is unavailable." });

    const invoice = rows.find((row) => row?.customer_name === token.clientName && row?.payload?.job?.invoiceNumber === invoiceNumber && row?.payload?.job?.status === "invoiced" && !row?.payload?.job?.archived);
    if (!invoice) return res.status(404).json({ error: "Invoice not found." });

    const existing = Array.isArray(settings.payload?.job?.clientPaymentConfirmations) ? settings.payload.job.clientPaymentConfirmations : [];
    const confirmation = { clientName: token.clientName, invoiceNumber, paidDate, note, confirmedAt: new Date().toISOString() };
    const confirmations = [...existing.filter((entry) => !(entry?.clientName === token.clientName && entry?.invoiceNumber === invoiceNumber)), confirmation];
    const payload = { ...settings.payload, job: { ...(settings.payload?.job || {}), clientPaymentConfirmations: confirmations } };
    const update = await fetch(`${config.supabaseUrl}/rest/v1/quote_records?id=eq.${encodeURIComponent(settings.id)}`, { method: "PATCH", headers: config.headers, body: JSON.stringify({ payload }) });
    if (!update.ok) return res.status(update.status).json({ error: "Unable to save the payment confirmation." });

    return res.status(200).json({ invoiceNumber, paidDate, note });
  } catch {
    return res.status(500).json({ error: "Unable to save the payment confirmation." });
  }
};

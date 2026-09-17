const crypto = require("crypto");

function getSupabaseConfig() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serverKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;
  if (!supabaseUrl || !serverKey) return null;
  const headers = { apikey: serverKey, "Content-Type": "application/json" };
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

function referralFee(job) {
  const invoiceAmount = Number(job.quote) || 0;
  const markupPercentage = Number(job.markup) || 0;
  const amountExGst = markupPercentage > 0
    ? invoiceAmount / 1.1 - (invoiceAmount / 1.1) / (1 + markupPercentage / 100)
    : 0;
  return Math.round((amountExGst * 1.1 + Number.EPSILON) * 100) / 100;
}

function normaliseInvoice(row) {
  const payload = row?.payload && typeof row.payload === "object" ? row.payload : {};
  const job = payload.job && typeof payload.job === "object" ? payload.job : {};
  return {
    invoiceNumber: job.invoiceNumber || "",
    invoiceDate: job.invoiceDate || "",
    payment: job.payment || "unpaid",
    detail: job.detail || "",
    amount: Number(job.quote) || Number(row.total_quote) || 0,
    referralFee: referralFee(job),
    address: row.address || ""
  };
}

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed." });

  const accessCode = String(req.query?.access || "");
  const config = getSupabaseConfig();
  if (!accessCode || !config) return res.status(404).json({ error: "This invoice link is unavailable." });

  try {
    const response = await fetch(`${config.supabaseUrl}/rest/v1/quote_records?select=*`, { headers: config.headers });
    if (!response.ok) return res.status(response.status).json({ error: "Unable to load invoices." });
    const rows = await response.json();
    const settings = rows.find((row) => row?.payload?.recordType === "tracker-board-settings");
    const token = (settings?.payload?.job?.clientPortalTokens || []).find((entry) => matchesAccessCode(hashAccessCode(accessCode), entry?.tokenHash));
    if (!token?.clientName) return res.status(404).json({ error: "This invoice link is unavailable." });

    const invoices = rows
      .filter((row) => row?.customer_name === token.clientName && !row?.payload?.job?.archived && row?.payload?.job?.status === "invoiced" && row?.payload?.job?.payment !== "paid")
      .map(normaliseInvoice)
      .sort((a, b) => String(b.invoiceDate).localeCompare(String(a.invoiceDate)) || String(b.invoiceNumber).localeCompare(String(a.invoiceNumber)));

    const totalAmount = invoices.reduce((sum, invoice) => sum + invoice.amount, 0);
    const totalReferralFee = invoices.reduce((sum, invoice) => sum + invoice.referralFee, 0);
    return res.status(200).json({ clientName: token.clientName, invoices, totalAmount, totalReferralFee });
  } catch {
    return res.status(500).json({ error: "Unable to load invoices." });
  }
};

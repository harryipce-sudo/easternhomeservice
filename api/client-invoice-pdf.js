const crypto = require("crypto");
const { getSupabaseConfig, supabaseFetch } = require("./_invoice-import-utils");
const { createInvoicePdf } = require("./_generated-invoice-pdf");

function hashAccessCode(value) {
  return crypto.createHash("sha256").update(String(value || "")).digest("hex");
}

function matchesAccessCode(actual, expected) {
  if (!actual || !expected || actual.length !== expected.length) return false;
  return crypto.timingSafeEqual(Buffer.from(actual), Buffer.from(expected));
}

function safeFilename(value) {
  const base = String(value || "invoice").replace(/[^a-z0-9._-]+/gi, "-").replace(/^-+|-+$/g, "");
  return `${base || "invoice"}.pdf`;
}

module.exports = async (req, res) => {
  if (req.method !== "GET") return res.status(405).json({ error:"Method not allowed." });
  const accessCode = String(req.query?.access || "");
  const invoiceNumber = String(req.query?.invoice || "").trim();
  const viewOnline = String(req.query?.view || "") === "1";
  const config = getSupabaseConfig();
  if (!accessCode || !invoiceNumber || !config) return res.status(404).json({ error:"This invoice is unavailable." });

  try {
    const response = await supabaseFetch(config, "/rest/v1/quote_records?select=*");
    if (!response.ok) throw new Error("Unable to load the invoice.");
    const rows = await response.json();
    const settings = rows.find((row) => row?.payload?.recordType === "tracker-board-settings");
    const token = (settings?.payload?.job?.clientPortalTokens || []).find((entry) => matchesAccessCode(hashAccessCode(accessCode), entry?.tokenHash));
    if (!token?.clientName) return res.status(404).json({ error:"This invoice is unavailable." });

    const record = rows.find((row) => row?.customer_name === token.clientName
      && String(row?.payload?.job?.invoiceNumber || "") === invoiceNumber
      && row?.payload?.job?.status === "invoiced"
      && !row?.payload?.job?.archived);
    if (!record) return res.status(404).json({ error:"This invoice is unavailable." });

    const job = record.payload?.job || {};
    const source = job.invoice?.sourceDocument;
    let pdf;
    if (source?.path) {
      const bucket = String(source.bucket || "invoice-documents");
      const sourcePath = String(source.path).split("/").map(encodeURIComponent).join("/");
      const sourceResponse = await supabaseFetch(config, `/storage/v1/object/${encodeURIComponent(bucket)}/${sourcePath}`);
      if (!sourceResponse.ok) throw new Error("Unable to load the original invoice PDF.");
      pdf = Buffer.from(await sourceResponse.arrayBuffer());
    } else {
      pdf = await createInvoicePdf(job);
    }
    if (!pdf.length) throw new Error("The invoice PDF is empty.");
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `${viewOnline ? "inline" : "attachment"}; filename="${safeFilename(invoiceNumber)}"`);
    res.setHeader("Cache-Control", "private, no-store");
    return res.status(200).send(pdf);
  } catch (error) {
    return res.status(500).json({ error:error.message || "Unable to download the invoice." });
  }
};

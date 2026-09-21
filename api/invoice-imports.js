const { MAX_PDF_BYTES, getSupabaseConfig, readRawBody, uploadDocument, extractInvoice, allInvoiceRows, invoiceKey, extractPdfText, crypto } = require("./_invoice-import-utils");

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).json({ error:"Method not allowed." });
  const config = getSupabaseConfig();
  if (!config) return res.status(503).json({ error:"Invoice import is not configured." });
  try {
    const contentType = String(req.headers["content-type"] || "").toLowerCase();
    if (!contentType.includes("application/pdf")) return res.status(400).json({ error:"Upload an Odoo PDF invoice." });
    const buffer = await readRawBody(req);
    if (!buffer.length) return res.status(400).json({ error:"The PDF is empty." });
    if (buffer.length > MAX_PDF_BYTES) return res.status(413).json({ error:"The PDF is larger than 6 MB." });
    const text = await extractPdfText(buffer);
    if (!text) return res.status(422).json({ error:"This PDF has no readable text. Export the invoice from Odoo as a digital PDF." });
    const fields = extractInvoice(text);
    const checksum = crypto.createHash("sha256").update(buffer).digest("hex");
    const rows = await allInvoiceRows(config);
    const duplicate = rows.find((row) => invoiceKey(row?.payload?.job?.invoiceNumber) && invoiceKey(row?.payload?.job?.invoiceNumber) === invoiceKey(fields.invoiceNumber));
    if (duplicate) fields.warnings.push("This invoice number already exists in the tracker. It cannot be created again.");
    const sourceDocument = await uploadDocument(config, buffer, checksum);
    return res.status(200).json({ importId:sourceDocument.importId, sourceDocument, fields, duplicate:Boolean(duplicate) });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ error:error.message || "Unable to import this invoice." });
  }
};

module.exports.config = { api:{ bodyParser:false } };

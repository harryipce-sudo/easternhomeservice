const { MAX_PDF_BYTES, getSupabaseConfig, readRawBody, uploadDocument, extractInvoice, allInvoiceRows, invoiceKey, extractPdfText, crypto } = require("./_invoice-import-utils");

function addressTokens(value) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim().split(/\s+/).filter((token) => token && !["street", "st", "road", "rd", "avenue", "ave", "vic", "australia"].includes(token));
}

function relatedJobs(address, rows) {
  const source = addressTokens(address);
  if (!source.length) return [];
  return rows.map((row) => {
    const candidate = addressTokens(row.address);
    const shared = source.filter((token) => candidate.includes(token)).length;
    const score = shared / Math.max(source.length, candidate.length, 1);
    const exact = source.join(" ") === candidate.join(" ");
    return { row, score, exact };
  }).filter(({ score, exact }) => exact || score >= 0.6)
    .sort((a, b) => Number(b.exact) - Number(a.exact) || b.score - a.score)
    .slice(0, 5)
    .map(({ row, score, exact }) => ({
      id:row.id,
      match:exact ? "Exact address match" : "Possible address match",
      confidence:Math.round(score * 100),
      jobNumber:String(row?.payload?.job?.number || row.quote_number || "—"),
      client:String(row.customer_name || "—"),
      address:String(row.address || "—"),
      status:String(row?.payload?.job?.status || row.job_stage || "—"),
      amount:Number(row?.payload?.job?.quote || String(row.total_quote || "").replace(/[^0-9.-]/g, "")) || 0,
      detail:String(row?.payload?.job?.detail || "")
    }));
}

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
    const matches = relatedJobs(fields.address, rows);
    if (matches.length) fields.warnings.push(`${matches.length} possible Tracker job match${matches.length === 1 ? " was" : "es were"} found by address. Check the match below before saving.`);
    const duplicate = rows.find((row) => invoiceKey(row?.payload?.job?.invoiceNumber) && invoiceKey(row?.payload?.job?.invoiceNumber) === invoiceKey(fields.invoiceNumber));
    if (duplicate) fields.warnings.push("This invoice number already exists in the tracker. It cannot be created again.");
    const sourceDocument = await uploadDocument(config, buffer, checksum);
    return res.status(200).json({ importId:sourceDocument.importId, sourceDocument, fields, relatedJobs:matches, duplicate:Boolean(duplicate) });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ error:error.message || "Unable to import this invoice." });
  }
};

module.exports.config = { api:{ bodyParser:false } };

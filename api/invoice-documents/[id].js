const { getSupabaseConfig, supabaseFetch, allInvoiceRows } = require("../_invoice-import-utils");

module.exports = async (req, res) => {
  if (req.method !== "GET") return res.status(405).json({ error:"Method not allowed." });
  const config = getSupabaseConfig();
  if (!config) return res.status(503).json({ error:"Invoice documents are not configured." });
  try {
    const rows = await allInvoiceRows(config);
    const record = rows.find((row) => String(row?.payload?.job?.invoice?.sourceDocument?.importId || "") === String(req.query?.id || ""));
    const source = record?.payload?.job?.invoice?.sourceDocument;
    if (!source?.path) return res.status(404).json({ error:"Invoice document not found." });
    const signed = await supabaseFetch(config, `/storage/v1/object/sign/${encodeURIComponent(source.bucket || "invoice-documents")}/${source.path.split("/").map(encodeURIComponent).join("/")}`, { method:"POST", headers:{ "Content-Type":"application/json" }, body:JSON.stringify({ expiresIn:300 }) });
    if (!signed.ok) throw new Error("Unable to open the original invoice.");
    const data = await signed.json();
    const location = data.signedURL || data.signedUrl;
    if (!location) throw new Error("Unable to open the original invoice.");
    return res.redirect(302, `${config.supabaseUrl}/storage/v1${location}`);
  } catch (error) {
    return res.status(500).json({ error:error.message || "Unable to open the original invoice." });
  }
};

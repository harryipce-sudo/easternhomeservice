const { getSupabaseConfig, supabaseFetch, readJsonBody, money, invoiceKey, allInvoiceRows, crypto } = require("../../_invoice-import-utils");

function validDate(value) { return /^\d{4}-\d{2}-\d{2}$/.test(String(value || "")); }

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).json({ error:"Method not allowed." });
  const config = getSupabaseConfig();
  if (!config) return res.status(503).json({ error:"Invoice import is not configured." });
  try {
    const body = await readJsonBody(req);
    const fields = body.fields || {};
    const sourceDocument = body.sourceDocument || {};
    const invoiceNumber = String(fields.invoiceNumber || "").trim();
    const client = String(fields.client || "").trim();
    const invoiceDate = String(fields.invoiceDate || "");
    const total = money(fields.total);
    const subtotal = money(fields.subtotal);
    const gst = money(fields.gst);
    if (!invoiceNumber || !client || !validDate(invoiceDate) || total <= 0) return res.status(400).json({ error:"Invoice number, client, invoice date and total amount are required." });
    if (!sourceDocument.importId || !sourceDocument.path || !sourceDocument.checksum) return res.status(400).json({ error:"Upload the Odoo PDF again before saving." });
    if (Math.abs(subtotal + gst - total) > 0.01) return res.status(400).json({ error:"Subtotal plus GST must equal the total amount." });
    const rows = await allInvoiceRows(config);
    if (rows.some((row) => invoiceKey(row?.payload?.job?.invoiceNumber) === invoiceKey(invoiceNumber))) return res.status(409).json({ error:"That invoice number already exists in the tracker." });
    const quantity = Math.max(0.01, Number(fields.quantity) || 1);
    const unitPrice = money(fields.unitPrice) || Number((subtotal / quantity).toFixed(2));
    const lineItems = Array.isArray(fields.lineItems) ? fields.lineItems.map((item) => ({ description:String(item?.description || "").trim(), quantity:Math.max(0.01, Number(item?.quantity) || 1), unitPrice:money(item?.unitPrice), amount:money(item?.amount) })).filter((item) => item.description) : [];
    const requestedReferralAmount = money(fields.referralAmount);
    const referralPercentage = requestedReferralAmount > 0 && subtotal > requestedReferralAmount
      ? Number((requestedReferralAmount / (subtotal - requestedReferralAmount) * 100).toFixed(1))
      : Math.max(0, Number(fields.referralPercentage) || 0);
    const referralAmount = referralPercentage > 0 ? Number((subtotal - subtotal / (1 + referralPercentage / 100)).toFixed(2)) : 0;
    const now = new Date().toISOString();
    const recordId = crypto.randomUUID();
    const record = {
      id:recordId,
      created_at:now,
      customer_name:client,
      phone:"-",
      address:String(fields.address || "").trim() || "-",
      quote_number:"-",
      total_quote:total,
      subtotal_ex_gst:subtotal,
      gst_total:gst,
      blind_count:0,
      curtain_count:0,
      sheer_count:0,
      payload:{ submittedAt:now, recordType:"service-invoice", sector:"Service", jobStage:"invoiced", job:{ number:"", detail:String(fields.description || "").trim(), quote:total, markup:referralPercentage, markupStatus:referralPercentage > 0 ? "included" : "not-recorded", status:"invoiced", payment:"unpaid", paymentDate:"", referral:referralPercentage > 0 ? "pending" : "not-applicable", invoiceNumber, invoiceDate, scheduledDate:"", boardOrder:-Date.now(), invoice:{ number:invoiceNumber, date:invoiceDate, dueDate:validDate(fields.dueDate) ? fields.dueDate : "", termsDays:Math.max(0, Number(fields.termsDays) || 0), client, address:String(fields.address || "").trim(), description:String(fields.description || "").trim(), lineItems, quantity, unitPrice, subtotal, gst, total, referralPercentage, referralAmount, note:String(fields.note || "").trim(), status:"issued", sourceDocument:{ importId:sourceDocument.importId, bucket:sourceDocument.bucket || "invoice-documents", path:sourceDocument.path, checksum:sourceDocument.checksum, importedAt:now } }, archived:false, groupKey:"" } }
    };
    const response = await supabaseFetch(config, "/rest/v1/quote_records", { method:"POST", headers:{ "Content-Type":"application/json", Prefer:"return=representation" }, body:JSON.stringify(record) });
    if (!response.ok) throw new Error("Unable to create the tracker invoice.");
    return res.status(201).json({ id:recordId });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ error:error.message || "Unable to create the tracker invoice." });
  }
};

const crypto = require("crypto");
const { pathToFileURL } = require("url");

const DOCUMENT_BUCKET = "invoice-documents";
const MAX_PDF_BYTES = 6 * 1024 * 1024;

function getSupabaseConfig() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serverKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;
  if (!supabaseUrl || !serverKey) return null;
  // Storage operations need an Authorization bearer token as well as the API
  // key. New Supabase secret keys use the `sb_secret_` format, but they still
  // need to be sent in both headers for the Storage API.
  const headers = { apikey: serverKey, Authorization: `Bearer ${serverKey}` };
  return { supabaseUrl, headers };
}

async function supabaseFetch(config, path, options = {}) {
  return fetch(`${config.supabaseUrl}${path}`, {
    ...options,
    headers: { ...config.headers, ...(options.headers || {}) }
  });
}

function money(value) {
  const number = Number(String(value ?? "").replace(/[^0-9.-]+/g, ""));
  return Number.isFinite(number) ? Number(number.toFixed(2)) : 0;
}

function isoDate(value) {
  const match = String(value || "").trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!match) return "";
  return `${match[3]}-${match[2].padStart(2, "0")}-${match[1].padStart(2, "0")}`;
}

function cleanLines(text) {
  return String(text || "").replace(/\r/g, "").split("\n").map((line) => line.trim()).filter(Boolean);
}

function valueAfter(lines, label) {
  const index = lines.findIndex((line) => line.toLowerCase() === label.toLowerCase());
  return index >= 0 ? lines[index + 1] || "" : "";
}

function extractInvoice(text) {
  const lines = cleanLines(text);
  const joined = lines.join("\n");
  const numberMatch = joined.match(/Tax Invoice\s+(?:INV[-\s]*)?([A-Za-z0-9-]+)/i) || joined.match(/Payment Communication:\s*\n?\s*([A-Za-z0-9-]+)/i);
  const invoiceNumber = numberMatch?.[1] || "";
  const titleIndex = lines.findIndex((line) => /^Tax Invoice\b/i.test(line));
  const invoiceDateIndex = lines.findIndex((line) => /^Invoice Date$/i.test(line));
  const address = titleIndex >= 0 && invoiceDateIndex > titleIndex ? lines.slice(titleIndex + 1, invoiceDateIndex).join(", ") : "";
  const invoiceDate = isoDate(valueAfter(lines, "Invoice Date"));
  const dueDate = isoDate(valueAfter(lines, "Due Date"));
  const termsMatch = joined.match(/Payment terms:\s*(\d+)\s*Days/i);
  const termsDays = termsMatch ? Number(termsMatch[1]) : (invoiceDate && dueDate ? Math.max(0, Math.round((new Date(`${dueDate}T00:00:00`) - new Date(`${invoiceDate}T00:00:00`)) / 86400000)) : 30);
  const subtotal = money((joined.match(/Untaxed Amount\s*\n?\s*\$?\s*\n?\s*([\d,]+(?:\.\d{2})?)/i) || [])[1]);
  const gst = money((joined.match(/GST\s*10%\s*\n?\s*\$?\s*\n?\s*([\d,]+(?:\.\d{2})?)/i) || [])[1]);
  const total = money((joined.match(/\bTotal\s*\n?\s*\$?\s*\n?\s*([\d,]+(?:\.\d{2})?)/i) || [])[1]);
  const detailsStart = lines.findIndex((line) => /^Description/i.test(line) && /Quantity/i.test(line));
  const paymentTermsIndex = lines.findIndex((line) => /^Payment terms:/i.test(line));
  const lineItems = detailsStart >= 0 && paymentTermsIndex > detailsStart ? lines.slice(detailsStart + 1, paymentTermsIndex) : [];
  const lineItemText = lineItems.join("\n");
  // Odoo's selectable-PDF text keeps each table row in reading order. Match
  // the four numeric columns and retain only the text that precedes them as
  // the service description. This prevents quantity, tax and dollar values
  // from leaking into the Description field.
  const importedLineItems = [];
  const itemPattern = /([\s\S]*?)\s+(\d+(?:\.\d+)?)\s+([\d,]+(?:\.\d{2})?)\s+10%\s*GST\s+\$?\s*([\d,]+(?:\.\d{2})?)/gi;
  let match;
  while ((match = itemPattern.exec(lineItemText))) {
    const itemDescription = match[1].replace(/\s+/g, " ").trim();
    if (!itemDescription) continue;
    const itemQuantity = Number(match[2]) || 1;
    const itemUnitPrice = money(match[3]);
    const itemAmount = money(match[4]) || Number((itemQuantity * itemUnitPrice).toFixed(2));
    importedLineItems.push({ description:itemDescription, quantity:itemQuantity, unitPrice:itemUnitPrice, amount:itemAmount });
  }
  let description = importedLineItems.length
    ? importedLineItems.map((item) => `${item.description} — Qty ${item.quantity.toFixed(2)} × $${item.unitPrice.toLocaleString("en-AU", { minimumFractionDigits:2, maximumFractionDigits:2 })} = $${item.amount.toLocaleString("en-AU", { minimumFractionDigits:2, maximumFractionDigits:2 })} (ex. GST)`).join("\n\n")
    : lineItems.join(" ");
  let quantity = 1;
  let unitPrice = subtotal;
  const itemCount = importedLineItems.length || (lineItemText.match(/(?:10%\s*GST|\bGST\b)/gi) || []).length;
  const quantityIndex = lineItems.findIndex((line) => /^\d+(?:\.\d+)?$/.test(line));
  if (importedLineItems.length === 1) {
    quantity = importedLineItems[0].quantity;
    unitPrice = importedLineItems[0].unitPrice || subtotal;
  } else if (!importedLineItems.length && itemCount <= 1 && quantityIndex > 0 && /^[\d,]+(?:\.\d+)?$/.test(lineItems[quantityIndex + 1] || "")) {
    description = lineItems.slice(0, quantityIndex).join(" ");
    quantity = Number(lineItems[quantityIndex]) || 1;
    unitPrice = money(lineItems[quantityIndex + 1]) || subtotal;
  } else {
    // Some Odoo PDFs expose each line item as one compact text line instead
    // of a separate text item for every table cell.
    const compactItem = description.match(/^(.*?)\s*(\d+\.\d{2})\s*([\d,]+\.\d{2})\s*10%\s*GST\s*\$?\s*([\d,]+\.\d{2})$/i);
    if (compactItem) {
      description = compactItem[1].trim();
      quantity = Number(compactItem[2]) || 1;
      unitPrice = money(compactItem[3]) || subtotal;
    }
  }
  const noteMatch = joined.match(/Note:\s*\n?([\s\S]*?)\n?Bank Detail/i);
  const note = noteMatch ? cleanLines(noteMatch[1]).join(" ") : "";
  const warnings = [];
  if (!invoiceNumber) warnings.push("Invoice number could not be read.");
  if (!address) warnings.push("Billing address could not be read.");
  // The supplied Odoo PDF prints a billing address but not a customer name.
  // Keep the client blank rather than guessing who should own the invoice.
  warnings.push("Enter the client name before saving.");
  if (!invoiceDate) warnings.push("Invoice date could not be read.");
  if (!subtotal || !total) warnings.push("One or more totals could not be read.");
  if (subtotal && gst && total && Math.abs(subtotal + gst - total) > 0.01) warnings.push("Subtotal, GST and total do not match. Please review the amounts.");
  if (!description) warnings.push("Service description could not be read.");
  if (itemCount > 1 || (subtotal && unitPrice && Math.abs(quantity * unitPrice - subtotal) > 0.01)) {
    quantity = 1;
    unitPrice = subtotal;
    if (importedLineItems.length > 1) warnings.push(`${importedLineItems.length} separate line items were found. Their prices are shown separately below.`);
    else warnings.push("Multiple line items were combined. Please review the service details before saving.");
  }
  return { invoiceNumber, client:"", address, invoiceDate, dueDate, termsDays, description, lineItems:importedLineItems, quantity, unitPrice, subtotal, gst, total, note, warnings };
}

function invoiceKey(value) {
  return String(value || "").replace(/^INV[-\s]*/i, "").replace(/[^a-z0-9]/gi, "").toLowerCase();
}

async function readRawBody(req) {
  const parts = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > MAX_PDF_BYTES) throw Object.assign(new Error("The PDF is larger than 6 MB."), { statusCode:413 });
    parts.push(chunk);
  }
  return Buffer.concat(parts);
}

async function readJsonBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

async function ensureDocumentBucket(config) {
  // Supabase Storage reports a missing bucket as either 400 or 404 depending
  // on the project version. Creating idempotently and accepting 409 means
  // both a new bucket and an already-existing bucket work reliably.
  const created = await supabaseFetch(config, "/storage/v1/bucket", { method:"POST", headers:{ "Content-Type":"application/json" }, body:JSON.stringify({ id:DOCUMENT_BUCKET, name:DOCUMENT_BUCKET, public:false, file_size_limit:MAX_PDF_BYTES, allowed_mime_types:["application/pdf"] }) });
  if (created.ok || created.status === 409) return;
  const detail = await created.text();
  // This project's Storage version returns HTTP 400 (not 409) for a duplicate
  // bucket name. The bucket has already been created, so uploads can continue.
  if (created.status === 400 && /(already exists|duplicate|exists)/i.test(detail)) return;
  if (!created.ok) {
    throw new Error("Unable to prepare private invoice storage.");
  }
}

async function uploadDocument(config, buffer, checksum) {
  await ensureDocumentBucket(config);
  const importId = crypto.randomUUID();
  const path = `odoo/${new Date().toISOString().slice(0, 10)}/${importId}.pdf`;
  const response = await supabaseFetch(config, `/storage/v1/object/${DOCUMENT_BUCKET}/${path}`, { method:"POST", headers:{ "Content-Type":"application/pdf", "x-upsert":"false", "cache-control":"private, max-age=0" }, body:buffer });
  if (!response.ok) throw new Error("Unable to store the original invoice PDF.");
  return { importId, path, checksum, bucket:DOCUMENT_BUCKET };
}

async function allInvoiceRows(config) {
  const response = await supabaseFetch(config, "/rest/v1/quote_records?select=id,payload,address,customer_name,quote_number,total_quote,job_stage");
  if (!response.ok) throw new Error("Unable to check existing invoices.");
  return response.json();
}

async function extractPdfText(buffer) {
  const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
  // PDF.js runs a "fake" worker in Node. Giving it an explicit resolved path
  // makes Vercel bundle the worker alongside this serverless function instead
  // of trying to find it relative to the deployed entry file.
  pdfjs.GlobalWorkerOptions.workerSrc = pathToFileURL(require.resolve("pdfjs-dist/legacy/build/pdf.worker.mjs")).href;
  const document = await pdfjs.getDocument({ data:new Uint8Array(buffer) }).promise;
  const pages = [];
  for (let number = 1; number <= document.numPages; number += 1) {
    const page = await document.getPage(number);
    const content = await page.getTextContent();
    pages.push(content.items.map((item) => `${item.str || ""}${item.hasEOL ? "\n" : " "}`).join(""));
  }
  return pages.join("\n").replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
}

module.exports = { DOCUMENT_BUCKET, MAX_PDF_BYTES, getSupabaseConfig, supabaseFetch, money, isoDate, extractInvoice, invoiceKey, readRawBody, readJsonBody, uploadDocument, allInvoiceRows, extractPdfText, crypto };

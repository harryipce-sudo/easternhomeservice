const PAGE_WIDTH = 595;
const PAGE_HEIGHT = 842;

function pdfText(value) {
  return String(value ?? "").replace(/[\\()]/g, "\\$&").replace(/[^\x20-\x7e]/g, "?");
}

function money(value) {
  return new Intl.NumberFormat("en-AU", { style:"currency", currency:"AUD" }).format(Number(value) || 0);
}

function date(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(value || ""))) return "-";
  return new Date(`${value}T00:00:00`).toLocaleDateString("en-AU");
}

function wrap(value, width = 64) {
  const words = String(value || "-").replace(/\s+/g, " ").trim().split(" ");
  const lines = [];
  let line = "";
  words.forEach((word) => {
    const next = line ? `${line} ${word}` : word;
    if (line && next.length > width) { lines.push(line); line = word; } else line = next;
  });
  if (line) lines.push(line);
  return lines.length ? lines : ["-"];
}

function createInvoicePdf(job = {}) {
  const invoice = job.invoice || {};
  const number = String(job.invoiceNumber || invoice.number || "Invoice");
  const client = String(invoice.client || job.client || "Client");
  const address = String(invoice.address || job.address || "");
  const lines = Array.isArray(invoice.lineItems) && invoice.lineItems.length
    ? invoice.lineItems
    : [{ description:invoice.description || job.detail || "Service", quantity:invoice.quantity || 1, unitPrice:invoice.unitPrice ?? ((Number(job.quote) || 0) / 1.1) }];
  const validLines = lines.filter((line) => String(line?.description || "").trim() && Number(line?.quantity) > 0);
  const subtotal = Number(invoice.subtotal ?? validLines.reduce((sum, line) => sum + Number(line.quantity || 0) * Number(line.unitPrice || 0), 0)) || 0;
  const gst = Number(invoice.gst ?? subtotal * 0.1) || 0;
  const total = Number(invoice.total ?? subtotal + gst) || 0;
  const content = [];
  const text = (x, y, value, size = 10, bold = false, color = "0.10 0.17 0.25") => content.push(`${color} rg ${bold ? "/F2" : "/F1"} ${size} Tf 1 0 0 1 ${x} ${y} Tm (${pdfText(value)}) Tj`);
  const line = (x1, y1, x2, y2, width = 0.6, color = "0.68 0.74 0.72") => content.push(`${color} RG ${width} w ${x1} ${y1} m ${x2} ${y2} l S`);
  const block = (x, y, value, size = 9, width = 64, leading = 12, bold = false) => wrap(value, width).forEach((entry, index) => text(x, y - index * leading, entry, size, bold));

  content.push("q");
  text(46, 790, "EASTERN HOME SERVICE", 17, true, "0.02 0.22 0.40");
  text(46, 774, "Your Home Maintenance and Service Solution", 8, false, "0.32 0.39 0.47");
  text(401, 790, "TAX INVOICE", 15, true, "0.02 0.22 0.40");
  text(401, 773, number, 10, true);
  line(46, 756, 549, 756, 1.2, "0.02 0.22 0.40");
  text(46, 728, "Bill to", 9, true, "0.32 0.39 0.47");
  text(46, 712, client, 11, true);
  block(46, 697, address, 9, 65, 12);
  text(370, 728, "Invoice date", 9, true, "0.32 0.39 0.47");
  text(370, 712, date(invoice.date || job.invoiceDate), 10, true);
  text(470, 728, "Due date", 9, true, "0.32 0.39 0.47");
  text(470, 712, date(invoice.dueDate), 10, true);

  let y = 658;
  content.push("0.68 0.74 0.72 rg 46 641 503 22 re f");
  text(52, 648, "Description", 8, true); text(355, 648, "Qty", 8, true); text(402, 648, "Unit price", 8, true); text(470, 648, "GST", 8, true); text(510, 648, "Amount", 8, true);
  validLines.slice(0, 12).forEach((item) => {
    const description = wrap(item.description, 52);
    const height = Math.max(25, description.length * 11 + 10);
    description.forEach((entry, index) => text(52, y - index * 11, entry, 9, index === 0));
    text(359, y, Number(item.quantity || 0).toFixed(Number(item.quantity || 0) % 1 ? 2 : 0), 9);
    text(402, y, money(item.unitPrice), 9);
    text(470, y, "10%", 9);
    text(510, y, money(Number(item.quantity || 0) * Number(item.unitPrice || 0)), 9);
    y -= height;
    line(46, y + 7, 549, y + 7, 0.4, "0.82 0.85 0.88");
  });
  if (lines.length > validLines.slice(0, 12).length) text(46, y - 4, "Additional invoice lines are recorded in Tracker.", 8, false, "0.32 0.39 0.47");

  const totalsY = Math.min(y - 28, 300);
  text(365, totalsY, "Subtotal", 10); text(500, totalsY, money(subtotal), 10, true);
  text(365, totalsY - 20, "GST 10%", 10); text(500, totalsY - 20, money(gst), 10, true);
  line(360, totalsY - 29, 549, totalsY - 29, 1, "0.02 0.22 0.40");
  text(365, totalsY - 48, "TOTAL", 12, true, "0.02 0.22 0.40"); text(493, totalsY - 48, money(total), 12, true, "0.02 0.22 0.40");
  text(46, 180, `Payment terms: ${Number(invoice.termsDays) || 0} days`, 9);
  text(46, 154, "Payment details", 9, true, "0.32 0.39 0.47");
  text(46, 140, "Bank: Commonwealth Bank   BSB: 063 109   Account: 13349243", 8);
  const note = String(invoice.note || "").trim();
  if (note) { text(46, 112, "Notes", 9, true, "0.32 0.39 0.47"); block(46, 98, note, 8, 90, 10); }
  line(46, 48, 549, 48, 0.6, "0.82 0.85 0.88");
  text(46, 34, "Eastern Home Service", 8, true, "0.02 0.22 0.40");
  text(488, 34, "Page 1 of 1", 8, false, "0.32 0.39 0.47");
  content.push("Q");

  const stream = `${content.join("\n")}\n`;
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_WIDTH} ${PAGE_HEIGHT}] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
    `<< /Length ${Buffer.byteLength(stream, "utf8")} >>\nstream\n${stream}endstream`
  ];
  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((object, index) => { offsets.push(Buffer.byteLength(pdf, "utf8")); pdf += `${index + 1} 0 obj\n${object}\nendobj\n`; });
  const xref = Buffer.byteLength(pdf, "utf8");
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n${offsets.slice(1).map((offset) => `${String(offset).padStart(10, "0")} 00000 n \n`).join("")}trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return Buffer.from(pdf, "utf8");
}

module.exports = { createInvoicePdf };

const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

const NAVY = "#073f78";
const INK = "#16263b";
const MUTED = "#5d6878";
const SAGE = "#aebdb4";
const RULE = "#9ba8b6";
const PAGE = { width:595.28, height:841.89, margin:34 };

function money(value) { return new Intl.NumberFormat("en-AU", { style:"currency", currency:"AUD" }).format(Number(value) || 0); }
function date(value) { return /^\d{4}-\d{2}-\d{2}$/.test(String(value || "")) ? new Date(`${value}T00:00:00`).toLocaleDateString("en-AU") : "—"; }
function normalLines(job, invoice) {
  const source = Array.isArray(invoice.lineItems) && invoice.lineItems.length ? invoice.lineItems : [{ description:invoice.description || job.detail || "Service", quantity:invoice.quantity || 1, unitPrice:invoice.unitPrice ?? ((Number(job.quote) || 0) / 1.1) }];
  return source.filter((line) => String(line?.description || "").trim());
}
function lineHeight(doc, item, width) { doc.font("Helvetica-Bold").fontSize(9); return Math.max(32, doc.heightOfString(String(item.description || ""), { width, lineGap:2 }) + 16); }

function drawHeader(doc, invoiceNumber) {
  const { margin, width } = PAGE;
  doc.fillColor(INK).font("Helvetica").fontSize(9).text("Melbourne VIC Australia", margin, 22);
  doc.font("Helvetica-Bold").text("ABN: 67651973711", margin, 36);
  const logo = path.join(process.cwd(), "assets", "eastern-home-service-logo-clean.png");
  if (fs.existsSync(logo)) doc.image(logo, width - margin - 102, 28, { fit:[102, 76] });
  else doc.fillColor(NAVY).font("Helvetica-Bold").fontSize(16).text("EASTERN", width - margin - 100, 52, { width:100, align:"right" });
  doc.fillColor(NAVY).font("Helvetica").fontSize(25).text(`Tax Invoice ${invoiceNumber}`, margin, 166, { width:width - margin * 2, align:"center" });
}
function drawFooter(doc) {
  const { margin, width, height } = PAGE;
  doc.fillColor(INK).font("Helvetica-Bold").fontSize(8).text("Your Home Maintenance and Service Solution", margin, height - 45, { width:width - margin * 2, align:"right" });
  doc.fillColor(MUTED).font("Helvetica").fontSize(7).text("Page 1 / 1", margin, height - 32, { width:width - margin * 2, align:"right" });
}

function createInvoicePdf(job = {}) {
  return new Promise((resolve, reject) => {
    const invoice = job.invoice || {};
    const invoiceNumber = String(job.invoiceNumber || invoice.number || "Invoice");
    const client = String(invoice.client || "Client");
    const address = String(invoice.address || "");
    const lines = normalLines(job, invoice);
    const subtotal = Number(invoice.subtotal ?? lines.reduce((sum, item) => sum + Number(item.quantity || 0) * Number(item.unitPrice || 0), 0)) || 0;
    const gst = Number(invoice.gst ?? subtotal * 0.1) || 0;
    const total = Number(invoice.total ?? subtotal + gst) || 0;
    const doc = new PDFDocument({ size:"A4", margin:0, info:{ Title:`Tax Invoice ${invoiceNumber}`, Author:"Eastern Home Service" } });
    const chunks = [];
    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("error", reject);
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    const { margin, width } = PAGE;
    const tableWidth = width - margin * 2;
    const columns = { quantity:332, price:390, tax:462, amount:520 };
    drawHeader(doc, invoiceNumber);
    doc.fillColor(INK).font("Helvetica-Bold").fontSize(10).text(client, margin, 202);
    doc.font("Helvetica").fontSize(10).text(address, margin, 218, { width:280, lineGap:2 });
    doc.fillColor("#96a69e").font("Helvetica-Bold").fontSize(9).text("Invoice Date", margin, 260);
    doc.fillColor(INK).fontSize(10).text(date(invoice.date || job.invoiceDate), margin, 276);
    doc.strokeColor("#b7c7bf").lineWidth(1).moveTo(202, 253).lineTo(202, 303).stroke();
    doc.fillColor("#96a69e").font("Helvetica-Bold").fontSize(9).text("Due Date", 214, 260);
    doc.fillColor(INK).fontSize(10).text(date(invoice.dueDate), 214, 276);
    let y = 326;
    doc.fillColor(SAGE).rect(margin, y, tableWidth, 30).fill();
    doc.fillColor("#172333").font("Helvetica").fontSize(8);
    doc.text("Description", margin + 5, y + 11, { width:columns.quantity - margin - 10 });
    doc.text("Quantity", columns.quantity, y + 11, { width:50, align:"right" }); doc.text("Unit Price", columns.price, y + 11, { width:58, align:"right" }); doc.text("Taxes", columns.tax, y + 11, { width:44, align:"right" }); doc.text("Amount", columns.amount, y + 11, { width:38, align:"right" });
    y += 30;
    lines.forEach((item) => {
      const rowHeight = lineHeight(doc, item, columns.quantity - margin - 14);
      if (y + rowHeight > 520) return;
      const hasPrice = Number(item.quantity) > 0 && Number(item.unitPrice) > 0;
      doc.fillColor(INK).font("Helvetica-Bold").fontSize(9).text(String(item.description), margin + 5, y + 10, { width:columns.quantity - margin - 14, lineGap:2 });
      if (hasPrice) { doc.font("Helvetica").fontSize(10); doc.text(Number(item.quantity).toFixed(Number(item.quantity) % 1 ? 2 : 0), columns.quantity, y + 11, { width:50, align:"right" }); doc.text(money(item.unitPrice), columns.price, y + 11, { width:58, align:"right" }); doc.text("10% GST", columns.tax, y + 11, { width:44, align:"right" }); doc.text(money(Number(item.quantity) * Number(item.unitPrice)), columns.amount, y + 11, { width:38, align:"right" }); }
      y += rowHeight; doc.strokeColor(RULE).lineWidth(0.6).moveTo(margin, y).lineTo(width - margin, y).stroke();
    });
    const termsY = Math.min(y + 18, 545);
    doc.fillColor(INK).font("Helvetica").fontSize(9).text(`Payment terms: ${Number(invoice.termsDays) || 0} Days`, margin, termsY);
    const totalY = Math.max(termsY + 72, 505);
    doc.fontSize(10).text("Untaxed Amount", 404, totalY, { width:100 }); doc.font("Helvetica-Bold").text(money(subtotal), 500, totalY, { width:61, align:"right" });
    doc.font("Helvetica").text("GST 10%", 404, totalY + 28, { width:100 }); doc.font("Helvetica-Bold").text(money(gst), 500, totalY + 28, { width:61, align:"right" });
    doc.strokeColor(NAVY).lineWidth(1).moveTo(400, totalY + 52).lineTo(561, totalY + 52).stroke();
    doc.fillColor(NAVY).font("Helvetica-Bold").fontSize(12).text("Total", 404, totalY + 63, { width:100 }); doc.text(money(total), 485, totalY + 63, { width:76, align:"right" }); doc.strokeColor(NAVY).lineWidth(1).moveTo(400, totalY + 84).lineTo(561, totalY + 84).stroke();
    doc.fillColor(INK).font("Helvetica-Bold").fontSize(8).text(`Payment Communication: ${invoiceNumber}`, margin, 586);
    doc.text("Note:", margin, 616); doc.fillColor(MUTED).font("Helvetica").fontSize(8).text(String(invoice.note || "Price includes labour and material costs. Not including rubbish disposal unless mentioned."), margin, 630, { width:360, lineGap:2 });
    doc.fillColor(INK).font("Helvetica-Bold").fontSize(8).text("Bank Detail", margin, 677);
    doc.fillColor(MUTED).font("Helvetica").fontSize(8).text("SWIFT: CTBAAU2S\nBank Name: Commonwealth Bank\nAccount Name: Eastern Group VIC\nBSB: 063 109\nAccount Number: 13349243 (AUD ONLY)\nBank Address: 28 Main Street, Box Hill, VIC 3128\n\"Please mark 'AUD only' on bank instruction.\"", margin, 691, { lineGap:3 });
    drawFooter(doc); doc.end();
  });
}

module.exports = { createInvoicePdf };

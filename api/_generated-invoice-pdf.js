const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
const rich = require("../rich-format");

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
  // Detail-only lines are valid: they let one priced service cover several
  // tasks. Keep them in the PDF even when their quantity and unit price are 0.
  return source.reduce((lines, line) => {
    const description = String(line?.description || "").trim();
    if (!description) return lines;
    lines.push({
      description,
      detailRich:rich.clean(line?.detailRich),
      quantity:Math.max(0, Number(line?.quantity) || 0),
      unitPrice:Math.max(0, Number(line?.unitPrice) || 0)
    });
    return lines;
  }, []);
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
function drawFooter(doc, page = 1, pages = 1) {
  const { margin, width, height } = PAGE;
  doc.fillColor(INK).font("Helvetica-Bold").fontSize(8).text("Your Home Maintenance and Service Solution", margin, height - 45, { width:width - margin * 2, align:"right" });
  doc.fillColor(MUTED).font("Helvetica").fontSize(7).text(`Page ${page} / ${pages}`, margin, height - 32, { width:width - margin * 2, align:"right" });
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
    const doc = new PDFDocument({ size:"A4", margin:0, bufferPages:true, info:{ Title:`Tax Invoice ${invoiceNumber}`, Author:"Eastern Home Service" } });
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
    const descriptionWidth = columns.quantity - margin - 14;
    const continuationPage = () => {
      doc.addPage(); drawHeader(doc, invoiceNumber);
      y = 215;
      doc.fillColor(SAGE).rect(margin, y, tableWidth, 30).fill();
      doc.fillColor(INK).font("Helvetica").fontSize(8).text("Description (continued)", margin + 5, y + 11);
      y += 30;
    };
    const wrapDescription = (text) => {
      const output = [];
      doc.font("Helvetica-Bold").fontSize(9);
      String(text).replace(/\r\n?/g, "\n").split("\n").forEach((paragraph) => {
        if (!paragraph.trim()) { output.push(""); return; }
        let current = "";
        paragraph.split(/\s+/).forEach((word) => {
          while (doc.widthOfString(word) > descriptionWidth) {
            if (current) { output.push(current); current = ""; }
            let cut = 1; while (cut < word.length && doc.widthOfString(word.slice(0, cut + 1)) <= descriptionWidth) cut++;
            output.push(word.slice(0,cut)); word = word.slice(cut);
          }
          const candidate = current ? current + " " + word : word;
          if (current && doc.widthOfString(candidate) > descriptionWidth) { output.push(current); current = word; } else current = candidate;
        });
        output.push(current);
      });
      return output;
    };
    const richFont = (run, heading) => (run.bold || heading) ? (run.italic ? "Helvetica-BoldOblique" : "Helvetica-Bold") : (run.italic ? "Helvetica-Oblique" : "Helvetica");
    const wrapRich = (blocks) => {
      const output = []; let number = 0;
      for (const block of rich.clean(blocks)) {
        if (block.type !== "number") number = 0; else number++;
        const prefix = block.type === "bullet" ? "• " : block.type === "number" ? `${number}. ` : "";
        const runs = prefix ? [{text:prefix},...block.runs] : block.runs;
        let current = [], used = 0; const heading = /^h[123]$/.test(block.type);
        const flush = () => { output.push(current); current=[]; used=0; };
        for (const run of runs) {
          const font = richFont(run, heading); doc.font(font).fontSize(9);
          const parts = String(run.text).split(/(\n|\s+)/);
          for (let part of parts) {
            if (!part) continue; if (part === "\n") { flush(); continue; }
            if (!current.length && /^\s+$/.test(part)) continue;
            while (doc.widthOfString(part) > descriptionWidth) {
              if (current.length) flush(); let cut=1;
              while (cut < part.length && doc.widthOfString(part.slice(0,cut+1)) <= descriptionWidth) cut++;
              const chunk=part.slice(0,cut); current.push({text:chunk,font,underline:run.underline}); flush(); part=part.slice(cut);
            }
            const width=doc.widthOfString(part); if (current.length && used+width>descriptionWidth) flush();
            if (!current.length && /^\s+$/.test(part)) continue;
            current.push({text:part,font,underline:run.underline}); used+=width;
          }
        }
        flush();
      }
      return output;
    };
    lines.forEach((item) => {
      const richBlocks = rich.clean(item.detailRich);
      const useRich = richBlocks.length && rich.text(richBlocks).trim() === item.description;
      const wrapped = useRich ? wrapRich(richBlocks) : wrapDescription(item.description);
      const hasPrice = Number(item.quantity) > 0 && Number(item.unitPrice) > 0;
      if (y + 30 > 760) continuationPage();
      if (hasPrice) { doc.fillColor(INK).font("Helvetica").fontSize(10); doc.text(Number(item.quantity).toFixed(Number(item.quantity) % 1 ? 2 : 0), columns.quantity, y + 11, { width:50, align:"right" }); doc.text(money(item.unitPrice), columns.price, y + 11, { width:58, align:"right" }); doc.text("10% GST", columns.tax, y + 11, { width:44, align:"right" }); doc.text(money(Number(item.quantity) * Number(item.unitPrice)), columns.amount, y + 11, { width:38, align:"right" }); }
      y += 10;
      wrapped.forEach((text) => { if (y + 14 > 760) continuationPage(); doc.fillColor(INK).fontSize(9); if (useRich) { let x=margin+5; for(const run of text) { doc.font(run.font); if(run.text)doc.text(run.text,x,y,{lineBreak:false,underline:Boolean(run.underline)}); x+=doc.widthOfString(run.text); } } else { doc.font("Helvetica-Bold"); if (text) doc.text(text, margin + 5, y, { width:descriptionWidth, lineBreak:false }); } y += 14; });
      y += 6; doc.strokeColor(RULE).lineWidth(0.6).moveTo(margin,y).lineTo(width-margin,y).stroke();
    });
    // The payment and bank details need the lower half of a page. Continue on
    // a fresh page rather than dropping or overlapping a long description.
    if (y > 430) continuationPage();
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
    const pageRange = doc.bufferedPageRange();
    for (let page = 0; page < pageRange.count; page++) { doc.switchToPage(page); drawFooter(doc, page + 1, pageRange.count); }
    doc.end();
  });
}

module.exports = { createInvoicePdf };

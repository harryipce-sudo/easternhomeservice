const list = document.querySelector("#invoice-list");
const copy = document.querySelector("#portal-copy");
const paidInvoiceSection = document.querySelector("#paid-invoice-section");
const paidInvoiceCopy = document.querySelector("#paid-invoice-copy");
const paidInvoiceList = document.querySelector("#paid-invoice-list");
const money = new Intl.NumberFormat("en-AU", { style:"currency", currency:"AUD" });
const escapeHtml = (value) => String(value ?? "").replace(/[&<>\"']/g, (character) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" })[character]);
const dateLabel = (value) => /^\d{4}-\d{2}-\d{2}$/.test(String(value || "")) ? new Date(`${value}T00:00:00`).toLocaleDateString("en-AU", { day:"numeric", month:"short", year:"numeric" }) : "Date not available";
const today = () => new Date().toISOString().slice(0, 10);
const reportedPayment = (paidDate, note = "", invoiceNumber = "") => `<div class="client-payment-reported">Client reported paid<br><small>${escapeHtml(dateLabel(paidDate))}${note ? `<br>${escapeHtml(note)}` : ""}</small><button type="button" data-client-unpaid="${escapeHtml(invoiceNumber)}">Mark unpaid</button></div>`;
const clientPaymentControl = (invoice) => invoice.clientReportedPaidDate
  ? reportedPayment(invoice.clientReportedPaidDate, invoice.clientReportedPaymentNote, invoice.invoiceNumber)
  : `<label class="client-payment-control"><span>Paid date</span><input type="date" value="${today()}" data-client-paid-date><textarea data-client-payment-note maxlength="1000" placeholder="Optional payment or invoice note"></textarea><button type="button" data-client-paid="${escapeHtml(invoice.invoiceNumber)}">Mark paid</button></label>`;

async function loadInvoices() {
  const access = new URLSearchParams(location.search).get("access") || "";
  if (!access) throw new Error("This invoice link is unavailable.");
  const response = await fetch(`./api/client-invoices?access=${encodeURIComponent(access)}`, { cache:"no-store" });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "This invoice link is unavailable.");
  const invoiceTotal = Number(data.totalAmount) || 0;
  const referralTotal = Number(data.totalReferralFee) || 0;
  const paidInvoices = Array.isArray(data.paidInvoices) ? data.paidInvoices : [];
  copy.textContent = `${data.clientName} · ${data.invoices.length} unpaid invoice${data.invoices.length === 1 ? "" : "s"}`;
  document.querySelector("#invoice-totals").innerHTML = `<article><span>Total invoice payment due</span><strong>${money.format(invoiceTotal)}</strong><small>Including GST</small></article><article class="referral-total"><span>Total referral payable</span><strong>${money.format(referralTotal)}</strong><small>Paid invoices only · Including GST</small></article>`;
  list.innerHTML = data.invoices.length ? `<table class="invoice-table"><thead><tr><th>Invoice no.</th><th>Client name</th><th>Address</th><th>Invoice date</th><th>Invoice amount</th><th>Referral %</th><th>Referral payable</th><th>Client payment</th></tr></thead><tbody>${data.invoices.map((invoice) => `<tr><td class="invoice-number">${escapeHtml(invoice.invoiceNumber || "Invoice")}</td><td>${escapeHtml(data.clientName)}</td><td class="invoice-address">${escapeHtml(invoice.address)}</td><td class="invoice-date">${escapeHtml(dateLabel(invoice.invoiceDate))}</td><td class="invoice-amount">${money.format(invoice.amount)}</td><td class="referral-percentage">${Number(invoice.referralPercentage) > 0 ? `${Number(invoice.referralPercentage).toFixed(1)}%` : "—"}</td><td class="invoice-amount">${money.format(invoice.referralFee)}</td><td>${clientPaymentControl(invoice)}</td></tr><tr class="detail-row"><td colspan="8"><details><summary>View invoice details</summary><p class="invoice-detail">${escapeHtml(invoice.detail || "No additional invoice details.")}</p></details></td></tr>`).join("")}</tbody></table>` : '<p class="empty">There are no unpaid invoices at this time.</p>';
  paidInvoiceSection.hidden = !paidInvoices.length;
  if (paidInvoices.length) {
    paidInvoiceCopy.textContent = `${paidInvoices.length} paid invoice${paidInvoices.length === 1 ? "" : "s"} · Total referral payable ${money.format(referralTotal)} including GST`;
    paidInvoiceList.innerHTML = `<table class="invoice-table paid-invoice-table"><thead><tr><th>Invoice no.</th><th>Address</th><th>Payment status</th><th>Paid date</th><th>Invoice amount</th><th>Referral %</th><th>Referral payable</th></tr></thead><tbody>${paidInvoices.map((invoice) => `<tr><td class="invoice-number">${escapeHtml(invoice.invoiceNumber || "Invoice")}</td><td class="invoice-address">${escapeHtml(invoice.address)}</td><td class="paid-status">Paid</td><td class="invoice-date">${invoice.paymentDate ? escapeHtml(dateLabel(invoice.paymentDate)) : "—"}</td><td class="invoice-amount">${money.format(invoice.amount)}</td><td class="referral-percentage">${Number(invoice.referralPercentage) > 0 ? `${Number(invoice.referralPercentage).toFixed(1)}%` : "—"}</td><td class="invoice-amount">${money.format(invoice.referralFee)}</td></tr><tr class="detail-row"><td colspan="7"><details><summary>View invoice details</summary><p class="invoice-detail">${escapeHtml(invoice.detail || "No additional invoice details.")}</p></details></td></tr>`).join("")}</tbody></table>`;
  }
}

loadInvoices().catch((error) => { copy.textContent = ""; document.querySelector("#invoice-totals").innerHTML = ""; paidInvoiceSection.hidden = true; list.innerHTML = `<p class="error">${escapeHtml(error.message || "This invoice link is unavailable.")}</p>`; });

document.addEventListener("click", (event) => {
  const unpaidButton = event.target.closest("[data-client-unpaid]");
  if (unpaidButton) {
    clearClientPayment(unpaidButton);
    return;
  }
  const paymentButton = event.target.closest("[data-client-paid]");
  if (paymentButton) {
    submitClientPayment(paymentButton);
    return;
  }
  const button = event.target.closest("[data-invoice-toggle]");
  if (!button) return;
  const content = document.querySelector(`#${button.getAttribute("aria-controls")}`);
  if (!content) return;
  const willShow = content.hidden;
  content.hidden = !willShow;
  button.setAttribute("aria-expanded", String(willShow));
  button.textContent = willShow ? "Hide invoices" : "Show invoices";
});

async function submitClientPayment(button) {
  const row = button.closest("tr");
  const paidDate = row?.querySelector("[data-client-paid-date]")?.value || "";
  const note = row?.querySelector("[data-client-payment-note]")?.value.trim() || "";
  const access = new URLSearchParams(location.search).get("access") || "";
  if (!access || !paidDate) return;
  button.disabled = true;
  button.textContent = "Saving…";
  try {
    const response = await fetch("./api/client-payment-status", { method:"POST", headers:{ "Content-Type":"application/json" }, body:JSON.stringify({ access, invoiceNumber:button.dataset.clientPaid, paidDate, note }) });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Unable to save the payment confirmation.");
    const container = button.closest("td");
    container.innerHTML = reportedPayment(data.paidDate, data.note, data.invoiceNumber);
  } catch (error) {
    button.disabled = false;
    button.textContent = "Mark paid";
    window.alert(error.message || "Unable to save the payment confirmation.");
  }
}

async function clearClientPayment(button) {
  if (!window.confirm("Mark this client payment confirmation as unpaid? This will not change Eastern Home Service’s main payment record.")) return;
  const access = new URLSearchParams(location.search).get("access") || "";
  if (!access) return;
  button.disabled = true;
  button.textContent = "Saving…";
  try {
    const response = await fetch("./api/client-payment-status", { method:"DELETE", headers:{ "Content-Type":"application/json" }, body:JSON.stringify({ access, invoiceNumber:button.dataset.clientUnpaid }) });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Unable to clear the payment confirmation.");
    button.closest("td").innerHTML = clientPaymentControl({ invoiceNumber:data.invoiceNumber });
  } catch (error) {
    button.disabled = false;
    button.textContent = "Mark unpaid";
    window.alert(error.message || "Unable to clear the payment confirmation.");
  }
}

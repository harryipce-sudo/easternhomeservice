const list = document.querySelector("#invoice-list");
const copy = document.querySelector("#portal-copy");
const paidInvoiceSection = document.querySelector("#paid-invoice-section");
const paidInvoiceCopy = document.querySelector("#paid-invoice-copy");
const paidInvoiceList = document.querySelector("#paid-invoice-list");
const money = new Intl.NumberFormat("en-AU", { style:"currency", currency:"AUD" });
const escapeHtml = (value) => String(value ?? "").replace(/[&<>\"']/g, (character) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" })[character]);
const dateLabel = (value) => /^\d{4}-\d{2}-\d{2}$/.test(String(value || "")) ? new Date(`${value}T00:00:00`).toLocaleDateString("en-AU", { day:"numeric", month:"short", year:"numeric" }) : "Date not available";

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
  list.innerHTML = data.invoices.length ? `<table class="invoice-table"><thead><tr><th>Invoice no.</th><th>Client name</th><th>Address</th><th>Invoice date</th><th>Invoice amount</th><th>Referral %</th><th>Referral payable</th></tr></thead><tbody>${data.invoices.map((invoice) => `<tr><td class="invoice-number">${escapeHtml(invoice.invoiceNumber || "Invoice")}</td><td>${escapeHtml(data.clientName)}</td><td class="invoice-address">${escapeHtml(invoice.address)}</td><td class="invoice-date">${escapeHtml(dateLabel(invoice.invoiceDate))}</td><td class="invoice-amount">${money.format(invoice.amount)}</td><td class="referral-percentage">${Number(invoice.referralPercentage) > 0 ? `${Number(invoice.referralPercentage).toFixed(1)}%` : "—"}</td><td class="invoice-amount">${money.format(invoice.referralFee)}</td></tr><tr class="detail-row"><td colspan="7"><details><summary>View invoice details</summary><p class="invoice-detail">${escapeHtml(invoice.detail || "No additional invoice details.")}</p></details></td></tr>`).join("")}</tbody></table>` : '<p class="empty">There are no unpaid invoices at this time.</p>';
  paidInvoiceSection.hidden = !paidInvoices.length;
  if (paidInvoices.length) {
    paidInvoiceCopy.textContent = `${paidInvoices.length} paid invoice${paidInvoices.length === 1 ? "" : "s"} · Total referral payable ${money.format(referralTotal)} including GST`;
    paidInvoiceList.innerHTML = `<table class="invoice-table paid-invoice-table"><thead><tr><th>Invoice no.</th><th>Address</th><th>Payment status</th><th>Paid date</th><th>Invoice amount</th><th>Referral %</th><th>Referral payable</th></tr></thead><tbody>${paidInvoices.map((invoice) => `<tr><td class="invoice-number">${escapeHtml(invoice.invoiceNumber || "Invoice")}</td><td class="invoice-address">${escapeHtml(invoice.address)}</td><td class="paid-status">Paid</td><td class="invoice-date">${invoice.paymentDate ? escapeHtml(dateLabel(invoice.paymentDate)) : "—"}</td><td class="invoice-amount">${money.format(invoice.amount)}</td><td class="referral-percentage">${Number(invoice.referralPercentage) > 0 ? `${Number(invoice.referralPercentage).toFixed(1)}%` : "—"}</td><td class="invoice-amount">${money.format(invoice.referralFee)}</td></tr><tr class="detail-row"><td colspan="7"><details><summary>View invoice details</summary><p class="invoice-detail">${escapeHtml(invoice.detail || "No additional invoice details.")}</p></details></td></tr>`).join("")}</tbody></table>`;
  }
}

loadInvoices().catch((error) => { copy.textContent = ""; document.querySelector("#invoice-totals").innerHTML = ""; paidInvoiceSection.hidden = true; list.innerHTML = `<p class="error">${escapeHtml(error.message || "This invoice link is unavailable.")}</p>`; });

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-invoice-toggle]");
  if (!button) return;
  const content = document.querySelector(`#${button.getAttribute("aria-controls")}`);
  if (!content) return;
  const willShow = content.hidden;
  content.hidden = !willShow;
  button.setAttribute("aria-expanded", String(willShow));
  button.textContent = willShow ? "Hide invoices" : "Show invoices";
});

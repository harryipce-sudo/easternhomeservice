const list = document.querySelector("#invoice-list");
const copy = document.querySelector("#portal-copy");
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
  copy.textContent = `${data.clientName} · ${data.invoices.length} unpaid invoice${data.invoices.length === 1 ? "" : "s"}`;
  document.querySelector("#invoice-totals").innerHTML = `<article><span>Total invoice payment due</span><strong>${money.format(invoiceTotal)}</strong><small>Including GST</small></article><article class="referral-total"><span>Total referral fee</span><strong>${money.format(referralTotal)}</strong><small>Including GST</small></article>`;
  list.innerHTML = data.invoices.length ? `<table class="invoice-table"><thead><tr><th>Invoice no.</th><th>Client name</th><th>Address</th><th>Invoice date</th><th>Referral fee</th><th>Invoice amount</th></tr></thead><tbody>${data.invoices.map((invoice) => `<tr><td class="invoice-number">${escapeHtml(invoice.invoiceNumber || "Invoice")}</td><td>${escapeHtml(data.clientName)}</td><td class="invoice-address">${escapeHtml(invoice.address)}</td><td class="invoice-date">${escapeHtml(dateLabel(invoice.invoiceDate))}</td><td class="invoice-referral">${money.format(Number(invoice.referralFee) || 0)}</td><td class="invoice-amount">${money.format(invoice.amount)}</td></tr><tr class="detail-row"><td colspan="6"><details><summary>View invoice details</summary><p class="invoice-detail">${escapeHtml(invoice.detail || "No additional invoice details.")}</p></details></td></tr>`).join("")}</tbody></table>` : '<p class="empty">There are no unpaid invoices at this time.</p>';
}

loadInvoices().catch((error) => { copy.textContent = ""; document.querySelector("#invoice-totals").innerHTML = ""; list.innerHTML = `<p class="error">${escapeHtml(error.message || "This invoice link is unavailable.")}</p>`; });

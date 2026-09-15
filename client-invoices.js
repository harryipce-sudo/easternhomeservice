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
  copy.textContent = `${data.clientName} · ${data.invoices.length} unpaid invoice${data.invoices.length === 1 ? "" : "s"}`;
  list.innerHTML = data.invoices.length ? data.invoices.map((invoice) => `<article class="invoice-card"><div><h2 class="invoice-number">${escapeHtml(invoice.invoiceNumber || "Invoice")}</h2><p class="invoice-address">${escapeHtml(invoice.address)}</p><p class="invoice-meta">Invoice date: ${escapeHtml(dateLabel(invoice.invoiceDate))}</p></div><strong class="invoice-amount">${money.format(invoice.amount)}</strong><details><summary>View invoice details</summary><p class="invoice-detail">${escapeHtml(invoice.detail || "No additional invoice details.")}</p></details></article>`).join("") : '<p class="empty">There are no unpaid invoices at this time.</p>';
}

loadInvoices().catch((error) => { copy.textContent = ""; list.innerHTML = `<p class="error">${escapeHtml(error.message || "This invoice link is unavailable.")}</p>`; });

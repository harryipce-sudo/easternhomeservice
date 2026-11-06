const list = document.querySelector("#invoice-list");
const copy = document.querySelector("#portal-copy");
const paidInvoiceSection = document.querySelector("#paid-invoice-section");
const paidInvoiceCopy = document.querySelector("#paid-invoice-copy");
const paidInvoiceList = document.querySelector("#paid-invoice-list");
const money = new Intl.NumberFormat("en-AU", { style:"currency", currency:"AUD" });
const tableSort = {
  unpaid:{ key:"invoiceDate", direction:"desc" },
  paid:{ key:"paymentDate", direction:"desc" }
};
const escapeHtml = (value) => String(value ?? "").replace(/[&<>\"']/g, (character) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" })[character]);
// A compact dash keeps empty invoice and due-date cells clear on smaller screens.
const dateLabel = (value) => /^\d{4}-\d{2}-\d{2}$/.test(String(value || "")) ? new Date(`${value}T00:00:00`).toLocaleDateString("en-AU", { day:"numeric", month:"short", year:"numeric" }) : "—";
const overdueInfo = (invoice) => {
  if (invoice.payment === "paid" || !/^\d{4}-\d{2}-\d{2}$/.test(String(invoice.dueDate || ""))) return { late:false, days:0 };
  const dueDate = new Date(`${invoice.dueDate}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const days = Math.floor((today - dueDate) / 86400000);
  return { late:days > 0, days:Math.max(0, days) };
};
const invoiceStatus = (invoice) => { const overdue = overdueInfo(invoice); return overdue.late ? `<span class="invoice-status late">Late · ${overdue.days} day${overdue.days === 1 ? "" : "s"}</span>` : `<span class="invoice-status">Unpaid</span>`; };
const reportedPayment = (paidDate, note = "", invoiceNumber = "") => `<div class="client-payment-reported">Client reported paid<br><small>${escapeHtml(dateLabel(paidDate))}${note ? `<br>${escapeHtml(note)}` : ""}</small><button type="button" data-client-unpaid="${escapeHtml(invoiceNumber)}">Mark unpaid</button></div>`;
const invoiceLinks = (invoiceNumber, access) => {
  const base = `./api/client-invoice-pdf?access=${encodeURIComponent(access)}&invoice=${encodeURIComponent(invoiceNumber)}`;
  return `<div class="invoice-document-actions"><a class="invoice-view" href="${base}&view=1" target="_blank" rel="noopener">View online</a><a class="invoice-download" href="${base}">Download PDF</a></div>`;
};
const clientPaymentControl = (invoice, access) => invoice.clientReportedPaidDate
  ? reportedPayment(invoice.clientReportedPaidDate, invoice.clientReportedPaymentNote, invoice.invoiceNumber)
  : `<label class="client-payment-control"><span>Paid date <b aria-hidden="true">*</b></span><input type="date" data-client-paid-date required><textarea data-client-payment-note maxlength="1000" placeholder="Optional payment or invoice note"></textarea><button type="button" data-client-paid="${escapeHtml(invoice.invoiceNumber)}">Mark paid</button>${invoiceLinks(invoice.invoiceNumber, access)}</label>`;
const sortValue = (invoice, key, clientName = "") => {
  if (key === "clientName") return clientName;
  if (key === "status") return overdueInfo(invoice).late ? 1 : 0;
  if (key === "clientPayment") return invoice.clientReportedPaidDate || "";
  if (key === "paymentDate") return invoice.paymentDate || "";
  if (["amount", "referralPercentage", "referralFee"].includes(key)) return Number(invoice[key]) || 0;
  return String(invoice[key] || "").trim().toLowerCase();
};
const sortedInvoices = (invoices, table, clientName = "") => {
  const { key, direction } = tableSort[table];
  const multiplier = direction === "asc" ? 1 : -1;
  return [...invoices].sort((left, right) => {
    const a = sortValue(left, key, clientName);
    const b = sortValue(right, key, clientName);
    if (a === "" && b !== "") return 1;
    if (b === "" && a !== "") return -1;
    if (typeof a === "number" && typeof b === "number") return (a - b) * multiplier;
    return String(a).localeCompare(String(b), "en-AU", { numeric:true, sensitivity:"base" }) * multiplier;
  });
};
const sortableHeader = (table, key, label) => {
  const active = tableSort[table].key === key;
  const direction = active ? tableSort[table].direction : "none";
  const indicator = active ? (direction === "asc" ? "▲" : "▼") : "↕";
  const ariaSort = active ? (direction === "asc" ? "ascending" : "descending") : "none";
  return `<th aria-sort="${ariaSort}"><button class="table-sort-button" type="button" data-table-sort="${table}" data-sort-key="${key}">${label}<span aria-hidden="true">${indicator}</span></button></th>`;
};

async function loadInvoices() {
  const access = new URLSearchParams(location.search).get("access") || "";
  if (!access) throw new Error("This invoice link is unavailable.");
  const response = await fetch(`./api/client-invoices?access=${encodeURIComponent(access)}`, { cache:"no-store" });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "This invoice link is unavailable.");
  const invoiceTotal = Number(data.totalAmount) || 0;
  const referralTotal = Number(data.totalReferralFee) || 0;
  const unpaidReferralInvoiceCount = Number(data.unpaidReferralInvoiceCount) || 0;
  const paidInvoices = Array.isArray(data.paidInvoices) ? data.paidInvoices : [];
  const unpaidInvoices = Array.isArray(data.invoices) ? data.invoices : [];
  const overdueInvoices = unpaidInvoices.filter((invoice) => overdueInfo(invoice).late);
  const overdueTotal = overdueInvoices.reduce((sum, invoice) => sum + Number(invoice.amount || 0), 0);
  const sortedUnpaidInvoices = sortedInvoices(unpaidInvoices, "unpaid", data.clientName);
  const sortedPaidInvoices = sortedInvoices(paidInvoices, "paid", data.clientName);
  copy.textContent = `${data.clientName} · ${unpaidInvoices.length} unpaid invoice${unpaidInvoices.length === 1 ? "" : "s"} · ${overdueInvoices.length} late`;
  document.querySelector("#invoice-totals").innerHTML = `<article><span>Total invoice payment due</span><strong>${money.format(invoiceTotal)}</strong><small>${unpaidInvoices.length} unpaid invoice${unpaidInvoices.length === 1 ? "" : "s"} · Including GST</small></article><article class="late-total"><span>Late unpaid invoices</span><strong>${overdueInvoices.length}</strong><small>${money.format(overdueTotal)} including GST</small></article><article class="referral-total"><span>Total referral payable</span><strong>${money.format(referralTotal)}</strong><small>${unpaidReferralInvoiceCount} unpaid invoice${unpaidReferralInvoiceCount === 1 ? "" : "s"} · Including GST</small></article>`;
  list.innerHTML = unpaidInvoices.length ? `<table class="invoice-table"><thead><tr>${sortableHeader("unpaid", "invoiceNumber", "Invoice no.")}${sortableHeader("unpaid", "clientName", "Client name")}${sortableHeader("unpaid", "address", "Address")}${sortableHeader("unpaid", "invoiceDate", "Invoice date")}${sortableHeader("unpaid", "dueDate", "Due date")}${sortableHeader("unpaid", "status", "Status")}${sortableHeader("unpaid", "amount", "Invoice amount")}${sortableHeader("unpaid", "referralPercentage", "Referral %")}${sortableHeader("unpaid", "referralFee", "Referral payable")}${sortableHeader("unpaid", "clientPayment", "Client payment")}</tr></thead><tbody>${sortedUnpaidInvoices.map((invoice) => `<tr class="${overdueInfo(invoice).late ? "late-row" : ""}"><td class="invoice-number">${escapeHtml(invoice.invoiceNumber || "Invoice")}</td><td>${escapeHtml(data.clientName)}</td><td class="invoice-address">${escapeHtml(invoice.address)}</td><td class="invoice-date">${escapeHtml(dateLabel(invoice.invoiceDate))}</td><td class="invoice-date">${escapeHtml(dateLabel(invoice.dueDate))}</td><td>${invoiceStatus(invoice)}</td><td class="invoice-amount">${money.format(invoice.amount)}</td><td class="referral-percentage">${Number(invoice.referralPercentage) > 0 ? `${Number(invoice.referralPercentage).toFixed(1)}%` : "—"}</td><td class="invoice-amount">${money.format(invoice.referralFee)}</td><td>${clientPaymentControl(invoice, access)}</td></tr><tr class="detail-row ${overdueInfo(invoice).late ? "late-row" : ""}"><td colspan="10"><details><summary>View invoice details</summary><p class="invoice-detail">${escapeHtml(invoice.detail || "No additional invoice details.")}</p></details></td></tr>`).join("")}</tbody></table>` : '<p class="empty">There are no unpaid invoices at this time.</p>';
  paidInvoiceSection.hidden = !paidInvoices.length;
  if (paidInvoices.length) {
    paidInvoiceCopy.textContent = `${paidInvoices.length} paid invoice${paidInvoices.length === 1 ? "" : "s"}.`;
    paidInvoiceList.innerHTML = `<table class="invoice-table paid-invoice-table"><thead><tr>${sortableHeader("paid", "invoiceNumber", "Invoice no.")}${sortableHeader("paid", "address", "Address")}${sortableHeader("paid", "status", "Payment status")}${sortableHeader("paid", "paymentDate", "Paid date")}${sortableHeader("paid", "amount", "Invoice amount")}${sortableHeader("paid", "referralPercentage", "Referral %")}${sortableHeader("paid", "referralFee", "Referral payable")}</tr></thead><tbody>${sortedPaidInvoices.map((invoice) => `<tr><td class="invoice-number">${escapeHtml(invoice.invoiceNumber || "Invoice")}</td><td class="invoice-address">${escapeHtml(invoice.address)}</td><td class="paid-status">Paid</td><td class="invoice-date">${invoice.paymentDate ? escapeHtml(dateLabel(invoice.paymentDate)) : "—"}</td><td class="invoice-amount">${money.format(invoice.amount)}</td><td class="referral-percentage">${Number(invoice.referralPercentage) > 0 ? `${Number(invoice.referralPercentage).toFixed(1)}%` : "—"}</td><td class="invoice-amount">${money.format(invoice.referralFee)}</td></tr><tr class="detail-row"><td colspan="7"><details><summary>View invoice details</summary><p class="invoice-detail">${escapeHtml(invoice.detail || "No additional invoice details.")}</p>${invoiceLinks(invoice.invoiceNumber, access)}</details></td></tr>`).join("")}</tbody></table>`;
  }
}

loadInvoices().catch((error) => { copy.textContent = ""; document.querySelector("#invoice-totals").innerHTML = ""; paidInvoiceSection.hidden = true; list.innerHTML = `<p class="error">${escapeHtml(error.message || "This invoice link is unavailable.")}</p>`; });

const hasClientPaymentDraft = () => [...document.querySelectorAll("[data-client-paid-date], [data-client-payment-note]")].some((field) => String(field.value || "").trim());
const syncClientPortal = () => {
  if (document.hidden || hasClientPaymentDraft()) return;
  loadInvoices().catch(() => {});
};
document.addEventListener("visibilitychange", () => { if (!document.hidden) syncClientPortal(); });
window.setInterval(syncClientPortal, 30000);

document.addEventListener("click", (event) => {
  const sortButton = event.target.closest("[data-table-sort]");
  if (sortButton) {
    if (hasClientPaymentDraft()) {
      window.alert("Finish or clear the payment entry before sorting, so no typed payment details are lost.");
      return;
    }
    const table = sortButton.dataset.tableSort;
    const key = sortButton.dataset.sortKey;
    if (!tableSort[table] || !key) return;
    tableSort[table] = tableSort[table].key === key
      ? { key, direction:tableSort[table].direction === "asc" ? "desc" : "asc" }
      : { key, direction:"asc" };
    loadInvoices().catch(() => {});
    return;
  }
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
  if (!access) return;
  if (!paidDate) {
    window.alert("Please enter the date this invoice was paid.");
    row?.querySelector("[data-client-paid-date]")?.focus();
    return;
  }
  button.disabled = true;
  button.textContent = "Saving…";
  try {
    const response = await fetch("./api/client-payment-status", { method:"POST", headers:{ "Content-Type":"application/json" }, body:JSON.stringify({ access, invoiceNumber:button.dataset.clientPaid, paidDate, note }) });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Unable to save the payment confirmation.");
    await loadInvoices();
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
    await loadInvoices();
  } catch (error) {
    button.disabled = false;
    button.textContent = "Mark unpaid";
    window.alert(error.message || "Unable to clear the payment confirmation.");
  }
}

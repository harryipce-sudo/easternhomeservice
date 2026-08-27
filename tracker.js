const API = "./api/quote-records";
const savedView = (() => {
  try { return localStorage.getItem("tracker-view") || "jobs"; } catch { return "jobs"; }
})();
const state = { records: [], search: "", sort: "newest", view: savedView, layout: "board", selected: null, drawerStage: "quoted", expandedGroups: new Set() };
const $ = (selector) => document.querySelector(selector);
const currency = (value) => new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD" }).format(Number(value) || 0);
const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (character) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" })[character]);
const normalise = (record) => {
  const job = record.job && typeof record.job === "object" ? record.job : {};
  return { ...record, job: { number: job.number || record.quoteNumber || "", detail: job.detail || job.description || "", quote: Number(job.quote ?? String(record.totalQuote || "").replace(/[^0-9.-]/g, "")) || 0, markup: Number(job.markup) || 0, markupStatus: job.markupStatus || (Number(job.markup) > 0 ? "included" : "not-recorded"), status: job.status || record.jobStage || "quoted", payment: job.payment === "pending" ? "unpaid" : (job.payment || "unpaid"), paymentDate: job.paymentDate || "", referral: job.referral || "pending", invoiceNumber: job.invoiceNumber || "", invoiceDate: job.invoiceDate || "", scheduledDate: job.scheduledDate || "", archived: job.archived === true, groupKey: job.groupKey || "", boardOrder: Number.isFinite(Number(job.boardOrder)) ? Number(job.boardOrder) : null } };
};
async function request(path = "", options = {}) { const response = await fetch(`${API}${path}`, { headers: { "Content-Type":"application/json", ...(options.headers || {}) }, ...options }); if (!response.ok) throw new Error(await response.text()); return response.status === 204 ? null : response.json(); }
async function loadRecords() { $("#sync-state").innerHTML = "<span></span> Syncing shared data"; try { state.records = (await request()).map(normalise); $("#sync-state").innerHTML = "<span></span> Shared data is up to date"; render(); } catch (error) { $("#sync-state").innerHTML = "<span></span> Offline — unable to sync"; render(); console.warn(error); } }
function activeRecords() { return state.records.filter((record) => !record.job.archived); }
// The invoice register follows invoice data, not the job-board lane. This keeps
// Odoo invoices visible even while their operational job is Scheduled/Confirmed.
function invoicedRecords(records = activeRecords()) { return records.filter((record) => /\d/.test(String(record.job.invoiceNumber || ""))); }
function filtered() { const term = state.search.trim().toLowerCase(); const items = activeRecords().filter((record) => { const j = record.job; return !term || [j.number,record.customerName,record.address,j.detail].some((value) => String(value || "").toLowerCase().includes(term)); }); return items.sort((a,b) => state.sort === "address" ? String(a.address).localeCompare(String(b.address)) : state.sort === "quote-high" ? b.job.quote-a.job.quote : state.sort === "status" ? a.job.status.localeCompare(b.job.status) : new Date(b.submittedAt)-new Date(a.submittedAt)); }
function boardRecords(records = filtered()) { return records.filter((record) => !(record.job.status === "invoiced" && record.job.payment === "paid")); }
function tag(value) { const label = value === "not-applicable" ? "Not applicable" : value.charAt(0).toUpperCase() + value.slice(1); return `<span class="tag ${escapeHtml(value)}">${escapeHtml(label)}</span>`; }
function paymentButton(record) { const value = record.job.payment === "paid" ? "paid" : "unpaid"; const label = value === "paid" ? "Paid" : "Unpaid"; return `<button class="tag payment-toggle ${value}" type="button" data-payment-toggle="${escapeHtml(record.id)}" aria-label="Change payment status for ${escapeHtml(record.address)}">${label}</button>`; }
function markupTag(job) { return job.markupStatus === "included" ? `<span class="markup-badge included">Markup included${job.markup ? ` · ${Number(job.markup).toFixed(1)}%` : ""}</span>` : `<span class="markup-badge not-recorded">No markup recorded</span>`; }
function renderJobs() { const items = filtered(); const boardItems = boardRecords(items); $("#jobs-body").innerHTML = items.map((record) => { const j = record.job; return `<tr data-id="${escapeHtml(record.id)}"><td>${escapeHtml(j.number)}</td><td class="address">${escapeHtml(record.address)}</td><td class="detail">${escapeHtml(j.detail || "—")}</td><td class="money">${currency(j.quote)}</td><td>${markupTag(j)}</td><td>${tag(j.status)}</td><td>${tag(j.payment)}</td><td>${tag(j.referral)}</td><td>${escapeHtml(j.invoiceNumber || "—")}</td><td>${escapeHtml(j.invoiceDate || "—")}</td></tr>`; }).join(""); $("#jobs-empty").style.display = items.length ? "none" : "block"; $("#result-count").textContent = `${boardItems.length} job${boardItems.length === 1 ? "" : "s"}`; $("#quote-total").textContent = currency(boardItems.filter((record) => record.job.status === "quoted").reduce((sum, record) => sum + record.job.quote, 0)); $("#invoice-total").textContent = currency(boardItems.filter((record) => record.job.status === "invoiced").reduce((sum, record) => sum + record.job.quote, 0)); }
const boardStages = ["quoted", "confirmed", "scheduled", "completed", "invoiced", "follow_up"];
const boardLabels = { quoted:"Quotes", confirmed:"Confirmed", scheduled:"Scheduled", completed:"Completed", invoiced:"Invoiced", follow_up:"Follow up" };
const cardDate = (value) => {
  if (!value) return "";
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat("en-AU", { day:"numeric", month:"short" }).format(date);
};
function boardOrder(record) { return Number.isFinite(record.job.boardOrder) ? record.job.boardOrder : -new Date(record.submittedAt).getTime(); }
function stageJobs(records, stage, exceptId = "") { return records.filter((record) => record.job.status === stage && record.id !== exceptId).sort((a, b) => boardOrder(a) - boardOrder(b)); }
function laneDropTarget(zone, clientY, movingId = "", movingGroupKey = "") {
  const cards = [...zone.querySelectorAll(":scope > .board-card[data-job-id], :scope > .board-group-card[data-group-key]")]
    .filter((card) => card.dataset.jobId !== movingId && card.dataset.groupKey !== movingGroupKey);
  const target = cards.find((card) => clientY < card.getBoundingClientRect().top + card.getBoundingClientRect().height / 2) || cards.at(-1);
  if (!target) return { stage: zone.dataset.stage, jobId:"", groupKey:"", after:true };
  const bounds = target.getBoundingClientRect();
  return { stage: zone.dataset.stage, jobId: target.dataset.jobId || "", groupKey: target.dataset.groupKey || "", after: clientY >= bounds.top + bounds.height / 2 };
}
function addressGroupKey(address) {
  return String(address || "").toLowerCase()
    .replace(/^\s*(for|lot)\s+/, "")
    .replace(/\bstreet\b/g, "st").replace(/\broad\b/g, "rd").replace(/\bboulevard\b/g, "bvd").replace(/\bavenue\b/g, "ave").replace(/\bplace\b/g, "pl").replace(/\bdrive\b/g, "dr")
    .replace(/\bvic\b/g, "").replace(/\baustralia\b/g, "").replace(/[^a-z0-9]/g, "");
}
const groupScope = (stage, key) => `${stage}::${key}`;
function renderCard(record, { hideDate = false } = {}) {
  return `<article class="board-card" draggable="true" data-job-id="${escapeHtml(record.id)}"><div class="board-card-top"><span>⠿ &nbsp;${escapeHtml(record.address && record.address !== "-" ? record.address : "Address not added")}</span><span>✎</span></div><div class="board-card-content">${record.job.scheduledDate && !hideDate ? `<span class="board-card-date">◷ ${escapeHtml(cardDate(record.job.scheduledDate))}</span>` : ""}<div class="board-card-bottom"><span>Quote</span><strong>${currency(record.job.quote)}</strong></div>${markupTag(record.job)}</div></article>`;
}
function renderGroupedCards(jobs, stage) {
  const groups = new Map();
  jobs.forEach((record) => {
    const key = record.job.groupKey;
    if (!key) return;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(record);
  });
  const groupedIds = new Set([...groups.values()].filter((items) => items.length > 1).flat().map((record) => record.id));
  const cards = [];
  jobs.forEach((record) => {
    if (!groupedIds.has(record.id)) {
      cards.push(renderCard(record));
      return;
    }
    const key = record.job.groupKey;
    const items = groups.get(key);
    if (items[0].id !== record.id) return;
    const expanded = state.expandedGroups.has(groupScope(stage, key));
    const total = items.reduce((sum, item) => sum + item.job.quote, 0);
    cards.push(`<article class="board-group-card" draggable="true" data-group-key="${escapeHtml(key)}" data-group-stage="${escapeHtml(stage)}"><div class="board-card-top"><span>⠿ &nbsp;${escapeHtml(record.address)}</span><span class="group-count">${items.length} cards</span></div><div class="board-card-content"><div class="board-card-bottom"><span>Total</span><strong>${currency(total)}</strong></div><small>Drag to move all cards · Right-click to ${expanded ? "collapse, ungroup or move" : "expand, ungroup or move"}</small></div></article>`);
    if (expanded) cards.push(`<div class="board-group-children">${items.map((item) => renderCard(item, { hideDate:true })).join("")}</div>`);
  });
  return cards.join("");
}
function renderBoard() {
  const scrollPositions = new Map([...document.querySelectorAll(".board-dropzone")].map((zone) => [zone.dataset.stage, zone.scrollTop]));
  const records = boardRecords();
  $("#job-board").innerHTML = boardStages.map((stage) => {
    const jobs = stageJobs(records, stage);
    const cards = jobs.length ? renderGroupedCards(jobs, stage) : `<div class="board-empty">Drop card here</div>`;
    return `<section class="board-column board-${stage}"><header class="board-head"><strong>${boardLabels[stage]} <span>${jobs.length}</span></strong><button class="lane-add" type="button" data-new-job-stage="${stage}">＋ Add job</button></header><div class="board-dropzone" data-stage="${stage}">${cards}</div><button class="lane-add lane-add-bottom" type="button" data-new-job-stage="${stage}">＋ Add job</button></section>`;
  }).join("");
  document.querySelectorAll(".board-dropzone").forEach((zone) => { zone.scrollTop = scrollPositions.get(zone.dataset.stage) || 0; });
}
function renderCalendar() { const scheduled = activeRecords().filter((record) => record.job.scheduledDate).sort((a,b) => String(a.job.scheduledDate).localeCompare(String(b.job.scheduledDate))); $("#calendar-grid").innerHTML = scheduled.length ? scheduled.map((record) => `<article class="calendar-item"><strong>${escapeHtml(record.job.number)} · ${escapeHtml(record.address)}</strong><span>${escapeHtml(record.job.scheduledDate)} · ${escapeHtml(record.job.detail || "Job scheduled")}</span></article>`).join("") : `<div class="empty" style="display:block">Add a scheduled date to a job to see it here.</div>`; }
function renderClients() { const clients = [...new Map(activeRecords().filter((r) => r.customerName && r.customerName !== "-").map((r) => [r.customerName, r])).values()]; $("#client-list").innerHTML = clients.map((record) => `<article class="client-item"><strong>${escapeHtml(record.customerName)}</strong><span>${escapeHtml(record.phone || "No phone")} · ${escapeHtml(record.address || "No address")}</span></article>`).join("") || `<div class="empty" style="display:block">Clients will appear when quotes are saved.</div>`; }
function renderTasks() { const active = activeRecords().filter((record) => !["completed"].includes(record.job.status)); $("#task-list").innerHTML = active.map((record) => `<article class="task-item"><strong>${escapeHtml(record.job.number)} · ${escapeHtml(record.address)}</strong><span>${escapeHtml(record.job.detail || "No job detail added")}</span><div class="task-meta"><em>${escapeHtml(record.job.status === "quoted" ? "Follow up quote" : record.job.status === "confirmed" ? "Schedule the job" : "Complete scheduled work")}</em><b>Quote ${currency(record.job.quote)}</b></div></article>`).join("") || `<div class="empty" style="display:block">No active tasks.</div>`; }
function renderReports() { const all = activeRecords(); const paid = all.filter((record) => record.job.payment === "paid"); $("#report-grid").innerHTML = `<article class="report-card"><span>Total quotations</span><strong>${currency(all.reduce((sum, r) => sum + r.job.quote, 0))}</strong></article><article class="report-card"><span>Paid jobs</span><strong>${paid.length}</strong></article><article class="report-card"><span>Completed jobs</span><strong>${all.filter((r) => r.job.status === "completed").length}</strong></article>`; }
function renderArchive() { const records = state.records.filter((record) => record.job.archived); $("#archive-body").innerHTML = records.map((record) => `<tr><td>${escapeHtml(record.job.number || "—")}</td><td class="address">${escapeHtml(record.address || "—")}</td><td class="detail">${escapeHtml(record.job.detail || "—")}</td><td>${tag(record.job.status)}</td><td class="money">${currency(record.job.quote)}</td><td><div class="archive-actions"><button class="quiet-button archive-restore" type="button" data-restore-card="${escapeHtml(record.id)}">Restore</button><button class="danger-button" type="button" data-delete-card="${escapeHtml(record.id)}">Permanently delete</button></div></td></tr>`).join("") || `<tr><td colspan="6" class="archive-empty">No archived cards.</td></tr>`; }
function render() { renderJobs(); renderBoard(); renderCalendar(); renderClients(); renderTasks(); renderReports(); renderQuotes(); renderArchive(); }
async function placeJob(id, status, index) {
  const record = state.records.find((item) => item.id === id);
  if (!record) return;
  const jobs = stageJobs(state.records, status, id);
  const before = jobs[index - 1];
  const after = jobs[index];
  const order = before && after ? (boardOrder(before) + boardOrder(after)) / 2 : before ? boardOrder(before) + 1 : after ? boardOrder(after) - 1 : -Date.now();
  const matchingAddressCards = record.job.status !== status
    ? jobs.filter((item) => addressGroupKey(item.address) === addressGroupKey(record.address))
    : [];
  const shouldGroup = matchingAddressCards.length > 0 && window.confirm(`There ${matchingAddressCards.length === 1 ? "is" : "are"} ${matchingAddressCards.length} card${matchingAddressCards.length === 1 ? "" : "s"} for this address in ${boardLabels[status]}. Group this job with ${matchingAddressCards.length === 1 ? "it" : "them"}?\n\nChoose Cancel to keep it as an individual card.`);
  const groupKey = shouldGroup ? addressGroupKey(record.address) : (status === record.job.status ? record.job.groupKey || "" : "");
  const relatedUpdates = shouldGroup ? matchingAddressCards.filter((item) => item.job.groupKey !== groupKey).map((item) => normalise({ ...item, job:{ ...item.job, groupKey } })) : [];
  const previous = state.records.filter((item) => item.id === id || relatedUpdates.some((updatedItem) => updatedItem.id === item.id));
  const updated = normalise({ ...record, jobStage: status, job: { ...record.job, status, groupKey, boardOrder: order } });
  state.records = state.records.map((item) => item.id === id ? updated : relatedUpdates.find((related) => related.id === item.id) || item);
  render();
  try {
    const saved = normalise(await request(`?id=${encodeURIComponent(id)}`, { method:"PATCH", body:JSON.stringify(updated) }));
    const groupedSaves = await Promise.all(relatedUpdates.map(async (related) => normalise(await request(`?id=${encodeURIComponent(related.id)}`, { method:"PATCH", body:JSON.stringify(related) }))));
    state.records = state.records.map((item) => item.id === id ? saved : groupedSaves.find((grouped) => grouped.id === item.id) || item);
    render();
  } catch (error) {
    state.records = state.records.map((item) => previous.find((previousItem) => previousItem.id === item.id) || item);
    render();
    window.alert("The job could not be moved in the shared tracker. Please try again.");
    console.warn(error);
  }
}
async function placeGroup(groupKey, sourceStage, status, index) {
  const group = stageJobs(state.records, sourceStage).filter((record) => record.job.groupKey === groupKey);
  if (group.length < 2) return;
  const groupIds = new Set(group.map((record) => record.id));
  const jobs = stageJobs(state.records, status).filter((record) => !groupIds.has(record.id));
  const before = jobs[index - 1];
  const after = jobs[index];
  const startOrder = before && after ? (boardOrder(before) + boardOrder(after)) / 2 : before ? boardOrder(before) + 1 : after ? boardOrder(after) - 1 : -Date.now();
  const updated = group.map((record, position) => normalise({
    ...record,
    jobStage: status,
    job: { ...record.job, status, groupKey, boardOrder: startOrder + position / 1000 }
  }));
  const updatedIds = new Set(updated.map((record) => record.id));
  const previous = state.records.filter((record) => updatedIds.has(record.id));
  state.records = state.records.map((record) => updated.find((item) => item.id === record.id) || record);
  if (status !== sourceStage) state.expandedGroups.delete(groupScope(sourceStage, groupKey));
  render();
  try {
    const saved = await Promise.all(updated.map(async (record) => normalise(await request(`?id=${encodeURIComponent(record.id)}`, { method:"PATCH", body:JSON.stringify(record) }))));
    state.records = state.records.map((record) => saved.find((item) => item.id === record.id) || record);
    render();
  } catch (error) {
    state.records = state.records.map((record) => previous.find((item) => item.id === record.id) || record);
    render();
    window.alert("The grouped cards could not be moved in the shared tracker. Please try again.");
    console.warn(error);
  }
}
async function ungroupCards(groupKey, stage) {
  const group = stageJobs(state.records, stage).filter((record) => record.job.groupKey === groupKey);
  if (group.length < 2) return;
  const updated = group.map((record) => normalise({ ...record, job:{ ...record.job, groupKey:"" } }));
  const updatedIds = new Set(updated.map((record) => record.id));
  const previous = state.records.filter((record) => updatedIds.has(record.id));
  state.records = state.records.map((record) => updated.find((item) => item.id === record.id) || record);
  state.expandedGroups.delete(groupScope(stage, groupKey));
  render();
  try {
    const saved = await Promise.all(updated.map(async (record) => normalise(await request(`?id=${encodeURIComponent(record.id)}`, { method:"PATCH", body:JSON.stringify(record) }))));
    state.records = state.records.map((record) => saved.find((item) => item.id === record.id) || record);
    render();
  } catch (error) {
    state.records = state.records.map((record) => previous.find((item) => item.id === record.id) || record);
    render();
    window.alert("The cards could not be ungrouped in the shared tracker. Please try again.");
    console.warn(error);
  }
}
async function archiveJob(id) {
  const record = state.records.find((item) => item.id === id);
  if (!record) return;
  const previous = record;
  const updated = normalise({ ...record, job: { ...record.job, archived: true } });
  state.records = state.records.map((item) => item.id === id ? updated : item);
  render();
  try {
    const saved = normalise(await request(`?id=${encodeURIComponent(id)}`, { method:"PATCH", body:JSON.stringify(updated) }));
    state.records = state.records.map((item) => item.id === id ? saved : item);
    render();
  } catch (error) {
    state.records = state.records.map((item) => item.id === id ? previous : item);
    render();
    window.alert("The card could not be archived. Please try again.");
    console.warn(error);
  }
}
async function restoreJob(id) {
  const record = state.records.find((item) => item.id === id);
  if (!record) return;
  const previous = record;
  const updated = normalise({ ...record, job: { ...record.job, archived: false } });
  state.records = state.records.map((item) => item.id === id ? updated : item);
  render();
  try {
    const saved = normalise(await request(`?id=${encodeURIComponent(id)}`, { method:"PATCH", body:JSON.stringify(updated) }));
    state.records = state.records.map((item) => item.id === id ? saved : item);
    render();
  } catch (error) {
    state.records = state.records.map((item) => item.id === id ? previous : item);
    render();
    window.alert("The card could not be restored. Please try again.");
    console.warn(error);
  }
}
async function permanentlyDeleteArchivedJob(id) {
  const record = state.records.find((item) => item.id === id);
  if (!record || !record.job.archived) return;
  const name = record.job.number || record.address || "this card";
  if (!window.confirm(`Permanently delete ${name}? This cannot be undone.`)) return;
  try {
    await request(`?id=${encodeURIComponent(id)}`, { method:"DELETE" });
    state.records = state.records.filter((item) => item.id !== id);
    render();
  } catch (error) {
    window.alert("The card could not be permanently deleted. Please try again.");
    console.warn(error);
  }
}
async function copyJob(id) {
  const original = state.records.find((item) => item.id === id);
  if (!original) return;
  const stage = original.job.status;
  const jobs = stageJobs(state.records, stage);
  const position = jobs.findIndex((item) => item.id === id);
  const next = jobs[position + 1];
  const order = next ? (boardOrder(original) + boardOrder(next)) / 2 : boardOrder(original) + 1;
  const number = original.job.number ? `${original.job.number} copy` : "Copy of job";
  const copied = normalise({ ...original, id:crypto.randomUUID(), submittedAt:new Date().toISOString(), quoteNumber:number, job:{ ...original.job, number, archived:false, boardOrder:order } });
  try {
    const saved = normalise(await request("", { method:"POST", body:JSON.stringify(copied) }));
    state.records = [saved, ...state.records];
    render();
  } catch (error) {
    window.alert("The card could not be copied. Please try again.");
    console.warn(error);
  }
}
async function setPayment(id, payment, paymentDate = "") {
  const record = state.records.find((item) => item.id === id);
  if (!record) return;
  const previous = record;
  const updated = normalise({ ...record, job: { ...record.job, payment, paymentDate } });
  state.records = state.records.map((item) => item.id === id ? updated : item);
  render();
  try {
    const saved = normalise(await request(`?id=${encodeURIComponent(id)}`, { method:"PATCH", body:JSON.stringify(updated) }));
    state.records = state.records.map((item) => item.id === id ? saved : item);
    render();
  } catch (error) {
    state.records = state.records.map((item) => item.id === id ? previous : item);
    render();
    window.alert("The payment status could not be changed. Please try again.");
    console.warn(error);
  }
}
function closePaymentDateModal() { $("#payment-date-modal").classList.remove("open"); state.paymentRecordId = null; }
function openPaymentDateModal(id) { const record = state.records.find((item) => item.id === id); if (!record) return; state.paymentRecordId = id; $("#payment-date").value = record.job.paymentDate || ""; $("#payment-date-modal").classList.add("open"); $("#payment-date").focus(); }
function togglePayment(id) { const record = state.records.find((item) => item.id === id); if (!record) return; if (record.job.payment === "paid") { setPayment(id, "unpaid", record.job.paymentDate || ""); return; } openPaymentDateModal(id); }
function closeCardMenu() { const menu = $("#card-menu"); if (menu) menu.classList.remove("open"); state.menuJobId = null; state.menuGroupKey = null; state.menuGroupStage = null; }
function openCardMenu(event, id) {
  const menu = $("#card-menu");
  state.menuJobId = id;
  $("#group-menu-toggle").hidden = true;
  $("#group-menu-ungroup").hidden = true;
  menu.classList.add("open");
  menu.style.visibility = "hidden";
  menu.style.left = "0px";
  menu.style.top = "0px";
  const bounds = menu.getBoundingClientRect();
  menu.style.left = `${Math.min(event.clientX, window.innerWidth - bounds.width - 8)}px`;
  menu.style.top = `${Math.min(event.clientY, window.innerHeight - bounds.height - 8)}px`;
  menu.style.visibility = "";
}
function openGroupMenu(event, key, stage) {
  const menu = $("#card-menu");
  state.menuJobId = null;
  state.menuGroupKey = key;
  state.menuGroupStage = stage;
  $("#group-menu-toggle").hidden = false;
  $("#group-menu-ungroup").hidden = false;
  $("#group-menu-toggle").textContent = state.expandedGroups.has(groupScope(stage, key)) ? "▴ Collapse group" : "▾ Expand group";
  menu.classList.add("open");
  menu.style.visibility = "hidden";
  menu.style.left = "0px";
  menu.style.top = "0px";
  const bounds = menu.getBoundingClientRect();
  menu.style.left = `${Math.min(event.clientX, window.innerWidth - bounds.width - 8)}px`;
  menu.style.top = `${Math.min(event.clientY, window.innerHeight - bounds.height - 8)}px`;
  menu.style.visibility = "";
}
function nextInvoiceNumber() { const highest = state.records.reduce((max, record) => { const match = String(record.job.invoiceNumber || "").match(/(\d+)(?!.*\d)/); return Math.max(max, match ? Number(match[1]) : 0); }, 1000); return `INV-${highest + 1}`; }
function updateTaxAmounts() { const quotation = Math.max(0, Number($("#job-quote").value) || 0); const gst = quotation * 0.1; const total = quotation + gst; $("#job-gst").value = gst.toFixed(2); $("#job-total").value = total.toFixed(2); return { quotation, gst, total }; }
function updateMarkupGst(amount) { $("#job-markup-gst").value = (Math.max(0, amount) / 11).toFixed(2); }
function updateMarkupAmount() { const { total: quote } = updateTaxAmounts(); const percentage = Number($("#job-markup").value) || 0; const amount = percentage > 0 ? quote - (quote / (1 + percentage / 100)) : 0; $("#job-markup-amount").value = amount.toFixed(2); updateMarkupGst(amount); }
function updateMarkupPercentage() { const { total: quote } = updateTaxAmounts(); const amount = Math.max(0, Number($("#job-markup-amount").value) || 0); const percentage = quote > amount && amount > 0 ? (amount / (quote - amount)) * 100 : 0; $("#job-markup").value = percentage.toFixed(1); updateMarkupGst(amount); }
function openDrawer(record = null, defaultStage = "quoted") { state.selected = record; const j = record?.job || {}; state.drawerStage = j.status || defaultStage; $("#drawer-title").textContent = record ? j.number || "Edit job" : "New job"; $("#record-id").value = record?.id || ""; $("#job-number").value = j.number || `J-${String(Date.now()).slice(-5)}`; $("#job-client").value = record?.customerName && record.customerName !== "-" ? record.customerName : ""; $("#job-address").value = record?.address && record.address !== "-" ? record.address : ""; $("#job-detail").value = j.detail || ""; $("#job-quote").value = j.quote ? (Number(j.quote) / 1.1).toFixed(2) : ""; updateTaxAmounts(); $("#job-markup").value = j.markup ?? 50; updateMarkupAmount(); $("#job-payment").value = j.payment === "paid" ? "paid" : "unpaid"; $("#job-referral").value = j.referral || "pending"; $("#job-invoice").value = j.invoiceNumber || nextInvoiceNumber(); $("#job-invoice-date").value = j.invoiceDate || ""; $("#job-scheduled-date").value = j.scheduledDate || ""; document.body.classList.add("drawer-open"); $("#drawer").classList.add("open"); $("#drawer").setAttribute("aria-hidden", "false"); }
function closeDrawer() { document.body.classList.remove("drawer-open"); $("#drawer").classList.remove("open"); $("#drawer").setAttribute("aria-hidden", "true"); }
function formRecord() { const base = state.selected ? { ...state.selected } : { id: crypto.randomUUID(), recordType:"general", sector:"General", submittedAt:new Date().toISOString(), phone:"", email:"", blindItems:[], curtainItems:[] }; const tax = updateTaxAmounts(); const quote = tax.total; const status = state.selected?.job?.status || state.drawerStage || "quoted"; const markup = Number($("#job-markup").value)||0; return { ...base, customerName: $("#job-client").value.trim() || "-", address: $("#job-address").value.trim(), quoteNumber: $("#job-number").value.trim(), totalQuote: currency(quote), subtotalExGst: currency(tax.quotation), gstTotal: currency(tax.gst), jobStage: status, job:{ number:$("#job-number").value.trim(), detail:$("#job-detail").value.trim(), quote, markup, markupStatus: markup > 0 ? "included" : "not-recorded", status, payment:$("#job-payment").value, referral:$("#job-referral").value, invoiceNumber:$("#job-invoice").value.trim() || nextInvoiceNumber(), invoiceDate:$("#job-invoice-date").value, scheduledDate:$("#job-scheduled-date").value, archived: state.selected?.job?.archived === true, groupKey: state.selected?.job?.groupKey || "", boardOrder: state.selected?.job?.boardOrder ?? undefined } }; }
async function saveJob(event) { event.preventDefault(); const record = formRecord(); try { const saved = normalise(await request(state.selected ? `?id=${encodeURIComponent(record.id)}` : "", { method: state.selected ? "PATCH" : "POST", body: JSON.stringify(record) })); state.records = state.selected ? state.records.map((item) => item.id === saved.id ? saved : item) : [saved, ...state.records]; closeDrawer(); render(); } catch (error) { window.alert("Unable to save this job to the shared tracker. Check the cloud connection and try again."); console.warn(error); } }
function renderQuotes() {
  const records = activeRecords();
  $("#quotes-body").innerHTML = records.map((record) => `<tr data-id="${escapeHtml(record.id)}"><td>${escapeHtml(record.job.number)}</td><td>${escapeHtml(record.address)}</td><td>${escapeHtml(record.job.detail || "—")}</td><td>${currency(record.job.quote)}</td><td>${tag(record.job.status)}</td></tr>`).join("") || `<tr><td colspan="5">No saved quotes yet.</td></tr>`;
  // Keep archived cards out of the invoice register as well as the board.
  // The register is based on real invoice numbers; it is independent from the
  // operational board lane and retains paid invoices as history.
  const invoices = invoicedRecords(records).sort((a, b) => Number(a.job.payment === "paid") - Number(b.job.payment === "paid"));
  const unpaid = invoices.filter((record) => record.job.payment !== "paid");
  const paid = invoices.filter((record) => record.job.payment === "paid");
  const unpaidTotal = unpaid.reduce((sum, record) => sum + record.job.quote, 0);
  const paidTotal = paid.reduce((sum, record) => sum + record.job.quote, 0);
  const total = invoices.length || 1;
  const invoiceKey = (value) => String(value || "").match(/\d+/g)?.join("") || "";
  const invoiceCounts = new Map();
  invoices.forEach((record) => { const key = invoiceKey(record.job.invoiceNumber); if (key) invoiceCounts.set(key, (invoiceCounts.get(key) || 0) + 1); });
  const reviewIssue = (record) => { const key = invoiceKey(record.job.invoiceNumber); return !key ? "Missing invoice number" : invoiceCounts.get(key) > 1 ? "Duplicate invoice number" : ""; };
  const orderedInvoices = [...invoices].sort((a, b) => Number(Boolean(reviewIssue(b))) - Number(Boolean(reviewIssue(a))) || Number(a.job.payment === "paid") - Number(b.job.payment === "paid"));
  // Scheduled and Confirmed jobs are managed on their own boards, not in invoice review.
  const needsBoardReview = [];
  $("#invoice-review-list").innerHTML = needsBoardReview.length ? `<article class="invoice-review-notice"><span>⚠</span><div><strong>${needsBoardReview.length} unpaid invoice${needsBoardReview.length === 1 ? " is" : "s are"} not on the Invoiced board</strong>${needsBoardReview.map((record) => `${escapeHtml(record.job.invoiceNumber)} · ${escapeHtml(record.address)} · ${escapeHtml(boardLabels[record.job.status] || record.job.status)}`).join("<br>")}</div></article>` : "";
  $("#invoice-summary").innerHTML = `<article class="invoice-metric unpaid"><span>Unpaid invoices</span><strong>${unpaid.length} job${unpaid.length === 1 ? "" : "s"}</strong><b>${currency(unpaidTotal)}</b></article><article class="invoice-metric paid"><span>Paid invoices</span><strong>${paid.length} job${paid.length === 1 ? "" : "s"}</strong><b>${currency(paidTotal)}</b></article><div class="invoice-payment-bar" aria-label="${unpaid.length} unpaid and ${paid.length} paid invoices"><span class="unpaid" style="width:${(unpaid.length / total) * 100}%"></span><span class="paid" style="width:${(paid.length / total) * 100}%"></span></div><div class="invoice-bar-legend"><span><i class="unpaid"></i>Unpaid: ${unpaid.length}</span><span><i class="paid"></i>Paid: ${paid.length}</span></div>`;
  $("#invoices-body").innerHTML = orderedInvoices.map((record) => { const key = invoiceKey(record.job.invoiceNumber); const issue = reviewIssue(record); const issueClass = !key ? "invoice-review-missing" : invoiceCounts.get(key) > 1 ? "invoice-review-duplicate" : issue ? "invoice-review-odoo" : ""; return `<tr class="${issueClass}" data-id="${escapeHtml(record.id)}"><td>${escapeHtml(record.job.invoiceNumber || "—")}${issue ? `<span class="invoice-review-badge">${escapeHtml(issue)}</span>` : ""}</td><td>${escapeHtml(record.job.number)}</td><td>${escapeHtml(record.address)}</td><td>${escapeHtml(record.job.invoiceDate || "—")}</td><td>${escapeHtml(record.job.payment === "paid" ? record.job.paymentDate || "—" : "—")}</td><td>${paymentButton(record)}</td><td>${currency(record.job.quote)}</td></tr>`; }).join("") || `<tr><td colspan="7">No invoices recorded yet.</td></tr>`;
}
function setView(view) { state.view = view; try { localStorage.setItem("tracker-view", view); } catch {} document.querySelectorAll(".nav-link[data-view]").forEach((button) => button.classList.toggle("active", button.dataset.view === view)); document.querySelectorAll(".view").forEach((section) => section.classList.toggle("active", section.id === `view-${view}`)); const labels = { jobs:["Job Board","All work in one shared job register."],calendar:["Calendar","Scheduled jobs from the shared register."],clients:["Clients","All clients from saved quotes."],quotes:["Quotes","Every quote in the shared register."],invoices:["Invoices","Completed or invoiced jobs from the shared register."],archive:["Archive","Archived cards are kept here until you restore them."],tasks:["Tasks","The next actions for active jobs."],reports:["Reports","Live job and payment summaries."],settings:["Settings","Shared tracker settings."] }; $("#page-title").textContent = labels[view][0]; $("#page-description").textContent = labels[view][1]; $("#add-job").style.display = view === "jobs" ? "inline-block" : "none"; if (view === "quotes" || view === "invoices") renderQuotes(); if (view === "archive") renderArchive(); }
document.addEventListener("DOMContentLoaded", () => { $("#search").addEventListener("input", (e) => { state.search = e.target.value; render(); }); $("#sort").addEventListener("change", (e) => { state.sort=e.target.value; render(); }); $("#jobs-body").addEventListener("click", (e) => { const row=e.target.closest("tr[data-id]"); if(row) openDrawer(state.records.find((record)=>record.id===row.dataset.id)); }); $("#invoices-body").addEventListener("click", (e) => { const control = e.target.closest("[data-payment-toggle]"); if (control) togglePayment(control.dataset.paymentToggle); }); $("#archive-body").addEventListener("click", (e) => { const deleteControl = e.target.closest("[data-delete-card]"); const restoreControl = e.target.closest("[data-restore-card]"); if (deleteControl) permanentlyDeleteArchivedJob(deleteControl.dataset.deleteCard); else if (restoreControl) restoreJob(restoreControl.dataset.restoreCard); }); $("#payment-date-cancel").addEventListener("click",closePaymentDateModal); $("#payment-date-skip").addEventListener("click",()=>{ const id = state.paymentRecordId; closePaymentDateModal(); if (id) setPayment(id,"paid",""); }); $("#payment-date-save").addEventListener("click",()=>{ const id = state.paymentRecordId; const date = $("#payment-date").value; closePaymentDateModal(); if (id) setPayment(id,"paid",date); }); $("#add-job").addEventListener("click",()=>openDrawer()); $("#close-drawer").addEventListener("click",closeDrawer); $("#cancel-edit").addEventListener("click",closeDrawer); $("#job-form").addEventListener("submit",saveJob); $("#job-quote").addEventListener("input", updateMarkupAmount); $("#job-markup").addEventListener("input", updateMarkupAmount); $("#job-markup-amount").addEventListener("input", updateMarkupPercentage); $("#refresh-button").addEventListener("click",loadRecords); $("#sidebar-toggle").addEventListener("click", () => { const open = document.body.classList.toggle("sidebar-open"); $("#sidebar-toggle").setAttribute("aria-expanded", String(open)); $("#sidebar-toggle").setAttribute("aria-label", open ? "Hide sidebar" : "Show sidebar"); $("#sidebar-toggle").textContent = open ? "‹" : "›"; }); document.querySelectorAll(".nav-link[data-view]").forEach((button)=>button.addEventListener("click",()=>setView(button.dataset.view))); setView(state.view); loadRecords(); window.setInterval(loadRecords, 30000); });
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-layout]").forEach((button) => button.addEventListener("click", () => {
    state.layout = button.dataset.layout;
    document.querySelectorAll("[data-layout]").forEach((item) => item.classList.toggle("active", item === button));
    $("#table-layout").classList.toggle("active", state.layout === "table");
    $("#board-layout").classList.toggle("active", state.layout === "board");
  }));
  $("#job-board").addEventListener("dragstart", (event) => {
    state.dropTarget = null;
    const group = event.target.closest(".board-group-card[data-group-key]");
    if (group) {
      state.draggingGroupKey = group.dataset.groupKey;
      state.draggingGroupStage = group.dataset.groupStage;
      group.classList.add("dragging");
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("application/x-tracker-group", group.dataset.groupKey);
      return;
    }
    const card = event.target.closest("[data-job-id]");
    if (!card) return;
    state.draggingId = card.dataset.jobId;
    card.classList.add("dragging");
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", card.dataset.jobId);
  });
  $("#job-board").addEventListener("dragend", () => {
    state.draggingId = null;
    state.draggingGroupKey = null;
    state.draggingGroupStage = null;
    state.dropTarget = null;
    document.querySelectorAll(".dragging,.drag-over,.drop-before,.drop-after").forEach((element) => element.classList.remove("dragging", "drag-over", "drop-before", "drop-after"));
  });
  $("#job-board").addEventListener("dragover", (event) => {
    const zone = event.target.closest("[data-stage]");
    if (!zone) return;
    event.preventDefault();
    zone.classList.add("drag-over");
    document.querySelectorAll(".drop-before,.drop-after").forEach((element) => element.classList.remove("drop-before", "drop-after"));
    state.dropTarget = laneDropTarget(zone, event.clientY, state.draggingId, state.draggingGroupKey);
    const target = state.dropTarget.jobId
      ? zone.querySelector(`:scope > .board-card[data-job-id="${CSS.escape(state.dropTarget.jobId)}"]`)
      : state.dropTarget.groupKey
        ? zone.querySelector(`:scope > .board-group-card[data-group-key="${CSS.escape(state.dropTarget.groupKey)}"]`)
        : null;
    if (target) {
      target.classList.add(state.dropTarget.after ? "drop-after" : "drop-before");
    }
  });
  $("#job-board").addEventListener("dragleave", (event) => {
    const zone = event.target.closest("[data-stage]");
    if (zone && !zone.contains(event.relatedTarget)) zone.classList.remove("drag-over");
  });
  $("#job-board").addEventListener("drop", (event) => {
    const zone = event.target.closest("[data-stage]");
    if (!zone) return;
    event.preventDefault();
    zone.classList.remove("drag-over");
    const groupKey = event.dataTransfer.getData("application/x-tracker-group") || state.draggingGroupKey;
    const id = event.dataTransfer.getData("text/plain") || state.draggingId;
    const dropTarget = laneDropTarget(zone, event.clientY, id, groupKey);
    if (groupKey) {
      const sourceStage = state.draggingGroupStage || "invoiced";
      const movingIds = new Set(stageJobs(state.records, sourceStage).filter((record) => record.job.groupKey === groupKey).map((record) => record.id));
      const jobs = stageJobs(state.records, zone.dataset.stage).filter((record) => !movingIds.has(record.id));
      let index = jobs.length;
      if (dropTarget.jobId) {
        const targetIndex = jobs.findIndex((record) => record.id === dropTarget.jobId);
        index = targetIndex + (dropTarget.after ? 1 : 0);
      } else if (dropTarget.groupKey) {
        const targetGroup = stageJobs(state.records, zone.dataset.stage).filter((record) => record.job.groupKey === dropTarget.groupKey && !movingIds.has(record.id));
        const targetIndex = jobs.findIndex((record) => record.id === targetGroup[0]?.id);
        index = targetIndex + (dropTarget.after ? targetGroup.length : 0);
      }
      if (sourceStage === zone.dataset.stage && !dropTarget.jobId && !dropTarget.groupKey) return;
      placeGroup(groupKey, sourceStage, zone.dataset.stage, Math.max(0, index));
      return;
    }
    if (!id) return;
    const jobs = stageJobs(state.records, zone.dataset.stage, id);
    let index = jobs.length;
    if (dropTarget.jobId && dropTarget.jobId !== id) {
      const targetIndex = jobs.findIndex((record) => record.id === dropTarget.jobId);
      index = targetIndex + (dropTarget.after ? 1 : 0);
    } else if (dropTarget.groupKey) {
      const targetGroup = jobs.filter((record) => record.job.groupKey === dropTarget.groupKey);
      const targetIndex = jobs.findIndex((record) => record.id === targetGroup[0]?.id);
      index = targetIndex + (dropTarget.after ? targetGroup.length : 0);
    }
    placeJob(id, zone.dataset.stage, Math.max(0, index));
  });
  $("#job-board").addEventListener("contextmenu", (event) => {
    const group = event.target.closest(".board-group-card[data-group-key]");
    if (group) {
      event.preventDefault();
      openGroupMenu(event, group.dataset.groupKey, group.dataset.groupStage);
      return;
    }
    const card = event.target.closest(".board-card[data-job-id]");
    if (!card) return;
    event.preventDefault();
    openCardMenu(event, card.dataset.jobId);
  });
  $("#card-menu").addEventListener("click", (event) => {
    const id = state.menuJobId;
    const groupKey = state.menuGroupKey;
    const groupStage = state.menuGroupStage;
    const action = event.target.closest("[data-card-menu-action]");
    const stage = event.target.closest("[data-card-menu-stage]");
    if (action?.dataset.cardMenuAction === "toggle-group" && groupKey) {
      const scope = groupScope(groupStage, groupKey);
      state.expandedGroups.has(scope) ? state.expandedGroups.delete(scope) : state.expandedGroups.add(scope);
      render();
    }
    if (action?.dataset.cardMenuAction === "ungroup" && groupKey && groupStage) ungroupCards(groupKey, groupStage);
    if (id && action?.dataset.cardMenuAction === "edit") openDrawer(state.records.find((record) => record.id === id));
    if (id && action?.dataset.cardMenuAction === "copy") copyJob(id);
    if (id && action?.dataset.cardMenuAction === "archive") archiveJob(id);
    if (id && stage) placeJob(id, stage.dataset.cardMenuStage, stageJobs(state.records, stage.dataset.cardMenuStage, id).length);
    closeCardMenu();
  });
  document.addEventListener("pointerdown", (event) => { if (!event.target.closest("#card-menu")) closeCardMenu(); });
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeCardMenu(); });
  $("#job-board").addEventListener("click", (event) => { const add = event.target.closest("[data-new-job-stage]"); if (add) { openDrawer(null, add.dataset.newJobStage); return; } const card = event.target.closest(".board-card[data-job-id]"); if (card) openDrawer(state.records.find((record) => record.id === card.dataset.jobId)); });
});

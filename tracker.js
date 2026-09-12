const API = "./api/quote-records";
const savedView = (() => {
  try { return localStorage.getItem("tracker-view") || "jobs"; } catch { return "jobs"; }
})();
const state = { records: [], search: "", sort: "newest", view: savedView, layout: "board", selected: null, drawerStage: "quoted", invoiceFilter: "all", invoiceFY: "", invoiceQuarter: "", profitFY: "", accountingFY: "", expandedGroups: new Set(), customBoards: [], boardOrder: [], hiddenBoards: [], boardSettings: null };
let syncRequest = null;
const $ = (selector) => document.querySelector(selector);
const currency = (value) => new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD" }).format(Number(value) || 0);
const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (character) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" })[character]);
const normalise = (record) => {
  const job = record.job && typeof record.job === "object" ? record.job : {};
  return { ...record, job: { number: job.number || record.quoteNumber || "", detail: job.detail || job.description || "", quote: Number(job.quote ?? String(record.totalQuote || "").replace(/[^0-9.-]/g, "")) || 0, markup: Number(job.markup) || 0, markupStatus: job.markupStatus || (Number(job.markup) > 0 ? "included" : "not-recorded"), status: job.status || record.jobStage || "quoted", payment: job.payment === "pending" ? "unpaid" : (job.payment || "unpaid"), paymentDate: job.paymentDate || "", referral: job.referral || "pending", invoiceNumber: job.invoiceNumber || "", invoiceDate: job.invoiceDate || "", scheduledDate: job.scheduledDate || "", invoice: job.invoice && typeof job.invoice === "object" ? job.invoice : {}, archived: job.archived === true, groupKey: job.groupKey || "", boardOrder: Number.isFinite(Number(job.boardOrder)) ? Number(job.boardOrder) : null } };
};
async function request(path = "", options = {}) { const response = await fetch(`${API}${path}`, { headers: { "Content-Type":"application/json", ...(options.headers || {}) }, ...options }); if (!response.ok) throw new Error(await response.text()); return response.status === 204 ? null : response.json(); }
async function loadRecords() { if (syncRequest) return syncRequest; $("#sync-state").innerHTML = "<span></span> Syncing shared data"; syncRequest = (async () => { try { const raw = await request(); state.boardSettings = raw.find((record) => record.recordType === "tracker-board-settings") || null; await importApprovedAccountingEntries(); state.customBoards = Array.isArray(state.boardSettings?.job?.boards) ? state.boardSettings.job.boards.filter((board) => board?.id && board?.label) : []; state.boardOrder = Array.isArray(state.boardSettings?.job?.boardOrder) ? state.boardSettings.job.boardOrder : []; state.hiddenBoards = Array.isArray(state.boardSettings?.job?.hiddenBoards) ? state.boardSettings.job.hiddenBoards : []; state.customBoards.forEach((board) => { boardLabels[board.id] = board.label; }); state.records = raw.filter((record) => record.recordType !== "tracker-board-settings").map(normalise); $("#sync-state").innerHTML = "<span></span> Shared data is up to date"; render(); } catch (error) { $("#sync-state").innerHTML = "<span></span> Offline — unable to sync"; render(); console.warn(error); } finally { syncRequest = null; } })(); return syncRequest; }
function activeRecords() { return state.records.filter((record) => !record.job.archived); }
// The invoice register follows invoice data, not the job-board lane. This keeps
// Odoo invoices visible even while their operational job is Scheduled/Confirmed.
function invoicedRecords(records = activeRecords()) { return records.filter((record) => /\d/.test(String(record.job.invoiceNumber || ""))); }
function filtered() { const term = state.search.trim().toLowerCase(); const items = activeRecords().filter((record) => { const j = record.job; return !term || [j.number,record.customerName,record.address,j.detail].some((value) => String(value || "").toLowerCase().includes(term)); }); return items.sort((a,b) => state.sort === "address" ? String(a.address).localeCompare(String(b.address)) : state.sort === "quote-high" ? b.job.quote-a.job.quote : state.sort === "status" ? a.job.status.localeCompare(b.job.status) : new Date(b.submittedAt)-new Date(a.submittedAt)); }
function boardRecords(records = filtered()) { return records.filter((record) => !(record.job.status === "invoiced" && record.job.payment === "paid")); }
function tag(value) { const label = value === "not-applicable" ? "Not applicable" : value.charAt(0).toUpperCase() + value.slice(1); return `<span class="tag ${escapeHtml(value)}">${escapeHtml(label)}</span>`; }
function paymentButton(record) { const value = record.job.payment === "paid" ? "paid" : "unpaid"; const label = value === "paid" ? "Paid" : "Unpaid"; return `<button class="tag payment-toggle ${value}" type="button" data-payment-toggle="${escapeHtml(record.id)}" aria-label="Change payment status for ${escapeHtml(record.address)}">${label}</button>`; }
function markupAmountExGst(job) { const total = Number(job.quote) || 0; const percentage = Number(job.markup) || 0; const subtotal = total / 1.1; return percentage > 0 ? subtotal - (subtotal / (1 + percentage / 100)) : 0; }
function markupTag(job) { return job.markupStatus === "included" ? `<span class="markup-badge included">Markup included · ${Number(job.markup).toFixed(1)}% · ${currency(markupAmountExGst(job))} ex. GST</span>` : `<span class="markup-badge not-recorded">No markup recorded</span>`; }
function renderJobs() { const items = filtered(); const boardItems = boardRecords(items); $("#jobs-body").innerHTML = items.map((record) => { const j = record.job; return `<tr data-id="${escapeHtml(record.id)}"><td>${escapeHtml(j.number)}</td><td class="address">${escapeHtml(record.address)}</td><td class="detail">${escapeHtml(j.detail || "—")}</td><td class="money">${currency(j.quote)}</td><td>${markupTag(j)}</td><td>${tag(j.status)}</td><td>${tag(j.payment)}</td><td>${tag(j.referral)}</td><td>${escapeHtml(j.invoiceNumber || "—")}</td><td>${escapeHtml(j.invoiceDate || "—")}</td></tr>`; }).join(""); $("#jobs-empty").style.display = items.length ? "none" : "block"; $("#result-count").textContent = `${boardItems.length} job${boardItems.length === 1 ? "" : "s"}`; $("#quote-total").textContent = currency(boardItems.filter((record) => record.job.status === "quoted").reduce((sum, record) => sum + record.job.quote, 0)); $("#markup-total").textContent = currency(items.filter((record) => record.job.payment === "paid").reduce((sum, record) => sum + markupAmountExGst(record.job), 0)); $("#invoice-total").textContent = currency(boardItems.filter((record) => record.job.status === "invoiced").reduce((sum, record) => sum + record.job.quote, 0)); }
const baseBoardStages = ["quoted", "confirmed", "scheduled", "completed", "invoiced", "follow_up"];
const boardLabels = { quoted:"Quotes", confirmed:"Confirmed", scheduled:"Scheduled", completed:"Completed", invoiced:"Invoiced", follow_up:"Follow up" };
const boardStages = () => {
  const available = [...baseBoardStages.filter((stage) => !state.hiddenBoards.includes(stage)), ...state.customBoards.map((board) => board.id)];
  const ordered = state.boardOrder.filter((stage) => available.includes(stage));
  return [...ordered, ...available.filter((stage) => !ordered.includes(stage))];
};
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
    const totalMarkup = items.reduce((sum, item) => sum + markupAmountExGst(item.job), 0);
    cards.push(`<article class="board-group-card" draggable="true" data-group-key="${escapeHtml(key)}" data-group-stage="${escapeHtml(stage)}"><div class="board-card-top"><span>⠿ &nbsp;${escapeHtml(record.address)}</span><span class="group-count">${items.length} cards</span></div><div class="board-card-content"><div class="board-card-bottom"><span>Total</span><strong>${currency(total)}</strong></div>${totalMarkup > 0 ? `<div class="board-card-bottom"><span>Markup (ex. GST)</span><strong>${currency(totalMarkup)}</strong></div>` : ""}<small>Drag to move all cards · Right-click to ${expanded ? "collapse, ungroup or move" : "expand, ungroup or move"}</small></div></article>`);
    if (expanded) cards.push(`<div class="board-group-children">${items.map((item) => renderCard(item, { hideDate:true })).join("")}</div>`);
  });
  return cards.join("");
}
function renderBoard() {
  const scrollPositions = new Map([...document.querySelectorAll(".board-dropzone")].map((zone) => [zone.dataset.stage, zone.scrollTop]));
  const records = boardRecords();
  const stages = boardStages();
  $("#job-board").style.setProperty("--board-count", stages.length);
  $("#job-board").innerHTML = stages.map((stage) => {
    const jobs = stageJobs(records, stage);
    const cards = jobs.length ? renderGroupedCards(jobs, stage) : `<div class="board-empty">Drop card here</div>`;
    const controls = `<div class="board-actions"><button type="button" title="Delete board" aria-label="Delete ${escapeHtml(boardLabels[stage])} board" data-board-action="delete" data-board-id="${escapeHtml(stage)}">×</button></div>`;
    return `<section class="board-column board-${stage}"><header class="board-head"><div class="board-title-row custom-board-title" draggable="true" data-board-drag-id="${escapeHtml(stage)}" title="Drag to move this board"><span class="board-drag-grip" aria-hidden="true">⠿</span><strong>${escapeHtml(boardLabels[stage])} <span>${jobs.length}</span></strong>${controls}</div><button class="lane-add" type="button" data-new-job-stage="${stage}">＋ Add job</button></header><div class="board-dropzone" data-stage="${stage}">${cards}</div><button class="lane-add lane-add-bottom" type="button" data-new-job-stage="${stage}">＋ Add job</button></section>`;
  }).join("");
  document.querySelectorAll(".board-dropzone").forEach((zone) => { zone.scrollTop = scrollPositions.get(zone.dataset.stage) || 0; });
}
function renderBoardTargets() { $("#card-menu-stages").innerHTML = boardStages().map((stage) => `<button type="button" data-card-menu-stage="${escapeHtml(stage)}">${escapeHtml(boardLabels[stage])}</button>`).join(""); }
async function addBoard() {
  const label = window.prompt("Board name", "New board");
  if (!label?.trim()) return;
  const name = label.trim().slice(0, 40);
  const id = `custom-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "board"}-${Date.now().toString(36)}`;
  const boards = [...state.customBoards, { id, label:name }];
  const isNew = !state.boardSettings;
  const boardOrder = [...boardStages(), id];
  const settings = state.boardSettings ? { ...state.boardSettings, job:{ ...state.boardSettings.job, boards, boardOrder } } : { id:crypto.randomUUID(), recordType:"tracker-board-settings", sector:"Tracker settings", submittedAt:new Date().toISOString(), customerName:"-", phone:"-", address:"-", quoteNumber:"-", totalQuote:"$0.00", subtotalExGst:"$0.00", gstTotal:"$0.00", blindItems:[], curtainItems:[], job:{ boards, boardOrder, hiddenBoards:[] } };
  state.customBoards = boards;
  state.boardOrder = boardOrder;
  state.boardSettings = settings;
  boardLabels[id] = name;
  render();
  try {
    state.boardSettings = await request(isNew ? "" : `?id=${encodeURIComponent(settings.id)}`, { method: isNew ? "POST" : "PATCH", body:JSON.stringify(settings) });
  } catch (error) {
    state.customBoards = state.customBoards.filter((board) => board.id !== id);
    state.boardOrder = state.boardOrder.filter((stage) => stage !== id);
    delete boardLabels[id];
    render();
    window.alert("The new board could not be saved. Please try again.");
    console.warn(error);
  }
}
async function saveBoardLayout({ boards = state.customBoards, boardOrder = state.boardOrder, hiddenBoards = state.hiddenBoards } = {}) {
  const previous = { boards:state.customBoards, boardOrder:state.boardOrder, hiddenBoards:state.hiddenBoards };
  const settings = { ...state.boardSettings, job:{ ...state.boardSettings.job, boards, boardOrder, hiddenBoards } };
  state.customBoards = boards;
  state.boardOrder = boardOrder;
  state.hiddenBoards = hiddenBoards;
  state.boardSettings = settings;
  render();
  try {
    state.boardSettings = await request(`?id=${encodeURIComponent(settings.id)}`, { method:"PATCH", body:JSON.stringify(settings) });
  } catch (error) {
    state.customBoards = previous.boards;
    state.boardOrder = previous.boardOrder;
    state.hiddenBoards = previous.hiddenBoards;
    state.boardSettings = { ...settings, job:{ ...settings.job, boards:previous.boards, boardOrder:previous.boardOrder, hiddenBoards:previous.hiddenBoards } };
    render();
    window.alert("The board change could not be saved. Please try again.");
    console.warn(error);
  }
}
async function reorderBoard(id, targetId) {
  const current = boardStages();
  const index = current.indexOf(id);
  const targetIndex = current.indexOf(targetId);
  if (index < 0 || targetIndex < 0 || index === targetIndex) return;
  const [board] = current.splice(index, 1);
  current.splice(index < targetIndex ? targetIndex - 1 : targetIndex, 0, board);
  await saveBoardLayout({ boardOrder:current });
}
async function deleteBoard(id) {
  const stages = boardStages();
  if (stages.length <= 1) { window.alert("Keep at least one board in the tracker."); return; }
  if (!stages.includes(id)) return;
  const label = boardLabels[id] || "this";
  const cards = state.records.filter((record) => record.job.status === id);
  const fallback = stages.find((stage) => stage !== id);
  const message = cards.length
    ? `Delete “${label}”? Its ${cards.length} card${cards.length === 1 ? "" : "s"} will be moved safely to ${boardLabels[fallback]}.`
    : `Delete the empty “${label}” board?`;
  if (!window.confirm(message)) return;
  const previousRecords = state.records;
  const previousLayout = { boards:state.customBoards, boardOrder:state.boardOrder, hiddenBoards:state.hiddenBoards };
  const moved = cards.map((record, index) => normalise({ ...record, jobStage:fallback, job:{ ...record.job, status:fallback, groupKey:"", boardOrder:-Date.now() - index } }));
  const isCustom = state.customBoards.some((item) => item.id === id);
  const boards = isCustom ? state.customBoards.filter((item) => item.id !== id) : state.customBoards;
  const boardOrder = state.boardOrder.filter((stage) => stage !== id);
  const hiddenBoards = isCustom ? state.hiddenBoards : [...state.hiddenBoards, id];
  const settings = { ...state.boardSettings, job:{ ...state.boardSettings.job, boards, boardOrder, hiddenBoards } };
  state.records = state.records.map((record) => moved.find((item) => item.id === record.id) || record);
  state.customBoards = boards;
  state.boardOrder = boardOrder;
  state.hiddenBoards = hiddenBoards;
  state.boardSettings = settings;
  if (isCustom) delete boardLabels[id];
  render();
  try {
    await Promise.all([
      ...moved.map((record) => request(`?id=${encodeURIComponent(record.id)}`, { method:"PATCH", body:JSON.stringify(record) })),
      request(`?id=${encodeURIComponent(settings.id)}`, { method:"PATCH", body:JSON.stringify(settings) })
    ]);
  } catch (error) {
    state.records = previousRecords;
    state.customBoards = previousLayout.boards;
    state.boardOrder = previousLayout.boardOrder;
    state.hiddenBoards = previousLayout.hiddenBoards;
    state.boardSettings = { ...settings, job:{ ...settings.job, boards:previousLayout.boards, boardOrder:previousLayout.boardOrder, hiddenBoards:previousLayout.hiddenBoards } };
    if (isCustom) boardLabels[id] = label;
    render();
    window.alert("The board could not be deleted. Please try again.");
    console.warn(error);
  }
}
function renderCalendar() { const scheduled = activeRecords().filter((record) => record.job.scheduledDate).sort((a,b) => String(a.job.scheduledDate).localeCompare(String(b.job.scheduledDate))); $("#calendar-grid").innerHTML = scheduled.length ? scheduled.map((record) => `<article class="calendar-item"><strong>${escapeHtml(record.job.number)} · ${escapeHtml(record.address)}</strong><span>${escapeHtml(record.job.scheduledDate)} · ${escapeHtml(record.job.detail || "Job scheduled")}</span></article>`).join("") : `<div class="empty" style="display:block">Add a scheduled date to a job to see it here.</div>`; }
function renderClients() { const clients = [...new Map(activeRecords().filter((r) => r.customerName && r.customerName !== "-").map((r) => [r.customerName, r])).values()]; $("#client-list").innerHTML = clients.map((record) => `<article class="client-item"><strong>${escapeHtml(record.customerName)}</strong><span>${escapeHtml(record.phone || "No phone")} · ${escapeHtml(record.address || "No address")}</span></article>`).join("") || `<div class="empty" style="display:block">Clients will appear when quotes are saved.</div>`; }
function renderTasks() { const active = activeRecords().filter((record) => !["completed"].includes(record.job.status)); $("#task-list").innerHTML = active.map((record) => `<article class="task-item"><strong>${escapeHtml(record.job.number)} · ${escapeHtml(record.address)}</strong><span>${escapeHtml(record.job.detail || "No job detail added")}</span><div class="task-meta"><em>${escapeHtml(record.job.status === "quoted" ? "Follow up quote" : record.job.status === "confirmed" ? "Schedule the job" : "Complete scheduled work")}</em><b>Quote ${currency(record.job.quote)}</b></div></article>`).join("") || `<div class="empty" style="display:block">No active tasks.</div>`; }
function renderReports() { const all = activeRecords(); const paid = all.filter((record) => record.job.payment === "paid"); $("#report-grid").innerHTML = `<article class="report-card"><span>Total quotations</span><strong>${currency(all.reduce((sum, r) => sum + r.job.quote, 0))}</strong></article><article class="report-card"><span>Paid jobs</span><strong>${paid.length}</strong></article><article class="report-card"><span>Completed jobs</span><strong>${all.filter((r) => r.job.status === "completed").length}</strong></article>`; }
function financialYearFor(value) { const date = /^\d{4}-\d{2}-\d{2}$/.test(String(value || "")) ? new Date(`${value}T00:00:00`) : null; if (!date || Number.isNaN(date.getTime())) return ""; const year = date.getFullYear() - (date.getMonth() < 6 ? 1 : 0); return `FY ${year}–${String(year + 1).slice(-2)}`; }
function currentFinancialYear() { const now = new Date(); const year = now.getFullYear() - (now.getMonth() < 6 ? 1 : 0); return `FY ${year}–${String(year + 1).slice(-2)}`; }
function profitExpenses() { return Array.isArray(state.boardSettings?.job?.profitExpenses) ? state.boardSettings.job.profitExpenses.filter((expense) => expense && Number(expense.amount) > 0) : []; }
function accountingEntries() { return Array.isArray(state.boardSettings?.job?.accountingEntries) ? state.boardSettings.job.accountingEntries.filter((entry) => entry && Number(entry.amount) > 0) : []; }
const approvedAccountingEntries = [{ id:"bank-ebay-payouts-2026-q1", importKey:"csvdata-1-ebay-payouts-2026-q1", date:"2026-08-12", type:"other-income", category:"eBay payouts", description:"6 eBay Commerce payouts, 10 Jul–12 Aug 2026", bankAmount:265.33, amount:241.21, taxTreatment:"estimated-gst-inclusive", source:"CSVData (1).csv" },{ id:"bank-supplier-refunds-2026-q1", importKey:"csvdata-1-supplier-refunds-2026-q1", date:"2026-08-24", type:"supplier-refund", category:"Supplier refunds & returns", description:"22 supplier returns/refunds, 14 Jul–24 Aug 2026", bankAmount:1556.41, amount:1414.92, taxTreatment:"estimated-gst-inclusive", source:"CSVData (1).csv" },{ id:"bank-linkscorp-installation-2026-q1", importKey:"manual-linkscorp-installation-2026-q1", date:"2026-09-08", type:"other-income", category:"LINKSCORP", description:"LINKSCORP installation", bankAmount:1000, amount:909.09, taxTreatment:"gst-inclusive", source:"Manual income entry" },{ id:"bank-brw-possible-inv-25204-2026-q1", importKey:"manual-brw-possible-inv-25204-2026-q1", date:"2026-09-08", type:"other-income", category:"BRW Group", description:"BRW Group receipt — possible INV-25204; not matched to invoice yet", bankAmount:660, amount:600, taxTreatment:"gst-inclusive", source:"Manual income entry" }];
async function importApprovedAccountingEntries() { if (!state.boardSettings) return; const existing = accountingEntries(); const missing = approvedAccountingEntries.filter((entry) => !existing.some((item) => item.importKey === entry.importKey)); if (!missing.length) return; const settings = { ...state.boardSettings, job:{ ...state.boardSettings.job, accountingEntries:[...existing, ...missing] } }; state.boardSettings = await request(`?id=${encodeURIComponent(settings.id)}`, { method:"PATCH", body:JSON.stringify(settings) }); }
function profitInvoiceDate(record) { return record.job.paymentDate || record.job.invoiceDate || ""; }
function profitQuarterFor(value) { const date = /^\d{4}-\d{2}-\d{2}$/.test(String(value || "")) ? new Date(`${value}T00:00:00`) : null; if (!date || Number.isNaN(date.getTime())) return 0; return Math.floor(((date.getMonth() + 6) % 12) / 3) + 1; }
function renderQuarterSummary(invoices, expenses, entries = []) { const body = $("#quarter-body"); if (!body) return; body.innerHTML = [1,2,3,4].map((quarter) => { const quarterInvoices = invoices.filter((record) => profitQuarterFor(profitInvoiceDate(record)) === quarter); const quarterExpenses = expenses.filter((expense) => profitQuarterFor(expense.date) === quarter); const quarterEntries = entries.filter((entry) => profitQuarterFor(entry.date) === quarter); const income = quarterInvoices.reduce((sum, record) => sum + Number(record.job.quote || 0) / 1.1, 0) + quarterEntries.filter((entry) => entry.type === "other-income").reduce((sum, entry) => sum + Number(entry.amount || 0), 0); const referral = quarterInvoices.reduce((sum, record) => sum + markupAmountExGst(record.job), 0); const totalExpenses = quarterExpenses.reduce((sum, expense) => sum + Number(expense.amount || 0), 0) - quarterEntries.filter((entry) => entry.type === "supplier-refund").reduce((sum, entry) => sum + Number(entry.amount || 0), 0); const profit = income - referral - totalExpenses; return `<tr><td><strong>Q${quarter}</strong></td><td class="money">${currency(income)}</td><td class="money">${currency(referral)}</td><td class="money">${currency(totalExpenses)}</td><td class="money"><strong>${currency(profit)}</strong></td></tr>`; }).join(""); }
function renderProfit() { const select = $("#profit-fy"); if (!select) return; const paidInvoices = activeRecords().filter((record) => record.job.status === "invoiced" && record.job.payment === "paid"); const expenses = profitExpenses(); const entries = accountingEntries(); const years = [...new Set([currentFinancialYear(), ...paidInvoices.map(profitInvoiceDate).map(financialYearFor), ...expenses.map((expense) => financialYearFor(expense.date)), ...entries.map((entry) => financialYearFor(entry.date))].filter(Boolean))].sort().reverse(); if (!years.includes(state.profitFY)) state.profitFY = years.includes(currentFinancialYear()) ? currentFinancialYear() : years[0]; select.innerHTML = years.map((year) => `<option value="${escapeHtml(year)}"${year === state.profitFY ? " selected" : ""}>${escapeHtml(year)}</option>`).join(""); const inFY = (value) => financialYearFor(value) === state.profitFY; const invoices = paidInvoices.filter((record) => inFY(profitInvoiceDate(record))); const fyExpenses = expenses.filter((expense) => inFY(expense.date)); const fyEntries = entries.filter((entry) => inFY(entry.date)); const otherIncome = fyEntries.filter((entry) => entry.type === "other-income").reduce((sum, entry) => sum + Number(entry.amount || 0), 0); const supplierRefunds = fyEntries.filter((entry) => entry.type === "supplier-refund").reduce((sum, entry) => sum + Number(entry.amount || 0), 0); const income = invoices.reduce((sum, record) => sum + Number(record.job.quote || 0) / 1.1, 0) + otherIncome; const referral = invoices.reduce((sum, record) => markupAmountExGst(record.job) + sum, 0); const totalExpenses = fyExpenses.reduce((sum, expense) => sum + Number(expense.amount || 0), 0) - supplierRefunds; const profit = income - referral - totalExpenses; const metrics = [["income","Paid income",income,`${invoices.length} paid invoice${invoices.length === 1 ? "" : "s"}${otherIncome ? " + other income" : ""}`],["referral","Referral payable",referral,`${invoices.filter((record) => markupAmountExGst(record.job) > 0).length} invoice${invoices.filter((record) => markupAmountExGst(record.job) > 0).length === 1 ? "" : "s"}`],["expense","Expenses",totalExpenses,`${fyExpenses.length} expense${fyExpenses.length === 1 ? "" : "s"}${supplierRefunds ? " after refunds" : ""}`],["profit","Net profit",profit,"Before GST"]]; $("#profit-metrics").innerHTML = metrics.map(([style,label,amount,note]) => `<article class="profit-metric ${style}"><span>${label} (ex. GST)</span><strong>${currency(amount)}</strong><small>${escapeHtml(note)}</small></article>`).join(""); const max = Math.max(income, referral, totalExpenses, Math.abs(profit), 1); $("#profit-bars").innerHTML = metrics.map(([style,label,amount]) => `<div class="profit-bar-row"><span>${escapeHtml(label)}</span><div class="profit-bar"><i class="${style}" style="width:${Math.min(100, Math.abs(amount) / max * 100)}%"></i></div><strong>${currency(amount)}</strong></div>`).join(""); renderQuarterSummary(invoices, fyExpenses, fyEntries); const body = $("#expense-body"); body.innerHTML = fyExpenses.sort((a,b) => String(b.date).localeCompare(String(a.date))).map((expense) => `<tr><td>${escapeHtml(expense.date)}</td><td>${escapeHtml(expense.category)}</td><td>${escapeHtml(expense.description || "—")}</td><td class="money">${expense.bankAmount ? currency(expense.bankAmount) : "—"}</td><td class="money">${currency(expense.amount)}</td><td class="expense-actions"><button class="expense-delete" type="button" data-delete-expense="${escapeHtml(expense.id)}">Delete</button></td></tr>`).join(""); $("#expense-empty").style.display = fyExpenses.length ? "none" : "block"; }
function renderAccounting() { const select = $("#accounting-fy"); if (!select) return; const records = activeRecords(); const paid = records.filter((record) => record.job.status === "invoiced" && record.job.payment === "paid"); const unpaid = records.filter((record) => record.job.status === "invoiced" && record.job.payment !== "paid"); const expenses = profitExpenses(); const entries = accountingEntries(); const years = [...new Set([currentFinancialYear(), ...paid.map(profitInvoiceDate).map(financialYearFor), ...unpaid.map((record) => financialYearFor(record.job.invoiceDate)), ...expenses.map((expense) => financialYearFor(expense.date), ...entries.map((entry) => financialYearFor(entry.date)))].filter(Boolean))].sort().reverse(); if (!years.includes(state.accountingFY)) state.accountingFY = years.includes(currentFinancialYear()) ? currentFinancialYear() : years[0]; select.innerHTML = years.map((year) => `<option value="${escapeHtml(year)}"${year === state.accountingFY ? " selected" : ""}>${escapeHtml(year)}</option>`).join(""); const inFY = (value) => financialYearFor(value) === state.accountingFY; const paidInvoices = paid.filter((record) => inFY(profitInvoiceDate(record))); const unpaidInvoices = unpaid.filter((record) => inFY(record.job.invoiceDate)); const fyExpenses = expenses.filter((expense) => inFY(expense.date)); const fyEntries = entries.filter((entry) => inFY(entry.date)); const otherIncome = fyEntries.filter((entry) => entry.type === "other-income").reduce((sum, entry) => sum + Number(entry.amount || 0), 0); const supplierRefunds = fyEntries.filter((entry) => entry.type === "supplier-refund").reduce((sum, entry) => sum + Number(entry.amount || 0), 0); const income = paidInvoices.reduce((sum, record) => sum + Number(record.job.quote || 0) / 1.1, 0) + otherIncome; const referral = paidInvoices.reduce((sum, record) => sum + markupAmountExGst(record.job), 0); const totalExpenses = fyExpenses.reduce((sum, expense) => sum + Number(expense.amount || 0), 0) - supplierRefunds; const netProfit = income - referral - totalExpenses; const paidTotal = paidInvoices.reduce((sum, record) => sum + Number(record.job.quote || 0), 0); const unpaidTotal = unpaidInvoices.reduce((sum, record) => sum + Number(record.job.quote || 0), 0); const fyStart = state.accountingFY.match(/FY (\d{4})/)?.[1]; $("#accounting-period").textContent = fyStart ? `1 Jul ${fyStart} – 30 Jun ${Number(fyStart) + 1}` : state.accountingFY; $("#accounting-cash-rows").innerHTML = [["income","Paid invoice income",income-otherIncome],["income","Other income",otherIncome],["referral","Referral payable",-referral],["expense","Operating expenses",-totalExpenses],["income","Supplier refunds",supplierRefunds],["result","Net operating result",netProfit]].map(([style,label,amount]) => `<div class="accounting-cash-row ${style}"><span>${label} <small>(ex. GST)</small></span><strong>${amount < 0 ? "−" : ""}${currency(Math.abs(amount))}</strong></div>`).join(""); const today = new Date(); today.setHours(0,0,0,0); const buckets = { current:0, days31:0, days61:0, days90:0 }; const ageInDays = (value) => { const date = /^\d{4}-\d{2}-\d{2}$/.test(String(value || "")) ? new Date(`${value}T00:00:00`) : null; return date && !Number.isNaN(date.getTime()) ? Math.max(0, Math.floor((today - date) / 86400000)) : 0; }; unpaidInvoices.forEach((record) => { const age = ageInDays(record.job.invoiceDate); const amount = Number(record.job.quote || 0); if (age <= 30) buckets.current += amount; else if (age <= 60) buckets.days31 += amount; else if (age <= 90) buckets.days61 += amount; else buckets.days90 += amount; }); const collected = paidTotal + unpaidTotal ? paidTotal / (paidTotal + unpaidTotal) * 100 : 0; const receivables = [["Current<br>(0–30 days)",buckets.current,""],["31–60 days",buckets.days31,""],["61–90 days",buckets.days61,""],["90+ days",buckets.days90,"overdue"],["Total outstanding",unpaidTotal,""],["Collected",collected,"paid",true]]; $("#accounting-receivable-grid").innerHTML = receivables.map(([label,value,style,isPercent]) => `<div class="accounting-receivable-cell ${style}"><span>${label}</span><strong>${isPercent ? `${value.toFixed(1)}%` : currency(value)}</strong></div>`).join(""); const categories = new Map(); fyExpenses.forEach((expense) => { const name = expense.category || "Uncategorised"; const current = categories.get(name) || { count:0, bank:0, amount:0 }; current.count += 1; current.bank += Number(expense.bankAmount ?? expense.amount ?? 0); current.amount += Number(expense.amount || 0); categories.set(name,current); }); const categoryRows = [...categories.entries()].sort((a,b) => b[1].amount - a[1].amount); $("#accounting-category-body").innerHTML = categoryRows.map(([name, totals]) => `<tr><td>${escapeHtml(name)}</td><td>${totals.count}</td><td class="money">${currency(totals.bank)}</td><td class="money"><strong>${currency(totals.amount)}</strong></td></tr>`).join(""); $("#accounting-category-empty").style.display = categoryRows.length ? "none" : "block"; $("#accounting-entry-body").innerHTML = fyEntries.sort((a,b) => String(b.date).localeCompare(String(a.date))).map((entry) => `<tr><td>${escapeHtml(entry.date)}</td><td>${escapeHtml(entry.type === "other-income" ? "Other income" : "Supplier refund")}</td><td>${escapeHtml(entry.description)}</td><td class="money">${currency(entry.bankAmount)}</td><td class="money"><strong>${currency(entry.amount)}</strong></td></tr>`).join(""); $("#accounting-entry-empty").style.display = fyEntries.length ? "none" : "block"; $("#accounting-unpaid-body").innerHTML = unpaidInvoices.sort((a,b) => String(b.job.invoiceDate).localeCompare(String(a.job.invoiceDate))).map((record) => { const age = ageInDays(record.job.invoiceDate); return `<tr><td>${escapeHtml(record.job.invoiceNumber || record.job.number || "—")}</td><td class="address">${escapeHtml(record.address || "—")}</td><td>${escapeHtml(record.job.invoiceDate || "—")}</td><td>${age} day${age === 1 ? "" : "s"}</td><td class="money"><strong>${currency(record.job.quote)}</strong></td></tr>`; }).join(""); $("#accounting-unpaid-empty").style.display = unpaidInvoices.length ? "none" : "block"; }
async function saveProfitExpenses(expenses) { const isNew = !state.boardSettings; const previous = state.boardSettings; const settings = state.boardSettings ? { ...state.boardSettings, job:{ ...state.boardSettings.job, profitExpenses:expenses } } : { id:crypto.randomUUID(), recordType:"tracker-board-settings", sector:"Tracker settings", submittedAt:new Date().toISOString(), customerName:"-", phone:"", address:"-", quoteNumber:"-", totalQuote:"$0.00", subtotalExGst:"$0.00", gstTotal:"$0.00", blindItems:[], curtainItems:[], job:{ boards:[], boardOrder:[], hiddenBoards:[], profitExpenses:expenses } }; state.boardSettings = settings; renderProfit(); renderAccounting(); try { state.boardSettings = await request(isNew ? "" : `?id=${encodeURIComponent(settings.id)}`, { method:isNew ? "POST" : "PATCH", body:JSON.stringify(settings) }); renderAccounting(); } catch (error) { state.boardSettings = previous; renderProfit(); renderAccounting(); window.alert("The expense could not be saved. Please try again."); console.warn(error); } }
function openExpenseModal() { $("#expense-date").value = new Date().toISOString().slice(0,10); $("#expense-category").value = ""; $("#expense-description").value = ""; $("#expense-amount").value = ""; $("#expense-modal").classList.add("open"); $("#expense-category").focus(); }
function closeExpenseModal() { $("#expense-modal").classList.remove("open"); }
async function addExpense(event) { event.preventDefault(); const amount = Number($("#expense-amount").value); if (!(amount > 0)) return; const expense = { id:crypto.randomUUID(), date:$("#expense-date").value, category:$("#expense-category").value.trim(), description:$("#expense-description").value.trim(), amount }; closeExpenseModal(); await saveProfitExpenses([...profitExpenses(), expense]); }
async function deleteExpense(id) { const expense = profitExpenses().find((item) => item.id === id); if (!expense || !window.confirm(`Delete the ${currency(expense.amount)} expense?`)) return; await saveProfitExpenses(profitExpenses().filter((item) => item.id !== id)); }
function renderArchive() { const records = state.records.filter((record) => record.job.archived); $("#archive-body").innerHTML = records.map((record) => `<tr><td>${escapeHtml(record.job.number || "—")}</td><td class="address">${escapeHtml(record.address || "—")}</td><td class="detail">${escapeHtml(record.job.detail || "—")}</td><td>${tag(record.job.status)}</td><td class="money">${currency(record.job.quote)}</td><td><div class="archive-actions"><button class="quiet-button archive-restore" type="button" data-restore-card="${escapeHtml(record.id)}">Restore</button><button class="danger-button" type="button" data-delete-card="${escapeHtml(record.id)}">Permanently delete</button></div></td></tr>`).join("") || `<tr><td colspan="6" class="archive-empty">No archived cards.</td></tr>`; }
function render() { renderJobs(); renderBoard(); renderBoardTargets(); renderCalendar(); renderClients(); renderQuotes(); renderArchive(); renderProfit(); renderAccounting(); }
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
function updateTaxAmounts() { const quotation = Math.max(0, Number($("#job-quote").value) || 0); const gst = quotation * 0.1; const total = quotation + gst; $("#job-total").value = total.toFixed(2); return { quotation, gst, total }; }
function updateMarkupAmount() { const { quotation } = updateTaxAmounts(); const percentage = Number($("#job-markup").value) || 0; const amount = percentage > 0 ? quotation - (quotation / (1 + percentage / 100)) : 0; $("#job-markup-amount").value = amount.toFixed(2); }
function updateMarkupPercentage() { const { quotation } = updateTaxAmounts(); const amount = Math.max(0, Number($("#job-markup-amount").value) || 0); const percentage = quotation > amount && amount > 0 ? (amount / (quotation - amount)) * 100 : 0; $("#job-markup").value = percentage.toFixed(1); }
function openDrawer(record = null, defaultStage = "quoted") { state.selected = record; const j = record?.job || {}; const hasSavedInvoice = Boolean(j.invoice?.number); state.drawerStage = j.status || defaultStage; $("#drawer-title").textContent = record ? j.number || "Edit job" : "New job"; $("#record-id").value = record?.id || ""; $("#job-number").value = j.number || `J-${String(Date.now()).slice(-5)}`; $("#job-client").value = record?.customerName && record.customerName !== "-" ? record.customerName : ""; $("#job-address").value = record?.address && record.address !== "-" ? record.address : ""; $("#job-detail").value = j.detail || ""; $("#job-quote").value = j.quote ? (Number(j.quote) / 1.1).toFixed(2) : ""; updateTaxAmounts(); $("#job-markup").value = j.markup ?? 50; updateMarkupAmount(); $("#job-payment").value = j.payment === "paid" ? "paid" : "unpaid"; $("#job-referral").value = j.referral || "pending"; $("#job-invoice").value = j.invoiceNumber || nextInvoiceNumber(); $("#job-invoice-date").value = j.invoiceDate || ""; $("#job-scheduled-date").value = j.scheduledDate || ""; $("#create-invoice").textContent = hasSavedInvoice ? "View invoice" : "Create invoice"; document.body.classList.add("drawer-open"); $("#drawer").classList.add("open"); $("#drawer").setAttribute("aria-hidden", "false"); }
function closeDrawer() { document.body.classList.remove("drawer-open"); $("#drawer").classList.remove("open"); $("#drawer").setAttribute("aria-hidden", "true"); }
function formRecord() { const base = state.selected ? { ...state.selected } : { id: crypto.randomUUID(), recordType:"general", sector:"General", submittedAt:new Date().toISOString(), phone:"", email:"", blindItems:[], curtainItems:[] }; const tax = updateTaxAmounts(); const quote = tax.total; const status = state.selected?.job?.status || state.drawerStage || "quoted"; const markup = Number($("#job-markup").value)||0; return { ...base, customerName: $("#job-client").value.trim() || "-", address: $("#job-address").value.trim(), quoteNumber: $("#job-number").value.trim(), totalQuote: currency(quote), subtotalExGst: currency(tax.quotation), gstTotal: currency(tax.gst), jobStage: status, job:{ number:$("#job-number").value.trim(), detail:$("#job-detail").value.trim(), quote, markup, markupStatus: markup > 0 ? "included" : "not-recorded", status, payment:$("#job-payment").value, referral:$("#job-referral").value, invoiceNumber:$("#job-invoice").value.trim() || nextInvoiceNumber(), invoiceDate:$("#job-invoice-date").value, scheduledDate:$("#job-scheduled-date").value, invoice: state.selected?.job?.invoice || {}, archived: state.selected?.job?.archived === true, groupKey: state.selected?.job?.groupKey || "", boardOrder: state.selected?.job?.boardOrder ?? undefined } }; }
async function saveJob(event) { event.preventDefault(); const record = formRecord(); try { const saved = normalise(await request(state.selected ? `?id=${encodeURIComponent(record.id)}` : "", { method: state.selected ? "PATCH" : "POST", body: JSON.stringify(record) })); state.records = state.selected ? state.records.map((item) => item.id === saved.id ? saved : item) : [saved, ...state.records]; closeDrawer(); render(); } catch (error) { window.alert("Unable to save this job to the shared tracker. Check the cloud connection and try again."); console.warn(error); } }
function renderQuotes() {
  const records = activeRecords();
  const quotesBody = $("#quotes-body");
  if (quotesBody) quotesBody.innerHTML = records.map((record) => `<tr data-id="${escapeHtml(record.id)}"><td>${escapeHtml(record.job.number)}</td><td>${escapeHtml(record.address)}</td><td>${escapeHtml(record.job.detail || "—")}</td><td>${currency(record.job.quote)}</td><td>${tag(record.job.status)}</td></tr>`).join("") || `<tr><td colspan="5">No saved quotes yet.</td></tr>`;
  // Keep archived cards out of the invoice register as well as the board.
  // The register is based on real invoice numbers; it is independent from the
  // operational board lane and retains paid invoices as history.
  const invoices = records.filter((record) => record.job.status === "invoiced").sort((a, b) => Number(a.job.payment === "paid") - Number(b.job.payment === "paid"));
  const pendingForInvoice = records.filter((record) => record.job.status === "completed");
  const invoiceDates = [...invoices, ...pendingForInvoice].map((record) => financialYearFor(record.job.invoiceDate)).filter(Boolean);
  const financialYears = [...new Set(invoiceDates)].sort().reverse();
  if (state.invoiceFY && !financialYears.includes(state.invoiceFY)) state.invoiceFY = "";
  $("#invoice-fy").innerHTML = `<option value="">All financial years</option>${financialYears.map((year) => `<option value="${escapeHtml(year)}"${state.invoiceFY === year ? " selected" : ""}>${escapeHtml(year)}</option>`).join("")}`;
  const matchesPeriod = (record) => (!state.invoiceFY || financialYearFor(record.job.invoiceDate) === state.invoiceFY) && (!state.invoiceQuarter || profitQuarterFor(record.job.invoiceDate) === Number(state.invoiceQuarter));
  const periodInvoices = invoices.filter(matchesPeriod);
  const periodPendingForInvoice = pendingForInvoice.filter(matchesPeriod);
  const unpaid = periodInvoices.filter((record) => record.job.payment !== "paid");
  const paid = periodInvoices.filter((record) => record.job.payment === "paid");
  const unpaidTotal = unpaid.reduce((sum, record) => sum + record.job.quote, 0);
  const paidTotal = paid.reduce((sum, record) => sum + record.job.quote, 0);
  const pendingTotal = periodPendingForInvoice.reduce((sum, record) => sum + record.job.quote, 0);
  const referralPayable = (record) => markupAmountExGst(record.job) * 1.1;
  const paidReferralTotal = paid.reduce((sum, record) => sum + referralPayable(record), 0);
  const paidReferralCount = paid.filter((record) => referralPayable(record) > 0).length;
  const unpaidReferralTotal = unpaid.reduce((sum, record) => sum + referralPayable(record), 0);
  const unpaidReferralCount = unpaid.filter((record) => referralPayable(record) > 0).length;
  const total = periodInvoices.length || 1;
  const invoiceKey = (value) => String(value || "").match(/\d+/g)?.join("") || "";
  const invoiceCounts = new Map();
  invoices.forEach((record) => { const key = invoiceKey(record.job.invoiceNumber); if (key) invoiceCounts.set(key, (invoiceCounts.get(key) || 0) + 1); });
  const reviewIssue = (record) => { const key = invoiceKey(record.job.invoiceNumber); return !key ? "Missing invoice number" : invoiceCounts.get(key) > 1 ? "Duplicate invoice number" : ""; };
  const orderedInvoices = [...periodInvoices].sort((a, b) => Number(Boolean(reviewIssue(b))) - Number(Boolean(reviewIssue(a))) || Number(a.job.payment === "paid") - Number(b.job.payment === "paid"));
  // Scheduled and Confirmed jobs are managed on their own boards, not in invoice review.
  const needsBoardReview = [];
  $("#invoice-review-list").innerHTML = needsBoardReview.length ? `<article class="invoice-review-notice"><span>⚠</span><div><strong>${needsBoardReview.length} unpaid invoice${needsBoardReview.length === 1 ? " is" : "s are"} not on the Invoiced board</strong>${needsBoardReview.map((record) => `${escapeHtml(record.job.invoiceNumber)} · ${escapeHtml(record.address)} · ${escapeHtml(boardLabels[record.job.status] || record.job.status)}`).join("<br>")}</div></article>` : "";
  const metric = (filter, style, title, count, amount, noun = "job") => `<button type="button" class="invoice-metric ${style}${state.invoiceFilter === filter ? " active" : ""}" data-invoice-filter="${filter}" aria-pressed="${state.invoiceFilter === filter}"><span>${title}</span><strong>${count} ${noun}${count === 1 ? "" : "s"}</strong><b>${currency(amount)}</b></button>`;
  $("#invoice-summary").innerHTML = `${metric("pending", "pending", "Pending for invoice (inc. GST)", periodPendingForInvoice.length, pendingTotal)}${metric("unpaid", "unpaid", "Unpaid invoices (inc. GST)", unpaid.length, unpaidTotal)}${metric("paid", "paid", "Paid invoices (inc. GST)", paid.length, paidTotal)}${metric("unpaid-referral", "unpaid", "Unpaid referral payable (inc. GST)", unpaidReferralCount, unpaidReferralTotal, "invoice")}${metric("paid-referral", "paid", "Paid referral payable (inc. GST)", paidReferralCount, paidReferralTotal, "invoice")}<div class="invoice-payment-bar" aria-label="${unpaid.length} unpaid and ${paid.length} paid invoices"><span class="unpaid" style="width:${(unpaid.length / total) * 100}%"></span><span class="paid" style="width:${(paid.length / total) * 100}%"></span></div><div class="invoice-bar-legend"><span><i class="unpaid"></i>Unpaid: ${unpaid.length}</span><span><i class="paid"></i>Paid: ${paid.length}</span></div>`;
  const filteredInvoices = state.invoiceFilter === "pending" ? periodPendingForInvoice : state.invoiceFilter === "unpaid" ? unpaid : state.invoiceFilter === "paid" ? paid : state.invoiceFilter === "unpaid-referral" ? unpaid.filter((record) => referralPayable(record) > 0) : state.invoiceFilter === "paid-referral" ? paid.filter((record) => referralPayable(record) > 0) : orderedInvoices;
  const filterLabel = { pending:"Pending for invoice", unpaid:"Unpaid invoices", paid:"Paid invoices", "unpaid-referral":"Unpaid referral payable", "paid-referral":"Paid referral payable" }[state.invoiceFilter];
  const periodLabel = [state.invoiceFY, state.invoiceQuarter ? `Q${state.invoiceQuarter}` : ""].filter(Boolean).join(" · ");
  $("#invoice-filter-note").innerHTML = periodLabel || filterLabel ? `Showing <strong>${escapeHtml(periodLabel || "All financial years")}</strong>${filterLabel ? ` · <strong>${escapeHtml(filterLabel)}</strong>` : ""} · <button type="button" data-invoice-filter="all">Clear filters</button>` : "";
  $("#invoices-body").innerHTML = filteredInvoices.map((record) => { const pending = record.job.status === "completed"; const key = invoiceKey(record.job.invoiceNumber); const issue = pending ? "" : reviewIssue(record); const issueClass = pending ? "" : !key ? "invoice-review-missing" : invoiceCounts.get(key) > 1 ? "invoice-review-duplicate" : issue ? "invoice-review-odoo" : ""; return `<tr class="${issueClass}" data-id="${escapeHtml(record.id)}"><td>${escapeHtml(pending ? "Pending" : record.job.invoiceNumber || "—")}${issue ? `<span class="invoice-review-badge">${escapeHtml(issue)}</span>` : ""}</td><td>${escapeHtml(record.job.number)}</td><td>${escapeHtml(record.address)}</td><td>${escapeHtml(record.job.invoiceDate || "—")}</td><td>${escapeHtml(record.job.payment === "paid" ? record.job.paymentDate || "—" : "—")}</td><td>${pending ? tag("pending") : paymentButton(record)}</td><td>${referralPayable(record) > 0 ? currency(referralPayable(record)) : "—"}</td><td>${currency(record.job.quote)}</td></tr>`; }).join("") || `<tr><td colspan="8">No matching invoices.</td></tr>`;
}
function setView(view) { const labels = { jobs:["Job Board","All work in one shared job register."],calendar:["Calendar","Scheduled jobs from the shared register."],clients:["Clients","All clients from saved quotes."],invoices:["Invoices","Completed or invoiced jobs from the shared register."],accounting:["Accounting","Income, expenses and outstanding invoices by financial year."],profit:["Profit Summary","Paid income, referral payable and operating expenses by financial year."],archive:["Archive","Archived cards are kept here until you restore them."],settings:["Settings","Shared tracker settings."] }; if (!labels[view]) view = "jobs"; state.view = view; try { localStorage.setItem("tracker-view", view); } catch {} document.querySelectorAll(".nav-link[data-view]").forEach((button) => button.classList.toggle("active", button.dataset.view === view)); document.querySelectorAll(".view").forEach((section) => section.classList.toggle("active", section.id === `view-${view}`)); $("#page-title").textContent = labels[view][0]; $("#page-description").textContent = labels[view][1]; $("#add-job").style.display = view === "jobs" ? "inline-block" : "none"; if (view === "invoices") renderQuotes(); if (view === "archive") renderArchive(); if (view === "profit") renderProfit(); if (view === "accounting") renderAccounting(); }
document.addEventListener("DOMContentLoaded", () => { $("#search").addEventListener("input", (e) => { state.search = e.target.value; render(); }); $("#sort").addEventListener("change", (e) => { state.sort=e.target.value; render(); }); $("#jobs-body").addEventListener("click", (e) => { const row=e.target.closest("tr[data-id]"); if(row) openDrawer(state.records.find((record)=>record.id===row.dataset.id)); }); $("#invoices-body").addEventListener("click", (e) => { const control = e.target.closest("[data-payment-toggle]"); if (control) togglePayment(control.dataset.paymentToggle); }); $("#invoice-summary").addEventListener("click", (e) => { const control = e.target.closest("[data-invoice-filter]"); if (!control) return; state.invoiceFilter = state.invoiceFilter === control.dataset.invoiceFilter ? "all" : control.dataset.invoiceFilter; renderQuotes(); }); $("#invoice-filter-note").addEventListener("click", (e) => { if (e.target.closest("[data-invoice-filter='all']")) { state.invoiceFilter = "all"; state.invoiceFY = ""; state.invoiceQuarter = ""; renderQuotes(); } }); $("#invoice-fy").addEventListener("change", (e) => { state.invoiceFY = e.target.value; renderQuotes(); }); $("#invoice-quarter").addEventListener("change", (e) => { state.invoiceQuarter = e.target.value; renderQuotes(); }); $("#archive-body").addEventListener("click", (e) => { const deleteControl = e.target.closest("[data-delete-card]"); const restoreControl = e.target.closest("[data-restore-card]"); if (deleteControl) permanentlyDeleteArchivedJob(deleteControl.dataset.deleteCard); else if (restoreControl) restoreJob(restoreControl.dataset.restoreCard); }); $("#payment-date-cancel").addEventListener("click",closePaymentDateModal); $("#payment-date-skip").addEventListener("click",()=>{ const id = state.paymentRecordId; closePaymentDateModal(); if (id) setPayment(id,"paid",""); }); $("#payment-date-save").addEventListener("click",()=>{ const id = state.paymentRecordId; const date = $("#payment-date").value; closePaymentDateModal(); if (id) setPayment(id,"paid",date); }); $("#add-job").addEventListener("click",()=>openDrawer()); $("#close-drawer").addEventListener("click",closeDrawer); $("#cancel-edit").addEventListener("click",closeDrawer); $("#job-form").addEventListener("submit",saveJob); $("#job-quote").addEventListener("input", updateMarkupAmount); $("#job-markup").addEventListener("input", updateMarkupAmount); $("#job-markup-amount").addEventListener("input", updateMarkupPercentage); $("#refresh-button").addEventListener("click",loadRecords); $("#sidebar-toggle").addEventListener("click", () => { const open = document.body.classList.toggle("sidebar-open"); $("#sidebar-toggle").setAttribute("aria-expanded", String(open)); $("#sidebar-toggle").setAttribute("aria-label", open ? "Hide sidebar" : "Show sidebar"); $("#sidebar-toggle").textContent = open ? "‹" : "›"; }); document.querySelectorAll(".nav-link[data-view]").forEach((button)=>button.addEventListener("click",()=>{ setView(button.dataset.view); loadRecords(); })); document.addEventListener("visibilitychange", () => { if (!document.hidden) loadRecords(); }); setView(state.view); loadRecords(); window.setInterval(loadRecords, 30000); });
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
document.addEventListener("DOMContentLoaded", () => {
  $("#profit-fy").addEventListener("change", (event) => { state.profitFY = event.target.value; renderProfit(); });
  $("#accounting-fy").addEventListener("change", (event) => { state.accountingFY = event.target.value; renderAccounting(); });
  $("#add-expense").addEventListener("click", openExpenseModal);
  $("#accounting-add-expense").addEventListener("click", openExpenseModal);
  $("#expense-cancel").addEventListener("click", closeExpenseModal);
  $("#expense-form").addEventListener("submit", addExpense);
  $("#expense-body").addEventListener("click", (event) => { const button = event.target.closest("[data-delete-expense]"); if (button) deleteExpense(button.dataset.deleteExpense); });

  // Opening an invoice row shows the same job detail drawer used by the Jobs page.
  $("#invoices-body").addEventListener("click", (event) => {
    if (event.target.closest("[data-payment-toggle]")) return;
    const row = event.target.closest("tr[data-id]");
    if (row) openDrawer(state.records.find((record) => record.id === row.dataset.id));
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const invoiceModal = $("#invoice-builder-modal");
  const invoiceFields = ["#invoice-client", "#invoice-address", "#invoice-number", "#invoice-date", "#invoice-due-date", "#invoice-terms", "#invoice-description", "#invoice-quantity", "#invoice-unit-price", "#invoice-note"];
  const dateForInvoice = (value) => value ? new Date(`${value}T00:00:00`).toLocaleDateString("en-AU") : "—";
  const dueDateFor = (date, days) => { if (!date) return ""; const value = new Date(`${date}T00:00:00`); value.setDate(value.getDate() + Math.max(0, Number(days) || 0)); return value.toISOString().slice(0,10); };
  const splitInvoiceDescription = (text, maxLength = 260) => {
    const chunks = [];
    String(text || "—").split(/\r?\n+/).forEach((paragraph) => {
      const words = paragraph.trim().split(/\s+/).filter(Boolean);
      let chunk = "";
      words.forEach((word) => {
        const next = chunk ? `${chunk} ${word}` : word;
        if (chunk && next.length > maxLength) { chunks.push(chunk); chunk = word; } else chunk = next;
      });
      if (chunk) chunks.push(chunk);
    });
    return chunks.length ? chunks : ["—"];
  };
  function renderPrintInvoicePages(descriptionChunks, quantity, unitPrice, subtotal, gst, total) {
    // Page one carries the invoice information, so it deliberately has less
    // description space. Continuation pages are description-only.
    const firstPageCapacity = 1450;
    const finalPageCapacity = 700;
    const middlePageCapacity = 1500;
    const pages = [];
    const remaining = [...descriptionChunks];
    const characterCount = () => remaining.reduce((sum, chunk) => sum + chunk.length, 0);
    const takeForPage = (capacity) => {
      const chunks = [];
      let used = 0;
      while (remaining.length && (!chunks.length || used + remaining[0].length <= capacity)) {
        const chunk = remaining.shift();
        chunks.push(chunk);
        used += chunk.length;
      }
      return chunks;
    };
    if (characterCount() <= firstPageCapacity) pages.push({ chunks:takeForPage(firstPageCapacity), final:true });
    else {
      pages.push({ chunks:takeForPage(firstPageCapacity), final:false });
      while (characterCount() > finalPageCapacity) {
        pages.push({ chunks:takeForPage(Math.min(middlePageCapacity, Math.max(1, characterCount() - finalPageCapacity))), final:false });
      }
      pages.push({ chunks:takeForPage(finalPageCapacity), final:true });
    }
    const client = escapeHtml($("#invoice-client").value || "Client");
    const address = escapeHtml($("#invoice-address").value || "Billing address");
    const number = escapeHtml($("#invoice-number").value || "Draft");
    const date = escapeHtml(dateForInvoice($("#invoice-date").value));
    const dueDate = escapeHtml(dateForInvoice($("#invoice-due-date").value));
    const terms = escapeHtml(`${$("#invoice-terms").value || 0} Days`);
    const note = escapeHtml($("#invoice-note").value || "");
    $("#invoice-print-pages").innerHTML = pages.map((page, pageIndex) => {
      const isFirstPage = pageIndex === 0;
      const description = page.chunks.map(escapeHtml).join("<br><br>");
      const rows = `<tr class="invoice-print-content-row"><td>${description}</td><td>${isFirstPage ? quantity.toFixed(quantity % 1 ? 2 : 0) : ""}</td><td>${isFirstPage ? currency(unitPrice) : ""}</td><td>${isFirstPage ? "10% GST" : ""}</td><td>${isFirstPage ? currency(subtotal) : ""}</td></tr>`;
      const ending = page.final ? `<div class="invoice-payment-terms">Payment terms: ${terms}</div><div class="invoice-totals"><div><span>Untaxed Amount</span><strong>${currency(subtotal)}</strong></div><div><span>GST 10%</span><strong>${currency(gst)}</strong></div><div class="grand"><span>Total</span><strong>${currency(total)}</strong></div></div><footer class="invoice-footer"><p><strong>Payment Communication: ${number}</strong></p><p><strong>Note:</strong><br>${note}</p><p><strong>Bank Detail</strong><br>SWIFT: CTBAAU2S<br>Bank Name: Commonwealth Bank<br>Account Name: Eastern Group VIC<br>BSB: 063 109<br>Account Number: 13349243 (AUD ONLY)<br>Bank Address: 28 Main Street, Box Hill, VIC 3128<br>"Please mark \"AUD only\" on bank instruction."</p></footer>` : "";
      const pageHeader = isFirstPage ? `<header class="invoice-paper-header"><div class="invoice-company">Melbourne VIC Australia<br><strong>ABN: 67651973711</strong></div><div class="invoice-brand"><img src="./assets/eastern-home-service-logo-clean.png" alt="Eastern Home Services"></div></header><h2 class="invoice-title">Tax Invoice ${number}</h2><div class="invoice-customer"><strong>${client}</strong><br>${address}</div><div class="invoice-meta"><div><span>Invoice Date</span><strong>${date}</strong></div><div><span>Due Date</span><strong>${dueDate}</strong></div></div>` : `<header class="invoice-paper-header"><div class="invoice-company">Melbourne VIC Australia<br><strong>ABN: 67651973711</strong></div><div class="invoice-brand"><img src="./assets/eastern-home-service-logo-clean.png" alt="Eastern Home Services"></div></header><div class="invoice-continuation-rule"></div><div class="invoice-continuation-label">Description (continued)</div>`;
      const table = isFirstPage ? `<table class="invoice-lines invoice-print-grid"><thead><tr><th>Description</th><th>Quantity</th><th>Unit Price</th><th>Taxes</th><th>Amount</th></tr></thead><tbody>${rows}</tbody></table>` : `<table class="invoice-lines invoice-print-grid invoice-continuation-lines"><tbody>${rows}</tbody></table>`;
      return `<article class="invoice-paper invoice-print-page${isFirstPage ? "" : " invoice-print-continuation"}${page.final ? " invoice-print-final" : ""}">${pageHeader}${table}${ending}<div class="invoice-page-footer"><strong>Your Home Maintenance and Service Solution</strong><br><small>Page ${pageIndex + 1} / ${pages.length}</small></div></article>`;
    }).join("");
  }
  const closeInvoiceBuilder = () => invoiceModal.classList.remove("open");
  function renderInvoicePreview() {
    const quantity = Math.max(0, Number($("#invoice-quantity").value) || 0);
    const unitPrice = Math.max(0, Number($("#invoice-unit-price").value) || 0);
    const subtotal = quantity * unitPrice;
    const gst = subtotal * .1;
    const total = subtotal + gst;
    $("#invoice-preview-number").textContent = $("#invoice-number").value || "Draft";
    $("#invoice-preview-client").textContent = $("#invoice-client").value || "Client";
    $("#invoice-preview-address").textContent = $("#invoice-address").value || "Billing address";
    $("#invoice-preview-date").textContent = dateForInvoice($("#invoice-date").value);
    $("#invoice-preview-due-date").textContent = dateForInvoice($("#invoice-due-date").value);
    $("#invoice-preview-terms-copy").textContent = `${$("#invoice-terms").value || 0} Days`;
    const descriptionChunks = splitInvoiceDescription($("#invoice-description").value);
    $("#invoice-lines-body").innerHTML = descriptionChunks.map((chunk, index) => `<tr${index ? ' class="invoice-description-continuation"' : ""}><td>${escapeHtml(chunk)}</td><td>${index ? "" : quantity.toFixed(quantity % 1 ? 2 : 0)}</td><td>${index ? "" : currency(unitPrice)}</td><td>${index ? "" : "10% GST"}</td><td>${index ? "" : currency(subtotal)}</td></tr>`).join("");
    $("#invoice-preview-subtotal").textContent = currency(subtotal);
    $("#invoice-preview-gst").textContent = currency(gst);
    $("#invoice-preview-total").textContent = currency(total);
    $("#invoice-preview-reference").textContent = $("#invoice-number").value || "—";
    $("#invoice-preview-note").textContent = $("#invoice-note").value || "";
    renderPrintInvoicePages(descriptionChunks, quantity, unitPrice, subtotal, gst, total);
  }
  function openInvoiceBuilder() {
    if (!state.selected) { window.alert("Save the job first, then create its invoice."); return; }
    const job = state.selected.job || {};
    const invoice = job.invoice || {};
    const isExistingInvoice = Boolean(invoice.number);
    const today = new Date().toISOString().slice(0,10);
    const date = isExistingInvoice ? (invoice.date || job.invoiceDate || today) : today;
    const terms = Number(invoice.termsDays) >= 0 ? invoice.termsDays : 30;
    $("#invoice-client").value = invoice.client || state.selected.customerName || "";
    $("#invoice-address").value = invoice.address || state.selected.address || "";
    $("#invoice-number").value = invoice.number || job.invoiceNumber || nextInvoiceNumber();
    $("#invoice-date").value = date;
    $("#invoice-terms").value = terms;
    $("#invoice-due-date").value = isExistingInvoice && invoice.dueDate ? invoice.dueDate : dueDateFor(date, terms);
    $("#invoice-description").value = invoice.description || job.detail || "";
    $("#invoice-quantity").value = invoice.quantity || 1;
    $("#invoice-unit-price").value = Number.isFinite(Number(invoice.unitPrice)) ? Number(invoice.unitPrice).toFixed(2) : (Number(job.quote || 0) / 1.1).toFixed(2);
    $("#invoice-note").value = invoice.note || "Price including labour and materials cost. Not including rubbish disposal unless mentioned.";
    $("#invoice-builder-title").textContent = isExistingInvoice ? "View / edit tax invoice" : "Create tax invoice";
    $("#invoice-builder-title").nextElementSibling.textContent = isExistingInvoice ? "Update the invoice details, then save your changes to the shared tracker." : "Review the details, then save the invoice to the shared tracker.";
    $("#invoice-save").textContent = isExistingInvoice ? "Save changes" : "Save invoice";
    renderInvoicePreview();
    invoiceModal.classList.add("open");
  }
  invoiceFields.forEach((selector) => $(selector).addEventListener("input", renderInvoicePreview));
  const refreshDueDate = () => { $("#invoice-due-date").value = dueDateFor($("#invoice-date").value, $("#invoice-terms").value); renderInvoicePreview(); };
  $("#invoice-date").addEventListener("change", refreshDueDate);
  $("#invoice-terms").addEventListener("input", refreshDueDate);
  $("#invoice-terms").addEventListener("change", refreshDueDate);
  $("#create-invoice").addEventListener("click", openInvoiceBuilder);
  $("#invoice-builder-close").addEventListener("click", closeInvoiceBuilder);
  $("#invoice-builder-cancel").addEventListener("click", closeInvoiceBuilder);
  $("#invoice-print").addEventListener("click", () => window.print());
  $("#invoice-save").addEventListener("click", async () => {
    if (!state.selected || !$("#invoice-builder-form").reportValidity()) return;
    const quantity = Math.max(0, Number($("#invoice-quantity").value) || 0);
    const unitPrice = Math.max(0, Number($("#invoice-unit-price").value) || 0);
    const total = quantity * unitPrice * 1.1;
    const invoice = { number:$("#invoice-number").value.trim(), date:$("#invoice-date").value, dueDate:$("#invoice-due-date").value, termsDays:Number($("#invoice-terms").value), client:$("#invoice-client").value.trim(), address:$("#invoice-address").value.trim(), description:$("#invoice-description").value.trim(), quantity, unitPrice, note:$("#invoice-note").value.trim(), status:"issued" };
    const record = { ...state.selected, customerName:invoice.client || state.selected.customerName, address:invoice.address || state.selected.address, totalQuote:currency(total), subtotalExGst:currency(quantity * unitPrice), gstTotal:currency(quantity * unitPrice * .1), jobStage:"invoiced", job:{ ...state.selected.job, detail:invoice.description || state.selected.job.detail, quote:total, status:"invoiced", boardOrder:-Date.now(), invoiceNumber:invoice.number, invoiceDate:invoice.date, invoice } };
    try {
      const saved = normalise(await request(`?id=${encodeURIComponent(record.id)}`, { method:"PATCH", body:JSON.stringify(record) }));
      state.records = state.records.map((item) => item.id === saved.id ? saved : item);
      state.selected = saved;
      $("#job-invoice").value = invoice.number;
      $("#job-invoice-date").value = invoice.date;
      $("#job-quote").value = (total / 1.1).toFixed(2);
      updateMarkupAmount();
      closeInvoiceBuilder(); closeDrawer(); setView("invoices"); render();
    } catch (error) { window.alert("Unable to save this invoice to the shared tracker. Check the cloud connection and try again."); console.warn(error); }
  });
});

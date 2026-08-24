const API = "./api/quote-records";
const state = { records: [], search: "", sort: "newest", view: "jobs", layout: "board", selected: null };
const $ = (selector) => document.querySelector(selector);
const currency = (value) => new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD" }).format(Number(value) || 0);
const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (character) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" })[character]);
const normalise = (record) => {
  const job = record.job && typeof record.job === "object" ? record.job : {};
  return { ...record, job: { number: job.number || record.quoteNumber || "", detail: job.detail || job.description || "", quote: Number(job.quote ?? String(record.totalQuote || "").replace(/[^0-9.-]/g, "")) || 0, markup: Number(job.markup) || 0, status: job.status || record.jobStage || "quoted", payment: job.payment === "pending" ? "unpaid" : (job.payment || "unpaid"), referral: job.referral || "pending", invoiceNumber: job.invoiceNumber || "", invoiceDate: job.invoiceDate || "", scheduledDate: job.scheduledDate || "", archived: job.archived === true, boardOrder: Number.isFinite(Number(job.boardOrder)) ? Number(job.boardOrder) : null } };
};
async function request(path = "", options = {}) { const response = await fetch(`${API}${path}`, { headers: { "Content-Type":"application/json", ...(options.headers || {}) }, ...options }); if (!response.ok) throw new Error(await response.text()); return response.status === 204 ? null : response.json(); }
async function loadRecords() { $("#sync-state").innerHTML = "<span></span> Syncing shared data"; try { state.records = (await request()).map(normalise); $("#sync-state").innerHTML = "<span></span> Shared data is up to date"; render(); } catch (error) { $("#sync-state").innerHTML = "<span></span> Offline — unable to sync"; render(); console.warn(error); } }
function activeRecords() { return state.records.filter((record) => !record.job.archived); }
function filtered() { const term = state.search.trim().toLowerCase(); const items = activeRecords().filter((record) => { const j = record.job; return !term || [j.number,record.customerName,record.address,j.detail].some((value) => String(value || "").toLowerCase().includes(term)); }); return items.sort((a,b) => state.sort === "address" ? String(a.address).localeCompare(String(b.address)) : state.sort === "quote-high" ? b.job.quote-a.job.quote : state.sort === "status" ? a.job.status.localeCompare(b.job.status) : new Date(b.submittedAt)-new Date(a.submittedAt)); }
function tag(value) { const label = value === "not-applicable" ? "Not applicable" : value.charAt(0).toUpperCase() + value.slice(1); return `<span class="tag ${escapeHtml(value)}">${escapeHtml(label)}</span>`; }
function paymentButton(record) { const value = record.job.payment === "paid" ? "paid" : "unpaid"; const label = value === "paid" ? "Paid" : "Unpaid"; return `<button class="tag payment-toggle ${value}" type="button" data-payment-toggle="${escapeHtml(record.id)}" aria-label="Change payment status for ${escapeHtml(record.address)}">${label}</button>`; }
function renderJobs() { const items = filtered(); $("#jobs-body").innerHTML = items.map((record) => { const j = record.job; return `<tr data-id="${escapeHtml(record.id)}"><td>${escapeHtml(j.number)}</td><td class="address">${escapeHtml(record.address)}</td><td class="detail">${escapeHtml(j.detail || "—")}</td><td class="money">${currency(j.quote)}</td><td>${j.markup ? `${j.markup}%` : "—"}</td><td>${tag(j.status)}</td><td>${tag(j.payment)}</td><td>${tag(j.referral)}</td><td>${escapeHtml(j.invoiceNumber || "—")}</td><td>${escapeHtml(j.invoiceDate || "—")}</td></tr>`; }).join(""); $("#jobs-empty").style.display = items.length ? "none" : "block"; $("#result-count").textContent = `${items.length} job${items.length === 1 ? "" : "s"}`; $("#quote-total").textContent = currency(items.filter((record) => record.job.status === "quoted").reduce((sum, record) => sum + record.job.quote, 0)); $("#invoice-total").textContent = currency(items.filter((record) => record.job.status === "invoiced").reduce((sum, record) => sum + record.job.quote, 0)); }
const boardStages = ["quoted", "confirmed", "scheduled", "completed", "invoiced", "follow_up"];
const boardLabels = { quoted:"Quotes", confirmed:"Confirmed", scheduled:"Scheduled", completed:"Completed", invoiced:"Invoiced", follow_up:"Follow up" };
function boardOrder(record) { return Number.isFinite(record.job.boardOrder) ? record.job.boardOrder : -new Date(record.submittedAt).getTime(); }
function stageJobs(records, stage, exceptId = "") { return records.filter((record) => record.job.status === stage && record.id !== exceptId).sort((a, b) => boardOrder(a) - boardOrder(b)); }
function renderBoard() {
  const records = filtered().filter((record) => !record.job.archived);
  $("#job-board").innerHTML = boardStages.map((stage) => {
    const jobs = stageJobs(records, stage);
    const cards = jobs.length ? jobs.map((record) => `<article class="board-card" draggable="true" data-job-id="${escapeHtml(record.id)}"><div class="board-card-top"><span>⠿ &nbsp;${escapeHtml(record.address && record.address !== "-" ? record.address : "Address not added")}</span><span>✎</span></div><div class="board-card-content"><div class="board-card-bottom"><span>Quote</span><strong>${currency(record.job.quote)}</strong></div></div></article>`).join("") : `<div class="board-empty">Drop card here</div>`;
    return `<section class="board-column board-${stage}"><header class="board-head"><strong>${boardLabels[stage]} <span>${jobs.length}</span></strong><button class="lane-add" type="button" data-new-job-stage="${stage}">＋ Add job</button></header><div class="board-dropzone" data-stage="${stage}">${cards}</div><button class="lane-add lane-add-bottom" type="button" data-new-job-stage="${stage}">＋ Add job</button></section>`;
  }).join("");
}
function renderCalendar() { const scheduled = activeRecords().filter((record) => record.job.scheduledDate).sort((a,b) => String(a.job.scheduledDate).localeCompare(String(b.job.scheduledDate))); $("#calendar-grid").innerHTML = scheduled.length ? scheduled.map((record) => `<article class="calendar-item"><strong>${escapeHtml(record.job.number)} · ${escapeHtml(record.address)}</strong><span>${escapeHtml(record.job.scheduledDate)} · ${escapeHtml(record.job.detail || "Job scheduled")}</span></article>`).join("") : `<div class="empty" style="display:block">Add a scheduled date to a job to see it here.</div>`; }
function renderClients() { const clients = [...new Map(activeRecords().filter((r) => r.customerName && r.customerName !== "-").map((r) => [r.customerName, r])).values()]; $("#client-list").innerHTML = clients.map((record) => `<article class="client-item"><strong>${escapeHtml(record.customerName)}</strong><span>${escapeHtml(record.phone || "No phone")} · ${escapeHtml(record.address || "No address")}</span></article>`).join("") || `<div class="empty" style="display:block">Clients will appear when quotes are saved.</div>`; }
function renderTasks() { const active = activeRecords().filter((record) => !["completed"].includes(record.job.status)); $("#task-list").innerHTML = active.map((record) => `<article class="task-item"><strong>${escapeHtml(record.job.number)} · ${escapeHtml(record.address)}</strong><span>${escapeHtml(record.job.detail || "No job detail added")}</span><div class="task-meta"><em>${escapeHtml(record.job.status === "quoted" ? "Follow up quote" : record.job.status === "confirmed" ? "Schedule the job" : "Complete scheduled work")}</em><b>Quote ${currency(record.job.quote)}</b></div></article>`).join("") || `<div class="empty" style="display:block">No active tasks.</div>`; }
function renderReports() { const all = activeRecords(); const paid = all.filter((record) => record.job.payment === "paid"); $("#report-grid").innerHTML = `<article class="report-card"><span>Total quotations</span><strong>${currency(all.reduce((sum, r) => sum + r.job.quote, 0))}</strong></article><article class="report-card"><span>Paid jobs</span><strong>${paid.length}</strong></article><article class="report-card"><span>Completed jobs</span><strong>${all.filter((r) => r.job.status === "completed").length}</strong></article>`; }
function render() { renderJobs(); renderBoard(); renderCalendar(); renderClients(); renderTasks(); renderReports(); renderQuotes(); }
async function placeJob(id, status, index) {
  const record = state.records.find((item) => item.id === id);
  if (!record) return;
  const jobs = stageJobs(state.records, status, id);
  const before = jobs[index - 1];
  const after = jobs[index];
  const order = before && after ? (boardOrder(before) + boardOrder(after)) / 2 : before ? boardOrder(before) + 1 : after ? boardOrder(after) - 1 : -Date.now();
  const previous = record;
  const updated = normalise({ ...record, jobStage: status, job: { ...record.job, status, boardOrder: order } });
  state.records = state.records.map((item) => item.id === id ? updated : item);
  render();
  try {
    const saved = normalise(await request(`?id=${encodeURIComponent(id)}`, { method:"PATCH", body:JSON.stringify(updated) }));
    state.records = state.records.map((item) => item.id === id ? saved : item);
    render();
  } catch (error) {
    state.records = state.records.map((item) => item.id === id ? previous : item);
    render();
    window.alert("The job could not be moved in the shared tracker. Please try again.");
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
async function togglePayment(id) {
  const record = state.records.find((item) => item.id === id);
  if (!record) return;
  const previous = record;
  const payment = record.job.payment === "paid" ? "unpaid" : "paid";
  const updated = normalise({ ...record, job: { ...record.job, payment } });
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
function closeCardMenu() { const menu = $("#card-menu"); if (menu) menu.classList.remove("open"); state.menuJobId = null; }
function openCardMenu(event, id) {
  const menu = $("#card-menu");
  state.menuJobId = id;
  menu.classList.add("open");
  menu.style.visibility = "hidden";
  menu.style.left = "0px";
  menu.style.top = "0px";
  const bounds = menu.getBoundingClientRect();
  menu.style.left = `${Math.min(event.clientX, window.innerWidth - bounds.width - 8)}px`;
  menu.style.top = `${Math.min(event.clientY, window.innerHeight - bounds.height - 8)}px`;
  menu.style.visibility = "";
}
function openDrawer(record = null, defaultStage = "quoted") { state.selected = record; const j = record?.job || {}; $("#drawer-title").textContent = record ? j.number || "Edit job" : "New job"; $("#record-id").value = record?.id || ""; $("#job-number").value = j.number || `J-${String(Date.now()).slice(-5)}`; $("#job-client").value = record?.customerName && record.customerName !== "-" ? record.customerName : ""; $("#job-address").value = record?.address && record.address !== "-" ? record.address : ""; $("#job-detail").value = j.detail || ""; $("#job-quote").value = j.quote || ""; $("#job-markup").value = j.markup || ""; $("#job-status").value = j.status || defaultStage; $("#job-payment").value = j.payment === "paid" ? "paid" : "unpaid"; $("#job-referral").value = j.referral || "pending"; $("#job-invoice").value = j.invoiceNumber || ""; $("#job-invoice-date").value = j.invoiceDate || ""; $("#job-scheduled-date").value = j.scheduledDate || ""; $("#drawer").classList.add("open"); $("#drawer").setAttribute("aria-hidden", "false"); }
function closeDrawer() { $("#drawer").classList.remove("open"); $("#drawer").setAttribute("aria-hidden", "true"); }
function formRecord() { const base = state.selected ? { ...state.selected } : { id: crypto.randomUUID(), recordType:"general", sector:"General", submittedAt:new Date().toISOString(), phone:"", email:"", subtotalExGst:"$0.00", gstTotal:"$0.00", blindItems:[], curtainItems:[] }; const quote = Number($("#job-quote").value) || 0; return { ...base, customerName: $("#job-client").value.trim() || "-", address: $("#job-address").value.trim(), quoteNumber: $("#job-number").value.trim(), totalQuote: currency(quote), jobStage: $("#job-status").value, job:{ number:$("#job-number").value.trim(), detail:$("#job-detail").value.trim(), quote, markup:Number($("#job-markup").value)||0, status:$("#job-status").value, payment:$("#job-payment").value, referral:$("#job-referral").value, invoiceNumber:$("#job-invoice").value.trim(), invoiceDate:$("#job-invoice-date").value, scheduledDate:$("#job-scheduled-date").value, archived: state.selected?.job?.archived === true, boardOrder: state.selected?.job?.boardOrder ?? undefined } }; }
async function saveJob(event) { event.preventDefault(); const record = formRecord(); try { const saved = normalise(await request(state.selected ? `?id=${encodeURIComponent(record.id)}` : "", { method: state.selected ? "PATCH" : "POST", body: JSON.stringify(record) })); state.records = state.selected ? state.records.map((item) => item.id === saved.id ? saved : item) : [saved, ...state.records]; closeDrawer(); render(); } catch (error) { window.alert("Unable to save this job to the shared tracker. Check the cloud connection and try again."); console.warn(error); } }
function renderQuotes() { const records = activeRecords(); $("#quotes-body").innerHTML = records.map((record) => `<tr data-id="${escapeHtml(record.id)}"><td>${escapeHtml(record.job.number)}</td><td>${escapeHtml(record.address)}</td><td>${escapeHtml(record.job.detail || "—")}</td><td>${currency(record.job.quote)}</td><td>${tag(record.job.status)}</td></tr>`).join("") || `<tr><td colspan="5">No saved quotes yet.</td></tr>`; $("#invoices-body").innerHTML = records.filter((record) => record.job.invoiceNumber || record.job.status === "completed" || record.job.status === "invoiced").map((record) => `<tr data-id="${escapeHtml(record.id)}"><td>${escapeHtml(record.job.invoiceNumber || "—")}</td><td>${escapeHtml(record.job.number)}</td><td>${escapeHtml(record.address)}</td><td>${escapeHtml(record.job.invoiceDate || "—")}</td><td>${paymentButton(record)}</td><td>${currency(record.job.quote)}</td></tr>`).join("") || `<tr><td colspan="6">No invoices recorded yet.</td></tr>`; }
function setView(view) { state.view = view; document.querySelectorAll(".nav-link[data-view]").forEach((button) => button.classList.toggle("active", button.dataset.view === view)); document.querySelectorAll(".view").forEach((section) => section.classList.toggle("active", section.id === `view-${view}`)); const labels = { jobs:["Job Board","All work in one shared job register."],calendar:["Calendar","Scheduled jobs from the shared register."],clients:["Clients","All clients from saved quotes."],quotes:["Quotes","Every quote in the shared register."],invoices:["Invoices","Completed or invoiced jobs from the shared register."],tasks:["Tasks","The next actions for active jobs."],reports:["Reports","Live job and payment summaries."],settings:["Settings","Shared tracker settings."] }; $("#page-title").textContent = labels[view][0]; $("#page-description").textContent = labels[view][1]; $("#add-job").style.display = view === "jobs" ? "inline-block" : "none"; if (view === "quotes" || view === "invoices") renderQuotes(); }
document.addEventListener("DOMContentLoaded", () => { $("#search").addEventListener("input", (e) => { state.search = e.target.value; render(); }); $("#sort").addEventListener("change", (e) => { state.sort=e.target.value; render(); }); $("#jobs-body").addEventListener("click", (e) => { const row=e.target.closest("tr[data-id]"); if(row) openDrawer(state.records.find((record)=>record.id===row.dataset.id)); }); $("#invoices-body").addEventListener("click", (e) => { const control = e.target.closest("[data-payment-toggle]"); if (control) togglePayment(control.dataset.paymentToggle); }); $("#add-job").addEventListener("click",()=>openDrawer()); $("#close-drawer").addEventListener("click",closeDrawer); $("#cancel-edit").addEventListener("click",closeDrawer); $("#job-form").addEventListener("submit",saveJob); $("#refresh-button").addEventListener("click",loadRecords); $("#sidebar-toggle").addEventListener("click", () => { const open = document.body.classList.toggle("sidebar-open"); $("#sidebar-toggle").setAttribute("aria-expanded", String(open)); $("#sidebar-toggle").setAttribute("aria-label", open ? "Hide sidebar" : "Show sidebar"); $("#sidebar-toggle").textContent = open ? "‹" : "›"; }); document.querySelectorAll(".nav-link[data-view]").forEach((button)=>button.addEventListener("click",()=>setView(button.dataset.view))); loadRecords(); window.setInterval(loadRecords, 30000); });
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-layout]").forEach((button) => button.addEventListener("click", () => {
    state.layout = button.dataset.layout;
    document.querySelectorAll("[data-layout]").forEach((item) => item.classList.toggle("active", item === button));
    $("#table-layout").classList.toggle("active", state.layout === "table");
    $("#board-layout").classList.toggle("active", state.layout === "board");
  }));
  $("#job-board").addEventListener("dragstart", (event) => {
    const card = event.target.closest("[data-job-id]");
    if (!card) return;
    state.draggingId = card.dataset.jobId;
    card.classList.add("dragging");
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", card.dataset.jobId);
  });
  $("#job-board").addEventListener("dragend", () => {
    state.draggingId = null;
    document.querySelectorAll(".drag-over,.drop-before,.drop-after").forEach((element) => element.classList.remove("drag-over", "drop-before", "drop-after"));
  });
  $("#job-board").addEventListener("dragover", (event) => {
    const zone = event.target.closest("[data-stage]");
    if (!zone) return;
    event.preventDefault();
    zone.classList.add("drag-over");
    document.querySelectorAll(".drop-before,.drop-after").forEach((element) => element.classList.remove("drop-before", "drop-after"));
    const card = event.target.closest(".board-card[data-job-id]");
    if (card && card.dataset.jobId !== state.draggingId) {
      const bounds = card.getBoundingClientRect();
      card.classList.add(event.clientY < bounds.top + bounds.height / 2 ? "drop-before" : "drop-after");
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
    const id = event.dataTransfer.getData("text/plain");
    const cards = [...zone.querySelectorAll(".board-card[data-job-id]")].filter((card) => card.dataset.jobId !== id);
    const target = event.target.closest(".board-card[data-job-id]");
    let index = cards.length;
    if (target && target.dataset.jobId !== id) {
      const targetIndex = cards.indexOf(target);
      const bounds = target.getBoundingClientRect();
      index = targetIndex + (event.clientY >= bounds.top + bounds.height / 2 ? 1 : 0);
    }
    placeJob(id, zone.dataset.stage, index);
  });
  $("#job-board").addEventListener("contextmenu", (event) => {
    const card = event.target.closest(".board-card[data-job-id]");
    if (!card) return;
    event.preventDefault();
    openCardMenu(event, card.dataset.jobId);
  });
  $("#card-menu").addEventListener("click", (event) => {
    const id = state.menuJobId;
    if (!id) return;
    const action = event.target.closest("[data-card-menu-action]");
    const stage = event.target.closest("[data-card-menu-stage]");
    if (action?.dataset.cardMenuAction === "edit") openDrawer(state.records.find((record) => record.id === id));
    if (action?.dataset.cardMenuAction === "copy") copyJob(id);
    if (action?.dataset.cardMenuAction === "archive") archiveJob(id);
    if (stage) placeJob(id, stage.dataset.cardMenuStage, stageJobs(state.records, stage.dataset.cardMenuStage, id).length);
    closeCardMenu();
  });
  document.addEventListener("pointerdown", (event) => { if (!event.target.closest("#card-menu")) closeCardMenu(); });
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeCardMenu(); });
  $("#job-board").addEventListener("click", (event) => { const add = event.target.closest("[data-new-job-stage]"); if (add) { openDrawer(null, add.dataset.newJobStage); return; } const card = event.target.closest(".board-card[data-job-id]"); if (card) openDrawer(state.records.find((record) => record.id === card.dataset.jobId)); });
});

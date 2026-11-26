document.addEventListener("DOMContentLoaded", () => {
  const form=document.querySelector("#job-form"); if (!form) return;
  const label=id=>document.getElementById(id)?.closest("label");
  const group=id=>document.getElementById(id)?.closest(".gst-row");
  const tabs=document.createElement("div");tabs.className="job-workspace-tabs";tabs.innerHTML='<button type="button" class="active" data-job-tab="details" aria-selected="true">Job Details</button><button type="button" data-job-tab="finance" aria-selected="false">Finance &amp; Invoice</button>';
  const details=document.createElement("section");details.className="job-tab-panel";details.id="job-tab-details";
  const finance=document.createElement("section");finance.className="job-tab-panel";finance.id="job-tab-finance";finance.hidden=true;
  const first=label("job-number"); form.insertBefore(tabs,first);form.insertBefore(details,first);form.insertBefore(finance,first);
  ["job-number","job-client","job-address","job-scheduled-date","job-detail"].forEach(id=>{const item=label(id);if(item)details.append(item)});
  const contact=document.createElement("details");contact.className="job-workspace-collapsible";contact.innerHTML="<summary>Contact &amp; billing details</summary>";["job-phone","job-email","job-email-cc","job-email-bcc"].forEach(id=>{const item=label(id);if(item)contact.append(item)});details.append(contact);
  const notes=document.createElement("details");notes.className="job-workspace-collapsible";notes.innerHTML="<summary>Internal notes &amp; checklist</summary>";[".job-work-panel",".job-record-panel"].forEach(selector=>{const item=form.querySelector(selector);if(item)notes.append(item)});details.append(notes);
  [group("job-quote"),group("job-markup"),label("job-payment"),group("job-payment-amount"),label("job-payment-date"),label("job-referral"),label("job-invoice"),label("job-invoice-date")].forEach(item=>{if(item)finance.append(item)});
  tabs.addEventListener("click",event=>{const button=event.target.closest("[data-job-tab]");if(!button)return;const isDetails=button.dataset.jobTab==="details";details.hidden=!isDetails;finance.hidden=isDetails;tabs.querySelectorAll("button").forEach(b=>{const active=b===button;b.classList.toggle("active",active);b.setAttribute("aria-selected",String(active));});});
});

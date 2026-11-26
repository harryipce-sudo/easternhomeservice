const test=require('node:test'), assert=require('node:assert/strict'), fs=require('node:fs'), vm=require('node:vm');
test('overview excludes unpaid referrals and past appointments',()=>{
 const source=fs.readFileSync('tracker.js','utf8'); const code=source.slice(source.indexOf('function renderToday() {'),source.indexOf('function clientContacts()'));
 const nodes={}; const day=new Date(); const iso=d=>{const y=d.getFullYear(),m=String(d.getMonth()+1).padStart(2,'0'),x=String(d.getDate()).padStart(2,'0');return `${y}-${m}-${x}`}; const offset=n=>{let d=new Date();d.setDate(d.getDate()+n);return iso(d)};
 const row=(id,payment,referral,markup=50)=>({id,address:id,job:{status:'invoiced',invoiceNumber:id,quote:330,markup,payment,referral}});
 const records=[row('eligible','paid','pending'),row('unpaid','unpaid','pending'),row('partial','partially-paid','pending'),row('paid-referral','paid','paid'),row('no-referral','paid','pending',0),row('na','paid','not-applicable'),{id:'old',address:'PAST JOB',job:{status:'scheduled',scheduledDate:offset(-1)}},{id:'future',address:'UPCOMING JOB',job:{status:'confirmed',scheduledDate:offset(1)}}];
 const ctx={Date,Intl,activeRecords:()=>records,invoicedRecords:items=>items.filter(r=>r.job.status==='invoiced'),dateToIso:iso,invoiceOverdue:()=>({late:false}),markupAmountExGst:j=>j.markup?100:0,currency:n=>`$${n.toFixed(2)}`,escapeHtml:String,savedClientName:()=>'',displayDate:String,$:id=>nodes[id]??=( {innerHTML:'',textContent:''})};vm.runInNewContext(code+';renderToday()',ctx);
 assert.match(nodes['#overview-metrics'].innerHTML,/Referral due for payment[\s\S]*?\$110\.00[\s\S]*?1 invoice/);assert.match(nodes['#overview-appointments'].innerHTML,/UPCOMING JOB/);assert.doesNotMatch(nodes['#overview-appointments'].innerHTML,/PAST JOB/);
});

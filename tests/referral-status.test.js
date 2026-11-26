const test = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const handler = require('../api/client-invoices');
test('client referral totals use referral status independently of invoice payments', async () => {
 const original = global.fetch; const oldUrl = process.env.SUPABASE_URL; const oldKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
 process.env.SUPABASE_URL='https://example.invalid'; process.env.SUPABASE_SERVICE_ROLE_KEY='test';
 const tokenHash=crypto.createHash('sha256').update('test-access').digest('hex');
 const row=(id,payment,referral,markup=50)=>({customer_name:'Test client',address:'Test',payload:{job:{status:'invoiced',invoiceNumber:String(id),quote:330,markup,payment,referral}}});
 const rows=[{payload:{recordType:'tracker-board-settings',job:{clientPortalTokens:[{clientName:'Test client',tokenHash}]}}},row(1,'paid','pending'),row(2,'unpaid','paid'),row(3,'unpaid','pending',0),row(4,'paid','not-applicable')];
 global.fetch=async()=>({ok:true,json:async()=>rows});
 let body; const res={setHeader(){},status(){return this},json(value){body=value;return value}};
 try { await handler({method:'GET',query:{access:'test-access'}},res); assert.equal(body.totalReferralFee,110); assert.equal(body.unpaidReferralInvoiceCount,1); assert.equal(body.paidReferralTotal,110); assert.equal(body.paidReferralInvoiceCount,1); assert.equal(body.invoices.length,2); assert.equal(body.paidInvoices.length,2); }
 finally {global.fetch=original; if(oldUrl===undefined) delete process.env.SUPABASE_URL; else process.env.SUPABASE_URL=oldUrl; if(oldKey===undefined) delete process.env.SUPABASE_SERVICE_ROLE_KEY; else process.env.SUPABASE_SERVICE_ROLE_KEY=oldKey;}
});

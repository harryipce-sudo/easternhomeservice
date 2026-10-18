const assert = require("node:assert/strict");
const test = require("node:test");

const handler = require("../api/send-invoice-email");

function response(status = 200, body = {}) {
  return new Response(JSON.stringify(body), { status, headers:{ "Content-Type":"application/json" } });
}

function makeResponse() {
  return {
    statusCode:0,
    body:null,
    status(code) { this.statusCode = code; return this; },
    json(body) { this.body = body; return this; }
  };
}

function restoreEnv(values) {
  Object.entries(values).forEach(([key, value]) => {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  });
}

const invoiceRecord = {
  id:"record-1",
  payload:{
    job:{
      status:"invoiced",
      payment:"unpaid",
      invoiceNumber:"INV-25228",
      quote:2398,
      invoice:{ dueDate:"2026-10-06", sourceDocument:{ bucket:"invoice-documents", path:"odoo/test.pdf" } }
    }
  }
};

test("sends a private invoice PDF with multiple CC recipients and records the result", async () => {
  const originalFetch = global.fetch;
  const originalEnv = { RESEND_API_KEY:process.env.RESEND_API_KEY, RESEND_FROM_EMAIL:process.env.RESEND_FROM_EMAIL, SUPABASE_URL:process.env.SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY:process.env.SUPABASE_SERVICE_ROLE_KEY };
  const calls = [];
  process.env.RESEND_API_KEY = "test-key";
  process.env.RESEND_FROM_EMAIL = "Eastern Home Service <invoices@example.com>";
  process.env.SUPABASE_URL = "https://supabase.example";
  process.env.SUPABASE_SERVICE_ROLE_KEY = "test-service-key";
  global.fetch = async (url, options = {}) => {
    calls.push({ url:String(url), options });
    if (String(url).includes("quote_records?select=")) return response(200, [invoiceRecord]);
    if (String(url).includes("/storage/v1/object/")) return new Response(Buffer.from("%PDF-test"), { status:200 });
    if (String(url) === "https://api.resend.com/emails") return response(200, { id:"email-1" });
    if (String(url).includes("quote_records?id=eq.record-1")) return response(200, [invoiceRecord]);
    throw new Error(`Unexpected request: ${url}`);
  };
  try {
    const res = makeResponse();
    await handler({ method:"POST", body:{ recordId:"record-1", kind:"reminder", to:"accounts@example.com", cc:"manager@example.com; team@example.com", subject:"Reminder", message:"Please arrange payment." } }, res);
    assert.equal(res.statusCode, 200);
    assert.equal(res.body.ok, true);
    const resend = calls.find((call) => call.url === "https://api.resend.com/emails");
    const payload = JSON.parse(resend.options.body);
    assert.deepEqual(payload.cc, ["manager@example.com", "team@example.com"]);
    assert.equal(payload.attachments[0].filename, "INV-25228.pdf");
    assert.match(payload.text, /amount due/i);
  } finally {
    global.fetch = originalFetch;
    restoreEnv(originalEnv);
  }
});

test("rejects malformed CC addresses before any email is sent", async () => {
  const originalEnv = { RESEND_API_KEY:process.env.RESEND_API_KEY, RESEND_FROM_EMAIL:process.env.RESEND_FROM_EMAIL, SUPABASE_URL:process.env.SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY:process.env.SUPABASE_SERVICE_ROLE_KEY };
  process.env.RESEND_API_KEY = "test-key";
  process.env.RESEND_FROM_EMAIL = "Eastern Home Service <invoices@example.com>";
  process.env.SUPABASE_URL = "https://supabase.example";
  process.env.SUPABASE_SERVICE_ROLE_KEY = "test-service-key";
  try {
    const res = makeResponse();
    await handler({ method:"POST", body:{ recordId:"record-1", to:"accounts@example.com", cc:"not-an-email", subject:"Invoice", message:"Attached." } }, res);
    assert.equal(res.statusCode, 400);
    assert.match(res.body.error, /valid email/i);
  } finally {
    restoreEnv(originalEnv);
  }
});

const ALLOWED_ORIGINS = new Set([
  "https://easternhomeservice.vercel.app",
  "http://127.0.0.1:4173",
  "http://localhost:4173"
]);

function setCorsHeaders(req, res) {
  const origin = req.headers.origin;
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function getSupabaseHeaders() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serverKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;

  if (!supabaseUrl || !serverKey) {
    return null;
  }

  const headers = {
    apikey: serverKey,
    "Content-Type": "application/json",
    Prefer: "return=representation"
  };

  // Legacy service_role keys can still be sent as Bearer JWTs.
  if (!serverKey.startsWith("sb_secret_")) {
    headers.Authorization = `Bearer ${serverKey}`;
  }

  return {
    supabaseUrl,
    headers
  };
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD"
  }).format(Number.isFinite(value) ? value : 0);
}

function parseCurrency(value) {
  if (typeof value === "number") {
    return Number.isFinite(value) ? Number(value.toFixed(2)) : 0;
  }

  const numeric = Number(String(value ?? "").replace(/[^0-9.-]+/g, ""));
  return Number.isFinite(numeric) ? Number(numeric.toFixed(2)) : 0;
}

function normalizeArray(value) {
  return Array.isArray(value) ? value : [];
}

function appendJobActivity(record, message) {
  const job = record.job && typeof record.job === "object" ? record.job : {};
  const activity = Array.isArray(job.activity) ? job.activity : [];
  return {
    ...record,
    job: {
      ...job,
      activity: [...activity, { at:new Date().toISOString(), type:"tracker", message }].slice(-100)
    }
  };
}

function activityForChange(previous, next) {
  const before = previous?.payload?.job && typeof previous.payload.job === "object" ? previous.payload.job : {};
  const after = next.job && typeof next.job === "object" ? next.job : {};
  const messages = [];
  if (before.status !== after.status) messages.push(`Job moved from ${before.status || "New"} to ${after.status || "New"}.`);
  if (before.payment !== after.payment || before.paymentDate !== after.paymentDate) {
    messages.push(after.payment === "paid" ? `Payment marked paid${after.paymentDate ? ` on ${after.paymentDate}` : ""}.` : "Payment marked unpaid.");
  }
  if (before.invoiceNumber !== after.invoiceNumber) {
    messages.push(after.invoiceNumber ? `Invoice ${after.invoiceNumber} attached to this job.` : "Invoice number removed from this job.");
  }
  const fieldsChanged = ["number", "detail", "quote", "markup", "scheduledDate", "referral"].some((field) => String(before[field] ?? "") !== String(after[field] ?? ""))
    || String(previous?.customer_name || "") !== String(next.customerName || "")
    || String(previous?.address || "") !== String(next.address || "");
  if (fieldsChanged && !messages.length) messages.push("Job details updated.");
  return messages;
}

function mapRecordToRow(record) {
  const blindItems = normalizeArray(record.blindItems);
  const curtainItems = normalizeArray(record.curtainItems);
  const payload = {
    submittedAt: record.submittedAt,
    recordType: record.recordType || "blinds-curtains",
    sector: record.sector || (record.recordType === "cleaning" ? "Cleaning" : "Blinds / Curtain"),
    email: record.email || "",
    lastSentAt: record.lastSentAt || "",
    lastSentTo: record.lastSentTo || "",
    sendCount: Number(record.sendCount) || 0,
    // Job-tracker fields stay inside the existing JSON payload so no database
    // migration is needed. This also makes edits available to every device
    // through the same quote_records API.
    jobStage: record.jobStage || "quoted",
    job: record.job && typeof record.job === "object" ? record.job : {},
    blindItems,
    curtainItems,
    cleaningSummary: record.cleaningSummary && typeof record.cleaningSummary === "object" ? record.cleaningSummary : null
  };

  return {
    id: record.id,
    created_at: record.submittedAt,
    customer_name: record.customerName || "-",
    phone: record.phone || "-",
    address: record.address || "-",
    quote_number: record.quoteNumber || "-",
    total_quote: parseCurrency(record.totalQuote),
    subtotal_ex_gst: parseCurrency(record.subtotalExGst),
    gst_total: parseCurrency(record.gstTotal),
    blind_count: Number(record.blindCount) || blindItems.length,
    curtain_count: Number(record.curtainCount) || curtainItems.filter((item) => item.product?.toLowerCase?.() === "curtain").length,
    sheer_count: Number(record.sheerCount) || curtainItems.filter((item) => item.product?.toLowerCase?.() === "sheer").length,
    payload
  };
}

function mapRowToRecord(row) {
  const payload = row && typeof row.payload === "object" && row.payload ? row.payload : {};
  return {
    id: row.id,
    recordType: payload.recordType || "blinds-curtains",
    sector: payload.sector || (payload.recordType === "cleaning" ? "Cleaning" : "Blinds / Curtain"),
    submittedAt: row.created_at || payload.submittedAt || new Date().toISOString(),
    customerName: row.customer_name || "-",
    phone: row.phone || "-",
    address: row.address || "-",
    email: payload.email || "",
    quoteNumber: row.quote_number || "-",
    totalQuote: formatCurrency(Number(row.total_quote) || 0),
    subtotalExGst: formatCurrency(Number(row.subtotal_ex_gst) || 0),
    gstTotal: formatCurrency(Number(row.gst_total) || 0),
    lastSentAt: payload.lastSentAt || "",
    lastSentTo: payload.lastSentTo || "",
    sendCount: Number(payload.sendCount) || 0,
    jobStage: payload.jobStage || "quoted",
    job: payload.job && typeof payload.job === "object" ? payload.job : {},
    blindCount: Number(row.blind_count) || 0,
    curtainCount: Number(row.curtain_count) || 0,
    sheerCount: Number(row.sheer_count) || 0,
    blindItems: normalizeArray(payload.blindItems),
    curtainItems: normalizeArray(payload.curtainItems),
    cleaningSummary: payload.cleaningSummary && typeof payload.cleaningSummary === "object" ? payload.cleaningSummary : null
  };
}

async function readJsonBody(req) {
  if (req.body && typeof req.body === "object") {
    return req.body;
  }

  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }

  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

async function fetchSupabase(path, options = {}) {
  const config = getSupabaseHeaders();
  if (!config) {
    return {
      ok: false,
      status: 503,
      text: async () => "Supabase server settings are missing."
    };
  }

  return fetch(`${config.supabaseUrl}/rest/v1/${path}`, {
    ...options,
    headers: {
      ...config.headers,
      ...(options.headers || {})
    }
  });
}

module.exports = async (req, res) => {
  setCorsHeaders(req, res);

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  try {
    if (req.method === "GET") {
      const response = await fetchSupabase("quote_records?select=*&order=created_at.desc");
      const text = await response.text();

      if (!response.ok) {
        res.status(response.status).send(text);
        return;
      }

      const rows = JSON.parse(text);
      res.status(200).json(rows.map(mapRowToRecord));
      return;
    }

    if (req.method === "POST") {
      const record = appendJobActivity(await readJsonBody(req), "Job created.");
      const response = await fetchSupabase("quote_records", {
        method: "POST",
        body: JSON.stringify(mapRecordToRow(record))
      });
      const text = await response.text();

      if (!response.ok) {
        res.status(response.status).send(text);
        return;
      }

      const [row] = JSON.parse(text);
      res.status(200).json(mapRowToRecord(row));
      return;
    }

    if (req.method === "DELETE") {
      const { id } = req.query || {};
      if (!id) {
        res.status(400).json({ error: "Missing record id." });
        return;
      }

      const response = await fetchSupabase(`quote_records?id=eq.${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers: {
          Prefer: "return=minimal"
        }
      });

      if (!response.ok) {
        res.status(response.status).send(await response.text());
        return;
      }

      res.status(204).end();
      return;
    }

    if (req.method === "PATCH") {
      const { id } = req.query || {};
      if (!id) {
        res.status(400).json({ error: "Missing record id." });
        return;
      }

      let record = await readJsonBody(req);
      // Read the existing row first so the timeline records meaningful changes
      // even when the edit is made from another browser or device.
      const existingResponse = await fetchSupabase(`quote_records?id=eq.${encodeURIComponent(id)}&select=*`);
      const existingRows = existingResponse.ok ? JSON.parse(await existingResponse.text()) : [];
      const existing = existingRows[0];
      const messages = existing ? activityForChange(existing, record) : ["Job updated."];
      messages.forEach((message) => { record = appendJobActivity(record, message); });
      const response = await fetchSupabase(`quote_records?id=eq.${encodeURIComponent(id)}`, {
        method: "PATCH",
        body: JSON.stringify(mapRecordToRow({ ...record, id })),
        headers: {
          Prefer: "return=representation"
        }
      });
      const text = await response.text();

      if (!response.ok) {
        res.status(response.status).send(text);
        return;
      }

      const [row] = JSON.parse(text);
      res.status(200).json(mapRowToRecord(row));
      return;
    }

    res.status(405).json({ error: "Method not allowed." });
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Unexpected server error."
    });
  }
};

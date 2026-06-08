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
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
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

function mapRecordToRow(record) {
  const blindItems = normalizeArray(record.blindItems);
  const curtainItems = normalizeArray(record.curtainItems);
  const payload = {
    submittedAt: record.submittedAt,
    recordType: record.recordType || "blinds-curtains",
    sector: record.sector || (record.recordType === "cleaning" ? "Cleaning" : "Blinds / Curtain"),
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
    quoteNumber: row.quote_number || "-",
    totalQuote: formatCurrency(Number(row.total_quote) || 0),
    subtotalExGst: formatCurrency(Number(row.subtotal_ex_gst) || 0),
    gstTotal: formatCurrency(Number(row.gst_total) || 0),
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
      const record = await readJsonBody(req);
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

    res.status(405).json({ error: "Method not allowed." });
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Unexpected server error."
    });
  }
};

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
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
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

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
}

module.exports = async (req, res) => {
  setCorsHeaders(req, res);

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed." });
    return;
  }

  try {
    const resendApiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL;
    const replyToEmail = process.env.RESEND_REPLY_TO || fromEmail;

    if (!resendApiKey || !fromEmail) {
      res.status(503).json({
        error: "Email sending is not configured yet. Add RESEND_API_KEY and RESEND_FROM_EMAIL in Vercel."
      });
      return;
    }

    const body = await readJsonBody(req);
    const to = String(body.to || "").trim();
    const subject = String(body.subject || "").trim();
    const html = String(body.html || "").trim();
    const text = String(body.text || "").trim();
    const attachment = body.attachment && typeof body.attachment === "object" ? body.attachment : null;

    if (!isValidEmail(to)) {
      res.status(400).json({ error: "A valid customer email is required." });
      return;
    }

    if (!subject || !html || !text || !attachment?.filename || !attachment?.content) {
      res.status(400).json({ error: "Missing email content or PDF attachment." });
      return;
    }

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [to],
        reply_to: replyToEmail ? [replyToEmail] : undefined,
        subject,
        html,
        text,
        attachments: [
          {
            filename: attachment.filename,
            content: attachment.content
          }
        ]
      })
    });

    const responseText = await resendResponse.text();
    if (!resendResponse.ok) {
      res.status(resendResponse.status).send(responseText);
      return;
    }

    let payload = {};
    try {
      payload = responseText ? JSON.parse(responseText) : {};
    } catch (error) {
      payload = { raw: responseText };
    }

    res.status(200).json({
      ok: true,
      id: payload.id || "",
      to
    });
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Unexpected server error."
    });
  }
};

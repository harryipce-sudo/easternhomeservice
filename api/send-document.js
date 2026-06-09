const tls = require("node:tls");

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

function getSmtpConfig() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || user;
  const replyTo = process.env.SMTP_REPLY_TO || from;

  if (!host || !port || !user || !pass || !from) {
    return null;
  }

  return { host, port, user, pass, from, replyTo };
}

function getResendConfig() {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const replyTo = process.env.RESEND_REPLY_TO || from;

  if (!apiKey || !from) {
    return null;
  }

  return { apiKey, from, replyTo };
}

function buildMimeMessage({ from, to, replyTo, subject, html, text, attachment }) {
  const mixedBoundary = `mixed_${Date.now()}_${Math.random().toString(16).slice(2)}`;
  const altBoundary = `alt_${Date.now()}_${Math.random().toString(16).slice(2)}`;
  const safeText = String(text || "").replace(/\r?\n/g, "\r\n");
  const safeHtml = String(html || "").replace(/\r?\n/g, "\r\n");
  const attachmentContent = String(attachment.content || "").replace(/\s+/g, "");

  return [
    `From: Eastern Home Service <${from}>`,
    `To: ${to}`,
    replyTo ? `Reply-To: ${replyTo}` : "",
    `Subject: ${subject}`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/mixed; boundary="${mixedBoundary}"`,
    "",
    `--${mixedBoundary}`,
    `Content-Type: multipart/alternative; boundary="${altBoundary}"`,
    "",
    `--${altBoundary}`,
    'Content-Type: text/plain; charset="UTF-8"',
    "Content-Transfer-Encoding: 8bit",
    "",
    safeText,
    "",
    `--${altBoundary}`,
    'Content-Type: text/html; charset="UTF-8"',
    "Content-Transfer-Encoding: 8bit",
    "",
    safeHtml,
    "",
    `--${altBoundary}--`,
    "",
    `--${mixedBoundary}`,
    `Content-Type: application/pdf; name="${attachment.filename}"`,
    "Content-Transfer-Encoding: base64",
    `Content-Disposition: attachment; filename="${attachment.filename}"`,
    "",
    attachmentContent.replace(/(.{76})/g, "$1\r\n"),
    "",
    `--${mixedBoundary}--`,
    ""
  ].filter(Boolean).join("\r\n");
}

function createSmtpClient(config) {
  return new Promise((resolve, reject) => {
    const socket = tls.connect({
      host: config.host,
      port: config.port,
      servername: config.host
    }, () => resolve(socket));

    socket.setEncoding("utf8");
    socket.once("error", reject);
  });
}

function readSmtpResponse(socket) {
  return new Promise((resolve, reject) => {
    let buffer = "";

    const cleanup = () => {
      socket.off("data", onData);
      socket.off("error", onError);
    };

    const onError = (error) => {
      cleanup();
      reject(error);
    };

    const onData = (chunk) => {
      buffer += chunk;
      const lines = buffer.split("\r\n").filter(Boolean);
      if (!lines.length) {
        return;
      }

      const lastLine = lines[lines.length - 1];
      if (/^\d{3} /.test(lastLine)) {
        cleanup();
        resolve(lastLine);
      }
    };

    socket.on("data", onData);
    socket.on("error", onError);
  });
}

async function sendSmtpCommand(socket, command, expectedCodes) {
  if (command) {
    socket.write(`${command}\r\n`);
  }

  const line = await readSmtpResponse(socket);
  const code = Number(line.slice(0, 3));
  if (!expectedCodes.includes(code)) {
    throw new Error(`SMTP error ${code}: ${line.slice(4)}`);
  }
  return line;
}

async function sendViaSmtp(config, payload) {
  const socket = await createSmtpClient(config);
  try {
    await sendSmtpCommand(socket, "", [220]);
    await sendSmtpCommand(socket, "EHLO easternhomeservice.com", [250]);
    await sendSmtpCommand(socket, `AUTH PLAIN ${Buffer.from(`\u0000${config.user}\u0000${config.pass}`).toString("base64")}`, [235]);
    await sendSmtpCommand(socket, `MAIL FROM:<${config.from}>`, [250]);
    await sendSmtpCommand(socket, `RCPT TO:<${payload.to}>`, [250, 251]);
    await sendSmtpCommand(socket, "DATA", [354]);

    const mimeMessage = buildMimeMessage({
      from: config.from,
      to: payload.to,
      replyTo: config.replyTo,
      subject: payload.subject,
      html: payload.html,
      text: payload.text,
      attachment: payload.attachment
    }).replace(/^\./gm, "..");

    socket.write(`${mimeMessage}\r\n.\r\n`);
    await sendSmtpCommand(socket, "", [250]);
    await sendSmtpCommand(socket, "QUIT", [221]);
  } finally {
    socket.end();
  }
}

async function sendViaResend(config, payload) {
  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: config.from,
      to: [payload.to],
      reply_to: config.replyTo ? [config.replyTo] : undefined,
      subject: payload.subject,
      html: payload.html,
      text: payload.text,
      attachments: [
        {
          filename: payload.attachment.filename,
          content: payload.attachment.content
        }
      ]
    })
  });

  const responseText = await resendResponse.text();
  if (!resendResponse.ok) {
    throw new Error(responseText || `Resend request failed with status ${resendResponse.status}`);
  }
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
    const smtpConfig = getSmtpConfig();
    const resendConfig = getResendConfig();

    if (!smtpConfig && !resendConfig) {
      res.status(503).json({
        error: "Email sending is not configured yet. Add SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, and SMTP_FROM in Vercel."
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

    const payload = { to, subject, html, text, attachment };

    if (smtpConfig) {
      await sendViaSmtp(smtpConfig, payload);
    } else {
      await sendViaResend(resendConfig, payload);
    }

    res.status(200).json({
      ok: true,
      to
    });
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Unexpected server error."
    });
  }
};

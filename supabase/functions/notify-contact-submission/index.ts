import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const NOTIFY_TO = Deno.env.get("NOTIFY_TO") ?? "jessica@vorena.capital";
const FROM_EMAIL =
  Deno.env.get("FROM_EMAIL") ?? "vorena Contact <onboarding@resend.dev>";
const WEBHOOK_SECRET = Deno.env.get("WEBHOOK_SECRET");

type ContactRecord = {
  id?: string;
  intent?: string;
  name?: string;
  email?: string;
  company?: string | null;
  role?: string | null;
  message?: string;
  locale?: string;
  page_path?: string | null;
  referrer?: string | null;
  created_at?: string;
};

type WebhookPayload = {
  type?: string;
  table?: string;
  record?: ContactRecord;
};

function intentLabel(intent: string | undefined, locale: string | undefined) {
  var isEs = locale === "es";
  if (intent === "business") {
    return isEs ? "Consulta de negocio" : "Business inquiry";
  }
  if (intent === "talent") {
    return isEs ? "Talento / Trabaja con nosotros" : "Talent / Work with us";
  }
  return isEs ? "Consulta general" : "General inquiry";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildEmail(record: ContactRecord) {
  var intent = record.intent ?? "connect";
  var label = intentLabel(intent, record.locale);
  var name = record.name ?? "—";
  var email = record.email ?? "—";
  var company = record.company?.trim() || "—";
  var role = record.role?.trim() || "—";
  var message = record.message ?? "—";
  var page = record.page_path ?? "—";
  var when = record.created_at
    ? new Date(record.created_at).toISOString()
    : new Date().toISOString();

  var subject =
    intent === "talent" && role !== "—"
      ? `[vorena] ${label} — ${role} — ${name}`
      : `[vorena] ${label} — ${name}`;

  var html = `
    <h2 style="font-family:system-ui,sans-serif;color:#302961;">New contact form submission</h2>
    <p style="font-family:system-ui,sans-serif;color:#333;"><strong>Type:</strong> ${escapeHtml(label)} (${escapeHtml(intent)})</p>
    <table style="font-family:system-ui,sans-serif;font-size:14px;border-collapse:collapse;">
      <tr><td style="padding:6px 12px 6px 0;color:#666;">Name</td><td>${escapeHtml(name)}</td></tr>
      <tr><td style="padding:6px 12px 6px 0;color:#666;">Email</td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
      <tr><td style="padding:6px 12px 6px 0;color:#666;">Company</td><td>${escapeHtml(company)}</td></tr>
      <tr><td style="padding:6px 12px 6px 0;color:#666;">Role</td><td>${escapeHtml(role)}</td></tr>
      <tr><td style="padding:6px 12px 6px 0;color:#666;">Locale</td><td>${escapeHtml(record.locale ?? "en")}</td></tr>
      <tr><td style="padding:6px 12px 6px 0;color:#666;">Page</td><td>${escapeHtml(page)}</td></tr>
      <tr><td style="padding:6px 12px 6px 0;color:#666;">Submitted</td><td>${escapeHtml(when)}</td></tr>
    </table>
    <h3 style="font-family:system-ui,sans-serif;color:#302961;margin-top:1.5rem;">Message</h3>
    <p style="font-family:system-ui,sans-serif;white-space:pre-wrap;line-height:1.5;">${escapeHtml(message)}</p>
  `.trim();

  var text = [
    `New contact: ${label}`,
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company}`,
    `Role: ${role}`,
    `Locale: ${record.locale ?? "en"}`,
    `Page: ${page}`,
    `Submitted: ${when}`,
    "",
    "Message:",
    message,
  ].join("\n");

  return { subject, html, text };
}

function isAuthorized(req: Request) {
  if (!WEBHOOK_SECRET) return true;
  var auth = req.headers.get("authorization") ?? "";
  var headerSecret = req.headers.get("x-webhook-secret") ?? "";
  return (
    auth === `Bearer ${WEBHOOK_SECRET}` || headerSecret === WEBHOOK_SECRET
  );
}

function extractRecord(body: WebhookPayload | ContactRecord): ContactRecord {
  if (body && typeof body === "object" && "record" in body && body.record) {
    return body.record as ContactRecord;
  }
  return body as ContactRecord;
}

async function sendViaResend(email: ReturnType<typeof buildEmail>) {
  if (!RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not set on the Edge Function");
  }

  var response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: [NOTIFY_TO],
      subject: email.subject,
      html: email.html,
      text: email.text,
    }),
  });

  if (!response.ok) {
    var detail = await response.text();
    throw new Error(`Resend error (${response.status}): ${detail}`);
  }

  return response.json();
}

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!isAuthorized(req)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    var body = (await req.json()) as WebhookPayload | ContactRecord;
    var record = extractRecord(body);

    if (!record.email || !record.name || !record.message) {
      return new Response(JSON.stringify({ error: "Invalid payload" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    var email = buildEmail(record);
    var result = await sendViaResend(email);

    return new Response(JSON.stringify({ ok: true, result }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("notify-contact-submission:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
});

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { contactFormSchema } from "@/schema/contact-form.schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Very small in-memory throttle (per warm serverless instance). Good enough to
// blunt casual abuse; not a substitute for a real rate limiter.
const hits = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function rateLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > MAX_PER_WINDOW;
}

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (transporter) return transporter;

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error("SMTP is not configured");
  }

  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // 587 uses STARTTLS
    auth: { user, pass },
  });

  return transporter;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { message: "Too many messages. Please try again in a minute." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: real users never fill this.
  if (body && typeof body === "object" && "company" in body && (body as Record<string, unknown>).company) {
    return NextResponse.json({ message: "Sent." });
  }

  const parsed = contactFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { message: parsed.error.errors[0]?.message ?? "Please check the form and try again." },
      { status: 422 }
    );
  }

  const { name, email, message } = parsed.data;
  const to = process.env.CONTACT_TO || process.env.SMTP_USER!;
  const from = process.env.CONTACT_FROM || process.env.SMTP_USER!;

  try {
    const tx = getTransporter();
    await tx.sendMail({
      from: `"Portfolio Contact" <${from}>`,
      to,
      replyTo: `"${name}" <${email}>`,
      subject: `Portfolio message from ${name}`,
      text: `From: ${name} <${email}>\nIP: ${ip}\n\n${message}`,
      html: `
        <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;font-size:14px;line-height:1.6;color:#111">
          <p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
          <hr style="border:none;border-top:1px solid #ddd;margin:16px 0" />
          <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
        </div>
      `,
    });

    return NextResponse.json({ message: "Sent. I'll get back to you shortly." });
  } catch (err) {
    console.error("[contact] send failed:", err);
    return NextResponse.json(
      { message: "Could not send right now. Please email me directly." },
      { status: 502 }
    );
  }
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

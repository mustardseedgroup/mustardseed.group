import { Resend } from "resend";

export const runtime = "edge";

type TurnstileResponse = {
  success: boolean;
  "error-codes"?: string[];
};

const sensitiveTerms = ["secret", "token", "api key", "credential", "webhook secret"];

function hasSuspiciousContent(value: string) {
  const lower = value.toLowerCase();
  return sensitiveTerms.some((term) => lower.includes(term));
}

export async function POST(request: Request) {
  const form = await request.formData();
  const name = String(form.get("name") ?? "").trim();
  const email = String(form.get("email") ?? "").trim();
  const type = String(form.get("type") ?? "").trim();
  const message = String(form.get("message") ?? "").trim();
  const turnstileToken = String(form.get("cf-turnstile-response") ?? "");

  if (!name || !email || !type || !message) {
    return Response.json({ error: "Missing required fields." }, { status: 400 });
  }

  if (hasSuspiciousContent(message)) {
    return Response.json({ error: "Please remove sensitive credentials or private details before submitting." }, { status: 400 });
  }

  const secret = process.env.TURNSTILE_SECRET_KEY;
  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!secret || !resendKey || !to) {
    return Response.json({ error: "Contact form is not configured." }, { status: 500 });
  }

  const turnstile = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: new URLSearchParams({
      secret,
      response: turnstileToken,
    }),
  });
  const result = (await turnstile.json()) as TurnstileResponse;

  if (!result.success) {
    return Response.json({ error: "Turnstile verification failed." }, { status: 400 });
  }

  const resend = new Resend(resendKey);
  await resend.emails.send({
    from: "Mustard Seed Group <onboarding@resend.dev>",
    to,
    replyTo: email,
    subject: `Mustard Seed Group enquiry: ${type}`,
    text: `Name: ${name}\nEmail: ${email}\nType: ${type}\n\n${message}`,
  });

  return Response.redirect(new URL("/contact?sent=1", request.url), 303);
}

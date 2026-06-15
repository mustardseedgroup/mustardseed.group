import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Mustard Seed Group for serious enquiries across research, products, partnerships and commercial systems.",
};

export default function ContactPage() {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  return (
    <SiteShell>
      <main>
        <PageHero title="Contact" summary="For serious enquiries across research, products, partnerships and commercial systems." />
        <section className="mx-auto max-w-3xl px-5 pb-24 md:px-8">
          <form action="/api/contact" method="post" className="grid gap-5">
            <label className="grid gap-2 text-sm">
              Name
              <input name="name" required className="border border-[var(--line)] bg-white px-4 py-3 text-base" />
            </label>
            <label className="grid gap-2 text-sm">
              Email
              <input name="email" type="email" required className="border border-[var(--line)] bg-white px-4 py-3 text-base" />
            </label>
            <label className="grid gap-2 text-sm">
              Enquiry type
              <select name="type" required className="border border-[var(--line)] bg-white px-4 py-3 text-base">
                <option value="research">Research collaboration</option>
                <option value="product">Product or partnership enquiry</option>
                <option value="tuxx">TUXX commercial systems</option>
                <option value="press">Press</option>
                <option value="general">General</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm">
              Message
              <textarea name="message" required rows={7} className="border border-[var(--line)] bg-white px-4 py-3 text-base" />
            </label>
            {siteKey ? <div className="cf-turnstile" data-sitekey={siteKey} /> : null}
            <button className="focus-ring border border-[var(--foreground)] px-5 py-3 text-sm transition hover:bg-[var(--foreground)] hover:text-[var(--background)]" type="submit">
              Send enquiry
            </button>
          </form>
        </section>
      </main>
      {siteKey ? <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer /> : null}
    </SiteShell>
  );
}

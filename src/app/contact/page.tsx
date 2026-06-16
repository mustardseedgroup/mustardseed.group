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
        <section className="mx-auto grid max-w-7xl gap-12 px-5 pb-24 md:grid-cols-[0.8fr_1.2fr] md:px-8">
          <div className="grid gap-px self-start bg-[var(--line)]">
            {[
              ["Research", "Benediction Lab, Orion and public research collaborations."],
              ["Products", "Orbit, All Purpose, CheekyGains, Naira and related ecosystem work."],
              ["Commercial systems", "TUXX enquiries for custom AI systems and internal tools."],
              ["Founder / press", "Founder-led opportunities, interviews and public writing."],
            ].map(([title, copy]) => (
              <div key={title} className="bg-[#fbfaf7] p-6">
                <h2 className="text-2xl">{title}</h2>
                <p className="mt-4 leading-7 text-[var(--muted)]">{copy}</p>
              </div>
            ))}
          </div>
          <form action="/api/contact" method="post" className="grid gap-5 border border-[var(--line)] bg-[#fbfaf7] p-6">
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
            <button className="button button-primary focus-ring" type="submit">
              Send enquiry
            </button>
          </form>
        </section>
      </main>
      {siteKey ? <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer /> : null}
    </SiteShell>
  );
}

import type { Metadata } from "next";
import { EditorialHeader, SectionIntro } from "@/components/editorial";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Mustard Seed Group for serious enquiries across research, products, partnerships and commercial systems.",
};

const routes = [
  ["Research", "Benediction Lab, Orion, public research collaborations and selected experiments."],
  ["Products", "Orbit, All Purpose, CheekyGains, Naira and ecosystem product enquiries."],
  ["Commercial systems", "TUXX enquiries for custom AI systems, internal software and client delivery systems."],
  ["Founder / press", "Founder-led opportunities, interviews, public writing and partnerships."],
] as const;

export default function ContactPage() {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  return (
    <SiteShell>
      <main>
        <EditorialHeader
          kicker="Contact"
          title="Serious enquiries only."
          summary="For research, product, partnership, press and commercial systems enquiries across the Mustard Seed Group ecosystem."
        />

        <section className="mx-auto grid max-w-7xl gap-12 px-5 pb-24 md:grid-cols-[0.8fr_1.2fr] md:px-8">
          <div>
            <SectionIntro
              kicker="Routing"
              title="Where the enquiry should go."
              summary="The more specific the enquiry, the easier it is to route it to the right part of the ecosystem."
            />
            <div className="editorial-grid mt-10">
              {routes.map(([title, copy]) => (
                <div key={title} className="editorial-panel">
                  <h2 className="text-2xl">{title}</h2>
                  <p className="mt-4 leading-7 text-[var(--muted)]">{copy}</p>
                </div>
              ))}
            </div>
          </div>

          <form action="/api/contact" method="post" className="grid gap-5 border border-[var(--line)] bg-[#fbfaf7] p-6 md:p-8">
            <div className="border-b border-[var(--line)] pb-6">
              <p className="text-xs uppercase tracking-[0.16em] text-[var(--accent)]">Enquiry form</p>
              <h2 className="mt-4 text-3xl">Tell us what you are trying to build.</h2>
            </div>
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
              <textarea name="message" required rows={8} className="border border-[var(--line)] bg-white px-4 py-3 text-base" />
            </label>
            {siteKey ? <div className="cf-turnstile" data-sitekey={siteKey} /> : null}
            <button className="button button-primary focus-ring w-full" type="submit">
              Send enquiry
            </button>
          </form>
        </section>

        <section className="content-band">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:grid-cols-[0.55fr_1.45fr] md:px-8">
            <SectionIntro kicker="Before contacting" title="What not to send." />
            <div className="editorial-grid md:grid-cols-3">
              {["No speculative vendor spam.", "No requests for private code.", "No requests for client data."].map((item) => (
                <div key={item} className="editorial-panel min-h-40">
                  <h2 className="text-2xl">{item}</h2>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      {siteKey ? <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer /> : null}
    </SiteShell>
  );
}

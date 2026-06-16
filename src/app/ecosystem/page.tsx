import type { Metadata } from "next";
import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { EcosystemMap } from "@/components/ecosystem-map";
import { EditorialHeader, PillarCard, SectionIntro } from "@/components/editorial";
import { SiteShell } from "@/components/site-shell";
import { domains, ecosystemPillars, products, timeline } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Ecosystem",
  description: "Explore the Mustard Seed Group ecosystem across intelligence, performance, execution and creativity.",
};

export default function EcosystemPage() {
  return (
    <SiteShell>
      <main>
        <EditorialHeader
          kicker="Ecosystem"
          title="Research, products, services and culture in one operating loop."
          summary="Mustard Seed Group is built around capability. Each layer has a job: discover, productise, prove and scale."
        />

        <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-24 md:grid-cols-[0.95fr_1.05fr] md:px-8">
          <div className="grid gap-5">
            {ecosystemPillars.map((pillar) => (
              <PillarCard key={pillar.title} {...pillar} />
            ))}
          </div>
          <div className="sticky top-24 self-start">
            <EcosystemMap />
          </div>
        </section>

        <section className="content-band">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-24 md:grid-cols-[0.55fr_1.45fr] md:px-8">
            <SectionIntro
              kicker="Operating loop"
              title="How work moves through the group."
              summary="Research does not sit apart from commercial work. It feeds products, services and consumer systems."
            />
            <div className="editorial-grid md:grid-cols-4">
              {["Research", "Product", "Commercial proof", "Culture"].map((title, index) => (
                <div key={title} className="editorial-panel min-h-72">
                  <p className="text-xs text-[var(--accent)]">{String(index + 1).padStart(2, "0")}</p>
                  <h2 className="mt-16 text-3xl">{title}</h2>
                  <p className="mt-5 text-sm leading-7 text-[var(--muted)]">
                    {[
                      "Benediction Lab explores questions before they become products.",
                      "Orbit and All Purpose turn insight into useful public surfaces.",
                      "TUXX applies systems in real client environments.",
                      "Consumer products turn capability into behaviour and everyday life.",
                    ][index]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
          <div className="grid gap-10 md:grid-cols-[0.55fr_1.45fr]">
            <SectionIntro kicker="Domains" title="What the ecosystem builds." />
            <div className="editorial-grid md:grid-cols-4">
              {domains.map(([title, copy]) => (
                <div key={title} className="editorial-panel min-h-72">
                  <h2 className="text-3xl">{title}</h2>
                  <p className="mt-20 text-sm leading-7 text-[var(--muted)]">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="content-band">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-24 md:grid-cols-[0.55fr_1.45fr] md:px-8">
            <SectionIntro kicker="Products and initiatives" title="The active surface area." />
            <div className="editorial-grid md:grid-cols-3">
              {products.map((product) => (
                <Link key={product.title} href={product.href} className="editorial-panel group min-h-72 transition hover:bg-[#f1eee6]">
                  <div className="flex min-h-14 items-center justify-between gap-5">
                    <BrandLogo brand={product.brand} />
                    <span className="text-xs uppercase tracking-[0.16em] text-[var(--accent)]">{product.group}</span>
                  </div>
                  <h2 className="mt-20 text-3xl">{product.title}</h2>
                  <p className="mt-5 leading-7 text-[var(--muted)]">{product.summary}</p>
                  <span className="mt-8 inline-flex text-sm transition group-hover:translate-x-1">View</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
          <div className="grid gap-10 md:grid-cols-[0.55fr_1.45fr]">
            <SectionIntro kicker="Timeline" title="The institution is still early." />
            <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
              {timeline.map(([stage, copy, date]) => (
                <div key={stage} className="grid gap-6 py-8 md:grid-cols-[0.25fr_1fr_0.25fr]">
                  <h2 className="text-3xl">{stage}</h2>
                  <p className="max-w-3xl text-lg leading-8 text-[var(--muted)]">{copy}</p>
                  <p className="text-sm text-[var(--accent)] md:text-right">{date}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}

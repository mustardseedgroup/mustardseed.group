import type { Metadata } from "next";
import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { EditorialHeader, PillarCard, SectionIntro } from "@/components/editorial";
import { SiteShell } from "@/components/site-shell";
import { ecosystemPillars, products } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Companies",
  description: "The Mustard Seed Group ecosystem: Benediction Lab, Orbit, All Purpose, TUXX and Chiko Shire.",
};

export default function CompaniesPage() {
  return (
    <SiteShell>
      <main>
        <EditorialHeader
          kicker="Companies"
          title="A portfolio built around capability."
          summary="The group is structured as connected operating layers: research, product, consumer systems, commercial services and founder-led direction."
        />

        <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-24 md:grid-cols-[0.55fr_1.45fr] md:px-8">
          <SectionIntro
            kicker="Core entities"
            title="The public structure."
            summary="Everything private remains private. This is the public map of how the group explains itself."
          />
          <div className="grid gap-5 md:grid-cols-2">
            {ecosystemPillars.map((pillar) => (
              <PillarCard key={pillar.title} {...pillar} />
            ))}
            <Link href="/companies/chiko-shire" className="group flex min-h-80 flex-col border border-[var(--line)] bg-[#fbfaf7] p-6 transition hover:bg-[#f1eee6] md:col-span-2">
              <BrandLogo brand="msg" />
              <div className="mt-auto">
                <p className="text-xs uppercase tracking-[0.16em] text-[var(--accent)]">Founder</p>
                <h2 className="mt-5 text-4xl">Chiko Shire</h2>
                <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--muted)]">
                  Founder and operator behind the ecosystem, connecting AI operating systems, commercial execution agents, consumer apps, research systems and human performance tools.
                </p>
                <span className="mt-8 inline-flex text-sm transition group-hover:translate-x-1">Learn more</span>
              </div>
            </Link>
          </div>
        </section>

        <section className="content-band">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-24 md:grid-cols-[0.55fr_1.45fr] md:px-8">
            <SectionIntro kicker="Products" title="What sits inside the companies." />
            <div className="editorial-grid md:grid-cols-3">
              {products.map((product) => (
                <Link key={product.title} href={product.href} className="editorial-panel group min-h-72 transition hover:bg-[#f1eee6]">
                  <div className="flex min-h-14 items-center justify-between gap-5">
                    <BrandLogo brand={product.brand} />
                    <span className="text-xs uppercase tracking-[0.16em] text-[var(--accent)]">{product.group}</span>
                  </div>
                  <h2 className="mt-20 text-3xl">{product.title}</h2>
                  <p className="mt-5 leading-7 text-[var(--muted)]">{product.summary}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}

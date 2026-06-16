import type { Metadata } from "next";
import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { EcosystemMap } from "@/components/ecosystem-map";
import { PageHero } from "@/components/page-hero";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Ecosystem",
  description: "Explore the Mustard Seed Group ecosystem across intelligence, performance, execution and creativity.",
};

const pillars = [
  ["benediction" as const, "Benediction Lab", "Research lab for agents, memory, behaviour and future systems.", "/companies/benediction-lab"],
  ["orbit" as const, "Orbit", "AI operating system for business execution and product delivery.", "/companies/orbit"],
  ["all-purpose" as const, "All Purpose", "Consumer products across performance, creativity, culture and personal development.", "/companies/all-purpose"],
  ["tuxx" as const, "TUXX", "Custom AI systems and internal software for ambitious organisations.", "/companies/tuxx"],
] as const;

const loop = [
  ["Research", "Benediction Lab explores the questions before they become products."],
  ["Product", "Orbit and All Purpose turn useful insights into repeatable systems."],
  ["Commercial proof", "TUXX applies systems in real client environments."],
  ["Compounding", "Lessons return to the lab, the products and the operating model."],
];

export default function EcosystemPage() {
  return (
    <SiteShell>
      <main>
        <PageHero title="Ecosystem" summary="Research creates insight. Products turn insight into systems. Consumer brands test behaviour at scale. Services prove commercial value." />
        <section className="mx-auto grid max-w-7xl gap-12 px-5 pb-24 md:grid-cols-[0.95fr_1.05fr] md:px-8">
          <div className="grid gap-px bg-[var(--line)]">
            {pillars.map(([brand, title, copy, href]) => (
              <Link key={title} href={href} className="group grid gap-6 bg-[#fbfaf7] p-6 md:grid-cols-[0.35fr_1fr_auto] md:items-center">
                <div className="flex min-h-14 items-center">
                  <BrandLogo brand={brand} />
                </div>
                <div>
                  <h2 className="text-3xl">{title}</h2>
                  <p className="mt-3 max-w-2xl leading-7 text-[var(--muted)]">{copy}</p>
                </div>
                <span className="text-sm transition group-hover:translate-x-1">Explore</span>
              </Link>
            ))}
          </div>
          <EcosystemMap />
        </section>
        <section className="border-y border-[var(--line)] bg-[#ffffff]">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:grid-cols-[0.55fr_1.45fr] md:px-8">
            <h2 className="font-serif text-5xl leading-none md:text-6xl">The operating loop.</h2>
            <div className="grid gap-px bg-[var(--line)] md:grid-cols-4">
              {loop.map(([title, copy], index) => (
                <div key={title} className="min-h-64 bg-[#fbfaf7] p-6">
                  <p className="text-xs text-[var(--accent)]">{String(index + 1).padStart(2, "0")}</p>
                  <h3 className="mt-16 text-2xl">{title}</h3>
                  <p className="mt-5 text-sm leading-6 text-[var(--muted)]">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}

import type { Metadata } from "next";
import { ContentList } from "@/components/content-list";
import { PageHero } from "@/components/page-hero";
import { SiteShell } from "@/components/site-shell";
import { getCollection } from "@/lib/content";

export const metadata: Metadata = {
  title: "Companies",
  description: "The Mustard Seed Group ecosystem: Benediction Lab, Orbit, All Purpose, TUXX and Chiko Shire.",
};

export default function CompaniesPage() {
  const entries = getCollection("companies");

  return (
    <SiteShell>
      <main>
        <PageHero title="Companies" summary="The portfolio across research, execution, performance, creativity and founder-led systems." />
        <section className="mx-auto max-w-7xl px-5 pb-20 md:px-8">
          <div className="grid gap-px bg-[var(--line)] md:grid-cols-4">
            {[
              ["Research", "Benediction Lab explores the questions that shape future systems."],
              ["Execution", "Orbit and TUXX turn systems thinking into commercial outcomes."],
              ["Performance", "All Purpose and CheekyGains focus on human capability in daily life."],
              ["Founder layer", "Chiko Shire connects the ecosystem through one long-term operating thesis."],
            ].map(([title, copy]) => (
              <div key={title} className="min-h-64 bg-[#fbfaf7] p-6">
                <h2 className="text-2xl">{title}</h2>
                <p className="mt-14 text-sm leading-7 text-[var(--muted)]">{copy}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-5 pb-24 md:px-8">
          <ContentList entries={entries} basePath="/companies" />
        </section>
      </main>
    </SiteShell>
  );
}

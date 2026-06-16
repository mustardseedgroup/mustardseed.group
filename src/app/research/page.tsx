import type { Metadata } from "next";
import { ContentList } from "@/components/content-list";
import { PageHero } from "@/components/page-hero";
import { SiteShell } from "@/components/site-shell";
import { getCollection } from "@/lib/content";

export const metadata: Metadata = {
  title: "Research",
  description: "Research initiatives across agentic operating systems, memory, behaviour, commercial execution and product development.",
};

export default function ResearchPage() {
  const entries = getCollection("research");

  return (
    <SiteShell>
      <main>
        <PageHero title="Research" summary="Research initiatives across agentic operating systems, memory, behaviour, commercial execution and product development." />
        <section className="mx-auto max-w-7xl px-5 pb-20 md:px-8">
          <div className="grid gap-px bg-[var(--line)] md:grid-cols-3">
            {[
              ["Agentic systems", "How software can preserve context, operate interfaces and coordinate work."],
              ["Human behaviour", "How standards, motivation and environment shape capability."],
              ["Product incubation", "How research becomes public products without exposing private implementation."],
            ].map(([title, copy]) => (
              <div key={title} className="min-h-64 bg-[#fbfaf7] p-6">
                <h2 className="text-3xl">{title}</h2>
                <p className="mt-16 text-sm leading-7 text-[var(--muted)]">{copy}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="border-y border-[var(--line)] bg-[#ffffff]">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-[0.55fr_1.45fr] md:px-8">
            <h2 className="font-serif text-5xl leading-none md:text-6xl">Public research boundary.</h2>
            <p className="max-w-3xl text-lg leading-9 text-[var(--muted)]">
              Research pages can discuss direction, questions, public experiments and product philosophy. They do not expose private prompts, runbooks, memory schemas, orchestration logic, client data or unreleased commercial systems.
            </p>
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-5 pb-24 md:px-8">
          <ContentList entries={entries} basePath="/research" />
        </section>
      </main>
    </SiteShell>
  );
}

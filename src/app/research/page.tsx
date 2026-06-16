import type { Metadata } from "next";
import { EditorialHeader, SectionIntro, StoryCard } from "@/components/editorial";
import { SiteShell } from "@/components/site-shell";
import { getCollection } from "@/lib/content";
import { publicBoundaries, researchTracks } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Research",
  description: "Research initiatives across agentic operating systems, memory, behaviour, commercial execution and product development.",
};

export default function ResearchPage() {
  const entries = getCollection("research");
  const featured = entries[0];

  return (
    <SiteShell>
      <main>
        <EditorialHeader
          kicker="Research"
          title="Research before product."
          summary="Benediction Lab explores agentic systems, memory, behaviour and product incubation before those ideas become commercial or consumer systems."
        />

        {featured ? (
          <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-24 md:grid-cols-[0.55fr_1.45fr] md:px-8">
            <SectionIntro kicker="Featured research" title="Current public notes." />
            <div className="grid gap-5 md:grid-cols-2">
              <StoryCard entry={featured} href={`/research/${featured.slug}`} featured />
              <div className="grid gap-5">
                {entries.slice(1).map((entry) => (
                  <StoryCard key={entry.slug} entry={entry} href={`/research/${entry.slug}`} />
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="content-band">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-24 md:grid-cols-[0.55fr_1.45fr] md:px-8">
            <SectionIntro kicker="Research tracks" title="What the lab is exploring." />
            <div className="editorial-grid md:grid-cols-4">
              {researchTracks.map(([title, copy]) => (
                <div key={title} className="editorial-panel min-h-72">
                  <h2 className="text-2xl leading-tight">{title}</h2>
                  <p className="mt-16 text-sm leading-7 text-[var(--muted)]">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
          <div className="grid gap-10 md:grid-cols-[0.55fr_1.45fr]">
            <SectionIntro
              kicker="Boundary"
              title="Public research does not expose the moat."
              summary="The site can explain direction and public principles. It does not publish proprietary implementation details."
            />
            <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
              {publicBoundaries.map((item) => (
                <p key={item} className="py-6 text-2xl leading-tight">{item}</p>
              ))}
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}

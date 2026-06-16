import type { Metadata } from "next";
import { EditorialHeader, SectionIntro, StoryCard } from "@/components/editorial";
import { SiteShell } from "@/components/site-shell";
import { getCollection, type ContentEntry } from "@/lib/content";

export const metadata: Metadata = {
  title: "Updates",
  description: "Research notes, product updates, founder letters and experiments from across Mustard Seed Group.",
};

const streams = [
  ["Founder letters", "Notes on the thesis, direction and operating philosophy of the group."],
  ["Product updates", "Public-safe updates from Orbit, All Purpose, TUXX and related products."],
  ["Research notes", "Public writing from Benediction Lab and Orion-facing research."],
  ["Experiments", "Selected concepts, prototypes and lessons that can be discussed publicly."],
] as const;

export default function BlogPage() {
  const entries = [...getCollection("blog"), ...getCollection("research")].sort((a, b) => {
    if (!a.date || !b.date) return a.title.localeCompare(b.title);
    return b.date.localeCompare(a.date);
  });
  const featured = entries[0];
  const hrefFor = (entry: ContentEntry) => `/${entry.collection}/${entry.slug}`;

  return (
    <SiteShell>
      <main>
        <EditorialHeader
          kicker="Updates"
          title="Public notes from across the group."
          summary="A live surface for founder letters, research notes, product updates and selected experiments."
        />

        {featured ? (
          <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-24 md:grid-cols-[0.55fr_1.45fr] md:px-8">
            <SectionIntro kicker="Latest" title="Recent writing." />
            <div className="grid gap-5 md:grid-cols-2">
              <StoryCard entry={featured} href={hrefFor(featured)} featured />
              <div className="grid gap-5">
                {entries.slice(1).map((entry) => (
                  <StoryCard key={`${entry.collection}-${entry.slug}`} entry={entry} href={hrefFor(entry)} />
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="content-band">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-24 md:grid-cols-[0.55fr_1.45fr] md:px-8">
            <SectionIntro kicker="Streams" title="What gets shared publicly." />
            <div className="editorial-grid md:grid-cols-4">
              {streams.map(([title, copy]) => (
                <div key={title} className="editorial-panel min-h-72">
                  <h2 className="text-2xl">{title}</h2>
                  <p className="mt-16 text-sm leading-7 text-[var(--muted)]">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
          <div className="grid gap-10 md:grid-cols-[0.55fr_1.45fr]">
            <SectionIntro
              kicker="Editorial standard"
              title="Useful, restrained, public-safe."
              summary="Updates should help people understand the institution without revealing private code, prompts, client information or internal commercial execution logic."
            />
            <div className="editorial-grid md:grid-cols-3">
              {["British English", "No fake claims", "No private systems"].map((item) => (
                <div key={item} className="editorial-panel min-h-48">
                  <h2 className="text-3xl">{item}</h2>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}

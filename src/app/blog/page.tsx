import type { Metadata } from "next";
import { ContentList } from "@/components/content-list";
import { PageHero } from "@/components/page-hero";
import { SiteShell } from "@/components/site-shell";
import { getCollection } from "@/lib/content";

export const metadata: Metadata = {
  title: "Updates",
  description: "Research notes, product updates, founder letters and experiments from across Mustard Seed Group.",
};

export default function BlogPage() {
  const entries = getCollection("blog");

  return (
    <SiteShell>
      <main>
        <PageHero title="Updates" summary="Research notes, product updates, founder letters and experiments from across the ecosystem." />
        <section className="mx-auto max-w-7xl px-5 pb-20 md:px-8">
          <div className="grid gap-px bg-[var(--line)] md:grid-cols-4">
            {[
              ["Founder letters", "Notes on the thesis, direction and operating philosophy of the group."],
              ["Product updates", "Public-safe updates from Orbit, All Purpose, TUXX and related products."],
              ["Research notes", "Public writing from Benediction Lab and Orion-facing research."],
              ["Experiments", "Selected concepts and prototypes that are safe to discuss publicly."],
            ].map(([title, copy]) => (
              <div key={title} className="min-h-60 bg-[#fbfaf7] p-6">
                <h2 className="text-2xl">{title}</h2>
                <p className="mt-12 text-sm leading-7 text-[var(--muted)]">{copy}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="border-y border-[var(--line)] bg-[#ffffff]">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-[0.55fr_1.45fr] md:px-8">
            <h2 className="font-serif text-5xl leading-none md:text-6xl">Public by design.</h2>
            <p className="max-w-3xl text-lg leading-9 text-[var(--muted)]">
              Updates are written for public understanding. They avoid private source code, internal prompts, runbooks, lead intelligence, client workflows and proprietary execution logic.
            </p>
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-5 pb-24 md:px-8">
          <ContentList entries={entries} basePath="/blog" />
        </section>
      </main>
    </SiteShell>
  );
}

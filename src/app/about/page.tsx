import type { Metadata } from "next";
import { MdxContent } from "@/components/mdx-content";
import { PageHero } from "@/components/page-hero";
import { SiteShell } from "@/components/site-shell";
import { getEntry } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: "The mission, origin and long-term thesis behind Mustard Seed Group.",
};

export default function AboutPage() {
  const entry = getEntry("pages", "about");

  return (
    <SiteShell>
      <main>
        <PageHero title="About Mustard Seed Group" summary="A long-term institution building products, companies and research initiatives around human capability." />
        <section className="border-y border-[var(--line)] bg-[#ffffff]">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:grid-cols-[0.8fr_1.2fr] md:px-8">
            <h2 className="font-serif text-5xl leading-none md:text-7xl">Why these things belong together.</h2>
            <div className="grid gap-8 text-lg leading-9 text-[var(--muted)]">
              <p>
                Mustard Seed Group is organised around one capability question: how can technology help people think better, move better, create better and execute better?
              </p>
              <p>
                That is why research, AI operating systems, human performance tools, consumer products, music, media and commercial systems can sit inside the same institution without becoming a random collection.
              </p>
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
          <div className="grid gap-px bg-[var(--line)] md:grid-cols-4">
            {[
              ["Intelligence", "Research, agents, memory and decision systems."],
              ["Execution", "Business operating systems and commercial workflows."],
              ["Performance", "Human performance, behaviour and accountability tools."],
              ["Creativity", "Consumer culture, media and storytelling."],
            ].map(([title, copy]) => (
              <div key={title} className="min-h-64 bg-[var(--background)] p-6">
                <h2 className="text-3xl">{title}</h2>
                <p className="mt-16 text-sm leading-7 text-[var(--muted)]">{copy}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="mx-auto max-w-5xl px-5 pb-24 md:px-8">
          {entry ? <MdxContent source={entry.body} /> : null}
        </section>
      </main>
    </SiteShell>
  );
}

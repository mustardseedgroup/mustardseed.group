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
        <section className="mx-auto max-w-5xl px-5 pb-24 md:px-8">
          {entry ? <MdxContent source={entry.body} /> : null}
        </section>
      </main>
    </SiteShell>
  );
}

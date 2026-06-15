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
  return (
    <SiteShell>
      <main>
        <PageHero title="Updates" summary="Research notes, product updates, founder letters and experiments from across the ecosystem." />
        <section className="mx-auto max-w-7xl px-5 pb-24 md:px-8">
          <ContentList entries={getCollection("blog")} basePath="/blog" />
        </section>
      </main>
    </SiteShell>
  );
}

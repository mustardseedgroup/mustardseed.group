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
  return (
    <SiteShell>
      <main>
        <PageHero title="Research" summary="Research initiatives across agentic operating systems, memory, behaviour, commercial execution and product development." />
        <section className="mx-auto max-w-7xl px-5 pb-24 md:px-8">
          <ContentList entries={getCollection("research")} basePath="/research" />
        </section>
      </main>
    </SiteShell>
  );
}

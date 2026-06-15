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
  return (
    <SiteShell>
      <main>
        <PageHero title="Companies" summary="The portfolio across research, execution, performance, creativity and founder-led systems." />
        <section className="mx-auto max-w-7xl px-5 pb-24 md:px-8">
          <ContentList entries={getCollection("companies")} basePath="/companies" />
        </section>
      </main>
    </SiteShell>
  );
}

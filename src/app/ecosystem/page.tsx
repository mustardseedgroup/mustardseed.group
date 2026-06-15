import type { Metadata } from "next";
import { EcosystemMap } from "@/components/ecosystem-map";
import { PageHero } from "@/components/page-hero";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Ecosystem",
  description: "Explore the Mustard Seed Group ecosystem across intelligence, performance, execution and creativity.",
};

export default function EcosystemPage() {
  return (
    <SiteShell>
      <main>
        <PageHero title="Ecosystem" summary="Research creates insight. Products turn insight into systems. Consumer brands test behaviour at scale. Services prove commercial value." />
        <section className="mx-auto max-w-7xl px-5 pb-24 md:px-8">
          <EcosystemMap />
        </section>
      </main>
    </SiteShell>
  );
}

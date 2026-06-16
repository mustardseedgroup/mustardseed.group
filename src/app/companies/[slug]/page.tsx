import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BrandLogo } from "@/components/brand-logo";
import { MdxContent } from "@/components/mdx-content";
import { SiteShell } from "@/components/site-shell";
import { getCollection, getEntry } from "@/lib/content";

export function generateStaticParams() {
  return getCollection("companies").map((entry) => ({ slug: entry.slug }));
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

const companyBrandBySlug = {
  "benediction-lab": "benediction",
  orbit: "orbit",
  "all-purpose": "all-purpose",
  tuxx: "tuxx",
  "chiko-shire": "msg",
} as const;

const companyContextBySlug = {
  "benediction-lab": {
    role: "Research layer",
    focus: "Papers, notes, experiments, demos and concept documents.",
    connectedWork: "Orion research, agent systems and future product exploration.",
  },
  orbit: {
    role: "Product layer",
    focus: "Product philosophy, documentation, examples and selected updates.",
    connectedWork: "Commercial execution, Orion and lead-to-launch workflows.",
  },
  "all-purpose": {
    role: "Consumer layer",
    focus: "Consumer products, media, performance systems and public product stories.",
    connectedWork: "CheekyGains, Naira, Relay, Horizon, Made It Out and All Purpose Music.",
  },
  tuxx: {
    role: "Services layer",
    focus: "Commercial positioning, case studies and selected delivery patterns.",
    connectedWork: "Custom AI systems, client delivery and Pattern Up.",
  },
  "chiko-shire": {
    role: "Founder layer",
    focus: "Founder writing, public profiles and high-level ecosystem thinking.",
    connectedWork: "Mustard Seed Group, Orbit, Benediction Lab, All Purpose and TUXX.",
  },
} as const;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getEntry("companies", slug);
  if (!entry) return {};
  return {
    title: entry.title,
    description: entry.summary,
    alternates: { canonical: `/companies/${entry.slug}` },
  };
}

export default async function CompanyPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = getEntry("companies", slug);
  if (!entry) notFound();

  return (
    <SiteShell>
      <article>
        <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:grid-cols-[0.9fr_1.1fr] md:px-8 md:py-28">
          <div>
            {entry.slug in companyBrandBySlug ? (
              <div className="mb-10 flex min-h-16 items-center">
                <BrandLogo brand={companyBrandBySlug[entry.slug as keyof typeof companyBrandBySlug]} />
              </div>
            ) : null}
            <p className="text-sm uppercase tracking-[0.16em] text-[var(--accent)]">{entry.category}</p>
            <h1 className="mt-5 font-serif text-5xl font-medium leading-none md:text-8xl">{entry.title}</h1>
            <p className="mt-8 max-w-3xl text-xl leading-9 text-[var(--muted)]">{entry.summary}</p>
          </div>
          {entry.slug in companyContextBySlug ? (
            <div className="grid gap-px self-start bg-[var(--line)]">
              {Object.entries(companyContextBySlug[entry.slug as keyof typeof companyContextBySlug]).map(([label, value]) => (
                <div key={label} className="bg-[#fbfaf7] p-6">
                  <p className="text-xs uppercase tracking-[0.16em] text-[var(--accent)]">{label.replace(/([A-Z])/g, " $1")}</p>
                  <p className="mt-5 text-xl leading-8">{value}</p>
                </div>
              ))}
            </div>
          ) : null}
        </section>
        <section className="mx-auto max-w-5xl px-5 pb-24 md:px-8">
          <MdxContent source={entry.body} />
        </section>
      </article>
    </SiteShell>
  );
}

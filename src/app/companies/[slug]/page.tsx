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
    publicSurface: "Papers, notes, experiments, demos and concept documents.",
    privateBoundary: "Private prompts, memory schemas, agent orchestration and runbooks stay internal.",
  },
  orbit: {
    role: "Product layer",
    publicSurface: "Product philosophy, documentation, examples and selected updates.",
    privateBoundary: "Core source code, execution logic, lead intelligence and internal workflows stay private.",
  },
  "all-purpose": {
    role: "Consumer layer",
    publicSurface: "Consumer products, media, performance systems and public product stories.",
    privateBoundary: "Private product strategy, unreleased systems and internal operating workflows stay private.",
  },
  tuxx: {
    role: "Services layer",
    publicSurface: "Commercial positioning, public case studies and selected delivery patterns.",
    privateBoundary: "Client data, private workflows, implementation details and commercial systems stay private.",
  },
  "chiko-shire": {
    role: "Founder layer",
    publicSurface: "Founder writing, public profiles and high-level ecosystem thinking.",
    privateBoundary: "Private strategy, internal operating notes and proprietary systems stay private.",
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

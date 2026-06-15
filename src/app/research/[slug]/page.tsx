import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MdxContent } from "@/components/mdx-content";
import { SiteShell } from "@/components/site-shell";
import { getCollection, getEntry } from "@/lib/content";

export function generateStaticParams() {
  return getCollection("research").map((entry) => ({ slug: entry.slug }));
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getEntry("research", slug);
  if (!entry) return {};
  return {
    title: entry.title,
    description: entry.summary,
    alternates: { canonical: `/research/${entry.slug}` },
  };
}

export default async function ResearchEntryPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = getEntry("research", slug);
  if (!entry) notFound();

  return (
    <SiteShell>
      <article className="mx-auto max-w-5xl px-5 py-20 md:px-8 md:py-28">
        <p className="text-sm text-[var(--accent)]">{entry.category}</p>
        <h1 className="mt-5 font-serif text-5xl font-medium leading-none md:text-7xl">{entry.title}</h1>
        <p className="mt-8 max-w-3xl text-xl leading-9 text-[var(--muted)]">{entry.summary}</p>
        <div className="mt-14">
          <MdxContent source={entry.body} />
        </div>
      </article>
    </SiteShell>
  );
}

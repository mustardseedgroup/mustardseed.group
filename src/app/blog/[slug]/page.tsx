import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MdxContent } from "@/components/mdx-content";
import { SiteShell } from "@/components/site-shell";
import { getCollection, getEntry } from "@/lib/content";

export function generateStaticParams() {
  return getCollection("blog").map((entry) => ({ slug: entry.slug }));
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getEntry("blog", slug);
  if (!entry) return {};
  return {
    title: entry.title,
    description: entry.summary,
    alternates: { canonical: `/blog/${entry.slug}` },
  };
}

export default async function BlogEntryPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = getEntry("blog", slug);
  if (!entry) notFound();

  return (
    <SiteShell>
      <article>
        <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:grid-cols-[0.8fr_1.2fr] md:px-8 md:py-28">
          <div>
            <p className="text-sm uppercase tracking-[0.16em] text-[var(--accent)]">{entry.category}</p>
            <h1 className="mt-5 font-serif text-5xl font-medium leading-none md:text-8xl">{entry.title}</h1>
            <p className="mt-8 max-w-3xl text-xl leading-9 text-[var(--muted)]">{entry.summary}</p>
          </div>
          <aside className="grid gap-px self-start bg-[var(--line)]">
            <div className="bg-[#fbfaf7] p-6">
              <p className="text-xs uppercase tracking-[0.16em] text-[var(--accent)]">Type</p>
              <p className="mt-5 text-2xl">{entry.category ?? "Update"}</p>
            </div>
            <div className="bg-[#fbfaf7] p-6">
              <p className="text-xs uppercase tracking-[0.16em] text-[var(--accent)]">Date</p>
              <p className="mt-5 text-2xl">{entry.date ?? "Undated"}</p>
            </div>
            <div className="bg-[#0b0b09] p-6 text-[#fbfaf7]">
              <p className="text-xs uppercase tracking-[0.16em] text-[#c8c0b2]">Context</p>
              <p className="mt-5 leading-7">A public note from the Mustard Seed Group ecosystem.</p>
            </div>
          </aside>
        </section>
        <section className="mx-auto max-w-5xl px-5 pb-24 md:px-8">
          <MdxContent source={entry.body} />
        </section>
      </article>
    </SiteShell>
  );
}

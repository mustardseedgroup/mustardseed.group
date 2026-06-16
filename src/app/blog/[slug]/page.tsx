import type { Metadata } from "next";
import Image from "next/image";
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

  const socialImage = entry.thumbnail
    ? {
        url: entry.thumbnail,
        width: 1600,
        height: 900,
        alt: entry.title,
      }
    : undefined;

  return {
    title: entry.title,
    description: entry.summary,
    alternates: { canonical: `/blog/${entry.slug}` },
    openGraph: {
      title: entry.title,
      description: entry.summary,
      images: socialImage ? [socialImage] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: entry.title,
      description: entry.summary,
      images: entry.thumbnail ? [entry.thumbnail] : undefined,
    },
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
        {entry.thumbnail ? (
          <section className="mx-auto max-w-7xl px-5 pb-16 md:px-8">
            <figure className="overflow-hidden border border-[var(--line)] bg-[#efebe2]">
              <Image
                src={entry.thumbnail}
                alt=""
                width={1600}
                height={900}
                priority
                sizes="(min-width: 1280px) 1216px, calc(100vw - 40px)"
                className="h-auto w-full"
              />
            </figure>
          </section>
        ) : null}
        <section className="mx-auto max-w-5xl px-5 pb-24 md:px-8">
          <MdxContent source={entry.body} />
        </section>
      </article>
    </SiteShell>
  );
}

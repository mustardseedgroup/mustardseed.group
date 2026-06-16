import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { formatDisplayDate, SectionIntro } from "@/components/editorial";
import { SiteShell } from "@/components/site-shell";
import { getCollection, type ContentEntry } from "@/lib/content";

export const metadata: Metadata = {
  title: "Updates",
  description: "Research notes, product updates, founder letters and experiments from across Mustard Seed Group.",
};

const streams = [
  ["Founder letters", "The group thesis, operating notes and long-term decisions."],
  ["Product updates", "Public updates from Orbit, All Purpose, TUXX and related products."],
  ["Research notes", "Benediction Lab essays on agents, memory and systems."],
  ["Experiments", "Selected concepts, prototypes and lessons from the lab."],
] as const;

const filters = ["All", "Research", "Product", "Founder letters", "Experiments"] as const;

function articleHref(entry: ContentEntry) {
  return `/${entry.collection}/${entry.slug}`;
}

function UpdateArtwork({ entry, size = "standard" }: { entry: ContentEntry; size?: "standard" | "large" }) {
  const tone = entry.collection === "research" ? "research" : "companies";

  if (entry.thumbnail) {
    return (
      <div className="relative aspect-[1200/630] overflow-hidden border border-[var(--soft-line)] bg-[#efebe2]">
        <Image
          src={entry.thumbnail}
          alt=""
          fill
          sizes={size === "large" ? "(min-width: 768px) 56vw, 100vw" : "(min-width: 768px) 33vw, 100vw"}
          className="object-contain transition duration-300 group-hover:scale-[1.015]"
        />
      </div>
    );
  }

  return (
    <div
      className={`art-card relative flex aspect-[1200/630] items-end justify-between overflow-hidden p-5`}
      data-tone={tone}
    >
      <div className="relative z-10 max-w-[14rem]">
        <p className="text-xs uppercase tracking-[0.16em] text-[var(--accent)]">{entry.category ?? entry.collection}</p>
        <p className="mt-3 font-serif text-4xl leading-none text-[var(--foreground)]">{entry.title.split(" ").slice(0, 3).join(" ")}</p>
      </div>
      <div className="relative z-10 grid h-16 w-16 place-items-center border border-[var(--soft-line)] bg-[#fbfaf7] text-sm uppercase tracking-[0.14em] text-[var(--clay)]">
        MSG
      </div>
    </div>
  );
}

function ResourceCard({ entry, featured = false }: { entry: ContentEntry; featured?: boolean }) {
  return (
    <Link href={articleHref(entry)} className={`group block ${featured ? "md:grid md:grid-cols-[1.12fr_0.88fr]" : ""}`}>
      <UpdateArtwork entry={entry} size={featured ? "large" : "standard"} />
      <div className={`border-x border-b border-[var(--soft-line)] bg-[#fbfaf7] p-6 ${featured ? "md:border-y md:border-l-0 md:p-8" : ""}`}>
        <div className="flex items-center justify-between gap-6 text-xs uppercase tracking-[0.16em] text-[var(--accent)]">
          <span>{entry.category ?? entry.collection}</span>
          <span>{formatDisplayDate(entry.date)}</span>
        </div>
        <h2 className={`mt-6 leading-tight ${featured ? "font-serif text-5xl md:text-6xl" : "text-2xl"}`}>{entry.title}</h2>
        <p className="mt-5 max-w-2xl leading-7 text-[var(--muted)]">{entry.summary}</p>
        <span className="mt-8 inline-flex text-sm transition group-hover:translate-x-1">Read update</span>
      </div>
    </Link>
  );
}

export default function BlogPage() {
  const entries = [...getCollection("blog"), ...getCollection("research")].sort((a, b) => {
    if (!a.date || !b.date) return a.title.localeCompare(b.title);
    return b.date.localeCompare(a.date);
  });
  const featured = entries[0];
  const secondary = entries.slice(1, 4);
  const archive = entries.slice(4);

  return (
    <SiteShell>
      <main>
        <section className="mx-auto max-w-7xl px-5 py-20 text-center md:px-8 md:py-28">
          <p className="text-sm text-[var(--muted)]">Research, products and company notes</p>
          <h1 className="mx-auto mt-8 max-w-5xl text-5xl leading-[0.98] md:text-7xl">
            Updates from across Mustard Seed Group
          </h1>
          <p className="mx-auto mt-8 max-w-3xl text-xl leading-8 text-[var(--muted)] md:text-2xl">
            Public writing on the companies, products, research systems and experiments being built across the group.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {filters.map((filter, index) => (
              <span
                key={filter}
                className={`rounded-full border px-5 py-2 text-sm ${
                  index === 0 ? "border-[var(--foreground)] bg-[var(--foreground)] text-[#fbfaf7]" : "border-[var(--soft-line)] text-[var(--muted)]"
                }`}
              >
                {filter}
              </span>
            ))}
          </div>
        </section>

        {featured ? (
          <section className="mx-auto max-w-7xl px-5 pb-24 md:px-8">
            <div className="mb-8 flex items-end justify-between gap-6 border-b border-[var(--line)] pb-5">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--accent)]">Featured</p>
                <h2 className="mt-3 text-3xl">Latest public note</h2>
              </div>
              <Link href="/contact" className="hidden text-sm text-[var(--muted)] transition hover:text-[var(--foreground)] md:inline-flex">
                Submit an update
              </Link>
            </div>
            <ResourceCard entry={featured} featured />
          </section>
        ) : null}

        {secondary.length ? (
          <section className="content-band">
            <div className="mx-auto max-w-7xl px-5 py-24 md:px-8">
              <div className="mb-10 flex items-end justify-between gap-6">
                <SectionIntro kicker="Latest" title="New writing." />
                <p className="hidden max-w-sm text-sm leading-6 text-[var(--muted)] md:block">
                  A public surface for what can be safely shared: ideas, releases, research and product thinking.
                </p>
              </div>
              <div className="grid gap-5 md:grid-cols-3">
                {secondary.map((entry) => (
                  <ResourceCard key={`${entry.collection}-${entry.slug}`} entry={entry} />
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
          <div className="grid gap-10 md:grid-cols-[0.55fr_1.45fr]">
            <SectionIntro kicker="Streams" title="Browse by surface." />
            <div className="grid gap-4 md:grid-cols-2">
              {streams.map(([title, copy]) => (
                <div key={title} className="border border-[var(--soft-line)] bg-[#fbfaf7] p-6">
                  <h2 className="text-3xl">{title}</h2>
                  <p className="mt-12 text-sm leading-7 text-[var(--muted)]">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="content-band">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-24 md:grid-cols-[0.55fr_1.45fr] md:px-8">
            <SectionIntro
              kicker="Archive"
              title="A long view, built carefully."
              summary="The historical archive will be drafted from sourced public information, reviewed before publication and written in the voice of its period."
            />
            <div className="grid gap-5 md:grid-cols-2">
              {archive.length
                ? archive.map((entry) => <ResourceCard key={`${entry.collection}-${entry.slug}`} entry={entry} />)
                : ["2015-2020", "2021-2023", "2024-2025", "2026 onward"].map((period) => (
                    <div key={period} className="border border-[var(--soft-line)] bg-[#fbfaf7] p-6">
                      <p className="text-xs uppercase tracking-[0.16em] text-[var(--accent)]">Planned archive</p>
                      <h2 className="mt-6 text-4xl">{period}</h2>
                      <p className="mt-8 leading-7 text-[var(--muted)]">
                        Monthly essays will be added after source research, image generation and editorial review.
                      </p>
                    </div>
                  ))}
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}

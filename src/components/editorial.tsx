import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import type { ContentEntry } from "@/lib/content";

export function formatDisplayDate(date?: string) {
  if (!date) return "Undated";
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export function EditorialHeader({
  kicker,
  title,
  summary,
}: {
  kicker?: string;
  title: string;
  summary: string;
}) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
      {kicker ? <p className="text-xs uppercase tracking-[0.18em] text-[var(--accent)]">{kicker}</p> : null}
      <h1 className="mt-5 max-w-6xl font-serif text-5xl font-medium leading-[0.92] md:text-[7rem]">{title}</h1>
      <p className="mt-10 max-w-4xl text-2xl leading-snug text-[var(--muted)] md:text-3xl">{summary}</p>
    </section>
  );
}

export function SectionIntro({
  kicker,
  title,
  summary,
}: {
  kicker: string;
  title: string;
  summary?: string;
}) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.18em] text-[var(--accent)]">{kicker}</p>
      <h2 className="mt-5 font-serif text-5xl leading-none md:text-7xl">{title}</h2>
      {summary ? <p className="mt-7 max-w-xl text-lg leading-8 text-[var(--muted)]">{summary}</p> : null}
    </div>
  );
}

export function StoryCard({
  entry,
  href,
  featured = false,
}: {
  entry: ContentEntry;
  href: string;
  featured?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group flex min-h-80 flex-col border border-[var(--line)] bg-[#fbfaf7] p-5 transition hover:bg-[#f1eee6] ${
        featured ? "md:col-span-2 md:min-h-[30rem]" : ""
      }`}
    >
      <div className="art-card mb-8 min-h-40" data-tone={entry.collection} />
      <div className="mt-auto">
        <div className="flex items-center justify-between gap-6 text-xs uppercase tracking-[0.16em] text-[var(--accent)]">
          <span>{entry.category ?? entry.collection}</span>
          <span>{formatDisplayDate(entry.date)}</span>
        </div>
        <h3 className={`mt-5 leading-tight ${featured ? "text-4xl md:text-5xl" : "text-2xl"}`}>{entry.title}</h3>
        <p className="mt-5 max-w-2xl leading-7 text-[var(--muted)]">{entry.summary}</p>
        <span className="mt-8 inline-flex text-sm transition group-hover:translate-x-1">Read</span>
      </div>
    </Link>
  );
}

export function PillarCard({
  brand,
  title,
  label,
  summary,
  href,
  proof,
}: {
  brand: Parameters<typeof BrandLogo>[0]["brand"];
  title: string;
  label: string;
  summary: string;
  href: string;
  proof: readonly string[];
}) {
  return (
    <Link href={href} className="group flex min-h-[26rem] flex-col border border-[var(--line)] bg-[#fbfaf7] p-6 transition hover:bg-[#f1eee6]">
      <div className="flex items-start justify-between gap-6">
        <div className="flex min-h-14 items-center">
          <BrandLogo brand={brand} />
        </div>
        <span className="text-xs uppercase tracking-[0.16em] text-[var(--accent)]">{label}</span>
      </div>
      <div className="mt-auto">
        <h3 className="text-4xl leading-none">{title}</h3>
        <p className="mt-5 text-lg leading-8 text-[var(--muted)]">{summary}</p>
        <div className="mt-8 grid gap-2">
          {proof.slice(0, 4).map((item) => (
            <div key={item} className="flex items-center justify-between border-t border-[var(--soft-line)] pt-2 text-sm">
              <span>{item}</span>
              <span className="h-1.5 w-1.5 bg-[var(--clay)]" />
            </div>
          ))}
        </div>
        <span className="mt-8 inline-flex text-sm transition group-hover:translate-x-1">Explore</span>
      </div>
    </Link>
  );
}

import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import type { ContentEntry } from "@/lib/content";

const companyBrandBySlug = {
  "benediction-lab": "benediction",
  orbit: "orbit",
  "all-purpose": "all-purpose",
  tuxx: "tuxx",
  "chiko-shire": "msg",
} as const;

export function ContentList({ entries, basePath }: { entries: ContentEntry[]; basePath: string }) {
  return (
    <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
      {entries.map((entry) => (
        <Link key={entry.slug} href={`${basePath}/${entry.slug}`} className="grid gap-6 py-8 md:grid-cols-[0.2fr_0.25fr_1fr] md:items-center">
          <div className="flex min-h-16 items-center">
            {basePath === "/companies" && entry.slug in companyBrandBySlug ? (
              <BrandLogo brand={companyBrandBySlug[entry.slug as keyof typeof companyBrandBySlug]} />
            ) : null}
          </div>
          <div className="text-sm text-[var(--muted)]">
            <p>{entry.category}</p>
            {entry.date ? <p className="mt-2">{entry.date}</p> : null}
          </div>
          <div>
            <h2 className="text-3xl leading-tight">{entry.title}</h2>
            <p className="mt-4 max-w-3xl leading-7 text-[var(--muted)]">{entry.summary}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

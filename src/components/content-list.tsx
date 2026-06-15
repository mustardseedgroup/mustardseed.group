import Link from "next/link";
import type { ContentEntry } from "@/lib/content";

export function ContentList({ entries, basePath }: { entries: ContentEntry[]; basePath: string }) {
  return (
    <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
      {entries.map((entry) => (
        <Link key={entry.slug} href={`${basePath}/${entry.slug}`} className="grid gap-4 py-8 md:grid-cols-[0.25fr_1fr]">
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

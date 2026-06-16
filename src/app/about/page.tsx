import type { Metadata } from "next";
import Link from "next/link";
import { MdxContent } from "@/components/mdx-content";
import { SectionIntro, StoryCard } from "@/components/editorial";
import { BrandLogo } from "@/components/brand-logo";
import { SiteShell } from "@/components/site-shell";
import { getCollection, getEntry } from "@/lib/content";
import { domains, principles, timeline } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "About",
  description: "The mission, origin and long-term thesis behind Mustard Seed Group.",
};

function AboutArtwork() {
  return (
    <div className="art-card min-h-[34rem] border border-[var(--line)] bg-[#efebe2]">
      <div className="absolute left-8 top-8 max-w-xs">
        <BrandLogo brand="msg" className="text-3xl" />
        <p className="mt-4 text-sm leading-6 text-[var(--muted)]">Small ideas, cultivated into systems.</p>
      </div>
      <div className="absolute bottom-8 right-8 grid gap-2 text-right text-xs uppercase tracking-[0.16em] text-[var(--accent)]">
        <span>Intelligence</span>
        <span>Execution</span>
        <span>Performance</span>
        <span>Creativity</span>
      </div>
    </div>
  );
}

export default function AboutPage() {
  const entry = getEntry("pages", "about");
  const updates = [...getCollection("blog"), ...getCollection("research")]
    .sort((a, b) => {
      if (!a.date || !b.date) return a.title.localeCompare(b.title);
      return b.date.localeCompare(a.date);
    })
    .slice(0, 4);

  return (
    <SiteShell>
      <main>
        <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
          <p className="text-sm text-[var(--accent)]">Company</p>
          <h1 className="mt-6 font-serif text-6xl font-medium leading-none md:text-8xl">About</h1>
          <p className="mt-10 max-w-4xl text-3xl leading-tight text-[var(--muted)] md:text-5xl">
            Mustard Seed Group builds systems that increase human capability.
          </p>
        </section>

        <section className="mx-auto grid max-w-7xl gap-12 px-5 pb-24 md:grid-cols-[0.85fr_1.15fr] md:px-8">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--accent)]">Our vision for capability</p>
            <h2 className="mt-5 text-4xl font-medium leading-tight md:text-6xl">
              Technology should help people think deeper, move better, create more and execute with more clarity.
            </h2>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/products" className="button button-primary focus-ring" style={{ color: "#fbfaf7" }}>Products</Link>
              <Link href="/blog" className="button button-secondary focus-ring">Updates</Link>
            </div>
          </div>
          <AboutArtwork />
        </section>

        <section className="content-band">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-24 md:grid-cols-[0.55fr_1.45fr] md:px-8">
            <SectionIntro
              kicker="Mission"
              title="The common thread is capability."
              summary="AI is one tool. Software is one medium. The institution is organised around systems that help people and organisations operate at a higher level."
            />
            <div className="editorial-grid md:grid-cols-4">
              {domains.map(([title, copy]) => (
                <div key={title} className="editorial-panel min-h-72">
                  <h3 className="text-3xl">{title}</h3>
                  <p className="mt-20 text-sm leading-7 text-[var(--muted)]">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-12 px-5 py-24 md:grid-cols-[1fr_1fr] md:px-8">
          <h2 className="font-serif text-6xl leading-none md:text-[8rem]">Great things often begin as small things.</h2>
          <div className="grid gap-8 text-xl leading-9 text-[var(--muted)]">
            <p>
              The name carries the operating belief: small ideas, tended properly, can grow into products, companies and systems that change lives.
            </p>
            <p>
              Orbit, Benediction Lab, TUXX, All Purpose, CheekyGains and Naira are expressions of the same long-term build pattern.
            </p>
          </div>
        </section>

        <section className="content-band">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-24 md:grid-cols-[0.55fr_1.45fr] md:px-8">
            <SectionIntro kicker="Learn more about what we do" title="Research, products and public updates." />
            <div className="editorial-grid md:grid-cols-2">
              <Link href="/products" className="editorial-panel group min-h-72 transition hover:bg-[#f1eee6]">
                <h3 className="text-4xl">Products</h3>
                <p className="mt-20 text-lg leading-8 text-[var(--muted)]">Explore Orbit, TUXX, All Purpose, Benediction Lab and the active product surfaces.</p>
                <span className="mt-8 inline-flex text-sm transition group-hover:translate-x-1">Explore</span>
              </Link>
              <Link href="/blog" className="editorial-panel group min-h-72 transition hover:bg-[#f1eee6]">
                <h3 className="text-4xl">Updates</h3>
                <p className="mt-20 text-lg leading-8 text-[var(--muted)]">Read public research notes, founder letters, product updates and selected experiments.</p>
                <span className="mt-8 inline-flex text-sm transition group-hover:translate-x-1">Read</span>
              </Link>
            </div>
          </div>
        </section>

        {updates.length ? (
          <section className="mx-auto grid max-w-7xl gap-10 px-5 py-24 md:grid-cols-[0.55fr_1.45fr] md:px-8">
            <SectionIntro kicker="Recent" title="Current public writing." />
            <div className="grid gap-5 md:grid-cols-2">
              {updates.map((update) => (
                <StoryCard key={`${update.collection}-${update.slug}`} entry={update} href={`/${update.collection}/${update.slug}`} />
              ))}
            </div>
          </section>
        ) : null}

        <section className="content-band">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-24 md:grid-cols-[0.55fr_1.45fr] md:px-8">
            <SectionIntro kicker="Structure" title="How the group is organised." />
            <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
              {timeline.map(([stage, copy, date]) => (
                <div key={stage} className="grid gap-6 bg-[#fbfaf7] py-8 md:grid-cols-[0.25fr_1fr_0.25fr]">
                  <h3 className="text-3xl">{stage}</h3>
                  <p className="max-w-3xl text-lg leading-8 text-[var(--muted)]">{copy}</p>
                  <p className="text-sm text-[var(--accent)] md:text-right">{date}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-10 px-5 py-24 md:grid-cols-[0.55fr_1.45fr] md:px-8">
          <SectionIntro kicker="Principles" title="How the group thinks." />
          <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {principles.map(([title, copy]) => (
              <div key={title} className="grid gap-5 py-7 md:grid-cols-[0.75fr_1fr]">
                <h3 className="text-2xl leading-tight">{title}</h3>
                <p className="leading-7 text-[var(--muted)]">{copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-5 pb-24 md:px-8">
          {entry ? <MdxContent source={entry.body} /> : null}
        </section>
      </main>
    </SiteShell>
  );
}

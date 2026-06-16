import Link from "next/link";
import { CapabilityConsole } from "@/components/capability-console";
import { PillarCard, SectionIntro, StoryCard } from "@/components/editorial";
import { BrandLogo } from "@/components/brand-logo";
import { SiteShell } from "@/components/site-shell";
import { getCollection, getFeatured } from "@/lib/content";
import { domains, ecosystemPillars, principles, products, researchTracks, timeline } from "@/lib/site-content";

export default function Home() {
  const updates = getCollection("blog");
  const research = getFeatured("research", 3);
  const latest = [...updates, ...research].slice(0, 6);
  const featured = latest[0];

  return (
    <SiteShell>
      <main>
        <section className="mx-auto grid max-w-7xl gap-10 px-5 py-10 md:grid-cols-[0.9fr_1.1fr] md:px-8 md:py-16">
          <div className="flex min-h-[44rem] flex-col justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--accent)]">Mustard Seed Group</p>
              <h1 className="mt-8 max-w-4xl font-serif text-[5rem] font-medium leading-[0.86] md:text-[10rem]">
                Systems that increase human capability.
              </h1>
            </div>
            <div className="max-w-2xl">
              <p className="text-2xl leading-snug text-[var(--muted)] md:text-4xl">
                Research, products, commercial systems and consumer culture built around one question: how can people become more capable than they were yesterday?
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="#latest" className="button button-primary focus-ring">Latest updates</Link>
                <Link href="/products" className="button button-secondary focus-ring">Explore products</Link>
              </div>
            </div>
          </div>
          <CapabilityConsole />
        </section>

        {featured ? (
          <section id="latest" className="content-band">
            <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-[0.45fr_1.55fr] md:px-8">
              <SectionIntro
                kicker="Featured"
                title="What is happening across the group."
                summary="A public surface for product updates, research notes, founder letters and selected experiments."
              />
              <div className="grid gap-5 md:grid-cols-2">
                <StoryCard entry={featured} href={`/${featured.collection}/${featured.slug}`} featured />
                <div className="grid gap-5">
                  {latest.slice(1, 4).map((entry) => (
                    <StoryCard key={`${entry.collection}-${entry.slug}`} entry={entry} href={`/${entry.collection}/${entry.slug}`} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        ) : null}

        <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
          <div className="grid gap-10 md:grid-cols-[0.65fr_1.35fr]">
            <SectionIntro
              kicker="Products"
              title="Four operating layers."
              summary="Each part of the group has a distinct job. Together they form a loop from research to product to commercial proof."
            />
            <div className="grid gap-5 md:grid-cols-2">
              {ecosystemPillars.map((pillar) => (
                <PillarCard key={pillar.title} {...pillar} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#0b0b09] text-[#fbfaf7]">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-24 md:grid-cols-[1fr_1fr] md:px-8">
            <h2 className="font-serif text-6xl leading-none md:text-[8rem]">Technology should amplify people.</h2>
            <div className="grid gap-8 text-xl leading-9 text-[#c8c0b2]">
              <p>
                The group is not organised around AI as a trend. It is organised around capability: intelligence, execution, performance and creativity.
              </p>
              <p>
                Benediction Lab researches it. Orbit productises it. TUXX proves it commercially. All Purpose brings it into consumer life and culture.
              </p>
            </div>
          </div>
        </section>

        <section className="content-band">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:grid-cols-[0.55fr_1.45fr] md:px-8">
            <SectionIntro kicker="Build thesis" title="The portfolio is organised by capability." />
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

        <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
          <div className="grid gap-10 md:grid-cols-[0.65fr_1.35fr]">
            <SectionIntro
              kicker="Updates"
              title="Research notes and public updates."
              summary="Updates combine founder letters, product notes and public research without exposing private prompts, memory schemas or orchestration."
            />
            <div className="grid gap-5 md:grid-cols-3">
              {research.map((entry) => (
                <StoryCard key={entry.slug} entry={entry} href={`/research/${entry.slug}`} />
              ))}
            </div>
          </div>
        </section>

        <section className="content-band">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-24 md:grid-cols-[0.55fr_1.45fr] md:px-8">
            <SectionIntro
              kicker="Products"
              title="Active product surfaces."
              summary="Only public-safe positioning is shown here. Core source code, private systems and client workflows remain private."
            />
            <div className="editorial-grid md:grid-cols-3">
              {products.map((product) => (
                <Link key={product.title} href={product.href} className="editorial-panel group min-h-80 transition hover:bg-[#f1eee6]">
                  <div className="flex min-h-14 items-center justify-between gap-6">
                    <BrandLogo brand={product.brand} />
                    <span className="text-xs uppercase tracking-[0.16em] text-[var(--accent)]">{product.group}</span>
                  </div>
                  <h3 className="mt-24 text-3xl">{product.title}</h3>
                  <p className="mt-5 leading-7 text-[var(--muted)]">{product.summary}</p>
                  <span className="mt-8 inline-flex text-sm transition group-hover:translate-x-1">View</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
          <div className="grid gap-10 md:grid-cols-[0.55fr_1.45fr]">
            <SectionIntro kicker="Timeline" title="From experiments to institution." />
            <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
              {timeline.map(([stage, copy, date]) => (
                <div key={stage} className="grid gap-6 py-8 md:grid-cols-[0.25fr_1fr_0.25fr]">
                  <h3 className="text-3xl">{stage}</h3>
                  <p className="max-w-3xl text-lg leading-8 text-[var(--muted)]">{copy}</p>
                  <p className="text-sm text-[var(--accent)] md:text-right">{date}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="content-band">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-24 md:grid-cols-[0.55fr_1.45fr] md:px-8">
            <SectionIntro kicker="Research tracks" title="Current focus." />
            <div className="editorial-grid md:grid-cols-4">
              {researchTracks.map(([title, copy]) => (
                <div key={title} className="editorial-panel min-h-72">
                  <h3 className="text-2xl leading-tight">{title}</h3>
                  <p className="mt-16 text-sm leading-7 text-[var(--muted)]">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
          <div className="grid gap-10 md:grid-cols-[0.55fr_1.45fr]">
            <SectionIntro kicker="Principles" title="The operating philosophy." />
            <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
              {principles.map(([title, copy]) => (
                <div key={title} className="grid gap-5 py-7 md:grid-cols-[0.75fr_1fr]">
                  <h3 className="text-2xl leading-tight">{title}</h3>
                  <p className="leading-7 text-[var(--muted)]">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#0b0b09] text-[#fbfaf7]">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-24 md:grid-cols-[1fr_0.8fr] md:px-8">
            <h2 className="font-serif text-6xl leading-none md:text-[7rem]">The future belongs to people who can learn faster, think deeper and execute better.</h2>
            <div className="self-end">
              <p className="text-xl leading-9 text-[#c8c0b2]">Mustard Seed Group exists to build systems that make that possible.</p>
              <Link href="/contact" className="button button-subtle focus-ring mt-8">Get in touch</Link>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}

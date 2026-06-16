import type { Metadata } from "next";
import { MdxContent } from "@/components/mdx-content";
import { EditorialHeader, SectionIntro } from "@/components/editorial";
import { SiteShell } from "@/components/site-shell";
import { getEntry } from "@/lib/content";
import { domains, principles, timeline } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "About",
  description: "The mission, origin and long-term thesis behind Mustard Seed Group.",
};

export default function AboutPage() {
  const entry = getEntry("pages", "about");

  return (
    <SiteShell>
      <main>
        <EditorialHeader
          kicker="About"
          title="An institution for increasing human capability."
          summary="Mustard Seed Group exists because research, software, performance, creativity and commercial execution are not separate lanes. They are different ways to help people become more capable."
        />

        <section className="content-band">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-24 md:grid-cols-[0.55fr_1.45fr] md:px-8">
            <SectionIntro
              kicker="The thesis"
              title="The common thread is not AI. It is capability."
              summary="AI is one tool. Software is one medium. The institution is organised around systems that help people think, move, create and execute better."
            />
            <div className="editorial-grid md:grid-cols-4">
              {domains.map(([title, copy]) => (
                <div key={title} className="editorial-panel min-h-72">
                  <h2 className="text-3xl">{title}</h2>
                  <p className="mt-20 text-sm leading-7 text-[var(--muted)]">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-10 px-5 py-24 md:grid-cols-[1fr_1fr] md:px-8">
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
            <SectionIntro kicker="Principles" title="How the group thinks." />
            <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
              {principles.map(([title, copy]) => (
                <div key={title} className="grid gap-5 bg-[#fbfaf7] py-7 md:grid-cols-[0.75fr_1fr]">
                  <h2 className="text-2xl leading-tight">{title}</h2>
                  <p className="leading-7 text-[var(--muted)]">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
          <div className="grid gap-10 md:grid-cols-[0.55fr_1.45fr]">
            <SectionIntro kicker="Timeline" title="Still early, deliberately." />
            <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
              {timeline.map(([stage, copy, date]) => (
                <div key={stage} className="grid gap-6 py-8 md:grid-cols-[0.25fr_1fr_0.25fr]">
                  <h2 className="text-3xl">{stage}</h2>
                  <p className="max-w-3xl text-lg leading-8 text-[var(--muted)]">{copy}</p>
                  <p className="text-sm text-[var(--accent)] md:text-right">{date}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-5 pb-24 md:px-8">
          {entry ? <MdxContent source={entry.body} /> : null}
        </section>
      </main>
    </SiteShell>
  );
}

import Link from "next/link";
import { EcosystemMap } from "@/components/ecosystem-map";
import { SiteShell } from "@/components/site-shell";
import { getFeatured } from "@/lib/content";

const ecosystem = [
  ["Benediction Lab", "Research lab exploring AI systems, memory, human behaviour, agentic operating systems and future products.", "/companies/benediction-lab"],
  ["Orbit", "AI operating system for business, turning prospects into launched products through agents, workflows and execution systems.", "/companies/orbit"],
  ["All Purpose", "Consumer ecosystem focused on performance, creativity, culture and personal development.", "/companies/all-purpose"],
  ["TUXX", "Custom AI systems and internal software for ambitious organisations.", "/companies/tuxx"],
  ["Chiko Shire", "Founder and operator behind the ecosystem.", "/companies/chiko-shire"],
];

const focus = [
  "Agentic operating systems",
  "Commercial execution systems",
  "Human performance technology",
  "Consumer software",
  "Research-led product development",
];

const principles = [
  "Build systems, not features.",
  "Research before product.",
  "Technology should increase human capability.",
  "Own the control plane.",
  "Long-term thinking compounds.",
];

const thesis = [
  ["01", "Intelligence", "Research, agents, memory and systems that help people and organisations think, reason and decide."],
  ["02", "Performance", "Human performance products, coaching systems and behaviour design."],
  ["03", "Execution", "Business operating systems, workflows and commercial software that drive outcomes."],
  ["04", "Creativity", "Consumer products, media, storytelling and culture that move people."],
];

const activeProducts = [
  ["CG", "CheekyGains", "Human performance platform for training, nutrition and accountability.", "/companies/all-purpose"],
  ["N", "Naira", "AI performance coach inside CheekyGains.", "/companies/all-purpose"],
  ["H", "Horizon", "Tools and systems for planning and executing a better future.", "/companies/all-purpose"],
];

export default function Home() {
  const research = getFeatured("research", 3);

  return (
    <SiteShell>
      <main>
        <section className="mx-auto grid max-w-7xl gap-12 px-5 pb-20 pt-20 md:grid-cols-[0.95fr_1.05fr] md:px-8 md:pb-28 md:pt-28">
          <div className="flex flex-col justify-between gap-12">
            <div>
              <p className="mb-8 text-xs font-medium uppercase tracking-[0.18em] text-[var(--muted)]">Parent company and institution</p>
              <h1 className="font-serif text-[4.5rem] font-medium leading-[0.9] tracking-normal md:text-[7.8rem]">
                Mustard Seed Group
              </h1>
              <p className="mt-8 max-w-2xl text-2xl leading-snug md:text-3xl">
                Building systems that increase human capability.
              </p>
              <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--muted)]">
                A portfolio spanning business operating systems, research, human performance, consumer products and creative culture.
              </p>
              <Link
                href="#ecosystem"
                className="focus-ring mt-9 inline-flex border border-[var(--foreground)] px-5 py-3 text-sm transition hover:bg-[var(--foreground)] hover:text-[var(--background)]"
              >
                Explore the ecosystem
              </Link>
            </div>
          </div>
          <EcosystemMap />
        </section>

        <section className="border-y border-[var(--line)] bg-[#ffffff]">
          <div className="mx-auto grid max-w-7xl gap-14 px-5 py-24 md:grid-cols-[0.55fr_1.1fr_0.9fr] md:px-8">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--muted)]">Our philosophy</p>
            <p className="font-serif text-5xl leading-[1.02] md:text-6xl">
              Technology should not replace people. It should amplify what people are capable of becoming.
            </p>
            <div className="text-lg leading-8">
              <p>
                We build tools, products and research that help individuals and organisations operate at a higher level.
              </p>
              <p className="mt-7 text-[var(--muted)]">
                From intelligence and execution systems to human performance platforms and creative tools, the goal is simple: help people become more capable than they were yesterday.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
          <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr]">
            <h2 className="font-serif text-5xl font-medium leading-none md:text-6xl">
              One question organises the group.
            </h2>
            <div>
              <p className="text-3xl leading-tight">
                How can technology help people become more capable than they were yesterday?
              </p>
              <p className="mt-8 text-lg leading-8 text-[var(--muted)]">
                Some companies focus on business execution. Some explore intelligence and memory. Some build human performance tools. Some shape culture and creativity. Together, they form one long-term mission: increasing human capability.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-24 md:px-8">
          <div className="grid gap-8 border-t border-[var(--line)] pt-10 md:grid-cols-[0.85fr_1.8fr]">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--muted)]">Our build thesis</p>
              <h2 className="mt-8 font-serif text-4xl leading-none md:text-5xl">We build in four domains.</h2>
            </div>
            <div className="grid md:grid-cols-4">
              {thesis.map(([number, title, copy]) => (
              <div key={title} className="border-b border-[var(--line)] py-8 md:border-r md:px-6 md:last:border-r-0">
                <p className="text-sm text-[var(--muted)]">{number}</p>
                <h3 className="mt-5 text-2xl">{title}</h3>
                <p className="mt-5 text-sm leading-7 text-[var(--muted)]">{copy}</p>
              </div>
              ))}
            </div>
          </div>
        </section>

        <section id="ecosystem" className="border-y border-[var(--line)] bg-[#ffffff]">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 md:grid-cols-[0.55fr_1.45fr] md:px-8">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--muted)]">Our ecosystem</p>
              <h2 className="mt-8 font-serif text-5xl font-medium leading-none md:text-6xl">
                An integrated ecosystem built around capability.
              </h2>
              <Link href="/ecosystem" className="mt-10 inline-flex text-sm underline underline-offset-4">
                View the full ecosystem
              </Link>
            </div>
            <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
              {ecosystem.map(([title, copy, href]) => (
                <Link key={title} href={href} className="group grid gap-6 py-8 md:grid-cols-[0.45fr_1fr_auto] md:items-center">
                  <h3 className="text-2xl">{title}</h3>
                  <p className="max-w-3xl text-lg leading-8 text-[var(--muted)]">{copy}</p>
                  <span className="text-sm text-[var(--accent)] transition group-hover:translate-x-1">Explore</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="font-serif text-5xl font-medium leading-none md:text-6xl">Most founders pick one lane.</h2>
              <p className="mt-8 text-2xl leading-snug">Chiko Shire kept combining them.</p>
            </div>
            <p className="text-lg leading-9 text-[var(--muted)]">
              Technology, entrepreneurship, fitness, music, creativity and systems became the raw material for a group built around capability.
            </p>
          </div>
        </section>

        <section className="bg-[#0b0b09] text-[#fbfaf7]">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-24 md:grid-cols-[1fr_1.1fr] md:px-8">
            <h2 className="font-serif text-5xl font-medium leading-none md:text-7xl">Great things often begin as small things.</h2>
            <div>
              <p className="text-2xl leading-snug">The smallest idea, nurtured correctly, can become something that changes lives.</p>
              <p className="mt-8 leading-8 text-[#c8c0b2]">
                Mustard Seed Group exists to cultivate those ideas into products, companies and research initiatives that compound over time.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
          <div className="grid gap-6 md:grid-cols-[0.55fr_1.45fr] md:items-start">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--muted)]">Current focus</p>
            <div className="grid gap-4 md:grid-cols-5">
            {focus.map((item) => (
              <div key={item} className="min-h-32 border-l border-[var(--line)] pl-5 text-2xl leading-tight">
                {item}
              </div>
            ))}
            </div>
          </div>
        </section>

        <section className="border-y border-[var(--line)] bg-[#ffffff]">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-[0.6fr_1.4fr] md:px-8">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--muted)]">Timeline</p>
            <div className="grid gap-8 md:grid-cols-3">
              {[
                ["Past", "Experiments, prototypes and early research.", "2016 - 2022"],
                ["Present", "Building products, platforms and research systems.", "2023 - Now"],
                ["Future", "New systems, new products and new categories.", "Next"],
              ].map(([stage, copy, date]) => (
                <div key={stage} className="border-t border-[var(--foreground)] pt-5">
                  <p className="font-medium">{stage}</p>
                  <p className="mt-4 min-h-16 text-sm leading-6 text-[var(--muted)]">{copy}</p>
                  <p className="mt-4 text-sm">{date}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-[var(--line)] bg-[#ffffff]">
          <div className="mx-auto grid max-w-7xl gap-14 px-5 py-24 md:grid-cols-2 md:px-8">
            <div>
              <h2 className="font-serif text-5xl font-medium leading-none md:text-6xl">Featured Research</h2>
              <div className="mt-10 divide-y divide-[var(--line)] border-y border-[var(--line)]">
                {research.map((entry) => (
                  <Link key={entry.slug} href={`/research/${entry.slug}`} className="grid gap-5 py-7 md:grid-cols-[0.28fr_1fr_auto] md:items-start">
                    <div className="h-20 border border-[var(--line)] bg-[repeating-radial-gradient(circle_at_center,#d9d2c7_0_1px,transparent_1px_12px)]" />
                    <div>
                      <p className="text-sm uppercase tracking-[0.12em] text-[var(--accent)]">{entry.category}</p>
                      <h3 className="mt-3 text-2xl">{entry.title}</h3>
                      <p className="mt-4 leading-7 text-[var(--muted)]">{entry.summary}</p>
                    </div>
                    <span className="text-sm">Read</span>
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h2 className="font-serif text-5xl font-medium leading-none md:text-6xl">Featured Products</h2>
              <div className="mt-10 divide-y divide-[var(--line)] border-y border-[var(--line)]">
                {activeProducts.map(([mark, title, copy, href]) => (
                  <Link key={title} href={href} className="grid gap-5 py-7 md:grid-cols-[4rem_1fr_auto] md:items-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-[var(--line)] bg-[var(--background)] font-serif text-2xl">
                      {mark}
                    </div>
                    <div>
                      <h3 className="text-2xl">{title}</h3>
                      <p className="mt-3 leading-7 text-[var(--muted)]">{copy}</p>
                    </div>
                    <span className="text-sm">View</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
          <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
            <h2 className="font-serif text-5xl font-medium leading-none md:text-6xl">Principles</h2>
            <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
              {principles.map((principle) => (
                <p key={principle} className="py-6 text-2xl leading-tight">
                  {principle}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[var(--line)]">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 md:grid-cols-[1.1fr_0.9fr] md:px-8">
            <p className="font-serif text-5xl leading-[1.02] md:text-6xl">
              The future belongs to those who can learn faster, think deeper and execute better.
            </p>
            <div>
              <p className="max-w-3xl text-xl leading-9 text-[var(--muted)]">
                Mustard Seed Group exists to build the systems that make that possible.
              </p>
              <Link href="/contact" className="focus-ring mt-9 inline-flex bg-[var(--foreground)] px-5 py-3 text-sm text-[var(--background)] transition hover:opacity-80">
                Get in touch
              </Link>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}

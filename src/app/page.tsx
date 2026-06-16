import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { CapabilityConsole } from "@/components/capability-console";
import { SiteShell } from "@/components/site-shell";
import { getCollection, getFeatured } from "@/lib/content";

const ecosystem = [
  {
    brand: "benediction" as const,
    title: "Benediction Lab",
    thesis: "Research before product.",
    copy: "A research lab exploring agentic systems, memory, human behaviour, GUI control and future products.",
    href: "/companies/benediction-lab",
    signal: "Research",
  },
  {
    brand: "orbit" as const,
    title: "Orbit",
    thesis: "Execution as an operating system.",
    copy: "An AI operating system for moving from prospect to launched product through agents, workflows and delivery systems.",
    href: "/companies/orbit",
    signal: "Product",
  },
  {
    brand: "all-purpose" as const,
    title: "All Purpose",
    thesis: "Consumer capability and culture.",
    copy: "A consumer ecosystem focused on performance, creativity, personal development, media and cultural products.",
    href: "/companies/all-purpose",
    signal: "Consumer",
  },
  {
    brand: "tuxx" as const,
    title: "TUXX",
    thesis: "Commercial systems in the field.",
    copy: "Custom AI systems, internal software and repeatable delivery patterns for ambitious organisations.",
    href: "/companies/tuxx",
    signal: "Services",
  },
  {
    brand: "msg" as const,
    title: "Chiko Shire",
    thesis: "Founder and operator.",
    copy: "The founder behind the ecosystem, building at the intersection of systems, performance, creativity and technology.",
    href: "/companies/chiko-shire",
    signal: "Founder",
  },
];

const focus = [
  ["01", "Agentic operating systems", "How software can plan, remember, act and coordinate work across a business."],
  ["02", "Commercial execution systems", "How leads, strategy, delivery and launch can become a repeatable operating layer."],
  ["03", "Human performance technology", "How coaching, behaviour design and accountability can increase personal capability."],
  ["04", "Consumer software", "How useful tools can sit inside culture, media and everyday routines."],
  ["05", "Research-led product development", "How experiments become products without exposing proprietary systems too early."],
];

const principles = [
  ["Build systems, not features.", "Features solve moments. Systems compound across teams, products and time."],
  ["Research before product.", "Useful products should be informed by careful observation, testing and thought."],
  ["Technology should increase human capability.", "The point is not replacement. The point is amplification."],
  ["Own the control plane.", "Important work needs clear interfaces, durable infrastructure and accountable operators."],
  ["Long-term thinking compounds.", "Small ideas, maintained with discipline, can become institutions."],
];

const thesis = [
  ["Intelligence", "Research, agents, memory and systems that help people and organisations think, reason and decide."],
  ["Performance", "Human performance products, coaching systems and behaviour design."],
  ["Execution", "Business operating systems, workflows and commercial software that drive outcomes."],
  ["Creativity", "Consumer products, media, storytelling and culture that move people."],
];

const activeProducts = [
  {
    brand: "cheekygains" as const,
    title: "CheekyGains",
    copy: "Human performance platform for training, nutrition and accountability.",
    href: "/companies/all-purpose",
    group: "All Purpose",
  },
  {
    brand: "naira" as const,
    title: "Naira",
    copy: "AI performance coach inside CheekyGains.",
    href: "/companies/all-purpose",
    group: "All Purpose",
  },
  {
    brand: "horizon" as const,
    title: "Horizon",
    copy: "Tools and systems for planning and executing a better future.",
    href: "/companies/all-purpose",
    group: "All Purpose",
  },
  {
    brand: "pattern-up" as const,
    title: "Pattern Up",
    copy: "A TUXX sub-product for repeatable client delivery patterns.",
    href: "/companies/tuxx",
    group: "TUXX",
  },
];

const timeline = [
  ["Origin", "Creative, technical, commercial and performance experiments begin to converge.", "2016-2022"],
  ["Formation", "The group structure clarifies around research, operating systems, services and consumer products.", "2023-2025"],
  ["Now", "Orbit, Orion, CheekyGains, Naira, TUXX and Benediction Lab become the active build surface.", "2026"],
  ["Next", "The group expands through public research, stronger products and disciplined commercial execution.", "Long term"],
];

function formatDate(date?: string) {
  if (!date) return "Undated";
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export default function Home() {
  const research = getFeatured("research", 3);
  const updates = getCollection("blog").slice(0, 4);
  const latest = [...updates.slice(0, 2), ...research.slice(0, 2)];

  return (
    <SiteShell>
      <main>
        <section className="mx-auto grid max-w-7xl gap-12 px-5 pb-16 pt-14 md:grid-cols-[0.92fr_1.08fr] md:px-8 md:pb-24 md:pt-24">
          <div className="flex flex-col justify-between gap-14">
            <div>
              <div className="mb-10 inline-flex items-center gap-3 border border-[var(--soft-line)] bg-[#f3f0e8] px-3 py-2 text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                <span className="h-2 w-2 bg-[var(--clay)]" />
                Systems, research and products
              </div>
              <h1 className="max-w-3xl font-serif text-[4.4rem] font-medium leading-[0.88] tracking-normal md:text-[8.5rem]">
                Mustard Seed Group
              </h1>
              <p className="mt-8 max-w-2xl text-2xl leading-snug md:text-4xl">
                Building systems that increase human capability.
              </p>
              <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--muted)]">
                A portfolio spanning business operating systems, research, human performance, consumer products and creative culture.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  href="#ecosystem"
                  className="button button-primary focus-ring"
                >
                  Explore the ecosystem
                </Link>
                <Link
                  href="#latest"
                  className="button button-secondary focus-ring"
                >
                  Read the latest
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 border-y border-[var(--line)] text-sm md:max-w-xl">
              {["Research", "Operating systems", "Human performance", "Creative culture"].map((item) => (
                <div key={item} className="border-b border-r border-[var(--soft-line)] px-4 py-4 odd:border-l-0 even:border-r-0 md:border-b-0">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <CapabilityConsole />
        </section>

        <section id="latest" className="border-y border-[var(--line)] bg-[#fbfaf7]">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[0.42fr_1.58fr] md:px-8">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--muted)]">Latest from the group</p>
              <p className="mt-6 max-w-xs text-lg leading-8 text-[var(--muted)]">
                Public writing, research notes and product updates from across the ecosystem.
              </p>
            </div>
            <div className="grid gap-px bg-[var(--line)] md:grid-cols-4">
              {latest.map((entry) => (
                <Link
                  key={`${entry.collection}-${entry.slug}`}
                  href={`/${entry.collection}/${entry.slug}`}
                  className="group min-h-72 bg-[#fbfaf7] p-5 transition hover:bg-[#f1eee6]"
                >
                  <p className="text-xs uppercase tracking-[0.16em] text-[var(--accent)]">
                    {entry.collection === "research" ? "Research" : "Update"}
                  </p>
                  <h2 className="mt-10 text-2xl leading-tight">{entry.title}</h2>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-[var(--muted)]">{entry.summary}</p>
                  <div className="mt-8 flex items-center justify-between text-xs text-[var(--muted)]">
                    <span>{formatDate(entry.date)}</span>
                    <span className="transition group-hover:translate-x-1">Read</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-[var(--line)] bg-[#ffffff]">
          <div className="mx-auto grid max-w-7xl gap-14 px-5 py-24 md:grid-cols-[0.55fr_1.1fr_0.9fr] md:px-8">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--muted)]">Our philosophy</p>
            <p className="font-serif text-5xl leading-[1.02] md:text-7xl">
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
          <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
            <h2 className="font-serif text-5xl font-medium leading-none md:text-7xl">
              One question organises the group.
            </h2>
            <div>
              <p className="text-3xl leading-tight md:text-5xl">
                How can technology help people become more capable than they were yesterday?
              </p>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-[var(--muted)]">
                Some companies focus on business execution. Some explore intelligence and memory. Some build human performance tools. Some shape culture and creativity. Together, they form one long-term mission.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-24 md:px-8">
          <div className="grid gap-8 border-t border-[var(--line)] pt-10 md:grid-cols-[0.7fr_1.8fr]">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--muted)]">Build thesis</p>
              <h2 className="mt-8 font-serif text-4xl leading-none md:text-6xl">Four domains. One mission.</h2>
            </div>
            <div className="grid gap-px bg-[var(--line)] md:grid-cols-4">
              {thesis.map(([title, copy], index) => (
                <div key={title} className="min-h-80 bg-[var(--background)] p-6">
                  <p className="text-xs text-[var(--muted)]">{String(index + 1).padStart(2, "0")}</p>
                  <h3 className="mt-16 text-3xl">{title}</h3>
                  <p className="mt-6 text-sm leading-7 text-[var(--muted)]">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="ecosystem" className="border-y border-[var(--line)] bg-[#ffffff]">
          <div className="mx-auto max-w-7xl px-5 py-24 md:px-8">
            <div className="grid gap-10 md:grid-cols-[0.55fr_1.45fr]">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--muted)]">Ecosystem</p>
                <h2 className="mt-8 max-w-lg font-serif text-5xl font-medium leading-none md:text-7xl">
                  An institution built around capability.
                </h2>
                <Link href="/ecosystem" className="mt-10 inline-flex text-sm underline underline-offset-4">
                  View the full ecosystem
                </Link>
              </div>
              <div className="grid gap-px bg-[var(--line)] md:grid-cols-2">
                {ecosystem.map((item) => (
                  <Link key={item.title} href={item.href} className="group flex min-h-80 flex-col bg-[#fbfaf7] p-6 transition hover:bg-[#f1eee6] md:last:col-span-2 md:last:min-h-64">
                    <div className="flex items-start justify-between gap-6">
                      <div className="flex min-h-14 items-center">
                        <BrandLogo brand={item.brand} />
                      </div>
                      <span className="text-xs uppercase tracking-[0.16em] text-[var(--accent)]">{item.signal}</span>
                    </div>
                    <div className="mt-auto pt-16">
                      <h3 className="text-3xl">{item.title}</h3>
                      <p className="mt-4 text-xl leading-snug">{item.thesis}</p>
                      <p className="mt-5 max-w-xl leading-7 text-[var(--muted)]">{item.copy}</p>
                      <span className="mt-8 inline-flex text-sm transition group-hover:translate-x-1">Explore</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
          <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr]">
            <div>
              <h2 className="font-serif text-5xl font-medium leading-none md:text-7xl">Most founders pick one lane.</h2>
              <p className="mt-8 text-2xl leading-snug">Chiko Shire kept combining them.</p>
            </div>
            <div className="grid gap-8 text-lg leading-9 text-[var(--muted)]">
              <p>
                Technology, entrepreneurship, fitness, music, creativity and systems became the raw material for a group built around capability.
              </p>
              <p>
                Mustard Seed Group gives those interests a durable structure: research can become products, products can become companies, and services can prove what works commercially.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#0b0b09] text-[#fbfaf7]">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-24 md:grid-cols-[1fr_1.1fr] md:px-8">
            <h2 className="font-serif text-5xl font-medium leading-none md:text-7xl">Great things often begin as small things.</h2>
            <div>
              <p className="text-2xl leading-snug md:text-4xl">The smallest idea, nurtured correctly, can become something that changes lives.</p>
              <p className="mt-8 max-w-2xl leading-8 text-[#c8c0b2]">
                Mustard Seed Group exists to cultivate those ideas into products, companies and research initiatives that compound over time.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
          <div className="grid gap-6 md:grid-cols-[0.45fr_1.55fr] md:items-start">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--muted)]">Current focus</p>
            <div className="grid gap-px bg-[var(--line)] md:grid-cols-5">
              {focus.map(([number, title, copy]) => (
                <div key={title} className="min-h-72 bg-[var(--background)] p-5">
                  <p className="text-xs text-[var(--muted)]">{number}</p>
                  <h3 className="mt-12 text-2xl leading-tight">{title}</h3>
                  <p className="mt-5 text-sm leading-6 text-[var(--muted)]">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-[var(--line)] bg-[#ffffff]">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:grid-cols-[0.5fr_1.5fr] md:px-8">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--muted)]">Timeline</p>
              <h2 className="mt-8 font-serif text-5xl leading-none md:text-6xl">From experiments to institution.</h2>
            </div>
            <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
              {timeline.map(([stage, copy, date]) => (
                <div key={stage} className="grid gap-5 py-7 md:grid-cols-[0.25fr_1fr_0.25fr] md:items-start">
                  <p className="text-2xl">{stage}</p>
                  <p className="max-w-2xl leading-7 text-[var(--muted)]">{copy}</p>
                  <p className="text-sm text-[var(--accent)] md:text-right">{date}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-[var(--line)] bg-[#ffffff]">
          <div className="mx-auto grid max-w-7xl gap-14 px-5 py-24 md:grid-cols-2 md:px-8">
            <div>
              <div className="flex items-end justify-between gap-6">
                <h2 className="font-serif text-5xl font-medium leading-none md:text-7xl">Featured Research</h2>
                <Link href="/research" className="hidden text-sm underline underline-offset-4 md:inline-flex">All research</Link>
              </div>
              <div className="mt-10 divide-y divide-[var(--line)] border-y border-[var(--line)]">
                {research.map((entry) => (
                  <Link key={entry.slug} href={`/research/${entry.slug}`} className="group grid gap-5 py-7 md:grid-cols-[6rem_1fr_auto] md:items-start">
                    <div className="h-24 border border-[var(--line)] bg-[repeating-radial-gradient(circle_at_center,#d9d2c7_0_1px,transparent_1px_12px)]" />
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] text-[var(--accent)]">{entry.category}</p>
                      <h3 className="mt-3 text-2xl">{entry.title}</h3>
                      <p className="mt-4 leading-7 text-[var(--muted)]">{entry.summary}</p>
                    </div>
                    <span className="text-sm transition group-hover:translate-x-1">Read</span>
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-end justify-between gap-6">
                <h2 className="font-serif text-5xl font-medium leading-none md:text-7xl">Featured Products</h2>
                <Link href="/ecosystem" className="hidden text-sm underline underline-offset-4 md:inline-flex">Ecosystem</Link>
              </div>
              <div className="mt-10 divide-y divide-[var(--line)] border-y border-[var(--line)]">
                {activeProducts.map((item) => (
                  <Link key={item.title} href={item.href} className="group grid gap-5 py-7 md:grid-cols-[5rem_1fr_auto] md:items-center">
                    <div className="flex h-16 w-16 items-center justify-center overflow-hidden bg-[#f4f1ea]">
                      <BrandLogo brand={item.brand} />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] text-[var(--accent)]">{item.group}</p>
                      <h3 className="mt-2 text-2xl">{item.title}</h3>
                      <p className="mt-3 leading-7 text-[var(--muted)]">{item.copy}</p>
                    </div>
                    <span className="text-sm transition group-hover:translate-x-1">View</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
          <div className="grid gap-10 md:grid-cols-[0.7fr_1.3fr]">
            <h2 className="font-serif text-5xl font-medium leading-none md:text-7xl">Principles</h2>
            <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
              {principles.map(([principle, copy]) => (
                <div key={principle} className="grid gap-5 py-7 md:grid-cols-[0.8fr_1fr]">
                  <p className="text-2xl leading-tight">{principle}</p>
                  <p className="leading-7 text-[var(--muted)]">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[var(--line)] bg-[#fbfaf7]">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 md:grid-cols-[1.1fr_0.9fr] md:px-8">
            <p className="font-serif text-5xl leading-[1.02] md:text-7xl">
              The future belongs to those who can learn faster, think deeper and execute better.
            </p>
            <div>
              <p className="max-w-3xl text-xl leading-9 text-[var(--muted)]">
                Mustard Seed Group exists to build the systems that make that possible.
              </p>
              <Link href="/contact" className="button button-primary focus-ring mt-9">
                Get in touch
              </Link>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}

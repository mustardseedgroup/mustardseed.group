import type { Metadata } from "next";
import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { SiteShell } from "@/components/site-shell";
import { products } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Products",
  description: "Products and systems across Orbit, Orion, All Purpose, CheekyGains, Naira and TUXX.",
};

const solutionCards = [
  {
    title: "Orbit",
    eyebrow: "Business operating system",
    brand: "orbit" as const,
    copy: "AI operating system for moving from prospect to launched product through agents, workflows and execution systems.",
    bullets: [
      "Organises commercial execution from lead to launch.",
      "Turns repeatable work into visible workflows and operating surfaces.",
      "Uses Orion as the intelligence layer for agents and execution support.",
      "Helps teams move from opportunity to delivery with fewer dropped handovers.",
    ],
    href: "/companies/orbit",
    cta: "Explore Orbit",
    visual: ["Prospect", "Plan", "Build", "Launch"],
  },
  {
    title: "TUXX",
    eyebrow: "Commercial systems",
    brand: "tuxx" as const,
    copy: "Custom AI systems and internal software for ambitious organisations that need practical execution, not theatre.",
    bullets: [
      "Builds internal tools, automations and client delivery systems.",
      "Uses Orbit and Orion internally where useful.",
      "Turns commercial lessons into repeatable delivery patterns.",
      "Pattern Up sits here as a TUXX sub-product.",
    ],
    href: "/companies/tuxx",
    cta: "Explore TUXX",
    visual: ["Intake", "Workflow", "Delivery", "Review"],
  },
];

const enablement = [
  {
    title: "Benediction Lab",
    brand: "benediction" as const,
    copy: "Research lab exploring Orion, agent systems, memory, behaviour and future products.",
    bullets: ["Orion research", "Agent systems", "Memory and behaviour", "Selected experiments"],
    href: "/companies/benediction-lab",
  },
  {
    title: "All Purpose",
    brand: "all-purpose" as const,
    copy: "Consumer ecosystem focused on performance, creativity, culture and personal development.",
    bullets: ["CheekyGains", "Naira", "Relay", "Horizon", "Made It Out", "All Purpose Music"],
    href: "/companies/all-purpose",
  },
];

function ProductMockup({ steps }: { steps: string[] }) {
  return (
    <div className="mt-12 overflow-hidden rounded-[18px] border border-[var(--soft-line)] bg-[#e8e6df] p-4">
      <div className="rounded-[14px] border border-[var(--soft-line)] bg-[#fbfaf7] p-4 shadow-[0_24px_80px_rgba(11,11,9,0.08)]">
        <div className="mb-4 flex items-center justify-between text-xs text-[var(--muted)]">
          <span>Public product preview</span>
          <span>Capability system</span>
        </div>
        <div className="rounded-[12px] border border-[var(--soft-line)] bg-white p-4">
          <p className="text-sm font-medium">{steps.join(" → ")}</p>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-3">
          {["Signal", "System", "Outcome"].map((item) => (
            <div key={item} className="min-h-28 rounded-[12px] border border-[var(--soft-line)] bg-[#f4f1ea] p-3 text-xs text-[var(--muted)]">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <SiteShell>
      <main>
        <section className="mx-auto flex min-h-[40rem] max-w-7xl flex-col items-center justify-center px-5 py-24 text-center md:px-8">
          <p className="text-lg text-[var(--muted)]">The next era of capability is systems-led</p>
          <h1 className="mt-10 max-w-6xl text-6xl font-medium leading-[0.95] tracking-[-0.03em] md:text-[6.8rem]">
            Build, operate and scale with Mustard Seed Group products.
          </h1>
          <p className="mt-10 max-w-3xl text-2xl leading-snug text-[var(--muted)]">
            Products across business execution, research, human performance, consumer software and commercial delivery.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="#solutions" className="rounded-full bg-[var(--foreground)] px-7 py-4 text-base font-medium transition hover:opacity-85" style={{ color: "#fbfaf7" }}>
              Explore products
            </Link>
            <Link href="/contact" className="rounded-full bg-[#d9d2c7] px-7 py-4 text-base text-[var(--foreground)] transition hover:bg-[#cfc7ba]">
              Contact
            </Link>
          </div>
        </section>

        <section id="solutions" className="mx-auto max-w-7xl px-5 pb-24 md:px-8">
          <div className="mb-10 flex items-end justify-between gap-8">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--accent)]">Product systems</p>
              <h2 className="mt-4 text-4xl font-medium tracking-[-0.03em] md:text-6xl">Systems for real execution.</h2>
            </div>
            <Link href="/contact" className="hidden text-sm underline underline-offset-4 md:inline-flex">Contact</Link>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {solutionCards.map((card) => (
              <article key={card.title} className="flex min-h-[52rem] flex-col rounded-[12px] border border-[var(--line)] bg-[#fbfaf7] p-8">
                <div className="flex items-start justify-between gap-6">
                  <div className="flex min-h-14 items-center">
                    <BrandLogo brand={card.brand} />
                  </div>
                  <span className="text-sm text-[var(--muted)]">{card.eyebrow}</span>
                </div>
                <h3 className="mt-16 text-4xl font-medium tracking-[-0.02em] md:text-5xl">{card.title}</h3>
                <p className="mt-8 text-2xl leading-snug text-[var(--muted)]">{card.copy}</p>
                <ul className="mt-10 grid gap-5 text-xl leading-8">
                  {card.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-4">
                      <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--foreground)]" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-12 flex flex-wrap items-center gap-5">
                  <Link href={card.href} className="rounded-full bg-[var(--foreground)] px-6 py-3 text-base transition hover:opacity-85" style={{ color: "#fbfaf7" }}>
                    {card.cta}
                  </Link>
                  <Link href="/contact" className="text-base transition hover:text-[var(--muted)]">
                    Contact →
                  </Link>
                </div>
                <ProductMockup steps={card.visual} />
              </article>
            ))}
          </div>
        </section>

        <section className="content-band">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-24 md:grid-cols-[0.55fr_1.45fr] md:px-8">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--accent)]">Product ecosystem</p>
              <h2 className="mt-4 text-5xl font-medium leading-none tracking-[-0.03em] md:text-7xl">Research and consumer products support the operating system.</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              {enablement.map((item) => (
                <article key={item.title} className="rounded-[12px] border border-[var(--line)] bg-[#fbfaf7] p-8">
                  <div className="flex min-h-14 items-center">
                    <BrandLogo brand={item.brand} />
                  </div>
                  <h3 className="mt-16 text-4xl">{item.title}</h3>
                  <p className="mt-6 text-xl leading-8 text-[var(--muted)]">{item.copy}</p>
                  <div className="mt-10 grid gap-3">
                    {item.bullets.map((bullet) => (
                      <div key={bullet} className="flex items-center justify-between border-t border-[var(--soft-line)] pt-3 text-sm">
                        <span>{bullet}</span>
                        <span className="h-1.5 w-1.5 bg-[var(--clay)]" />
                      </div>
                    ))}
                  </div>
                  <Link href={item.href} className="mt-8 inline-flex text-sm underline underline-offset-4">Explore</Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {products.map((product) => (
              <Link key={product.title} href={product.href} className="rounded-[12px] border border-[var(--line)] bg-[#fbfaf7] p-6 transition hover:bg-[#f1eee6]">
                <div className="flex min-h-14 items-center">
                  <BrandLogo brand={product.brand} />
                </div>
                <p className="mt-16 text-sm text-[var(--muted)]">{product.group}</p>
                <h3 className="mt-3 text-3xl">{product.title}</h3>
                <p className="mt-5 leading-7 text-[var(--muted)]">{product.summary}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="border-y border-[var(--line)] bg-[#fbfaf7]">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 py-20 md:grid-cols-[0.6fr_1.4fr] md:px-8">
            <div>
              <p className="text-sm uppercase tracking-[0.16em] text-[var(--accent)]">How it fits together</p>
              <h2 className="mt-5 text-5xl leading-none tracking-[-0.03em]">One ecosystem, different surfaces.</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                "Benediction Lab explores the research questions.",
                "Orbit turns execution into a product surface.",
                "TUXX proves systems in commercial environments.",
                "All Purpose brings capability into consumer life.",
              ].map((item) => (
                <div key={item} className="rounded-[12px] border border-[var(--soft-line)] bg-white p-6 text-xl">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}

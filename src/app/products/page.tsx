import type { Metadata } from "next";
import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { SiteShell } from "@/components/site-shell";
import { products } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Products",
  description: "Products and systems across Orbit, Orion, All Purpose, CheekyGains, Naira and TUXX.",
};

const productCards = [
  {
    title: "Orbit",
    eyebrow: "Business operating system",
    brand: "orbit" as const,
    copy: "AI operating system for moving from prospect to launched product through agents, workflows and execution systems.",
    bullets: [
      "Organises commercial execution from lead to launch.",
      "Turns repeatable work into visible workflows and operating surfaces.",
      "Uses Orion as the intelligence layer for agents, runbooks and execution support.",
      "Public docs and examples can be shared without exposing private orchestration.",
    ],
    primary: "Explore Orbit",
    href: "/companies/orbit",
    visual: "orbit",
  },
  {
    title: "TUXX Systems",
    eyebrow: "Commercial delivery",
    brand: "tuxx" as const,
    copy: "Custom AI systems and internal software for ambitious organisations that need practical execution, not theatre.",
    bullets: [
      "Builds internal tools, automations and client delivery systems.",
      "Uses Orbit and Orion internally where useful.",
      "Turns commercial lessons into repeatable delivery patterns.",
      "Pattern Up sits here as a TUXX sub-product, not as a separate group pillar.",
    ],
    primary: "Explore TUXX",
    href: "/companies/tuxx",
    visual: "systems",
  },
  {
    title: "All Purpose",
    eyebrow: "Consumer ecosystem",
    brand: "all-purpose" as const,
    copy: "Consumer products focused on performance, creativity, culture and personal development.",
    bullets: [
      "Home for CheekyGains, Naira, Relay, Horizon, Made It Out and All Purpose Music.",
      "Turns research and systems thinking into products people can use in daily life.",
      "Connects performance, communication, planning, media and creative culture.",
    ],
    primary: "Explore All Purpose",
    href: "/companies/all-purpose",
    visual: "consumer",
  },
  {
    title: "Benediction Lab",
    eyebrow: "Research engine",
    brand: "benediction" as const,
    copy: "Research lab exploring Orion, agent systems, memory, behaviour and future products.",
    bullets: [
      "Origin point for public research notes and selected experiments.",
      "Orion lives here publicly as a research project.",
      "Powers Orbit commercially without exposing private agent logic or memory systems.",
    ],
    primary: "Explore Benediction Lab",
    href: "/companies/benediction-lab",
    visual: "research",
  },
];

type ProductBrand =
  | "benediction"
  | "orbit"
  | "orion"
  | "all-purpose"
  | "tuxx"
  | "cheekygains"
  | "naira"
  | "horizon"
  | "pattern-up";

function DarkProductMark({ brand, title }: { brand: ProductBrand; title: string }) {
  if (brand === "benediction") {
    return <span className="font-serif text-2xl text-white">benediction</span>;
  }

  if (brand === "all-purpose") {
    return <span className="font-serif text-2xl text-white">All Purpose</span>;
  }

  if (brand === "tuxx") {
    return <span className="text-3xl font-semibold tracking-[0.42em] text-[#a8a8a8]">TUXX</span>;
  }

  if (brand === "pattern-up") {
    return <span className="font-serif text-2xl text-white">Pattern Up</span>;
  }

  if (brand === "orbit") {
    return <span className="text-2xl font-semibold text-white">Orbit</span>;
  }

  if (brand === "horizon") {
    return <span className="text-2xl font-semibold text-white">Horizon</span>;
  }

  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-[12px] bg-white">
      <BrandLogo brand={brand} />
      <span className="sr-only">{title}</span>
    </div>
  );
}

function ProductVisual({ tone }: { tone: string }) {
  return (
    <div className="mt-10 overflow-hidden rounded-[18px] border border-[#2f2f2f] bg-[#111] p-4">
      <div className="rounded-[14px] border border-[#2a2a2a] bg-gradient-to-br from-[#eff7f5] via-[#d8e7ff] to-[#f2efe8] p-4 text-black">
        <div className="mb-4 flex items-center justify-between text-xs text-[#5f5f5f]">
          <span>{tone === "orbit" ? "Execution view" : tone === "systems" ? "Systems view" : tone === "consumer" ? "Consumer view" : "Research view"}</span>
          <span>Public preview</span>
        </div>
        <div className="grid gap-3">
          <div className="rounded-[12px] bg-white/85 p-4 shadow-sm">
            <p className="text-sm font-medium">
              {tone === "orbit"
                ? "Prospect → Plan → Build → Launch"
                : tone === "systems"
                  ? "Intake → Workflow → Delivery → Review"
                  : tone === "consumer"
                    ? "Goal → Standard → Action → Accountability"
                    : "Question → Experiment → Note → Product"}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {["Signal", "System", "Outcome"].map((item) => (
              <div key={item} className="min-h-24 rounded-[12px] bg-white/70 p-3 text-xs">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <SiteShell tone="dark">
      <main className="bg-black text-white">
        <section className="mx-auto flex min-h-[42rem] max-w-7xl flex-col items-center justify-center px-5 py-24 text-center md:px-8">
          <p className="text-lg text-[#d8d8d8]">The next era of capability is systems-led</p>
          <h1 className="mt-10 max-w-6xl text-6xl font-medium leading-[0.95] tracking-[-0.03em] md:text-[6.8rem]">
            Build, operate and scale with Mustard Seed Group products.
          </h1>
          <p className="mt-10 max-w-3xl text-2xl leading-snug text-[#d0d0d0]">
            Products across business execution, research, human performance, consumer software and commercial delivery.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="#products" className="rounded-full bg-white px-7 py-4 text-base font-medium transition hover:opacity-85" style={{ color: "#000" }}>
              Explore products
            </Link>
            <Link href="/contact" className="rounded-full bg-[#1f1f1f] px-7 py-4 text-base text-white transition hover:bg-[#2a2a2a]">
              Contact
            </Link>
          </div>
        </section>

        <section id="products" className="mx-auto max-w-7xl px-5 pb-24 md:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {productCards.map((card) => (
              <article key={card.title} className="flex min-h-[52rem] flex-col rounded-[12px] border border-[#2a2a2a] bg-black p-8">
                <div className="flex items-start justify-between gap-6">
                  <div className="flex min-h-14 items-center text-white">
                    <DarkProductMark brand={card.brand} title={card.title} />
                  </div>
                  <span className="text-sm text-[#a8a8a8]">{card.eyebrow}</span>
                </div>
                <h2 className="mt-16 text-4xl font-medium tracking-[-0.02em] md:text-5xl">{card.title}</h2>
                <p className="mt-8 text-2xl leading-snug text-[#e7e7e7]">{card.copy}</p>
                <ul className="mt-10 grid gap-5 text-xl leading-8 text-[#d0d0d0]">
                  {card.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-4">
                      <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-white" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-12 flex flex-wrap items-center gap-5">
                  <Link href={card.href} className="rounded-full bg-[#1f1f1f] px-6 py-3 text-base text-white transition hover:bg-[#2a2a2a]">
                    {card.primary}
                  </Link>
                  <Link href="/contact" className="text-base text-white/90 transition hover:text-white">
                    Contact →
                  </Link>
                </div>
                <ProductVisual tone={card.visual} />
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-[#222]">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 py-20 md:grid-cols-[0.6fr_1.4fr] md:px-8">
            <div>
              <p className="text-sm uppercase tracking-[0.16em] text-[#8d8d8d]">Product boundary</p>
              <h2 className="mt-5 text-5xl leading-none tracking-[-0.03em]">Public surfaces only.</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                "No private source code.",
                "No prompts, runbooks or agent orchestration.",
                "No lead scoring or memory schemas.",
                "No client data or private workflows.",
              ].map((item) => (
                <div key={item} className="rounded-[12px] border border-[#2a2a2a] p-6 text-xl text-[#e0e0e0]">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {products.map((product) => (
              <Link key={product.title} href={product.href} className="rounded-[12px] border border-[#2a2a2a] p-6 transition hover:bg-[#111]">
                <div className="flex min-h-14 items-center">
                  <DarkProductMark brand={product.brand} title={product.title} />
                </div>
                <p className="mt-16 text-sm text-[#8d8d8d]">{product.group}</p>
                <h3 className="mt-3 text-3xl">{product.title}</h3>
                <p className="mt-5 leading-7 text-[#bdbdbd]">{product.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </SiteShell>
  );
}

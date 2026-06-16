"use client";

import { useState } from "react";
import { BrandLogo } from "@/components/brand-logo";

const domains = [
  {
    key: "research",
    label: "Research",
    brand: "benediction" as const,
    title: "Benediction Lab",
    summary: "Research notes, experiments and public thinking around agents, memory and behaviour.",
    items: ["Orion research", "Agent systems", "Behaviour design"],
  },
  {
    key: "execution",
    label: "Execution",
    brand: "orbit" as const,
    title: "Orbit",
    summary: "A business operating system for turning prospects into launched products.",
    items: ["Commercial workflows", "Runbooks", "Product launch"],
  },
  {
    key: "performance",
    label: "Performance",
    brand: "cheekygains" as const,
    title: "CheekyGains",
    summary: "Human performance tools for training, coaching, nutrition and accountability.",
    items: ["Naira", "Standards", "Accountability"],
  },
  {
    key: "culture",
    label: "Culture",
    brand: "all-purpose" as const,
    title: "All Purpose",
    summary: "Consumer products, media and creative culture built around personal growth.",
    items: ["Relay", "Horizon", "Made It Out"],
  },
];

export function CapabilityConsole() {
  const [activeKey, setActiveKey] = useState(domains[0].key);
  const active = domains.find((domain) => domain.key === activeKey) ?? domains[0];

  return (
    <div className="relative min-h-[520px] overflow-hidden border border-[var(--line)] bg-[#f4f1ea] p-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.45)]">
      <div className="flex items-center justify-between border-b border-[var(--soft-line)] pb-4">
        <BrandLogo brand="msg" className="text-xl" />
        <div className="flex gap-1">
          <span className="h-2 w-2 rounded-full bg-[#c69386]" />
          <span className="h-2 w-2 rounded-full bg-[#d8d1c4]" />
          <span className="h-2 w-2 rounded-full bg-[#0b0b09]" />
        </div>
      </div>

      <div className="grid gap-4 py-5 md:grid-cols-4">
        {domains.map((domain) => (
          <button
            key={domain.key}
            type="button"
            onClick={() => setActiveKey(domain.key)}
            className={`border px-3 py-3 text-left text-sm transition ${
              active.key === domain.key
                ? "border-[var(--foreground)] bg-[#0b0b09] text-[#fbfaf7]"
                : "border-[var(--soft-line)] bg-[#fbfaf7] text-[var(--foreground)] hover:border-[var(--foreground)]"
            }`}
          >
            {domain.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
        <div className="min-h-72 border border-[var(--line)] bg-[#fbfaf7] p-6">
          <div className="flex items-start justify-between gap-6">
            <div className="flex min-h-14 items-center">
              <BrandLogo brand={active.brand} />
            </div>
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--accent)]">Active layer</p>
          </div>
          <h2 className="mt-16 font-serif text-5xl leading-none">{active.title}</h2>
          <p className="mt-6 max-w-lg text-lg leading-8 text-[var(--muted)]">{active.summary}</p>
        </div>

        <div className="grid gap-4">
          <div className="border border-[var(--line)] bg-[#fbfaf7] p-5">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--accent)]">Public surface</p>
            <div className="mt-6 grid gap-3">
              {active.items.map((item) => (
                <div key={item} className="flex items-center justify-between border-t border-[var(--soft-line)] pt-3 text-sm">
                  <span>{item}</span>
                  <span className="h-2 w-2 bg-[var(--clay)]" />
                </div>
              ))}
            </div>
          </div>
          <div className="border border-[var(--line)] bg-[#0b0b09] p-5 text-[#fbfaf7]">
            <p className="text-xs uppercase tracking-[0.16em] text-[#c8c0b2]">Boundary</p>
            <p className="mt-8 text-xl leading-snug">
              Public story outside. Proprietary systems inside.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-px bg-[var(--line)] text-sm md:grid-cols-3">
        {["Research becomes insight", "Products become systems", "Services prove value"].map((item) => (
          <div key={item} className="bg-[#fbfaf7] p-4">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

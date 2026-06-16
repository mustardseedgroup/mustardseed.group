export const ecosystemPillars = [
  {
    brand: "benediction" as const,
    title: "Benediction Lab",
    label: "Research",
    href: "/companies/benediction-lab",
    thesis: "Research before product.",
    summary:
      "A research lab exploring agents, memory, behaviour, GUI control, autonomous product development and future systems.",
    proof: ["Orion research", "Agent systems", "Memory and behaviour", "Selected experiments"],
  },
  {
    brand: "orbit" as const,
    title: "Orbit",
    label: "Product",
    href: "/companies/orbit",
    thesis: "Execution as a business operating system.",
    summary:
      "An AI operating system for moving from prospect to launched product through agents, workflows and commercial execution systems.",
    proof: ["Lead to launch", "Execution workflows", "Runbook surfaces", "Public examples"],
  },
  {
    brand: "all-purpose" as const,
    title: "All Purpose",
    label: "Consumer",
    href: "/companies/all-purpose",
    thesis: "Capability in everyday life.",
    summary:
      "A consumer ecosystem for performance, creativity, culture and personal development.",
    proof: ["CheekyGains", "Naira", "Relay", "Horizon", "Made It Out", "All Purpose Music"],
  },
  {
    brand: "tuxx" as const,
    title: "TUXX",
    label: "Services",
    href: "/companies/tuxx",
    thesis: "Commercial systems in the field.",
    summary:
      "Custom AI systems, internal software and repeatable delivery patterns for ambitious organisations.",
    proof: ["Client systems", "Internal tools", "Pattern Up", "Commercial delivery"],
  },
];

export const products = [
  {
    brand: "orbit" as const,
    title: "Orbit",
    group: "Business operating system",
    href: "/companies/orbit",
    summary: "AI operating system for business execution, from prospect to launched product.",
  },
  {
    brand: "orion" as const,
    title: "Orion",
    group: "Intelligence layer",
    href: "/companies/benediction-lab",
    summary: "Research project powering Orbit commercially through agents, memory and execution workflows.",
  },
  {
    brand: "cheekygains" as const,
    title: "CheekyGains",
    group: "Human performance",
    href: "/companies/all-purpose",
    summary: "Performance platform for training, nutrition, accountability and standards.",
  },
  {
    brand: "naira" as const,
    title: "Naira",
    group: "AI performance coach",
    href: "/companies/all-purpose",
    summary: "AI coach inside CheekyGains for performance, accountability and behaviour support.",
  },
  {
    brand: "horizon" as const,
    title: "Horizon",
    group: "Planning",
    href: "/companies/all-purpose",
    summary: "Tools and systems for planning, goals and executing a better future.",
  },
  {
    brand: "pattern-up" as const,
    title: "Pattern Up",
    group: "TUXX sub-product",
    href: "/companies/tuxx",
    summary: "Repeatable client delivery patterns for follow-up, pipelines and scheduling.",
  },
];

export const domains = [
  ["Intelligence", "Agents, memory, research systems and the intelligence layer behind execution."],
  ["Execution", "Business operating systems, commercial workflows and client delivery systems."],
  ["Performance", "Human performance, coaching, standards, motivation and behaviour design."],
  ["Creativity", "Consumer products, music, media, storytelling and creative culture."],
] as const;

export const principles = [
  ["Build systems, not features.", "Features solve moments. Systems compound across teams, products and time."],
  ["Research before product.", "Useful products should be informed by careful observation, testing and thought."],
  ["Technology should increase human capability.", "The point is not replacement. The point is amplification."],
  ["Own the control plane.", "Important work needs clear interfaces, durable infrastructure and accountable operators."],
  ["Long-term thinking compounds.", "Small ideas, maintained with discipline, can become institutions."],
] as const;

export const timeline = [
  ["Origin", "Creative, technical, commercial and performance experiments begin to converge.", "2016-2022"],
  ["Formation", "The group structure clarifies around research, operating systems, services and consumer products.", "2023-2025"],
  ["Now", "Orbit, Orion, CheekyGains, Naira, TUXX and Benediction Lab become the active build surface.", "2026"],
  ["Next", "Public research, stronger products, sharper commercial systems and disciplined ecosystem updates.", "Long term"],
] as const;

export const researchTracks = [
  ["Agentic operating systems", "Agents that remember, coordinate work, operate interfaces and support real commercial execution."],
  ["Memory and context", "How systems preserve useful history without exposing private schemas or internal implementation."],
  ["Human behaviour", "Motivation, accountability, standards, environment design and performance systems."],
  ["Research-led products", "How ideas move from lab exploration to product surfaces without leaking proprietary advantage."],
] as const;

export const publicBoundaries = [
  "No private source code.",
  "No prompts, runbooks or agent orchestration.",
  "No lead scoring, lead intelligence or pricing logic.",
  "No memory schemas or internal workflows.",
  "No client data or private delivery systems.",
] as const;

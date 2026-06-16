import fs from "node:fs";
import path from "node:path";

type PlanItem = {
  month: number;
  title: string;
  category: "Founder letter" | "Research" | "Product" | "Culture" | "Performance";
  focus: string;
  sources: string[];
};

const outDir = path.join(process.cwd(), "content", "drafts");

const sources = {
  msg: "https://github.com/mustardseedgroup/mustardseed.group",
  chiko: "https://github.com/chikoshire/chikoshire",
  tuxx: "https://tuxxagency.com",
  benediction: "https://benedictionlab.com",
  orbitDocs: "https://github.com/mustardseedgroup/orbit-docs",
  orbitCommunity: "https://github.com/mustardseedgroup/orbit-community",
  alphago: "https://www.deepmind.com/research/highlighted-research/alphago",
  alphagoNature: "https://www.nature.com/articles/nature16961",
  transformer: "https://arxiv.org/abs/1706.03762",
  gpt2: "https://openai.com/index/better-language-models/",
  gpt3: "https://arxiv.org/abs/2005.14165",
  chatgpt: "https://openai.com/index/chatgpt/",
  gpt4: "https://openai.com/index/gpt-4-research/",
  aiIndex: "https://hai.stanford.edu/ai-index",
  aiIndex2025: "https://hai.stanford.edu/ai-index/2025-ai-index-report",
};

const monthlyPlans: Record<number, PlanItem[]> = {
  2015: [
    item(1, "The seed idea", "Founder letter", "small systems and long-term capability", [sources.msg, sources.chiko]),
    item(2, "Creativity as an operating discipline", "Culture", "creative work treated as a repeatable practice", [sources.msg]),
    item(3, "Tools for people who want to execute", "Founder letter", "the early need for tools that help people move", [sources.msg]),
    item(4, "Behaviour, standards and momentum", "Performance", "behaviour as the hidden layer of capability", [sources.msg]),
    item(5, "Culture as a capability system", "Culture", "music, media and creative output as systems", [sources.msg]),
    item(6, "Why small experiments matter", "Research", "learning through small experiments", [sources.benediction, sources.msg]),
    item(7, "The portfolio instinct", "Founder letter", "the beginning of a multi-domain portfolio mindset", [sources.msg]),
    item(8, "Performance before product language", "Performance", "human performance before it becomes software", [sources.msg]),
    item(9, "Learning loops across disciplines", "Research", "creative, technical and commercial learning loops", [sources.msg]),
    item(10, "Systems for consistency", "Performance", "consistency as a designed environment", [sources.msg]),
    item(11, "Building with limited resources", "Founder letter", "constraint as a useful forcing function", [sources.msg]),
    item(12, "What the first small bets taught", "Founder letter", "the end-of-year lesson from early experiments", [sources.msg]),
  ],
  2016: [
    item(1, "Capability as the shared thesis", "Founder letter", "capability as the common thread", [sources.msg]),
    item(2, "Machine learning becomes visible", "Research", "AI moving from research circles into public conversation", [sources.aiIndex]),
    item(3, "AlphaGo and public imagination", "Research", "AlphaGo as a signal that AI systems can master complex domains", [sources.alphago, sources.alphagoNature]),
    item(4, "Research milestones and product ambition", "Research", "how breakthroughs reshape what builders think is possible", [sources.alphago, sources.msg]),
    item(5, "Habits as infrastructure", "Performance", "habit systems as infrastructure for personal capability", [sources.msg]),
    item(6, "Repeatable creative output", "Culture", "creative output as a system, not a mood", [sources.msg]),
    item(7, "Personal operating systems", "Performance", "personal systems before software systems", [sources.msg]),
    item(8, "From projects to methods", "Founder letter", "turning one-off work into repeatable practice", [sources.msg]),
    item(9, "Culture, media and product thinking", "Culture", "culture as a serious product surface", [sources.msg]),
    item(10, "The value of constraints", "Founder letter", "constraint as a design tool", [sources.msg]),
    item(11, "Execution as a learned skill", "Performance", "execution as trained behaviour", [sources.msg]),
    item(12, "Technology, performance and creativity converge", "Founder letter", "the year-end convergence of the thesis", [sources.msg, sources.aiIndex]),
  ],
  2017: [
    item(1, "Systems over motivation", "Performance", "systems as a stronger force than motivation", [sources.msg]),
    item(2, "The rise of practical automation", "Research", "automation becoming a practical operating question", [sources.aiIndex]),
    item(3, "Workflows for creative work", "Culture", "creative work needing operational support", [sources.msg]),
    item(4, "Thinking in interfaces", "Product", "interfaces as the place where systems become usable", [sources.msg]),
    item(5, "Building taste through experiments", "Founder letter", "taste as a result of repeated decisions", [sources.msg]),
    item(6, "Transformers and language systems", "Research", "the Transformer paper and the future of language systems", [sources.transformer]),
    item(7, "Better models for operators", "Research", "what language systems could eventually mean for practical work", [sources.transformer, sources.aiIndex]),
    item(8, "Product ideas as research outputs", "Research", "research becoming a path towards product", [sources.benediction, sources.msg]),
    item(9, "The role of memory", "Research", "why useful systems need continuity", [sources.msg]),
    item(10, "Human-centred tools over novelty", "Founder letter", "usefulness over novelty", [sources.msg]),
    item(11, "Execution workflows as a category", "Product", "execution workflows as a product category", [sources.msg]),
    item(12, "AI starts to feel operational", "Research", "AI research becoming relevant to operators", [sources.transformer, sources.aiIndex]),
  ],
  2018: [
    item(1, "Building personal leverage", "Founder letter", "small systems that create leverage", [sources.msg]),
    item(2, "Language model momentum", "Research", "early momentum around language models", [sources.aiIndex]),
    item(3, "Organising ideas into systems", "Founder letter", "turning ideas into durable structures", [sources.msg]),
    item(4, "Creative culture as product surface", "Culture", "creative culture as a place for product thinking", [sources.msg]),
    item(5, "Performance standards and accountability", "Performance", "standards as a performance interface", [sources.msg]),
    item(6, "Software as infrastructure", "Product", "software as operational infrastructure", [sources.msg]),
    item(7, "What should remain human", "Research", "the human role inside automated systems", [sources.aiIndex, sources.msg]),
    item(8, "Research before product", "Research", "research as the first layer of product development", [sources.benediction, sources.msg]),
    item(9, "Small products, compounding learning", "Product", "small products as learning machines", [sources.msg]),
    item(10, "The first group thesis", "Founder letter", "the earliest shape of a wider group thesis", [sources.msg]),
    item(11, "Building public surfaces carefully", "Founder letter", "what to share and what to protect", [sources.msg]),
    item(12, "Tools, research and taste", "Founder letter", "year-end notes on tools and taste", [sources.msg]),
  ],
  2019: [
    item(1, "From services to systems", "Product", "service work becoming system design", [sources.tuxx, sources.msg]),
    item(2, "GPT-2 and the public AI conversation", "Research", "GPT-2 changing expectations around generated language", [sources.gpt2]),
    item(3, "Writing, automation and creative leverage", "Research", "language systems as leverage for writing and operations", [sources.gpt2, sources.msg]),
    item(4, "Business workflows as design problems", "Product", "workflow design as product design", [sources.tuxx, sources.msg]),
    item(5, "Human performance as a technology problem", "Performance", "performance as a system to design", [sources.msg]),
    item(6, "Accountability as product thinking", "Performance", "accountability as a product surface", [sources.msg]),
    item(7, "Client delivery and repeatability", "Product", "delivery becoming repeatable through systems", [sources.tuxx]),
    item(8, "The need for a research arm", "Research", "why product work needs research space", [sources.benediction, sources.msg]),
    item(9, "Creative culture and identity", "Culture", "identity as part of product work", [sources.msg]),
    item(10, "Operating systems for small teams", "Product", "small teams needing operating systems", [sources.msg]),
    item(11, "Owning the control plane", "Founder letter", "owning the interface where work is directed", [sources.msg]),
    item(12, "The portfolio logic becomes clearer", "Founder letter", "year-end note on portfolio logic", [sources.msg]),
  ],
  2020: [
    item(1, "Operating through uncertainty", "Founder letter", "systems that hold up under uncertainty", [sources.msg]),
    item(2, "Remote work needs better systems", "Product", "remote work and the need for clearer operating surfaces", [sources.aiIndex, sources.msg]),
    item(3, "Tools when conditions change", "Product", "tools as resilience during change", [sources.msg]),
    item(4, "Digital products as resilience infrastructure", "Product", "software as operational resilience", [sources.msg]),
    item(5, "GPT-3 and product imagination", "Research", "GPT-3 and the imagination of general language interfaces", [sources.gpt3]),
    item(6, "Commercial workflows move online", "Product", "commercial work shifting towards software-led systems", [sources.tuxx, sources.gpt3]),
    item(7, "Reducing fragility through systems", "Founder letter", "systems that make work less fragile", [sources.msg]),
    item(8, "Human performance at home", "Performance", "performance systems outside formal environments", [sources.msg]),
    item(9, "Content, media and distribution", "Culture", "distribution as part of creative systems", [sources.msg]),
    item(10, "Repeatable delivery under pressure", "Product", "repeatable delivery when conditions are unstable", [sources.tuxx]),
    item(11, "The early case for business operating systems", "Product", "business operating systems as a category", [sources.msg]),
    item(12, "Resilience, tools and execution", "Founder letter", "year-end note on resilience and execution", [sources.msg, sources.gpt3]),
  ],
  2021: [
    item(1, "Better operating systems, better external work", "Product", "operating systems improving external output", [sources.tuxx, sources.msg]),
    item(2, "Automation as a studio capability", "Product", "automation as a practical studio advantage", [sources.tuxx]),
    item(3, "Product surfaces for repeatable delivery", "Product", "turning delivery patterns into product surfaces", [sources.tuxx, sources.msg]),
    item(4, "Memory and context", "Research", "memory and context as product problems", [sources.benediction, sources.msg]),
    item(5, "Performance tooling and standards", "Performance", "standards as a tool for personal performance", [sources.msg]),
    item(6, "From agency execution to product thinking", "Product", "service work feeding product insight", [sources.tuxx, sources.msg]),
    item(7, "Consumer products as behaviour systems", "Performance", "consumer products shaping behaviour", [sources.msg]),
    item(8, "Creative tooling and distribution", "Culture", "tools for creative output and distribution", [sources.msg]),
    item(9, "A foundation for future products", "Product", "laying technical foundations for future products", [sources.msg]),
    item(10, "Operating systems inside small teams", "Product", "small teams needing shared control surfaces", [sources.msg]),
    item(11, "The early logic of Orbit", "Product", "the early logic of a business operating system", [sources.orbitDocs, sources.msg]),
    item(12, "Services, products and research separate", "Founder letter", "year-end separation of services, products and research", [sources.msg]),
  ],
  2022: [
    item(1, "From workflows to operating systems", "Product", "workflows evolving into operating systems", [sources.orbitDocs, sources.msg]),
    item(2, "Human performance as software category", "Performance", "performance becoming a software category", [sources.msg]),
    item(3, "Creative culture and All Purpose thinking", "Culture", "consumer culture as a portfolio surface", [sources.msg]),
    item(4, "Clearer divisions across the portfolio", "Founder letter", "separating research, products, services and consumer work", [sources.msg]),
    item(5, "Research-led product development", "Research", "research guiding product direction", [sources.benediction, sources.msg]),
    item(6, "Interface control and agent ideas", "Research", "interfaces as the operating surface for agentic systems", [sources.benediction, sources.msg]),
    item(7, "Public AI tools become accessible", "Research", "AI becoming more available to everyday builders", [sources.aiIndex]),
    item(8, "Commercial execution as software problem", "Product", "commercial execution needing software support", [sources.tuxx, sources.orbitDocs]),
    item(9, "Coaching, accountability and Naira-shaped ideas", "Performance", "AI coaching as a performance interface", [sources.msg]),
    item(10, "System design for client delivery", "Product", "client delivery as a system design problem", [sources.tuxx]),
    item(11, "ChatGPT resets expectations", "Research", "ChatGPT changing public expectations around AI interfaces", [sources.chatgpt]),
    item(12, "The AI product era becomes unavoidable", "Founder letter", "year-end note on AI moving into products", [sources.chatgpt, sources.aiIndex]),
  ],
  2023: [
    item(1, "AI as operational infrastructure", "Research", "AI moving from novelty to infrastructure", [sources.aiIndex, sources.chatgpt]),
    item(2, "The early Orbit thesis", "Product", "from prospect to product as a business operating loop", [sources.orbitDocs, sources.orbitCommunity]),
    item(3, "GPT-4 and complex work", "Research", "GPT-4 expanding the expectation of complex AI assistance", [sources.gpt4]),
    item(4, "Beyond dashboards", "Product", "businesses needing execution systems, not only dashboards", [sources.orbitDocs, sources.tuxx]),
    item(5, "Agent workflows and commercial delivery", "Research", "agents as a way to support commercial execution", [sources.benediction, sources.orbitDocs]),
    item(6, "CheekyGains as standards and accountability", "Performance", "fitness and coaching as standards-led performance", [sources.msg]),
    item(7, "All Purpose as consumer ecosystem", "Culture", "consumer products connected by performance and culture", [sources.msg]),
    item(8, "Benediction Lab as research surface", "Research", "Benediction Lab as the public research home", [sources.benediction]),
    item(9, "Orion as research powering product", "Research", "Orion as research that can power product surfaces", [sources.benediction, sources.orbitDocs]),
    item(10, "TUXX as field proof", "Product", "services as proof for product ideas", [sources.tuxx]),
    item(11, "Public documentation, protected moat", "Founder letter", "sharing safely without weakening the product moat", [sources.orbitCommunity, sources.msg]),
    item(12, "The portfolio becomes coherent", "Founder letter", "year-end note on research, products, services and culture", [sources.msg]),
  ],
  2024: [
    item(1, "Agents and the control plane", "Research", "agents needing clear control planes", [sources.benediction, sources.aiIndex]),
    item(2, "Memory as a product frontier", "Research", "memory as one of the hard problems in useful agents", [sources.benediction, sources.msg]),
    item(3, "Orbit as a business operating system", "Product", "Orbit as the business execution surface", [sources.orbitDocs]),
    item(4, "Human capability as the thesis", "Founder letter", "human capability as the group-level thesis", [sources.msg]),
    item(5, "CheekyGains and Naira", "Performance", "performance tooling and AI coaching", [sources.msg]),
    item(6, "Productising research safely", "Research", "turning research into product without exposing the moat", [sources.benediction, sources.orbitCommunity]),
    item(7, "TUXX delivery patterns and Pattern Up", "Product", "Pattern Up as a TUXX sub-product and repeatable delivery surface", [sources.tuxx, sources.msg]),
    item(8, "GUI control and workflows", "Research", "GUI control as a path towards practical agents", [sources.benediction]),
    item(9, "Consumer products and creative culture", "Culture", "All Purpose products across performance and culture", [sources.msg]),
    item(10, "Public examples, protected systems", "Founder letter", "safe public examples without exposing protected implementation", [sources.orbitCommunity, sources.orbitDocs]),
    item(11, "A connected ecosystem", "Founder letter", "why the companies belong together", [sources.msg]),
    item(12, "Research, products and services reinforce", "Founder letter", "year-end note on the ecosystem loop", [sources.msg]),
  ],
  2025: [
    item(1, "The institution thesis", "Founder letter", "Mustard Seed Group as an institution thesis", [sources.msg]),
    item(2, "Orbit and Orion", "Product", "product plus intelligence layer", [sources.orbitDocs, sources.benediction]),
    item(3, "Benediction Lab and research credibility", "Research", "research as a credibility layer", [sources.benediction]),
    item(4, "CheekyGains seasons", "Performance", "season-based methodology and human performance", [sources.msg]),
    item(5, "Relay, Horizon and All Purpose directions", "Culture", "consumer product directions inside All Purpose", [sources.msg]),
    item(6, "TUXX as commercial validation", "Product", "services proving product usefulness", [sources.tuxx]),
    item(7, "Better public documentation", "Product", "documentation as public trust surface", [sources.orbitDocs, sources.orbitCommunity]),
    item(8, "AI capability and adoption", "Research", "frontier capability and business adoption", [sources.aiIndex2025]),
    item(9, "Founder identity across the portfolio", "Founder letter", "the founder identity as the bridge across products", [sources.chiko, sources.msg]),
    item(10, "Public surfaces without leakage", "Founder letter", "sharing the institution without exposing protected systems", [sources.orbitCommunity, sources.msg]),
    item(11, "Content as institutional memory", "Founder letter", "updates as institutional memory", [sources.msg]),
    item(12, "From projects to portfolio", "Founder letter", "year-end note on portfolio clarity", [sources.msg]),
  ],
  2026: [
    item(1, "The holding thesis", "Founder letter", "Mustard Seed Group as the holding thesis", [sources.msg]),
    item(2, "Orbit as execution infrastructure", "Product", "Orbit as operating infrastructure for business execution", [sources.orbitDocs]),
    item(3, "Orion and commercial execution agents", "Research", "Orion as the intelligence layer for commercial execution", [sources.benediction, sources.orbitDocs]),
    item(4, "CheekyGains, Naira and performance tooling", "Performance", "performance tooling and AI coaching", [sources.msg]),
    item(5, "GitHub organisation and public boundaries", "Founder letter", "repo hygiene and public boundaries", [sources.msg, sources.orbitCommunity]),
    item(6, "Relaunching the public institutional surface", "Founder letter", "mustardseed.group as the public institutional surface", [sources.msg]),
  ],
};

function item(month: number, title: string, category: PlanItem["category"], focus: string, sources: string[]): PlanItem {
  return { month, title, category, focus, sources };
}

function monthName(month: number) {
  return new Date(Date.UTC(2020, month - 1, 1)).toLocaleString("en-GB", { month: "long" });
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function sourceBlock(sourceList: string[]) {
  return sourceList.map((source) => `  - "${source}"`).join("\n");
}

function displayFocus(focus: string) {
  return focus
    .replace(/\bai\b/gi, "AI")
    .replace(/\balphago\b/gi, "AlphaGo")
    .replace(/\bchatgpt\b/gi, "ChatGPT")
    .replace(/\bgpt-2\b/gi, "GPT-2")
    .replace(/\bgpt-3\b/gi, "GPT-3")
    .replace(/\bgpt-4\b/gi, "GPT-4")
    .replace(/\bmsg\b/gi, "MSG");
}

function contextFor(plan: PlanItem) {
  if (plan.sources.includes(sources.alphago) || plan.sources.includes(sources.alphagoNature)) {
    return "AlphaGo is a useful public signal because it makes machine intelligence feel less abstract. The lesson is not that every problem is a board game. The lesson is that systems can improve through structured feedback, patient training and a clear objective.";
  }

  if (plan.sources.includes(sources.transformer)) {
    return "The Transformer paper matters because it points towards a different kind of language system: one built around attention, context and scale. The public implications are still early, but the direction is important for anyone thinking about software that works with language, memory and decisions.";
  }

  if (plan.sources.includes(sources.gpt2)) {
    return "GPT-2 brings language generation into sharper public view. The important question is not whether a model can produce impressive text, but whether language systems can become useful interfaces for thinking, documentation and execution.";
  }

  if (plan.sources.includes(sources.gpt3)) {
    return "GPT-3 makes the possibility of general language interfaces harder to ignore. It suggests that software may become less about filling in rigid forms and more about describing intent, shaping context and directing work.";
  }

  if (plan.sources.includes(sources.chatgpt)) {
    return "ChatGPT changes the public interface to AI. It makes the technology feel conversational, accessible and immediately useful. That shift matters because people do not adopt capability in the abstract; they adopt surfaces they can understand.";
  }

  if (plan.sources.includes(sources.gpt4)) {
    return "GPT-4 raises the expectation for complex AI assistance. The practical question is no longer only whether a model can respond, but whether a system around it can hold context, make work legible and help people complete meaningful tasks.";
  }

  if (plan.sources.includes(sources.aiIndex2025) || plan.sources.includes(sources.aiIndex)) {
    return "The broader AI landscape is moving from research spectacle into economic, creative and operational consequence. That does not make every claim useful. It makes disciplined product thinking more important.";
  }

  if (plan.sources.includes(sources.tuxx)) {
    return "The services layer is useful because it keeps product thinking close to real constraints. Client work reveals where teams lose momentum, where tools become brittle and where a clearer system would change the outcome.";
  }

  if (plan.sources.includes(sources.benediction)) {
    return "The research layer gives early ideas somewhere to breathe before they become product promises. Benediction Lab exists for that kind of work: observation, experiments, agent systems, memory and future product concepts.";
  }

  if (plan.sources.includes(sources.orbitDocs) || plan.sources.includes(sources.orbitCommunity)) {
    return "Orbit is being shaped around a practical business problem: the distance between interest and shipped work. The useful product is not another dashboard; it is an operating surface that helps execution continue.";
  }

  return "The work is best understood through capability. A product, studio, research note or operating system only matters if it helps a person or organisation become more capable in practice.";
}

function categoryLens(plan: PlanItem) {
  if (plan.category === "Product") {
    return "Product work inside MSG should turn repeated friction into a clearer operating surface. It should reduce drag, make next actions visible and help teams move without needing constant reinvention.";
  }

  if (plan.category === "Research") {
    return "Research is valuable because it protects the work from shallow certainty. It creates room to ask what is actually happening, what is technically possible and what should become a product only after it has earned that shape.";
  }

  if (plan.category === "Performance") {
    return "Performance is not treated as motivation alone. It is standards, feedback, environment and repetition. The useful system is the one that makes the better action easier to repeat.";
  }

  if (plan.category === "Culture") {
    return "Culture is not decoration around the work. Music, media, identity and creative output shape what people pay attention to and what they believe they can build.";
  }

  return "The founder layer gives the work a centre of gravity. It should make the portfolio easier to understand, create a clearer standard and keep the companies connected by a real thesis.";
}

function monthQuestion(year: number, plan: PlanItem) {
  const focus = displayFocus(plan.focus);

  if (year < 2019) {
    return `The question for ${monthName(plan.month)} ${year} is simple: what can be learned from ${focus}, and what should be kept small until the signal is stronger?`;
  }

  if (year < 2023) {
    return `The question for ${monthName(plan.month)} ${year} is whether ${focus} can become more than an observation: a repeatable method, a product surface or a clearer way to operate.`;
  }

  return `The question for ${monthName(plan.month)} ${year} is what ${focus} strengthens in the wider ecosystem, and what should remain protected while the public surface becomes clearer.`;
}

function bodyFor(year: number, plan: PlanItem) {
  const focus = displayFocus(plan.focus);
  const context = contextFor(plan);
  const lens = categoryLens(plan);
  const question = monthQuestion(year, plan);

  return `## What we are noticing

${context}

This month, the focus is ${focus}. The point is not to pretend the answer is finished. It is to record the direction of travel while the work is still forming.

## Why it matters

${lens}

The common thread is simple: people do better work when the system around them is designed with care. Better tools can help, but only when they respect how people actually think, create, train, sell, learn and deliver.

## What this means for the group

Mustard Seed Group is being shaped around four connected domains: intelligence, execution, performance and creativity. Some ideas belong in research first. Some become products. Some become service patterns. Some remain experiments because the learning is more valuable than the launch.

That distinction matters. It keeps the portfolio from becoming a random collection of interests, and it keeps the work honest. A small idea should be allowed to stay small until it proves that it can carry more weight.

## Working note

${question}

If the signal is strong, the next step is to make it clearer, simpler and more repeatable. If it is not strong enough yet, the experiment still has value because it sharpens the thesis and protects the group from building the wrong thing too early.`;
}

function writeDraft(year: number, plan: PlanItem) {
  const month = String(plan.month).padStart(2, "0");
  const date = `${year}-${month}-15`;
  const slug = `${year}-${month}-${slugify(plan.title)}`;
  const title = `${monthName(plan.month)} ${year}: ${plan.title}`;
  const file = path.join(outDir, `${slug}.mdx`);
  const summary = `A historical MSG archive draft on ${plan.focus}.`;
  const tags = Array.from(new Set(["archive", String(year), plan.category.toLowerCase().replaceAll(" ", "-")]));

  const mdx = `---
title: "${title.replaceAll('"', '\\"')}"
slug: "${slug}"
date: "${date}"
status: "draft"
reviewed: false
published: false
summary: "${summary.replaceAll('"', '\\"')}"
category: "${plan.category}"
project: "Mustard Seed Group"
thumbnail: ""
source_links:
${sourceBlock(plan.sources)}
tags: [${tags.map((tag) => `"${tag}"`).join(", ")}]
---

${bodyFor(year, plan)}
`;

  fs.writeFileSync(file, mdx);
}

fs.mkdirSync(outDir, { recursive: true });

let count = 0;
for (const [year, plans] of Object.entries(monthlyPlans)) {
  for (const plan of plans) {
    writeDraft(Number(year), plan);
    count += 1;
  }
}

console.log(`Generated ${count} historical archive drafts in ${outDir}`);

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

type Data = Record<string, unknown>;

type Article = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  year: number;
  month: string;
  sources: string[];
};

type Override = {
  title?: string;
  summary: string;
  category?: string;
  sources: string[];
  body: (article: Article) => string;
};

const blogDir = path.join(process.cwd(), "content", "blog");

const source = {
  msg: "https://github.com/mustardseedgroup/mustardseed.group",
  tuxx: "https://tuxxagency.com",
  benediction: "https://benedictionlab.com",
  orbitDocs: "https://github.com/mustardseedgroup/orbit-docs",
  orbitCommunity: "https://github.com/mustardseedgroup/orbit-community",
  alphago: "https://www.deepmind.com/research/highlighted-research/alphago",
  transformer: "https://arxiv.org/abs/1706.03762",
  gpt2: "https://openai.com/index/better-language-models/",
  gpt3: "https://arxiv.org/abs/2005.14165",
  clip: "https://openai.com/index/clip/",
  dalle: "https://openai.com/index/dall-e/",
  codex: "https://openai.com/index/openai-codex/",
  whisper: "https://openai.com/index/whisper/",
  chatgpt: "https://openai.com/index/chatgpt/",
  gpt4: "https://openai.com/index/gpt-4-research/",
  stableDiffusion: "https://stability.ai/news/stable-diffusion-public-release",
  llama2: "https://ai.meta.com/llama/",
  claude3: "https://www.anthropic.com/news/claude-3-family",
  gemini15: "https://blog.google/technology/ai/google-gemini-next-generation-model-february-2024/",
  sora: "https://openai.com/index/sora/",
  aiIndex2025: "https://hai.stanford.edu/ai-index/2025-ai-index-report",
};

const overrides: Record<string, Override> = {
  "2016-03-alphago-and-public-imagination": {
    title: "March 2016: AlphaGo and the public imagination",
    summary: "AlphaGo made machine intelligence feel strategic, not merely statistical.",
    category: "Research",
    sources: [source.alphago],
    body: () => `## The public moment

AlphaGo matters because it made artificial intelligence visible to people who were not reading research papers. It was not a chatbot, a productivity tool or a business assistant. It was a system learning how to play a game that humans had treated as deeply intuitive.

That distinction matters. The public saw a machine make decisions in a domain associated with judgement, pattern recognition and long-range strategy.

## The lesson for MSG

For Mustard Seed Group, the lesson is not "build a Go engine". It is that capability can be trained when feedback is structured, the objective is clear and the system is allowed to improve through repeated attempts.

That idea eventually touches almost every part of the group: training systems, product workflows, agent execution, coaching and creative iteration.

## What it does not mean

It does not mean every human activity should be reduced to a game. It does not mean software replaces taste. It means some forms of skill can be supported by systems that notice patterns, remember outcomes and improve the next move.

## Working note

The question is how to build tools that increase strategic ability without flattening human judgement. That is a more interesting problem than simply making software appear intelligent.`,
  },
  "2017-06-transformers-and-language-systems": {
    title: "June 2017: Transformers and the shape of language systems",
    summary: "The Transformer points towards attention, context and a new interface for software.",
    category: "Research",
    sources: [source.transformer],
    body: () => `## Why this research matters

The Transformer is not important because it has a neat name. It is important because it changes the way language systems can handle context.

Attention gives the model a way to decide what matters in a sequence. That sounds technical, but the product implication is simple: software that understands language becomes more useful when it can track relationships, not just words.

## From language to operating systems

If software can work with language, it can begin to work with instructions, notes, messages, briefs, plans and feedback. That is the raw material of modern work.

This is one reason Orbit and Orion are not only "AI features". They sit closer to a control surface: a way for teams to turn scattered language into execution.

## The MSG lens

Language is where people already coordinate. A useful system should not force people to translate every thought into a rigid form before it can help.

The long-term opportunity is not autocomplete. It is software that can preserve context, understand intent and help work move forward.

## Working note

The question is how much context a system needs before it becomes genuinely useful. The answer will shape agents, memory and operating systems for years.`,
  },
  "2019-02-gpt-2-and-the-public-ai-conversation": {
    title: "February 2019: GPT-2 and the public AI conversation",
    summary: "GPT-2 made generated language feel less like a demo and more like a coming interface shift.",
    category: "Research",
    sources: [source.gpt2],
    body: () => `## A different kind of interface

GPT-2 is a language model, but the important product question is not only whether it can generate text. The deeper question is what happens when language becomes a working interface.

Writing is how teams brief, sell, support, document, plan and remember. If models can assist with language, they can eventually touch almost every operational surface in a company.

## What this changes

The early risk is to treat generation as content volume. That is the least interesting version of the technology.

The more useful version is judgement support: summarising messy context, drafting clearer options, turning notes into plans and helping operators move faster without losing the thread.

## What MSG takes from it

This points towards Orbit as a product direction and TUXX as a commercial testing ground. Teams do not need more blank pages. They need systems that help turn intent into action.

## Working note

The model is not the product. The product is the operating surface around the model: memory, workflow, review, accountability and taste.`,
  },
  "2020-05-gpt-3-and-product-imagination": {
    title: "May 2020: GPT-3 and product imagination",
    summary: "GPT-3 expands the idea of software that can be instructed rather than only configured.",
    category: "Research",
    sources: [source.gpt3],
    body: () => `## The shift

GPT-3 makes a new product pattern easier to imagine: software that responds to intent rather than only to predefined buttons.

That does not remove the need for design. It raises the bar for design. If language can become an interface, the surrounding system must decide what the model can access, what it should remember, when it should ask, and how the human stays in control.

## Why it matters for Orbit

Business execution is full of language: emails, proposals, sales notes, requirements, delivery notes, feedback, support and internal decisions.

A model that can reason over language suggests that the operating system for a business should not be only tables and forms. It should understand the work being described.

## Why it matters for TUXX

For client work, this points to faster custom systems, clearer internal tools and better ways to reduce repetitive coordination. The lesson is not to automate everything. The lesson is to remove the work that prevents people from doing the higher-value part.

## Working note

GPT-3 increases imagination. The job now is discipline: product boundaries, review loops, memory and interfaces that do not collapse under their own flexibility.`,
  },
  "2021-02-automation-as-a-studio-capability": {
    title: "February 2021: Codex and code as an operating surface",
    summary: "Code models suggest that building software can become more conversational, iterative and agent-assisted.",
    category: "Product",
    sources: [source.codex, source.tuxx],
    body: () => `## Code becomes more conversational

Code models change the emotional texture of software creation. They do not remove engineering judgement, but they make the distance between idea and working surface shorter.

That matters for a studio like TUXX. Client work often depends on how quickly a team can understand the problem, express the system and iterate without drowning in boilerplate.

## The product implication

If code can be assisted, the bottleneck moves. It is less about typing every line and more about knowing what should exist, how it should behave, how it should be tested and where the boundary should be.

This is one of the reasons Orbit cannot just be a CRM. It needs to become a place where intent, tasks, delivery and product decisions are connected.

## The MSG view

The future builder is not someone who stops thinking because a model can write code. The future builder has to think more clearly because the system can now execute more quickly.

## Working note

Speed without judgement creates mess. The opportunity is to pair faster creation with stronger operating discipline.`,
  },
  "2021-08-creative-tooling-and-distribution": {
    title: "August 2021: CLIP, DALL-E and creative search",
    summary: "Multimodal models point towards tools that connect language, images, taste and creative direction.",
    category: "Culture",
    sources: [source.clip, source.dalle],
    body: () => `## Images become searchable by meaning

CLIP and DALL-E point towards a different creative workflow. Language and images are no longer completely separate surfaces. A prompt, a reference, a concept and a visual direction can begin to live in the same system.

That matters for anyone building consumer products, media tools or creative culture.

## Why this matters to All Purpose

All Purpose is not only a list of apps. It is a consumer ecosystem where performance, identity, music, media and personal development can reinforce one another.

Multimodal models suggest a future where a person's goals, taste, memories, photos, sound, writing and visual references can become part of a more personal software experience.

## The risk

The lazy version is infinite synthetic imagery. The better version is creative leverage: faster exploration, clearer references, better moodboards, stronger product storytelling and tools that help people make decisions.

## Working note

The question is not whether AI can make images. The question is whether it can help people find, shape and express what they actually mean.`,
  },
  "2022-07-public-ai-tools-become-accessible": {
    title: "July 2022: Stable Diffusion and open creative models",
    summary: "Open generative image models change who can experiment with visual systems.",
    category: "Research",
    sources: [source.stableDiffusion],
    body: () => `## Access changes the culture

Stable Diffusion matters because access changes behaviour. When powerful image generation becomes available outside a small number of labs, experimentation accelerates.

The tool becomes part of the culture: designers test ideas faster, founders explore brand worlds earlier, and product teams can visualise directions before everything is polished.

## What MSG learns from it

For Mustard Seed Group, the lesson is about experimentation. The smallest useful prototype is getting smaller. That is good, but it also means taste becomes more important.

When everyone can generate more, the advantage shifts towards people who can decide better.

## Product implications

For TUXX, visual generation can speed up client concepts and product exploration. For All Purpose, it can shape identity and media. For Benediction Lab, it becomes part of a broader research question: how do generative tools affect taste, behaviour and output?

## Working note

The future is not only faster content. It is faster iteration, if the operator has standards.`,
  },
  "2022-09-coaching-accountability-and-naira-shaped-ideas": {
    title: "September 2022: Whisper, voice and coaching interfaces",
    summary: "Speech models make coaching, logging and reflection feel less like form-filling.",
    category: "Performance",
    sources: [source.whisper],
    body: () => `## Voice changes the interface

Whisper points towards a quieter but important shift: people can speak to software without treating it like a command line.

That matters for coaching and performance. Training notes, food logs, reflections, check-ins and accountability updates often fail because the interface is too heavy for the moment.

## Why this matters for Naira

An AI performance coach should not only wait for perfect data entry. It should be able to meet people where they are: after a session, during a walk, before a meal, late at night when the decision is about to slip.

Voice makes the system more human, but it also creates responsibility. The coach has to be useful, calm and bounded.

## The wider product lesson

The best interface is often the one with the least friction. Voice is not right for every task, but it is powerful when the user needs to capture context quickly.

## Working note

The question is how to turn voice into structured progress without making the person feel monitored or managed by a machine.`,
  },
  "2022-11-chatgpt-resets-expectations": {
    title: "November 2022: ChatGPT resets expectations",
    summary: "ChatGPT makes AI feel conversational, public and immediately useful.",
    category: "Research",
    sources: [source.chatgpt],
    body: () => `## The interface moment

ChatGPT is important because it turns AI into a conversation. That sounds simple, but product history is full of moments where the interface changes the market more than the underlying capability alone.

People do not adopt "machine learning". They adopt a surface that answers, drafts, explains, rewrites and helps them move.

## What changes for MSG

For Orbit, the opportunity becomes clearer: business software can become more conversational without becoming vague. A team should be able to ask about a lead, a project, a next step or a delivery risk and get a useful answer grounded in the system.

For TUXX, client systems can become easier to use because users no longer need to learn every menu before they can get value.

For CheekyGains and Naira, coaching can feel more responsive, more personal and more continuous.

## The danger

The danger is treating the chat box as the whole product. Chat is an interface, not the operating system. Without memory, workflow, permissions, review and good product judgement, it becomes a novelty layer.

## Working note

The useful question is not "can we add chat?" It is "what should this system know, what should it do, and when should it stay quiet?"`,
  },
  "2023-03-gpt-4-and-complex-work": {
    title: "March 2023: GPT-4 and complex work",
    summary: "GPT-4 raises the ceiling for reasoning, planning and product assistance.",
    category: "Research",
    sources: [source.gpt4],
    body: () => `## A higher ceiling

GPT-4 raises expectations. The important shift is not only better answers; it is the possibility of models helping with more complex chains of work.

That matters because most valuable work is not a single prompt. It is a sequence: understand context, clarify the goal, generate options, make trade-offs, act, review and improve.

## Influence on Orbit

Orbit needs this kind of sequence. Moving from prospect to launched product is not one task. It is a chain of decisions across sales, planning, design, build, delivery and follow-up.

A stronger model makes the intelligence layer more capable, but the system still has to provide structure. Orion exists in that space: not as magic, but as a layer that can help work move through the chain.

## Influence on TUXX

For TUXX, this changes delivery expectations. Custom systems can be built faster, but the quality bar rises because everyone can produce rough software quickly. The advantage becomes architecture, taste and execution discipline.

## Working note

The model raises the ceiling. The product has to raise the floor.`,
  },
  "2023-08-benediction-lab-as-research-surface": {
    title: "August 2023: Llama and the open model question",
    summary: "Open-weight models change how builders think about ownership, control and experimentation.",
    category: "Research",
    sources: [source.llama2, source.benediction],
    body: () => `## Why open models matter

Llama makes the open model conversation more practical. The point is not only cost. It is ownership, portability and experimentation.

Closed frontier models are powerful. Open-weight models create a different kind of leverage: the ability to test locally, customise more deeply and understand the shape of the system.

## Why Benediction Lab cares

Benediction Lab is the right place to think about this because the question is still partly research. Which capabilities need frontier models? Which can be handled locally? Which should be private? Which should be fast, cheap and specialised?

These choices matter for Orion, Orbit and any future personal operating system.

## Product implication

The future is unlikely to be one model. It is more likely to be a routing problem: choosing the right model, memory, tool and interface for the job.

## Working note

The best AI system may not always use the biggest model. It should use the right capability at the right point in the workflow.`,
  },
  "2024-02-memory-as-a-product-frontier": {
    title: "February 2024: Long context, memory and product trust",
    summary: "Claude and Gemini show why context length matters, but memory still needs product design.",
    category: "Research",
    sources: [source.claude3, source.gemini15, source.benediction],
    body: () => `## Context is becoming a product feature

Longer context windows make AI systems feel more useful because they can hold more of the work in view. Documents, notes, transcripts, code and plans can sit together in the same interaction.

But context length is not the same as memory. A model can read more without knowing what should persist, what should be forgotten and what should require permission.

## Why this matters for Orion

Orion needs more than recall. It needs useful continuity: what happened, what changed, what matters now and what should be acted on next.

That is a product design problem as much as a model problem.

## Why this matters for users

Trust comes from predictable behaviour. If a system remembers too little, it feels shallow. If it remembers too much, it feels invasive. The right memory system should be clear, useful and controllable.

## Working note

The next frontier is not only bigger context. It is better judgement about what context deserves to become memory.`,
  },
  "2024-05-cheekygains-and-naira": {
    title: "May 2024: Naira and the performance coach interface",
    summary: "AI coaching only matters if it changes behaviour at the moment of decision.",
    category: "Performance",
    sources: [source.msg, source.whisper],
    body: () => `## Coaching is not content

Most fitness products are full of content: plans, videos, meal ideas, reminders and dashboards. Useful, but not enough.

Performance changes when the system reaches the moment where behaviour is decided. That is where Naira becomes interesting.

## What AI changes

AI allows coaching to become more responsive. A person can ask, log, reflect, adjust and recover without waiting for a weekly review.

Voice models make this even more important. If someone can speak a check-in after training or describe a decision before it happens, the system can support the behaviour when it matters.

## Product principle

Naira should not be loud. It should be timely. A good coach does not fill every silence. It notices the pattern and helps the person return to the standard.

## Working note

The goal is not to automate discipline. It is to design an environment where discipline has more support.`,
  },
  "2024-08-gui-control-and-workflows": {
    title: "August 2024: GUI control and the practical agent",
    summary: "Agents become more useful when they can operate real interfaces, not only answer questions.",
    category: "Research",
    sources: [source.benediction, source.orbitDocs],
    body: () => `## The agent problem

Most work does not happen inside one perfect API. It happens across browsers, forms, dashboards, calendars, inboxes, files and half-finished systems.

That is why GUI control matters. If agents can only talk, they are assistants. If they can operate interfaces with permission and supervision, they become closer to execution systems.

## Why this matters for Orbit

Orbit is about movement from prospect to launched product. That movement often crosses many tools. A practical agent needs to understand the workflow and operate inside the messy surface where the work lives.

## Why it belongs in research

GUI control is powerful and risky. It needs boundaries, visibility, confirmation and clear recovery when something goes wrong.

Benediction Lab is the right place to explore those constraints before the pattern becomes product.

## Working note

The useful agent is not the one that sounds clever. It is the one that can complete bounded work reliably without hiding what it is doing.`,
  },
  "2024-12-research-products-and-services-reinforce": {
    title: "December 2024: Sora and the expanding model stack",
    summary: "Video generation shows that AI is becoming a stack of capabilities, not a single product category.",
    category: "Research",
    sources: [source.sora, source.msg],
    body: () => `## The model stack expands

Sora is a reminder that AI is not only text. The field is becoming a stack of capabilities: language, code, image, audio, video, planning, retrieval and tool use.

That matters for Mustard Seed Group because the portfolio already spans different kinds of output: business execution, research, consumer performance, creative culture and media.

## Why video matters

Video generation is not only a media story. It changes how products are explained, how campaigns are prototyped, how ideas are visualised and how teams imagine future interfaces.

The temptation is spectacle. The opportunity is communication.

## Portfolio implication

Orbit needs language and workflow. CheekyGains and Naira need coaching and voice. All Purpose can use image, sound and story. TUXX can use the full stack to build client systems faster.

## Working note

The question is no longer "which model?" It is "which capability belongs in this system, and what human outcome should it improve?"`,
  },
  "2025-08-ai-capability-and-adoption": {
    title: "August 2025: Model choice becomes product strategy",
    summary: "Frontier, open-weight, voice and specialist models force better product architecture.",
    category: "Research",
    sources: [source.aiIndex2025, source.llama2, source.claude3, source.gemini15],
    body: () => `## There is no single model future

By now the useful question is not which model wins. The useful question is which model belongs where.

Frontier models are strong generalists. Open-weight models support ownership and local experimentation. Voice models change input. Specialist models can be cheaper, faster and easier to constrain.

## What this means for MSG

Orbit needs reliability and context. Orion needs model routing and memory. TUXX needs pragmatic delivery. CheekyGains and Naira need personal, timely support. All Purpose needs creative flexibility.

Those are not the same requirements.

## Product architecture changes

The product layer has to decide which model sees what, which tasks need review, which data should stay protected and which outputs should become part of the user's record.

This is where the real moat starts to form: not in calling a model, but in designing the operating system around it.

## Working note

Model choice is becoming product strategy. The right answer will often be a mix, not a single provider badge.`,
  },
  "2026-05-github-organisation-and-public-boundaries": {
    title: "May 2026: OpenClaw, ownership and local control",
    summary: "OpenClaw points towards a broader question: how much of the operator's AI stack should they own?",
    category: "Founder letter",
    sources: [source.msg, source.orbitCommunity],
    body: () => `## The ownership question

OpenClaw sits inside a wider direction: local control, security, operator tooling and the ability to understand what a system is doing.

The public point is not implementation. The public point is philosophy. If AI becomes part of how people work, build, communicate and decide, the operator needs more than a chat window.

## Why ownership matters

Useful AI systems will touch sensitive work: notes, files, ideas, customers, habits, plans and decisions. The more capable the system becomes, the more important control becomes.

That is why GitHub organisation, repo hygiene and public boundaries matter. They are not admin chores. They are part of building an ecosystem that can expose public surfaces without weakening protected work.

## Product implication

Orbit, Orion and TUXX all need this discipline. A system can be powerful and still be legible. It can be automated and still require permission. It can be public-facing and still protect its moat.

## Working note

The next phase is not only building smarter agents. It is building agents that operators can trust, inspect and direct.`,
  },
};

function monthName(date?: string) {
  if (!date) return "Undated";
  return new Date(date).toLocaleString("en-GB", { month: "long", year: "numeric" });
}

function unique(values: string[]) {
  return Array.from(new Set(values.filter(Boolean)));
}

function baseArticle(data: Data): Article {
  const date = String(data.date ?? "");
  const year = date ? new Date(date).getUTCFullYear() : 2026;
  return {
    slug: String(data.slug ?? ""),
    title: String(data.title ?? ""),
    summary: String(data.summary ?? ""),
    category: String(data.category ?? "Founder letter"),
    year,
    month: monthName(date),
    sources: Array.isArray(data.source_links) ? data.source_links.map(String) : [],
  };
}

function modelEraBody(article: Article) {
  return `## The model layer is changing

${article.month} is a useful point to look at the model layer rather than only the product layer. The public AI conversation is moving quickly, but the deeper pattern is slower: models are becoming a new kind of infrastructure.

That does not mean every company needs to talk about models. It means every serious product company has to understand what models make possible, what they make fragile and where the human still needs control.

## What changes for MSG

For Orbit, models influence how work is understood, summarised and moved forward. For Orion, they influence memory, planning and tool use. For TUXX, they influence how quickly custom systems can be designed and delivered. For CheekyGains and Naira, they influence coaching, reflection and accountability.

The model is not the product. It is one layer inside the product.

## The operating question

The practical question is what the system should know, what it should do, what it should ask permission for and what it should never touch.

Those decisions matter more than model excitement because they determine whether the product becomes useful in the real world.

## Working note

MSG should study model progress closely, but translate it into operating systems, performance systems and creative tools rather than copying the language of AI marketing.`;
}

function productBody(article: Article) {
  return `## The friction

The useful product question in ${article.month} is not "what can we build?" It is "where is the friction repeating?"

Repeated friction is a signal. It tells us where teams lose momentum, where people abandon standards and where a better system would change the outcome.

## The operating surface

That is the shared thread between Orbit and TUXX. Orbit turns commercial execution into an operating surface. TUXX tests real constraints through services and custom systems. One creates product clarity; the other keeps the work honest.

This is how the portfolio should behave. Services expose patterns. Research explains them. Products make them repeatable.

## What this changes

The more capable models become, the more important the surrounding product becomes. A model can answer. A product has to direct, remember, measure, recover and help people finish.

## Working note

Build the product where the pain repeats. Use AI where it genuinely improves the operating loop. Keep the system understandable enough for people to trust it.`;
}

function performanceBody() {
  return `## Performance is an interface problem

The mistake is to treat performance as motivation. Motivation rises and falls. Systems endure.

A good performance product helps someone notice the pattern, make the better choice easier and return to the standard after a miss.

## What AI changes

Language, voice and memory models can make coaching more continuous. They can help someone log quickly, reflect honestly and receive support in the moment rather than after the fact.

That is the Naira opportunity inside CheekyGains: not replacing effort, but supporting it when the decision is still live.

## The product standard

The system should not nag. It should be precise. It should know when to encourage, when to challenge and when to simplify.

## Working note

Human performance tools should increase agency. If the system makes the person dependent, it has failed.`;
}

function cultureBody() {
  return `## Culture is a product surface

Culture is not a side project. It shapes taste, behaviour, attention and identity.

For All Purpose, this matters because consumer products do not live only in utility. They live in the way people see themselves and the futures they want to move towards.

## What generative models change

Image, voice, video and music-adjacent models make it easier to explore creative worlds quickly. That is useful, but speed is not the same as taste.

The advantage belongs to teams that can use generative tools to sharpen direction rather than flood the world with more material.

## MSG implication

Made It Out, All Purpose Music, Relay, Horizon and CheekyGains can all sit inside a wider culture of capability: move better, think better, create better, operate better.

## Working note

The creative question is not "can AI make this?" It is "does this help someone become more capable, more honest or more alive?"`;
}

function founderBody() {
  return `## The thesis underneath the work

The portfolio only makes sense if the centre is clear. Mustard Seed Group is not organised around one app, one model provider or one trend.

It is organised around capability: helping people and organisations think better, move better, create better and execute better.

## Why AI matters, but is not the whole story

AI changes the tools available to us. It affects language, code, voice, images, planning, research and operations. But the common thread is still human capability.

The question is not whether every product should become an AI product. The question is whether intelligence can make the product more useful without making the person less capable.

## How this shapes the portfolio

Benediction Lab researches. Orbit productises. TUXX proves patterns commercially. All Purpose explores consumer behaviour, performance and culture. Chiko Shire holds the founder-level narrative together.

## Working note

The role of the group is to keep connecting the work without flattening it. Different products can have different audiences and still share one thesis.`;
}

function variedBody(article: Article) {
  if (article.category === "Product") return productBody(article);
  if (article.category === "Performance") return performanceBody();
  if (article.category === "Culture") return cultureBody();
  if (article.category === "Research" || article.title.match(/AI|GPT|model|language|agent|memory/i)) return modelEraBody(article);
  return founderBody();
}

function improveSummary(summary: string) {
  return summary
    .replace(/^A historical MSG archive draft on /, "")
    .replace(/\.$/, "")
    .replace(/^./, (char) => char.toUpperCase());
}

function updateFile(file: string) {
  const raw = fs.readFileSync(file, "utf8");
  const parsed = matter(raw);
  const article = baseArticle(parsed.data);
  const override = overrides[article.slug];

  if (override?.title) parsed.data.title = override.title;
  if (override?.category) parsed.data.category = override.category;
  parsed.data.summary = override?.summary ?? improveSummary(String(parsed.data.summary ?? ""));
  parsed.data.source_links = unique([...(override?.sources ?? []), ...article.sources]);
  parsed.data.reviewed = true;
  parsed.data.published = true;
  parsed.data.status = "published";

  const body = override ? override.body(baseArticle(parsed.data)) : variedBody(baseArticle(parsed.data));
  fs.writeFileSync(file, matter.stringify(`${body.trim()}\n`, parsed.data));
}

const files = fs.readdirSync(blogDir).filter((file) => file.endsWith(".mdx"));
for (const file of files) {
  updateFile(path.join(blogDir, file));
}

console.log(`Enriched ${files.length} published update articles.`);

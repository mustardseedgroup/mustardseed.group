import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

type Entry = {
  file: string;
  data: Record<string, unknown>;
  content: string;
};

type Tone = {
  label: string;
  accent: string;
  secondary: string;
  glow: string;
};

const blogDir = path.join(process.cwd(), "content", "blog");
const imageDir = path.join(process.cwd(), "public", "images", "updates");
const publicPrefix = "/images/updates";

const base = {
  paper: "#fbfaf7",
  cream: "#e8e6df",
  ink: "#0b0b09",
  muted: "#706c64",
  line: "#c8c3b7",
  clay: "#c69386",
};

const tones: Record<string, Tone> = {
  Research: { label: "Research", accent: "#4f7cff", secondary: "#e86bd6", glow: "#b8d7ff" },
  Product: { label: "Product", accent: "#0b0b09", secondary: "#2f7cff", glow: "#c8d7ff" },
  Performance: { label: "Performance", accent: "#cf6f5f", secondary: "#9be15d", glow: "#ffd0b8" },
  Culture: { label: "Culture", accent: "#ff4d62", secondary: "#7b61ff", glow: "#ffd06f" },
  "Founder letters": { label: "Founder letter", accent: "#c69386", secondary: "#0b0b09", glow: "#f0c7bb" },
};

const layouts = [
  "system-ui",
  "model-field",
  "code-merge",
  "performance-chart",
  "culture-gradient",
  "research-orbit",
  "product-stack",
  "control-plane",
  "timeline-cards",
  "memory-map",
];

const datedTitlePrefix = /^(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{4}:\s+/;

function xmlEscape(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function hash(input: string) {
  let value = 2166136261;
  for (const char of input) {
    value ^= char.charCodeAt(0);
    value = Math.imul(value, 16777619);
  }
  return value >>> 0;
}

function pick<T>(items: T[], seed: number, offset = 0) {
  return items[(seed + offset) % items.length];
}

function wrapWords(text: string, maxChars: number, maxLines: number) {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }

    if (lines.length === maxLines) break;
  }

  if (current && lines.length < maxLines) lines.push(current);
  return lines;
}

function categoryTone(category?: string) {
  return tones[String(category ?? "")] ?? tones["Founder letters"];
}

function dateParts(date?: string) {
  if (!date) return { month: "NOTE", year: "" };
  const parsed = new Date(date);
  return {
    month: parsed.toLocaleString("en-GB", { month: "short" }).toUpperCase(),
    year: String(parsed.getUTCFullYear()),
  };
}

function grid(seed: number, tone: Tone) {
  const cells = Array.from({ length: 60 }, (_, index) => {
    const x = 640 + (index % 10) * 46;
    const y = 124 + Math.floor(index / 10) * 46;
    const active = (index + seed) % 7 === 0 || (index * 3 + seed) % 11 === 0;
    const fill = active ? (index % 2 ? tone.accent : tone.secondary) : "transparent";
    return `<rect x="${x}" y="${y}" width="34" height="34" rx="9" fill="${fill}" opacity="${active ? 0.86 : 0.08}" stroke="${active ? "none" : base.line}"/>`;
  }).join("");
  return `<g>${cells}</g>`;
}

function codeFragments(seed: number, tone: Tone) {
  const lines = [
    "for signal in systems:",
    "  route(context)",
    "  decide(next_step)",
    "return capability",
  ];

  return `
    <rect x="602" y="110" width="468" height="334" rx="26" fill="#11110f"/>
    <g font-family="SFMono-Regular, Consolas, monospace" font-size="25">
      ${lines.map((line, index) => `<text x="646" y="${184 + index * 58}" fill="${index % 2 ? tone.glow : "#f7f1e7"}" opacity="${0.86 - index * 0.08}">${xmlEscape(line)}</text>`).join("")}
    </g>
    <rect x="740" y="474" width="220" height="62" rx="31" fill="${tone.accent}"/>
    <text x="790" y="515" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="700" fill="${seed % 2 ? base.paper : "#ffffff"}">Merged</text>
    <text x="992" y="516" font-family="Arial, Helvetica, sans-serif" font-size="32" font-weight="700" fill="${tone.secondary}">+${120 + (seed % 180)}</text>
  `;
}

function interfaceStack(seed: number, tone: Tone) {
  return `
    <rect x="620" y="116" width="408" height="294" rx="28" fill="${base.paper}" stroke="${base.line}"/>
    <rect x="664" y="166" width="104" height="104" rx="24" fill="${tone.accent}" opacity="0.88"/>
    <path d="M696 218 H820 C858 218 858 166 900 166 H966" fill="none" stroke="${base.ink}" stroke-width="4"/>
    <circle cx="820" cy="218" r="10" fill="${base.ink}"/>
    <circle cx="900" cy="166" r="10" fill="${base.ink}"/>
    <rect x="884" y="134" width="92" height="74" rx="18" fill="${tone.glow}" opacity="0.7"/>
    <rect x="884" y="250" width="92" height="74" rx="18" fill="${tone.secondary}"/>
    <path d="M696 218 H820 C858 218 858 287 884 287" fill="none" stroke="${base.ink}" stroke-width="4"/>
    <rect x="548" y="378" width="410" height="128" rx="24" fill="#141412"/>
    <rect x="594" y="424" width="272" height="12" rx="6" fill="${tone.accent}"/>
    <rect x="594" y="456" width="210" height="12" rx="6" fill="${tone.glow}"/>
  `;
}

function field(seed: number, tone: Tone) {
  const cards = [0, 1, 2, 3].map((index) => {
    const x = 640 + index * 106;
    const y = 128 + ((seed + index) % 3) * 70;
    return `<rect x="${x}" y="${y}" width="148" height="86" fill="none" stroke="${index % 2 ? tone.secondary : "#ffffff"}" stroke-width="3" opacity="0.75"/>`;
  }).join("");

  return `
    <path d="M600 116 L1092 116 L1092 514 L600 514Z" fill="url(#fieldGradient)" opacity="0.96"/>
    <path d="M600 412 L1092 152 M600 334 L1092 74 M600 490 L1092 230" stroke="#ffffff" opacity="0.22"/>
    ${cards}
    <path d="M686 314 C786 242 900 410 1038 284" fill="none" stroke="${base.ink}" stroke-width="4" stroke-dasharray="8 15"/>
    <circle cx="686" cy="314" r="12" fill="${base.ink}"/>
    <circle cx="1038" cy="284" r="12" fill="${base.ink}"/>
  `;
}

function chart(seed: number, tone: Tone) {
  const bars = [90, 156, 116, 210, 140].map((height, index) => {
    const x = 660 + index * 82;
    const y = 460 - height;
    const colour = index % 2 ? tone.accent : index % 3 ? tone.glow : base.ink;
    return `<rect x="${x}" y="${y}" width="48" height="${height}" fill="${colour}" opacity="0.94"/>`;
  }).join("");

  return `
    <rect x="604" y="122" width="486" height="402" rx="28" fill="${base.paper}" stroke="${base.line}"/>
    <path d="M650 462 H1032" stroke="${base.ink}" stroke-width="3"/>
    ${bars}
    <path d="M652 244 C720 160 786 330 850 244 S992 168 1056 236" fill="none" stroke="${tone.secondary}" stroke-width="6" opacity="0.82"/>
    <circle cx="850" cy="244" r="13" fill="${base.ink}"/>
    <circle cx="1056" cy="236" r="13" fill="${base.ink}"/>
  `;
}

function orbit(seed: number, tone: Tone) {
  return `
    <circle cx="850" cy="316" r="218" fill="none" stroke="${tone.glow}" stroke-width="3"/>
    <circle cx="850" cy="316" r="132" fill="none" stroke="${base.line}" stroke-width="3"/>
    <path d="M642 316 C720 128 982 128 1060 316 C982 504 720 504 642 316Z" fill="none" stroke="${tone.accent}" stroke-width="5" opacity="0.76"/>
    <path d="M850 112 C960 210 958 418 850 520 C742 418 740 210 850 112Z" fill="none" stroke="${tone.secondary}" stroke-width="4" opacity="0.72"/>
    <circle cx="850" cy="316" r="28" fill="${base.paper}" stroke="${base.ink}" stroke-width="4"/>
    <circle cx="642" cy="316" r="14" fill="${base.ink}"/>
    <circle cx="1060" cy="316" r="14" fill="${base.ink}"/>
    <circle cx="850" cy="112" r="12" fill="${base.ink}"/>
  `;
}

function waves(seed: number, tone: Tone) {
  return `
    <rect x="572" y="90" width="568" height="470" rx="34" fill="url(#waveGradient)"/>
    <path d="M626 242 C704 138 780 350 868 242 S1038 136 1114 242" fill="none" stroke="#ffffff" stroke-width="7" opacity="0.86"/>
    <path d="M626 342 C704 238 780 450 868 342 S1038 236 1114 342" fill="none" stroke="${tone.accent}" stroke-width="7" opacity="0.76"/>
    <path d="M626 442 C704 338 780 550 868 442 S1038 336 1114 442" fill="none" stroke="${base.ink}" stroke-width="5" opacity="0.66"/>
    <rect x="720" y="160" width="260" height="82" rx="41" fill="${base.paper}" opacity="0.9"/>
    <circle cx="766" cy="201" r="16" fill="${tone.secondary}"/>
    <text x="802" y="209" font-family="Arial, Helvetica, sans-serif" font-size="25" font-weight="700" fill="${tone.accent}">Signal</text>
  `;
}

function productCards(seed: number, tone: Tone) {
  return `
    <rect x="586" y="118" width="228" height="292" rx="28" fill="${base.paper}" stroke="${base.line}"/>
    <rect x="846" y="118" width="228" height="292" rx="28" fill="#11110f"/>
    <rect x="630" y="162" width="140" height="18" rx="9" fill="${base.ink}"/>
    <rect x="630" y="206" width="104" height="104" rx="24" fill="${tone.glow}"/>
    <rect x="630" y="336" width="140" height="12" rx="6" fill="${base.line}"/>
    <rect x="890" y="162" width="140" height="18" rx="9" fill="${tone.glow}"/>
    <rect x="890" y="206" width="104" height="104" rx="24" fill="${tone.accent}"/>
    <rect x="890" y="336" width="140" height="12" rx="6" fill="#55524d"/>
    <path d="M730 460 H930" stroke="${tone.secondary}" stroke-width="8" stroke-linecap="round"/>
    <path d="M930 460 L902 432 M930 460 L902 488" stroke="${tone.secondary}" stroke-width="8" stroke-linecap="round"/>
  `;
}

function drawing(layout: string, seed: number, tone: Tone) {
  switch (layout) {
    case "system-ui":
      return interfaceStack(seed, tone);
    case "model-field":
      return field(seed, tone);
    case "code-merge":
      return codeFragments(seed, tone);
    case "performance-chart":
      return chart(seed, tone);
    case "culture-gradient":
      return waves(seed, tone);
    case "research-orbit":
      return orbit(seed, tone);
    case "product-stack":
      return productCards(seed, tone);
    case "control-plane":
      return `${grid(seed, tone)}<rect x="742" y="242" width="250" height="150" rx="30" fill="${base.paper}" stroke="${base.ink}" stroke-width="4"/><text x="810" y="332" font-family="Arial, Helvetica, sans-serif" font-size="46" font-weight="800" fill="${tone.accent}">MS</text>`;
    case "timeline-cards":
      return `${productCards(seed, tone)}<path d="M620 510 H1080" stroke="${base.ink}" stroke-width="4"/><circle cx="700" cy="510" r="15" fill="${tone.accent}"/><circle cx="850" cy="510" r="15" fill="${tone.secondary}"/><circle cx="1000" cy="510" r="15" fill="${base.ink}"/>`;
    default:
      return `${orbit(seed, tone)}${grid(seed, tone)}`;
  }
}

function defs(seed: number, tone: Tone) {
  const bgA = pick(["#f7efe7", "#e8e6df", "#f3e0dc", "#e6edff", "#fff0c7"], seed, 1);
  const bgB = pick(["#ff7a45", "#d96fe8", "#4f7cff", "#9be15d", "#ffd06f"], seed, 2);
  const bgC = pick(["#7b61ff", "#11110f", "#6fd3ff", "#cf6f5f", "#f7f1e7"], seed, 3);

  return `
    <defs>
      <linearGradient id="backgroundGradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${bgA}"/>
        <stop offset="58%" stop-color="${base.cream}"/>
        <stop offset="100%" stop-color="${tone.glow}"/>
      </linearGradient>
      <radialGradient id="fieldGradient" cx="68%" cy="42%" r="70%">
        <stop offset="0%" stop-color="${bgB}" stop-opacity="0.92"/>
        <stop offset="55%" stop-color="${tone.secondary}" stop-opacity="0.54"/>
        <stop offset="100%" stop-color="${bgC}" stop-opacity="0.86"/>
      </radialGradient>
      <linearGradient id="waveGradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${tone.secondary}"/>
        <stop offset="50%" stop-color="${tone.glow}"/>
        <stop offset="100%" stop-color="${tone.accent}"/>
      </linearGradient>
      <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="28" stdDeviation="26" flood-color="#0b0b09" flood-opacity="0.18"/>
      </filter>
    </defs>
  `;
}

function thumbnailSvg(entry: Entry) {
  const slug = slugify(String(entry.data.slug ?? path.basename(entry.file, ".mdx")));
  const seed = hash(slug);
  const title = String(entry.data.title ?? "Mustard Seed Group").replace(datedTitlePrefix, "");
  const category = String(entry.data.category ?? "Founder letters");
  const summary = String(entry.data.summary ?? "Public update from Mustard Seed Group.");
  const tone = categoryTone(category);
  const layout = pick(layouts, seed);
  const { month, year } = dateParts(String(entry.data.date ?? ""));
  const titleLines = wrapWords(title, seed % 3 === 0 ? 17 : 21, 3);
  const summaryLine = wrapWords(summary.replace(/^A historical MSG archive draft on /, ""), 48, 2)[0] ?? "";
  const darkTitle = seed % 5 === 0;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-labelledby="title desc">
  <title id="title">${xmlEscape(title)}</title>
  <desc id="desc">${xmlEscape(summary)}</desc>
  ${defs(seed, tone)}
  <rect width="1200" height="630" fill="url(#backgroundGradient)"/>
  <rect x="34" y="34" width="1132" height="562" rx="0" fill="${darkTitle ? "#11110f" : "rgba(251,250,247,0.76)"}" stroke="${darkTitle ? "#3a3833" : base.line}" stroke-width="2"/>
  <circle cx="${1020 - (seed % 220)}" cy="${128 + (seed % 160)}" r="${180 + (seed % 120)}" fill="${tone.secondary}" opacity="0.18"/>
  <circle cx="${780 + (seed % 260)}" cy="${410 - (seed % 140)}" r="${120 + (seed % 90)}" fill="${tone.accent}" opacity="0.16"/>
  <g filter="url(#softShadow)">
    ${drawing(layout, seed, tone)}
  </g>
  <rect x="70" y="76" width="${tone.label.length > 12 ? 232 : 184}" height="48" rx="24" fill="${darkTitle ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.72)"}" stroke="${darkTitle ? "#3a3833" : base.line}"/>
  <text x="96" y="107" font-family="Arial, Helvetica, sans-serif" font-size="16" font-weight="700" letter-spacing="3.4" fill="${darkTitle ? tone.glow : base.ink}">${xmlEscape(tone.label.toUpperCase())}</text>
  <text x="74" y="184" font-family="Georgia, 'Times New Roman', serif" font-size="32" fill="${darkTitle ? "#d9d0c3" : base.muted}">${xmlEscape(month)} ${xmlEscape(year)}</text>
  ${titleLines.map((line, index) => `<text x="72" y="${260 + index * 64}" font-family="Georgia, 'Times New Roman', serif" font-size="${titleLines.length > 2 ? 54 : 62}" font-weight="500" fill="${darkTitle ? base.paper : base.ink}">${xmlEscape(line)}</text>`).join("\n  ")}
  <text x="74" y="536" font-family="Arial, Helvetica, sans-serif" font-size="22" fill="${darkTitle ? "#c8c0b2" : base.muted}">${xmlEscape(summaryLine)}</text>
  <rect x="1030" y="500" width="74" height="58" rx="0" fill="${darkTitle ? "#191916" : base.paper}" stroke="${darkTitle ? "#4d4942" : base.line}" stroke-width="2"/>
  <text x="1048" y="537" font-family="Arial, Helvetica, sans-serif" font-size="25" font-weight="800" fill="${tone.accent}">MS</text>
</svg>
`;
}

function readEntries() {
  return fs
    .readdirSync(blogDir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const fullPath = path.join(blogDir, file);
      const raw = fs.readFileSync(fullPath, "utf8");
      const parsed = matter(raw);
      return { file: fullPath, data: parsed.data, content: parsed.content };
    });
}

fs.mkdirSync(imageDir, { recursive: true });

let written = 0;
let preserved = 0;
for (const entry of readEntries()) {
  const currentThumbnail = String(entry.data.thumbnail ?? "");
  if (currentThumbnail.startsWith("/images/editorial/")) {
    preserved += 1;
    continue;
  }

  const slug = slugify(String(entry.data.slug ?? path.basename(entry.file, ".mdx")));
  const imageName = `${slug}.svg`;
  const imagePath = path.join(imageDir, imageName);
  const publicPath = `${publicPrefix}/${imageName}`;

  fs.writeFileSync(imagePath, thumbnailSvg(entry));

  if (currentThumbnail !== publicPath) {
    const nextData = { ...entry.data, thumbnail: publicPath };
    const nextRaw = matter.stringify(entry.content.trimStart(), nextData);
    fs.writeFileSync(entry.file, nextRaw);
  }

  written += 1;
}

console.log(`Generated ${written} update thumbnails in ${imageDir}. Preserved ${preserved} editorial PNG thumbnails.`);

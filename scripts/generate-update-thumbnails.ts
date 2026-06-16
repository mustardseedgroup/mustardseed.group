import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

type Entry = {
  file: string;
  data: Record<string, unknown>;
  content: string;
};

const blogDir = path.join(process.cwd(), "content", "blog");
const imageDir = path.join(process.cwd(), "public", "images", "updates");
const publicPrefix = "/images/updates";

const palette = {
  background: "#e8e6df",
  paper: "#fbfaf7",
  ink: "#0b0b09",
  muted: "#64615b",
  line: "#c8c3b7",
  clay: "#c69386",
  olive: "#8c877e",
};

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
  switch (category) {
    case "Research":
      return { accent: "#8c877e", label: "Research", pattern: "orbit" };
    case "Product":
      return { accent: "#0b0b09", label: "Product", pattern: "grid" };
    case "Performance":
      return { accent: "#c69386", label: "Performance", pattern: "pulse" };
    case "Culture":
      return { accent: "#6f6a61", label: "Culture", pattern: "wave" };
    default:
      return { accent: "#c69386", label: "Founder Letter", pattern: "seed" };
  }
}

function dateParts(date?: string) {
  if (!date) return { month: "Undated", year: "" };
  const parsed = new Date(date);
  return {
    month: parsed.toLocaleString("en-GB", { month: "short" }).toUpperCase(),
    year: String(parsed.getUTCFullYear()),
  };
}

function patternSvg(pattern: string, accent: string) {
  if (pattern === "orbit") {
    return `
      <circle cx="880" cy="315" r="190" fill="none" stroke="${accent}" stroke-width="2" opacity="0.32"/>
      <circle cx="880" cy="315" r="112" fill="none" stroke="${palette.line}" stroke-width="2"/>
      <path d="M690 315 C755 170 1010 170 1070 315 C1010 460 755 460 690 315Z" fill="none" stroke="${palette.clay}" stroke-width="3" opacity="0.65"/>
      <circle cx="880" cy="315" r="18" fill="${palette.ink}"/>
      <circle cx="715" cy="315" r="10" fill="${palette.ink}"/>
      <circle cx="1045" cy="315" r="10" fill="${palette.ink}"/>
    `;
  }

  if (pattern === "grid") {
    return `
      <path d="M670 170 H1100 M670 250 H1100 M670 330 H1100 M670 410 H1100 M720 130 V460 M820 130 V460 M920 130 V460 M1020 130 V460" stroke="${palette.line}" stroke-width="2"/>
      <rect x="740" y="210" width="140" height="120" fill="${accent}" opacity="0.12" stroke="${accent}" stroke-width="2"/>
      <rect x="920" y="290" width="110" height="90" fill="${palette.clay}" opacity="0.18" stroke="${palette.clay}" stroke-width="2"/>
      <circle cx="740" cy="410" r="14" fill="${palette.ink}"/>
      <circle cx="1035" cy="185" r="14" fill="${palette.ink}"/>
    `;
  }

  if (pattern === "pulse") {
    return `
      <path d="M660 340 C730 220 790 465 850 320 S975 180 1090 300" fill="none" stroke="${accent}" stroke-width="4"/>
      <path d="M660 390 C760 300 830 455 920 345 S1020 300 1090 365" fill="none" stroke="${palette.line}" stroke-width="3"/>
      <circle cx="735" cy="300" r="13" fill="${palette.ink}"/>
      <circle cx="850" cy="320" r="13" fill="${palette.ink}"/>
      <circle cx="1018" cy="282" r="13" fill="${palette.ink}"/>
    `;
  }

  if (pattern === "wave") {
    return `
      <path d="M660 260 C730 180 800 340 875 260 S1025 180 1095 260" fill="none" stroke="${accent}" stroke-width="4"/>
      <path d="M660 340 C730 260 800 420 875 340 S1025 260 1095 340" fill="none" stroke="${palette.clay}" stroke-width="3" opacity="0.75"/>
      <path d="M660 420 C730 340 800 500 875 420 S1025 340 1095 420" fill="none" stroke="${palette.line}" stroke-width="3"/>
    `;
  }

  return `
    <circle cx="880" cy="315" r="150" fill="none" stroke="${palette.line}" stroke-width="2"/>
    <path d="M880 455 C775 385 790 235 880 180 C970 235 985 385 880 455Z" fill="${accent}" opacity="0.12" stroke="${accent}" stroke-width="3"/>
    <path d="M880 455 V180" stroke="${palette.ink}" stroke-width="2"/>
    <circle cx="880" cy="315" r="16" fill="${palette.ink}"/>
    <circle cx="805" cy="370" r="8" fill="${palette.ink}"/>
    <circle cx="955" cy="370" r="8" fill="${palette.ink}"/>
  `;
}

function thumbnailSvg(entry: Entry) {
  const title = String(entry.data.title ?? "Mustard Seed Group");
  const category = String(entry.data.category ?? "Founder letter");
  const summary = String(entry.data.summary ?? "Public update from Mustard Seed Group.");
  const { accent, label, pattern } = categoryTone(category);
  const { month, year } = dateParts(String(entry.data.date ?? ""));
  const titleLines = wrapWords(title.replace(/^\w+ \d{4}: /, ""), 18, 4);
  const summaryLine = wrapWords(summary.replace(/^A historical MSG archive draft on /, ""), 48, 2)[0] ?? "";

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-labelledby="title desc">
  <title id="title">${xmlEscape(title)}</title>
  <desc id="desc">${xmlEscape(summary)}</desc>
  <rect width="1200" height="630" fill="${palette.background}"/>
  <rect x="36" y="36" width="1128" height="558" fill="${palette.paper}" stroke="${palette.ink}" stroke-width="2"/>
  <rect x="72" y="76" width="170" height="46" fill="${accent}" opacity="0.18" stroke="${accent}" stroke-width="1"/>
  <text x="96" y="106" font-family="Arial, Helvetica, sans-serif" font-size="17" font-weight="700" letter-spacing="4" fill="${palette.ink}">${xmlEscape(label.toUpperCase())}</text>
  <text x="72" y="180" font-family="Georgia, 'Times New Roman', serif" font-size="34" fill="${palette.muted}">${xmlEscape(month)} ${xmlEscape(year)}</text>
  ${titleLines.map((line, index) => `<text x="72" y="${260 + index * 64}" font-family="Georgia, 'Times New Roman', serif" font-size="58" font-weight="500" fill="${palette.ink}">${xmlEscape(line)}</text>`).join("\n  ")}
  <text x="72" y="535" font-family="Arial, Helvetica, sans-serif" font-size="22" fill="${palette.muted}">${xmlEscape(summaryLine)}</text>
  ${patternSvg(pattern, accent)}
  <line x1="624" y1="94" x2="624" y2="536" stroke="${palette.line}" stroke-width="1"/>
  <rect x="868" y="498" width="86" height="58" fill="${palette.paper}" stroke="${palette.line}" stroke-width="2"/>
  <text x="889" y="535" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="700" fill="${palette.clay}">MS</text>
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
for (const entry of readEntries()) {
  const slug = slugify(String(entry.data.slug ?? path.basename(entry.file, ".mdx")));
  const imageName = `${slug}.svg`;
  const imagePath = path.join(imageDir, imageName);
  const publicPath = `${publicPrefix}/${imageName}`;

  fs.writeFileSync(imagePath, thumbnailSvg(entry));

  const nextData = { ...entry.data, thumbnail: publicPath };
  const nextRaw = matter.stringify(entry.content.trimStart(), nextData);
  fs.writeFileSync(entry.file, nextRaw);
  written += 1;
}

console.log(`Generated ${written} update thumbnails in ${imageDir}`);

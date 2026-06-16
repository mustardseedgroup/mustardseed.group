import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

type Entry = {
  file: string;
  data: Record<string, unknown>;
  content: string;
};

type Direction = {
  motif: string;
  accent: string;
  secondary: string;
  bg: string;
  surface: "paper" | "night" | "colour" | "grid";
};

const blogDir = path.join(process.cwd(), "content", "blog");
const imageDir = path.join(process.cwd(), "public", "images", "updates");
const publicPrefix = "/images/updates";

const c = {
  paper: "#fbfaf7",
  cream: "#e8e6df",
  ink: "#0b0b09",
  graphite: "#2c2b27",
  line: "#c8c3b7",
  clay: "#c69386",
  blue: "#3977ff",
  cyan: "#6fd3ff",
  violet: "#8a63ff",
  pink: "#ef5da8",
  red: "#ff4f64",
  amber: "#f2b84b",
  green: "#7ccf78",
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

function hash(input: string) {
  let value = 2166136261;
  for (const char of input) {
    value ^= char.charCodeAt(0);
    value = Math.imul(value, 16777619);
  }
  return value >>> 0;
}

function directionFor(slug: string, title: string, category: string): Direction {
  const haystack = `${slug} ${title} ${category}`.toLowerCase();

  if (/alphago|machine-learning/.test(haystack)) return { motif: "go-board", accent: c.ink, secondary: c.green, bg: "#f2efe6", surface: "paper" };
  if (/transformer|language-model|gpt|chatgpt|model|llm|ai-capability/.test(haystack)) return { motif: "model-field", accent: c.blue, secondary: c.pink, bg: "#e7ecff", surface: "colour" };
  if (/codex|code|automation|writing/.test(haystack)) return { motif: "code-surface", accent: c.violet, secondary: c.green, bg: "#e9e6ff", surface: "night" };
  if (/memory|context/.test(haystack)) return { motif: "memory-map", accent: c.blue, secondary: c.amber, bg: "#e7f0f4", surface: "grid" };
  if (/agent|orion|control-plane|gui-control|interface-control/.test(haystack)) return { motif: "agent-control", accent: c.blue, secondary: c.red, bg: "#edf0f6", surface: "night" };
  if (/orbit|crm|business-operating|execution-infrastructure|commercial-execution/.test(haystack)) return { motif: "operating-console", accent: c.ink, secondary: c.blue, bg: "#ece9df", surface: "paper" };
  if (/tuxx|client|delivery|services|pattern-up|field-proof/.test(haystack)) return { motif: "delivery-room", accent: c.clay, secondary: c.blue, bg: "#f0e6df", surface: "paper" };
  if (/cheekygains|naira|performance|fitness|habits|standards|motivation/.test(haystack)) return { motif: "performance-system", accent: c.red, secondary: c.green, bg: "#fff0e8", surface: "colour" };
  if (/all-purpose|culture|music|media|creative|relay|horizon|made-it-out/.test(haystack)) return { motif: "culture-stack", accent: c.pink, secondary: c.violet, bg: "#f6e7ff", surface: "colour" };
  if (/github|public|documentation|surface|private|openclaw|organisation/.test(haystack)) return { motif: "public-boundary", accent: c.ink, secondary: c.amber, bg: "#f4f0e8", surface: "paper" };
  if (/research|lab|productising/.test(haystack)) return { motif: "research-table", accent: c.clay, secondary: c.blue, bg: "#eee9df", surface: "grid" };
  if (/remote|uncertainty|resilience|pressure|pandemic/.test(haystack)) return { motif: "distributed-work", accent: c.amber, secondary: c.blue, bg: "#f4edde", surface: "paper" };
  if (/portfolio|holding|institution|thesis|mustard|seed/.test(haystack)) return { motif: "institution-map", accent: c.clay, secondary: c.ink, bg: "#e8e6df", surface: "paper" };
  if (/tools|systems|workflow|operating/.test(haystack)) return { motif: "systems-bench", accent: c.ink, secondary: c.green, bg: "#edf2e6", surface: "grid" };

  return { motif: "institution-map", accent: category === "Culture" ? c.pink : c.clay, secondary: c.blue, bg: "#e8e6df", surface: "paper" };
}

function variant(seed: number, count: number) {
  return seed % count;
}

function grain(seed: number) {
  const opacity = 0.045 + ((seed % 4) * 0.012);
  return `
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="${0.74 + (seed % 10) / 100}" numOctaves="3" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer><feFuncA type="table" tableValues="0 ${opacity}"/></feComponentTransfer>
    </filter>`;
}

function defs(direction: Direction, seed: number) {
  const glowX = 25 + (seed % 50);
  const glowY = 20 + ((seed >> 3) % 60);
  return `
  <defs>
    <radialGradient id="glow" cx="${glowX}%" cy="${glowY}%" r="80%">
      <stop offset="0%" stop-color="${direction.secondary}" stop-opacity="0.42"/>
      <stop offset="48%" stop-color="${direction.bg}" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="${direction.bg}"/>
    </radialGradient>
    <linearGradient id="panel" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.88"/>
      <stop offset="100%" stop-color="#fbfaf7" stop-opacity="0.64"/>
    </linearGradient>
    <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="28" stdDeviation="30" flood-color="#0b0b09" flood-opacity="0.17"/>
    </filter>
    ${grain(seed)}
  </defs>`;
}

function surface(direction: Direction, seed: number) {
  if (direction.surface === "night") {
    return `
      <rect width="1200" height="630" fill="#0b0b09"/>
      <rect width="1200" height="630" fill="url(#glow)" opacity="0.42"/>
      <rect width="1200" height="630" filter="url(#grain)" opacity="0.7"/>`;
  }

  if (direction.surface === "colour") {
    return `
      <rect width="1200" height="630" fill="${direction.bg}"/>
      <circle cx="${190 + (seed % 240)}" cy="${110 + ((seed >> 4) % 220)}" r="360" fill="${direction.secondary}" opacity="0.42"/>
      <circle cx="${720 + ((seed >> 6) % 290)}" cy="${330 + ((seed >> 8) % 190)}" r="330" fill="${direction.accent}" opacity="0.26"/>
      <rect width="1200" height="630" fill="url(#glow)" opacity="0.54"/>
      <rect width="1200" height="630" filter="url(#grain)" opacity="0.8"/>`;
  }

  if (direction.surface === "grid") {
    const step = 52 + (seed % 18);
    return `
      <rect width="1200" height="630" fill="${direction.bg}"/>
      <path d="${Array.from({ length: Math.ceil(1200 / step) }, (_, i) => `M${i * step} 0V630`).join(" ")} ${Array.from({ length: Math.ceil(630 / step) }, (_, i) => `M0 ${i * step}H1200`).join(" ")}" stroke="${c.line}" stroke-width="1" opacity="0.46"/>
      <rect width="1200" height="630" fill="url(#glow)" opacity="0.56"/>
      <rect width="1200" height="630" filter="url(#grain)" opacity="0.75"/>`;
  }

  return `
    <rect width="1200" height="630" fill="${direction.bg}"/>
    <rect width="1200" height="630" fill="url(#glow)" opacity="0.74"/>
    <rect width="1200" height="630" filter="url(#grain)" opacity="0.66"/>`;
}

function mark(direction: Direction) {
  return `
    <g transform="translate(990 486)">
      <rect width="110" height="74" rx="0" fill="${c.paper}" stroke="${c.line}" stroke-width="2"/>
      <text x="22" y="48" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="800" fill="${direction.accent}">MSG</text>
    </g>`;
}

function codeSurface(direction: Direction, seed: number) {
  const mode = variant(seed, 3);
  if (mode === 1) {
    return `
      <rect x="98" y="82" width="1004" height="466" rx="38" fill="#11110f" filter="url(#shadow)"/>
      <rect x="168" y="132" width="360" height="330" rx="28" fill="${c.paper}" opacity="0.96"/>
      <rect x="574" y="96" width="412" height="260" rx="34" fill="${direction.accent}" opacity="0.92"/>
      <path d="M202 216 H450 M202 276 H382 M202 336 H474" stroke="#11110f" stroke-width="16" stroke-linecap="round" opacity="0.75"/>
      <path d="M636 178 C704 102 808 288 916 176 M636 272 C744 360 820 168 936 286" fill="none" stroke="${c.paper}" stroke-width="9" stroke-linecap="round"/>
      <circle cx="638" cy="440" r="46" fill="${direction.secondary}"/><circle cx="742" cy="440" r="46" fill="${c.paper}"/><circle cx="846" cy="440" r="46" fill="${direction.accent}"/>
    `;
  }
  if (mode === 2) {
    return `
      <rect x="78" y="72" width="1044" height="486" rx="42" fill="url(#glow)" filter="url(#shadow)"/>
      <path d="M172 160 H556 V456 H172Z M644 160 H1028 V456 H644Z" fill="${c.paper}" stroke="${c.line}" stroke-width="3"/>
      ${Array.from({ length: 10 }, (_, i) => `<rect x="${210 + (i % 2) * 460}" y="${206 + Math.floor(i / 2) * 42}" width="${140 + ((seed + i * 53) % 160)}" height="12" rx="6" fill="${i % 3 === 0 ? direction.accent : c.ink}" opacity="${i % 3 === 0 ? 0.9 : 0.36}"/>`).join("")}
      <path d="M552 308 H650 M650 308 L620 278 M650 308 L620 338" stroke="${direction.secondary}" stroke-width="8" fill="none" stroke-linecap="round"/>
    `;
  }
  const lines = Array.from({ length: 7 }, (_, i) => {
    const width = 130 + ((seed + i * 37) % 260);
    const fill = i % 3 === 0 ? direction.secondary : i % 2 ? "#d8d1c6" : direction.accent;
    return `<rect x="166" y="${158 + i * 46}" width="${width}" height="14" rx="7" fill="${fill}" opacity="${i % 3 === 0 ? 0.9 : 0.52}"/>`;
  }).join("");
  return `
    <rect x="110" y="96" width="520" height="428" rx="34" fill="#11110f" filter="url(#shadow)"/>
    <circle cx="156" cy="132" r="9" fill="${c.red}"/><circle cx="184" cy="132" r="9" fill="${c.amber}"/><circle cx="212" cy="132" r="9" fill="${c.green}"/>
    ${lines}
    <rect x="690" y="164" width="340" height="220" rx="28" fill="url(#panel)" stroke="${c.line}"/>
    <path d="M746 274 H898 M898 274 L858 236 M898 274 L858 312" fill="none" stroke="${direction.accent}" stroke-width="10" stroke-linecap="round"/>
  `;
}

function modelField(direction: Direction, seed: number) {
  const mode = variant(seed, 4);
  if (mode === 1) {
    return `
      <rect x="82" y="70" width="1036" height="490" rx="44" fill="url(#glow)" filter="url(#shadow)"/>
      <path d="M120 428 C288 218 402 502 564 256 S862 66 1084 330" fill="none" stroke="${direction.accent}" stroke-width="14" opacity="0.55"/>
      <path d="M168 214 C338 96 420 314 584 226 S836 132 1010 214" fill="none" stroke="${c.paper}" stroke-width="9" opacity="0.76"/>
      ${Array.from({ length: 22 }, (_, i) => `<rect x="${150 + ((seed + i * 67) % 870)}" y="${120 + ((seed >> 3) + i * 47) % 360}" width="${34 + (i % 4) * 28}" height="${18 + (i % 3) * 10}" rx="9" fill="${i % 2 ? c.ink : direction.secondary}" opacity="${0.18 + (i % 5) * 0.13}"/>`).join("")}
    `;
  }
  if (mode === 2) {
    return `
      <rect x="106" y="86" width="988" height="458" rx="36" fill="#101014" filter="url(#shadow)"/>
      ${Array.from({ length: 72 }, (_, i) => `<circle cx="${134 + (i % 12) * 78}" cy="${126 + Math.floor(i / 12) * 72}" r="${5 + ((seed + i) % 15)}" fill="${i % 4 === 0 ? direction.secondary : i % 3 === 0 ? direction.accent : c.paper}" opacity="${0.22 + (i % 6) * 0.09}"/>`).join("")}
      <path d="M208 414 C402 194 564 484 730 260 S938 120 1032 202" stroke="${c.paper}" stroke-width="6" fill="none" opacity="0.72"/>
    `;
  }
  if (mode === 3) {
    return `
      <rect x="76" y="68" width="1048" height="494" rx="0" fill="url(#glow)" filter="url(#shadow)"/>
      <circle cx="314" cy="314" r="138" fill="${c.paper}" opacity="0.86"/>
      <circle cx="608" cy="314" r="138" fill="${direction.accent}" opacity="0.58"/>
      <circle cx="892" cy="314" r="138" fill="${direction.secondary}" opacity="0.62"/>
      <path d="M184 314 H1020 M314 176 V452 M608 176 V452 M892 176 V452" stroke="${c.ink}" stroke-width="3" opacity="0.38"/>
    `;
  }
  const nodes = Array.from({ length: 42 }, (_, i) => {
    const x = 120 + (i % 7) * 70 + ((seed + i) % 16);
    const y = 110 + Math.floor(i / 7) * 70 + ((seed >> 2) % 14);
    const active = (i + seed) % 5 === 0;
    return `<circle cx="${x}" cy="${y}" r="${active ? 16 : 8}" fill="${active ? direction.accent : c.ink}" opacity="${active ? 0.9 : 0.38}"/>`;
  }).join("");
  return `
    <rect x="78" y="68" width="1044" height="494" rx="42" fill="url(#glow)" filter="url(#shadow)"/>
    <path d="M140 420 C280 140 420 520 590 272 S920 96 1070 350" fill="none" stroke="${direction.secondary}" stroke-width="7" opacity="0.78"/>
    <path d="M180 180 C360 350 520 140 720 300 S910 476 1050 180" fill="none" stroke="#ffffff" stroke-width="5" opacity="0.62"/>
    ${nodes}
  `;
}

function goBoard(direction: Direction, seed: number) {
  const mode = variant(seed, 3);
  if (mode === 1) {
    return `
      <rect x="92" y="78" width="1016" height="474" rx="34" fill="${c.paper}" filter="url(#shadow)"/>
      <rect x="150" y="126" width="538" height="360" fill="#d7aa65"/>
      ${Array.from({ length: 8 }, (_, i) => `<path d="M198 ${166 + i * 42} H638 M${198 + i * 58} 166 V460" stroke="#2e2114" stroke-width="2" opacity="0.72"/>`).join("")}
      ${Array.from({ length: 14 }, (_, i) => `<circle cx="${198 + ((seed + i * 13) % 8) * 58}" cy="${166 + ((seed + i * 7) % 8) * 42}" r="20" fill="${i % 2 ? c.paper : c.ink}" stroke="${c.ink}" stroke-width="3"/>`).join("")}
      <path d="M764 190 C886 112 968 204 1030 154 M744 356 C850 248 944 458 1046 330" stroke="${direction.secondary}" stroke-width="9" fill="none"/>
    `;
  }
  if (mode === 2) {
    return `
      <rect x="120" y="74" width="960" height="482" rx="42" fill="#11110f" filter="url(#shadow)"/>
      ${Array.from({ length: 54 }, (_, i) => `<circle cx="${184 + (i % 9) * 92}" cy="${132 + Math.floor(i / 9) * 72}" r="${i % 7 === 0 ? 28 : 9}" fill="${i % 2 ? c.paper : direction.secondary}" opacity="${i % 7 === 0 ? 0.95 : 0.28}"/>`).join("")}
      <path d="M234 460 C432 230 604 520 812 252 S978 166 1042 218" stroke="${c.paper}" stroke-width="5" fill="none" opacity="0.66"/>
    `;
  }
  const stones = Array.from({ length: 18 }, (_, i) => {
    const x = 214 + ((i * 3 + seed) % 9) * 74;
    const y = 104 + ((i * 5 + seed) % 6) * 74;
    return `<circle cx="${x}" cy="${y}" r="24" fill="${i % 2 ? c.paper : c.ink}" stroke="${c.ink}" stroke-width="3"/>`;
  }).join("");
  return `
    <rect x="138" y="70" width="760" height="490" rx="18" fill="#d7aa65" filter="url(#shadow)"/>
    ${Array.from({ length: 9 }, (_, i) => `<path d="M214 ${104 + i * 48} H816 M${214 + i * 74} 104 V512" stroke="#2e2114" stroke-width="2" opacity="0.68"/>`).join("")}
    ${stones}
    <rect x="858" y="130" width="202" height="316" rx="34" fill="url(#panel)" stroke="${c.line}"/>
    <path d="M904 370 C940 304 984 306 1022 240" fill="none" stroke="${direction.secondary}" stroke-width="7"/>
  `;
}

function memoryMap(direction: Direction, seed: number) {
  const mode = variant(seed, 3);
  if (mode === 1) {
    return `
      <rect x="90" y="78" width="1020" height="474" rx="42" fill="${c.paper}" filter="url(#shadow)"/>
      ${Array.from({ length: 16 }, (_, i) => `<circle cx="${168 + ((seed + i * 97) % 850)}" cy="${130 + ((seed >> 4) + i * 61) % 360}" r="${18 + (i % 4) * 12}" fill="${i % 3 === 0 ? direction.accent : i % 3 === 1 ? direction.secondary : c.ink}" opacity="${0.18 + (i % 5) * 0.1}"/>`).join("")}
      <path d="M166 444 C274 312 388 402 504 246 S768 126 1006 218" stroke="${direction.accent}" stroke-width="7" fill="none"/>
      <path d="M210 192 C378 276 496 126 650 232 S850 404 1034 308" stroke="${direction.secondary}" stroke-width="7" fill="none" opacity="0.8"/>
    `;
  }
  if (mode === 2) {
    return `
      <rect x="104" y="92" width="992" height="446" rx="34" fill="#101014" filter="url(#shadow)"/>
      ${Array.from({ length: 12 }, (_, i) => `<rect x="${158 + (i % 4) * 216}" y="${146 + Math.floor(i / 4) * 112}" width="146" height="70" rx="22" fill="${i % 2 ? c.paper : direction.accent}" opacity="${i % 2 ? 0.92 : 0.78}"/>`).join("")}
      <path d="M232 216 C384 330 498 168 648 272 S852 402 984 242" stroke="${direction.secondary}" stroke-width="7" fill="none"/>
    `;
  }
  const cards = Array.from({ length: 9 }, (_, i) => {
    const x = 130 + (i % 3) * 210;
    const y = 116 + Math.floor(i / 3) * 132;
    const fill = i === seed % 9 ? direction.secondary : "url(#panel)";
    return `<rect x="${x}" y="${y}" width="156" height="86" rx="22" fill="${fill}" stroke="${c.line}"/>`;
  }).join("");
  return `
    <rect x="80" y="76" width="1040" height="478" rx="38" fill="url(#glow)"/>
    ${cards}
    <path d="M286 158 C432 92 522 318 650 160 S898 120 1042 300" fill="none" stroke="${direction.accent}" stroke-width="6" opacity="0.76"/>
    <path d="M286 420 C432 350 542 468 706 332 S890 264 1034 412" fill="none" stroke="${c.ink}" stroke-width="4" opacity="0.55"/>
  `;
}

function agentControl(direction: Direction, seed: number) {
  const mode = variant(seed, 3);
  if (mode === 1) {
    return `
      <rect x="82" y="74" width="1036" height="482" rx="44" fill="#101014" filter="url(#shadow)"/>
      <rect x="156" y="132" width="318" height="326" rx="34" fill="${c.paper}"/>
      <rect x="548" y="112" width="474" height="366" rx="38" fill="${direction.accent}" opacity="0.9"/>
      <path d="M216 218 H398 M216 286 H342 M216 354 H424" stroke="#11110f" stroke-width="15" stroke-linecap="round" opacity="0.72"/>
      <path d="M626 292 H936 M936 292 L890 246 M936 292 L890 338" stroke="${c.paper}" stroke-width="12" fill="none" stroke-linecap="round"/>
      <circle cx="626" cy="292" r="38" fill="${direction.secondary}"/>
    `;
  }
  if (mode === 2) {
    return `
      <rect x="108" y="86" width="984" height="458" rx="38" fill="url(#glow)" filter="url(#shadow)"/>
      <circle cx="600" cy="315" r="136" fill="${c.paper}" opacity="0.88"/>
      ${Array.from({ length: 8 }, (_, i) => {
        const angle = (Math.PI * 2 * i) / 8 + (seed % 10) / 20;
        const x = 600 + Math.cos(angle) * 300;
        const y = 315 + Math.sin(angle) * 170;
        return `<path d="M600 315 L${x.toFixed(1)} ${y.toFixed(1)}" stroke="${c.ink}" stroke-width="3" opacity="0.34"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${26 + (i % 3) * 8}" fill="${i % 2 ? direction.accent : direction.secondary}" opacity="0.86"/>`;
      }).join("")}
      <circle cx="600" cy="315" r="42" fill="#11110f"/>
    `;
  }
  return `
    <rect x="104" y="82" width="992" height="466" rx="40" fill="#11110f" filter="url(#shadow)"/>
    <circle cx="600" cy="315" r="90" fill="${c.paper}"/>
    <circle cx="600" cy="315" r="32" fill="${direction.accent}"/>
    <path d="M600 315 H256 M600 315 H944 M600 315 V152 M600 315 V478" stroke="${c.paper}" stroke-width="5" opacity="0.7"/>
    <circle cx="256" cy="315" r="42" fill="${direction.secondary}"/>
    <circle cx="944" cy="315" r="42" fill="${direction.accent}"/>
    <circle cx="600" cy="152" r="32" fill="${c.green}"/>
    <circle cx="600" cy="478" r="32" fill="${c.amber}"/>
    <path d="M380 206 C450 98 754 98 824 206 M382 424 C454 532 746 532 822 424" fill="none" stroke="${direction.secondary}" stroke-width="4" stroke-dasharray="12 18"/>
  `;
}

function operatingConsole(direction: Direction, seed: number) {
  const mode = variant(seed, 3);
  if (mode === 1) {
    return `
      <rect x="86" y="78" width="1028" height="474" rx="40" fill="#11110f" filter="url(#shadow)"/>
      <rect x="146" y="136" width="408" height="300" rx="30" fill="${c.paper}"/>
      <rect x="626" y="136" width="390" height="300" rx="30" fill="${direction.secondary}" opacity="0.92"/>
      ${Array.from({ length: 5 }, (_, i) => `<rect x="190" y="${188 + i * 48}" width="${180 + ((seed + i * 29) % 160)}" height="16" rx="8" fill="${i % 2 ? c.ink : direction.accent}" opacity="${i % 2 ? 0.42 : 0.86}"/>`).join("")}
      <path d="M690 344 C760 228 846 408 956 256" stroke="${c.paper}" stroke-width="10" fill="none"/>
    `;
  }
  if (mode === 2) {
    return `
      <rect x="86" y="78" width="1028" height="474" rx="0" fill="${c.paper}" stroke="${c.line}" filter="url(#shadow)"/>
      <path d="M150 456 H1042" stroke="${c.ink}" stroke-width="5"/>
      ${Array.from({ length: 7 }, (_, i) => `<rect x="${170 + i * 122}" y="${180 + ((seed + i * 17) % 170)}" width="74" height="${88 + ((seed + i * 31) % 170)}" rx="10" fill="${i % 3 === 0 ? direction.secondary : i % 2 ? c.ink : direction.accent}" opacity="${i % 2 ? 0.74 : 0.9}"/>`).join("")}
      <path d="M154 176 C340 116 444 246 602 182 S828 116 1034 188" stroke="${direction.accent}" stroke-width="6" fill="none"/>
    `;
  }
  const rows = Array.from({ length: 6 }, (_, i) => `<rect x="158" y="${146 + i * 58}" width="${320 + ((seed + i * 41) % 260)}" height="22" rx="11" fill="${i % 2 ? c.line : direction.accent}" opacity="${i % 2 ? 0.7 : 0.92}"/>`).join("");
  return `
    <rect x="92" y="82" width="1016" height="466" rx="36" fill="url(#panel)" stroke="${c.line}" filter="url(#shadow)"/>
    <rect x="122" y="112" width="550" height="406" rx="28" fill="${c.paper}" stroke="${c.line}"/>
    ${rows}
    <rect x="724" y="132" width="300" height="300" rx="36" fill="#11110f"/>
    <path d="M780 308 C834 228 906 410 974 272" fill="none" stroke="${direction.secondary}" stroke-width="8"/>
    <circle cx="780" cy="308" r="16" fill="${c.paper}"/><circle cx="974" cy="272" r="16" fill="${direction.accent}"/>
  `;
}

function performanceSystem(direction: Direction, seed: number) {
  const mode = variant(seed, 3);
  if (mode === 1) {
    return `
      <rect x="86" y="74" width="1028" height="482" rx="42" fill="url(#glow)" filter="url(#shadow)"/>
      <circle cx="278" cy="310" r="128" fill="${c.paper}" opacity="0.92"/>
      <circle cx="600" cy="310" r="128" fill="${direction.accent}" opacity="0.72"/>
      <circle cx="920" cy="310" r="128" fill="${direction.secondary}" opacity="0.72"/>
      <path d="M160 410 C278 226 414 454 560 292 S826 184 1038 392" stroke="${c.ink}" stroke-width="8" fill="none" opacity="0.72"/>
      <circle cx="560" cy="292" r="22" fill="${c.paper}"/><circle cx="1038" cy="392" r="22" fill="${c.ink}"/>
    `;
  }
  if (mode === 2) {
    return `
      <rect x="132" y="80" width="360" height="470" rx="52" fill="#11110f" filter="url(#shadow)"/>
      <rect x="178" y="142" width="268" height="334" rx="34" fill="${c.paper}"/>
      ${Array.from({ length: 5 }, (_, i) => `<path d="M590 ${168 + i * 68} C704 ${96 + i * 46} 830 ${252 + i * 32} 1036 ${142 + i * 42}" stroke="${i % 2 ? direction.secondary : direction.accent}" stroke-width="8" fill="none" opacity="${0.45 + i * 0.09}"/>`).join("")}
      <path d="M220 376 C278 268 330 434 404 294" stroke="${direction.accent}" stroke-width="8" fill="none"/>
    `;
  }
  return `
    <rect x="170" y="72" width="300" height="490" rx="48" fill="#11110f" filter="url(#shadow)"/>
    <rect x="204" y="126" width="232" height="362" rx="28" fill="${c.paper}"/>
    <path d="M238 382 C276 282 322 438 362 342 S418 264 440 310" fill="none" stroke="${direction.accent}" stroke-width="8"/>
    <circle cx="302" cy="348" r="14" fill="${c.ink}"/><circle cx="390" cy="316" r="14" fill="${direction.secondary}"/>
    <path d="M600 174 C734 58 900 186 980 98" fill="none" stroke="${direction.secondary}" stroke-width="9" opacity="0.78"/>
    <path d="M570 358 C724 238 886 512 1048 304" fill="none" stroke="${direction.accent}" stroke-width="9" opacity="0.78"/>
    <circle cx="640" cy="360" r="34" fill="${c.ink}"/><circle cx="828" cy="412" r="34" fill="${c.paper}" stroke="${c.ink}" stroke-width="4"/>
  `;
}

function cultureStack(direction: Direction, seed: number) {
  const mode = variant(seed, 3);
  if (mode === 1) {
    return `
      <rect x="74" y="74" width="1052" height="482" rx="44" fill="url(#glow)" filter="url(#shadow)"/>
      <rect x="180" y="130" width="278" height="352" rx="48" fill="${c.paper}" opacity="0.92"/>
      <circle cx="314" cy="306" r="84" fill="${direction.accent}" opacity="0.88"/>
      <rect x="532" y="168" width="470" height="86" rx="43" fill="#11110f" opacity="0.9"/>
      <rect x="532" y="292" width="360" height="86" rx="43" fill="${direction.secondary}" opacity="0.82"/>
      <rect x="532" y="416" width="430" height="46" rx="23" fill="${c.paper}" opacity="0.82"/>
    `;
  }
  if (mode === 2) {
    return `
      <rect x="90" y="80" width="1020" height="470" rx="38" fill="#11110f" filter="url(#shadow)"/>
      <circle cx="256" cy="216" r="110" fill="${direction.secondary}"/>
      <circle cx="458" cy="412" r="136" fill="${direction.accent}" opacity="0.9"/>
      <rect x="672" y="142" width="310" height="344" rx="42" fill="${c.paper}"/>
      <path d="M718 364 C798 284 864 430 946 324" stroke="${direction.accent}" stroke-width="10" fill="none"/>
    `;
  }
  return `
    <rect x="72" y="72" width="1056" height="486" rx="42" fill="url(#glow)"/>
    <circle cx="246" cy="230" r="108" fill="${direction.accent}" opacity="0.84"/>
    <rect x="470" y="118" width="212" height="284" rx="36" fill="${c.paper}" stroke="${c.line}" filter="url(#shadow)"/>
    <rect x="720" y="214" width="280" height="194" rx="40" fill="#11110f" filter="url(#shadow)"/>
    <path d="M150 442 C276 314 390 512 520 402 S750 312 990 468" fill="none" stroke="${direction.secondary}" stroke-width="12" opacity="0.84"/>
    <circle cx="872" cy="308" r="48" fill="${c.paper}"/><path d="M856 286 V334 L900 310Z" fill="${direction.accent}"/>
  `;
}

function publicBoundary(direction: Direction, seed: number) {
  const mode = variant(seed, 3);
  if (mode === 1) {
    return `
      <rect x="82" y="74" width="1036" height="482" rx="40" fill="${c.paper}" filter="url(#shadow)"/>
      <path d="M236 116 V514 M600 116 V514 M964 116 V514" stroke="${c.line}" stroke-width="4"/>
      <rect x="150" y="170" width="274" height="250" rx="30" fill="#11110f"/>
      <rect x="776" y="170" width="274" height="250" rx="30" fill="${direction.secondary}" opacity="0.9"/>
      <circle cx="600" cy="296" r="74" fill="${c.paper}" stroke="${c.ink}" stroke-width="7"/>
      <path d="M546 296 H654" stroke="${direction.accent}" stroke-width="9" stroke-linecap="round"/>
    `;
  }
  if (mode === 2) {
    return `
      <rect x="116" y="94" width="968" height="442" rx="34" fill="#11110f" filter="url(#shadow)"/>
      <rect x="188" y="154" width="318" height="322" rx="32" fill="${c.paper}"/>
      <path d="M600 128 V502" stroke="${c.paper}" stroke-width="5" stroke-dasharray="18 18" opacity="0.66"/>
      <circle cx="792" cy="314" r="128" fill="${direction.secondary}" opacity="0.88"/>
      <circle cx="914" cy="314" r="58" fill="${direction.accent}" opacity="0.94"/>
      <path d="M240 258 H430 M240 326 H374" stroke="${c.ink}" stroke-width="14" stroke-linecap="round" opacity="0.66"/>
    `;
  }
  return `
    <rect x="110" y="94" width="980" height="442" rx="34" fill="${c.paper}" stroke="${c.line}" filter="url(#shadow)"/>
    <rect x="166" y="150" width="332" height="276" rx="30" fill="#11110f"/>
    <rect x="704" y="150" width="332" height="276" rx="30" fill="${direction.secondary}" opacity="0.9"/>
    <path d="M600 118 V512" stroke="${c.ink}" stroke-width="6" stroke-dasharray="16 20"/>
    <path d="M236 284 H428 M776 284 H968" stroke="${c.paper}" stroke-width="10" stroke-linecap="round"/>
    <circle cx="600" cy="314" r="54" fill="${c.paper}" stroke="${c.ink}" stroke-width="6"/>
  `;
}

function researchTable(direction: Direction, seed: number) {
  const mode = variant(seed, 3);
  if (mode === 1) {
    return `
      <rect x="96" y="90" width="1008" height="450" rx="38" fill="${c.paper}" filter="url(#shadow)"/>
      <path d="M158 420 H1046" stroke="${c.ink}" stroke-width="5"/>
      <circle cx="294" cy="254" r="78" fill="none" stroke="${direction.accent}" stroke-width="8"/>
      <circle cx="514" cy="254" r="78" fill="none" stroke="${direction.secondary}" stroke-width="8"/>
      <circle cx="734" cy="254" r="78" fill="none" stroke="${c.ink}" stroke-width="8" opacity="0.42"/>
      <path d="M860 184 H1012 M860 246 H964 M860 308 H1028" stroke="${c.ink}" stroke-width="14" stroke-linecap="round" opacity="0.54"/>
    `;
  }
  if (mode === 2) {
    return `
      <rect x="112" y="86" width="976" height="458" rx="0" fill="url(#glow)" filter="url(#shadow)"/>
      <path d="M202 456 C350 218 490 506 650 266 S888 100 1012 238" stroke="${direction.accent}" stroke-width="8" fill="none"/>
      ${Array.from({ length: 10 }, (_, i) => `<rect x="${174 + (i % 5) * 168}" y="${152 + Math.floor(i / 5) * 160}" width="108" height="82" rx="20" fill="${i % 2 ? c.paper : direction.secondary}" opacity="${i % 2 ? 0.9 : 0.76}"/>`).join("")}
    `;
  }
  return `
    <rect x="132" y="134" width="936" height="312" rx="36" fill="url(#panel)" stroke="${c.line}" filter="url(#shadow)"/>
    <circle cx="308" cy="290" r="92" fill="none" stroke="${direction.accent}" stroke-width="8"/>
    <path d="M258 290 H358 M308 240 V340" stroke="${direction.secondary}" stroke-width="7"/>
    <rect x="500" y="210" width="420" height="28" rx="14" fill="${c.ink}" opacity="0.82"/>
    <rect x="500" y="278" width="300" height="28" rx="14" fill="${direction.accent}" opacity="0.82"/>
    <rect x="500" y="346" width="360" height="28" rx="14" fill="${direction.secondary}" opacity="0.82"/>
  `;
}

function institutionMap(direction: Direction, seed: number) {
  const mode = variant(seed, 4);
  if (mode === 1) {
    return `
      <rect x="84" y="70" width="1032" height="490" rx="44" fill="url(#glow)" filter="url(#shadow)"/>
      <circle cx="600" cy="315" r="54" fill="${c.paper}" stroke="${direction.accent}" stroke-width="8"/>
      ${Array.from({ length: 10 }, (_, i) => {
        const angle = (Math.PI * 2 * i) / 10;
        const radius = i % 2 ? 210 : 296;
        const x = 600 + Math.cos(angle) * radius;
        const y = 315 + Math.sin(angle) * radius * 0.62;
        return `<path d="M600 315 L${x.toFixed(1)} ${y.toFixed(1)}" stroke="${c.ink}" stroke-width="2" opacity="0.24"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${24 + (i % 4) * 8}" fill="${i % 3 === 0 ? direction.accent : i % 3 === 1 ? direction.secondary : c.ink}" opacity="0.88"/>`;
      }).join("")}
    `;
  }
  if (mode === 2) {
    return `
      <rect x="118" y="86" width="964" height="458" rx="0" fill="${c.paper}" stroke="${c.line}" filter="url(#shadow)"/>
      <path d="M600 128 V502 M236 315 H964" stroke="${c.ink}" stroke-width="4" opacity="0.42"/>
      <rect x="236" y="164" width="180" height="112" rx="0" fill="${direction.accent}" opacity="0.78"/>
      <rect x="784" y="164" width="180" height="112" rx="0" fill="${direction.secondary}" opacity="0.78"/>
      <rect x="236" y="354" width="180" height="112" rx="0" fill="#11110f" opacity="0.9"/>
      <rect x="784" y="354" width="180" height="112" rx="0" fill="${c.paper}" stroke="${c.ink}" stroke-width="4"/>
      <circle cx="600" cy="315" r="74" fill="${c.paper}" stroke="${direction.accent}" stroke-width="6"/>
    `;
  }
  if (mode === 3) {
    return `
      <rect x="80" y="72" width="1040" height="486" rx="42" fill="#11110f" filter="url(#shadow)"/>
      <path d="M180 460 C320 214 462 454 600 250 S842 174 1020 396" stroke="${direction.secondary}" stroke-width="8" fill="none"/>
      <circle cx="260" cy="246" r="74" fill="${direction.accent}"/><circle cx="600" cy="250" r="94" fill="${c.paper}"/><circle cx="940" cy="382" r="74" fill="${direction.secondary}"/>
      <path d="M260 246 H600 H940" stroke="${c.paper}" stroke-width="4" opacity="0.42"/>
    `;
  }
  return `
    <rect x="88" y="72" width="1024" height="486" rx="0" fill="${c.paper}" stroke="${c.line}" filter="url(#shadow)"/>
    <circle cx="600" cy="315" r="76" fill="${direction.accent}" opacity="0.2" stroke="${direction.accent}" stroke-width="5"/>
    <circle cx="260" cy="190" r="54" fill="${c.ink}"/>
    <circle cx="940" cy="190" r="54" fill="${direction.secondary}"/>
    <circle cx="260" cy="440" r="54" fill="${direction.accent}"/>
    <circle cx="940" cy="440" r="54" fill="${c.paper}" stroke="${c.ink}" stroke-width="5"/>
    <path d="M314 198 C434 120 512 210 546 272 M886 198 C764 120 686 210 654 272 M314 432 C432 512 512 420 546 358 M886 432 C764 512 686 420 654 358" fill="none" stroke="${c.ink}" stroke-width="5" opacity="0.72"/>
    <path d="M600 234 V396" stroke="${direction.secondary}" stroke-width="4"/>
  `;
}

function distributedWork(direction: Direction, seed: number) {
  const mode = variant(seed, 3);
  if (mode === 1) {
    return `
      <rect x="80" y="70" width="1040" height="490" rx="42" fill="url(#glow)" filter="url(#shadow)"/>
      ${Array.from({ length: 6 }, (_, i) => `<rect x="${132 + (i % 3) * 330}" y="${132 + Math.floor(i / 3) * 190}" width="236" height="132" rx="30" fill="${i % 2 ? c.paper : '#11110f'}" opacity="${i % 2 ? 0.92 : 0.9}"/>`).join("")}
      <path d="M250 264 C390 112 502 420 650 286 S860 152 994 324" stroke="${direction.accent}" stroke-width="8" fill="none"/>
    `;
  }
  if (mode === 2) {
    return `
      <rect x="108" y="92" width="984" height="446" rx="36" fill="${c.paper}" filter="url(#shadow)"/>
      <path d="M180 414 H1026" stroke="${c.ink}" stroke-width="5"/>
      ${Array.from({ length: 9 }, (_, i) => `<circle cx="${210 + i * 96}" cy="${220 + ((seed + i * 29) % 180)}" r="${24 + (i % 3) * 12}" fill="${i % 3 === 0 ? direction.accent : i % 3 === 1 ? direction.secondary : c.ink}" opacity="0.84"/>`).join("")}
      <path d="M210 400 C334 236 450 452 578 286 S802 196 978 346" stroke="${direction.accent}" stroke-width="7" fill="none" opacity="0.76"/>
    `;
  }
  return `
    <rect x="110" y="104" width="300" height="206" rx="30" fill="${c.paper}" stroke="${c.line}" filter="url(#shadow)"/>
    <rect x="454" y="244" width="300" height="206" rx="30" fill="#11110f" filter="url(#shadow)"/>
    <rect x="798" y="126" width="300" height="206" rx="30" fill="${direction.secondary}" filter="url(#shadow)"/>
    <path d="M260 310 C400 400 460 274 604 346 S864 400 948 332" fill="none" stroke="${direction.accent}" stroke-width="8"/>
    <circle cx="260" cy="310" r="18" fill="${direction.accent}"/><circle cx="604" cy="346" r="18" fill="${c.paper}"/><circle cx="948" cy="332" r="18" fill="${c.ink}"/>
  `;
}

function systemsBench(direction: Direction, seed: number) {
  const mode = variant(seed, 3);
  if (mode === 1) {
    return `
      <rect x="90" y="82" width="1020" height="466" rx="38" fill="#11110f" filter="url(#shadow)"/>
      ${Array.from({ length: 4 }, (_, i) => `<rect x="${158 + i * 230}" y="${142 + ((seed + i * 37) % 120)}" width="150" height="${174 + ((seed + i * 43) % 120)}" rx="28" fill="${i % 2 ? direction.secondary : c.paper}" opacity="${i % 2 ? 0.86 : 0.94}"/>`).join("")}
      <path d="M164 454 H1038" stroke="${c.paper}" stroke-width="5" opacity="0.56"/>
      <path d="M208 190 C404 110 514 272 686 176 S890 132 1010 222" stroke="${direction.accent}" stroke-width="7" fill="none"/>
    `;
  }
  if (mode === 2) {
    return `
      <rect x="96" y="90" width="1008" height="450" rx="0" fill="${c.paper}" stroke="${c.line}" filter="url(#shadow)"/>
      <path d="M164 168 H1036 M164 462 H1036" stroke="${c.ink}" stroke-width="4"/>
      ${Array.from({ length: 24 }, (_, i) => `<rect x="${178 + (i % 8) * 106}" y="${216 + Math.floor(i / 8) * 66}" width="64" height="38" rx="10" fill="${i % 4 === 0 ? direction.accent : i % 3 === 0 ? direction.secondary : c.line}" opacity="${i % 3 === 0 ? 0.9 : 0.62}"/>`).join("")}
    `;
  }
  return `
    <rect x="94" y="94" width="1012" height="442" rx="36" fill="url(#panel)" stroke="${c.line}" filter="url(#shadow)"/>
    ${Array.from({ length: 5 }, (_, i) => `<rect x="${160 + i * 178}" y="${180 + ((seed + i * 11) % 110)}" width="112" height="${130 + ((seed + i * 17) % 120)}" rx="20" fill="${i % 2 ? direction.secondary : direction.accent}" opacity="${i % 2 ? 0.72 : 0.9}"/>`).join("")}
    <path d="M144 470 H1058" stroke="${c.ink}" stroke-width="6"/>
    <path d="M210 148 C360 80 500 154 618 124 S860 68 1010 150" fill="none" stroke="${c.ink}" stroke-width="4" opacity="0.46"/>
  `;
}

function visual(direction: Direction, seed: number) {
  switch (direction.motif) {
    case "go-board":
      return goBoard(direction, seed);
    case "model-field":
      return modelField(direction, seed);
    case "code-surface":
      return codeSurface(direction, seed);
    case "memory-map":
      return memoryMap(direction, seed);
    case "agent-control":
      return agentControl(direction, seed);
    case "operating-console":
      return operatingConsole(direction, seed);
    case "delivery-room":
      return distributedWork(direction, seed);
    case "performance-system":
      return performanceSystem(direction, seed);
    case "culture-stack":
      return cultureStack(direction, seed);
    case "public-boundary":
      return publicBoundary(direction, seed);
    case "research-table":
      return researchTable(direction, seed);
    case "distributed-work":
      return distributedWork(direction, seed);
    case "systems-bench":
      return systemsBench(direction, seed);
    default:
      return institutionMap(direction, seed);
  }
}

function thumbnailSvg(entry: Entry) {
  const slug = slugify(String(entry.data.slug ?? path.basename(entry.file, ".mdx")));
  const title = String(entry.data.title ?? "Mustard Seed Group");
  const category = String(entry.data.category ?? "Founder letter");
  const summary = String(entry.data.summary ?? "Public update from Mustard Seed Group.");
  const seed = hash(`${slug}:${title}`);
  const direction = directionFor(slug, title, category);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-labelledby="title desc">
  <title id="title">${xmlEscape(title)}</title>
  <desc id="desc">${xmlEscape(summary)}</desc>
  ${defs(direction, seed)}
  ${surface(direction, seed)}
  ${visual(direction, seed)}
  ${mark(direction)}
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

console.log(`Generated ${written} article-specific image-led thumbnails. Preserved ${preserved} bespoke editorial PNG thumbnails.`);

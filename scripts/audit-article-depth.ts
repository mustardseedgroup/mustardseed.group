import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const blogDir = path.join(process.cwd(), "content", "blog");
const minWords = 1230;
const maxWords = 3000;

function wordCount(input: string) {
  return input
    .replace(/^---[\s\S]*?---/, "")
    .replace(/!\[.*?]\(.*?\)/g, "")
    .replace(/::youtube\[.*?]\(.*?\)/g, "")
    .split(/\s+/)
    .filter(Boolean).length;
}

const reports = fs
  .readdirSync(blogDir)
  .filter((file) => file.endsWith(".mdx"))
  .map((file) => {
    const fullPath = path.join(blogDir, file);
    const raw = fs.readFileSync(fullPath, "utf8");
    const parsed = matter(raw);
    const words = wordCount(parsed.content);
    const status = words < minWords ? "short" : words > maxWords ? "long" : "ok";

    return {
      file,
      title: String(parsed.data.title ?? file),
      words,
      status,
    };
  })
  .sort((a, b) => a.words - b.words);

const failing = reports.filter((report) => report.status !== "ok");
const passing = reports.length - failing.length;

console.log(`Article depth audit: ${passing}/${reports.length} articles in range (${minWords}-${maxWords} words).`);

for (const report of failing.slice(0, 80)) {
  console.log(`${report.status.padEnd(5)} ${String(report.words).padStart(4)} ${report.file} - ${report.title}`);
}

if (failing.length > 80) {
  console.log(`...and ${failing.length - 80} more.`);
}

if (failing.length > 0) {
  process.exitCode = 1;
}

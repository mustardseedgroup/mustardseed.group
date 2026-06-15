import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import YAML from "yaml";
import { z } from "zod";
import { writeDraft, type PublicUpdate } from "./generate-blog-draft";
import { safetyCheck } from "./safety-check";

const updateSchema = z.object({
  project: z.string().min(1),
  product: z.string().min(1),
  date: z.string().min(1),
  type: z.enum(["feature", "research", "release", "case-study", "experiment", "maintenance"]),
  title: z.string().min(1),
  summary: z.string().min(1),
  public_points: z.array(z.string()).optional(),
  screenshots: z.array(z.string()).optional(),
  links: z.array(z.string()).optional(),
  safe_to_publish: z.boolean(),
  approved_by: z.string().optional(),
  private_notes_do_not_publish: z.string().optional(),
});

type SourceConfig = {
  sources: {
    repo: string;
    enabled: boolean;
    allowedTypes: PublicUpdate["type"][];
  }[];
};

type ReportItem = {
  source: string;
  status: "created" | "ignored" | "warning";
  reason?: string;
  draft?: string;
};

const dryRun = process.argv.includes("--dry-run") || process.env.DRY_RUN === "true";
const sourceDir = process.env.PUBLIC_UPDATE_SOURCE_DIR ?? "public-updates";
const reportPath = path.join("content-drafts-safety-report.md");
const remoteDir = path.join(".tmp", "public-updates");

function loadConfig(): SourceConfig {
  return JSON.parse(fs.readFileSync("content-sources.config.json", "utf8")) as SourceConfig;
}

function findUpdateFiles(dir: string) {
  if (!fs.existsSync(dir)) return [];
  const files: string[] = [];
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) files.push(...findUpdateFiles(fullPath));
    if (item.isFile() && item.name.endsWith("-public-update.yml")) files.push(fullPath);
  }
  return files;
}

function ghApi(args: string[]) {
  return execFileSync("gh", ["api", ...args], {
    encoding: "utf8",
    env: {
      ...process.env,
      GH_TOKEN: process.env.SOURCE_REPO_TOKEN ?? process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN,
    },
  });
}

function collectRemoteUpdateFiles(config: SourceConfig) {
  if (!process.env.SOURCE_REPO_TOKEN && !process.env.GITHUB_TOKEN && !process.env.GH_TOKEN) {
    return;
  }

  fs.mkdirSync(remoteDir, { recursive: true });
  for (const source of config.sources.filter((item) => item.enabled)) {
    try {
      const tree = JSON.parse(ghApi([`repos/${source.repo}/git/trees/HEAD?recursive=1`])) as {
        tree?: { path: string; type: string }[];
      };
      const updateFiles = (tree.tree ?? []).filter(
        (item) => item.type === "blob" && item.path.endsWith("-public-update.yml"),
      );

      for (const file of updateFiles) {
        const content = JSON.parse(ghApi([`repos/${source.repo}/contents/${file.path}`])) as {
          content?: string;
          encoding?: string;
        };
        if (!content.content || content.encoding !== "base64") continue;

        const targetDir = path.join(remoteDir, source.repo.replace("/", "__"));
        fs.mkdirSync(targetDir, { recursive: true });
        const decoded = Buffer.from(content.content, "base64").toString("utf8");
        const withSource = `source_repo: ${source.repo}\n${decoded}`;
        fs.writeFileSync(path.join(targetDir, path.basename(file.path)), withSource, "utf8");
      }
    } catch (error) {
      const targetDir = path.join(remoteDir, source.repo.replace("/", "__"));
      fs.mkdirSync(targetDir, { recursive: true });
      fs.writeFileSync(
        path.join(targetDir, "source-warning.txt"),
        `Failed to collect updates from ${source.repo}: ${String(error)}\n`,
        "utf8",
      );
    }
  }
}

function writeReport(items: ReportItem[]) {
  const lines = ["# Content Draft Safety Report", "", `Dry run: \`${dryRun}\``, ""];
  for (const item of items) {
    lines.push(`- \`${item.status}\` ${item.source}${item.reason ? ` — ${item.reason}` : ""}${item.draft ? ` — ${item.draft}` : ""}`);
  }
  fs.writeFileSync(reportPath, `${lines.join("\n")}\n`, "utf8");
}

function main() {
  const config = loadConfig();
  collectRemoteUpdateFiles(config);
  const enabledSources = new Map(config.sources.filter((source) => source.enabled).map((source) => [source.repo, source]));
  const files = [...findUpdateFiles(sourceDir), ...findUpdateFiles(remoteDir)];
  const report: ReportItem[] = [];

  for (const file of files) {
    const raw = YAML.parse(fs.readFileSync(file, "utf8"));
    const parsed = updateSchema.safeParse(raw);
    if (!parsed.success) {
      report.push({ source: file, status: "warning", reason: "Invalid update schema." });
      continue;
    }

    const update = parsed.data;
    const sourceRepo = raw.source_repo as string | undefined;
    const sourceConfig = sourceRepo ? enabledSources.get(sourceRepo) : undefined;

    if (sourceRepo && !sourceConfig) {
      report.push({ source: file, status: "ignored", reason: "Source repo is not enabled." });
      continue;
    }

    if (sourceConfig && !sourceConfig.allowedTypes.includes(update.type)) {
      report.push({ source: file, status: "ignored", reason: "Update type is not allowed for this source." });
      continue;
    }

    if (update.safe_to_publish !== true) {
      report.push({ source: file, status: "ignored", reason: "safe_to_publish is not true." });
      continue;
    }

    const publicOnly = { ...update, private_notes_do_not_publish: undefined };
    const safety = safetyCheck(publicOnly);
    if (!safety.safe) {
      report.push({ source: file, status: "warning", reason: `Sensitive keyword match: ${safety.matches.join(", ")}` });
      continue;
    }

    const draft = dryRun ? undefined : writeDraft({ ...publicOnly, source: file });
    report.push({ source: file, status: "created", draft });
  }

  writeReport(report);
  console.log(JSON.stringify({ dryRun, files: files.length, reportPath }, null, 2));
}

main();

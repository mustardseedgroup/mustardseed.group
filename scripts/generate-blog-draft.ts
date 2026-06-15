import fs from "node:fs";
import path from "node:path";

export type PublicUpdate = {
  project: string;
  product: string;
  date: string;
  type: "feature" | "research" | "release" | "case-study" | "experiment" | "maintenance";
  title: string;
  summary: string;
  public_points?: string[];
  screenshots?: string[];
  links?: string[];
  safe_to_publish: boolean;
  approved_by?: string;
  private_notes_do_not_publish?: string;
  source?: string;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function draftPathFor(update: PublicUpdate) {
  const slug = `${update.project}-${slugify(update.title)}`;
  return {
    slug,
    filePath: path.join("content", "drafts", `${update.date}-${slug}.mdx`),
  };
}

export function renderDraft(update: PublicUpdate) {
  const { slug } = draftPathFor(update);
  const needsReview = update.approved_by ? "false" : "true";
  const points = (update.public_points ?? []).map((point) => `- ${point}`).join("\n") || "- Public details to be reviewed.";
  const links = (update.links ?? []).map((link) => `- ${link}`).join("\n") || "- No public links supplied.";

  return `---
title: "${update.title.replace(/"/g, '\\"')}"
slug: "${slug}"
date: "${update.date}"
status: "draft"
project: "${update.project}"
product: "${update.product}"
category: "${update.type}"
source: "${update.source ?? "public-update-file"}"
reviewed: false
published: false
needs_review: ${needsReview}
tags: ["${update.project}", "${update.type}", "public-update"]
---

# ${update.title}

${update.summary}

## What changed

${points}

## Why it matters

This update represents public-facing progress for ${update.product}. It should be reviewed for clarity, accuracy and public safety before publication.

## What this means for the wider Mustard Seed Group ecosystem

Mustard Seed Group builds across intelligence, performance, execution and creativity. This update should be framed in relation to that wider system only where the connection is accurate and public-safe.

## Public links

${links}

## Review checklist

- [ ] Confirm all claims are accurate.
- [ ] Confirm no private implementation details are included.
- [ ] Confirm no client data, secrets, prompts, runbooks or internal workflows are included.
- [ ] Confirm British English and restrained editorial tone.
- [ ] Confirm this draft is ready to move from \`content/drafts\` to \`content/blog\`.
`;
}

export function writeDraft(update: PublicUpdate) {
  const { filePath } = draftPathFor(update);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, renderDraft(update), "utf8");
  return filePath;
}

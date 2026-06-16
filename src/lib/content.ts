import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { editorialThumbnails } from "./editorial-thumbnails";

export type Collection = "blog" | "research" | "companies" | "pages" | "drafts";

export type ContentEntry = {
  slug: string;
  collection: Collection;
  title: string;
  summary: string;
  date?: string;
  status?: string;
  featured?: boolean;
  category?: string;
  thumbnail?: string;
  tags: string[];
  body: string;
};

const contentRoot = path.join(process.cwd(), "content");
const datedTitlePrefix = /^(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{4}:\s+/;

function displayTitle(value: unknown, fallback: string) {
  return String(value ?? fallback).replace(datedTitlePrefix, "");
}

function collectionPath(collection: Collection) {
  return path.join(contentRoot, collection);
}

export function getCollection(collection: Collection): ContentEntry[] {
  const dir = collectionPath(collection);
  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const fullPath = path.join(dir, file);
      const raw = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(raw);
      const slug = data.slug ?? file.replace(/\.mdx$/, "");

      return {
        slug,
        collection,
        title: displayTitle(data.title, slug),
        summary: data.summary ?? "",
        date: data.date,
        status: data.status,
        featured: Boolean(data.featured),
        category: data.category,
        thumbnail: editorialThumbnails[slug] ?? data.thumbnail,
        tags: Array.isArray(data.tags) ? data.tags : [],
        body: content,
      };
    })
    .sort((a, b) => {
      if (!a.date || !b.date) return a.title.localeCompare(b.title);
      return b.date.localeCompare(a.date);
    });
}

export function getEntry(collection: Collection, slug: string): ContentEntry | undefined {
  return getCollection(collection).find((entry) => entry.slug === slug);
}

export function getFeatured(collection: Collection, limit = 3): ContentEntry[] {
  return getCollection(collection)
    .filter((entry) => entry.featured)
    .slice(0, limit);
}

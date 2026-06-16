import type { MetadataRoute } from "next";
import { getCollection } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mustardseed.group";
  const staticRoutes = ["", "/about", "/contact", "/products", "/blog", "/companies"];
  const dynamicRoutes = [
    ...getCollection("blog").map((entry) => `/blog/${entry.slug}`),
    ...getCollection("research").map((entry) => `/research/${entry.slug}`),
    ...getCollection("companies").map((entry) => `/companies/${entry.slug}`),
  ];

  return [...staticRoutes, ...dynamicRoutes].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }));
}

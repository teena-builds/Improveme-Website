import type { MetadataRoute } from "next";
import { sitePages } from "../lib/site";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.improvemeinstitute.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return sitePages.map((page) => ({
    url: `${baseUrl}${page.routePath}`,
    lastModified: now,
    changeFrequency: page.routePath === "/" ? "weekly" : "monthly",
    priority: page.routePath === "/" ? 1 : 0.7,
  }));
}

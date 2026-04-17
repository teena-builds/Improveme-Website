import type { MetadataRoute } from "next";
import { sitePages } from "../lib/site";
import type { BlogPostWithContent } from "../lib/wordpress";
import { getAllPosts } from "../lib/wordpress";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.improvemeinstitute.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  let blogPosts: BlogPostWithContent[] = [];

  try {
    blogPosts = await getAllPosts();
  } catch {
    blogPosts = [];
  }

  const staticEntries = sitePages.map((page) => ({
    url: `${baseUrl}${page.routePath}`,
    lastModified: now,
    changeFrequency: page.routePath === "/" ? "weekly" : "monthly",
    priority: page.routePath === "/" ? 1 : 0.7,
  }));

  const blogIndexEntry: MetadataRoute.Sitemap[number] = {
    url: `${baseUrl}/blogs`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  };

  const blogEntries = blogPosts.map<MetadataRoute.Sitemap[number]>((post) => ({
    url: `${baseUrl}/blogs/${post.slug}`,
    lastModified: post.publishedAt ? new Date(post.publishedAt) : now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticEntries, blogIndexEntry, ...blogEntries];
}

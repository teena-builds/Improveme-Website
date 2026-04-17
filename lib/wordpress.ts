// lib/wordpress.ts
import type { BlogPostWithContent } from "./strapi";

export interface WordpressMedia {
  url: string;
  alt: string;
}

export interface WordpressPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  featured_media?: WordpressMedia;
}

export async function getAllPosts(): Promise<BlogPostWithContent[]> {
  const apiUrl = process.env.WORDPRESS_API_URL;
  if (!apiUrl) throw new Error("WORDPRESS_API_URL env variable is not set");
  const res = await fetch(`${apiUrl}/posts?_embed`);
  if (!res.ok) throw new Error("Failed to fetch posts from WordPress");
  const data = await res.json();
  return data.map(normalizeWordpressPost);
}

export async function getPostBySlug(slug: string): Promise<BlogPostWithContent | null> {
  const apiUrl = process.env.WORDPRESS_API_URL;
  if (!apiUrl) throw new Error("WORDPRESS_API_URL env variable is not set");
  const res = await fetch(`${apiUrl}/posts?slug=${slug}&_embed`);
  if (!res.ok) throw new Error("Failed to fetch post from WordPress");
  const data = await res.json();
  if (!data.length) return null;
  return normalizeWordpressPost(data[0]);
}

function normalizeWordpressPost(post: unknown): BlogPostWithContent {
  const cover = post._embedded?.['wp:featuredmedia']?.[0]?.source_url
    ? {
        url: post._embedded['wp:featuredmedia'][0].source_url,
        alt: post._embedded['wp:featuredmedia'][0].alt_text || post.title.rendered || "Blog image",
      }
    : undefined;
  return {
    id: String(post.id),
    slug: post.slug,
    title: decodeHtml(post.title.rendered),
    excerpt: stripHtml(post.excerpt.rendered),
    publishedAt: post.date,
    cover,
    blocks: [
      {
        type: "rich-text",
        body: post.content.rendered,
        id: String(post.id) + "-content",
      },
    ],
  };
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

function decodeHtml(html: string): string {
  if (!html) return '';
  return html.replace(/&#(\d+);/g, (_m, code) => String.fromCharCode(code));
}

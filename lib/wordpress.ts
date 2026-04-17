type UnknownRecord = Record<string, unknown>;
type WordPressRenderedField = {
  rendered?: string;
};

type WordPressFeaturedMedia = {
  alt_text?: string;
  source_url?: string;
};

type WordPressEmbedded = {
  "wp:featuredmedia"?: WordPressFeaturedMedia[];
};

type WordPressPostResponse = {
  _embedded?: WordPressEmbedded;
  content?: WordPressRenderedField;
  date?: string;
  excerpt?: WordPressRenderedField;
  id?: number | string;
  slug?: string;
  title?: WordPressRenderedField;
};

const DEFAULT_WORDPRESS_REVALIDATE_SECONDS = 300;
const WORDPRESS_CACHE_TAG = "wordpress:posts";

export type BlogMedia = {
  alt: string;
  url: string;
};

export type BlogPost = {
  cover?: BlogMedia;
  excerpt: string;
  id: string;
  publishedAt: string;
  slug: string;
  title: string;
};

export type BlogPostWithContent = BlogPost & {
  content: string;
};

const isRecord = (value: unknown): value is UnknownRecord =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const getWordpressApiUrl = () => {
  const value = process.env.WORDPRESS_API_URL?.trim();
  if (!value) {
    throw new Error("Missing required environment variable: WORDPRESS_API_URL");
  }

  return value.replace(/\/$/, "");
};

const getWordpressRevalidateSeconds = () => {
  const raw = process.env.WORDPRESS_REVALIDATE_SECONDS;
  const parsed = Number(raw);

  return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : DEFAULT_WORDPRESS_REVALIDATE_SECONDS;
};

const decodeHtmlEntities = (value: string) =>
  value
    .replace(/&#(\d+);/g, (_match, decimal) => String.fromCodePoint(Number(decimal)))
    .replace(/&#x([0-9a-f]+);/gi, (_match, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

const stripHtml = (html: string) => decodeHtmlEntities(html).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

const normalizeTitle = (value: WordPressRenderedField | undefined) =>
  typeof value?.rendered === "string" ? stripHtml(value.rendered) : "";

const normalizeExcerpt = (excerpt: WordPressRenderedField | undefined, content: string) => {
  if (typeof excerpt?.rendered === "string") {
    const clean = stripHtml(excerpt.rendered);
    if (clean) {
      return clean;
    }
  }

  const fallback = stripHtml(content);
  return fallback.slice(0, 180).trimEnd();
};

const normalizeCover = (embedded: WordPressEmbedded | undefined, fallbackAlt: string): BlogMedia | undefined => {
  const mediaCollection = embedded?.["wp:featuredmedia"];
  if (!Array.isArray(mediaCollection) || mediaCollection.length === 0 || !isRecord(mediaCollection[0])) {
    return undefined;
  }

  const media = mediaCollection[0];
  const source = media.source_url;
  if (typeof source !== "string" || !source) {
    return undefined;
  }

  const alt = typeof media.alt_text === "string" && media.alt_text.trim() ? media.alt_text.trim() : fallbackAlt;
  return { alt, url: source };
};

const normalizePost = (value: WordPressPostResponse): BlogPostWithContent | null => {
  const id = value.id;
  const slug = value.slug;
  const date = value.date;
  const title = normalizeTitle(value.title);
  const content = typeof value.content?.rendered === "string" ? value.content.rendered : "";

  if ((typeof id !== "number" && typeof id !== "string") || typeof slug !== "string" || typeof date !== "string" || !title) {
    return null;
  }

  return {
    content,
    cover: normalizeCover(value._embedded, title),
    excerpt: normalizeExcerpt(value.excerpt, content),
    id: String(id),
    publishedAt: date,
    slug,
    title,
  };
};

const readJson = async <T>(pathAndQuery: string): Promise<{ data: T; headers: Headers }> => {
  const response = await fetch(`${getWordpressApiUrl()}${pathAndQuery}`, {
    headers: {
      Accept: "application/json",
    },
    next: {
      revalidate: getWordpressRevalidateSeconds(),
      tags: [WORDPRESS_CACHE_TAG],
    },
  });

  if (!response.ok) {
    throw new Error(`WordPress request failed: ${response.status} ${response.statusText}`);
  }

  return {
    data: (await response.json()) as T,
    headers: response.headers,
  };
};

export async function getAllPosts(): Promise<BlogPostWithContent[]> {
  const allEntries: WordPressPostResponse[] = [];
  const { data: firstPageEntries, headers } = await readJson<WordPressPostResponse[]>("/posts?_embed");
  allEntries.push(...firstPageEntries);

  const headerValue = headers.get("x-wp-totalpages");
  const parsedPages = Number(headerValue);
  const totalPages = Number.isFinite(parsedPages) && parsedPages > 0 ? parsedPages : 1;

  for (let page = 2; page <= totalPages; page += 1) {
    const { data } = await readJson<WordPressPostResponse[]>(`/posts?_embed&page=${page}`);
    allEntries.push(...data);
  }

  const entries = allEntries;
  return entries.map((entry) => normalizePost(entry)).filter((entry): entry is BlogPostWithContent => entry !== null);
}

export async function getPostBySlug(slug: string): Promise<BlogPostWithContent | null> {
  const { data: entries } = await readJson<WordPressPostResponse[]>(`/posts?slug=${encodeURIComponent(slug)}&_embed`);
  const post = entries.map((entry) => normalizePost(entry)).find((entry): entry is BlogPostWithContent => entry !== null);
  return post ?? null;
}

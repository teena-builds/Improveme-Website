type UnknownRecord = Record<string, unknown>;
type WordPressRenderedField = {
  rendered?: string;
};

type WordPressFeaturedMedia = {
  alt_text?: string;
  media_details?: {
    sizes?: Record<
      string,
      {
        source_url?: string;
      }
    >;
  };
  source_url?: string;
};

type WordPressEmbedded = {
  "wp:featuredmedia"?: WordPressFeaturedMedia[];
};

type WordPressPostResponse = {
  _embedded?: WordPressEmbedded;
  categories?: number[];
  content?: WordPressRenderedField;
  date?: string;
  excerpt?: WordPressRenderedField;
  id?: number | string;
  slug?: string;
  title?: WordPressRenderedField;
};

type WordPressCategoryResponse = {
  id?: number;
  name?: string;
  slug?: string;
};

const DEFAULT_WORDPRESS_REVALIDATE_SECONDS = 300;
const WORDPRESS_CACHE_TAG = "wordpress:posts";
const WORDPRESS_CATEGORIES_CACHE_TAG = "wordpress:categories";

export type BlogMedia = {
  alt: string;
  url: string;
};

export type BlogPost = {
  categoryIds: number[];
  cover?: BlogMedia;
  excerpt: string;
  id: string;
  publishedAt: string;
  readingTimeMinutes: number;
  slug: string;
  title: string;
};

export type BlogCategory = {
  id: number;
  name: string;
  slug: string;
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

const getReadingTimeMinutes = (html: string) => {
  const cleanText = stripHtml(html);
  const wordCount = cleanText ? cleanText.split(/\s+/).filter(Boolean).length : 0;
  return Math.max(1, Math.ceil(wordCount / 200));
};

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
  const preferredSizes = ["large", "medium_large", "medium", "thumbnail"];
  const sizeEntries = media.media_details?.sizes;
  const optimizedSource =
    sizeEntries && isRecord(sizeEntries)
      ? preferredSizes
          .map((size) => sizeEntries[size])
          .find((entry) => isRecord(entry) && typeof entry.source_url === "string" && entry.source_url)?.source_url
      : undefined;

  const source = optimizedSource ?? media.source_url;
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
    categoryIds: Array.isArray(value.categories) ? value.categories.filter((categoryId) => Number.isInteger(categoryId)) : [],
    content,
    cover: normalizeCover(value._embedded, title),
    excerpt: normalizeExcerpt(value.excerpt, content),
    id: String(id),
    publishedAt: date,
    readingTimeMinutes: getReadingTimeMinutes(content),
    slug,
    title,
  };
};

const normalizeCategory = (value: WordPressCategoryResponse): BlogCategory | null => {
  if (typeof value.id !== "number" || typeof value.slug !== "string" || typeof value.name !== "string") {
    return null;
  }

  const slug = value.slug.trim();
  const name = value.name.trim();

  if (!slug || !name) {
    return null;
  }

  return {
    id: value.id,
    name,
    slug,
  };
};

const readJson = async <T>(pathAndQuery: string, tags: string[]): Promise<{ data: T; headers: Headers }> => {
  const response = await fetch(`${getWordpressApiUrl()}${pathAndQuery}`, {
    headers: {
      Accept: "application/json",
    },
    next: {
      revalidate: getWordpressRevalidateSeconds(),
      tags,
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
  const { data: firstPageEntries, headers } = await readJson<WordPressPostResponse[]>("/posts?_embed", [WORDPRESS_CACHE_TAG]);
  allEntries.push(...firstPageEntries);

  const headerValue = headers.get("x-wp-totalpages");
  const parsedPages = Number(headerValue);
  const totalPages = Number.isFinite(parsedPages) && parsedPages > 0 ? parsedPages : 1;

  for (let page = 2; page <= totalPages; page += 1) {
    const { data } = await readJson<WordPressPostResponse[]>(`/posts?_embed&page=${page}`, [WORDPRESS_CACHE_TAG]);
    allEntries.push(...data);
  }

  const entries = allEntries;
  return entries.map((entry) => normalizePost(entry)).filter((entry): entry is BlogPostWithContent => entry !== null);
}

export async function getPostBySlug(slug: string): Promise<BlogPostWithContent | null> {
  const { data: entries } = await readJson<WordPressPostResponse[]>(
    `/posts?slug=${encodeURIComponent(slug)}&_embed`,
    [WORDPRESS_CACHE_TAG]
  );
  const post = entries.map((entry) => normalizePost(entry)).find((entry): entry is BlogPostWithContent => entry !== null);
  return post ?? null;
}

export async function getAllCategories(): Promise<BlogCategory[]> {
  const allEntries: WordPressCategoryResponse[] = [];
  const { data: firstPageEntries, headers } = await readJson<WordPressCategoryResponse[]>(
    "/categories?per_page=100",
    [WORDPRESS_CATEGORIES_CACHE_TAG]
  );
  allEntries.push(...firstPageEntries);

  const headerValue = headers.get("x-wp-totalpages");
  const parsedPages = Number(headerValue);
  const totalPages = Number.isFinite(parsedPages) && parsedPages > 0 ? parsedPages : 1;

  for (let page = 2; page <= totalPages; page += 1) {
    const { data } = await readJson<WordPressCategoryResponse[]>(
      `/categories?per_page=100&page=${page}`,
      [WORDPRESS_CATEGORIES_CACHE_TAG]
    );
    allEntries.push(...data);
  }

  return allEntries
    .map((entry) => normalizeCategory(entry))
    .filter((entry): entry is BlogCategory => entry !== null)
    .sort((a, b) => a.name.localeCompare(b.name));
}

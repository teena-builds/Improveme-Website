import { cache } from "react";

type UnknownRecord = Record<string, unknown>;

type StrapiMediaRecord = {
  alternativeText?: string | null;
  caption?: string | null;
  height?: number | null;
  mime?: string | null;
  name?: string | null;
  url?: string | null;
  width?: number | null;
};

type StrapiBlockRecord = UnknownRecord & {
  __component?: string;
  body?: string;
  file?: unknown;
  files?: unknown;
  title?: string | null;
};

const readString = (entry: UnknownRecord, ...keys: string[]) => {
  for (const key of keys) {
    const value = entry[key];
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return "";
};

export type BlogMedia = {
  alt: string;
  caption?: string | null;
  height?: number;
  mime?: string | null;
  name?: string | null;
  url: string;
  width?: number;
};

export type BlogBlock =
  | {
      type: "rich-text";
      body: string;
      id: string;
    }
  | {
      type: "quote";
      body: string;
      id: string;
      title?: string | null;
    }
  | {
      type: "media";
      file: BlogMedia;
      id: string;
    }
  | {
      type: "slider";
      files: BlogMedia[];
      id: string;
    };

export type BlogPost = {
  cover?: BlogMedia;
  documentId?: string;
  excerpt: string;
  id: string;
  publishedAt: string;
  slug: string;
  title: string;
};

export type BlogPostWithContent = BlogPost & {
  blocks: BlogBlock[];
};

export type BlogPostsResult = {
  error: boolean;
  posts: BlogPostWithContent[];
};

export type BlogPostResult = {
  error: boolean;
  post: BlogPostWithContent | null;
};

const DEFAULT_STRAPI_URL = "http://127.0.0.1:1337";

const getStrapiBaseUrl = () =>
  (process.env.STRAPI_URL ?? process.env.NEXT_PUBLIC_STRAPI_URL ?? DEFAULT_STRAPI_URL).replace(/\/$/, "");

const getStrapiApiToken = () => process.env.STRAPI_API_TOKEN ?? process.env.NEXT_PUBLIC_STRAPI_API_TOKEN ?? "";

const isRecord = (value: unknown): value is UnknownRecord =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const flattenEntity = (value: unknown): UnknownRecord | null => {
  if (!value) {
    return null;
  }

  if (Array.isArray(value)) {
    return null;
  }

  if (!isRecord(value)) {
    return null;
  }

  if ("data" in value) {
    return flattenEntity(value.data);
  }

  if ("attributes" in value && isRecord(value.attributes)) {
    return {
      ...value.attributes,
      documentId: typeof value.documentId === "string" ? value.documentId : value.attributes.documentId,
      id: value.id ?? value.attributes.id,
    };
  }

  return value;
};

const flattenEntityArray = (value: unknown): UnknownRecord[] => {
  if (!value) {
    return [];
  }

  if (isRecord(value) && "data" in value) {
    return flattenEntityArray(value.data);
  }

  if (!Array.isArray(value)) {
    const single = flattenEntity(value);
    return single ? [single] : [];
  }

  return value.map((item) => flattenEntity(item)).filter((item): item is UnknownRecord => item !== null);
};

const toAbsoluteUrl = (url: string) => {
  if (/^https?:\/\//i.test(url)) {
    return url;
  }

  if (url.startsWith("/")) {
    return `${getStrapiBaseUrl()}${url}`;
  }

  return `${getStrapiBaseUrl()}/${url}`;
};

const normalizeMedia = (value: unknown): BlogMedia | undefined => {
  const media = flattenEntity(value) as StrapiMediaRecord | null;

  if (!media?.url) {
    return undefined;
  }

  return {
    alt: media.alternativeText || media.caption || media.name || "Blog image",
    caption: media.caption ?? null,
    height: typeof media.height === "number" ? media.height : undefined,
    mime: media.mime ?? null,
    name: media.name ?? null,
    url: toAbsoluteUrl(media.url),
    width: typeof media.width === "number" ? media.width : undefined,
  };
};

const normalizeBlocks = (value: unknown): BlogBlock[] => {
  const blocks = flattenEntityArray(value) as StrapiBlockRecord[];

  return blocks.flatMap<BlogBlock>((block, index) => {
    const id = String(block.id ?? block.documentId ?? `${block.__component ?? "block"}-${index}`);

    switch (block.__component) {
      case "shared.rich-text":
        return typeof block.body === "string" && block.body.trim()
          ? [{ type: "rich-text" as const, body: block.body, id }]
          : [];
      case "shared.quote":
        return typeof block.body === "string" && block.body.trim()
          ? [{ type: "quote" as const, body: block.body, id, title: block.title }]
          : [];
      case "shared.media": {
        const file = normalizeMedia(block.file);
        return file ? [{ type: "media" as const, file, id }] : [];
      }
      case "shared.slider": {
        const files = flattenEntityArray(block.files).map((file) => normalizeMedia(file)).filter((file): file is BlogMedia => Boolean(file));
        return files.length ? [{ type: "slider" as const, files, id }] : [];
      }
      default:
        return [];
    }
  });
};

const extractExcerpt = (description: unknown, blocks: BlogBlock[]) => {
  if (typeof description === "string" && description.trim()) {
    return description.trim();
  }

  const firstRichText = blocks.find((block) => block.type === "rich-text");

  if (!firstRichText) {
    return "";
  }

  return firstRichText.body.replace(/[#*_>\-\[\]\(\)`]/g, "").replace(/\s+/g, " ").trim().slice(0, 160);
};

const normalizePost = (value: unknown): BlogPostWithContent | null => {
  const entry = flattenEntity(value);

  if (!entry) {
    return null;
  }

  const title = readString(entry, "title", "Title");
  const slug = readString(entry, "slug", "Slug");
  const description = readString(entry, "description", "Description");
  const publishedAt = typeof entry.publishedAt === "string" ? entry.publishedAt : "";
  const normalizedBlocks = normalizeBlocks(entry.blocks ?? entry.Blocks);
  const blocks =
    normalizedBlocks.length > 0
      ? normalizedBlocks
      : description
        ? [
            {
              type: "rich-text" as const,
              body: description,
              id: `${entry.id ?? entry.documentId ?? slug}-description`,
            },
          ]
        : [];

  if (!title || !slug || !publishedAt) {
    return null;
  }

  return {
    blocks,
    cover: normalizeMedia(entry.cover ?? entry.Cover ?? entry.image ?? entry.Image),
    documentId: typeof entry.documentId === "string" ? entry.documentId : undefined,
    excerpt: extractExcerpt(description, blocks),
    id: String(entry.id ?? entry.documentId ?? slug),
    publishedAt,
    slug,
    title,
  };
};

const readJson = async (path: string) => {
  const apiToken = getStrapiApiToken();
  const response = await fetch(`${getStrapiBaseUrl()}${path}`, {
    cache: "no-store",
    headers: {
      Accept: "application/json",
      ...(apiToken ? { Authorization: `Bearer ${apiToken}` } : {}),
    },
  });

  if (!response.ok) {
    throw new Error(`Strapi request failed: ${response.status} ${response.statusText}`);
  }

  return (await response.json()) as { data?: unknown };
};

export const getPublishedBlogPosts = cache(async (): Promise<BlogPostsResult> => {
  try {
    const params = new URLSearchParams();
    params.set("status", "published");
    params.set("sort[0]", "publishedAt:desc");
    params.set("populate", "*");

    const payload = await readJson(`/api/articles?${params.toString()}`);
    const posts = flattenEntityArray(payload.data)
      .map((entry) => normalizePost(entry))
      .filter((entry): entry is BlogPostWithContent => entry !== null);

    return {
      error: false,
      posts,
    };
  } catch (error) {
    console.error("Unable to load published blog posts from Strapi.", error);

    return {
      error: true,
      posts: [],
    };
  }
});

export const getPublishedBlogPostBySlug = cache(async (slug: string): Promise<BlogPostResult> => {
  const { error, posts } = await getPublishedBlogPosts();

  return {
    error,
    post: posts.find((post) => post.slug === slug) ?? null,
  };
});

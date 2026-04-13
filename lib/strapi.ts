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

const DEFAULT_STRAPI_URL = "http://127.0.0.1:1337";

const getStrapiBaseUrl = () =>
  (process.env.STRAPI_URL ?? process.env.NEXT_PUBLIC_STRAPI_URL ?? DEFAULT_STRAPI_URL).replace(/\/$/, "");

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

  const title = typeof entry.title === "string" ? entry.title.trim() : "";
  const slug = typeof entry.slug === "string" ? entry.slug.trim() : "";
  const publishedAt = typeof entry.publishedAt === "string" ? entry.publishedAt : "";
  const blocks = normalizeBlocks(entry.blocks);

  if (!title || !slug || !publishedAt) {
    return null;
  }

  return {
    blocks,
    cover: normalizeMedia(entry.cover),
    documentId: typeof entry.documentId === "string" ? entry.documentId : undefined,
    excerpt: extractExcerpt(entry.description, blocks),
    id: String(entry.id ?? entry.documentId ?? slug),
    publishedAt,
    slug,
    title,
  };
};

const readJson = async (path: string) => {
  const response = await fetch(`${getStrapiBaseUrl()}${path}`, {
    cache: "no-store",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Strapi request failed: ${response.status} ${response.statusText}`);
  }

  return (await response.json()) as { data?: unknown };
};

export const getPublishedBlogPosts = cache(async (): Promise<BlogPost[]> => {
  const params = new URLSearchParams();
  params.set("status", "published");
  params.set("sort[0]", "publishedAt:desc");
  params.set("fields[0]", "title");
  params.set("fields[1]", "slug");
  params.set("fields[2]", "description");
  params.set("fields[3]", "publishedAt");
  params.set("populate[cover][fields][0]", "url");
  params.set("populate[cover][fields][1]", "alternativeText");
  params.set("populate[cover][fields][2]", "caption");
  params.set("populate[cover][fields][3]", "width");
  params.set("populate[cover][fields][4]", "height");
  params.set("populate[cover][fields][5]", "mime");
  params.set("populate[cover][fields][6]", "name");

  const payload = await readJson(`/api/articles?${params.toString()}`);
  return flattenEntityArray(payload.data)
    .map((entry) => normalizePost(entry))
    .filter((entry): entry is BlogPostWithContent => entry !== null);
});

export const getPublishedBlogPostBySlug = cache(async (slug: string): Promise<BlogPostWithContent | null> => {
  const params = new URLSearchParams();
  params.set("status", "published");
  params.set("filters[slug][$eq]", slug);
  params.set("pagination[pageSize]", "1");
  params.set("fields[0]", "title");
  params.set("fields[1]", "slug");
  params.set("fields[2]", "description");
  params.set("fields[3]", "publishedAt");
  params.set("populate[cover][fields][0]", "url");
  params.set("populate[cover][fields][1]", "alternativeText");
  params.set("populate[cover][fields][2]", "caption");
  params.set("populate[cover][fields][3]", "width");
  params.set("populate[cover][fields][4]", "height");
  params.set("populate[cover][fields][5]", "mime");
  params.set("populate[cover][fields][6]", "name");
  params.set("populate[blocks][populate]", "*");

  const payload = await readJson(`/api/articles?${params.toString()}`);
  const post = flattenEntityArray(payload.data).map((entry) => normalizePost(entry)).find((entry): entry is BlogPostWithContent => Boolean(entry));
  return post ?? null;
});

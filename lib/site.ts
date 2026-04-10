import manifest from "../data/reference-manifest.json";
import rawPages from "../data/site-pages.json";

type RawPage = {
  routePath: string;
  slug: string;
  title: string;
  description: string;
  html: string;
};

export type SitePage = {
  routePath: string;
  slug: string;
  title: string;
  description: string;
  html: string;
};

const mojibakeMap: Array<[string, string]> = [
  ["â€”", "—"],
  ["â€“", "–"],
  ["â€™", "’"],
  ["â€˜", "‘"],
  ["â€œ", "“"],
  ["â€", "”"],
  ["Â·", "·"],
  ["Â©", "©"],
  ["Â ", " "],
  ["â˜…", "★"],
  ["â†’", "→"],
];

const normalizeText = (value: string) => {
  let result = value;
  for (const [from, to] of mojibakeMap) {
    result = result.split(from).join(to);
  }
  return result;
};

const cleanHtml = (value: string) =>
  normalizeText(value)
    .replace(/<!--\$!--><template[\s\S]*?<\/template><!--\/\$-->/g, "")
    .replace(/<!--\$--><!--\/\$-->/g, "")
    .replace(/<!-- -->/g, "")
    .replace(/\/images\//g, "/ref/images/")
    .replace(/\/videos\//g, "/ref/videos/");

const normalizeRoutePath = (routePath: string) => {
  const trimmed = routePath.replace(/\/+$/, "");
  return trimmed || "/";
};

export const referenceStylesheets = manifest.stylesheets;

export const sitePages: SitePage[] = (rawPages as RawPage[]).map((page) => ({
  routePath: normalizeRoutePath(page.routePath),
  slug: page.slug,
  title: normalizeText(page.title),
  description: normalizeText(page.description),
  html: cleanHtml(page.html),
}));

const pageMap = new Map(sitePages.map((page) => [page.routePath, page]));

export const getRoutePathFromSlug = (slug?: string[]) => {
  if (!slug || slug.length === 0) return "/";
  return normalizeRoutePath(`/${slug.join("/")}`);
};

export const getPageByRoute = (routePath: string) => pageMap.get(normalizeRoutePath(routePath));

export const allStaticSlugs = sitePages
  .filter((page) => page.routePath !== "/")
  .map((page) => ({
    slug: page.routePath.replace(/^\//, "").split("/"),
  }));

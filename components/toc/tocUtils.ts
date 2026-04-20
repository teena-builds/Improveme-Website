export type TocItem = {
  id: string;
  text: string;
};

const DEFAULT_SECTION_ID = "section";

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

export const stripHtml = (value: string) => decodeHtmlEntities(value).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const getSafeHeadingTag = (headingSelector: string) => {
  const match = headingSelector.trim().toLowerCase().match(/^h([1-6])$/);
  return match ? `h${match[1]}` : "h2";
};

type BuildTableOfContentsOptions = {
  headingSelector?: string;
};

/**
 * Extract headings from HTML, inject stable IDs into matching heading tags,
 * and return both updated HTML and TOC items for rendering.
 */
export const buildTableOfContents = (
  html: string,
  options: BuildTableOfContentsOptions = {}
): { tocItems: TocItem[]; updatedHtml: string } => {
  const headingTag = getSafeHeadingTag(options.headingSelector ?? "h2");
  const tocItems: TocItem[] = [];
  const idCount = new Map<string, number>();
  const headingPattern = new RegExp(`<${headingTag}\\b([^>]*)>([\\s\\S]*?)<\\/${headingTag}>`, "gi");

  const updatedHtml = html.replace(headingPattern, (_match, rawAttributes: string, content: string) => {
    const headingText = stripHtml(content);
    if (!headingText) {
      return `<${headingTag}${rawAttributes}>${content}</${headingTag}>`;
    }

    const baseId = slugify(headingText) || DEFAULT_SECTION_ID;
    const seenCount = idCount.get(baseId) ?? 0;
    idCount.set(baseId, seenCount + 1);
    const uniqueId = seenCount === 0 ? baseId : `${baseId}-${seenCount + 1}`;

    tocItems.push({ id: uniqueId, text: headingText });
    const attributesWithoutId = rawAttributes.replace(/\s+id=(["']).*?\1/gi, "");

    return `<${headingTag}${attributesWithoutId} id="${uniqueId}">${content}</${headingTag}>`;
  });

  return { tocItems, updatedHtml };
};

export const extractHeadings = (html: string, headingSelector = "h2"): TocItem[] =>
  buildTableOfContents(html, { headingSelector }).tocItems;

export const getTopPriorityHeading = (elements: HTMLElement[], topOffsetPx: number) => {
  const firstAtOrBelowOffset = elements
    .filter((element) => element.getBoundingClientRect().top >= topOffsetPx)
    .sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top)[0];

  if (firstAtOrBelowOffset) {
    return firstAtOrBelowOffset;
  }

  return elements
    .filter((element) => element.getBoundingClientRect().top < topOffsetPx)
    .sort((a, b) => b.getBoundingClientRect().top - a.getBoundingClientRect().top)[0];
};

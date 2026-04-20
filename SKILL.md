# Reusable TOC Skill (Next.js + HTML Content)

## Purpose
Add a production-ready, reusable Table of Contents (TOC) for CMS HTML content (WordPress or any HTML source), including:
- dynamic heading extraction
- heading ID injection
- active section highlighting (scroll spy)
- smooth click-to-scroll with offset

## Use When
- A page renders long-form HTML content with headings.
- You need a sticky/dynamic TOC that updates while scrolling.
- You want reusable TOC logic across multiple projects.

## Required Module Files
Copy these files into your target project:
- `components/toc/tocUtils.ts`
- `components/toc/useTableOfContents.ts`
- `components/toc/TableOfContents.tsx`

## Data Flow
1. Parse HTML and build TOC:
   - `buildTableOfContents(content, { headingSelector: "h2" })`
2. Render TOC using returned `tocItems`.
3. Render processed HTML (`updatedHtml`) so headings have stable IDs.
4. `useTableOfContents` tracks active heading via `IntersectionObserver`.

## Integration Example
```tsx
import { TableOfContents } from "@/components/toc/TableOfContents";
import { buildTableOfContents } from "@/components/toc/tocUtils";

type Props = { content: string };

export default function ArticlePage({ content }: Props) {
  const { tocItems, updatedHtml } = buildTableOfContents(content, { headingSelector: "h2" });

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <TableOfContents
          items={tocItems}
          offset={140}
          smoothScroll
          sticky={false}
          containerClassName="rounded-xl border bg-white p-4"
          itemClassName="text-gray-700 hover:text-blue-700"
          activeItemClassName="bg-blue-50 text-blue-800"
          emptyState="No sections available."
        />
      </aside>

      <article dangerouslySetInnerHTML={{ __html: updatedHtml }} />
    </div>
  );
}
```

## API Notes
- `buildTableOfContents(html, { headingSelector })`
  - Input: raw HTML string
  - Output: `{ tocItems, updatedHtml }`
- `TableOfContents` props:
  - `items`, `offset`, `smoothScroll`
  - `sticky`, `stickyTop`
  - `containerClassName`, `listClassName`, `itemClassName`, `activeItemClassName`
  - `emptyState`

## Performance & Stability
- Uses one `IntersectionObserver` instance.
- Cleans observer/listeners on unmount.
- Uses top-priority visible heading detection for short and long sections.
- Keeps click and scroll states synced to prevent flicker.

## Project Checklist
- Ensure article heading elements support scroll offset (`scroll-margin-top` in styles).
- Keep `offset` aligned with your sticky header height.
- Use the same `headingSelector` in parsing and expectation (`h2` default).


# Reusable Table Of Contents Module

## Files
- `tocUtils.ts`: HTML heading extraction, slug generation, and TOC data shaping.
- `useTableOfContents.ts`: Scroll spy + click-to-scroll active state logic.
- `TableOfContents.tsx`: Reusable UI component with style override props.

## Data Flow
1. Parse article HTML with `buildTableOfContents(html, { headingSelector })`.
2. Render processed HTML (with injected heading IDs).
3. Pass `tocItems` into `TableOfContents` (or `useTableOfContents` directly).
4. Hook tracks active heading with `IntersectionObserver` and updates TOC state.

## Usage Example

```tsx
import { buildTableOfContents } from "@/components/toc/tocUtils";
import { TableOfContents } from "@/components/toc/TableOfContents";
import { BlogRichContent } from "@/components/blog/blog-rich-content";

const { tocItems, updatedHtml } = buildTableOfContents(content, { headingSelector: "h2" });

return (
  <>
    <TableOfContents
      items={tocItems}
      offset={140}
      smoothScroll
      containerClassName="rounded-xl border p-4"
      activeItemClassName="bg-blue-50 text-blue-800"
    />
    <BlogRichContent html={updatedHtml} />
  </>
);
```

## Hook-Only Example

```tsx
"use client";
import { useTableOfContents } from "@/components/toc/useTableOfContents";

const { activeId, onItemClick } = useTableOfContents({ items, offset: 120 });
```

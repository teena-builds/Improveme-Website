"use client";

import type { CSSProperties } from "react";
import type { TocItem } from "./tocUtils";
import { useTableOfContents } from "./useTableOfContents";

type TableOfContentsProps = {
  items: TocItem[];
  offset?: number;
  smoothScroll?: boolean;
  sticky?: boolean;
  stickyTop?: number;
  containerClassName?: string;
  listClassName?: string;
  itemClassName?: string;
  activeItemClassName?: string;
  emptyState?: string;
};

const joinClasses = (...classes: Array<string | undefined>) => classes.filter(Boolean).join(" ");

/**
 * Reusable TOC UI that reads active state from useTableOfContents hook.
 * Styling is overridable through className props for cross-project use.
 */
export function TableOfContents({
  items,
  offset = 140,
  smoothScroll = true,
  sticky = false,
  stickyTop = 112,
  containerClassName,
  listClassName,
  itemClassName,
  activeItemClassName,
  emptyState = "No sections available.",
}: TableOfContentsProps) {
  const { activeId, onItemClick } = useTableOfContents({ items, offset, smoothScroll });
  const stickyStyle: CSSProperties | undefined = sticky ? { position: "sticky", top: stickyTop } : undefined;

  if (!items.length) {
    return <p className="text-[14px] text-[#6b7280]">{emptyState}</p>;
  }

  return (
    <div className={containerClassName} style={stickyStyle}>
      <ul className={joinClasses("space-y-2", listClassName)}>
        {items.map((item) => {
          const isActive = activeId === item.id;

          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(event) => onItemClick(event, item.id)}
                className={joinClasses(
                  "block rounded-[8px] px-2 py-1 text-[13px] font-medium leading-[1.4] transition-colors",
                  isActive ? "bg-[#e9f0fb] text-[#1d4d8f]" : "text-[#374151] hover:text-[#1d4d8f]",
                  itemClassName,
                  isActive ? activeItemClassName : undefined
                )}
                aria-current={isActive ? "location" : undefined}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

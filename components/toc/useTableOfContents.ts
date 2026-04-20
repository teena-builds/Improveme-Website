"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { MouseEvent } from "react";
import type { TocItem } from "./tocUtils";
import { getTopPriorityHeading } from "./tocUtils";

type UseTableOfContentsOptions = {
  items: TocItem[];
  offset?: number;
  smoothScroll?: boolean;
  clickStateLockMs?: number;
};

type UseTableOfContentsResult = {
  activeId: string;
  onItemClick: (event: MouseEvent<HTMLAnchorElement>, id: string) => void;
};

const DEFAULT_OFFSET = 140;
const DEFAULT_CLICK_LOCK_MS = 650;

/**
 * Data flow:
 * 1) Observe heading elements derived from TOC item IDs.
 * 2) Compute active heading by top-priority viewport position.
 * 3) Keep click and scroll states synchronized with short lock during smooth scrolling.
 */
export function useTableOfContents({
  items,
  offset = DEFAULT_OFFSET,
  smoothScroll = true,
  clickStateLockMs = DEFAULT_CLICK_LOCK_MS,
}: UseTableOfContentsOptions): UseTableOfContentsResult {
  const itemIds = useMemo(() => items.map((item) => item.id), [items]);
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const manualSelectionUntilRef = useRef(0);
  const fallbackId = items[0]?.id ?? "";
  const resolvedActiveId = itemIds.includes(activeId) ? activeId : fallbackId;

  useEffect(() => {
    if (!itemIds.length) {
      return;
    }

    const headingElements = itemIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element instanceof HTMLElement);

    if (!headingElements.length) {
      return;
    }

    const updateActiveFromViewport = () => {
      if (Date.now() < manualSelectionUntilRef.current) {
        return;
      }

      const visibleHeading = getTopPriorityHeading(headingElements, offset);
      if (visibleHeading) {
        setActiveId((previous) => (previous === visibleHeading.id ? previous : visibleHeading.id));
      }
    };

    const observer = new IntersectionObserver(
      () => {
        updateActiveFromViewport();
      },
      {
        root: null,
        rootMargin: `-${offset}px 0px -78% 0px`,
        threshold: [0, 0.01, 0.1, 0.2],
      }
    );

    for (const heading of headingElements) {
      observer.observe(heading);
    }

    let rafId = 0;
    const onViewportChange = () => {
      if (rafId !== 0) {
        return;
      }

      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        updateActiveFromViewport();
      });
    };

    window.addEventListener("scroll", onViewportChange, { passive: true });
    window.addEventListener("resize", onViewportChange);
    updateActiveFromViewport();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onViewportChange);
      window.removeEventListener("resize", onViewportChange);
      if (rafId !== 0) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [itemIds, offset]);

  const onItemClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>, id: string) => {
      event.preventDefault();
      setActiveId(id);
      manualSelectionUntilRef.current = Date.now() + clickStateLockMs;

      const targetHeading = document.getElementById(id);
      if (!targetHeading) {
        return;
      }

      const targetTop = window.scrollY + targetHeading.getBoundingClientRect().top - offset;
      window.scrollTo({
        top: Math.max(0, targetTop),
        behavior: smoothScroll ? "smooth" : "auto",
      });
    },
    [clickStateLockMs, offset, smoothScroll]
  );

  return { activeId: resolvedActiveId, onItemClick };
}

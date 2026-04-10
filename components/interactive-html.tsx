"use client";

import { useEffect, useRef } from "react";

type InteractiveHtmlProps = {
  html: string;
};

export function InteractiveHtml({ html }: InteractiveHtmlProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const accordionButtons = Array.from(
      container.querySelectorAll<HTMLElement>("[data-accordion-item='true'] > button")
    );

    const toggleAccordion = (button: HTMLElement) => {
      const item = button.parentElement;
      if (!item) return;

      const body = button.nextElementSibling as HTMLElement | null;
      const isOpen = item.getAttribute("data-state") === "open";
      item.setAttribute("data-state", isOpen ? "closed" : "open");
      button.setAttribute("aria-expanded", String(!isOpen));
      if (body) {
        body.classList.toggle("hidden", isOpen);
      }

      const icon = button.querySelector("svg");
      if (icon) {
        icon.classList.toggle("rotate-180", !isOpen);
        icon.classList.toggle("rotate-0", isOpen);
      }
    };

    const onClick = (event: Event) => {
      const target = event.currentTarget as HTMLElement;
      event.preventDefault();
      toggleAccordion(target);
    };

    accordionButtons.forEach((button) => {
      button.addEventListener("click", onClick);
    });

    return () => {
      accordionButtons.forEach((button) => {
        button.removeEventListener("click", onClick);
      });
    };
  }, [html]);

  return <div ref={ref} dangerouslySetInnerHTML={{ __html: html }} />;
}

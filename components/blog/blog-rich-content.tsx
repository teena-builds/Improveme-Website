import Image from "next/image";
import type { ReactNode } from "react";
import type { BlogBlock } from "@/lib/strapi";

const headingClasses = {
  1: "text-[34px] md:text-[42px]",
  2: "text-[28px] md:text-[34px]",
  3: "text-[24px] md:text-[28px]",
  4: "text-[20px] md:text-[24px]",
  5: "text-[18px] md:text-[20px]",
  6: "text-[16px] md:text-[18px]",
} as const;

const htmlPattern = /<\/?[a-z][\s\S]*>/i;

function renderInlineText(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /(\[([^\]]+)\]\((https?:\/\/[^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*)/g;
  let lastIndex = 0;
  let match = pattern.exec(text);
  let key = 0;

  while (match) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    if (match[2] && match[3]) {
      nodes.push(
        <a key={`inline-${key}`} href={match[3]} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#365bb2] underline decoration-[#365bb2]/35 underline-offset-4">
          {match[2]}
        </a>,
      );
    } else if (match[4]) {
      nodes.push(
        <strong key={`inline-${key}`} className="font-semibold text-[#1c2744]">
          {match[4]}
        </strong>,
      );
    } else if (match[5]) {
      nodes.push(
        <em key={`inline-${key}`} className="italic">
          {match[5]}
        </em>,
      );
    }

    lastIndex = match.index + match[0].length;
    key += 1;
    match = pattern.exec(text);
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

function renderMarkdownish(body: string) {
  const sections = body
    .replace(/\r/g, "")
    .split(/\n{2,}/)
    .map((section) => section.trim())
    .filter(Boolean);

  return sections.map((section, index) => {
    const headingMatch = section.match(/^(#{1,6})\s+(.+)$/);

    if (headingMatch) {
      const level = Math.min(headingMatch[1].length, 6) as keyof typeof headingClasses;
      return (
        <h2 key={`section-${index}`} className={`${headingClasses[level]} font-bold leading-[1.18] tracking-[-0.03em] text-[#1c2744]`}>
          {renderInlineText(headingMatch[2].trim())}
        </h2>
      );
    }

    const lines = section.split("\n").map((line) => line.trim()).filter(Boolean);
    const isList = lines.every((line) => /^[-*]\s+/.test(line));

    if (isList) {
      return (
        <ul key={`section-${index}`} className="space-y-3 pl-6 text-[17px] leading-[1.85] text-[#556892]">
          {lines.map((line, lineIndex) => (
            <li key={`section-${index}-item-${lineIndex}`} className="list-disc">
              {renderInlineText(line.replace(/^[-*]\s+/, ""))}
            </li>
          ))}
        </ul>
      );
    }

    return (
      <p key={`section-${index}`} className="text-[17px] leading-[1.9] text-[#556892]">
        {renderInlineText(lines.join(" "))}
      </p>
    );
  });
}

export function BlogRichContent({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div className="space-y-8">
      {blocks.map((block) => {
        if (block.type === "rich-text") {
          if (htmlPattern.test(block.body)) {
            return (
              <div
                key={block.id}
                className="space-y-5 text-[17px] leading-[1.9] text-[#556892] [&_a]:font-semibold [&_a]:text-[#365bb2] [&_a]:underline [&_a]:decoration-[#365bb2]/35 [&_a]:underline-offset-4 [&_h1]:text-[34px] [&_h1]:font-bold [&_h1]:leading-[1.18] [&_h1]:tracking-[-0.03em] [&_h1]:text-[#1c2744] [&_h2]:text-[28px] [&_h2]:font-bold [&_h2]:leading-[1.2] [&_h2]:tracking-[-0.03em] [&_h2]:text-[#1c2744] [&_h3]:text-[24px] [&_h3]:font-bold [&_h3]:leading-[1.25] [&_h3]:tracking-[-0.02em] [&_h3]:text-[#1c2744] [&_li]:ml-6 [&_li]:list-disc [&_p]:my-0 [&_ul]:space-y-3 [&_ul]:pl-2"
                dangerouslySetInnerHTML={{ __html: block.body }}
              />
            );
          }

          return (
            <div key={block.id} className="space-y-5">
              {renderMarkdownish(block.body)}
            </div>
          );
        }

        if (block.type === "quote") {
          return (
            <blockquote key={block.id} className="rounded-[18px] border-l-[4px] border-[#FFC107] bg-[linear-gradient(135deg,#f8fbff_0%,#eef5ff_100%)] px-6 py-6 shadow-[0_10px_28px_rgba(15,23,42,0.08)]">
              <p className="text-[20px] italic leading-[1.8] text-[#1c2744]">&quot;{block.body}&quot;</p>
              {block.title ? <footer className="mt-4 text-[13px] font-semibold uppercase tracking-[0.18em] text-[#365bb2]">{block.title}</footer> : null}
            </blockquote>
          );
        }

        if (block.type === "media") {
          return (
            <figure key={block.id} className="overflow-hidden rounded-[20px] shadow-[0_14px_34px_rgba(15,23,42,0.10)]">
              <div className="relative aspect-[16/9] bg-[#eaf0fb]">
                <Image
                  src={block.file.url}
                  alt={block.file.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 960px"
                  className="object-cover"
                />
              </div>
              {block.file.caption ? <figcaption className="border-t border-[#edf1f7] bg-white px-5 py-4 text-[14px] text-[#6079bb]">{block.file.caption}</figcaption> : null}
            </figure>
          );
        }

        return (
          <div key={block.id} className="grid gap-4 md:grid-cols-2">
            {block.files.map((file, index) => (
              <figure key={`${block.id}-${index}`} className="overflow-hidden rounded-[18px] shadow-[0_12px_30px_rgba(15,23,42,0.10)]">
                <div className="relative aspect-[4/3] bg-[#eaf0fb]">
                  <Image
                    src={file.url}
                    alt={file.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                {file.caption ? <figcaption className="border-t border-[#edf1f7] bg-white px-4 py-3 text-[13px] text-[#6079bb]">{file.caption}</figcaption> : null}
              </figure>
            ))}
          </div>
        );
      })}
    </div>
  );
}

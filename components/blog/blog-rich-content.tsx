const slugifyHeading = (value: string) =>
  value
    .toLowerCase()
    .replace(/&[a-z0-9#]+;/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const addIdsToHtmlHeadings = (html: string) =>
  html.replace(/<h([1-6])([^>]*)>([\s\S]*?)<\/h\1>/gi, (_match, level, attributes, content) => {
    const plainText = content.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    const id = slugifyHeading(plainText);

    if (!id) {
      return `<h${level}${attributes}>${content}</h${level}>`;
    }

    if (/\sid=/.test(attributes)) {
      return `<h${level}${attributes}>${content}</h${level}>`;
    }

    return `<h${level}${attributes} id="${id}">${content}</h${level}>`;
  });

type BlogRichContentProps = {
  html: string;
};

export function BlogRichContent({ html }: BlogRichContentProps) {
  if (!html.trim()) {
    return <p className="text-[17px] leading-[1.85] text-[#556892]">This article does not have content yet.</p>;
  }

  return (
    <div
      className="space-y-5 text-[17px] leading-[1.9] text-[#556892] [&_a]:font-semibold [&_a]:text-[#365bb2] [&_a]:underline [&_a]:decoration-[#365bb2]/35 [&_a]:underline-offset-4 [&_blockquote]:rounded-[18px] [&_blockquote]:border-l-[4px] [&_blockquote]:border-[#FFC107] [&_blockquote]:bg-[linear-gradient(135deg,#f8fbff_0%,#eef5ff_100%)] [&_blockquote]:px-6 [&_blockquote]:py-6 [&_blockquote]:italic [&_h1]:text-[34px] [&_h1]:font-bold [&_h1]:leading-[1.18] [&_h1]:tracking-[-0.03em] [&_h1]:text-[#1c2744] [&_h1]:scroll-mt-28 [&_h2]:text-[28px] [&_h2]:font-bold [&_h2]:leading-[1.2] [&_h2]:tracking-[-0.03em] [&_h2]:text-[#1c2744] [&_h2]:scroll-mt-28 [&_h3]:text-[24px] [&_h3]:font-bold [&_h3]:leading-[1.25] [&_h3]:tracking-[-0.02em] [&_h3]:text-[#1c2744] [&_h3]:scroll-mt-28 [&_img]:h-auto [&_img]:w-full [&_img]:rounded-[18px] [&_img]:my-3 [&_li]:ml-6 [&_li]:list-disc [&_ol]:space-y-3 [&_ol]:pl-2 [&_p]:my-0 [&_ul]:space-y-3 [&_ul]:pl-2"
      dangerouslySetInnerHTML={{ __html: addIdsToHtmlHeadings(html) }}
    />
  );
}

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
      className="space-y-5 text-[17px] leading-[1.9] text-[#556892] [&_a]:font-semibold [&_a]:text-[#365bb2] [&_a]:underline [&_a]:decoration-[#365bb2]/35 [&_a]:underline-offset-4 [&_blockquote]:my-6 [&_blockquote]:rounded-[18px] [&_blockquote]:border-l-[4px] [&_blockquote]:border-[#FFC107] [&_blockquote]:bg-[linear-gradient(135deg,#f8fbff_0%,#eef5ff_100%)] [&_blockquote]:px-6 [&_blockquote]:py-6 [&_blockquote]:italic [&_h1]:mb-4 [&_h1]:mt-8 [&_h1]:text-[34px] [&_h1]:font-bold [&_h1]:leading-[1.18] [&_h1]:tracking-[-0.03em] [&_h1]:text-[#1c2744] [&_h1]:scroll-mt-28 [&_h2]:mb-3 [&_h2]:mt-7 [&_h2]:text-[28px] [&_h2]:font-bold [&_h2]:leading-[1.2] [&_h2]:tracking-[-0.03em] [&_h2]:text-[#1c2744] [&_h2]:scroll-mt-28 [&_h3]:mb-3 [&_h3]:mt-6 [&_h3]:text-[24px] [&_h3]:font-bold [&_h3]:leading-[1.25] [&_h3]:tracking-[-0.02em] [&_h3]:text-[#1c2744] [&_h3]:scroll-mt-28 [&_h4]:mb-2 [&_h4]:mt-5 [&_h4]:text-[20px] [&_h4]:font-bold [&_h4]:leading-[1.3] [&_h4]:tracking-[-0.01em] [&_h4]:text-[#1c2744] [&_img]:h-auto [&_img]:w-full [&_img]:rounded-[18px] [&_img]:my-4 [&_li]:ml-6 [&_li]:list-disc [&_ol]:my-4 [&_ol]:space-y-3 [&_ol]:pl-2 [&_p]:my-4 [&_ul]:my-4 [&_ul]:space-y-3 [&_ul]:pl-2"
      dangerouslySetInnerHTML={{ __html: addIdsToHtmlHeadings(html) }}
    />
  );
}

import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogRichContent } from "@/components/blog/blog-rich-content";
import type { BlogPostWithContent } from "@/lib/wordpress";
import { getAllPosts, getPostBySlug } from "@/lib/wordpress";

type PageProps = {
  params: Promise<{ slug: string }>;
};

type TocItem = {
  id: string;
  text: string;
};

export const revalidate = 300;

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));

const trimText = (value: string, maxLength: number) => {
  if (!value) {
    return "";
  }

  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength).trimEnd()}...`;
};

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

const stripHtml = (value: string) => decodeHtmlEntities(value).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

const slugifyHeading = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const buildTocAndHtml = (html: string): { tocItems: TocItem[]; updatedHtml: string } => {
  const tocItems: TocItem[] = [];
  const idCount = new Map<string, number>();

  const updatedHtml = html.replace(/<h2\b([^>]*)>([\s\S]*?)<\/h2>/gi, (_match, rawAttributes, content) => {
    const headingText = stripHtml(content);
    if (!headingText) {
      return `<h2${rawAttributes}>${content}</h2>`;
    }

    const baseId = slugifyHeading(headingText) || "section";
    const seenCount = idCount.get(baseId) ?? 0;
    idCount.set(baseId, seenCount + 1);
    const uniqueId = seenCount === 0 ? baseId : `${baseId}-${seenCount + 1}`;

    tocItems.push({ id: uniqueId, text: headingText });
    const attributesWithoutId = rawAttributes.replace(/\s+id=(["']).*?\1/gi, "");

    return `<h2${attributesWithoutId} id="${uniqueId}">${content}</h2>`;
  });

  return { tocItems, updatedHtml };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  let post: BlogPostWithContent | null = null;
  try {
    post = await getPostBySlug(slug);
  } catch {
    post = null;
  }

  if (!post) {
    return {
      title: "Blog Post | Improve ME Institute",
    };
  }

  return {
    title: `${post.title} | Improve ME Institute`,
    description: post.excerpt,
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;

  let post: BlogPostWithContent | null = null;
  let latestPosts: BlogPostWithContent[] = [];
  let hasCmsError = false;

  try {
    [post, latestPosts] = await Promise.all([getPostBySlug(slug), getAllPosts()]);
  } catch {
    hasCmsError = true;
  }

  if (hasCmsError) {
    return (
      <main className="min-h-screen bg-white">
        <section className="relative overflow-hidden bg-[#002D62] py-[72px] md:py-24">
          <div className="absolute inset-0 opacity-75">
            <div className="absolute -left-16 top-6 h-72 w-72 rounded-full bg-[#35508f]/45 blur-3xl" />
            <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-[#FFC107]/14 blur-3xl" />
          </div>
          <div className="section-container relative z-10">
            <Link href="/blogs" className="inline-flex items-center gap-2 text-[14px] font-medium text-white/74 transition-colors hover:text-white">
              <span aria-hidden="true">&larr;</span>
              Back to blogs
            </Link>
            <p className="mt-8 text-[11px] font-medium uppercase tracking-[0.22em] text-[#FFC107]">BLOG TEMPORARILY UNAVAILABLE</p>
            <h1 className="mt-4 max-w-4xl text-[38px] font-bold leading-[1.08] tracking-[-0.05em] text-white md:text-[58px]">
              The article service is offline right now.
            </h1>
            <p className="mt-6 max-w-3xl text-[18px] leading-[1.8] text-white/82">
              The blog CMS is not reachable right now. Please check your WordPress API connection.
            </p>
          </div>
        </section>
      </main>
    );
  }

  if (!post) {
    notFound();
  }

  const { tocItems, updatedHtml } = buildTocAndHtml(post.content);
  const latestBlogs = latestPosts.filter((entry) => entry.slug !== post.slug).slice(0, 5);

  return (
    <main className="min-h-screen bg-[#f4f6fa]">
      <section className="py-8 md:py-10">
        <div className="section-container">
          <div className="mb-6 flex justify-end">
            <Link href="/blogs" className="inline-flex items-center gap-2 text-[15px] font-semibold text-[#111827] transition-colors hover:text-[#1d4d8f]">
              <span aria-hidden="true" className="text-[#27b1de]">
                &rarr;
              </span>
              Go Back
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-[230px_minmax(0,1fr)_270px] xl:grid-cols-[250px_minmax(0,1fr)_290px]">
            <aside className="order-2 lg:order-1 lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-[24px] border border-[#d9e0ec] bg-[#f3f4f6] p-4 shadow-[0_14px_30px_rgba(15,23,42,0.08)] md:p-5">
                <h2 className="text-[20px] font-bold leading-[1.08] tracking-[-0.03em] text-[#1f2937]">Table of Content</h2>
                <div className="mt-4">
                  {tocItems.length ? (
                    <ul className="space-y-2">
                      {tocItems.map((item) => (
                        <li key={item.id}>
                          <a
                            href={`#${item.id}`}
                            className="block text-[13px] font-medium leading-[1.4] text-[#374151] transition-colors hover:text-[#1d4d8f]"
                          >
                            {item.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-[14px] text-[#6b7280]">No sections available for this article.</p>
                  )}
                </div>
              </div>
            </aside>

            <article className="order-1 min-w-0 lg:order-2">
              <div className="rounded-[24px]">
                <h1 className="max-w-4xl text-[30px] font-bold leading-[1.16] tracking-[-0.04em] text-[#143a68] md:text-[30px]">{post.title}</h1>

                <div className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-3 text-[15px] text-[#4b5563]">
                  <div className="inline-flex items-center gap-2">
                    <span aria-hidden="true" className="text-[20px] text-[#4b5563]">
                      &raquo;
                    </span>
                    <span className="text-[16px] md:text-[18px]">{formatDate(post.publishedAt)}</span>
                  </div>
                  <div className="inline-flex items-center gap-2">
                    <span aria-hidden="true" className="text-[20px] text-[#4b5563]">
                      &raquo;
                    </span>
                    <span className="text-[16px] md:text-[18px]">{post.readingTimeMinutes} min read</span>
                  </div>
                </div>

                {post.cover ? (
                  <div className="mt-8 overflow-hidden rounded-[22px]">
                    <div className="relative aspect-[16/9] bg-[#eaf0fb]">
                      <Image
                        src={post.cover.url}
                        alt={post.cover.alt}
                        fill
                        priority
                        sizes="(max-width: 1280px) 100vw, 900px"
                        className="object-cover"
                      />
                    </div>
                  </div>
                ) : null}

                <div className="mt-8">
                  <BlogRichContent html={updatedHtml} />
                </div>
              </div>
            </article>

            <aside className="order-3 lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-[24px] border border-[#d9e0ec] bg-[#f3f4f6] p-4 shadow-[0_14px_30px_rgba(15,23,42,0.08)] md:p-5">
                <h2 className="text-[20px] font-bold leading-[1.08] tracking-[-0.03em] text-[#1f2937]">Latest Blogs</h2>
                <div className="mt-5 space-y-2">
                  {latestBlogs.length ? latestBlogs.map((entry) => (
                    <Link
                      key={entry.id}
                      href={`/blogs/${entry.slug}`}
                      className="grid grid-cols-[84px_minmax(0,1fr)] items-start gap-3 rounded-[14px] p-1 transition-colors duration-200 hover:bg-white/75"
                    >
                      <div className="overflow-hidden rounded-[10px] bg-[#e4ebf7]">
                        <div className="relative h-[64px] w-[84px]">
                          {entry.cover ? (
                            <Image src={entry.cover.url} alt={entry.cover.alt} fill sizes="84px" className="object-cover" />
                          ) : (
                            <div className="h-full w-full bg-[linear-gradient(135deg,#002D62_0%,#35508f_65%,#FFC107_100%)]" />
                          )}
                        </div>
                      </div>
                      <div className="mt-[5px] min-w-0">
                        <h3 className="line-clamp-3 text-[13px] mb-[5px] leading-[1.35] text-[#374151] transition-colors hover:text-[#1d4d8f]">
                          {trimText(entry.title, 110)}
                        </h3>
                        <p className="mb-[5px] mt-0.5 text-[12px] text-[#9096a7]">{formatDate(entry.publishedAt)}</p>
                      </div>
                    </Link>
                  )) : (
                    <p className="text-[14px] text-[#6b7280]">No recent blogs available right now.</p>
                  )}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}

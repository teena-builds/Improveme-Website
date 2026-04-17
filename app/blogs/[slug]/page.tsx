import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogRichContent } from "@/components/blog/blog-rich-content";
import { getPostBySlug, getAllPosts } from "@/lib/wordpress";

  params: Promise<{ slug: string }>;
};

export const revalidate = 300;

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));

const trimExcerpt = (value: string, maxLength: number) => {
  if (!value) {
    return "";
  }

  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength).trimEnd()}...`;
};

  const { slug } = await params;
  const post = await getPostBySlug(slug);
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

  const { slug } = await params;
  let post = null;
  let latestPosts = [];
  let error = false;
  try {
    [post, latestPosts] = await Promise.all([
      getPostBySlug(slug),
      getAllPosts(),
    ]);
  } catch (e) {
    error = true;
  }
  if (error) {
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
  const latestBlogs = latestPosts.filter((entry) => entry.slug !== post.slug).slice(0, 6);
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

          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
            <article className="min-w-0">
              <div className="rounded-[24px] border border-[#dfe4ee] bg-white p-7 shadow-[0_14px_36px_rgba(15,23,42,0.08)] md:p-8">
                <h1 className="max-w-4xl text-[30px] font-bold leading-[1.16] tracking-[-0.04em] text-[#143a68] md:text-[44px]">
                  {post.title}
                </h1>

                <div className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-3 text-[15px] text-[#4b5563]">
                  <div className="inline-flex items-center gap-2">
                    <span aria-hidden="true" className="text-[20px] text-[#4b5563]">
                      &raquo;
                    </span>
                    <span className="text-[16px] md:text-[18px]">{formatDate(post.publishedAt)}</span>
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
                  <BlogRichContent blocks={post.blocks} />
                </div>
              </div>
            </article>

            <aside className="xl:sticky xl:top-28 xl:self-start">
              <div className="rounded-[24px] border border-[#dfe4ee] bg-white p-5 shadow-[0_14px_36px_rgba(15,23,42,0.08)]">
                <h2 className="text-[26px] font-bold leading-[1.1] tracking-[-0.03em] text-[#202430]">Latest Blogs</h2>
                <div className="mt-4 space-y-4">
                  {latestBlogs.map((entry) => (
                    <Link key={entry.id} href={`/blogs/${entry.slug}`} className="grid grid-cols-[120px_minmax(0,1fr)] gap-4 rounded-[16px] p-1 transition-colors hover:bg-[#f7f9fc]">
                      <div className="overflow-hidden rounded-[14px] bg-[#eaf0fb]">
                        <div className="relative aspect-[1.25/1]">
                          {entry.cover ? (
                            <Image src={entry.cover.url} alt={entry.cover.alt} fill sizes="120px" className="object-cover" />
                          ) : (
                            <div className="h-full w-full bg-[linear-gradient(135deg,#002D62_0%,#35508f_65%,#FFC107_100%)]" />
                          )}
                        </div>
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-[15px] leading-[1.45] text-[#252b37] transition-colors hover:text-[#1d4d8f]">
                          {trimExcerpt(entry.title, 68)}
                        </h3>
                        <p className="mt-2 text-[14px] text-[#7a8193]">{formatDate(entry.publishedAt)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}

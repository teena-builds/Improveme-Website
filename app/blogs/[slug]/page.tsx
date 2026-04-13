import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogRichContent } from "@/components/blog/blog-rich-content";
import { getPublishedBlogPostBySlug } from "@/lib/strapi";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { post } = await getPublishedBlogPostBySlug(slug);

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

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const { error, post } = await getPublishedBlogPostBySlug(slug);

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
              Start the Strapi server again and this article page will load normally.
            </p>
          </div>
        </section>
      </main>
    );
  }

  if (!post) {
    notFound();
  }

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
          <p className="mt-8 text-[11px] font-medium uppercase tracking-[0.22em] text-[#FFC107]">{formatDate(post.publishedAt)}</p>
          <h1 className="mt-4 max-w-4xl text-[38px] font-bold leading-[1.08] tracking-[-0.05em] text-white md:text-[58px]">{post.title}</h1>
          {post.excerpt ? <p className="mt-6 max-w-3xl text-[18px] leading-[1.8] text-white/82">{post.excerpt}</p> : null}
        </div>
      </section>

      <section className="bg-[#f7f9fd] py-12 md:py-16">
        <div className="section-container">
          <div className="mx-auto max-w-[72rem] overflow-hidden rounded-[22px] border border-[#e7ebf2] bg-white shadow-[0_18px_44px_rgba(15,23,42,0.08)]">
            {post.cover ? (
              <div className="relative aspect-[16/8] bg-[#eaf0fb]">
                <Image
                  src={post.cover.url}
                  alt={post.cover.alt}
                  fill
                  priority
                  sizes="(max-width: 1280px) 100vw, 1152px"
                  className="object-cover"
                />
              </div>
            ) : null}

            <div className="mx-auto max-w-[52rem] px-6 py-8 md:px-10 md:py-12">
              <BlogRichContent blocks={post.blocks} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

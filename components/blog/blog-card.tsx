import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/strapi";

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));

const trimExcerpt = (value: string, maxLength: number) => {
  if (!value) {
    return "Read the latest article from Improve ME Institute.";
  }

  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength).trimEnd()}...`;
};

type BlogCardProps = {
  post: BlogPost;
  featured?: boolean;
};

export function BlogCard({ post, featured = false }: BlogCardProps) {
  return (
    <article
      className={`group overflow-hidden rounded-[24px] border border-[#d9e1ec] bg-white shadow-[0_14px_36px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_44px_rgba(15,23,42,0.13)] ${
        featured ? "lg:grid lg:grid-cols-[1.1fr_0.9fr]" : "h-full"
      }`}
    >
      <Link href={`/blogs/${post.slug}`} className="block">
        <div
          className={`relative overflow-hidden bg-[linear-gradient(145deg,#0f2857_0%,#264c8f_58%,#ffd15a_100%)] ${
            featured ? "aspect-[16/10] h-full min-h-[320px] lg:aspect-auto lg:min-h-[100%]" : "aspect-[1.38/1]"
          }`}
        >
          {post.cover ? (
            <Image
              src={post.cover.url}
              alt={post.cover.alt}
              fill
              sizes={featured ? "(max-width: 1024px) 100vw, 58vw" : "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"}
              className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
            />
          ) : (
            <div className="flex h-full items-end bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.2),transparent_35%),linear-gradient(135deg,#002D62_0%,#35508f_65%,#FFC107_100%)] p-6">
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/90">
                Improve ME Blog
              </span>
            </div>
          )}

          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,18,44,0.04)_0%,rgba(7,18,44,0.14)_58%,rgba(7,18,44,0.42)_100%)]" />
          <div className="absolute left-5 top-5">
            <div className="inline-flex items-center rounded-full bg-white/94 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1c2744] shadow-[0_10px_20px_rgba(15,23,42,0.14)]">
              {featured ? "Featured" : "Improve ME Blog"}
            </div>
          </div>
        </div>
      </Link>

      <div
        className={`bg-white ${
          featured ? "px-7 py-7 md:px-8 md:py-8 lg:flex lg:flex-col lg:justify-center" : "flex h-[280px] flex-col px-6 py-6"
        }`}
      >
        <p className="text-[14px] font-medium tracking-[-0.01em] text-[#6c748a]">{formatDate(post.publishedAt)}</p>
        <h2
  className={`mt-4 font-bold leading-[1.6] tracking-normal text-[#202430] ${
    featured
      ? "text-[32px] md:text-[40px]"
      : "line-clamp-1 text-[20px] md:text-[20px]"
  }`}
>
          <Link href={`/blogs/${post.slug}`} className="transition-colors hover:text-[#365bb2]">
            {post.title}
          </Link>
        </h2>
        <p
          className={`mt-4 text-[#596273] ${
            featured ? "max-w-[30rem] text-[17px] leading-[1.8]" : "line-clamp-3 text-[15px] leading-[1.85]"
          }`}
        >
          {trimExcerpt(post.excerpt, featured ? 260 : 135)}
        </p>
        <Link
          href={`/blogs/${post.slug}`}
          className="mt-auto inline-flex w-fit items-center gap-2 pt-6 text-[15px] font-semibold text-[#1f355f] transition-colors hover:text-[#365bb2]"
        >
          Read article
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </article>
  );
}

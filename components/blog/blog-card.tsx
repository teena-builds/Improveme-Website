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
      className={`group overflow-hidden rounded-[26px] border border-[#d8dfeb] bg-white shadow-[0_18px_46px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_56px_rgba(15,23,42,0.14)] ${
        featured ? "lg:grid lg:grid-cols-[1.15fr_0.85fr]" : ""
      }`}
    >
      <Link href={`/blogs/${post.slug}`} className="block">
        <div
          className={`relative overflow-hidden bg-[linear-gradient(145deg,#0f2857_0%,#264c8f_58%,#ffd15a_100%)] ${
            featured ? "aspect-[16/11] h-full min-h-[320px] lg:aspect-auto lg:min-h-[100%]" : "aspect-[16/10]"
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

          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,18,44,0.02)_0%,rgba(7,18,44,0.18)_58%,rgba(7,18,44,0.72)_100%)]" />
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
            <div className="inline-flex items-center rounded-full bg-white/92 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#1c2744] shadow-[0_10px_20px_rgba(15,23,42,0.15)]">
              Improve ME Blog
            </div>
          </div>
        </div>
      </Link>

      <div className={`bg-[linear-gradient(180deg,#ffffff_0%,#fbfcff_100%)] ${featured ? "px-7 py-7 md:px-8 md:py-8 lg:flex lg:flex-col lg:justify-center" : "px-6 py-6"}`}>
        <p className="text-[13px] font-medium tracking-[-0.01em] text-[#6b7692]">{formatDate(post.publishedAt)}</p>
        <h2 className={`mt-4 font-bold leading-[1.16] tracking-[-0.04em] text-[#1a233b] ${featured ? "text-[30px] md:text-[38px]" : "text-[22px] md:text-[24px]"}`}>
          <Link href={`/blogs/${post.slug}`} className="transition-colors hover:text-[#365bb2]">
            {post.title}
          </Link>
        </h2>
        <p className={`mt-4 text-[#5d6884] ${featured ? "max-w-[30rem] text-[17px] leading-[1.8]" : "text-[15px] leading-[1.78]"}`}>
          {trimExcerpt(post.excerpt, featured ? 240 : 120)}
        </p>
        <Link
          href={`/blogs/${post.slug}`}
          className="mt-7 inline-flex w-fit items-center gap-2 rounded-full border border-[#d9e3f3] bg-[#f4f7fc] px-5 py-2.5 text-[14px] font-semibold text-[#1c2744] transition-all hover:border-[#bfd0ec] hover:bg-white hover:text-[#365bb2]"
        >
          Read article
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </article>
  );
}

import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/strapi";

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="group overflow-hidden rounded-[18px] border border-[#e7ebf2] bg-white shadow-[0_10px_28px_rgba(15,23,42,0.08)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(15,23,42,0.12)]">
      <Link href={`/blogs/${post.slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden bg-[linear-gradient(135deg,#002D62_0%,#35508f_60%,#FFC107_100%)]">
          {post.cover ? (
            <Image
              src={post.cover.url}
              alt={post.cover.alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full items-end bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.2),transparent_35%),linear-gradient(135deg,#002D62_0%,#35508f_65%,#FFC107_100%)] p-6">
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/90">
                Improve ME Blog
              </span>
            </div>
          )}
        </div>
      </Link>

      <div className="px-6 py-6">
        <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#D4AF37]">{formatDate(post.publishedAt)}</p>
        <h2 className="mt-3 text-[24px] font-bold leading-[1.2] tracking-[-0.03em] text-[#1c2744]">
          <Link href={`/blogs/${post.slug}`} className="transition-colors hover:text-[#365bb2]">
            {post.title}
          </Link>
        </h2>
        <p className="mt-4 text-[15px] leading-[1.75] text-[#5a6da2]">{post.excerpt || "Read the latest article from Improve ME Institute."}</p>
        <Link href={`/blogs/${post.slug}`} className="mt-6 inline-flex items-center gap-2 text-[15px] font-semibold text-[#1c2744] transition-colors hover:text-[#365bb2]">
          Read article
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </article>
  );
}

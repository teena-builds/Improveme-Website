import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/wordpress";

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));

type LatestGuidesNewsSectionProps = {
  posts: BlogPost[];
  className?: string;
  heading?: string;
  subtitle?: string;
};

export function LatestGuidesNewsSection({
  posts,
  className = "",
  heading = "Latest Guides & News Articles",
  subtitle = "Stay ahead with practical insights, study strategies, and expert guidance from our tutoring team.",
}: LatestGuidesNewsSectionProps) {
  if (!posts.length) {
    return null;
  }

  const latestPosts = posts.slice(0, 3);

  return (
    <section className={className || "bg-[#f4f6fb] py-16 md:py-20"}>
      <div className="section-container">
        <div className="mx-auto max-w-[860px] text-center">
          <h2 className="text-[34px] font-bold tracking-[-0.04em] text-[#1c2744] md:text-[50px]">{heading}</h2>
          <p className="mx-auto mt-4 max-w-[690px] text-[18px] leading-[1.7] text-[#4c649f]">{subtitle}</p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {latestPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blogs/${post.slug}`}
              className="group block overflow-hidden rounded-[18px] border border-[#dfe4ef] bg-white shadow-[0_12px_30px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(15,23,42,0.12)]"
            >
              <div className="relative aspect-[1.56/1] overflow-hidden bg-[linear-gradient(135deg,#0f2857_0%,#264c8f_62%,#ffd15a_100%)]">
                {post.cover ? (
                  <Image
                    src={post.cover.url}
                    alt={post.cover.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                ) : null}
              </div>
              <div className="px-5 pb-6 pt-5 md:px-6">
                <p className="text-[14px] text-[#6c748a]">{formatDate(post.publishedAt)}</p>
                <h3 className="mt-3 line-clamp-2 text-[22px] font-bold leading-[1.35] tracking-[-0.01em] text-[#202430] transition-colors group-hover:text-[#2f559a]">
                  {post.title}
                </h3>
                <p className="mt-3 line-clamp-2 text-[15px] leading-[1.65] text-[#5d6782]">
                  {post.excerpt || "Read the latest guidance and insights from Improve ME Institute."}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import { connection } from "next/server";
import { BlogCard } from "@/components/blog/blog-card";
import { getPublishedBlogPosts } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Blogs | Improve ME Institute",
  description: "Insights, updates, and educational guidance from Improve ME Institute.",
};

export default async function BlogsPage() {
  await connection();
  const { error, posts } = await getPublishedBlogPosts();
  const [featuredPost, ...remainingPosts] = posts;
  const categoryPills = ["All", "Exam Prep", "Study Tips", "Curriculum", "Career Guidance"];

  return (
    <main className="min-h-screen bg-[#f4f6fa]">
      <section className="relative overflow-hidden bg-[#002D62] pb-14 pt-20 md:pb-20 md:pt-28">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_34%),linear-gradient(135deg,#002D62_0%,#113a7b_58%,#1b4c91_100%)]" />
        </div>
        <div className="section-container relative z-10">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#FFC107]">OUR BLOGS</p>
          <h1 className="mt-4 max-w-4xl text-[38px] font-bold leading-[1.08] tracking-[-0.05em] text-white md:text-[54px]">
            Expert Advice for Dubai Students & Parents
          </h1>
          <p className="mt-5 max-w-2xl text-[18px] leading-[1.75] text-white/82">
            Study tips, curriculum guides, and exam strategies, written by educators who care.
          </p>
        </div>
      </section>

      <section className="border-b border-[#dfe4ee] bg-white">
        <div className="section-container">
          <div className="flex flex-wrap gap-2 py-5 md:gap-3">
            {categoryPills.map((pill, index) => (
              <button
                key={pill}
                type="button"
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                  index === 0 ? "bg-[#FFC107] text-[#002D62]" : "bg-[#eef2f7] text-[#667085] hover:bg-[#e4ebf5]"
                }`}
              >
                {pill}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="section-container">
          {error ? (
            <div className="rounded-[28px] border border-[#d8dfeb] bg-white px-8 py-10 shadow-[0_18px_44px_rgba(15,23,42,0.08)]">
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#D4AF37]">BLOG TEMPORARILY UNAVAILABLE</p>
              <h2 className="mt-3 text-[30px] font-bold tracking-[-0.04em] text-[#1c2744]">The blog CMS is not reachable right now.</h2>
              <p className="mt-4 max-w-2xl text-[16px] leading-[1.8] text-[#5a6da2]">
                Start the Strapi server again and this page will automatically load published posts.
              </p>
            </div>
          ) : posts.length ? (
            <div className="space-y-8">
              {featuredPost ? <BlogCard post={featuredPost} featured /> : null}

              {remainingPosts.length ? (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {remainingPosts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
              ) : null}
            </div>
          ) : (
            <div className="rounded-[28px] border border-[#d8dfeb] bg-white px-8 py-10 shadow-[0_18px_44px_rgba(15,23,42,0.08)]">
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#D4AF37]">NO PUBLISHED POSTS YET</p>
              <h2 className="mt-3 text-[30px] font-bold tracking-[-0.04em] text-[#1c2744]">The blog is connected and ready.</h2>
              <p className="mt-4 max-w-2xl text-[16px] leading-[1.8] text-[#5a6da2]">
                As soon as an article is published in Strapi, it will appear on this page automatically.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

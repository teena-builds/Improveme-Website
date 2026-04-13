import type { Metadata } from "next";
import { BlogCard } from "@/components/blog/blog-card";
import { getPublishedBlogPosts } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Blogs | Improve ME Institute",
  description: "Insights, updates, and educational guidance from Improve ME Institute.",
};

export default async function BlogsPage() {
  const posts = await getPublishedBlogPosts();

  return (
    <main className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-[#002D62] py-20 md:py-28">
        <div className="absolute inset-0 opacity-80">
          <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-[#35508f]/40 blur-3xl" />
          <div className="absolute right-0 top-12 h-80 w-80 rounded-full bg-[#FFC107]/15 blur-3xl" />
        </div>
        <div className="section-container relative z-10">
          <span className="mb-4 block h-[3px] w-10 rounded-full bg-[#FFC107]" />
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#FFC107]">IMPROVE ME BLOG</p>
          <h1 className="mt-4 max-w-4xl text-[42px] font-bold leading-[1.05] tracking-[-0.05em] text-white md:text-[60px]">
            Published articles managed directly from Strapi
          </h1>
          <p className="mt-6 max-w-2xl text-[18px] leading-[1.8] text-white/82">
            Every published post from the CMS appears here automatically, styled to match the rest of the Improve ME website.
          </p>
        </div>
      </section>

      <section className="bg-[#f7f9fd] py-16 md:py-20">
        <div className="section-container">
          {posts.length ? (
            <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="rounded-[20px] border border-[#e7ebf2] bg-white px-8 py-10 shadow-[0_10px_28px_rgba(15,23,42,0.08)]">
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


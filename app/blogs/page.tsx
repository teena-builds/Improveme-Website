import type { Metadata } from "next";
import { BlogCard } from "@/components/blog/blog-card";
import { getPublishedBlogPosts } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Blogs | Improve ME Institute",
  description: "Insights, updates, and educational guidance from Improve ME Institute.",
};

export default async function BlogsPage() {
  const { error, posts } = await getPublishedBlogPosts();
  const [featuredPost, ...remainingPosts] = posts;

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#edf3fb_0%,#f8fbff_32%,#f4f7fc_100%)]">
      <section className="relative overflow-hidden bg-[#0f2857] py-20 md:py-28">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.16),transparent_34%),radial-gradient(circle_at_85%_20%,rgba(255,193,7,0.22),transparent_22%),linear-gradient(135deg,#0f2857_0%,#173870_52%,#274f91_100%)]" />
          <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-white/8 blur-3xl" />
          <div className="absolute right-0 top-12 h-80 w-80 rounded-full bg-[#FFC107]/12 blur-3xl" />
        </div>
        <div className="section-container relative z-10">
          <div className="inline-flex items-center rounded-full border border-white/15 bg-white/8 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ffd76a] backdrop-blur-[6px]">
            Improve ME Journal
          </div>
          <h1 className="mt-6 max-w-4xl text-[42px] font-bold leading-[1.02] tracking-[-0.06em] text-white md:text-[64px]">
            Helpful, polished articles that look like they belong on a real editorial homepage
          </h1>
          <div className="mt-7 grid gap-4 md:max-w-3xl md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
            <p className="max-w-2xl text-[18px] leading-[1.85] text-white/80">
              Your published Strapi posts now sit in a cleaner magazine-style layout with stronger visual hierarchy, softer cards, and more natural reading flow.
            </p>
            <div className="rounded-[18px] border border-white/12 bg-white/10 px-5 py-4 text-white/78 shadow-[0_16px_40px_rgba(0,0,0,0.16)] backdrop-blur-[8px]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#ffd76a]">Live Count</p>
              <p className="mt-2 text-[30px] font-bold tracking-[-0.05em] text-white">{posts.length}</p>
              <p className="text-[13px] text-white/68">Published posts</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-18">
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

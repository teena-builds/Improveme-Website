import type { Metadata } from "next";
import Link from "next/link";

import { BlogCard } from "@/components/blog/blog-card";
import type { BlogPostWithContent } from "@/lib/wordpress";
import { getAllCategories, getAllPosts } from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "Blogs | Improve ME Institute",
  description: "Insights, updates, and educational guidance from Improve ME Institute.",
};

export const revalidate = 300;
const POSTS_PER_PAGE = 6;
const CATEGORY_QUERY_TO_WORDPRESS_SLUG: Record<string, string> = {
  books: "uncategorized",
};
const CATEGORY_WORDPRESS_TO_QUERY_SLUG = Object.fromEntries(
  Object.entries(CATEGORY_QUERY_TO_WORDPRESS_SLUG).map(([querySlug, wordpressSlug]) => [wordpressSlug, querySlug])
) as Record<string, string>;

const CATEGORY_LABEL_OVERRIDES: Record<string, string> = {
  checked: "Checked",
  books: "Books",
  uncategorized: "Books",
};

type BlogsPageProps = {
  searchParams?: Promise<{ category?: string; page?: string }>;
};

const parsePageNumber = (value: string | undefined) => {
  const parsed = Number.parseInt(value ?? "1", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
};

const resolveSelectedCategory = (
  categories: { id: number; name: string; slug: string }[],
  requestedCategorySlug: string | undefined
) => {
  if (!requestedCategorySlug) {
    return undefined;
  }

  const directMatch = categories.find((category) => category.slug === requestedCategorySlug);
  if (directMatch) {
    return directMatch;
  }

  const mappedWordpressSlug = CATEGORY_QUERY_TO_WORDPRESS_SLUG[requestedCategorySlug];
  if (!mappedWordpressSlug) {
    return undefined;
  }

  return categories.find((category) => category.slug === mappedWordpressSlug);
};

const getCategoryDisplayName = (category: { name: string; slug: string }) => {
  const querySlug = CATEGORY_WORDPRESS_TO_QUERY_SLUG[category.slug] ?? category.slug;
  return CATEGORY_LABEL_OVERRIDES[querySlug] ?? CATEGORY_LABEL_OVERRIDES[category.slug] ?? category.name;
};

export default async function BlogsPage({ searchParams }: BlogsPageProps) {
  let posts: BlogPostWithContent[] = [];
  let categories: { id: number; name: string; slug: string }[] = [];
  let hasCmsError = false;
  try {
    [posts, categories] = await Promise.all([getAllPosts(), getAllCategories()]);
  } catch {
    hasCmsError = true;
  }

  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const requestedCategorySlug = resolvedSearchParams?.category?.trim();
  const selectedCategory = resolveSelectedCategory(categories, requestedCategorySlug);
  const activeCategorySlug = selectedCategory ? (CATEGORY_WORDPRESS_TO_QUERY_SLUG[selectedCategory.slug] ?? selectedCategory.slug) : "all";
  const filteredPosts =
    selectedCategory && selectedCategory.id
      ? posts.filter((post) => post.categoryIds.includes(selectedCategory.id))
      : posts;

  const requestedPage = parsePageNumber(resolvedSearchParams?.page);
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const currentPage = Math.min(requestedPage, totalPages);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
  const categoryLabelById = new Map<number, string>(
    categories.map((category) => [category.id, getCategoryDisplayName(category)])
  );

  const categoryPills = (() => {
    const mapped = categories.map((category) => {
      const querySlug = CATEGORY_WORDPRESS_TO_QUERY_SLUG[category.slug] ?? category.slug;
      return {
        ...category,
        wordpressSlug: category.slug,
        slug: querySlug,
        name: getCategoryDisplayName(category),
      };
    });

    const dedupedByQuerySlug = new Map<string, (typeof mapped)[number]>();
    for (const entry of mapped) {
      const existing = dedupedByQuerySlug.get(entry.slug);
      if (!existing) {
        dedupedByQuerySlug.set(entry.slug, entry);
        continue;
      }

      // Prefer a real category slug over alias fallback when both collapse to same query slug.
      const existingIsAliasFallback = existing.wordpressSlug === CATEGORY_QUERY_TO_WORDPRESS_SLUG[entry.slug];
      if (existingIsAliasFallback && entry.wordpressSlug !== CATEGORY_QUERY_TO_WORDPRESS_SLUG[entry.slug]) {
        dedupedByQuerySlug.set(entry.slug, entry);
      }
    }

    return [{ name: "All Blogs", slug: "all" }, ...Array.from(dedupedByQuerySlug.values())];
  })();
  const getBlogsHref = (page: number, categorySlug: string) => {
    const params = new URLSearchParams();
    if (categorySlug !== "all") {
      params.set("category", categorySlug);
    }
    if (page > 1) {
      params.set("page", String(page));
    }
    const query = params.toString();
    return query ? `/blogs?${query}` : "/blogs";
  };

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
            {categoryPills.map((pill) => (
              <Link
                key={pill.slug}
                href={getBlogsHref(1, pill.slug)}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                  activeCategorySlug === pill.slug
                    ? "bg-[#FFC107] text-[#002D62]"
                    : "bg-[#eef2f7] text-[#667085] hover:bg-[#e4ebf5]"
                }`}
              >
                {pill.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="section-container">
          {hasCmsError ? (
            <div className="rounded-[28px] border border-[#d8dfeb] bg-white px-8 py-10 shadow-[0_18px_44px_rgba(15,23,42,0.08)]">
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#D4AF37]">BLOG TEMPORARILY UNAVAILABLE</p>
              <h2 className="mt-3 text-[30px] font-bold tracking-[-0.04em] text-[#1c2744]">The blog CMS is not reachable right now.</h2>
              <p className="mt-4 max-w-2xl text-[16px] leading-[1.8] text-[#5a6da2]">
                The blog CMS is not reachable right now. Please check your WordPress API connection.
              </p>
            </div>
          ) : filteredPosts.length ? (
            <div className="space-y-8">
              <div className="grid gap-6 md:grid-cols-3">
                {paginatedPosts.map((post) => (
                  <BlogCard
                    key={post.id}
                    post={post}
                    categoryLabel={post.categoryIds.map((categoryId) => categoryLabelById.get(categoryId)).find(Boolean)}
                  />
                ))}
              </div>

              {totalPages > 1 ? (
                <nav aria-label="Blog pagination" className="flex flex-wrap items-center justify-center gap-2 pt-2">
                  <Link
                    href={currentPage > 1 ? getBlogsHref(currentPage - 1, activeCategorySlug) : getBlogsHref(1, activeCategorySlug)}
                    aria-disabled={currentPage === 1}
                    className={`rounded-md border px-4 py-2 text-sm font-semibold transition-colors ${
                      currentPage === 1
                        ? "pointer-events-none border-[#d5dbe8] bg-[#f5f7fb] text-[#9aa3b7]"
                        : "border-[#d5dbe8] bg-white text-[#1f2a44] hover:bg-[#f0f4fb]"
                    }`}
                  >
                    Previous
                  </Link>

                  {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => {
                    const isActive = pageNumber === currentPage;
                    return (
                      <Link
                        key={pageNumber}
                        href={getBlogsHref(pageNumber, activeCategorySlug)}
                        aria-current={isActive ? "page" : undefined}
                        className={`rounded-md border px-3 py-2 text-sm font-semibold transition-colors ${
                          isActive
                            ? "border-[#002D62] bg-[#002D62] text-white"
                            : "border-[#d5dbe8] bg-white text-[#1f2a44] hover:bg-[#f0f4fb]"
                        }`}
                      >
                        {pageNumber}
                      </Link>
                    );
                  })}

                  <Link
                    href={
                      currentPage < totalPages
                        ? getBlogsHref(currentPage + 1, activeCategorySlug)
                        : getBlogsHref(totalPages, activeCategorySlug)
                    }
                    aria-disabled={currentPage === totalPages}
                    className={`rounded-md border px-4 py-2 text-sm font-semibold transition-colors ${
                      currentPage === totalPages
                        ? "pointer-events-none border-[#d5dbe8] bg-[#f5f7fb] text-[#9aa3b7]"
                        : "border-[#d5dbe8] bg-white text-[#1f2a44] hover:bg-[#f0f4fb]"
                    }`}
                  >
                    Next
                  </Link>
                </nav>
              ) : null}
            </div>
          ) : (
            <div className="rounded-[28px] border border-[#d8dfeb] bg-white px-8 py-10 shadow-[0_18px_44px_rgba(15,23,42,0.08)]">
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#D4AF37]">NO POSTS IN THIS CATEGORY</p>
              <h2 className="mt-3 text-[30px] font-bold tracking-[-0.04em] text-[#1c2744]">No blogs found for this filter yet.</h2>
              <p className="mt-4 max-w-2xl text-[16px] leading-[1.8] text-[#5a6da2]">
                Try another category or check back soon. New WordPress posts appear here automatically after publishing.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

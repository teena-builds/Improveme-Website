import type { Metadata } from "next";
import Link from "next/link";
import { LatestGuidesNewsSection } from "@/components/blog/latest-guides-news-section";
import { getPublishedBlogPosts } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Thank You | Improve ME Institute",
  description: "Your free assessment request has been received. Our team will contact you shortly.",
};

export default async function BookAssessmentThankYouPage() {
  const { posts } = await getPublishedBlogPosts();

  return (
    <main className="min-h-screen bg-[#f0f4ff]">
      <section className="relative overflow-hidden bg-[#002D62] pb-16 pt-20 md:pb-24 md:pt-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-[#35508f]/45 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#FFC107]/14 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.14),transparent_35%),linear-gradient(135deg,#002D62_0%,#113a7b_58%,#1b4c91_100%)]" />
        </div>

        <div className="section-container relative z-10">
          <div className="mx-auto max-w-[760px] rounded-[22px] border border-white/15 bg-white/10 p-6 text-white shadow-[0_16px_44px_rgba(0,0,0,0.2)] backdrop-blur-[6px] md:p-8">
            <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#FFC107] text-[20px] font-bold text-[#1c2744]">
              ✓
            </span>
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#FFC107]">SUBMISSION RECEIVED</p>
            <h1 className="mt-4 text-[34px] font-bold leading-[1.08] tracking-[-0.04em] md:text-[52px]">
              Thank You. We&apos;ve Got Your Request.
            </h1>
            <p className="mt-5 max-w-[640px] text-[17px] leading-[1.8] text-white/88">
              Your free assessment request was submitted successfully. Our academic team will review your details and get back
              to you shortly with the best next step.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full bg-[#FFC107] px-7 py-[13px] text-[15px] font-semibold text-black transition-colors duration-200 hover:bg-[#f0b400]"
              >
                Back to Home
              </Link>
              <Link
                href="/contact/"
                className="inline-flex items-center justify-center rounded-full border border-white/40 px-7 py-[13px] text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-white/10"
              >
                Return to Contact Page
              </Link>
            </div>
          </div>
        </div>
      </section>

      <LatestGuidesNewsSection
        posts={posts}
        className="bg-[#f0f4ff] pb-16 pt-14 md:pb-20 md:pt-16"
        subtitle="While you wait, explore our latest articles for study tips and curriculum guidance."
      />
    </main>
  );
}

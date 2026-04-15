import Image from "next/image";
import Link from "next/link";
import { getPublishedBlogPosts } from "@/lib/strapi";

function SocialIcon({ path }: { path: React.ReactNode }) {
  return (
    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/70 transition hover:bg-white/15 hover:text-white">
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        {path}
      </svg>
    </span>
  );
}

const formatBlogDate = (value: string) =>
  new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));

export async function SiteFooterRefined() {
  const { error, posts } = await getPublishedBlogPosts();
  const latestBlogs = !error ? posts.slice(0, 3) : [];

  return (
    <>
      <footer className="bg-[#141c2d] text-white">
        <div className="max-w-none w-full px-4 sm:px-6 lg:px-20 py-10">
          <div className="grid grid-cols-7 gap-8 md:grid-cols-7 lg:grid-cols-7">
            <div className="md:col-span-1">
              <Link href="/">
                <Image src="/ref/logo.png" alt="Improve ME Institute" width={180} height={45} className="h-[44px] w-auto" />
              </Link>
              <p className="mt-4 text-[14px] leading-7 text-white/70">Leading Tutoring Centre in Dubai</p>
              <div className="mt-5 flex gap-3">
                <Link href="https://www.tiktok.com/" aria-label="TikTok">
                  <SocialIcon path={<path d="M14.5 3c.4 2 1.6 3.6 3.5 4.6V10a8.5 8.5 0 0 1-3.5-1v6.1a5.1 5.1 0 1 1-5.1-5.1c.4 0 .8 0 1.2.1v2.6a2.9 2.9 0 1 0 1.8 2.7V3h2.1Z" />} />
                </Link>
                <Link href="https://www.instagram.com/" aria-label="Instagram">
                  <SocialIcon
                    path={
                      <>
                        <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm0 2.2A1.8 1.8 0 0 0 5.2 7v10c0 1 .8 1.8 1.8 1.8h10c1 0 1.8-.8 1.8-1.8V7c0-1-.8-1.8-1.8-1.8H7Z" />
                        <path d="M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm0 2.2a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6Zm4.5-3.3a1 1 0 1 1 0 2.1 1 1 0 0 1 0-2.1Z" />
                      </>
                    }
                  />
                </Link>
                <Link href="https://www.facebook.com/" aria-label="Facebook">
                  <SocialIcon path={<path d="M13.2 21v-7h2.4l.4-2.7h-2.8V9.6c0-.8.2-1.3 1.4-1.3H16V5.8c-.6 0-1.2-.1-1.9-.1-1.9 0-3.2 1.1-3.2 3.3v2.3H8.8V14h2.1v7h2.3Z" />} />
                </Link>
              </div>
              <Link
                href="/contact/#booking-form"
                className="mt-4 inline-flex rounded-full bg-[#FFC107] px-5 py-[11px] text-[14px] font-semibold text-black transition hover:bg-[#f0b400]"
              >
                Book Your Free Assessment
              </Link>
            </div>

            <div>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">PRIMARY</p>
              <div className="space-y-2 text-[14px] text-white/72">
                {[
                  ["/curriculum/primary/eyfs/", "EYFS"],
                  ["/curriculum/primary/ks1/", "Key Stage 1"],
                  ["/curriculum/primary/ks2/", "Key Stage 2"],
                  ["/courses/mathematics/", "Mathematics"],
                  ["/courses/english/", "English"],
                  ["/courses/science/", "Science"],
                ].map(([href, label]) => (
                  <Link key={href} href={href} className="block transition hover:text-white">
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">SECONDARY</p>
              <p className="mb-2 text-[10px] uppercase tracking-[0.16em] text-white/35">QUALIFICATIONS</p>
              <div className="space-y-1.5 text-[14px] text-white/72">
                {[
                  ["/curriculum/secondary/ks3/", "Key Stage 3"],
                  ["/curriculum/secondary/gcse/", "GCSE"],
                  ["/curriculum/secondary/igcse/", "IGCSE"],
                  ["/curriculum/secondary/a-level/", "A-Level"],
                  ["/curriculum/secondary/ib/", "IB Diploma"],
                  ["/curriculum/secondary/myp/", "MYP"],
                ].map(([href, label]) => (
                  <Link key={href} href={href} className="block transition hover:text-white">
                    {label}
                  </Link>
                ))}
              </div>
              <p className="mb-2 mt-5 text-[10px] uppercase tracking-[0.16em] text-white/35">SUBJECTS</p>
              <div className="space-y-1.5 text-[14px] text-white/72">
                {[
                  ["/courses/mathematics/", "Mathematics"],
                  ["/courses/english/", "English"],
                  ["/courses/physics/", "Physics"],
                  ["/courses/chemistry/", "Chemistry"],
                  ["/courses/biology/", "Biology"],
                  ["/courses/business-studies/", "Business Studies"],
                  ["/courses/economics/", "Economics"],
                  ["/courses/psychology/", "Psychology"],
                ].map(([href, label]) => (
                  <Link key={href} href={href} className="block transition hover:text-white">
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">ENRICHMENT</p>
              <div className="space-y-1.5 text-[14px] text-white/72">
                {[
                  ["/courses/cat-prep/", "CAT4 Prep"],
                  ["/courses/entrance-prep/", "7+/11+ Entrance Prep"],
                  ["/courses/chess/", "Chess Mastery"],
                  ["/courses/financial-literacy/", "Financial Literacy"],
                  ["/courses/ai-literacy/", "AI Literacy"],
                  ["/courses/counselling/", "Counselling"],
                ].map(([href, label]) => (
                  <Link key={href} href={href} className="block transition hover:text-white">
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">CONTACT</p>
              <p className="text-[14px] leading-8 text-white/72">
                Suite 3016-3017, Building 3
                <br />
                Gold and Diamond Park, Dubai
              </p>
              <div className="mt-5 space-y-1.5 text-[14px] leading-6 text-white/72">
                <a href="tel:+971501852505" className="block transition hover:text-white">Primary: +971 50 185 2505</a>
                <a href="tel:+971585334989" className="block transition hover:text-white">Lower Secondary: +971 58 533 4989</a>
                <a href="tel:+971585471457" className="block transition hover:text-white">Upper Secondary: +971 58 547 1457</a>
                <a href="tel:+97143805525" className="block transition hover:text-white">Landline: +971 4 380 5525</a>
                <a href="mailto:contact@improvemeinstitute.com" className="block transition hover:text-white">contact@improvemeinstitute.com</a>
                <p className="text-xs text-white/40 mt-2">Mon-Fri: 9:30am-8:00pm · Sat: 9:00am-7:00pm</p>
              </div>
            </div>
            <div className="lg:col-span-2">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">LATEST BLOGS</p>
              {latestBlogs.length ? (
                <div className="space-y-4">
                  {latestBlogs.map((post) => (
                    <article key={post.id}>
                      <p className="text-[11px] text-white/45">{formatBlogDate(post.publishedAt)}</p>
                      <Link
                        href={`/blogs/${post.slug}`}
                        className="mt-1 block text-[15px] leading-6 text-white/85 transition hover:text-white"
                      >
                        {post.title}
                      </Link>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-[14px] leading-6 text-white/60">
                    {error ? "Blogs are temporarily unavailable." : "No blog posts published yet."}
                  </p>
                  <Link href="/blogs/" className="inline-block text-[14px] font-medium text-white/80 transition hover:text-white">
                    View all blogs
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="mt-9 flex flex-col gap-2 border-t border-white/8 pt-5 text-[12px] text-white/40 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-white/40">Improve ME Institute © 2026. All Rights Reserved</p>
            <p className="text-xs text-white/40">Operates under RAK Free Zone licence</p>
          </div>
        </div>
      </footer>

      <a
        href="https://wa.me/971501852505?text=Hi%2C%20I'm%20interested%20in%20signing%20up.%20Please%20can%20I%20get%20more%20info%3F"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] shadow-[0_14px_28px_rgba(0,0,0,0.16)]"
      >
        <Image src="/ref/whatsapp-icon-seeklogo.com.svg" alt="WhatsApp" width={24} height={24} />
      </a>

      <a
        href="#"
        aria-label="Back to top"
        className="fixed bottom-6 right-[86px] z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#FFC107] text-[20px] font-bold text-[#1c2744] shadow-[0_14px_28px_rgba(0,0,0,0.16)]"
      >
        ^
      </a>
    </>
  );
}

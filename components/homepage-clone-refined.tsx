import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/wordpress";
import { LatestGuidesNewsSection } from "@/components/blog/latest-guides-news-section";

const schoolTicker =
  "Nord Anglia School - Dubai College - Jumeirah College - Repton Dubai - North London Collegiate School - Jumeirah English Speaking School - Kings Dubai - Royal Grammar School Guildford Dubai - GEMS Jumeirah Primary School - Dubai American Academy - Dubai International Academy Al Barsha - Dubai English Speaking College - Brighton College Dubai - Dubai British School - Jebel Ali School - Repton School Dubai FZ-LLC - The English College Dubai - Safa Community School - GEMS World Academy - Al Safa British School -";

const primaryCards = [
  ["Mathematics", "Number & problem-solving", "#4A6FD4", "/curriculum/primary/ks2/mathematics"],
  ["English Language", "Reading, writing & comprehension", "#E8732A", "/curriculum/primary/ks2/english"],
  ["Science", "Natural world & scientific enquiry", "#2EAE6B", "/curriculum/primary/ks2/science"],
] as const;

const secondaryCards = [
  ["Mathematics", "Algebra to calculus", "#4A6FD4", "/curriculum/secondary/igcse/mathematics"],
  ["English", "Essay technique & analysis", "#E8732A", "/curriculum/secondary/igcse/english-language"],
  ["Science", "Natural world & scientific enquiry", "#2EAE6B", "/curriculum/secondary/ks3/science"],
  ["Biology", "Cell biology to ecology", "#1D9060", "/curriculum/secondary/igcse/biology"],
  ["Chemistry", "Organic, inorganic & physical", "#8B45B5", "/curriculum/secondary/igcse/chemistry"],
  ["Physics", "Mechanics, electricity & waves", "#29A8C4", "/curriculum/secondary/igcse/physics"],
  ["Business Studies", "Case studies & exam technique", "#D4541A", "/curriculum/secondary/igcse/business-studies"],
  ["Economics", "Micro, macro & data analysis", "#1A7A6B", "/curriculum/secondary/igcse/economics"],
  ["Psychology", "Research methods & approaches", "#C42B4A", "/curriculum/secondary/gcse/psychology"],
] as const;

const enrichmentCards = [
  ["CAT Prep", "Preparation for CAT4 cognitive ability tests (Ages 7-15)", "#7C3AED", "/courses/cat-prep"],
  ["Chess Mastery", "Developing logic, strategy, and focus", "#F59E0B", "/courses/chess"],
  ["7+/11+ Entrance Prep", "Structured preparation for UK and Dubai school entrance exams", "#4F46E5", "/courses/entrance-prep"],
  ["Financial Literacy", "Practical money skills and economic awareness", "#10B981", "/courses/financial-literacy"],
  ["AI Literacy", "Understanding AI tools and thinking critically about technology", "#3B82F6", "/courses/ai-literacy"],
  ["Educational Counselling", "School entrance, subject selection & university applications", "#F43F5E", "/courses/counselling"],
] as const;

const resultsRows = [
  [
    "01",
    "Small groups, not classrooms",
    "Our sessions run in small groups of 3-6 students. Every child gets direct attention, can ask questions freely, and never gets lost at the back of a room.",
  ],
  [
    "02",
    "We reverse-engineer the concept",
    "When a child is stuck, we do not repeat the same explanation louder. We break the concept down from the bottom up, finding exactly where understanding broke down and rebuilding from there.",
  ],
  [
    "03",
    "Weekly sessions with practice papers and worksheets",
    "Consistency matters. Weekly sessions, structured worksheets, and past paper practice build the muscle memory that exams require. We do not cram, we build.",
  ],
  [
    "04",
    "Progress reports back to parents",
    "You never have to guess whether it is working. We send regular progress reports so you know exactly where your child is, what is improving, and what needs more work.",
  ],
] as const;

const reviewCards = [
  [
    "KOMAL KAPOOR",
    "Physics & Further Maths",
    "I have been at Improve ME for 3 years now and I have seen significant improvement in my grades. I am currently taking physics and further maths here, the teachers are super helpful and explain things clearly. And they give tons of resources.",
  ],
  [
    "ARON KELLY",
    "Jumeirah College - 5 Subjects",
    "Coming from JC, this institute has helped me achieve top marks across all subjects. I have been able to improve general knowledge and develop a better understanding of every subject I have taken - English, Maths, and 3 Sciences.",
  ],
  [
    "NAZIA HASSAN",
    "Parent Review",
    "Improve ME has helped my boys so much - I honestly wish I had known about it sooner. I feel like I wasted so much time and money on home tutors, with little to no progress. Since joining Improve ME, the difference has been remarkable. They actually look forward to coming, which says it all.",
  ],
] as const;

const reviewAvatars = [
  "/ref/images/hero-poster-home-v2.webp",
  "/ref/images/hero-poster-home-v3.webp",
  "/ref/images/how-we-teach-hero-v2.webp",
  "/ref/images/hero-poster.webp",
] as const;

const homePageStructuredData = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Improve ME Institute",
  url: "https://www.improvemeinstitute.com",
  logo: "https://www.improvemeinstitute.com/ref/logo.png",
  image: "https://www.improvemeinstitute.com/ref/images/hero-poster-home-v3.webp",
  description:
    "Improve ME Institute offers tutoring in Dubai for Primary, GCSE, IGCSE, A-Level, IB, and MYP students, with small-group classes and personalised support.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Suite 3016-3017, Building 3, Gold & Diamond Park",
    addressLocality: "Dubai",
    addressCountry: "AE",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "206",
  },
  sameAs: ["https://www.google.com/maps/search/Improve+ME+Institute+Dubai"],
};

function ArrowRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-[18px] w-[18px]">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function IconWrap({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={`flex h-10 w-10 items-center justify-center rounded-[8px] ${className ?? ""}`} style={style}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className="h-5 w-5">
        {children}
      </svg>
    </div>
  );
}

function StarRow() {
  return (
    <div className="flex items-center gap-1 text-[#FFC107]">
      {Array.from({ length: 5 }).map((_, index) => (
        <svg key={index} viewBox="0 0 20 20" fill="currentColor" className="h-[18px] w-[18px]">
          <path d="m10 1.6 2.58 5.23 5.78.84-4.18 4.08.99 5.76L10 14.8 4.83 17.5l.99-5.76L1.64 7.67l5.78-.84L10 1.6Z" />
        </svg>
      ))}
    </div>
  );
}

function CarouselArrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
      {direction === "left" ? <path d="m15 18-6-6 6-6" /> : <path d="m9 18 6-6-6-6" />}
    </svg>
  );
}

function SubjectCard({
  title,
  subtitle,
  color,
  href,
}: {
  title: string;
  subtitle: string;
  color: string;
  href: string;
}) {
  const icon =
    title === "Mathematics" ? (
      <>
        <path d="M7 7h10" />
        <path d="M12 4v6" />
        <path d="m8 15 8 0" />
        <path d="m9 18 6-6" />
      </>
    ) : title === "English Language" || title === "English" ? (
      <>
        <path d="M7 5h10v14H7z" />
        <path d="M10 9h4" />
        <path d="M10 13h4" />
      </>
    ) : title === "Science" ? (
      <>
        <path d="M9 4v5l-4 7a3 3 0 0 0 2.6 4.5h8.8A3 3 0 0 0 19 16l-4-7V4" />
        <path d="M9 9h6" />
      </>
    ) : title === "Biology" ? (
      <>
        <path d="M8 15c4-1 6-4 8-8 1 6-2 11-8 12-2 0-4-2-4-4 0-3 2-5 4-5" />
        <path d="M10 11c1 1 2 2 3 4" />
      </>
    ) : title === "Chemistry" ? (
      <>
        <path d="M10 3v6l-5 8a2 2 0 0 0 1.7 3h10.6A2 2 0 0 0 19 17l-5-8V3" />
        <path d="M9 12h6" />
      </>
    ) : title === "Physics" ? (
      <>
        <circle cx="12" cy="12" r="2" />
        <path d="M12 5c3.9 0 7 3.1 7 7" />
        <path d="M5 12c0 3.9 3.1 7 7 7" />
        <path d="M7.8 7.8A9 9 0 0 1 18.2 18.2" />
      </>
    ) : title === "Business Studies" ? (
      <>
        <path d="M6 18V8" />
        <path d="M12 18V5" />
        <path d="M18 18v-8" />
      </>
    ) : title === "Economics" ? (
      <>
        <path d="M6 16c1.2 1.3 2.7 2 4.5 2 3.6 0 4-5 7.5-5 1.1 0 2.1.3 3 .9" />
        <path d="M6 8c1.2-1.3 2.7-2 4.5-2 3.6 0 4 5 7.5 5 1.1 0 2.1-.3 3-.9" />
      </>
    ) : (
      <>
        <circle cx="12" cy="8" r="2.5" />
        <path d="M7 19v-1a5 5 0 0 1 10 0v1" />
      </>
    );

  return (
    <Link
      href={href}
      className="block cursor-pointer rounded-[10px] px-[18px] py-[17px] text-white shadow-[0_10px_24px_rgba(15,23,42,0.08)] transition-shadow hover:shadow-[0_10px_24px_rgba(15,23,42,0.08)]"
      style={{ background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)` }}
    >
      <div className="flex items-start gap-3">
        <IconWrap className="bg-white/18 text-white">{icon}</IconWrap>
        <div>
          <p className="text-[15px] font-bold leading-5">{title}</p>
          <p className="mt-1 text-[12px] leading-[1.35] text-white/92">{subtitle}</p>
        </div>
      </div>
    </Link>
  );
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3">
      <span className="mb-[10px] block h-[3px] w-9 rounded-full bg-[#FFC107]" />
      <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#FFC107]">{children}</p>
    </div>
  );
}

type HomepageCloneRefinedProps = {
  latestBlogs?: BlogPost[];
};

export function HomepageCloneRefined({ latestBlogs = [] }: HomepageCloneRefinedProps) {
  return (
    <main className="min-h-screen bg-white pb-20 md:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageStructuredData) }}
      />
      <section className="relative min-h-[90vh] overflow-hidden pt-[2px]">
        <Image
          src="/ref/overlay_image_home_v2.webp"
          alt="Students in a classroom learning with tutors at Improve ME Institute"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/25 backdrop-blur-[2px]"></div>
        <div className="relative z-20 section-container min-h-[90vh] flex flex-col lg:flex-row lg:items-stretch">
          <div className="w-full flex-1 rounded-[22px] border border-white/10 bg-[rgba(34,38,56,0.50)] px-8 py-8 shadow-[0_16px_45px_rgba(0,0,0,0.28)] backdrop-blur-[8px] md:px-[34px] md:py-[34px]">
            <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-bold leading-[1.05] tracking-tighter text-left max-w-4xl">
              Dubai Tutoring Centre for Primary, GCSE, IGCSE, A-Level &amp; IB
            </h1>
            <p className="mt-4 max-w-[560px] text-[17px] text-white/92 md:text-[18px]">
              Expert tutoring in Dubai for{" "}
              <Link className="!underline !underline-offset-2 !decoration-2" href="/curriculum/primary/">Primary</Link>,{" "}
              <Link className="!underline !underline-offset-2 !decoration-2" href="/curriculum/secondary/gcse/">GCSE</Link>,{" "}
              <Link className="!underline !underline-offset-2 !decoration-2" href="/curriculum/secondary/igcse/">IGCSE</Link>,
              <br />
              <Link className="!underline !underline-offset-2 !decoration-2" href="/curriculum/secondary/a-level/">A-Level</Link>, and{" "}
              <Link className="!underline !underline-offset-2 !decoration-2" href="/curriculum/secondary/ib/">IB</Link> with small-group lessons and proven results.
              <br />
              Explore our{" "}
              <Link className="!underline !underline-offset-2 !decoration-2" href="/courses/">courses</Link> by subject and level.
              <br />
              Start with a{" "}
              <Link className="!underline !underline-offset-2 !decoration-2" href="/contact/">free assessment</Link> to get the right learning plan.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/contact/#booking-form"
                className="inline-flex items-center gap-2 rounded-full bg-[#FFC107] px-7 py-3 text-[18px] font-semibold text-[#111827] shadow-[0_10px_24px_rgba(255,193,7,0.28)] transition hover:brightness-[1.02] sm:px-8 sm:py-4"
              >
                Book Free Assessment
                <ArrowRight />
              </Link>
              <Link
                href="/courses/"
                className="inline-flex items-center text-[17px] font-medium text-white/95 transition hover:text-white"
              >
                Explore Courses
              </Link>
            </div>

            <a
              href="https://www.google.com/maps/search/Improve+ME+Institute+Dubai"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex w-full max-w-[560px] items-center gap-3 rounded-[10px] border border-white/30 bg-transparent px-4 py-3 text-white shadow-[0_10px_24px_rgba(0,0,0,0.22)] backdrop-blur-[1px] transition hover:border-white/45"
            >
              <span className="text-[14px] font-semibold leading-none tracking-[-0.01em] sm:text-[15px]">
                <span className="text-[#4285F4]">G</span>
                <span className="text-[#EA4335]">o</span>
                <span className="text-[#FBBC05]">o</span>
                <span className="text-[#4285F4]">g</span>
                <span className="text-[#34A853]">l</span>
                <span className="text-[#EA4335]">e</span>
              </span>
              <span className="flex items-center gap-0.5 text-[#FFC107]">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} viewBox="0 0 20 20" fill="currentColor" className="h-[15px] w-[15px]">
                    <path d="m10 1.6 2.58 5.23 5.78.84-4.18 4.08.99 5.76L10 14.8 4.83 17.5l.99-5.76L1.64 7.67l5.78-.84L10 1.6Z" />
                  </svg>
                ))}
              </span>
              <div className="flex -space-x-2">
                {reviewAvatars.map((src, i) => (
                  <Image
                    key={`${src}-${i}`}
                    src={src}
                    alt="Parent reviewer profile"
                    width={24}
                    height={24}
                    sizes="24px"
                    className="h-6 w-6 rounded-full border border-white/70 object-cover"
                  />
                ))}
              </div>
              <span className="text-[14px] font-medium text-white/95 sm:text-[15px]">
                Trusted by <span className="font-semibold">1000+ Parents</span>
              </span>
            </a>

            <div className="mt-8 w-full max-w-[760px] bg-white/95 text-[#0f2348] shadow-[0_10px_30px_rgba(15,23,42,0.16)]">
              <div className="flex items-stretch">
                <span className="w-1.5 bg-[#FFC107]" />
                <div className="px-6 py-4">
                  <p className="text-[17px] font-medium leading-tight sm:text-[18px]">KHDA-approved - Small groups (a maximum of six students)</p>
                  <p className="mt-1 text-[15px] leading-tight text-[#1d3f84]">One consistent approach from age 3 to 18</p>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden flex-1 justify-end lg:flex lg:self-stretch">
            <div className="h-full w-[420px] overflow-hidden rounded-[18px] shadow-[0_18px_55px_rgba(0,0,0,0.26)]">
              <Image
                src="/ref/images/hero-poster-home-v3.webp"
                alt="Tutor supporting students in a small-group classroom session"
                width={420}
                height={404}
                loading="lazy"
                sizes="(min-width: 1024px) 420px, 100vw"
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="overflow-hidden bg-[#002D62] py-[11px]">
        <div className="animate-marquee flex w-max whitespace-nowrap">
          <span className="px-4 text-[12px] font-medium tracking-[0.01em] text-white">{schoolTicker}</span>
          <span className="px-4 text-[12px] font-medium tracking-[0.01em] text-white">{schoolTicker}</span>
        </div>
      </div>

      <section className="mx-auto max-w-[80rem] px-4 pb-8 pt-[70px] sm:px-6 lg:px-8">
        <SectionEyebrow>WHAT WE TEACH</SectionEyebrow>
        <h2 className="text-[38px] font-bold tracking-[-0.04em] text-[#1c2744] md:text-[50px]">Tutoring across every academic stage, ages 3 to 18</h2>

        <div className="mt-10">
          <div className="flex items-center gap-3">
            <IconWrap className="bg-[#365bb2] text-white">
              <path d="M7 6h10v12H7z" />
              <path d="M9.5 10h5" />
              <path d="M9.5 13h5" />
            </IconWrap>
            <h3 className="text-[20px] font-bold text-[#1c2744]">Primary</h3>
          </div>
          <p className="mt-5 text-[13px] text-[#3f5da8]">Ages 3-11 - Building the Foundation</p>
          <p className="mt-4 max-w-[910px] text-[16px] leading-[1.7] text-[#3250a3]">
            Strong foundations in Maths, English, and Science across EYFS, Key Stage 1, and Key Stage 2. Each lesson is aligned to your child&apos;s year group and school curriculum. 7+ and 11+ entrance prep is also available.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {["EYFS (Ages 3-5)", "Key Stage 1 (Ages 5-7)", "Key Stage 2 (Ages 7-11)"].map((item, index) => (
              <span
                key={item}
                className={`rounded-full border px-3 py-1 text-[13px] ${
                  index === 0
                    ? "border-[#f3c67b] bg-[#fff1dc] text-[#ef9c00]"
                    : index === 1
                      ? "border-[#f0b5a7] bg-[#fff0ec] text-[#d9694c]"
                      : "border-[#9dc1d3] bg-[#edf8fe] text-[#4c86a6]"
                }`}
              >
                {item}
              </span>
            ))}
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {primaryCards.map(([title, subtitle, color, href]) => (
              <SubjectCard key={title} title={title} subtitle={subtitle} color={color} href={href} />
            ))}
          </div>
          <Link href="/curriculum/primary/" className="mt-5 inline-flex items-center gap-1 text-[17px] text-[#1c2744]">
            View Primary Curriculum <ArrowRight />
          </Link>
        </div>

        <div className="mt-14">
          <div className="flex items-center gap-3">
            <IconWrap className="bg-[#365bb2] text-white">
              <path d="M5 9 12 5l7 4-7 4-7-4Z" />
              <path d="M7 11.5V15c0 .9 2.2 2 5 2s5-1.1 5-2v-3.5" />
            </IconWrap>
            <h3 className="text-[20px] font-bold text-[#1c2744]">Secondary</h3>
          </div>
          <p className="mt-5 text-[13px] text-[#3f5da8]">Ages 11-18</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {["Years 7-9 (KS3)", "MYP (Ages 11-16)", "GCSE/IGCSE (Ages 14-16)", "A-Levels/IB (Ages 16-18)"].map((item, index) => (
              <span
                key={item}
                className={`rounded-full border px-3 py-1 text-[13px] ${
                  index === 0
                    ? "border-[#9eb8df] bg-[#edf4ff] text-[#3f72b7]"
                    : index === 1
                      ? "border-[#f3c58e] bg-[#fff1df] text-[#e58f3f]"
                      : index === 2
                        ? "border-[#99c7c1] bg-[#e8f8f2] text-[#2f8b83]"
                        : "border-[#e1a99d] bg-[#fff0ed] text-[#c86449]"
                }`}
              >
                {item}
              </span>
            ))}
          </div>
          <p className="mt-5 max-w-[930px] text-[16px] leading-[1.7] text-[#3250a3]">
            Key Stage 3 to A-Level and IB. Every lesson aligns with your child&apos;s exam board and school timetable. Our tutors understand what examiners expect and teach with that focus.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {secondaryCards.map(([title, subtitle, color, href]) => (
              <SubjectCard key={title} title={title} subtitle={subtitle} color={color} href={href} />
            ))}
          </div>
          <Link href="/curriculum/secondary/" className="mt-7 inline-flex items-center gap-1 text-[17px] text-[#1c2744]">
            View Secondary Curriculum <ArrowRight />
          </Link>
        </div>

        <div className="mt-12 rounded-[18px] bg-[#fcfcfc] px-6 py-10 shadow-[0_14px_50px_rgba(15,23,42,0.08)] md:px-8 md:py-11">
          <SectionEyebrow>ENRICHMENT &amp; FUTURE SKILLS</SectionEyebrow>
          <h3 className="text-[34px] font-bold tracking-[-0.04em] text-[#1c2744] md:text-[46px]">Building confident, well-rounded learners</h3>
          <p className="mt-2 text-[17px] text-[#4965b2]">Alongside the academic programme.</p>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {enrichmentCards.map(([title, subtitle, color, href]) => (
              <Link
                key={title}
                href={href}
                className="block cursor-pointer rounded-[16px] border border-[#edf1f7] bg-white px-5 py-5 shadow-[0_10px_28px_rgba(15,23,42,0.08)] transition-shadow hover:shadow-[0_10px_28px_rgba(15,23,42,0.08)]"
              >
                <div className="mb-5">
                  <IconWrap
                    className="text-[#1c2744]"
                    style={{ backgroundColor: `${color}1f`, borderLeft: `3px solid ${color}` }}
                  >
                    {title === "CAT Prep" ? (
                      <>
                        <path d="M5 7h14" />
                        <path d="M5 12h14" />
                        <path d="M5 17h8" />
                      </>
                    ) : title === "Chess Mastery" ? (
                      <>
                        <path d="M10 6a2 2 0 1 1 4 0c0 1-1 1.8-1 2.5S14 10 15 10v2H9v-2c1 0 2-.5 2-1.5S10 7 10 6Z" />
                        <path d="M8 18h8" />
                        <path d="M9 12h6l1 6H8l1-6Z" />
                      </>
                    ) : title === "7+/11+ Entrance Prep" ? (
                      <>
                        <path d="M7 5h10v14H7z" />
                        <path d="M9 9h6" />
                        <path d="M9 13h4" />
                      </>
                    ) : title === "Financial Literacy" ? (
                      <>
                        <circle cx="12" cy="12" r="7" />
                        <path d="M12 8v8" />
                        <path d="M9.5 10.5c0-1 1-1.5 2.5-1.5s2.5.6 2.5 1.5-1 1.5-2.5 1.5-2.5.6-2.5 1.5S10.5 15 12 15s2.5-.5 2.5-1.5" />
                      </>
                    ) : title === "AI Literacy" ? (
                      <>
                        <rect x="7" y="7" width="10" height="10" rx="2" />
                        <path d="M12 3v2" />
                        <path d="M12 19v2" />
                        <path d="M3 12h2" />
                        <path d="M19 12h2" />
                      </>
                    ) : (
                      <>
                        <circle cx="12" cy="8" r="2.5" />
                        <path d="M7 19v-1a5 5 0 0 1 10 0v1" />
                      </>
                    )}
                  </IconWrap>
                </div>
                <p className="text-[17px] font-bold text-[#1c2744]">{title}</p>
                <p className="mt-4 text-[15px] leading-[1.65] text-[#4965b2]">{subtitle}</p>
              </Link>
            ))}
          </div>
          <p className="mt-5 text-[12px] italic text-[#6079bb]">These programmes run alongside our academic courses for a more complete education.</p>
          <div className="mt-6 rounded-[16px] border-l-[3px] border-[#08beb1] bg-[linear-gradient(90deg,#f1ffff_0%,#f4feff_100%)] px-6 py-6 shadow-[0_10px_28px_rgba(15,23,42,0.08)]">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-[760px]">
                <p className="text-[13px] font-medium uppercase tracking-[0.18em] text-[#0cb5a5]">HOME EDUCATION</p>
                <h4 className="mt-2 text-[19px] font-bold text-[#1c2744]">A Structured Learning Environment for Home-Schooled Students</h4>
                <p className="mt-3 text-[15px] leading-[1.7] text-[#4965b2]">
                  Our morning programme gives home-schooled students a professional, centre-based place to learn - keeping them on track, helping them move ahead, and ensuring their education is structured, consistent, and tailored to their needs. Whether they follow the UK National Curriculum, IB, or a custom programme, we work around their schedule and learning goals.
                </p>
              </div>
              <Link
                href="/courses/home-education/"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FFC107] px-7 py-[14px] text-[15px] font-semibold text-black transition hover:bg-[#f0b400]"
              >
                Learn More
                <ArrowRight />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-3">
          <Link href="/courses/" className="inline-flex items-center gap-2 rounded-full bg-[#FFC107] px-7 py-[14px] text-[16px] font-semibold text-black transition hover:bg-[#f0b400]">
            Explore All Courses
            <ArrowRight />
          </Link>
          <Link href="/services/" className="inline-flex items-center gap-2 rounded-full border border-[#1c2744]/20 px-7 py-[14px] text-[16px] font-semibold text-[#1c2744] transition hover:bg-[#f6f8ff]">
            Explore Services
            <ArrowRight />
          </Link>
          <Link href="/contact/" className="inline-flex items-center gap-2 rounded-full border border-[#1c2744]/20 px-7 py-[14px] text-[16px] font-semibold text-[#1c2744] transition hover:bg-[#f6f8ff]">
            Contact Us
            <ArrowRight />
          </Link>
        </div>
      </section>

      <section className="bg-[#fbfbfc] py-[98px]">
        <div className="mx-auto max-w-[80rem] px-4 sm:px-6 lg:px-8">
          <SectionEyebrow>OUR APPROACH</SectionEyebrow>
          <h2 className="text-[38px] font-bold tracking-[-0.04em] text-[#1c2744] md:text-[52px]">How Our Dubai Tutoring Centre Gets Results</h2>
          <div className="mt-10 overflow-hidden rounded-[14px] border border-[#ecedf2] bg-white">
            {resultsRows.map(([number, title, copy]) => (
              <div key={number} className="grid grid-cols-[86px_1fr] border-b border-[#eef0f4] px-6 py-7 last:border-b-0 md:grid-cols-[96px_1fr] md:px-7">
                <div className="text-[54px] font-bold leading-none tracking-[-0.05em] text-[#d8dfed] md:text-[58px]">{number}</div>
                <div className="pt-1">
                  <h3 className="text-[18px] font-bold text-[#1c2744]">{title}</h3>
                  <p className="mt-3 max-w-[820px] text-[16px] leading-[1.7] text-[#4863b3]">{copy}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/about/" className="inline-flex items-center gap-2 text-[17px] text-[#1c2744]">
              Learn more about us <ArrowRight />
            </Link>
            <Link href="/contact/" className="inline-flex items-center gap-2 rounded-full border border-[#1c2744]/20 px-6 py-3 text-[15px] font-semibold text-[#1c2744] transition hover:bg-[#f4f7ff]">
              Book Free Assessment
              <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#f0f4ff] py-[88px]">
        <div className="mx-auto max-w-[80rem] px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[680px]">
            <span className="mx-auto mb-2 block h-[3px] w-8 rounded-full bg-[#FFC107]" />
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#FFC107]">TRUSTED BY FAMILIES</p>
            <h2 className="mt-3 text-[38px] font-bold tracking-[-0.04em] text-[#1c2744] md:text-[50px]">What Parents Say</h2>
            <div className="mx-auto mt-6 flex w-fit items-center gap-4 rounded-[14px] border border-[#e4e7ef] bg-white px-6 py-5 shadow-[0_10px_28px_rgba(15,23,42,0.08)]">
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <span className="text-[38px] font-bold leading-none text-[#1c2744]">4.9</span>
                  <StarRow />
                </div>
                <p className="mt-1 text-left text-[14px] font-medium text-[#4965b2]">Google Rating</p>
                <p className="mt-1 text-left text-[12px] text-[#6b7eb4]">Based on 206+ reviews</p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex items-center justify-between gap-4">
            <button className="hidden h-10 w-10 rounded-full border border-[#e4e7ef] bg-white text-[#1c2744] shadow-[0_6px_16px_rgba(15,23,42,0.08)] md:flex md:items-center md:justify-center">
              <CarouselArrow direction="left" />
            </button>
            <div className="grid flex-1 gap-4 md:grid-cols-3">
              {reviewCards.map(([name, tag, quote]) => (
                <div key={name} className="flex h-[380px] flex-col rounded-[16px] border border-[#e5e8f0] bg-white px-5 py-5 text-left shadow-[0_10px_28px_rgba(15,23,42,0.08)]">
                  <StarRow />
                  <p className="mt-4 flex-1 text-[15px] italic leading-[1.78] text-[#5a6da2]">{quote}</p>
                  <div className="mt-6 border-t border-[#eceef4] pt-4">
                    <p className="text-[17px] font-bold uppercase tracking-[0.02em] text-[#1c2744]">{name}</p>
                    <p className="mt-2 text-[14px] text-[#7d8fbe]">{tag}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="hidden h-10 w-10 rounded-full border border-[#e4e7ef] bg-white text-[#1c2744] shadow-[0_6px_16px_rgba(15,23,42,0.08)] md:flex md:items-center md:justify-center">
              <CarouselArrow direction="right" />
            </button>
          </div>
          <div className="mt-6 flex justify-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#dbe2f0]" />
            <span className="h-2 w-2 rounded-full bg-[#1c2744]" />
            <span className="h-2 w-2 rounded-full bg-[#dbe2f0]" />
            <span className="h-2 w-2 rounded-full bg-[#dbe2f0]" />
          </div>
          <a
            href="https://www.google.com/maps/search/Improve+ME+Institute+Dubai"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-2 text-[15px] font-medium text-[#1c2744]"
          >
            See all our Google reviews <ArrowRight />
          </a>
          <div className="mt-8 flex justify-center">
            <Link href="/contact/" className="inline-flex items-center gap-2 rounded-full bg-[#FFC107] px-7 py-[14px] text-[16px] font-semibold text-black transition hover:bg-[#f0b400]">
              Start With a Free Assessment
              <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      <LatestGuidesNewsSection
        posts={latestBlogs}
        className="bg-[#f4f6fb] py-16 md:py-20"
        subtitle="Expert insights, parent guidance, and practical learning tips to help students stay ahead."
      />

      <section className="bg-white py-16">
        <div className="mx-auto max-w-[80rem] px-4 sm:px-6 lg:px-8">
          <div className="rounded-[16px] border border-[#e8ecf5] bg-[#f8fbff] px-6 py-8 shadow-[0_10px_28px_rgba(15,23,42,0.08)] md:px-8">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#365bb2]">QUICK ENQUIRY</p>
            <h2 className="mt-2 text-[30px] font-bold tracking-[-0.03em] text-[#1c2744] md:text-[36px]">Get a call back from our tutoring team</h2>
            <p className="mt-3 max-w-[760px] text-[15px] leading-[1.7] text-[#4965b2]">
              Leave your details and preferred subject. We&apos;ll call you back with the best next step, or you can go straight to our{" "}
              <Link href="/services/" className="font-semibold text-[#1c2744] !underline !underline-offset-2">
                services
              </Link>{" "}
              or{" "}
              <Link href="/contact/" className="font-semibold text-[#1c2744] !underline !underline-offset-2">
                contact
              </Link>{" "}
              page.
            </p>
            <form action="/contact/#booking-form" method="get" className="mt-6 grid gap-3 md:grid-cols-2">
              <label className="sr-only" htmlFor="home-name">
                Parent name
              </label>
              <input
                id="home-name"
                name="name"
                type="text"
                required
                placeholder="Parent name"
                className="h-12 rounded-[10px] border border-[#d8dfef] bg-white px-4 text-[15px] text-[#1c2744] outline-none transition focus:border-[#365bb2]"
              />
              <label className="sr-only" htmlFor="home-phone">
                Phone number
              </label>
              <input
                id="home-phone"
                name="phone"
                type="tel"
                required
                placeholder="Phone number"
                className="h-12 rounded-[10px] border border-[#d8dfef] bg-white px-4 text-[15px] text-[#1c2744] outline-none transition focus:border-[#365bb2]"
              />
              <label className="sr-only" htmlFor="home-email">
                Email address
              </label>
              <input
                id="home-email"
                name="email"
                type="email"
                placeholder="Email address (optional)"
                className="h-12 rounded-[10px] border border-[#d8dfef] bg-white px-4 text-[15px] text-[#1c2744] outline-none transition focus:border-[#365bb2]"
              />
              <label className="sr-only" htmlFor="home-course">
                Course interest
              </label>
              <input
                id="home-course"
                name="course"
                type="text"
                placeholder="Course interest (e.g. GCSE Maths)"
                className="h-12 rounded-[10px] border border-[#d8dfef] bg-white px-4 text-[15px] text-[#1c2744] outline-none transition focus:border-[#365bb2]"
              />
              <button
                type="submit"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#FFC107] px-7 text-[15px] font-semibold text-black transition hover:bg-[#f0b400] md:col-span-2 md:w-fit"
              >
                Request Callback
                <ArrowRight />
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="w-full py-14 md:py-20 relative bg-[#002D62]">
  <div className="section-container">
    <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">

      {/* LEFT */}
      <div className="lg:col-span-4 text-white">
        <span className="block w-12 h-[3px] rounded-full mb-4 bg-[#FFC107]"></span>

        <p className="text-xs font-medium tracking-widest uppercase mb-2 text-[#FFC107]">
          GET STARTED
        </p>

        <h2 className="text-3xl font-bold mb-4">
          Book Your Free Assessment
        </h2>

        <p className="text-white/90 text-lg mb-4 leading-relaxed">
          Our team will assess your child&apos;s current level and recommend the right group and tutor. There&apos;s no cost and no obligation.
        </p>

        <ul className="space-y-4 text-white">
          <li className="flex items-center gap-3">
            Check - <span>Free diagnostic assessment</span>
          </li>
          <li className="flex items-center gap-3">
            Check - <span>No obligation to enrol</span>
          </li>
          <li className="flex items-center gap-3">
            Check - <span>Response within two hours</span>
          </li>
        </ul>

        <p className="text-white/80 text-sm mt-6">
          Trusted by families from 30+ top Dubai schools
        </p>
      </div>

      {/* RIGHT */}
      <div className="lg:col-span-8 min-w-0 lg:min-w-[520px]">
        
        <iframe
          src="https://forms.improvemeinstitute.com/improvemeinstitute/form/FreeTrial/formperma/qOW8nB2Vw1j45OH2X8_8QQLUyV61dQ4hJ2Y8x-pFyig?zf_rszfm=1"
          title="Book a free assessment form"
          loading="lazy"
          className="w-full h-[1196px] rounded-lg bg-white"
        ></iframe>
      </div>

    </div>
  </div>
</section>
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[#d9e1f4] bg-white/95 px-4 py-3 shadow-[0_-10px_28px_rgba(15,23,42,0.10)] backdrop-blur md:hidden">
        <Link
          href="/contact/#booking-form"
          className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#FFC107] px-5 text-[15px] font-semibold text-black"
        >
          Book Free Assessment
          <ArrowRight />
        </Link>
      </div>
    </main>
  );
}

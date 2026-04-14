import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const processSteps = [
  {
    step: "01",
    title: "Assessment & Baseline",
    copy:
      "We identify current level, confidence, and gaps so every student begins with a clear academic baseline.",
  },
  {
    step: "02",
    title: "Structured Learning Plan",
    copy:
      "Each student gets a curriculum-aligned plan mapped to school pace, exam board expectations, and weekly outcomes.",
  },
  {
    step: "03",
    title: "Small-Group Expert Teaching",
    copy:
      "Lessons are delivered in focused groups where tutors can explain deeply, challenge thinking, and support individuals.",
  },
  {
    step: "04",
    title: "Practice, Feedback, Progress",
    copy:
      "We use targeted worksheets, timed practice, and regular reporting to keep improvement visible and consistent.",
  },
] as const;

const methodCards = [
  {
    title: "Clarity Over Cramming",
    copy:
      "We rebuild fundamentals and teach the why behind each concept so students retain knowledge and apply it confidently.",
  },
  {
    title: "Exam-Focused Precision",
    copy:
      "From technique to timing, students practise exactly how examiners assess answers across key subjects and levels.",
  },
  {
    title: "Consistency That Compounds",
    copy:
      "Weekly structure and accountable follow-up create steady progress instead of last-minute stress before assessments.",
  },
] as const;

const studentBenefits = [
  "Stronger understanding in core subjects",
  "Higher confidence in class and exams",
  "Better exam technique and time management",
  "Clear progress updates for parents",
  "Personalised support in small groups",
  "A consistent, motivating study routine",
] as const;

export const metadata: Metadata = {
  title: "How We Teach | Improve ME Institute",
  description:
    "Discover how Improve ME Institute teaches through structured planning, small-group tutoring, and exam-focused support that drives measurable progress.",
};

export default function HowWeTeachPage() {
  return (
    <main className="min-h-screen bg-[#f7f9ff]">
      <section className="relative overflow-hidden bg-[#002D62] pb-16 pt-16 md:pb-20 md:pt-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-[#35508f]/45 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#FFC107]/18 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.16),transparent_38%),linear-gradient(135deg,#002D62_0%,#113a7b_58%,#1a4e98_100%)]" />
        </div>

        <div className="section-container relative z-10 grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div>
            <span className="mb-4 block h-[3px] w-12 rounded-full bg-[#FFC107]" />
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#FFC107]">HOW WE TEACH</p>
            <h1 className="mt-4 max-w-3xl text-[38px] font-bold leading-[1.06] tracking-[-0.05em] text-white md:text-[56px]">
              A Proven Teaching Method Designed for Lasting Progress
            </h1>
            <p className="mt-6 max-w-2xl text-[17px] leading-[1.8] text-white/88">
              Our approach combines structured planning, subject-expert tutoring, and exam-ready practice so students improve
              with clarity, confidence, and consistency.
            </p>
            {/* CRO: Trust badge and Google review stars */}
            <div className="mt-6 flex items-center gap-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 shadow text-[#1c2744] font-semibold text-[15px]">
                <svg width="22" height="22" fill="none" viewBox="0 0 22 22"><circle cx="11" cy="11" r="11" fill="#FFC107"/><path d="M7 11l2 2 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Trusted by 200+ Dubai families
              </span>
              <span className="flex items-center gap-1 text-[#FFC107] font-bold">
                4.9
                {[...Array(5)].map((_,i) => (
                  <svg key={i} viewBox="0 0 20 20" fill="currentColor" className="h-[18px] w-[18px]"><path d="m10 1.6 2.58 5.23 5.78.84-4.18 4.08.99 5.76L10 14.8 4.83 17.5l.99-5.76L1.64 7.67l5.78-.84L10 1.6Z" /></svg>
                ))}
                <span className="ml-2 text-xs text-white/80">Google Reviews</span>
              </span>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/contact/#booking-form"
                className="inline-flex items-center justify-center rounded-full bg-[#FFC107] px-7 py-[14px] text-[15px] font-semibold text-black transition-all duration-200 hover:translate-y-[-1px] hover:bg-[#f0b400]"
              >
                Book Free Assessment
              </Link>
              <Link
                href="/curriculum/"
                className="inline-flex items-center justify-center rounded-full border border-white/40 px-7 py-[14px] text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-white/10"
              >
                Explore Curriculum
              </Link>
            </div>
            {/* CRO: Urgency text */}
            <div className="mt-3 text-[#FFC107] font-semibold text-[14px]">Limited slots for this month!</div>
          </div>

          <div>
            <div className="relative overflow-visible p-2">
              <div className="relative mx-auto aspect-square w-full max-w-[410px]">
                <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_30%,#9fd3ff_0%,#6db4ec_55%,#4c9adc_100%)]" />
                <div className="absolute -right-1 top-8 rounded-full bg-white px-4 py-2 shadow-[0_10px_24px_rgba(4,18,48,0.18)]">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#17376d] text-[12px] font-bold text-[#FFC107]">
                      IM
                    </span>
                    <span className="text-[12px] font-semibold tracking-[0.04em] text-[#35508f]">LEARN SMART</span>
                  </div>
                </div>
                <div className="absolute -left-2 bottom-9 rounded-full bg-white px-4 py-2 shadow-[0_10px_24px_rgba(4,18,48,0.18)]">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#FFC107] text-[12px] font-bold text-[#1c2744]">
                      A+
                    </span>
                    <span className="text-[12px] font-semibold tracking-[0.04em] text-[#35508f]">EXAM READY</span>
                  </div>
                </div>
                <div className="absolute left-[14%] top-[10%] inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-dashed border-[#17376d]/35 bg-white/90 text-[19px]">
                  🎓
                </div>
                <div className="absolute right-[16%] bottom-[12%] inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-dashed border-[#17376d]/35 bg-white/90 text-[18px]">
                  📘
                </div>
                <div className="absolute bottom-0 left-1/2 w-[84%] -translate-x-1/2 overflow-hidden rounded-[999px]">
                  <Image
                    src="/ref/images/how-we-teach-hero-v2.webp"
                    alt="Graduate-style student visual used in how we teach hero"
                    width={920}
                    height={920}
                    className="h-auto w-full object-cover object-top"
                  />
                </div>
              </div>
              <div className="absolute bottom-5 left-2 rounded-full bg-white px-4 py-2 text-[12px] font-semibold tracking-[0.06em] text-[#1c2744]">
                STRUCTURED LEARNING FLOW
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-container py-[76px]">
        <span className="mb-4 block h-[3px] w-10 rounded-full bg-[#FFC107]" />
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#FFC107]">TEACHING PROCESS</p>
        <h2 className="mt-4 max-w-3xl text-[34px] font-bold tracking-[-0.04em] text-[#1c2744] md:text-[46px]">
          Step-by-step teaching that turns effort into outcomes
        </h2>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {processSteps.map((item) => (
            <article
              key={item.step}
              className="group rounded-[20px] border border-[#e5ebf8] bg-white p-6 shadow-[0_10px_26px_rgba(15,23,42,0.07)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(15,23,42,0.12)]"
            >
              <div className="flex items-center gap-4">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#edf4ff] text-[15px] font-bold text-[#365bb2]">
                  {item.step}
                </span>
                <h3 className="text-[22px] font-bold tracking-[-0.02em] text-[#1c2744]">{item.title}</h3>
              </div>
              <p className="mt-4 text-[15px] leading-[1.8] text-[#4965b2]">{item.copy}</p>
            </article>
          ))}
        </div>

        {/* CRO: Testimonial/review snippet after teaching process */}
        <div className="mt-12 flex flex-col items-center justify-center">
          <div className="rounded-xl bg-white px-6 py-5 shadow border border-[#e5ebf8] max-w-xl text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-[#FFC107] font-bold text-lg">4.9</span>
              {[...Array(5)].map((_,i) => (
                <svg key={i} viewBox="0 0 20 20" fill="currentColor" className="h-[16px] w-[16px]"><path d="m10 1.6 2.58 5.23 5.78.84-4.18 4.08.99 5.76L10 14.8 4.83 17.5l.99-5.76L1.64 7.67l5.78-.84L10 1.6Z" /></svg>
              ))}
            </div>
            <div className="text-[#1c2744] font-semibold mb-1">“Super helpful and explain things clearly!”</div>
            <div className="text-[#35508f] text-xs">Parent Review on Google</div>
          </div>
        </div>

        {/* CRO: Repeat CTA after testimonial */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/contact/#booking-form"
            className="inline-flex items-center justify-center rounded-full bg-[#FFC107] px-7 py-[14px] text-[15px] font-semibold text-black transition-all duration-200 hover:translate-y-[-1px] hover:bg-[#f0b400]"
          >
            Book Free Assessment
          </Link>
        </div>
      </section>

      <section className="bg-[#fbfcff] py-[76px]">
        <div className="section-container">
          <span className="mb-4 block h-[3px] w-10 rounded-full bg-[#FFC107]" />
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#FFC107]">WHY OUR METHOD WORKS</p>
          <h2 className="mt-4 max-w-3xl text-[34px] font-bold tracking-[-0.04em] text-[#1c2744] md:text-[46px]">
            Built on academic precision, delivered with personal support
          </h2>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {methodCards.map((card, idx) => (
              <article key={card.title} className="rounded-[18px] border border-[#e6ecf7] bg-white px-6 py-6 shadow-[0_10px_26px_rgba(15,23,42,0.07)]">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-[11px] bg-[#edf4ff] text-[#365bb2]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                    {idx === 0 ? (
                      <>
                        <path d="M5 12h14" />
                        <path d="m11 6 6 6-6 6" />
                      </>
                    ) : idx === 1 ? (
                      <>
                        <circle cx="12" cy="12" r="8" />
                        <path d="m9 12 2 2 4-4" />
                      </>
                    ) : (
                      <>
                        <path d="M6 8h12" />
                        <path d="M6 12h12" />
                        <path d="M6 16h8" />
                      </>
                    )}
                  </svg>
                </div>
                <h3 className="text-[21px] font-bold tracking-[-0.02em] text-[#1c2744]">{card.title}</h3>
                <p className="mt-3 text-[15px] leading-[1.75] text-[#4965b2]">{card.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-container py-[76px]">
        <div className="grid gap-8 lg:grid-cols-[0.94fr_1.06fr]">
          <div className="rounded-[22px] border border-[#e5ebf8] bg-white p-4 shadow-[0_14px_34px_rgba(15,23,42,0.09)]">
            <div className="relative overflow-hidden rounded-[16px]">
              <Image
                src="/ref/jason class2.jpg"
                alt="Students learning in a guided classroom session"
                width={760}
                height={520}
                className="h-[300px] w-full object-cover md:h-[360px]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(0,45,98,0.66)_100%)]" />
              <div className="absolute bottom-5 left-5 max-w-[82%] rounded-[12px] bg-white/95 px-4 py-3">
                <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#35508f]">STUDENT BENEFITS</p>
                <p className="mt-1 text-[14px] font-semibold leading-5 text-[#1c2744]">
                  Learning becomes clearer, calmer, and more results-focused.
                </p>
              </div>
            </div>
          </div>

          <div>
            <span className="mb-4 block h-[3px] w-10 rounded-full bg-[#FFC107]" />
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#FFC107]">STUDENT BENEFITS</p>
            <h2 className="mt-4 text-[34px] font-bold tracking-[-0.04em] text-[#1c2744] md:text-[46px]">
              What students and parents experience with this approach
            </h2>

            <ul className="mt-8 grid gap-3">
              {studentBenefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-start gap-3 rounded-[14px] border border-[#e6ecf7] bg-white px-4 py-3 shadow-[0_8px_20px_rgba(15,23,42,0.05)]"
                >
                  <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#FFC107] text-[11px] font-bold text-[#1c2744]">
                    ✓
                  </span>
                  <span className="text-[15px] leading-[1.7] text-[#4965b2]">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-[#002D62] py-[78px]">
        <div className="section-container">
          <div className="rounded-[24px] border border-white/12 bg-[linear-gradient(120deg,rgba(255,255,255,0.09)_0%,rgba(255,255,255,0.04)_100%)] px-6 py-9 text-center shadow-[0_16px_40px_rgba(0,0,0,0.2)] md:px-10 md:py-11">
            <span className="mx-auto mb-4 block h-[3px] w-10 rounded-full bg-[#FFC107]" />
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#FFC107]">READY TO START?</p>
            <h2 className="mt-4 text-[34px] font-bold tracking-[-0.04em] text-white md:text-[48px]">Book Your Free Assessment</h2>
            <p className="mx-auto mt-5 max-w-[700px] text-[16px] leading-[1.8] text-white/86">
              We&apos;ll assess your child&apos;s current level and recommend the right group, tutor, and next step with no
              obligation.
            </p>
            <div className="mt-8">
              <Link
                href="/contact/#booking-form"
                className="inline-flex items-center justify-center rounded-full bg-[#FFC107] px-8 py-[14px] text-[15px] font-semibold text-black transition-all duration-200 hover:translate-y-[-1px] hover:bg-[#f0b400]"
              >
                Book Free Assessment
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

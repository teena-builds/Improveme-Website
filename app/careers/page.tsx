import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const benefits = [
  {
    title: "Purposeful Work",
    copy:
      "Help students build confidence, improve results, and enjoy learning in a centre designed around high standards and care.",
  },
  {
    title: "Professional Growth",
    copy:
      "Work alongside an experienced academic team with clear expectations, structured support, and room to develop your teaching craft.",
  },
  {
    title: "Small Group Impact",
    copy:
      "Teach in focused small groups where your expertise matters, your feedback is heard, and your work creates visible progress.",
  },
];

const roles = [
  {
    title: "Primary Tutor",
    type: "Part Time / Full Time",
    description:
      "Support younger learners in Maths, English, and Science with strong subject knowledge, warmth, and clarity.",
  },
  {
    title: "Secondary Subject Tutor",
    type: "Part Time / Full Time",
    description:
      "Teach GCSE, IGCSE, A-Level, IB, or MYP students in your specialist subject with an exam-focused, student-first approach.",
  },
  {
    title: "Learning Support & Operations",
    type: "Centre Based",
    description:
      "Help create a smooth, high-quality student experience through academic coordination, parent communication, and centre support.",
  },
];

const hiringSteps = [
  {
    step: "01",
    title: "Application Review",
    copy: "We review your experience, subject fit, teaching background, and alignment with our standards and culture.",
  },
  {
    step: "02",
    title: "Initial Conversation",
    copy: "A short call to understand your strengths, availability, and the age groups or subjects where you work best.",
  },
  {
    step: "03",
    title: "Teaching Assessment",
    copy: "You may be invited to deliver a short sample lesson so we can see your clarity, structure, and student engagement.",
  },
  {
    step: "04",
    title: "Final Stage",
    copy: "Successful candidates move to final discussions, references, and onboarding with the academic team.",
  },
];

export const metadata: Metadata = {
  title: "Careers | Improve ME Institute Clone",
  description: "Explore careers at Improve ME Institute and join our teaching and academic support team in Dubai.",
};

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-[#002D62]">
        <div className="absolute inset-0">
          <Image
            src="/ref/Students at Maths Class (3).jpeg"
            alt="Tutoring team at Improve ME Institute"
            fill
            priority
            className="object-cover object-center opacity-25"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,45,98,0.94)_0%,rgba(0,45,98,0.88)_48%,rgba(0,45,98,0.72)_100%)]" />
        <div className="relative mx-auto grid max-w-[1140px] gap-10 px-4 pb-16 pt-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:pb-20 lg:pt-20">
          <div className="max-w-[620px] text-white">
            <span className="mb-4 block h-[3px] w-10 rounded-full bg-[#FFC107]" />
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#FFC107]">JOIN OUR TEAM</p>
            <h1 className="mt-4 text-[38px] font-bold leading-[1.05] tracking-[-0.04em] text-white md:text-[58px]">
              Careers at Improve ME Institute
            </h1>
            <p className="mt-6 max-w-[560px] text-[17px] leading-[1.75] text-white/92">
              We are building a team of teachers and academic professionals who care deeply about outcomes, relationships,
              and high-quality learning. If you believe great teaching changes confidence as much as grades, we would love
              to hear from you.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/contact/#booking-form"
                className="inline-flex items-center justify-center rounded-full bg-[#FFC107] px-7 py-[14px] text-[15px] font-semibold text-black transition-colors duration-200 hover:bg-[#f0b400]"
              >
                Apply Your Interest
              </Link>
              <Link
                href="#open-roles"
                className="inline-flex items-center justify-center text-[15px] font-medium text-white/90 transition-colors duration-200 hover:text-white"
              >
                View Open Roles
              </Link>
            </div>
            <p className="mt-8 text-[13px] text-white/75">Dubai based · Academic excellence · Small group teaching model</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div className="overflow-hidden rounded-[18px] border border-white/10 bg-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.18)] backdrop-blur-[6px]">
              <div className="relative h-[220px]">
                <Image src="/ref/jason class2.jpg" alt="Improve ME classroom" fill className="object-cover" />
              </div>
              <div className="px-6 py-5">
                <p className="text-[18px] font-bold text-white">Teach in a focused learning environment</p>
                <p className="mt-2 text-[14px] leading-6 text-white/82">
                  Work with motivated students in a structured centre where lessons are small, purposeful, and well supported.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1140px] px-4 py-[78px] sm:px-6 lg:px-8">
        <div className="max-w-[740px]">
          <span className="mb-4 block h-[3px] w-10 rounded-full bg-[#FFC107]" />
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#FFC107]">WHY WORK WITH US</p>
          <h2 className="mt-4 text-[34px] font-bold tracking-[-0.04em] text-[#1c2744] md:text-[46px]">
            A professional teaching environment built around quality
          </h2>
          <p className="mt-5 text-[16px] leading-[1.75] text-[#4965b2]">
            Our centre combines academic ambition with a supportive, team-based culture. We care about how students feel,
            how they learn, and how our teachers grow.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="rounded-[16px] border border-[#e7ebf2] bg-white px-6 py-6 shadow-[0_10px_28px_rgba(15,23,42,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(15,23,42,0.10)]"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-[10px] bg-[#edf4ff] text-[#365bb2]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                  <path d="M12 3v18" />
                  <path d="M4 12h16" />
                </svg>
              </div>
              <h3 className="text-[20px] font-bold text-[#1c2744]">{benefit.title}</h3>
              <p className="mt-3 text-[15px] leading-[1.7] text-[#4965b2]">{benefit.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="open-roles" className="bg-[#fbfbfc] py-[78px]">
        <div className="mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-[700px]">
              <span className="mb-4 block h-[3px] w-10 rounded-full bg-[#FFC107]" />
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#FFC107]">OPEN ROLES</p>
              <h2 className="mt-4 text-[34px] font-bold tracking-[-0.04em] text-[#1c2744] md:text-[46px]">Where you could fit</h2>
              <p className="mt-5 text-[16px] leading-[1.75] text-[#4965b2]">
                We are always interested in speaking to strong educators and academic professionals who align with our standards.
              </p>
            </div>
            <div className="rounded-[14px] border border-[#e4e7ef] bg-white px-5 py-4 shadow-[0_10px_28px_rgba(15,23,42,0.08)]">
              <p className="text-[13px] font-medium uppercase tracking-[0.18em] text-[#7d8fbe]">Location</p>
              <p className="mt-1 text-[16px] font-semibold text-[#1c2744]">Gold &amp; Diamond Park, Dubai</p>
            </div>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {roles.map((role) => (
              <div
                key={role.title}
                className="rounded-[18px] border border-[#e7ebf2] bg-white px-6 py-6 shadow-[0_10px_28px_rgba(15,23,42,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(15,23,42,0.10)]"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-[22px] font-bold tracking-[-0.02em] text-[#1c2744]">{role.title}</h3>
                  <span className="rounded-full bg-[#edf4ff] px-3 py-1 text-[12px] font-medium text-[#365bb2]">{role.type}</span>
                </div>
                <p className="mt-4 text-[15px] leading-[1.7] text-[#4965b2]">{role.description}</p>
                <Link
                  href="/contact/#booking-form"
                  className="mt-6 inline-flex items-center gap-2 text-[15px] font-semibold text-[#1c2744] transition-colors duration-200 hover:text-[#365bb2]"
                >
                  Register interest
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1140px] px-4 py-[78px] sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="overflow-hidden rounded-[18px] shadow-[0_16px_40px_rgba(15,23,42,0.10)]">
            <div className="relative h-[300px] md:h-[360px]">
              <Image src="/ref/Y11 Physics.jpeg" alt="Teaching at Improve ME Institute" fill className="object-cover" />
            </div>
          </div>

          <div>
            <span className="mb-4 block h-[3px] w-10 rounded-full bg-[#FFC107]" />
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#FFC107]">HIRING PROCESS</p>
            <h2 className="mt-4 text-[34px] font-bold tracking-[-0.04em] text-[#1c2744] md:text-[46px]">A clear, thoughtful process</h2>
            <div className="mt-8 overflow-hidden rounded-[14px] border border-[#ecedf2] bg-white">
              {hiringSteps.map((item) => (
                <div key={item.step} className="grid grid-cols-[76px_1fr] border-b border-[#eef0f4] px-6 py-6 last:border-b-0 md:grid-cols-[88px_1fr]">
                  <div className="text-[42px] font-bold leading-none tracking-[-0.05em] text-[#d8dfed]">{item.step}</div>
                  <div>
                    <h3 className="text-[18px] font-bold text-[#1c2744]">{item.title}</h3>
                    <p className="mt-2 text-[15px] leading-[1.7] text-[#4965b2]">{item.copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#002D62] py-[76px]">
        <div className="mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-8">
          <div className="rounded-[20px] border border-white/10 bg-white/6 px-6 py-8 text-center shadow-[0_16px_40px_rgba(0,0,0,0.18)] backdrop-blur-[4px] md:px-10 md:py-10">
            <span className="mx-auto mb-4 block h-[3px] w-10 rounded-full bg-[#FFC107]" />
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#FFC107]">READY TO APPLY?</p>
            <h2 className="mt-4 text-[34px] font-bold tracking-[-0.04em] text-white md:text-[46px]">
              Let&apos;s start the conversation
            </h2>
            <p className="mx-auto mt-5 max-w-[700px] text-[16px] leading-[1.75] text-white/88">
              If you think you would be a strong fit for our teaching or academic support team, send your details through and
              we will be in touch when a suitable role is open.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact/#booking-form"
                className="inline-flex items-center justify-center rounded-full bg-[#FFC107] px-7 py-[14px] text-[15px] font-semibold text-black transition-colors duration-200 hover:bg-[#f0b400]"
              >
                Contact the Team
              </Link>
              <Link
                href="/about/"
                className="inline-flex items-center justify-center text-[15px] font-medium text-white/88 transition-colors duration-200 hover:text-white"
              >
                Learn more about us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

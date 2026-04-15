import type { Metadata } from "next";
import Link from "next/link";
import { BookAssessmentForm } from "../../components/book-assessment-form";

const contactLines = [
  { label: "Primary (Ages 3-10)", phone: "+971 50 185 2505", href: "tel:+971501852505" },
  { label: "Lower Secondary (Ages 11-14)", phone: "+971 58 533 4989", href: "tel:+971585334989" },
  { label: "Upper Secondary (Ages 15+)", phone: "+971 58 547 1457", href: "tel:+971585471457" },
] as const;

const highlights = [
  "Free diagnostic assessment",
  "No obligation to enrol",
  "Response within two hours (working days)",
  "Personalised programme recommendation",
] as const;

const details = [
  { title: "Address", value: "Suite 3016-3017, Building 3, Gold & Diamond Park, Dubai, UAE" },
  { title: "Nearest Metro", value: "Equiti Metro Station (about 3.5 minute walk)" },
  { title: "Office Hours", value: "Mon-Fri: 9:30am-8:00pm, Sat: 9:00am-7:00pm, Closed Sunday" },
] as const;

export const metadata: Metadata = {
  title: "Contact | Improve ME Institute",
  description:
    "Contact Improve ME Institute in Dubai. Book a free assessment, speak with our academic team, and find the right programme for your child.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-[#002D62] pb-16 pt-16 md:pb-20 md:pt-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-[#35508f]/45 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#FFC107]/14 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.14),transparent_35%),linear-gradient(135deg,#002D62_0%,#113a7b_58%,#1b4c91_100%)]" />
        </div>

        <div className="section-container relative z-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-[680px] text-white">
            <span className="mb-4 block h-[3px] w-10 rounded-full bg-[#FFC107]" />
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#FFC107]">CONTACT US</p>
            <h1 className="mt-4 text-[38px] font-bold leading-[1.07] tracking-[-0.05em] md:text-[56px]">
              Let&apos;s Find the Right Programme for Your Child
            </h1>
            <p className="mt-6 max-w-[620px] text-[17px] leading-[1.8] text-white/88">
              Book your free assessment or speak with our team. We&apos;ll guide you to the right curriculum pathway, subject
              support, and learning plan.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="#booking-form"
                className="inline-flex items-center justify-center rounded-full bg-[#FFC107] px-7 py-[14px] text-[15px] font-semibold text-black transition-colors duration-200 hover:bg-[#f0b400]"
              >
                Book Free Assessment
              </Link>
              <Link
                href="#visit-us"
                className="inline-flex items-center justify-center rounded-full border border-white/40 px-7 py-[14px] text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-white/10"
              >
                Visit Our Centre
              </Link>
            </div>
          </div>

          <div className="rounded-[20px] border border-white/12 bg-white/8 p-5 shadow-[0_16px_42px_rgba(0,0,0,0.2)] backdrop-blur-[4px]">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#FFC107]">PHONE LINES</p>
            <div className="mt-4 space-y-4">
              {contactLines.map((line) => (
                <div key={line.label} className="rounded-[14px] border border-white/16 bg-white/90 px-4 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#365bb2]">{line.label}</p>
                  <a href={line.href} className="mt-1 inline-block text-[22px] font-bold tracking-[-0.02em] text-[#1c2744] hover:underline">
                    {line.phone}
                  </a>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-[14px] border border-white/16 bg-white/90 px-4 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#365bb2]">Email</p>
              <a
                href="mailto:contact@improvemeinstitute.com"
                className="mt-1 inline-block text-[16px] font-semibold text-[#1c2744] hover:underline"
              >
                contact@improvemeinstitute.com
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="booking-form" className="bg-[#f0f4ff] py-[78px]">
        <div className="section-container">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <span className="mb-4 block h-[3px] w-10 rounded-full bg-[#FFC107]" />
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#FFC107]">FREE ASSESSMENT</p>
              <h2 className="mt-4 text-[34px] font-bold tracking-[-0.04em] text-[#1c2744] md:text-[46px]">
                Start With a Free Diagnostic Assessment
              </h2>
              <p className="mt-5 text-[16px] leading-[1.8] text-[#4965b2]">
                We&apos;ll assess current level, identify priority areas, and recommend the best class and tutor fit for your
                child.
              </p>

              <ul className="mt-7 space-y-3">
                {highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-[14px] border border-[#e4eaf7] bg-white px-4 py-3 shadow-[0_8px_20px_rgba(15,23,42,0.05)]"
                  >
                    <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#FFC107] text-[11px] font-bold text-[#1c2744]">
                      ✓
                    </span>
                    <span className="text-[15px] leading-[1.7] text-[#4965b2]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="overflow-hidden rounded-[18px] border border-[#dde4f3] bg-white shadow-[0_16px_40px_rgba(15,23,42,0.1)]">
              <BookAssessmentForm />
            </div>
          </div>
        </div>
      </section>

      <section id="visit-us" className="py-[78px]">
        <div className="section-container">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <span className="mb-4 block h-[3px] w-10 rounded-full bg-[#FFC107]" />
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#FFC107]">VISIT US</p>
              <h2 className="mt-4 text-[34px] font-bold tracking-[-0.04em] text-[#1c2744] md:text-[46px]">
                Gold &amp; Diamond Park, Dubai
              </h2>

              <div className="mt-7 space-y-3">
                {details.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[14px] border border-[#e4eaf7] bg-white px-4 py-4 shadow-[0_8px_20px_rgba(15,23,42,0.05)]"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#365bb2]">{item.title}</p>
                    <p className="mt-1 text-[15px] leading-[1.7] text-[#4965b2]">{item.value}</p>
                  </div>
                ))}
              </div>

              <a
                href="https://maps.app.goo.gl/idHaaznLXT189cL28"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center justify-center rounded-full bg-[#FFC107] px-7 py-[14px] text-[15px] font-semibold text-black transition-colors duration-200 hover:bg-[#f0b400]"
              >
                Open in Google Maps
              </a>
            </div>

            <div className="overflow-hidden rounded-[18px] border border-[#e3e8f4] shadow-[0_16px_40px_rgba(15,23,42,0.1)]">
              <div className="relative h-[520px] w-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3268.9540006816633!2d55.206411875379544!3d25.12514517775727!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6bc6792d0437%3A0xe71d4aaa3d08b9!2sImprove%20ME%20Institute!5e1!3m2!1sen!2sae!4v1770818880559!5m2!1sen!2sae"
                  title="Improve ME Institute map location"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 h-full w-full"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

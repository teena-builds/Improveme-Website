import Image from "next/image";
import Link from "next/link";

export function SiteFooterFixed() {
  return (
    <>
      <footer className="bg-[#141c2d] text-white">
        <div className="mx-auto max-w-[1140px] px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-6">
            <div className="md:col-span-1">
              <Link href="/">
                <Image src="/ref/logo.png" alt="Improve ME Institute" width={180} height={45} className="h-[44px] w-auto" />
              </Link>
              <p className="mt-4 max-w-[160px] text-[14px] leading-7 text-white/70">Leading Tutoring Centre in Dubai</p>
              <div className="mt-5 flex gap-3">
                {["t", "i", "f"].map((item) => (
                  <span key={item} className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-[15px] text-white/70">
                    {item}
                  </span>
                ))}
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
              <div className="space-y-3 text-[14px] text-white/72">
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
              <div className="space-y-3 text-[14px] text-white/72">
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
              <div className="space-y-3 text-[14px] text-white/72">
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
              <div className="space-y-3 text-[14px] text-white/72">
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
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">QUICK LINKS</p>
              <div className="space-y-3 text-[14px] text-white/72">
                {[
                  ["/", "Home"],
                  ["/about/", "About Us"],
                  ["/courses/", "Our Courses"],
                  ["/curriculum/", "Our Curriculum"],
                  ["/faq/", "FAQ"],
                  ["/glossary/", "Glossary"],
                  ["/contact/", "Contact Us"],
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
                Suite 3016–3017, Building 3
                <br />
                Gold and Diamond Park, Dubai
              </p>
              <div className="mt-5 space-y-3 text-[14px] leading-6 text-white/72">
                <a href="tel:+971501852505" className="block transition hover:text-white">Primary: +971 50 185 2505</a>
                <a href="tel:+971585334989" className="block transition hover:text-white">Lower Secondary: +971 58 533 4989</a>
                <a href="tel:+971585471457" className="block transition hover:text-white">Upper Secondary: +971 58 547 1457</a>
                <a href="tel:+97143805525" className="block transition hover:text-white">Landline: +971 4 380 5525</a>
                <a href="mailto:contact@improvemeinstitute.com" className="block transition hover:text-white">contact@improvemeinstitute.com</a>
                <p className="text-white/48">Mon–Fri: 9:30am–8:00pm · Sat: 9:00am–7:00pm</p>
              </div>
            </div>
          </div>

          <div className="mt-9 flex flex-col gap-2 border-t border-white/8 pt-5 text-[12px] text-white/40 sm:flex-row sm:items-center sm:justify-between">
            <p>Improve ME Institute © 2026. All Rights Reserved</p>
            <p>Operates under RAK Free Zone licence</p>
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
        className="fixed bottom-6 right-[86px] z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#FFC107] text-[#1c2744] shadow-[0_14px_28px_rgba(0,0,0,0.16)]"
      >
        ^
      </a>
    </>
  );
}

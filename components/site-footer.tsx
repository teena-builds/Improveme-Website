export function SiteFooter() {
  return (
    <>
      <footer className="bg-navy-900 text-white">
        <div className="w-full max-w-none px-4 py-10 sm:px-6 lg:px-20">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-6">
            <div className="space-y-1.5">
              <a className="inline-block" href="/">
                <img alt="Improve ME Institute" className="h-[45px] w-auto max-w-[185px] object-contain" src="/ref/logo.png" />
              </a>
              <p className="text-sm text-white/60">Leading Tutoring Centre in Dubai</p>
              <div className="flex gap-2">
                {[
                  ["https://www.tiktok.com/@improveme.dxb", "TikTok"],
                  ["https://www.instagram.com/improvemedxb", "Instagram"],
                  ["https://www.facebook.com/improvemeinstitute", "Facebook"],
                ].map(([href, label]) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Improve ME on ${label}`}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-sm text-white/60 transition-colors duration-150 hover:text-[#FFC107]"
                  >
                    {label.slice(0, 1)}
                  </a>
                ))}
              </div>
              <a
                className="mt-4 inline-block rounded-full bg-[#FFC107] px-4 py-2 text-sm font-semibold whitespace-nowrap text-navy-900 transition-opacity hover:opacity-90"
                href="/contact/#booking-form"
              >
                Book Your Free Assessment
              </a>
            </div>

            <div>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/50">Primary</h4>
              <ul className="space-y-1.5">
                {[
                  ["/curriculum/primary/eyfs/", "EYFS"],
                  ["/curriculum/primary/ks1/", "Key Stage 1"],
                  ["/curriculum/primary/ks2/", "Key Stage 2"],
                  ["/courses/mathematics/", "Mathematics"],
                  ["/courses/english/", "English"],
                  ["/courses/science/", "Science"],
                ].map(([href, label]) => (
                  <li key={href}>
                    <a className="text-sm text-white/60 transition-colors duration-150 hover:text-[#FFC107] hover:no-underline" href={href}>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/50">Secondary</h4>
              <p className="mb-1 text-[10px] uppercase tracking-wider text-white/30">Qualifications</p>
              <ul className="space-y-1.5">
                {[
                  ["/curriculum/secondary/ks3/", "Key Stage 3"],
                  ["/curriculum/secondary/gcse/", "GCSE"],
                  ["/curriculum/secondary/igcse/", "IGCSE"],
                  ["/curriculum/secondary/a-level/", "A-Level"],
                  ["/curriculum/secondary/ib/", "IB Diploma"],
                  ["/curriculum/secondary/myp/", "MYP"],
                ].map(([href, label]) => (
                  <li key={href}>
                    <a className="text-sm text-white/60 transition-colors duration-150 hover:text-[#FFC107] hover:no-underline" href={href}>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mb-1 mt-3 text-[10px] uppercase tracking-wider text-white/30">Subjects</p>
              <ul className="space-y-1.5">
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
                  <li key={href}>
                    <a className="text-sm text-white/60 transition-colors duration-150 hover:text-[#FFC107] hover:no-underline" href={href}>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/50">Enrichment</h4>
              <ul className="space-y-1.5">
                {[
                  ["/courses/cat-prep/", "CAT4 Prep"],
                  ["/courses/entrance-prep/", "7+/11+ Entrance Prep"],
                  ["/courses/chess/", "Chess Mastery"],
                  ["/courses/financial-literacy/", "Financial Literacy"],
                  ["/courses/ai-literacy/", "AI Literacy"],
                  ["/courses/counselling/", "Counselling"],
                ].map(([href, label]) => (
                  <li key={href}>
                    <a className="text-sm text-white/60 transition-colors duration-150 hover:text-[#FFC107] hover:no-underline" href={href}>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/50">Quick Links</h4>
              <ul className="space-y-1.5">
                {[
                  ["/", "Home"],
                  ["/about/", "About Us"],
                  ["/courses/", "Our Courses"],
                  ["/curriculum/", "Our Curriculum"],
                  ["/faq/", "FAQ"],
                  ["/glossary/", "Glossary"],
                  ["/contact/", "Contact Us"],
                ].map(([href, label]) => (
                  <li key={href}>
                    <a className="text-sm text-white/60 transition-colors duration-150 hover:text-[#FFC107] hover:no-underline" href={href}>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/50">Contact</h4>
              <p className="text-sm leading-relaxed text-white/60">
                Suite 3016–3017, Building 3
                <br />
                Gold and Diamond Park, Dubai
              </p>
              <ul className="mt-2 space-y-0.5">
                {[
                  ["tel:+971501852505", "Primary: +971 50 185 2505"],
                  ["tel:+971585334989", "Lower Secondary: +971 58 533 4989"],
                  ["tel:+971585471457", "Upper Secondary: +971 58 547 1457"],
                  ["tel:+97143805525", "Landline: +971 4 380 5525"],
                ].map(([href, label]) => (
                  <li className="text-sm" key={href}>
                    <a className="text-white/60 transition-colors duration-150 hover:text-[#FFC107]" href={href}>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
              <a className="mt-2 inline-block text-sm text-white/60 transition-colors duration-150 hover:text-[#FFC107]" href="mailto:contact@improvemeinstitute.com">
                contact@improvemeinstitute.com
              </a>
              <p className="mt-2 text-xs text-white/40">Mon–Fri: 9:30am–8:00pm · Sat: 9:00am–7:00pm</p>
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-2 border-t border-white/10 py-3 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
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
        className="fixed bottom-4 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-110 sm:bottom-6 sm:right-6 sm:h-14 sm:w-14 md:bottom-8 md:right-8"
        style={{ backgroundColor: "#25D366" }}
      >
        <img alt="WhatsApp icon" width="30" height="30" src="/ref/whatsapp-icon-seeklogo.com.svg" />
      </a>
    </>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type MenuGroup = {
  title: string;
  items: Array<{ label: string; href: string; sublabel?: string }>;
};

const coursesMenu: MenuGroup[] = [
  {
    title: "Core Subjects",
    items: [
      { label: "Mathematics", href: "/courses/mathematics/", sublabel: "Primary & Secondary" },
      { label: "English", href: "/courses/english/", sublabel: "Primary & Secondary" },
      { label: "Science", href: "/courses/science/", sublabel: "Primary & KS3" },
      { label: "Biology", href: "/courses/biology/", sublabel: "GCSE to IB" },
      { label: "Chemistry", href: "/courses/chemistry/", sublabel: "GCSE to IB" },
      { label: "Physics", href: "/courses/physics/", sublabel: "GCSE to IB" },
    ],
  },
  {
    title: "Humanities & Business",
    items: [
      { label: "Business Studies", href: "/courses/business-studies/" },
      { label: "Economics", href: "/courses/economics/" },
      { label: "Psychology", href: "/courses/psychology/" },
    ],
  },
  {
    title: "Enrichment Programmes",
    items: [
      { label: "CAT4 Test Prep", href: "/courses/cat-prep/" },
      { label: "7+/11+ Entrance Prep", href: "/courses/entrance-prep/" },
      { label: "Chess Mastery", href: "/courses/chess/" },
      { label: "Financial Literacy", href: "/courses/financial-literacy/" },
      { label: "AI Literacy", href: "/courses/ai-literacy/" },
      { label: "Educational Counselling", href: "/courses/counselling/" },
      { label: "Home Education Support", href: "/courses/home-education/" },
    ],
  },
];

const curriculumMenu: MenuGroup[] = [
  {
    title: "Primary",
    items: [
      { label: "EYFS", href: "/curriculum/primary/eyfs/" },
      { label: "Key Stage 1", href: "/curriculum/primary/ks1/" },
      { label: "Key Stage 2", href: "/curriculum/primary/ks2/" },
      { label: "Primary Overview", href: "/curriculum/primary/" },
    ],
  },
  {
    title: "Secondary",
    items: [
      { label: "Key Stage 3", href: "/curriculum/secondary/ks3/" },
      { label: "GCSE", href: "/curriculum/secondary/gcse/" },
      { label: "IGCSE", href: "/curriculum/secondary/igcse/" },
      { label: "MYP", href: "/curriculum/secondary/myp/" },
      { label: "A-Level", href: "/curriculum/secondary/a-level/" },
      { label: "IB Diploma", href: "/curriculum/secondary/ib/" },
      { label: "Secondary Overview", href: "/curriculum/secondary/" },
    ],
  },
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Our Courses", href: "/courses/", menu: coursesMenu },
  { label: "Our Curriculum", href: "/curriculum/", menu: curriculumMenu },
  { label: "About Us", href: "/about/" },
  { label: "Blogs", href: "/blog/" },
  // { label: "Contact", href: "/contact/" },
];

function Chevron() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return open ? (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
      <path d="M4 5h16" />
      <path d="M4 12h16" />
      <path d="M4 19h16" />
    </svg>
  );
}

function MapPin() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 text-yellow-400">
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

const isActiveRoute = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href);

export function SiteHeader() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="w-full" style={{ backgroundColor: "#002D62" }}>
        <div className="mx-auto hidden max-w-[1140px] items-center justify-between gap-2 px-4 py-2 sm:px-6 md:flex lg:px-8">
          <Link className="flex items-center gap-2 transition-opacity hover:opacity-90" href="/contact/#map">
            <MapPin />
            <span className="text-xs font-medium text-white sm:text-sm">Gold &amp; Diamond Park, Dubai</span>
          </Link>
          <div className="flex items-center gap-3 md:gap-4">
            {[
              ["Primary: +971-50 185 2505", "tel:+971501852505", "https://wa.me/971501852505?text=Hi,%20I'm%20interested%20in%20signing%20up.%20Please%20can%20I%20get%20more%20info?"],
              ["Lower Secondary (Ages 11–14): +971 58 533 4989", "tel:+971585334989", "https://wa.me/971585334989?text=Hi,%20I'm%20interested%20in%20signing%20up.%20Please%20can%20I%20get%20more%20info?"],
              ["Upper Secondary (Ages 15+): +971 58 547 1457", "tel:+971585471457", "https://wa.me/971585471457?text=Hi,%20I'm%20interested%20in%20signing%20up.%20Please%20can%20I%20get%20more%20info?"],
            ].map(([label, tel, whatsapp], index) => (
              <div className="flex items-center gap-2" key={label}>
                {index > 0 ? <span className="hidden text-white/50 md:inline">|</span> : null}
                <a className="text-xs font-medium text-white transition-colors hover:text-yellow-400 sm:text-sm" href={tel}>
                  {label}
                </a>
                <a
                  className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-green-500 transition-colors hover:bg-green-600"
                  href={whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Chat about ${label}`}
                >
                  <Image alt="" className="h-3.5 w-3.5" src="/ref/whatsapp-icon-seeklogo.com.svg" width={14} height={14} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      <nav
        className="w-full border-b border-gray-200 bg-white transition-shadow duration-200"
        style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
      >
        <div className="mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="flex h-16 items-center justify-between">
              <Link className="flex-shrink-0 transition-transform hover:scale-105" href="/">
                <Image alt="Improve ME Institute" className="h-9 w-auto" src="/ref/logo.png" width={185} height={45} />
              </Link>

              <div className="hidden lg:flex lg:items-center lg:gap-1">
                {navLinks.map((link) => (
                  <div
                    className="relative"
                    key={link.label}
                    onMouseEnter={() => setOpenMenu(link.menu ? link.label : null)}
                    onMouseLeave={() => setOpenMenu((current) => (current === link.label ? null : current))}
                  >
                    <Link
                      href={link.href}
                      className={`flex items-center gap-0.5 rounded-md px-[15px] py-3 text-[15px] font-medium transition-colors duration-100 focus-visible:outline focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2 ${
                        isActiveRoute(pathname, link.href) ? "text-yellow-500" : "text-navy-900 hover:text-yellow-500"
                      }`}
                    >
                      {link.label}
                      {link.menu ? <Chevron /> : null}
                    </Link>

                    {link.menu && openMenu === link.label ? (
                      <div className="absolute left-1/2 top-full z-50 mt-[2px] w-[780px] -translate-x-1/2 rounded-[18px] border border-gray-100 bg-white p-6 shadow-[0_18px_48px_rgba(15,23,42,0.12)]">
                        <div className="grid gap-6 md:grid-cols-3">
                          {link.menu.map((group) => (
                            <div key={group.title}>
                              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-navy-500">{group.title}</p>
                              <ul className="space-y-3">
                                {group.items.map((item) => (
                                  <li key={item.href}>
                                    <Link className="block hover:no-underline" href={item.href}>
                                      <span className="block text-sm font-semibold text-navy-900 transition-colors hover:text-yellow-500">
                                        {item.label}
                                      </span>
                                      {item.sublabel ? (
                                        <span className="mt-0.5 block text-xs text-navy-500">{item.sublabel}</span>
                                      ) : null}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>

              <div className="hidden flex-shrink-0 lg:block">
                <Link
                  href="/contact/#booking-form"
                  className="inline-flex items-center justify-center rounded-[8px] px-7 py-[12px] text-[15px] font-bold text-black transition-all duration-200 hover:opacity-95 hover:shadow-md focus-visible:outline focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2"
                  style={{ backgroundColor: "#FFC107" }}
                >
                  Book Free Assessment
                </Link>
              </div>

              <button
                type="button"
                className="rounded-lg p-2 text-navy-900 transition-colors hover:bg-gray-100 focus-visible:outline focus-visible:ring-2 focus-visible:ring-yellow-400 lg:hidden"
                aria-expanded={mobileOpen}
                aria-label="Toggle menu"
                onClick={() => setMobileOpen((value) => !value)}
              >
                <MenuIcon open={mobileOpen} />
              </button>
            </div>

            {mobileOpen ? (
              <div className="border-t border-gray-100 pb-4 lg:hidden">
                <div className="space-y-1 pt-3">
                  {navLinks.map((link) => (
                    <div key={link.label}>
                      <div className="flex items-center justify-between">
                        <Link
                          href={link.href}
                          className="flex-1 rounded-lg px-3 py-3 text-sm font-medium text-navy-900 hover:bg-gray-50"
                          onClick={() => setMobileOpen(false)}
                        >
                          {link.label}
                        </Link>
                        {link.menu ? (
                          <button
                            type="button"
                            className="rounded-lg p-3 text-navy-700"
                            onClick={() =>
                              setMobileSection((current) => (current === link.label ? null : link.label))
                            }
                          >
                            <Chevron />
                          </button>
                        ) : null}
                      </div>
                      {link.menu && mobileSection === link.label ? (
                        <div className="space-y-4 rounded-xl bg-gray-50 px-4 py-3">
                          {link.menu.map((group) => (
                            <div key={group.title}>
                              <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-navy-500">
                                {group.title}
                              </p>
                              <div className="space-y-2">
                                {group.items.map((item) => (
                                  <Link
                                    key={item.href}
                                    href={item.href}
                                    className="block text-sm text-navy-700 hover:text-yellow-600"
                                    onClick={() => setMobileOpen(false)}
                                  >
                                    {item.label}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
                <Link
                  href="/contact/#booking-form"
                  className="mt-4 inline-flex w-full items-center justify-center rounded-lg px-5 py-3 text-sm font-bold text-black"
                  style={{ backgroundColor: "#FFC107" }}
                  onClick={() => setMobileOpen(false)}
                >
                  Book Free Assessment
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </nav>
    </header>
  );
}

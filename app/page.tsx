import type { Metadata } from "next";
import { HomepageCloneRefined } from "../components/homepage-clone-refined";
import { getPageByRoute } from "../lib/site";

const homePage = getPageByRoute("/");
//commit test
export const metadata: Metadata = {
  title: homePage?.title ?? "Improve ME Institute | Tutoring in Dubai for Ages 3-18",
  description:
    homePage?.description ??
    "Improve ME Institute offers expert tutoring in Dubai for Primary, GCSE, IGCSE, A-Level, IB, and MYP students. Book a free assessment today.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: homePage?.title ?? "Improve ME Institute | Tutoring in Dubai for Ages 3-18",
    description:
      homePage?.description ??
      "Improve ME Institute offers expert tutoring in Dubai for Primary, GCSE, IGCSE, A-Level, IB, and MYP students. Book a free assessment today.",
    images: [
      {
        url: "/ref/images/hero-poster-home-v3.webp",
        width: 1200,
        height: 630,
        alt: "Students learning at Improve ME Institute in Dubai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: homePage?.title ?? "Improve ME Institute | Tutoring in Dubai for Ages 3-18",
    description:
      homePage?.description ??
      "Improve ME Institute offers expert tutoring in Dubai for Primary, GCSE, IGCSE, A-Level, IB, and MYP students. Book a free assessment today.",
    images: ["/ref/images/hero-poster-home-v3.webp"],
  },
};

export default function HomePage() {
  return <HomepageCloneRefined />;
}

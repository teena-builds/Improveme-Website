import type { Metadata } from "next";
import "./globals.css";
import { SiteFooterRefined } from "../components/site-footer-refined";
import { SiteHeaderRefined } from "../components/site-header-refined";
import { referenceStylesheets } from "../lib/site";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.improvemeinstitute.com"),
  title: {
    default: "Improve ME Institute | Tutoring Centre in Dubai",
    template: "%s | Improve ME Institute",
  },
  description:
    "Improve ME Institute is a leading tutoring centre in Dubai, offering personalised tuition for students aged 3 to 18.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "Improve ME Institute",
    url: "/",
    title: "Improve ME Institute | Tutoring Centre in Dubai",
    description:
      "Improve ME Institute is a leading tutoring centre in Dubai, offering personalised tuition for students aged 3 to 18.",
    images: [
      {
        url: "/ref/images/hero-poster-home-v3.webp",
        width: 1200,
        height: 630,
        alt: "Improve ME Institute tutoring in Dubai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Improve ME Institute | Tutoring Centre in Dubai",
    description:
      "Improve ME Institute is a leading tutoring centre in Dubai, offering personalised tuition for students aged 3 to 18.",
    images: ["/ref/images/hero-poster-home-v3.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="dm_sans_acb62f20-module__MfOq3q__variable plus_jakarta_sans_a3cb4ecf-module__6Q69ta__variable inter_66fc0813-module__NWXCqW__variable h-full antialiased"
    >
      <head>
        {referenceStylesheets.map((href) => (
          <link key={href} rel="stylesheet" href={href} />
        ))}
      </head>
      <body className="min-h-full bg-white text-navy-900" suppressHydrationWarning>
        <SiteHeaderRefined />
        <div className="flex min-h-screen flex-col pt-[64px] md:pt-[96px]">
          <div className="flex-1">{children}</div>
          <SiteFooterRefined />
        </div>
      </body>
    </html>
  );
}

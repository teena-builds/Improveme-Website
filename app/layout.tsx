import type { Metadata } from "next";
import "./globals.css";
import { SiteFooterFixed } from "../components/site-footer-fixed";
import { SiteHeader } from "../components/site-header";
import { referenceStylesheets } from "../lib/site";

export const metadata: Metadata = {
  title: "Improve ME Institute Clone",
  description: "Local Next.js clone of Improve ME Institute.",
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
      <body className="min-h-full bg-white text-navy-900">
        <SiteHeader />
        <div className="flex min-h-screen flex-col pt-[64px] md:pt-[96px]">
          <div className="flex-1">{children}</div>
          <SiteFooterFixed />
        </div>
      </body>
    </html>
  );
}

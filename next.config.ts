import type { NextConfig } from "next";

const defaultStrapiOrigins = ["http://127.0.0.1:1337", "http://localhost:1337"];

const configuredOrigins = [process.env.STRAPI_URL, process.env.NEXT_PUBLIC_STRAPI_URL]
  .filter((origin): origin is string => Boolean(origin))
  .map((origin) => origin.replace(/\/$/, ""));

const strapiOrigins = Array.from(new Set([...defaultStrapiOrigins, ...configuredOrigins]));

const mediaPatterns = strapiOrigins.flatMap((origin) => {
  try {
    const url = new URL(origin);
    const patterns: NonNullable<NextConfig["images"]>["remotePatterns"] = [
      {
        protocol: url.protocol.replace(":", "") as "http" | "https",
        hostname: url.hostname,
        pathname: "/uploads/**",
      },
    ];

    if (url.hostname.endsWith(".strapiapp.com")) {
      patterns.push({
        protocol: "https",
        hostname: url.hostname.replace(".strapiapp.com", ".media.strapiapp.com"),
        pathname: "/**",
      });
    }

    return patterns;
  } catch {
    return [];
  }
});

const nextConfig: NextConfig = {
  images: {
    remotePatterns: mediaPatterns,
  },
};

export default nextConfig;

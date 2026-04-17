import type { NextConfig } from "next";

const defaultMediaPatterns: Array<{ protocol: "http" | "https"; hostname: string; pathname: string }> = [
  {
    protocol: "https",
    hostname: "darkslategrey-fox-461570.hostingersite.com",
    pathname: "/wp-content/uploads/**",
  },
];

const configuredOrigins = [process.env.STRAPI_URL, process.env.NEXT_PUBLIC_STRAPI_URL, process.env.WORDPRESS_API_URL]
  .filter((origin): origin is string => Boolean(origin))
  .map((origin) => origin.replace(/\/$/, ""));

const mediaOrigins = Array.from(new Set([...configuredOrigins]));

const configuredMediaPatterns = mediaOrigins.flatMap((origin) => {
  try {
    const url = new URL(origin);
    const patterns: Array<{ protocol: "http" | "https"; hostname: string; pathname: string }> = [
      {
        protocol: url.protocol.replace(":", "") as "http" | "https",
        hostname: url.hostname,
        pathname: "/**",
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

const mediaPatterns = [...defaultMediaPatterns, ...configuredMediaPatterns];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: mediaPatterns,
  },
};

export default nextConfig;

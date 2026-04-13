import type { NextConfig } from "next";

const defaultStrapiOrigins = ["http://127.0.0.1:1337", "http://localhost:1337"];

const configuredOrigins = [process.env.STRAPI_URL, process.env.NEXT_PUBLIC_STRAPI_URL]
  .filter((origin): origin is string => Boolean(origin))
  .map((origin) => origin.replace(/\/$/, ""));

const remotePatterns = Array.from(new Set([...defaultStrapiOrigins, ...configuredOrigins]))
  .map((origin) => {
    try {
      return new URL("/uploads/**", origin);
    } catch {
      return null;
    }
  })
  .filter((pattern): pattern is NonNullable<typeof pattern> => pattern !== null);

const nextConfig: NextConfig = {
  images: {
    remotePatterns,
  },
};

export default nextConfig;

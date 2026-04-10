import type { NextConfig } from "next";
import {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
  PHASE_PRODUCTION_SERVER,
} from "next/constants";

export default function nextConfig(phase: string): NextConfig {
  const distDir =
    phase === PHASE_DEVELOPMENT_SERVER
      ? ".next/dev"
      : phase === PHASE_PRODUCTION_BUILD || phase === PHASE_PRODUCTION_SERVER
        ? ".next/prod"
        : ".next/shared";

  return {
    distDir,
  };
}

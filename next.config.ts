import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Keep the OG renderer's local artwork and Chinese font in server deployments.
  outputFileTracingIncludes: {
    "/rainbow2026/opengraph-image": ["./app/rainbow2026/assets/**/*"],
  },
};

export default nextConfig;

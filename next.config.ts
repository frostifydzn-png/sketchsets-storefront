import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Product artwork is large source PNG; serve modern formats instead.
    formats: ["image/avif", "image/webp"],
    // Long cache — filenames change when artwork is replaced.
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

export default nextConfig;

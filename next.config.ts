import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  poweredByHeader: false,
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;

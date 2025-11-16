import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Allow importing from playandpay-sdk
  transpilePackages: ['playandpay-sdk'],
  // Turbopack config (Next.js 16+)
  turbopack: {},
};

export default nextConfig;

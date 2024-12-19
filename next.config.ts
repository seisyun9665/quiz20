import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  trailingSlash: true,
  // 404ページをカスタマイズする場合に必要
  webpack: (config) => {
    return config;
  }
};

export default nextConfig;

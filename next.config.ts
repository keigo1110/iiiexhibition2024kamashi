import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',

  // SEO最適化
  trailingSlash: true,

  // 画像最適化（静的エクスポート用）
  images: {
    unoptimized: true
  },

  // パフォーマンス最適化
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  }
};

export default nextConfig;

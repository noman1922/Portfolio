import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const envBase = process.env.NEXT_PUBLIC_BASE_PATH || (isProd ? '/Portfolio' : '');
const nextConfig: NextConfig = {
  output: "export",
  basePath: envBase || undefined,
  assetPrefix: envBase ? `${envBase}/` : undefined,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
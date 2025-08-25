import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Ensure server-only deps are resolved during RSC/Turbopack build (Next 15+)
  serverExternalPackages: ['mongoose', 'bcryptjs', 'jose'],
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: process.env.NEXT_PUBLIC_API_BASE
          ? `${process.env.NEXT_PUBLIC_API_BASE}/:path*`
          : "https://web31.onrender.com/:path*",
      },
    ];
  },
};

export default nextConfig;

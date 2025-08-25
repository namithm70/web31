import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    // Ensure server-only deps are resolved during RSC/Turbopack build
    serverComponentsExternalPackages: ['mongoose', 'bcryptjs'],
  },
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

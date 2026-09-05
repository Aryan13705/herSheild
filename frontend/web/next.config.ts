import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@hershield/ui", "@hershield/design-system", "@hershield/mission-map", "@hershield/feature-companion", "@hershield/feature-safety", "@hershield/feature-onboarding", "@hershield/feature-auth", "@hershield/feature-maps"],
  experimental: {
    optimizePackageImports: ["lucide-react", "@hershield/ui", "react-leaflet"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      { protocol: "https", hostname: "ui-avatars.com" },
      { protocol: "https", hostname: "images.unsplash.com" }
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

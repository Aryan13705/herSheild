import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@hershield/ui", "@hershield/design-system", "@hershield/mission-map", "@hershield/feature-companion", "@hershield/feature-safety", "@hershield/feature-onboarding", "@hershield/feature-auth", "@hershield/feature-maps"],
  experimental: {
    viewTransition: true,
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

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@hershield/ui", "@hershield/design-system", "@hershield/mission-map"],
  experimental: {
    viewTransition: true,
  }
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    localPatterns: [
      { pathname: "/brand/**" },
      { pathname: "/references/**" },
      { pathname: "/uploads/**" },
    ],
  },
};

export default nextConfig;

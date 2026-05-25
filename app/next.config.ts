import type { NextConfig } from "next";
import path from "path";

const repoRoot = path.join(__dirname, "..");

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // tools.json is a symlink to ../tools/tools.json — allow Turbopack to read the repo root
  outputFileTracingRoot: repoRoot,
  turbopack: {
    root: repoRoot,
  },
};

export default nextConfig;

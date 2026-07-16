import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";
const repositoryName = "medioevofest";
const basePath = isGitHubPages ? `/${repositoryName}` : "";

const nextConfig: NextConfig = {
  output: "export",

  basePath,

  assetPrefix: basePath ? `${basePath}/` : "",

  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },

  trailingSlash: true,

  images: {
    unoptimized: true,
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";
const repositoryName = "medioevofest";

const nextConfig: NextConfig = {
  output: "export",

  basePath: isGitHubPages ? `/${repositoryName}` : "",

  assetPrefix: isGitHubPages ? `/${repositoryName}/` : "",

  trailingSlash: true,

  images: {
    unoptimized: true,
  },
};

export default nextConfig;
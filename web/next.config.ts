import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lean production image for Docker — bundles only the traced dependency subset instead
  // of shipping full node_modules. See web/Dockerfile.
  output: "standalone",
};

export default nextConfig;

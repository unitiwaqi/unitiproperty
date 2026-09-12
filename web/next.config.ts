import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lean production image for Docker — bundles only the traced dependency subset instead
  // of shipping full node_modules. See web/Dockerfile.
  output: "standalone",
  // /opportunity was the v1 route for parcel detail pages and may still be linked from
  // inside institutions (README "Before launch" #6). v2 renamed it to /explore; keep old
  // links alive instead of 404ing.
  async redirects() {
    return [
      { source: "/opportunity", destination: "/explore", permanent: true },
      { source: "/opportunity/:zoneId", destination: "/explore/:zoneId", permanent: true },
      // "The site" (map/masterplan) was merged into /explore alongside the parcel
      // listings — see ExploreView.tsx.
      { source: "/site", destination: "/explore", permanent: true },
    ];
  },
};

export default nextConfig;

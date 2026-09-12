import type { Metadata } from "next";
import { ExploreView } from "@/components/explore/ExploreView";

export const metadata: Metadata = {
  title: "Explore — UnitiProperty",
  description:
    "Browse the five parcels available at Tanjung Agas, Port Dickson on the interactive site map or as a list — institutional, hospitality, marine industrial and joint-venture opportunities. Price on request.",
};

export default function ExplorePage() {
  return <ExploreView />;
}

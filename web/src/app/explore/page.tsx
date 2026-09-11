import type { Metadata } from "next";
import { ExploreView } from "@/components/explore/ExploreView";
import { filterOptions, type FilterOption } from "@/lib/zones";

export const metadata: Metadata = {
  title: "Explore the Map — UnitiProperty",
  description:
    "Browse investable zones across the Tanjung Agas site — institutional, hospitality, marine industrial and joint-venture opportunities.",
};

function isFilterOption(value: string | undefined): value is FilterOption {
  return !!value && (filterOptions as readonly string[]).includes(value);
}

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const { filter } = await searchParams;
  const initialFilter: FilterOption = isFilterOption(filter) ? filter : "All types";

  return <ExploreView initialFilter={initialFilter} />;
}

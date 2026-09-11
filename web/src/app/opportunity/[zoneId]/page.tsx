import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetailView } from "@/components/detail/DetailView";
import { getZone, zones } from "@/lib/zones";

export function generateStaticParams() {
  return zones.map((z) => ({ zoneId: z.id }));
}

export async function generateMetadata(
  props: PageProps<"/opportunity/[zoneId]">,
): Promise<Metadata> {
  const { zoneId } = await props.params;
  const zone = getZone(zoneId);
  if (!zone) return {};
  return {
    title: `${zone.name} — Tanjung Agas | UnitiProperty`,
    description: zone.description,
  };
}

export default async function OpportunityPage(
  props: PageProps<"/opportunity/[zoneId]">,
) {
  const { zoneId } = await props.params;
  const zone = getZone(zoneId);
  if (!zone) notFound();

  return <DetailView zone={zone} />;
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ParcelDetailView } from "@/components/detail/ParcelDetailView";
import { getParcel, PARCELS } from "@/lib/parcels";

export function generateStaticParams() {
  return PARCELS.map((p) => ({ parcelId: p.id }));
}

export async function generateMetadata(
  props: PageProps<"/explore/[parcelId]">,
): Promise<Metadata> {
  const { parcelId } = await props.params;
  const parcel = getParcel(parcelId);
  if (!parcel) return {};
  return {
    title: `${parcel.name} — Tanjung Agas | UnitiProperty`,
    description: parcel.desc.EN,
  };
}

export default async function ParcelPage(props: PageProps<"/explore/[parcelId]">) {
  const { parcelId } = await props.params;
  const parcel = getParcel(parcelId);
  if (!parcel) notFound();

  return <ParcelDetailView parcel={parcel} />;
}

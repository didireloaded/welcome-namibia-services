import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePage } from "@/components/marketing/service-page";
const slugs = ["visa-permits", "transfers", "medical", "vacations", "esim"] as const;
export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!slugs.includes(slug as (typeof slugs)[number]))
    return { title: "Service not found | Arrival Namibia" };
  const labels: Record<(typeof slugs)[number], string> = {
    "visa-permits": "Visa & permits",
    transfers: "Airport transfers",
    medical: "Medical visit coordination",
    vacations: "Stays & vacations",
    esim: "eSIM & connectivity",
  };
  return {
    title: `${labels[slug as (typeof slugs)[number]]} | Arrival Namibia`,
    description: `Learn about ${labels[slug as (typeof slugs)[number]].toLowerCase()} support in Namibia.`,
  };
}
export default async function ServiceRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!slugs.includes(slug as (typeof slugs)[number])) notFound();
  return <ServicePage slug={slug as (typeof slugs)[number]} />;
}

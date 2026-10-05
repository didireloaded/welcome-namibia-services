import type { Metadata } from "next";
import { ServiceOverview } from "@/components/marketing/service-page";
export const metadata: Metadata = {
  title: "Services | Arrival Namibia",
  description:
    "Explore visa, arrival, medical visit and stay coordination enquiries in Namibia.",
};
export default function ServicesPage() {
  return <ServiceOverview />;
}

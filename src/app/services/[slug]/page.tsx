import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePage } from "@/components/marketing/service-page";
import { serviceCatalog, serviceAliases, findService } from "@/lib/service-catalog";
export function generateStaticParams() { return [...serviceCatalog.map(item=>({slug:item.slug})),...Object.keys(serviceAliases).map(slug=>({slug}))]; }
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const item=findService((await params).slug);return {title:`${item?.title || "Service not found"} | Welcome Namibia Services`,description:item?.intro};}
export default async function ServiceRoute({params}:{params:Promise<{slug:string}>}){const {slug}=await params;if(!findService(slug))notFound();return <ServicePage slug={slug}/>;}

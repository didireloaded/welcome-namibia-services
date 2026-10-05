import { notFound } from "next/navigation";
import { regions, findRegion } from "@/lib/destinations";
import { RegionPage } from "@/components/marketing/region-guide";
export function generateStaticParams(){return regions.map(region=>({region:region.slug}))}
export async function generateMetadata({params}:{params:Promise<{region:string}>}){const region=findRegion((await params).region);return{title:`${region?.name || "Region"} | Welcome Namibia Services`,description:region?.intro}}
export default async function Page({params}:{params:Promise<{region:string}>}){const region=findRegion((await params).region);if(!region)notFound();return <RegionPage region={region}/>}

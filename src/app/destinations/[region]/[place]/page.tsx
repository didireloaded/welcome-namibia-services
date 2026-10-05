import { notFound } from "next/navigation";
import { regions, findRegion } from "@/lib/destinations";
import { PlacePage } from "@/components/marketing/region-guide";
export function generateStaticParams(){return regions.flatMap(region=>region.places.map(place=>({region:region.slug,place:place.slug})))}
export async function generateMetadata({params}:{params:Promise<{region:string;place:string}>}){const p=await params;const place=findRegion(p.region)?.places.find(item=>item.slug===p.place);return{title:`${place?.name || "Place"} | Welcome Namibia Services`,description:place?.description}}
export default async function Page({params}:{params:Promise<{region:string;place:string}>}){const p=await params;const region=findRegion(p.region);const place=region?.places.find(item=>item.slug===p.place);if(!region||!place)notFound();return <PlacePage region={region} place={place}/>}

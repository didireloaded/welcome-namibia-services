import { DiscoveryDetail } from "@/website/pages";
export default async function Page({params}:{params:Promise<{slug:string}>}){return <DiscoveryDetail slug={(await params).slug}/>}

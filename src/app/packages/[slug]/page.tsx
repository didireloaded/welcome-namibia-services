import { notFound } from "next/navigation";
import { packages } from "@/lib/packages";
import { PackageDetail } from "@/components/marketing/package-pages";
export function generateStaticParams(){return packages.map(item=>({slug:item.slug}))}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;if(!packages.some(item=>item.slug===slug))notFound();return <PackageDetail slug={slug}/>}

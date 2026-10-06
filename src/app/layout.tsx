import type { Metadata } from "next";
import { Suspense } from "react";
import { Layout } from "@/website/components/Layout";
import "./globals.css";
import "./glass.css";
export const metadata: Metadata = {title:"Welcome Namibia Services · Your journey, coordinated",description:"Visa and permit support, airport transfers, medical travel, accommodation and journeys across Namibia.",robots:{index:false,follow:false}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><Suspense fallback={<div>Loading your journey…</div>}><Layout>{children}</Layout></Suspense></body></html>}

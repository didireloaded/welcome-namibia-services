import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { PageFrame, EnquiryButton } from "./page-frame";
import { serviceCatalog, findService } from "@/lib/service-catalog";

export function ServiceOverview() {
  return <PageFrame><section className="content-hero"><span>OUR SERVICES</span><h1>Support for every part of your arrival.</h1><p>Choose a service to see what we handle, what you need to prepare and what is outside the scope.</p></section>
    {[...new Set(serviceCatalog.map(item=>item.group))].map(group=><section className="catalog-group" key={group}><h2>{group}</h2><div className="catalog-grid">{serviceCatalog.filter(item=>item.group===group).map(item=><Link className="catalog-item" key={item.slug} href={`/services/${item.slug}`}><div className="catalog-image"><Image src={`/images/${item.image}.jpg`} alt="" fill sizes="(max-width: 600px) 100vw, 30vw" /></div><h3>{item.title}<ArrowUpRight size={18}/></h3><p>{item.intro}</p><span>Service details →</span></Link>)}</div></section>)}
  </PageFrame>;
}
export function ServicePage({ slug }: { slug: string }) {
  const item=findService(slug)!;
  return <PageFrame service={item.form}><Link className="back-link" href="/services">← All services</Link><section className="service-detail-hero"><div className="service-detail-copy"><span>{item.group}</span><h1>{item.title}</h1><p>{item.intro}</p><EnquiryButton>Enquire about {item.title.toLowerCase()}</EnquiryButton></div><div className="service-detail-image"><Image src={`/images/${item.image}.jpg`} alt="" fill sizes="(max-width: 700px) 100vw, 40vw" /></div></section>
    <div className="detail-columns">{[["What we handle",item.includes],["What you provide",item.needs],["What is not included",item.excludes]].map(([title,points])=><section key={title as string}><h2>{title}</h2><ul>{(points as string[]).map(point=><li key={point}>{point}</li>)}</ul></section>)}</div>
    <section className="detail-section"><h2>How this service works</h2><ol className="process-list">{["Share your purpose, dates and requirements.","We review the details and identify missing information.","Receive the proposed scope, agency fee and separate third-party costs.","Confirm the arrangements, then follow the agreed next steps."].map(step=><li key={step}>{step}</li>)}</ol></section>
    <section className="detail-section"><h2>Fees, timing and responsibility</h2><p>Agency fees are quoted for the agreed scope. Government fees, accommodation, transport, tickets and provider charges are separate unless expressly included. Timelines depend on document readiness, authority processes and supplier availability. Visa decisions remain with the relevant authorities; medical decisions remain with qualified practitioners.</p></section>
    <section className="detail-section"><h2>Before you enquire</h2><details><summary>Does an enquiry confirm a booking or approval?</summary><p>No. A booking requires written supplier confirmation and acceptance of the quoted terms. Official decisions are made by the relevant authority.</p></details><details><summary>Can this be combined with other services?</summary><p>Yes. Add transfer, stay or orientation requirements to your enquiry so they can be included in one proposed arrival plan.</p></details><EnquiryButton>Discuss this service</EnquiryButton></section>
  </PageFrame>;
}

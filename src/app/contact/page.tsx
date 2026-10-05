import type { Metadata } from "next";
import { ArrowUpRight, MapPin, MessageCircle } from "lucide-react";
import { PageFrame, EnquiryButton } from "@/components/marketing/page-frame";
import { SectionHeading } from "@/components/ui/section-heading";
export const metadata: Metadata = {
  title: "Contact | Arrival Namibia",
  description: "Ask about travel, paperwork and arrival support in Namibia.",
};
export default function ContactPage() {
  return (
    <PageFrame>
      <section className="content-hero">
        <span>LET’S TALK THROUGH THE DETAILS</span>
        <h1>Start with what you need.</h1>
        <p>
          Tell us what you are planning. We can review the details and explain
          the next step.
        </p>
        <EnquiryButton>Send an enquiry</EnquiryButton>
      </section>
      <section className="contact-page-grid">
        <div className="contact-page-card">
          <MapPin />
          <SectionHeading
            eyebrow="IN NAMIBIA"
            title="A local point of contact."
          />
          <p>
            Contact details will be added when the business confirms its public
            phone, email and address.
          </p>
        </div>
        <div className="contact-page-card">
          <MessageCircle />
          <SectionHeading
            eyebrow="YOUR ENQUIRY"
            title="A clear place to begin."
          />
          <p>
            Choose the service you need and share a few practical details. A
            request here is an enquiry, not an application submitted to an
            authority.
          </p>
          <EnquiryButton>
            Choose a service <ArrowUpRight size={15} />
          </EnquiryButton>
        </div>
      </section>
    </PageFrame>
  );
}

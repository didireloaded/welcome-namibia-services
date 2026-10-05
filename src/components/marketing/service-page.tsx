import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { PageFrame, EnquiryButton } from "./page-frame";
import { SectionHeading } from "@/components/ui/section-heading";

const services = {
  "visa-permits": {
    label: "Visa & permits",
    image: "study",
    eyebrow: "PAPERWORK, WITH A CLEARER PLAN",
    title: "A clearer start to your time in Namibia.",
    intro:
      "Get help preparing and coordinating the practical steps around your visa or permit enquiry.",
    points: [
      "Understand the likely preparation steps",
      "Receive a checklist to confirm for your circumstances",
      "Keep agency support separate from official decisions",
    ],
    next: "Start with your nationality, reason for travel and intended dates. A consultant can confirm whether the agency can assist and provide a scope and fee.",
  },
  transfers: {
    label: "Airport transfers",
    image: "flight",
    eyebrow: "A THOUGHTFUL ARRIVAL",
    title: "Know what happens after you land.",
    intro:
      "Share your arrival details and destination so a transfer enquiry can be reviewed and arranged.",
    points: [
      "Tell us your flight and pickup details",
      "Choose a vehicle category to discuss",
      "Receive confirmation details once arranged",
    ],
    next: "Provide your flight number, arrival time, passenger count and destination. Availability and price are confirmed before booking.",
  },
  medical: {
    label: "Medical visit coordination",
    image: "care",
    eyebrow: "PRACTICAL SUPPORT AROUND YOUR VISIT",
    title: "Bring the travel details together.",
    intro:
      "Ask about help coordinating accommodation, transport and paperwork around a planned medical visit.",
    points: [
      "Share practical travel needs",
      "Tell us about a preferred provider or appointment",
      "Discuss companion, stay and transfer arrangements",
    ],
    next: "An enquiry is for travel coordination. Clinical assessment and treatment are handled by qualified providers. Do not submit medical records through this form. Share them only through a confirmed secure channel.",
  },
  vacations: {
    label: "Stays & vacations",
    image: "coast",
    eyebrow: "MAKE SPACE FOR THE JOURNEY",
    title: "Shape a stay around your plans.",
    intro:
      "Tell us where you hope to go, when you plan to travel and what kind of stay you need.",
    points: [
      "Explore a tailored stay or itinerary enquiry",
      "Share dates, guest numbers and preferences",
      "Review options and charges before confirming",
    ],
    next: "Availability, supplier terms and prices are confirmed as part of the quote. An enquiry does not reserve accommodation.",
  },
  esim: {
    label: "eSIM & connectivity",
    image: "flight",
    eyebrow: "STAY CONNECTED ON ARRIVAL",
    title: "Ask about connectivity for your trip.",
    intro: "Travel eSIMs can provide mobile data without changing a physical SIM. Plan availability depends on provider coverage and the exact device.",
    points: ["Check device compatibility before purchase", "Confirm coverage, data allowance and validity", "Review setup guidance and support terms"],
    next: "The agency's eSIM provider, plan prices, coverage and support terms have not been confirmed. Ask what is available for your dates and destination before paying.",
  },
} as const;
export function ServiceOverview() {
  return (
    <PageFrame>
      <section className="content-hero">
        <span>ARRIVAL SUPPORT IN NAMIBIA</span>
        <h1>Practical help for the journey ahead.</h1>
        <p>
          Start with the part you need. We can discuss how your paperwork,
          arrival and stay fit together.
        </p>
        <EnquiryButton>Talk through your plans</EnquiryButton>
      </section>
      <SectionHeading
        eyebrow="SERVICES"
        title="A little more clarity at every step."
      >
        Explore the service that fits your visit, then send an enquiry to
        discuss what can be arranged.
      </SectionHeading>
      <div className="service-page-grid">
        {Object.entries(services).map(([slug, item]) => (
          <Link
            className="service-page-card"
            key={slug}
            href={`/services/${slug}`}
          >
            <div className="service-page-photo">
              <Image
                src={`/images/${item.image}.jpg`}
                alt=""
                fill
                sizes="(max-width: 700px) 90vw, 44vw"
              />
            </div>
            <div>
              <span>{item.eyebrow}</span>
              <h2>{item.label}</h2>
              <p>{item.intro}</p>
              <b>
                Explore service <ArrowRight size={16} />
              </b>
            </div>
          </Link>
        ))}
      </div>
      <aside className="service-note">
        <b>One coordinated journey</b>
        <p>
          When more than one service is involved, we can discuss how the
          practical details fit together.
        </p>
        <Link href="/contact">
          Talk through your plans <ArrowUpRight size={16} />
        </Link>
      </aside>
    </PageFrame>
  );
}
export function ServicePage({ slug }: { slug: keyof typeof services }) {
  const item = services[slug];
  return (
    <PageFrame
      service={
        slug === "transfers"
          ? "transfers"
          : slug === "medical"
            ? "medical"
          : slug === "vacations"
              ? "vacations"
              : slug === "esim"
                ? "esim"
              : "visa"
      }
    >
      <section className="service-detail-hero">
        <div className="service-detail-copy">
          <span>{item.eyebrow}</span>
          <h1>{item.title}</h1>
          <p>{item.intro}</p>
          <EnquiryButton />
        </div>
        <div className="service-detail-image">
          <Image
            src={`/images/${item.image}.jpg`}
            alt={`${item.label} in Namibia`}
            fill
            priority
            sizes="(max-width: 700px) 90vw, 45vw"
          />
        </div>
      </section>
      <section className="service-detail-body">
        <SectionHeading
          eyebrow="HOW WE CAN HELP"
          title="A practical next step."
        >
          {item.intro}
        </SectionHeading>
        <div className="service-point-list">
          {item.points.map((point) => (
            <p key={point}>
              <Check size={17} />
              {point}
            </p>
          ))}
        </div>
      </section>
      <aside className="service-note">
        <b>What happens next</b>
        <p>{item.next}</p>
        <EnquiryButton />
      </aside>
      <div className="service-backlinks">
        <Link href="/services">All services</Link>
        <Link href="/contact">Contact the agency</Link>
      </div>
    </PageFrame>
  );
}

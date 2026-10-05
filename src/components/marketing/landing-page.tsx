"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import * as Tabs from "@/components/ui/tabs";
import * as Dialog from "@/components/ui/dialog";
import { Accordion } from "@/components/ui/accordion";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  Plus,
  Minus,
  Plane,
  MessageCircle,
  Menu,
  X,
  MapPin,
  ShieldCheck,
  FileCheck2,
  ChevronRight,
  Sparkle,
  Compass,
  Copy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { RequestDialog, type ServiceKey } from "./request-dialog";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";

type ServiceCard = {
  title: string;
  description: string;
  image: string;
  label: string;
};
const serviceGroups: Record<
  ServiceKey,
  { label: string; cards: ServiceCard[] }
> = {
  visa: {
    label: "Visa & Permits",
    cards: [
      {
        title: "Work permit support",
        description: "Prepare for your next chapter in Namibia.",
        image: "travel",
        label: "Work & business",
      },
      {
        title: "Study permit support",
        description: "A clearer start to your student journey.",
        image: "study",
        label: "Study & settle",
      },
      {
        title: "Visitor visa assistance",
        description: "Help with the practical steps before you arrive.",
        image: "flight",
        label: "Visit Namibia",
      },
      {
        title: "Permit renewals",
        description: "Plan ahead for the next stage of your stay.",
        image: "namibia",
        label: "Stay prepared",
      },
      {
        title: "Family travel support",
        description: "Coordinate paperwork and arrival plans together.",
        image: "stay",
        label: "Travel together",
      },
    ],
  },
  transfers: {
    label: "Airport Transfers",
    cards: [
      {
        title: "Private airport transfer",
        description: "An organised ride from arrivals to your stay.",
        image: "flight",
        label: "Airport to your door",
      },
      {
        title: "VIP arrival",
        description: "A personal pick-up with the details arranged.",
        image: "stay",
        label: "A thoughtful arrival",
      },
      {
        title: "Family & group transfers",
        description: "Keep everyone on the same travel plan.",
        image: "study",
        label: "Arrive together",
      },
      {
        title: "Appointment transfers",
        description: "Transport enquiries around planned visits.",
        image: "care",
        label: "Practical support",
      },
    ],
  },
  medical: {
    label: "Medical Assistance",
    cards: [
      {
        title: "Medical visit coordination",
        description: "Help with the travel side of your appointment.",
        image: "care",
        label: "Careful coordination",
      },
      {
        title: "Patient & companion stays",
        description: "Accommodation enquiries around your visit.",
        image: "stay",
        label: "Stay close",
      },
      {
        title: "Travel paperwork support",
        description: "Prepare the practical details before departure.",
        image: "travel",
        label: "Before you travel",
      },
      {
        title: "Appointment transfers",
        description: "Coordinate pick-ups between your stay and provider.",
        image: "flight",
        label: "On the ground",
      },
    ],
  },
  vacations: {
    label: "Vacations",
    cards: [
      {
        title: "Explore Namibia",
        description: "Room to slow down. Space to discover.",
        image: "namibia",
        label: "A different pace",
      },
      {
        title: "Coastal escapes",
        description: "Build a stay around the coastline.",
        image: "coast",
        label: "Along the coast",
      },
      {
        title: "Hotel reservations",
        description: "Find a stay that fits your plans and budget.",
        image: "stay",
        label: "Your home away",
      },
      {
        title: "Personalised journeys",
        description: "A trip shaped around the way you travel.",
        image: "travel",
        label: "Make it yours",
      },
    ],
  },
  esim: {
    label: "eSIM & Connectivity",
    cards: [
      { title: "Travel eSIM enquiry", description: "Ask about a digital data plan for your visit.", image: "flight", label: "Stay connected" },
      { title: "Device compatibility", description: "Confirm your exact phone model before purchase.", image: "study", label: "Check before you buy" },
      { title: "Coverage & data", description: "Ask what destinations, data and validity are available.", image: "namibia", label: "Details to confirm" },
    ],
  },
};
const slides = [
  {
    tag: "Your journey starts before you land",
    top: "Come for the opportunity.",
    bottom: "Arrive with a plan.",
    image: "namibia",
    label: "Welcome to Namibia",
    service: "visa" as ServiceKey,
  },
  {
    tag: "Your first ride, thoughtfully arranged",
    top: "Land. Breathe.",
    bottom: "We’ll plan the next step.",
    image: "flight",
    label: "Airport & arrival",
    service: "transfers" as ServiceKey,
  },
  {
    tag: "A place to stay. A little peace of mind.",
    top: "Make room for",
    bottom: "a memorable stay.",
    image: "stay",
    label: "Stays & reservations",
    service: "vacations" as ServiceKey,
  },
  {
    tag: "Practical help around your medical visit",
    top: "Travel for care.",
    bottom: "With the details in hand.",
    image: "care",
    label: "Medical travel support",
    service: "medical" as ServiceKey,
  },
];
const packages = [
  {
    name: "Basic\nAssistance",
    copy: "For travellers who need help understanding and preparing the paperwork.",
    features: [
      "Initial consultation",
      "Document preparation guidance",
      "Application review",
    ],
    light: false,
  },
  {
    name: "Complete\nArrival",
    copy: "Bring the paperwork, pick-up and first stay together in one arrival plan.",
    features: [
      "Application coordination",
      "Airport transfer arrangements",
      "Accommodation enquiries",
    ],
    light: true,
  },
  {
    name: "Personal\nConcierge",
    copy: "A tailored scope for visits with more moving parts and practical requirements.",
    features: [
      "Personal arrival plan",
      "Medical visit logistics if required",
      "Agreed consultant support",
    ],
    light: false,
  },
];
const faqQuestions = [
  "What support can you provide?",
  "How do I start my request?",
  "What documents will I need?",
  "How much does the service cost?",
  "What is included in your quote?",
  "How long will the process take?",
  "Can I start while outside Namibia?",
  "How will I receive updates?",
  "Can I change or cancel my request?",
  "Who makes the final decision?",
];
const faqAnswers: Record<ServiceKey, string[]> = {
  visa: [
    "Application preparation and coordination based on an agreed scope. The agency does not issue visas or permits.",
    "Start with an enquiry. A consultant can review your purpose, nationality and timing.",
    "The checklist depends on the application category and your circumstances. It must be confirmed against current official requirements.",
    "A service quote follows a review of your needs. No fixed fee has been supplied yet.",
    "Agency service fees, official fees and any third-party charges should be listed separately.",
    "Official processing times vary. A consultant can explain current guidance without guaranteeing a completion date.",
    "Yes, an initial enquiry can be made before you travel. Submission arrangements depend on the application route.",
    "The planned client portal will show milestones and consultant notes, supported by agreed communication channels.",
    "Changes and cancellations depend on the scope and whether work or third-party bookings have already begun.",
    "The relevant government authority decides applications. Approval and entry cannot be guaranteed.",
  ],
  transfers: [
    "Airport and other transfer arrangements with the provider and vehicle class confirmed in advance.",
    "Share your flight, arrival time, passenger count and destination.",
    "A flight number, contact details and destination are generally useful for planning. Do not upload a passport for a transfer enquiry.",
    "The quote depends on the route, passengers, vehicle and pick-up timing.",
    "Confirm the route, vehicle class, waiting policy and any extra stops before booking.",
    "The provider confirms pick-up timing once the flight and booking details are checked.",
    "Yes. Share your arrival details before departure so a pick-up can be arranged.",
    "Confirmed pick-up information and provider details will appear in the planned client portal.",
    "Check the provider’s cancellation and waiting policy in your quote.",
    "The transport provider confirms availability. A submitted enquiry is not a confirmed reservation.",
  ],
  medical: [
    "Practical travel coordination around a medical visit. Diagnosis and treatment are handled by qualified providers.",
    "Begin with your preferred dates and logistical needs. Clinical information should go only through an agreed secure channel.",
    "The provider and relevant authority must confirm any required appointment letters or travel paperwork.",
    "Travel coordination and clinical treatment are quoted separately by the responsible parties.",
    "Your quote should specify who supplies the stay, transfer and any appointment coordination.",
    "Appointment and travel timing depend on the provider and any entry requirements.",
    "Initial planning can begin remotely, subject to the provider’s process.",
    "An agreed consultant can update you on the arrangements they are responsible for.",
    "Provider policies apply to appointments and bookings. Discuss changes before making them.",
    "Qualified medical providers decide treatment and suitability. Immigration authorities decide entry applications.",
  ],
  vacations: [
    "Accommodation and travel arrangement enquiries based on your preferred dates and budget.",
    "Share the destination, dates, group size and the kind of trip you want.",
    "Booking details and relevant travel documents can be confirmed after the initial enquiry.",
    "A quote follows availability checks with the relevant providers.",
    "The itinerary should identify inclusions, exclusions, deposits and cancellation conditions.",
    "Booking confirmation depends on supplier availability and payment terms.",
    "Yes. A trip can be planned before you arrive in Namibia.",
    "Your proposed itinerary and confirmed arrangements will be available through agreed communication channels.",
    "The booking conditions of the accommodation and activity suppliers apply.",
    "Each supplier confirms its availability. An enquiry does not reserve a room or activity.",
  ],
  esim: [
    "Connectivity options depend on a provider and compatible device; availability has not yet been confirmed for this agency.",
    "Submit an enquiry with your destination, dates and phone model for follow-up.",
    "The exact device model must be checked with the provider before any purchase.",
    "No plan or price has been confirmed. Ask for the full plan price before buying.",
    "Confirm network coverage, data allowance, validity, activation and support terms.",
    "Provider plan validity and activation conditions should be confirmed before purchase.",
    "You can enquire before travel; installation and activation depend on the provider.",
    "Update channels depend on the agency's confirmed communication setup.",
    "Provider terms apply to plan changes and refunds.",
    "The eSIM provider confirms compatibility and coverage for your device and destination.",
  ],
};
const articles = [
  {
    title: "Planning your first arrival in Namibia",
    category: "Before you travel",
    image: "namibia",
    body: "Start with the purpose of your visit, your intended dates and where you will stay. Check the current official entry guidance before booking. An agency can help coordinate your preparations, but visa and entry decisions remain with the responsible authority.",
  },
  {
    title: "What to share before an airport pick-up",
    category: "Arrival notes",
    image: "flight",
    body: "Share your flight number, arrival date, passenger count, luggage needs and exact destination. Ask the provider how they handle delays, waiting time and additional stops. Keep your confirmed pick-up contact handy when you land.",
  },
  {
    title: "A stay that works around a medical visit",
    category: "Practical planning",
    image: "stay",
    body: "Discuss appointment timing with your medical provider. Consider the distance between your stay and the appointment, accessibility and whether a companion will travel with you. A travel coordinator can organise logistics while clinical decisions remain with your provider.",
  },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="section-label">
      <Sparkle size={14} fill="currentColor" />
      {children}
    </span>
  );
}
function RoundArrow({
  onClick,
  label,
  direction = "right",
}: {
  onClick: () => void;
  label: string;
  direction?: "left" | "right";
}) {
  return (
    <button className="round-arrow" onClick={onClick} aria-label={label}>
      {direction === "left" ? (
        <ArrowLeft size={19} />
      ) : (
        <ArrowRight size={19} />
      )}
    </button>
  );
}

export function LandingPage() {
  const [slide, setSlide] = useState(0);
  const [service, setService] = useState<ServiceKey>("visa");
  const [activeCard, setActiveCard] = useState(1);
  const [request, setRequest] = useState<{
    service: ServiceKey;
    package?: string;
  } | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [article, setArticle] = useState<(typeof articles)[number] | null>(
    null,
  );
  const [contact, setContact] = useState(false);
  const [contactSummary, setContactSummary] = useState("");
  const cardsRef = useRef<HTMLDivElement>(null);
  const current = slides[slide];
  const cards = serviceGroups[service].cards;
  const moveCard = (delta: number) => {
    const next = (activeCard + delta + cards.length) % cards.length;
    setActiveCard(next);
    cardsRef.current?.children[next]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };
  return (
    <>
      <main className="site-shell">
        <section className="hero-panel" id="home">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.image}
              className="hero-image"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <Image
                src={`/images/${current.image}.jpg`}
                alt={
                  current.image === "namibia"
                    ? "Sunset over Dune 45 in Namibia"
                    : "Travel and arrival inspiration"
                }
                fill
                priority
                sizes="100vw"
              />
            </motion.div>
          </AnimatePresence>
          <div className="hero-shade" />
          <SiteHeader overlay onStart={() => setRequest({ service: "visa" })} />
          <div className="hero-title">
            <span className="glass-tag">{current.tag}</span>
            <h1>
              {current.top}
              <br />
              <em>{current.bottom}</em>
            </h1>
          </div>
          <div className="hero-bottom">
            <div className="hero-intro">
              <span className="mini-eyebrow">NAMIBIA, AT YOUR OWN PACE</span>
              <h2>{current.label}</h2>
              <div className="arrival-chips">
                <span>
                  <Plane size={13} /> Arrival
                </span>
                <span>
                  <MapPin size={13} /> Stay
                </span>
                <span>
                  <FileCheck2 size={13} /> Paperwork
                </span>
              </div>
              <p>
                Visas, transfers, medical visit logistics and stays. Bring the
                practical parts of your visit together.
              </p>
              <div className="hero-ctas">
                <Button
                  onClick={() => setRequest({ service: current.service })}
                >
                  Start application <ArrowUpRight size={15} />
                </Button>
                <button
                  className="consult-button"
                  onClick={() => setContact(true)}
                >
                  Book a consultation <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
            <div className="hero-filmstrip">
              {slides.map((s, index) => (
                <button
                  key={s.label}
                  onClick={() => setSlide(index)}
                  className={`hero-thumb ${slide === index ? "selected" : ""}`}
                  aria-label={`Show ${s.label}`}
                  aria-pressed={slide === index}
                >
                  <Image
                    src={`/images/${s.image}.jpg`}
                    alt=""
                    fill
                    sizes="220px"
                  />
                  <div>
                    <span>{s.label}</span>
                    {slide === index && <small>{s.tag}</small>}
                  </div>
                  <ArrowUpRight className="thumb-arrow" size={16} />
                </button>
              ))}
            </div>
          </div>
          <div className="hero-progress">
            <button
              onClick={() => setSlide((slide + 1) % slides.length)}
              aria-label="Next hero slide"
            >
              <b>{String(slide + 1).padStart(2, "0")}</b>
              <span> / {String(slides.length).padStart(2, "0")}</span>
            </button>
            <div className="progress-line">
              <span
                style={{ width: `${((slide + 1) / slides.length) * 100}%` }}
              />
            </div>
          </div>
        </section>

        <section className="white-panel services-panel" id="services">
          <div className="center-heading">
            <SectionLabel>Our services</SectionLabel>
            <h2>
              Every part of your visit.
              <br />
              <span>A little more connected.</span>
            </h2>
          </div>
          <Tabs.Root
            value={service}
            onValueChange={(value) => {
              setService(value as ServiceKey);
              setActiveCard(1);
              setOpenFaq(0);
            }}
          >
            <Tabs.List className="service-tabs" aria-label="Travel services">
              {(Object.keys(serviceGroups) as ServiceKey[]).map((key) => (
                <Tabs.Trigger className="service-tab" value={key} key={key}>
                  {serviceGroups[key].label}
                </Tabs.Trigger>
              ))}
            </Tabs.List>
            <Tabs.Content value={service} className="services-content">
              <div className="service-carousel" ref={cardsRef}>
                {cards.map((card, index) => (
                  <article
                    className={`service-card ${activeCard === index ? "featured" : ""}`}
                    key={card.title}
                  >
                    <button
                      className="card-select"
                      aria-label={`Select ${card.title}`}
                      onClick={() => setActiveCard(index)}
                    >
                      <div className="service-card-image">
                        <Image
                          src={`/images/${card.image}.jpg`}
                          alt={card.title}
                          fill
                          sizes="(max-width: 650px) 70vw, 300px"
                        />
                        <span>{card.label}</span>
                      </div>
                    </button>
                    <div className="service-card-text">
                      <div>
                        <h3>{card.title}</h3>
                        <p>{card.description}</p>
                      </div>
                      <button
                        aria-label={`Enquire about ${card.title}`}
                        onClick={() => setRequest({ service })}
                      >
                        <ArrowUpRight size={17} />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
              <div className="carousel-controls">
                <RoundArrow
                  direction="left"
                  label="Previous service"
                  onClick={() => moveCard(-1)}
                />
                <div className="carousel-track">
                  <span
                    style={{
                      width: `${100 / cards.length}%`,
                      left: `${(activeCard / cards.length) * 100}%`,
                    }}
                  />
                </div>
                <RoundArrow label="Next service" onClick={() => moveCard(1)} />
              </div>
            </Tabs.Content>
          </Tabs.Root>
        </section>

        <section className="white-panel journey-panel" id="journey">
          <div className="split-heading">
            <h2>
              A visit with many details.
              <br />
              <span>One place to bring them together.</span>
            </h2>
            <p>
              From the application conversation to your first night in Namibia,
              shape the practical parts around why you are coming.
            </p>
          </div>
          <div className="journey-grid">
            <div className="journey-editorial">
              <span className="mini-eyebrow dark">YOUR ARRIVAL PLAN</span>
              <h3>
                More clarity.
                <br />
                Before departure.
              </h3>
              <p>
                Know what is being arranged, what you still need to provide, and
                who is handling the next step.
              </p>
              <div className="journey-person">
                <div className="person-icon">
                  <Compass size={25} />
                </div>
                <div>
                  <b>Built around your visit</b>
                  <span>Work · Study · Care · Holiday</span>
                </div>
              </div>
              <div className="journey-tags">
                <span>Paperwork support</span>
                <span>Airport pick-up</span>
                <span>Stay planning</span>
                <span>Visit coordination</span>
              </div>
              <p className="proof-note">
                Client reviews and verified registrations will be added when
                supplied by the business.
              </p>
            </div>
            <div className="journey-photo">
              <Image
                src="/images/namibia.jpg"
                alt="Sunset at Dune 45, Namibia"
                fill
                sizes="600px"
              />
              <div className="photo-caption">
                <span>
                  Namibia
                  <br />
                  <b>A new perspective.</b>
                </span>
                <button
                  className="glass-circle"
                  onClick={() => setRequest({ service: "vacations" })}
                  aria-label="Plan a visit to Namibia"
                >
                  <ArrowUpRight size={20} />
                </button>
              </div>
            </div>
            <div className="journey-side">
              <div className="small-photo">
                <Image
                  src="/images/stay.jpg"
                  alt="Accommodation inspiration"
                  fill
                  sizes="300px"
                />
                <button
                  className="photo-plus"
                  aria-label="Explore stay planning"
                  onClick={() => setRequest({ service: "vacations" })}
                >
                  <Plus size={20} />
                </button>
              </div>
              <h3>Make yourself at home.</h3>
              <p>
                Accommodation enquiries matched to your dates, budget and reason
                for visiting.
              </p>
              <Button
                className="outline-button"
                onClick={() => setRequest({ service: "vacations" })}
              >
                Explore your stay <ArrowUpRight size={16} />
              </Button>
            </div>
          </div>
        </section>

        <section className="packages-panel" id="packages">
          <div className="center-heading">
            <SectionLabel>Service packages</SectionLabel>
            <h2>
              Choose the support
              <br />
              that fits your journey.
            </h2>
            <p>
              Service scope is quoted after consultation.
              <br />
              Government and supplier charges are listed separately.
            </p>
          </div>
          <div className="package-grid">
            {packages.map((pkg, index) => (
              <button
                className={`package-tile ${pkg.light ? "light" : ""}`}
                key={pkg.name}
                onClick={() =>
                  setRequest({
                    service: "visa",
                    package: pkg.name.replace("\n", " "),
                  })
                }
              >
                <div className="package-top">
                  <span>0{index + 1}</span>
                  <b>
                    Tailored quote<small>Agency service fee</small>
                  </b>
                  <p>{pkg.copy}</p>
                </div>
                <div className="package-shape">
                  <div className="package-name">
                    {pkg.name.split("\n").map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </div>
                  <ul>
                    {pkg.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </div>
                <div className="package-arrow">
                  <ArrowRight size={25} />
                  <span>Enquire</span>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="white-panel booking-panel" id="how-it-works">
          <div className="trust-strip">
            <span>
              <ShieldCheck size={19} />
              Clear service scope
            </span>
            <span>
              <FileCheck2 size={19} />
              Document review
            </span>
            <span>
              <Plane size={19} />
              Arrival planning
            </span>
            <span>
              <MapPin size={19} />
              Local coordination
            </span>
          </div>
          <h2 className="booking-title">How to plan your arrival</h2>
          <div className="marquee" aria-hidden="true">
            Paperwork <Sparkle /> Transfers <Sparkle /> Accommodation{" "}
            <Sparkle /> Medical visits <Sparkle /> Holidays <Sparkle />{" "}
            Paperwork
          </div>
          <div className="booking-grid">
            <div className="booking-intro">
              <h3>4 thoughtful steps</h3>
              <p>
                A clear starting point, a defined scope and an arrival plan you
                can understand.
              </p>
              <Button
                className="outline-button"
                onClick={() => setRequest({ service: "visa" })}
              >
                Begin your request <ArrowUpRight size={16} />
              </Button>
            </div>
            <div className="booking-steps">
              {[
                {
                  title: "Submit your request",
                  body: "Tell us why you are visiting and what support you need.",
                },
                {
                  title: "Prepare your documents",
                  body: "Receive a confirmed checklist and secure submission instructions.",
                },
                {
                  title: "Coordinate the details",
                  body: "Review progress, booking details and the next steps with your consultant.",
                },
                {
                  title: "Travel with a plan",
                  body: "Keep your confirmed arrangements and arrival contacts together.",
                },
              ].map((s, i) => (
                <article key={s.title}>
                  <span>0{i + 1}.</span>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="white-panel faq-panel" id="faq">
          <div>
            <SectionLabel>A few useful answers</SectionLabel>
            <h2>
              Before you
              <br />
              <span>make the journey.</span>
            </h2>
            <p>
              Choose a service above to view the questions for that part of your
              trip.
            </p>
            <span className="faq-service">
              {serviceGroups[service].label} <ArrowUpRight size={15} />
            </span>
            <Button className="outline-button" onClick={() => setContact(true)}>
              Ask us a question <ArrowUpRight size={16} />
            </Button>
          </div>
          <Accordion
            items={faqQuestions.map((title, i) => ({
              title,
              content: faqAnswers[service][i],
            }))}
            activeIndex={openFaq}
            onChange={setOpenFaq}
          />
        </section>

        <section className="white-panel notes-panel" id="notes">
          <div className="split-heading">
            <div>
              <SectionLabel>Travel notes</SectionLabel>
              <h2>
                A little preparation
                <br />
                <span>goes a long way.</span>
              </h2>
            </div>
            <p>
              Useful starting points for planning your visit.
              <br />
              Final requirements always need a current check.
            </p>
          </div>
          <div className="notes-grid">
            {articles.map((a) => (
              <button
                className="note-card"
                key={a.title}
                onClick={() => setArticle(a)}
              >
                <div className="note-image">
                  <Image
                    src={`/images/${a.image}.jpg`}
                    alt=""
                    fill
                    sizes="450px"
                  />
                  <span className="note-arrow">
                    <ArrowUpRight size={20} />
                  </span>
                </div>
                <span className="note-category">{a.category}</span>
                <h3>{a.title}</h3>
              </button>
            ))}
          </div>
        </section>

        <SiteFooter onConsult={() => setContact(true)} />
      </main>
      <button
        className="whatsapp"
        aria-label="Contact and WhatsApp options"
        onClick={() => setContact(true)}
      >
        <MessageCircle size={23} />
      </button>
      <RequestDialog request={request} onClose={() => setRequest(null)} />
      <Dialog.Root
        open={!!article}
        onOpenChange={(open) => {
          if (!open) setArticle(null);
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="dialog-overlay" />
          <Dialog.Content className="dialog-content article-dialog">
            <Dialog.Close className="dialog-close" aria-label="Close article">
              <X size={20} />
            </Dialog.Close>
            <div className="article-photo">
              {article && (
                <Image
                  src={`/images/${article.image}.jpg`}
                  alt=""
                  fill
                  sizes="700px"
                />
              )}
            </div>
            <span className="note-category">{article?.category}</span>
            <Dialog.Title>{article?.title}</Dialog.Title>
            <Dialog.Description>{article?.body}</Dialog.Description>
            <p className="helper-text">Travel notes and practical guides.</p>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      <Dialog.Root
        open={contact}
        onOpenChange={(open) => {
          setContact(open);
          if (!open) setContactSummary("");
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="dialog-overlay" />
          <Dialog.Content className="dialog-content contact-dialog">
            <Dialog.Close
              className="dialog-close"
              aria-label="Close contact form"
            >
              <X size={20} />
            </Dialog.Close>
            <SectionLabel>Let’s talk</SectionLabel>
            <Dialog.Title>Start with a conversation.</Dialog.Title>
            <Dialog.Description>
              Prepare a consultation enquiry. The business contact details will
              be connected when confirmed.
            </Dialog.Description>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                const d = new FormData(event.currentTarget);
                setContactSummary(
                  `Consultation enquiry\nName: ${d.get("name")}\nEmail: ${d.get("email")}\nMessage: ${d.get("message")}`,
                );
              }}
            >
              <div className="form-grid">
                <label>
                  Your name
                  <input name="name" required autoComplete="name" />
                </label>
                <label>
                  Email address
                  <input
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                  />
                </label>
              </div>
              <label>
                What would you like to discuss?
                <textarea name="message" required rows={4} />
              </label>
              <Button type="submit" className="dark-button">
                Prepare enquiry <ArrowRight size={17} />
              </Button>
            </form>
            {contactSummary && (
              <div className="summary-box">
                <pre>{contactSummary}</pre>
                <Button
                  className="outline-button"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(contactSummary);
                      setContactSummary(
                        contactSummary + "\nCopied to clipboard.",
                      );
                    } catch {}
                  }}
                >
                  <Copy size={15} />
                  Copy enquiry
                </Button>
              </div>
            )}
            <p className="helper-text">
              This message stays in this browser. It is not sent by email or WhatsApp.
            </p>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}

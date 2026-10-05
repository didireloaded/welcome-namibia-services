"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import * as Tabs from "@radix-ui/react-tabs";
import * as Dialog from "@radix-ui/react-dialog";
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
import { BrandLogo } from "@/components/ui/brand-logo";
import { RequestDialog, type ServiceKey } from "./request-dialog";

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
        image: "travel",
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
    price: "From N$2,400*",
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
    price: "From N$5,800*",
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
    price: "From N$9,500*",
  },
];
const regions = {
  Khomas: {
    intro: "Windhoek, city stays and practical first week support.",
    places: [
      "Windhoek Country Club Resort",
      "Olive Grove Guesthouse",
      "Joe's Beerhouse",
    ],
  },
  Erongo: {
    intro: "Swakopmund, Walvis Bay and the Atlantic coast.",
    places: ["The Delight Swakopmund", "Strand Hotel", "The Tug Restaurant"],
  },
  Kunene: {
    intro: "Desert landscapes, remote lodges and the Skeleton Coast.",
    places: [
      "Sossusvlei Lodge",
      "Twyfelfontein Country Lodge",
      "Skeleton Coast Park",
    ],
  },
  Zambezi: {
    intro: "River country, green floodplains and wildlife experiences.",
    places: [
      "Chobe River Camp",
      "Namushasha River Lodge",
      "Caprivi Cultural Experience",
    ],
  },
};
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
    "A service quote follows a review of your needs. Fees depend on the agreed scope.",
    "Agency service fees, official fees and any third-party charges should be listed separately.",
    "Official processing times vary. A consultant can explain current guidance without guaranteeing a completion date.",
    "Yes, an initial enquiry can be made before you travel. Submission arrangements depend on the application route.",
    "Your consultant can agree on how and when to share progress updates with you.",
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
    "Confirmed pick-up information and provider details should be shared before arrival.",
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

type SiteView = "home" | "services" | "journey" | "packages" | "faq";

export function LandingPage({ view = "home" }: { view?: SiteView }) {
  const [slide, setSlide] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [service, setService] = useState<ServiceKey>("visa");
  const [activeCard, setActiveCard] = useState(1);
  const [selectedServiceCard, setSelectedServiceCard] =
    useState<ServiceCard | null>(null);
  const [request, setRequest] = useState<{
    service: ServiceKey;
    package?: string;
  } | null>(null);
  const [menu, setMenu] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [article, setArticle] = useState<(typeof articles)[number] | null>(
    null,
  );
  const [selectedPackage, setSelectedPackage] = useState<
    (typeof packages)[number] | null
  >(null);
  const [region, setRegion] = useState<keyof typeof regions>("Khomas");
  const [customItems, setCustomItems] = useState<string[]>([]);
  const [contact, setContact] = useState(false);
  const [contactSummary, setContactSummary] = useState("");
  const cardsRef = useRef<HTMLDivElement>(null);
  const current = slides[slide];
  const cards = serviceGroups[service].cards;
  useEffect(() => {
    if (view !== "home") return;
    const reveal = () => {
      if (window.scrollY > 24) setRevealed(true);
    };
    reveal();
    window.addEventListener("scroll", reveal, { passive: true });
    return () => window.removeEventListener("scroll", reveal);
  }, [view]);
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
      <main className={`site-shell site-${view}`}>
        {view === "home" ? (
          <div className="home-hero-stage">
            <section
              className={`hero-panel ${revealed ? "is-revealed" : ""}`}
              id="home"
            >
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
              <header className="hero-header">
                <BrandLogo className="hero-brand" />
                <nav
                  className={menu ? "hero-nav mobile-open" : "hero-nav"}
                  aria-label="Main navigation"
                >
                  <Link
                    className="active"
                    href="/"
                    onClick={() => setMenu(false)}
                  >
                    Home
                  </Link>
                  <Link href="/services" onClick={() => setMenu(false)}>
                    Our services
                  </Link>
                  <Link href="/journey" onClick={() => setMenu(false)}>
                    Your journey
                  </Link>
                  <Link href="/packages" onClick={() => setMenu(false)}>
                    Packages
                  </Link>
                  <Link href="/notes" onClick={() => setMenu(false)}>
                    Travel notes
                  </Link>
                  <Link href="/contact" onClick={() => setMenu(false)}>
                    Contact
                  </Link>
                </nav>
                <Button
                  className="glass-button header-book"
                  onClick={() => setRequest({ service: "visa" })}
                >
                  Get started{" "}
                  <span className="circle-icon">
                    <ArrowUpRight size={16} />
                  </span>
                </Button>
                <button
                  className="mobile-menu"
                  aria-label={menu ? "Close menu" : "Open menu"}
                  aria-expanded={menu}
                  onClick={() => setMenu(!menu)}
                >
                  {menu ? <X /> : <Menu />}
                </button>
              </header>
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
                  <span className="mini-eyebrow">
                    NAMIBIA, AT YOUR OWN PACE
                  </span>
                  <h2>{current.label}</h2>
                  <p>
                    Visas, transfers, medical visit logistics and stays. Bring
                    the practical parts of your visit together.
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
          </div>
        ) : (
          <header className="interior-header">
            <BrandLogo />
            <button
              className="mobile-menu"
              aria-label={menu ? "Close menu" : "Open menu"}
              aria-expanded={menu}
              onClick={() => setMenu(!menu)}
            >
              {menu ? <X /> : <Menu />}
            </button>
            <nav
              className={menu ? "interior-nav mobile-open" : "interior-nav"}
              aria-label="Main navigation"
            >
              {(
                [
                  ["Home", "/"],
                  ["Our services", "/services"],
                  ["Your journey", "/journey"],
                  ["Packages", "/packages"],
                  ["Travel notes", "/notes"],
                  ["Contact", "/contact"],
                ] as const
              ).map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  aria-current={href === `/${view}` ? "page" : undefined}
                  onClick={() => setMenu(false)}
                >
                  {label}
                </Link>
              ))}
            </nav>
            <Button
              className="pill-button dark-button"
              onClick={() => setRequest({ service: "visa" })}
            >
              Start an enquiry <ArrowUpRight size={16} />
            </Button>
          </header>
        )}

        {view === "home" && (
          <section
            className="home-preview"
            aria-labelledby="home-preview-title"
          >
            <div className="home-preview-heading">
              <span>Explore the possibilities</span>
              <h2 id="home-preview-title">
                Your arrival, considered from every angle.
              </h2>
              <Link href="/services">
                Explore all services <ArrowUpRight size={17} />
              </Link>
            </div>
            <div className="home-preview-grid">
              <Link href="/services" className="home-preview-card">
                <Image
                  src="/images/travel.jpg"
                  alt="Travel planning materials"
                  fill
                  sizes="(max-width: 650px) 100vw, 50vw"
                />
                <span>
                  <small>01 / Before you travel</small>
                  <strong>Visas & permits</strong>
                  <ArrowUpRight size={22} />
                </span>
              </Link>
              <Link href="/journey" className="home-preview-card">
                <Image
                  src="/images/namibia.jpg"
                  alt="Namibia landscape"
                  fill
                  sizes="(max-width: 650px) 100vw, 50vw"
                />
                <span>
                  <small>03 / Find your place</small>
                  <strong>Regions & stays</strong>
                  <ArrowUpRight size={22} />
                </span>
              </Link>
              <Link href="/packages" className="home-preview-card">
                <Image
                  src="/images/care.jpg"
                  alt="Practical travel support"
                  fill
                  sizes="(max-width: 650px) 100vw, 50vw"
                />
                <span>
                  <small>04 / Shape your plan</small>
                  <strong>Service packages</strong>
                  <ArrowUpRight size={22} />
                </span>
              </Link>
              <Link href="/services" className="home-preview-card">
                <Image
                  src="/images/stay.jpg"
                  alt="Accommodation in Namibia"
                  fill
                  sizes="(max-width: 650px) 100vw, 50vw"
                />
                <span>
                  <small>02 / When you arrive</small>
                  <strong>Transfers & stays</strong>
                  <ArrowUpRight size={22} />
                </span>
              </Link>
            </div>
          </section>
        )}

        {view === "services" && (
          <>
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
                <Tabs.List
                  className="service-tabs"
                  aria-label="Travel services"
                >
                  {(Object.keys(serviceGroups) as ServiceKey[]).map((key) => (
                    <Tabs.Trigger className="service-tab" value={key} key={key}>
                      {serviceGroups[key].label}
                    </Tabs.Trigger>
                  ))}
                </Tabs.List>
                {selectedServiceCard && (
                  <article className="service-detail-panel">
                    <div>
                      <span className="card-eyebrow">
                        {serviceGroups[service].label}
                      </span>
                      <h3>{selectedServiceCard.title}</h3>
                      <p>
                        {selectedServiceCard.description} We can help coordinate
                        the practical details around your visit and explain what
                        happens next.
                      </p>
                    </div>
                    <Button
                      className="dark-button"
                      onClick={() => setRequest({ service })}
                    >
                      Start an enquiry <ArrowUpRight size={16} />
                    </Button>
                  </article>
                )}
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
                          onClick={() => {
                            setActiveCard(index);
                            setSelectedServiceCard(card);
                          }}
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
                    <RoundArrow
                      label="Next service"
                      onClick={() => moveCard(1)}
                    />
                  </div>
                </Tabs.Content>
              </Tabs.Root>
            </section>
          </>
        )}

        {view === "journey" && (
          <>
            <section className="white-panel journey-panel" id="journey">
              <div className="split-heading">
                <h2>
                  A visit with many details.
                  <br />
                  <span>One place to bring them together.</span>
                </h2>
                <p>
                  From the application conversation to your first night in
                  Namibia, shape the practical parts around why you are coming.
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
                    Know what is being arranged, what you still need to provide,
                    and who is handling the next step.
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
                    Accommodation enquiries matched to your dates, budget and
                    reason for visiting.
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
            <section className="region-explorer" aria-labelledby="region-title">
              <div className="split-heading">
                <div>
                  <SectionLabel>Explore Namibia</SectionLabel>
                  <h2 id="region-title">Choose your region.</h2>
                </div>
                <p>{regions[region].intro}</p>
              </div>
              <div className="region-tabs">
                {(Object.keys(regions) as Array<keyof typeof regions>).map(
                  (key) => (
                    <button
                      key={key}
                      aria-pressed={region === key}
                      onClick={() => setRegion(key)}
                    >
                      {key}
                    </button>
                  ),
                )}
              </div>
              <div className="region-places">
                {regions[region].places.map((place) => (
                  <article key={place}>
                    <MapPin size={18} />
                    <h3>{place}</h3>
                    <p>Popular place to consider in {region}.</p>
                  </article>
                ))}
              </div>
            </section>
          </>
        )}

        {view === "packages" && (
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
            {selectedPackage && (
              <article className="package-detail-panel">
                <div>
                  <span className="card-eyebrow">Selected package</span>
                  <h3>{selectedPackage.name.replace("\n", " ")}</h3>
                  <p>{selectedPackage.copy}</p>
                  <ul>
                    {selectedPackage.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <Button
                  className="dark-button"
                  onClick={() =>
                    setRequest({
                      service: "visa",
                      package: selectedPackage.name.replace("\n", " "),
                    })
                  }
                >
                  Request a quote <ArrowRight size={16} />
                </Button>
              </article>
            )}
            <div className="package-grid">
              {packages.map((pkg, index) => (
                <button
                  className={`package-tile ${pkg.light ? "light" : ""}`}
                  key={pkg.name}
                  onClick={() => setSelectedPackage(pkg)}
                >
                  <div className="package-top">
                    <span>0{index + 1}</span>
                    <b>
                      {pkg.price}
                      <small>Starting guide · quoted after consultation</small>
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
                    <span>View details</span>
                  </div>
                </button>
              ))}
            </div>
            <div className="custom-package-builder">
              <div>
                <span className="card-eyebrow">Build your own package</span>
                <h3>Choose the help you need.</h3>
                <p>
                  Select services and send the combination to the team for a
                  tailored quote.
                </p>
              </div>
              <div className="builder-options">
                {[
                  "Document review",
                  "Airport transfer",
                  "Accommodation search",
                  "Medical visit coordination",
                  "Local orientation",
                ].map((item) => (
                  <label key={item}>
                    <input
                      type="checkbox"
                      checked={customItems.includes(item)}
                      onChange={(event) =>
                        setCustomItems(
                          event.target.checked
                            ? [...customItems, item]
                            : customItems.filter((current) => current !== item),
                        )
                      }
                    />
                    {item}
                  </label>
                ))}
              </div>
              <Button
                className="dark-button"
                onClick={() =>
                  setRequest({
                    service: "visa",
                    package: `Custom package: ${customItems.join(", ") || "to discuss"}`,
                  })
                }
              >
                Send my plan for a quote <ArrowRight size={16} />
              </Button>
              <small className="builder-note">
                * Illustrative starting guides. Final pricing depends on the
                agreed scope and supplier costs.
              </small>
            </div>
          </section>
        )}

        {view === "journey" && (
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
            <div className="booking-grid">
              <div className="booking-intro">
                <h3>4 thoughtful steps</h3>
                <p>
                  A clear starting point, a defined scope and an arrival plan
                  you can understand.
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
        )}

        {view === "faq" && (
          <>
            <section className="white-panel faq-panel" id="faq">
              <div>
                <SectionLabel>A few useful answers</SectionLabel>
                <h2>
                  Before you
                  <br />
                  <span>make the journey.</span>
                </h2>
                <p>Choose the part of your visit you want to learn about.</p>
                <div
                  className="faq-service-tabs"
                  role="group"
                  aria-label="FAQ service"
                >
                  {(Object.keys(serviceGroups) as ServiceKey[]).map((key) => (
                    <button
                      key={key}
                      type="button"
                      aria-pressed={service === key}
                      onClick={() => {
                        setService(key);
                        setOpenFaq(0);
                      }}
                    >
                      {serviceGroups[key].label}
                    </button>
                  ))}
                </div>
                <Button
                  className="outline-button"
                  onClick={() => setContact(true)}
                >
                  Ask us a question <ArrowUpRight size={16} />
                </Button>
              </div>
              <div className="faq-list">
                {faqQuestions.map((q, i) => (
                  <div className="faq-item" key={q}>
                    <button
                      aria-expanded={openFaq === i}
                      aria-controls={`faq-answer-${i}`}
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    >
                      <span>{q}</span>
                      {openFaq === i ? <Minus size={18} /> : <Plus size={18} />}
                    </button>
                    <div id={`faq-answer-${i}`} hidden={openFaq !== i}>
                      <p>{faqAnswers[service][i]}</p>
                    </div>
                  </div>
                ))}
              </div>
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
          </>
        )}

        <footer className="footer-panel">
          <div>
            <span className="mini-eyebrow">LET’S START WITH YOUR PLANS</span>
            <h2>
              See you
              <br />
              <em>in Namibia.</em>
            </h2>
            <Button onClick={() => setContact(true)}>
              Book a consultation <ArrowUpRight size={17} />
            </Button>
          </div>
          <div className="footer-links">
            <BrandLogo className="footer-brand" />
            <p>Practical support for travel and arrival in Namibia.</p>
            <nav>
              <Link href="/services">Services</Link>
              <Link href="/journey">Your journey</Link>
              <Link href="/packages">Packages</Link>
              <Link href="/faq">FAQs</Link>
            </nav>
            <p className="footer-disclaimer">
              Private agency concept. Visa and permit decisions remain with the
              relevant authorities. Medical services are supplied by qualified
              providers.
            </p>
          </div>
          <div className="footer-bottom">
            <span>Welcome Namibia Services</span>
            <a
              href="https://commons.wikimedia.org/wiki/File:Elim_Ii_(197878137).jpeg"
              target="_blank"
              rel="noreferrer"
            >
              Namibia photograph: Dominik Angstwurm · CC BY-SA 3.0 · displayed
              cropped
            </a>
          </div>
        </footer>
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
              This form prepares a draft. It does not send an email or WhatsApp
              message.
            </p>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}

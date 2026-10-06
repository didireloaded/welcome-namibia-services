"use client";
import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Compass,
  MapPin,
  Plane,
  CarFront,
  BedDouble,
  HeartPulse,
  FileCheck2,
  ChevronRight,
  Globe2,
  MessageCircle,
  Plus,
  Minus,
  Search,
} from "lucide-react"
import { Action, PageHeading } from "./components/Layout"
import { serviceCatalog, findService } from "./data/services"
import { regions, findRegion } from "./data/destinations"
import { packages } from "./data/packages"
import { placeSources } from "./data/sources"
import { stays, attractions, experiences, type DiscoveryItem } from "./data/discovery"

const previews = [
  {
    label: "A smoother arrival",
    tag: "ARRIVAL",
    image: "flight",
    icon: Plane,
    title: "Arrive with a plan.",
    copy: "Documents, flights and your first steps in Namibia, brought together.",
    to: "/journey",
  },
  {
    label: "Your next connection",
    tag: "TRANSPORT",
    image: "travel",
    icon: CarFront,
    title: "Go where you need to.",
    copy: "Airport pickups, private transport and car hire around your itinerary.",
    to: "/services/transfers",
  },
  {
    label: "Somewhere to settle",
    tag: "ACCOMMODATION",
    image: "stay",
    icon: BedDouble,
    title: "Find your place.",
    copy: "From a convenient city hotel to a quiet lodge, a stay that fits your journey.",
    to: "/services/accommodation",
  },
  {
    label: "Care beyond the journey",
    tag: "MEDICAL TRAVEL",
    image: "care",
    icon: HeartPulse,
    title: "Focus on what matters.",
    copy: "Practical travel and companion arrangements around your medical appointments.",
    to: "/services/medical",
  },
]

export function Home() {
  const [active, setActive] = useState<number | null>(null)
  const selected = active === null ? null : previews[active]
  return (
    <section className="home-hero">
      <div className="hero-photo" />
      <div className="hero-shade" />
      <div className="hero-topline">
        <span>
          <span className="status-dot" /> YOUR ARRIVAL. OUR ATTENTION.
        </span>
        <span>
          NAMIBIA, SOUTHERN AFRICA <Globe2 size={14} />
        </span>
      </div>
      <div className="hero-content">
        <div className="hero-pill">
          <Compass size={15} /> A warm welcome. A well-planned journey.
        </div>
        <h1>
          {selected ? (
            selected.title
          ) : (
            <>
              Your Namibia journey.
              <br />
              <span>Beautifully coordinated.</span>
            </>
          )}
        </h1>
        <p>
          {selected
            ? selected.copy
            : "From the paperwork to the place you call home. Permits, travel, stays and local support — connected by one thoughtful plan."}
        </p>
        <div className="hero-actions">
          <Action>Start Application</Action>
          <Action href="/booking" secondary>
            Book Consultation
          </Action>
        </div>
        <div className="hero-note">
          <FileCheck2 size={15} />
          <span>Clear guidance. Personal coordination. No guesswork.</span>
        </div>
        {selected && (
          <div className="preview-links">
            <Link href={selected.to}>
              Explore {selected.tag.toLowerCase()} <ArrowRight size={16} />
            </Link>
            <button onClick={() => setActive(null)}>Back to welcome</button>
          </div>
        )}
      </div>
      <div className="hero-bottom">
        <div className="landscape-caption">
          <div className="location-icon">
            <MapPin size={19} />
          </div>
          <div>
            <span>A LITTLE CLOSER TO NAMIBIA</span>
            <strong>The Namib. An extraordinary beginning.</strong>
            <Link href="/destinations/hardap">
              Discover the destination <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>
        <div className="preview-section">
          <div className="preview-heading">
            <span>EVERY DETAIL, CONNECTED</span>
            <span>
              Choose your starting point <ArrowRight size={13} />
            </span>
          </div>
          <div className="preview-grid">
            {previews.map((preview, index) => (
              <button
                key={preview.tag}
                className={`preview-tile ${active === index ? "selected" : ""}`}
                onClick={() => setActive(active === index ? null : index)}
                aria-pressed={active === index}
              >
                <img src={`/images/${preview.image}.jpg`} alt="" />
                <span className="tile-shade" />
                <span className="tile-top">
                  <preview.icon size={17} />
                  <ArrowUpRight size={16} />
                </span>
                <span className="tile-text">
                  <small>{preview.tag}</small>
                  <span>{preview.label}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="home-footer">
        <span>Welcome isn’t just a word. It’s what we do.</span>
        <Link href="/credits">
          Namib landscape · Dominik Angstwurm <ArrowUpRight size={11} />
        </Link>
        <Link href="/legal">Privacy & terms</Link>
      </div>
    </section>
  )
}

const groupIcons: Record<string, typeof Plane> = {
  "Visa & permits": FileCheck2,
  Transport: CarFront,
  "Medical travel": HeartPulse,
  "Stays & experiences": BedDouble,
  "Travel essentials": Globe2,
  "Additional travel options": Compass,
}

export function Services() {
  const [filter, setFilter] = useState("All services")
  const groups = [...new Set(serviceCatalog.map((service) => service.group))]
  return (
    <div className="page">
      <PageHeading
        label="OUR SERVICES"
        title="Every detail. One connected plan."
      >
        Preparation before you leave. Practical support when you arrive. Explore
        the services that make your Namibia journey yours.
      </PageHeading>
      <div className="filter-tabs" aria-label="Service categories">
        {["All services", ...groups].map((group) => (
          <button
            key={group}
            className={filter === group ? "active" : ""}
            aria-pressed={filter === group}
            onClick={() => setFilter(group)}
          >
            {group}
          </button>
        ))}
      </div>
      {groups
        .filter((group) => filter === "All services" || filter === group)
        .map((group) => {
          const Icon = groupIcons[group] || Compass
          return (
            <section className="catalog-group" key={group}>
              <div className="section-title">
                <Icon size={20} />
                <h2>{group}</h2>
              </div>
              <div className="open-grid">
                {serviceCatalog
                  .filter((service) => service.group === group)
                  .map((service) => (
                    <Link
                      className="service-item"
                      href={`/services/${service.slug}`}
                      key={service.slug}
                    >
                      <h3>
                        {service.title}
                        <ArrowUpRight size={19} />
                      </h3>
                      <p>{service.intro}</p>
                      <span>
                        Explore service <ArrowRight size={14} />
                      </span>
                    </Link>
                  ))}
              </div>
            </section>
          )
        })}
      <section className="service-method glass-panel">
        <div>
          <span className="eyebrow">HOW IT COMES TOGETHER</span>
          <h2>One conversation. A clearer plan.</h2>
          <p>Choose one service or combine several around the same journey. We clarify the scope before any third-party arrangement is confirmed.</p>
        </div>
        <div className="service-method-steps">
          {["Tell us what you need", "Review the proposed scope", "Approve the quotation", "Coordinate the agreed details"].map((step,index)=><div key={step}><span>{String(index+1).padStart(2,"0")}</span><strong>{step}</strong></div>)}
        </div>
      </section>
      <div className="callout">
        <div>
          <h2>Not sure where to start?</h2>
          <p>
            Tell us what brings you to Namibia. We’ll start with your
            priorities.
          </p>
        </div>
        <Action href="/booking">Discuss your journey</Action>
      </div>
    </div>
  )
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="check-list">
      {items.map((item) => (
        <li key={item}>
          <Check size={15} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}
function FAQ({
  question,
  children,
}: {
  question: string
  children: React.ReactNode
}) {
  return (
    <details className="faq">
      <summary>
        {question}
        <Plus size={17} className="plus" />
        <Minus size={17} className="minus" />
      </summary>
      <div>{children}</div>
    </details>
  )
}

export function ServiceDetail() {
  const { slug = "" } = useParams<{ slug: string; region: string; place: string }>()
  const service = findService(slug)
  if (!service) return <NotFound />
  const official = service.form === "visa"
  return (
    <article className="page">
      <Link className="back-link" href="/services">
        ← All services
      </Link>
      <div className="detail-hero">
        <div>
          <PageHeading label={service.group} title={service.title}>
            {service.intro}
          </PageHeading>
          <Action href={`/enquiry?service=${service.slug}`}>
            Enquire about this service
          </Action>
        </div>
        <div className="detail-image">
          <img
            src={`/images/${service.image}.jpg`}
            alt={`${service.group} — illustrative stock photograph`}
          />
          <span>Service inspiration · illustrative photography</span>
        </div>
      </div>
      {["travel-lay-by", "membership"].includes(service.slug) && (
        <p className="notice">
          This is an enquiry-only option. No payment plan, membership scheme or
          benefits are currently confirmed. Do not make payments based on this
          page.
        </p>
      )}
      <section className="detail-section">
        <span className="eyebrow">A GOOD FIT FOR</span>
        <h2>Who this service is for</h2>
        <p>{audience(service.slug)}</p>
      </section>
      <div className="detail-columns">
        <section>
          <h2>What we handle & include</h2>
          <BulletList items={service.includes} />
        </section>
        <section>
          <h2>What you provide</h2>
          <BulletList items={service.needs} />
        </section>
        <section>
          <h2>Not included</h2>
          <BulletList items={service.excludes} />
        </section>
      </div>
      <section className="detail-section">
        <h2>Preparation before we begin</h2>
        <p>
          Start with your intended dates, current location and any fixed
          deadlines.{" "}
          {official
            ? "Check the current rules for your nationality and purpose with Namibia’s immigration authority. Keep your passport and existing permission valid; an enquiry or pending renewal does not extend your legal status."
            : service.form === "medical"
              ? "Speak to your chosen clinical provider about fitness to travel and appointment requirements. Share only practical mobility and companion needs in this public enquiry; do not upload medical records."
              : "Confirm passenger requirements, route, access needs and cancellation flexibility before making non-refundable commitments."}{" "}
          A purpose-specific checklist is agreed after the initial review. Send
          sensitive documents only through a separately agreed secure channel.
        </p>
      </section>
      <section className="detail-section">
        <h2>The process & your responsibilities</h2>
        <div className="process-grid">
          {[
            [
              "01",
              "Share your requirements",
              "You provide accurate dates, needs and supporting information.",
            ],
            [
              "02",
              "Review the proposed scope",
              "The agency identifies missing information and proposes practical next steps.",
            ],
            [
              "03",
              "Approve the quotation",
              "You approve the scope, agency fee and separately identified official or supplier charges.",
            ],
            [
              "04",
              "Confirm & coordinate",
              "The agency coordinates agreed steps. Authorities and suppliers retain responsibility for decisions and delivery.",
            ],
          ].map(([number, title, body]) => (
            <div key={number}>
              <span className="step-number">{number}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="detail-section">
        <h2>Agency fees versus other costs</h2>
        <p>
          Agency coordination fees are quoted for the agreed scope; no fixed
          price is published here. Official application fees, tickets,
          transport, accommodation, park entry and medical provider charges are
          separate unless explicitly itemised as included. Before payment,
          confirm the payee, deposit, cancellation conditions and refund basis
          in writing. An enquiry is not a booking, ticket or official
          application.
        </p>
        {official && (
          <a
            className="text-link"
            href="https://mhaiss.gov.na"
            target="_blank"
            rel="noreferrer"
          >
            Check Namibia’s immigration authority <ArrowUpRight size={14} />
          </a>
        )}
      </section>
      <section className="detail-section">
        <h2>Your questions, answered</h2>
        <FAQ question="Does this guarantee approval or availability?">
          No. Immigration decisions belong to the relevant authorities;
          suppliers confirm their own availability. The agency does not
          guarantee decisions, processing times, medical outcomes or wildlife
          sightings.
        </FAQ>
        <FAQ question="How early should I enquire?">
          Enquire before committing to non-refundable travel. Timing depends on
          your documents, applicable official process and supplier capacity; no
          universal turnaround is promised.
        </FAQ>
        <FAQ question="Can I combine this with other support?">
          Yes. Include your pickup, accommodation, appointment and first-week
          needs in one enquiry, or build your own package. Added services and
          third-party costs require written agreement.
        </FAQ>
      </section>
      <div className="callout">
        <div>
          <h2>A clearer next step.</h2>
          <p>Share your requirements for {service.title.toLowerCase()}.</p>
        </div>
        <Action href={`/enquiry?service=${service.slug}`}>
          Start your enquiry
        </Action>
      </div>
    </article>
  )
}

function audience(slug: string) {
  const copy: Record<string, string> = {
    "work-permits":
      "Professionals, employees and people undertaking assignments who need to prepare an employment-related permission enquiry with their employer.",
    "study-permits":
      "Students and accompanying guardians preparing to study at a Namibian institution. Admission and permission to study are separate decisions.",
    "visitor-visas":
      "Travellers planning a short visit, holiday or family stay who need help organising information around nationality, purpose and duration.",
    "permit-renewals":
      "People already holding Namibian permission who need to prepare for its expiry or a change in circumstances. Begin before your current permission ends.",
    "family-relocation":
      "Families coordinating several document requirements and one shared move, including companions and children.",
    medical:
      "Patients and companions travelling to appointments with their chosen provider. This is practical logistics support, not healthcare or emergency assistance.",
    esim: "Travellers with a compatible, network-unlocked device who want to review mobile data options before arrival.",
  }
  return (
    copy[slug] ||
    "Individuals, families and groups who want this part of their travel plan coordinated around their dates, budget, access needs and wider itinerary. Availability and final scope must be confirmed before any commitment."
  )
}

export function Destinations() {
  const [query, setQuery] = useState("")
  const filtered = regions.filter((region) =>
    `${region.name} ${region.hub} ${region.places.map((place) => place.name).join(" ")}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  )
  return (
    <div className="page">
      <PageHeading
        label="DISCOVER NAMIBIA"
        title="14 regions. A world of possibilities."
      >
        Desert horizons, Atlantic air, river country and everyday local life.
        Find your starting point, then make a practical plan.
      </PageHeading>
      <div className="destination-banner">
        <img
          src="/images/namibia.jpg"
          alt="Dunes and vegetation in the Namib landscape"
        />
        <div>
          <span className="eyebrow">GO BEYOND THE EXPECTED</span>
          <h2>
            Different landscapes.
            <br />
            The same warm welcome.
          </h2>
        </div>
      </div>
      <label className="search-field">
        <Search size={18} />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Find a region, town or attraction"
          aria-label="Search destinations"
        />
        <span>{filtered.length} regions</span>
      </label>
      <div className="region-grid">
        {filtered.map((region) => (
          <Link key={region.slug} href={`/destinations/${region.slug}`}>
            <span className="eyebrow">
              {String(regions.indexOf(region) + 1).padStart(2, "0")} / NAMIBIA
            </span>
            <h2>
              {region.name}
              <ArrowUpRight size={21} />
            </h2>
            <p>{region.hub}</p>
            <small>
              {region.places.length} places to explore <ArrowRight size={13} />
            </small>
          </Link>
        ))}
      </div>
      {!filtered.length && (
        <p className="notice">
          No matching region. Try Windhoek, Etosha or Kavango.
        </p>
      )}
      <p className="source-note">
        Places are independent suggestions, not agency partners. Verify
        operating details with the property or park before travelling.{" "}
        <a href="https://visitnamibia.com.na" target="_blank" rel="noreferrer">
          Namibia Tourism Board ↗
        </a>
      </p>
    </div>
  )
}

function DiscoveryCard({ item }: { item: DiscoveryItem }) {
  return <Link className="discovery-card" href={`/explore/${item.slug}`}>
    <img src={`/images/${item.image}.jpg`} alt="" />
    <div><span className="eyebrow">{item.category}</span><h2>{item.name}<ArrowUpRight size={17}/></h2><p>{item.location}</p><small>{item.description}</small><span className="text-link">Explore <ArrowRight size={14}/></span></div>
  </Link>
}

export function DiscoveryDetail({ slug }: { slug: string }) {
  const item = [...stays, ...attractions].find(entry => entry.slug === slug)
  if (!item) return <NotFound />
  const map = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${item.name} Namibia`)}`
  return <article className="page discovery-page"><Link className="back-link" href={item.category === "Natural wonder" || item.category === "Wildlife" || item.category === "Landscape" || item.category === "Mountains" || item.category === "Adventure" ? "/explore" : "/stay"}>← Back to discovery</Link><div className="discovery-detail-hero"><img src={`/images/${item.image}.jpg`} alt=""/><PageHeading label={`${item.category} · ${item.location}`} title={item.name}>{item.description}</PageHeading></div><div className="guide-location"><MapPin size={19}/><span>{item.location}</span><a href={map} target="_blank" rel="noreferrer">Open in Maps <ArrowUpRight size={15}/></a></div><div className="detail-columns"><section><h2>Why it belongs on your route</h2><p>{item.description} Use this guide as a starting point, then confirm current details with the property, park or local operator.</p></section><section><h2>Plan before you go</h2><p>Check access, opening arrangements, weather, road conditions, availability and cancellation terms before committing to a booking.</p></section><section><h2>Connect the journey</h2><p>Pair this place with nearby stays, local experiences and the wider region so the route works as one plan.</p><Link className="text-link" href={`/destinations/${item.region}`}>Explore the region <ArrowRight size={14}/></Link></section></div><p className="source-note">This is curated planning content, not a booking confirmation or agency partnership.</p></article>
}

export function Stay() {
  return <div className="page discovery-page"><PageHeading label="STAY IN NAMIBIA" title="Find your place in the landscape.">A curated starting point for lodges, hotels, camps and distinctive stays. Explore by destination first, then choose what fits your route.</PageHeading><div className="discovery-hero"><img src="/images/stay.jpg" alt="Namibian accommodation surrounded by landscape"/><div><span className="eyebrow">STAY</span><h2>From a city base to a remote desert night.</h2><p>Property details, prices and availability must be confirmed directly with each operator.</p></div></div><section className="discovery-section"><div className="section-title"><BedDouble size={19}/><h2>Featured stays</h2></div><div className="discovery-grid">{stays.map(item=><DiscoveryCard key={item.slug} item={item}/>)}</div></section><div className="callout"><div><h2>Start with a destination.</h2><p>See what is nearby before choosing where to stay.</p></div><Action href="/destinations">Explore destinations</Action></div></div>
}

export function Explore() {
  return <div className="page discovery-page"><PageHeading label="EXPLORE NAMIBIA" title="The places that make the journey." >Landscapes, wildlife, towns and heritage—connected to the stays and routes around them.</PageHeading><section className="discovery-section"><div className="section-title"><Compass size={19}/><h2>Popular places to explore</h2></div><div className="discovery-grid">{attractions.map(item=><DiscoveryCard key={item.slug} item={item}/>)}</div></section><p className="source-note">Curated guide content is for planning inspiration. Confirm access, fees, opening times and road conditions before travelling.</p></div>
}

export function Experiences() {
  return <div className="page discovery-page"><PageHeading label="EXPERIENCES" title="Choose the feeling of your journey.">Browse Namibia by what you want to do, then connect the experience to a destination and a place to stay.</PageHeading><div className="experience-grid">{experiences.map((item,index)=><Link className="experience-panel" href={`/explore?category=${encodeURIComponent(item)}`} key={item}><span>{String(index+1).padStart(2,"0")}</span><h2>{item}</h2><ArrowUpRight size={19}/></Link>)}</div><div className="callout"><div><h2>Not sure where to begin?</h2><p>Tell us what brings you to Namibia and we’ll help shape a practical route.</p></div><Action href="/enquiry">Plan your journey</Action></div></div>
}

export function RegionDetail() {
  const { region: slug = "" } = useParams<{ slug: string; region: string; place: string }>()
  const region = findRegion(slug)
  if (!region) return <NotFound />
  const regionMap = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${region.hub} ${region.name} Namibia`)}`
  return (
    <div className="page">
      <Link className="back-link" href="/destinations">
        ← All 14 regions
      </Link>
      <PageHeading label={region.hub} title={region.name}>
        {region.intro}
      </PageHeading>
      <div className="guide-location">
        <MapPin size={19} />
        <span>{region.hub}, {region.name} · Namibia</span>
        <a href={regionMap} target="_blank" rel="noreferrer">
          Open in Maps <ArrowUpRight size={15} />
        </a>
      </div>
      <div className="open-grid places-grid">
        {region.places.map((place) => (
          <Link
            className="service-item"
            key={place.slug}
            href={`/destinations/${slug}/${place.slug}`}
          >
            <span className="eyebrow">{place.kind}</span>
            <h3>
              {place.name}
              <ArrowUpRight size={18} />
            </h3>
            <p>{place.description}</p>
            <span>
              Practical visit guide <ArrowRight size={14} />
            </span>
          </Link>
        ))}
      </div>
      <div className="callout">
        <div>
          <h2>Bring {region.name} into your journey.</h2>
          <p>Route, transport and the right stay, considered together.</p>
        </div>
        <Action href={`/enquiry?destination=${encodeURIComponent(region.name)}`}>
          Plan a visit
        </Action>
      </div>
    </div>
  )
}

export function PlaceDetail() {
  const { region: regionSlug = "", place: placeSlug } = useParams<{ slug: string; region: string; place: string }>()
  const region = findRegion(regionSlug)
  const place = region?.places.find((item) => item.slug === placeSlug)
  if (!region || !place) return <NotFound />
  const stay = /Hotel|Lodge|Camp|Stay/.test(place.kind)
  const restaurant = place.kind === "Restaurant"
  const remote = /Nature|Wildlife|Excursion/.test(place.kind)
  const source = placeSources[place.name]
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${place.name} ${region.name} Namibia`)}`
  return (
    <article className="page">
      <Link className="back-link" href={`/destinations/${regionSlug}`}>
        ← Explore {region.name}
      </Link>
      <PageHeading label={`${region.name} / ${place.kind}`} title={place.name}>
        {place.description}
      </PageHeading>
      <div className="guide-location">
        <MapPin size={19} />
        <span>
          {region.name}, Namibia · Regional base: {region.hub}
        </span>
        <a href={maps} target="_blank" rel="noreferrer">
          Locate on map <ArrowUpRight size={15} />
        </a>
      </div>
      <div className="detail-columns">
        <section>
          <h2>Visiting considerations</h2>
          <p>
            {stay
              ? "Compare the exact room category, meal plan and location with your route. Ask about step-free access, family arrangements, dietary needs and facilities rather than assuming they are available."
              : restaurant
                ? "Check current opening hours and make a reservation for busy evenings. Confirm dietary needs, accessibility and the final bill directly with the restaurant."
                : remote
                  ? "Plan around heat, daylight and seasonal conditions. Carry water, sun protection and a route plan. Wildlife areas require distance from animals and compliance with park instructions."
                  : "Check current visitor access and opening arrangements. Follow site guidance, respect local customs and ask permission before photographing people or private spaces."}
          </p>
        </section>
        <section>
          <h2>Access & getting there</h2>
          <p>
            {remote
              ? "Confirm your specific entrance, road condition and vehicle requirements. Remote and sandy routes may require an appropriate vehicle or locally guided access; a town-to-town distance is not a reliable door-to-door travel time."
              : `Use ${region.hub} as a regional planning reference, not a precise address. Confirm the final entrance, pickup point and driving time with your host or operator.`}{" "}
            Review accessibility with the venue before booking.
          </p>
          <a className="text-link" href={maps} target="_blank" rel="noreferrer">
            Check location and route ↗
          </a>
        </section>
        <section>
          <h2>Booking requirements</h2>
          <p>
            {stay
              ? "A reservation needs written confirmation of dates, guests, room type, meal inclusions, deposit and cancellation terms. Activities and transfers may be separate."
              : restaurant
                ? "Contact the restaurant to confirm your date, group size and special requirements. A website enquiry does not reserve a table."
                : "Confirm entry permission, current fees and whether advance booking or a guide is required. Events, trails and tours may be seasonal or restricted."}{" "}
            Agency coordination, entry charges and supplier costs are itemised
            separately.
          </p>
        </section>
      </div>
      <section className="detail-section">
        <h2>Before you travel</h2>
        <BulletList
          items={[
            "Confirm current access and operating status directly with the venue or park.",
            "Check weather, road conditions and the suitability of your chosen vehicle.",
            "Obtain written booking confirmation and review cancellation terms.",
            "Confirm any mobility, dietary or companion requirements in advance.",
          ]}
        />
        {source && (
          <p className="source-note">
            Primary reference:{" "}
            <a href={source.url} target="_blank" rel="noreferrer">
              {source.label} ↗
            </a>
            . Check the current visitor or booking information directly.
          </p>
        )}
        <p className="source-note">
          This planning guide adapts the source repository’s destination
          descriptions. Opening hours, fees, road access and availability are
          not independently confirmed.{" "}
          <a
            href="https://visitnamibia.com.na"
            target="_blank"
            rel="noreferrer"
          >
            Consult Namibia Tourism Board
          </a>{" "}
          and the venue before finalising your visit. No stock photograph is
          presented as a verified image of this property.
        </p>
      </section>
      <Action
        href={`/enquiry?destination=${encodeURIComponent(`${place.name}, ${region.name}`)}`}
      >
        Include this in my journey
      </Action>
      <section className="detail-section">
        <h2>Nearby in your regional plan</h2>
        <div className="related-links">
          {region.places
            .filter((item) => item.slug !== placeSlug)
            .map((item) => (
              <Link
                key={item.slug}
                href={`/destinations/${regionSlug}/${item.slug}`}
              >
                {item.name}
                <ArrowUpRight size={16} />
              </Link>
            ))}
        </div>
      </section>
    </article>
  )
}

const stages = [
  [
    "Consultation",
    "Tell us your purpose, nationality, dates and priorities. Agree which practical services can be coordinated.",
    "You + agency",
    "Share your priorities and review the proposed scope.",
  ],
  [
    "Documents & preparation",
    "Prepare the purpose-specific information. Identify missing documents before proceeding.",
    "You provide · agency reviews",
    "Complete the checklist and confirm any expiry dates.",
  ],
  [
    "Official decisions",
    "Follow the applicable process. Only the relevant authority decides on visas, permits and entry.",
    "Relevant authority",
    "Follow official instructions; avoid unconfirmed travel commitments.",
  ],
  [
    "Flights & confirmations",
    "Align flights, accommodation and transport. Review fares, deposits and cancellation conditions.",
    "You approve · suppliers confirm",
    "Accept the quotation and obtain written confirmations.",
  ],
  [
    "Arrival & pickup",
    "Use the agreed meeting point and reachable driver contact. Let your coordinator know about changes.",
    "Transport provider + you",
    "Confirm flight details, luggage and your drop-off address.",
  ],
  [
    "Settle in & attend appointments",
    "Follow your stay and appointment plan, with companion and orientation support if agreed.",
    "You + coordinator",
    "Attend appointments and flag practical support needs.",
  ],
  [
    "Follow-up & onward travel",
    "Review the agreed first-week support, onward arrangements and any unresolved practical items.",
    "You + coordinator",
    "Check your next deadline and confirm onward arrangements.",
  ],
]

export function Journey() {
  return (
    <div className="page">
      <PageHeading
        label="YOUR JOURNEY"
        title="One plan. From preparation to arrival."
      >
        Know what happens next, what you need to do, and who is responsible. A
        considered journey starts long before the airport.
      </PageHeading>
      <div className="journey-layout">
        <ol className="journey-stages">
          {stages.map(([title, body, owner, next], index) => (
            <li key={title}>
              <span className="journey-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <span className="eyebrow">{owner}</span>
                <h2>{title}</h2>
                <p>{body}</p>
                <div className="next-step">
                  <ArrowRight size={15} />
                  <span>
                    <strong>Your next action:</strong> {next}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ol>
        <aside className="glass-panel journey-aside">
          <Compass size={27} />
          <h2>Your purpose sets the pace.</h2>
          <p>
            A holiday, a family move and a medical visit need different
            preparation. Build around what matters to you.
          </p>
          <Action>Start your plan</Action>
          <Link className="text-link" href="/packages">
            Compare support levels <ChevronRight size={15} />
          </Link>
        </aside>
      </div>
    </div>
  )
}

export function Packages() {
  return (
    <div className="page">
      <PageHeading
        label="ARRIVAL PACKAGES"
        title="The right support. On your terms."
      >
        Choose a guided start, a connected arrival or a more involved
        coordination plan. All scopes and costs are confirmed before you commit.
      </PageHeading>
      <div className="package-grid">
        {packages.map((item, index) => (
          <Link
            className={`package-option ${index === 1 ? "featured" : ""}`}
            key={item.slug}
            href={`/packages/${item.slug}`}
          >
            <span className="eyebrow">
              0{index + 1} / {item.subtitle}
            </span>
            <h2>
              {item.name}
              <ArrowUpRight size={22} />
            </h2>
            <p>{item.intro}</p>
            <BulletList items={item.includes.slice(0, 4)} />
            <span className="package-price">
              Individually quoted <small>No published fixed price</small>
            </span>
            <span className="text-link">
              See full package <ArrowRight size={16} />
            </span>
          </Link>
        ))}
      </div>
      <div className="callout custom-package">
        <div>
          <span className="eyebrow">A JOURNEY AS INDIVIDUAL AS YOU</span>
          <h2>Build your own package.</h2>
          <p>
            Pick your services, share your dates and prepare a tailored
            quotation request.
          </p>
        </div>
        <Action href="/packages/build">Make it yours</Action>
      </div>
      <p className="source-note">
        Agency fees and government or supplier costs are separate unless
        included in a written quotation. Support levels are subject to agency
        confirmation.
      </p>
    </div>
  )
}

export function PackageDetail() {
  const { slug } = useParams<{ slug: string; region: string; place: string }>()
  const item = packages.find((pkg) => pkg.slug === slug)
  if (!item) return <NotFound />
  return (
    <div className="page">
      <Link className="back-link" href="/packages">
        ← All packages
      </Link>
      <PageHeading label={item.subtitle} title={`The ${item.name} package`}>
        {item.intro}
      </PageHeading>
      <div className="detail-columns">
        <section>
          <h2>Included in the proposed scope</h2>
          <BulletList items={item.includes} />
        </section>
        <section>
          <h2>Exclusions</h2>
          <BulletList items={item.excludes} />
        </section>
        <section>
          <h2>Who does what</h2>
          <p>{item.responsibility}</p>
        </section>
      </div>
      <section className="detail-section">
        <h2>Pricing basis & support level</h2>
        <p>
          Pricing depends on the number of travellers, dates, document needs,
          destinations and complexity of the agreed support. The quotation
          should identify the agency fee, support period, contact arrangements
          and each separate third-party cost. A dedicated coordinator does not
          imply round-the-clock availability or emergency response. Confirm the
          service scope before paying.
        </p>
      </section>
      <section className="detail-section">
        <h2>Your next steps</h2>
        <ol className="simple-process">
          <li>Share your travel purpose, dates and practical requirements.</li>
          <li>
            Review the proposed package scope and ask about gaps or exclusions.
          </li>
          <li>
            Approve the itemised quotation and written terms before arrangements
            begin.
          </li>
        </ol>
      </section>
      <FAQ question="Can I adjust the package?">
        Yes. Discuss changes to the proposed scope or select individual services
        in Build Your Own Package. Every change is subject to confirmation and
        revised costs where needed.
      </FAQ>
      <div className="callout">
        <div>
          <h2>Start with a conversation.</h2>
          <p>Find out whether {item.name} is the right fit.</p>
        </div>
        <Action href={`/enquiry?package=${item.slug}`}>
          Enquire about {item.name}
        </Action>
      </div>
    </div>
  )
}

export function Contact() {
  return (
    <div className="page">
      <PageHeading
        label="LET’S CONNECT"
        title="Tell us what brings you to Namibia."
      >
        A new chapter, a needed appointment or a long-awaited escape. Begin with
        the practical details and choose the support you need.
      </PageHeading>
      <div className="contact-options">
        <section>
          <MapPin size={28}/>
          <h2>Welcome Namibia Services</h2>
          <p>Windhoek, Namibia<br/>hello@welcomenamibia.example<br/>WhatsApp: +264 00 000 0000</p>
          <p className="source-note">Presentation contact details. Email and phone are mock values.</p>
          <Action href="/booking">Prepare a message</Action>
        </section>
        <section>
          <MessageCircle size={28} />
          <h2>A conversation first</h2>
          <p>
            Prepare a consultation request with your priorities, preferred date
            and contact details.
          </p>
          <Action href="/booking">Book Consultation</Action>
        </section>
        <section>
          <FileCheck2 size={28} />
          <h2>Already have a plan?</h2>
          <p>
            Select services and prepare the details for your arrival or travel
            enquiry.
          </p>
          <Action>Start Application</Action>
        </section>
      </div>
      <p className="notice">
        Prepare your enquiry and keep a copy on this device. Requests are not
        yet delivered to the agency. Please leave out passport numbers, medical
        records and payment details.
      </p>
      <section className="detail-section" id="faq">
        <h2>A few helpful answers</h2>
        <FAQ question="Are you the immigration authority?">
          No. This site describes practical agency coordination. Only the
          relevant authorities decide on visas, permits and entry.
        </FAQ>
        <FAQ question="Does medical travel include treatment?">
          No. Clinical advice, treatment, outcomes and emergency response are
          the responsibility of qualified medical providers. Travel support is
          separate.
        </FAQ>
        <FAQ question="Is my enquiry emailed automatically?">
          Not yet. This version saves a local draft and lets you download your
          request. It does not send email or confirm a consultation. A working
          delivery service must be connected before public launch.
        </FAQ>
        <FAQ question="How is a quotation calculated?">
          A quotation depends on the agreed scope, travel dates, travellers and
          suppliers. Agency fees, official charges and supplier costs should be
          clearly itemised.
        </FAQ>
        <FAQ question="Can I resume an enquiry?">
          Yes, when browser storage is available. Use the same browser and
          device. Drafts are not synced or securely stored in a client portal;
          clear them on shared devices.
        </FAQ>
      </section>
    </div>
  )
}

export function Credits() {
  return (
    <div className="page">
      <PageHeading
        label="CREDITS & TRANSPARENCY"
        title="The landscape. The sources. The details."
      >
        Photography and planning content deserve clear context.
      </PageHeading>
      <section className="detail-section">
        <h2>Namib landscape</h2>
        <p>
          Elim II by Dominik Angstwurm, licensed under{" "}
          <a
            href="https://creativecommons.org/licenses/by-sa/3.0/"
            target="_blank"
            rel="noreferrer"
          >
            CC BY-SA 3.0
          </a>
          . Used with cropping and colour overlays.{" "}
          <a
            href="https://commons.wikimedia.org/wiki/File:Elim_Ii_(197878137).jpeg"
            target="_blank"
            rel="noreferrer"
          >
            Original photograph ↗
          </a>
        </p>
        <h2>Illustrative service photographs</h2>
        <p>
          Service photography is generic stock, not a representation of
          agency-owned vehicles, properties, medical staff or partners.
          Accommodation images are not verified Namibian properties.
        </p>
        <div className="related-links">
          {[
            ["travel", "1488646953014-85cb44e25828"],
            ["flight", "1436491865332-7a61a109cc05"],
            ["study", "1523240795612-9a054b0db644"],
            ["care", "1576091160399-112ba8d25d1d"],
            ["stay", "1566073771259-6a8506099945"],
            ["coast", "1518837695005-2083093ee35b"],
          ].map(([name, id]) => (
            <a
              key={id}
              href={`https://images.unsplash.com/photo-${id}`}
              target="_blank"
              rel="noreferrer"
            >
              {name} · Unsplash source <ArrowUpRight size={15} />
            </a>
          ))}
        </div>
      </section>
      <section className="detail-section">
        <h2>Content & operational status</h2>
        <p>
          Detailed service, destination and package content and the business
          logo were adapted from the supplied{" "}
          <a
            href="https://github.com/didireloaded/welcome-namibia-services"
            target="_blank"
            rel="noreferrer"
          >
            Welcome Namibia Services repository
          </a>
          . The Miyaloo Travel reference informs service coverage only; no
          prices, benefits, affiliations or payment terms have been copied as
          Welcome Namibia promises.
        </p>
        <p>
          Destination descriptions are planning suggestions, not verified
          current operating information. Consult{" "}
          <a
            href="https://visitnamibia.com.na"
            target="_blank"
            rel="noreferrer"
          >
            Namibia Tourism Board
          </a>
          ,{" "}
          <a href="https://www.nwr.com.na" target="_blank" rel="noreferrer">
            Namibia Wildlife Resorts
          </a>{" "}
          and the venue for access, fees and availability. Consult{" "}
          <a href="https://mhaiss.gov.na" target="_blank" rel="noreferrer">
            the immigration authority
          </a>{" "}
          for current official requirements. Enquiries are local demonstrations;
          agency services and contact details require business approval before
          launch.
        </p>
      </section>
    </div>
  )
}

export function NotFound() {
  return (
    <div className="page">
      <PageHeading
        label="LET’S GET YOU BACK ON TRACK"
        title="That destination isn’t on our map."
      >
        The page may have moved or the address may be incomplete.
      </PageHeading>
      <Action href="/">Back to welcome</Action>
    </div>
  )
}

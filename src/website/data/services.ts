export type ServiceKey = "visa" | "transfers" | "medical" | "vacations" | "esim"
export type Service = {
  slug: string
  title: string
  group: string
  image: string
  form: ServiceKey
  intro: string
  includes: string[]
  needs: string[]
  excludes: string[]
}
const permit = [
  "Valid passport details and nationality",
  "Intended travel dates and duration",
  "Supporting documents for your purpose",
]
const travel = [
  "Travel dates and number of travellers",
  "Preferred destination and budget",
  "Accessibility, luggage or companion requirements",
]
export const serviceCatalog: Service[] = [
  {
    slug: "work-permits",
    title: "Work permit support",
    group: "Visa & permits",
    image: "travel",
    form: "visa",
    intro:
      "Prepare the paperwork for taking up employment or an assignment in Namibia. We help organise the application conversation around your employer, role and intended stay.",
    includes: [
      "Purpose-specific preparation checklist",
      "Review of employer, role and supporting document information",
      "Coordination of queries and agreed submission steps",
    ],
    needs: [
      ...permit,
      "Employer or assignment letter, qualifications and CV where requested",
    ],
    excludes: [
      "Employment placement",
      "Government approval or guaranteed processing time",
      "Official application fees",
    ],
  },
  {
    slug: "study-permits",
    title: "Study permit support",
    group: "Visa & permits",
    image: "study",
    form: "visa",
    intro:
      "Plan the practical steps between receiving an offer from an institution and arriving for your studies.",
    includes: [
      "Admission and travel preparation checklist",
      "Review of enrolment and funding information",
      "Arrival and accommodation planning if added to your scope",
    ],
    needs: [
      ...permit,
      "Institution acceptance or enrolment information",
      "Funding and guardian information where applicable",
    ],
    excludes: [
      "Admission decisions or scholarships",
      "Tuition and official fees",
      "Guaranteed permit approval",
    ],
  },
  {
    slug: "visitor-visas",
    title: "Visitor visa assistance",
    group: "Visa & permits",
    image: "flight",
    form: "visa",
    intro:
      "Understand what to prepare for a short visit, holiday or family trip. Requirements vary by nationality and purpose.",
    includes: [
      "Review of nationality, travel purpose and duration",
      "Travel, invitation and accommodation checklist",
      "Support preparing your agreed enquiry or application",
    ],
    needs: [...permit, "Proposed itinerary and host or accommodation details"],
    excludes: [
      "A binding eligibility determination",
      "Border entry guarantees",
      "Government and supplier fees",
    ],
  },
  {
    slug: "permit-renewals",
    title: "Permit renewals",
    group: "Visa & permits",
    image: "travel",
    form: "visa",
    intro:
      "Review your current permission and plan the documents needed before its expiry. Start early enough to clarify the applicable process.",
    includes: [
      "Review of current permit category and expiry date",
      "Renewal preparation checklist",
      "Coordination of missing information",
    ],
    needs: [
      ...permit,
      "Current permit and its expiry date",
      "Details of any change to employer, institution or circumstances",
    ],
    excludes: [
      "Automatic extensions",
      "Permission to overstay",
      "Guaranteed renewal approval",
    ],
  },
  {
    slug: "family-relocation",
    title: "Family & relocation support",
    group: "Visa & permits",
    image: "stay",
    form: "visa",
    intro:
      "Coordinate a move with several travellers, different document needs and a shared arrival plan.",
    includes: [
      "Individual preparation checklist for each family member",
      "Coordination of travel dates and first accommodation",
      "First-week planning and orientation when agreed",
    ],
    needs: [
      ...travel,
      "Nationality and purpose for each traveller",
      "Relationship and guardian documentation where requested",
    ],
    excludes: [
      "School admission guarantees",
      "Long-term lease or employment guarantees",
      "Legal advice outside the agreed agency scope",
    ],
  },
  {
    slug: "transfers",
    title: "Airport transfers",
    group: "Transport",
    image: "flight",
    form: "transfers",
    intro:
      "Arrange the journey from Hosea Kutako International Airport to your accommodation or onward meeting point.",
    includes: [
      "Pickup and destination coordination",
      "Passenger and luggage requirements",
      "Confirmed meeting point, driver and vehicle details once arranged",
    ],
    needs: [
      ...travel,
      "Flight number, arrival time and pickup location",
      "Drop-off address and reachable contact",
    ],
    excludes: [
      "Unconfirmed live flight or driver tracking",
      "Extra stops outside the agreed itinerary",
      "Vehicle availability before supplier confirmation",
    ],
  },
  {
    slug: "private-transfers",
    title: "Private & group transport",
    group: "Transport",
    image: "flight",
    form: "transfers",
    intro:
      "Plan private, family or group journeys between accommodation, appointments and regional stops.",
    includes: [
      "Route and pickup planning",
      "Passenger capacity and luggage coordination",
      "Quotation for agreed stops and waiting time",
    ],
    needs: [
      ...travel,
      "Pickup and drop-off locations",
      "Number of stops and expected schedule",
    ],
    excludes: [
      "Unlimited waiting time",
      "Unquoted route changes",
      "A vehicle booking before confirmation",
    ],
  },
  {
    slug: "car-hire",
    title: "Car hire coordination",
    group: "Transport",
    image: "travel",
    form: "vacations",
    intro:
      "Discuss a vehicle for your route, including whether paved roads, gravel travel or remote destinations affect the vehicle choice.",
    includes: [
      "Rental requirement and route review",
      "Supplier enquiries for suitable vehicle categories",
      "Review of quoted collection, return and insurance terms",
    ],
    needs: [
      ...travel,
      "Driver age, licence country and rental dates",
      "Proposed route and collection location",
    ],
    excludes: [
      "Rental deposit, fuel and fines",
      "Insurance cover beyond supplier terms",
      "Guaranteed vehicle availability",
    ],
  },
  {
    slug: "medical",
    title: "Medical travel concierge",
    group: "Medical travel",
    image: "care",
    form: "medical",
    intro:
      "Coordinate the travel around an appointment, including arrival, accommodation, companion arrangements and local transport.",
    includes: [
      "Appointment logistics with your chosen provider",
      "Accommodation and companion planning",
      "Transport between airport, stay and appointments",
    ],
    needs: [
      ...travel,
      "Provider name and appointment date if known",
      "Practical mobility and companion needs",
    ],
    excludes: [
      "Diagnosis, treatment or clinical advice",
      "Treatment outcomes or priority clinical access",
      "Medical bills and emergency response services",
    ],
  },
  {
    slug: "accommodation",
    title: "Hotels & lodge reservations",
    group: "Stays & experiences",
    image: "stay",
    form: "vacations",
    intro:
      "Find accommodation that suits your location, dates, budget and practical needs, from city hotels to regional lodges.",
    includes: [
      "Preference and location review",
      "Availability enquiries and option comparison",
      "Confirmation of supplier terms before booking",
    ],
    needs: [
      ...travel,
      "Room count and preferred meal arrangements",
      "Required proximity to airport, institution or clinic",
    ],
    excludes: [
      "Availability until confirmed",
      "Meals, activities or transfers unless quoted",
      "Supplier cancellation charges",
    ],
  },
  {
    slug: "vacations",
    title: "Vacations & itinerary planning",
    group: "Stays & experiences",
    image: "coast",
    form: "vacations",
    intro:
      "Bring destinations, travel distances, stays and activities into a realistic itinerary for your time in Namibia.",
    includes: [
      "Route and destination planning",
      "Stay and transport enquiries",
      "Day-by-day proposal with agreed activities",
    ],
    needs: [...travel, "Interests, pace and must-see places"],
    excludes: [
      "Activities outside the agreed scope",
      "Park, guide and accommodation charges unless quoted",
      "Weather or wildlife sighting guarantees",
    ],
  },
  {
    slug: "safaris",
    title: "Safaris & guided experiences",
    group: "Stays & experiences",
    image: "namibia",
    form: "vacations",
    intro:
      "Explore wildlife, desert and cultural experiences with the transport and guide arrangements suited to the location.",
    includes: [
      "Experience and route recommendations",
      "Guide or operator availability enquiries",
      "Activity requirements and quoted terms",
    ],
    needs: [
      ...travel,
      "Preferred activities and fitness or access requirements",
    ],
    excludes: [
      "Guaranteed wildlife sightings",
      "Park access or guide costs unless quoted",
      "Unconfirmed operator partnerships",
    ],
  },
  {
    slug: "flight-bookings",
    title: "Flight booking assistance",
    group: "Travel essentials",
    image: "flight",
    form: "vacations",
    intro:
      "Coordinate flight options around your arrival plan, connections and destination. Ticketing arrangements and fare terms are confirmed before payment.",
    includes: [
      "Route, timing and luggage preference review",
      "Flight option enquiries",
      "Review of fare, change and cancellation conditions",
    ],
    needs: [
      ...travel,
      "Departure airport and destination",
      "Traveller names matching travel documents through an agreed channel",
    ],
    excludes: [
      "Airline schedule guarantees",
      "Ticket changes beyond fare conditions",
      "Ticket issue before agreed confirmation and payment",
    ],
  },
  {
    slug: "esim",
    title: "eSIM & connectivity",
    group: "Travel essentials",
    image: "flight",
    form: "esim",
    intro:
      "Prepare to get online after arrival. Check your exact device, destination coverage and data needs before choosing a plan.",
    includes: [
      "Device model and travel needs review",
      "Enquiries about plan coverage, validity and allowance",
      "Setup guidance for a confirmed product",
    ],
    needs: [
      "Exact phone model and whether it is network-unlocked",
      "Destinations, travel dates and expected data use",
    ],
    excludes: [
      "Unconfirmed coverage or plan prices",
      "Unlimited data or voice service unless specified",
      "QR delivery or activation before a provider is confirmed",
    ],
  },
  {
    slug: "local-orientation",
    title: "Local orientation & first-week setup",
    group: "Travel essentials",
    image: "namibia",
    form: "vacations",
    intro:
      "Get practical guidance for your first days, including connectivity, transport, local errands and the appointments on your plan.",
    includes: [
      "First-week preparation checklist",
      "Local transport and connectivity guidance",
      "Directions and coordination for agreed appointments",
    ],
    needs: [...travel, "First-week priorities and accommodation location"],
    excludes: [
      "Bank account, school or authority approval",
      "Unquoted personal errands",
      "Round-the-clock support unless contracted",
    ],
  },
  {
    slug: "cruise-packages",
    title: "Cruise holiday enquiries",
    group: "Additional travel options",
    image: "coast",
    form: "vacations",
    intro:
      "Discuss cruise travel as part of a wider holiday plan. Any route, operator, ticketing arrangement or availability must be confirmed before it is offered.",
    includes: [
      "Review of destination and sailing preferences",
      "Enquiries about suitable sailings and cabin categories",
      "Review of quoted supplier terms",
    ],
    needs: [
      ...travel,
      "Departure port and preferred cruise dates",
      "Cabin, companion and access requirements",
    ],
    excludes: [
      "Confirmed cruise partnerships",
      "A reserved cabin before supplier confirmation",
      "Flights, port charges, visas and excursions unless quoted",
    ],
  },
  {
    slug: "travel-lay-by",
    title: "Travel payment-plan enquiries",
    group: "Additional travel options",
    image: "travel",
    form: "vacations",
    intro:
      "Ask whether a staged-payment arrangement could be available for your proposed trip. This is an enquiry option, not an active financing or lay-by product.",
    includes: [
      "Review of your proposed itinerary and timing",
      "Discussion of any supplier-supported payment schedule",
      "Written terms only if an arrangement is confirmed",
    ],
    needs: [...travel, "Proposed payment timing and departure deadline"],
    excludes: [
      "A confirmed instalment facility or credit product",
      "Guaranteed fare or availability before booking",
      "Payment collection through this demonstration",
    ],
  },
  {
    slug: "membership",
    title: "Membership interest",
    group: "Additional travel options",
    image: "stay",
    form: "vacations",
    intro:
      "Register interest in potential ongoing travel support. No membership scheme, discounts, priority service or annual benefits are confirmed by this website.",
    includes: [
      "Discussion of recurring travel requirements",
      "Record of interest in future support options",
      "Clarification of any future offering before commitment",
    ],
    needs: [
      "Typical travel frequency and destinations",
      "Your contact details and support priorities",
    ],
    excludes: [
      "Confirmed discounts or priority benefits",
      "Automatic enrolment or membership billing",
      "An operational membership programme",
    ],
  },
]
export const serviceAliases: Record<string, string> = {
  "visa-permits": "work-permits",
}
export function findService(slug: string) {
  return serviceCatalog.find(
    (item) => item.slug === (serviceAliases[slug] || slug),
  )
}

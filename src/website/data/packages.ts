export const packages = [
  {
    slug: "essential",
    name: "Essential",
    subtitle: "Guided Start",
    intro:
      "For travellers who can manage their bookings and want clear preparation support.",
    includes: [
      "Initial consultation",
      "Personal document checklist",
      "One document preparation review",
      "Basic local arrival guidance",
    ],
    excludes: [
      "Authority application fees",
      "Transfer and accommodation bookings",
      "Dedicated coordinator or ongoing appointment logistics",
    ],
    responsibility:
      "You manage your bookings and submissions. The agency helps you prepare and understand the next steps.",
  },
  {
    slug: "complete",
    name: "Complete",
    subtitle: "Arrival Plan",
    intro:
      "For travellers who want paperwork, pickup and their first stay coordinated together.",
    includes: [
      "Everything in Essential",
      "Agreed visa or permit coordination",
      "Airport transfer arrangements",
      "Accommodation assistance",
      "Coordinated arrival timeline and reminders",
    ],
    excludes: [
      "Government approval guarantees",
      "Flight tickets, room charges and vehicle costs unless quoted",
      "Clinical care or unlimited support",
    ],
    responsibility:
      "The agency coordinates agreed arrangements. You provide documents, approve options and pay separately identified supplier charges.",
  },
  {
    slug: "concierge",
    name: "Concierge",
    subtitle: "Fully Coordinated Arrival",
    intro:
      "For family moves, medical visits and journeys with more practical requirements.",
    includes: [
      "Everything in Complete",
      "Dedicated arrival coordinator",
      "Medical appointment logistics where needed",
      "Family and companion planning",
      "Local orientation and agreed first-week support",
      "Custom itinerary and contingency planning",
    ],
    excludes: [
      "Medical treatment or emergency services",
      "Government priority processing",
      "Unlimited errands or unagreed itinerary changes",
    ],
    responsibility:
      "Your coordinator manages the agreed plan and follow-up. Authorities, medical practitioners and travel suppliers remain responsible for their own decisions and services.",
  },
]

# Welcome Namibia Services

A responsive Namibia travel and arrival website using the supplied “Modern Responsive Travel Website” interface. The React source has been adapted to Next.js navigation without importing the export's Vite configuration or React Router.

## Run locally

```sh
npm ci
npm run dev
```

Open <http://localhost:3000>.

## Public pages

- `/` Home and enquiry entry
- `/services` Overview
- `/services/visa-permits`, `/services/transfers`, `/services/medical`, `/services/vacations`, `/services/esim`
- `/destinations`, `/destinations/[region]`, `/destinations/[region]/[place]`
- `/journey`, `/packages`, `/packages/[slug]`, `/packages/build`
- `/contact`
- `/enquiry`, `/credits`
- `/booking` Sample consultation scheduling, rescheduling and cancellation
- `/client` Interactive client workspace with checklist, timeline, sample quote and simulated enquiry acknowledgements
- `/legal` Prototype privacy, scope and cancellation-policy summary
- `/login` redirects to the client prototype; no authentication is represented.

## Enquiries and portal data

The enquiry flow in `src/website/components/Enquiry.tsx` saves drafts to browser storage and prepares a downloadable text request. It does not send email or submit to an agency. The new interface does not use the retained legacy demo API.

The form does not collect passport numbers or medical records, and file selection stores names only. Do not enter real client details in this prototype. Payment, email/SMS/WhatsApp, flight tracking, provider bookings, secure document storage and government submissions are not connected. A saved enquiry is not an application or booking confirmation. Quotes, official fees and supplier charges must be confirmed separately before a real launch.

To clear the new enquiry draft, remove `welcome-namibia-enquiry-v1` from browser storage. Previous local records are not migrated into the new interface.

The client prototype also uses `welcome-namibia-prototype-v1` and `welcome-namibia-prepared-requests-v1`. Consultation availability and NAD quotation prices are illustrative. No agency notification, real reservation, contract or payment is created. The prototype is marked noindex; approved legal terms, secure auth/storage, monitoring and notification services remain launch requirements.

Run `node tests/client-prototype.cjs` against the running local dev server to verify scheduling, checklist, quotation, simulated delivery, persistence and mobile layout. The test uses installed Google Chrome and an isolated browser context with fictional data.

## Verification

```sh
npm run typecheck
./node_modules/.bin/next build --webpack
node --check tests/workflow.cjs
```

`tests/workflow.cjs` contains a Playwright end-to-end flow. Run it only where the configured Playwright browser and a development server are already available.

## Design and factual limits

The supplied visual reference informed the photographic hero, glass navigation, editorial gallery and spacious service layouts. Palette and typography remain provisional until the client confirms the brand. No client count, testimonial, licence, accreditation, medical provider, partner relationship, fixed price or processing promise is represented as fact. Medical coordination is distinct from clinical care.

## Images

The Namibia landscape is Elim II by Dominik Angstwurm, CC BY-SA 3.0. Source and attribution: <https://commons.wikimedia.org/wiki/File:Elim_Ii_(197878137).jpeg>. Attribution is in the footer. Other travel, study, medical and accommodation images are Unsplash stock, used only to explore the layout and not as depictions of the agency's staff, fleet, properties or partners. Exact asset URLs are in `docs/IMAGE_CREDITS.md`.

## Before production

Confirm the business name, registration and contact details, language needs, service scope, fees, refund terms, provider relationships, immigration wording and privacy/retention rules. Production requires authenticated server-side storage, protected document uploads, notification/payment integrations and appropriate legal review. See `docs/PROJECT_BRIEF.md` and `docs/FEATURE_ROADMAP.md`.

# Arrival Namibia

A mobile-first web experience for a Namibia travel and arrival support business. The design name is provisional; the client has not confirmed whether it should be Welcome Namibia Services or Arrival Namibia.

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
- `/destinations`, `/gallery`, `/partners`
- `/contact`
- `/login`, `/client`, `/admin` Browser-local portal workflow

## Enquiries and portal data

A small client-side adapter in `src/lib/browser-store.ts` writes the current browser's request records, drafts, message notes and workspace updates to local storage. Nothing is sent to a server. Requests in one browser are not shared with another browser, device or person. The portal is a workflow illustration, not an authenticated client or agency account.

The form does not collect passport numbers or medical records, and file selection stores names only. Do not enter real client details in this prototype. Payment, email/SMS/WhatsApp, flight tracking, provider bookings, secure document storage and government submissions are not connected. A saved enquiry is not an application or booking confirmation. Quotes, official fees and supplier charges must be confirmed separately before a real launch.

To clear local records, remove the site's `arrival-browser-*` and `arrival-request-draft-*` entries in browser storage.

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

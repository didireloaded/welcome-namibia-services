# Arrival Namibia preview

A Next.js and TypeScript website preview with a persistent sample request workflow built from the supplied travel website reference. Arrival Namibia is a working identity.

## Run

```sh
npm ci
npm run dev
```

Open http://localhost:3000.

## Routes

- `/` Public website
- `/client` Sample client dashboard
- `/admin` Sample operations dashboard
- `/login` Portal entry preview

## Included interactions

Hero slides, service tabs and carousel, package enquiries, four-step request flows for each service, conditional preparation checklists, local file-name preview, FAQ accordions, editorial article dialogs, consultation enquiry summaries, admin table filtering and sample status changes, document verification controls, sample transfer dispatch and printable sample invoice.

## Data boundaries

This is a shared demo, without authentication. Forms save fictional enquiries, document names and status history to a local SQLite database in `data/preview.sqlite`. No file bytes are uploaded. Passport numbers are discarded on the server. Driver assignment and sample document verification also persist on the server. The browser stores only the most recent request reference to select the matching client view. Requests remain after a server restart, subject to the host filesystem lifetime.

This is **not** the intended production PostgreSQL/Prisma/Auth.js backend. All preview records and update endpoints are shared. Use fictional details only, never real passports or medical records. Production mode disables the demo API by default. To run the shared demo deliberately with `next start`, set `ENABLE_DEMO_BACKEND=true`; do not enable this on a live customer site. Requires Node 24 for the built-in SQLite API.

Payment, notification, protected document upload and real account creation remain unconnected. Requests are enquiries, not government applications. To reset the demo, stop the server and remove the `data/` directory. `DEMO_DATA_DIR` optionally selects a private writable directory. Never commit or package this directory.

## Backend phase

The intended stack in the original brief includes PostgreSQL/Prisma, Auth.js, protected document storage, server-side validation, notifications and payments. Confirm the client's service scope, business identity, registration, pricing, contact details, languages, provider relationships and payment availability before connecting these features. See `docs/PROJECT_BRIEF.md` and `docs/FEATURE_ROADMAP.md`.

## Design

The supplied reference guides the rounded panels, photographic hero, glass navigation, service carousel, editorial gallery, geometric pricing cards and large booking section. The page is adapted to Namibia arrival support. No invented testimonial, accreditation, licence or client count is presented as fact.

## Photography

The Namibia landscape is **Elim II** by **Dominik Angstwurm**, licensed **CC BY-SA 3.0**. The source is https://commons.wikimedia.org/wiki/File:Elim_Ii_(197878137).jpeg. Displayed with CSS cropping and an overlay. Attribution is included in the footer. Other travel, study, medical and accommodation images are Unsplash stock used for visual exploration, not claims of the agency's fleet, staff, properties or partnerships. Exact asset URLs are in `docs/IMAGE_CREDITS.md`.

## Verify

```sh
npm run typecheck
npm run build
```

The browser workflow test is `node tests/workflow.cjs` with a development server available in the same network environment. It creates one fictional request.

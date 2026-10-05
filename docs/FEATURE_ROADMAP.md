# Feature roadmap from the user

## Phase 1

### Public website

Hero and two calls to action. Four service tabs for visas/permits, airport transfers, medical assistance and vacations. Four-step process. Service packages with separate agency and government fees. Verified testimonials, ratings, licences and accreditations. Ten FAQs per service. Contact form, WhatsApp entry point and SEO article setup.

### Application and booking

Four-step visa intake, personal details, service type, dynamic document checklist, upload, review and submission. Transfer booking with locations, time, flight, passengers and vehicle class. Medical enquiry with patient and provider information plus protected records. Vacation enquiry with destination, dates, guests, budget and requests. Deposit/full payment using a confirmed available provider.

### Client dashboard

Secure login and signup. Application milestones, timestamps and consultant notes. Transfer status, confirmed time, driver and vehicle information, route/map access. Protected document vault. Downloadable invoices.

### Admin

Lead/application table with filters. Document review and correction requests. Status updates and notifications. Driver dispatch. Payment overview and invoices.

### Technical essentials

Mobile layouts and usable upload/status flows. HTTPS and protected access for sensitive records. Email/SMS events. Confirmed languages and complete translated content. No assumption that a particular payment service or SMS provider supports the business.

## Phase 2

Eligibility guidance with current official grounding and consultant review. Passport OCR. Flight delay integration. Live driver tracking. Medical concierge features with qualified providers. Combined itinerary timeline. WhatsApp Business integration. Referral commissions and abandoned-request recovery.

## UI implemented in this build

Homepage sections, four service groups, interactive hero and service gallery, packages and request dialogs. Four-step request demos, conditional illustrative checklist and selected file names. Client and operations portal previews. Status changes for synthetic records, table filters, sample document verification and driver assignment. Sample invoice printing. FAQs, article dialogs and contact summary.

## Production integrations still required

Prisma/PostgreSQL data model and migrations, authentication/authorization, protected uploads and retention, server validation, application persistence, notifications, payments and invoices, CMS/article routes, client-confirmed language content, verified trust information and real business contact details.

## Recommended delivery order

1. Agree service scope and finish the public/frontend design.
2. Define the relational data model, access rules and sensitive document workflow.
3. Connect authentication and protected request submission.
4. Connect client tracking and admin processing.
5. Connect verified booking providers, payment and notifications.
6. Add Phase 2 integrations after the basic service workflow works in production.

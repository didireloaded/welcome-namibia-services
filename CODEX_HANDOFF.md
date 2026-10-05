# Arrival Namibia handoff

Build a travel and arrival support website for a client planning to launch in 2027. Arrival Namibia is a working name. Services include visa/work/study permit assistance, airport transfers, medical visit coordination, hotel reservations and vacations. Business identity, registration, prices, contacts, languages and partnerships still need confirmation.

## Start here

Read AGENTS.md and README.md, then docs/PROJECT_BRIEF.md and docs/FEATURE_ROADMAP.md. The supplied design reference is docs/ui-reference.png. Original technical requirements are in docs/original-technical-notes.txt.

Use Node.js 24. Run npm ci, then npm run dev. Open http://localhost:3000 on the same computer. This source package must be extracted and opened as a local Codex project before a local browser can reach its development server.

## Already built

- Responsive homepage matching the supplied reference with Namibia photography, service tabs, galleries, packages, preparation guide, FAQs and article dialogs.
- Four-step enquiry forms for visa, transfer, medical and vacation services.
- Shared sample backend using Node's built-in SQLite, server validation, request references and status history.
- Admin request table with filters, expandable enquiry details and saved status updates.
- Client portal displaying the most recent request selected by a browser reference.
- Persistent sample driver assignment and document review state.
- Sample login, payment and invoice screens.

## Important boundaries

This is a shared preview without authentication. Use fictional data only. The demo API is disabled by default in production. Do not enable it on a real customer site. Database files are deliberately excluded from this archive. They are recreated under data/ on first API use. File uploads save names only. Passport numbers are discarded. No real documents, payments, government submissions or notifications are processed.

The intended production stack is PostgreSQL with Prisma, Auth.js, protected document storage, email/SMS and an available payment provider. These are not yet connected. Do not describe the SQLite preview or sample login as production authentication or the requested production database.

## Continue next

1. Start the local server and inspect the homepage and portals with the client.
2. Preserve the reference-led layout and typography. Avoid generic dashboard styling, fake reviews, accreditation, approval guarantees or invented business details.
3. Connect PostgreSQL/Prisma and Auth.js with separate client/admin roles and ownership checks on every read and mutation.
4. Replace the demo store with authenticated applications, per-request document review, status notes and transfer dispatch.
5. Add protected uploads, consent and retention workflows before accepting passports or medical records.
6. Connect notifications, payments and real contact channels after business configuration is confirmed.

## Validation

npm run typecheck and npm run build passed. tests/workflow.cjs checks sample submission, reference creation, passport omission, admin review and update, client synchronization, invalid payloads, foreign-origin mutations and mobile overflow. Run it with a dev server reachable from the same network environment. It adds a fictional test enquiry. Production API shutdown and database persistence across processes were also checked.

Keep the distinct continue/finish button keys and the submission step guard in RequestDialog. They prevent a continue click from accidentally submitting the last step.

## Communication preference

Keep explanations short, conversational and clear. No emojis or em dashes. Make actual changes and verify them. Clearly distinguish completed preview work from unconnected production integrations.

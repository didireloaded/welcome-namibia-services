# Verification

Verified on 5 October 2026.

- Strict TypeScript check passed.
- Next.js production build passed for homepage, client portal, agency portal and login preview.
- Browser smoke checks verified all four service tabs, required personal detail validation, study checklist selection, explicit review step and demo request completion.
- Sample application status updates made in the agency portal were reflected in the client portal after navigation.
- Sample driver assignment was reflected in the client transfer view after navigation.
- Sample sign-in form navigated to the client preview.
- Mobile navigation opened and closed correctly.
- Homepage, client, agency and sign-in previews had no document-level horizontal overflow at 390px width. Tables and carousels intentionally scroll within their own containers.
- No browser page errors were observed during the main request and portal smoke checks.
- Desktop and mobile screenshots are included in this directory.

This verifies the frontend demo. Production authentication, storage, payments and notification integrations are not implemented and were not tested.


## Persistent preview workflow update

- Browser test created a Study enquiry, obtained a reference, opened the matching client portal, updated its status in admin, expanded contact/visit details and checked the client status again.
- Invalid submission returned 400, foreign-origin mutation returned 403, and an unknown request update returned 404.
- Passport sample value was omitted from stored request details.
- Client dashboard at 390px had no page overflow; no browser errors occurred.
- Database files are excluded from the downloadable source.
- This test verifies a shared sample workflow. It does not verify authentication, production PostgreSQL, document encryption, email, SMS or payment integrations.

- Final typecheck and production build passed. Stored status was read in a fresh Node process; production API returned 503 with the preview flag absent.

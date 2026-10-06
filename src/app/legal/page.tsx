import Link from "next/link";
import { PageHeading } from "@/website/components/Layout";
export default function Page() {
  return (
    <div className="page">
      <PageHeading label="CLEAR EXPECTATIONS" title="Privacy & service terms">
        Know what is stored, what is included, and who makes each decision.
      </PageHeading>
      <p className="notice">
        Prototype policy summary — not approved legal terms. Business identity,
        retention periods, fees and cancellation rules must be confirmed before
        launch.
      </p>
      <section className="detail-section" id="privacy">
        <h2>Your privacy</h2>
        <p>
          This prototype stores enquiries, sample consultations, checklists and
          quote decisions in browser storage on this device. Requests are not
          delivered to an agency. Do not enter real identity, passport, health
          or payment information. There is no secure authentication or document
          upload.
        </p>
        <p>
          Browser storage can be read by anyone using this browser profile. To
          remove prototype data, clear this site’s storage in your browser
          settings. No third-party analytics or marketing trackers have been
          added for these flows.
        </p>
      </section>
      <section className="detail-section" id="terms">
        <h2>Service boundaries</h2>
        <p>
          Travel and application coordination is separate from government
          decisions, clinical treatment and supplier services. No visa approval,
          admission, medical outcome, accommodation or transport booking is
          guaranteed. Clients provide accurate details and approve arrangements;
          authorities and providers make their own decisions.
        </p>
      </section>
      <section className="detail-section" id="cancellations">
        <h2>Quotes, changes & cancellations</h2>
        <p>
          All displayed portal prices are illustrative NAD amounts. Accepting a
          sample quote creates no contract or payment obligation. A real
          quotation must specify agency fees, third-party charges, taxes,
          validity, inclusions, exclusions and payment dates. Cancellation and
          refund terms must be agreed before payment and may differ by supplier;
          this prototype does not establish those terms.
        </p>
      </section>
      <section className="detail-section">
        <h2>Business contact</h2>
        <p>
          Welcome Namibia Services · Windhoek, Namibia
          <br />
          hello@welcomenamibia.example · +264 00 000 0000
        </p>
        <p>
          Mock contact details. Registration, physical address and emergency
          contacts have not been verified. This is not an emergency service.
        </p>
        <Link className="text-link" href="/contact">
          Contact options →
        </Link>
      </section>
    </div>
  );
}

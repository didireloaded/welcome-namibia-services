"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  CheckCircle2,
  FileCheck2,
  ArrowRight,
  LayoutDashboard,
  Bell,
  Compass,
  Wallet,
  Plane,
  MapPin,
} from "lucide-react";
import { PageHeading } from "./Layout";
import {
  initialPrototype,
  readPrototype,
  writePrototype,
  type Prototype,
} from "../data/prototype";
import { requests, type PreparedRequest } from "../data/requests";

export default function ClientPrototype({
  bookingOnly = false,
}: {
  bookingOnly?: boolean;
}) {
  const [state, setState] = useState<Prototype>(initialPrototype);
  const [items, setItems] = useState<PreparedRequest[]>([]);
  const [ready, setReady] = useState(false);
  const [message, setMessage] = useState("");
  const [tab, setTab] = useState("Overview");
  const [editing, setEditing] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState<"09:00" | "11:00" | "14:00">("09:00");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [agree, setAgree] = useState(false);
  const [today, setToday] = useState("");
  const [travelPack, setTravelPack] = useState(false);
  const [savedPlace, setSavedPlace] = useState(false);
  const [chat, setChat] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [support, setSupport] = useState("");
  const [ticket, setTicket] = useState("");
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [whatsappAlerts, setWhatsappAlerts] = useState(false);
  const [accessNeeds, setAccessNeeds] = useState("");
  const [language, setLanguage] = useState("English");
  const [profileSaved, setProfileSaved] = useState(false);
  useEffect(() => {
    try {
      const saved = readPrototype();
      setState(saved);
      setItems(requests());
      if (saved.booking) {
        setDate(saved.booking.date);
        setTime(saved.booking.time);
        setName(saved.booking.name);
        setEmail(saved.booking.email);
      }
    } catch {
      setMessage(
        "Browser storage is unavailable. Changes cannot be saved on this device.",
      );
    }
    setToday(
      new Intl.DateTimeFormat("en-CA", {
        timeZone: "Africa/Windhoek",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(new Date()),
    );
    setReady(true);
  }, []);
  function commit(next: Prototype, feedback: string) {
    try {
      writePrototype(next);
      setState(next);
      setMessage(feedback);
      return true;
    } catch {
      setMessage(
        "Could not save. Check browser storage permissions and try again.",
      );
      return false;
    }
  }
  const booking = (
    <section className="detail-section">
      <h2>
        <CalendarDays size={22} /> Your consultation
      </h2>
      <p>
        30-minute introductory call · Windhoek time (UTC+2). Sample availability
        only.
      </p>
      {state.booking && !editing ? (
        <>
          <div className="portal-appointment">
            <strong>
              {state.booking.date} at {state.booking.time}
            </strong>
            <span>
              {state.booking.name} · {state.booking.email}
            </span>
            <span>
              Reserved in this prototype only. No invitation has been emailed.
            </span>
          </div>
          <div className="portal-actions">
            <button
              className="button button-secondary"
              onClick={() => setEditing(true)}
            >
              Reschedule
            </button>
            <button
              className="text-link"
              onClick={() =>
                commit(
                  { ...state, booking: null },
                  "Sample consultation cancelled.",
                )
              }
            >
              Cancel consultation
            </button>
          </div>
        </>
      ) : (
        <form
          className="portal-booking"
          onSubmit={(event) => {
            event.preventDefault();
            if (
              !date ||
              date <= today ||
              [0, 6].includes(new Date(date + "T12:00:00+02:00").getUTCDay())
            ) {
              setMessage("Choose a future weekday for your consultation.");
              return;
            }
            if (
              commit(
                {
                  ...state,
                  booking: {
                    date,
                    time,
                    name: name.trim(),
                    email: email.trim(),
                  },
                },
                "Sample consultation reserved. No real appointment or email was created.",
              )
            )
              setEditing(false);
          }}
        >
          <div className="form-grid">
            <label className="form-field">
              <span>Full name</span>
              <input
                required
                minLength={2}
                maxLength={100}
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
              />
            </label>
            <label className="form-field">
              <span>Email address</span>
              <input
                required
                type="email"
                maxLength={254}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </label>
            <label className="form-field">
              <span>Preferred weekday</span>
              <input
                required
                type="date"
                min={today}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </label>
            <label className="form-field">
              <span>Available time · UTC+2</span>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value as typeof time)}
              >
                <option>09:00</option>
                <option>11:00</option>
                <option>14:00</option>
              </select>
            </label>
          </div>
          <button className="button button-primary">
            {editing ? "Save new time" : "Reserve sample consultation"}{" "}
            <ArrowRight size={16} />
          </button>
          {editing && (
            <button
              type="button"
              className="text-link"
              onClick={() => setEditing(false)}
            >
              Keep current time
            </button>
          )}
        </form>
      )}
    </section>
  );
  return (
    <div
      className={
        bookingOnly ? "page portal-page" : "dashboard-shell portal-page"
      }
    >
      {!bookingOnly && (
        <aside className="dashboard-sidebar">
          <Link href="/" className="dashboard-brand">
            <img
              src="/images/welcome-namibia-services-logo.png"
              alt="Welcome Namibia Services"
            />
            <span>CLIENT WORKSPACE</span>
          </Link>
          <span className="dashboard-nav-label">YOUR ARRIVAL</span>
          <nav aria-label="Workspace sections">
            {[
              { label: "Overview", icon: LayoutDashboard },
              { label: "Documents", icon: FileCheck2 },
              { label: "Consultation", icon: CalendarDays },
              { label: "Quotation", icon: Wallet },
              { label: "Payment plan", icon: CalendarDays },
              { label: "Updates", icon: Bell },
              { label: "Travel hub", icon: Plane },
              { label: "Support & account", icon: Compass },
            ].map(({ label, icon: Icon }) => (
              <button
                key={label}
                aria-label={label}
                aria-current={tab === label ? "page" : undefined}
                onClick={() => {
                  setTab(label);
                  setMessage("");
                }}
              >
                <Icon size={18} />
                {label}
                {label === "Documents" && (
                  <small>{3 - state.documents.length}</small>
                )}
              </button>
            ))}
          </nav>
          <div className="dashboard-sidebar-bottom">
            <Compass size={23} />
            <strong>A smoother arrival.</strong>
            <p>Your plans and practical details, together.</p>
            <Link href="/contact">Contact the team →</Link>
            <Link href="/">Back to website →</Link>
          </div>
        </aside>
      )}
      <div className="dashboard-main">
        {!bookingOnly && (
          <div className="dashboard-topbar">
            <span>
              Workspace <span>/ {tab}</span>
            </span>
            <div>
              <span className="demo-badge">Prototype</span>
              <span className="dashboard-avatar">
                {(state.booking?.name || items[0]?.name || "Guest")
                  .slice(0, 1)
                  .toUpperCase()}
              </span>
            </div>
          </div>
        )}
        <PageHeading
          label={bookingOnly ? "LET’S TALK" : "CLIENT WORKSPACE"}
          title={
            bookingOnly
              ? "Find time for your journey."
              : tab === "Overview"
                ? "Your arrival overview"
                : tab
          }
        >
          Your next steps, arrangements and decisions, together.
        </PageHeading>
        <p className="notice">
          Interactive prototype · Use fictional details only. Data stays in this
          browser; no secure login, agency delivery, real bookings or payments
          are connected.
        </p>
        <p role="status" className="save-message">
          {message}
        </p>
        {!ready ? (
          <p role="status">Loading your workspace…</p>
        ) : bookingOnly ? (
          booking
        ) : (
          <>
            {tab === "Overview" && (
              <>
                <div className="dashboard-overview">
                  <div className="portal-summary">
                    <div>
                      <FileCheck2 size={19} />
                      <span>Application</span>
                      <strong>
                        {items.length ? "Enquiry prepared" : "Not started"}
                      </strong>
                    </div>
                    <div>
                      <CheckCircle2 size={19} />
                      <span>Documents</span>
                      <strong>{state.documents.length}/3 complete</strong>
                    </div>
                    <div>
                      <Wallet size={19} />
                      <span>Quotation</span>
                      <strong>{state.quote}</strong>
                    </div>
                  </div>
                  <section className="detail-section">
                    <span className="dashboard-panel-label">
                      ACTION REQUIRED
                    </span>
                    <h2>Your next action</h2>
                    <p>
                      {items.length
                        ? "Complete your preparation checklist and review the sample quotation."
                        : "Prepare an enquiry so your requirements appear in this workspace."}
                    </p>
                    <p>
                      Responsible person: You · Coordinator: Sample arrival team
                    </p>
                    <Link className="button button-primary" href="/enquiry">
                      {items.length
                        ? "Prepare another enquiry"
                        : "Start your enquiry"}
                    </Link>
                  </section>
                  <section className="detail-section">
                    <h2>Arrival progress</h2>
                    <span className="dashboard-panel-label">
                      YOUR COORDINATED TIMELINE
                    </span>
                    <ol className="portal-timeline">
                      {[
                        "Consultation",
                        "Document preparation",
                        "Authority decision — not guaranteed",
                        "Flight details",
                        "Airport pickup",
                        "Accommodation",
                        "First appointment",
                        "Follow-up",
                      ].map((stage, i) => (
                        <li key={stage}>
                          <span>{String(i + 1).padStart(2, "0")}</span>
                          <div>
                            <strong>{stage}</strong>
                            <small>
                              {i === 0 && state.booking
                                ? `${state.booking.date} · ${state.booking.time} UTC+2 (sample)`
                                : "Awaiting agreed arrangements"}
                            </small>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </section>
                  <section className="detail-section">
                    <h2>
                      <Plane size={20} /> Travel arrangements
                    </h2>
                    <dl className="review-list">
                      <div>
                        <dt>Airport transfer</dt>
                        <dd>
                          Not booked · Driver and pickup details appear after
                          confirmation.
                        </dd>
                      </div>
                      <div>
                        <dt>Accommodation</dt>
                        <dd>
                          Not booked · Property, address and check-in details
                          pending.
                        </dd>
                      </div>
                      <div>
                        <dt>Important dates</dt>
                        <dd>
                          {state.booking
                            ? `Sample consultation: ${state.booking.date}, ${state.booking.time} UTC+2`
                            : "Reserve a consultation to begin."}
                        </dd>
                      </div>
                    </dl>
                  </section>
                </div>
              </>
            )}
            {tab === "Documents" && (
              <section className="detail-section">
                <h2>
                  <FileCheck2 size={22} /> Preparation checklist
                </h2>
                <p>
                  Mark sample tasks complete. No documents are uploaded; secure
                  file storage belongs to the live version.
                </p>
                {(
                  [
                    "Travel preparation checklist",
                    "Accommodation preferences",
                    "Arrival details",
                  ] as const
                ).map((item) => (
                  <label className="portal-check" key={item}>
                    <input
                      type="checkbox"
                      checked={state.documents.includes(item)}
                      onChange={(e) =>
                        commit(
                          {
                            ...state,
                            documents: e.target.checked
                              ? [...state.documents, item]
                              : state.documents.filter((d) => d !== item),
                          },
                          "Checklist saved.",
                        )
                      }
                    />
                    <span>{item}</span>
                    <small>
                      {state.documents.includes(item)
                        ? "Complete"
                        : "Required from you"}
                    </small>
                  </label>
                ))}
              </section>
            )}
            {tab === "Consultation" && booking}
            {tab === "Quotation" && (
              <section className="detail-section">
                <h2>Sample arrival quotation</h2>
                <p>
                  WN-SAMPLE-001 · Illustrative pricing, not an agency offer.
                  Currency: NAD.
                </p>
                <dl className="review-list">
                  <div>
                    <dt>Consultation & document guidance</dt>
                    <dd>N$ 750</dd>
                  </div>
                  <div>
                    <dt>Arrival coordination</dt>
                    <dd>N$ 1,250</dd>
                  </div>
                  <div>
                    <dt>Airport transfer · supplier estimate</dt>
                    <dd>N$ 450</dd>
                  </div>
                  <div>
                    <dt>Sample total</dt>
                    <dd>
                      <strong>N$ 2,450</strong>
                    </dd>
                  </div>
                </dl>
                <div className="detail-columns">
                  <section>
                    <h2>Included</h2>
                    <p>
                      One consultation, preparation checklist, one review,
                      arrival coordination and one illustrative airport
                      transfer.
                    </p>
                  </section>
                  <section>
                    <h2>Not included</h2>
                    <p>
                      Government fees, flights, accommodation, treatment,
                      insurance and unagreed changes. No permit or booking
                      guarantee.
                    </p>
                  </section>
                  <section>
                    <h2>Before proceeding</h2>
                    <p>
                      Sample only; validity, tax treatment, supplier
                      availability and cancellation terms require an
                      agency-issued quote.
                    </p>
                  </section>
                </div>
                <p>
                  Status: <strong>{state.quote}</strong>
                </p>
                {state.quote === "Pending" ? (
                  <>
                    <label className="checkbox-field">
                      <input
                        type="checkbox"
                        checked={agree}
                        onChange={(e) => setAgree(e.target.checked)}
                      />
                      I have reviewed the scope and understand this is a
                      non-binding sample.
                    </label>
                    <div className="portal-actions">
                      <button
                        className="button button-primary"
                        disabled={!agree}
                        onClick={() =>
                          commit(
                            { ...state, quote: "Accepted" },
                            "Sample quotation accepted. No contract, charge or booking was created.",
                          )
                        }
                      >
                        Accept sample quote
                      </button>
                      <button
                        className="button button-secondary"
                        onClick={() =>
                          commit(
                            { ...state, quote: "Changes requested" },
                            "Change request recorded locally. The agency has not been notified.",
                          )
                        }
                      >
                        Request changes
                      </button>
                    </div>
                  </>
                ) : (
                  <button
                    className="text-link"
                    onClick={() => {
                      setAgree(false);
                      commit(
                        { ...state, quote: "Pending" },
                        "Sample quotation reset for review.",
                      );
                    }}
                  >
                    Reopen sample quote
                  </button>
                )}
              </section>
            )}
            {tab === "Payment plan" && (
              <section className="detail-section dashboard-feature-area">
                <span className="dashboard-panel-label">STAGED PAYMENT OPTION</span>
                <h2>Plan payments around your journey</h2>
                <p>Build an illustrative lay-by plan for an agreed quotation. This prototype does not collect money or approve a payment plan.</p>
                <div className="layby-mini-summary"><div><span>Plan status</span><strong>Not requested</strong></div><div><span>Sample quote</span><strong>N$ 2,450</strong></div><div><span>Payment provider</span><strong>To be confirmed</strong></div></div>
                <div className="portal-actions"><Link className="button button-primary" href="/lay-by">Open payment planner <ArrowRight size={16}/></Link><span className="feature-status">Terms, fees and refund rules require agency confirmation.</span></div>
              </section>
            )}
            {tab === "Updates" && (
              <section className="detail-section">
                <h2>
                  <CheckCircle2 size={22} /> Your activity
                </h2>
                {items.length ? (
                  items.map((item) => (
                    <article className="portal-update" key={item.reference}>
                      <strong>
                        {item.reference} · {item.name}
                      </strong>
                      <p>
                        {state.delivered.includes(item.reference)
                          ? "Simulated delivery and acknowledgement ready. No email was sent."
                          : "Enquiry prepared · Awaiting simulated delivery"}
                      </p>
                      <details>
                        <summary>View request</summary>
                        <pre className="request-copy">{item.summary}</pre>
                      </details>
                      {!state.delivered.includes(item.reference) && (
                        <button
                          className="button button-secondary"
                          onClick={() =>
                            commit(
                              {
                                ...state,
                                delivered: [...state.delivered, item.reference],
                              },
                              `Sample acknowledgement: We have received request ${item.reference} in this prototype. No real email was sent.`,
                            )
                          }
                        >
                          Simulate delivery & acknowledgement
                        </button>
                      )}
                    </article>
                  ))
                ) : (
                  <p>
                    No enquiries yet.{" "}
                    <Link href="/enquiry">Prepare your first request</Link>.
                  </p>
                )}
                <p>
                  Consultation:{" "}
                  {state.booking
                    ? `${state.booking.date} at ${state.booking.time} UTC+2 (sample)`
                    : "Not reserved"}
                </p>
                <p>
                  Quote: {state.quote} · Checklist: {state.documents.length}/3
                  complete
                </p>
              </section>
            )}
            {tab === "Travel hub" && (
              <section className="detail-section dashboard-feature-area">
                <span className="dashboard-panel-label">YOUR TRAVEL KIT</span>
                <h2>Everything for your arrival</h2>
                <p>Keep the practical details together. These are sample workspace tools for the presentation prototype.</p>
                <div className="feature-tool-grid">
                  {[
                    ["Flight & itinerary", "Add flight numbers, connections and arrival times."],
                    ["Airport pickup", "See driver, vehicle, meeting point and contact details."],
                    ["Accommodation", "Keep address, check-in, room and booking references together."],
                    ["First appointment", "Track clinic, office or institution details and reminders."],
                    ["Family & companions", "Plan traveller profiles, companions and shared requirements."],
                    ["Local arrival guide", "SIM cards, currency, transport, safety and first-week setup."],
                    ["Saved destinations", "Keep places you may want to visit on your route."],
                    ["Download arrival pack", travelPack ? "Sample pack prepared on this device." : "Create a printable summary of your current plan."],
                  ].map(([title, copy]) => <div className="feature-tool" key={title}><h3>{title}</h3><p>{copy}</p>{title === "Download arrival pack" ? <button className="text-link" onClick={() => setTravelPack(true)}>{travelPack ? "Pack ready" : "Prepare pack"} <ArrowRight size={14}/></button> : title === "Saved destinations" ? <button className="text-link" onClick={() => setSavedPlace(!savedPlace)}>{savedPlace ? "Saved locally" : "Save sample place"} <ArrowRight size={14}/></button> : <span className="feature-status">Available after confirmation</span>}</div>)}
                </div>
              </section>
            )}
            {tab === "Support & account" && (
              <section className="detail-section dashboard-feature-area">
                <span className="dashboard-panel-label">HELP WHEN YOU NEED IT</span>
                <h2>Support, preferences & privacy</h2>
                <p>One place for communication preferences, questions and control over your sample workspace.</p>
                <div className="dashboard-interactive-grid">
                  <div className="feature-tool feature-wide"><h3>Secure messages</h3><p>Send a sample message to your coordinator.</p><div className="message-list">{messages.map((item,index)=><div key={index}><strong>You</strong><span>{item}</span></div>)}{!messages.length && <span className="feature-status">No messages yet</span>}</div><form className="inline-form" onSubmit={e=>{e.preventDefault();if(chat.trim()){setMessages([...messages,chat.trim()]);setChat("");setMessage("Sample message saved locally. No message was sent.")}}}><input aria-label="Message your coordinator" value={chat} onChange={e=>setChat(e.target.value)} placeholder="Write a message"/><button className="button button-primary">Send</button></form></div>
                  <div className="feature-tool"><h3>Support requests</h3><p>Open a sample support ticket for the arrival team.</p>{ticket?<><strong>{ticket}</strong><span className="feature-status">Open · saved locally</span></>:<form onSubmit={e=>{e.preventDefault();if(support.trim()){setTicket(support.trim());setMessage("Sample support request opened locally.")}}}><input className="feature-input" aria-label="Support request" value={support} onChange={e=>setSupport(e.target.value)} placeholder="What do you need help with?"/><button className="text-link">Open request <ArrowRight size={14}/></button></form>}</div>
                  <div className="feature-tool"><h3>Reminders & notifications</h3><p>Choose how sample updates should reach you.</p><label className="mini-check"><input type="checkbox" checked={emailAlerts} onChange={e=>setEmailAlerts(e.target.checked)}/> Email reminders</label><label className="mini-check"><input type="checkbox" checked={whatsappAlerts} onChange={e=>setWhatsappAlerts(e.target.checked)}/> WhatsApp reminders</label><span className="feature-status">Preferences saved locally</span></div>
                  <div className="feature-tool"><h3>Accessibility & language</h3><p>Save practical preferences for your plan.</p><label className="form-field"><span>Language</span><select value={language} onChange={e=>setLanguage(e.target.value)}><option>English</option><option>German</option><option>Português</option></select></label><label className="form-field"><span>Access or dietary needs</span><input value={accessNeeds} onChange={e=>setAccessNeeds(e.target.value)} placeholder="Optional"/></label><button className="text-link" onClick={()=>{setProfileSaved(true);setMessage("Preferences saved locally.")}}>{profileSaved?"Preferences saved":"Save preferences"} <ArrowRight size={14}/></button></div>
                  <div className="feature-tool"><h3>Privacy controls</h3><p>Review what this prototype stores in your browser.</p><button className="text-link" onClick={()=>setMessage("In the live version, this control will request deletion of your client data.")}>Request data deletion <ArrowRight size={14}/></button><button className="text-link" onClick={()=>setMessage("Prototype data remains available for this presentation.")}>View stored data <ArrowRight size={14}/></button></div>
                  <div className="feature-tool"><h3>Feedback & help centre</h3><p>Find answers or tell the arrival team how this experience feels.</p><Link className="text-link" href="/contact">Open FAQs and contact options <ArrowRight size={14}/></Link></div>
                </div>
                <div className="portal-actions"><Link className="button button-secondary" href="/contact">Contact options <ArrowRight size={15}/></Link><Link className="text-link" href="/legal">Review privacy & terms →</Link></div>
              </section>
            )}
          </>
        )}
        <div className="portal-actions">
          <Link
            className="text-link"
            href={bookingOnly ? "/client" : "/booking"}
          >
            {bookingOnly ? "Open client workspace" : "Book a consultation"} →
          </Link>
          <Link className="text-link" href="/legal">
            Privacy & service terms →
          </Link>
        </div>
      </div>
      {!bookingOnly && (
        <aside className="dashboard-rail">
          <div className="dashboard-rail-heading">
            <CalendarDays size={19} />
            <h2>Coming up</h2>
          </div>
          <div className="dashboard-calendar">
            <span>CONSULTATION</span>
            <strong>{state.booking ? state.booking.date.slice(8) : "—"}</strong>
            <p>
              {state.booking ? state.booking.date.slice(0, 7) : "Choose a date"}
            </p>
          </div>
          <h3>
            {state.booking ? "Introductory call" : "Let’s plan your arrival"}
          </h3>
          <p>
            {state.booking
              ? state.booking.time + " · Windhoek (UTC+2) · Sample reservation"
              : "Reserve a 30-minute conversation to discuss your plans."}
          </p>
          <button
            className="button button-secondary"
            onClick={() => setTab("Consultation")}
          >
            {state.booking ? "Manage consultation" : "Choose a time"}{" "}
            <ArrowRight size={15} />
          </button>
          <div className="dashboard-coordinator">
            <div className="dashboard-avatar">AN</div>
            <strong>Arrival team</strong>
            <span>Sample coordinator</span>
            <Link href="/contact">Contact options →</Link>
          </div>
          <div className="dashboard-local">
            <MapPin size={19} />
            <h3>Namibia essentials</h3>
            <p>Discover regional guides and prepare for your first days.</p>
            <Link href="/destinations">Explore destinations →</Link>
          </div>
          <p className="dashboard-rail-note">
            No bookings or emails are sent. Use fictional details only.
          </p>
        </aside>
      )}
    </div>
  );
}

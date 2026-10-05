"use client";
import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  Check,
  FileText,
  Plane,
  LayoutDashboard,
  FolderOpen,
  CreditCard,
  Search,
  Bell,
  Menu,
  X,
  ChevronRight,
  Download,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/ui/brand-logo";
import {
  demoApplications,
  stages,
  type DemoApplication,
} from "@/lib/demo-data";
type Tab = "Overview" | "Applications" | "Documents" | "Transfers" | "Payments";
export function Portal({ admin = false }: { admin?: boolean }) {
  const [tab, setTab] = useState<Tab>("Overview");
  const [records, setRecords] = useState(demoApplications);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [menu, setMenu] = useState(false);
  const [notice, setNotice] = useState("");
  const [driver, setDriver] = useState("Not assigned");
  const [docStatus, setDocStatus] = useState("Awaiting review");
  const [invoice, setInvoice] = useState(false);
  const [selectedReference, setSelectedReference] = useState("");
  useEffect(() => {
    let active = true;
    setSelectedReference(
      localStorage.getItem("arrival-preview-reference") || "",
    );
    const load = async () => {
      try {
        const [requests, workspace] = await Promise.all([
          fetch("/api/demo/requests"),
          fetch("/api/demo/workspace"),
        ]);
        if (!requests.ok || !workspace.ok)
          throw new Error("The preview backend is unavailable.");
        const [saved, settings] = await Promise.all([
          requests.json(),
          workspace.json(),
        ]);
        if (active) {
          setRecords(saved.records);
          setDriver(settings.driver);
          setDocStatus(settings.document);
        }
      } catch (error) {
        if (active)
          setNotice(
            error instanceof Error
              ? error.message
              : "Unable to load saved requests.",
          );
      }
    };
    void load();
    const timer = setInterval(() => void load(), 10000);
    return () => {
      active = false;
      clearInterval(timer);
    };
  }, []);
  const update = async (id: string, status: string) => {
    try {
      const response = await fetch("/api/demo/requests", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      setRecords((current) =>
        current.map((record) => (record.id === id ? result.record : record)),
      );
      setNotice("Sample status saved. Email and SMS are not connected.");
    } catch {
      setNotice("The status could not be saved. Please try again.");
    }
  };
  const saveWorkspace = async (key: "driver" | "document", value: string) => {
    try {
      const response = await fetch("/api/demo/workspace", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, value }),
      });
      if (!response.ok) throw new Error();
      if (key === "driver") setDriver(value);
      else setDocStatus(value);
      setNotice("Sample workspace updated. No notifications were sent.");
    } catch {
      setNotice("The update could not be saved. Please try again.");
    }
  };
  const client =
    records.find((record) => record.id === selectedReference) ||
    records.find((record) => record.id === "DEMO-001") ||
    records[0];
  const stage = Math.max(0, stages.indexOf(client.status));
  const rows = records.filter(
    (r) =>
      (filter === "All" || r.status === filter) &&
      `${r.id} ${r.client} ${r.service}`
        .toLowerCase()
        .includes(search.toLowerCase()),
  );
  const nav = [
    { name: "Overview", icon: LayoutDashboard },
    { name: "Applications", icon: FileText },
    { name: "Documents", icon: FolderOpen },
    { name: "Transfers", icon: Plane },
    { name: "Payments", icon: CreditCard },
  ] as const;
  return (
    <div className="portal-shell">
      <aside className={`portal-sidebar ${menu ? "show" : ""}`}>
        <BrandLogo />
        <div className="portal-role">
          {admin ? "AGENCY WORKSPACE" : "YOUR TRAVEL SPACE"}
        </div>
        <nav>
          {nav.map((n) => (
            <button
              className={tab === n.name ? "selected" : ""}
              onClick={() => {
                setTab(n.name);
                setMenu(false);
              }}
              key={n.name}
            >
              <n.icon size={18} />
              {n.name}
              {n.name === "Applications" && (
                <span>{admin ? records.length : 1}</span>
              )}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <span className="demo-pill">Sample data</span>
          <p>Shared preview. Use fictional details only.</p>
          <Link href={admin ? "/client" : "/admin"}>
            {admin ? "Preview client portal" : "Preview agency portal"}
            <ArrowUpRight size={13} />
          </Link>
          <Link href="/">
            Back to website <ArrowRight size={13} />
          </Link>
        </div>
      </aside>
      {menu && (
        <button
          className="sidebar-scrim"
          onClick={() => setMenu(false)}
          aria-label="Close navigation"
        />
      )}
      <div className="portal-main">
        <header className="portal-header">
          <div>
            <button
              className="portal-menu"
              onClick={() => setMenu(!menu)}
              aria-label="Open portal navigation"
            >
              <Menu size={20} />
            </button>
            <span>
              {admin ? "Agency" : "Client"} portal <ChevronRight size={13} />{" "}
              {tab}
            </span>
          </div>
          <div>
            <span className="portal-demo-label">SAVED DEMO</span>
            <button
              onClick={() =>
                setNotice(
                  "There are no new notifications in this sample workspace.",
                )
              }
              aria-label="View notifications"
            >
              <Bell size={18} />
            </button>
            <span className="portal-avatar">{admin ? "AN" : "SC"}</span>
          </div>
        </header>
        <main className="portal-content">
          <div className="portal-title">
            <div>
              <span className="portal-eyebrow">
                {admin ? "EVERY JOURNEY, ORGANISED" : "YOUR NEXT CHAPTER"}
              </span>
              <h1>
                {tab === "Overview"
                  ? admin
                    ? "A clear view of the day."
                    : "Your journey, in one place."
                  : tab}
              </h1>
              <p>
                {admin
                  ? "Manage sample enquiries, documents and arrival arrangements."
                  : "Follow the practical steps around your planned visit to Namibia."}
              </p>
            </div>
            <Link href="/" className="pill-button dark-button">
              {admin ? "View website" : "Make a new enquiry"}
              <ArrowUpRight size={15} />
            </Link>
          </div>
          {notice && (
            <div className="portal-notice" role="status">
              {notice}
              <button
                onClick={() => setNotice("")}
                aria-label="Dismiss message"
              >
                <X size={15} />
              </button>
            </div>
          )}
          {tab === "Overview" && (
            <>
              <div className="metric-grid">
                {(admin
                  ? [
                      {
                        label: "Active requests",
                        value: String(records.length).padStart(2, "0"),
                        note: "Saved sample requests",
                      },
                      {
                        label: "Needs attention",
                        value: "02",
                        note: "Review and documents",
                      },
                      {
                        label: "Sample service total",
                        value: "N$8,400",
                        note: "Illustrative, not revenue",
                      },
                      {
                        label: "Upcoming transfers",
                        value: "01",
                        note: "Sample booking",
                      },
                    ]
                  : [
                      {
                        label: "Your request",
                        value: "01",
                        note: "Study permit support",
                      },
                      {
                        label: "Preparation stage",
                        value: client.status,
                        note: "Sample consultant update",
                      },
                      {
                        label: "Your next arrival",
                        value: "18 Jan",
                        note: "Sample date · 2027",
                      },
                      {
                        label: "Documents",
                        value: "03",
                        note: "Illustrative checklist",
                      },
                    ]
                ).map((m) => (
                  <div className="metric-card" key={m.label}>
                    <span>{m.label}</span>
                    <b>{m.value}</b>
                    <small>{m.note}</small>
                  </div>
                ))}
              </div>
              {admin ? (
                <>
                  <div className="portal-section-head">
                    <h2>Recent requests</h2>
                    <button onClick={() => setTab("Applications")}>
                      View all <ArrowRight size={14} />
                    </button>
                  </div>
                  <RequestsTable rows={records} admin={admin} update={update} />
                  <div className="portal-two">
                    <div className="portal-card">
                      <span className="card-eyebrow">TODAY’S PRIORITY</span>
                      <h2>Review a document.</h2>
                      <p>
                        Sample client A has a document waiting for review. Keep
                        the next step clear.
                      </p>
                      <Button
                        className="outline-button"
                        onClick={() => setTab("Documents")}
                      >
                        Open document queue <ArrowRight size={15} />
                      </Button>
                    </div>
                    <div className="portal-card dark-portal-card">
                      <span className="card-eyebrow">ARRIVAL DESK</span>
                      <h2>One transfer to coordinate.</h2>
                      <p>
                        Confirm the pick-up details and assign a sample driver
                        for the interface demo.
                      </p>
                      <Button onClick={() => setTab("Transfers")}>
                        Open dispatch <ArrowRight size={15} />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="portal-two client-overview">
                    <div className="portal-card">
                      <div className="portal-card-top">
                        <span className="card-eyebrow">
                          YOUR APPLICATION / {client.id}
                        </span>
                        <span className="status-pill">{client.status}</span>
                      </div>
                      <h2>{client.service}</h2>
                      <p>
                        Your sample request and the latest saved review status.
                      </p>
                      <div className="application-timeline">
                        {stages.map((s, i) => (
                          <div className={i <= stage ? "done" : ""} key={s}>
                            <b>{i < stage ? <Check size={14} /> : i + 1}</b>
                            <span>{s}</span>
                            <small>
                              {client.events?.find(
                                (event) => event.status === s,
                              )
                                ? new Date(
                                    client.events.find(
                                      (event) => event.status === s,
                                    )!.at,
                                  ).toLocaleString()
                                : i <= stage && !client.createdAt
                                  ? "12 Jan 2027"
                                  : "Awaiting update"}
                            </small>
                          </div>
                        ))}
                      </div>
                      <div className="consultant-note">
                        <FileText size={19} />
                        <p>
                          <b>Sample consultant note</b>We are reviewing the
                          preparation documents. The final checklist must be
                          confirmed for your application.
                        </p>
                      </div>
                    </div>
                    <div className="portal-card arrival-card">
                      <div className="arrival-map">
                        <Plane size={23} />
                        <span className="map-path" />
                        <MapPin size={27} />
                        <small>AIRPORT</small>
                        <b>WINDHOEK</b>
                      </div>
                      <span className="card-eyebrow">SAMPLE ARRIVAL</span>
                      <h2>Your first ride.</h2>
                      <p>
                        Hosea Kutako Airport to Windhoek.
                        <br />
                        18 January 2027 · 14:30
                      </p>
                      <Button
                        className="outline-button"
                        onClick={() => setTab("Transfers")}
                      >
                        View transfer details <ArrowRight size={15} />
                      </Button>
                    </div>
                  </div>
                  <div className="portal-section-head">
                    <h2>Next practical steps</h2>
                  </div>
                  <div className="next-step-grid">
                    <button onClick={() => setTab("Documents")}>
                      <FolderOpen size={24} />
                      <div>
                        <b>Review your documents</b>
                        <span>Keep the preparation details together.</span>
                      </div>
                      <ArrowUpRight size={19} />
                    </button>
                    <button onClick={() => setTab("Payments")}>
                      <CreditCard size={24} />
                      <div>
                        <b>View sample invoice</b>
                        <span>Understand the planned payment view.</span>
                      </div>
                      <ArrowUpRight size={19} />
                    </button>
                  </div>
                </>
              )}
            </>
          )}
          {tab === "Applications" && (
            <>
              <div className="portal-toolbar">
                <div className="portal-search">
                  <Search size={16} />
                  <input
                    placeholder="Search requests"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <select
                  aria-label="Filter applications"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  {[
                    "All",
                    "Submitted",
                    "Under review",
                    "Documents needed",
                    "Submitted to authority",
                    "Decision recorded",
                    "Confirmed",
                  ].map((f) => (
                    <option key={f}>{f}</option>
                  ))}
                </select>
              </div>
              <RequestsTable
                rows={admin ? rows : rows.filter((r) => r.id === client.id)}
                admin={admin}
                update={update}
              />
            </>
          )}
          {tab === "Documents" && (
            <div className="portal-card">
              <div className="portal-card-top">
                <div>
                  <span className="card-eyebrow">DOCUMENT VAULT PREVIEW</span>
                  <h2>{admin ? "Review queue" : "Preparation documents"}</h2>
                </div>
                <span className="status-pill">Names only · no real files</span>
              </div>
              <p>
                These fictional records show the verification workflow. No
                passport or medical record has been uploaded.
              </p>
              {[
                "Sample passport.pdf",
                "Sample enrolment letter.pdf",
                "Sample funding details.pdf",
              ].map((f, i) => (
                <div className="vault-row" key={f}>
                  <span className="vault-icon">
                    <FileText size={20} />
                  </span>
                  <div>
                    <b>{f}</b>
                    <span>DEMO-001 · sample record</span>
                  </div>
                  <span className="status-pill">
                    {i === 0 ? docStatus : "Preparation item"}
                  </span>
                  {admin ? (
                    <select
                      aria-label={`Verification status for ${f}`}
                      onChange={(e) =>
                        void saveWorkspace("document", e.target.value)
                      }
                    >
                      <option>Awaiting review</option>
                      <option>Verified</option>
                      <option>Needs correction</option>
                    </select>
                  ) : (
                    <button
                      onClick={() =>
                        setNotice(
                          "This sample record has no downloadable document.",
                        )
                      }
                      aria-label={`View ${f}`}
                    >
                      <ArrowUpRight size={17} />
                    </button>
                  )}
                </div>
              ))}
              <div className="portal-note">
                Production documents will require protected access, confirmed
                retention rules and a secure upload service.
              </div>
            </div>
          )}
          {tab === "Transfers" && (
            <div className="portal-two">
              <div className="portal-card">
                <span className="card-eyebrow">TRANSFER / DEMO-T01</span>
                <h2>Airport to your first stay.</h2>
                <p>Illustrative booking details for the client demo.</p>
                <dl className="transfer-dl">
                  <div>
                    <dt>Pick-up</dt>
                    <dd>Hosea Kutako International Airport</dd>
                  </div>
                  <div>
                    <dt>Drop-off</dt>
                    <dd>Sample stay · Windhoek</dd>
                  </div>
                  <div>
                    <dt>Date & time</dt>
                    <dd>18 January 2027 · 14:30</dd>
                  </div>
                  <div>
                    <dt>Flight</dt>
                    <dd>Sample flight · to confirm</dd>
                  </div>
                  <div>
                    <dt>Passengers</dt>
                    <dd>2 · Economy class</dd>
                  </div>
                  <div>
                    <dt>Driver</dt>
                    <dd>{driver}</dd>
                  </div>
                </dl>
                {admin ? (
                  <label className="dispatch-label">
                    Assign sample driver
                    <select
                      value={driver}
                      onChange={(e) =>
                        void saveWorkspace("driver", e.target.value)
                      }
                    >
                      <option>Not assigned</option>
                      <option>Sample driver A · vehicle DEMO-01</option>
                      <option>Sample driver B · vehicle DEMO-02</option>
                    </select>
                  </label>
                ) : (
                  <div className="portal-note">
                    Driver details and a route link will be available after the
                    provider confirms the booking.
                  </div>
                )}
              </div>
              <div className="portal-card arrival-card">
                <div className="arrival-map large">
                  <Plane size={28} />
                  <span className="map-path" />
                  <MapPin size={32} />
                  <small>AIRPORT</small>
                  <b>WINDHOEK</b>
                </div>
                <h2>Arrival route preview</h2>
                <p>
                  This illustration shows the planned route view. It is not live
                  driver tracking.
                </p>
                <a
                  className="pill-button outline-button"
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.google.com/maps/dir/Hosea+Kutako+International+Airport/Windhoek/"
                >
                  View general route <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
          )}
          {tab === "Payments" && (
            <>
              <div className="portal-card">
                <span className="card-eyebrow">PAYMENTS PREVIEW</span>
                <h2>
                  {admin
                    ? "Sample payment activity"
                    : "Invoices & service fees"}
                </h2>
                <p>
                  Illustrative amounts only. No payment processor is connected.
                </p>
                <div className="table-scroll">
                  <table className="portal-table">
                    <thead>
                      <tr>
                        <th>Invoice</th>
                        <th>Service</th>
                        <th>Sample fee</th>
                        <th>Status</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {(admin ? records : [client]).map((r) => (
                        <tr key={r.id}>
                          <td>INV-{r.id}</td>
                          <td>{r.service}</td>
                          <td>
                            {r.amount
                              ? `N$${r.amount.toLocaleString()}`
                              : "To quote"}
                          </td>
                          <td>
                            <span className="status-pill">
                              {r.amount
                                ? "Sample · unpaid"
                                : "Awaiting quotation"}
                            </span>
                          </td>
                          <td>
                            <button
                              disabled={!r.amount}
                              onClick={() => setInvoice(true)}
                            >
                              View <ArrowUpRight size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {invoice && (
                <div className="portal-card invoice-card">
                  <div className="portal-card-top">
                    <h2>Sample invoice</h2>
                    <button
                      onClick={() => setInvoice(false)}
                      aria-label="Close invoice"
                    >
                      <X size={18} />
                    </button>
                  </div>
                  <span className="demo-pill">NOT PAYABLE · UI SAMPLE</span>
                  <dl className="transfer-dl">
                    <div>
                      <dt>Reference</dt>
                      <dd>INV-DEMO-001</dd>
                    </div>
                    <div>
                      <dt>Client</dt>
                      <dd>Sample client A</dd>
                    </div>
                    <div>
                      <dt>Illustrative service fee</dt>
                      <dd>N$2,400</dd>
                    </div>
                    <div>
                      <dt>Government & supplier fees</dt>
                      <dd>Excluded · to confirm</dd>
                    </div>
                  </dl>
                  <Button
                    className="outline-button"
                    onClick={() => window.print()}
                  >
                    <Download size={15} />
                    Print sample invoice
                  </Button>
                </div>
              )}
            </>
          )}
          <footer className="portal-footer">
            Sample workspace · No real applications, payments or sensitive
            documents.<span>Welcome Namibia Services</span>
          </footer>
        </main>
      </div>
    </div>
  );
}
function RequestsTable({
  rows,
  admin,
  update,
}: {
  rows: DemoApplication[];
  admin: boolean;
  update: (id: string, status: string) => void;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);
  return (
    <div className="table-scroll">
      <table className="portal-table">
        <thead>
          <tr>
            <th>Reference</th>
            {admin && <th>Client</th>}
            <th>Service</th>
            <th>Date</th>
            <th>Status</th>
            {admin && <th>Update</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <Fragment key={r.id}>
              <tr>
                <td>
                  {r.enquiry ? (
                    <button
                      className="request-reference"
                      aria-expanded={expanded === r.id}
                      onClick={() =>
                        setExpanded(expanded === r.id ? null : r.id)
                      }
                    >
                      {r.id} <ChevronRight size={13} />
                    </button>
                  ) : (
                    <b>{r.id}</b>
                  )}
                </td>
                {admin && <td>{r.client}</td>}
                <td>{r.service}</td>
                <td>{r.date}</td>
                <td>
                  <span className="status-pill">{r.status}</span>
                </td>
                {admin && (
                  <td>
                    <select
                      aria-label={`Update ${r.id}`}
                      value={r.status}
                      onChange={(e) => update(r.id, e.target.value)}
                    >
                      {[
                        "Submitted",
                        "Documents needed",
                        "Under review",
                        "Submitted to authority",
                        "Decision recorded",
                        "Confirmed",
                      ].map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                )}
              </tr>
              {expanded === r.id && r.enquiry && (
                <tr>
                  <td colSpan={admin ? 6 : 4}>
                    <div className="enquiry-summary">
                      <div>
                        <span>Contact</span>
                        <b>{r.enquiry.personal.name}</b>
                        <p>
                          {r.enquiry.personal.email}
                          <br />
                          {r.enquiry.personal.nationality}
                          {r.enquiry.personal.phone
                            ? ` · ${r.enquiry.personal.phone}`
                            : ""}
                        </p>
                      </div>
                      <div>
                        <span>Visit details</span>
                        {Object.entries(r.enquiry.details).map(
                          ([key, value]) =>
                            value && (
                              <p key={key}>
                                <b>{key}: </b>
                                {value}
                              </p>
                            ),
                        )}
                        <p>Package: {r.enquiry.package || "To discuss"}</p>
                      </div>
                      <div>
                        <span>Document names only</span>
                        <p>
                          {r.enquiry.documents.join(", ") || "None selected"}
                        </p>
                      </div>
                      <div>
                        <span>Saved history</span>
                        {r.events?.map((event, index) => (
                          <p key={index}>
                            {event.status} ·{" "}
                            {new Date(event.at).toLocaleString()}
                          </p>
                        ))}
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </Fragment>
          ))}
          {!rows.length && (
            <tr>
              <td colSpan={admin ? 6 : 4}>No matching sample requests.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

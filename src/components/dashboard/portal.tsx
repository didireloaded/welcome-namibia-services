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
  MapPin,
} from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge, badgeTone } from "@/components/ui/badge";
import { Table } from "@/components/ui/table";
import { EmptyState } from "@/components/ui/empty-state";
import { BrandLogo } from "@/components/ui/brand-logo";
import { exampleCases, type ApplicationRecord } from "@/lib/example-data";
import { addJourneyMessage, currentReference, messagesFor, notificationPreferences, saveNotificationPreferences, snapshot, subscribe, updateLocalStatus, updateLocalWorkspace, type JourneyMessage } from "@/lib/browser-store";
type Tab = "Overview" | "Applications" | "Documents" | "Transfers" | "Payments";
export function Portal({ admin = false }: { admin?: boolean }) {
  const [tab, setTab] = useState<Tab>("Overview");
  const [records, setRecords] = useState(exampleCases);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [menu, setMenu] = useState(false);
  const [notice, setNotice] = useState("");
  const [driver, setDriver] = useState("Not assigned");
  const [docStatus, setDocStatus] = useState("Awaiting review");
  const [selectedReference, setSelectedReference] = useState("");
  const [thread,setThread]=useState<JourneyMessage[]>([]);
  const [messageText,setMessageText]=useState("");
  const [showPreferences,setShowPreferences]=useState(false);
  const [preferences,setPreferences]=useState({email:true,whatsapp:false,sms:false});
  useEffect(() => {
    const load = () => {
      const saved = snapshot();
      setRecords(saved.records);
      setDriver(saved.workspace.driver);
      setDocStatus(saved.workspace.document);
      setSelectedReference(currentReference());
      const reference=currentReference();
      setThread(reference?messagesFor(reference):[]);
      setPreferences(notificationPreferences());
    };
    load();
    return subscribe(load);
  }, []);
  useEffect(()=>{if(showPreferences)setPreferences(notificationPreferences());},[showPreferences]);
  const update = (id: string, status: string) => {
    try {
      updateLocalStatus(id, status);
      setRecords((current) =>
        current.map((record) => (record.id === id ? { ...record, status, updatedAt:new Date().toISOString() } : record)),
      );
      setNotice("Status saved on this device. Client messages are not sent.");
    } catch {
      setNotice("The status could not be saved. Please try again.");
    }
  };
  const saveWorkspace = (key: "driver" | "document", value: string) => {
    try {
      updateLocalWorkspace(key, value);
      if (key === "driver") setDriver(value);
      else setDocStatus(value);
      setNotice("Saved on this device. No notifications were sent.");
    } catch {
      setNotice("The update could not be saved. Please try again.");
    }
  };
  const client =
    records.find((record) => record.id === selectedReference) ||
    records[0];
  const journeyStages=client.service.toLowerCase().includes("transfer")?["Enquiry saved","Provider details checked","Pick-up confirmed","Journey complete"]:client.service.toLowerCase().includes("medical")?["Enquiry saved","Travel needs reviewed","Visit coordination","Visit complete"]:client.service.toLowerCase().includes("connectivity")?["Enquiry saved","Device compatibility","Plan confirmed","Ready to connect"]:client.service.toLowerCase().includes("stay")||client.service.toLowerCase().includes("vacation")?["Enquiry saved","Availability checked","Options shared","Booking confirmed"]:["Enquiry saved","Agency review","Submitted to authority","Decision recorded"];
  const stage=client.status==="Documents needed"?1:client.status==="Confirmed"?3:Math.max(0,["Submitted","Under review","Submitted to authority","Decision recorded"].indexOf(client.status));
  const sendMessage=()=>{try{addJourneyMessage(client.id,messageText,admin?"agency":"traveller");setMessageText("");setNotice("Message saved on this device. No email or WhatsApp message was sent.");}catch{setNotice("Message could not be saved. Please try again.");}};
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
          <span className="example-pill">Example cases</span>
          <p>Live requests stay in this browser.</p>
          <Link href={admin ? "/client" : "/admin"}>
            {admin ? "Open client view" : "Open agency view"}
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
            <span className="device-storage-label">ON THIS DEVICE</span>
            <button
              onClick={() => setShowPreferences((value)=>!value)}
              aria-label="Notification preferences"
            >
              <Bell size={18} />
            </button>
            <span className="portal-avatar">{admin ? "AN" : "SC"}</span>
          </div>
        </header>
        {showPreferences&&<div className="portal-notice preferences-panel"><b>Update preferences</b><span>Choose how this device records your preference. Sending updates needs a connected service.</span>{(["email","whatsapp","sms"] as const).map((channel)=><label key={channel}><input type="checkbox" checked={preferences[channel]} onChange={(event)=>{const next={...preferences,[channel]:event.target.checked};setPreferences(next);saveNotificationPreferences(next);}} />{channel === "whatsapp" ? "WhatsApp" : channel[0].toUpperCase()+channel.slice(1)}</label>)}</div>}
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
                  ? "Manage enquiries, document preparation and arrival arrangements."
                  : "Follow the practical steps around your planned visit to Namibia."}
              </p>
            </div>
            <ButtonLink href="/">
              {admin ? "View website" : "Make a new enquiry"}
              <ArrowUpRight size={15} />
            </ButtonLink>
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
                        label: "Requests on this device",
                        value: String(records.length).padStart(2, "0"),
                        note: "Example and current enquiries",
                      },
                      {
                        label: "Needs attention",
                        value: String(records.filter((record)=>record.status==="Documents needed"||record.status==="Submitted").length).padStart(2,"0"),
                        note: "Submitted or awaiting documents",
                      },
                      {
                        label: "Revenue",
                        value: "Not tracked",
                        note: "No payment service connected",
                      },
                      {
                        label: "Transfer enquiries",
                        value: String(records.filter((record)=>record.service.includes("transfer")).length).padStart(2,"0"),
                        note: "Enquiries, not confirmed bookings",
                      },
                    ]
                  : [
                      {
                        label: "Your request",
                        value: "01",
                        note: client.service,
                      },
                      {
                        label: "Preparation stage",
                        value: client.status,
                        note: "Latest saved status",
                      },
                      {
                        label: "Your next arrival",
                        value: "To confirm",
                        note: "No transfer booking confirmed",
                      },
                      {
                        label: "Documents",
                        value: "Checklist",
                        note: "Requirements confirmed after review",
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
                    <Card className="portal-card">
                      <span className="card-eyebrow">TODAY’S PRIORITY</span>
                      <h2>Review a document.</h2>
                      <p>
                        An example enquiry has a preparation item waiting for review. Keep
                        the next step clear.
                      </p>
                      <Button
                        className="outline-button"
                        onClick={() => setTab("Documents")}
                      >
                        Open document queue <ArrowRight size={15} />
                      </Button>
                    </Card>
                    <div className="portal-card dark-portal-card">
                      <span className="card-eyebrow">ARRIVAL DESK</span>
                      <h2>One transfer to coordinate.</h2>
                      <p>
                        Confirm the pick-up details and assign an example driver
                for this example enquiry.
                      </p>
                      <Button onClick={() => setTab("Transfers")}>
                        Open dispatch <ArrowRight size={15} />
                      </Button>
                    </div>
                  </div>
                  <div className="portal-card journey-messages">
                    <div className="portal-card-top"><div><span className="card-eyebrow">ENQUIRY / {client.id}</span><h2>Message thread</h2></div><span className="status-pill">Same browser only</span></div>
                    <p>Replies stay on this device and are not sent to the traveller. Do not enter passport or medical details.</p>
                    {thread.length>0?<div className="journey-thread">{thread.map((message)=><div className={`journey-message ${message.author}`} key={message.id}><b>{message.author==="agency"?"Agency workspace":"Traveller · example thread"}</b><p>{message.text}</p><small>{new Date(message.at).toLocaleString()}</small></div>)}</div>:<p className="helper-text">No messages yet for this example enquiry.</p>}
                    <label className="message-compose"><span>Message</span><textarea value={messageText} maxLength={1200} onChange={(event)=>setMessageText(event.target.value)} placeholder="Write a reply" /></label>
                    <Button onClick={sendMessage} disabled={!messageText.trim()}>Save reply</Button>
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
                        <Badge tone={badgeTone(client.status)}>
                          {client.status}
                        </Badge>
                      </div>
                      <h2>{client.service}</h2>
                      <p>
                        Your enquiry and its latest saved review status.
                      </p>
                      <div className="application-timeline">
                        {journeyStages.map((s, i) => (
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
                      <div className="portal-next"><b>What happens next</b><p>{client.status==="Documents needed"?"The agency needs additional information. Check the document preparation notes before sharing anything sensitive.":client.status==="Submitted to authority"?"Your file is with the relevant authority. Processing times depend on that authority; no action is needed unless the agency contacts you.":client.status==="Decision recorded"?"The agency will explain the decision and any next steps once it is confirmed.":"The agency will review your enquiry and confirm the requirements and service quote. No government application has been submitted."}</p></div>
                    </div>
                    <div className="portal-card arrival-card">
                      <div className="arrival-map">
                        <Plane size={23} />
                        <span className="map-path" />
                        <MapPin size={27} />
                        <small>AIRPORT</small>
                        <b>WINDHOEK</b>
                      </div>
                      <span className="card-eyebrow">EXAMPLE ARRIVAL</span>
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
                  <div className="portal-card journey-messages">
                    <div className="portal-card-top"><div><span className="card-eyebrow">YOUR JOURNEY</span><h2>Messages</h2></div><span className="status-pill">Saved on this device</span></div>
                    <p>Keep notes about this enquiry together. Messages are visible only in this browser and are not sent to the agency. Do not include passport numbers or medical details.</p>
                    {thread.length>0?<div className="journey-thread">{thread.map((message)=><div className={`journey-message ${message.author}`} key={message.id}><b>{message.author==="agency"?"Agency workspace":"You · example thread"}</b><p>{message.text}</p><small>{new Date(message.at).toLocaleString()}</small></div>)}</div>:<p className="helper-text">No messages yet. You can leave a note for this example journey.</p>}
                    <label className="message-compose"><span>Message</span><textarea value={messageText} maxLength={1200} onChange={(event)=>setMessageText(event.target.value)} placeholder="Write a note about your enquiry" /></label>
                    <Button onClick={sendMessage} disabled={!messageText.trim()}>Save message</Button>
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
                        <b>Review quotation status</b>
                        <span>No fee or payment is due in this prototype.</span>
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
                  <span className="card-eyebrow">DOCUMENT PREPARATION</span>
                  <h2>{admin ? "Review queue" : "Your selected documents"}</h2>
                </div>
                <span className="status-pill">Filenames only</span>
              </div>
              <p>Selected filenames are saved in this browser. File contents are not uploaded or stored.</p>
              {(() => {
                const documentRows = (admin ? records : [client]).flatMap((record) =>
                  (record.enquiry?.documents || []).map((name) => ({ name, reference: record.id })),
                );
                return documentRows.length ? documentRows.map(({ name, reference }) => (
                  <div className="vault-row" key={`${reference}-${name}`}>
                    <span className="vault-icon"><FileText size={20} /></span>
                    <div><b>{name}</b><span>{reference} · filename only</span></div>
                    {admin ? <select aria-label={`Review status for ${name}`} value={docStatus} onChange={(event) => void saveWorkspace("document", event.target.value)}><option>Awaiting review</option><option>Verified</option><option>Needs correction</option></select> : <span className="status-pill">Not uploaded</span>}
                  </div>
                )) : <EmptyState title="No filenames selected" description="This prototype does not upload or store file contents. A secure sharing option must be arranged before sending real documents." />;
              })()}
              <div className="portal-note">Do not enter passport or medical records in this prototype. Production document sharing requires protected access and a confirmed retention policy.</div>
            </div>
          )}
          {tab === "Transfers" && (
            <div className="portal-two">
              <div className="portal-card">
                <span className="card-eyebrow">TRAVEL ARRANGEMENTS / EXAMPLE</span>
                <h2>Airport to your first stay.</h2>
                <p>Example details only. No transfer has been booked.</p>
                <dl className="transfer-dl">
                  <div>
                    <dt>Pick-up</dt>
                    <dd>Hosea Kutako International Airport</dd>
                  </div>
                  <div>
                    <dt>Drop-off</dt>
                    <dd>Example stay · Windhoek</dd>
                  </div>
                  <div>
                    <dt>Date & time</dt>
                    <dd>18 January 2027 · 14:30</dd>
                  </div>
                  <div>
                    <dt>Flight</dt>
                    <dd>Example flight · to confirm</dd>
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
                    Assign example driver
                    <select
                      value={driver}
                      onChange={(e) =>
                        void saveWorkspace("driver", e.target.value)
                      }
                    >
                      <option>Not assigned</option>
                      <option>Example driver A · example vehicle</option>
                      <option>Example driver B · example vehicle</option>
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
                <h2>Arrival route</h2>
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
                <span className="card-eyebrow">PAYMENT INFORMATION</span>
                <h2>
                  {admin
                    ? "Payment overview"
                        : "Quotations & service fees"}
                </h2>
                <p>
                  No quote, invoice or payment is available yet. Agency, government and supplier charges are confirmed separately before any booking.
                </p>
                <Table>
                  <thead><tr><th>Enquiry</th><th>Service</th><th>Agency fee</th><th>Quote status</th></tr></thead>
                  <tbody>
                    {(admin ? records : [client]).map((record) => (
                      <tr key={record.id}>
                        <td>{record.id}</td>
                        <td>{record.service}</td>
                        <td>{record.amount ? `N$${record.amount.toLocaleString()}` : "To be quoted"}</td>
                        <td><span className="status-pill">{record.amount ? "Awaiting confirmation" : "Awaiting quotation"}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>

            </>
          )}
          <footer className="portal-footer">
            Example records are saved only in this browser. No requests, payments or notifications are sent.<span>Arrival Namibia</span>
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
  rows: ApplicationRecord[];
  admin: boolean;
  update: (id: string, status: string) => void;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);
  if (!rows.length) return <EmptyState title="No matching enquiries" description="Try another status or search term. New enquiries saved in this browser will appear here." />;
  return (
    <Table>
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
                  <Badge tone={badgeTone(r.status)}>{r.status}</Badge>
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
        </tbody>
      </Table>
  );
}

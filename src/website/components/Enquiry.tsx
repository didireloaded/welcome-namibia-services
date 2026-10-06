"use client";
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Download,
  Save,
  ShieldCheck,
  RotateCcw,
} from "lucide-react"
import { serviceCatalog } from "../data/services"
import { packages } from "../data/packages"
import { saveRequest } from "../data/requests"
import { PageHeading } from "./Layout"

type Draft = {
  services: string[]
  package: string
  destination: string
  date: string
  flexible: boolean
  travellers: string
  nationality: string
  status: string
  provider: string
  mobility: string
  flight: string
  dropoff: string
  device: string
  rooms: string
  budget: string
  requirements: string
  name: string
  email: string
  phone: string
  consent: boolean
}
const empty: Draft = {
  services: [],
  package: "",
  destination: "",
  date: "",
  flexible: false,
  travellers: "1",
  nationality: "",
  status: "",
  provider: "",
  mobility: "",
  flight: "",
  dropoff: "",
  device: "",
  rooms: "",
  budget: "",
  requirements: "",
  name: "",
  email: "",
  phone: "",
  consent: false,
}
const storageKey = "welcome-namibia-enquiry-v1"

export default function Enquiry() {
  const params = useSearchParams()
  const pathname = usePathname()
  const custom = pathname === "/packages/build"
  const consultation = params.get("mode") === "consultation"
  const [resuming, setResuming] = useState(false)
  const [storageOK, setStorageOK] = useState(true)
  const [draft, setDraft] = useState<Draft>(() => {
    const initial = {
      ...empty,
      services: params.get("service") ? [params.get("service")!] : [],
      package: params.get("package") || "",
      destination: params.get("destination") || "",
    }
    return initial
  })
  const [step, setStep] = useState(0)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [finished, setFinished] = useState(false)
  const [reference,setReference]=useState("")
  const [saveMessage, setSaveMessage] = useState("")
  const stepHeading = useRef<HTMLHeadingElement>(null)
  const firstRun = useRef(true)
  const [restored, setRestored] = useState(false)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      if (saved && !params.get("service") && !params.get("package") && !params.get("destination")) {
        const parsed = JSON.parse(saved)
        if (parsed && typeof parsed === "object" && Array.isArray(parsed.services)) {
          const valid = { ...empty }
          for (const key of Object.keys(empty) as (keyof Draft)[]) {
            if (key !== "services" && typeof parsed[key] === typeof empty[key]) {
              Object.assign(valid, { [key]: parsed[key] })
            }
          }
          valid.services = parsed.services.filter((slug: unknown) => typeof slug === "string" && serviceCatalog.some(service => service.slug === slug))
          setDraft(valid)
          setResuming(true)
        }
      }
    } catch {
      setStorageOK(false)
    }
    setRestored(true)
  }, [])
  useEffect(() => {
    if (!restored) return
    if (firstRun.current) {
      firstRun.current = false
      return
    }
    try {
      localStorage.setItem(storageKey, JSON.stringify(draft))
      setStorageOK(true)
    } catch {
      setStorageOK(false)
    }
  }, [draft, restored])
  useEffect(() => {
    stepHeading.current?.focus({ preventScroll: true })
  }, [step, finished])
  const update = <Key extends keyof Draft>(key: Key, value: Draft[Key]) => {
    setDraft((previous) => ({ ...previous, [key]: value }))
    setErrors((previous) => ({ ...previous, [key]: "" }))
    setSaveMessage("")
  }
  const groups = draft.services.map(
    (slug) => serviceCatalog.find((service) => service.slug === slug)?.form,
  )
  const visa = groups.includes("visa") || !!draft.package
  const medical = groups.includes("medical") || draft.package === "concierge"
  const transfer =
    groups.includes("transfers") ||
    ["complete", "concierge"].includes(draft.package)
  const esim = groups.includes("esim")
  const accommodation = draft.services.includes("accommodation")
  const today = new Date().toLocaleDateString("en-CA")
  const validate = () => {
    const next: Record<string, string> = {}
    if (step === 0 && !consultation && !draft.services.length && !draft.package)
      next.services = "Choose at least one service or a package to continue."
    if (step === 1) {
      if (!draft.destination.trim())
        next.destination = "Tell us your destination or arrival location."
      if (!draft.flexible && !draft.date)
        next.date = consultation
          ? "Choose a preferred consultation date or mark it flexible."
          : "Choose a travel date or mark your dates flexible."
      if (draft.date && draft.date < today && !draft.flexible)
        next.date = "Please choose today or a future date."
      if (
        !Number.isInteger(Number(draft.travellers)) ||
        Number(draft.travellers) < 1 ||
        Number(draft.travellers) > 100
      )
        next.travellers = "Enter between 1 and 100 travellers."
      if (visa && !draft.nationality.trim())
        next.nationality =
          "Enter your nationality so requirements can be discussed."
      if (draft.requirements.trim().length < 15)
        next.requirements =
          "Please describe your requirements in at least 15 characters."
    }
    if (step === 2) {
      if (draft.name.trim().length < 2) next.name = "Enter your full name."
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email))
        next.email =
          "Enter a valid email address, for example name@example.com."
      if (!draft.consent)
        next.consent =
          "Confirm you understand how this local demonstration uses your details."
    }
    setErrors(next)
    if (Object.keys(next).length)
      setTimeout(
        () =>
          document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(),
        0,
      )
    return !Object.keys(next).length
  }
  function save() {
    try {
      localStorage.setItem(storageKey, JSON.stringify(draft))
      setSaveMessage("Draft saved. Resume using this browser on this device.")
      setStorageOK(true)
    } catch {
      setStorageOK(false)
      setSaveMessage(
        "Browser storage is unavailable. Download a copy from the review step.",
      )
    }
  }
  function reset() {
    firstRun.current = true
    try {
      localStorage.removeItem(storageKey)
    } catch {}
    setDraft({ ...empty, services: [] })
    setStep(0)
    setFinished(false)
    setResuming(false)
    setErrors({})
    setSaveMessage("Draft cleared. You can start again.")
  }
  const summary = () =>
    [
      "WELCOME NAMIBIA SERVICES — QUOTATION / CONSULTATION REQUEST",
      "LOCAL DEMONSTRATION ONLY: not sent to any agency. No booking, approval or consultation is confirmed.",
      `Purpose: ${
        consultation
          ? "Consultation"
          : custom
            ? "Custom package quotation"
            : "Service enquiry"
      }`,
      `Package: ${draft.package || "Custom / individual services"}`,
      `Services: ${draft.services.map((slug) => serviceCatalog.find((service) => service.slug === slug)?.title).join(", ") || "Discuss at consultation"}`,
      ...Object.entries(draft)
        .filter(
          ([key, value]) =>
            key !== "services" &&
            key !== "package" &&
            key !== "consent" &&
            value !== "",
        )
        .map(([key, value]) => `${key}: ${String(value)}`),
      "Please itemise agency fees separately from government and supplier charges and state inclusions, exclusions and cancellation terms.",
    ].join("\n\n")
  function download() {
    const url = URL.createObjectURL(
      new Blob([summary()], { type: "text/plain;charset=utf-8" }),
    )
    const anchor = document.createElement("a")
    anchor.href = url
    anchor.download = "welcome-namibia-request.txt"
    anchor.click()
    URL.revokeObjectURL(url)
  }
  const field = (
    key: keyof Draft,
    label: string,
    type = "text",
    placeholder = "",
    required = false,
  ) => (
    <label className="form-field" key={key}>
      <span>
        {label}
        {required && " *"}
      </span>
      <input
        type={type}
        value={String(draft[key])}
        onChange={(event) => update(key, event.target.value as never)}
        placeholder={placeholder}
        aria-invalid={!!errors[key]}
        aria-describedby={errors[key] ? `${key}-error` : undefined}
        min={type === "date" ? today : type === "number" ? 1 : undefined}
        max={type === "number" ? 100 : undefined}
        autoComplete={
          key === "email"
            ? "email"
            : key === "name"
              ? "name"
              : key === "phone"
                ? "tel"
                : undefined
        }
      />
      {errors[key] && (
        <small className="field-error" id={`${key}-error`}>
          {errors[key]}
        </small>
      )}
    </label>
  )
  if (finished)
    return (
      <div className="page enquiry-page">
        <div className="completion glass-panel">
          <span className="completion-check">
            <Check size={28} />
          </span>
          <h1 ref={stepHeading} tabIndex={-1}>
            Your request is ready.
          </h1>
          {reference && <p><strong>Reference: {reference}</strong></p>}
          <Link className="button button-secondary" href="/requests">View my requests</Link>
          <Link className="button button-primary" href="/client">Open client workspace</Link>
          <p>
            Your details{" "}
            {storageOK ? "are saved in this browser" : "are ready to download"}.{" "}
            Your request has not been sent to the agency. No booking or
            consultation is confirmed.
          </p>
          <button className="button button-primary" onClick={download}>
            Download your request <Download size={17} />
          </button>
          <button
            className="button button-secondary"
            onClick={() => {
              setFinished(false)
              setStep(3)
            }}
          >
            Review details
          </button>
          <p className="source-note">
            Keep your downloaded copy for the agency. Please do not include
            passport numbers, medical records or payment details.
          </p>
          <button className="text-link" onClick={reset}>
            Clear draft & start again <RotateCcw size={15} />
          </button>
          <Link className="text-link" href="/">
            Return to welcome <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    )
  return (
    <div className="page enquiry-page">
      <PageHeading
        label={
          custom
            ? "BUILD YOUR OWN PACKAGE"
            : consultation
              ? "A CONVERSATION FIRST"
              : "START YOUR APPLICATION"
        }
        title={
          custom
            ? "Your journey. Your combination."
            : consultation
              ? "Let’s make a thoughtful start."
              : "A good journey starts here."
        }
      >
        Prepare{" "}
        {custom
          ? "an emailed quotation request"
          : consultation
            ? "a consultation request"
            : "your service enquiry"}{" "}
        in four simple steps. Your progress can be saved on this device.
      </PageHeading>
      <div className="notice">
        <ShieldCheck size={18} />
        <span>
          Your progress can be saved on this device. You can download the completed
          request. Please leave out passport numbers, medical records and payment details.
        </span>
      </div>
      {resuming && (
        <p className="draft-notice">
          <Save size={15} /> Your saved draft has been loaded. Review it before
          continuing. <button onClick={reset}>Start fresh</button>
        </p>
      )}
      {!storageOK && (
        <p className="field-error" role="status">
          Browser storage is unavailable. Save/resume will not work on this
          device; download your request on completion.
        </p>
      )}
      <ol className="form-progress">
        {[
          "Your services",
          "Travel details",
          "Contact details",
          "Review request",
        ].map((label, index) => (
          <li
            key={label}
            className={
              step === index ? "current" : step > index ? "complete" : ""
            }
            aria-current={step === index ? "step" : undefined}
          >
            <span>{step > index ? <Check size={14} /> : index + 1}</span>
            {label}
          </li>
        ))}
      </ol>
      <form
        noValidate
        onSubmit={(event) => {
          event.preventDefault()
          if (validate()) {
            if (step < 3) setStep(step + 1)
            else {
              save()
              try { const record=saveRequest(draft.name,summary());setReference(record.reference) } catch { setStorageOK(false) }
              setFinished(true)
            }
          }
        }}
        className="enquiry-form glass-panel"
      >
        <h2 ref={stepHeading} tabIndex={-1}>
          {
            [
              "What can we help you with?",
              "A little about your plans.",
              "How can you be reached?",
              "A final look at your request.",
            ][step]
          }
        </h2>
        {step === 0 && (
          <>
            <p>
              {consultation
                ? "Select any topics you would like to discuss. You can also continue without selecting a service."
                : "Choose individual services, an arrival package, or both."}
            </p>
            <label className="form-field">
              <span>Arrival package (optional)</span>
              <select
                value={draft.package}
                onChange={(event) => update("package", event.target.value)}
              >
                <option value="">Individual services / decide later</option>
                {packages.map((pkg) => (
                  <option value={pkg.slug} key={pkg.slug}>
                    {pkg.name} — {pkg.subtitle}
                  </option>
                ))}
              </select>
            </label>
            <div
              className="service-select-grid"
              role="group"
              aria-label="Select services"
            >
              {serviceCatalog.map((service) => (
                <label
                  className={
                    draft.services.includes(service.slug) ? "selected" : ""
                  }
                  key={service.slug}
                >
                  <input
                    type="checkbox"
                    checked={draft.services.includes(service.slug)}
                    onChange={() =>
                      update(
                        "services",
                        draft.services.includes(service.slug)
                          ? draft.services.filter(
                              (slug) => slug !== service.slug,
                            )
                          : [...draft.services, service.slug],
                      )
                    }
                  />
                  <span>{service.title}</span>
                </label>
              ))}
            </div>
            {errors.services && (
              <p className="field-error" role="alert">
                {errors.services}
              </p>
            )}
          </>
        )}
        {step === 1 && (
          <>
            <p>
              Fields marked * are required. Use “not yet known” for details you
              are still arranging.
            </p>
            <div className="form-grid">
              {field(
                "destination",
                "Destination / arrival location",
                "text",
                "e.g. Windhoek, then Swakopmund",
                true,
              )}
              {field("travellers", "Number of travellers", "number", "", true)}
              {field(
                "date",
                consultation
                  ? "Preferred consultation date"
                  : "Intended arrival / travel date",
                "date",
                "",
                !draft.flexible,
              )}
              {field(
                "budget",
                "Budget preferences (optional)",
                "text",
                "Your range and currency",
              )}
              <label className="checkbox-field">
                <input
                  type="checkbox"
                  checked={draft.flexible}
                  onChange={(event) => update("flexible", event.target.checked)}
                />
                My dates are flexible / not yet known
              </label>
              {visa && (
                <>
                  {field(
                    "nationality",
                    "Nationality / nationalities",
                    "text",
                    "For each traveller",
                    true,
                  )}
                  {field(
                    "status",
                    "Purpose and current permission (optional)",
                    "text",
                    "e.g. Employment, current permit expires in…",
                  )}
                </>
              )}
              {medical && (
                <>
                  {field(
                    "provider",
                    "Chosen provider / appointment (optional)",
                    "text",
                    "Name and date, or not yet arranged",
                  )}
                  {field(
                    "mobility",
                    "Practical mobility / companion needs",
                    "text",
                    "No diagnoses or medical records",
                  )}
                </>
              )}
              {transfer && (
                <>
                  {field(
                    "flight",
                    "Flight number and arrival time (optional)",
                    "text",
                    "If already booked",
                  )}
                  {field(
                    "dropoff",
                    "Pickup / drop-off location (optional)",
                    "text",
                    "Airport and accommodation name",
                  )}
                </>
              )}
              {esim &&
                field(
                  "device",
                  "Phone model and network-lock status",
                  "text",
                  "Exact model, unlocked / unsure",
                )}
              {accommodation &&
                field(
                  "rooms",
                  "Rooms and meal preferences",
                  "text",
                  "e.g. Two rooms, breakfast included",
                )}
            </div>
            <label className="form-field">
              <span>
                {consultation
                  ? "Topics and preferred contact time"
                  : "Your travel requirements"}{" "}
                *
              </span>
              <textarea
                rows={4}
                value={draft.requirements}
                onChange={(event) => update("requirements", event.target.value)}
                placeholder="Tell us your priorities, purpose, timing and any practical requirements…"
                aria-invalid={!!errors.requirements}
                aria-describedby={
                  errors.requirements ? "requirements-error" : undefined
                }
              />
              {errors.requirements && (
                <small id="requirements-error" className="field-error">
                  {errors.requirements}
                </small>
              )}
            </label>
          </>
        )}
        {step === 2 && (
          <>
            <p>
              Your email will be included in the downloadable request. This
              demonstration does not send messages.
            </p>
            <div className="form-grid">
              {field("name", "Full name", "text", "Your name", true)}
              {field(
                "email",
                "Email address",
                "email",
                "you@example.com",
                true,
              )}
              {field(
                "phone",
                "Phone with country code (optional)",
                "tel",
                "+264 …",
              )}
            </div>
            <label className="checkbox-field consent">
              <input
                type="checkbox"
                checked={draft.consent}
                onChange={(event) => update("consent", event.target.checked)}
                aria-invalid={!!errors.consent}
                aria-describedby={errors.consent ? "consent-error" : undefined}
              />
              <span>
                I understand my details may be
                stored in this browser, are not sent to an agency, and no
                booking or appointment is confirmed. I will not include
                sensitive documents. *
              </span>
            </label>
            {errors.consent && (
              <p className="field-error" id="consent-error">
                {errors.consent}
              </p>
            )}
          </>
        )}
        {step === 3 && (
          <>
            <p>
              Review your details. Preparing the request does not send email or
              create an official application.
            </p>
            <dl className="review-list">
              <div>
                <dt>Support</dt>
                <dd>
                  {draft.package
                    ? `${draft.package} package`
                    : "Individual services"}
                  <br />
                  {draft.services
                    .map(
                      (slug) =>
                        serviceCatalog.find((service) => service.slug === slug)
                          ?.title,
                    )
                    .join(", ") || "Consultation — discuss requirements"}
                </dd>
              </div>
              <div>
                <dt>Travel</dt>
                <dd>
                  {draft.destination} · {draft.travellers} traveller(s)
                  <br />
                  {draft.flexible ? "Flexible dates" : draft.date}
                </dd>
              </div>
              {[
                ["Nationality", draft.nationality],
                ["Purpose / permission", draft.status],
                ["Provider / appointment", draft.provider],
                ["Practical access needs", draft.mobility],
                ["Flight", draft.flight],
                ["Pickup / drop-off", draft.dropoff],
                ["Device", draft.device],
                ["Room preferences", draft.rooms],
                ["Budget", draft.budget],
              ]
                .filter(([, value]) => value)
                .map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              <div>
                <dt>Requirements</dt>
                <dd>{draft.requirements}</dd>
              </div>
              <div>
                <dt>Contact</dt>
                <dd>
                  {draft.name}
                  <br />
                  {draft.email}
                  <br />
                  {draft.phone}
                </dd>
              </div>
            </dl>
            <p className="source-note">
              Requested quotation: agency fees itemised separately from official
              fees and supplier costs. No pricing, benefits or availability are
              confirmed.
            </p>
          </>
        )}
        <div className="form-actions">
          <div>
            {step > 0 && (
              <button
                type="button"
                className="button button-secondary"
                onClick={() => setStep(step - 1)}
              >
                <ArrowLeft size={16} />
                Back
              </button>
            )}
            <button type="button" className="save-button" onClick={save}>
              <Save size={16} />
              Save draft
            </button>
          </div>
          <button className="button button-primary" type="submit">
            {step === 3 ? "Prepare request (not sent)" : "Continue"}
            <ArrowRight size={17} />
          </button>
        </div>
        <p className="save-message" aria-live="polite">
          {saveMessage}
        </p>
      </form>
      <p className="source-note">
        Drafts remain on this browser only. Clear your draft when using a shared
        device. Client and agency portals are a later phase.
      </p>
    </div>
  )
}

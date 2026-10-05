"use client";
import { useEffect, useState } from "react";
import * as Dialog from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  UploadCloud,
  X,
  FileText,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { ProgressSteps } from "@/components/ui/progress-steps";
import { createLocalRequest } from "@/lib/browser-store";
export type ServiceKey = "visa" | "transfers" | "medical" | "vacations" | "esim";
const personalSchema = z.object({
  name: z.string().trim().min(2, "Enter your name"),
  email: z.email("Enter a valid email"),
  nationality: z.string().trim().min(2, "Enter your nationality"),
  phone: z.string().optional(),
});
type Personal = z.infer<typeof personalSchema>;
const labels: Record<ServiceKey, string> = {
  visa: "Visa & permit request",
  transfers: "Airport transfer enquiry",
  medical: "Medical visit enquiry",
  vacations: "Stay & vacation enquiry",
  esim: "Travel connectivity enquiry",
};
const checklists: Record<string, string[]> = {
  Work: [
    "Passport copy",
    "Assignment or employer details",
    "Qualifications and supporting documents",
  ],
  Study: [
    "Passport copy",
    "Admission or enrolment details",
    "Funding and supporting documents",
  ],
  Visitor: [
    "Passport copy",
    "Travel and accommodation details",
    "Supporting invitation if applicable",
  ],
  Medical: [
    "Passport copy",
    "Appointment confirmation if requested",
    "Travel and stay details",
  ],
};
export function RequestDialog({
  request,
  onClose,
}: {
  request: { service: ServiceKey; package?: string } | null;
  onClose: () => void;
}) {
  const [step, setStep] = useState(0);
  const [type, setType] = useState<"Work" | "Study" | "Visitor" | "Medical">("Work");
  const [files, setFiles] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [reference, setReference] = useState("");
  const [details, setDetails] = useState<Record<string, string>>({});
  const [draftReady,setDraftReady]=useState(false);
  const [draftSaved,setDraftSaved]=useState(false);
  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    watch,
    reset,
    formState: { errors },
  } = useForm<Personal>({ resolver: zodResolver(personalSchema) });
  useEffect(() => {
    if (request) {
      setStep(0);
      setType("Work");
      setFiles([]);
      setSubmitted(false);
      setSaveError("");
      setReference("");
      setDetails({});
      setDraftSaved(false);
      setDraftReady(false);
      try {
        const draft=JSON.parse(localStorage.getItem(`arrival-request-draft-${request.service}`)||"null");
        setStep(draft?Math.min(3,Math.max(0,draft.step||0)):0);
        setType(draft?.type||"Work");
        setDetails(draft?.details||{});
        setFiles(draft?.files||[]);
        reset(draft?.personal||{});
      } catch {reset();}
      setDraftReady(true);
    }
  }, [request, reset]);
  const personalDraft=watch();
  const personalDraftJson=JSON.stringify(personalDraft);
  useEffect(()=>{
    if(!request||!draftReady||submitted)return;
    const timer=window.setTimeout(()=>{
      try {
        localStorage.setItem(`arrival-request-draft-${request.service}`,JSON.stringify({step,type,details,files,personal:JSON.parse(personalDraftJson)}));
        setDraftSaved(true);
      } catch {setSaveError("Your draft could not be saved in this browser. You can keep working while the form stays open.");}
    },450);
    return()=>window.clearTimeout(timer);
  },[request,draftReady,submitted,step,type,details,files,personalDraftJson]);
  const next = async () => {
    if (step === 0 && !(await trigger())) return;
    setStep(Math.min(step + 1, 3));
  };
  const field = (
    name: string,
    label: string,
    inputType = "text",
    placeholder = "",
  ) => (
    <label>
      {label}
      <input
        type={inputType}
        value={details[name] || ""}
        onChange={(e) => setDetails({ ...details, [name]: e.target.value })}
        placeholder={placeholder}
      />
    </label>
  );
  const service = request?.service || "visa";
  return (
    <Dialog.Root
      open={!!request}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="dialog-content request-dialog">
          <Dialog.Close className="dialog-close" aria-label="Close request">
            <X size={20} />
          </Dialog.Close>
          <div className="form-overline">ARRIVAL NAMIBIA / {labels[service].toUpperCase()}</div>
          <Dialog.Title>
            {submitted ? "Your enquiry is saved." : labels[service]}
          </Dialog.Title>
          <Dialog.Description>
            {submitted
              ? "Your enquiry is saved in this browser and available in the agency workspace on this device."
              : "Start with the details of your visit. Your request can be reviewed before services are confirmed."}
          </Dialog.Description>
          {!submitted ? (
            <>
              <ProgressSteps
                steps={["About you", "Your visit", "Documents", "Review"]}
                current={step}
              />
              <form
                onSubmit={handleSubmit(async (personal) => {
                  if (step < 3) {
                    void next();
                  } else {
                    setSaving(true);
                    setSaveError("");
                    try {
                      const record = createLocalRequest({
                          personal,
                          service,
                          purpose: type,
                          package: request?.package,
                          details,
                          documents: files,
                      });
                      localStorage.removeItem(`arrival-request-draft-${service}`);
                      setReference(record.id);
                      setSubmitted(true);
                    } catch (error) {
                      setSaveError(
                        error instanceof Error
                          ? error.message
                          : "Unable to save. Please try again.",
                      );
                    } finally {
                      setSaving(false);
                    }
                  }
                })}
              >
                {step === 0 && (
                  <div className="form-grid">
                    <Field
                      label="Full name"
                      {...register("name")}
                      autoComplete="name"
                      placeholder="Your full name"
                      error={errors.name?.message}
                    />
                    <Field
                      label="Email address"
                      {...register("email")}
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      error={errors.email?.message}
                    />
                    <Field
                      label="Nationality"
                      {...register("nationality")}
                      placeholder="Your nationality"
                      error={errors.nationality?.message}
                    />
                    <Field
                      label="Phone number"
                      optional
                      {...register("phone")}
                      type="tel"
                      autoComplete="tel"
                      placeholder="Country code + number"
                    />
                  </div>
                )}
                {step === 1 && (
                  <div className="form-grid">
                    {service === "visa" && (
                      <>
                        <label>
                          Application purpose
                          <select
                            value={type}
                            onChange={(e) => setType(e.target.value as "Work" | "Study" | "Visitor" | "Medical")}
                          >
                            {Object.keys(checklists).map((t) => (
                              <option key={t}>{t}</option>
                            ))}
                          </select>
                        </label>
                        {field("arrival", "Intended arrival", "date")}
                        {field("location", "Current country")}
                        {field(
                          "duration",
                          "Planned duration",
                          "text",
                          "For example, 3 months",
                        )}
                      </>
                    )}
                    {service === "transfers" && (
                      <>
                        {field(
                          "pickup",
                          "Pick-up location",
                          "text",
                          "Hosea Kutako airport",
                        )}
                        {field("dropoff", "Drop-off location")}
                        {field(
                          "arrival",
                          "Pick-up date & time",
                          "datetime-local",
                        )}
                        {field("flight", "Flight number")}
                        {field("passengers", "Passenger count", "number")}
                        <label>
                          Vehicle class
                          <select
                            value={details.vehicle || "Economy"}
                            onChange={(e) =>
                              setDetails({
                                ...details,
                                vehicle: e.target.value,
                              })
                            }
                          >
                            <option>Economy</option>
                            <option>VIP</option>
                            <option>Accessibility support enquiry</option>
                          </select>
                        </label>
                      </>
                    )}
                    {service === "medical" && (
                      <>
                        {field("hospital", "Hospital or provider preference")}
                        {field("arrival", "Preferred visit date", "date")}
                        {field("companion", "Travelling companions", "number")}
                        {field(
                          "support",
                          "Practical support needed",
                          "text",
                          "Stay, transfers or appointment coordination",
                        )}
                        <p className="field-full helper-text">
                          Clinical details and records should be shared only
                          after a secure provider workflow is confirmed. Use
                          fictional details only.
                        </p>
                      </>
                    )}
                    {service === "vacations" && (
                      <>
                        {field("destination", "Destination")}
                        {field("arrival", "Check-in date", "date")}
                        {field("departure", "Check-out date", "date")}
                        {field("guests", "Number of guests", "number")}
                        {field("budget", "Budget range", "text", "To discuss")}
                        {field("preferences", "Special requests")}
                      </>
                    )}
                    {service === "esim" && (
                      <>
                        {field("destination", "Destination", "text", "Namibia")}
                        {field("arrival", "Arrival date", "date")}
                        {field("device", "Phone model", "text", "Brand and model")}
                        {field("data", "Expected data use", "text", "To discuss")}
                        <p className="field-full helper-text">Plan availability, network coverage, compatibility and price need confirmation from the agency or provider before purchase.</p>
                      </>
                    )}
                  </div>
                )}
                {step === 2 && (
                  <>
                    <div className="checklist">
                      <h3>
                        {service === "visa"
                          ? "Illustrative preparation checklist"
                          : "Supporting information"}
                      </h3>
                      {(service === "visa"
                        ? checklists[type]
                        : service === "medical"
                          ? [
                              "Appointment details if available",
                              "Travel and practical support needs",
                            ]
                          : service === "transfers"
                            ? ["Flight and destination details"]
                            : service === "esim"
                              ? ["Phone compatibility to confirm", "Destination and travel dates"]
                            : ["Preferred dates and stay requirements"]
                      ).map((d) => (
                        <span key={d}>
                          <FileText size={16} />
                          {d}
                        </span>
                      ))}
                      <p className="helper-text">
                        Final document requirements must be confirmed for your
                        circumstances. File names stay in this browser. No file contents are uploaded or saved.
                      </p>
                    </div>
                    <label className="upload-zone">
                      <UploadCloud size={27} />
                      <b>Choose filenames for this enquiry</b>
                      <span>PDF, JPG or PNG · names shown only</span>
                      <input
                        type="file"
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) =>
                          setFiles(
                            Array.from(e.target.files || []).map((f) => f.name),
                          )
                        }
                      />
                    </label>
                    {files.map((f) => (
                      <div className="file-row" key={f}>
                        <FileText size={15} />
                        {f}
                        <button
                          type="button"
                          onClick={() => setFiles(files.filter((x) => x !== f))}
                          aria-label={`Remove ${f}`}
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </>
                )}
                {step === 3 && (
                  <div className="review-details">
                    <div>
                      <span>Applicant</span>
                      <b>{getValues("name")}</b>
                      <small>{getValues("email")}</small>
                    </div>
                    <div>
                      <span>Service</span>
                      <b>
                        {labels[service]}
                        {service === "visa" ? ` · ${type}` : ""}
                      </b>
                      <small>
                        {request?.package || "Scope to confirm after review"}
                      </small>
                    </div>
                    <div>
                      <span>Visit details</span>
                      <b>
                        {Object.entries(details)
                          .filter(([key, value]) => key !== "passport" && value)
                          .map(([, value]) => value)
                          .join(" · ") || "To discuss with a consultant"}
                      </b>
                    </div>
                    <div>
                      <span>Selected filenames</span>
                      <b>
                        {files.length
                          ? files.join(", ")
                          : "No documents selected"}
                      </b>
                    </div>
                    <div className="quote-note">
                      <ShieldCheck size={20} />
                      <p>
                        Service fees are quoted after review. Payment options
                        will be connected once the business confirms its
                        provider and terms.
                      </p>
                    </div>
                  </div>
                )}
                {saveError && (
                  <p role="alert" className="field-error">
                    {saveError}
                  </p>
                )}
                <div className="form-actions">
                  <small className="draft-saved" role="status">{draftSaved?"Draft saved in this browser":"Your draft saves as you type"}</small>
                  {step > 0 ? (
                    <Button
                      type="button"
                      className="outline-button"
                      onClick={() => setStep(step - 1)}
                    >
                      <ArrowLeft size={15} />
                      Back
                    </Button>
                  ) : (
                    <span />
                  )}
                  {step < 3 ? (
                    <Button
                      key="continue"
                      type="button"
                      className="dark-button"
                      onClick={(event) => {
                        event.preventDefault();
                        void next();
                      }}
                    >
                      Continue <ArrowRight size={16} />
                    </Button>
                  ) : (
                    <Button
                      key="finish"
                      type="submit"
                      className="dark-button"
                      disabled={saving}
                    >
                      {saving ? "Saving…" : "Save request"}{" "}
                      <Check size={16} />
                    </Button>
                  )}
                </div>
              </form>
            </>
          ) : (
            <div className="success-state">
              <div>
                <Check size={33} />
              </div>
              <h3>Everything in one place.</h3>
              <p>
                Your reference: {reference}. Follow this request in the
                client portal.
              </p>
              <a href="/client" className="pill-button dark-button">
                View your request <ArrowRight size={16} />
              </a>
            </div>
          )}
          <p className="helper-text bottom-note">
            This enquiry is saved only in this browser. Use fictional details only. No file contents are uploaded. Visa decisions remain with the relevant
            authorities.
          </p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

"use client";
import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
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
export type ServiceKey = "visa" | "transfers" | "medical" | "vacations";
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
  const [type, setType] = useState("Work");
  const [files, setFiles] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [reference, setReference] = useState("");
  const [details, setDetails] = useState<Record<string, string>>({});
  const {
    register,
    handleSubmit,
    trigger,
    getValues,
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
      reset();
    }
  }, [request, reset]);
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
          <div className="form-overline">
            WELCOME NAMIBIA SERVICES / ENQUIRY
          </div>
          <Dialog.Title>
            {submitted
              ? "Your enquiry draft is saved."
              : request?.package
                ? `${request.package} enquiry`
                : labels[service]}
          </Dialog.Title>
          <Dialog.Description>
            {submitted
              ? "Your draft has been saved for this demonstration. It has not been sent to the agency."
              : "Start with the details of your visit. Your request can be reviewed before services are confirmed."}
          </Dialog.Description>
          {!submitted ? (
            <>
              <div className="form-progress">
                {["About you", "Your visit", "Documents", "Review"].map(
                  (s, i) => (
                    <span className={i <= step ? "reached" : ""} key={s}>
                      <b>{i < step ? <Check size={12} /> : i + 1}</b>
                      <small>{s}</small>
                    </span>
                  ),
                )}
              </div>
              <form
                onSubmit={handleSubmit(async (personal) => {
                  if (step < 3) {
                    void next();
                  } else {
                    setSaving(true);
                    setSaveError("");
                    try {
                      const response = await fetch("/api/demo/requests", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          personal,
                          service,
                          purpose: type,
                          package: request?.package,
                          details,
                          documents: files,
                        }),
                      });
                      const result = await response.json();
                      if (!response.ok)
                        throw new Error(
                          result.error || "Unable to save your request.",
                        );
                      localStorage.setItem(
                        "arrival-preview-reference",
                        result.record.id,
                      );
                      setReference(result.record.id);
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
                    <label>
                      Full name
                      <input
                        {...register("name")}
                        autoComplete="name"
                        placeholder="Your full name"
                      />
                      {errors.name && (
                        <small className="field-error">
                          {errors.name.message}
                        </small>
                      )}
                    </label>
                    <label>
                      Email address
                      <input
                        {...register("email")}
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                      />
                      {errors.email && (
                        <small className="field-error">
                          {errors.email.message}
                        </small>
                      )}
                    </label>
                    <label>
                      Nationality
                      <input
                        {...register("nationality")}
                        placeholder="Your nationality"
                      />
                      {errors.nationality && (
                        <small className="field-error">
                          {errors.nationality.message}
                        </small>
                      )}
                    </label>
                    <label>
                      Phone number <span className="optional">optional</span>
                      <input
                        {...register("phone")}
                        type="tel"
                        autoComplete="tel"
                        placeholder="Country code + number"
                      />
                    </label>
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
                            onChange={(e) => setType(e.target.value)}
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
                          fictional information in this form.
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
                            : ["Preferred dates and stay requirements"]
                      ).map((d) => (
                        <span key={d}>
                          <FileText size={16} />
                          {d}
                        </span>
                      ))}
                      <p className="helper-text">
                        Final document requirements must be confirmed for your
                        circumstances. Only file names are shown here; file
                        contents are not uploaded.
                      </p>
                    </div>
                    <label className="upload-zone">
                      <UploadCloud size={27} />
                      <b>Choose sample documents</b>
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
                      <span>Sample documents</span>
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
                      {saving ? "Saving…" : "Save enquiry draft"}{" "}
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
              <h3>Draft saved.</h3>
              <p>
                Your reference: {reference}. This demonstration does not send
                the enquiry.
              </p>
              <Button className="pill-button dark-button" onClick={onClose}>
                Close <ArrowRight size={16} />
              </Button>
            </div>
          )}
          <p className="helper-text bottom-note">
            For this presentation, use fictional details only. No document
            contents are uploaded. Visa decisions remain with the relevant
            authorities.
          </p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

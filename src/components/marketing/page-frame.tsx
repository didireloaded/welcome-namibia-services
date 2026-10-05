"use client";
import { createContext, useContext, useState, type ReactNode } from "react";
import { MessageCircle } from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { RequestDialog, type ServiceKey } from "./request-dialog";
const EnquiryContext = createContext<() => void>(() => {});
export function EnquiryButton({
  children = "Make an enquiry",
}: {
  children?: ReactNode;
}) {
  const start = useContext(EnquiryContext);
  return (
    <button className="pill-button ui-button ui-button-primary" onClick={start}>
      {children}
      <ArrowUpRight size={16} />
    </button>
  );
}
export function PageFrame({
  children,
  service = "visa",
}: {
  children: ReactNode;
  service?: ServiceKey;
}) {
  const [request, setRequest] = useState<{
    service: ServiceKey;
    package?: string;
  } | null>(null);
  const start = () => setRequest({ service });
  return (
    <EnquiryContext.Provider value={start}>
      <div className="site-shell interior-shell">
        <SiteHeader onStart={start} />
        <main className="interior-content">{children}</main>
        <SiteFooter onConsult={start} />
        <button
          className="whatsapp"
          aria-label="Contact options"
          onClick={start}
        >
          <MessageCircle size={23} />
        </button>
        <RequestDialog request={request} onClose={() => setRequest(null)} />
      </div>
    </EnquiryContext.Provider>
  );
}

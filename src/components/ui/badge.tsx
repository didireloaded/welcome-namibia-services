import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
type Tone = "neutral" | "pending" | "success" | "attention";
export function badgeTone(status: string): Tone {
  if (/approved|verified|confirmed|decision recorded/i.test(status))
    return "success";
  if (/needed|correction|rejected/i.test(status)) return "attention";
  if (/review|submitted|awaiting|pending/i.test(status)) return "pending";
  return "neutral";
}
export function Badge({
  tone = "neutral",
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement> & { tone?: Tone }) {
  return (
    <span
      className={cn("status-pill", "ui-badge", `ui-badge-${tone}`, className)}
      {...props}
    />
  );
}

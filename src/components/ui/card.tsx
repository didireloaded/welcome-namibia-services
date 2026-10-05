import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
export function Card({
  className,
  variant = "default",
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  variant?: "default" | "interactive" | "flat" | "dark";
}) {
  return (
    <div
      className={cn("ui-card", `ui-card-${variant}`, className)}
      {...props}
    />
  );
}

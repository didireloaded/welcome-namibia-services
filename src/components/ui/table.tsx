import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
export function Table({
  children,
  className,
  tableClassName,
}: {
  children: ReactNode;
  className?: string;
  tableClassName?: string;
}) {
  return (
    <div className={cn("table-scroll", className)}>
      <table className={cn("portal-table", tableClassName)}>{children}</table>
    </div>
  );
}

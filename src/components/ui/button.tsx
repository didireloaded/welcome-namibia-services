import type { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant =
  "primary" | "secondary" | "ghost" | "accent" | "destructive" | "glass";
type Size = "sm" | "md" | "lg" | "icon";
const variants: Record<Variant, string> = {
  primary: "ui-button-primary",
  secondary: "ui-button-secondary",
  ghost: "ui-button-ghost",
  accent: "ui-button-accent",
  destructive: "ui-button-destructive",
  glass: "ui-button-glass",
};
export function Button({
  className,
  variant,
  size = "md",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
}) {
  const resolvedVariant =
    variant ??
    (className?.split(" ").includes("outline-button")
      ? "secondary"
      : className?.split(" ").includes("glass-button")
        ? "glass"
        : "primary");
  return (
    <button
      className={cn(
        "pill-button",
        "ui-button",
        variants[resolvedVariant],
        `ui-button-${size}`,
        className,
      )}
      {...props}
    />
  );
}

export function ButtonLink({
  href,
  children,
  className,
  variant = "primary",
  size = "md",
}: {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: Variant;
  size?: Size;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "pill-button",
        "ui-button",
        variants[variant],
        `ui-button-${size}`,
        className,
      )}
    >
      {children}
    </Link>
  );
}

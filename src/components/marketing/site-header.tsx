"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/ui/brand-logo";

const links = [
  { label: "Home", href: "/" },
  { label: "Our services", href: "/services" },
  { label: "Destinations", href: "/destinations" },
  { label: "Your journey", href: "/journey" },
  { label: "Packages", href: "/packages" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader({
  onStart,
  overlay = false,
}: {
  onStart: () => void;
  overlay?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <header
      className={
        overlay ? "hero-header site-header" : "site-header site-header-interior"
      }
    >
      <BrandLogo />
      <nav
        className={open ? "hero-nav mobile-open" : "hero-nav"}
        aria-label="Main navigation"
      >
        {links.map((link, index) => (
          <Link
            className={pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href + "/")) ? "active" : ""}
            aria-current={pathname === link.href ? "page" : undefined}
            href={link.href}
            onClick={() => setOpen(false)}
            key={link.href}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <Button
        variant={overlay ? "glass" : "primary"}
        className="header-book"
        onClick={onStart}
      >
        Get started{" "}
        <span className="circle-icon">
          <ArrowUpRight size={16} />
        </span>
      </Button>
      <button
        className="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </button>
    </header>
  );
}

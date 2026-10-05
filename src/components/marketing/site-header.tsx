"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { label: "Home", href: "#home" },
  { label: "Our services", href: "#services" },
  { label: "Destinations", href: "/destinations" },
  { label: "Your journey", href: "#journey" },
  { label: "FAQs", href: "#faq" },
];

export function SiteHeader({
  onStart,
  overlay = false,
}: {
  onStart: () => void;
  overlay?: boolean;
}) {
  const [open, setOpen] = useState(false);
  return (
    <header
      className={
        overlay ? "hero-header site-header" : "site-header site-header-interior"
      }
    >
      <Link href="/" className="logo" onClick={() => setOpen(false)}>
        Arrival<span>NAMIBIA</span>
      </Link>
      <nav
        className={open ? "hero-nav mobile-open" : "hero-nav"}
        aria-label="Main navigation"
      >
        {links.map((link, index) => (
          <Link
            className={index === 0 ? "active" : ""}
            href={link.href.startsWith("#") ? (overlay ? link.href : `/${link.href}`) : link.href}
            onClick={() => setOpen(false)}
            key={link.href}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/login"
          className="site-header-login"
          onClick={() => setOpen(false)}
        >
          Your travel space
        </Link>
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

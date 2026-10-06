"use client";
import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowUpRight, Menu, X, Compass, ArrowRight } from "lucide-react"

export const navigation = [
  ["/", "Home"],
  ["/services", "Our Services"],
  ["/destinations", "Destinations"],
  ["/stay", "Stay"],
  ["/explore", "Explore"],
  ["/experiences", "Experiences"],
  ["/journey", "Your Journey"],
  ["/packages", "Packages"],
  ["/lay-by", "Lay-by"],
  ["/contact", "Contact"],
]

export function Action({
  href = "/enquiry",
  children,
  secondary = false,
}: {
  href?: string
  children: React.ReactNode
  secondary?: boolean
}) {
  return (
    <Link
      className={`button ${secondary ? "button-secondary" : "button-primary"}`}
      href={href}
    >
      {children}
      <ArrowUpRight size={17} />
    </Link>
  )
}

export function PageHeading({
  label,
  title,
  children,
}: {
  label: string
  title: string
  children?: React.ReactNode
}) {
  return (
    <header className="page-heading">
      <span className="eyebrow">{label}</span>
      <h1>{title}</h1>
      {children && <p>{children}</p>}
    </header>
  )
}

export function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const home = pathname === "/"
  const [open, setOpen] = useState(false)
  useEffect(() => {
    setOpen(false)
    window.scrollTo(0, 0)
    document.title = "Welcome Namibia Services · Your journey, coordinated"
    document
      .querySelector<HTMLElement>("#main-content")
      ?.focus({ preventScroll: true })
  }, [pathname])
  return (
    <div className={pathname === "/client" ? "site dashboard-site" : home ? "site home-site" : "site inner-site"}>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header">
        <Link href="/"
          className="brand"
          aria-label="Welcome Namibia Services home"
        >
          <img src="/images/welcome-namibia-services-logo.png" alt="" />
        </Link>
        <nav
          aria-label="Main navigation"
          className={open ? "navigation is-open" : "navigation"}
        >
          {navigation.map(([to, label]) => (
            <Link key={to} href={to} className={pathname === to || (to !== "/" && pathname.startsWith(to + "/")) ? "active" : undefined} aria-current={pathname === to ? "page" : undefined}>
              {label}
            </Link>
          ))}
        </nav>
        <Link href="/client" className="header-action">
          Client portal <ArrowUpRight size={16} />
        </Link>
        <button
          className="menu-toggle"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>
      </header>
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      {!home && (
        <footer className="site-footer">
          <div>
            <Compass size={22} />
            <span>A thoughtful start to your Namibia journey.</span>
          </div>
          <nav aria-label="Footer">
            <Link href="/requests">My requests</Link>
            <Link href="/booking">Book consultation</Link>
            <Link href="/legal">Privacy & terms</Link>
            <Link href="/contact#faq">FAQs</Link>
            <Link href="/credits">Photography & sources</Link>
            <Link href="/enquiry">
              Plan your arrival <ArrowRight size={15} />
            </Link>
          </nav>
          <small>
            © {new Date().getFullYear()} Welcome Namibia Services ·
            Coordination, not approval guarantees.
          </small>
        </footer>
      )}
    </div>
  )
}

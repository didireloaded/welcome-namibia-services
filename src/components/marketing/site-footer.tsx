import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
export function SiteFooter({ onConsult }: { onConsult: () => void }) {
  return (
    <footer className="footer-panel">
      <div>
        <span className="mini-eyebrow">LET’S START WITH YOUR PLANS</span>
        <h2>
          See you
          <br />
          <em>in Namibia.</em>
        </h2>
        <Button onClick={onConsult}>
          Book a consultation <ArrowUpRight size={17} />
        </Button>
      </div>
      <div className="footer-links">
        <Link className="logo" href="/">
          Arrival<span>NAMIBIA</span>
        </Link>
        <p>Travel, paperwork and arrival support in one place.</p>
        <nav>
          <a href="/#services">Services</a>
          <a href="/#packages">Packages</a>
          <Link href="/destinations">Destinations</Link>
          <Link href="/gallery">Gallery</Link>
          <Link href="/partners">Provider network</Link>
          <Link href="/services/esim">eSIM & connectivity</Link>
          <Link href="/login">Your travel space</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <p className="footer-disclaimer">
          Visa and permit decisions remain with the relevant authorities.
          Medical services are provided by qualified practitioners.
        </p>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Arrival Namibia</span>
        <a
          href="https://commons.wikimedia.org/wiki/File:Elim_Ii_(197878137).jpeg"
          target="_blank"
          rel="noreferrer"
        >
          Namibia photograph: Dominik Angstwurm · CC BY-SA 3.0 · displayed
          cropped
        </a>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
export default function Login() {
  return (
    <main className="login-page">
      <div className="login-card">
        <Link className="logo" href="/">Arrival<span>NAMIBIA</span></Link>
        <span className="example-pill">YOUR TRAVEL SPACE</span>
        <h1>Your journey starts here.</h1>
        <p>This website prototype keeps enquiries in the browser where they were created. It does not yet offer online accounts or passwords.</p>
        <ButtonLink href="/client">View this device's travel space <ArrowRight size={16} /></ButtonLink>
        <Link href="/admin" className="pill-button outline-button">Open agency workspace <ArrowRight size={16} /></Link>
        <Link href="/" className="login-back">Back to website</Link>
      </div>
    </main>
  );
}

"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { BrandLogo } from "@/components/ui/brand-logo";
export default function Login() {
  const [signup, setSignup] = useState(false);
  const router = useRouter();
  return (
    <main className="login-page">
      <div className="login-card">
        <BrandLogo />
        <span className="demo-pill">PORTAL PREVIEW</span>
        <h1>
          {signup ? "Start your travel space." : "Your journey starts here."}
        </h1>
        <p>
          Use sample details to explore the interface. This preview does not
          authenticate or create an account.
        </p>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            router.push("/client");
          }}
        >
          {signup && (
            <label>
              Full name
              <input required placeholder="Sample Visitor" autoComplete="off" />
            </label>
          )}
          <label>
            Email address
            <input
              type="email"
              required
              placeholder="sample@example.com"
              autoComplete="off"
            />
          </label>
          <label>
            Password
            <input
              type="password"
              required
              minLength={6}
              placeholder="Sample password"
              autoComplete="off"
            />
          </label>
          <button type="submit" className="pill-button dark-button">
            {signup ? "Preview account creation" : "Preview sign in"}
            <ArrowRight size={16} />
          </button>
        </form>
        <button className="login-toggle" onClick={() => setSignup(!signup)}>
          {signup
            ? "Already have an account? View sign in"
            : "New here? View account creation"}
        </button>
        <Link href="/admin" className="pill-button outline-button">
          Explore sample agency portal <ArrowRight size={16} />
        </Link>
        <Link href="/" className="login-back">
          Back to website
        </Link>
      </div>
    </main>
  );
}

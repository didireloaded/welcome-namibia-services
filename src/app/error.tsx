"use client";
import Link from "next/link";
export default function ErrorPage({ retry }: { retry: () => void }) {
  return (
    <div className="page">
      <h1>Let’s try that again.</h1>
      <p>
        This page could not be loaded. Your saved browser data has not been
        cleared.
      </p>
      <div className="portal-actions">
        <button className="button button-primary" onClick={retry}>
          Try again
        </button>
        <Link className="button button-secondary" href="/">
          Return home
        </Link>
      </div>
    </div>
  );
}

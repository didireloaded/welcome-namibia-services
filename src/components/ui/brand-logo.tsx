import Image from "next/image";
import Link from "next/link";

export function BrandLogo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`brand-logo ${className}`}
      aria-label="Welcome Namibia Services — Home"
    >
      <Image
        src="/images/welcome-namibia-services-logo.png"
        alt="Welcome Namibia Services"
        width={1254}
        height={1254}
        priority
      />
    </Link>
  );
}

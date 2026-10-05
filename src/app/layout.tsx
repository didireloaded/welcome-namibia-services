import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arrival Namibia | Travel & arrival support",
  description:
    "Explore visa and permit enquiries, airport transfers, medical visit coordination, accommodation and travel services in Namibia.",
  robots: { index: false, follow: false },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Welcome Namibia Services | Travel & arrival support",
  description:
    "Travel and arrival support for visa and permit assistance, transfers, accommodation and medical visit logistics in Namibia.",
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

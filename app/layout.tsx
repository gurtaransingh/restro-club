import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Restro Club | Premium Hospitality, Sports & Stay Destination",
  description:
    "A luxury hospitality, restaurant, sports, pool, accommodation and events platform designed for a multi-location Restro Club ecosystem.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

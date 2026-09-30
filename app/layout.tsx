import type { Metadata } from "next";
import localFont from "next/font/local";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";

// Aiden's name, nav and page titles.
const display = localFont({
  src: "./fonts/TAYSlowpokeRegular.woff2",
  variable: "--f-display",
  display: "swap",
});
// Everything else.
const sans = Instrument_Sans({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--f-sans",
});

const DESCRIPTION =
  "Photo & video for outdoor, lifestyle, and gear brands. Based in Missoula, Montana.";

export const metadata: Metadata = {
  metadataBase: new URL("https://aidenurbine.com"),
  title: {
    default: "Aiden Urbine · Photo & Video",
    template: "%s · Aiden Urbine",
  },
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: "Aiden Urbine",
    title: "Aiden Urbine · Photo & Video",
    description: DESCRIPTION,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Aiden Urbine" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aiden Urbine · Photo & Video",
    description: DESCRIPTION,
    images: ["/og.jpg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}

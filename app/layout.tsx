import type { Metadata } from "next";
import { EB_Garamond, Caveat_Brush, Caveat } from "next/font/google";
import "./globals.css";

const serif = EB_Garamond({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--f-serif",
});
const brush = Caveat_Brush({ subsets: ["latin"], weight: "400", variable: "--f-brush" });
const hand = Caveat({ subsets: ["latin"], weight: "500", variable: "--f-hand" });

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
    <html lang="en" className={`${serif.variable} ${brush.variable} ${hand.variable}`}>
      <body>{children}</body>
    </html>
  );
}

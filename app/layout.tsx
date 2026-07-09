import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

const DESCRIPTION =
  "Photo & video for outdoor, lifestyle, and gear brands. Based in Missoula, Montana.";

export const metadata: Metadata = {
  metadataBase: new URL("https://aidenurbine.com"),
  title: {
    default: "Aiden Urbine Creative",
    template: "%s — Aiden Urbine Creative",
  },
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: "Aiden Urbine Creative",
    title: "Aiden Urbine Creative",
    description: DESCRIPTION,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Aiden Urbine Creative" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aiden Urbine Creative",
    description: DESCRIPTION,
    images: ["/og.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cormorant+Garamond:ital,wght@0,400;1,400;1,500&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&family=DM+Mono:wght@300&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ background: "var(--bg)", color: "var(--ink)" }}>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}

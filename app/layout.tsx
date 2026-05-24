import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: "Aiden Urbine Creative",
  description: "Photo & Video — Outdoor, lifestyle, and gear brands. Missoula, Montana.",
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
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&family=DM+Mono:wght@300&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ background: "var(--bg)", color: "var(--bone)" }}>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";

export default function CTAButton({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-block",
        padding: "12px 32px",
        border: hovered ? "1px solid #C84B2A" : "1px solid #F2EDE4",
        background: hovered ? "#C84B2A" : "none",
        color: hovered ? "#F2EDE4" : "#F2EDE4",
        fontFamily: "var(--font-mono)",
        fontSize: "9px",
        letterSpacing: "0.25em",
        textTransform: "uppercase",
        fontWeight: 300,
        transition: "background 0.3s ease, border-color 0.3s ease, color 0.3s ease",
        textDecoration: "none",
      }}
    >
      {label}
    </Link>
  );
}

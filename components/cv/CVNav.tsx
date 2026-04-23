"use client";

import Link from "next/link";

export default function CVNav() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[1000] flex justify-between items-center px-14 py-7"
      style={{ background: "linear-gradient(to bottom, rgba(26,18,8,0.9), transparent)" }}
    >
      <Link
        href="/"
        className="flex items-center gap-2.5 transition-colors duration-300 hover:text-ember"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "9px",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "#8C7B65",
          textDecoration: "none",
        }}
      >
        <span>←</span> Back to Site
      </Link>

      <span
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "14px",
          letterSpacing: "0.3em",
          color: "#4A3F32",
        }}
      >
        Curriculum Vitae
      </span>

      <button
        onClick={() => window.print()}
        className="transition-all duration-300 hover:border-ember hover:text-ember"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "9px",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "#8C7B65",
          background: "none",
          border: "1px solid #2F2416",
          padding: "8px 18px",
          cursor: "none",
        }}
      >
        Download PDF
      </button>
    </nav>
  );
}

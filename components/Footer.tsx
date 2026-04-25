"use client";

import Link from "next/link";

const navLinks = ["Work", "About", "Contact"];

export default function Footer() {
  return (
    <footer
      style={{
        background: "#0A0A08",
        padding: "48px 56px",
        borderTop: "0.5px solid rgba(242,237,228,0.08)",
      }}
    >
      {/* Main row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Left — brand */}
        <div>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 20,
              color: "#F2EDE4",
              letterSpacing: "0.1em",
              margin: "0 0 6px",
            }}
          >
            AUC
          </p>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              letterSpacing: "0.25em",
              fontWeight: 300,
              color: "rgba(242,237,228,0.35)",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            Missoula, Montana
          </p>
        </div>

        {/* Center — nav */}
        <nav style={{ display: "flex", gap: 32 }}>
          {navLinks.map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "9px",
                letterSpacing: "0.25em",
                fontWeight: 300,
                color: "rgba(242,237,228,0.4)",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#C84B2A")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(242,237,228,0.4)")
              }
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Right — Instagram */}
        <a
          href="https://instagram.com/aidenurbine"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "9px",
            letterSpacing: "0.25em",
            fontWeight: 300,
            color: "rgba(242,237,228,0.4)",
            textTransform: "uppercase",
            textDecoration: "none",
            transition: "color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#C84B2A")}
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "rgba(242,237,228,0.4)")
          }
        >
          @aidenurbine →
        </a>
      </div>

      {/* Copyright */}
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "9px",
          letterSpacing: "0.2em",
          fontWeight: 300,
          color: "rgba(242,237,228,0.2)",
          textTransform: "uppercase",
          marginTop: 32,
          marginBottom: 0,
        }}
      >
        © {new Date().getFullYear()} Aiden Urbine Creative. All rights reserved.
      </p>
    </footer>
  );
}

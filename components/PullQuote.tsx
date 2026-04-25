"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function PullQuote() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
        observer.disconnect();
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      style={{
        background: "#1A1208",
        padding: "140px 56px",
        textAlign: "center",
      }}
    >
      <div
        ref={wrapRef}
        style={{
          opacity: 0,
          transform: "translateY(40px)",
          transition: "opacity 0.9s ease, transform 1.1s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <blockquote
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontStyle: "italic",
            fontSize: "clamp(32px, 5vw, 68px)",
            color: "#F2EDE4",
            maxWidth: 800,
            margin: "0 auto",
            lineHeight: 1.15,
            letterSpacing: "-0.01em",
          }}
        >
          &ldquo;Make real things look undeniable.&rdquo;
        </blockquote>

        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "9px",
            letterSpacing: "0.25em",
            fontWeight: 300,
            color: "#8C7B65",
            textTransform: "uppercase",
            marginTop: 20,
          }}
        >
          — Aiden Urbine Creative &middot; Missoula, Montana
        </p>

        <div style={{ marginTop: 56 }}>
          <Link
            href="/contact"
            style={{
              display: "inline-block",
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              letterSpacing: "0.25em",
              fontWeight: 300,
              color: "#C84B2A",
              textTransform: "uppercase",
              textDecoration: "none",
              padding: "16px 40px",
              border: "1px solid #C84B2A",
              background: "transparent",
              transition: "background 0.35s ease, color 0.35s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#C84B2A";
              e.currentTarget.style.color = "#F2EDE4";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#C84B2A";
            }}
          >
            Start a Project →
          </Link>
        </div>
      </div>
    </section>
  );
}

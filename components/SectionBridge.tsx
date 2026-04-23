"use client";

import { useRef, useEffect, useState } from "react";
import { projects } from "@/lib/projects";

export default function SectionBridge() {
  const ref = useRef<HTMLDivElement>(null);
  const [fired, setFired] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFired(true);
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        background: "var(--black)",
        padding: "80px 0 48px",
        position: "relative",
        zIndex: 2,
      }}
    >
      {/* Ember rule line — draws left to right */}
      <div
        style={{
          height: 1,
          background: "var(--ember)",
          transformOrigin: "left center",
          transform: fired ? "scaleX(1)" : "scaleX(0)",
          transition: fired ? "transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)" : "none",
        }}
      />

      {/* Label row */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          marginTop: 32,
          padding: "0 32px",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(72px, 11vw, 140px)",
            letterSpacing: "-0.01em",
            lineHeight: 1,
            color: "var(--ember)",
            textTransform: "uppercase",
            opacity: fired ? 1 : 0,
            transform: fired ? "translateY(0)" : "translateY(12px)",
            transition: fired
              ? "opacity 0.9s ease 0.5s, transform 0.9s ease 0.5s"
              : "none",
          }}
        >
          Selected Work
        </p>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "9px",
            letterSpacing: "0.25em",
            fontWeight: 300,
            color: "rgba(242,237,228,0.2)",
            paddingBottom: 8,
            opacity: fired ? 1 : 0,
            transform: fired ? "translateY(0)" : "translateY(8px)",
            transition: fired
              ? "opacity 0.8s ease 0.6s, transform 0.8s ease 0.6s"
              : "none",
          }}
        >
          {String(projects.length).padStart(2, "0")}
        </p>
      </div>
    </div>
  );
}

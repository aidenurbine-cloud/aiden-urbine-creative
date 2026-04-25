"use client";

import { useEffect, useRef } from "react";

const services = [
  {
    number: "01",
    title: "Product Photography",
    body: "Commercial and editorial. Objects shot the way they deserve — with texture, light, and real context. No white cyc. No studio sterility.",
  },
  {
    number: "02",
    title: "Brand Video",
    body: "Campaign films, weekly content, short form. Built for the feed and the long game. Four years producing content that moves product.",
  },
  {
    number: "03",
    title: "Creative Direction",
    body: "For brands that need a point of view, not just a photographer. From concept to final cut. Based in Missoula. Traveling wherever the work demands.",
  },
];

export default function ServicesStrip() {
  const colRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  useEffect(() => {
    const delays = ["0s", "0.15s", "0.3s"];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const idx = colRefs.findIndex((r) => r.current === el);
          el.style.transitionDelay = delays[idx] ?? "0s";
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          observer.unobserve(el);
        });
      },
      { threshold: 0.2 }
    );

    colRefs.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section style={{ background: "#F2EDE4", padding: "100px 56px" }}>
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "9px",
          letterSpacing: "0.25em",
          fontWeight: 300,
          color: "#C84B2A",
          textTransform: "uppercase",
          marginBottom: 64,
        }}
      >
        What I Do
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
        }}
      >
        {services.map((svc, i) => (
          <div
            key={svc.number}
            ref={colRefs[i]}
            style={{
              padding: i === 0 ? "0 48px 0 0" : "0 48px",
              borderLeft: i === 0 ? "none" : "1px solid #C4B49A",
              opacity: 0,
              transform: "translateY(32px)",
              transition: "opacity 0.7s ease, transform 0.9s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "9px",
                letterSpacing: "0.25em",
                fontWeight: 300,
                color: "#C84B2A",
                margin: 0,
              }}
            >
              {svc.number}
            </p>

            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 28,
                color: "#1A1208",
                marginTop: 12,
                marginBottom: 0,
                lineHeight: 1.1,
              }}
            >
              {svc.title}
            </h3>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontStyle: "italic",
                fontSize: 16,
                color: "#8C7B65",
                lineHeight: 1.8,
                marginTop: 16,
                marginBottom: 0,
              }}
            >
              {svc.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

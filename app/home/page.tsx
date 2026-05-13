"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const PROJECTS = [
  { slug: "mkc",              image: "/images/preview/mkc%20preview.jpg",         tag: "Photo + Video", name: "Montana Knife Co." },
  { slug: "badfish",          image: "/images/preview/badfish-preview.jpg",       tag: "Photo",         name: "Badfish SUP" },
  { slug: "marin-moto-ranch", image: "/images/preview/marin-preview.jpg",         tag: "Photo + Video", name: "Marin Moto Ranch" },
  { slug: "rough-country",    image: "/images/preview/rough-country-preview.png", tag: "Photo + Video", name: "Rough Country" },
  { slug: "personal",         image: "/images/preview/personal-preview.jpg",      tag: "Photo",         name: "Personal" },
];

// ─── Grain overlay ───────────────────────────────────────────────
const GRAIN_SVG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")";

function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: "-50%",
        width: "200%",
        height: "200%",
        pointerEvents: "none",
        zIndex: 4,
        opacity: 0.045,
        backgroundImage: GRAIN_SVG,
        backgroundRepeat: "repeat",
        backgroundSize: "200px 200px",
      }}
    />
  );
}

// ─── Scroll helpers ───────────────────────────────────────────────
function getOpacity(
  p: number,
  inStart: number, inEnd: number,
  outStart: number, outEnd: number
): number {
  if (p < inStart) return 0;
  if (p < inEnd)   return (p - inStart) / (inEnd - inStart);
  if (p < outStart) return 1;
  if (p < outEnd)  return 1 - (p - outStart) / (outEnd - outStart);
  return 0;
}

function getY(
  p: number,
  inStart: number, inEnd: number,
  outStart: number, outEnd: number,
  dist = 20
): number {
  if (p < inStart) return dist;
  if (p < inEnd)   return dist * (1 - (p - inStart) / (inEnd - inStart));
  if (p < outStart) return 0;
  if (p < outEnd)  return -dist * (p - outStart) / (outEnd - outStart);
  return -dist;
}

// ─── Section seam helpers ────────────────────────────────────────
function EmberLine() {
  return (
    <div
      aria-hidden="true"
      style={{
        height: 1,
        margin: 0,
        background:
          "linear-gradient(to right, transparent, rgba(200,75,42,0.3) 30%, rgba(200,75,42,0.3) 70%, transparent)",
      }}
    />
  );
}

function FadeStrip({ dir }: { dir: "down" | "up" }) {
  return (
    <div
      aria-hidden="true"
      style={{
        height: 80,
        pointerEvents: "none",
        margin: 0,
        background:
          dir === "down"
            ? "linear-gradient(to bottom, #0E0B08 0%, rgba(14,11,8,0) 100%)"
            : "linear-gradient(to top, #0E0B08 0%, rgba(14,11,8,0) 100%)",
      }}
    />
  );
}

// ─── Scroll progress bar ─────────────────────────────────────────
function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const scrollable = document.body.scrollHeight - window.innerHeight;
      const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      if (barRef.current) barRef.current.style.width = `${pct}%`;
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "1px",
        zIndex: 200,
        pointerEvents: "none",
      }}
    >
      <div
        ref={barRef}
        style={{
          height: "1px",
          width: "0%",
          background: "linear-gradient(to right, #C84B2A, rgba(200,75,42,0.6))",
          boxShadow: "0 0 8px rgba(200,75,42,0.4)",
          transition: "width 0.1s linear",
        }}
      />
    </div>
  );
}

// ─── Nav ─────────────────────────────────────────────────────────
const pillBtnStyle: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "11px",
  color: "#F2EDE4",
  letterSpacing: "0.1em",
  textDecoration: "none",
  padding: "8px 18px",
  borderRadius: "999px",
  border: "1px solid rgba(242,237,228,0.12)",
  background: "rgba(242,237,228,0.06)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  whiteSpace: "nowrap",
};

function Nav() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const update = () => {
      const el = navRef.current;
      if (!el) return;
      if (window.scrollY > 100) {
        el.style.opacity = "1";
        el.style.backdropFilter = "blur(24px)";
        el.style.setProperty("-webkit-backdrop-filter", "blur(24px)");
        el.style.background = "rgba(14,11,8,0.6)";
      } else {
        el.style.opacity = "0";
        el.style.backdropFilter = "blur(0px)";
        el.style.setProperty("-webkit-backdrop-filter", "blur(0px)");
        el.style.background = "transparent";
      }
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <nav
      ref={navRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 48px",
        borderBottom: "0.5px solid rgba(242,237,228,0.06)",
        transition: "all 0.4s ease",
        opacity: 0,
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "13px",
          color: "#F2EDE4",
          letterSpacing: "0.3em",
        }}
      >
        AUC
      </span>

      <div style={{ display: "flex", gap: "40px" }}>
        {(["Work", "About", "Contact"] as const).map((label) => (
          <Link
            key={label}
            href={`/${label.toLowerCase()}`}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              color: "#8C7B65",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            {label}
          </Link>
        ))}
      </div>

      <a
        href="https://instagram.com/urbineaiden"
        target="_blank"
        rel="noopener noreferrer"
        style={pillBtnStyle}
      >
        Instagram ↗
      </a>
    </nav>
  );
}

// ─── Hero ────────────────────────────────────────────────────────
function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const layer3Ref = useRef<HTMLDivElement>(null);
  const layer4Ref = useRef<HTMLDivElement>(null);
  const layer6Ref = useRef<HTMLDivElement>(null);

  const scrollToWork = () => {
    const section = sectionRef.current;
    if (!section) return;
    window.scrollTo({
      top: section.offsetTop + section.offsetHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const scrolled = Math.max(0, window.scrollY - section.offsetTop);
      const maxScroll = section.offsetHeight - window.innerHeight;
      const p = Math.max(0, Math.min(1, scrolled / maxScroll));

      // Layer 1 — name + badge: visible 0→0.15, fades 0.15→0.22
      if (layer1Ref.current) {
        let opacity: number, y: number;
        if (p < 0.15) {
          opacity = 1; y = 0;
        } else if (p < 0.22) {
          const t = (p - 0.15) / 0.07;
          opacity = 1 - t; y = -20 * t;
        } else {
          opacity = 0; y = -20;
        }
        layer1Ref.current.style.opacity = String(opacity);
        layer1Ref.current.style.transform = `translateY(${y}px)`;
      }

      // Layer 2 — "From Buena Vista, Colorado."
      if (layer2Ref.current) {
        layer2Ref.current.style.opacity = String(getOpacity(p, 0.15, 0.23, 0.28, 0.35));
        layer2Ref.current.style.transform = `translateY(${getY(p, 0.15, 0.23, 0.28, 0.35)}px)`;
      }

      // Layer 3 — "Now based in Missoula, MT."
      if (layer3Ref.current) {
        layer3Ref.current.style.opacity = String(getOpacity(p, 0.35, 0.43, 0.48, 0.55));
        layer3Ref.current.style.transform = `translateY(${getY(p, 0.35, 0.43, 0.48, 0.55)}px)`;
      }

      // Layer 4 — "Outdoor brand content." ember
      if (layer4Ref.current) {
        layer4Ref.current.style.opacity = String(getOpacity(p, 0.55, 0.63, 0.68, 0.75));
        layer4Ref.current.style.transform = `translateY(${getY(p, 0.55, 0.63, 0.68, 0.75)}px)`;
      }

      // Layer 6 — CTA: fades in 0.75→0.85, stays
      if (layer6Ref.current) {
        let opacity: number, y: number;
        if (p < 0.75) {
          opacity = 0; y = 20;
        } else if (p < 0.85) {
          const t = (p - 0.75) / 0.10;
          opacity = t; y = 20 * (1 - t);
        } else {
          opacity = 1; y = 0;
        }
        layer6Ref.current.style.opacity = String(opacity);
        layer6Ref.current.style.transform = `translateY(${y}px)`;
        layer6Ref.current.style.pointerEvents = opacity > 0.5 ? "auto" : "none";
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const layerBase: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    textAlign: "center",
    zIndex: 5,
    opacity: 0,
    pointerEvents: "none",
    willChange: "opacity, transform",
    padding: "0 48px",
  };

  return (
    <section
      ref={sectionRef}
      id="hero-section"
      style={{ position: "relative", height: "300vh" }}
    >
      {/* Sticky viewport */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <Image
          src="/images/hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center", zIndex: 0 }}
        />

        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(14,11,8,0.45)",
            zIndex: 1,
          }}
        />

        <GrainOverlay />

        {/* Layer 1 — name + badge, starts visible */}
        <div
          ref={layer1Ref}
          style={{ ...layerBase, opacity: 1 }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 14px",
              borderRadius: "999px",
              border: "1px solid rgba(242,237,228,0.1)",
              background: "rgba(242,237,228,0.08)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              marginBottom: "32px",
            }}
          >
            <span style={{ color: "#C84B2A", fontSize: "8px", lineHeight: "1" }}>●</span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                color: "#8C7B65",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              Missoula, Montana
            </span>
          </div>

          <h1
            className="hero-name"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(56px, 8.5vw, 120px)",
              color: "#F2EDE4",
              lineHeight: 0.92,
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            AIDEN URBINE
          </h1>
          <p
            className="hero-sub"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              fontSize: "clamp(56px, 8.5vw, 120px)",
              color: "#8C7B65",
              lineHeight: 0.92,
              letterSpacing: "-0.01em",
              margin: 0,
            }}
          >
            CREATIVE
          </p>
        </div>

        {/* Layer 2 — "From Buena Vista, Colorado." */}
        <div ref={layer2Ref} style={layerBase}>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              fontSize: "clamp(28px, 4vw, 52px)",
              color: "#F2EDE4",
              margin: 0,
            }}
          >
            From Buena Vista, Colorado.
          </p>
        </div>

        {/* Layer 3 — "Now based in Missoula, MT." */}
        <div ref={layer3Ref} style={layerBase}>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              fontSize: "clamp(28px, 4vw, 52px)",
              color: "#F2EDE4",
              margin: 0,
            }}
          >
            Now based in Missoula, MT.
          </p>
        </div>

        {/* Layer 4 — "Outdoor brand content." ember */}
        <div ref={layer4Ref} style={layerBase}>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              fontSize: "clamp(24px, 3.2vw, 44px)",
              color: "#C84B2A",
              margin: 0,
              maxWidth: 600,
            }}
          >
            Outdoor brand content.
          </p>
        </div>

        {/* Layer 6 — CTA: View Work ↓ */}
        <div ref={layer6Ref} style={layerBase}>
          <button
            onClick={scrollToWork}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                color: "#F2EDE4",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              View Work
            </span>
            <span
              style={{
                fontSize: "16px",
                color: "#F2EDE4",
                opacity: 0.6,
                animation: "arrowBob 1.4s ease-in-out infinite",
              }}
            >
              ↓
            </span>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes arrowBob {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(6px); }
        }
      `}</style>
    </section>
  );
}

// ─── Work Grid ───────────────────────────────────────────────────
function WorkGrid() {
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      el.style.opacity = "0";
      el.style.transform = "translateY(24px)";
      el.style.transition = "opacity 0.7s ease, transform 0.7s ease";
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          el.style.transitionDelay = `${i * 0.1}s`;
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          obs.disconnect();
        },
        { threshold: 0.15 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section id="work-section" style={{ background: "#0E0B08" }}>
      {/* Header */}
      <div
        style={{
          padding: "32px 24px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: "#C84B2A",
            textTransform: "uppercase",
            letterSpacing: "0.35em",
            margin: 0,
          }}
        >
          Selected Work
        </p>

        <Link
          href="/work"
          className="wc-all-link"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            color: "rgba(242,237,228,0.6)",
            textDecoration: "none",
            background: "rgba(242,237,228,0.05)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(200,75,42,0.3)",
            borderRadius: "100px",
            padding: "10px 22px",
            letterSpacing: "0.2em",
          }}
        >
          All Projects →
        </Link>
      </div>

      {/* Grid */}
      <div
        className="wc-grid"
        style={{
          padding: "0 24px 120px",
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "16px",
        }}
      >
        {PROJECTS.map((project, i) => {
          const isLast = i === PROJECTS.length - 1;
          return (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="wc"
              style={{
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",
                aspectRatio: "16/9",
                background: "#161209",
                gridColumn: isLast ? "1 / -1" : undefined,
                borderRadius: "16px",
                boxShadow:
                  "0 4px 24px rgba(0,0,0,0.4), 0 1px 0 rgba(242,237,228,0.04) inset",
                transition:
                  "transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease",
              }}
            >
              <Image
                src={project.image}
                alt={project.name}
                fill
                sizes={isLast ? "(max-width:768px) 100vw, calc(100vw - 48px)" : "(max-width:768px) 100vw, calc(50vw - 32px)"}
                className="wc-img"
                style={{ objectFit: "cover", objectPosition: "center" }}
              />

              {/* Always-visible bottom content */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "20px 24px",
                  background:
                    "linear-gradient(to top, rgba(14,11,8,0.9) 0%, rgba(14,11,8,0.4) 60%, transparent 100%)",
                  pointerEvents: "none",
                }}
              >
                {/* Ember accent bar */}
                <div style={{
                  position: "absolute",
                  left: 0,
                  bottom: 0,
                  width: 3,
                  height: 40,
                  background: "#C84B2A",
                }} />
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "8px",
                    color: "#C84B2A",
                    textTransform: "uppercase",
                    letterSpacing: "0.2em",
                    margin: "0 0 6px",
                  }}
                >
                  {project.tag}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 300,
                    fontStyle: "italic",
                    fontSize: "clamp(28px, 3vw, 42px)",
                    color: "#F2EDE4",
                    lineHeight: 1,
                    margin: 0,
                    textShadow: "0 2px 20px rgba(0,0,0,0.8)",
                  }}
                >
                  {project.name}
                </p>
              </div>

              {/* Hover pill — SVG border draw */}
              <div
                className="wc-pill"
                style={{
                  position: "absolute",
                  bottom: 20,
                  right: 20,
                  width: 160,
                  height: 44,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                }}
              >
                <svg
                  className="wc-pill-border"
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}
                >
                  <rect
                    className="wc-pill-rect"
                    x="0.5" y="0.5" width="159" height="43" rx="21.5"
                    fill="none" stroke="rgba(242,237,228,0.5)" strokeWidth="1"
                  />
                </svg>
                <div className="wc-pill-bg" style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: 22,
                  background: "rgba(242,237,228,0.1)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                }} />
                <span className="wc-pill-text" style={{ position: "relative", zIndex: 1, fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 12, color: "#F2EDE4" }}>
                  View Project
                </span>
                <span className="wc-pill-text" style={{ position: "relative", zIndex: 1, color: "#C84B2A", fontSize: 12 }}>→</span>
              </div>
            </Link>
          );
        })}
      </div>

      <style>{`
        .wc { display: block; text-decoration: none; }
        .wc:hover {
          transform: translateY(-6px) !important;
          box-shadow: 0 20px 60px rgba(0,0,0,0.6), 0 1px 0 rgba(242,237,228,0.08) inset !important;
        }
        .wc-img { transition: transform 0.6s ease !important; }
        .wc:hover .wc-img { transform: scale(1.04) !important; }

        /* Pill — SVG border draw animation */
        .wc-pill { pointer-events: none; }
        .wc-pill-rect {
          stroke-dasharray: 370;
          stroke-dashoffset: 370;
          transition: stroke-dashoffset 1.4s linear;
        }
        .wc-pill-bg {
          opacity: 0;
          transition: opacity 0.25s ease 0.1s;
        }
        .wc-pill-text {
          opacity: 0;
          transition: opacity 0.25s ease 0.1s;
        }
        .wc:hover .wc-pill-rect { stroke-dashoffset: 0; }
        .wc:hover .wc-pill-bg,
        .wc:hover .wc-pill-text { opacity: 1; }

        .wc-all-link { transition: color 0.3s, border-color 0.3s; }
        .wc-all-link:hover {
          color: #C84B2A !important;
          border-color: #C84B2A !important;
        }
        @media (max-width: 768px) {
          .wc-grid { grid-template-columns: 1fr !important; padding: 0 16px 80px !important; }
          .wc { aspect-ratio: 4/3 !important; grid-column: auto !important; }
        }
      `}</style>
    </section>
  );
}

// ─── About ───────────────────────────────────────────────────────
function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const scrollToWork = () =>
    document.getElementById("work-section")?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(28px)";
    el.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
        observer.disconnect();
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section style={{ background: "#0E0B08", padding: "100px 56px", width: "100%" }}>
      <div ref={sectionRef}>

        {/* ── TOP ROW: portrait | bio + stats ── */}
        <div style={{
          background: "rgba(242,237,228,0.02)",
          border: "1px solid rgba(242,237,228,0.06)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderRadius: 16,
          padding: "36px 40px",
          marginBottom: 8,
        }}>
        <div className="about-top" style={{ display: "flex", gap: 48, alignItems: "flex-start" }}>

          {/* Portrait */}
          <div style={{
            width: 340,
            flexShrink: 0,
            position: "relative",
            aspectRatio: "3/4",
            overflow: "hidden",
            borderRadius: 12,
            boxShadow: "0 24px 48px rgba(0,0,0,0.5)",
          }}>
            <Image
              src="/images/aiden-portrait.jpg"
              alt="Aiden Urbine"
              fill
              sizes="340px"
              style={{ objectFit: "cover", objectPosition: "center 15%" }}
            />
          </div>

          {/* Bio + stats */}
          <div style={{ flex: 1 }}>
            <p style={{
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              color: "#C84B2A",
              textTransform: "uppercase",
              letterSpacing: "0.25em",
              margin: "0 0 16px",
            }}>
              About
            </p>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              fontSize: "clamp(40px, 5vw, 64px)",
              color: "#F2EDE4",
              margin: "0 0 24px",
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
            }}>
              Aiden Urbine
            </h2>
            <p style={{
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              fontSize: "17px",
              color: "rgba(242,237,228,0.7)",
              lineHeight: 1.85,
              maxWidth: 640,
              margin: "0 0 48px",
            }}>
              From Buena Vista, Colorado. Now based in Missoula, MT. I shoot photo
              and video for outdoor brands that actually mean something.
              Grew up on the Arkansas River watching my dad kayak and shoot.
              That&apos;s still what drives me. Deeply rooted in surf and
              whitewater culture, endlessly inspired by the West.
            </p>

            {/* Stats — inline pipe-separated */}
            <p style={{
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              color: "#8C7B65",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              lineHeight: 2,
              margin: 0,
            }}>
              12+ Years Behind a Lens
              <span style={{ color: "rgba(200,75,42,0.4)", margin: "0 12px" }}>|</span>
              5 Shooting States
              <span style={{ color: "rgba(200,75,42,0.4)", margin: "0 12px" }}>|</span>
              ∞ Miles of Dirt Roads
              <span style={{ color: "rgba(200,75,42,0.4)", margin: "0 12px" }}>|</span>
              1 Eye That Matters
            </p>
          </div>
        </div>
        </div>

        {/* ── IMAGE STACK ──────────────────────────────────── */}
        <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
          <div className="about-img-cell" style={{
            position: "relative",
            height: 480,
            overflow: "hidden",
            borderRadius: 12,
          }}>
            <Image
              src="/images/PERSONAL%20GALLERY/honest%20story.JPG"
              alt=""
              fill
              sizes="100vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="about-img-cell" style={{
            position: "relative",
            height: 480,
            overflow: "hidden",
            borderRadius: 12,
          }}>
            <Image
              src="/images/PERSONAL%20GALLERY/real%20light.JPG"
              alt=""
              fill
              sizes="100vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>

        {/* ── CTA ROW ──────────────────────────────────────── */}
        <div style={{
          marginTop: 40,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 16,
        }}>
          <p style={{
            fontFamily: "var(--font-display)",
            fontWeight: 300,
            fontStyle: "italic",
            fontSize: "15px",
            color: "#8C7B65",
            margin: 0,
            textAlign: "center",
          }}>
            Currently based in Missoula, Montana. Available for projects.
          </p>
          <div style={{ display: "flex", gap: 12 }}>
            <button
              onClick={scrollToWork}
              className="about-cta-work"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 500,
                fontSize: "13px",
                color: "#F2EDE4",
                background: "rgba(242,237,228,0.08)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(242,237,228,0.15)",
                borderRadius: "100px",
                padding: "12px 28px",
                cursor: "pointer",
              }}
            >
              View Work →
            </button>
            <a
              href="https://instagram.com/urbineaiden"
              target="_blank"
              rel="noopener noreferrer"
              className="about-cta-ig"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 500,
                fontSize: "13px",
                color: "#C84B2A",
                background: "rgba(200,75,42,0.1)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(200,75,42,0.25)",
                borderRadius: "100px",
                padding: "12px 28px",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              @urbineaiden
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      className="site-footer"
      style={{
        background: "var(--bg)",
        borderTop: "1px solid rgba(242,237,228,0.06)",
        padding: "40px 56px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 500,
          fontSize: "13px",
          letterSpacing: "0.15em",
          color: "var(--bone)",
        }}
      >
        AIDEN URBINE
      </span>

      <div style={{ display: "flex", gap: 32 }}>
        <a
          href="https://instagram.com/urbineaiden"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "9px",
            color: "var(--muted)",
            textDecoration: "none",
            letterSpacing: "0.15em",
            transition: "color 0.3s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--bone)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
        >
          @urbineaiden
        </a>

        <a
          href="mailto:aiden@aidenurbine.co"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "9px",
            color: "var(--muted)",
            textDecoration: "none",
            letterSpacing: "0.15em",
            transition: "color 0.3s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--bone)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
        >
          aiden@aidenurbine.co
        </a>
      </div>
    </footer>
  );
}

// ─── Page ────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <ScrollProgress />
      <Nav />
      <Hero />
      <EmberLine />
      <WorkGrid />
      <EmberLine />
      <About />
      <Footer />
      <style>{`
        @media (max-width: 768px) {
          .hero-name, .hero-sub { font-size: clamp(36px, 10vw, 72px) !important; }
          .site-footer {
            flex-direction: column !important;
            gap: 24px !important;
            align-items: center !important;
            text-align: center !important;
          }
          .about-top { flex-direction: column !important; }
        }
        .about-img-cell img { transition: transform 0.4s ease, filter 0.4s ease; }
        .about-img-cell:hover img { transform: scale(1.02); filter: brightness(1.08); }
        .about-cta-work { transition: all 0.3s ease; }
        .about-cta-work:hover { background: rgba(242,237,228,0.15) !important; }
        .about-cta-ig { transition: all 0.3s ease; }
        .about-cta-ig:hover { background: rgba(200,75,42,0.2) !important; }
      `}</style>
    </main>
  );
}

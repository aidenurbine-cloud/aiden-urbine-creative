"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { BLUR } from "@/lib/blur";

const PROJECTS = [
  { slug: "mkc",              image: "/images/preview/mkc%20preview.jpg",          name: "Montana Knife Co." },
  { slug: "badfish",          image: "/images/preview/badfish-preview.jpg",        name: "Badfish SUP" },
  { slug: "marin-moto-ranch", image: "/images/preview/marin-preview.jpg",          name: "Marin Moto Ranch" },
  { slug: "rough-country",    image: "/images/preview/rough-country-preview.jpg",  name: "Rough Country" },
  { slug: "personal",         image: "/images/preview/personal-preview.jpg",       name: "Personal" },
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
        inset: 0,
        pointerEvents: "none",
        zIndex: 4,
        opacity: 0.05,
        backgroundImage: GRAIN_SVG,
        backgroundRepeat: "repeat",
        backgroundSize: "200px 200px",
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
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: "1px", zIndex: 200, pointerEvents: "none" }}>
      <div
        ref={barRef}
        style={{
          height: "1px",
          width: "0%",
          background: "linear-gradient(to right, #C84B2A, rgba(200,75,42,0.6))",
          transition: "width 0.1s linear",
        }}
      />
    </div>
  );
}

// ─── Nav ─────────────────────────────────────────────────────────
const navLinkStyle: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  fontWeight: 400,
  fontSize: "11px",
  color: "var(--muted)",
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  textDecoration: "none",
  background: "none",
  border: "none",
  cursor: "pointer",
  padding: 0,
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
        el.style.background = "rgba(243,243,241,0.8)";
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

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

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
        padding: "0 32px",
        borderBottom: "0.5px solid var(--border)",
        transition: "all 0.4s ease",
        opacity: 0,
      }}
    >
      <Link
        href="/home"
        style={{ fontFamily: "var(--font-mono)", fontSize: "13px", color: "var(--ink)", letterSpacing: "0.3em", textDecoration: "none" }}
      >
        AU
      </Link>

      <div style={{ display: "flex", gap: "36px", alignItems: "center" }}>
        <Link href="/work" className="nav-link" style={navLinkStyle}>Work</Link>
        <button onClick={scrollToAbout} className="nav-link" style={navLinkStyle}>About</button>
        <Link href="/contact" className="nav-link" style={navLinkStyle}>Contact</Link>
      </div>

      <style>{`
        .nav-link { transition: color 0.3s; }
        .nav-link:hover { color: var(--ember); }
      `}</style>
    </nav>
  );
}

// ─── Hero ────────────────────────────────────────────────────────
function Hero() {
  return (
    <section style={{ position: "relative", height: "100dvh", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, animation: "kenBurns 22s ease-out forwards" }}>
        <Image
          src="/homepage%20hero-1.jpg"
          alt="Aiden Urbine — outdoor brand photography, Missoula, Montana"
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL={BLUR}
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </div>

      <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "rgba(14,11,8,0.42)", zIndex: 1 }} />
      <GrainOverlay />

      {/* Center — name + one line */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 24px",
        }}
      >
        <h1
          className="hero-name"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: "clamp(64px, 13vw, 190px)",
            color: "var(--bone)",
            lineHeight: 0.92,
            letterSpacing: "0.02em",
            margin: 0,
          }}
        >
          AIDEN URBINE
        </h1>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: "var(--ember)",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            margin: "20px 0 0",
          }}
        >
          Outdoor Brand Content — Missoula, MT
        </p>
      </div>

      {/* Minimal scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: 28,
          left: 0,
          right: 0,
          zIndex: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          pointerEvents: "none",
        }}
      >
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--bone)", letterSpacing: "0.3em", opacity: 0.7 }}>
          SCROLL
        </span>
        <span style={{ fontSize: "14px", color: "var(--bone)", opacity: 0.6, animation: "arrowBob 1.6s ease-in-out infinite" }}>
          ↓
        </span>
      </div>

      <style>{`
        @keyframes arrowBob {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(6px); }
        }
        @media (max-width: 768px) {
          .hero-name { font-size: clamp(52px, 16vw, 96px) !important; }
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
      el.style.transition = "opacity 0.8s ease, transform 0.8s ease";
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          el.style.transitionDelay = `${i * 0.08}s`;
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
    <section id="work" style={{ background: "var(--bg)", padding: "120px 24px" }}>
      {/* Header */}
      <div
        className="wc-header"
        style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "48px" }}
      >
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--ember)", textTransform: "uppercase", letterSpacing: "0.35em", margin: 0 }}>
          Selected Work
        </p>
        <Link
          href="/work"
          className="wc-all"
          style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--muted)", textDecoration: "none", letterSpacing: "0.2em", textTransform: "uppercase" }}
        >
          All Projects →
        </Link>
      </div>

      {/* Grid */}
      <div className="wc-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "24px" }}>
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
                aspectRatio: "16/9",
                background: "var(--card)",
                gridColumn: isLast ? "1 / -1" : undefined,
                borderRadius: "4px",
                transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s ease",
              }}
            >
              <Image
                src={project.image}
                alt={project.name}
                fill
                sizes={isLast ? "(max-width:768px) 100vw, calc(100vw - 48px)" : "(max-width:768px) 100vw, calc(50vw - 36px)"}
                placeholder="blur"
                blurDataURL={BLUR}
                className="wc-img"
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
              <span
                className="wc-name"
                style={{
                  position: "absolute",
                  left: 28,
                  bottom: 24,
                  zIndex: 2,
                  fontFamily: "var(--font-display)",
                  fontWeight: 400,
                  fontSize: "clamp(32px, 3.4vw, 52px)",
                  color: "var(--bone)",
                  letterSpacing: "0.01em",
                  lineHeight: 1,
                  textShadow: "0 2px 24px rgba(0,0,0,0.85)",
                }}
              >
                {project.name}
              </span>
            </Link>
          );
        })}
      </div>

      <style>{`
        .wc { display: block; text-decoration: none; }
        .wc:hover, .wc:focus-visible { transform: translateY(-6px); box-shadow: 0 24px 60px rgba(20,20,18,0.2); outline: none; }
        .wc-img { transition: transform 0.6s ease, filter 0.6s ease; filter: grayscale(1); }
        .wc:hover .wc-img, .wc:focus-visible .wc-img { transform: scale(1.04); filter: grayscale(0) brightness(0.85); }
        .wc-name { opacity: 0; transform: translateY(8px); transition: opacity 0.4s ease, transform 0.4s ease; }
        .wc:hover .wc-name, .wc:focus-visible .wc-name { opacity: 1; transform: translateY(0); }
        .wc-all:hover { color: var(--ember); }
        @media (max-width: 768px) {
          .wc-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
          .wc { aspect-ratio: 4/3 !important; grid-column: auto !important; }
          .wc-name { opacity: 1 !important; transform: none !important; }
          .wc-img { filter: none !important; }
        }
      `}</style>
    </section>
  );
}

// ─── Statement ───────────────────────────────────────────────────
function Statement() {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(16px)";
    el.style.transition = "opacity 1s ease, transform 1s ease";
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
        obs.disconnect();
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section style={{ position: "relative", height: "70vh", overflow: "hidden" }}>
      <Image
        src="/images/personal-gallery/honest%20story.JPG"
        alt=""
        fill
        sizes="100vw"
        placeholder="blur"
        blurDataURL={BLUR}
        style={{ objectFit: "cover", objectPosition: "center" }}
      />
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "rgba(14,11,8,0.6)", zIndex: 1 }} />
      <GrainOverlay />
      <div style={{ position: "absolute", inset: 0, zIndex: 5, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 24px" }}>
        <p
          ref={ref}
          style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(20px, 2.5vw, 34px)",
            color: "var(--bone)",
            lineHeight: 1.5,
            maxWidth: 600,
            textAlign: "center",
            margin: 0,
          }}
        >
          The good frames don&apos;t come easy. They show up cold, early, and a long way from the truck.
        </p>
      </div>
    </section>
  );
}

// ─── About ───────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" style={{ background: "var(--bg)", padding: "120px 24px" }}>
      <div className="ab-wrap" style={{ maxWidth: 1080, margin: "0 auto", display: "flex", gap: 64, alignItems: "center" }}>
        {/* Portrait */}
        <div style={{ position: "relative", width: "100%", maxWidth: 380, aspectRatio: "3/4", flexShrink: 0, borderRadius: 4, overflow: "hidden" }}>
          <Image
            src="/images/aiden-portrait.jpg"
            alt="Aiden Urbine"
            fill
            sizes="(max-width:768px) 100vw, 380px"
            placeholder="blur"
            blurDataURL={BLUR}
            style={{ objectFit: "cover", objectPosition: "center 15%" }}
          />
        </div>

        {/* Text */}
        <div style={{ flex: 1 }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--ember)", textTransform: "uppercase", letterSpacing: "0.3em", margin: "0 0 20px" }}>
            About
          </p>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "clamp(44px, 5.5vw, 84px)", color: "var(--ink)", lineHeight: 0.95, letterSpacing: "0.01em", margin: "0 0 24px" }}>
            AIDEN URBINE
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "17px", color: "var(--muted)", lineHeight: 1.85, maxWidth: 480, margin: "0 0 40px" }}>
            Photographer and creative director based in Missoula, Montana — raised on the
            Arkansas River in Buena Vista, Colorado. The outdoor life drives the work:
            whitewater, dirt roads, elk camps, and the brands that live out there. Two years
            and counting behind the content for Montana Knife Co., plus Badfish, Rough
            Country, and more.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <Link href="/work" className="ab-btn">View Work →</Link>
            <Link href="/contact" className="ab-btn">Get in Touch →</Link>
          </div>
        </div>
      </div>

      <style>{`
        .ab-btn {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--ink);
          text-decoration: none;
          padding: 14px 28px;
          border: 1px solid var(--border);
          border-radius: 2px;
          transition: background 0.3s ease, color 0.3s ease, border-color 0.3s ease;
        }
        .ab-btn:hover { background: var(--ember); color: #F2F2F0; border-color: var(--ember); }
        @media (max-width: 768px) {
          .ab-wrap { flex-direction: column !important; gap: 40px !important; align-items: flex-start !important; }
        }
      `}</style>
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
        borderTop: "1px solid var(--border)",
        padding: "48px 32px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Link href="/home" style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "18px", letterSpacing: "0.02em", color: "var(--ink)", textDecoration: "none" }}>
        AIDEN URBINE
      </Link>

      <div style={{ display: "flex", gap: 32 }}>
        <a href="https://instagram.com/urbineaiden" target="_blank" rel="noopener noreferrer" className="ft-link" style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--muted)", textDecoration: "none", letterSpacing: "0.15em" }}>
          @urbineaiden
        </a>
        <a href="mailto:aiden@aidenurbine.com" className="ft-link" style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--muted)", textDecoration: "none", letterSpacing: "0.15em" }}>
          aiden@aidenurbine.com
        </a>
      </div>

      <style>{`
        .ft-link { transition: color 0.3s; }
        .ft-link:hover { color: var(--ink); }
        @media (max-width: 768px) {
          .site-footer { flex-direction: column !important; gap: 24px !important; text-align: center !important; }
        }
      `}</style>
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
      <WorkGrid />
      <Statement />
      <About />
      <Footer />
    </main>
  );
}

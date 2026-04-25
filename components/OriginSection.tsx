"use client";

import { useEffect, useRef } from "react";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")";

// Story lines fire after the title has cleared (progress 0.45+)
const THRESHOLDS = [
  { key: "label", at: 0.45 },
  { key: "line1", at: 0.50 },
  { key: "line2", at: 0.54 },
  { key: "line3", at: 0.58 },
  { key: "line4", at: 0.62 },
  { key: "line5", at: 0.66 },
  { key: "final", at: 0.70 },
] as const;

export default function OriginSection() {
  const titleTopRef  = useRef<HTMLDivElement>(null);
  const titleBotRef  = useRef<HTMLDivElement>(null);
  const storyRef     = useRef<HTMLDivElement>(null);

  const labelRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLParagraphElement>(null);
  const line2Ref = useRef<HTMLParagraphElement>(null);
  const line3Ref = useRef<HTMLParagraphElement>(null);
  const line4Ref = useRef<HTMLParagraphElement>(null);
  const line5Ref = useRef<HTMLParagraphElement>(null);
  const finalRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    let raf = 0;
    const fired = new Set<string>();

    const refMap: Record<string, React.RefObject<HTMLElement | null>> = {
      label: labelRef,
      line1: line1Ref,
      line2: line2Ref,
      line3: line3Ref,
      line4: line4Ref,
      line5: line5Ref,
      final: finalRef,
    };

    function reveal(key: string) {
      if (fired.has(key)) return;
      const el = refMap[key]?.current;
      if (!el) return;
      fired.add(key);
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }

    function update() {
      const scrollY = window.scrollY;
      // 220vh container, 100vh sticky → usable scroll range = 1.2 × innerHeight
      const scrollRange = 1.2 * window.innerHeight;
      const progress = Math.min(1, scrollY / scrollRange);

      // Background: parallax — image translates within oversized wrapper
      const heroBg = document.getElementById("hero-bg");
      if (heroBg) {
        const bgProgress = Math.min(scrollY / window.innerHeight, 1);
        heroBg.style.transform = `translateY(-${bgProgress * 15}%)`;
      }

      // Title split: stays still 0–0.2, exits between 0.2 and 0.6 — tectonic, slow
      const t = Math.max(0, Math.min(1, (progress - 0.2) / 0.4));
      const offset = t * window.innerHeight;
      if (titleTopRef.current) {
        titleTopRef.current.style.transform = `translateY(${-offset}px)`;
      }
      if (titleBotRef.current) {
        titleBotRef.current.style.transform = `translateY(${offset}px)`;
      }

      // Story wrapper: opacity 0 → 1 between progress 0.45 and 0.75
      if (storyRef.current) {
        const storyOpacity = Math.max(0, Math.min(1, (progress - 0.45) / 0.3));
        storyRef.current.style.opacity = String(storyOpacity);
      }

      // Individual story line reveals via CSS transition
      for (const { key, at } of THRESHOLDS) {
        if (progress > at) reveal(key);
      }
    }

    function onScroll() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const revealBase: React.CSSProperties = {
    opacity: 0,
    transform: "translateY(40px)",
    transition: "opacity 0.7s ease, transform 0.9s cubic-bezier(0.16,1,0.3,1)",
  };

  const storyLine: React.CSSProperties = {
    ...revealBase,
    fontFamily: "var(--font-body)",
    fontSize: "clamp(24px, 3.5vw, 44px)",
    fontStyle: "italic",
    color: "var(--bone)",
    lineHeight: 1.5,
    margin: "0 0 0.05em",
    textAlign: "center",
    maxWidth: 640,
    width: "100%",
  };

  const titleStyle: React.CSSProperties = {
    fontFamily: "var(--font-display)",
    fontWeight: 700,
    fontSize: "clamp(24px, 4.5vw, 60px)",
    letterSpacing: "0.08em",
    color: "var(--bone)",
    textAlign: "center",
    lineHeight: 1.1,
    margin: 0,
    padding: "0 clamp(16px, 4vw, 48px)",
    textShadow: "0 1px 20px rgba(200,75,42,0.15)",
    willChange: "transform",
  };

  const titleWrap: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    zIndex: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "none",
    willChange: "transform",
  };

  return (
    <div style={{ height: "220vh" }}>
      <section
        style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}
      >
        {/* Background image — oversized wrapper gives 60% buffer for parallax movement */}
        <div
          style={{
            position: "absolute",
            top: "-30%",
            left: 0,
            right: 0,
            bottom: "-30%",
            zIndex: 0,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            id="hero-bg"
            src="/images/PERSONAL HOMEPAGE.jpg"
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center top",
              willChange: "transform",
              display: "block",
            }}
          />
        </div>

        {/* Grain */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            opacity: 0.05,
            pointerEvents: "none",
            backgroundImage: GRAIN,
            backgroundRepeat: "repeat",
            backgroundSize: "200px 200px",
          }}
        />

        {/* Dark overlay */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: "var(--black)",
            opacity: 0.82,
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        {/* Title — top half */}
        <div ref={titleTopRef} style={titleWrap}>
          <h1 style={{ ...titleStyle, clipPath: "inset(0 0 50% 0)" }}>
            AIDEN URBINE CREATIVE
          </h1>
        </div>

        {/* Title — bottom half */}
        <div ref={titleBotRef} style={titleWrap}>
          <h1 style={{ ...titleStyle, clipPath: "inset(50% 0 0 0)" }}>
            AIDEN URBINE CREATIVE
          </h1>
        </div>

        {/* Story content — centered in viewport, separate layer from title */}
        <div
          ref={storyRef}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 5,
            opacity: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 clamp(24px, 6vw, 80px)",
          }}
        >
          {/* Ember label */}
          <div
            ref={labelRef}
            style={{
              ...revealBase,
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 28,
            }}
          >
            <div
              style={{
                width: 28,
                height: 1,
                background: "var(--ember)",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "9px",
                letterSpacing: "0.25em",
                fontWeight: 300,
                color: "var(--ember)",
                textTransform: "uppercase",
              }}
            >
              The Long Way Here
            </span>
          </div>

          {/* Story lines */}
          <p ref={line1Ref} style={storyLine}>Twelve years behind a lens.</p>
          <p ref={line2Ref} style={storyLine}>Shaped by the West —</p>
          <p ref={line3Ref} style={storyLine}>mountains, surf, and open road.</p>
          <p ref={line4Ref} style={storyLine}>Outdoor brand focused content creator.</p>
          <p ref={line5Ref} style={storyLine}>Built to solve problems.</p>

          {/* Final ember line */}
          <p
            ref={finalRef}
            style={{
              ...revealBase,
              fontFamily: "var(--font-body)",
              fontSize: "clamp(28px, 4vw, 52px)",
              fontStyle: "italic",
              color: "var(--ember)",
              lineHeight: 1.4,
              margin: "0.5em 0 0",
              textAlign: "center",
              maxWidth: 640,
              width: "100%",
            }}
          >
            Let&apos;s work together.
          </p>
        </div>
      </section>
    </div>
  );
}

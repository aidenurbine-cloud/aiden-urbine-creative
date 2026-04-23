"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")";

// Thresholds at which each story element fires
const THRESHOLDS = [
  { key: "label",    at: 0.15 },
  { key: "line1",    at: 0.25 },
  { key: "line2",    at: 0.35 },
  { key: "line3",    at: 0.45 },
  { key: "line4",    at: 0.55 },
  { key: "line5",    at: 0.65 },
  { key: "line6",    at: 0.72 },
  { key: "final",    at: 0.82 },
  { key: "location", at: 0.90 },
] as const;

export default function OriginSection() {
  // Mechanical refs
  const overlayRef   = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const titleTopRef  = useRef<HTMLDivElement>(null);
  const titleBotRef  = useRef<HTMLDivElement>(null);
  const emberLineRef = useRef<HTMLDivElement>(null);

  // Threshold reveal refs
  const labelRef    = useRef<HTMLDivElement>(null);
  const line1Ref    = useRef<HTMLParagraphElement>(null);
  const line2Ref    = useRef<HTMLParagraphElement>(null);
  const line3Ref    = useRef<HTMLParagraphElement>(null);
  const line4Ref    = useRef<HTMLParagraphElement>(null);
  const line5Ref    = useRef<HTMLParagraphElement>(null);
  const line6Ref    = useRef<HTMLParagraphElement>(null);
  const finalRef    = useRef<HTMLParagraphElement>(null);
  const locationRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    let raf = 0;
    const fired = new Set<string>();

    const refMap: Record<string, React.RefObject<HTMLElement | null>> = {
      label:    labelRef,
      line1:    line1Ref,
      line2:    line2Ref,
      line3:    line3Ref,
      line4:    line4Ref,
      line5:    line5Ref,
      line6:    line6Ref,
      final:    finalRef,
      location: locationRef,
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
      const progress = Math.min(1, window.scrollY / window.innerHeight);

      // ── Mechanical ──────────────────────────────────────────────────────────

      // Dark overlay: 0.92 → 0.65
      if (overlayRef.current) {
        overlayRef.current.style.opacity = String(0.92 - progress * 0.27);
      }

      // Image: scale 1.1 → 1.0
      if (imageWrapRef.current) {
        imageWrapRef.current.style.transform = `scale(${1.1 - progress * 0.1})`;
      }

      // Title split + fade: opacity 1 → 0.15 by progress 0.6
      const titleOpacity = Math.max(0.15, 1 - progress * (0.85 / 0.6));
      if (titleTopRef.current) {
        titleTopRef.current.style.transform = `translateY(${progress * -120}px)`;
        titleTopRef.current.style.opacity   = String(titleOpacity);
      }
      if (titleBotRef.current) {
        titleBotRef.current.style.transform = `translateY(${progress * 120}px)`;
        titleBotRef.current.style.opacity   = String(titleOpacity);
      }

      // Ember line: 0 → 120px over progress 0.20 → 0.38
      if (emberLineRef.current) {
        const t = Math.max(0, Math.min(1, (progress - 0.20) / 0.18));
        emberLineRef.current.style.width = `${t * 120}px`;
      }

      // ── Threshold reveals ────────────────────────────────────────────────────
      for (const { key, at } of THRESHOLDS) {
        if (progress > at) reveal(key);
      }
    }

    function onScroll() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    update(); // paint initial state synchronously

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // ─────────────────────────────────────────────────────────────────────────────
  // Shared styles
  // ─────────────────────────────────────────────────────────────────────────────

  const revealBase: React.CSSProperties = {
    opacity: 0,
    transform: "translateY(40px)",
    transition: "opacity 0.7s ease, transform 0.9s cubic-bezier(0.16,1,0.3,1)",
  };

  const storyLine: React.CSSProperties = {
    ...revealBase,
    fontFamily: "var(--font-cormorant)",
    fontSize: "clamp(28px, 4vw, 52px)",
    fontStyle: "italic",
    fontWeight: 300,
    color: "var(--bone)",
    lineHeight: 1.5,
    margin: "0 0 0.1em",
    textAlign: "center",
    maxWidth: 680,
    width: "100%",
  };

  const titleStyle: React.CSSProperties = {
    fontFamily: "var(--font-bebas)",
    fontSize: "clamp(80px, 13vw, 190px)",
    letterSpacing: "0.04em",
    color: "var(--cream)",
    textAlign: "center",
    lineHeight: 1.05,
    margin: 0,
    padding: "0 clamp(16px, 4vw, 48px)",
    textShadow: "0 1px 20px rgba(200,75,42,0.15)",
    whiteSpace: "nowrap",
    willChange: "transform",
  };

  const titleWrap: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    zIndex: 3,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "none",
    willChange: "transform, opacity",
  };

  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <div style={{ height: "400vh" }}>
      <section
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {/* ── Background image ── */}
        <div
          ref={imageWrapRef}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            transformOrigin: "center center",
            transform: "scale(1.1)",
            willChange: "transform",
          }}
        >
          <Image
            src="/images/PERSONAL HOMEPAGE.jpg"
            alt=""
            fill
            priority
            className="object-cover"
            style={{ objectPosition: "center 40%" }}
          />
        </div>

        {/* ── Grain ── */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            opacity: 0.06,
            pointerEvents: "none",
            backgroundImage: GRAIN,
            backgroundRepeat: "repeat",
            backgroundSize: "200px 200px",
          }}
        />

        {/* ── Dark overlay ── */}
        <div
          ref={overlayRef}
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: "var(--black)",
            opacity: 0.92,
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        {/* ── Title — top half ── */}
        <div ref={titleTopRef} style={titleWrap}>
          <h1 style={{ ...titleStyle, clipPath: "inset(0 0 50% 0)" }}>
            AIDEN URBINE CREATIVE
          </h1>
        </div>

        {/* ── Title — bottom half ── */}
        <div ref={titleBotRef} style={titleWrap}>
          <h1 style={{ ...titleStyle, clipPath: "inset(50% 0 0 0)" }}>
            AIDEN URBINE CREATIVE
          </h1>
        </div>

        {/* ── Story content — rises from the gap ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 clamp(24px, 6vw, 80px)",
          }}
        >
          {/* Label row */}
          <div
            ref={labelRef}
            style={{
              ...revealBase,
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 24,
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
                fontFamily: "var(--font-dm-mono)",
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

          {/* Ember fuse — draws left to right */}
          <div
            style={{
              width: "100%",
              maxWidth: 680,
              marginBottom: 24,
            }}
          >
            <div
              ref={emberLineRef}
              style={{
                height: 1,
                width: 0,
                background: "var(--ember)",
              }}
            />
          </div>

          {/* Story lines */}
          <p ref={line1Ref} style={storyLine}>Twenty-two years shaped</p>
          <p ref={line2Ref} style={storyLine}>by rivers and mountains.</p>
          <p ref={line3Ref} style={storyLine}>My dad was a kayaker</p>
          <p ref={line4Ref} style={storyLine}>and a photographer.</p>
          <p ref={line5Ref} style={storyLine}>I was behind a camera</p>
          <p ref={line6Ref} style={storyLine}>before I had a license.</p>

          {/* Final line — bigger, ember */}
          <p
            ref={finalRef}
            style={{
              ...revealBase,
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(32px, 5vw, 60px)",
              fontStyle: "italic",
              fontWeight: 300,
              color: "var(--ember)",
              lineHeight: 1.4,
              margin: "0.6em 0 0",
              textAlign: "center",
              maxWidth: 680,
              width: "100%",
            }}
          >
            That&apos;s still how I work.
          </p>
        </div>

        {/* ── Location — bottom ── */}
        <div
          style={{
            position: "absolute",
            bottom: "clamp(32px, 5vh, 56px)",
            left: 0,
            right: 0,
            zIndex: 5,
            display: "flex",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <p
            ref={locationRef}
            style={{
              ...revealBase,
              fontFamily: "var(--font-dm-mono)",
              fontSize: "9px",
              letterSpacing: "0.4em",
              fontWeight: 300,
              color: "rgba(212,207,196,0.4)",
              textTransform: "uppercase",
            }}
          >
            MISSOULA · MONTANA · MMXXVI
          </p>
        </div>

        {/* ── Bottom gradient — eases into ProjectCarousel ── */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: "auto 0 0 0",
            height: "22%",
            background: "linear-gradient(to top, var(--black) 0%, transparent 100%)",
            zIndex: 6,
            pointerEvents: "none",
          }}
        />
      </section>
    </div>
  );
}

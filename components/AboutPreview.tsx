"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function AboutPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // Fade-up on enter
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
        observer.disconnect();
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Parallax on the headshot
  useEffect(() => {
    const section = sectionRef.current;
    const img = imgRef.current;
    if (!section || !img) return;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionH = section.offsetHeight;
      const vpH = window.innerHeight;
      // 0 = section entering bottom of viewport, 1 = section leaving top
      const progress = (vpH - rect.top) / (vpH + sectionH);
      img.style.transform = `translateY(${(progress - 0.5) * 18}%)`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#1A1208",
        minHeight: 700,
        padding: "120px 56px",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        opacity: 0,
        transform: "translateY(32px)",
        transition: "opacity 0.7s ease, transform 0.9s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      {/* Portrait — oversized vertically to allow parallax travel */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src="/images/aiden-portrait.jpg"
        alt=""
        style={{
          position: "absolute",
          right: 0,
          top: "-15%",
          width: "50%",
          height: "130%",
          objectFit: "cover",
          objectPosition: "right center",
          zIndex: 0,
          display: "block",
          willChange: "transform",
        }}
      />

      {/* Left-edge soft fade — kills the hard line where photo meets dead space */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "44%",
          top: 0,
          bottom: 0,
          width: "10%",
          background: "linear-gradient(to right, #1A1208 0%, transparent 100%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Main gradient — burns dead space dark, fades off headshot */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "22%",
          right: 0,
          top: 0,
          bottom: 0,
          background:
            "linear-gradient(to right, #1A1208 0%, #1A1208 12%, rgba(26,18,8,0.92) 28%, rgba(26,18,8,0.65) 46%, rgba(26,18,8,0.2) 63%, rgba(26,18,8,0) 76%)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* Text */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          maxWidth: 360,
          marginLeft: "8%",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "9px",
            letterSpacing: "0.25em",
            fontWeight: 300,
            color: "#C84B2A",
            textTransform: "uppercase",
            margin: "0 0 16px",
          }}
        >
          The Photographer
        </p>

        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(36px, 4vw, 56px)",
            color: "#F2EDE4",
            lineHeight: 0.95,
            letterSpacing: "-0.01em",
            margin: 0,
          }}
        >
          Twelve years.
          <br />
          One eye.
        </h2>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontStyle: "italic",
            fontSize: 17,
            color: "#8C7B65",
            lineHeight: 1.9,
            marginTop: 20,
            marginBottom: "1.2em",
          }}
        >
          Grew up on the Arkansas River in Buena Vista, Colorado. My dad was a
          kayaker and a photographer. I was behind a camera before I had a
          license.
        </p>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontStyle: "italic",
            fontSize: 17,
            color: "#8C7B65",
            lineHeight: 1.9,
            margin: 0,
          }}
        >
          Now based in Missoula, Montana. Shooting for outdoor and gear brands
          that mean something.
        </p>

        <Link
          href="/about"
          style={{
            display: "inline-block",
            marginTop: 24,
            fontFamily: "var(--font-mono)",
            fontSize: "9px",
            letterSpacing: "0.25em",
            fontWeight: 300,
            color: "#C84B2A",
            textTransform: "uppercase",
            textDecoration: "none",
            transition: "opacity 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          About Me →
        </Link>
      </div>
    </section>
  );
}

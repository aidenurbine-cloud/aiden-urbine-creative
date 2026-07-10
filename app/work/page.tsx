"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { BLUR } from "@/lib/blur";

// Index of every project. Mirrors the data in app/work/[slug]/page.tsx
// (slug/name/tag/preview) plus a location line for the card.
const PROJECTS = [
  { slug: "mkc",              name: "Montana Knife Co.", tag: "Photo + Video", location: "Missoula, MT",     image: "/images/preview/mkc%20preview.jpg" },
  { slug: "badfish",          name: "Badfish SUP",       tag: "Photo",         location: "Salida, CO",       image: "/images/preview/badfish-preview.jpg" },
  { slug: "marin-moto-ranch", name: "Marin Moto Ranch",  tag: "Photo + Video", location: "Marin County, CA", image: "/images/preview/marin-preview.jpg" },
  { slug: "rough-country",    name: "Rough Country",     tag: "Photo + Video", location: "Nationwide",       image: "/images/preview/rough-country-preview.jpg" },
  { slug: "personal",         name: "Personal",          tag: "Photo",         location: "The West",         image: "/images/preview/personal-preview.jpg" },
];

export default function WorkIndexPage() {
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
    <main style={{ background: "var(--bg)", minHeight: "100vh" }}>
      {/* Top bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "28px 24px",
        }}
      >
        <Link
          href="/home"
          className="wi-logo"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "13px",
            color: "var(--ink)",
            letterSpacing: "0.3em",
            textDecoration: "none",
          }}
        >
          AUC
        </Link>
        <Link
          href="/contact"
          className="wi-contact"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 400,
            fontSize: "11px",
            color: "var(--muted)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            textDecoration: "none",
          }}
        >
          Contact
        </Link>
      </div>

      {/* Page header */}
      <div style={{ padding: "40px 24px 32px" }}>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: "var(--ember)",
            textTransform: "uppercase",
            letterSpacing: "0.35em",
            margin: "0 0 16px",
          }}
        >
          Portfolio · {String(PROJECTS.length).padStart(2, "0")} Projects
        </p>
        <h1
          className="wi-title"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(48px, 9vw, 120px)",
            color: "var(--ink)",
            lineHeight: 0.9,
            letterSpacing: "-0.02em",
            margin: 0,
          }}
        >
          SELECTED WORK
        </h1>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 300,
            fontSize: "clamp(16px, 2vw, 20px)",
            color: "var(--muted)",
            lineHeight: 1.7,
            maxWidth: 560,
            margin: "24px 0 0",
          }}
        >
          Photo and video for outdoor, lifestyle, and gear brands. Shot where the
          work lives.
        </p>
      </div>

      {/* Grid */}
      <div
        className="wi-grid"
        style={{
          padding: "16px 24px 120px",
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
              aria-label={`${project.name} · ${project.tag}`}
              style={{
                position: "relative",
                overflow: "hidden",
                aspectRatio: "16/9",
                background: "var(--card)",
                gridColumn: isLast ? "1 / -1" : undefined,
                borderRadius: "4px",
                transition:
                  "transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s ease",
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

      {/* Footer */}
      <footer
        className="site-footer"
        style={{
          background: "var(--bg)",
          borderTop: "1px solid var(--border)",
          padding: "40px 56px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link
          href="/home"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "13px",
            letterSpacing: "-0.02em",
            color: "var(--ink)",
            textDecoration: "none",
          }}
        >
          AIDEN URBINE
        </Link>

        <div style={{ display: "flex", gap: 32 }}>
          <a
            href="https://instagram.com/urbineaiden"
            target="_blank"
            rel="noopener noreferrer"
            className="wi-foot"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              color: "var(--muted)",
              textDecoration: "none",
              letterSpacing: "0.15em",
            }}
          >
            @urbineaiden
          </a>
          <Link
            href="/contact"
            className="wi-foot"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              color: "var(--muted)",
              textDecoration: "none",
              letterSpacing: "0.15em",
            }}
          >
            Contact
          </Link>
        </div>
      </footer>

      <style>{`
        .wc { display: block; text-decoration: none; }
        .wc:hover, .wc:focus-visible { transform: translateY(-6px); box-shadow: 0 24px 60px rgba(20,20,18,0.2); outline: none; }
        .wc-img { transition: transform 0.6s ease, filter 0.6s ease; filter: grayscale(1); }
        .wc:hover .wc-img, .wc:focus-visible .wc-img { transform: scale(1.04); filter: grayscale(0); }
        .wc-name { opacity: 0; transform: translateY(8px); transition: opacity 0.4s ease, transform 0.4s ease; }
        .wc:hover .wc-name, .wc:focus-visible .wc-name { opacity: 1; transform: translateY(0); }

        .wi-logo, .wi-contact, .wi-foot { transition: color 0.3s; }
        .wi-logo:hover, .wi-foot:hover { color: var(--ink) !important; }
        .wi-contact:hover { color: var(--ember) !important; }

        @media (max-width: 768px) {
          .wi-grid { grid-template-columns: 1fr !important; padding: 8px 16px 80px !important; }
          .wc { aspect-ratio: 4/3 !important; grid-column: auto !important; }
          .wc-img { filter: none !important; }
          .wc-name { opacity: 1 !important; transform: none !important; }
          .site-footer {
            flex-direction: column !important;
            gap: 24px !important;
            align-items: center !important;
            text-align: center !important;
          }
        }
      `}</style>
    </main>
  );
}

"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    title: "MONTANA KNIFE CO.",
    tag: "Photo + Video",
    location: "Missoula, MT",
    image: "/images/mkc/mkc mexico-376.jpg",
    href: "/work/montana-knife-company",
  },
  {
    title: "MARIN MOTO RANCH",
    tag: "Photo + Video",
    location: "Montana",
    image: "/images/MMR HOMEPAGE.JPG",
    href: "/work/marin-moto-ranch",
  },
  {
    title: "BADFISH SUP",
    tag: "Photo + Video",
    location: "Salida, CO",
    image: "/images/BADFISH homepage opreview.jpg",
    href: "/work/badfish",
  },
  {
    title: "ROUGH COUNTRY",
    tag: "Photo + Video",
    location: "Nationwide",
    image: "/images/ROUGH COUNTRY BACKGROUND.png",
    href: "/work/rough-country",
  },
  {
    title: "TURTLEBOX",
    tag: "Video",
    location: "Austin, TX",
    image: "/images/ROUGH COUNTRY BACKGROUND.png",
    href: "/work/turtlebox",
  },
  {
    title: "PERSONAL",
    tag: "Photo",
    location: "Montana",
    image: "/images/PERSONAL HOMEPAGE.jpg",
    href: "/work/personal-collection",
  },
];

const LAST = projects.length - 1;

export default function ProjectCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [fillKey, setFillKey] = useState(0);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const dragStartX = useRef<number | null>(null);
  const isDragging = useRef(false);

  const goTo = useCallback((index: number) => {
    setCurrent(index);
    setFillKey((k) => k + 1);
    setPaused(false);
  }, []);

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(() => {
      setCurrent((c) => {
        const next = c >= LAST ? 0 : c + 1;
        setFillKey((k) => k + 1);
        return next;
      });
    }, 6000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [current, paused]);

  // Drag — mouse
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    dragStartX.current = e.clientX;
    isDragging.current = true;
  }, []);

  const onMouseUp = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging.current || dragStartX.current === null) return;
      isDragging.current = false;
      const delta = e.clientX - dragStartX.current;
      dragStartX.current = null;
      if (Math.abs(delta) < 60) return;
      if (delta < 0 && current < LAST) goTo(current + 1);
      if (delta > 0 && current > 0) goTo(current - 1);
    },
    [current, goTo]
  );

  const onMouseLeave = useCallback(() => {
    isDragging.current = false;
    dragStartX.current = null;
  }, []);

  // Drag — touch
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    dragStartX.current = e.touches[0].clientX;
  }, []);

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (dragStartX.current === null) return;
      const delta = e.changedTouches[0].clientX - dragStartX.current;
      dragStartX.current = null;
      if (Math.abs(delta) < 60) return;
      if (delta < 0 && current < LAST) goTo(current + 1);
      if (delta > 0 && current > 0) goTo(current - 1);
    },
    [current, goTo]
  );

  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#1A1208",
        paddingTop: 80,
        paddingBottom: 0,
        userSelect: "none",
      }}
    >
      {/* Section heading */}
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "9px",
          letterSpacing: "0.25em",
          color: "var(--ember)",
          textTransform: "uppercase",
          fontWeight: 300,
          paddingLeft: 80,
          marginBottom: 32,
        }}
      >
        Selected Work
      </p>

      {/* Track */}
      <div
        style={{
          display: "flex",
          width: "100%",
          willChange: "transform",
          transition: "transform 0.75s cubic-bezier(0.16,1,0.3,1)",
          transform: `translateX(calc(-${current} * 100%))`,
        }}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {projects.map((project, i) => (
          <div
            key={project.title}
            style={{
              width: "100%",
              flexShrink: 0,
              padding: "0 80px",
              boxSizing: "border-box",
            }}
          >
            <Link
              href={project.href}
              className="carousel-card-inner"
              style={{
                display: "block",
                width: "100%",
                height: "75vh",
                position: "relative",
                cursor: "none",
              }}
              draggable={false}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 80vw"
                className="object-cover"
                priority={i === 0}
                draggable={false}
              />

              {/* Gradient overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(26,18,8,0.92) 0%, rgba(26,18,8,0.3) 50%, transparent 100%)",
                  zIndex: 1,
                  pointerEvents: "none",
                }}
              />

              {/* Ember bottom line */}
              <div
                className="carousel-ember-line"
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  height: 2,
                  background: "#C84B2A",
                  zIndex: 3,
                  pointerEvents: "none",
                }}
              />

              {/* View Project label */}
              <div
                className="carousel-view-label"
                style={{
                  position: "absolute",
                  bottom: 40,
                  right: 40,
                  fontFamily: "var(--font-mono)",
                  fontSize: "9px",
                  letterSpacing: "0.25em",
                  fontWeight: 300,
                  color: "#F2EDE4",
                  textTransform: "uppercase",
                  zIndex: 3,
                  pointerEvents: "none",
                }}
              >
                View Project →
              </div>

              {/* Text content */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  padding: 40,
                  zIndex: 2,
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
                    marginBottom: 8,
                  }}
                >
                  {project.tag}
                </p>

                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "clamp(40px, 6vw, 80px)",
                    color: "#F2EDE4",
                    letterSpacing: "-0.01em",
                    lineHeight: 0.95,
                    margin: 0,
                    textTransform: "uppercase",
                  }}
                >
                  {project.title}
                </h3>

                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "9px",
                    letterSpacing: "0.25em",
                    fontWeight: 300,
                    color: "#8C7B65",
                    textTransform: "uppercase",
                    marginTop: 10,
                  }}
                >
                  {project.location}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Left arrow */}
      <button
        aria-label="Previous project"
        onClick={() => goTo(current - 1)}
        className="carousel-arrow-btn"
        style={{
          position: "absolute",
          top: "calc(40px + 37.5vh)",
          left: 96,
          transform: "translateY(-50%)",
          width: 44,
          height: 44,
          background: "rgba(26,18,8,0.7)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "0.5px solid rgba(242,237,228,0.15)",
          color: "#F2EDE4",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "none",
          zIndex: 10,
          opacity: current === 0 ? 0 : 1,
          pointerEvents: current === 0 ? "none" : "auto",
          transition: "opacity 0.3s ease",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M9 2L4 7L9 12" stroke="#F2EDE4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Right arrow */}
      <button
        aria-label="Next project"
        onClick={() => goTo(current + 1)}
        className="carousel-arrow-btn"
        style={{
          position: "absolute",
          top: "calc(40px + 37.5vh)",
          right: 96,
          transform: "translateY(-50%)",
          width: 44,
          height: 44,
          background: "rgba(26,18,8,0.7)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "0.5px solid rgba(242,237,228,0.15)",
          color: "#F2EDE4",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "none",
          zIndex: 10,
          opacity: current === LAST ? 0 : 1,
          pointerEvents: current === LAST ? "none" : "auto",
          transition: "opacity 0.3s ease",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M5 2L10 7L5 12" stroke="#F2EDE4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Pill */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 16,
          paddingBottom: 48,
        }}
      >
        <div
          className="carousel-pill"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            background: "rgba(26,18,8,0.8)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "0.5px solid rgba(242,237,228,0.08)",
            padding: "10px 18px",
          }}
        >
          {/* Progress segments */}
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {projects.map((p, i) => (
              <button
                key={p.title}
                aria-label={`Go to ${p.title}`}
                onClick={() => goTo(i)}
                className="carousel-segment"
                style={{
                  height: 2,
                  width: i === current ? 40 : 18,
                  background:
                    i === current
                      ? "rgba(242,237,228,0.12)"
                      : "rgba(242,237,228,0.15)",
                  border: "none",
                  padding: 0,
                  cursor: "none",
                  position: "relative",
                  flexShrink: 0,
                  transition: "width 0.4s ease",
                }}
              >
                {i === current && (
                  <div
                    key={fillKey}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      height: "100%",
                      width: "0%",
                      background: "#C84B2A",
                      animation: `fillBar 6s linear forwards`,
                      animationPlayState: paused ? "paused" : "running",
                    }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div
            style={{
              width: 1,
              height: 10,
              background: "rgba(242,237,228,0.1)",
              margin: "0 4px",
              flexShrink: 0,
            }}
          />

          {/* Pause / Play */}
          <button
            aria-label={paused ? "Play" : "Pause"}
            onClick={() => setPaused((p) => !p)}
            className="carousel-pause-btn"
            style={{
              width: 28,
              height: 28,
              border: "0.5px solid rgba(242,237,228,0.15)",
              background: "transparent",
              color: "rgba(242,237,228,0.7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "none",
              flexShrink: 0,
              transition: "color 0.2s ease",
            }}
          >
            {paused ? (
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <polygon points="2,1 9,5 2,9" fill="currentColor" />
              </svg>
            ) : (
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <rect x="1" y="1" width="3" height="8" rx="0" fill="currentColor" />
                <rect x="6" y="1" width="3" height="8" rx="0" fill="currentColor" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}

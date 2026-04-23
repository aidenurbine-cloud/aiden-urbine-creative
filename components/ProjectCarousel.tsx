"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

type Slide = {
  slug: string;
  client: string;
  tag: string;
  location: string;
  image: string;
  href: string;
};

const SLIDES: Slide[] = [
  {
    slug: "montana-knife-company",
    client: "Montana Knife Co",
    tag: "Photo + Video",
    location: "Missoula, MT",
    image: "/images/mkc/mkc mexico-376.jpg",
    href: "/work/montana-knife-company",
  },
  {
    slug: "marin-moto-ranch",
    client: "Marin Moto Ranch",
    tag: "Photo + Video",
    location: "Montana",
    image: "/images/MMR HOMEPAGE.jpg",
    href: "/work/marin-moto-ranch",
  },
  {
    slug: "badfish",
    client: "Badfish SUP",
    tag: "Photo + Video",
    location: "Salida, CO",
    image: "/images/BADFISH homepage opreview.jpg",
    href: "/work/badfish",
  },
  {
    slug: "rough-country",
    client: "Rough Country",
    tag: "Photo + Video",
    location: "Nationwide",
    image: "/images/ROUGH COUNTRY BACKGROUND.png",
    href: "/work/rough-country",
  },
  {
    slug: "turtlebox",
    client: "Turtlebox",
    tag: "Video",
    location: "Austin, TX",
    image: "/images/turtlebox/turtlebox-hero.jpg",
    href: "/work/turtlebox",
  },
  {
    slug: "personal-collection",
    client: "Personal",
    tag: "Photo",
    location: "Montana",
    image: "/images/PERSONAL HOMEPAGE.jpg",
    href: "/work/personal-collection",
  },
];

const CARD_W = "min(70vw, calc(100vw - 80px))";
const GAP = 16;
const AUTO_DURATION = 6000;
const RESUME_DELAY = 3000;

// ── Segment — single progress indicator ──────────────────────────────────────

function Segment({
  isActive,
  animKey,
  isAnimating,
  userInteracted,
  onClick,
  label,
}: {
  isActive: boolean;
  animKey: number;
  isAnimating: boolean;
  userInteracted: boolean;
  onClick: () => void;
  label: string;
}) {
  const fillStyle: React.CSSProperties = userInteracted
    ? { width: "100%", height: "100%", background: "var(--ember)" }
    : {
        width: "0%",
        height: "100%",
        background: "var(--ember)",
        animation: `segmentFill ${AUTO_DURATION}ms linear forwards`,
        animationPlayState: isAnimating ? "running" : "paused",
      };

  return (
    <button
      aria-label={label}
      onClick={onClick}
      style={{
        height: 2,
        width: isActive ? 48 : 24,
        borderRadius: 100,
        background: isActive ? "transparent" : "rgba(242,237,228,0.2)",
        border: "none",
        padding: 0,
        cursor: "none",
        position: "relative",
        overflow: "hidden",
        flexShrink: 0,
        transition: "width 0.4s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      {isActive && (
        <div key={animKey} style={fillStyle} />
      )}
    </button>
  );
}

// ── Play / Pause icon ─────────────────────────────────────────────────────────

function PlayPauseIcon({ playing }: { playing: boolean }) {
  if (playing) {
    return (
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <rect x="1" y="1" width="3" height="8" rx="0.5" fill="var(--bone)" />
        <rect x="6" y="1" width="3" height="8" rx="0.5" fill="var(--bone)" />
      </svg>
    );
  }
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <polygon points="2,1 9,5 2,9" fill="var(--bone)" />
    </svg>
  );
}

// ── Carousel card ─────────────────────────────────────────────────────────────

function CarouselCard({
  slide,
  index,
  activeIndex,
}: {
  slide: Slide;
  index: number;
  activeIndex: number;
}) {
  const isActive = index === activeIndex;

  return (
    <Link
      href={slide.href}
      className="carousel-card block relative flex-shrink-0"
      style={{
        width: CARD_W,
        height: "75vh",
        transform: isActive ? "scale(1)" : "scale(0.95)",
        transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <Image
        src={slide.image}
        alt={slide.client}
        fill
        sizes="70vw"
        className="object-cover"
        priority={index === 0}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(26,18,8,0.9) 0%, rgba(26,18,8,0.3) 50%, transparent 100%)",
          zIndex: 1,
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{ boxShadow: "inset 0 0 80px rgba(26,18,8,0.4)", zIndex: 2 }}
      />

      <div className="absolute bottom-0 left-0" style={{ zIndex: 3, padding: 48 }}>
        <p className="label-text mb-3">{slide.tag}</p>

        <div
          style={{
            height: 1,
            background: "var(--ember)",
            marginBottom: 16,
            width: isActive ? 40 : 0,
            transition: "width 0.5s cubic-bezier(0.16,1,0.3,1)",
            transitionDelay: isActive ? "0.15s" : "0s",
          }}
        />

        <h3
          className="font-display text-bone uppercase"
          style={{
            fontSize: "clamp(56px, 8vw, 110px)",
            letterSpacing: "-0.01em",
            lineHeight: 0.9,
          }}
        >
          {slide.client}
        </h3>

        <p
          className="mt-3 uppercase"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "9px",
            letterSpacing: "0.25em",
            fontWeight: 300,
            color: "rgba(242,237,228,0.5)",
          }}
        >
          {slide.location}
        </p>
      </div>
    </Link>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function ProjectCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoEnabled, setAutoEnabled] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isAnimating = autoEnabled && !isHovering && !userInteracted;

  // ── Auto-advance ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isAnimating) return;
    const timer = setTimeout(() => {
      setActiveIndex((i) => (i + 1) % SLIDES.length);
      setAnimKey((k) => k + 1);
    }, AUTO_DURATION);
    return () => clearTimeout(timer);
  }, [activeIndex, isAnimating]);

  // ── Cleanup resume timer on unmount ─────────────────────────────────────────
  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, []);

  // ── Manual navigation ───────────────────────────────────────────────────────
  const goTo = useCallback((i: number) => {
    setActiveIndex(i);
    setUserInteracted(true);
    setAnimKey((k) => k + 1);

    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      setUserInteracted(false);
      setAnimKey((k) => k + 1);
    }, RESUME_DELAY);
  }, []);

  // ── Hover handlers ──────────────────────────────────────────────────────────
  const handleMouseEnter = useCallback(() => setIsHovering(true), []);
  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setAnimKey((k) => k + 1);
  }, []);

  // ── Play / Pause toggle ─────────────────────────────────────────────────────
  const togglePlay = useCallback(() => {
    setAutoEnabled((prev) => {
      if (!prev) setAnimKey((k) => k + 1);
      return !prev;
    });
  }, []);

  const translateX = `calc(15vw - ${activeIndex} * (${CARD_W} + ${GAP}px))`;

  return (
    <section
      className="bg-black"
      style={{
        position: "relative",
        zIndex: 2,
        paddingTop: "clamp(48px, 8vw, 96px)",
        paddingBottom: "clamp(48px, 6vw, 80px)",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Section heading */}
      <motion.h2
        className="font-display text-cream uppercase"
        style={{
          fontSize: "clamp(48px, 6vw, 80px)",
          letterSpacing: "-0.01em",
          paddingLeft: "clamp(24px, 5vw, 80px)",
          marginBottom: "clamp(24px, 4vw, 48px)",
        }}
        initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, amount: 0.5 }}
      >
        Selected Work
      </motion.h2>

      {/* Carousel viewport */}
      <motion.div
        style={{ overflow: "hidden" }}
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        viewport={{ once: true, amount: 0.1 }}
      >
        <div
          style={{
            display: "flex",
            gap: GAP,
            transform: `translateX(${translateX})`,
            transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
            willChange: "transform",
          }}
        >
          {SLIDES.map((slide, i) => (
            <CarouselCard
              key={slide.slug}
              slide={slide}
              index={i}
              activeIndex={activeIndex}
            />
          ))}
        </div>
      </motion.div>

      {/* Floating pill controls */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "clamp(20px, 3vw, 32px)",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            padding: "8px 16px",
            background: "rgba(26,18,8,0.7)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "0.5px solid rgba(242,237,228,0.08)",
            borderRadius: 100,
          }}
        >
          {/* Segment indicators */}
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {SLIDES.map((slide, i) => (
              <Segment
                key={slide.slug}
                isActive={i === activeIndex}
                animKey={animKey}
                isAnimating={isAnimating}
                userInteracted={userInteracted && i === activeIndex}
                onClick={() => goTo(i)}
                label={`Go to ${slide.client}`}
              />
            ))}
          </div>

          {/* Divider */}
          <div
            style={{
              width: 1,
              height: 12,
              background: "rgba(242,237,228,0.15)",
              flexShrink: 0,
            }}
          />

          {/* Play / Pause button */}
          <button
            aria-label={autoEnabled ? "Pause auto-scroll" : "Play auto-scroll"}
            onClick={togglePlay}
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              border: "0.5px solid rgba(242,237,228,0.2)",
              background: "transparent",
              cursor: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              transition: "border-color 0.2s ease",
            }}
          >
            <PlayPauseIcon playing={autoEnabled} />
          </button>
        </div>
      </div>
    </section>
  );
}

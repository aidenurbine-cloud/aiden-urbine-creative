"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { projects, type Project } from "@/lib/projects";

const SLIDE_DURATION = 5000;

function ReelCard({ project }: { project: Project }) {
  return (
    <div className="relative w-full h-full overflow-hidden bg-charcoal">
      <Image
        src={project.hero}
        alt={project.title}
        fill
        sizes="100vw"
        className="object-cover object-center"
        style={{ zIndex: 0 }}
        priority
      />

      {/* Dark overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "rgba(10,10,8,0.45)", zIndex: 1 }}
      />

      {/* Bottom gradient */}
      <div
        className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
        style={{
          background: "linear-gradient(to top, #0A0A08 0%, transparent 100%)",
          zIndex: 2,
        }}
      />

      {/* Grain */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 3,
          opacity: 0.06,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
        }}
      />

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-14" style={{ zIndex: 4 }}>
        <p
          className="mb-2 uppercase"
          style={{
            fontFamily: "var(--font-dm-mono)",
            fontSize: "9px",
            letterSpacing: "0.25em",
            fontWeight: 300,
            color: "#C84B2A",
          }}
        >
          {project.tag}
        </p>
        <h3
          className="text-bone uppercase leading-none"
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            letterSpacing: "-0.01em",
          }}
        >
          {project.title}
        </h3>
      </div>
    </div>
  );
}

function ProgressPill({
  index,
  active,
  isPlaying,
  onReset,
}: {
  index: number;
  active: boolean;
  isPlaying: boolean;
  onReset: () => void;
}) {
  return (
    <button
      onClick={onReset}
      className="relative overflow-hidden"
      style={{
        height: 3,
        width: active ? 48 : 16,
        background: "#2A2A26",
        transition: "width 0.4s cubic-bezier(0.16,1,0.3,1)",
        flexShrink: 0,
        border: "none",
        padding: 0,
        cursor: "pointer",
      }}
      aria-label={`Go to slide ${index + 1}`}
    >
      {active && (
        <motion.div
          key={`${index}-${isPlaying}`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isPlaying ? 1 : undefined }}
          transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
          style={{
            position: "absolute",
            inset: 0,
            background: "#EDE9E0",
            transformOrigin: "left",
          }}
        />
      )}
      {active && !isPlaying && (
        <div style={{ position: "absolute", inset: 0, background: "#EDE9E0", opacity: 0.4 }} />
      )}
    </button>
  );
}

export default function PortfolioReel() {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback((index: number) => {
    setCurrent(index);
    setIsPlaying(true);
  }, []);

  const advance = useCallback(() => {
    setCurrent((c) => (c + 1) % projects.length);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    timerRef.current = setTimeout(advance, SLIDE_DURATION);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current, isPlaying, advance]);

  const togglePlay = () => {
    setIsPlaying((p) => !p);
  };

  return (
    <section className="bg-black pt-4 pb-24">
      {/* Header */}
      <div className="px-8 md:px-16 lg:px-24 mb-10 flex items-end justify-between">
        <p
          className="uppercase"
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(1.4rem, 2.5vw, 2.2rem)",
            letterSpacing: "0.08em",
            color: "#2A2A26",
          }}
        >
          Selected Work
        </p>
        <p
          className="text-bone/20"
          style={{
            fontFamily: "var(--font-dm-mono)",
            fontSize: "9px",
            letterSpacing: "0.25em",
            fontWeight: 300,
          }}
        >
          {String(current + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
        </p>
      </div>

      {/* Slide */}
      <div className="relative overflow-hidden" style={{ height: "70vh" }}>
        <AnimatePresence mode="sync">
          <motion.div
            key={current}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link href={`/work/${projects[current].slug}`} className="block w-full h-full">
              <ReelCard project={projects[current]} />
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls — centered pill capsule */}
      <div className="mt-6 flex justify-center">
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            background: "#161614",
            border: "1px solid #2A2A26",
            padding: "10px 20px",
            borderRadius: 999,
          }}
        >
          {/* Play/pause */}
          <button
            onClick={togglePlay}
            style={{
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 16,
              height: 16,
              flexShrink: 0,
              opacity: 0.6,
            }}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <svg width="8" height="10" viewBox="0 0 8 10" fill="none">
                <rect x="0" y="0" width="2.5" height="10" fill="#D4CFC4" />
                <rect x="5.5" y="0" width="2.5" height="10" fill="#D4CFC4" />
              </svg>
            ) : (
              <svg width="8" height="10" viewBox="0 0 8 10" fill="none">
                <path d="M0 0L8 5L0 10V0Z" fill="#D4CFC4" />
              </svg>
            )}
          </button>

          {/* Divider */}
          <div style={{ width: 1, height: 12, background: "#2A2A26", flexShrink: 0 }} />

          {/* Pills */}
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {projects.map((_, i) => (
              <ProgressPill
                key={i}
                index={i}
                active={i === current}
                isPlaying={isPlaying}
                onReset={() => goTo(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

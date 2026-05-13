"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

export interface GalleryItem {
  type: "image" | "video";
  src: string;
  poster?: string;
  vimeoId?: string;
  alt?: string;
}

interface GalleryProps {
  items: GalleryItem[];
  clientName: string;
  tag: string;
  location: string;
  rowPattern?: RowPattern;
}

// 12-item repeating pattern. Each entry describes one row.
// Positions not listed are consumed individually as full-width fallback.
const PATTERN: Array<{ height: string; count: number; flexes: number[] }> = [
  { height: "85vh", count: 1, flexes: [1] },
  { height: "65vh", count: 2, flexes: [0.6, 0.4] },
  { height: "85vh", count: 1, flexes: [1] },
  { height: "60vh", count: 3, flexes: [1, 1, 1] },
  { height: "65vh", count: 2, flexes: [0.65, 0.35] },
  { height: "85vh", count: 1, flexes: [1] },
  { height: "65vh", count: 2, flexes: [1, 1] },
];

type RowPattern = Array<{ height: string; count: number; flexes: number[] }>;

function buildRows(items: GalleryItem[], pattern: RowPattern) {
  const rows: Array<{
    height: string;
    flexes: number[];
    items: GalleryItem[];
    startIndex: number;
  }> = [];

  const cycleLen = pattern.reduce((sum, p) => sum + p.count, 0);
  let i = 0;
  while (i < items.length) {
    const cyclePos = i % cycleLen;
    let patternRow = pattern[pattern.length - 1];
    let consumed = 0;
    for (const p of pattern) {
      if (cyclePos === consumed) {
        patternRow = p;
        break;
      }
      consumed += p.count;
    }

    const slice = items.slice(i, i + patternRow.count);
    if (slice.length === 0) break;

    rows.push({
      height: patternRow.height,
      flexes: patternRow.flexes.slice(0, slice.length),
      items: slice,
      startIndex: i,
    });
    i += slice.length;
  }
  return rows;
}

function PlayIcon() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          background: "rgba(26,18,8,0.6)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          border: "1px solid rgba(242,237,228,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <polygon points="5,3 13,8 5,13" fill="#F2EDE4" />
        </svg>
      </div>
    </div>
  );
}

function GridSlot({
  item,
  flex,
  height,
  onClick,
  globalIndex,
}: {
  item: GalleryItem;
  flex: number;
  height: string;
  onClick: () => void;
  globalIndex: number;
}) {
  const [hovered, setHovered] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.style.transitionDelay = `${(globalIndex % 3) * 0.1}s`;
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
        observer.disconnect();
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [globalIndex]);

  return (
    <div
      ref={wrapperRef}
      style={{
        position: "relative",
        flex,
        height,
        overflow: "hidden",
        minWidth: 0,
        cursor: "pointer",
      }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {item.type === "video" && item.vimeoId ? (
        <>
          <iframe
            src={`https://player.vimeo.com/video/${item.vimeoId}?background=1&autoplay=1&loop=1&muted=1`}
            frameBorder={0}
            allow="autoplay"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "177.78%",
              height: "100%",
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
            }}
          />
          <PlayIcon />
        </>
      ) : (
        <>
          <Image
            src={item.src}
            alt={item.alt ?? ""}
            fill
            sizes="(max-width: 768px) 100vw, 60vw"
            style={{
              objectFit: "cover",
              objectPosition: "center 20%",
              transition: "transform 0.4s ease",
              transform: hovered ? "scale(1.02)" : "scale(1)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(26,18,8,0.25)",
              opacity: hovered ? 1 : 0,
              transition: "opacity 0.4s ease",
              pointerEvents: "none",
            }}
          />
        </>
      )}
    </div>
  );
}

function LightboxMedia({ item }: { item: GalleryItem }) {
  if (item.type === "video" && item.vimeoId) {
    return (
      <iframe
        src={`https://player.vimeo.com/video/${item.vimeoId}?autoplay=1&controls=1&title=0&byline=0`}
        frameBorder={0}
        allow="autoplay; fullscreen"
        allowFullScreen
        style={{
          width: "min(90vw, calc(160vh * 16 / 9))",
          height: "min(85vh, calc(90vw * 9 / 16))",
          display: "block",
        }}
      />
    );
  }

  // Plain <img> so the browser sizes it naturally by aspect ratio.
  // next/image fill requires a fixed-size container which clips tall images.
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={item.src}
      alt={item.alt ?? ""}
      style={{
        maxWidth: "90vw",
        maxHeight: "calc(100vh - 160px)",
        width: "auto",
        height: "auto",
        display: "block",
        objectFit: "contain",
      }}
    />
  );
}

export default function Gallery({ items, clientName, rowPattern }: GalleryProps) {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const filmstripRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const currentIndexRef = useRef(currentIndex);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => { currentIndexRef.current = currentIndex; }, [currentIndex]);

  const total = items.length;

  const goTo = useCallback(
    (index: number) => {
      setCurrentIndex(((index % total) + total) % total);
    },
    [total]
  );

  const openAt = useCallback(
    (index: number) => {
      setCurrentIndex(index);
      setIsOpen(true);
    },
    []
  );

  const close = useCallback(() => setIsOpen(false), []);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Keyboard navigation — reads currentIndexRef so this effect only runs on open/close
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goTo(currentIndexRef.current - 1);
      else if (e.key === "ArrowRight") goTo(currentIndexRef.current + 1);
      else if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, goTo, close]);

  // Filmstrip auto-scroll
  useEffect(() => {
    if (!isOpen || !filmstripRef.current) return;
    const strip = filmstripRef.current;
    const thumb = strip.children[currentIndex] as HTMLElement | undefined;
    if (!thumb) return;
    const center = thumb.offsetLeft - strip.clientWidth / 2 + thumb.clientWidth / 2;
    strip.scrollTo({ left: center, behavior: "smooth" });
  }, [isOpen, currentIndex]);

  // Touch swipe
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartX.current === null) return;
      const delta = e.changedTouches[0].clientX - touchStartX.current;
      touchStartX.current = null;
      if (Math.abs(delta) < 50) return;
      goTo(currentIndexRef.current + (delta < 0 ? 1 : -1));
    },
    [goTo]
  );

  const rows = useMemo(() => buildRows(items, rowPattern ?? PATTERN), [items, rowPattern]);

  return (
    <>
      {/* Grid — full bleed wrapper */}
      <div
        style={{
          background: "var(--bg)",
          display: "flex",
          flexDirection: "column",
          gap: 3,
          padding: 0,
          width: "100%",
        }}
      >
        {rows.map((row, ri) => (
          <div
            key={ri}
            style={{ display: "flex", gap: 3, height: row.height }}
          >
            {row.items.map((item, ii) => (
              <GridSlot
                key={ii}
                item={item}
                flex={row.flexes[ii]}
                height={row.height}
                globalIndex={row.startIndex + ii}
                onClick={() => openAt(row.startIndex + ii)}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Lightbox — rendered into document.body via portal so no ancestor
          transform/overflow/stacking context can trap or clip it */}
      {mounted && isOpen && createPortal(
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(14,11,8,0.97)",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Top bar */}
          <div
            style={{
              padding: "20px 32px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 500,
                  fontSize: 14,
                  letterSpacing: "0.1em",
                  color: "#F2EDE4",
                }}
              >
                {clientName}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "9px",
                  letterSpacing: "0.25em",
                  fontWeight: 300,
                  color: "#8C7B65",
                }}
              >
                / {currentIndex + 1} of {total}
              </span>
            </div>
            <button
              onClick={close}
              style={{
                background: "none",
                border: "none",
                fontFamily: "var(--font-mono)",
                fontSize: 14,
                color: "#8C7B65",
                cursor: "pointer",
                padding: "4px 8px",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#F2EDE4")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#8C7B65")}
            >
              ✕
            </button>
          </div>

          {/* Main content */}
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              minHeight: 0,
            }}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <LightboxMedia item={items[currentIndex]} />

            {/* Left arrow */}
            <button
              onClick={() => goTo(currentIndex - 1)}
              aria-label="Previous"
              style={{
                position: "absolute",
                left: 16,
                top: "50%",
                transform: "translateY(-50%)",
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "rgba(26,18,8,0.8)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "0.5px solid rgba(242,237,228,0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 3L5 8L10 13" stroke="#F2EDE4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Right arrow */}
            <button
              onClick={() => goTo(currentIndex + 1)}
              aria-label="Next"
              style={{
                position: "absolute",
                right: 16,
                top: "50%",
                transform: "translateY(-50%)",
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "rgba(26,18,8,0.8)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "0.5px solid rgba(242,237,228,0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 3L11 8L6 13" stroke="#F2EDE4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Filmstrip */}
          <div
            ref={filmstripRef}
            style={{
              height: 72,
              background: "rgba(10,8,5,0.9)",
              padding: "8px 16px",
              display: "flex",
              gap: 4,
              overflowX: "auto",
              scrollbarWidth: "none",
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            {items.map((item, i) => {
              const isActive = i === currentIndex;
              const thumbSrc = item.poster ?? (item.type === "image" ? item.src : "");
              return (
                <div
                  key={i}
                  onClick={() => goTo(i)}
                  style={{
                    position: "relative",
                    width: 80,
                    height: 56,
                    flexShrink: 0,
                    cursor: "pointer",
                    opacity: isActive ? 1 : 0.4,
                    border: isActive
                      ? "1px solid #C84B2A"
                      : "1px solid transparent",
                    transition: "opacity 0.2s ease, border-color 0.2s ease",
                    overflow: "hidden",
                  }}
                >
                  {thumbSrc ? (
                    <Image
                      src={thumbSrc}
                      alt=""
                      fill
                      sizes="80px"
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    <div style={{ background: "#2A2A26", width: "100%", height: "100%" }} />
                  )}
                  {item.type === "video" && (
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        pointerEvents: "none",
                      }}
                    >
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <polygon points="2,1 9,5 2,9" fill="#F2EDE4" />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

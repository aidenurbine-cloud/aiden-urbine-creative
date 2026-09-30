"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Photo from "./Photo";
import type { Photo as PhotoType } from "@/lib/projects";

export type FeedItem = PhotoType & { alt: string; caption?: string; href?: string };

const isTall = (p: PhotoType) => p.w / p.h < 1.15;

// Placement on a 12-column grid: column start, span, and how far to push it down (% of width).
type Spot = { col: number; span: number; drop: number };
type Row = { idx: number[]; spots: Spot[] };

// Hand-tuned so the layout feels loose, not gridded.
// Each list cycles; the row's shape (wide, tall pair, wide + tall...) picks the list.
const WIDE: Spot[][] = [
  [{ col: 1, span: 9, drop: 0 }],
  [{ col: 4, span: 9, drop: 0 }],
  [{ col: 2, span: 10, drop: 0 }],
];
const PAIR: Spot[][] = [
  [{ col: 1, span: 5, drop: 0 }, { col: 7, span: 5, drop: 14 }],
  [{ col: 2, span: 5, drop: 10 }, { col: 8, span: 5, drop: 0 }],
  [{ col: 1, span: 6, drop: 0 }, { col: 8, span: 4, drop: 22 }],
];
const WIDE_TALL: Spot[][] = [
  [{ col: 1, span: 8, drop: 0 }, { col: 9, span: 4, drop: 18 }],
  [{ col: 5, span: 8, drop: 8 }, { col: 1, span: 4, drop: 0 }],
];
const TALL: Spot[][] = [
  [{ col: 4, span: 5, drop: 0 }],
  [{ col: 7, span: 5, drop: 0 }],
  [{ col: 2, span: 5, drop: 0 }],
];

function layout(items: FeedItem[]): Row[] {
  const rows: Row[] = [];
  const seen = { wide: 0, pair: 0, mixed: 0, tall: 0 };
  const pick = (list: Spot[][], key: keyof typeof seen) => list[seen[key]++ % list.length];
  for (let i = 0; i < items.length; i++) {
    const a = items[i];
    const b = items[i + 1];
    if (!isTall(a)) {
      if (b && isTall(b) && seen.wide % 2 === 0) {
        rows.push({ idx: [i, i + 1], spots: pick(WIDE_TALL, "mixed") });
        i++;
      } else rows.push({ idx: [i], spots: pick(WIDE, "wide") });
      seen.wide++;
    } else if (b && isTall(b)) {
      rows.push({ idx: [i, i + 1], spots: pick(PAIR, "pair") });
      i++;
    } else rows.push({ idx: [i], spots: pick(TALL, "tall") });
  }
  return rows;
}

export default function Feed({ items, priority = 1 }: { items: FeedItem[]; priority?: number }) {
  const [open, setOpen] = useState<number | null>(null);
  const touchX = useRef<number | null>(null);
  const n = items.length;

  const go = useCallback((d: number) => setOpen((o) => (o === null ? o : (o + d + n) % n)), [n]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, go]);

  const cur = open === null ? null : items[open];

  return (
    <>
      <div className="table">
        {layout(items).map((r) => (
          <div key={r.idx[0]} className="table-row">
            {r.idx.map((i, k) => {
              const it = items[i];
              const s = r.spots[k];
              return (
                <figure
                  key={i}
                  className={`snap${isTall(it) ? " is-tall" : ""}`}
                  style={
                    {
                      gridColumn: `${s.col} / span ${s.span}`,
                      "--drop": `${s.drop}%`,
                    } as React.CSSProperties
                  }
                >
                  <button type="button" className="snap-btn" onClick={() => setOpen(i)} aria-label={`View ${it.alt} full screen`}>
                    <Photo
                      photo={it}
                      alt={it.alt}
                      sizes={`(min-width: 900px) ${Math.round((s.span / 12) * 66)}vw, ${isTall(it) ? 50 : 100}vw`}
                      priority={i < priority}
                    />
                  </button>
                  {it.caption && <figcaption className="snap-cap">{it.caption}</figcaption>}
                </figure>
              );
            })}
          </div>
        ))}
      </div>

      {cur && open !== null && (
        <div
          className="viewer"
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onClick={() => setOpen(null)}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          <div className="viewer-img">
            <Image key={cur.src} src={cur.src} alt={cur.alt} fill sizes="100vw" style={{ objectFit: "contain" }} />
          </div>
          <div className="viewer-bar" onClick={(e) => e.stopPropagation()}>
            <span>
              {open + 1} / {n}
              {cur.caption && cur.href && (
                <>
                  {" · "}
                  <Link href={cur.href}>{cur.caption} →</Link>
                </>
              )}
            </span>
            <span className="viewer-ctrls">
              <button type="button" onClick={() => go(-1)} aria-label="Previous photo">
                ←
              </button>
              <button type="button" onClick={() => go(1)} aria-label="Next photo">
                →
              </button>
              <button type="button" onClick={() => setOpen(null)}>
                close
              </button>
            </span>
          </div>
        </div>
      )}
    </>
  );
}

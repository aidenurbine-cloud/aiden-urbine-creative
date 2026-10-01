"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Photo from "./Photo";
import VideoTile from "./VideoTile";
import type { Photo as PhotoType, Media } from "@/lib/projects";

export type FeedItem = Media & { alt: string; caption?: string; href?: string };

const ratio = (p: PhotoType) => p.w / p.h;

// Justified rows: photos are grouped until their combined width/height ratio
// reaches the row's target, then the row is stretched edge to edge at one shared
// height. Targets cycle so some rows hold two frames and others four, which
// keeps it from looking like a grid. Nothing is cropped.
const DESKTOP = [2.3, 3.1, 2.0, 2.7];
const PHONE = [1.3]; // phones: two verticals, or one wide shot, per row

function rows(items: FeedItem[], targets: number[]) {
  const out: number[][] = [];
  let row: number[] = [];
  let sum = 0;
  items.forEach((it, i) => {
    row.push(i);
    sum += ratio(it);
    if (sum >= targets[out.length % targets.length]) {
      out.push(row);
      row = [];
      sum = 0;
    }
  });
  if (row.length) out.push(row);
  return out;
}

function usePhone() {
  const [phone, setPhone] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 699px)");
    const on = () => setPhone(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return phone;
}

export default function Feed({ items, priority = 1 }: { items: FeedItem[]; priority?: number }) {
  const [open, setOpen] = useState<number | null>(null);
  const touchX = useRef<number | null>(null);
  const phone = usePhone();
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
  const grouped = rows(items, phone ? PHONE : DESKTOP);

  return (
    <>
      <div className="grid">
        {grouped.map((r, k) => {
          const total = r.reduce((a, i) => a + ratio(items[i]), 0);
          // A short last row shouldn't blow up to full width.
          const last = k === grouped.length - 1 && total < (phone ? 1 : 1.8);
          return (
            <div key={r[0]} className={`grid-row${last ? " is-last" : ""}`}>
              {r.map((i) => {
                const it = items[i];
                const share = ratio(it) / total;
                return (
                  <button
                    key={i}
                    type="button"
                    className="grid-cell"
                    style={{ flex: `${ratio(it)} 1 0` }}
                    onClick={() => setOpen(i)}
                    aria-label={`View ${it.alt} full screen`}
                  >
                    {it.type === "video" ? (
                      <VideoTile video={it} />
                    ) : (
                      <Photo
                        photo={it}
                        alt={it.alt}
                        sizes={`(min-width: 900px) ${Math.ceil(share * 75)}vw, ${Math.ceil(share * 100)}vw`}
                        priority={i < priority}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          );
        })}
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
            {cur.type === "video" ? (
              <video
                key={cur.src}
                className="viewer-video"
                src={cur.src}
                poster={cur.poster}
                controls
                autoPlay
                playsInline
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <Image key={cur.src} src={cur.src} alt={cur.alt} fill sizes="100vw" style={{ objectFit: "contain" }} />
            )}
          </div>
          <div className="viewer-bar" onClick={(e) => e.stopPropagation()}>
            <span>
              {cur.caption && cur.href && <Link href={cur.href}>{cur.caption} →</Link>}
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

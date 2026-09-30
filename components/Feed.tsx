"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Photo from "./Photo";
import type { Photo as PhotoType } from "@/lib/projects";

export type FeedItem = PhotoType & { alt: string; caption?: string; href?: string };

const isTall = (p: PhotoType) => p.w / p.h < 1.15;

// Stack photos in one column. Two tall frames in a row sit side by side,
// a lone tall frame gets its own row, pushed left or right.
function group(items: FeedItem[]) {
  const rows: { idx: number[]; kind: "wide" | "pair" | "solo"; right: boolean }[] = [];
  let solos = 0;
  for (let i = 0; i < items.length; i++) {
    if (!isTall(items[i])) rows.push({ idx: [i], kind: "wide", right: false });
    else if (items[i + 1] && isTall(items[i + 1])) {
      rows.push({ idx: [i, i + 1], kind: "pair", right: false });
      i++;
    } else rows.push({ idx: [i], kind: "solo", right: solos++ % 2 === 1 });
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

  const cell = (i: number, sizes: string) => {
    const it = items[i];
    return (
      <figure key={i} className="cell">
        <button type="button" className="cell-btn" onClick={() => setOpen(i)} aria-label={`View ${it.alt} full screen`}>
          <Photo photo={it} alt={it.alt} sizes={sizes} priority={i < priority} />
        </button>
        {it.caption && (
          <figcaption className="cell-cap">
            {it.href ? <Link href={it.href}>{it.caption}</Link> : it.caption}
          </figcaption>
        )}
      </figure>
    );
  };

  const cur = open === null ? null : items[open];

  return (
    <>
      <div className="feed">
        {group(items).map((r) => (
          <div key={r.idx[0]} className={`feed-row is-${r.kind}${r.right ? " is-right" : ""}`}>
            {r.kind === "wide" && cell(r.idx[0], "(min-width: 900px) 62vw, 100vw")}
            {r.kind === "pair" && r.idx.map((i) => cell(i, "(min-width: 900px) 31vw, 50vw"))}
            {r.kind === "solo" && cell(r.idx[0], "(min-width: 900px) 42vw, 80vw")}
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
              {cur.caption ? ` · ${cur.caption}` : ""}
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

"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";

// drag, click, or arrow keys to move the divider
export default function BeforeAfter({
  before,
  after,
  alt,
  priority = false,
}: {
  before: string;
  after: string;
  alt: string;
  priority?: boolean;
}) {
  const [pos, setPos] = useState(50);
  const box = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const moveTo = useCallback((clientX: number) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  }, []);

  return (
    <div
      ref={box}
      className="ba"
      onPointerDown={(e) => {
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        moveTo(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && moveTo(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
    >
      <Image src={after} alt={`${alt}, graded`} fill sizes="(min-width: 900px) 70vw, 100vw" priority={priority} />
      <div className="ba-before" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={before} alt={`${alt}, flat LOG`} fill sizes="(min-width: 900px) 70vw, 100vw" priority={priority} />
      </div>
      <span className="ba-label ba-l">LOG</span>
      <span className="ba-label ba-r">GRADED</span>
      <div
        className="ba-handle"
        style={{ left: `${pos}%` }}
        role="slider"
        tabIndex={0}
        aria-label="Before and after divider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        onKeyDown={(e) => {
          const step = e.shiftKey ? 10 : 2;
          if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - step));
          else if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + step));
          else return;
          e.preventDefault();
        }}
      />
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let tx = -200, ty = -200;
    let rx = -200, ry = -200;
    let rafId: number;

    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t;
    }

    function tick() {
      rx = lerp(rx, tx, 0.1);
      ry = lerp(ry, ty, 0.1);
      if (ringRef.current) {
        ringRef.current.style.left = rx + "px";
        ringRef.current.style.top = ry + "px";
      }
      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);

    function onMove(e: MouseEvent) {
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + "px";
        dotRef.current.style.top = e.clientY + "px";
      }
      tx = e.clientX;
      ty = e.clientY;
    }

    document.addEventListener("mousemove", onMove);
    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{
          position: "fixed",
          top: "-200px",
          left: "-200px",
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#C84B2A",
          pointerEvents: "none",
          zIndex: 99999,
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{
          position: "fixed",
          top: "-200px",
          left: "-200px",
          width: 32,
          height: 32,
          borderRadius: "50%",
          border: "1px solid rgba(200,75,42,0.4)",
          background: "transparent",
          pointerEvents: "none",
          zIndex: 99998,
          transform: "translate(-50%, -50%)",
        }}
      />
    </>
  );
}

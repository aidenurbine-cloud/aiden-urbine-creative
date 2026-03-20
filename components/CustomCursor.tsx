"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useMotionValue(-132);
  const ringY = useMotionValue(-132);
  const [hovered, setHovered] = useState(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    let targetX = -100;
    let targetY = -100;
    let curX = -132;
    let curY = -132;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      curX = lerp(curX, targetX - 32, 0.12);
      curY = lerp(curY, targetY - 32, 0.12);
      ringX.set(curX);
      ringY.set(curY);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      dotX.set(e.clientX - 3);
      dotY.set(e.clientY - 3);
    };
    const onEnter = (e: MouseEvent) => {
      if ((e.target as Element).closest("a, button")) setHovered(true);
    };
    const onLeave = (e: MouseEvent) => {
      if ((e.target as Element).closest("a, button")) setHovered(false);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
    };
  }, [dotX, dotY, ringX, ringY]);

  return (
    <>
      {/* Dot — snaps exactly to cursor */}
      <motion.div
        className="fixed pointer-events-none"
        style={{
          x: dotX,
          y: dotY,
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#C84B2A",
          zIndex: 99999,
        }}
      />
      {/* Ring — lerps behind at 0.12, grows on hover */}
      <motion.div
        className="fixed pointer-events-none"
        animate={{
          scale: hovered ? 1 : 0.5,
          borderColor: hovered ? "#C84B2A" : "rgba(200,75,42,0.35)",
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        style={{
          x: ringX,
          y: ringY,
          top: 0,
          left: 0,
          width: 64,
          height: 64,
          borderRadius: "50%",
          border: "1px solid rgba(200,75,42,0.35)",
          zIndex: 99998,
        }}
      />
    </>
  );
}

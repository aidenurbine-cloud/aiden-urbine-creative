"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function CVCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const [hovered, setHovered] = useState(false);

  const springX = useSpring(mouseX, { stiffness: 120, damping: 18, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 18, mass: 0.5 });

  // Dot: 6px, offset -3px
  const dotX = useTransform(mouseX, (v) => v - 3);
  const dotY = useTransform(mouseY, (v) => v - 3);

  // Ring: 64px base, offset -32px always
  const ringX = useTransform(springX, (v) => v - 32);
  const ringY = useTransform(springY, (v) => v - 32);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
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
    document.body.style.cursor = "none";

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
      document.body.style.cursor = "";
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed pointer-events-none"
        style={{
          x: dotX,
          y: dotY,
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#C84B2A",
          zIndex: 99999,
        }}
      />
      {/* Ring */}
      <motion.div
        className="fixed pointer-events-none"
        animate={{
          scale: hovered ? 1 : 0.5,
          borderColor: hovered ? "#C84B2A" : "rgba(200,75,42,0.35)",
        }}
        transition={{ duration: 0.3 }}
        style={{
          x: ringX,
          y: ringY,
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

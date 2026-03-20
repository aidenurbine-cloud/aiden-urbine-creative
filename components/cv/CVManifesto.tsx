"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const lines = [
  { text: "I GREW UP ON THE", sub: false },
  { text: "ARKANSAS RIVER.", sub: false },
  { text: "My dad was a kayaker and a photographer — he built his life around both.", sub: true },
  { text: "I was photographing whitewater rafters for his business before I had a driver's license.", sub: true },
  { text: "That's where the eye came from. That's where the hunger came from.", sub: true },
  { text: "I DIDN'T GROW UP WANTING", sub: false },
  { text: "TO BE IN MARKETING.", sub: false },
  { text: "I grew up wanting to make things that felt real.", sub: true },
  { text: "Turns out those two things aren't as different as I thought.", sub: true },
];

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function CVManifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30%" });

  return (
    <div
      className="min-h-screen flex flex-col justify-center"
      style={{ background: "#0A0A08", padding: "80px 56px" }}
    >
      <div ref={ref} className="max-w-[900px]">
        {lines.map((line, i) => (
          <span key={i} className="block overflow-hidden" style={{ marginBottom: 2 }}>
            <motion.span
              className="block"
              initial={{ y: "105%", color: line.sub ? "#4A4A44" : "#2A2A26" }}
              animate={
                isInView
                  ? { y: 0, color: line.sub ? "#7A7A72" : "#EDE9E0" }
                  : {}
              }
              transition={{
                y: { duration: 1, ease, delay: i * 0.2 },
                color: { duration: 0.8, delay: i * 0.2 },
              }}
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: line.sub
                  ? "clamp(24px, 3.5vw, 52px)"
                  : "clamp(40px, 6vw, 88px)",
                letterSpacing: "0.03em",
                lineHeight: 1,
                display: "block",
              }}
            >
              {line.text}
            </motion.span>
          </span>
        ))}
      </div>
    </div>
  );
}

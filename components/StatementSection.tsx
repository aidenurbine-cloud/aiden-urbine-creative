"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const lines = [
  { text: "NOT CONTENT.", color: "#2A2A26" },
  { text: "IMAGES", color: "#EDE9E0" },
  { text: "THAT HOLD UP.", color: "#2A2A26" },
];

const lineVariants = {
  hidden: { opacity: 0, y: 72 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      delay: i * 0.14,
    },
  }),
};

export default function StatementSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const inViewRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(inViewRef, { once: true, margin: "-15%" });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const onScroll = () => {
      rafRef.current = requestAnimationFrame(() => {
        const el = sectionRef.current;
        const text = textRef.current;
        if (!el || !text) return;

        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;

        // progress: 0 when section bottom is at 65% viewport, 1 when at 15%
        const raw = 1 - (rect.bottom - vh * 0.15) / (vh * 0.5);
        const progress = Math.max(0, Math.min(1, raw));

        text.style.transform = `scale(${1 + progress * 0.07})`;
        text.style.opacity = String(1 - progress);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-black py-32 md:py-44 overflow-hidden"
      style={{ position: "relative", zIndex: 2 }}
    >
      <div ref={inViewRef} />
      <div
        ref={textRef}
        className="flex flex-col gap-0 leading-none items-center text-center"
        style={{ willChange: "transform, opacity" }}
      >
        {lines.map((line, i) => (
          <div key={line.text} className="overflow-hidden">
            <motion.span
              className="block uppercase"
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "clamp(3rem, 10.5vw, 10rem)",
                letterSpacing: "-0.01em",
                lineHeight: 0.92,
                color: line.color,
              }}
              custom={i}
              variants={lineVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {line.text}
            </motion.span>
          </div>
        ))}
      </div>
    </section>
  );
}

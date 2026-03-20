"use client";

import { useRef } from "react";
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
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section className="bg-black py-32 md:py-44 overflow-hidden">
      <div ref={ref} className="flex flex-col gap-0 leading-none items-center text-center">
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

"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const skills = [
  {
    icon: "①",
    cat: "Camera & Production",
    title: "SHOOT & DIRECT",
    items: [
      { name: "Product Photo — Commercial & Editorial", pct: 100 },
      { name: "Video — Brand, Campaign & Vlog", pct: 100 },
      { name: "Short Form & Unboxing", pct: 100 },
      { name: "Natural & Studio Light", pct: 90 },
      { name: "Art Direction", pct: 90 },
    ],
  },
  {
    icon: "②",
    cat: "Post Production",
    title: "EDIT & FINISH",
    items: [
      { name: "Lightroom", pct: 100 },
      { name: "Premiere Pro", pct: 90 },
      { name: "DaVinci Resolve", pct: 90 },
      { name: "Photoshop", pct: 80 },
      { name: "After Effects", pct: 70 },
      { name: "Illustrator", pct: 60 },
    ],
  },
  {
    icon: "③",
    cat: "Brand & Digital",
    title: "STRATEGY & BRAND",
    items: [
      { name: "Shopify & Ecom Platforms", pct: 70 },
      { name: "Content Strategy", pct: 90 },
      { name: "Ambassador & Campaign Mgmt", pct: 90 },
    ],
  },
];

function SkillBlock({
  block,
  index,
  isInView,
}: {
  block: (typeof skills)[0];
  index: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      className="relative overflow-hidden group"
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut", delay: index * 0.1 }}
      style={{
        background: "#161614",
        border: "1px solid #2A2A26",
        padding: "48px 40px",
      }}
    >
      {/* Ghost number */}
      <div
        style={{
          position: "absolute",
          top: 16,
          right: 20,
          fontFamily: "var(--font-bebas)",
          fontSize: 80,
          color: "#2A2A26",
          lineHeight: 1,
          pointerEvents: "none",
          letterSpacing: "0.02em",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Ember bottom line on hover */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
        style={{ background: "#C84B2A" }}
      />

      {/* Category — main heading */}
      <div
        style={{
          fontFamily: "var(--font-bebas)",
          fontSize: 32,
          letterSpacing: "0.06em",
          color: "#EDE9E0",
          marginBottom: 6,
          lineHeight: 1,
        }}
      >
        {block.cat}
      </div>

      {/* Descriptor */}
      <div
        style={{
          fontFamily: "var(--font-dm-mono)",
          fontSize: "8px",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "#C84B2A",
          marginBottom: 28,
        }}
      >
        {block.title}
      </div>

      <ul style={{ listStyle: "none" }}>
        {block.items.map((item, j) => (
          <li
            key={j}
            style={{
              fontFamily: "var(--font-cormorant)",
              fontWeight: 300,
              fontSize: 14,
              color: "#7A7A72",
              lineHeight: 1.9,
              padding: "6px 0",
              borderBottom:
                j < block.items.length - 1 ? "1px solid #2A2A26" : "none",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {item.name}
            <div
              style={{
                width: 48,
                height: 1,
                background: "#2A2A26",
                position: "relative",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  height: "100%",
                  background: "#C84B2A",
                  width: `${item.pct}%`,
                }}
              />
            </div>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function CVSkills() {
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const eyeInView = useInView(eyebrowRef, { once: true, margin: "-5%" });
  const titleInView = useInView(titleRef, { once: true, margin: "-5%" });
  const gridInView = useInView(gridRef, { once: true, margin: "-5%" });

  return (
    <div
      className="min-h-screen flex flex-col items-start"
      style={{ background: "#0A0A08", padding: "120px 56px" }}
    >
      <motion.div
        ref={eyebrowRef}
        className="w-full flex items-center gap-4"
        initial={{ opacity: 0, x: -16 }}
        animate={eyeInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7 }}
        style={{ marginBottom: 64 }}
      >
        <span style={{
          fontFamily: "var(--font-dm-mono)",
          fontSize: "9px",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "#C84B2A",
          flexShrink: 0,
        }}>
          Core Skills
        </span>
        <span style={{
          flex: 1,
          height: 1,
          background: "#2A2A26",
          display: "block",
        }} />
      </motion.div>

      <motion.div
        ref={titleRef}
        initial={{ opacity: 0, y: 24 }}
        animate={titleInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.1 }}
        style={{
          fontFamily: "var(--font-bebas)",
          fontSize: "clamp(48px, 7vw, 96px)",
          letterSpacing: "0.04em",
          lineHeight: 0.95,
          color: "#EDE9E0",
          marginBottom: 16,
        }}
      >
        WHAT I<br />BRING
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={titleInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.3 }}
        style={{
          fontFamily: "var(--font-cormorant)",
          fontWeight: 300,
          fontStyle: "italic",
          fontSize: 16,
          color: "#4A4A44",
          marginBottom: 80,
          maxWidth: 480,
          lineHeight: 1.7,
        }}
      >
        Three disciplines. One operator. Shoot, edit, and direct — start to finish.
      </motion.p>

      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-3 w-full"
        style={{ gap: 2 }}
      >
        {skills.map((block, i) => (
          <SkillBlock
            key={i}
            block={block}
            index={i}
            isInView={gridInView}
          />
        ))}
      </div>
    </div>
  );
}

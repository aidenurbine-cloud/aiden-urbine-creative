"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const items = [
  {
    num: "01",
    title: "THE EYE STARTED HERE",
    sub: "Grew up on the Arkansas River in Buena Vista, Colorado. Shot thousands of rafting guests as a teenager — first camera, first understanding of timing under pressure. Relocated to Missoula. The West is not a backdrop. It's the subject.",
  },
  {
    num: "02",
    title: "BUILT THROUGH THE WORK",
    sub: "Founded Elevated Media House in high school. Moved to San Francisco to run operations and media for a fleet of 20+ campervans. Landed at Montana Knife Company — started on the production floor before ever touching a camera, then drove the brand from regional to national.",
  },
  {
    num: "03",
    title: "LIVES IN THE FIELD",
    sub: "Whitewater kayaker, freeride ski coach, and a firm believer in public lands. I spend as much time outside as I do behind a screen — and I think that shows up in the work. The instincts that read a river or a mountain are the same ones behind the camera.",
  },
];

export default function CVBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <div style={{ background: "#0A0A08", padding: "120px 56px" }}>
      {/* Label */}
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7 }}
        style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 80 }}
      >
        <span style={{
          fontFamily: "var(--font-dm-mono)",
          fontSize: "9px",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "#C84B2A",
        }}>
          Background
        </span>
        <span style={{ flex: 1, height: 1, background: "#2A2A26", display: "block" }} />
      </motion.div>

      {/* Items */}
      <div ref={ref}>
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            style={{
              display: "grid",
              gridTemplateColumns: "80px 1fr",
              gap: 48,
              paddingTop: 32,
              paddingBottom: 32,
              borderBottom: "1px solid #2A2A26",
            }}
          >
            <div style={{
              fontFamily: "var(--font-bebas)",
              fontSize: 36,
              color: "#2A2A26",
              lineHeight: 1,
              paddingTop: 4,
            }}>
              {item.num}
            </div>
            <div>
              <div style={{
                fontFamily: "var(--font-bebas)",
                fontSize: 26,
                letterSpacing: "0.06em",
                color: "#EDE9E0",
                marginBottom: 12,
              }}>
                {item.title}
              </div>
              <div style={{
                fontFamily: "var(--font-cormorant)",
                fontWeight: 300,
                fontSize: 15,
                fontStyle: "italic",
                color: "#7A7A72",
                lineHeight: 1.8,
                maxWidth: 600,
              }}>
                {item.sub}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

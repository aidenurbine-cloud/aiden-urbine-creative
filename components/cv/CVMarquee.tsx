"use client";

import { motion } from "framer-motion";

const clients = [
  "Montana Knife Company",
  "Turtlebox",
  "Rough Country",
  "Winnebago",
  "Simple Campers",
  "Elevated Media House",
];

// Duplicate for seamless loop
const doubled = [...clients, ...clients];

export default function CVMarquee() {
  return (
    <div
      className="overflow-hidden"
      style={{
        background: "#161614",
        borderTop: "1px solid #2A2A26",
        borderBottom: "1px solid #2A2A26",
        padding: "100px 0",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-dm-mono)",
          fontSize: "9px",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "#7A7A72",
          marginBottom: 48,
          padding: "0 56px",
        }}
      >
        Selected Clients &amp; Collaborators
      </p>

      <div className="overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity }}
        >
          {doubled.map((name, i) => (
            <span
              key={i}
              className="inline-flex items-center"
              style={{ padding: "0 40px", gap: 40 }}
            >
              <span
                className="transition-colors duration-300 hover:text-cream"
                style={{
                  fontFamily: "var(--font-bebas)",
                  fontSize: "clamp(36px, 5vw, 64px)",
                  letterSpacing: "0.06em",
                  color: "#4A4A44",
                  whiteSpace: "nowrap",
                  cursor: "default",
                }}
              >
                {name}
              </span>
              <span
                style={{
                  width: 4,
                  height: 4,
                  background: "#C84B2A",
                  borderRadius: "50%",
                  flexShrink: 0,
                  display: "inline-block",
                }}
              />
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

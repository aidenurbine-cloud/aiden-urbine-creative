"use client";

import { useState } from "react";

const clients = [
  "Montana Knife Co",
  "Rough Country",
  "Turtlebox",
  "Badfish SUP",
  "Marin Moto Ranch",
  "Winnebago",
  "Surf Hotel BV",
  "Forrest Tool Co",
];

function MarqueeInner() {
  return (
    <div style={{ display: "inline-flex", flexShrink: 0 }}>
      {clients.map((name) => (
        <span
          key={name}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 32,
            padding: "0 40px",
            whiteSpace: "nowrap",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: 18,
              color: "rgba(242,237,228,0.2)",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              transition: "all 0.5s ease",
              cursor: "default",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "rgba(242,237,228,0.85)";
              e.currentTarget.style.letterSpacing = "0.18em";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(242,237,228,0.2)";
              e.currentTarget.style.letterSpacing = "0.12em";
            }}
          >
            {name}
          </span>
          <span
            className="marquee-dot"
            style={{
              width: 4,
              height: 4,
              background: "#C84B2A",
              flexShrink: 0,
              display: "inline-block",
            }}
          />
        </span>
      ))}
    </div>
  );
}

export default function ClientStrip() {
  const [paused, setPaused] = useState(false);

  return (
    <div
      style={{
        background: "#1A1208",
        paddingTop: 32,
        paddingBottom: 32,
        overflow: "hidden",
        borderTop: "0.5px solid rgba(242,237,228,0.06)",
        borderBottom: "0.5px solid rgba(242,237,228,0.06)",
      }}
    >
      {/* Label */}
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "9px",
          letterSpacing: "0.25em",
          fontWeight: 300,
          color: "rgba(242,237,228,0.25)",
          textTransform: "uppercase",
          paddingLeft: 56,
          marginBottom: 24,
          marginTop: 0,
        }}
      >
        Clients &amp; Collaborators
      </p>

      {/* Single animated container with two copies — keyframe -50% creates seamless loop */}
      <div
        style={{
          display: "flex",
          animation: "marquee 70s linear infinite",
          animationPlayState: paused ? "paused" : "running",
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <MarqueeInner />
        <MarqueeInner />
      </div>
    </div>
  );
}

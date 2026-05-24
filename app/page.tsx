"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GatePage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [shaking, setShaking] = useState(false);
  const [focused, setFocused] = useState(false);
  const shakeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (shakeTimer.current) clearTimeout(shakeTimer.current);
  }, []);

  const attempt = () => {
    if (password === "monkies") {
      // Set cookie so middleware lets through /home and /work/*
      document.cookie = "auc-access=true; path=/; max-age=31536000; SameSite=Lax";
      router.push("/home");
    } else {
      if (shakeTimer.current) clearTimeout(shakeTimer.current);
      setShaking(true);
      shakeTimer.current = setTimeout(() => setShaking(false), 400);
      setPassword("");
    }
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") attempt();
  };

  return (
    <main
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg)",
      }}
    >
      {/* Grain texture */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: "-50%",
          width: "200%",
          height: "200%",
          zIndex: 1,
          opacity: 0.04,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
          pointerEvents: "none",
        }}
      />

      {/* Center content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(32px, 5vw, 64px)",
            color: "var(--bone)",
            letterSpacing: "-0.02em",
            lineHeight: 1,
            margin: 0,
          }}
        >
          AIDEN URBINE
        </h1>

        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "9px",
            letterSpacing: "0.25em",
            fontWeight: 300,
            color: "var(--ember)",
            textTransform: "uppercase",
            marginTop: 10,
            marginBottom: 0,
          }}
        >
          Outdoor Brand Content — Missoula, MT
        </p>

        <div
          style={{
            width: 48,
            height: 1,
            background: "var(--ember)",
            opacity: 0.4,
            margin: "36px auto",
          }}
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={onKey}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="password"
          autoComplete="off"
          style={{
            background: "transparent",
            border: "none",
            borderBottom: focused
              ? "1px solid var(--ember)"
              : "1px solid rgba(242,237,228,0.15)",
            width: 200,
            textAlign: "center",
            fontFamily: "var(--font-mono)",
            fontSize: "12px",
            letterSpacing: "0.2em",
            color: "var(--bone)",
            outline: "none",
            padding: "8px 0",
            transition: "border-color 0.3s",
            animation: shaking ? "shake 0.4s ease" : "none",
          }}
        />

        <button
          onClick={attempt}
          style={{
            marginTop: 28,
            background: "transparent",
            border: "none",
            fontFamily: "var(--font-mono)",
            fontSize: "9px",
            letterSpacing: "0.2em",
            color: "var(--ember)",
            textTransform: "uppercase",
            opacity: 0.6,
            transition: "opacity 0.3s",
            padding: 0,
            cursor: "pointer",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.6")}
        >
          Enter →
        </button>
      </div>

      <p
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          fontFamily: "var(--font-mono)",
          fontSize: "8px",
          letterSpacing: "0.2em",
          color: "rgba(242,237,228,0.2)",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
          margin: 0,
        }}
      >
        Est. MMXXVI — Missoula, Montana
      </p>
    </main>
  );
}

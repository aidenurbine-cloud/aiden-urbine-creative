"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function GatePage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [shaking, setShaking] = useState(false);
  const [focused, setFocused] = useState(false);

  const attempt = () => {
    if (password === "monkies") {
      localStorage.setItem("auc-access", "true");
      router.push("/home");
    } else {
      setShaking(true);
      setTimeout(() => setShaking(false), 400);
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
      }}
    >
      {/* Background photo */}
      <Image
        src="/images/PERSONAL HOMEPAGE.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "center", zIndex: 0 }}
      />

      {/* Gradient overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(26,18,8,0.3) 0%, rgba(26,18,8,0.5) 50%, rgba(26,18,8,0.7) 100%)",
          zIndex: 1,
        }}
      />

      {/* Grain texture */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: "-50%",
          width: "200%",
          height: "200%",
          zIndex: 2,
          opacity: 0.05,
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
          zIndex: 3,
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
            fontSize: "clamp(48px, 7vw, 96px)",
            color: "#F2EDE4",
            letterSpacing: "0.08em",
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
            letterSpacing: "0.3em",
            fontWeight: 300,
            color: "#C84B2A",
            textTransform: "uppercase",
            marginTop: 8,
            marginBottom: 0,
          }}
        >
          Creative — Missoula, MT
        </p>

        {/* Ember line */}
        <div
          style={{
            width: 60,
            height: 1,
            background: "#C84B2A",
            margin: "40px auto",
          }}
        />

        {/* Password input */}
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
              ? "1px solid #C84B2A"
              : "1px solid rgba(242,237,228,0.2)",
            width: 200,
            textAlign: "center",
            fontFamily: "var(--font-mono)",
            fontSize: "12px",
            letterSpacing: "0.2em",
            color: "#F2EDE4",
            outline: "none",
            padding: "8px 0",
            transition: "border-color 0.3s",
            animation: shaking ? "shake 0.4s ease" : "none",
          }}
        />

        {/* Submit */}
        <button
          onClick={attempt}
          style={{
            marginTop: 32,
            background: "transparent",
            border: "none",
            fontFamily: "var(--font-mono)",
            fontSize: "9px",
            letterSpacing: "0.2em",
            color: "#C84B2A",
            textTransform: "uppercase",
            opacity: 0.6,
            transition: "opacity 0.3s",
            padding: 0,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.6")}
        >
          Enter →
        </button>
      </div>

      {/* Bottom caption */}
      <p
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 3,
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

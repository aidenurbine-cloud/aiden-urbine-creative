"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function CVHero() {
  const { scrollY } = useScroll();
  const rawY = useTransform(scrollY, [0, 800], [0, 160]);
  const y = useSpring(rawY, { stiffness: 60, damping: 20, mass: 0.5 });

  return (
    <div
      className="relative min-h-screen flex flex-col justify-end items-start overflow-hidden"
      style={{ background: "#0A0A08", padding: "0 56px 80px" }}
    >
      {/* Parallax image — oversized so travel doesn't reveal gaps */}
      <motion.div
        style={{
          position: "absolute",
          inset: "-20%",
          y,
          zIndex: 0,
        }}
      >
        <Image
          src="/images/CV/landing cv.JPG"
          alt=""
          fill
          priority
          className="object-cover object-center"
          style={{ opacity: 0.45 }}
        />
      </motion.div>

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to top, #0A0A08 30%, rgba(10,10,8,0.3) 100%)",
          zIndex: 1,
        }}
      />

      {/* Year — rotated right */}
      <div
        className="absolute top-1/2 right-14 -translate-y-1/2 rotate-90"
        style={{
          fontFamily: "var(--font-dm-mono)",
          fontSize: "9px",
          letterSpacing: "0.4em",
          color: "#4A4A44",
          zIndex: 2,
        }}
      >
        MMXXVI
      </div>

      {/* Label */}
      <motion.div
        className="flex items-center gap-3 mb-7"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{
          fontFamily: "var(--font-dm-mono)",
          fontSize: "9px",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "#C84B2A",
          position: "relative",
          zIndex: 2,
        }}
      >
        <span style={{ width: 28, height: 1, background: "#C84B2A", display: "inline-block", flexShrink: 0 }} />
        Curriculum Vitae
      </motion.div>

      {/* Name */}
      <div
        style={{
          fontFamily: "var(--font-bebas)",
          fontSize: "clamp(80px, 14vw, 200px)",
          lineHeight: 0.88,
          letterSpacing: "0.02em",
          position: "relative",
          zIndex: 2,
        }}
      >
        {(["AIDEN", "URBINE"] as const).map((word, i) => (
          <div key={word} className="block overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.1 + i * 0.12 }}
              style={{ color: i === 1 ? "#4A4A44" : "#EDE9E0" }}
            >
              {word}
            </motion.span>
          </div>
        ))}
      </div>

      {/* Role */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.6 }}
        style={{
          fontFamily: "var(--font-cormorant)",
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: "clamp(18px, 2.5vw, 28px)",
          color: "#7A7A72",
          marginTop: 28,
          lineHeight: 1.5,
          position: "relative",
          zIndex: 2,
        }}
      >
        Creative Director — Photo, Video &amp; Brand<br />Missoula, Montana
      </motion.p>

      {/* Meta — bottom right */}
      <motion.div
        className="absolute bottom-20 right-14 flex flex-col items-end"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        style={{ zIndex: 2, gap: 10 }}
      >
        {[
          { label: "aidenurbine@gmail.com", href: "mailto:aidenurbine@gmail.com" },
          { label: "719.398.3168", href: "tel:7193983168" },
          { label: "aidenurbinecreative.com", href: "/" },
        ].map((item) => (
          <a
            key={item.label}
            href={item.href}
            style={{
              fontFamily: "var(--font-dm-mono)",
              fontSize: "9px",
              letterSpacing: "0.2em",
              color: "#D4CFC4",
              textDecoration: "none",
              opacity: 0.7,
            }}
          >
            {item.label}
          </a>
        ))}
      </motion.div>
    </div>
  );
}

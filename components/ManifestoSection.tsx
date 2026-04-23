"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export default function ManifestoSection() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "var(--black-warm)",
      }}
    >
      {/* Background image */}
      <Image
        src="/images/PERSONAL HOMEPAGE.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
        style={{ zIndex: 0, objectPosition: "bottom" }}
      />

      {/* Dark overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(14,12,9,0.65)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Grain */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          opacity: 0.06,
          pointerEvents: "none",
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          width: "100%",
          padding: "4rem clamp(2rem, 6vw, 6rem)",
        }}
      >
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}
        >
          <motion.p variants={item} className="label-text" style={{ marginBottom: "32px" }}>
            The Long Way Here
          </motion.p>

          <motion.p variants={item} className="manifesto-body" style={{ marginBottom: "1.5em" }}>
            Twenty-two years shaped by rivers and mountains. Grew up on the Arkansas in Buena
            Vista, Colorado — watching my dad build a life as a kayaker and photographer. Started
            shooting whitewater before I had a driver&apos;s license. The river taught me how to
            read light, read movement, and commit to the frame before the moment disappears.
          </motion.p>

          <motion.p variants={item} className="manifesto-body">
            That&apos;s still how I work.
          </motion.p>

          <motion.div variants={item} style={{ height: 48 }} />

          <motion.p
            variants={item}
            style={{
              fontFamily: "var(--font-bebas)",
              fontSize: "18px",
              color: "rgba(212,207,196,0.5)",
              letterSpacing: "0.3em",
            }}
          >
            MISSOULA, MONTANA
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

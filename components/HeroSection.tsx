"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import ScrollHint from "./ScrollHint";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const lineVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

const titleLines = ["Aiden", "Urbine", "Creative"];

export default function HeroSection() {
  return (
    <section className="grain-overlay relative w-full h-[100dvh] bg-black flex flex-col justify-center px-8 md:px-16 lg:px-24 overflow-hidden">

      {/* Background image */}
      <Image
        src="/images/hero image.JPG"
        alt=""
        fill
        priority
        className="object-cover object-center"
        style={{ zIndex: 0 }}
      />

      {/* Dark overlay 65% */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "rgba(10, 10, 8, 0.65)", zIndex: 1 }}
      />

      {/* Grain texture over image */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 3,
          opacity: 0.08,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
        }}
      />

      {/* Bottom gradient fade */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
        style={{
          background: "linear-gradient(to top, #0A0A08 0%, transparent 100%)",
          zIndex: 2,
        }}
      />

      {/* Content — sits above image, overlay, gradient, and grain (grain is z-10 via ::after) */}
      <motion.div
        className="relative"
        style={{ zIndex: 20 }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Ember label */}
        <motion.p className="label-text mb-6" variants={lineVariants}>
          — Photo &amp; Video
        </motion.p>

        {/* Brand name — staggered lines */}
        <h1 className="leading-none">
          {titleLines.map((line) => (
            <motion.span
              key={line}
              className="block font-display text-[17vw] md:text-[13vw] lg:text-[11vw] text-bone uppercase tracking-[-0.01em]"
              variants={lineVariants}
            >
              {line}
            </motion.span>
          ))}
        </h1>

        {/* Tagline */}
        <motion.p
          className="text-lg md:text-xl text-bone/75 max-w-md mt-6"
          style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300, fontStyle: "italic" }}
          variants={lineVariants}
        >
          Documentary-style photo &amp; video for outdoor, lifestyle, and gear brands.
        </motion.p>
      </motion.div>

      <ScrollHint />
    </section>
  );
}

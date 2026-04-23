"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
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
  const { scrollY } = useScroll();

  // Hero content fades and lifts as the user begins to scroll
  const contentOpacity = useTransform(scrollY, [0, 320], [1, 0]);
  const contentY = useTransform(scrollY, [0, 320], [0, -28]);

  return (
    <section
      className="grain-overlay w-full h-[100dvh] bg-black flex flex-col justify-center items-center px-8 md:px-16 lg:px-24 overflow-hidden"
      style={{ position: "sticky", top: 0, zIndex: 1 }}
    >
      {/* Background image */}
      <Image
        src="/images/hero image.JPG"
        alt=""
        fill
        priority
        className="object-cover object-center"
        style={{ zIndex: 0 }}
      />

      {/* Dark overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "rgba(26,18,8,0.6)", zIndex: 1 }}
      />

      {/* Grain texture */}
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

      {/* Bottom gradient — bleeds into the warm-dark background below */}
      <div
        className="absolute inset-x-0 bottom-0 pointer-events-none"
        style={{
          height: "70%",
          background: "linear-gradient(to top, var(--black) 0%, rgba(26,18,8,0.55) 45%, transparent 100%)",
          zIndex: 2,
        }}
      />

      {/* Scroll-driven wrapper — content fades and rises as user scrolls */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY, position: "relative", zIndex: 20, width: "100%" }}
      >
        {/* Content */}
        <motion.div
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p className="label-text mb-6" variants={lineVariants}>
            — Photo &amp; Video
          </motion.p>

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

          <motion.p
            className="text-lg md:text-xl text-bone/75 max-w-md mx-auto mt-6"
            style={{ fontFamily: "var(--font-body)", fontStyle: "italic" }}
            variants={lineVariants}
          >
            Documentary-style photo &amp; video for outdoor, lifestyle, and gear brands.
          </motion.p>

          <motion.div
            variants={lineVariants}
            style={{ width: 200, height: 1, background: "var(--ember)", margin: "16px auto 0" }}
          />
        </motion.div>

        <ScrollHint />
      </motion.div>
    </section>
  );
}

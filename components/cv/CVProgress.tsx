"use client";

import { motion, useScroll } from "framer-motion";

export default function CVProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-px z-[9000] origin-left"
      style={{ scaleX: scrollYProgress, background: "#C84B2A" }}
    />
  );
}

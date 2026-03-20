"use client";

import { motion } from "framer-motion";

export default function ScrollHint() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-40"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 2.2 }}
    >
      <div className="relative w-px h-12 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-bone/40 origin-top"
          animate={{ scaleY: [0, 1, 1, 0] }}
          style={{ transformOrigin: "top center" }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.4, 0.7, 1],
            repeat: Infinity,
            repeatDelay: 0.8,
          }}
        />
      </div>
      <span className="label-text text-bone/50">Scroll</span>
    </motion.div>
  );
}

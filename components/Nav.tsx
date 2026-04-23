"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Nav() {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 md:px-12 py-6"
      style={{ background: "linear-gradient(to bottom, rgba(26,18,8,0.95), transparent)" }}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 1.8 }}
    >
      <Link
        href="/"
        className="font-display text-base text-bone uppercase"
        style={{ letterSpacing: "0.15em" }}
      >
        AUC
      </Link>

      <ul className="flex items-center gap-8">
        {["Work", "About", "Contact"].map((item) => (
          <li key={item}>
            <Link
              href={`/${item.toLowerCase()}`}
              className="font-mono text-[9px] tracking-[0.25em] uppercase text-bone transition-colors duration-300 hover:text-[#D4914A]"
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}

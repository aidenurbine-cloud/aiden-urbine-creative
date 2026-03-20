"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

const links = [
  { label: "Let's Talk", href: "/contact", primary: true, print: false },
  { label: "View Work", href: "/work", primary: false, print: false },
  { label: "Download PDF", href: "#", primary: false, print: true },
];

export default function CVContact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <div
      ref={ref}
      className="relative flex flex-col items-center justify-center text-center overflow-hidden"
      style={{
        background: "#0A0A08",
        minHeight: "80vh",
        padding: "80px 56px",
        borderTop: "1px solid #2A2A26",
      }}
    >
      {/* Ghost text */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "var(--font-bebas)",
          fontSize: "clamp(120px, 20vw, 280px)",
          letterSpacing: "0.04em",
          color: "#2A2A26",
          opacity: 0.08,
          whiteSpace: "nowrap",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        AUC
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        style={{
          fontFamily: "var(--font-dm-mono)",
          fontSize: "9px",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "#7A7A72",
          marginBottom: 32,
        }}
      >
        Available for Projects
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1 }}
        style={{
          fontFamily: "var(--font-bebas)",
          fontSize: "clamp(56px, 9vw, 120px)",
          letterSpacing: "0.04em",
          lineHeight: 0.9,
          color: "#EDE9E0",
          marginBottom: 16,
        }}
      >
        LET&apos;S<br />BUILD<br />SOMETHING.
      </motion.div>

      <div className="flex gap-4 flex-wrap justify-center">
        {links.map((link, i) => (
          <motion.div
            key={link.label}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 + i * 0.06 }}
          >
            {link.print ? (
              <button
                onClick={() => window.print()}
                className="transition-all duration-300 hover:border-ember hover:text-ember"
                style={{
                  fontFamily: "var(--font-dm-mono)",
                  fontSize: "9px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  padding: "14px 32px",
                  border: "1px solid #2A2A26",
                  color: "#7A7A72",
                  background: "none",
                  cursor: "none",
                }}
              >
                {link.label}
              </button>
            ) : (
              <Link
                href={link.href}
                className={
                  link.primary
                    ? "transition-all duration-300 hover:bg-ember hover:border-ember hover:text-cream"
                    : "transition-all duration-300 hover:border-ember hover:text-ember"
                }
                style={{
                  fontFamily: "var(--font-dm-mono)",
                  fontSize: "9px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  padding: "14px 32px",
                  border: link.primary ? "1px solid #D4CFC4" : "1px solid #2A2A26",
                  color: link.primary ? "#D4CFC4" : "#7A7A72",
                  display: "inline-block",
                }}
              >
                {link.label}
              </Link>
            )}
          </motion.div>
        ))}
      </div>

      {/* Contact details */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.55 }}
        style={{
          marginTop: 56,
          paddingTop: 40,
          borderTop: "1px solid #2A2A26",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 48,
          flexWrap: "wrap",
        }}
      >
        {[
          { label: "Email", value: "aidenurbine@gmail.com", href: "mailto:aidenurbine@gmail.com" },
          { label: "Phone", value: "719.398.3168", href: "tel:7193983168" },
          { label: "Web", value: "aidenurbinecreative.com", href: "/" },
        ].map((contact) => (
          <div key={contact.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <span style={{
              fontFamily: "var(--font-dm-mono)",
              fontSize: "8px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#4A4A44",
            }}>
              {contact.label}
            </span>
            <a
              href={contact.href}
              style={{
                fontFamily: "var(--font-dm-mono)",
                fontSize: "10px",
                letterSpacing: "0.15em",
                color: "#D4CFC4",
                textDecoration: "none",
              }}
            >
              {contact.value}
            </a>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

"use client";

import Nav from "@/components/Nav";
import CVCursor from "@/components/cv/CVCursor";
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const PROJECT_TYPES = [
  "Brand Film",
  "Product Photography",
  "Editorial",
  "Campaign",
  "Other",
];

const CONTACT_DETAILS = [
  { label: "Email", value: "aidenurbine@gmail.com", href: "mailto:aidenurbine@gmail.com" },
  { label: "Phone", value: "719.398.3168", href: "tel:7193983168" },
  { label: "Based", value: "Missoula, MT", href: null },
];

const inputBase: React.CSSProperties = {
  width: "100%",
  background: "none",
  border: "none",
  borderBottom: "1px solid #2A2A26",
  outline: "none",
  fontFamily: "var(--font-cormorant)",
  fontWeight: 300,
  fontSize: 18,
  color: "#D4CFC4",
  padding: "12px 0",
  transition: "border-color 0.3s ease",
  letterSpacing: "0.01em",
};

function Field({
  label,
  delay = 0,
  children,
}: {
  label: string;
  delay?: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      style={{ display: "flex", flexDirection: "column", gap: 8 }}
    >
      <span
        style={{
          fontFamily: "var(--font-dm-mono)",
          fontSize: "9px",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "#C84B2A",
          fontWeight: 300,
        }}
      >
        {label}
      </span>
      {children}
    </motion.div>
  );
}

export default function ContactPage() {
  const [projectType, setProjectType] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const leftRef = useRef<HTMLDivElement>(null);
  const leftInView = useInView(leftRef, { once: true, margin: "-10%" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  function borderFor(field: string): string {
    return focused === field ? "#D4CFC4" : "#2A2A26";
  }

  return (
    <main
      className="grain-overlay"
      style={{ background: "#0A0A08", minHeight: "100vh" }}
    >
      <CVCursor />
      <Nav />

      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {/* ── Left — Brand ── */}
        <div
          ref={leftRef}
          style={{
            flex: "1 1 340px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "clamp(120px, 14vw, 180px) clamp(32px, 6vw, 96px) clamp(64px, 8vw, 96px)",
            borderRight: "1px solid #2A2A26",
            position: "relative",
          }}
        >
          {/* Ghost watermark */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: 0,
              transform: "translateY(-50%)",
              fontFamily: "var(--font-bebas)",
              fontSize: "clamp(100px, 18vw, 240px)",
              letterSpacing: "0.04em",
              color: "#2A2A26",
              opacity: 0.12,
              whiteSpace: "nowrap",
              pointerEvents: "none",
              userSelect: "none",
              lineHeight: 1,
            }}
          >
            AUC
          </div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={leftInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{
              fontFamily: "var(--font-dm-mono)",
              fontSize: "9px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#C84B2A",
              fontWeight: 300,
              marginBottom: 24,
            }}
          >
            Start a Project
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={leftInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{
              fontFamily: "var(--font-bebas)",
              fontSize: "clamp(72px, 10vw, 144px)",
              letterSpacing: "0.03em",
              lineHeight: 0.88,
              color: "#EDE9E0",
              marginBottom: 32,
            }}
          >
            LET&apos;S
            <br />
            BUILD
            <br />
            SOMETHING.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={leftInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.25 }}
            style={{
              fontFamily: "var(--font-cormorant)",
              fontWeight: 300,
              fontStyle: "italic",
              fontSize: 18,
              color: "#7A7A72",
              lineHeight: 1.7,
              maxWidth: 360,
              marginBottom: 56,
            }}
          >
            Photo and video for brands that live in the field — built on real
            trips, honest light, and actual terrain. No studio setups. No
            manufactured moments. Based in Missoula. Traveling wherever the
            work demands.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={leftInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
              paddingTop: 32,
              borderTop: "1px solid #2A2A26",
            }}
          >
            {CONTACT_DETAILS.map((item) => (
              <div
                key={item.label}
                style={{ display: "flex", alignItems: "baseline", gap: 16 }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-dm-mono)",
                    fontSize: "8px",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: "#4A4A44",
                    fontWeight: 300,
                    minWidth: 40,
                  }}
                >
                  {item.label}
                </span>
                {item.href ? (
                  <a
                    href={item.href}
                    style={{
                      fontFamily: "var(--font-dm-mono)",
                      fontSize: "10px",
                      letterSpacing: "0.12em",
                      color: "#D4CFC4",
                      textDecoration: "none",
                      fontWeight: 300,
                      transition: "color 0.3s ease",
                    }}
                    onMouseEnter={(e) =>
                      ((e.target as HTMLElement).style.color = "#C84B2A")
                    }
                    onMouseLeave={(e) =>
                      ((e.target as HTMLElement).style.color = "#D4CFC4")
                    }
                  >
                    {item.value}
                  </a>
                ) : (
                  <span
                    style={{
                      fontFamily: "var(--font-dm-mono)",
                      fontSize: "10px",
                      letterSpacing: "0.12em",
                      color: "#D4CFC4",
                      fontWeight: 300,
                    }}
                  >
                    {item.value}
                  </span>
                )}
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Right — Form ── */}
        <div
          style={{
            flex: "1 1 340px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "clamp(120px, 14vw, 180px) clamp(32px, 6vw, 96px) clamp(64px, 8vw, 96px)",
          }}
        >
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={{ display: "flex", flexDirection: "column", gap: 40 }}
              >
                <Field label="Your Name" delay={0.15}>
                  <input
                    required
                    type="text"
                    placeholder="Full name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused(null)}
                    style={{ ...inputBase, borderBottomColor: borderFor("name") }}
                  />
                </Field>

                <Field label="Email Address" delay={0.22}>
                  <input
                    required
                    type="email"
                    placeholder="you@brand.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                    style={{ ...inputBase, borderBottomColor: borderFor("email") }}
                  />
                </Field>

                <Field label="Project Type" delay={0.29}>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 8,
                      paddingTop: 8,
                    }}
                  >
                    {PROJECT_TYPES.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() =>
                          setProjectType(projectType === type ? null : type)
                        }
                        style={{
                          fontFamily: "var(--font-dm-mono)",
                          fontSize: "9px",
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                          fontWeight: 300,
                          padding: "10px 18px",
                          border:
                            projectType === type
                              ? "1px solid #C84B2A"
                              : "1px solid #2A2A26",
                          background:
                            projectType === type ? "#C84B2A" : "none",
                          color:
                            projectType === type ? "#EDE9E0" : "#7A7A72",
                          cursor: "pointer",
                          transition: "all 0.25s ease",
                        }}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </Field>

                <Field label="Tell Me About the Project" delay={0.36}>
                  <textarea
                    required
                    rows={4}
                    placeholder="What are you working on?"
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    style={{
                      ...inputBase,
                      resize: "none",
                      borderBottomColor: borderFor("message"),
                    }}
                  />
                </Field>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.44 }}
                >
                  <button
                    type="submit"
                    style={{
                      fontFamily: "var(--font-dm-mono)",
                      fontSize: "9px",
                      letterSpacing: "0.25em",
                      textTransform: "uppercase",
                      fontWeight: 300,
                      padding: "16px 40px",
                      border: "1px solid #D4CFC4",
                      background: "none",
                      color: "#D4CFC4",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget;
                      el.style.background = "#C84B2A";
                      el.style.borderColor = "#C84B2A";
                      el.style.color = "#EDE9E0";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget;
                      el.style.background = "none";
                      el.style.borderColor = "#D4CFC4";
                      el.style.color = "#D4CFC4";
                    }}
                  >
                    Send It
                  </button>
                </motion.div>
              </motion.form>
            ) : (
              <motion.div
                key="confirmation"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 24,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-dm-mono)",
                    fontSize: "9px",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: "#C84B2A",
                    fontWeight: 300,
                  }}
                >
                  Message Received
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-bebas)",
                    fontSize: "clamp(64px, 9vw, 120px)",
                    letterSpacing: "0.03em",
                    lineHeight: 0.9,
                    color: "#EDE9E0",
                  }}
                >
                  GOT IT.
                  <br />
                  I&apos;LL BE
                  <br />
                  IN TOUCH.
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontWeight: 300,
                    fontStyle: "italic",
                    fontSize: 18,
                    color: "#7A7A72",
                    lineHeight: 1.7,
                    maxWidth: 320,
                  }}
                >
                  Thanks for reaching out. Expect a response within 24–48 hours.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}

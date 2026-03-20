"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const experiences = [
  {
    num: "01",
    dates: "2022 — Present",
    company: "MONTANA\nKNIFE COMPANY",
    role: "Content Creator",
    desc: "Started on the production floor as a Knife Tech. Sharpening, blasting, parkerizing — learning the craft before I ever pointed a camera at it. That decision changed everything about how I shoot product. When I moved to the content team I joined a four-person crew building one of the most watched knife brands on the internet. MKC's YouTube channel has grown to nearly 300,000 subscribers. TikTok sits at 150,000 followers and climbing. The work I've personally shot, directed, or edited has been seen somewhere between a hundred thousand and a million times. What I'm most proud of isn't the numbers. It's that the work holds up. We're not chasing trends. We're building something.",
    tags: ["Product Photo", "Brand Video", "Short Form", "Weekly Vlog"],
  },
  {
    num: "02",
    dates: "High School — Buena Vista CO",
    company: "ELEVATED\nMEDIA HOUSE",
    role: "Founder",
    desc: "Built a media company in high school because I needed clients and didn't want to wait for someone to hire me. Shot and edited commercial work, built brand identities from scratch — full social, web, and media packages — and learned how to talk to clients, models, and business partners like a professional before I was one. Worked community events, charitable collabs, and local businesses across Buena Vista. It taught me that the business side of creative work is just as important as the work itself.",
    tags: ["Founder", "Brand Identity", "Production", "Web"],
  },
  {
    num: "03",
    dates: "2022 — San Francisco CA",
    company: "SIMPLE\nCAMPERS",
    role: "Operations & Media",
    desc: "Took a detour into the startup world after high school. Helped build the operational backend for a fleet of 20+ high-end campervan rentals in one of the wealthiest markets in the country. Managed partner and dealer tracking, kept turnaround times under 24 hours, coordinated brand events with companies like Equator Coffee and Prooflab Surf Shop. Shot the complete photo and video library for the entire fleet. Learned what it means to build something from nothing under real pressure.",
    tags: ["Operations", "Photo & Video", "Fleet Mgmt", "Brand Partners"],
  },
  {
    num: "04",
    dates: "Teen Years — Buena Vista CO",
    company: "ARKANSAS RIVER\nPHOTOGRAPHY",
    role: "Photographer — Father's Rafting Business",
    desc: "Photographed whitewater rafting for my dad's business. Learned to read and capture fast-moving water. Shot thousands of guests every summer. First professional camera work — before I knew it was professional.",
    tags: ["Action Photography", "Documentary", "Water", "Origins"],
  },
];

function ProgressDot({
  activeFloat,
  index,
}: {
  activeFloat: MotionValue<number>;
  index: number;
}) {
  const width = useTransform(
    activeFloat,
    [index - 0.4, index, index + 0.4],
    ["24px", "40px", "24px"]
  );
  const bg = useTransform(
    activeFloat,
    [index - 0.4, index, index + 0.4],
    ["#2A2A26", "#C84B2A", "#2A2A26"]
  );
  return (
    <motion.div style={{ width, background: bg, height: "2px", flexShrink: 0 }} />
  );
}

export default function CVExperience() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0vw", `${-(experiences.length - 1) * 100}vw`]
  );
  const activeFloat = useTransform(
    scrollYProgress,
    [0, 1],
    [0, experiences.length - 1]
  );

  return (
    <div ref={containerRef} className="relative" style={{ height: "400vh" }}>
      <div
        className="sticky top-0 h-screen overflow-hidden"
        style={{ background: "#161614" }}
      >
        <motion.div
          className="flex h-full"
          style={{ x, width: `${experiences.length * 100}vw` }}
        >
          {experiences.map((exp, i) => (
            <div
              key={i}
              className="relative flex items-center h-screen"
              style={{
                width: "100vw",
                padding: "0 56px",
                borderRight: "1px solid #2A2A26",
                flexShrink: 0,
              }}
            >
              {/* Slide label */}
              <div
                style={{
                  position: "absolute",
                  top: 56,
                  left: 56,
                  fontFamily: "var(--font-dm-mono)",
                  fontSize: "9px",
                  letterSpacing: "0.3em",
                  color: "#C84B2A",
                }}
              >
                {exp.num} / 04 — Experience
              </div>

              {/* Giant background number */}
              <div
                style={{
                  position: "absolute",
                  right: -20,
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontFamily: "var(--font-bebas)",
                  fontSize: "280px",
                  lineHeight: 1,
                  color: "#2A2A26",
                  opacity: 0.3,
                  pointerEvents: "none",
                  userSelect: "none",
                }}
              >
                {exp.num}
              </div>

              {/* Content */}
              <div style={{ maxWidth: 600, position: "relative", zIndex: 1 }}>
                <div
                  style={{
                    fontFamily: "var(--font-dm-mono)",
                    fontSize: "10px",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: "#C84B2A",
                    marginBottom: 20,
                  }}
                >
                  {exp.dates}
                </div>

                <div
                  style={{
                    fontFamily: "var(--font-bebas)",
                    fontSize: "clamp(52px, 7vw, 96px)",
                    letterSpacing: "0.04em",
                    lineHeight: 0.95,
                    color: "#EDE9E0",
                    marginBottom: 16,
                    whiteSpace: "pre-line",
                  }}
                >
                  {exp.company}
                </div>

                <div
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontStyle: "italic",
                    fontWeight: 300,
                    fontSize: "22px",
                    color: "#7A7A72",
                    marginBottom: 36,
                  }}
                >
                  {exp.role}
                </div>

                <p
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "17px",
                    lineHeight: 1.9,
                    color: "#D4CFC4",
                    maxWidth: 500,
                    fontWeight: 300,
                  }}
                >
                  {exp.desc}
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 28 }}>
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontFamily: "var(--font-dm-mono)",
                        fontSize: "8px",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        padding: "6px 14px",
                        border: "1px solid #2A2A26",
                        color: "#4A4A44",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Progress dots */}
              <div
                style={{
                  position: "absolute",
                  bottom: 48,
                  left: 56,
                  display: "flex",
                  gap: 8,
                }}
              >
                {experiences.map((_, dotIndex) => (
                  <ProgressDot
                    key={dotIndex}
                    activeFloat={activeFloat}
                    index={dotIndex}
                  />
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

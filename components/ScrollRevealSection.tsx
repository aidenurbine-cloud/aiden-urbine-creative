"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const items = [
  { text: "REAL LIGHT.",   image: "/images/real light.JPG" },
  { text: "RAW TEXTURE.",  image: "/images/raw texture.JPG" },
  { text: "HONEST STORY.", image: "/images/honest story.JPG" },
];

function RevealLine({
  text,
  progress,
  index,
  total,
}: {
  text: string;
  progress: MotionValue<number>;
  index: number;
  total: number;
}) {
  const windowSize = 1 / total;
  const start = index * windowSize;
  const end = start + windowSize * 0.55;

  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [48, 0]);

  return (
    <motion.div style={{ opacity, y }}>
      <span
        className="block text-bone leading-none uppercase"
        style={{
          fontFamily: "var(--font-bebas)",
          fontSize: "clamp(3.5rem, 9vw, 8rem)",
          letterSpacing: "-0.01em",
        }}
      >
        {text}
      </span>
    </motion.div>
  );
}

export default function ScrollRevealSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Each image crossfades at the 1/3 and 2/3 scroll marks
  // Overlap window is ~0.11 of progress for a seamless blend
  const img0Opacity = useTransform(
    scrollYProgress,
    [0, 0.04, 0.27, 0.38],
    [0, 1, 1, 0]
  );
  const img1Opacity = useTransform(
    scrollYProgress,
    [0.27, 0.38, 0.60, 0.71],
    [0, 1, 1, 0]
  );
  const img2Opacity = useTransform(
    scrollYProgress,
    [0.60, 0.71, 1, 1],
    [0, 1, 1, 1]
  );

  const imageOpacities = [img0Opacity, img1Opacity, img2Opacity];

  const taglineOpacity = useTransform(scrollYProgress, [0.82, 1], [0, 1]);
  const taglineY = useTransform(scrollYProgress, [0.82, 1], [20, 0]);

  return (
    <div
      ref={containerRef}
      className="relative bg-black"
      style={{ height: "450vh" }}
    >
      {/* Sticky frame */}
      <div className="sticky top-0 h-screen grid grid-cols-[1fr_1fr] overflow-hidden">

        {/* Left — text */}
        <div className="flex flex-col justify-center px-8 md:px-14 lg:px-20">
          <p className="label-text mb-10">— The approach</p>

          <div className="flex flex-col gap-2">
            {items.map((item, i) => (
              <RevealLine
                key={item.text}
                text={item.text}
                progress={scrollYProgress}
                index={i}
                total={items.length}
              />
            ))}
          </div>

          <motion.p
            className="max-w-xs mt-10 text-bone/50"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontWeight: 300,
              fontStyle: "italic",
              fontSize: "1.1rem",
              lineHeight: 1.5,
              opacity: taglineOpacity,
              y: taglineY,
            }}
          >
            Missoula, Montana — shooting for brands that live outside.
          </motion.p>
        </div>

        {/* Right — crossfading images */}
        <div className="relative overflow-hidden">
          {items.map((item, i) => (
            <motion.div
              key={item.image}
              className="absolute inset-0"
              style={{ opacity: imageOpacities[i] }}
            >
              <Image
                src={item.image}
                alt={item.text}
                fill
                sizes="50vw"
                className="object-cover object-center"
              />
            </motion.div>
          ))}

          {/* Subtle dark left-edge vignette to blend into text column */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, #0A0A08 0%, transparent 20%)",
              zIndex: 10,
            }}
          />
        </div>
      </div>
    </div>
  );
}

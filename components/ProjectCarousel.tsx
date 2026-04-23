"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

type Slide = {
  slug: string;
  client: string;
  tag: string;
  location: string;
  image: string;
  href: string;
};

const SLIDES: Slide[] = [
  {
    slug: "montana-knife-company",
    client: "Montana Knife Co",
    tag: "Photo + Video",
    location: "Missoula, MT",
    image: "/images/mkc/mkc mexico-376.jpg",
    href: "/work/montana-knife-company",
  },
  {
    slug: "marin-moto-ranch",
    client: "Marin Moto Ranch",
    tag: "Photo + Video",
    location: "Montana",
    image: "/images/MMR HOMEPAGE.jpg",
    href: "/work/marin-moto-ranch",
  },
  {
    slug: "badfish",
    client: "Badfish SUP",
    tag: "Photo + Video",
    location: "Salida, CO",
    image: "/images/BADFISH homepage opreview.jpg",
    href: "/work/badfish",
  },
  {
    slug: "rough-country",
    client: "Rough Country",
    tag: "Photo + Video",
    location: "Nationwide",
    image: "/images/ROUGH COUNTRY BACKGROUND.png",
    href: "/work/rough-country",
  },
  {
    slug: "turtlebox",
    client: "Turtlebox",
    tag: "Video",
    location: "Austin, TX",
    image: "/images/turtlebox/turtlebox-hero.jpg",
    href: "/work/turtlebox",
  },
  {
    slug: "personal-collection",
    client: "Personal",
    tag: "Photo",
    location: "Montana",
    image: "/images/PERSONAL HOMEPAGE.jpg",
    href: "/work/personal-collection",
  },
];

// Card width = min(70vw, 100vw - 80px). At viewports > ~267px, resolves to 70vw.
// Centering offset = (100vw - 70vw) / 2 = 15vw.
// translateX(calc(15vw - activeIndex * (70vw + 16px))) centers the active card.
const CARD_W = "min(70vw, calc(100vw - 80px))";
const GAP = 16;

function CarouselCard({
  slide,
  index,
  activeIndex,
}: {
  slide: Slide;
  index: number;
  activeIndex: number;
}) {
  const isActive = index === activeIndex;

  return (
    <Link
      href={slide.href}
      className="carousel-card block relative flex-shrink-0"
      style={{
        width: CARD_W,
        height: "75vh",
        transform: isActive ? "scale(1)" : "scale(0.95)",
        transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <Image
        src={slide.image}
        alt={slide.client}
        fill
        sizes="70vw"
        className="object-cover"
        priority={index === 0}
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(14,12,9,0.9) 0%, rgba(14,12,9,0.3) 50%, transparent 100%)",
          zIndex: 1,
        }}
      />

      {/* Warm vignette — photographic edge darkening */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: "inset 0 0 80px rgba(14,12,9,0.4)",
          zIndex: 2,
        }}
      />

      {/* Bottom-left content */}
      <div
        className="absolute bottom-0 left-0"
        style={{ zIndex: 3, padding: 48 }}
      >
        <p className="label-text mb-3">{slide.tag}</p>

        {/* Ember line — draws in when active */}
        <div
          style={{
            height: 1,
            background: "var(--ember)",
            marginBottom: 16,
            width: isActive ? 40 : 0,
            transition: "width 0.5s cubic-bezier(0.16,1,0.3,1)",
            transitionDelay: isActive ? "0.15s" : "0s",
          }}
        />

        <h3
          className="font-display text-bone uppercase"
          style={{
            fontSize: "clamp(56px, 8vw, 110px)",
            letterSpacing: "-0.01em",
            lineHeight: 0.9,
          }}
        >
          {slide.client}
        </h3>

        <p
          className="mt-3 uppercase"
          style={{
            fontFamily: "var(--font-dm-mono)",
            fontSize: "9px",
            letterSpacing: "0.25em",
            fontWeight: 300,
            color: "rgba(212,207,196,0.5)",
          }}
        >
          {slide.location}
        </p>
      </div>
    </Link>
  );
}

export default function ProjectCarousel() {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const goTo = useCallback((i: number) => {
    setActiveIndex(i);
  }, []);

  const scheduleNext = useCallback(
    (current: number) => {
      timerRef.current = setTimeout(() => {
        goTo((current + 1) % SLIDES.length);
      }, 5000);
    },
    [goTo]
  );

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    clearTimer();
    scheduleNext(activeIndex);
    return clearTimer;
  }, [activeIndex, scheduleNext, clearTimer]);

  // translateX formula: centers the active card
  // offset = 15vw (half of remaining space when card = 70vw)
  // shift  = activeIndex * (70vw + gap)
  const translateX = `calc(15vw - ${activeIndex} * (${CARD_W} + ${GAP}px))`;

  return (
    <section
      className="bg-black"
      style={{
        position: "relative",
        zIndex: 2,
        paddingTop: "clamp(48px, 8vw, 96px)",
        paddingBottom: "clamp(48px, 6vw, 80px)",
      }}
    >
      {/* Section heading */}
      <motion.h2
        className="font-display text-cream uppercase"
        style={{
          fontSize: "clamp(48px, 6vw, 80px)",
          letterSpacing: "-0.01em",
          paddingLeft: "clamp(24px, 5vw, 80px)",
          marginBottom: "clamp(24px, 4vw, 48px)",
        }}
        initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, amount: 0.5 }}
      >
        Selected Work
      </motion.h2>

      {/* Carousel viewport — clips overflow */}
      <motion.div
        style={{ overflow: "hidden" }}
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* Sliding track */}
        <div
          style={{
            display: "flex",
            gap: GAP,
            transform: `translateX(${translateX})`,
            transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
            willChange: "transform",
          }}
        >
          {SLIDES.map((slide, i) => (
            <CarouselCard
              key={slide.slug}
              slide={slide}
              index={i}
              activeIndex={activeIndex}
            />
          ))}
        </div>
      </motion.div>

      {/* Dot indicators */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 8,
          marginTop: "clamp(20px, 3vw, 32px)",
        }}
      >
        {SLIDES.map((slide, i) => (
          <button
            key={slide.slug}
            aria-label={`Go to ${slide.client}`}
            onClick={() => goTo(i)}
            style={{
              height: 6,
              width: i === activeIndex ? 28 : 6,
              borderRadius: 100,
              background: i === activeIndex ? "var(--ember)" : "var(--ash)",
              border: "none",
              padding: 0,
              cursor: "none",
              transition: "width 0.4s cubic-bezier(0.16,1,0.3,1), background 0.3s ease",
              flexShrink: 0,
            }}
          />
        ))}
      </div>
    </section>
  );
}

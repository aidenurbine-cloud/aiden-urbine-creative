"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { projects, type Project } from "@/lib/projects";

const LABELS: Record<string, string> = {
  "montana-knife-company": "MKC",
  "turtlebox": "TURTLEBOX",
  "rough-country": "ROUGH COUNTRY",
  "winnebago": "WINNEBAGO",
  "personal-collection": "PERSONAL",
};

function ReelCard({ project }: { project: Project }) {
  return (
    <div className="relative w-full h-full overflow-hidden bg-charcoal">
      <Image
        src={project.hero}
        alt={project.title}
        fill
        sizes="100vw"
        className="object-cover object-center"
        style={{ zIndex: 0 }}
        priority
      />

      {/* Dark overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "rgba(10,10,8,0.45)", zIndex: 1 }}
      />

      {/* Bottom gradient — heavy */}
      <div
        className="absolute inset-x-0 bottom-0 pointer-events-none"
        style={{
          height: "80%",
          background: "linear-gradient(to top, #0A0A08 0%, rgba(10,10,8,0.7) 40%, transparent 100%)",
          zIndex: 2,
        }}
      />

      {/* Left gradient */}
      <div
        className="absolute inset-y-0 left-0 pointer-events-none"
        style={{
          width: "60%",
          background: "linear-gradient(to right, rgba(10,10,8,0.75) 0%, transparent 100%)",
          zIndex: 2,
        }}
      />

      {/* Grain */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 3,
          opacity: 0.06,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
        }}
      />

      {/* Bottom-left content */}
      <div
        className="absolute bottom-0 left-0"
        style={{ zIndex: 4, padding: 64 }}
      >
        <p
          className="mb-2 uppercase"
          style={{
            fontFamily: "var(--font-dm-mono)",
            fontSize: "9px",
            letterSpacing: "0.25em",
            fontWeight: 300,
            color: "#C84B2A",
          }}
        >
          {project.tag}
        </p>
        <h3
          className="text-bone uppercase leading-none"
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(64px, 10vw, 130px)",
            letterSpacing: "-0.01em",
          }}
        >
          {project.title}
        </h3>
      </div>
    </div>
  );
}

function ProjectBubbleNav({ active }: { active: string }) {
  return (
    <div
      style={{
        position: "sticky",
        top: 80,
        zIndex: 40,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
        marginBottom: 0,
      }}
    >
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          padding: 5,
          background: "#0D0D0B",
          border: "0.5px solid #2A2A26",
          borderRadius: 100,
          pointerEvents: "auto",
          animation: "float 4s ease-in-out infinite",
        }}
      >
        {projects.map((project) => {
          const isActive = project.slug === active;
          return (
            <button
              key={project.slug}
              onClick={() => {
                document
                  .getElementById(`project-${project.slug}`)
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                borderRadius: 100,
                padding: "6px 14px",
                background: "transparent",
                color: isActive ? "#EDE9E0" : "rgba(212,207,196,0.4)",
                fontFamily: "var(--font-dm-mono)",
                fontSize: "9px",
                fontWeight: 300,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                border: "none",
                transition: "color 0.3s ease",
                whiteSpace: "nowrap",
              }}
              aria-label={`Go to ${project.title}`}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: isActive ? "#C84B2A" : "transparent",
                  border: isActive ? "none" : "1px solid rgba(200,75,42,0.3)",
                  flexShrink: 0,
                  transition: "background 0.3s ease, border 0.3s ease",
                }}
              />
              {LABELS[project.slug] ?? project.title}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function PortfolioReel() {
  const [active, setActive] = useState(projects[0].slug);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    projects.forEach((project) => {
      const el = document.getElementById(`project-${project.slug}`);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(project.slug);
        },
        { threshold: 0.5 }
      );

      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section className="bg-black pt-4">
      {/* Header */}
      <div className="px-8 md:px-16 lg:px-24 mb-10 flex items-end justify-between">
        <p
          className="uppercase"
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(1.4rem, 2.5vw, 2.2rem)",
            letterSpacing: "0.08em",
            color: "#2A2A26",
          }}
        >
          Selected Work
        </p>
        <p
          className="text-bone/20"
          style={{
            fontFamily: "var(--font-dm-mono)",
            fontSize: "9px",
            letterSpacing: "0.25em",
            fontWeight: 300,
          }}
        >
          {String(projects.length).padStart(2, "0")}
        </p>
      </div>

      {/* Sticky bubble nav */}
      <ProjectBubbleNav active={active} />

      {/* Scrollable project sections */}
      {projects.map((project) => (
        <div
          key={project.slug}
          id={`project-${project.slug}`}
          style={{ height: "70vh" }}
        >
          <Link href={`/work/${project.slug}`} className="block w-full h-full" style={{ height: "70vh" }}>
            <ReelCard project={project} />
          </Link>
        </div>
      ))}
    </section>
  );
}

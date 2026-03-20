"use client";

import Link from "next/link";
import Image from "next/image";
import { type Project } from "@/lib/projects";

export default function WorkCard({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group relative block w-full h-full overflow-hidden bg-charcoal"
    >
      {/* Hero image */}
      <Image
        src={project.hero}
        alt={project.title}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        style={{ zIndex: 0 }}
      />

      {/* Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "rgba(10,10,8,0.45)", zIndex: 1 }}
      />

      {/* Bottom gradient */}
      <div
        className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
        style={{
          background: "linear-gradient(to top, #0A0A08 0%, transparent 100%)",
          zIndex: 2,
        }}
      />

      {/* Grain */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 3,
          opacity: 0.05,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
        }}
      />

      {/* Content */}
      <div
        className="absolute bottom-0 left-0 right-0 p-6 md:p-8"
        style={{ zIndex: 4 }}
      >
        {/* Ember underline */}
        <div className="relative h-px w-full mb-4 overflow-hidden">
          <div className="absolute inset-0 bg-ash" />
          <div
            className="absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
            style={{ background: "#C84B2A" }}
          />
        </div>

        {/* Tag */}
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

        {/* Title */}
        <h2
          className="text-bone uppercase leading-none"
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(1.8rem, 3.5vw, 3.2rem)",
            letterSpacing: "-0.01em",
          }}
        >
          {project.title}
        </h2>
      </div>
    </Link>
  );
}

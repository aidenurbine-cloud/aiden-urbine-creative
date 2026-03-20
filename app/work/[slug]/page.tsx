import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import { projects, getProject } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) return {};
  return {
    title: `${project.title} — Aiden Urbine Creative`,
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) notFound();

  return (
    <main className="min-h-screen bg-black">
      <Nav />

      {/* Full-bleed hero */}
      <div className="relative w-full h-[85vh] overflow-hidden bg-charcoal">
        <Image
          src={project.hero}
          alt={project.title}
          fill
          priority
          className="object-cover object-center"
          style={{ zIndex: 0 }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "rgba(10,10,8,0.5)", zIndex: 1 }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
          style={{
            background: "linear-gradient(to top, #0A0A08 0%, transparent 100%)",
            zIndex: 2,
          }}
        />

        {/* Hero text */}
        <div
          className="absolute bottom-0 left-0 right-0 px-8 md:px-16 lg:px-24 pb-12"
          style={{ zIndex: 3 }}
        >
          <p
            className="mb-3 uppercase"
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
          <h1
            className="text-bone uppercase leading-none"
            style={{
              fontFamily: "var(--font-bebas)",
              fontSize: "clamp(3.5rem, 10vw, 9rem)",
              letterSpacing: "-0.01em",
            }}
          >
            {project.title}
          </h1>
        </div>
      </div>

      {/* Project content placeholder */}
      <div className="px-8 md:px-16 lg:px-24 py-24">
        <div className="max-w-xl">
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
            — Project
          </p>
          <p
            className="text-bone/60"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontWeight: 300,
              fontStyle: "italic",
              fontSize: "1.4rem",
              lineHeight: 1.6,
            }}
          >
            Project details coming soon.
          </p>
        </div>
      </div>

      {/* Back link */}
      <div className="px-8 md:px-16 lg:px-24 pb-24">
        <Link
          href="/work"
          className="inline-flex items-center gap-3 text-bone/40 hover:text-bone transition-colors duration-300"
          style={{
            fontFamily: "var(--font-dm-mono)",
            fontSize: "9px",
            letterSpacing: "0.25em",
            fontWeight: 300,
          }}
        >
          ← All Work
        </Link>
      </div>
    </main>
  );
}

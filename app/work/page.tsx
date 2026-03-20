import Nav from "@/components/Nav";
import WorkCard from "@/components/WorkCard";
import { projects } from "@/lib/projects";

export const metadata = {
  title: "Work — Aiden Urbine Creative",
  description: "Selected photo and video projects for outdoor, lifestyle, and gear brands.",
};

export default function WorkPage() {
  const [featured, ...rest] = projects;

  return (
    <main className="min-h-screen bg-black">
      <Nav />

      {/* Page header */}
      <div className="pt-36 pb-12 px-8 md:px-16 lg:px-24">
        <p
          className="mb-4 uppercase"
          style={{
            fontFamily: "var(--font-dm-mono)",
            fontSize: "9px",
            letterSpacing: "0.25em",
            fontWeight: 300,
            color: "#C84B2A",
          }}
        >
          — Selected work
        </p>
        <h1
          className="text-bone uppercase leading-none"
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(4rem, 12vw, 10rem)",
            letterSpacing: "-0.01em",
          }}
        >
          Work
        </h1>
      </div>

      {/* Grid */}
      <div className="px-8 md:px-16 lg:px-24 pb-32 flex flex-col gap-3">

        {/* Row 1 — featured card, full width */}
        <div className="w-full h-[60vh] md:h-[70vh]">
          <WorkCard project={featured} priority />
        </div>

        {/* Row 2 — two cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 h-auto md:h-[58vh]">
          <WorkCard project={rest[0]} />
          <WorkCard project={rest[1]} />
        </div>

        {/* Row 3 — two cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 h-auto md:h-[58vh]">
          <WorkCard project={rest[2]} />
          <WorkCard project={rest[3]} />
        </div>

      </div>
    </main>
  );
}

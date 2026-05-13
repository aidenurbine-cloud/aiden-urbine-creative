import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Gallery, { GalleryItem } from "@/components/Gallery";

type ProjectData = {
  slug: string;
  name: string;
  tag: string;
  location: string;
  desc: string;
  preview: string;
  images: GalleryItem[];
};

const PROJECTS: ProjectData[] = [
  {
    slug: "mkc",
    name: "MONTANA KNIFE CO.",
    tag: "Photo + Video",
    location: "Missoula, MT",
    desc: "Two years and counting as a content creator for one of the fastest growing brands in the outdoor industry. Thousands of pieces of content and still going.",
    preview: "/images/mkc/mkc.JPEG",
    images: [
      { type: "image", src: "/images/MKC%20GALLERY/MKC%20GRAND%20OPENING%20TURTLEBOX.jpg", alt: "MKC Grand Opening" },
      { type: "image", src: "/images/MKC%20GALLERY/MKC%20GRAND%20OPENING%20TURTLEBOX-2.jpg", alt: "MKC Grand Opening" },
      { type: "image", src: "/images/MKC%20GALLERY/MKC%20GRAND%20OPENING%20TURTLEBOX-3.jpg", alt: "MKC Grand Opening" },
      { type: "image", src: "/images/MKC%20GALLERY/MKC%20GRAND%20OPENING%20TURTLEBOX-4.jpg", alt: "MKC Grand Opening" },
      { type: "image", src: "/images/MKC%20GALLERY/MKC%20GRAND%20OPENING%20TURTLEBOX-5.jpg", alt: "MKC Grand Opening" },
      { type: "image", src: "/images/MKC%20GALLERY/MKC%20GRAND%20OPENING%20TURTLEBOX-6.jpg", alt: "MKC Grand Opening" },
      { type: "image", src: "/images/MKC%20GALLERY/MKC%20GRAND%20OPENING%20TURTLEBOX-7.jpg", alt: "MKC Grand Opening" },
      { type: "image", src: "/images/MKC%20GALLERY/MKC%20GRAND%20OPENING%20TURTLEBOX-8.jpg", alt: "MKC Grand Opening" },
      { type: "image", src: "/images/MKC%20GALLERY/MKC%20GRAND%20OPENING%20TURTLEBOX-9.jpg", alt: "MKC Grand Opening" },
      { type: "image", src: "/images/MKC%20GALLERY/MKC%20GRAND%20OPENING%20TURTLEBOX-10.jpg", alt: "MKC Grand Opening" },
      { type: "image", src: "/images/MKC%20GALLERY/MKC%20GRAND%20OPENING%20TURTLEBOX-11.jpg", alt: "MKC Grand Opening" },
      { type: "image", src: "/images/MKC%20GALLERY/MKC%20GRAND%20OPENING%20TURTLEBOX-12.jpg", alt: "MKC Grand Opening" },
      { type: "image", src: "/images/MKC%20GALLERY/MKC%20GRAND%20OPENING%20TURTLEBOX-13.jpg", alt: "MKC Grand Opening" },
      { type: "image", src: "/images/MKC%20GALLERY/MKC%20GRAND%20OPENING%20TURTLEBOX-14.jpg", alt: "MKC Grand Opening" },
      { type: "image", src: "/images/MKC%20GALLERY/MKC%20GRAND%20OPENING%20TURTLEBOX-15.jpg", alt: "MKC Grand Opening" },
      { type: "image", src: "/images/MKC%20GALLERY/USA%20HOODIE.jpg", alt: "USA Hoodie" },
    ],
  },
  {
    slug: "badfish",
    name: "BADFISH SUP",
    tag: "Photo",
    location: "Salida, CO",
    desc: "Photographed the Salida-based brand's growing river surf and SUP collection on the Arkansas River. Shot where it lives.",
    preview: "/images/badish-preview.jpg",
    images: [
      { type: "image", src: "/images/BADFISH%20GALLERY/badfish%20flyweight%20glacier.emh%20(10%20of%2012).jpg", alt: "Badfish" },
      { type: "image", src: "/images/BADFISH%20GALLERY/badfish%20flyweight%20glacier.emh%20(12%20of%2012).jpg", alt: "Badfish" },
      { type: "image", src: "/images/BADFISH%20GALLERY/badfish%20flyweight%20glacier.emh%20(3%20of%2012).jpg", alt: "Badfish" },
      { type: "image", src: "/images/BADFISH%20GALLERY/badfish%20flyweight%20glacier.emh%20(4%20of%2012).jpg", alt: "Badfish" },
      { type: "image", src: "/images/BADFISH%20GALLERY/badfish%20flyweight%20jh.emh%20(11%20of%2011).jpg", alt: "Badfish" },
      { type: "image", src: "/images/BADFISH%20GALLERY/badfish%20reverse%20coast%20%2B%20chelan.emh%20(6%20of%206).jpg", alt: "Badfish" },
      { type: "image", src: "/images/BADFISH%20GALLERY/lunchcounterreverse.emh%20(36%20of%2061).jpg", alt: "Badfish" },
      { type: "image", src: "/images/BADFISH%20GALLERY/lunchcounterreverse.emh%20(46%20of%2061).jpg", alt: "Badfish" },
      { type: "image", src: "/images/BADFISH%20GALLERY/lunchcounterreverse.emh%20(9%20of%2061).jpg", alt: "Badfish" },
    ],
  },
  {
    slug: "marin-moto-ranch",
    name: "MARIN MOTO RANCH",
    tag: "Photo + Video",
    location: "Marin County, CA",
    desc: "Built a full content package for the brand launch of MMR. Lifestyle and brand video for a fast moving startup out of Marin County.",
    preview: "/images/marin-preview.JPG",
    images: [
      { type: "image", src: "/images/MARIN%20MOTO%20RANCH%20GALLERY/ROUTEEMH-20.jpg", alt: "Marin Moto Ranch" },
      { type: "image", src: "/images/MARIN%20MOTO%20RANCH%20GALLERY/ROUTEEMH-3.jpg", alt: "Marin Moto Ranch" },
      { type: "image", src: "/images/MARIN%20MOTO%20RANCH%20GALLERY/ROUTEEMH-58.jpg", alt: "Marin Moto Ranch" },
      { type: "image", src: "/images/MARIN%20MOTO%20RANCH%20GALLERY/ROUTEEMH-61.jpg", alt: "Marin Moto Ranch" },
      { type: "image", src: "/images/MARIN%20MOTO%20RANCH%20GALLERY/ROUTEEMH-67.jpg", alt: "Marin Moto Ranch" },
    ],
  },
  {
    slug: "rough-country",
    name: "ROUGH COUNTRY",
    tag: "Photo + Video",
    location: "Nationwide",
    desc: "Current brand ambassador. My truck is my homebase, so shooting for one of the staples of the auto industry just makes sense.",
    preview: "/images/rough-country-preview.png",
    images: [
      { type: "image", src: "/images/ROUGH%20COUNTRY%20GALLERY/AIDEN%20URBINE%20X%20RC.jpg", alt: "Rough Country" },
      { type: "image", src: "/images/ROUGH%20COUNTRY%20GALLERY/AIDEN%20URBINE%20X%20RC-2.jpg", alt: "Rough Country" },
      { type: "image", src: "/images/ROUGH%20COUNTRY%20GALLERY/AIDEN%20URBINE%20X%20RC-3.jpg", alt: "Rough Country" },
      { type: "image", src: "/images/ROUGH%20COUNTRY%20GALLERY/AIDEN%20URBINE%20X%20RC-4.jpg", alt: "Rough Country" },
      { type: "image", src: "/images/ROUGH%20COUNTRY%20GALLERY/AIDEN%20URBINE%20X%20RC-5.jpg", alt: "Rough Country" },
      { type: "image", src: "/images/ROUGH%20COUNTRY%20GALLERY/AIDEN%20URBINE%20X%20RC-6.jpg", alt: "Rough Country" },
      { type: "image", src: "/images/ROUGH%20COUNTRY%20GALLERY/AIDEN%20URBINE%20X%20RC-7.jpg", alt: "Rough Country" },
      { type: "image", src: "/images/ROUGH%20COUNTRY%20GALLERY/AIDEN%20URBINE%20X%20RC-8.jpg", alt: "Rough Country" },
      { type: "image", src: "/images/ROUGH%20COUNTRY%20GALLERY/AIDEN%20URBINE%20X%20RC-9.jpg", alt: "Rough Country" },
      { type: "image", src: "/images/ROUGH%20COUNTRY%20GALLERY/AIDEN%20URBINE%20X%20RC-10.jpg", alt: "Rough Country" },
      { type: "image", src: "/images/ROUGH%20COUNTRY%20GALLERY/AIDEN%20URBINE%20X%20RC-11.jpg", alt: "Rough Country" },
      { type: "image", src: "/images/ROUGH%20COUNTRY%20GALLERY/AIDEN%20URBINE%20X%20RC-12.jpg", alt: "Rough Country" },
      { type: "image", src: "/images/ROUGH%20COUNTRY%20GALLERY/AIDEN%20URBINE%20X%20RC-13.jpg", alt: "Rough Country" },
      { type: "image", src: "/images/ROUGH%20COUNTRY%20GALLERY/AIDEN%20URBINE%20X%20RC-14.jpg", alt: "Rough Country" },
      { type: "image", src: "/images/ROUGH%20COUNTRY%20GALLERY/AIDEN%20URBINE%20X%20RC-15.jpg", alt: "Rough Country" },
      { type: "image", src: "/images/ROUGH%20COUNTRY%20GALLERY/AIDEN%20URBINE%20X%20RC-16.jpg", alt: "Rough Country" },
      { type: "image", src: "/images/ROUGH%20COUNTRY%20GALLERY/AIDEN%20URBINE%20X%20RC-17.jpg", alt: "Rough Country" },
      { type: "image", src: "/images/ROUGH%20COUNTRY%20GALLERY/AIDEN%20URBINE%20X%20RC-18.jpg", alt: "Rough Country" },
      { type: "image", src: "/images/ROUGH%20COUNTRY%20GALLERY/AIDENURBINE_TRUCK_APRIL%20SNOW.jpg", alt: "Rough Country" },
      { type: "image", src: "/images/ROUGH%20COUNTRY%20GALLERY/AIDENURBINE_TRUCK_APRIL%20SNOW-2.jpg", alt: "Rough Country" },
      { type: "image", src: "/images/ROUGH%20COUNTRY%20GALLERY/AIDENURBINE_TRUCK_APRIL%20SNOW-3.jpg", alt: "Rough Country" },
      { type: "image", src: "/images/ROUGH%20COUNTRY%20GALLERY/AIDENURBINE_TRUCK_APRIL%20SNOW-4.jpg", alt: "Rough Country" },
      { type: "image", src: "/images/ROUGH%20COUNTRY%20GALLERY/AIDENURBINE_TRUCK_APRIL%20SNOW-5.jpg", alt: "Rough Country" },
      { type: "image", src: "/images/ROUGH%20COUNTRY%20GALLERY/AIDENURBINE_TRUCK_APRIL%20SNOW-6.jpg", alt: "Rough Country" },
      { type: "image", src: "/images/ROUGH%20COUNTRY%20GALLERY/AIDENURBINE_TRUCK_APRIL%20SNOW-7.jpg", alt: "Rough Country" },
      { type: "image", src: "/images/ROUGH%20COUNTRY%20GALLERY/AIDENURBINE_TRUCK_APRIL%20SNOW-8.jpg", alt: "Rough Country" },
      { type: "image", src: "/images/ROUGH%20COUNTRY%20GALLERY/AIDENURBINE_TRUCK_APRIL%20SNOW-9.jpg", alt: "Rough Country" },
      { type: "image", src: "/images/ROUGH%20COUNTRY%20GALLERY/HEADSHOT.jpg", alt: "Rough Country" },
      { type: "image", src: "/images/ROUGH%20COUNTRY%20GALLERY/SUNRISE.jpg", alt: "Rough Country" },
    ],
  },
  {
    slug: "personal",
    name: "PERSONAL",
    tag: "Photo",
    location: "The West",
    desc: "My favorite frames from the past few years. The work I do for myself.",
    preview: "/images/personal-preview.JPG",
    images: [
      { type: "image", src: "/images/PERSONAL%20GALLERY/Full%20size-01.jpg", alt: "Personal" },
      { type: "image", src: "/images/PERSONAL%20GALLERY/Full%20size-02.jpg", alt: "Personal" },
      { type: "image", src: "/images/PERSONAL%20GALLERY/hero%20image.JPG", alt: "Personal" },
      { type: "image", src: "/images/PERSONAL%20GALLERY/honest%20story.JPG", alt: "Personal" },
      { type: "image", src: "/images/PERSONAL%20GALLERY/nicole%20senior-13.jpg", alt: "Personal" },
      { type: "image", src: "/images/PERSONAL%20GALLERY/nicole%20senior-34.jpg", alt: "Personal" },
      { type: "image", src: "/images/PERSONAL%20GALLERY/nicole%20senior-38.jpg", alt: "Personal" },
      { type: "image", src: "/images/PERSONAL%20GALLERY/not%20images.jpg", alt: "Personal" },
      { type: "image", src: "/images/PERSONAL%20GALLERY/ocean%20surf%20emh-2.jpg", alt: "Personal" },
      { type: "image", src: "/images/PERSONAL%20GALLERY/ocean%20surf%20emh-8.jpg", alt: "Personal" },
      { type: "image", src: "/images/PERSONAL%20GALLERY/PERSONAL%20HOMEPAGE%20copy.jpg", alt: "Personal" },
      { type: "image", src: "/images/PERSONAL%20GALLERY/R1-06737-0035.JPG", alt: "Personal" },
      { type: "image", src: "/images/PERSONAL%20GALLERY/real%20light.JPG", alt: "Personal" },
    ],
  },
];

const SLUGS = PROJECTS.map((p) => p.slug);

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return {};
  return { title: `${project.name} — Aiden Urbine Creative` };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  const currentIdx = SLUGS.indexOf(project.slug);
  const nextSlug = SLUGS[(currentIdx + 1) % SLUGS.length];
  const nextProject = PROJECTS.find((p) => p.slug === nextSlug)!;

  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh" }}>
      {/* Hero */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <Image
          src={project.preview}
          alt={project.name}
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />

        {/* Dark overlay bottom */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(14,11,8,0.9) 0%, rgba(14,11,8,0.2) 50%, transparent 100%)",
            zIndex: 1,
          }}
        />

        {/* Bottom left content */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "56px",
            zIndex: 2,
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              color: "var(--ember)",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              margin: "0 0 12px",
            }}
          >
            {project.tag}
          </p>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              fontSize: "clamp(64px, 10vw, 140px)",
              color: "var(--bone)",
              lineHeight: 0.88,
              margin: 0,
            }}
          >
            {project.name}
          </h1>

          <p
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              fontSize: "16px",
              color: "var(--muted)",
              marginTop: 12,
              margin: "12px 0 0",
            }}
          >
            {project.desc}
          </p>
        </div>
      </div>

      {/* Gallery — full bleed */}
      <div
        style={{
          width: "100vw",
          position: "relative",
          left: "50%",
          transform: "translateX(-50%)",
          background: "var(--bg)",
        }}
      >
        <Gallery
          items={project.images}
          clientName={project.name}
          tag={project.tag}
          location={project.location}
        />
      </div>

      {/* Bottom nav */}
      <div
        style={{
          padding: "60px 56px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "var(--bg)",
          borderTop: "1px solid rgba(242,237,228,0.06)",
        }}
      >
        <Link href="/home" className="proj-back">
          ← Back to Work
        </Link>

        <Link href={`/work/${nextProject.slug}`} className="proj-next">
          Next Project →
        </Link>
      </div>

      <style>{`
        .proj-back, .proj-next {
          font-family: var(--font-mono);
          font-size: 9px;
          color: var(--muted);
          text-decoration: none;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          transition: color 0.3s;
        }
        .proj-back:hover { color: var(--bone); }
        .proj-next:hover { color: var(--ember); }
        @media (max-width: 768px) {
          h1 { font-size: clamp(48px, 12vw, 80px) !important; }
        }
      `}</style>
    </main>
  );
}

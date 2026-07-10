import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Gallery, { GalleryItem } from "@/components/Gallery";
import { BLUR } from "@/lib/blur";

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
    preview: "/images/preview/mkc%20preview.jpg",
    images: [
      // 6 and 13 pinned first (Aiden's picks), the rest shuffled out of sequence.
      { type: "image", src: "/images/mkc-gallery/6.jpg", alt: "Montana Knife Co." },
      { type: "image", src: "/images/mkc-gallery/13.jpg", alt: "Montana Knife Co." },
      { type: "image", src: "/images/mkc-gallery/22.jpg", alt: "Montana Knife Co." },
      { type: "image", src: "/images/mkc-gallery/4.jpg", alt: "Montana Knife Co." },
      { type: "image", src: "/images/mkc-gallery/18.jpg", alt: "Montana Knife Co." },
      { type: "image", src: "/images/mkc-gallery/9.jpg", alt: "Montana Knife Co." },
      { type: "image", src: "/images/mkc-gallery/1.jpg", alt: "Montana Knife Co." },
      { type: "image", src: "/images/mkc-gallery/25.jpg", alt: "Montana Knife Co." },
      { type: "image", src: "/images/mkc-gallery/11.jpg", alt: "Montana Knife Co." },
      { type: "image", src: "/images/mkc-gallery/16.jpg", alt: "Montana Knife Co." },
      { type: "image", src: "/images/mkc-gallery/3.jpg", alt: "Montana Knife Co." },
      { type: "image", src: "/images/mkc-gallery/20.jpg", alt: "Montana Knife Co." },
      { type: "image", src: "/images/mkc-gallery/7.jpg", alt: "Montana Knife Co." },
      { type: "image", src: "/images/mkc-gallery/14.jpg", alt: "Montana Knife Co." },
      { type: "image", src: "/images/mkc-gallery/26.jpg", alt: "Montana Knife Co." },
      { type: "image", src: "/images/mkc-gallery/2.jpg", alt: "Montana Knife Co." },
      { type: "image", src: "/images/mkc-gallery/19.jpg", alt: "Montana Knife Co." },
      { type: "image", src: "/images/mkc-gallery/8.jpg", alt: "Montana Knife Co." },
      { type: "image", src: "/images/mkc-gallery/23.jpg", alt: "Montana Knife Co." },
      { type: "image", src: "/images/mkc-gallery/5.jpg", alt: "Montana Knife Co." },
      { type: "image", src: "/images/mkc-gallery/12.jpg", alt: "Montana Knife Co." },
      { type: "image", src: "/images/mkc-gallery/17.jpg", alt: "Montana Knife Co." },
      { type: "image", src: "/images/mkc-gallery/10.jpg", alt: "Montana Knife Co." },
      { type: "image", src: "/images/mkc-gallery/24.jpg", alt: "Montana Knife Co." },
      { type: "image", src: "/images/mkc-gallery/15.jpg", alt: "Montana Knife Co." },
      { type: "image", src: "/images/mkc-gallery/21.jpg", alt: "Montana Knife Co." },
    ],
  },
  {
    slug: "badfish",
    name: "BADFISH SUP",
    tag: "Photo",
    location: "Salida, CO",
    desc: "Photographed the Salida-based brand's growing river surf and SUP collection on the Arkansas River. Shot where it lives.",
    preview: "/images/preview/badfish-preview.jpg",
    images: [
      { type: "image", src: "/images/badfish-gallery/badfish%20flyweight%20glacier.emh%20(10%20of%2012).jpg", alt: "Badfish" },
      { type: "image", src: "/images/badfish-gallery/badfish%20flyweight%20glacier.emh%20(12%20of%2012).jpg", alt: "Badfish" },
      { type: "image", src: "/images/badfish-gallery/badfish%20flyweight%20glacier.emh%20(3%20of%2012).jpg", alt: "Badfish" },
      { type: "image", src: "/images/badfish-gallery/badfish%20flyweight%20glacier.emh%20(4%20of%2012).jpg", alt: "Badfish" },
      { type: "image", src: "/images/badfish-gallery/badfish%20flyweight%20jh.emh%20(11%20of%2011).jpg", alt: "Badfish" },
      { type: "image", src: "/images/badfish-gallery/badfish%20reverse%20coast%20%2B%20chelan.emh%20(6%20of%206).jpg", alt: "Badfish" },
      { type: "image", src: "/images/badfish-gallery/lunchcounterreverse.emh%20(36%20of%2061).jpg", alt: "Badfish" },
      { type: "image", src: "/images/badfish-gallery/lunchcounterreverse.emh%20(46%20of%2061).jpg", alt: "Badfish" },
      { type: "image", src: "/images/badfish-gallery/lunchcounterreverse.emh%20(9%20of%2061).jpg", alt: "Badfish" },
    ],
  },
  {
    slug: "marin-moto-ranch",
    name: "MARIN MOTO RANCH",
    tag: "Photo + Video",
    location: "Marin County, CA",
    desc: "Built a full content package for the brand launch of MMR. Lifestyle and brand video for a fast moving startup out of Marin County.",
    preview: "/images/preview/marin-preview.jpg",
    images: [
      { type: "image", src: "/images/marin-gallery/ROUTEEMH-20.jpg", alt: "Marin Moto Ranch" },
      { type: "image", src: "/images/marin-gallery/ROUTEEMH-3.jpg", alt: "Marin Moto Ranch" },
      { type: "image", src: "/images/marin-gallery/ROUTEEMH-58.jpg", alt: "Marin Moto Ranch" },
      { type: "image", src: "/images/marin-gallery/ROUTEEMH-61.jpg", alt: "Marin Moto Ranch" },
      { type: "image", src: "/images/marin-gallery/ROUTEEMH-67.jpg", alt: "Marin Moto Ranch" },
    ],
  },
  {
    slug: "rough-country",
    name: "ROUGH COUNTRY",
    tag: "Photo + Video",
    location: "Nationwide",
    desc: "Current brand ambassador. My truck is my homebase, so shooting for one of the staples of the auto industry just makes sense.",
    preview: "/images/preview/rough-country-preview.jpg",
    images: [
      { type: "image", src: "/images/rough-country-gallery/1.jpg", alt: "Rough Country" },
      { type: "image", src: "/images/rough-country-gallery/2.jpg", alt: "Rough Country" },
      { type: "image", src: "/images/rough-country-gallery/3.jpg", alt: "Rough Country" },
      { type: "image", src: "/images/rough-country-gallery/4.jpg", alt: "Rough Country" },
      { type: "image", src: "/images/rough-country-gallery/5.jpg", alt: "Rough Country" },
      { type: "image", src: "/images/rough-country-gallery/6.jpg", alt: "Rough Country" },
      { type: "image", src: "/images/rough-country-gallery/7.jpg", alt: "Rough Country" },
      { type: "image", src: "/images/rough-country-gallery/8.jpg", alt: "Rough Country" },
      { type: "image", src: "/images/rough-country-gallery/9.jpg", alt: "Rough Country" },
      { type: "image", src: "/images/rough-country-gallery/10.jpg", alt: "Rough Country" },
      { type: "image", src: "/images/rough-country-gallery/11.jpg", alt: "Rough Country" },
      { type: "image", src: "/images/rough-country-gallery/12.jpg", alt: "Rough Country" },
      { type: "image", src: "/images/rough-country-gallery/13.jpg", alt: "Rough Country" },
      { type: "image", src: "/images/rough-country-gallery/14.jpg", alt: "Rough Country" },
      { type: "image", src: "/images/rough-country-gallery/15.jpg", alt: "Rough Country" },
      { type: "image", src: "/images/rough-country-gallery/16.jpg", alt: "Rough Country" },
    ],
  },
  {
    slug: "personal",
    name: "PERSONAL",
    tag: "Photo",
    location: "The West",
    desc: "My favorite frames from the past few years. The work I do for myself.",
    preview: "/images/preview/personal-preview.jpg",
    images: [
      { type: "image", src: "/images/personal-gallery/AT%20THE%20ROCK-103.jpg", alt: "Personal" },
      { type: "image", src: "/images/personal-gallery/AT%20THE%20ROCK-107.jpg", alt: "Personal" },
      { type: "image", src: "/images/personal-gallery/AT%20THE%20ROCK-108.jpg", alt: "Personal" },
      { type: "image", src: "/images/personal-gallery/AT%20THE%20ROCK-109.jpg", alt: "Personal" },
      { type: "image", src: "/images/personal-gallery/AT%20THE%20ROCK-110.jpg", alt: "Personal" },
      { type: "image", src: "/images/personal-gallery/AT%20THE%20ROCK-111.jpg", alt: "Personal" },
      { type: "image", src: "/images/personal-gallery/Full%20size-01.jpg", alt: "Personal" },
      { type: "image", src: "/images/personal-gallery/Full%20size-02.jpg", alt: "Personal" },
      { type: "image", src: "/images/personal-gallery/Full%20size-0.JPG", alt: "Personal" },
      { type: "image", src: "/images/personal-gallery/Full%20size-2.JPG", alt: "Personal" },
      { type: "image", src: "/images/personal-gallery/Full%20size-4.JPG", alt: "Personal" },
      { type: "image", src: "/images/personal-gallery/hero%20image.JPG", alt: "Personal" },
      { type: "image", src: "/images/personal-gallery/hero.JPG", alt: "Personal" },
      { type: "image", src: "/images/personal-gallery/honest%20story.JPG", alt: "Personal" },
      { type: "image", src: "/images/personal-gallery/DSC00372.JPG", alt: "Personal" },
      { type: "image", src: "/images/personal-gallery/DSC08810.JPG", alt: "Personal" },
      { type: "image", src: "/images/personal-gallery/de.JPG", alt: "Personal" },
      { type: "image", src: "/images/personal-gallery/garb2022images-4.JPG", alt: "Personal" },
      { type: "image", src: "/images/personal-gallery/IMG_0260.JPG", alt: "Personal" },
      { type: "image", src: "/images/personal-gallery/IMG_0265.JPG", alt: "Personal" },
      { type: "image", src: "/images/personal-gallery/IMG_0267.JPG", alt: "Personal" },
      { type: "image", src: "/images/personal-gallery/IMG_0268.JPG", alt: "Personal" },
      { type: "image", src: "/images/personal-gallery/IMG_4968.jpg", alt: "Personal" },
      { type: "image", src: "/images/personal-gallery/IMG_5092.JPG", alt: "Personal" },
      { type: "image", src: "/images/personal-gallery/John%20parc-0.JPG", alt: "Personal" },
      { type: "image", src: "/images/personal-gallery/John%20parc-0%202.JPG", alt: "Personal" },
      { type: "image", src: "/images/personal-gallery/6195AF7A-117F-4DF7-9017-664EE5CA020A.JPG", alt: "Personal" },
      { type: "image", src: "/images/personal-gallery/FLAG%20NOR%20FAIL%20-%20DAY%201%20-%20EXPORT%201-13.JPG", alt: "Personal" },
      { type: "image", src: "/images/personal-gallery/FLAG%20NOR%20FAIL%20-%20DAY%201%20-%20EXPORT%203-28.JPG", alt: "Personal" },
      { type: "image", src: "/images/personal-gallery/FLAG%20NOR%20FAIL%20-%20DAY%201%20-%20EXPORT%203-39.JPG", alt: "Personal" },
      { type: "image", src: "/images/personal-gallery/FLAG%20NOR%20FAIL%20-%20DAY%201%20-%20EXPORT%203-4.JPG", alt: "Personal" },
      { type: "image", src: "/images/personal-gallery/FLAG%20NOR%20FAIL%20-%20DAY%201%20-%20EXPORT%203-5.JPG", alt: "Personal" },
      { type: "image", src: "/images/personal-gallery/FLAG%20NOR%20FAIL%20-%20DAY%201%20-%20EXPORT4-28.JPG", alt: "Personal" },
      { type: "image", src: "/images/personal-gallery/FLAG%20NOR%20FAIL%20-%20DAY%201%20-%20EXPORT4-31.JPG", alt: "Personal" },
      { type: "image", src: "/images/personal-gallery/FLAG%20NOR%20FAIL%20-%20DAY%201%20-%20EXPORT4-34.JPG", alt: "Personal" },
      { type: "image", src: "/images/personal-gallery/FLAG%20NOR%20FAIL%20-%20DAY%201%20-%20EXPORT4-42.JPG", alt: "Personal" },
      { type: "image", src: "/images/personal-gallery/FLAG%20NOR%20FAIL%20-%20DAY%201%20-%20EXPORT4-6.JPG", alt: "Personal" },
      { type: "image", src: "/images/personal-gallery/sickest%20shit%20ever-1.JPG", alt: "Personal" },
      { type: "image", src: "/images/personal-gallery/nicole%20senior-13.jpg", alt: "Personal" },
      { type: "image", src: "/images/personal-gallery/nicole%20senior-34.jpg", alt: "Personal" },
      { type: "image", src: "/images/personal-gallery/nicole%20senior-38.jpg", alt: "Personal" },
      { type: "image", src: "/images/personal-gallery/nope.jpg", alt: "Personal" },
      { type: "image", src: "/images/personal-gallery/not%20images.jpg", alt: "Personal" },
      { type: "image", src: "/images/personal-gallery/ocean%20surf%20emh-2.jpg", alt: "Personal" },
      { type: "image", src: "/images/personal-gallery/ocean%20surf%20emh-8.jpg", alt: "Personal" },
      { type: "image", src: "/images/personal-gallery/PERSONAL%20HOMEPAGE%20copy.jpg", alt: "Personal" },
      { type: "image", src: "/images/personal-gallery/R1-06737-0035.JPG", alt: "Personal" },
      { type: "image", src: "/images/personal-gallery/real%20light.JPG", alt: "Personal" },
      { type: "image", src: "/images/personal-gallery/winnebago%20hero.JPG", alt: "Personal" },
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
  return {
    title: project.name,
    description: project.desc,
    openGraph: {
      title: project.name,
      description: project.desc,
      images: [{ url: project.preview, alt: project.name }],
    },
    twitter: { card: "summary_large_image", images: [project.preview] },
  };
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
      {/* Home link (top-left, over hero) */}
      <Link
        href="/home"
        className="proj-home"
        style={{
          position: "fixed",
          top: 26,
          left: 32,
          zIndex: 50,
          fontFamily: "var(--font-mono)",
          fontSize: "13px",
          color: "var(--bone)",
          letterSpacing: "0.3em",
          textDecoration: "none",
          textShadow: "0 2px 12px rgba(0,0,0,0.6)",
        }}
      >
        AU
      </Link>

      {/* Hero */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          background: "var(--bg)",
        }}
      >
        <Image
          src={project.preview}
          alt={project.name}
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL={BLUR}
          style={{ objectFit: "cover", objectPosition: "center 20%" }}
        />

        {/* Dark overlay bottom */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(14,11,8,0.92) 0%, rgba(14,11,8,0.3) 50%, transparent 100%)",
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
              fontWeight: 700,
              fontSize: "clamp(64px, 10vw, 140px)",
              color: "var(--bone)",
              lineHeight: 0.88,
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            {project.name}
          </h1>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 300,
              fontSize: "16px",
              color: "rgba(245,242,234,0.7)",
              lineHeight: 1.85,
              marginTop: 12,
              margin: "12px 0 0",
            }}
          >
            {project.desc}
          </p>

          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              color: "rgba(245,242,234,0.7)",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              margin: "10px 0 0",
            }}
          >
            {project.location}
          </p>
        </div>
      </div>

      {/* Gallery: full bleed */}
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
          borderTop: "1px solid var(--border)",
        }}
      >
        <Link href="/work" className="proj-back">
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
        .proj-back:hover { color: var(--ink); }
        .proj-next:hover { color: var(--ember); }
        .proj-home { transition: color 0.3s; }
        .proj-home:hover { color: var(--ember); }
        @media (max-width: 768px) {
          h1 { font-size: clamp(48px, 12vw, 80px) !important; }
        }
      `}</style>
    </main>
  );
}

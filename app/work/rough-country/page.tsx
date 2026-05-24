import Image from "next/image";
import Link from "next/link";
import Gallery, { GalleryItem } from "@/components/Gallery";

const IMAGES: GalleryItem[] = [
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
];

export const metadata = {
  title: "Rough Country — Aiden Urbine Creative",
};

export default function RoughCountryPage() {
  return (
    <main style={{ background: "#0E0B08", minHeight: "100vh" }}>
      {/* Hero */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          background: "#0E0B08",
        }}
      >
        <Image
          src="/images/preview/rough-country-preview.png"
          alt="Rough Country"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center 20%" }}
        />

        {/* Bottom gradient only */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(14,11,8,0.92) 0%, rgba(14,11,8,0.3) 45%, transparent 100%)",
            zIndex: 1,
          }}
        />

        {/* Bottom-left hero text */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            padding: "56px",
            zIndex: 2,
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              color: "#C84B2A",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              margin: "0 0 12px",
            }}
          >
            Photo + Video
          </p>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(64px, 10vw, 140px)",
              color: "#F2EDE4",
              lineHeight: 0.88,
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            ROUGH COUNTRY
          </h1>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 300,
              fontSize: "16px",
              color: "#8C7B65",
              margin: "14px 0 10px",
              maxWidth: 480,
              lineHeight: 1.85,
            }}
          >
            Current brand ambassador. My truck is my homebase so shooting for
            one of the staples of the auto industry just makes sense.
          </p>

          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              color: "#8C7B65",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            Nationwide
          </p>
        </div>
      </div>

      {/* Gallery — full bleed */}
      <div style={{ width: "100%", background: "#0E0B08" }}>
        <Gallery
          items={IMAGES}
          clientName="ROUGH COUNTRY"
          tag="Photo + Video"
          location="Nationwide"
        />
      </div>

      {/* Bottom nav */}
      <div
        style={{
          padding: "60px 56px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#0E0B08",
          borderTop: "1px solid rgba(242,237,228,0.06)",
        }}
      >
        <Link href="/home" className="rc-back">
          ← Back to Work
        </Link>
        <Link href="/work/personal" className="rc-next">
          Next Project →
        </Link>
      </div>

      <style>{`
        .rc-back, .rc-next {
          font-family: var(--font-mono);
          font-size: 9px;
          color: #8C7B65;
          text-decoration: none;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          transition: color 0.3s;
        }
        .rc-back:hover { color: #F2EDE4; }
        .rc-next:hover { color: #C84B2A; }
        @media (max-width: 768px) {
          h1 { font-size: clamp(48px, 12vw, 80px) !important; }
        }
      `}</style>
    </main>
  );
}

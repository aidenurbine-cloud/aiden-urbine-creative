"use client";

import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";

interface ProjectGalleryProps {
  title: string;
  tag: string;
  location: string;
  hero: string;
  images: string[];
  next: { label: string; href: string };
}

// Layout pattern that repeats every 11 images
// Returns { type, height, count } for the row starting at index i
function getRowLayout(i: number): { type: "full" | "halves" | "split" | "thirds"; height: string; count: number } {
  const pos = i % 11;
  if (pos === 0) return { type: "full",   height: "70vh", count: 1 };
  if (pos === 1) return { type: "halves", height: "55vh", count: 2 };
  if (pos === 3) return { type: "split",  height: "60vh", count: 2 };
  if (pos === 5) return { type: "full",   height: "65vh", count: 1 };
  if (pos === 6) return { type: "thirds", height: "50vh", count: 3 };
  if (pos === 9) return { type: "halves", height: "55vh", count: 2 };
  // fallback for any image that lands outside expected positions (edge case)
  return { type: "full", height: "65vh", count: 1 };
}

function ImageCell({ src, sizes }: { src: string; sizes: string }) {
  return (
    <div
      style={{
        position: "relative",
        flex: 1,
        overflow: "hidden",
        minWidth: 0,
      }}
    >
      <Image
        src={src}
        alt=""
        fill
        sizes={sizes}
        style={{
          objectFit: "cover",
          objectPosition: "center",
          transition: "filter 0.4s ease",
        }}
        className="gallery-img"
      />
    </div>
  );
}

export default function ProjectGallery({
  title,
  tag,
  location,
  hero,
  images,
  next,
}: ProjectGalleryProps) {
  // Build rows by consuming images sequentially
  const rows: Array<{ type: "full" | "halves" | "split" | "thirds"; height: string; imgs: string[] }> = [];
  let i = 0;
  while (i < images.length) {
    const { type, height, count } = getRowLayout(i);
    const slice = images.slice(i, i + count);
    if (slice.length === 0) break;
    rows.push({ type, height, imgs: slice });
    i += slice.length;
  }

  return (
    <main style={{ background: "#1A1208", minHeight: "100vh" }}>
      <Nav />

      {/* Hero */}
      <div style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
        <Image
          src={hero}
          alt={title}
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center", zIndex: 0 }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(26,18,8,0.95) 0%, rgba(26,18,8,0.3) 50%, transparent 100%)",
            zIndex: 1,
          }}
        />
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
              letterSpacing: "0.25em",
              fontWeight: 300,
              color: "#C84B2A",
              textTransform: "uppercase",
              margin: "0 0 10px",
            }}
          >
            {tag}
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(72px, 11vw, 160px)",
              color: "#F2EDE4",
              lineHeight: 0.88,
              letterSpacing: "-0.01em",
              margin: "0 0 14px",
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              letterSpacing: "0.25em",
              fontWeight: 300,
              color: "#8C7B65",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            {location}
          </p>
        </div>
      </div>

      {/* Photo grid */}
      <div
        style={{
          background: "#1A1208",
          display: "flex",
          flexDirection: "column",
          gap: 3,
          padding: 0,
        }}
      >
        {rows.map((row, ri) => {
          if (row.type === "full") {
            return (
              <div key={ri} style={{ position: "relative", height: row.height, overflow: "hidden" }}>
                <Image
                  src={row.imgs[0]}
                  alt=""
                  fill
                  sizes="100vw"
                  style={{ objectFit: "cover", objectPosition: "center", transition: "filter 0.4s ease" }}
                  className="gallery-img"
                />
              </div>
            );
          }

          if (row.type === "halves") {
            return (
              <div key={ri} style={{ display: "flex", gap: 3, height: row.height }}>
                {row.imgs.map((src, ii) => (
                  <ImageCell key={ii} src={src} sizes="50vw" />
                ))}
                {/* If only one image in a halves slot, fill the other side dark */}
                {row.imgs.length === 1 && (
                  <div style={{ flex: 1, background: "#1A1208" }} />
                )}
              </div>
            );
          }

          if (row.type === "split") {
            return (
              <div key={ri} style={{ display: "flex", gap: 3, height: row.height }}>
                <div style={{ position: "relative", flex: "0 0 60%", overflow: "hidden" }}>
                  <Image
                    src={row.imgs[0]}
                    alt=""
                    fill
                    sizes="60vw"
                    style={{ objectFit: "cover", objectPosition: "center", transition: "filter 0.4s ease" }}
                    className="gallery-img"
                  />
                </div>
                {row.imgs[1] ? (
                  <div style={{ position: "relative", flex: 1, overflow: "hidden" }}>
                    <Image
                      src={row.imgs[1]}
                      alt=""
                      fill
                      sizes="40vw"
                      style={{ objectFit: "cover", objectPosition: "center", transition: "filter 0.4s ease" }}
                      className="gallery-img"
                    />
                  </div>
                ) : (
                  <div style={{ flex: 1, background: "#1A1208" }} />
                )}
              </div>
            );
          }

          if (row.type === "thirds") {
            return (
              <div key={ri} style={{ display: "flex", gap: 3, height: row.height }}>
                {row.imgs.map((src, ii) => (
                  <ImageCell key={ii} src={src} sizes="33vw" />
                ))}
                {/* Pad with dark if fewer than 3 images remain */}
                {Array.from({ length: Math.max(0, 3 - row.imgs.length) }).map((_, ii) => (
                  <div key={`pad-${ii}`} style={{ flex: 1, background: "#1A1208" }} />
                ))}
              </div>
            );
          }

          return null;
        })}
      </div>

      {/* End nav */}
      <div
        style={{
          background: "#1A1208",
          padding: "80px 56px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "0.5px solid rgba(242,237,228,0.06)",
        }}
      >
        <Link
          href={next.href}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "24px",
            color: "#F2EDE4",
            textDecoration: "none",
            transition: "opacity 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          {next.label} →
        </Link>
        <Link
          href="/work"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "9px",
            letterSpacing: "0.25em",
            fontWeight: 300,
            color: "#8C7B65",
            textTransform: "uppercase",
            textDecoration: "none",
            transition: "opacity 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.5")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Back to Work
        </Link>
      </div>
    </main>
  );
}

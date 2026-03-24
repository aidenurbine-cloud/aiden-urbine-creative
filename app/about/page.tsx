import Nav from "@/components/Nav";
import CTAButton from "@/components/CTAButton";

export const metadata = {
  title: "About — Aiden Urbine Creative",
  description: "Photo & Video — Missoula, Montana. Outdoor, lifestyle, and gear brands.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black">
      <Nav />

      {/* Hero */}
      <section
        className="grain-overlay"
        style={{
          position: "relative",
          minHeight: "80vh",
          background: "#0A0A08",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "9rem clamp(2rem, 6vw, 6rem) 4rem",
        }}
      >
        <p
          className="uppercase"
          style={{
            fontFamily: "var(--font-dm-mono)",
            fontSize: "9px",
            letterSpacing: "0.25em",
            fontWeight: 300,
            color: "#C84B2A",
            marginBottom: "1.5rem",
          }}
        >
          About
        </p>
        <h1
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(80px, 14vw, 180px)",
            color: "#EDE9E0",
            lineHeight: 1,
            letterSpacing: "-0.01em",
            marginBottom: "1.5rem",
          }}
        >
          <span style={{ display: "block" }}>AIDEN</span>
          <span style={{ display: "block" }}>URBINE</span>
        </h1>
        <p
          style={{
            fontFamily: "var(--font-cormorant)",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "20px",
            color: "rgba(212,207,196,0.6)",
          }}
        >
          Photo &amp; Video — Missoula, Montana
        </p>
      </section>

      {/* Origin */}
      <section
        style={{
          background: "#0A0A08",
          padding: "6rem clamp(2rem, 6vw, 6rem)",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(3rem, 8vw, 7rem)",
            color: "#2A2A26",
            lineHeight: 1,
            marginBottom: "2rem",
          }}
        >
          THE EYE
        </h2>
        <p
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "18px",
            fontWeight: 300,
            color: "#D4CFC4",
            maxWidth: 600,
            lineHeight: 1.7,
          }}
        >
          I grew up chasing light across mountain ranges and high desert. Before I knew what a
          camera was, I knew what a great shot felt like — that moment where everything goes quiet
          and the world arranges itself. I&apos;ve spent the last six years turning that instinct into a
          craft, working with the brands that live closest to the land.
        </p>
      </section>

      {/* What I Do */}
      <section
        style={{
          background: "#0A0A08",
          padding: "6rem clamp(2rem, 6vw, 6rem)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "48px",
          }}
        >
          {/* PHOTO */}
          <div>
            <p
              className="uppercase"
              style={{
                fontFamily: "var(--font-dm-mono)",
                fontSize: "9px",
                letterSpacing: "0.25em",
                fontWeight: 300,
                color: "#C84B2A",
                marginBottom: "1rem",
              }}
            >
              Photo
            </p>
            <p
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "16px",
                fontWeight: 300,
                color: "#D4CFC4",
                lineHeight: 1.7,
              }}
            >
              Still photography for campaigns, editorials, and product launches. Natural light
              preferred. Every frame is built around the brand&apos;s world, not borrowed from a
              mood board.
            </p>
          </div>

          {/* VIDEO */}
          <div>
            <p
              className="uppercase"
              style={{
                fontFamily: "var(--font-dm-mono)",
                fontSize: "9px",
                letterSpacing: "0.25em",
                fontWeight: 300,
                color: "#C84B2A",
                marginBottom: "1rem",
              }}
            >
              Video
            </p>
            <p
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "16px",
                fontWeight: 300,
                color: "#D4CFC4",
                lineHeight: 1.7,
              }}
            >
              Brand films, gear reviews, and adventure content shot to feel lived-in. No talking
              heads. No stock transitions. Just the terrain, the tools, and the people who use them.
            </p>
          </div>

          {/* DIRECTION */}
          <div>
            <p
              className="uppercase"
              style={{
                fontFamily: "var(--font-dm-mono)",
                fontSize: "9px",
                letterSpacing: "0.25em",
                fontWeight: 300,
                color: "#C84B2A",
                marginBottom: "1rem",
              }}
            >
              Direction
            </p>
            <p
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "16px",
                fontWeight: 300,
                color: "#D4CFC4",
                lineHeight: 1.7,
              }}
            >
              Creative direction from concept through delivery. I work with brands at every stage
              — pre-production planning, on-location logistics, post-production oversight — so the
              vision stays intact end to end.
            </p>
          </div>
        </div>
      </section>

      {/* Outside the Lens */}
      <section
        style={{
          background: "#0A0A08",
          padding: "6rem clamp(2rem, 6vw, 6rem)",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            color: "#2A2A26",
            lineHeight: 1,
            marginBottom: "2rem",
          }}
        >
          OUTSIDE THE LENS
        </h2>
        <p
          style={{
            fontFamily: "var(--font-cormorant)",
            fontStyle: "italic",
            fontSize: "18px",
            fontWeight: 300,
            color: "rgba(212,207,196,0.6)",
            maxWidth: 560,
            lineHeight: 1.7,
          }}
        >
          When I&apos;m not shooting, I&apos;m riding dirt roads, fly fishing the Clark Fork, or building
          something in the shop. Montana isn&apos;t a backdrop for me — it&apos;s the reason the work looks
          the way it does.
        </p>
      </section>

      {/* Closing line */}
      <section
        style={{
          padding: "6rem clamp(2rem, 6vw, 6rem)",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            color: "rgba(212,207,196,0.5)",
            letterSpacing: "0.05em",
          }}
        >
          MISSOULA, MONTANA — EST. MMXXVI
        </p>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: "0 clamp(2rem, 6vw, 6rem) 6rem",
          display: "flex",
          justifyContent: "center",
          gap: "16px",
          flexWrap: "wrap",
        }}
      >
        <CTAButton href="/work" label="View the Work" />
        <CTAButton href="/contact" label="Get in Touch" />
      </section>
    </main>
  );
}

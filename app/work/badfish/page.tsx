import Image from "next/image";
import Nav from "@/components/Nav";

export const metadata = {
  title: "Badfish SUP — Aiden Urbine Creative",
  description: "Badfish SUP — Salida, Colorado. Arkansas River.",
};

const B = "/images/badfish/";

export default function BadfishPage() {
  return (
    <main style={{ background: "#0A0A08", minHeight: "100vh" }}>
      <Nav />

      {/* ── Hero ───────────────────────────────────────────── */}
      <div style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
        <Image
          src={`${B}badfish flyweight glacier.emh (3 of 12).jpg`}
          alt="Badfish SUP"
          fill
          priority
          className="object-cover object-center"
          style={{ zIndex: 0 }}
        />
        {/* Bottom-only gradient */}
        <div
          style={{
            position: "absolute",
            inset: "auto 0 0 0",
            height: "60%",
            background: "linear-gradient(to top, #0A0A08 0%, rgba(10,10,8,0.6) 40%, transparent 100%)",
            zIndex: 1,
          }}
        />
        {/* Hero text — bottom left */}
        <div style={{ position: "absolute", bottom: 0, left: 0, padding: "48px", zIndex: 2 }}>
          <p
            style={{
              fontFamily: "var(--font-dm-mono)",
              fontSize: "9px",
              letterSpacing: "0.25em",
              fontWeight: 300,
              color: "#C84B2A",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            Salida, Colorado — Arkansas River
          </p>
          <h1
            style={{
              fontFamily: "var(--font-bebas)",
              fontSize: "clamp(80px, 12vw, 160px)",
              color: "#D4CFC4",
              lineHeight: 1,
              letterSpacing: "-0.01em",
              textTransform: "uppercase",
            }}
          >
            Badfish SUP
          </h1>
        </div>
      </div>

      {/* ── Image sequence ─────────────────────────────────── */}
      <div style={{ background: "#0A0A08", display: "flex", flexDirection: "column", gap: 2 }}>

        {/* Row 1 — Full width, 80vh */}
        <div style={{ position: "relative", height: "80vh", overflow: "hidden" }}>
          <Image
            src={`${B}badfish flyweight glacier.emh (4 of 12).jpg`}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        {/* Row 2 — Side by side 50/50, 60vh */}
        <div style={{ display: "flex", gap: 2, height: "60vh" }}>
          <div style={{ position: "relative", flex: 1, overflow: "hidden" }}>
            <Image
              src={`${B}badfish flyweight glacier.emh (10 of 12).jpg`}
              alt=""
              fill
              sizes="50vw"
              className="object-cover object-center"
            />
          </div>
          <div style={{ position: "relative", flex: 1, overflow: "hidden" }}>
            <Image
              src={`${B}badfish flyweight glacier.emh (12 of 12).jpg`}
              alt=""
              fill
              sizes="50vw"
              className="object-cover object-center"
            />
          </div>
        </div>

        {/* Row 3 — Full width, 70vh */}
        <div style={{ position: "relative", height: "70vh", overflow: "hidden" }}>
          <Image
            src={`${B}badfish flyweight jh.emh (11 of 11).jpg`}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        {/* Row 4 — 65% / 35% split, 50vh */}
        <div style={{ display: "flex", gap: 2, height: "50vh" }}>
          <div style={{ position: "relative", flex: "0 0 65%", overflow: "hidden" }}>
            <Image
              src={`${B}badfish reverse coast + chelan.emh (6 of 6).jpg`}
              alt=""
              fill
              sizes="65vw"
              className="object-cover object-center"
            />
          </div>
          <div style={{ position: "relative", flex: "0 0 calc(35% - 2px)", overflow: "hidden" }}>
            <Image
              src={`${B}lunchcounterreverse.emh (9 of 61).jpg`}
              alt=""
              fill
              sizes="35vw"
              className="object-cover object-center"
            />
          </div>
        </div>

        {/* Row 5 — Full width, 65vh */}
        <div style={{ position: "relative", height: "65vh", overflow: "hidden" }}>
          <Image
            src={`${B}lunchcounterreverse.emh (36 of 61).jpg`}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        {/* Row 6 — Full width, 60vh */}
        <div style={{ position: "relative", height: "60vh", overflow: "hidden" }}>
          <Image
            src={`${B}lunchcounterreverse.emh (46 of 61).jpg`}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      </div>

      {/* ── Closing line ───────────────────────────────────── */}
      <div style={{ padding: "120px 0", textAlign: "center", background: "#0A0A08" }}>
        <p
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "24px",
            fontStyle: "italic",
            fontWeight: 300,
            color: "rgba(212,207,196,0.5)",
          }}
        >
          Salida, Colorado.
        </p>
      </div>
    </main>
  );
}

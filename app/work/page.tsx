import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Nav";

export const metadata = {
  title: "Work — Aiden Urbine Creative",
  description: "Selected photo and video projects for outdoor, lifestyle, and gear brands.",
};

type ClientEntry = {
  name: string;
  tag: string;
  href: string;
  image?: string;
};

const clients: ClientEntry[] = [
  {
    name: "Montana Knife Company",
    tag: "Product Photo + Video",
    href: "/work/mkc",
    image: "/images/MKC GALLERY/MKC GRAND OPENING TURTLEBOX.jpg",
  },
  {
    name: "Rough Country",
    tag: "Photo + Video",
    href: "/work/rough-country",
    image: "/images/ROUGH COUNTRY GALLERY/AIDEN URBINE X RC.jpg",
  },
  {
    name: "Badfish SUP",
    tag: "Photo + Video",
    href: "/work/badfish",
    image: "/images/BADFISH homepage opreview.jpg",
  },
  {
    name: "Marin Moto Ranch",
    tag: "Photo + Video",
    href: "/work/marin-moto-ranch",
    image: "/images/MMR HOMEPAGE.jpg",
  },
  {
    name: "Personal",
    tag: "Personal Collection",
    href: "/work/personal",
    image: "/images/PERSONAL HOMEPAGE.jpg",
  },
  {
    name: "Forrest Tool Co",
    tag: "Photo",
    href: "/work/forrest-tool",
  },
  {
    name: "Surf Hotel BV",
    tag: "Photo",
    href: "/work/surf-hotel",
  },
  {
    name: "Currents Construction",
    tag: "Photo + Web",
    href: "/work/currents",
  },
  {
    name: "Ark Valley Welding",
    tag: "Photo",
    href: "/work/ark-valley",
  },
  {
    name: "Turtlebox",
    tag: "Photo + Video",
    href: "/work/turtlebox",
  },
  {
    name: "Winnebago",
    tag: "Photo",
    href: "/work/winnebago",
  },
];

function ClientCard({ client }: { client: ClientEntry }) {
  return (
    <Link
      href={client.href}
      className="group"
      style={{ position: "relative", display: "block", height: 320, overflow: "hidden" }}
    >
      {/* Image or gradient placeholder */}
      {client.image ? (
        <Image
          src={client.image}
          alt={client.name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          style={{ zIndex: 0 }}
        />
      ) : (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(145deg, #1A1208 0%, #1A1208 100%)",
            zIndex: 0,
          }}
        />
      )}

      {/* Dark overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(26,18,8,0.5)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Bottom gradient */}
      <div
        style={{
          position: "absolute",
          inset: "auto 0 0 0",
          height: "70%",
          background: "linear-gradient(to top, #1A1208 0%, transparent 100%)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "0 24px 24px",
          zIndex: 3,
        }}
      >
        {/* Ember underline */}
        <div style={{ position: "relative", height: 1, marginBottom: 12, overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "#2F2416" }} />
          <div
            className="origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
            style={{ position: "absolute", inset: 0, background: "#C84B2A" }}
          />
        </div>

        <p
          className="uppercase"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "8px",
            letterSpacing: "0.25em",
            fontWeight: 300,
            color: "#C84B2A",
            marginBottom: 6,
          }}
        >
          {client.tag}
        </p>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "36px",
            color: "#F2EDE4",
            lineHeight: 1,
            letterSpacing: "-0.01em",
          }}
        >
          {client.name}
        </h2>
      </div>
    </Link>
  );
}

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-black">
      <Nav />

      {/* Hero */}
      <div
        style={{
          paddingTop: "9rem",
          paddingBottom: "4rem",
          paddingLeft: "clamp(2rem, 6vw, 6rem)",
          paddingRight: "clamp(2rem, 6vw, 6rem)",
        }}
      >
        <p
          className="uppercase"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "9px",
            letterSpacing: "0.25em",
            fontWeight: 300,
            color: "#C84B2A",
            marginBottom: "1rem",
          }}
        >
          Selected Clients — 2020–Present
        </p>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(80px, 12vw, 160px)",
            color: "#F2EDE4",
            lineHeight: 1,
            letterSpacing: "-0.01em",
            marginBottom: "1rem",
          }}
        >
          THE WORK
        </h1>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "18px",
            color: "rgba(242,237,228,0.6)",
          }}
        >
          Photo and video for brands built to last.
        </p>
      </div>

      {/* Client grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "2px",
          background: "#1A1208",
        }}
      >
        {clients.map((client) => (
          <ClientCard key={client.href} client={client} />
        ))}
      </div>
    </main>
  );
}

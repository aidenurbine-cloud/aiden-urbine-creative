import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { EMAIL, INSTAGRAM } from "@/lib/projects";
import { FIELD_GRADES_1 } from "@/lib/shop";

export const metadata: Metadata = {
  title: "Links",
  description: "Photo and video out of Missoula, Montana. Portfolio, LUTs, and how to reach me.",
  alternates: { canonical: "/links" },
};

// the link-in-bio page. edit this list to change what shows up, top to bottom.
// external: true opens in a new tab.
const LINKS: { label: string; href: string; external?: boolean }[] = [
  { label: "Portfolio", href: "/" },
  { label: "Video work", href: "/video" },
  { label: "Instagram", href: `https://instagram.com/${INSTAGRAM}`, external: true },
  { label: "Work with me", href: "/contact" },
  { label: "Email me", href: `mailto:${EMAIL}` },
];

export default function Links() {
  const p = FIELD_GRADES_1;
  return (
    <main className="lt">
      <header className="lt-head">
        <Link href="/" className="lt-name">Aiden Urbine</Link>
        <p className="lt-role">photographer, videographer, follower of dirt roads</p>
      </header>

      <Link href="/presets" className="lt-feature">
        <Image src={p.art.banner} alt={p.name} width={2560} height={1440} sizes="(max-width: 520px) 100vw, 480px" priority />
        <span className="lt-feature-text">
          <strong>Field Grades</strong>
          <span>Vol. 1 LUTs, ${p.price}</span>
        </span>
      </Link>

      <ul className="lt-list">
        {LINKS.map((l) => (
          <li key={l.label}>
            {l.external || l.href.startsWith("mailto:") ? (
              <a href={l.href} className="lt-link" {...(l.external ? { target: "_blank", rel: "noopener" } : {})}>
                {l.label}
              </a>
            ) : (
              <Link href={l.href} className="lt-link">{l.label}</Link>
            )}
          </li>
        ))}
      </ul>

      <p className="lt-foot">Missoula, Montana</p>
    </main>
  );
}

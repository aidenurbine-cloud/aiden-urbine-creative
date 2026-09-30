"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { projects, EMAIL, INSTAGRAM } from "@/lib/projects";

const commercial = projects.filter((p) => p.slug !== "personal");

export default function Sidebar() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [path]);

  const cls = (href: string) => (path === href ? "is-here" : undefined);

  return (
    <aside className={`side${open ? " is-open" : ""}`}>
      <div className="side-top">
        <Link href="/" className="wordmark">
          Aiden Urbine
        </Link>
        <button type="button" className="menu-btn" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
          {open ? "close" : "menu"}
        </button>
      </div>

      <nav className="side-nav" aria-label="Main">
        <Link href="/work" className={`caps ${cls("/work") ?? ""}`}>
          Favorites
        </Link>
        <span className="caps caps-label">Commercial</span>
        <ul className="sub">
          {commercial.map((p) => (
            <li key={p.slug}>
              <Link href={`/work/${p.slug}`} className={cls(`/work/${p.slug}`)}>
                {p.name}
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/work/personal" className={`caps ${cls("/work/personal") ?? ""}`}>
          Personal
        </Link>

        <ul className="small-links">
          <li>
            <Link href="/about" className={cls("/about")}>
              about
            </Link>
          </li>
          <li>
            <Link href="/contact" className={cls("/contact")}>
              contact
            </Link>
          </li>
        </ul>

        <div className="icons">
          <a href={`https://instagram.com/${INSTAGRAM}`} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.6">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
            </svg>
          </a>
          <a href={`mailto:${EMAIL}`} aria-label="Email">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.6">
              <rect x="3" y="5" width="18" height="14" rx="1" />
              <path d="M3.5 6l8.5 7 8.5-7" />
            </svg>
          </a>
        </div>
        <p className="side-place">Missoula, Montana</p>
      </nav>
    </aside>
  );
}

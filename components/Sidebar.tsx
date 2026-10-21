"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { projects, photoCategories, videoEntries, EMAIL, INSTAGRAM } from "@/lib/projects";


export default function Sidebar() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [path]);

  const here = (href: string) => (path === href ? " is-here" : "");
  // personal goes last in the photo list; youtube-only projects live under video
  const photo = [
    ...projects.filter((p) => p.slug !== "personal" && p.images.length && !p.youtube),
    projects.find((p) => p.slug === "personal")!,
  ];
  const videos = videoEntries();
  const isVideoPath = videos.some((v) => path === v.href || path.startsWith(v.href + "/"));

  return (
    <aside className={`side${open ? " is-open" : ""}`}>
      <div className="side-top">
        <Link href="/" className="wordmark">
          <span>Aiden</span> <span>Urbine</span>
        </Link>
        <button type="button" className="menu-btn" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
          {open ? "close" : "menu"}
        </button>
      </div>

      <div className="side-body">
        <p className="side-role">photographer, videographer, follower of dirt roads</p>

        <nav aria-label="Main">
          <section className="nav-sec">
            <Link href="/" className={`nav-h${here("/")}`}>
              Photo
            </Link>
            <ul className="nav-list">
              {photo.map((p) => {
                const base = `/work/${p.slug}`;
                const inside = !isVideoPath && (path === base || path.startsWith(base + "/"));
                return (
                  <li key={p.slug}>
                    <Link href={base} className={`w${here(base) || (inside ? " is-open" : "")}`}>
                      {p.slug === "personal" ? "Personal" : p.name}
                    </Link>
                    {inside && photoCategories(p).length > 0 && (
                      <ul className="work-sub">
                        {photoCategories(p).map((c) => {
                          const cat = `${base}/${c.slug}`;
                          const inCat = path === cat || path.startsWith(cat + "/");
                          return (
                            <li key={c.slug}>
                              <Link href={cat} className={`w${here(cat) || (inCat ? " is-open" : "")}`}>
                                {c.name}
                              </Link>
                              {inCat && c.shoots.length > 0 && (
                                <ul className="work-sub">
                                  {c.shoots.map((sh) => (
                                    <li key={sh.slug}>
                                      <Link href={`${cat}/${sh.slug}`} className={`w${here(`${cat}/${sh.slug}`)}`}>
                                        {sh.name}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>

          <section className="nav-sec">
            <Link href="/video" className={`nav-h${here("/video")}`}>
              Video
            </Link>
            <ul className="nav-list">
              {videos.map((v) => (
                <li key={v.href}>
                  <Link href={v.href} className={`w${here(v.href)}`}>
                    {v.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="nav-sec">
            <Link href="/about" className={`nav-h${here("/about")}`}>
              About
            </Link>
            <ul className="nav-list">
              <li>
                <Link href="/contact" className={`w${here("/contact")}`}>
                  Contact
                </Link>
              </li>
              <li>
                <a className="w" href={`https://instagram.com/${INSTAGRAM}`} target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </li>
              <li>
                <a className="w" href={`mailto:${EMAIL}`}>
                  Email
                </a>
              </li>
            </ul>
          </section>

          <p className="side-legal">
            © {new Date().getFullYear()} Aiden Urbine
            <br />
            <Link href="/privacy">Privacy</Link>
          </p>
        </nav>
      </div>
    </aside>
  );
}

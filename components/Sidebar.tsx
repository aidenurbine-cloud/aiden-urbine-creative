"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { projects, EMAIL, INSTAGRAM } from "@/lib/projects";

// Missoula time, so the page feels like somebody's actually out there.
function LocalTime() {
  const [t, setT] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", { timeZone: "America/Denver", hour: "numeric", minute: "2-digit" });
    const tick = () => setT(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);
  return <span className="side-time">{t ? `${t} here` : " "}</span>;
}

export default function Sidebar() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [path]);

  const here = (href: string) => (path === href ? " is-here" : "");
  const commercial = projects.filter((p) => p.slug !== "personal");

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
        <p className="side-role">
          Photo &amp; video
          <br />
          Missoula, Montana
          <br />
          <LocalTime />
        </p>

        <nav aria-label="Main">
          <ul className="side-list">
            <li>
              <Link href="/" className={`side-row side-home${here("/")}`}>
                Selected work
              </Link>
            </li>
          </ul>

          <ul className="side-list side-clients">
            {commercial.map((p) => {
              const base = `/work/${p.slug}`;
              const inside = path === base || path.startsWith(base + "/");
              return (
                <li key={p.slug}>
                  <Link href={base} className={`side-row${inside ? " is-here" : ""}`}>
                    {p.name}
                  </Link>
                  {/* A client's categories open up only while you're in that client,
                      and a category's shoots only while you're in that category. */}
                  {inside && p.categories && (
                    <ul className="side-sub">
                      {p.categories.map((c) => {
                        const cat = `${base}/${c.slug}`;
                        const inCat = path === cat || path.startsWith(cat + "/");
                        return (
                          <li key={c.slug}>
                            <Link href={cat} className={inCat ? "is-here" : undefined}>
                              {c.name}
                            </Link>
                            {inCat && c.shoots.length > 0 && (
                              <ul className="side-sub side-shoots">
                                {c.shoots.map((sh) => (
                                  <li key={sh.slug}>
                                    <Link href={`${cat}/${sh.slug}`} className={here(`${cat}/${sh.slug}`).trim() || undefined}>
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

          <ul className="side-list">
            <li>
              <Link href="/work/personal" className={`side-row${here("/work/personal")}`}>
                Personal
              </Link>
            </li>
          </ul>

          <ul className="side-list side-info">
            <li>
              <Link href="/about" className={`side-row${here("/about")}`}>
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className={`side-row${here("/contact")}`}>
                Contact
              </Link>
            </li>
          </ul>

          <p className="side-reach">
            <a href={`https://instagram.com/${INSTAGRAM}`} target="_blank" rel="noopener noreferrer">
              @{INSTAGRAM}
            </a>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </p>
        </nav>
      </div>
    </aside>
  );
}

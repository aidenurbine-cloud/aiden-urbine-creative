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
          {/* The work list: one rule down the left, one indent step per level,
              and a single rust tick for the page you're on. */}
          <ul className="work">
            <li>
              <Link href="/" className={`w w-home${here("/")}`}>
                Selected work
              </Link>
            </li>
            {[...commercial, projects.find((p) => p.slug === "personal")!].map((p) => {
              const base = `/work/${p.slug}`;
              const inside = path === base || path.startsWith(base + "/");
              return (
                <li key={p.slug} className={p.slug === "personal" ? "w-gap" : undefined}>
                  <Link href={base} className={`w${here(base) || (inside ? " is-open" : "")}`}>
                    {p.slug === "personal" ? "Personal" : p.name}
                  </Link>
                  {/* A client's categories open only while you're in that client,
                      and a category's shoots only while you're in that category. */}
                  {inside && p.categories && (
                    <ul className="work-sub">
                      {p.categories.map((c) => {
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

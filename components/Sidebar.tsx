"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { projects, EMAIL, INSTAGRAM } from "@/lib/projects";

const no = (i: number) => String(i + 1).padStart(2, "0");

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
  const personal = projects.find((p) => p.slug === "personal")!;

  return (
    <aside className={`side${open ? " is-open" : ""}`}>
      <div className="side-top">
        <Link href="/" className="wordmark">
          <span>Aiden</span> <span>Urbine</span>
        </Link>
        <button type="button" className="menu-btn" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
          {open ? "close" : "index"}
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
          <Link href="/" className={`side-row side-all${here("/")}`}>
            <span className="idx">00</span>
            <span>Selected work</span>
          </Link>

          <p className="side-h">Commercial</p>
          <ol className="side-list">
            {commercial.map((p, i) => (
              <li key={p.slug}>
                <Link href={`/work/${p.slug}`} className={`side-row${here(`/work/${p.slug}`)}`}>
                  <span className="idx">{no(i)}</span>
                  <span>{p.name}</span>
                  <span className="ct">{p.images.length}</span>
                </Link>
              </li>
            ))}
          </ol>

          <p className="side-h">Personal</p>
          <ol className="side-list">
            <li>
              <Link href="/work/personal" className={`side-row${here("/work/personal")}`}>
                <span className="idx">{no(commercial.length)}</span>
                <span>The West</span>
                <span className="ct">{personal.images.length}</span>
              </Link>
            </li>
          </ol>

          <ul className="side-links">
            <li>
              <Link href="/about" className={here("/about")}>
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className={here("/contact")}>
                Contact
              </Link>
            </li>
            <li>
              <a href={`https://instagram.com/${INSTAGRAM}`} target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </li>
            <li>
              <a href={`mailto:${EMAIL}`}>Email</a>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}

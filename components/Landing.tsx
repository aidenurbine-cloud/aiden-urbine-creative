"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Photo } from "@/lib/projects";

type Slide = Photo & { pos: string; project: { name: string; slug: string } };

const HOLD = 5500; // ms each photo stays up

export default function Landing({ slides }: { slides: Slide[] }) {
  const [i, setI] = useState(0);
  const n = slides.length;

  useEffect(() => {
    const t = setInterval(() => {
      if (!document.hidden) setI((x) => (x + 1) % n);
    }, HOLD);
    return () => clearInterval(t);
  }, [n, i]); // restarting on i means a manual click gets a full HOLD too

  const cur = slides[i];

  return (
    <div className="landing">
      <button type="button" className="landing-stage" onClick={() => setI((i + 1) % n)} aria-label="Next photo">
        {slides.map((s, k) => (
          // Mount only the previous (fading out), current, and next (preloading) slides.
          (k === i || k === (i + 1) % n || k === (i - 1 + n) % n) && (
            <div key={s.src} className={`landing-slide${k === i ? " is-on" : ""}`}>
              <Image
                src={s.src}
                alt={s.project.name}
                fill
                sizes="100vw"
                priority={k === 0}
                quality={85}
                style={{ objectFit: "cover", objectPosition: s.pos, background: s.c }}
              />
            </div>
          )
        ))}
      </button>

      <div className="landing-shade" aria-hidden="true" />

      <h1 className="landing-name">Aiden Urbine</h1>
      <p className="landing-tag">Photo &amp; video · Missoula, Montana</p>

      <nav className="landing-nav" aria-label="Main">
        <Link href="/work">Work</Link>
        <Link href="/work/personal">Personal</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </nav>

      <Link href={`/work/${cur.project.slug}`} className="landing-cap">
        {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")} · {cur.project.name}
      </Link>
    </div>
  );
}

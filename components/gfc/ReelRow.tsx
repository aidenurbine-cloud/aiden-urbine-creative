"use client";

import { useRef, useState } from "react";

const embedUrl = (url: string) => url.replace(/[?#].*$/, "").replace(/\/?$/, "/") + "embed";

// sideways row of instagram reels with a name over each one, arrows and dots,
// so it's obvious there's more than one to look at.
export default function ReelRow({ reels }: { reels: { url: string; label: string }[] }) {
  const row = useRef<HTMLDivElement>(null);
  const [at, setAt] = useState(0);

  const go = (i: number) => {
    const el = row.current;
    const card = el?.children[i] as HTMLElement | undefined;
    if (!el || !card) return;
    setAt(i);
    el.scrollTo({ left: card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2, behavior: "smooth" });
  };
  const onScroll = () => {
    const el = row.current;
    if (!el) return;
    const kids = [...el.children] as HTMLElement[];
    const mid = el.scrollLeft + el.clientWidth / 2;
    let best = 0;
    kids.forEach((k, i) => {
      if (Math.abs(k.offsetLeft + k.offsetWidth / 2 - mid) < Math.abs(kids[best].offsetLeft + kids[best].offsetWidth / 2 - mid)) best = i;
    });
    setAt(best);
  };

  return (
    <div className="gx-row">
      <div className="gx-row-top">
        <p className="gx-row-hint">{at === 0 ? `Swipe for more` : reels[at].label}</p>
        <div className="gx-row-btns">
          <button type="button" aria-label="Previous reel" disabled={at === 0} onClick={() => go(at - 1)}>
            &larr;
          </button>
          <button type="button" aria-label="Next reel" disabled={at === reels.length - 1} onClick={() => go(at + 1)}>
            &rarr;
          </button>
        </div>
      </div>

      <div className="gx-reels" ref={row} onScroll={onScroll}>
        {reels.map((r) => (
          <figure key={r.label} className="gx-reel-card">
            <figcaption>{r.label}</figcaption>
            <div className="gx-reel">
              <iframe src={embedUrl(r.url)} title={r.label} loading="lazy" allowFullScreen />
            </div>
          </figure>
        ))}
      </div>

      <div className="gx-dots" aria-hidden>
        {reels.map((r, i) => (
          <button key={r.label} type="button" tabIndex={-1} className={i === at ? "is-on" : ""} onClick={() => go(i)} />
        ))}
      </div>
    </div>
  );
}

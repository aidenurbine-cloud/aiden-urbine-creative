"use client";

import { useState } from "react";
import Feed, { type FeedItem } from "./Feed";

type Item = FeedItem & { slug: string };

// Home gallery with a client filter on top.
export default function Gallery({ items, filters }: { items: Item[]; filters: { slug: string; name: string }[] }) {
  const [only, setOnly] = useState<string | null>(null);
  const shown = only ? items.filter((i) => i.slug === only) : items;

  return (
    <>
      <div className="filters" role="toolbar" aria-label="Filter by client">
        <button type="button" className={only === null ? "is-on" : ""} onClick={() => setOnly(null)}>
          All <span className="ct">{items.length}</span>
        </button>
        {filters.map((f) => {
          const count = items.filter((i) => i.slug === f.slug).length;
          if (!count) return null;
          return (
            <button key={f.slug} type="button" className={only === f.slug ? "is-on" : ""} onClick={() => setOnly(f.slug)}>
              {f.name} <span className="ct">{count}</span>
            </button>
          );
        })}
      </div>
      <Feed key={only ?? "all"} items={shown} priority={3} />
    </>
  );
}

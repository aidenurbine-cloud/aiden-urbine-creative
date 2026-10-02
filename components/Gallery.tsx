"use client";

import { useState } from "react";
import Feed, { type FeedItem } from "./Feed";

type Item = FeedItem & { slug: string };

export default function Gallery({
  items,
  byClient,
  filters,
}: {
  items: Item[];
  byClient: Record<string, Item[]>;
  filters: { slug: string; name: string }[];
}) {
  const [only, setOnly] = useState<string | null>(null);
  const shown = only ? byClient[only] : items;

  return (
    <>
      <div className="filters" role="toolbar" aria-label="Filter by client">
        <button type="button" className={only === null ? "is-on" : ""} onClick={() => setOnly(null)}>
          All
        </button>
        {filters.map((f) => (
          <button key={f.slug} type="button" className={only === f.slug ? "is-on" : ""} onClick={() => setOnly(f.slug)}>
            {f.name}
          </button>
        ))}
      </div>
      <Feed key={only ?? "all"} items={shown} priority={3} />
    </>
  );
}

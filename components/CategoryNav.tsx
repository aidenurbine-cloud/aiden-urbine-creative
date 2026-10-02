import Link from "next/link";
import type { Project } from "@/lib/projects";

export default function CategoryNav({ p, active }: { p: Project; active?: string }) {
  if (!p.categories || p.categories.length < 2) return null;
  return (
    <nav className="filters is-centered" aria-label={`${p.name} categories`}>
      <Link href={`/work/${p.slug}`} className={!active ? "is-on" : ""}>
        All
      </Link>
      {p.categories.map((c) => (
        <Link key={c.slug} href={`/work/${p.slug}/${c.slug}`} className={active === c.slug ? "is-on" : ""}>
          {c.name}
        </Link>
      ))}
    </nav>
  );
}

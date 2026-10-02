import Link from "next/link";
import { notFound } from "next/navigation";
import Feed from "@/components/Feed";
import { projects, getProject, getCategory, getShoot } from "@/lib/projects";

type Params = { slug: string; collection: string; shoot: string };

export function generateStaticParams() {
  return projects.flatMap((p) =>
    (p.categories ?? []).flatMap((c) => c.shoots.map((s) => ({ slug: p.slug, collection: c.slug, shoot: s.slug })))
  );
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug, collection, shoot } = await params;
  const s = getShoot(slug, collection, shoot);
  if (!s) return {};
  return {
    title: s.name,
    description: s.desc || getProject(slug)?.desc,
    openGraph: { title: s.name, images: [{ url: s.cover.src, alt: s.name }] },
    twitter: { card: "summary_large_image", images: [s.cover.src] },
  };
}

export default async function ShootPage({ params }: { params: Promise<Params> }) {
  const { slug, collection, shoot } = await params;
  const p = getProject(slug);
  const c = getCategory(slug, collection);
  const s = getShoot(slug, collection, shoot);
  if (!p || !c || !s) notFound();

  const next = c.shoots[(c.shoots.indexOf(s) + 1) % c.shoots.length];
  const items = s.items.map((m, k) => ({ ...m, alt: `${s.name}, ${k + 1}` }));

  return (
    <>
      <header className="page-head is-centered">
        <Link href={`/work/${p.slug}/${c.slug}`} className="page-up">
          ← {c.name}
        </Link>
        <h1 className="page-title">{s.name}</h1>
        {s.desc && <p className="page-desc">{s.desc}</p>}
      </header>
      <Feed items={items} />
      <nav className="next" aria-label="Next shoot">
        <Link href={`/work/${p.slug}/${c.slug}`} className="page-up">
          All {c.name}
        </Link>
        {c.shoots.length > 1 && (
          <Link href={`/work/${p.slug}/${c.slug}/${next.slug}`} className="next-link">
            {next.name} →
          </Link>
        )}
      </nav>
    </>
  );
}

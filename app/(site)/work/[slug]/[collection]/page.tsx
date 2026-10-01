import Link from "next/link";
import { notFound } from "next/navigation";
import Feed from "@/components/Feed";
import { projects, getProject, getCollection } from "@/lib/projects";

export function generateStaticParams() {
  return projects.flatMap((p) => (p.collections ?? []).map((c) => ({ slug: p.slug, collection: c.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; collection: string }> }) {
  const { slug, collection } = await params;
  const p = getProject(slug);
  const c = getCollection(slug, collection);
  if (!p || !c) return {};
  const title = `${c.name} · ${p.name}`;
  return {
    title,
    description: c.desc || p.desc,
    openGraph: { title, images: [{ url: c.cover.src, alt: title }] },
    twitter: { card: "summary_large_image", images: [c.cover.src] },
  };
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string; collection: string }> }) {
  const { slug, collection } = await params;
  const p = getProject(slug);
  const c = getCollection(slug, collection);
  if (!p || !c || !p.collections) notFound();

  const all = p.collections;
  const next = all[(all.indexOf(c) + 1) % all.length];
  const items = c.items.map((m, k) => ({ ...m, alt: `${p.name}, ${c.name}, ${k + 1}` }));

  return (
    <>
      <header className="page-head is-centered">
        <Link href={`/work/${p.slug}`} className="page-up">
          ← {p.name}
        </Link>
        <h1 className="page-title">{c.name}</h1>
        {c.desc && <p className="page-desc">{c.desc}</p>}
      </header>
      <Feed items={items} />
      {all.length > 1 && (
        <nav className="next" aria-label="Next collection">
          <Link href={`/work/${p.slug}`} className="page-up">
            All {p.name}
          </Link>
          <Link href={`/work/${p.slug}/${next.slug}`} className="next-link">
            {next.name} →
          </Link>
        </nav>
      )}
    </>
  );
}

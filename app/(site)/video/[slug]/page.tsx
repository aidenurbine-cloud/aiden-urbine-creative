import Link from "next/link";
import { notFound } from "next/navigation";
import Feed from "@/components/Feed";
import { videoGroups, getVideoGroup } from "@/lib/projects";

export function generateStaticParams() {
  return videoGroups()
    .filter((g) => !g.youtube)
    .map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = getVideoGroup(slug);
  return g
    ? { title: `${g.name} Video`, description: `Video work for ${g.name}: ${g.cats.map((c) => c.name.toLowerCase()).join(", ")}.` }
    : {};
}

export default async function VideoGroupPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = getVideoGroup(slug);
  if (!g) notFound();
  return (
    <>
      <header className="page-head is-centered">
        <Link href="/video" className="page-up">
          ← Video
        </Link>
        <h1 className="page-title">{g.name}</h1>
      </header>
      {g.cats.map((c) => (
        <div key={c.href} className="video-cat">
          <h2 className="video-sub">
            <Link href={c.href}>{c.name}</Link>
          </h2>
          <Feed items={c.items.map((m, k) => ({ ...m, alt: `${g.name}, ${c.name}, ${k + 1}` }))} />
        </div>
      ))}
    </>
  );
}

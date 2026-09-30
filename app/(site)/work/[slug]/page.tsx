import Link from "next/link";
import { notFound } from "next/navigation";
import Feed from "@/components/Feed";
import { projects, getProject } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: p.name,
    description: p.desc,
    openGraph: { title: p.name, description: p.desc, images: [{ url: p.feature[0].src, alt: p.name }] },
    twitter: { card: "summary_large_image", images: [p.feature[0].src] },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const i = projects.indexOf(p);
  const next = projects[(i + 1) % projects.length];
  const items = p.images.map((img, k) => ({ ...img, alt: `${p.name}, photo ${k + 1}` }));

  return (
    <>
      <header className="page-head">
        <h1 className="page-title">{p.name}</h1>
        <p className="page-desc">{p.desc}</p>
        <p className="page-meta">
          {p.tag} · {p.location}
        </p>
      </header>
      <Feed items={items} />
      <nav className="next" aria-label="Next project">
        <Link href={`/work/${next.slug}`} className="next-link">
          {next.name} →
        </Link>
      </nav>
    </>
  );
}

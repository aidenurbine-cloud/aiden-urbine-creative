import Link from "next/link";
import Gallery from "@/components/Gallery";
import { favorites, projects } from "@/lib/projects";

export default function Home() {
  const items = favorites.map((f) => ({
    ...f,
    slug: f.project.slug,
    alt: f.project.name,
    caption: f.project.name,
    href: `/work/${f.project.slug}`,
  }));
  const filters = projects.map((p) => ({ slug: p.slug, name: p.name }));
  return (
    <>
      <h1 className="sr-only">Aiden Urbine, photo and video. Selected work.</h1>
      <Gallery items={items} filters={filters} />
      <p className="page-end">
        That&apos;s the short list. <Link href="/work/personal">More from the road →</Link>
      </p>
    </>
  );
}

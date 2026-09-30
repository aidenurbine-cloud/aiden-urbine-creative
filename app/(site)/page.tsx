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
  // Filtering by a client shows every photo from that client, not just the favorites.
  const byClient = Object.fromEntries(
    projects.map((p) => [
      p.slug,
      p.images.map((img, k) => ({
        ...img,
        slug: p.slug,
        alt: `${p.name}, photo ${k + 1}`,
        caption: p.name,
        href: `/work/${p.slug}`,
      })),
    ])
  );
  const filters = projects.map((p) => ({ slug: p.slug, name: p.name }));
  return (
    <>
      <h1 className="sr-only">Aiden Urbine, photo and video. Selected work.</h1>
      <Gallery items={items} byClient={byClient} filters={filters} />
    </>
  );
}

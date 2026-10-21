import Feed from "@/components/Feed";
import { favorites } from "@/lib/projects";

export default function Home() {
  const items = favorites.map((f) => ({
    ...f,
    alt: f.project.name,
    caption: f.project.name,
    href: `/work/${f.project.slug}`,
  }));
  return (
    <>
      <h1 className="sr-only">Aiden Urbine, photo and video.</h1>
      <Feed items={items} priority={3} />
    </>
  );
}

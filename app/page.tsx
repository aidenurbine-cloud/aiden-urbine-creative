import Link from "next/link";
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
      <h1 className="sr-only">Aiden Urbine, photo and video. Favorites.</h1>
      <Feed items={items} priority={2} />
      <PageEnd />
    </>
  );
}

function PageEnd() {
  return (
    <p className="page-end hand-note">
      that&apos;s the short list. <Link href="/work/personal">more here →</Link>
    </p>
  );
}

import Link from "next/link";
import Feed from "@/components/Feed";
import YouTube from "@/components/YouTube";
import { videoGroups } from "@/lib/projects";

export const metadata = {
  title: "Video",
  description: "Video work by Aiden Urbine.",
};

export default function VideoPage() {
  return (
    <>
      <h1 className="sr-only">Video</h1>
      {videoGroups().map((g) => (
        <section key={g.href} className="video-block">
          <h2 className="video-title">
            <Link href={g.href}>{g.name}</Link>
          </h2>
          {g.youtube && <YouTube id={g.youtube} title={g.desc || g.name} />}
          {g.cats.map((c) => (
            <div key={c.href} className="video-cat">
              <h3 className="video-sub">
                <Link href={c.href}>{c.name}</Link>
              </h3>
              <Feed items={c.items.map((m, k) => ({ ...m, alt: `${g.name}, ${c.name}, ${k + 1}` }))} />
            </div>
          ))}
        </section>
      ))}
    </>
  );
}

import Link from "next/link";
import Feed from "@/components/Feed";
import YouTube from "@/components/YouTube";
import { videoEntries } from "@/lib/projects";

export const metadata = {
  title: "Video",
  description: "Video work by Aiden Urbine.",
};

export default function VideoPage() {
  const entries = videoEntries();
  return (
    <>
      <h1 className="sr-only">Video</h1>
      {entries.map((e) => (
        <section key={e.href} className="video-block">
          <h2 className="video-title">
            <Link href={e.href}>{e.name}</Link>
          </h2>
          {e.youtube ? (
            <YouTube id={e.youtube} title={e.desc || e.name} />
          ) : (
            <Feed items={(e.items ?? []).map((m, k) => ({ ...m, alt: `${e.name}, ${k + 1}` }))} />
          )}
        </section>
      ))}
    </>
  );
}

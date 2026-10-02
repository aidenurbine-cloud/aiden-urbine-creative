import Link from "next/link";
import Photo from "./Photo";
import type { Photo as PhotoType } from "@/lib/projects";

export default function Covers({ entries }: { entries: { href: string; name: string; cover: PhotoType }[] }) {
  return (
    <ul className="collections">
      {entries.map((e) => (
        <li key={e.href}>
          <Link href={e.href} className="collection">
            <span className="collection-cover">
              <Photo photo={e.cover} alt={e.name} sizes="(min-width: 900px) 26vw, 50vw" />
            </span>
            <span className="collection-name">{e.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

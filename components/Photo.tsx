import Image from "next/image";
import type { Photo as PhotoType } from "@/lib/projects";

export default function Photo({
  photo,
  alt,
  sizes,
  priority,
  className = "",
}: {
  photo: PhotoType;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`photo ${className}`}
      style={{ background: photo.c, aspectRatio: `${photo.w} / ${photo.h}` }}
    >
      <Image
        src={photo.src}
        width={photo.w}
        height={photo.h}
        alt={alt}
        sizes={sizes}
        priority={priority}
      />
    </span>
  );
}

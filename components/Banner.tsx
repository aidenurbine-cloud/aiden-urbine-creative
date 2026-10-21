"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// bump when the banner file changes so browsers grab the new one
const V = "3";

export default function Banner() {
  const path = usePathname();
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    // vertical cut on phones
    if (window.matchMedia("(max-width: 699px)").matches) {
      v.poster = `/video/banner-mobile.jpg?v=${V}`;
      v.src = `/video/banner-mobile.mp4?v=${V}`;
    }
    v.play().catch(() => {});
  }, [path]);

  if (path !== "/") return null;
  return (
    <div className="banner">
      <video ref={ref} src={`/video/banner.mp4?v=${V}`} poster={`/video/banner.jpg?v=${V}`} autoPlay muted loop playsInline preload="auto" aria-label="Aiden Urbine Creative reel" />
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function Banner() {
  const path = usePathname();
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    // smaller file on phones
    if (window.matchMedia("(max-width: 699px)").matches) v.src = "/video/banner-small.mp4";
    v.play().catch(() => {});
  }, [path]);

  if (path !== "/") return null;
  return (
    <div className="banner">
      <video ref={ref} src="/video/banner.mp4" poster="/video/banner.jpg" autoPlay muted loop playsInline preload="auto" aria-label="Aiden Urbine Creative reel" />
    </div>
  );
}

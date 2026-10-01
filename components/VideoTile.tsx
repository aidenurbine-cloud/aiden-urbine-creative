"use client";

import { useEffect, useRef } from "react";
import type { Media } from "@/lib/projects";

/** A muted loop in the grid. Only plays while it's on screen, so a page of videos stays light. */
export default function VideoTile({ video }: { video: Media }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // React doesn't reliably set the muted attribute, and browsers only autoplay muted video.
    el.muted = true;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <span className="photo" style={{ background: video.c, aspectRatio: `${video.w} / ${video.h}` }}>
      <video ref={ref} src={video.src} poster={video.poster} muted loop playsInline preload="none" />
    </span>
  );
}

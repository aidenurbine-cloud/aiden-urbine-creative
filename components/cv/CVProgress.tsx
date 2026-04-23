"use client";

import { useEffect, useRef } from "react";

export default function CVProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;

    function update() {
      if (!barRef.current) return;
      const scrollable = document.body.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const totalProgress = window.scrollY / scrollable;
      barRef.current.style.width = `${Math.min(1, totalProgress) * 100}%`;
    }

    function onScroll() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[9000] pointer-events-none"
      style={{ height: "1px", background: "rgba(200,75,42,0.15)" }}
    >
      <div
        ref={barRef}
        style={{
          height: "100%",
          width: "0%",
          background: "#C84B2A",
          transition: "width 0.08s linear",
        }}
      />
    </div>
  );
}

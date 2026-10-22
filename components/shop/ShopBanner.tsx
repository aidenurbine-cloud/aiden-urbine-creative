"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { FIELD_GRADES_1 as p } from "@/lib/shop";

// full-width pack art across the top of /presets, like the home page banner
export default function ShopBanner() {
  if (usePathname() !== "/presets") return null;
  return (
    <div className="banner banner-art">
      <Image src={p.art.banner} alt={`${p.name} cover art`} fill priority sizes="100vw" />
    </div>
  );
}

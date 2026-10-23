import type { MetadataRoute } from "next";
import { projects, videoGroups } from "@/lib/projects";
import { FIELD_GRADES_1, hasFree } from "@/lib/shop";

const BASE = "https://aidenurbine.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/video", "/presets", "/about", "/contact", "/links", "/privacy"];
  if (hasFree(FIELD_GRADES_1)) paths.push("/free-lut");
  for (const p of projects) {
    paths.push(`/work/${p.slug}`);
    for (const c of p.categories ?? []) {
      paths.push(`/work/${p.slug}/${c.slug}`);
      for (const s of c.shoots) paths.push(`/work/${p.slug}/${c.slug}/${s.slug}`);
    }
  }
  for (const g of videoGroups()) if (!g.youtube) paths.push(g.href);
  return [...new Set(paths)].map((p) => ({ url: BASE + p }));
}

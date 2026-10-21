import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/fpv-hub.html", "/api/"] },
    sitemap: "https://aidenurbine.com/sitemap.xml",
  };
}

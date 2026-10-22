import ProductPage from "@/components/shop/ProductPage";
import { FIELD_GRADES_1 as p, inWords } from "@/lib/shop";

const count = inWords(p.looks.length);

export const metadata = {
  title: p.name,
  description: `${count[0].toUpperCase() + count.slice(1)} color grades from my commercial and personal work. Built in DaVinci Resolve for Sony S-Log3. .cube LUTs and a Resolve Power Grade.`,
  openGraph: { title: p.name, images: [{ url: p.art.banner, alt: p.name }] },
  twitter: { card: "summary_large_image", images: [p.art.banner] },
};

export default function Presets() {
  return <ProductPage p={p} />;
}

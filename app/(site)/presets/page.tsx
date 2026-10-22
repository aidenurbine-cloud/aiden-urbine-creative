import ProductPage from "@/components/shop/ProductPage";
import { FIELD_GRADES_1 as p, afterSrc } from "@/lib/shop";

export const metadata = {
  title: p.name,
  description: "Six color grades from my commercial and personal work. Built in DaVinci Resolve for Sony S-Log3. .cube LUTs and .drx Power Grades.",
  openGraph: { title: p.name, images: [{ url: afterSrc(p.heroLook), alt: p.name }] },
  twitter: { card: "summary_large_image", images: [afterSrc(p.heroLook)] },
};

export default function Presets() {
  return <ProductPage p={p} />;
}

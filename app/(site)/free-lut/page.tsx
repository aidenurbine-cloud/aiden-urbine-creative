import FreePage from "@/components/shop/FreePage";
import { FIELD_GRADES_1 as p, afterSrc } from "@/lib/shop";

export const metadata = {
  title: "Free LUT",
  description: "One free look from Field Grades, Volume 1. Built for Sony S-Log3, delivered by email.",
  openGraph: { title: "Free LUT from Field Grades", images: [{ url: afterSrc(p.freeLook), alt: p.name }] },
  twitter: { card: "summary_large_image", images: [afterSrc(p.freeLook)] },
};

export default function FreeLut() {
  return <FreePage p={p} />;
}

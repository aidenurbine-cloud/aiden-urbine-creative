import ProjectGallery from "@/components/ProjectGallery";

export const metadata = {
  title: "Montana Knife Company — Aiden Urbine Creative",
  description: "Montana Knife Company — Product photo and video. Missoula, MT.",
};

const B = "/images/MKC GALLERY/";

export default function MKCPage() {
  return (
    <ProjectGallery
      title="Montana Knife Co"
      tag="Product Photo + Video"
      location="Missoula, MT"
      hero={`${B}MKC GRAND OPENING TURTLEBOX.jpg`}
      images={[
        `${B}MKC GRAND OPENING TURTLEBOX-2.jpg`,
        `${B}MKC GRAND OPENING TURTLEBOX-3.jpg`,
        `${B}MKC GRAND OPENING TURTLEBOX-4.jpg`,
        `${B}MKC GRAND OPENING TURTLEBOX-5.jpg`,
        `${B}MKC GRAND OPENING TURTLEBOX-6.jpg`,
        `${B}MKC GRAND OPENING TURTLEBOX-7.jpg`,
        `${B}MKC GRAND OPENING TURTLEBOX-8.jpg`,
        `${B}MKC GRAND OPENING TURTLEBOX-9.jpg`,
        `${B}MKC GRAND OPENING TURTLEBOX-10.jpg`,
        `${B}MKC GRAND OPENING TURTLEBOX-11.jpg`,
        `${B}MKC GRAND OPENING TURTLEBOX-12.jpg`,
        `${B}MKC GRAND OPENING TURTLEBOX-13.jpg`,
        `${B}MKC GRAND OPENING TURTLEBOX-14.jpg`,
        `${B}MKC GRAND OPENING TURTLEBOX-15.jpg`,
        `${B}USA HOODIE.jpg`,
      ]}
      next={{ label: "Rough Country", href: "/work/rough-country" }}
    />
  );
}

import ProjectGallery from "@/components/ProjectGallery";

export const metadata = {
  title: "Badfish SUP — Aiden Urbine Creative",
  description: "Badfish SUP — Salida, Colorado. Arkansas River.",
};

const B = "/images/BADFISH GALLERY/";

export default function BadfishPage() {
  return (
    <ProjectGallery
      title="Badfish SUP"
      tag="Photo + Video"
      location="Salida, CO — Arkansas River"
      hero={`${B}badfish flyweight glacier.emh (3 of 12).jpg`}
      images={[
        `${B}badfish flyweight glacier.emh (4 of 12).jpg`,
        `${B}badfish flyweight glacier.emh (10 of 12).jpg`,
        `${B}badfish flyweight glacier.emh (12 of 12).jpg`,
        `${B}badfish flyweight jh.emh (11 of 11).jpg`,
        `${B}badfish reverse coast + chelan.emh (6 of 6).jpg`,
        `${B}lunchcounterreverse.emh (9 of 61).jpg`,
        `${B}lunchcounterreverse.emh (36 of 61).jpg`,
        `${B}lunchcounterreverse.emh (46 of 61).jpg`,
      ]}
      next={{ label: "Montana Knife Co", href: "/work/mkc" }}
    />
  );
}

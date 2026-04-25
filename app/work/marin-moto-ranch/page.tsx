import ProjectGallery from "@/components/ProjectGallery";

export const metadata = {
  title: "Marin Moto Ranch — Aiden Urbine Creative",
  description: "Marin Moto Ranch — Photo and video. Montana.",
};

const B = "/images/MARIN MOTO RANCH GALLERY/";

export default function MarinMotoRanchPage() {
  return (
    <ProjectGallery
      title="Marin Moto Ranch"
      tag="Photo + Video"
      location="Montana"
      hero={`${B}ROUTEEMH-3.jpg`}
      images={[
        `${B}ROUTEEMH-20.jpg`,
        `${B}ROUTEEMH-58.jpg`,
        `${B}ROUTEEMH-61.jpg`,
        `${B}ROUTEEMH-67.jpg`,
      ]}
      next={{ label: "Badfish SUP", href: "/work/badfish" }}
    />
  );
}

import ProjectGallery from "@/components/ProjectGallery";

export const metadata = {
  title: "Personal — Aiden Urbine Creative",
  description: "Personal collection — Montana and beyond.",
};

const B = "/images/PERSONAL GALLERY/";

export default function PersonalPage() {
  return (
    <ProjectGallery
      title="Personal"
      tag="Personal Collection"
      location="Montana & Beyond"
      hero={`${B}hero image.JPG`}
      images={[
        `${B}Full size-01.jpg`,
        `${B}Full size-02.jpg`,
        `${B}honest story.JPG`,
        `${B}nicole senior-13.jpg`,
        `${B}nicole senior-34.jpg`,
        `${B}nicole senior-38.jpg`,
        `${B}not images.jpg`,
        `${B}ocean surf emh-2.jpg`,
        `${B}ocean surf emh-8.jpg`,
        `${B}PERSONAL HOMEPAGE copy.jpg`,
        `${B}R1-06737-0035.JPG`,
        `${B}real light.JPG`,
      ]}
      next={{ label: "Marin Moto Ranch", href: "/work/marin-moto-ranch" }}
    />
  );
}

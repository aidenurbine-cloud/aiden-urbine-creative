import ProjectGallery from "@/components/ProjectGallery";

export const metadata = {
  title: "Rough Country — Aiden Urbine Creative",
  description: "Rough Country — Photo and video. Nationwide.",
};

const B = "/images/ROUGH COUNTRY GALLERY/";

export default function RoughCountryPage() {
  return (
    <ProjectGallery
      title="Rough Country"
      tag="Photo + Video"
      location="Nationwide"
      hero={`${B}AIDEN URBINE X RC.jpg`}
      images={[
        `${B}AIDEN URBINE X RC-2.jpg`,
        `${B}AIDEN URBINE X RC-3.jpg`,
        `${B}AIDEN URBINE X RC-4.jpg`,
        `${B}AIDEN URBINE X RC-5.jpg`,
        `${B}AIDEN URBINE X RC-6.jpg`,
        `${B}AIDEN URBINE X RC-7.jpg`,
        `${B}AIDEN URBINE X RC-8.jpg`,
        `${B}AIDEN URBINE X RC-9.jpg`,
        `${B}AIDEN URBINE X RC-10.jpg`,
        `${B}AIDEN URBINE X RC-11.jpg`,
        `${B}AIDEN URBINE X RC-12.jpg`,
        `${B}AIDEN URBINE X RC-13.jpg`,
        `${B}AIDEN URBINE X RC-14.jpg`,
        `${B}AIDEN URBINE X RC-15.jpg`,
        `${B}AIDEN URBINE X RC-16.jpg`,
        `${B}AIDEN URBINE X RC-17.jpg`,
        `${B}AIDEN URBINE X RC-18.jpg`,
        `${B}AIDENURBINE_TRUCK_APRIL SNOW.jpg`,
        `${B}AIDENURBINE_TRUCK_APRIL SNOW-2.jpg`,
        `${B}AIDENURBINE_TRUCK_APRIL SNOW-3.jpg`,
        `${B}AIDENURBINE_TRUCK_APRIL SNOW-4.jpg`,
        `${B}AIDENURBINE_TRUCK_APRIL SNOW-5.jpg`,
        `${B}AIDENURBINE_TRUCK_APRIL SNOW-6.jpg`,
        `${B}AIDENURBINE_TRUCK_APRIL SNOW-7.jpg`,
        `${B}AIDENURBINE_TRUCK_APRIL SNOW-8.jpg`,
        `${B}AIDENURBINE_TRUCK_APRIL SNOW-9.jpg`,
        `${B}HEADSHOT.jpg`,
        `${B}SUNRISE.jpg`,
      ]}
      next={{ label: "Personal", href: "/work/personal" }}
    />
  );
}

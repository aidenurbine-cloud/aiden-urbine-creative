import CVProgress from "@/components/cv/CVProgress";
import CVNav from "@/components/cv/CVNav";
import CVHero from "@/components/cv/CVHero";
import CVManifesto from "@/components/cv/CVManifesto";
import CVExperience from "@/components/cv/CVExperience";
import CVSkills from "@/components/cv/CVSkills";
import CVMarquee from "@/components/cv/CVMarquee";
import CVBackground from "@/components/cv/CVBackground";
import CVContact from "@/components/cv/CVContact";

export const metadata = {
  title: "CV — Aiden Urbine Creative",
  description:
    "Curriculum Vitae — Creative Director, Photo & Video. Missoula, Montana.",
};

export default function CVPage() {
  return (
    <>
      <CVProgress />
      <CVNav />
      <CVHero />
      <CVManifesto />
      <CVExperience />
      <CVSkills />
      <CVMarquee />
      <CVBackground />
      <CVContact />
    </>
  );
}

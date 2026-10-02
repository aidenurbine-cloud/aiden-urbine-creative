import Link from "next/link";
import Photo from "@/components/Photo";
import { prints, portrait, EMAIL } from "@/lib/projects";

export const metadata = {
  title: "About",
  description: "Photographer and videographer based out of Missoula, MT.",
};

export default function About() {
  return (
    <article className="about">
      <div className="about-top">
        <figure className="about-portrait">
          <Photo photo={portrait} alt="Aiden Urbine standing in front of his truck" sizes="(min-width: 900px) 26vw, 70vw" priority />
        </figure>

        <div className="about-text">
          <h1 className="page-title">Hey, I&apos;m Aiden.</h1>
          <p>
            I am a photographer and videographer based out of Missoula, MT, but I call the entire West my home. I was
            raised on the Arkansas River in Buena Vista, CO, where I learned how to capture content and seek adventure.
            The outdoor lifestyle has always aligned with my work, whether it&apos;s chasing whitewater, skiing new lines,
            elk camp, or just following the next dirt road.
          </p>
          <p>
            I&apos;ve spent the last three years in Missoula, MT as a full time content creator for Montana Knife
            Company, as well as a freelance creative working for brands like Rough Country, LaCrosse Footwear,
            Turtlebox Audio, and more.
          </p>
          <p>
            Got a project? <a href={`mailto:${EMAIL}`}>{EMAIL}</a> or <Link href="/contact">send a note</Link>.
          </p>
        </div>
      </div>

      <h2 className="caps prints-title">From the camera roll</h2>
      <div className="prints">
        {prints.map((p) => (
          <figure key={p.src} className="roll">
            <Photo photo={p} alt={p.note} sizes="(min-width: 900px) 20vw, 42vw" />
          </figure>
        ))}
      </div>
    </article>
  );
}

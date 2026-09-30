import Link from "next/link";
import Photo from "@/components/Photo";
import { prints, portrait, EMAIL } from "@/lib/projects";

export const metadata = {
  title: "About",
  description: "Photographer and creative director based in Missoula, Montana.",
};

export default function About() {
  return (
    <article className="about">
      <div className="about-top">
        <figure className="about-portrait">
          <Photo photo={portrait} alt="Aiden Urbine standing in front of his truck" sizes="(min-width: 900px) 26vw, 70vw" priority />
        </figure>

        <div className="about-text">
          <h1 className="page-title">Hey, I&apos;m Aiden</h1>
          <p>
            I&apos;m a photographer and creative director based in Missoula, Montana. I was raised on the Arkansas River
            in Buena Vista, Colorado, and the outdoor life still drives the work: whitewater, dirt roads, elk camps, and
            the brands that live out there.
          </p>
          <p>
            Two years and counting behind the content for Montana Knife Co., plus Badfish, Rough Country, Marin Moto
            Ranch and more. Photo and video, start to finish.
          </p>
          <blockquote className="quote">
            The good frames don&apos;t come easy. They show up cold, early, and a long way from the truck.
          </blockquote>
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

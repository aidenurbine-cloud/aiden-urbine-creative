import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "@/components/PrintButton";
import { EMAIL, INSTAGRAM } from "@/lib/projects";

// not in the nav or sitemap. it's a link I hand out when someone asks for a resume.
export const metadata: Metadata = {
  title: "CV",
  description: "Photographer and videographer based in Missoula, Montana.",
  robots: { index: false },
};

// everything on the page lives here. top to bottom, newest first.
const EXPERIENCE: { when: string; role: string; org: string; where: string; href?: string; points: string[] }[] = [
  {
    when: "2023 to now",
    role: "Content creator, marketing",
    org: "Montana Knife Company",
    where: "Missoula, MT",
    href: "/work/mkc",
    points: [
      "Started in production as a Knife Tech, sharpening, blasting and parkerizing, and tightened up those workflows to raise output without giving up quality.",
      "Moved to the marketing team. I shoot and edit photo and video for the brand, cut in DaVinci Resolve and Premiere Pro.",
      "Grew TikTok from 10k to 101k followers on organic content.",
      "Shot the weekly YouTube vlogs that took the channel from 30k to 75k subscribers.",
      "Helped manage 30+ paid ambassadors and 30+ brand campaigns, including PR packages and a gift program for fans.",
      "Grew the email list by 100k+ through partner giveaways and donated 100+ knives to good causes.",
      "Repped MKC at trade shows.",
    ],
  },
  {
    when: "Ongoing",
    role: "Photo and video",
    org: "Freelance",
    where: "The West",
    points: [
      "Brand ambassador and content for Rough Country.",
      "Full launch content package for Marin Moto Ranch, a startup out of Marin County.",
      "Product photo for Badfish SUP's river surf and SUP line on the Arkansas River.",
      "Work for Immersion Research, LaCrosse Footwear, Turtlebox Audio and more.",
    ],
  },
  {
    when: "2022",
    role: "Operations and content",
    org: "Simple Campers",
    where: "San Francisco Bay Area",
    points: [
      "Helped turn a client's camper van rental idea into a working business and built out the backend for a fleet of 20+ high end vans.",
      "Kept turnaround under 24 hours on cleaning and service, and ran partner and dealer tracking for repairs, sales and service.",
      "Ran community events with brands like Equator Coffee and Prooflab Surf Shop.",
      "Shot all the listing and rental photo and video for the fleet.",
    ],
  },
  {
    when: "High school",
    role: "Founder",
    org: "Elevated Media House",
    where: "Buena Vista, CO",
    points: [
      "Started a media business building local brands from the ground up: identity, social, web and media packages.",
      "Wrote and ran production and photo contracts for each client.",
      "Shot community and charity events around Buena Vista.",
    ],
  },
  {
    when: "Teens",
    role: "River photographer",
    org: "Family rafting business",
    where: "Arkansas River, CO",
    points: ["Photographed whitewater rafting trips every summer. Thousands of people, one river. Where I learned to shoot."],
  },
];

const SKILLS: { group: string; items: string }[] = [
  { group: "Video", items: "DaVinci Resolve (edit and color), Premiere Pro, After Effects" },
  { group: "Photo", items: "Lightroom, Photoshop, Illustrator" },
  { group: "Marketing", items: "Organic social (TikTok, YouTube, Instagram), ambassador programs, brand campaigns, email growth, Shopify and ecom" },
  { group: "Also", items: "I built and sell my own LUT pack, Field Grades." },
];

export default function CV() {
  return (
    <article className="cv">
      <header className="cv-head">
        <div>
          <h1 className="page-title">Aiden Urbine</h1>
          <p className="cv-sub">Photographer and videographer. Missoula, Montana.</p>
          <p className="cv-contact">
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <a href="https://aidenurbine.com">aidenurbine.com</a>
            <a href={`https://instagram.com/${INSTAGRAM}`}>@{INSTAGRAM}</a>
          </p>
        </div>
        <PrintButton>Save as PDF</PrintButton>
      </header>

      <p className="cv-intro">
        Raised on the Arkansas River in Buena Vista, CO, by a dad who built a life in whitewater as a kayaker and a
        photographer. I&apos;ve been shooting since I was a kid. Now I make photo and video for outdoor, lifestyle and gear
        brands, mostly full time for Montana Knife Company and freelance for everyone else.
      </p>

      <section className="cv-sec">
        <h2 className="shop-h">Experience</h2>
        {EXPERIENCE.map((e) => (
          <div key={e.org} className="cv-row">
            <p className="cv-when">{e.when}</p>
            <div>
              <h3 className="cv-role">
                {e.href ? <Link href={e.href}>{e.org}</Link> : e.org}
                <span>{e.role}, {e.where}</span>
              </h3>
              <ul className="cv-points">
                {e.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </section>

      <section className="cv-sec">
        <h2 className="shop-h">Skills</h2>
        {SKILLS.map((s) => (
          <div key={s.group} className="cv-row">
            <p className="cv-when">{s.group}</p>
            <p className="cv-skill">{s.items}</p>
          </div>
        ))}
      </section>

      <section className="cv-sec">
        <h2 className="shop-h">Outside of work</h2>
        <p className="cv-skill">Whitewater kayaking, river surfing, skiing, hunting and following dirt roads.</p>
      </section>
    </article>
  );
}

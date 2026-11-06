import type { Metadata } from "next";
import Image from "next/image";
import ReelRow from "@/components/gfc/ReelRow";
import { EMAIL, INSTAGRAM } from "@/lib/projects";

// pitch for Graeme at Go Fast Campers. not in the nav, footer or sitemap, and noindex.
export const metadata: Metadata = {
  title: "The 200K Mile Home x Go Fast Campers",
  description: "A pitch for Go Fast Campers.",
  robots: { index: false, follow: false },
};

// every number on the page. update here.
const STATS = {
  // reelLength: fill in once you check it, e.g. "62 sec". empty just says "average watch".
  coldStart: { views: "126K", reached: "81K", comments: "619", avgWatch: "39.6s", reelLength: "", nonFollowers: "98.5%" },
  series: { episodes: 5, views: "188K", since: "Oct 22" },
  followers: "6.5K",
  gainedThisYear: "+5,700",
};

// instagram links. first one is the cold start.
const REELS = [
  { url: "https://www.instagram.com/p/DfXKGQNO5r7/", label: "Cold start" },
  { url: "https://www.instagram.com/p/DfOXByMutmQ/", label: "Vlog style reel" },
  { url: "https://www.instagram.com/p/DfSU0V_uDFa/", label: "Diesel heater" },
  { url: "https://www.instagram.com/p/DaiepsMOKjm/", label: "Lifestyle surf reel" },
];

// photos live in public/gfc/
const HERO = "/gfc/aiden-urbine-truck-25.jpg";
const ASK_BG = "/gfc/at-the-rock-105.jpg";
const PHOTOS = [
  "at-the-rock-104.jpg",
  "aiden-urbine-truck-4.jpg",
  "aiden-urbine-truck-12.jpg",
  "at-the-rock-106.jpg",
  "aiden-urbine-f250-38.jpg",
  "at-the-rock-102.jpg",
].map((f) => "/gfc/" + f);

// long-form episode ideas, in order. the first SHOWN are always visible, the rest open with a tap.
const EPISODES: [string, string][] = [
  ["Why I'm switching from FWC to GFC", "Putting both rigs side by side and talking through why I'm making the move."],
  ["Sleeping in -20 in Montana", "Waiting for the coldest night of the winter and seeing how the rig and the diesel heater hold up."],
  ["Why I live out of my truck", "What this life actually looks like day to day, and how I keep wet gear and a dry bed in the same truck."],
  ["Chasing the biggest pow day of the year", "Following the storm, sleeping at the trailhead, then pulling the sled out and going deep with the crew when it clears."],
  ["Full rig tour", "A tour of the whole setup. Old truck, new camper, and how I fit my whole life in it."],
  ["Stealth camping in town", "Seeing how long I can live around Missoula without anyone noticing."],
  ["Movie night in my 200K Mile Home", "Snowing outside, a movie on, and the camper turned into a little theater."],
  ["Snowed in", "Getting hammered by a storm and riding it out in the truck."],
  ["Can solar keep up in a Montana winter?", "Short days, gray skies, heater running all night. Let's see if the power makes it."],
  ["Winter kayak mission", "Loading boats on the truck and chasing a cold, snowy river with the crew."],
  ["First day of the year at the trailhead", "Ringing in the new year camped at the trailhead and skiing first thing January 1st."],
  ["The worst road in Montana", "Taking the rig down the sketchiest snowy road I know just to see where it goes."],
  ["Winter surf trip", "Driving from Montana to the coast to surf freezing water. Same truck, totally different trip."],
  ["What I'd change", "A few months in. What I love, what I'd do differently, no sugarcoating."],
  ["One year later", "Looking back at a full year living in it and being honest about all of it."],
];
const SHOWN = 4;

function Episode({ ep: [title, line] }: { ep: [string, string] }) {
  return (
    <li>
      <b>{title}</b>
      <span>{line}</span>
    </li>
  );
}

const PARTNERS = ["Rough Country", "Starbatt", "Pakmule"];

const embedUrl = (url: string) => url.replace(/[?#].*$/, "").replace(/\/?$/, "/") + "embed";

function Reel({ url, label }: { url: string; label: string }) {
  return (
    <div className="gx-reel glass">
      <iframe src={embedUrl(url)} title={label} loading="lazy" allowFullScreen />
    </div>
  );
}

export default function GFC() {
  const s = STATS;
  const big: [string, string][] = [
    [s.coldStart.views, "views on the cold start"],
    [s.coldStart.reached, "accounts reached"],
    [s.coldStart.comments, "comments"],
    [s.coldStart.avgWatch, s.coldStart.reelLength ? `average watch on a ${s.coldStart.reelLength} reel` : "average watch"],
    [s.series.views, `views on the first ${s.series.episodes} episodes`],
    [s.gainedThisYear, "followers this year"],
  ];

  return (
    <main className="gx">
      <section className="gx-hero">
        <Image src={HERO} alt="Aiden's F250 on a gravel bar" fill priority sizes="100vw" className="gx-bg" />
        <div className="gx-hero-in">
          <p className="gx-sig">Aiden Urbine</p>
          <h1 className="gx-title">The 200K Mile Home</h1>
          <p className="gx-lede">
            I live full time in a 2000 F250. 7.3 Powerstroke, 200K miles, 8 ft bed, based out of Missoula, Montana.
          </p>
          <div className="gx-quick glass">
            <div>
              <b>{s.coldStart.views}</b>
              <span>views on one reel</span>
            </div>
            <div>
              <b>{s.coldStart.nonFollowers}</b>
              <span>non-followers</span>
            </div>
            <div>
              <b>{s.gainedThisYear}</b>
              <span>followers this year</span>
            </div>
          </div>
        </div>
      </section>

      <section className="gx-sec">
        <p className="gx-label">The numbers</p>
        <p className="gx-body">{`Filming it as a series since ${s.series.since}. All on a ${s.followers} follower account.`}</p>
        <div className="gx-nums">
          {big.map(([n, label]) => (
            <div key={label}>
              <b>{n}</b>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="gx-sec">
        <p className="gx-label">The cold start</p>
        <Reel {...REELS[0]} />
      </section>

      <section className="gx-sec">
        <p className="gx-label">The series</p>
        <p className="gx-body">
          It&apos;s just my life right now. Hunting out of the truck, packing out, cold mornings, fill-ups. I&apos;m not making
          any of it up for the camera, and I think that&apos;s why people stick around.
        </p>
        <ReelRow reels={REELS.slice(1)} />
      </section>

      <section className="gx-ask">
        <Image src={ASK_BG} alt="" fill sizes="100vw" className="gx-bg" />
        <div className="gx-ask-card glass">
          <p className="gx-ask-h">The truck needs a real camper, and I want it to be a GFC.</p>
          <p>
            Put one on and it&apos;s the star of the next chapter. Short episodes living in it, a long-form install, and
            photo sets of the whole setup out where it belongs.
          </p>
        </div>
      </section>

      <section className="gx-sec">
        <p className="gx-label">Long-form ideas</p>
        <ul className="gx-eps">
          {EPISODES.slice(0, SHOWN).map((ep) => (
            <Episode key={ep[0]} ep={ep} />
          ))}
        </ul>
        <details className="gx-more">
          <summary>
            <span className="is-closed">See the whole list</span>
            <span className="is-open">Show less</span>
          </summary>
          <ul className="gx-eps">
            {EPISODES.slice(SHOWN).map((ep) => (
              <Episode key={ep[0]} ep={ep} />
            ))}
          </ul>
        </details>
      </section>

      <section className="gx-sec">
        <div className="gx-photos">
          {PHOTOS.map((src) => (
            <div key={src} className="gx-photo">
              <Image src={src} alt="Aiden's F250" fill sizes="(min-width: 800px) 250px, 50vw" />
            </div>
          ))}
        </div>
      </section>

      <section className="gx-sec gx-end">
        <p className="gx-body">
          Currently working with {PARTNERS.slice(0, -1).join(", ")} and {PARTNERS[PARTNERS.length - 1]}.
        </p>
        <p className="gx-contact">
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <a href={`https://instagram.com/${INSTAGRAM}`}>@{INSTAGRAM}</a>
        </p>
      </section>
    </main>
  );
}

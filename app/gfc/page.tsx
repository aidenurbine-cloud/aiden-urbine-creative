import type { Metadata } from "next";
import PitchPage from "@/components/pitch/PitchPage";
import { COLD_START, STATS } from "@/lib/pitch";

// pitch for Graeme at Go Fast Campers. not in the nav, footer or sitemap, and noindex.
export const metadata: Metadata = {
  title: "The 200K Mile Home x Go Fast Campers",
  description: "A pitch for Go Fast Campers.",
  robots: { index: false, follow: false },
};

// photos live in public/gfc/. sizes are all 1400x2100 from the import.
const ph = (f: string, c: string) => ({ src: `/gfc/${f}.jpg`, w: 1400, h: 2100, c, alt: "Aiden's F250" });

const s = STATS;

// long-form episode ideas, in order. the first few are always visible, the rest open with a tap.
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

export default function GFC() {
  return (
    <PitchPage
      p={{
        brand: "Go Fast Campers",
        hero: { src: "/gfc/aiden-urbine-truck-25.jpg", alt: "Aiden's F250 on a gravel bar", pos: "50% 58%" },
        lede: "I live full time in a 2000 F250 with 200K miles on it, based out of Missoula, Montana, and I film all of it.",
        numbers: [
          [s.gained30, "followers in the last 30 days"],
          [s.series.views, `views across the ${s.series.episodes} truck episodes`],
          [s.coldStart.views, "views on the cold start"],
          [s.coldStart.comments, "comments on it"],
          [s.nonFollowers, "of views from non-followers"],
        ],
        workNote:
          "It's just my life right now. Hunting out of the truck, packing out, cold mornings, fill-ups. I'm not making any of it up for the camera, and I think that's why people stick around.",
        reels: [
          COLD_START,
          { url: "https://www.instagram.com/p/DfOXByMutmQ/", label: "Vlog style reel" },
          { url: "https://www.instagram.com/p/DfSU0V_uDFa/", label: "Diesel heater" },
          { url: "https://www.instagram.com/p/DaiepsMOKjm/", label: "Lifestyle surf reel" },
        ],
        photosMid: [ph("at-the-rock-104", "#aca69c"), ph("aiden-urbine-truck-4", "#4b463c")],
        ask: {
          heading: "The truck needs a real camper, and I want it to be a GFC.",
          body: "Let's put one on and make it the star of the next chapter. Short episodes living in it, a long-form install, and photo sets of the whole setup out where it belongs.",
        },
        ideas: { rows: EPISODES, shown: 4 },
        photos: [
          ph("aiden-urbine-truck-12", "#343024"),
          ph("at-the-rock-106", "#99968f"),
          ph("aiden-urbine-f250-38", "#9e9c94"),
          ph("at-the-rock-102", "#81776b"),
        ],
        note: "Currently working with Rough Country, Starbatt and Pakmule.",
      }}
    />
  );
}

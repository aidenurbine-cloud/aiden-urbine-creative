import type { Metadata } from "next";
import PitchPage from "@/components/pitch/PitchPage";
import { getProject } from "@/lib/projects";
import { COLD_START, STATS } from "@/lib/pitch";

// pitch for Rough Country. not in the nav, footer or sitemap, and noindex.
export const metadata: Metadata = {
  title: "The 200K Mile Home x Rough Country",
  description: "A partnership pitch for Rough Country.",
  robots: { index: false, follow: false },
};

// photos come from the Rough Country gallery in lib/projects.ts
const RC = getProject("rough-country")!.images;
const pick = (names: string[]) =>
  names.map((n) => ({ ...RC.find((p) => p.src.endsWith(n))!, alt: "Aiden's F250" }));

const s = STATS;

export default function RoughCountry() {
  return (
    <PitchPage
      p={{
        brand: "Rough Country",
        hero: { src: pick(["F250-29.jpg"])[0].src, alt: "Aiden's F250 with the lights on", pos: "50% 62%" },
        lede: "I live full time in a 2000 F250 with 200K miles on it, based out of Missoula, Montana, and I film all of it.",
        numbers: [
          [s.gained30, "followers in the last 30 days"],
          [s.truckReels.views, `views across my last ${s.truckReels.count} truck reels`],
          [s.bestTrial, "views on my best trial reel"],
          [s.coldStart.views, "views on the cold start"],
          [s.nonFollowers, "of views from non-followers"],
        ],
        workNote: "The second reel is the ad I already shot for you.",
        reels: [
          COLD_START,
          { url: "https://www.instagram.com/p/DaVNyxxjE0x/", label: "The ad I shot for Rough Country" },
          { url: "https://www.instagram.com/reel/DfdzPCGOjRr/", label: "About me" },
          { url: "https://www.instagram.com/p/DfOXByMutmQ/", label: "Hike out" },
          { url: "https://www.instagram.com/p/DeurvsTEqEn/", label: "Photo set" },
        ],
        photosMid: pick(["/9.jpg", "ROCK-104.jpg"]),
        deal: {
          rate: "$500",
          rows: [
            ["1 long-form episode", "A full episode of The 200K Mile Home every month."],
            ["2 shorts on my feed", "Reels from the truck, posted on my Instagram."],
            ["1 trial reel", "Posted as an Instagram trial reel, so it goes out to people who don't follow me yet."],
            ["1 photo set", "30 to 100 photos of the truck and the parts out where they get used."],
            ["Rough Country parts on the truck", "Installed, run hard and shown in the content."],
          ],
        },
        terms: [
          ["Quarterly", "First term runs December 2026 to February 2027."],
          ["Renews every 3 months", "Before each renewal we look at follower and view growth and review the rate and deliverables together."],
          ["Organic usage included", "Repost, share and use the content on your own channels. Paid ads are a separate conversation."],
          ["Invoiced on the 1st", "One invoice at the start of every month."],
          ["Monthly recap", "Views, reach and what worked, sent at the end of every month."],
        ],
        photos: pick(["/11.jpg", "/2-102.jpg", "/10.jpg", "/14.jpg", "/6.jpg", "ROCK-105.jpg"]),
        next: ["Agree on the deal.", "Figure out the first short-form content together."],
      }}
    />
  );
}

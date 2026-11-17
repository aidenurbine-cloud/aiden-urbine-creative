// numbers shared by every pitch page (/gfc, /roughcountry).
// update here and every pitch picks it up.

export const STATS = {
  followers: "15K",
  gained30: "+5,500", // new followers in the last 30 days
  nonFollowers: "98%",
  coldStart: { views: "215K", comments: "878" },
  truckReels: { views: "1.15M", count: 20 }, // lifetime views across the last 20 truck reels
  bestTrial: "287K", // best trial reel so far ("my truck is comfier than your house")
  series: { episodes: 16, views: "1.07M" },
}

// instagram reels. the first one on a pitch is always the cold start.
export const COLD_START = { url: "https://www.instagram.com/p/DfXKGQNO5r7/", label: "The cold start" };

// live follower count from the instagram api.
// needs IG_ACCESS_TOKEN in .env.local (and in vercel for production): a long-lived token
// for the @urbineaiden professional account, from a meta app with instagram_business_basic.
// cached for 6 hours. if the token is missing or expired the pages quietly fall back to
// STATS.followers above, so a dead token never breaks a pitch mid-meeting.
export async function liveFollowers(): Promise<string | null> {
  const token = process.env.IG_ACCESS_TOKEN;
  if (!token) return null;
  try {
    const r = await fetch(
      `https://graph.instagram.com/v23.0/me?fields=followers_count&access_token=${token}`,
      { next: { revalidate: 21600 } },
    );
    if (!r.ok) return null;
    const j = (await r.json()) as { followers_count?: number };
    return typeof j.followers_count === "number" ? j.followers_count.toLocaleString("en-US") : null;
  } catch {
    return null;
  }
}

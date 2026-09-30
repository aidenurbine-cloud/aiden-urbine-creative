// All site content lives here. Photo order = the order it shows on the page.
// w/h are the real pixel sizes so layouts keep each photo's true shape (no cropping).

/** c = average color, shown while the photo loads */
export type Photo = { src: string; w: number; h: number; c: string };

export type Project = {
  slug: string;
  name: string;
  client: string;
  tag: string;
  location: string;
  desc: string;
  /** 3 frames used for the spread on the home page */
  feature: Photo[];
  images: Photo[];
};

export const projects: Project[] = [
  {
    slug: "mkc",
    name: "Montana Knife Co.",
    client: "Montana Knife Co.",
    tag: "Photo + Video",
    location: "Missoula, MT",
    desc: "Two years and counting as a content creator for one of the fastest growing brands in the outdoor industry. Thousands of pieces of content and still going.",
    feature: [
      { src: "/images/mkc-gallery/18.jpg", w: 2000, h: 3000, c: "#313533" },
      { src: "/images/mkc-gallery/22.jpg", w: 2000, h: 3000, c: "#887e7b" },
      { src: "/images/mkc-gallery/26.jpg", w: 3000, h: 2001, c: "#352c16" },
    ],
    images: [
      { src: "/images/mkc-gallery/6.jpg", w: 2000, h: 3000, c: "#352413" },
      { src: "/images/mkc-gallery/13.jpg", w: 2000, h: 3000, c: "#5f605d" },
      { src: "/images/mkc-gallery/22.jpg", w: 2000, h: 3000, c: "#887e7b" },
      { src: "/images/mkc-gallery/4.jpg", w: 2000, h: 3000, c: "#5a3d34" },
      { src: "/images/mkc-gallery/18.jpg", w: 2000, h: 3000, c: "#313533" },
      { src: "/images/mkc-gallery/9.jpg", w: 2000, h: 3000, c: "#4a3d2f" },
      { src: "/images/mkc-gallery/1.jpg", w: 3000, h: 3000, c: "#d7d7d7" },
      { src: "/images/mkc-gallery/25.jpg", w: 3000, h: 2001, c: "#382d19" },
      { src: "/images/mkc-gallery/11.jpg", w: 3000, h: 2000, c: "#39322b" },
      { src: "/images/mkc-gallery/16.jpg", w: 3000, h: 2000, c: "#3d453f" },
      { src: "/images/mkc-gallery/3.jpg", w: 3000, h: 3000, c: "#8c8b8a" },
      { src: "/images/mkc-gallery/20.jpg", w: 2000, h: 3000, c: "#ab9b90" },
      { src: "/images/mkc-gallery/7.jpg", w: 2000, h: 3000, c: "#38342e" },
      { src: "/images/mkc-gallery/14.jpg", w: 3000, h: 3000, c: "#ededed" },
      { src: "/images/mkc-gallery/26.jpg", w: 3000, h: 2001, c: "#352c16" },
      { src: "/images/mkc-gallery/2.jpg", w: 3000, h: 3000, c: "#696969" },
      { src: "/images/mkc-gallery/19.jpg", w: 2000, h: 3000, c: "#9d8e87" },
      { src: "/images/mkc-gallery/8.jpg", w: 2000, h: 3000, c: "#4a3d2f" },
      { src: "/images/mkc-gallery/23.jpg", w: 2000, h: 3000, c: "#705b50" },
      { src: "/images/mkc-gallery/5.jpg", w: 2000, h: 3000, c: "#655a4f" },
      { src: "/images/mkc-gallery/12.jpg", w: 2000, h: 3000, c: "#6b4b43" },
      { src: "/images/mkc-gallery/17.jpg", w: 2000, h: 3000, c: "#605a52" },
      { src: "/images/mkc-gallery/10.jpg", w: 2000, h: 3000, c: "#635244" },
      { src: "/images/mkc-gallery/24.jpg", w: 2000, h: 3000, c: "#bab0ab" },
      { src: "/images/mkc-gallery/15.jpg", w: 3000, h: 3000, c: "#b4b4b4" },
      { src: "/images/mkc-gallery/21.jpg", w: 2000, h: 3000, c: "#8b7a72" },
    ],
  },
  {
    slug: "rough-country",
    name: "Rough Country",
    client: "Rough Country",
    tag: "Photo + Video",
    location: "Nationwide",
    desc: "Current brand ambassador. My truck is my homebase, so shooting for one of the staples of the auto industry just makes sense.",
    feature: [
      { src: "/images/rough-country-gallery/9.jpg", w: 2000, h: 3000, c: "#5b5148" },
      { src: "/images/rough-country-gallery/AIDEN%20URBINE%20F250-29.jpg", w: 2000, h: 3000, c: "#605e56" },
      { src: "/images/rough-country-gallery/11.jpg", w: 2000, h: 3000, c: "#2f2f2d" },
    ],
    images: [
      { src: "/images/rough-country-gallery/9.jpg", w: 2000, h: 3000, c: "#5b5148" },
      { src: "/images/rough-country-gallery/AIDEN%20URBINE%20F250-29.jpg", w: 2000, h: 3000, c: "#605e56" },
      { src: "/images/rough-country-gallery/11.jpg", w: 2000, h: 3000, c: "#2f2f2d" },
      { src: "/images/rough-country-gallery/AIDEN%20URBINE%20F250-6.jpg", w: 2000, h: 3000, c: "#5d5a54" },
      { src: "/images/rough-country-gallery/2-102.jpg", w: 2000, h: 3000, c: "#aca69c" },
      { src: "/images/rough-country-gallery/16.jpg", w: 2000, h: 3000, c: "#645348" },
      { src: "/images/rough-country-gallery/3.jpg", w: 2000, h: 3000, c: "#121110" },
      { src: "/images/rough-country-gallery/AT%20THE%20ROCK-105.jpg", w: 2000, h: 3000, c: "#919089" },
      { src: "/images/rough-country-gallery/AIDEN%20URBINE%20F250-38.jpg", w: 2000, h: 3000, c: "#9d9c93" },
      { src: "/images/rough-country-gallery/1.jpg", w: 2000, h: 3000, c: "#605c5a" },
      { src: "/images/rough-country-gallery/10.jpg", w: 2000, h: 3000, c: "#7a7875" },
      { src: "/images/rough-country-gallery/AT%20THE%20ROCK-102.jpg", w: 2000, h: 3000, c: "#83796d" },
      { src: "/images/rough-country-gallery/12.jpg", w: 2000, h: 3000, c: "#766356" },
      { src: "/images/rough-country-gallery/8.jpg", w: 2000, h: 3000, c: "#5e5650" },
      { src: "/images/rough-country-gallery/5.jpg", w: 2000, h: 3000, c: "#141415" },
      { src: "/images/rough-country-gallery/AT%20THE%20ROCK-104.jpg", w: 2000, h: 3000, c: "#aca69c" },
      { src: "/images/rough-country-gallery/13.jpg", w: 2000, h: 3000, c: "#5d4c3d" },
      { src: "/images/rough-country-gallery/2.jpg", w: 2000, h: 3000, c: "#383633" },
      { src: "/images/rough-country-gallery/14.jpg", w: 2000, h: 3000, c: "#3b2d20" },
      { src: "/images/rough-country-gallery/4.jpg", w: 2000, h: 3000, c: "#4d5354" },
      { src: "/images/rough-country-gallery/15.jpg", w: 2000, h: 3000, c: "#5e4c3e" },
      { src: "/images/rough-country-gallery/6.jpg", w: 2000, h: 3000, c: "#6d7374" },
      { src: "/images/rough-country-gallery/7.jpg", w: 2000, h: 3000, c: "#5a5a58" },
      { src: "/images/rough-country-gallery/AT%20THE%20ROCK-106.jpg", w: 2000, h: 3000, c: "#99968f" },
    ],
  },
  {
    slug: "badfish",
    name: "Badfish SUP",
    client: "Badfish SUP",
    tag: "Photo",
    location: "Salida, CO",
    desc: "Photographed the Salida-based brand's growing river surf and SUP collection on the Arkansas River. Shot where it lives.",
    feature: [
      { src: "/images/badfish-gallery/lunchcounterreverse.emh%20%2836%20of%2061%29.jpg", w: 3000, h: 2002, c: "#4f5547" },
      { src: "/images/badfish-gallery/badfish%20flyweight%20jh.emh%20%2811%20of%2011%29.jpg", w: 2002, h: 3000, c: "#7e8d8f" },
      { src: "/images/badfish-gallery/badfish%20reverse%20coast%20%2B%20chelan.emh%20%286%20of%206%29.jpg", w: 3000, h: 2002, c: "#d0c0b5" },
    ],
    images: [
      { src: "/images/badfish-gallery/badfish%20flyweight%20glacier.emh%20%2810%20of%2012%29.jpg", w: 3000, h: 2002, c: "#c0b9b2" },
      { src: "/images/badfish-gallery/lunchcounterreverse.emh%20%2836%20of%2061%29.jpg", w: 3000, h: 2002, c: "#4f5547" },
      { src: "/images/badfish-gallery/badfish%20flyweight%20jh.emh%20%2811%20of%2011%29.jpg", w: 2002, h: 3000, c: "#7e8d8f" },
      { src: "/images/badfish-gallery/badfish%20flyweight%20glacier.emh%20%2812%20of%2012%29.jpg", w: 3000, h: 2002, c: "#908b86" },
      { src: "/images/badfish-gallery/lunchcounterreverse.emh%20%2846%20of%2061%29.jpg", w: 3000, h: 2002, c: "#4b5754" },
      { src: "/images/badfish-gallery/badfish%20reverse%20coast%20%2B%20chelan.emh%20%286%20of%206%29.jpg", w: 3000, h: 2002, c: "#d0c0b5" },
      { src: "/images/badfish-gallery/badfish%20flyweight%20glacier.emh%20%283%20of%2012%29.jpg", w: 3000, h: 2002, c: "#878688" },
      { src: "/images/badfish-gallery/lunchcounterreverse.emh%20%289%20of%2061%29.jpg", w: 3000, h: 2002, c: "#778176" },
      { src: "/images/badfish-gallery/badfish%20flyweight%20glacier.emh%20%284%20of%2012%29.jpg", w: 3000, h: 2002, c: "#b3afa8" },
    ],
  },
  {
    slug: "marin-moto-ranch",
    name: "Marin Moto Ranch",
    client: "Marin Moto Ranch",
    tag: "Photo + Video",
    location: "Marin County, CA",
    desc: "Built a full content package for the brand launch of MMR. Lifestyle and brand video for a fast moving startup out of Marin County.",
    feature: [
      { src: "/images/marin-gallery/ROUTEEMH-3.jpg", w: 3000, h: 2001, c: "#959394" },
      { src: "/images/marin-gallery/ROUTEEMH-58.jpg", w: 2001, h: 3000, c: "#9d9d8c" },
      { src: "/images/marin-gallery/ROUTEEMH-67.jpg", w: 2001, h: 3000, c: "#849198" },
    ],
    images: [
      { src: "/images/marin-gallery/ROUTEEMH-3.jpg", w: 3000, h: 2001, c: "#959394" },
      { src: "/images/marin-gallery/ROUTEEMH-58.jpg", w: 2001, h: 3000, c: "#9d9d8c" },
      { src: "/images/marin-gallery/ROUTEEMH-20.jpg", w: 3000, h: 2001, c: "#969a98" },
      { src: "/images/marin-gallery/ROUTEEMH-61.jpg", w: 2001, h: 3000, c: "#aa9f81" },
      { src: "/images/marin-gallery/ROUTEEMH-67.jpg", w: 2001, h: 3000, c: "#849198" },
    ],
  },
  {
    slug: "personal",
    name: "Personal",
    client: "Aiden Urbine",
    tag: "Photo",
    location: "The West",
    desc: "My favorite frames from the past few years. The work I do for myself.",
    feature: [
      { src: "/images/personal-gallery/not%20images.jpg", w: 3000, h: 2000, c: "#595859" },
      { src: "/images/personal-gallery/honest%20story.JPG", w: 3000, h: 2001, c: "#959da1" },
      { src: "/images/personal-gallery/DSC00372.JPG", w: 3000, h: 2000, c: "#a4886f" },
    ],
    images: [
      { src: "/images/personal-gallery/not%20images.jpg", w: 3000, h: 2000, c: "#595859" },
      { src: "/images/personal-gallery/honest%20story.JPG", w: 3000, h: 2001, c: "#959da1" },
      { src: "/images/personal-gallery/DSC00372.JPG", w: 3000, h: 2000, c: "#a4886f" },
      { src: "/images/personal-gallery/garb2022images-4.JPG", w: 2000, h: 3000, c: "#888984" },
      { src: "/images/personal-gallery/FLAG%20NOR%20FAIL%20-%20DAY%201%20-%20EXPORT4-31.JPG", w: 2000, h: 3000, c: "#86837f" },
      { src: "/images/personal-gallery/6195AF7A-117F-4DF7-9017-664EE5CA020A.JPG", w: 1687, h: 3000, c: "#766458" },
      { src: "/images/personal-gallery/Full%20size-01.jpg", w: 2000, h: 3000, c: "#745a52" },
      { src: "/images/personal-gallery/de.JPG", w: 3000, h: 1999, c: "#898964" },
      { src: "/images/personal-gallery/hero.JPG", w: 3000, h: 2000, c: "#72777b" },
      { src: "/images/personal-gallery/IMG_4968.jpg", w: 1386, h: 3000, c: "#767472" },
      { src: "/images/personal-gallery/ocean%20surf%20emh-2.jpg", w: 3000, h: 2000, c: "#7b8787" },
      { src: "/images/personal-gallery/John%20parc-0%202.JPG", w: 2000, h: 3000, c: "#736a63" },
      { src: "/images/personal-gallery/Full%20size-0.JPG", w: 2000, h: 3000, c: "#6c432b" },
      { src: "/images/personal-gallery/AT%20THE%20ROCK-109.jpg", w: 2000, h: 3000, c: "#a7a39c" },
      { src: "/images/personal-gallery/FLAG%20NOR%20FAIL%20-%20DAY%201%20-%20EXPORT4-34.JPG", w: 2000, h: 3000, c: "#9b9791" },
      { src: "/images/personal-gallery/IMG_5092.JPG", w: 2026, h: 3000, c: "#82b2c3" },
      { src: "/images/personal-gallery/winnebago%20hero.JPG", w: 3000, h: 2001, c: "#827d73" },
      { src: "/images/personal-gallery/IMG_0267.JPG", w: 2000, h: 3000, c: "#675d58" },
      { src: "/images/personal-gallery/Full%20size-2.JPG", w: 2001, h: 3000, c: "#605e5c" },
      { src: "/images/personal-gallery/nicole%20senior-13.jpg", w: 2000, h: 3000, c: "#5f5853" },
      { src: "/images/personal-gallery/hero%20image.JPG", w: 3000, h: 2000, c: "#544741" },
      { src: "/images/personal-gallery/FLAG%20NOR%20FAIL%20-%20DAY%201%20-%20EXPORT%203-5.JPG", w: 2000, h: 3000, c: "#90697a" },
      { src: "/images/personal-gallery/AT%20THE%20ROCK-111.jpg", w: 2000, h: 3000, c: "#89867d" },
      { src: "/images/personal-gallery/real%20light.JPG", w: 3000, h: 2024, c: "#857b5d" },
      { src: "/images/personal-gallery/IMG_0265.JPG", w: 2000, h: 3000, c: "#a3a6a6" },
      { src: "/images/personal-gallery/FLAG%20NOR%20FAIL%20-%20DAY%201%20-%20EXPORT%201-13.JPG", w: 2000, h: 3000, c: "#372a22" },
      { src: "/images/personal-gallery/ocean%20surf%20emh-8.jpg", w: 3000, h: 2000, c: "#bea69c" },
      { src: "/images/personal-gallery/R1-06737-0035.JPG", w: 2006, h: 3000, c: "#91928b" },
      { src: "/images/personal-gallery/Full%20size-4.JPG", w: 2000, h: 3000, c: "#5d4338" },
      { src: "/images/personal-gallery/nicole%20senior-34.jpg", w: 3000, h: 2000, c: "#7d6e5c" },
      { src: "/images/personal-gallery/AT%20THE%20ROCK-107.jpg", w: 2000, h: 3000, c: "#9b968a" },
      { src: "/images/personal-gallery/FLAG%20NOR%20FAIL%20-%20DAY%201%20-%20EXPORT%203-28.JPG", w: 2000, h: 3000, c: "#a7a294" },
      { src: "/images/personal-gallery/IMG_0260.JPG", w: 2000, h: 3000, c: "#3f3632" },
      { src: "/images/personal-gallery/John%20parc-0.JPG", w: 2000, h: 3000, c: "#918f8a" },
      { src: "/images/personal-gallery/FLAG%20NOR%20FAIL%20-%20DAY%201%20-%20EXPORT4-28.JPG", w: 2000, h: 3000, c: "#92897f" },
      { src: "/images/personal-gallery/IMG_0268.JPG", w: 2000, h: 3000, c: "#545554" },
      { src: "/images/personal-gallery/AT%20THE%20ROCK-103.jpg", w: 2000, h: 3000, c: "#a69f93" },
      { src: "/images/personal-gallery/FLAG%20NOR%20FAIL%20-%20DAY%201%20-%20EXPORT%203-39.JPG", w: 2000, h: 3000, c: "#949284" },
      { src: "/images/personal-gallery/nicole%20senior-38.jpg", w: 3000, h: 2000, c: "#57483d" },
      { src: "/images/personal-gallery/FLAG%20NOR%20FAIL%20-%20DAY%201%20-%20EXPORT4-42.JPG", w: 2000, h: 3000, c: "#a8a39c" },
      { src: "/images/personal-gallery/FLAG%20NOR%20FAIL%20-%20DAY%201%20-%20EXPORT%203-4.JPG", w: 2000, h: 3000, c: "#afa298" },
      { src: "/images/personal-gallery/FLAG%20NOR%20FAIL%20-%20DAY%201%20-%20EXPORT4-6.JPG", w: 2000, h: 3000, c: "#a8a39b" },
      { src: "/images/personal-gallery/AT%20THE%20ROCK-110.jpg", w: 2000, h: 3000, c: "#898c89" },
      { src: "/images/personal-gallery/sickest%20shit%20ever-1.JPG", w: 2001, h: 3000, c: "#635a55" },
      { src: "/images/personal-gallery/PERSONAL%20HOMEPAGE%20copy.jpg", w: 3000, h: 2000, c: "#839098" },
    ],
  },
];

/** Loose prints on the About spread. `note` is the handwritten caption. */
export const prints: (Photo & { note: string })[] = [
  { src: "/images/CV/hometown.jpg", w: 3000, h: 2001, c: "#605e54", note: "hometown" },
  { src: "/images/CV/aiden%20kayaking.JPG", w: 2000, h: 3000, c: "#4e4a45", note: "me, kayaking" },
  { src: "/images/CV/mexico%20dirtbag%20camp.JPG", w: 2000, h: 3000, c: "#675d58", note: "mexico dirtbag camp" },
  { src: "/images/CV/car%20loaded%20down%20with%20surfboards.JPG", w: 2000, h: 3000, c: "#4e4638", note: "loaded down w/ boards" },
  { src: "/images/CV/Mt%20Whitney%201.JPG", w: 2000, h: 3000, c: "#a0a29c", note: "Mt. Whitney" },
  { src: "/images/CV/half%20dome%20scenic.JPG", w: 2000, h: 3000, c: "#4a4845", note: "Half Dome" },
];

export const portrait: Photo = { src: "/images/aiden-portrait.jpg", w: 2000, h: 3000, c: "#898275" };

export const EMAIL = "aiden@aidenurbine.com";
export const INSTAGRAM = "urbineaiden";

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

// The home page "Favorites" feed: [project slug, file name]. Reorder freely.
const FAVORITES: [string, string][] = [
  ["personal", "not%20images.jpg"],
  ["rough-country", "9.jpg"],
  ["mkc", "18.jpg"],
  ["mkc", "22.jpg"],
  ["badfish", "lunchcounterreverse.emh%20(36%20of%2061).jpg"],
  ["personal", "honest%20story.JPG"],
  ["rough-country", "AIDEN%20URBINE%20F250-29.jpg"],
  ["marin-moto-ranch", "ROUTEEMH-3.jpg"],
  ["personal", "DSC00372.JPG"],
  ["rough-country", "11.jpg"],
  ["badfish", "badfish%20flyweight%20jh.emh%20(11%20of%2011).jpg"],
  ["personal", "garb2022images-4.JPG"],
  ["mkc", "26.jpg"],
  ["personal", "de.JPG"],
  ["mkc", "6.jpg"],
  ["marin-moto-ranch", "ROUTEEMH-58.jpg"],
  ["mkc", "13.jpg"],
  ["personal", "hero.JPG"],
  ["rough-country", "AIDEN%20URBINE%20F250-6.jpg"],
  ["personal", "6195AF7A-117F-4DF7-9017-664EE5CA020A.JPG"],
  ["badfish", "badfish%20reverse%20coast%20%2B%20chelan.emh%20(6%20of%206).jpg"],
  ["personal", "FLAG%20NOR%20FAIL%20-%20DAY%201%20-%20EXPORT4-31.JPG"],
  ["mkc", "9.jpg"],
  ["personal", "IMG_4968.jpg"],
  ["rough-country", "16.jpg"],
  ["personal", "Full%20size-01.jpg"],
  ["badfish", "badfish%20flyweight%20glacier.emh%20(10%20of%2012).jpg"],
  ["mkc", "4.jpg"],
  ["rough-country", "2-102.jpg"],
  ["personal", "ocean%20surf%20emh-2.jpg"],
  ["marin-moto-ranch", "ROUTEEMH-67.jpg"],
  ["personal", "John%20parc-0%202.JPG"],
  ["mkc", "25.jpg"],
  ["rough-country", "AT%20THE%20ROCK-105.jpg"],
  ["personal", "winnebago%20hero.JPG"],
  ["personal", "FLAG%20NOR%20FAIL%20-%20DAY%201%20-%20EXPORT4-34.JPG"],
  ["badfish", "lunchcounterreverse.emh%20(46%20of%2061).jpg"],
  ["personal", "IMG_5092.JPG"],
];

export const favorites = FAVORITES.map(([slug, file]) => {
  const project = getProject(slug)!;
  const photo = project.images.find((p) => decodeURIComponent(p.src).endsWith("/" + decodeURIComponent(file)));
  if (!photo) throw new Error(`Favorite not found: ${slug}/${file}`);
  return { ...photo, project };
});


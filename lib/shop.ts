// Shop config. Everything the preset pages show comes from here.
// Adding a product later (GoPro pack, Lightroom presets...) = a new entry in PRODUCTS.
//
// Gumroad links: paste the real product URLs over the "#" placeholders below.
// Before/after images: overwrite the files in public/field-grades/ (same names), no code changes.

export type Look = {
  slug: string;
  name: string;
  line: string;
  /** Gumroad URL for this look on its own. */
  singleUrl: string;
  placeholder?: boolean;
};

export type Product = {
  slug: string;
  eyebrow: string;
  name: string;
  title: string;
  sub: string;
  price: number;
  singlePrice: number;
  /** Gumroad URL for the full pack. */
  packUrl: string;
  /** Gumroad URL for the $0 free product (the overlay collects the email). */
  freeUrl: string;
  /** Which look is the free one. */
  freeLook: string;
  /** Which look leads the page. */
  heroLook: string;
  looks: Look[];
  installGuideUrl: string;
  howToVideo: string; // YouTube id, empty until the video exists
  refundPolicy: string;
};

// gumroad links: paste real URLs here
const GUMROAD_PACK_URL = "#";
const GUMROAD_FREE_URL = "#";
const GUMROAD_SINGLE_URLS: Record<string, string> = {
  bitterroot: "#",
  "high-desert": "#",
  selway: "#",
  "big-sky": "#",
  "look-5": "#",
  "look-6": "#",
};

export const FIELD_GRADES_1: Product = {
  slug: "field-grades-1",
  eyebrow: "Field Grades, Vol. 1",
  name: "Field Grades, Volume 1",
  title: "The grades I shoot Montana with.",
  sub: "The exact LUTs from my commercial and personal work. Built in DaVinci Resolve for Sony S-Log3. One click on flat LOG footage.",
  price: 35,
  singlePrice: 20,
  packUrl: GUMROAD_PACK_URL,
  freeUrl: GUMROAD_FREE_URL,
  freeLook: "bitterroot", // PLACEHOLDER: set to the look that ends up free
  heroLook: "bitterroot",
  looks: [
    { slug: "bitterroot", name: "Bitterroot", line: "Warm and golden. Late light, dust, skin tones that stay honest.", singleUrl: GUMROAD_SINGLE_URLS.bitterroot },
    { slug: "high-desert", name: "High Desert", line: "Bleached and dry. Built for harsh midday sun when the light won't cooperate.", singleUrl: GUMROAD_SINGLE_URLS["high-desert"] },
    { slug: "selway", name: "Selway", line: "Cool, deep greens. Forest, rivers, wet country.", singleUrl: GUMROAD_SINGLE_URLS.selway },
    { slug: "big-sky", name: "Big Sky", line: "Clean and wide open. Blue sky, snow, big country.", singleUrl: GUMROAD_SINGLE_URLS["big-sky"] },
    { slug: "look-5", name: "Look 5 (TBD)", line: "PLACEHOLDER: name and one-liner coming.", singleUrl: GUMROAD_SINGLE_URLS["look-5"], placeholder: true },
    { slug: "look-6", name: "Look 6 (TBD)", line: "PLACEHOLDER: name and one-liner coming.", singleUrl: GUMROAD_SINGLE_URLS["look-6"], placeholder: true },
  ],
  installGuideUrl: "#", // PLACEHOLDER: install guide PDF, e.g. "/field-grades/install-guide.pdf"
  howToVideo: "", // PLACEHOLDER: YouTube id of the how-to-apply-and-expose video
  refundPolicy: "PLACEHOLDER: refund policy coming.",
};

export const PRODUCTS: Record<string, Product> = { [FIELD_GRADES_1.slug]: FIELD_GRADES_1 };

// before/after stills live in public/field-grades/<look-slug>-before.jpg / -after.jpg
export const beforeSrc = (slug: string) => `/field-grades/${slug}-before.jpg`;
export const afterSrc = (slug: string) => `/field-grades/${slug}-after.jpg`;

export const lookOf = (p: Product, slug: string) => p.looks.find((l) => l.slug === slug) ?? p.looks[0];
export const isLive = (url: string) => url !== "#" && url.trim() !== "";

const WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
export const inWords = (n: number) => WORDS[n] ?? String(n);

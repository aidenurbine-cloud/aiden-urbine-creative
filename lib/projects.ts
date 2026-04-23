export type Project = {
  slug: string;
  title: string;
  client: string;
  tag: string;
  hero: string;
  heroPosition?: string;
  label?: string;
};

export const projects: Project[] = [
  {
    slug: "montana-knife-company",
    title: "Montana Knife Company",
    client: "Montana Knife Company",
    tag: "Photo + Video",
    hero: "/images/mkc/mkc.JPEG",
    label: "MKC",
  },
  {
    slug: "marin-moto-ranch",
    title: "Marin Moto Ranch",
    client: "Marin Moto Ranch",
    tag: "Photo + Video",
    hero: "/images/MMR HOMEPAGE.jpg",
    label: "MMR",
  },
  {
    slug: "rough-country",
    title: "Rough Country",
    client: "Rough Country",
    tag: "Photo + Video",
    hero: "/images/ROUGH COUNTRY BACKGROUND.png",
    label: "ROUGH COUNTRY",
  },
  {
    slug: "badfish",
    title: "Badfish SUP",
    client: "Badfish SUP",
    tag: "Photo",
    hero: "/images/BADFISH homepage opreview.jpg",
    label: "BADFISH",
  },
  {
    slug: "personal-collection",
    title: "Personal Collection",
    client: "Aiden Urbine",
    tag: "Photo",
    hero: "/images/PERSONAL HOMEPAGE.jpg",
    heroPosition: "bottom",
    label: "PERSONAL",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

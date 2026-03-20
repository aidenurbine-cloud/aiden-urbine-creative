export type Project = {
  slug: string;
  title: string;
  client: string;
  tag: string;
  hero: string;
};

export const projects: Project[] = [
  {
    slug: "montana-knife-company",
    title: "Montana Knife Company",
    client: "Montana Knife Company",
    tag: "Photo + Video",
    hero: "/images/mkc/mkc.JPEG",
  },
  {
    slug: "turtlebox",
    title: "Turtlebox",
    client: "Turtlebox",
    tag: "Video",
    hero: "/images/turtlebox-hero.jpg",
  },
  {
    slug: "rough-country",
    title: "Rough Country",
    client: "Rough Country",
    tag: "Photo + Video",
    hero: "/images/roughcountry-hero.jpg",
  },
  {
    slug: "winnebago",
    title: "Winnebago",
    client: "Winnebago",
    tag: "Photo + Video",
    hero: "/images/winnebago/winnebago hero.JPG",
  },
  {
    slug: "personal-collection",
    title: "Personal Collection",
    client: "Aiden Urbine",
    tag: "Photo",
    hero: "/images/personal-hero.jpg",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

import type { StaticImageData } from "next/image";
import mandalaSleeve from "@/assets/work/mandala-sleeve.jpg";
import type { StyleId } from "./work";

export type Artist = {
  slug: string;
  name: string;
  role: string;
  /** Portrait photo. Until one is supplied, a piece of their work is used as the cover. */
  cover: StaticImageData;
  specialties: StyleId[];
  intro: string;
  bio: string[];
  instagram?: string;
};

// TODO(client): replace bios with the artists' own words and add a real portrait for each artist.
export const artists: Artist[] = [
  {
    slug: "bhavna",
    name: "Bhavna",
    role: "Lead Artist",
    cover: mandalaSleeve,
    specialties: ["ornamental", "mandala", "fine-line", "spiritual"],
    intro:
      "Ornamental lines, sacred geometry and devotional pieces — designed around the way your body moves.",
    bio: [
      "Bhavna leads the studio's ornamental and mandala work: patterns that sit like jewellery, follow the musculature, and age gracefully on skin.",
      "Every piece starts as a conversation. She sketches from scratch for each client — no flash copied off the wall — refining placement and flow until the design feels like it was always meant to be there.",
      "Alongside ornamental work she is sought after for spiritual pieces, from Shiva and Krishna to chakra mandalas, and for delicate fine-line work.",
    ],
    instagram: "https://www.instagram.com/chd.edentattoos",
  },
];

export const artistBySlug = (slug: string) => artists.find((a) => a.slug === slug);

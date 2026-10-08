import type { StaticImageData } from "next/image";
import bhavnaPortrait from "@/assets/artists/bhavna.jpg";
import mandalaSleeve from "@/assets/work/mandala-sleeve.jpg";
import type { StyleId } from "./work";

export type Artist = {
  slug: string;
  name: string;
  role: string;
  /** Photo of the artist, shown on the artists page, their profile and the homepage feature. */
  portrait: StaticImageData;
  /** A signature piece of their work, used alongside the portrait. */
  cover: StaticImageData;
  specialties: StyleId[];
  intro: string;
  bio: string[];
  instagram?: string;
};

// TODO(client): replace bios with the artists' own words.
export const artists: Artist[] = [
  {
    slug: "bhavna",
    name: "Bhavna",
    role: "Lead Artist",
    portrait: bhavnaPortrait,
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

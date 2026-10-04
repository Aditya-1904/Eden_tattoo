import type { StaticImageData } from "next/image";

import astronaut from "@/assets/work/astronaut.jpg";
import butterflySternum from "@/assets/work/butterfly-sternum.jpg";
import chakraMandala from "@/assets/work/chakra-mandala-back.jpg";
import flutePeacock from "@/assets/work/flute-peacock.jpg";
import geminiOrnamental from "@/assets/work/gemini-ornamental.jpg";
import jokerSleeve from "@/assets/work/joker-sleeve.jpg";
import koiRibs from "@/assets/work/koi-ribs.jpg";
import krishnaRadha from "@/assets/work/krishna-radha.jpg";
import mandalaSleeve from "@/assets/work/mandala-sleeve.jpg";
import memorialPortrait from "@/assets/work/memorial-portrait.jpg";
import ornamentalForearm from "@/assets/work/ornamental-forearm.jpg";
import reaperSleeve from "@/assets/work/reaper-sleeve.jpg";
import shivaBack from "@/assets/work/shiva-back.jpg";
import shivaTrishul from "@/assets/work/shiva-trishul-back.jpg";
import tigerEyes from "@/assets/work/tiger-eyes.jpg";

export type StyleId = "ornamental" | "mandala" | "fine-line" | "spiritual" | "realism" | "blackwork";

export const styles: { id: StyleId; name: string; blurb: string }[] = [
  { id: "ornamental", name: "Ornamental", blurb: "Jewellery-like filigree that follows the body" },
  { id: "mandala", name: "Mandala", blurb: "Sacred geometry, dotwork & perfect symmetry" },
  { id: "fine-line", name: "Fine-line", blurb: "Delicate single-needle detail" },
  { id: "spiritual", name: "Spiritual", blurb: "Shiva, Krishna & devotional pieces" },
  { id: "realism", name: "Realism", blurb: "Portraits & life-like black and grey" },
  { id: "blackwork", name: "Blackwork", blurb: "Bold illustrative pieces in solid black" },
];

export type WorkItem = {
  slug: string;
  title: string;
  styles: StyleId[];
  placement: string;
  image: StaticImageData;
  artist: string;
};

// TODO(client): add more pieces — drop the image in src/assets/work and add an entry here.
export const work: WorkItem[] = [
  { slug: "shiva-tandava", title: "Shiva Tandava", styles: ["spiritual", "blackwork"], placement: "Back", image: shivaBack, artist: "bhavna" },
  { slug: "mandala-sleeve", title: "Mandala Sleeve", styles: ["mandala", "blackwork"], placement: "Upper arm", image: mandalaSleeve, artist: "bhavna" },
  { slug: "why-so-serious", title: "Why So Serious", styles: ["realism"], placement: "Calf", image: jokerSleeve, artist: "bhavna" },
  { slug: "filigree-forearm", title: "Filigree", styles: ["ornamental", "fine-line"], placement: "Forearm", image: ornamentalForearm, artist: "bhavna" },
  { slug: "chakra-mandala", title: "Seven Chakras", styles: ["mandala", "spiritual"], placement: "Spine", image: chakraMandala, artist: "bhavna" },
  { slug: "butterfly-sternum", title: "Metamorphosis", styles: ["ornamental", "fine-line"], placement: "Sternum", image: butterflySternum, artist: "bhavna" },
  { slug: "krishna-radha", title: "Radha Krishna", styles: ["spiritual", "realism"], placement: "Forearm", image: krishnaRadha, artist: "bhavna" },
  { slug: "tiger-eyes", title: "Eyes of the Tiger", styles: ["realism"], placement: "Upper arm", image: tigerEyes, artist: "bhavna" },
  { slug: "gemini", title: "Gemini", styles: ["ornamental", "fine-line"], placement: "Upper back", image: geminiOrnamental, artist: "bhavna" },
  { slug: "memento-mori", title: "Memento Mori", styles: ["blackwork", "realism"], placement: "Forearm", image: reaperSleeve, artist: "bhavna" },
  { slug: "koi", title: "Koi", styles: ["fine-line", "blackwork"], placement: "Ribs", image: koiRibs, artist: "bhavna" },
  { slug: "trishul", title: "Trishul", styles: ["spiritual", "blackwork"], placement: "Back", image: shivaTrishul, artist: "bhavna" },
  { slug: "in-memory", title: "In Memory", styles: ["realism"], placement: "Forearm", image: memorialPortrait, artist: "bhavna" },
  { slug: "deeper-than-fear", title: "Deeper than Fear", styles: ["blackwork"], placement: "Shoulder", image: astronaut, artist: "bhavna" },
  { slug: "bansuri", title: "Bansuri & Mor Pankh", styles: ["spiritual"], placement: "Forearm", image: flutePeacock, artist: "bhavna" },
];

export const workBySlug = (slug: string) => work.find((w) => w.slug === slug);
export const workByStyle = (style: StyleId) => work.filter((w) => w.styles.includes(style));
export const styleName = (id: StyleId) => styles.find((s) => s.id === id)?.name ?? id;

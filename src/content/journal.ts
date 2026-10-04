import type { StaticImageData } from "next/image";
import chakraMandala from "@/assets/work/chakra-mandala-back.jpg";
import flutePeacock from "@/assets/work/flute-peacock.jpg";
import geminiOrnamental from "@/assets/work/gemini-ornamental.jpg";
import koiRibs from "@/assets/work/koi-ribs.jpg";
import ornamentalForearm from "@/assets/work/ornamental-forearm.jpg";

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO
  category: string;
  cover: StaticImageData;
  body: Block[];
};

export const posts: Post[] = [
  {
    slug: "best-tattoo-artist-in-chandigarh-why-eden",
    title: "Choosing a tattoo studio in Chandigarh: why Eden",
    excerpt: "What actually separates a great studio from a good one — and the standards we hold ourselves to.",
    date: "2026-07-07",
    category: "Studio",
    cover: ornamentalForearm,
    body: [
      { type: "p", text: "A tattoo is one of the few things you buy that you'll keep for the rest of your life. So the question isn't really “who is cheapest” or “who is nearest” — it's who will listen, design something that is genuinely yours, and do it safely." },
      { type: "h2", text: "Custom, not copied" },
      { type: "p", text: "At Eden, designs are drawn for one person and one placement. Bring references, screenshots and half-formed ideas; your artist turns them into an original piece that fits the way your body moves. That is why our ornamental and mandala work sits like jewellery rather than a sticker." },
      { type: "h2", text: "Hygiene you never have to ask about" },
      { type: "p", text: "Single-use needles and cartridges, disposable barriers and a completely fresh setup for every client. These are not upgrades — they are the minimum, and you should expect them anywhere you get tattooed." },
      { type: "h2", text: "A portfolio that matches your idea" },
      { type: "p", text: "Look for healed work in the style you want. If you're after fine-line, look at fine-line a year later. If it's a portrait, look at portraits. Our portfolio and Instagram are organised so you can do exactly that." },
      { type: "quote", text: "The work isn't done when you leave the chair. It's done when it's healed." },
      { type: "p", text: "Finally, aftercare. A great studio stays with you through healing, answers your 11pm “is this normal?” message, and offers a touch-up if anything needs it." },
    ],
  },
  {
    slug: "colored-vs-black-tattoos",
    title: "Colour vs black & grey: which should you choose?",
    excerpt: "Skin tone, placement, style and how each ages — a practical guide to picking your palette.",
    date: "2026-05-29",
    category: "Guides",
    cover: flutePeacock,
    body: [
      { type: "p", text: "Few decisions shape a tattoo more than palette. Both colour and black & grey can be stunning; the right choice depends on the design, your skin and how you want it to age." },
      { type: "h2", text: "Black & grey" },
      { type: "ul", items: ["Ages extremely well and stays readable for decades", "Works beautifully on every skin tone", "Ideal for realism, portraits, mandala and ornamental work", "Usually quicker to heal and easier to touch up"] },
      { type: "h2", text: "Colour" },
      { type: "ul", items: ["Brings energy to illustrative, floral and neo-traditional pieces", "Vibrancy depends on skin tone and sun care — some hues read differently on deeper skin", "Benefits most from strict SPF to keep colours bright"] },
      { type: "h2", text: "The middle ground" },
      { type: "p", text: "Black & grey with a single accent colour — a red ribbon, a peacock feather, a touch of gold — can give you the best of both. Talk it through with your artist; they can mock up both versions before you decide." },
    ],
  },
  {
    slug: "japanese-tattoos-art-meaning-history",
    title: "Japanese tattoos: art, meaning & history",
    excerpt: "Koi, dragons, waves and peonies — the symbolism behind irezumi and how to wear it with respect.",
    date: "2026-05-30",
    category: "Culture",
    cover: koiRibs,
    body: [
      { type: "p", text: "Japanese tattooing — irezumi — is one of the oldest and most influential traditions in the world. Its bold outlines, flowing backgrounds and dense symbolism have shaped modern tattooing everywhere." },
      { type: "h2", text: "Common motifs" },
      { type: "ul", items: ["Koi — perseverance; a koi swimming upstream becomes a dragon", "Dragon — wisdom, strength and protection", "Waves & wind bars — the movement that ties a large piece together", "Peony & cherry blossom — prosperity, and the beauty of impermanence", "Hannya mask — passion and jealousy, often worn as a protective charm"] },
      { type: "h2", text: "Flow is everything" },
      { type: "p", text: "Traditional Japanese work is designed for the body as a whole. Even a smaller piece, like a koi on the ribs, should follow the natural lines of the muscle so it moves with you." },
      { type: "p", text: "Thinking about a Japanese-inspired piece? Bring your references and we'll design something that respects the tradition while being entirely yours." },
    ],
  },
  {
    slug: "zodiac-tattoos-meaning-designs",
    title: "Zodiac tattoos: meanings & design ideas",
    excerpt: "From constellations to ornamental glyphs — twelve signs, endless ways to wear them.",
    date: "2026-05-28",
    category: "Ideas",
    cover: geminiOrnamental,
    body: [
      { type: "p", text: "Zodiac tattoos are personal without needing explanation. They can be tiny and minimal, or the centrepiece of an ornamental back piece — like the Gemini design in our portfolio." },
      { type: "h2", text: "Ways to wear your sign" },
      { type: "ul", items: ["Constellation in fine single-needle dots", "The glyph framed in ornamental filigree", "The sign's creature or symbol in black & grey realism", "Your sign woven into a larger mandala or chakra piece"] },
      { type: "h2", text: "Fire, earth, air, water" },
      { type: "p", text: "Pair your sign with its element: flames for Aries, Leo and Sagittarius; botanicals for Taurus, Virgo and Capricorn; flowing lines for Gemini, Libra and Aquarius; waves for Cancer, Scorpio and Pisces." },
    ],
  },
  {
    slug: "tattoo-aftercare-guide",
    title: "Tattoo aftercare: the complete guide",
    excerpt: "Day-by-day instructions for a clean heal and crisp lines that last a lifetime.",
    date: "2026-05-27",
    category: "Aftercare",
    cover: chakraMandala,
    body: [
      { type: "p", text: "Half of a great tattoo happens after you leave the studio. Good aftercare means crisper lines, richer blacks and fewer touch-ups." },
      { type: "h2", text: "The first few hours" },
      { type: "p", text: "Leave the wrap on for as long as your artist recommends. Then wash with lukewarm water and a gentle fragrance-free soap, pat dry with paper towel and let it breathe." },
      { type: "h2", text: "The first two weeks" },
      { type: "ul", items: ["Wash 2–3 times daily with clean hands", "Apply a thin layer of balm — matte, not shiny", "No soaking: avoid baths, pools, the sea and steam rooms", "Never pick or scratch flaking skin"] },
      { type: "h2", text: "For life" },
      { type: "p", text: "Sunscreen is the single best thing you can do for a tattoo. UV breaks down pigment, so SPF 50 keeps your work looking fresh for decades." },
      { type: "p", text: "See our full aftercare page for a day-by-day timeline, and message us any time if something doesn't look right." },
    ],
  },
];

export const postsSorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));
export const postBySlug = (slug: string) => posts.find((p) => p.slug === slug);

export function readingTime(post: Post) {
  const words = post.body
    .map((b) => (b.type === "ul" ? b.items.join(" ") : b.text))
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

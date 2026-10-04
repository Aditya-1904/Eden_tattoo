/**
 * Single source of truth for studio details.
 * Edit here and every page, the footer, SEO metadata and structured data update together.
 */
export const site = {
  name: "Eden Tattoos",
  shortName: "Eden",
  city: "Chandigarh",
  tagline: "Ornamental · Mandala · Custom Ink",
  description:
    "Eden Tattoos is a custom tattoo & piercing studio in Chandigarh known for ornamental, mandala, fine-line and spiritual work. Every design is drawn for one person, for one body.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://edentattoos.com",

  phone: "+91 89899 98996",
  phoneHref: "tel:+918989998996",
  whatsapp: "918989998996",
  email: "chd.edentattoos@gmail.com",

  // Matches the studio's Google Maps listing and the Grand Reopening poster (4 Oct 2026).
  // Previous address: SCO 292, First Floor, Sector 32D, Chandigarh 160030.
  address: {
    line1: "First Floor, Plot No. 53",
    line2: "Industrial Area Phase 1",
    city: "Chandigarh",
    region: "Chandigarh",
    postalCode: "160002",
    country: "IN",
  },
  mapsQuery: "Eden Tattoos, Plot No. 53, Industrial Area Phase 1, Chandigarh",

  // TODO(client): replace with real opening hours.
  hours: [{ days: "Every day", time: "By appointment" }],

  rating: { value: 4.9, count: 700 },
  instagram: { handle: "chd.edentattoos", url: "https://www.instagram.com/chd.edentattoos", followers: "29.3K" },
  facebook: "https://www.facebook.com/301755863025077",
  timezone: "Asia/Kolkata",
} as const;

export const nav = [
  { href: "/work", label: "Work" },
  { href: "/artists", label: "Artists" },
  { href: "/studio", label: "Studio" },
  { href: "/aftercare", label: "Aftercare" },
  { href: "/journal", label: "Journal" },
] as const;

export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapsQuery)}`;
export const mapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(site.mapsQuery)}&output=embed`;
export const reviewsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Eden Tattoos Chandigarh")}`;

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

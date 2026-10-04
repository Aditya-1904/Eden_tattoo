import type { MetadataRoute } from "next";
import { artists } from "@/content/artists";
import { posts } from "@/content/journal";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ["", "/work", "/artists", "/studio", "/aftercare", "/journal", "/book"].map((p) => ({
    url: `${site.url}${p}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : 0.8,
  }));
  return [
    ...pages,
    ...artists.map((a) => ({ url: `${site.url}/artists/${a.slug}`, lastModified: now, priority: 0.7 })),
    ...posts.map((p) => ({ url: `${site.url}/journal/${p.slug}`, lastModified: new Date(p.date), priority: 0.6 })),
  ];
}

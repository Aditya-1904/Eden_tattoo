import type { Metadata } from "next";
import { FinalCTA } from "@/components/home/FinalCTA";
import { PageHeader } from "@/components/ui/PageHeader";
import { Gallery } from "@/components/work/Gallery";
import { styles, work, type StyleId } from "@/content/work";

export const metadata: Metadata = {
  title: "Work — Tattoo Portfolio",
  description:
    "Browse custom ornamental, mandala, fine-line, spiritual, realism and blackwork tattoos by Eden Tattoos, Chandigarh.",
  alternates: { canonical: "/work" },
};

export default async function WorkPage({ searchParams }: PageProps<"/work">) {
  const { style } = await searchParams;
  const initial = styles.some((s) => s.id === style) ? (style as StyleId) : "all";

  return (
    <>
      <PageHeader
        index="W"
        eyebrow={`Portfolio — ${work.length} pieces`}
        title="Selected *work*"
        intro="Every piece below was drawn for one person. Filter by style, then open any piece to see it up close."
      />
      <Gallery initial={initial} />
      <FinalCTA title="Seen something you *love?*" />
    </>
  );
}

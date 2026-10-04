import { FinalCTA } from "@/components/home/FinalCTA";
import { FlashWall } from "@/components/home/FlashWall";
import { InkFlood } from "@/components/home/InkFlood";
import { ArtistSignature, ReviewNotes } from "@/components/home/Notebook";
import { ProcessPath } from "@/components/home/ProcessPath";
import { StencilHero } from "@/components/home/StencilHero";
import { StudioNote } from "@/components/home/StudioNote";
import { ZoomParallax } from "@/components/home/ZoomParallax";

export default function Home() {
  return (
    <>
      <StencilHero />
      <StudioNote />
      <InkFlood />
      <ZoomParallax />
      <FlashWall />
      <ProcessPath />
      <ArtistSignature />
      <ReviewNotes />
      <FinalCTA />
    </>
  );
}

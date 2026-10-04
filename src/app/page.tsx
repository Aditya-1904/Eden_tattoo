import { ArtistFeature, CinematicCTA, ReviewQuote } from "@/components/home/Cinematic";
import { CinematicHero } from "@/components/home/CinematicHero";
import { Statement } from "@/components/home/Statement";
import { StylesSticky } from "@/components/home/StylesSticky";
import { ZoomParallax } from "@/components/home/ZoomParallax";

export default function Home() {
  return (
    <>
      <CinematicHero />
      <Statement />
      <ZoomParallax />
      <StylesSticky />
      <ArtistFeature />
      <ReviewQuote />
      <CinematicCTA />
    </>
  );
}

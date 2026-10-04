import { ArtistTeaser } from "@/components/home/ArtistTeaser";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Hero } from "@/components/home/Hero";
import { Manifesto } from "@/components/home/Manifesto";
import { Process } from "@/components/home/Process";
import { Reviews, StyleBand, Visit } from "@/components/home/Sections";
import { StylesIndex } from "@/components/home/StylesIndex";
import { ZoomParallax } from "@/components/home/ZoomParallax";

export default function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      <StyleBand />
      <StylesIndex />
      <ZoomParallax />
      <ArtistTeaser />
      <Process />
      <Reviews />
      <Visit />
      <FinalCTA />
    </>
  );
}

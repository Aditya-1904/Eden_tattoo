import type { Metadata } from "next";
import Image from "next/image";
import { FinalCTA } from "@/components/home/FinalCTA";
import { StyleBand } from "@/components/home/Sections";
import { ButtonLink } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { ClipReveal, Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import { site, whatsappLink } from "@/content/site";
import { workBySlug } from "@/content/work";

export const metadata: Metadata = {
  title: "Studio — Tattoo, Piercing & Academy",
  description:
    "Inside Eden Tattoos, Chandigarh: a private, sterile studio for custom tattoos, professional piercing and the Eden tattoo academy.",
  alternates: { canonical: "/studio" },
};

// TODO(client): confirm these standards match the studio's exact practice.
const standards = [
  { title: "Single-use needles", text: "Every needle and cartridge is sealed, used once and safely disposed of." },
  { title: "Fresh setup, every client", text: "Barrier film, gloves, ink caps and work surfaces are replaced for each session." },
  { title: "Sterilised tools", text: "Reusable equipment is cleaned and sterilised between every single client." },
  { title: "Skin-safe inks", text: "Quality pigments chosen for healing, longevity and how they settle on Indian skin tones." },
];

export default function StudioPage() {
  const a = workBySlug("chakra-mandala")!;
  const b = workBySlug("shiva-tandava")!;
  const c = workBySlug("filigree-forearm")!;

  return (
    <>
      <PageHeader
        index="S"
        eyebrow="The studio"
        title="A quiet room for *loud* ideas"
        intro={`Eden is a custom tattoo and piercing studio in ${site.city}. Calm, private and meticulously clean — a space where you can take your time.`}
      />

      <section className="container-x grid gap-4 md:grid-cols-12">
        <ClipReveal className="relative aspect-[16/10] overflow-hidden md:col-span-8">
          <Image src={b.image} alt={b.title} fill sizes="(max-width: 768px) 100vw, 66vw" placeholder="blur" className="object-cover" />
        </ClipReveal>
        <ClipReveal delay={0.15} className="relative aspect-[4/5] overflow-hidden md:col-span-4 md:aspect-auto">
          <Image src={a.image} alt={a.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
        </ClipReveal>
      </section>

      <section className="container-x grid gap-10 py-28 md:grid-cols-12 md:py-40">
        <p className="eyebrow text-ash md:col-span-3">
          <span className="text-copper">(01)</span> — Philosophy
        </p>
        <div className="md:col-span-8">
          <RevealText
            as="h2"
            text="We don't do flash off the wall. We do *conversations*, sketches, revisions — and then ink."
            stagger={0.03}
            className="font-display text-big leading-[1.05]"
          />
          <Reveal delay={0.2} className="mt-10 grid gap-8 text-bone/65 md:grid-cols-2">
            <p className="leading-relaxed">
              Every design starts with you: the story, the meaning, the placement. Your artist builds the piece around the
              shape of your body so it flows with the muscle and reads beautifully from every angle.
            </p>
            <p className="leading-relaxed">
              Our heart is ornamental, mandala and spiritual work — patterns that feel like jewellery and devotion made
              permanent — but we love fine-line, realism and bold blackwork just as much.
            </p>
          </Reveal>
        </div>
      </section>

      <StyleBand />

      <section className="container-x py-28 md:py-40">
        <div className="grid gap-10 md:grid-cols-12">
          <p className="eyebrow text-ash md:col-span-3">
            <span className="text-copper">(02)</span> — Hygiene &amp; safety
          </p>
          <RevealText as="h2" text="Clean is *non-negotiable*" className="font-display text-huge leading-[0.95] md:col-span-9" />
        </div>
        <div className="mt-16 grid border-t hairline sm:grid-cols-2 lg:grid-cols-4">
          {standards.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08} className="border-b hairline py-10 sm:border-r sm:px-8 sm:first:pl-0 lg:last:border-r-0">
              <div>
                <span className="eyebrow text-copper">0{i + 1}</span>
                <h3 className="mt-8 font-display text-4xl leading-none">{s.title}</h3>
                <p className="mt-4 leading-relaxed text-bone/60">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-x grid gap-4 pb-28 md:grid-cols-2 md:pb-40">
        <Reveal className="flex flex-col justify-between gap-12 border hairline bg-coal p-8 md:min-h-[560px] md:p-12">
          <div className="flex items-start justify-between">
            <p className="eyebrow text-ash">
              <span className="text-copper">(03)</span> — Piercing
            </p>
            <span className="font-display text-7xl italic text-copper/30">◯</span>
          </div>
          <div>
            <h2 className="font-display text-6xl leading-[0.95] md:text-7xl">Piercing</h2>
            <p className="mt-6 max-w-md leading-relaxed text-bone/65">
              Ear curations, nose, septum, helix, conch and more — performed with sterile, single-use needles (never guns)
              and implant-grade jewellery. Ask us to curate an ear stack around the jewellery you love.
            </p>
          </div>
          <div>
            <ButtonLink href={whatsappLink("Hi Eden! I'd like to book a piercing.")} variant="outline">
              Book a piercing
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="relative flex flex-col justify-between gap-12 overflow-hidden border hairline p-8 md:min-h-[560px] md:p-12">
          <Image src={c.image} alt="" fill sizes="50vw" className="object-cover opacity-25" />
          <div className="relative flex items-start justify-between">
            <p className="eyebrow text-ash">
              <span className="text-copper">(04)</span> — Academy
            </p>
          </div>
          <div className="relative">
            <h2 className="font-display text-6xl leading-[0.95] md:text-7xl">
              Eden <span className="italic text-copper">Academy</span>
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-bone/75">
              Learn the craft from working artists — drawing for skin, machine handling, hygiene and the business of
              tattooing. Seminars and courses run throughout the year.
            </p>
          </div>
          <div className="relative">
            <ButtonLink href={whatsappLink("Hi Eden! I'd like to know about upcoming Academy courses.")}>Ask about courses</ButtonLink>
          </div>
        </Reveal>
      </section>

      <FinalCTA title="Come see the *space.*" />
    </>
  );
}

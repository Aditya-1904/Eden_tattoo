import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Arrow, ButtonLink } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { ClipReveal, Reveal } from "@/components/ui/Reveal";
import { artists } from "@/content/artists";
import { styleName } from "@/content/work";
import { whatsappLink } from "@/content/site";

export const metadata: Metadata = {
  title: "Artists",
  description: "Meet the tattoo artists at Eden Tattoos, Chandigarh — specialists in ornamental, mandala, fine-line and spiritual work.",
  alternates: { canonical: "/artists" },
};

export default function ArtistsPage() {
  return (
    <>
      <PageHeader
        index="A"
        eyebrow="The artists"
        title="Hands *behind* the work"
        intro="Small team, singular focus. Every artist at Eden draws their own designs and specialises in the styles they love most."
      />

      <section className="container-x grid gap-x-8 gap-y-20 md:grid-cols-2">
        {artists.map((a, i) => (
          <article key={a.slug} className="group">
            <Link href={`/artists/${a.slug}`} data-cursor="Meet" className="block">
              <ClipReveal delay={i * 0.1} className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={a.cover}
                  alt={`Work by ${a.name}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  placeholder="blur"
                  className="object-cover transition-transform duration-[1.6s] ease-expo group-hover:scale-105"
                />
              </ClipReveal>
              <div className="mt-6 flex items-start justify-between gap-6 border-b hairline pb-6">
                <div>
                  <p className="eyebrow text-ash">
                    <span className="text-copper">0{i + 1}</span> — {a.role}
                  </p>
                  <h2 className="mt-3 font-display text-6xl leading-none transition-[color] duration-500 group-hover:italic group-hover:text-copper md:text-7xl">
                    {a.name}
                  </h2>
                </div>
                <Arrow className="mt-2 h-6 w-6 transition-transform duration-500 group-hover:rotate-45 group-hover:text-copper" />
              </div>
            </Link>
            <ul className="mt-5 flex flex-wrap gap-2">
              {a.specialties.map((s) => (
                <li key={s} className="eyebrow rounded-full border border-bone/15 px-3 py-1.5 text-bone/70">
                  {styleName(s)}
                </li>
              ))}
            </ul>
          </article>
        ))}

        <Reveal className="flex flex-col justify-between gap-10 border hairline bg-coal p-8 md:aspect-[4/5] md:p-12">
          <p className="eyebrow text-ash">
            <span className="text-copper">+</span> — Guest spots
          </p>
          <div>
            <h2 className="font-display text-5xl leading-[0.95] md:text-6xl">
              Are you an <span className="italic text-copper">artist?</span>
            </h2>
            <p className="mt-6 max-w-sm leading-relaxed text-bone/65">
              We welcome guest artists and apprentices who care about craft as much as we do. Send us your portfolio.
            </p>
          </div>
          <div>
            <ButtonLink href={whatsappLink("Hi Eden! I'm an artist and would love to discuss a guest spot / joining the studio.")} variant="outline">
              Get in touch
            </ButtonLink>
          </div>
        </Reveal>
      </section>

      <FinalCTA />
    </>
  );
}

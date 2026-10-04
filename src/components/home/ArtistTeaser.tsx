"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { ClipReveal, Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import { artists } from "@/content/artists";
import { styleName, workBySlug } from "@/content/work";

export function ArtistTeaser() {
  const artist = artists[0];
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const smallY = useTransform(scrollYProgress, [0, 1], ["30%", "-30%"]);
  const secondary = workBySlug("gemini");

  return (
    <section ref={ref} className="container-x relative py-28 md:py-44" aria-label="Our artist">
      <div className="grid gap-12 md:grid-cols-12 md:gap-8">
        <div className="relative md:col-span-6">
          <ClipReveal className="relative aspect-[4/5] overflow-hidden">
            <Link href={`/artists/${artist.slug}`} data-cursor="Meet" className="block h-full w-full">
              <motion.div style={{ y: imgY }} className="absolute inset-[-12%_0]">
                <Image src={artist.cover} alt={`Work by ${artist.name}`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" placeholder="blur" />
              </motion.div>
            </Link>
          </ClipReveal>
          {secondary && (
            <motion.div
              style={{ y: smallY }}
              className="absolute -bottom-16 -right-4 hidden aspect-[3/4] w-[38%] overflow-hidden border-8 border-ink md:block md:-right-16"
            >
              <Image src={secondary.image} alt={secondary.title} fill sizes="20vw" className="object-cover" />
            </motion.div>
          )}
        </div>

        <div className="flex flex-col justify-between gap-10 md:col-span-5 md:col-start-8">
          <div>
            <p className="eyebrow text-ash">
              <span className="text-copper">(04)</span> — {artist.role}
            </p>
            <RevealText as="h2" text={artist.name} className="mt-6 font-display text-giant italic leading-[0.85] tracking-[-0.03em]" />
          </div>
          <Reveal>
            <p className="text-xl leading-relaxed text-bone/80 md:text-2xl">{artist.intro}</p>
            <p className="mt-6 leading-relaxed text-bone/60">{artist.bio[1]}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="flex flex-wrap gap-2">
              {artist.specialties.map((s) => (
                <li key={s} className="eyebrow rounded-full border border-bone/15 px-4 py-2 text-bone/80">
                  {styleName(s)}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-4">
              <ButtonLink href={`/artists/${artist.slug}`}>Meet {artist.name}</ButtonLink>
              <ButtonLink href={`/book?artist=${artist.slug}`} variant="outline">
                Book with {artist.name}
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

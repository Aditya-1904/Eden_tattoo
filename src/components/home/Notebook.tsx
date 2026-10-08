"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Annotation } from "@/components/stencil/Annotation";
import { artists } from "@/content/artists";
import { reviews } from "@/content/copy";
import { reviewsLink, site } from "@/content/site";
import { styleName, workBySlug } from "@/content/work";

/** The lead artist, introduced with taped prints and a signature that writes itself. */
export function ArtistSignature() {
  const artist = artists[0];
  const second = workBySlug("filigree-forearm")!;

  return (
    <section className="relative overflow-hidden bg-paper-2 py-28 md:py-40" aria-label="Our artist">
      <div className="container-x grid items-center gap-16 md:grid-cols-12">
        <div className="relative mx-auto w-full max-w-md md:col-span-5 md:max-w-none">
          <motion.div
            className="print relative w-[78%] p-3 pb-16"
            initial={{ opacity: 0, rotate: -12, y: 40 }}
            whileInView={{ opacity: 1, rotate: -4, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="tape -top-3 left-8 -rotate-6" aria-hidden />
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image src={artist.portrait} alt={`${artist.name}, ${artist.role.toLowerCase()} at Eden Tattoos`} fill sizes="(max-width: 768px) 70vw, 32vw" className="object-cover object-[50%_30%]" placeholder="blur" />
            </div>
            <span className="hand absolute bottom-4 left-4 text-3xl text-ink">{artist.name}, in the studio</span>
          </motion.div>
          <motion.div
            className="print absolute -bottom-10 right-0 w-[46%] p-2.5 pb-10"
            initial={{ opacity: 0, rotate: 14, y: 60 }}
            whileInView={{ opacity: 1, rotate: 6, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="tape -top-3 right-6 rotate-12" aria-hidden />
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image src={second.image} alt={second.title} fill sizes="20vw" className="object-cover" />
            </div>
            <span className="hand absolute bottom-2.5 left-3 text-2xl text-ink">{second.title}</span>
          </motion.div>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <p className="eyebrow text-graphite">
            <span className="text-stencil">05</span> — {artist.role}
          </p>
          {/* Signature: revealed left-to-right as if being written */}
          <motion.p
            className="hand mt-4 text-[clamp(6rem,15vw,13rem)] leading-[0.85]"
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            whileInView={{ clipPath: "inset(0 0% 0 0)" }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 1.8, ease: [0.45, 0, 0.25, 1] }}
          >
            {artist.name}
          </motion.p>
          <Reveal delay={0.2}>
            <p className="mt-6 font-display text-2xl font-[350] leading-snug md:text-3xl">{artist.intro}</p>
            <p className="mt-6 max-w-lg leading-relaxed text-ink/65">{artist.bio[1]}</p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {artist.specialties.map((s) => (
                <li key={s} className="eyebrow rounded-full border border-stencil/40 px-3 py-1.5 text-stencil">
                  {styleName(s)}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-3">
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

/** Real Google review excerpts, pinned up like notes. */
export function ReviewNotes() {
  const tilt = [-3, 2, -1.5];
  return (
    <section className="container-x relative py-28 md:py-40" aria-labelledby="reviews-title">
      <div className="grid gap-10 md:grid-cols-12 md:items-end">
        <div className="md:col-span-6">
          <p className="eyebrow text-graphite">
            <span className="text-stencil">06</span> — Kind words
          </p>
          <h2 id="reviews-title" className="mt-6 flex items-end gap-5">
            <span className="font-display text-[clamp(6rem,14vw,12rem)] font-[350] leading-[0.8] tracking-[-0.04em]">{site.rating.value}</span>
            <span className="sr-only">out of 5 on Google</span>
          </h2>
        </div>
        <div className="md:col-span-5 md:col-start-8">
          <Annotation arrow="left" arrowClassName="-left-24 top-0" rotate={-2}>
            out of 5 — from {site.rating.count}+ Google reviews
          </Annotation>
        </div>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-3">
        {reviews.map((r, i) => (
          <motion.figure
            key={r.name}
            className="print relative flex min-h-64 flex-col justify-between p-8"
            style={{ rotate: tilt[i] }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 1, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ rotate: 0, y: -6 }}
          >
            <span className="tape -top-3 left-1/2 -translate-x-1/2" aria-hidden />
            <blockquote className="font-display text-2xl font-[350] italic leading-snug md:text-[1.7rem]">“{r.text}”</blockquote>
            <figcaption className="mt-8 flex items-center justify-between">
              <span className="hand text-3xl text-ink">— {r.name}</span>
              <span className="text-stencil" aria-label="5 stars">★★★★★</span>
            </figcaption>
          </motion.figure>
        ))}
      </div>

      <a href={reviewsLink} target="_blank" rel="noreferrer" className="eyebrow mt-12 inline-block border-b border-stencil pb-1 text-stencil">
        Read every review on Google ↗
      </a>
    </section>
  );
}

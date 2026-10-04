"use client";

import { AnimatePresence, motion, useInView, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { RevealText } from "@/components/ui/RevealText";
import { artists } from "@/content/artists";
import { reviews } from "@/content/copy";
import { reviewsLink, site, whatsappLink } from "@/content/site";
import { styleName, workBySlug } from "@/content/work";
import { ease } from "@/lib/utils";

/** Full-bleed parallax image with the artist's name set large over it. */
export function ArtistFeature() {
  const artist = artists[0];
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const piece = workBySlug("gemini")!;

  return (
    <section ref={ref} className="relative flex min-h-[100svh] items-end overflow-hidden" aria-label="Our artist">
      <motion.div style={{ y }} className="absolute inset-[-15%_0]">
        <Image src={artist.cover} alt={`Work by ${artist.name}`} fill sizes="100vw" className="object-cover" placeholder="blur" />
      </motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgb(10_10_9/0.95)_5%,rgb(10_10_9/0.35)_55%,rgb(10_10_9/0.6)_100%)]" />

      <div className="container-x relative grid w-full gap-10 pb-16 md:grid-cols-12 md:items-end md:pb-20">
        <div className="md:col-span-8">
          <p className="eyebrow text-bone/70">{artist.role}</p>
          <RevealText as="h2" text={`*${artist.name}*`} className="mt-4 font-display text-[clamp(5rem,17vw,17rem)] leading-[0.8] tracking-[-0.04em]" />
        </div>
        <div className="md:col-span-4">
          <p className="text-lg leading-relaxed text-bone/80">{artist.intro}</p>
          <p className="eyebrow mt-6 text-ash">{artist.specialties.map(styleName).join(" · ")}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={`/artists/${artist.slug}`}>Meet {artist.name}</ButtonLink>
          </div>
        </div>
      </div>

      <div className="absolute right-[var(--gutter)] top-28 hidden w-40 overflow-hidden lg:block">
        <div className="relative aspect-[3/4]">
          <Image src={piece.image} alt={piece.title} fill sizes="160px" className="object-cover" />
        </div>
        <p className="eyebrow mt-3 text-bone/60">{piece.title}</p>
      </div>
    </section>
  );
}

/** One review at a time, large and quiet. */
export function ReviewQuote() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const id = setTimeout(() => setI((v) => (v + 1) % reviews.length), 6000);
    return () => clearTimeout(id);
  }, [inView, i]);

  const r = reviews[i];

  return (
    <section ref={ref} className="container-x py-32 text-center md:py-48" aria-label="Client reviews">
      <p className="eyebrow text-ash">
        <span className="text-copper">{"★".repeat(5)}</span>&nbsp;&nbsp;{site.rating.value} from {site.rating.count}+ Google reviews
      </p>
      <div className="relative mx-auto mt-12 grid min-h-[14rem] max-w-5xl place-items-center md:min-h-[18rem]">
        <AnimatePresence mode="wait">
          <motion.figure
            key={i}
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -24, filter: "blur(8px)" }}
            transition={{ duration: 0.9, ease: ease.expo }}
          >
            <blockquote className="font-display text-[clamp(2.2rem,5vw,4.75rem)] leading-[1.05] tracking-[-0.01em]">
              <span className="text-copper">“</span>
              {r.text}
              <span className="text-copper">”</span>
            </blockquote>
            <figcaption className="eyebrow mt-10 text-bone">— {r.name}</figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>
      <div className="mt-12 flex items-center justify-center gap-3">
        {reviews.map((_, j) => (
          <button
            key={j}
            type="button"
            onClick={() => setI(j)}
            aria-label={`Show review ${j + 1}`}
            aria-current={j === i}
            className="group p-2"
          >
            <span className={`block h-1.5 rounded-full transition-all duration-500 ${j === i ? "w-8 bg-copper" : "w-1.5 bg-bone/30 group-hover:bg-bone/60"}`} />
          </button>
        ))}
      </div>
      <a href={reviewsLink} target="_blank" rel="noreferrer" className="eyebrow mt-10 inline-block text-ash transition-colors hover:text-copper">
        Read them all on Google ↗
      </a>
    </section>
  );
}

/** Closing frame: a darkened full-bleed piece with one call to action. */
export function CinematicCTA() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.25, 1]);
  const clip = useTransform(scrollYProgress, [0, 0.8], ["inset(12% 8% 12% 8%)", "inset(0% 0% 0% 0%)"]);
  const piece = workBySlug("koi")!;

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[560px]" aria-label="Book a session">
      <motion.div style={{ clipPath: clip }} className="absolute inset-0 overflow-hidden">
        <motion.div style={{ scale }} className="absolute inset-0">
          <Image src={piece.image} alt="" fill sizes="100vw" className="object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-ink/70" />
      </motion.div>

      <div className="container-x relative flex h-full flex-col items-center justify-center text-center">
        <p className="eyebrow text-bone/70">Your turn</p>
        <RevealText
          as="h2"
          text="Let's make something *permanent.*"
          className="mt-6 max-w-[14ch] font-display text-[clamp(3rem,8vw,8.5rem)] leading-[0.92] tracking-[-0.03em]"
        />
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <Magnetic>
            <ButtonLink href="/book">Book a session</ButtonLink>
          </Magnetic>
          <ButtonLink href={whatsappLink("Hi Eden Tattoos! I'd like to know more about getting a tattoo.")} variant="outline">
            WhatsApp us
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

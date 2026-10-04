"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import Image, { getImageProps } from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { RevealText } from "@/components/ui/RevealText";
import { site } from "@/content/site";
import { work } from "@/content/work";
import { useIntroDone } from "@/lib/intro";
import { ease } from "@/lib/utils";
import { ImageTrail } from "./ImageTrail";

const trailWork = work.slice(0, 12);

/** Small auto-cycling stack shown in place of the cursor trail on touch screens. */
function MobileStack() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % trailWork.length), 2400);
    return () => clearInterval(id);
  }, []);
  const item = trailWork[i];
  return (
    <div className="relative aspect-[4/5] w-[44vw] max-w-[220px] overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.div
          key={item.slug}
          className="absolute inset-0"
          initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ opacity: 0.4 }}
          transition={{ duration: 1.1, ease: ease.inout }}
        >
          <Image src={item.image} alt={item.title} fill sizes="220px" className="object-cover" placeholder="blur" />
        </motion.div>
      </AnimatePresence>
      <span className="eyebrow absolute bottom-2 left-2 z-10 text-bone mix-blend-difference">{item.title}</span>
    </div>
  );
}

export function Hero() {
  const ready = useIntroDone();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const wordY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const trailSrcs = useMemo(
    () => trailWork.map((w) => getImageProps({ src: w.image, alt: "", width: 320, quality: 75 }).props.src),
    [],
  );

  return (
    <section ref={ref} className="relative flex h-[100svh] min-h-[640px] flex-col overflow-hidden" aria-label="Introduction">
      <ImageTrail images={trailSrcs} className="absolute inset-0 z-0 hidden md:block" />

      {/* Meta row */}
      <motion.div style={{ opacity: fade }} className="container-x pointer-events-none relative z-10 grid grid-cols-2 gap-4 pt-28 md:grid-cols-12 md:pt-32">
        <motion.p
          className="eyebrow col-span-1 text-ash md:col-span-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: ready ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          (Tattoo &amp; Piercing)
          <br />
          <span className="text-bone">Studio — {site.city}</span>
        </motion.p>
        <motion.p
          className="eyebrow col-span-1 text-right text-ash md:col-span-4 md:col-start-5 md:text-left"
          initial={{ opacity: 0 }}
          animate={{ opacity: ready ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          Ornamental · Mandala
          <br />
          <span className="text-bone">Fine-line · Spiritual</span>
        </motion.p>
        <motion.p
          className="eyebrow hidden text-right text-ash md:col-span-3 md:col-start-10 md:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: ready ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {site.rating.value}★ Google
          <br />
          <span className="text-bone">{site.rating.count}+ reviews</span>
        </motion.p>
      </motion.div>

      {/* Center copy */}
      <div className="container-x pointer-events-none relative z-10 mt-auto grid gap-8 md:grid-cols-12 md:items-end">
        <div className="md:col-span-5 md:col-start-8 md:pb-6">
          <RevealText
            as="p"
            play={ready}
            delay={0.35}
            stagger={0.025}
            text="Every piece is drawn from scratch — for *one* person, for *one* body. Ink with intent, made to age beautifully."
            className="max-w-md text-xl leading-snug text-bone/85 md:text-2xl"
          />
          <motion.div
            className="pointer-events-auto mt-8 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: ease.expo, delay: 0.9 }}
          >
            <Magnetic>
              <ButtonLink href="/book">Book a session</ButtonLink>
            </Magnetic>
            <ButtonLink href="/work" variant="outline">
              View the work
            </ButtonLink>
          </motion.div>
        </div>
        <div className="flex justify-end md:hidden">
          <MobileStack />
        </div>
      </div>

      {/* Wordmark */}
      <motion.div style={{ y: wordY }} className="pointer-events-none relative z-10 mt-6 px-[1.5vw] mix-blend-difference">
        <h1 className="flex items-end justify-between leading-[0.74]">
          <span className="sr-only">Eden Tattoos — custom tattoo studio in Chandigarh</span>
          <span aria-hidden className="flex font-display text-[38vw] tracking-[-0.045em] md:text-[min(34vw,60svh)]">
            {"Eden".split("").map((ch, i) => (
              <span key={i} className="inline-block overflow-hidden pb-[0.04em]">
                <motion.span
                  className="inline-block"
                  initial={{ y: "100%" }}
                  animate={{ y: ready ? "0%" : "100%" }}
                  transition={{ duration: 1.4, ease: ease.expo, delay: 0.05 + i * 0.08 }}
                >
                  {ch}
                </motion.span>
              </span>
            ))}
          </span>
          <span aria-hidden className="mb-[3.2vw] hidden overflow-hidden md:block">
            <motion.span
              className="block font-display text-[6.5vw] italic leading-none text-bone"
              initial={{ y: "100%" }}
              animate={{ y: ready ? "0%" : "100%" }}
              transition={{ duration: 1.2, ease: ease.expo, delay: 0.45 }}
            >
              Tattoos
            </motion.span>
          </span>
        </h1>
      </motion.div>

      <motion.div
        style={{ opacity: fade }}
        className="container-x pointer-events-none absolute left-0 top-[44%] z-10 hidden md:block"
      >
        <motion.span
          className="eyebrow block text-ash"
          initial={{ opacity: 0 }}
          animate={{ opacity: ready ? 0.8 : 0 }}
          transition={{ delay: 1.4, duration: 1 }}
        >
          ( Move to explore the work )
        </motion.span>
      </motion.div>
    </section>
  );
}

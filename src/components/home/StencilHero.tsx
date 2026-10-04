"use client";

import { motion, useMotionTemplate, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { RevealText } from "@/components/ui/RevealText";
import { Annotation } from "@/components/stencil/Annotation";
import { Mandala } from "@/components/stencil/Mandala";
import { site } from "@/content/site";
import { workBySlug } from "@/content/work";
import { ease } from "@/lib/utils";

const piece = workBySlug("mandala-sleeve")!;

/**
 * "From stencil to skin": a mandala traces itself in stencil violet. Scrolling turns the
 * lines to ink, then the finished tattoo opens out of the mandala's centre to fill the screen.
 */
export function StencilHero() {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const mark = useRef<HTMLDivElement>(null);
  const [geo, setGeo] = useState({ cx: 0, cy: 0, start: 0, end: 2000 });

  // Where the mandala sits on screen, so the photo can grow out of its exact centre.
  useEffect(() => {
    const measure = () => {
      if (!stage.current || !mark.current) return;
      const s = stage.current.getBoundingClientRect();
      const m = mark.current.getBoundingClientRect();
      const cx = m.left - s.left + m.width / 2;
      const cy = m.top - s.top + m.height / 2;
      const end = Math.hypot(Math.max(cx, s.width - cx), Math.max(cy, s.height - cy)) + 40;
      setGeo({ cx, cy, start: m.width * 0.07, end });
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (stage.current) ro.observe(stage.current);
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress: p } = useScroll({ target: section, offset: ["start start", "end end"] });

  const stroke = useTransform(p, [0.02, 0.22], ["#4a3ad0", "#161412"]);
  const markScale = useTransform(p, [0, 0.5], [1, 1.12]);
  const markRotate = useTransform(p, [0, 1], [0, 40]);
  const noteOpacity = useTransform(p, [0, 0.08], [1, 0]);

  const radius = useTransform(p, [0.24, 0.72], [0, geo.end]);
  const reveal = useMotionTemplate`circle(${radius}px at ${geo.cx}px ${geo.cy}px)`;
  const photoScale = useTransform(p, [0.24, 1], [1.35, 1]);
  const photoOpacity = useTransform(p, [0.22, 0.26], [0, 1]);

  const outroOpacity = useTransform(p, [0.62, 0.78], [0, 1]);
  const outroY = useTransform(p, [0.62, 0.82], [40, 0]);

  return (
    <section ref={section} className="relative h-[290vh]" aria-label="Eden Tattoos — from stencil to skin">
      <div ref={stage} className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Paper layer */}
        <div className="container-x relative grid h-full grid-rows-[auto_1fr_auto] gap-4 pb-6 pt-28 md:grid-cols-12 md:grid-rows-[1fr_auto] md:items-center md:gap-8 md:pt-24">
          <div className="relative z-10 md:col-span-6 md:row-start-1">
            <motion.p
              className="eyebrow text-graphite"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Tattoo &amp; piercing studio — {site.city}
            </motion.p>
            <RevealText
              as="h1"
              play
              delay={0.25}
              stagger={0.1}
              text={"From *stencil*\nto skin."}
              className="mt-5 font-display text-[clamp(3.6rem,10.5vw,10rem)] font-[350] leading-[0.88] tracking-[-0.035em] [font-variation-settings:'SOFT'_100,'WONK'_1]"
            />
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: ease.expo, delay: 0.9 }}
            >
              <p className="mt-7 hidden max-w-md text-lg leading-relaxed text-ink/70 sm:block">
                Ornamental, mandala and fine-line tattoos — drawn by hand, for one person and one body.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3 md:mt-9">
                <Magnetic>
                  <ButtonLink href="/book">Book a session</ButtonLink>
                </Magnetic>
                <ButtonLink href="/work" variant="outline">
                  See the work
                </ButtonLink>
              </div>
            </motion.div>
          </div>

          <div className="relative flex items-center justify-center md:col-span-6 md:row-start-1">
            <motion.div ref={mark} style={{ scale: markScale, rotate: markRotate }} className="aspect-square w-[min(74vw,46svh)] md:w-[min(42vw,72svh)]">
              <Mandala stroke={stroke} className="h-full w-full" />
            </motion.div>
            <motion.div style={{ opacity: noteOpacity }} className="absolute -bottom-2 -left-10 hidden md:block">
              <Annotation arrow="up-right" arrowClassName="-right-20 -top-12" delay={2.6} rotate={-5}>
                every piece starts
                <br />
                as a stencil
              </Annotation>
            </motion.div>
          </div>

          <motion.div
            style={{ opacity: noteOpacity }}
            className="flex items-end justify-between gap-4 md:col-span-12 md:row-start-2"
          >
            <p className="eyebrow hidden text-graphite sm:block">
              <span className="text-ink">{site.rating.value}★</span> Google · {site.rating.count}+ reviews
            </p>
            <motion.p
              className="hand ml-auto text-xl md:text-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.2, duration: 1 }}
            >
              scroll to transfer the stencil ↓
            </motion.p>
          </motion.div>
        </div>

        {/* Skin layer — the finished tattoo grows out of the mandala */}
        <motion.div
          className="theme-ink absolute inset-0 z-20"
          style={{ clipPath: reveal, WebkitClipPath: reveal, opacity: photoOpacity }}
        >
          <motion.div style={{ scale: photoScale }} className="absolute inset-0">
            <Image src={piece.image} alt={piece.title} fill sizes="100vw" className="object-cover" style={{ objectPosition: "50% 45%" }} />
          </motion.div>
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgb(17_16_14/0.88)_0%,rgb(17_16_14/0.15)_50%,rgb(17_16_14/0.3)_100%)]" />

          <motion.div style={{ opacity: outroOpacity, y: outroY }} className="container-x absolute inset-x-0 bottom-0 pb-10 md:pb-14">
            <p className="hand text-3xl">…and then, skin.</p>
            <p className="mt-3 max-w-4xl font-display text-[clamp(2.6rem,6.5vw,6.5rem)] font-[350] leading-[0.95] tracking-[-0.03em]">
              Every line drawn <span className="italic text-stencil">for one</span> body.
            </p>
            <p className="eyebrow mt-6 text-graphite">
              {piece.title} — {piece.placement}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

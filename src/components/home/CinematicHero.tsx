"use client";

import { AnimatePresence, motion, useInView, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { RevealText } from "@/components/ui/RevealText";
import { site } from "@/content/site";
import { styleName, workBySlug } from "@/content/work";
import { useMediaQuery } from "@/lib/hooks";
import { useIntroDone } from "@/lib/intro";
import { ease } from "@/lib/utils";

const DURATION = 6; // seconds per frame

// High-resolution pieces only, with a focal point so landscape crops keep the tattoo in frame.
const frames = [
  { slug: "shiva-tandava", focus: "50% 40%" },
  { slug: "mandala-sleeve", focus: "50% 45%" },
  { slug: "tiger-eyes", focus: "50% 50%" },
  { slug: "butterfly-sternum", focus: "50% 42%" },
  { slug: "memento-mori", focus: "50% 35%" },
  { slug: "koi", focus: "50% 48%" },
  { slug: "filigree-forearm", focus: "50% 45%" },
  { slug: "why-so-serious", focus: "50% 38%" },
].map((f) => ({ ...f, item: workBySlug(f.slug)! }));

const pad = (n: number) => String(n).padStart(2, "0");

export function CinematicHero() {
  const ready = useIntroDone();
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const [{ index, stamp }, setFrame] = useState({ index: 0, stamp: 0 });

  const go = (i: number) => setFrame((f) => ({ index: (i + frames.length) % frames.length, stamp: f.stamp + 1 }));

  // Autoplay only while the hero is on screen and the intro has finished.
  useEffect(() => {
    if (!ready || !inView) return;
    const id = setTimeout(() => setFrame((f) => ({ index: (f.index + 1) % frames.length, stamp: f.stamp + 1 })), DURATION * 1000);
    return () => clearTimeout(id);
  }, [ready, inView, stamp]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const frame = frames[index];

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[560px] overflow-hidden bg-ink" aria-label="Eden Tattoos">
      {/* Frames */}
      <motion.div style={{ scale: imgScale }} className="absolute inset-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={stamp}
            className="absolute inset-0"
            style={{ zIndex: stamp }}
            initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ opacity: 1, transition: { duration: 1.4 } }}
            transition={{ duration: 1.4, ease: ease.inout }}
          >
            <motion.div
              className="absolute inset-0"
              initial={{ scale: reduced ? 1 : 1.18 }}
              animate={{ scale: 1 }}
              transition={{ duration: DURATION + 1.5, ease: [0.2, 0.6, 0.35, 1] }}
            >
              <Image
                src={frame.item.image}
                alt={frame.item.title}
                fill
                priority={index === 0}
                sizes="100vw"
                quality={75}
                placeholder="blur"
                className="object-cover"
                style={{ objectPosition: frame.focus }}
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Shade for legibility */}
      <div className="pointer-events-none absolute inset-0 z-[1000] bg-[linear-gradient(to_bottom,rgb(10_10_9/0.55)_0%,rgb(10_10_9/0)_30%,rgb(10_10_9/0)_45%,rgb(10_10_9/0.9)_100%)]" />

      {/* Copy */}
      <motion.div style={{ y: contentY, opacity: fade }} className="container-x absolute inset-x-0 bottom-0 z-[1001] pb-8 md:pb-10">
        <motion.p
          className="eyebrow mb-6 text-bone/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: ready ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          Tattoo &amp; piercing studio — {site.city}
        </motion.p>
        <RevealText
          as="h1"
          play={ready}
          delay={0.2}
          stagger={0.09}
          text="Ink, drawn *for one.*"
          className="font-display text-[clamp(3.4rem,10vw,10rem)] leading-[0.9] tracking-[-0.03em]"
        />

        {/* Progress bar */}
        <motion.div
          className="mt-10 grid grid-cols-[auto_1fr_auto] items-center gap-6 md:mt-14 md:grid-cols-[auto_1fr_auto_auto] md:gap-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: ready ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          <span className="eyebrow tabular-nums text-bone">
            {pad(index + 1)} <span className="text-ash">/ {pad(frames.length)}</span>
          </span>

          <div className="flex gap-1.5" role="tablist" aria-label="Featured pieces">
            {frames.map((f, i) => (
              <button
                key={f.slug}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Show ${f.item.title}`}
                onClick={() => go(i)}
                className="group relative h-6 flex-1"
              >
                <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-bone/20 transition-colors group-hover:bg-bone/50" />
                {i === index && (
                  <motion.span
                    key={stamp}
                    className="absolute inset-x-0 top-1/2 h-px origin-left -translate-y-1/2 bg-copper"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: ready && inView ? 1 : 0 }}
                    transition={{ duration: ready && inView ? DURATION : 0, ease: "linear" }}
                  />
                )}
                {i < index && <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-bone/60" />}
              </button>
            ))}
          </div>

          <div className="relative hidden h-5 w-56 overflow-hidden md:block">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.div
                key={frame.slug}
                className="eyebrow absolute inset-0 flex items-center justify-end gap-3 text-right"
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                exit={{ y: "-100%" }}
                transition={{ duration: 0.7, ease: ease.expo }}
              >
                <span className="text-bone">{frame.item.title}</span>
                <span className="text-ash">{styleName(frame.item.styles[0])}</span>
              </motion.div>
            </AnimatePresence>
          </div>

          <Link href="#statement" className="eyebrow flex items-center gap-3 text-bone/70 transition-colors hover:text-copper">
            <span className="hidden sm:inline">Scroll</span>
            <span className="relative block h-8 w-px overflow-hidden bg-bone/20">
              <motion.span
                className="absolute inset-x-0 top-0 h-1/2 bg-copper"
                animate={{ y: ["-100%", "200%"] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: ease.inout }}
              />
            </span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

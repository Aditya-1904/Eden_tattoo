"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { site } from "@/content/site";

const TEXT =
  "We listen first, draw from scratch, and place every line where your body wants it — *ornamental* filigree, *sacred* geometry and devotional pieces, made to age beautifully.";

function Word({ text, progress, range, emph }: { text: string; progress: MotionValue<number>; range: [number, number]; emph: boolean }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className={emph ? "italic text-copper" : undefined}>
      {text}{" "}
    </motion.span>
  );
}

/** One quiet, centred statement that brightens word by word as it scrolls through. */
export function Statement() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.5"] });
  const words = TEXT.split(" ");

  return (
    <section id="statement" className="container-x scroll-mt-0 py-32 md:py-52" aria-label="About the studio">
      <p className="eyebrow text-center text-ash">
        <span className="text-copper">✦</span>&nbsp;&nbsp;Eden Tattoos — {site.city}
      </p>
      <p ref={ref} className="mx-auto mt-10 max-w-5xl text-center font-display text-[clamp(2rem,4.2vw,4.25rem)] leading-[1.08] tracking-[-0.01em]">
        {words.map((w, i) => (
          <Word
            key={i}
            text={w.replace(/\*/g, "")}
            emph={w.startsWith("*")}
            progress={scrollYProgress}
            range={[i / words.length, (i + 1) / words.length]}
          />
        ))}
      </p>
      <dl className="eyebrow mx-auto mt-16 flex max-w-2xl flex-wrap items-center justify-center gap-x-10 gap-y-4 text-ash">
        <div className="flex gap-2">
          <dt className="sr-only">Google rating</dt>
          <dd><span className="text-bone">{site.rating.value}★</span> on Google</dd>
        </div>
        <span aria-hidden className="h-px w-8 bg-line" />
        <div className="flex gap-2">
          <dt className="sr-only">Reviews</dt>
          <dd><span className="text-bone">{site.rating.count}+</span> reviews</dd>
        </div>
        <span aria-hidden className="h-px w-8 bg-line" />
        <div className="flex gap-2">
          <dt className="sr-only">Instagram</dt>
          <dd><span className="text-bone">{site.instagram.followers}</span> on Instagram</dd>
        </div>
      </dl>
    </section>
  );
}

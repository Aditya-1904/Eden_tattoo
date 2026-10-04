"use client";

import { motion, useMotionTemplate, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

function Words({ className }: { className?: string }) {
  return (
    <p className={className}>
      Now, <span className="italic text-stencil">the work.</span>
    </p>
  );
}

/**
 * Bridge into the dark portfolio: a pool of ink spreads from the centre of the page,
 * inverting the headline as its soft edge passes over it.
 */
export function InkFlood() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const r = useTransform(p, [0.05, 0.85], [0, 120]);
  const mask = useMotionTemplate`radial-gradient(circle at 50% 55%, #000 ${r}vmax, transparent calc(${r}vmax + 6vmax))`;
  const textScale = useTransform(p, [0, 1], [0.9, 1.05]);

  const text = "font-display text-[clamp(3.5rem,12vw,12rem)] font-[350] leading-none tracking-[-0.04em] text-center";

  return (
    <section ref={ref} className="relative h-[180vh]" aria-label="Portfolio">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div style={{ scale: textScale }} className="absolute inset-0 grid place-items-center">
          <Words className={text} />
        </motion.div>
        <motion.div
          aria-hidden
          className="theme-ink absolute inset-0"
          style={{ maskImage: mask, WebkitMaskImage: mask }}
        >
          <motion.div style={{ scale: textScale }} className="absolute inset-0 grid place-items-center">
            <Words className={text} />
          </motion.div>
        </motion.div>
        <p className="hand absolute bottom-10 left-1/2 -translate-x-1/2 text-2xl">keep going ↓</p>
      </div>
    </section>
  );
}

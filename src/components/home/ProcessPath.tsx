"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { process } from "@/content/copy";

// Simple line icons, drawn on like everything else in the stencil system.
const icons = [
  // Consult — speech bubble
  ["M10 14h44a4 4 0 0 1 4 4v22a4 4 0 0 1-4 4H30l-12 10V44h-8a4 4 0 0 1-4-4V18a4 4 0 0 1 4-4z", "M18 26h28", "M18 33h18"],
  // Design — pencil
  ["M14 50l4-14L44 10l10 10-26 26z", "M38 16l10 10", "M18 36l10 10"],
  // Session — ink drop
  ["M32 8C24 22 16 30 16 40a16 16 0 0 0 32 0C48 30 40 22 32 8z", "M24 41a8 8 0 0 0 8 8"],
  // Heal — leaf
  ["M12 52C12 28 28 12 52 12c0 24-16 40-40 40z", "M12 52L38 26", "M26 38h8", "M32 32v-8"],
];

const NODE_X = [125, 375, 625, 875];

function Node({ x, progress, at }: { x: number; progress: MotionValue<number>; at: number }) {
  const scale = useTransform(progress, [at - 0.04, at + 0.02], [0, 1]);
  return (
    <motion.span
      style={{ scale, left: `${x / 10}%` }}
      className="absolute top-[60px] block h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-stencil ring-4 ring-paper"
    />
  );
}

/** Four steps joined by a wandering hand-drawn line that traces itself as you scroll. */
export function ProcessPath() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.55"] });
  const length = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={ref} className="container-x relative py-28 md:py-40" aria-labelledby="process-title">
      <div className="grid gap-8 md:grid-cols-12 md:items-end">
        <div className="md:col-span-8">
          <p className="eyebrow text-graphite">
            <span className="text-stencil">04</span> — Process
          </p>
          <h2 id="process-title" className="mt-6 font-display text-[clamp(3rem,6vw,6rem)] font-[350] leading-[0.92] tracking-[-0.03em]">
            How a piece <span className="italic text-stencil">comes to life</span>
          </h2>
        </div>
        <p className="leading-relaxed text-ink/70 md:col-span-3 md:col-start-10">
          Four unhurried steps. You&apos;ll always know what happens next — and why.
        </p>
      </div>

      <div className="relative mt-20">
        <svg viewBox="0 0 1000 120" className="absolute inset-x-0 top-0 hidden h-[120px] w-full md:block" fill="none" preserveAspectRatio="none" aria-hidden>
          <path
            d="M20 70 C 70 20, 110 100, 125 60 S 260 10, 375 60 S 520 115, 625 60 S 780 5, 875 60 S 960 95, 990 50"
            className="stroke-line"
            strokeWidth={2}
            strokeDasharray="2 8"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <motion.path
            d="M20 70 C 70 20, 110 100, 125 60 S 260 10, 375 60 S 520 115, 625 60 S 780 5, 875 60 S 960 95, 990 50"
            className="stroke-stencil"
            strokeWidth={2.2}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            style={{ pathLength: length }}
          />
        </svg>
        <div className="absolute inset-x-0 top-0 hidden md:block" aria-hidden>
          {NODE_X.map((x, i) => (
            <Node key={x} x={x} progress={length} at={[0.13, 0.37, 0.62, 0.87][i]} />
          ))}
        </div>

        <ol className="grid gap-14 md:grid-cols-4 md:gap-8 md:pt-40">
          {process.map((step, i) => (
            <motion.li
              key={step.no}
              className="relative border-l hairline pl-6 md:border-l-0 md:pl-0 md:text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.9, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <svg viewBox="0 0 64 64" className="h-14 w-14 text-ink md:mx-auto" fill="none" aria-hidden>
                {icons[i].map((d, j) => (
                  <motion.path
                    key={j}
                    d={d}
                    stroke="currentColor"
                    strokeWidth={1.8}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, delay: 0.3 + i * 0.12 + j * 0.25, ease: "easeInOut" }}
                  />
                ))}
              </svg>
              <p className="hand mt-6 text-4xl">{step.no}.</p>
              <h3 className="mt-2 font-display text-4xl font-[350] italic">{step.title}</h3>
              <p className="mx-auto mt-4 max-w-xs leading-relaxed text-ink/65">{step.text}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

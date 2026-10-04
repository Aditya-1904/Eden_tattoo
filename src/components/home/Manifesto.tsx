"use client";

import { animate, motion, useInView, useScroll, useTransform, type MotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";

const TEXT =
  "A tattoo is more than ink. It is a story you carry for life — so we treat it like one. We listen first, draw from scratch, and place every line where your body wants it. *Ornamental* filigree, *sacred* geometry, devotional pieces and quiet fine-line — made to be worn, and to age *beautifully*.";

function Word({ children, progress, range, emph }: { children: string; progress: MotionValue<number>; range: [number, number]; emph: boolean }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className={emph ? "font-display italic text-copper" : undefined}>
      {children}{" "}
    </motion.span>
  );
}

function Counter({ to, decimals = 0, suffix = "" }: { to: number; decimals?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 2, ease: [0.16, 1, 0.3, 1], onUpdate: setVal });
    return () => c.stop();
  }, [inView, to]);
  return (
    <span ref={ref} className="tabular-nums">
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = TEXT.split(" ");

  const followers = parseFloat(site.instagram.followers);

  return (
    <section className="container-x relative py-32 md:py-48" aria-labelledby="manifesto-label">
      <div className="grid gap-10 md:grid-cols-12">
        <p id="manifesto-label" className="eyebrow text-ash md:col-span-3">
          <span className="text-copper">(01)</span> — The studio
        </p>
        <p ref={ref} className="font-display text-[clamp(2rem,4.4vw,4.6rem)] leading-[1.05] tracking-[-0.01em] md:col-span-9">
          {words.map((w, i) => {
            const emph = w.startsWith("*");
            const clean = w.replace(/\*/g, "");
            const start = i / words.length;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, start + 1 / words.length]} emph={emph}>
                {clean}
              </Word>
            );
          })}
        </p>
      </div>

      <dl className="mt-24 grid grid-cols-1 border-t hairline sm:grid-cols-3 md:mt-36">
        {[
          { label: "Google rating", value: <Counter to={site.rating.value} decimals={1} suffix="★" /> },
          { label: "Reviews from clients", value: <Counter to={site.rating.count} suffix="+" /> },
          { label: "Community on Instagram", value: <Counter to={followers} decimals={1} suffix="K" /> },
        ].map((s, i) => (
          <div key={s.label} className="flex items-end justify-between gap-4 border-b hairline py-8 sm:flex-col sm:items-start sm:border-b-0 sm:border-r sm:px-8 sm:first:pl-0 sm:last:border-r-0">
            <dt className="eyebrow order-2 text-ash sm:order-1">
              <span className="text-copper">0{i + 1}</span> {s.label}
            </dt>
            <dd className="order-1 font-display text-6xl leading-none md:text-8xl sm:order-2 sm:mt-6">{s.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

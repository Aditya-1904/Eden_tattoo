"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { process } from "@/content/copy";
import { workBySlug } from "@/content/work";

const images = ["filigree-forearm", "gemini", "krishna-radha", "chakra-mandala"].map((s) => workBySlug(s)!);

/** Pinned horizontal scroll through the four steps (vertical stack on small screens). */
export function Process() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (!track.current) return;
      setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <>
      {/* Desktop: pinned horizontal */}
      <section
        ref={section}
        className="relative hidden md:block"
        style={{ height: distance ? `calc(100svh + ${distance}px)` : "300vh" }}
        aria-label="Our process"
      >
        <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
          <motion.div ref={track} style={{ x }} className="flex w-max items-stretch gap-[4vw] pl-[var(--gutter)] pr-[10vw]">
            <div className="flex w-[34vw] shrink-0 flex-col justify-between py-4">
              <p className="eyebrow text-ash">
                <span className="text-copper">(05)</span> — Process
              </p>
              <h2 className="font-display text-giant leading-[0.88] tracking-[-0.03em]">
                From idea
                <br />
                to <span className="italic text-copper">healed</span>
              </h2>
              <p className="max-w-sm text-bone/60">
                Four unhurried steps. You&apos;ll always know what happens next — and why.
              </p>
            </div>
            {process.map((step, i) => (
              <article key={step.no} className="group flex h-[70svh] w-[56vw] shrink-0 gap-8 border-l hairline pl-8 lg:w-[46vw]">
                <div className="flex flex-1 flex-col justify-between">
                  <span className="font-display text-[11vw] leading-[0.8] text-bone/10 transition-colors duration-700 group-hover:text-copper/40">
                    {step.no}
                  </span>
                  <div>
                    <h3 className="font-display text-6xl italic">{step.title}</h3>
                    <p className="mt-4 max-w-sm leading-relaxed text-bone/65">{step.text}</p>
                  </div>
                </div>
                <div className="relative w-[42%] self-end overflow-hidden" style={{ aspectRatio: "3/4" }}>
                  <Image src={images[i].image} alt={images[i].title} fill sizes="20vw" className="object-cover grayscale transition-[filter,transform] duration-1000 group-hover:scale-105 group-hover:grayscale-0" />
                </div>
              </article>
            ))}
          </motion.div>

          <div className="container-x absolute inset-x-0 bottom-10 flex items-center gap-6">
            <span className="eyebrow text-ash">01</span>
            <div className="relative h-px flex-1 bg-line">
              <motion.div style={{ scaleX: progress }} className="absolute inset-0 origin-left bg-copper" />
            </div>
            <span className="eyebrow text-ash">04</span>
          </div>
        </div>
      </section>

      {/* Mobile: stacked */}
      <section className="container-x py-24 md:hidden" aria-label="Our process">
        <p className="eyebrow text-ash">
          <span className="text-copper">(05)</span> — Process
        </p>
        <h2 className="mt-6 font-display text-6xl leading-[0.9]">
          From idea to <span className="italic text-copper">healed</span>
        </h2>
        <ol className="mt-12 border-t hairline">
          {process.map((step) => (
            <li key={step.no} className="grid grid-cols-[auto_1fr] gap-6 border-b hairline py-8">
              <span className="font-display text-5xl leading-none text-copper/70">{step.no}</span>
              <div>
                <h3 className="font-display text-4xl italic">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-bone/65">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}

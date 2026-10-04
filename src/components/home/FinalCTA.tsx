"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useRef } from "react";
import { Magnetic } from "@/components/ui/Magnetic";
import { RevealText } from "@/components/ui/RevealText";

export function FinalCTA({ title = "Let's make something *permanent.*" }: { title?: string }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [-90, 0]);

  return (
    <section ref={ref} className="container-x relative py-28 md:py-44" aria-label="Book a session">
      <div className="flex flex-col items-start gap-14 md:flex-row md:items-end md:justify-between">
        <RevealText as="h2" text={title} className="max-w-[12ch] font-display text-giant leading-[0.88] tracking-[-0.03em]" />
        <Magnetic strength={0.4}>
          <Link
            href="/book"
            data-cursor="Book"
            className="group relative flex h-44 w-44 items-center justify-center rounded-full bg-copper text-ink transition-transform duration-700 ease-expo hover:scale-105 md:h-60 md:w-60"
          >
            <motion.svg style={{ rotate }} viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" aria-hidden>
              <defs>
                <path id="cta-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
              </defs>
              <text className="fill-ink font-mono text-[10.5px] uppercase tracking-[0.32em]">
                <textPath href="#cta-circle" textLength={486} lengthAdjust="spacing">Book a session · Start your enquiry · </textPath>
              </text>
            </motion.svg>
            <span className="font-display text-4xl italic md:text-5xl">Book</span>
          </Link>
        </Magnetic>
      </div>
    </section>
  );
}

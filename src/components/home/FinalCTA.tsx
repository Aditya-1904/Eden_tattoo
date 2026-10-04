"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useRef } from "react";
import { Magnetic } from "@/components/ui/Magnetic";
import { RevealText } from "@/components/ui/RevealText";
import { Annotation } from "@/components/stencil/Annotation";
import { site, whatsappLink } from "@/content/site";

/** Closing call to action: a rubber stamp that says "Book". */
export function FinalCTA({ title = "Got an idea?\n*Let's draw it.*" }: { title?: string }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const spin = useTransform(scrollYProgress, [0, 1], [-120, 0]);

  return (
    <section ref={ref} className="container-x relative py-28 md:py-44" aria-label="Book a session">
      {/* Rough-edged ink filter for the stamp */}
      <svg width="0" height="0" className="absolute" aria-hidden>
        <filter id="stamp-ink">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.2" />
        </filter>
      </svg>

      <div className="grid items-center gap-16 md:grid-cols-12">
        <div className="md:col-span-7">
          <RevealText
            as="h2"
            text={title}
            className="font-display text-[clamp(3.2rem,8vw,8rem)] font-[350] leading-[0.9] tracking-[-0.035em]"
          />
          <p className="mt-8 max-w-md leading-relaxed text-ink/70">
            Share your idea, placement and references — we&apos;ll reply with sketches, a quote and dates. Or just say hi on{" "}
            <a href={whatsappLink("Hi Eden Tattoos! I'd like to know more about getting a tattoo.")} className="border-b border-stencil text-stencil">
              WhatsApp
            </a>
            .
          </p>
          <p className="eyebrow mt-8 text-graphite">
            {site.address.line1}, {site.address.line2}, {site.address.city} · {site.hours[0].time}
          </p>
        </div>

        <div className="relative flex justify-center md:col-span-5">
          <Magnetic strength={0.3}>
            <Link
              href="/book"
              data-cursor="Book"
              className="group relative grid h-56 w-56 place-items-center text-stencil md:h-72 md:w-72"
              aria-label="Book a session"
            >
              <motion.svg
                viewBox="0 0 200 200"
                className="absolute inset-0 h-full w-full transition-transform duration-700 ease-expo group-hover:scale-105"
                style={{ rotate: spin, filter: "url(#stamp-ink)" }}
                aria-hidden
              >
                <defs>
                  <path id="stamp-circle" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
                </defs>
                <circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" strokeWidth="3" />
                <circle cx="100" cy="100" r="88" fill="none" stroke="currentColor" strokeWidth="1" />
                <circle cx="100" cy="100" r="56" fill="none" stroke="currentColor" strokeWidth="1" />
                <text className="fill-current font-mono text-[11px] font-bold uppercase tracking-[0.3em]">
                  <textPath href="#stamp-circle" textLength={462} lengthAdjust="spacing">
                    Book a session ✦ Eden Tattoos ✦ Chandigarh ✦
                  </textPath>
                </text>
              </motion.svg>
              <span
                className="relative -rotate-6 font-display text-5xl font-[500] italic transition-transform duration-500 group-hover:rotate-0 md:text-6xl"
                style={{ filter: "url(#stamp-ink)" }}
              >
                Book
              </span>
            </Link>
          </Magnetic>
          <div className="absolute -left-4 top-0 hidden md:block">
            <Annotation arrow="down-right" arrowClassName="left-20 top-6" rotate={-8}>
              press here
            </Annotation>
          </div>
        </div>
      </div>
    </section>
  );
}

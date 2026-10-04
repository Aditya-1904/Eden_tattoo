"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { workBySlug, type WorkItem } from "@/content/work";

/**
 * Pinned section: as you scroll, the centre piece scales up to fill the screen while
 * the surrounding pieces scale faster and fly out of frame.
 */
const slots: { slug: string; className: string; scale: number }[] = [
  { slug: "shiva-tandava", className: "h-[25vh] w-[25vw] md:h-[28vh] md:w-[26vw]", scale: 4 },
  { slug: "mandala-sleeve", className: "-top-[30vh] left-[5vw] h-[30vh] w-[35vw] md:w-[22vw]", scale: 5 },
  { slug: "butterfly-sternum", className: "-top-[12vh] -left-[28vw] h-[44vh] w-[22vw] md:w-[18vw]", scale: 6 },
  { slug: "tiger-eyes", className: "left-[28vw] h-[25vh] w-[24vw] md:w-[18vw]", scale: 5 },
  { slug: "chakra-mandala", className: "top-[28vh] left-[6vw] h-[25vh] w-[22vw] md:w-[16vw]", scale: 6 },
  { slug: "why-so-serious", className: "top-[28vh] -left-[24vw] h-[25vh] w-[30vw] md:w-[22vw]", scale: 8 },
  { slug: "filigree-forearm", className: "top-[23vh] left-[26vw] h-[16vh] w-[16vw] md:w-[12vw]", scale: 9 },
];

function Slot({ item, className, scale, progress, hero }: { item: WorkItem; className: string; scale: number; progress: ReturnType<typeof useScroll>["scrollYProgress"]; hero?: boolean }) {
  const s = useTransform(progress, [0, 1], [1, scale]);
  return (
    <motion.div style={{ scale: s }} className="absolute inset-0 flex items-center justify-center will-change-transform">
      <div className={`relative overflow-hidden ${className}`}>
        <Image src={item.image} alt={item.title} fill sizes={hero ? "100vw" : "(max-width: 768px) 60vw, 40vw"} className="object-cover" placeholder="blur" />
      </div>
    </motion.div>
  );
}

export function ZoomParallax() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const titleOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.25], ["0%", "-40%"]);
  const ctaOpacity = useTransform(scrollYProgress, [0.8, 0.95], [0, 1]);
  const veil = useTransform(scrollYProgress, [0.6, 0.9], [0, 0.72]);

  return (
    <section ref={ref} className="theme-ink relative h-[300vh]" aria-label="Selected work">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {slots.map((slot, i) => {
          const item = workBySlug(slot.slug);
          return item ? <Slot key={slot.slug} item={item} className={slot.className} scale={slot.scale} progress={scrollYProgress} hero={i === 0} /> : null;
        })}

        <motion.div style={{ opacity: veil }} className="pointer-events-none absolute inset-0 bg-paper" />

        <motion.div
          style={{ opacity: titleOpacity, y: titleY }}
          className="pointer-events-none absolute inset-x-0 top-24 z-10 container-x flex items-start justify-between"
        >
          <p className="eyebrow text-graphite">
            <span className="text-stencil">02</span> — Selected work
          </p>
          <p className="eyebrow max-w-[16rem] text-right text-graphite">Scroll — every piece drawn for one person</p>
        </motion.div>

        <motion.div
          style={{ opacity: ctaOpacity }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-8 text-center"
        >
          <h2 className="font-display text-giant leading-[0.9] tracking-[-0.03em]">
            The <span className="italic text-stencil">portfolio</span>
          </h2>
          <ButtonLink href="/work">Explore all work</ButtonLink>
        </motion.div>
      </div>
    </section>
  );
}

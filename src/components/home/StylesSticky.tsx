"use client";

import { motion, useInView } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Arrow } from "@/components/ui/Button";
import { styles, workBySlug, workByStyle, type StyleId } from "@/content/work";
import { ease } from "@/lib/utils";

// The strongest high-res piece for each style.
const covers: Record<StyleId, string> = {
  ornamental: "filigree-forearm",
  mandala: "mandala-sleeve",
  "fine-line": "butterfly-sternum",
  spiritual: "shiva-tandava",
  realism: "tiger-eyes",
  blackwork: "memento-mori",
};

const rows = styles.map((s) => ({ ...s, cover: workBySlug(covers[s.id])!, count: workByStyle(s.id).length }));

function Row({ row, index, onActive }: { row: (typeof rows)[number]; index: number; onActive: (i: number) => void }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <li ref={ref} className="flex min-h-[46svh] flex-col justify-center border-b hairline py-12 md:min-h-[62svh]">
      {/* Inline image on small screens, where nothing is pinned */}
      <div className="relative mb-8 aspect-[4/5] w-full overflow-hidden md:hidden">
        <Image src={row.cover.image} alt={row.cover.title} fill sizes="100vw" className="object-cover" placeholder="blur" />
      </div>
      <motion.div
        animate={{ opacity: inView ? 1 : 0.25 }}
        transition={{ duration: 0.6 }}
      >
        <span className="eyebrow text-ash">
          <span className="text-copper">0{index + 1}</span> / 0{rows.length}
        </span>
        <h3 className="mt-4 font-display text-[clamp(3rem,7vw,7rem)] leading-[0.95] tracking-[-0.02em]">
          {index % 2 ? <span className="italic">{row.name}</span> : row.name}
        </h3>
        <p className="mt-5 max-w-sm text-lg leading-relaxed text-bone/65">{row.blurb}.</p>
        <Link
          href={`/work?style=${row.id}`}
          className="group eyebrow mt-8 inline-flex items-center gap-3 text-copper"
        >
          See {row.count} {row.count === 1 ? "piece" : "pieces"}
          <Arrow className="transition-transform duration-500 group-hover:rotate-45" />
        </Link>
      </motion.div>
    </li>
  );
}

/** Split layout: a pinned image on the left changes as each style scrolls through the centre. */
export function StylesSticky() {
  const [active, setActive] = useState(0);

  return (
    <section className="container-x py-24 md:py-32" aria-labelledby="styles-title">
      <div className="mb-16 flex items-end justify-between gap-6 md:mb-24">
        <h2 id="styles-title" className="font-display text-[clamp(2.5rem,5vw,5rem)] leading-none">
          Styles we <span className="italic text-copper">love</span>
        </h2>
        <span className="eyebrow hidden text-ash sm:block">Scroll to explore</span>
      </div>

      <div className="grid gap-12 md:grid-cols-12">
        <div className="hidden md:col-span-6 md:block">
          <div className="sticky top-[12svh] h-[76svh] overflow-hidden">
            {rows.map((row, i) => (
              <motion.div
                key={row.id}
                className="absolute inset-0"
                initial={false}
                animate={{
                  clipPath: i === active ? "inset(0% 0% 0% 0%)" : i < active ? "inset(0% 0% 100% 0%)" : "inset(100% 0% 0% 0%)",
                }}
                transition={{ duration: 1.1, ease: ease.inout }}
              >
                <motion.div
                  className="absolute inset-0"
                  initial={false}
                  animate={{ scale: i === active ? 1 : 1.15 }}
                  transition={{ duration: 1.6, ease: ease.expo }}
                >
                  <Image src={row.cover.image} alt={row.cover.title} fill sizes="50vw" className="object-cover" />
                </motion.div>
              </motion.div>
            ))}
            <div className="eyebrow absolute bottom-5 left-5 z-10 text-bone mix-blend-difference">{rows[active].cover.title}</div>
          </div>
        </div>

        <ol className="border-t hairline md:col-span-5 md:col-start-8">
          {rows.map((row, i) => (
            <Row key={row.id} row={row} index={i} onActive={setActive} />
          ))}
        </ol>
      </div>
    </section>
  );
}

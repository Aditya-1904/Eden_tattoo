"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { Arrow } from "@/components/ui/Button";
import { RevealText } from "@/components/ui/RevealText";
import { styles, workByStyle } from "@/content/work";
import { ease } from "@/lib/utils";

const rows = styles.map((s) => ({ ...s, cover: workByStyle(s.id)[0], count: workByStyle(s.id).length }));

/** Typographic index of styles. On desktop a preview image trails the pointer while hovering a row. */
export function StylesIndex() {
  const listRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 22, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 180, damping: 22, mass: 0.5 });
  const rotate = useSpring(0, { stiffness: 120, damping: 15 });
  const lastX = useRef(0);

  return (
    <section className="relative py-24 md:py-40" aria-label="Styles">
      <div className="container-x mb-14 grid gap-6 md:mb-20 md:grid-cols-12">
        <p className="eyebrow text-ash md:col-span-3">
          <span className="text-copper">(02)</span> — Styles
        </p>
        <RevealText
          as="h2"
          text="What we *do* best"
          className="font-display text-huge leading-[0.95] tracking-[-0.02em] md:col-span-9"
        />
      </div>

      <ul
        ref={listRef}
        className="relative border-t hairline"
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse" || !listRef.current) return;
          const r = listRef.current.getBoundingClientRect();
          x.set(e.clientX - r.left);
          y.set(e.clientY - r.top);
          rotate.set(Math.max(-12, Math.min(12, (e.clientX - lastX.current) * 0.6)));
          lastX.current = e.clientX;
        }}
        onPointerLeave={() => setActive(null)}
      >
        {rows.map((row, i) => (
          <li key={row.id} className="border-b hairline" onPointerEnter={() => setActive(i)}>
            <Link
              href={`/work?style=${row.id}`}
              data-cursor="View"
              className="group container-x relative flex items-center gap-4 py-6 md:grid md:grid-cols-12 md:py-8"
            >
              <span className="eyebrow text-ash md:col-span-1">0{i + 1}</span>
              <span className="relative flex-1 overflow-hidden md:col-span-6">
                <span className="block font-display text-[clamp(2.6rem,7vw,6.5rem)] leading-[1] tracking-[-0.02em] transition-[transform,color] duration-700 ease-expo group-hover:translate-x-4 group-hover:italic group-hover:text-copper">
                  {row.name}
                </span>
              </span>
              <span className="hidden text-bone/60 md:col-span-4 md:block">{row.blurb}</span>
              <span className="eyebrow flex items-center justify-end gap-3 text-ash md:col-span-1">
                <span className="hidden sm:inline">{String(row.count).padStart(2, "0")}</span>
                <Arrow className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45 group-hover:text-copper" />
              </span>
            </Link>
          </li>
        ))}

        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 z-20 hidden md:block"
          style={{ x: sx, y: sy, rotate }}
        >
          <AnimatePresence>
            {active !== null && (
              <motion.div
                key="preview"
                className="relative -translate-x-1/2 -translate-y-1/2 overflow-hidden"
                style={{ width: 280, height: 350 }}
                initial={{ scale: 0.3, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.3, opacity: 0 }}
                transition={{ duration: 0.5, ease: ease.expo }}
              >
                {rows.map((row, i) => (
                  <motion.div
                    key={row.id}
                    className="absolute inset-0"
                    initial={false}
                    animate={{ clipPath: i === active ? "inset(0% 0% 0% 0%)" : i < (active ?? 0) ? "inset(0% 0% 100% 0%)" : "inset(100% 0% 0% 0%)" }}
                    transition={{ duration: 0.7, ease: ease.inout }}
                  >
                    <Image src={row.cover.image} alt="" fill sizes="280px" className="object-cover" />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </ul>
    </section>
  );
}

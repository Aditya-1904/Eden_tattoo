"use client";

import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";
import { cn, ease } from "@/lib/utils";

export function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();

  return (
    <ul className="border-t hairline">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <li key={item.q} className="border-b hairline">
            <h3>
              <button
                type="button"
                id={`${id}-q-${i}`}
                aria-expanded={isOpen}
                aria-controls={`${id}-a-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center justify-between gap-6 py-7 text-left"
              >
                <span className="flex items-baseline gap-5">
                  <span className="eyebrow text-ash">0{i + 1}</span>
                  <span className={cn("font-display text-2xl leading-tight transition-colors duration-500 md:text-4xl", isOpen ? "italic text-copper" : "group-hover:text-copper")}>
                    {item.q}
                  </span>
                </span>
                <span className="relative block h-4 w-4 shrink-0" aria-hidden>
                  <span className="absolute left-0 top-1/2 h-px w-full bg-current" />
                  <span className={cn("absolute left-1/2 top-0 h-full w-px bg-current transition-transform duration-500", isOpen && "scale-y-0")} />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`${id}-a-${i}`}
                  role="region"
                  aria-labelledby={`${id}-q-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.6, ease: ease.expo }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-8 pl-10 leading-relaxed text-bone/65 md:pl-12">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}

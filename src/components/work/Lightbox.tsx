"use client";

import { useLenis } from "lenis/react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";
import { styleName, type WorkItem } from "@/content/work";
import { ease } from "@/lib/utils";

export function Lightbox({
  items,
  index,
  onClose,
  onChange,
}: {
  items: WorkItem[];
  index: number | null;
  onClose: () => void;
  onChange: (i: number) => void;
}) {
  const lenis = useLenis();
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);
  const open = index !== null;
  const item = open ? items[index] : null;

  const go = useCallback(
    (dir: 1 | -1) => {
      if (index === null) return;
      onChange((index + dir + items.length) % items.length);
    },
    [index, items.length, onChange],
  );

  useEffect(() => {
    if (!open) return;
    restoreRef.current = document.activeElement as HTMLElement;
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
      restoreRef.current?.focus?.();
    };
  }, [open, lenis]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go, onClose]);

  return (
    <AnimatePresence>
      {item && index !== null && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={item.title}
          className="theme-ink fixed inset-0 z-[85] flex flex-col bg-paper/95 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="container-x flex items-center justify-between py-5">
            <span className="eyebrow tabular-nums text-graphite">
              {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </span>
            <button ref={closeRef} onClick={onClose} className="eyebrow rounded-full border border-ink/20 px-4 py-2.5 transition-colors hover:border-stencil hover:text-stencil">
              Close ✕
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 md:px-24">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={item.slug}
                className="relative h-full w-full"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5, ease: ease.expo }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.4}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -80) go(1);
                  else if (info.offset.x > 80) go(-1);
                }}
                data-cursor="Drag"
              >
                <Image src={item.image} alt={item.title} fill sizes="100vw" className="pointer-events-none select-none object-contain" placeholder="blur" priority />
              </motion.div>
            </AnimatePresence>

            <button onClick={() => go(-1)} aria-label="Previous" className="absolute left-4 top-1/2 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-ink/20 transition-colors hover:border-stencil hover:text-stencil md:flex">
              ←
            </button>
            <button onClick={() => go(1)} aria-label="Next" className="absolute right-4 top-1/2 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-ink/20 transition-colors hover:border-stencil hover:text-stencil md:flex">
              →
            </button>
          </div>

          <div className="container-x flex flex-wrap items-end justify-between gap-4 py-6">
            <div>
              <p className="font-display text-4xl leading-none md:text-5xl">{item.title}</p>
              <p className="eyebrow mt-3 text-graphite">
                {item.styles.map(styleName).join(" · ")} — {item.placement}
              </p>
            </div>
            <Link href={`/book?style=${item.styles[0]}`} className="eyebrow border-b border-stencil pb-1 text-stencil" onClick={onClose}>
              Want something like this? →
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

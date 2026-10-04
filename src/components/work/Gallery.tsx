"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { styleName, styles, work, type StyleId, type WorkItem } from "@/content/work";
import { cn, ease } from "@/lib/utils";
import { Lightbox } from "./Lightbox";

type Filter = StyleId | "all";

export function Gallery({ initial = "all", items = work, showFilters = true }: { initial?: Filter; items?: WorkItem[]; showFilters?: boolean }) {
  const [filter, setFilter] = useState<Filter>(initial);
  const [open, setOpen] = useState<number | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const visible = useMemo(() => (filter === "all" ? items : items.filter((w) => w.styles.includes(filter))), [filter, items]);

  const select = (f: Filter) => {
    setFilter(f);
    router.replace(f === "all" ? pathname : `${pathname}?style=${f}`, { scroll: false });
  };

  const counts = useMemo(() => Object.fromEntries(styles.map((s) => [s.id, items.filter((w) => w.styles.includes(s.id)).length])), [items]);

  return (
    <div className="container-x">
      {showFilters && (
        <div className="sticky top-[72px] z-30 -mx-[var(--gutter)] mb-10 border-y hairline bg-ink/80 px-[var(--gutter)] py-4 backdrop-blur-md">
          <div role="tablist" aria-label="Filter by style" className="flex gap-2 overflow-x-auto [scrollbar-width:none]">
            {(["all", ...styles.map((s) => s.id)] as Filter[]).map((f) => {
              const active = filter === f;
              const count = f === "all" ? items.length : counts[f];
              if (!count) return null;
              return (
                <button
                  key={f}
                  role="tab"
                  aria-selected={active}
                  onClick={() => select(f)}
                  className={cn(
                    "eyebrow relative shrink-0 rounded-full border px-4 py-2.5 transition-colors duration-500",
                    active ? "border-copper text-ink" : "border-bone/15 text-bone/70 hover:border-bone/40 hover:text-bone",
                  )}
                >
                  {active && (
                    <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-copper" transition={{ duration: 0.6, ease: ease.expo }} />
                  )}
                  <span className="relative">
                    {f === "all" ? "All work" : styleName(f)} <sup className="ml-0.5 opacity-60">{count}</sup>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <ul key={filter} className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>li]:mb-4">
          {visible.map((item, i) => (
            <motion.li
              key={item.slug}
              className="break-inside-avoid"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -5% 0px" }}
              transition={{ duration: 1, ease: ease.expo, delay: (i % 3) * 0.08 }}
            >
              <button
                type="button"
                onClick={() => setOpen(i)}
                data-cursor="View"
                className="group relative block w-full overflow-hidden text-left focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-copper"
                aria-label={`Open ${item.title}`}
              >
                <Image
                  src={item.image}
                  alt={`${item.title} — ${item.styles.map(styleName).join(", ")} tattoo on ${item.placement.toLowerCase()}`}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  placeholder="blur"
                  className="h-auto w-full transition-transform duration-[1.4s] ease-expo group-hover:scale-[1.04]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/0 to-ink/0 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                <span className="absolute inset-x-0 bottom-0 flex translate-y-4 items-end justify-between gap-4 p-5 opacity-0 transition-all duration-700 ease-expo group-hover:translate-y-0 group-hover:opacity-100">
                  <span>
                    <span className="block font-display text-3xl leading-none">{item.title}</span>
                    <span className="eyebrow mt-2 block text-bone/60">
                      {item.styles.map(styleName).join(" · ")}
                    </span>
                  </span>
                  <span className="eyebrow text-copper">{item.placement}</span>
                </span>
              </button>
            </motion.li>
          ))}
      </ul>

      <Lightbox items={visible} index={open} onClose={() => setOpen(null)} onChange={setOpen} />
    </div>
  );
}

"use client";

import { animate, AnimatePresence, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import { introAlreadySeen, markIntroDone } from "@/lib/intro";
import { ease } from "@/lib/utils";

const LETTERS = ["E", "d", "e", "n"];

/**
 * First-visit intro: the wordmark rises out of a mask while a counter runs to 100,
 * then the whole panel lifts away. Skipped (via CSS + store) on repeat visits in a session.
 */
export function Preloader() {
  const [visible, setVisible] = useState(true);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => String(Math.round(v)).padStart(3, "0"));

  useEffect(() => {
    if (introAlreadySeen() || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = requestAnimationFrame(() => {
        setVisible(false);
        markIntroDone();
      });
      return () => cancelAnimationFrame(id);
    }
    document.documentElement.style.overflow = "hidden";
    const controls = animate(count, 100, { duration: 2.1, ease: [0.65, 0, 0.35, 1] });
    const t = setTimeout(() => {
      setVisible(false);
      document.documentElement.style.overflow = "";
      markIntroDone();
    }, 2700);
    return () => {
      controls.stop();
      clearTimeout(t);
      document.documentElement.style.overflow = "";
    };
  }, [count]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="preloader fixed inset-0 z-[95] flex flex-col justify-between bg-coal"
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          transition={{ duration: 1.1, ease: ease.inout }}
          aria-hidden
        >
          <div className="container-x flex items-center justify-between pt-6">
            <span className="eyebrow text-ash">Eden Tattoos</span>
            <span className="eyebrow text-ash">Chandigarh</span>
          </div>

          <div className="container-x flex items-end justify-between pb-6">
            <h2 className="flex font-display text-[30vw] leading-[0.8] tracking-[-0.04em] md:text-[22vw]">
              {LETTERS.map((l, i) => (
                <span key={i} className="inline-block overflow-hidden pb-[0.06em]">
                  <motion.span
                    className={i === 0 ? "inline-block" : "inline-block italic text-copper"}
                    initial={{ y: "105%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "-30%", opacity: 0 }}
                    transition={{ duration: 1.2, ease: ease.expo, delay: 0.2 + i * 0.09 }}
                  >
                    {l}
                  </motion.span>
                </span>
              ))}
            </h2>
            <motion.span className="eyebrow mb-[2vw] text-2xl tabular-nums text-bone md:text-3xl">{rounded}</motion.span>
          </div>

          <motion.div
            className="absolute bottom-0 left-0 h-px bg-copper"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.1, ease: [0.65, 0, 0.35, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

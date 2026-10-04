"use client";

import { motion, type MotionValue } from "motion/react";
import { cn } from "@/lib/utils";
import { buildMandala } from "./geometry";

// The geometry is fixed, so build it once.
const SHAPES = buildMandala();
const ORDER_IN_LAYER = (() => {
  const seen: Record<number, number> = {};
  return SHAPES.map((s) => (seen[s.layer] = (seen[s.layer] ?? 0) + 1) - 1);
})();

/**
 * The studio's signature mark: a mandala that traces itself outward, layer by layer.
 * `stroke` can be a MotionValue so a scroll position can shift it from stencil violet to ink.
 */
export function Mandala({
  className,
  stroke = "var(--color-stencil)",
  play = true,
  speed = 1,
  strokeWidth = 1.1,
}: {
  className?: string;
  stroke?: string | MotionValue<string>;
  play?: boolean;
  speed?: number;
  strokeWidth?: number;
}) {
  return (
    <motion.svg
      viewBox="-256 -256 512 512"
      className={cn("overflow-visible", className)}
      aria-hidden
      style={{ stroke, fill: "none" }}
    >
      {SHAPES.map((s, i) => {
        const delay = (0.15 + s.layer * 0.32 + ORDER_IN_LAYER[i] * 0.012) / speed;
        return s.dot ? (
          <motion.path
            key={i}
            d={s.d}
            style={{ fill: stroke, stroke: "none" }}
            initial={{ opacity: 0, scale: 0 }}
            animate={play ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 / speed, delay, ease: [0.16, 1, 0.3, 1] }}
          />
        ) : (
          <motion.path
            key={i}
            d={s.d}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={play ? { pathLength: 1, opacity: 1 } : {}}
            transition={{
              pathLength: { duration: 1.3 / speed, delay, ease: [0.65, 0, 0.35, 1] },
              opacity: { duration: 0.01, delay },
            }}
          />
        );
      })}
    </motion.svg>
  );
}

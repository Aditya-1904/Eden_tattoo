"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const arrows = {
  // Curving down-right, ending in an arrowhead
  "down-right": { d: "M6 8 C 30 6, 62 22, 70 56", head: "M58 48 L70 57 L74 43", box: "0 0 84 66" },
  "down-left": { d: "M78 8 C 54 6, 22 22, 14 56", head: "M26 48 L14 57 L10 43", box: "0 0 84 66" },
  "up-right": { d: "M6 58 C 26 58, 58 46, 70 12", head: "M58 18 L70 10 L76 23", box: "0 0 84 66" },
  left: { d: "M80 30 C 60 18, 34 18, 10 32", head: "M20 22 L9 33 L23 39", box: "0 0 90 48" },
  right: { d: "M8 30 C 28 18, 54 18, 80 32", head: "M68 22 L80 33 L66 39", box: "0 0 90 48" },
} as const;

/** A handwritten margin note in stencil violet, optionally with a hand-drawn arrow that draws itself in. */
export function Annotation({
  children,
  arrow,
  arrowClassName,
  className,
  delay = 0.2,
  rotate = -3,
}: {
  children: React.ReactNode;
  arrow?: keyof typeof arrows;
  arrowClassName?: string;
  className?: string;
  delay?: number;
  rotate?: number;
}) {
  const a = arrow ? arrows[arrow] : null;
  return (
    <motion.div
      className={cn("pointer-events-none relative inline-block", className)}
      style={{ rotate }}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="hand block text-2xl md:text-3xl">{children}</span>
      {a && (
        <svg viewBox={a.box} className={cn("absolute h-14 w-20 text-stencil", arrowClassName)} fill="none" aria-hidden>
          {[a.d, a.head].map((d, i) => (
            <motion.path
              key={i}
              d={d}
              stroke="currentColor"
              strokeWidth={2.2}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: i ? 0.3 : 0.8, delay: delay + 0.3 + i * 0.75, ease: "easeInOut" }}
            />
          ))}
        </svg>
      )}
    </motion.div>
  );
}

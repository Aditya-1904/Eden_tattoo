"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/lib/hooks";

/**
 * A stencil-violet dot that replaces the native cursor on fine pointers.
 * - Grows into a ring over links/buttons.
 * - Shows a label over any element with `data-cursor="Label"`.
 */
export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 600, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 600, damping: 40, mass: 0.4 });

  const enabled = useMediaQuery("(pointer: fine)");
  const [mode, setMode] = useState<"default" | "link" | "label">("default");
  const [label, setLabel] = useState("");
  const [hidden, setHidden] = useState(true);
  const [down, setDown] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-cursor");

    const last = { x: -100, y: -100 };

    const classify = (target: Element | null) => {
      const el = target?.closest<HTMLElement>("[data-cursor], a, button, [role='button'], label, input, textarea, select");
      if (!el) return setMode("default");
      if (el.dataset.cursor) {
        setLabel(el.dataset.cursor);
        setMode("label");
      } else if (el.matches("input:not([type=checkbox]):not([type=radio]):not([type=file]), textarea, select")) {
        setMode("default");
        setHidden(true);
      } else {
        setMode("link");
      }
    };

    const move = (e: PointerEvent) => {
      last.x = e.clientX;
      last.y = e.clientY;
      x.set(e.clientX);
      y.set(e.clientY);
      setHidden(false);
      classify(e.target as Element | null);
    };
    // Content moves under a still pointer while scrolling — re-check what's beneath it.
    const scroll = () => {
      if (last.x >= 0) classify(document.elementFromPoint(last.x, last.y));
    };
    const leave = () => setHidden(true);
    const pd = () => setDown(true);
    const pu = () => setDown(false);

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", scroll, { passive: true });
    document.addEventListener("pointerleave", leave);
    window.addEventListener("pointerdown", pd);
    window.addEventListener("pointerup", pu);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", scroll);
      document.removeEventListener("pointerleave", leave);
      window.removeEventListener("pointerdown", pd);
      window.removeEventListener("pointerup", pu);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const size = mode === "label" ? 92 : mode === "link" ? 44 : 10;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100]"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
        animate={{
          width: size,
          height: size,
          opacity: hidden ? 0 : 1,
          scale: down ? 0.85 : 1,
          backgroundColor: mode === "link" ? "rgba(90,72,230,0)" : "rgba(90,72,230,1)",
          borderColor: mode === "link" ? "rgba(90,72,230,0.9)" : "rgba(90,72,230,0)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        style={{ borderWidth: 1, borderStyle: "solid" }}
      >
        {mode === "label" && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            className="eyebrow text-[10px] text-paper"
          >
            {label}
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  );
}

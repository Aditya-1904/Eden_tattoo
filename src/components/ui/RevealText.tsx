"use client";

import { motion, type Variants } from "motion/react";
import { createElement, Fragment } from "react";
import { cn, ease } from "@/lib/utils";

type Tag = "h1" | "h2" | "h3" | "p" | "span" | "div";

type Props = {
  /** Plain text. Wrap words in *asterisks* to render them in copper italics. */
  text: string;
  as?: Tag;
  className?: string;
  delay?: number;
  stagger?: number;
  /** When provided, animation is driven by this flag instead of entering the viewport. */
  play?: boolean;
  once?: boolean;
};

const word: Variants = {
  hidden: { y: "110%" },
  show: (i: number) => ({ y: "0%", transition: { duration: 1.1, ease: ease.expo, delay: i } }),
};

/** Masked word-by-word reveal used for editorial headlines. */
export function RevealText({ text, as = "h2", className, delay = 0, stagger = 0.06, play, once = true }: Props) {
  const lines = text.split("\n");
  let index = 0;

  const animateProps =
    play === undefined
      ? { initial: "hidden", whileInView: "show", viewport: { once, margin: "0px 0px -10% 0px" } }
      : { initial: "hidden", animate: play ? "show" : "hidden" };

  return createElement(
    as,
    { className: cn("relative", className) },
    <motion.span className="block" {...animateProps} aria-hidden>
      {lines.map((line, li) => (
        <span key={li} className="block">
          {line.split(" ").map((raw, wi, arr) => {
            const emph = raw.startsWith("*") && raw.endsWith("*") && raw.length > 2;
            const clean = emph ? raw.slice(1, -1) : raw;
            const i = index++;
            return (
              <Fragment key={wi}>
                <span className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
                  <motion.span
                    className={cn("inline-block will-change-transform", emph && "font-display italic text-copper")}
                    variants={word}
                    custom={delay + i * stagger}
                  >
                    {clean}
                  </motion.span>
                </span>
                {wi < arr.length - 1 && " "}
              </Fragment>
            );
          })}
        </span>
      ))}
    </motion.span>,
    <span className="sr-only">{text.replace(/\*/g, "")}</span>,
  );
}

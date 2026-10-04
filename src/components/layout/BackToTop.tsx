"use client";

import { useLenis } from "lenis/react";

export function BackToTop() {
  const lenis = useLenis();
  return (
    <button
      type="button"
      onClick={() => (lenis ? lenis.scrollTo(0, { duration: 1.6 }) : window.scrollTo({ top: 0, behavior: "smooth" }))}
      className="eyebrow text-ash transition-colors hover:text-copper"
    >
      Back to top ↑
    </button>
  );
}

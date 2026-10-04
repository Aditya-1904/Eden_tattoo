"use client";

import { useLenis } from "lenis/react";

export function BackToTop() {
  const lenis = useLenis();
  return (
    <button
      type="button"
      onClick={() => (lenis ? lenis.scrollTo(0, { duration: 1.6 }) : window.scrollTo({ top: 0, behavior: "smooth" }))}
      className="eyebrow text-graphite transition-colors hover:text-stencil"
    >
      Back to top ↑
    </button>
  );
}

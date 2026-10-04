"use client";

import { useEffect, useRef } from "react";

const POOL = 14;
const THRESHOLD = 90; // px of pointer travel between spawns

/**
 * Spawns tattoo photos along the pointer path (desktop only).
 * Uses a fixed pool of <img> nodes and the Web Animations API — no React re-renders while moving.
 */
export function ImageTrail({ images, className }: { images: string[]; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const nodes = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    const host = ref.current;
    if (!host || !window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Warm the cache so first spawns don't pop in.
    images.forEach((src) => {
      const i = new Image();
      i.src = src;
    });

    let last = { x: 0, y: 0 };
    let first = true;
    let slot = 0;
    let imgIndex = 0;
    let z = 1;

    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      if (first) {
        last = { x, y };
        first = false;
        return;
      }
      if (Math.hypot(x - last.x, y - last.y) < THRESHOLD) return;
      last = { x, y };

      const el = nodes.current[slot];
      slot = (slot + 1) % POOL;
      if (!el) return;
      el.src = images[imgIndex];
      imgIndex = (imgIndex + 1) % images.length;
      el.style.zIndex = String(z++);

      const rot = (Math.random() - 0.5) * 14;
      const base = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      el.getAnimations().forEach((a) => a.cancel());
      el.animate(
        [
          { opacity: 0, transform: `${base} scale(0.4) rotate(${rot * 2}deg)`, filter: "brightness(1.6)", easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
          { opacity: 1, transform: `${base} scale(1) rotate(${rot}deg)`, filter: "brightness(1)", offset: 0.3 },
          { opacity: 1, transform: `${base} scale(1) rotate(${rot}deg)`, filter: "brightness(1)", offset: 0.65, easing: "cubic-bezier(0.55, 0, 0.75, 0)" },
          { opacity: 0, transform: `${base} scale(0.8) rotate(${rot}deg) translateY(40px)`, filter: "brightness(0.5)" },
        ],
        { duration: 1600, easing: "linear", fill: "forwards" },
      );
    };

    host.addEventListener("pointermove", onMove);
    return () => host.removeEventListener("pointermove", onMove);
  }, [images]);

  return (
    <div ref={ref} className={className} aria-hidden>
      {Array.from({ length: POOL }).map((_, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={i}
          ref={(n) => {
            if (n) nodes.current[i] = n;
          }}
          alt=""
          className="pointer-events-none absolute left-0 top-0 aspect-[4/5] w-[min(18vw,260px)] object-cover opacity-0 will-change-transform"
          decoding="async"
        />
      ))}
    </div>
  );
}

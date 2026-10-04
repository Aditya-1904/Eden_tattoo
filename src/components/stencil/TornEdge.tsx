import { cn } from "@/lib/utils";

/** Deterministic pseudo-random so the edge is identical on server and client. */
function seeded(seed: number) {
  let t = seed;
  return () => {
    t = (t * 9301 + 49297) % 233280;
    return t / 233280;
  };
}

function edgePath(seed: number) {
  const rnd = seeded(seed);
  const pts: string[] = ["M0 40"];
  let x = 0;
  while (x < 1000) {
    x = Math.min(1000, x + 6 + rnd() * 18);
    const y = 8 + rnd() * 22 + (rnd() > 0.85 ? rnd() * 10 : 0);
    pts.push(`L${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  pts.push("L1000 40 Z");
  return pts.join(" ");
}

/**
 * A ragged, torn-paper edge. Place it at the very top of a section; it is filled with that
 * section's paper colour and overlaps the section above.
 */
export function TornEdge({ seed = 7, className, flip = false }: { seed?: number; className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 1000 40"
      preserveAspectRatio="none"
      aria-hidden
      className={cn("pointer-events-none absolute inset-x-0 -top-[19px] z-10 block h-5 w-full md:-top-[27px] md:h-7", flip && "rotate-180", className)}
      style={{ fill: "var(--color-paper)" }}
    >
      <path d={edgePath(seed)} />
    </svg>
  );
}

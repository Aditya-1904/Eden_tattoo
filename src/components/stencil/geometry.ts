/**
 * Procedurally builds an ornamental mandala as SVG path data, centred on (0,0) in a 500×500 box.
 * Each shape carries a `layer` so the drawing can be animated outward, ring by ring,
 * the way an artist would trace a stencil.
 */
export type Shape = { d: string; layer: number; dot?: boolean };

const rad = (deg: number) => (deg * Math.PI) / 180;
const pt = (r: number, deg: number) => {
  const x = r * Math.cos(rad(deg - 90));
  const y = r * Math.sin(rad(deg - 90));
  return `${x.toFixed(2)} ${y.toFixed(2)}`;
};
const circle = (r: number, cx = 0, cy = 0) =>
  `M ${(cx - r).toFixed(2)} ${cy.toFixed(2)} a ${r} ${r} 0 1 0 ${2 * r} 0 a ${r} ${r} 0 1 0 ${-2 * r} 0`;

/** Teardrop petal from radius r1 to r2 centred on angle a with half-width h (degrees). */
function petal(r1: number, r2: number, a: number, h: number, belly = 1.1) {
  const m = r1 + (r2 - r1) * 0.55;
  return [
    `M ${pt(r1, a - h)}`,
    `C ${pt(m, a - h * belly)} ${pt(r2 * 0.93, a - h * 0.28)} ${pt(r2, a)}`,
    `C ${pt(r2 * 0.93, a + h * 0.28)} ${pt(m, a + h * belly)} ${pt(r1, a + h)}`,
  ].join(" ");
}

/** Pointed leaf with straight-ish flanks. */
function spike(r1: number, r2: number, a: number, h: number) {
  return `M ${pt(r1, a - h)} Q ${pt((r1 + r2) / 2, a - h * 0.55)} ${pt(r2, a)} Q ${pt((r1 + r2) / 2, a + h * 0.55)} ${pt(r1, a + h)}`;
}

function ring(n: number, offset = 0) {
  return Array.from({ length: n }, (_, i) => (360 / n) * i + offset);
}

export function buildMandala(): Shape[] {
  const s: Shape[] = [];

  // 0 — seed: centre dot and eight-point star
  s.push({ d: circle(7), layer: 0 });
  const star = ring(16)
    .map((a, i) => `${i ? "L" : "M"} ${pt(i % 2 ? 15 : 30, a)}`)
    .join(" ");
  s.push({ d: `${star} Z`, layer: 0 });

  // 1 — inner ring
  s.push({ d: circle(38), layer: 1 });
  s.push({ d: circle(43), layer: 1 });

  // 2 — eight large petals with an inner echo and a vein
  for (const a of ring(8)) {
    s.push({ d: petal(43, 108, a, 22.5), layer: 2 });
    s.push({ d: petal(52, 92, a, 13, 1.05), layer: 2 });
    s.push({ d: `M ${pt(58, a)} L ${pt(84, a)}`, layer: 2 });
  }
  // small buds between the large petals
  for (const a of ring(8, 22.5)) s.push({ d: petal(43, 74, a, 9), layer: 2 });

  // 3 — double ring with a band of dots
  s.push({ d: circle(114), layer: 3 });
  s.push({ d: circle(124), layer: 3 });
  for (const a of ring(48)) {
    const [x, y] = pt(119, a).split(" ").map(Number);
    s.push({ d: circle(1.6, x, y), layer: 3, dot: true });
  }

  // 4 — sixteen rounded petals behind sixteen pointed spikes
  for (const a of ring(16, 11.25)) s.push({ d: petal(124, 168, a, 11.25, 1.15), layer: 4 });
  for (const a of ring(16)) {
    s.push({ d: spike(124, 184, a, 9), layer: 4 });
    s.push({ d: `M ${pt(134, a)} L ${pt(166, a)}`, layer: 4 });
  }

  // 5 — ring and scallops
  s.push({ d: circle(188), layer: 5 });
  const n = 32;
  const half = 180 / n;
  const rr = 188 * Math.sin(rad(half));
  for (const a of ring(n)) {
    s.push({ d: `M ${pt(188, a - half)} A ${rr.toFixed(2)} ${rr.toFixed(2)} 0 0 1 ${pt(188, a + half)}`, layer: 5 });
  }

  // 6 — dot halo and outer ring
  for (const a of ring(32)) {
    const [x, y] = pt(212, a).split(" ").map(Number);
    s.push({ d: circle(2.6, x, y), layer: 6, dot: true });
  }
  for (const a of ring(64, 2.8125)) {
    const [x, y] = pt(222, a).split(" ").map(Number);
    s.push({ d: circle(1, x, y), layer: 6, dot: true });
  }
  s.push({ d: circle(230), layer: 6 });

  // 7 — sixteen small diamonds on the rim
  for (const a of ring(16)) {
    s.push({ d: `M ${pt(232, a)} L ${pt(241, a - 2.2)} L ${pt(250, a)} L ${pt(241, a + 2.2)} Z`, layer: 7 });
  }

  return s;
}

export const MANDALA_LAYERS = 8;

import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { buildMandala } from "@/components/stencil/geometry";

export const alt = "Eden Tattoos — from stencil to skin. Custom tattoo & piercing studio in Chandigarh";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const assets = join(process.cwd(), "src/assets");
const serif = await readFile(join(assets, "fonts/Fraunces-400-normal.woff"));
const serifItalic = await readFile(join(assets, "fonts/Fraunces-400-italic.woff"));
const hand = await readFile(join(assets, "fonts/Caveat-600.woff"));
const photo = await readFile(join(assets, "work/mandala-sleeve.jpg"), "base64");

// The site's mandala, rendered as a stencil-violet SVG overlay.
const mandala = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-256 -256 512 512">${buildMandala()
  .filter((s) => s.layer >= 5)
  .map((s) => (s.dot ? `<path d="${s.d}" fill="#4a3ad0"/>` : `<path d="${s.d}" fill="none" stroke="#4a3ad0" stroke-width="2"/>`))
  .join("")}</svg>`;

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", background: "#eee8dd", color: "#161412", padding: "0 70px" }}>
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ display: "flex", fontFamily: "Hand", fontSize: 40, color: "#4a3ad0" }}>Eden Tattoos — Chandigarh</div>
          <div style={{ display: "flex", fontFamily: "Serif", fontSize: 112, lineHeight: 0.95, letterSpacing: -4, marginTop: 18 }}>
            From&nbsp;<span style={{ fontFamily: "SerifItalic", color: "#4a3ad0" }}>stencil</span>
          </div>
          <div style={{ display: "flex", fontFamily: "Serif", fontSize: 112, lineHeight: 0.95, letterSpacing: -4 }}>to skin.</div>
          <div style={{ display: "flex", fontFamily: "Serif", fontSize: 28, color: "#6c655b", marginTop: 30 }}>
            Ornamental · Mandala · Fine-line · Custom ink
          </div>
        </div>
        <div style={{ display: "flex", position: "relative", width: 400, height: 400 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`data:image/jpeg;base64,${photo}`} alt="" width={288} height={288} style={{ position: "absolute", left: 56, top: 56, borderRadius: 144, objectFit: "cover" }} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`data:image/svg+xml;base64,${Buffer.from(mandala).toString("base64")}`} alt="" width={400} height={400} style={{ position: "absolute", left: 0, top: 0 }} />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Serif", data: serif, style: "normal", weight: 400 },
        { name: "SerifItalic", data: serifItalic, style: "normal", weight: 400 },
        { name: "Hand", data: hand, style: "normal", weight: 600 },
      ],
    },
  );
}

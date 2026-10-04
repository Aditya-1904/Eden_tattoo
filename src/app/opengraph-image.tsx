import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Eden Tattoos — custom tattoo & piercing studio in Chandigarh";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const assets = join(process.cwd(), "src/assets");
const serif = await readFile(join(assets, "fonts/InstrumentSerif-Regular.ttf"));
const serifItalic = await readFile(join(assets, "fonts/InstrumentSerif-Italic.ttf"));
const photo = await readFile(join(assets, "work/mandala-sleeve.jpg"), "base64");

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#0a0a09", color: "#ede7db" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "56px 64px" }}>
          <div style={{ display: "flex", fontSize: 22, letterSpacing: 4, color: "#8a857c", fontFamily: "Serif" }}>
            TATTOO & PIERCING — CHANDIGARH
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", lineHeight: 0.8 }}>
            <span style={{ fontSize: 260, fontFamily: "Serif", letterSpacing: -10 }}>Ed</span>
            <span style={{ fontSize: 260, fontFamily: "SerifItalic", color: "#c48a55", letterSpacing: -10 }}>en</span>
          </div>
          <div style={{ display: "flex", fontSize: 36, fontFamily: "SerifItalic", color: "#ede7db" }}>
            Ornamental · Mandala · Custom Ink
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`data:image/jpeg;base64,${photo}`} alt="" width={420} height={630} style={{ objectFit: "cover" }} />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Serif", data: serif, style: "normal", weight: 400 },
        { name: "SerifItalic", data: serifItalic, style: "normal", weight: 400 },
      ],
    },
  );
}

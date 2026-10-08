import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { RAINBOW_NAME, RAINBOW_OG_ALT } from "@/lib/rainbow-event";

export const alt = RAINBOW_OG_ALT;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// All image and font inputs are local. The Chinese font contains only this
// card's glyphs, and its original OFL license is retained beside the subset.
const serif = await readFile(join(process.cwd(), "app/rainbow2026/assets/rainbow-og-serif-heavy.otf"));
const geist = await readFile(join(process.cwd(), "node_modules/next/dist/compiled/@vercel/og/Geist-Regular.ttf"));
const flower = await readFile(join(process.cwd(), "app/rainbow2026/assets/rainbow-og-flower.svg"));
const flowerSrc = `data:image/svg+xml;base64,${flower.toString("base64")}`;
const spectrum = ["#ff4659", "#ff9239", "#ffdc27", "#89ce3c", "#22bf8d", "#10b8ed", "#597dff", "#ba70f8"];

export default function RainbowOpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", position: "relative", overflow: "hidden", background: "#ffffff", color: "#101116", fontFamily: "Geist" }}>
        <img src={flowerSrc} alt="" width={792} height={543} style={{ position: "absolute", left: 514, top: 44, objectFit: "contain" }} />

        <div style={{ display: "flex", flexDirection: "column", position: "absolute", top: 55, left: 64, width: 580 }}>
          <div style={{ display: "flex", fontFamily: "Rainbow Serif", fontSize: 24, letterSpacing: "0.04em" }}>{RAINBOW_NAME}</div>
          <div style={{ display: "flex", flexDirection: "column", fontFamily: "Rainbow Serif", fontSize: 88, lineHeight: 1.22, letterSpacing: "-0.04em", marginTop: 37 }}>
            <span>聲做伙聽，</span>
            <span>路做伙行</span>
          </div>
          <div style={{ display: "flex", fontSize: 25, letterSpacing: "0.01em", marginTop: 24 }}>Our Voices, Our Journey</div>
        </div>

        <div style={{ position: "absolute", left: 61, top: 439, display: "flex", alignItems: "center" }}>
          <span style={{ fontSize: 91, fontWeight: 400, letterSpacing: "-0.06em", lineHeight: 1 }}>10.31</span>
          <span style={{ display: "flex", width: 1, height: 48, marginLeft: 26, background: "#101116" }} />
          <span style={{ fontSize: 20, letterSpacing: "0.09em", marginLeft: 23 }}>2026</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", position: "absolute", left: 64, bottom: 42 }}>
          <span style={{ fontFamily: "Rainbow Serif", fontSize: 27, letterSpacing: "0.1em" }}>臺灣新文化青年協會</span>
          <span style={{ fontSize: 11, letterSpacing: "0.12em", marginTop: 8 }}>TAIWAN NEW CULTURE YOUTH ASSOCIATION</span>
        </div>

        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 8, display: "flex" }}>
          {spectrum.map((color) => <span key={color} style={{ display: "flex", flex: 1, height: "100%", background: color }} />)}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Rainbow Serif", data: serif, weight: 900, style: "normal" },
        { name: "Geist", data: geist, weight: 400, style: "normal" },
      ],
    },
  );
}

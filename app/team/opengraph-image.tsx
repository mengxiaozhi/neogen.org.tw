import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "協會團隊｜臺灣新文化青年協會";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const portrait = await readFile(
  join(process.cwd(), "app/team/images/chen-tingchu-cutout.png"),
);
const portraitSrc = `data:image/png;base64,${portrait.toString("base64")}`;
const geist = await readFile(
  join(process.cwd(), "node_modules/next/dist/compiled/@vercel/og/Geist-Regular.ttf"),
);

export default function TeamOpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "#f7f5ee",
          color: "#111111",
          padding: "48px",
          fontFamily: "Geist",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "58%",
            height: "100%",
            borderTop: "3px solid #111111",
            borderBottom: "3px solid #111111",
            padding: "34px 30px 30px 0",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", fontSize: 22, fontWeight: 800, letterSpacing: "0.12em" }}>
            <span style={{ display: "flex", width: 12, height: 12, marginRight: 14, background: "#ef3f16" }} />
            THE PEOPLE / 2026
          </div>
          <div style={{ display: "flex", alignItems: "center", marginTop: 66 }}>
            <span style={{ fontSize: 78, fontWeight: 900, letterSpacing: "-0.06em", lineHeight: 1 }}>ASSOCIATION<br />TEAM</span>
            <span style={{ display: "flex", width: 30, height: 104, marginLeft: 24, background: "#ef3f16", transform: "skewX(-18deg)" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", marginTop: "auto" }}>
            <span style={{ fontSize: 31, fontWeight: 800, lineHeight: 1.45 }}>QUESTION. SPEAK. ACT.</span>
            <span style={{ marginTop: 12, fontSize: 20, color: "#575757" }}>Young voices in the public sphere.</span>
          </div>
        </div>

        <div
          style={{
            position: "relative",
            display: "flex",
            width: "42%",
            height: "100%",
            overflow: "hidden",
            background: "#ef3f16",
          }}
        >
          <div
            style={{
              position: "absolute",
              right: 54,
              top: -54,
              display: "flex",
              width: 168,
              height: 600,
              background: "#e8e5dc",
              transform: "rotate(16deg)",
            }}
          />
          <img
            src={portraitSrc}
            alt=""
            width={455}
            height={455}
            style={{ position: "absolute", right: -4, bottom: -22, objectFit: "contain" }}
          />
          <div
            style={{
              position: "absolute",
              left: 28,
              bottom: 28,
              display: "flex",
              flexDirection: "column",
              color: "#111111",
              background: "#f7f5ee",
              padding: "11px 14px 10px",
            }}
          >
            <span style={{ fontSize: 17, fontWeight: 800, letterSpacing: "0.08em" }}>TAIWAN NEW CULTURE</span>
            <span style={{ marginTop: 4, fontSize: 23, fontWeight: 900 }}>YOUTH ASSOCIATION</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Geist", data: geist, style: "normal", weight: 400 }],
    },
  );
}

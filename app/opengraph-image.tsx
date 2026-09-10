import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

export const alt = "臺灣新文化青年協會｜以青年之聲，寫臺灣新章";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logo = await readFile(
    join(process.cwd(), "public/brand/association-logo-main.png"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          background: "#f4f4f2",
          color: "#0a0a0a",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 22,
            right: 22,
            bottom: 22,
            left: 22,
            display: "flex",
            border: "3px solid #0a0a0a",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 60,
            bottom: 48,
            display: "flex",
            width: 184,
            height: 184,
            alignItems: "center",
            justifyContent: "center",
            border: "3px solid #0a0a0a",
            background: "#ffffff",
            transform: "rotate(3deg)",
          }}
        >
          <img
            src={`data:image/png;base64,${logo.toString("base64")}`}
            alt=""
            width={172}
            height={172}
          />
        </div>
        <div
          style={{
            position: "absolute",
            top: 22,
            left: 22,
            display: "flex",
            width: 220,
            height: 18,
            background: "#f2380a",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -86,
            bottom: -138,
            display: "flex",
            width: 430,
            height: 430,
            border: "54px solid #f2380a",
            borderRadius: 999,
          }}
        />
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "66px 70px 58px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: 17,
              fontWeight: 700,
              letterSpacing: "0.18em",
            }}
          >
            <span>NEOGEN / OFFICIAL SITE</span>
            <span>NEOGEN.ORG.TW</span>
          </div>
          <div
            style={{
              display: "flex",
              maxWidth: 940,
              flexDirection: "column",
              fontSize: 72,
              fontWeight: 900,
              lineHeight: 0.97,
              letterSpacing: "-0.045em",
            }}
          >
            <span>TAIWAN</span>
            <span>NEW CULTURE</span>
            <span>YOUTH ASSOCIATION</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: "0.11em",
            }}
          >
            <span style={{ display: "flex", width: 64, height: 5, background: "#f2380a" }} />
            <span>NEOGEN.ORG.TW · TAIWAN · 2026</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}

import { ImageResponse } from "next/og";

export const alt = "2027 青年參議院｜1 月 25 日至 27 日立法院會議";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          background: "#f7f5e9",
          color: "#195b32",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            display: "flex",
            width: 375,
            height: "100%",
            background: "#195b32",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 104,
            top: 86,
            display: "flex",
            width: 168,
            height: 168,
            border: "28px solid #ffe02c",
            borderRadius: 999,
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 38,
            bottom: 34,
            display: "flex",
            color: "#f7f5e9",
            fontSize: 142,
            fontWeight: 900,
            letterSpacing: "-0.09em",
            transform: "rotate(-90deg)",
          }}
        >
          2027
        </div>
        <div
          style={{
            display: "flex",
            width: 825,
            height: "100%",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "58px 62px 52px 66px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: 16,
              fontWeight: 800,
              letterSpacing: "0.18em",
            }}
          >
            <span>NEOGEN TAIWAN</span>
            <span style={{ color: "#c74606" }}>JAN 25—27</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                display: "flex",
                color: "#e85505",
                fontSize: 178,
                fontWeight: 900,
                lineHeight: 0.82,
                letterSpacing: "-0.075em",
              }}
            >
              2027
            </span>
            <span
              style={{
                display: "flex",
                marginTop: 30,
                fontSize: 76,
                fontWeight: 900,
                lineHeight: 0.96,
                letterSpacing: "-0.055em",
              }}
            >
              YOUTH ON AIR
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: "0.1em",
            }}
          >
            <span style={{ display: "flex", width: 54, height: 5, background: "#ffe02c" }} />
            <span>TAIWAN NEW CULTURE YOUTH ASSOCIATION</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}

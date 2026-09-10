import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 96, height: 96 };
export const contentType = "image/png";

export default async function Icon() {
  const artwork = await readFile(join(process.cwd(), "public/2027/youth-voice-icon-v1.png"));

  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#f7f5e9" }}>
      <img src={`data:image/png;base64,${artwork.toString("base64")}`} alt="" width={90} height={90} />
    </div>,
    size,
  );
}

import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "臺灣新文化青年協會｜以青年之聲，寫臺灣新章";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Preserve the generated source; only normalize the social-share output size.
// Keep the bitmap local so sharing crawlers never depend on an image-generation service.
const artwork = await readFile(join(process.cwd(), "public/images/og-main-2026-09-18.png"));
const artworkSrc = `data:image/png;base64,${artwork.toString("base64")}`;

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#ffffff" }}>
        <img src={artworkSrc} alt={alt} width={size.width} height={size.height} style={{ objectFit: "cover" }} />
      </div>
    ),
    size,
  );
}

import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

export const alt = "2027 青年參議院—立法院會議｜2027.01.25–01.27，青年問政，議動臺灣";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const artwork = await readFile(
    join(process.cwd(), "public/2027/event-og-2026-09-18.png"),
  );

  return new ImageResponse(
    (
      <img
        src={`data:image/png;base64,${artwork.toString("base64")}`}
        alt={alt}
        width={size.width}
        height={size.height}
        style={{ objectFit: "cover" }}
      />
    ),
    size,
  );
}

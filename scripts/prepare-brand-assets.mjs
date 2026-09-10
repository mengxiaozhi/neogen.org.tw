import path from "node:path";
import { fileURLToPath } from "node:url";
import { mkdir } from "node:fs/promises";

import sharp from "sharp";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, "..");
const source = path.join(
  projectRoot,
  "design/concepts/brand/association-logo-duotone-v1.png",
);
const outputDirectory = path.join(projectRoot, "public/brand");
const comparisonDirectory = path.join(projectRoot, "design/qa");
const reference = path.join(
  projectRoot,
  "design/references/association-lily-pen-source.png",
);

const palettes = {
  main: {
    primary: [10, 10, 10],
    accent: [242, 56, 10],
  },
  event: {
    primary: [25, 91, 50],
    accent: [232, 85, 5],
  },
};

function recolorPixel(r, g, b, palette) {
  const isPaper = r > 205 && g > 205 && b > 195;
  const isWarmAccent = r > 150 && r > g * 1.45 && r > b * 1.5;

  if (isPaper) return [255, 255, 255];
  if (isWarmAccent) return palette.accent;
  return palette.primary;
}

function keepCenteredComponent(data, info) {
  const pixelCount = info.width * info.height;
  const visited = new Uint8Array(pixelCount);
  const queue = new Int32Array(pixelCount);
  const centerX = Math.floor(info.width / 2);
  const centerY = Math.floor(info.height / 2);
  let seed = -1;
  let seedDistance = Number.POSITIVE_INFINITY;

  for (let pixel = 0; pixel < pixelCount; pixel += 1) {
    if (data[pixel * info.channels + 3] <= 8) continue;
    const x = pixel % info.width;
    const y = Math.floor(pixel / info.width);
    const distance = (x - centerX) ** 2 + (y - centerY) ** 2;
    if (distance < seedDistance) {
      seed = pixel;
      seedDistance = distance;
    }
  }

  if (seed < 0) return;

  let head = 0;
  let tail = 1;
  queue[0] = seed;
  visited[seed] = 1;

  while (head < tail) {
    const pixel = queue[head];
    head += 1;
    const x = pixel % info.width;
    const y = Math.floor(pixel / info.width);

    for (let offsetY = -1; offsetY <= 1; offsetY += 1) {
      for (let offsetX = -1; offsetX <= 1; offsetX += 1) {
        if (offsetX === 0 && offsetY === 0) continue;
        const nextX = x + offsetX;
        const nextY = y + offsetY;
        if (
          nextX < 0 ||
          nextY < 0 ||
          nextX >= info.width ||
          nextY >= info.height
        ) {
          continue;
        }

        const nextPixel = nextY * info.width + nextX;
        if (
          visited[nextPixel] ||
          data[nextPixel * info.channels + 3] <= 8
        ) {
          continue;
        }

        visited[nextPixel] = 1;
        queue[tail] = nextPixel;
        tail += 1;
      }
    }
  }

  for (let pixel = 0; pixel < pixelCount; pixel += 1) {
    if (!visited[pixel]) data[pixel * info.channels + 3] = 0;
  }
}

async function preparePalette(name, palette) {
  const { data, info } = await sharp(source)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let index = 0; index < data.length; index += info.channels) {
    const alpha = data[index + 3];
    if (alpha === 0) continue;

    const [r, g, b] = recolorPixel(
      data[index],
      data[index + 1],
      data[index + 2],
      palette,
    );

    data[index] = r;
    data[index + 1] = g;
    data[index + 2] = b;
  }

  keepCenteredComponent(data, info);

  const trimmed = await sharp(data, {
    raw: {
      width: info.width,
      height: info.height,
      channels: info.channels,
    },
  })
    .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const metadata = await sharp(trimmed).metadata();
  const longestSide = Math.max(metadata.width ?? 0, metadata.height ?? 0);
  const padding = Math.round(longestSide * 0.055);

  const padded = await sharp(trimmed)
    .extend({
      top: padding,
      right: padding,
      bottom: padding,
      left: padding,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  await sharp(padded)
    .resize(768, 768, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
      kernel: sharp.kernel.lanczos3,
    })
    .png({ compressionLevel: 9, palette: true, quality: 100 })
    .toFile(path.join(outputDirectory, `association-logo-${name}.png`));
}

async function createPanel(input, background, width, height, imageSize) {
  const artwork = await sharp(input)
    .resize(imageSize, imageSize, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  return sharp({
    create: {
      width,
      height,
      channels: 4,
      background,
    },
  })
    .composite([{ input: artwork, gravity: "center" }])
    .png()
    .toBuffer();
}

async function createComparison() {
  const referencePanel = await createPanel(
    reference,
    "#ffffff",
    760,
    820,
    720,
  );
  const mainPanel = await createPanel(
    path.join(outputDirectory, "association-logo-main.png"),
    "#ffffff",
    720,
    390,
    350,
  );
  const eventPanel = await createPanel(
    path.join(outputDirectory, "association-logo-event.png"),
    "#f7f5e9",
    720,
    390,
    350,
  );

  await sharp({
    create: {
      width: 1600,
      height: 900,
      channels: 4,
      background: "#dfe4e6",
    },
  })
    .composite([
      { input: referencePanel, left: 40, top: 40 },
      { input: mainPanel, left: 840, top: 40 },
      { input: eventPanel, left: 840, top: 470 },
    ])
    .png({ compressionLevel: 9 })
    .toFile(path.join(comparisonDirectory, "association-logo-comparison.png"));
}

await mkdir(outputDirectory, { recursive: true });
await mkdir(comparisonDirectory, { recursive: true });
await Promise.all(
  Object.entries(palettes).map(([name, palette]) =>
    preparePalette(name, palette),
  ),
);
await createComparison();

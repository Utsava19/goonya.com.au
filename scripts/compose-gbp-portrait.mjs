import fs from "fs";
import path from "path";
import sharp from "sharp";
import { Resvg } from "@resvg/resvg-js";

const root = path.resolve(import.meta.dirname, "..");
const gbpDir = path.join(root, "public", "brand", "gbp");
const size = 1200;
const photo = { x: 100, y: 100, w: 1000, h: 760, radius: 32 };

const fontFiles = [
  path.join(root, "node_modules/@fontsource/space-grotesk/files/space-grotesk-latin-600-normal.woff"),
  path.join(root, "node_modules/@fontsource/space-grotesk/files/space-grotesk-latin-700-normal.woff"),
  path.join(root, "node_modules/@fontsource/dm-sans/files/dm-sans-latin-600-normal.woff"),
];

function renderOverlaySvg(name, role) {
  const svg = fs.readFileSync(path.join(gbpDir, "gbp-portrait-overlay.svg"), "utf8")
    .replace("NAME PLACEHOLDER", name)
    .replace("ROLE PLACEHOLDER", role);

  return new Resvg(svg, {
    fitTo: { mode: "width", value: size },
    font: { loadSystemFonts: true, defaultFontFamily: "Space Grotesk", fontFiles },
  }).render().asPng();
}

async function roundedPhotoBuffer(inputPath) {
  const mask = Buffer.from(
    `<svg width="${photo.w}" height="${photo.h}"><rect x="0" y="0" width="${photo.w}" height="${photo.h}" rx="${photo.radius}" fill="white"/></svg>`
  );

  return sharp(inputPath)
    .resize(photo.w, photo.h, { fit: "cover", position: "centre" })
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toBuffer();
}

const [, , slug, photoPath, name, ...roleParts] = process.argv;
const role = roleParts.join(" ") || "Team Member";

if (!slug || !photoPath || !name) {
  console.error(`Usage: npm run gbp:portrait -- <slug> <photo-path> "<name>" "<role>"`);
  process.exit(1);
}

const resolvedPhoto = path.resolve(photoPath);
if (!fs.existsSync(resolvedPhoto)) {
  console.error(`Photo not found: ${resolvedPhoto}`);
  process.exit(1);
}

const [photoBuf, overlayBuf] = await Promise.all([
  roundedPhotoBuffer(resolvedPhoto),
  Promise.resolve(renderOverlaySvg(name, role)),
]);

const output = path.join(gbpDir, `goonya-${slug}.png`);
const professionalJpg = path.join(gbpDir, `goonya-${slug}-professional.jpg`);

await sharp({
  create: { width: size, height: size, channels: 4, background: "#0c0a14" },
})
  .composite([
    { input: photoBuf, left: photo.x, top: photo.y },
    { input: overlayBuf, left: 0, top: 0 },
  ])
  .png({ compressionLevel: 6 })
  .toFile(output);

await sharp(resolvedPhoto)
  .resize(1200, 1200, { fit: "cover", position: "centre" })
  .jpeg({ quality: 92, mozjpeg: true })
  .toFile(professionalJpg);

console.log(`✓ ${path.relative(root, output)}`);
console.log(`✓ ${path.relative(root, professionalJpg)}`);

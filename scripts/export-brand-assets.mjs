import { Resvg } from "@resvg/resvg-js";
import toIco from "to-ico";
import fs from "fs";
import path from "path";

const root = path.resolve(import.meta.dirname, "..");
const brandDir = path.join(root, "public", "brand");

const fontFiles = [
  path.join(root, "node_modules/@fontsource/space-grotesk/files/space-grotesk-latin-600-normal.woff"),
  path.join(root, "node_modules/@fontsource/space-grotesk/files/space-grotesk-latin-700-normal.woff"),
  path.join(root, "node_modules/@fontsource/dm-sans/files/dm-sans-latin-600-normal.woff"),
];

const exports = [
  { input: "goonya-icon-square.svg", output: "goonya-icon-512.png", width: 512 },
  { input: "goonya-icon-square.svg", output: "goonya-icon-320.png", width: 320 },
  { input: "goonya-icon-square.svg", output: "goonya-icon-180.png", width: 180 },
  { input: "goonya-wordmark-dark.svg", output: "goonya-wordmark-dark-800.png", width: 800 },
  { input: "goonya-email-go-logo.svg", output: "goonya-email-go-logo.png", width: 360 },
  { input: "goonya-email-banner.svg", output: "goonya-email-logo.png", width: 360 },
  { input: "goonya-wordmark-light.svg", output: "goonya-wordmark-light-800.png", width: 800 },
  { input: "goonya-facebook-cover.svg", output: "goonya-facebook-cover.png", width: 820 },
  { input: "../favicon.svg", output: "../favicon-48.png", width: 48 },
  { input: "../favicon.svg", output: "../favicon-32.png", width: 32 },
  { input: "../favicon.svg", output: "../apple-touch-icon.png", width: 180 },
  { input: "goonya-wordmark-dark.svg", output: "../logo.png", width: 800 },
];

for (const job of exports) {
  const inputPath = path.join(brandDir, job.input);
  const outputPath = path.resolve(brandDir, job.output);

  const svg = fs.readFileSync(inputPath);
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: job.width },
    font: {
      loadSystemFonts: true,
      defaultFontFamily: "Space Grotesk",
      fontFiles,
    },
  });

  const png = resvg.render().asPng();
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, png);
  console.log(`✓ ${path.relative(root, outputPath)} (${job.width}px)`);
}

const favicon48Path = path.join(root, "public", "favicon-48.png");
const faviconIcoPath = path.join(root, "public", "favicon.ico");
const faviconIco = await toIco([fs.readFileSync(favicon48Path)]);
fs.writeFileSync(faviconIcoPath, faviconIco);
console.log(`✓ ${path.relative(root, faviconIcoPath)} (48px ICO — Google Search)`);

console.log("\nBrand PNG export complete.");

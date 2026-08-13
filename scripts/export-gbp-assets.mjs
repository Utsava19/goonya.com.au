import { Resvg } from "@resvg/resvg-js";
import fs from "fs";
import path from "path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const brandDir = path.join(root, "public", "brand");
const gbpDir = path.join(brandDir, "gbp");

const fontFiles = [
  path.join(root, "node_modules/@fontsource/space-grotesk/files/space-grotesk-latin-600-normal.woff"),
  path.join(root, "node_modules/@fontsource/space-grotesk/files/space-grotesk-latin-700-normal.woff"),
  path.join(root, "node_modules/@fontsource/dm-sans/files/dm-sans-latin-600-normal.woff"),
];

function renderSvg(inputPath, outputPath, width) {
  const svg = fs.readFileSync(inputPath);
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: width },
    font: {
      loadSystemFonts: true,
      defaultFontFamily: "Space Grotesk",
      fontFiles,
    },
  });
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, resvg.render().asPng());
  console.log(`✓ ${path.relative(root, outputPath)} (${width}px)`);
}

async function pngToJpg(pngPath, jpgPath, quality = 95) {
  await sharp(pngPath)
    .jpeg({ quality, mozjpeg: true })
    .toFile(jpgPath);
  console.log(`✓ ${path.relative(root, jpgPath)} (JPG photo)`);
}

function portraitFromTemplate({ name, role, output, width = 1200 }) {
  const template = fs.readFileSync(path.join(gbpDir, "gbp-portrait-frame.svg"), "utf8");
  const svg = template
    .replace("NAME PLACEHOLDER", name)
    .replace("ROLE PLACEHOLDER", role)
    .replace("REPLACE WITH YOUR PHOTO", "UPLOAD YOUR PHOTO TO REPLACE");
  const tmp = path.join(gbpDir, ".tmp-portrait.svg");
  fs.writeFileSync(tmp, svg);
  renderSvg(tmp, output, width);
  fs.unlinkSync(tmp);
}

const jobs = [
  { input: path.join(brandDir, "goonya-facebook-profile.svg"), output: path.join(brandDir, "goonya-facebook-profile-1024.png"), width: 1024 },
  { input: path.join(brandDir, "goonya-facebook-cover.svg"), output: path.join(brandDir, "goonya-facebook-cover-1640.png"), width: 1640 },
  { input: path.join(brandDir, "goonya-facebook-cover.svg"), output: path.join(brandDir, "goonya-facebook-cover.png"), width: 820 },
  { input: path.join(brandDir, "goonya-facebook-profile.svg"), output: path.join(brandDir, "goonya-icon-512.png"), width: 512 },
];

for (const job of jobs) {
  renderSvg(job.input, job.output, job.width);
}

await pngToJpg(
  path.join(brandDir, "goonya-facebook-profile-1024.png"),
  path.join(brandDir, "facebook-profile-photo.jpg")
);
await pngToJpg(
  path.join(brandDir, "goonya-facebook-cover-1640.png"),
  path.join(brandDir, "facebook-cover-photo.jpg")
);

portraitFromTemplate({
  name: "Utsav Adhikari",
  role: "Managing Director",
  output: path.join(gbpDir, "goonya-managing-director-placeholder.png"),
});

portraitFromTemplate({
  name: "Goonya Team Member",
  role: "Digital Growth Specialist",
  output: path.join(gbpDir, "goonya-team-member-placeholder.png"),
});

console.log("\nSocial + portrait placeholder export complete.");

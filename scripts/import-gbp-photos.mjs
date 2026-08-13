import fs from "fs";
import path from "path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const gbpDir = path.join(root, "public", "brand", "gbp");
const assetsDir = path.join(root, ".cursor-assets-import");

const imports = [
  ["office-01.jpg", "goonya-office-01.jpg"],
  ["office-02.jpg", "goonya-office-02.jpg"],
  ["office-03.jpg", "goonya-office-03.jpg"],
  ["working-01.jpg", "goonya-team-working-01.jpg"],
  ["working-02.jpg", "goonya-team-working-02.jpg"],
  ["working-03.jpg", "goonya-team-working-03.jpg"],
  ["working-04.jpg", "goonya-team-working-04.jpg"],
  ["working-05.jpg", "goonya-team-working-05.jpg"],
  ["working-06.jpg", "goonya-team-working-06.jpg"],
];

const sourceRoot = "/Users/rakshya/.cursor/projects/Users-rakshya-Desktop-goonya-com-au/assets";

fs.mkdirSync(gbpDir, { recursive: true });

for (const [srcName, outName] of imports) {
  const input = path.join(sourceRoot, srcName);
  const output = path.join(gbpDir, outName);
  if (!fs.existsSync(input)) {
    console.warn(`Skip missing ${srcName}`);
    continue;
  }
  await sharp(input)
    .resize(1600, 1200, { fit: "cover", position: "centre" })
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile(output);
  console.log(`✓ ${outName}`);
}

console.log("\nGBP photo import complete.");

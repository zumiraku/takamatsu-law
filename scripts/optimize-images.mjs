import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const assets = join(root, "src", "assets");
const outDir = join(assets, "opt");

mkdirSync(outDir, { recursive: true });

const jobs = [
  { file: "hero-cinematic.jpg", width: 1920, quality: 72 },
  { file: "takamatsu-seto.jpg", width: 1600, quality: 70 },
  { file: "consult-chairs.jpg", width: 1200, quality: 72 },
  { file: "corridor-light.jpg", width: 1000, quality: 72 },
  { file: "still-scales.jpg", width: 1200, quality: 72 },
  { file: "hero-office.jpg", width: 1200, quality: 72 },
  { file: "practice-kotsu.jpg", width: 1100, quality: 70 },
  { file: "practice-souzoku.jpg", width: 1100, quality: 70 },
  { file: "practice-rikon.jpg", width: 1100, quality: 70 },
  { file: "practice-saimu.jpg", width: 1100, quality: 70 },
  { file: "practice-higai.jpg", width: 1100, quality: 70 },
  { file: "practice-minji.jpg", width: 1100, quality: 70 },
  { file: "practice-corporate.jpg", width: 1100, quality: 70 },
  { file: "practice-saisei.jpg", width: 1100, quality: 70 },
  { file: "practice-roumu.jpg", width: 1100, quality: 70 },
];

for (const job of jobs) {
  const input = join(assets, job.file);
  const output = join(outDir, job.file.replace(/\.jpg$/i, ".webp"));
  await sharp(input)
    .rotate()
    .resize({ width: job.width, withoutEnlargement: true })
    .webp({ quality: job.quality, effort: 6 })
    .toFile(output);
  const { size } = await sharp(output)
    .metadata()
    .then(async () => {
      const { statSync } = await import("node:fs");
      return { size: statSync(output).size };
    });
  console.log(`${job.file} -> ${(size / 1024).toFixed(0)} KB`);
}

await sharp(join(assets, "hero-cinematic.jpg"))
  .rotate()
  .resize(1200, 630, { fit: "cover", position: "centre" })
  .jpeg({ quality: 68, mozjpeg: true })
  .toFile(join(root, "public", "og.jpg"));

console.log("og.jpg updated");

import { mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const assets = join(root, "src", "assets");
const outDir = join(assets, "opt");

mkdirSync(outDir, { recursive: true });

/**
 * 大きく出る画像は、幅ちがいを複数書き出して srcset で出し分ける。
 * スマートフォンに 1920px の画像を送らないようにするための処理。
 */
const jobs = [
  { file: "hero-cinematic.jpg", widths: [768, 1280, 1920], quality: 72 },
  { file: "takamatsu-seto.jpg", widths: [768, 1600], quality: 70 },
  { file: "consult-chairs.jpg", widths: [640, 1200], quality: 72 },
  { file: "corridor-light.jpg", widths: [640, 1000], quality: 72 },
  { file: "still-scales.jpg", widths: [640, 1200], quality: 72 },
  { file: "hero-office.jpg", widths: [640, 1200], quality: 72 },
  { file: "practice-kotsu.jpg", widths: [640, 1100], quality: 70 },
  { file: "practice-souzoku.jpg", widths: [640, 1100], quality: 70 },
  { file: "practice-rikon.jpg", widths: [640, 1100], quality: 70 },
  { file: "practice-saimu.jpg", widths: [640, 1100], quality: 70 },
  { file: "practice-higai.jpg", widths: [640, 1100], quality: 70 },
  { file: "practice-minji.jpg", widths: [640, 1100], quality: 70 },
  { file: "practice-corporate.jpg", widths: [640, 1100], quality: 70 },
  { file: "practice-saisei.jpg", widths: [640, 1100], quality: 70 },
  { file: "practice-roumu.jpg", widths: [640, 1100], quality: 70 },
];

for (const job of jobs) {
  const input = join(assets, job.file);
  const base = job.file.replace(/\.jpg$/i, "");
  const widest = Math.max(...job.widths);

  for (const width of job.widths) {
    // 最大幅のものだけ従来どおりの名前にして、既存の import をそのまま使う。
    const name = width === widest ? `${base}.webp` : `${base}-${width}.webp`;
    const output = join(outDir, name);
    await sharp(input)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: job.quality, effort: 6 })
      .toFile(output);
    console.log(`${name} -> ${(statSync(output).size / 1024).toFixed(0)} KB`);
  }
}

// ロゴはヘッダー・フッターで全ページに出るので WebP にしておく。
for (const [src, out] of [
  ["takamatsu-logo.jpg", "takamatsu-logo.webp"],
  ["takamatsu-logo.jpg", "takamatsu-logo@2x.webp"],
]) {
  const width = out.includes("@2x") ? 660 : 330;
  const output = join(outDir, out);
  await sharp(join(assets, src))
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 86, effort: 6 })
    .toFile(output);
  console.log(`${out} -> ${(statSync(output).size / 1024).toFixed(0)} KB`);
}

await sharp(join(assets, "hero-cinematic.jpg"))
  .rotate()
  .resize(1200, 630, { fit: "cover", position: "centre" })
  .jpeg({ quality: 68, mozjpeg: true })
  .toFile(join(root, "public", "og.jpg"));

console.log("og.jpg updated");

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

/*
 * SNS で共有されたときに出るカード（og.jpg）。
 *
 * 以前は写真をそのまま切り出していたが、それだと誰の記事か分からない。
 * コラムが共有されるたびに事務所名が出る形にしたいので、ロゴを載せた
 * カードに作り替える。文字は描画せず、ロゴ画像をそのまま使うので、
 * 実行環境にフォントが入っていなくても崩れない。
 */
const OG_W = 1200;
const OG_H = 630;
const BAND_H = 96;

const ogBackdrop =
  Buffer.from(`<svg width="${OG_W}" height="${OG_H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0" stop-color="#001a4d"/>
      <stop offset="0.5" stop-color="#0d3d8c"/>
      <stop offset="1" stop-color="#2b6bc4"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="#ffffff"/>
  <g opacity="0.06" fill="url(#g)">
    <rect x="930" y="70" width="220" height="220" transform="rotate(45 1040 180)"/>
    <rect x="85" y="435" width="130" height="130" transform="rotate(45 150 500)"/>
  </g>
  <rect x="540" y="408" width="120" height="2" fill="#0d3d8c"/>
</svg>`);

const ogLogo = await sharp(join(assets, "takamatsu-logo.jpg")).resize({ width: 620 }).toBuffer();

// 下端に瀬戸内の帯を敷いて、場所が伝わるようにする。
const ogBand = await sharp(join(assets, "takamatsu-seto.jpg"))
  .rotate()
  .resize(OG_W, BAND_H, { fit: "cover", position: "centre" })
  .composite([
    {
      input: Buffer.from(
        `<svg width="${OG_W}" height="${BAND_H}"><rect width="100%" height="100%" fill="#001a4d" opacity="0.72"/></svg>`,
      ),
      top: 0,
      left: 0,
    },
  ])
  .toBuffer();

await sharp(ogBackdrop)
  .composite([
    { input: ogLogo, left: 290, top: 210 },
    { input: ogBand, left: 0, top: OG_H - BAND_H },
  ])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(join(root, "public", "og.jpg"));

console.log(`og.jpg -> ${(statSync(join(root, "public", "og.jpg")).size / 1024).toFixed(0)} KB`);

/*
 * ホーム画面に追加したときのアイコン。
 * 横長のロゴを指定していると、正方形に押し込まれて潰れる。
 * ロゴのダイヤ部分だけを正方形で書き出す。
 */
const TOUCH = 180;
const touchIcon =
  Buffer.from(`<svg width="${TOUCH}" height="${TOUCH}" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="d" x1="0.15" y1="1" x2="0.85" y2="0">
      <stop offset="0" stop-color="#001a4d"/>
      <stop offset="0.45" stop-color="#0d3d8c"/>
      <stop offset="1" stop-color="#2b6bc4"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" fill="#ffffff"/>
  <rect x="10" y="10" width="44" height="44" rx="1" transform="rotate(45 32 32)" fill="url(#d)"/>
  <g fill="#ffffff" opacity="0.95">
    <rect x="22.2" y="28" width="3.4" height="12" rx="0.4"/>
    <rect x="27.2" y="22" width="3.4" height="18" rx="0.4"/>
    <rect x="32.4" y="18" width="3.4" height="22" rx="0.4"/>
    <rect x="37.4" y="24" width="3.4" height="16" rx="0.4"/>
  </g>
</svg>`);

await sharp(touchIcon)
  .png({ compressionLevel: 9 })
  .toFile(join(root, "public", "apple-touch-icon.png"));

console.log(
  `apple-touch-icon.png -> ${(statSync(join(root, "public", "apple-touch-icon.png")).size / 1024).toFixed(1)} KB`,
);

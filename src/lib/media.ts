/**
 * 掲載画像。
 *
 * ここにあるのはすべて仮の写真です。事務所さんからお預かりする写真に
 * 差し替える前提で組んでいます。差し替えは opt/ の同名ファイルを置き換えるだけで、
 * 幅ちがい（srcset）も scripts/optimize-images.mjs が作り直します。
 *
 * 仮写真である以上、代替テキスト（alt）で「当事務所の相談室」等と
 * 名乗らせないこと。実際の場所ではないものを、そうだと書かないためです。
 */
import heroCinematic from "@/assets/opt/hero-cinematic.webp";
import heroCinematic1280 from "@/assets/opt/hero-cinematic-1280.webp";
import heroCinematic768 from "@/assets/opt/hero-cinematic-768.webp";
import heroOffice from "@/assets/opt/hero-office.webp";
import heroOffice640 from "@/assets/opt/hero-office-640.webp";
import takamatsuSeto from "@/assets/opt/takamatsu-seto.webp";
import takamatsuSeto768 from "@/assets/opt/takamatsu-seto-768.webp";
import stillScales from "@/assets/opt/still-scales.webp";
import stillScales640 from "@/assets/opt/still-scales-640.webp";
import corridorLight from "@/assets/opt/corridor-light.webp";
import corridorLight640 from "@/assets/opt/corridor-light-640.webp";
import consultChairs from "@/assets/opt/consult-chairs.webp";
import consultChairs640 from "@/assets/opt/consult-chairs-640.webp";
import practiceKotsu from "@/assets/opt/practice-kotsu.webp";
import practiceKotsu640 from "@/assets/opt/practice-kotsu-640.webp";
import practiceSouzoku from "@/assets/opt/practice-souzoku.webp";
import practiceSouzoku640 from "@/assets/opt/practice-souzoku-640.webp";
import practiceRikon from "@/assets/opt/practice-rikon.webp";
import practiceRikon640 from "@/assets/opt/practice-rikon-640.webp";
import practiceSaimu from "@/assets/opt/practice-saimu.webp";
import practiceSaimu640 from "@/assets/opt/practice-saimu-640.webp";
import practiceHigai from "@/assets/opt/practice-higai.webp";
import practiceHigai640 from "@/assets/opt/practice-higai-640.webp";
import practiceMinji from "@/assets/opt/practice-minji.webp";
import practiceMinji640 from "@/assets/opt/practice-minji-640.webp";
import practiceCorporate from "@/assets/opt/practice-corporate.webp";
import practiceCorporate640 from "@/assets/opt/practice-corporate-640.webp";
import practiceSaisei from "@/assets/opt/practice-saisei.webp";
import practiceSaisei640 from "@/assets/opt/practice-saisei-640.webp";
import practiceRoumu from "@/assets/opt/practice-roumu.webp";
import practiceRoumu640 from "@/assets/opt/practice-roumu-640.webp";

export const IMG = {
  hero: heroCinematic,
  heroOffice,
  sea: takamatsuSeto,
  scales: stillScales,
  corridor: corridorLight,
  consult: consultChairs,
  practices: {
    kotsu: practiceKotsu,
    souzoku: practiceSouzoku,
    rikon: practiceRikon,
    saimu: practiceSaimu,
    higai: practiceHigai,
    minji: practiceMinji,
    komon: practiceCorporate,
    saisei: practiceSaisei,
    roumu: practiceRoumu,
    "kigyo-sonota": stillScales,
  } as Record<string, string>,
};

export const CATEGORY_IMG: Record<string, string> = {
  交通事故: practiceKotsu,
  相続: practiceSouzoku,
  "離婚・男女問題": practiceRikon,
  投資被害: practiceHigai,
  消費者被害: practiceHigai,
  "雑感・その他": stillScales,
};

/**
 * 画像ごとの srcset。既定の src をキーに引く。
 * 画面幅に合ったサイズだけを読み込ませ、スマートフォンに大きな画像を
 * 送らないようにする。呼び出し側は src を渡すだけでよい。
 */
export const SRCSET: Record<string, string> = {
  [heroCinematic]: `${heroCinematic768} 768w, ${heroCinematic1280} 1280w, ${heroCinematic} 1920w`,
  [takamatsuSeto]: `${takamatsuSeto768} 768w, ${takamatsuSeto} 1600w`,
  [heroOffice]: `${heroOffice640} 640w, ${heroOffice} 1200w`,
  [stillScales]: `${stillScales640} 640w, ${stillScales} 1200w`,
  [corridorLight]: `${corridorLight640} 640w, ${corridorLight} 1000w`,
  [consultChairs]: `${consultChairs640} 640w, ${consultChairs} 1200w`,
  [practiceKotsu]: `${practiceKotsu640} 640w, ${practiceKotsu} 1100w`,
  [practiceSouzoku]: `${practiceSouzoku640} 640w, ${practiceSouzoku} 1100w`,
  [practiceRikon]: `${practiceRikon640} 640w, ${practiceRikon} 1100w`,
  [practiceSaimu]: `${practiceSaimu640} 640w, ${practiceSaimu} 1100w`,
  [practiceHigai]: `${practiceHigai640} 640w, ${practiceHigai} 1100w`,
  [practiceMinji]: `${practiceMinji640} 640w, ${practiceMinji} 1100w`,
  [practiceCorporate]: `${practiceCorporate640} 640w, ${practiceCorporate} 1100w`,
  [practiceSaisei]: `${practiceSaisei640} 640w, ${practiceSaisei} 1100w`,
  [practiceRoumu]: `${practiceRoumu640} 640w, ${practiceRoumu} 1100w`,
};

/** src に対応する srcset。無ければ undefined（属性を出さない）。 */
export const srcSetFor = (src: string) => SRCSET[src];

import heroCinematic from "@/assets/hero-cinematic.jpg";
import heroOffice from "@/assets/hero-office.jpg";
import takamatsuSeto from "@/assets/takamatsu-seto.jpg";
import stillScales from "@/assets/still-scales.jpg";
import corridorLight from "@/assets/corridor-light.jpg";
import consultChairs from "@/assets/consult-chairs.jpg";
import textureWashi from "@/assets/texture-washi.jpg";
import practiceKotsu from "@/assets/practice-kotsu.jpg";
import practiceSouzoku from "@/assets/practice-souzoku.jpg";
import practiceRikon from "@/assets/practice-rikon.jpg";
import practiceSaimu from "@/assets/practice-saimu.jpg";
import practiceHigai from "@/assets/practice-higai.jpg";
import practiceMinji from "@/assets/practice-minji.jpg";
import practiceCorporate from "@/assets/practice-corporate.jpg";
import practiceSaisei from "@/assets/practice-saisei.jpg";
import practiceRoumu from "@/assets/practice-roumu.jpg";

export const IMG = {
  hero: heroCinematic,
  heroOffice,
  sea: takamatsuSeto,
  scales: stillScales,
  corridor: corridorLight,
  consult: consultChairs,
  washi: textureWashi,
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

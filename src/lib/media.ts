import heroCinematic from "@/assets/opt/hero-cinematic.webp";
import heroOffice from "@/assets/opt/hero-office.webp";
import takamatsuSeto from "@/assets/opt/takamatsu-seto.webp";
import stillScales from "@/assets/opt/still-scales.webp";
import corridorLight from "@/assets/opt/corridor-light.webp";
import consultChairs from "@/assets/opt/consult-chairs.webp";
import practiceKotsu from "@/assets/opt/practice-kotsu.webp";
import practiceSouzoku from "@/assets/opt/practice-souzoku.webp";
import practiceRikon from "@/assets/opt/practice-rikon.webp";
import practiceSaimu from "@/assets/opt/practice-saimu.webp";
import practiceHigai from "@/assets/opt/practice-higai.webp";
import practiceMinji from "@/assets/opt/practice-minji.webp";
import practiceCorporate from "@/assets/opt/practice-corporate.webp";
import practiceSaisei from "@/assets/opt/practice-saisei.webp";
import practiceRoumu from "@/assets/opt/practice-roumu.webp";

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

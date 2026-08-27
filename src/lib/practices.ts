export type Practice = {
  id: string;
  group: "personal" | "corporate";
  title: string;
  lead: string;
  items: string[];
  oldPaths: string[];
};

export const PRACTICES: Practice[] = [
  {
    id: "kotsu",
    group: "personal",
    title: "交通事故",
    lead: "示談提示額は、裁判基準より低額であることが通常です。特約の有無も含めてご相談ください。",
    items: ["示談交渉", "後遺障害等級", "損害賠償請求", "弁護士費用特約"],
    oldPaths: ["/personal/koutujiko"],
  },
  {
    id: "souzoku",
    group: "personal",
    title: "相続",
    lead: "遺産分割、遺留分、遺言。家族のことであるがゆえに、争いが大きくなりやすい分野です。",
    items: ["遺産分割協議・調停", "遺言書の作成・執行", "遺留分", "相続放棄"],
    oldPaths: ["/personal/inheritance"],
  },
  {
    id: "rikon",
    group: "personal",
    title: "離婚・男女問題",
    lead: "協議・調停・訴訟。親権、養育費、財産分与まで、離婚後の生活を見据えて取り決めます。",
    items: ["協議離婚・調停・訴訟", "親権・面会交流", "養育費・財産分与", "慰謝料"],
    oldPaths: ["/personal/rikon"],
  },
  {
    id: "saimu",
    group: "personal",
    title: "借金問題",
    lead: "任意整理、個人再生、自己破産。収入と生活の状況に応じて、手続きを選びます。",
    items: ["任意整理", "個人再生", "自己破産", "過払金返還請求"],
    oldPaths: ["/personal/debt"],
  },
  {
    id: "higai",
    group: "personal",
    title: "投資被害・消費者被害",
    lead: "訪問販売、投資勧誘、詐欺的な取引。回収が難しい事案でも、報酬の組み立てを含めて検討します。",
    items: ["投資被害", "訪問販売・クーリングオフ", "消費者被害", "詐欺的取引"],
    oldPaths: ["/personal/Investment-damage", "/personal/syohisya"],
  },
  {
    id: "minji",
    group: "personal",
    title: "その他の民事",
    lead: "不当要求への対応、債権回収、登記に関する問題にも対応しています。",
    items: ["不当要求・示談", "債権回収", "登記問題", "損害賠償"],
    oldPaths: ["/personal/jidan", "/personal/saiken", "/personal/touki"],
  },
  {
    id: "komon",
    group: "corporate",
    title: "顧問契約",
    lead: "日常的な相談窓口として、契約書の確認から労務、債権管理まで継続的に支えます。",
    items: ["顧問契約", "契約書の作成・レビュー", "日常的な法律相談"],
    oldPaths: ["/companies/komon", "/corporate/adviser"],
  },
  {
    id: "saisei",
    group: "corporate",
    title: "再生・破産",
    lead: "法人・事業者の倒産・再生。事案に応じて他士業とも連携します。",
    items: ["破産", "民事再生", "事業再生", "事業再編・M&A"],
    oldPaths: ["/companies/saisei"],
  },
  {
    id: "roumu",
    group: "corporate",
    title: "労務管理",
    lead: "未払い賃金、解雇、ハラスメント。使用者側・労働者側いずれにも対応しています。",
    items: ["未払い残業代", "解雇・雇止め", "ハラスメント", "就業規則"],
    oldPaths: ["/companies/roumu"],
  },
  {
    id: "kigyo-sonota",
    group: "corporate",
    title: "債権回収・損害賠償・不当要求",
    lead: "企業活動に伴う請求、被請求、不当な要求への対応を取り扱います。",
    items: ["債権回収", "損害賠償請求", "不当要求対策"],
    oldPaths: ["/companies/saikenkaisyu", "/companies/songaibaisyou", "/companies/hutouyoukyu"],
  },
];

export const PERSONAL = PRACTICES.filter((p) => p.group === "personal");
export const CORPORATE = PRACTICES.filter((p) => p.group === "corporate");

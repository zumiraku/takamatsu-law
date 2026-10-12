export type LawyerCase = {
  court: string;
  summary: string;
  side: string;
};

export type Lawyer = {
  id: string;
  name: string;
  kana: string;
  role: string;
  mark: string;
  fields: string[];
  career: string[];
  positions: string[];
  affiliations: string[];
  cases: LawyerCase[];
  message: string;
  cooperating?: boolean;
};

export const lawyers: Lawyer[] = [
  {
    id: "tamai",
    name: "玉井 邦芳",
    kana: "たまい くによし",
    role: "代表弁護士",
    mark: "玉",
    fields: [
      "交通事故",
      "相続",
      "投資被害",
      "消費者被害",
      "離婚・男女問題",
      "高齢者の法律問題",
      "損害賠償請求",
      "債務整理",
      "企業法務",
      "倒産・再生",
      "労働問題",
      "債権回収",
    ],
    career: [
      "国家公務員を経て旧司法試験に合格",
      "平成19年 香川県弁護士会で弁護士登録",
      "勤務弁護士として2年間執務",
      "平成21年9月 高松総合法律事務所を設立",
    ],
    positions: [
      "香川県弁護士会副会長（H28.4〜H29.3）",
      "日本弁護士連合会代議員（H28.4〜H29.3）",
      "高松簡易裁判所民事調停官・非常勤裁判官（H25.10〜H27.9）",
      "香川県弁護士会消費者問題対策委員会委員長（H24.4〜H28.3）",
      "更生保護法人香川県更生保護協会監事",
    ],
    affiliations: [
      "中小企業診断士（香川県中小企業診断士協会）",
      "全国倒産処理弁護士ネットワーク会員",
      "日本交通法学会会員",
      "日本賠償科学会会員",
      "先物取引被害全国研究会幹事",
    ],
    cases: [
      {
        court: "高松地裁 平成29年4月6日判決",
        summary: "特殊詐欺に利用されたレンタル携帯電話業者の賠償責任を認めた判決。",
        side: "被害者側代理",
      },
      {
        court: "高松地裁 平成29年4月18日判決",
        summary:
          "いわゆる雇われ社長及び従業員の割増賃金、パワハラに基づく損害賠償等の請求をいずれも否定した判決。",
        side: "オーナー・使用者側代理",
      },
      {
        court: "高松高裁 平成29年12月1日判決",
        summary:
          "交通事故で脳挫傷を負った中学生の逸失利益について、学業成績等を理由とした労働能力喪失率の減率を認めなかった判決。",
        side: "被害者側代理",
      },
      {
        court: "大阪地裁 令和7年3月24日判決",
        summary:
          "太陽光発電システムの訪問販売について、記載不備によりクーリングオフが可能であり信販会社に対抗できるとした判決。",
        side: "被害者側代理",
      },
    ],
    message:
      "弁護士となって約20年。企業・個人の案件で培った経験を生かしつつ、驕ることなく日々研鑽し、適確なリーガルサービスを提供できるよう心掛けています。紹介者のいない方、弁護士への相談が初めての方も、気軽にご相談ください。",
  },
  {
    id: "fujiwara",
    name: "藤原 正樹",
    kana: "ふじわら まさき",
    role: "協力弁護士",
    mark: "藤",
    cooperating: true,
    fields: ["知的財産法務", "渉外法務"],
    career: ["平成19年 大阪弁護士会に弁護士登録", "弁護士法人One Asia 大阪オフィス所属"],
    positions: [
      "大阪弁護士会知的財産権委員会第1部委員",
      "大阪学院大学大学院法学研究科修士課程非常勤講師",
    ],
    affiliations: [],
    cases: [],
    message:
      "知的財産法務、渉外法務を得意分野としています。案件の内容によっては、アライアンス関係にある弁護士として当事務所と協力して職務を行います。",
  },
];

export const getLawyer = (id: string) => lawyers.find((l) => l.id === id);

export function representativeLawyer(): Lawyer {
  const found = lawyers.find((l) => !l.cooperating) ?? lawyers[0];
  if (!found) throw new Error("lawyers が空です");
  return found;
}

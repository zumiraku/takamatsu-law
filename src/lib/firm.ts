/** 事務所の基本情報。ヘッダー・フッター・構造化データで共用する。 */

export const FIRM = {
  name: "高松総合法律事務所",
  nameEn: "TAKAMATSU LAW OFFICE",
  tagline: "クライアントの安心と最良の結果のために",
  representative: "玉井邦芳",
  bar: "香川県弁護士会",
  postalCode: "760-0026",
  prefecture: "香川県",
  city: "高松市",
  addressLine: "磨屋町３－１ 合田不動産磨屋町ビル４階",
  address: "〒760-0026 香川県高松市磨屋町３－１ 合田不動産磨屋町ビル４階",
  addressShort: "香川県高松市磨屋町３－１ 合田不動産磨屋町ビル４階",
  telMain: "087-813-1015",
  telMainHref: "tel:+81878131015",
  telReserve: "087-813-1040",
  telReserveHref: "tel:+81878131040",
  hours: "平日 9:00–17:00",
  hoursNote: "年末年始・お盆休みを除く",
  hoursSchema: "Mo-Fr 09:00-17:00",
  access: [
    "JR高松駅から徒歩約10分",
    "ことでん片原町駅から徒歩約10分",
    "高松空港からリムジンバスで兵庫町バス停まで（30〜40分）",
    "兵庫町バス停から徒歩約1分",
  ],
  mapQuery: "香川県高松市磨屋町3-1 合田不動産磨屋町ビル",
  mapEmbed:
    "https://maps.google.com/maps?q=%E9%A6%99%E5%B7%9D%E7%9C%8C%E9%AB%98%E6%9D%BE%E5%B8%82%E7%A3%A8%E5%B1%8B%E7%94%BA3-1&hl=ja&z=17&output=embed",
  siteUrl: "https://takamatsu-law.com",
  facebook: "https://www.facebook.com/takamatsu.law/",
} as const;

export const SITE_TITLE = `${FIRM.name}｜香川・高松の弁護士`;

export const DEFAULT_DESCRIPTION =
  "香川県高松市の法律事務所。交通事故、相続、離婚、借金問題、投資・消費者被害、企業法務まで。紹介は不要です。法律相談は来所面談にてお受けします。";

export function pageTitle(page: string) {
  return `${page}｜${FIRM.name}`;
}

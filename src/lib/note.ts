export type NoteStatus = "planned" | "live";

export const NOTE = {
  status: "planned" as NoteStatus,
  accountUrl: "",
  handle: "",
  salesEnabled: false,
} as const;

export const noteLive = NOTE.status === "live" && NOTE.accountUrl.length > 0;

export type NoteRefKind = "digest" | "paid";

export type NoteRef = {
  kind: NoteRefKind;
  url: string;
  price?: number;
};

export const noteRefLabel: Record<NoteRefKind, string> = {
  digest: "note に要約版",
  paid: "note で販売中",
};

export function noteRefVisible(ref?: NoteRef): ref is NoteRef {
  return Boolean(noteLive && ref && ref.url);
}

export const formatYen = (n: number) => `¥${n.toLocaleString("ja-JP")}`;

export const PUBLISHING_RULES = [
  {
    t: "全文は、このサイトに置く",
    d: "コラムの本文は当サイトを正本とします。検索エンジンに対しても、当サイトのURLを正規（canonical）として明示しています。事務所の言葉が、事務所のドメインに蓄積される形を崩しません。",
  },
  {
    t: "note は、要約と導線にとどめる",
    d: "同じ本文を note と当サイトの両方に置くと、検索エンジンからは同一内容が二か所にある状態に見え、評価が分散します。note には要点の要約と本文への導線を置き、全文は当サイトで読んでいただきます。",
  },
  {
    t: "有料記事は、note 側の書き下ろしとする",
    d: "販売を行う場合は、当サイトの無料記事とは別に、note 限定の書き下ろしとして用意します。無料で読めるものを有料で売る形にはしません。当サイトには導入と目次のみを掲載し、続きを note でお読みいただく導線とします。",
  },
  {
    t: "反応を見てから、判断する",
    d: "どの記事がどれだけ読まれ、どこまで読み進められたかを計測しています。まず当サイトで公開し、反応の大きい主題から note での展開を検討する、という順序を想定しています。",
  },
] as const;

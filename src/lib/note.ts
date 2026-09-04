/**
 * note 連携の設定。
 *
 * 方針：全文の正本（canonical）は常にこのサイト。note は「要約＋導線」または
 * 「有料の書き下ろし」に限定し、同一本文を両方に載せない。これにより
 * 重複コンテンツによる評価分散を避けつつ、note の読者層へ届ける。
 *
 * 運用開始時は status を "live" に変え、accountUrl / handle を入れるだけで
 * サイト全体（コラム一覧・記事下・発信ページ・フッター）の導線が有効になる。
 */

export type NoteStatus = "planned" | "live";

export const NOTE = {
  /** "planned" = 開設準備中（導線は非表示）／"live" = 公開中 */
  status: "planned" as NoteStatus,
  /** 例: "https://note.com/xxxxxxxx" */
  accountUrl: "",
  /** 例: "takamatsulaw" */
  handle: "",
  /** 有料記事の販売を開始したら true */
  salesEnabled: false,
} as const;

export const noteLive = NOTE.status === "live" && NOTE.accountUrl.length > 0;

/** 記事ごとの note 側の掲載形態。 */
export type NoteRefKind =
  /** サイトの記事を要約して note に掲載（本文の正本はサイト） */
  | "digest"
  /** note 限定の有料記事（サイトには導入と目次のみ） */
  | "paid";

export type NoteRef = {
  kind: NoteRefKind;
  /** note 側の記事 URL。未公開なら空文字のままにしておく。 */
  url: string;
  /** 有料記事の価格（円）。無料なら省略。 */
  price?: number;
};

export const noteRefLabel: Record<NoteRefKind, string> = {
  digest: "note に要約版",
  paid: "note で販売中",
};

/** 記事の note 導線を出してよいか。設定と URL の両方が揃ったときだけ true。 */
export function noteRefVisible(ref?: NoteRef): ref is NoteRef {
  return Boolean(noteLive && ref && ref.url);
}

export const formatYen = (n: number) => `¥${n.toLocaleString("ja-JP")}`;

/**
 * 発信ページで説明する運用ルール。
 * WordPress 移行後も、この文言のまま固定ページとして管理画面から編集できる。
 */
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

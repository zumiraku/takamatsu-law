import { createFileRoute } from "@tanstack/react-router";
import { PageHero, CtaBand, SectionTitle } from "@/components/site/PageHero";

export const Route = createFileRoute("/flow")({
  head: () => ({
    meta: [
      { title: "相談までの流れ｜高松法律事務所" },
      {
        name: "description",
        content:
          "お問い合わせから初回相談、ご依頼、解決までの流れをご説明します。ご相談時にお持ちいただきたいものもご案内しています。",
      },
      { property: "og:title", content: "相談までの流れ｜高松法律事務所" },
      { property: "og:description", content: "お問い合わせからご依頼、解決までの流れ。" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/flow" },
    ],
    links: [{ rel: "canonical", href: "/flow" }],
  }),
  component: Flow,
});

const STEPS = [
  {
    t: "お問い合わせ",
    d: "お電話またはフォームよりご連絡ください。ご相談内容の概要と、ご希望の日程を伺います。",
  },
  {
    t: "相談日のご予約",
    d: "原則として平日9:00–18:00。ご都合が合わない場合は、時間外・土日も事前予約で対応します。",
  },
  {
    t: "初回相談（30〜60分）",
    d: "事実関係を整理し、想定される見通し、手続きの流れ、期間、費用をご説明します。この場でご依頼を決めていただく必要はありません。",
  },
  {
    t: "お見積り・委任契約",
    d: "ご依頼いただける場合、書面で見積りをご提示したうえで委任契約を締結します。",
  },
  {
    t: "事件処理",
    d: "交渉・調停・訴訟など、事案に応じて進めます。進捗はその都度ご報告します。",
  },
  {
    t: "解決・ご精算",
    d: "解決内容をご確認いただき、報酬金・実費を精算します。事後のご相談にも対応します。",
  },
];

function Flow() {
  return (
    <>
      <PageHero
        title="相談までの流れ"
        en="HOW IT WORKS"
        lead="はじめて弁護士に相談される方が大半です。準備が整っていない状態でも問題ありません。"
      />

      <section className="container-page py-20 md:py-28">
        <ol className="space-y-px bg-border">
          {STEPS.map((s, i) => (
            <li key={s.t} className="grid gap-4 bg-card p-8 md:grid-cols-[6rem_1fr] md:p-10">
              <span className="font-serif text-3xl text-gold">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h2 className="text-lg">{s.t}</h2>
                <p className="mt-3 text-sm leading-8 text-muted-foreground">{s.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-surface">
        <div className="container-page py-20 md:py-28">
          <SectionTitle title="ご相談時にお持ちいただくもの" en="WHAT TO BRING" />
          <ul className="grid gap-3 text-sm leading-8 text-muted-foreground sm:grid-cols-2">
            {[
              "相手方から届いた書面（内容証明、訴状、通知書など）",
              "契約書、覚書、請求書などの関係資料",
              "やり取りの記録（メール、メッセージの画面など）",
              "戸籍謄本・不動産の資料（相続のご相談の場合）",
              "保険証券（交通事故のご相談の場合）",
              "経緯を時系列でまとめたメモ（お書きいただける範囲で結構です）",
            ].map((i) => (
              <li key={i} className="border-l-2 border-gold/40 pl-4">
                {i}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-xs leading-7 text-muted-foreground">
            ※ 資料が揃っていなくてもご相談は可能です。手元にあるものだけお持ちください。
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { PageHero, CtaBand, SectionTitle } from "@/components/site/PageHero";

export const Route = createFileRoute("/fees")({
  head: () => ({
    meta: [
      { title: "弁護士費用｜高松法律事務所" },
      {
        name: "description",
        content:
          "相談料、着手金、報酬金の考え方と目安を分野別に掲載しています。ご依頼前に必ず見積書をご提示します。",
      },
      { property: "og:title", content: "弁護士費用｜高松法律事務所" },
      { property: "og:description", content: "相談料・着手金・報酬金の目安を分野別にご案内。" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/fees" },
    ],
    links: [{ rel: "canonical", href: "/fees" }],
  }),
  component: Fees,
});

const TABLE: { area: string; rows: [string, string][] }[] = [
  {
    area: "民事一般（金銭請求など）",
    rows: [
      ["着手金", "経済的利益の8%（最低11万円／税込）"],
      ["報酬金", "経済的利益の16%（税込）"],
    ],
  },
  {
    area: "相続",
    rows: [
      ["遺産分割協議・調停 着手金", "22万円〜（税込）"],
      ["遺言書作成", "11万円〜（税込）"],
      ["相続放棄", "5.5万円〜（税込）"],
    ],
  },
  {
    area: "離婚",
    rows: [
      ["協議離婚 着手金", "22万円（税込）"],
      ["調停・訴訟 着手金", "33万円〜（税込）"],
      ["報酬金", "33万円〜（獲得した経済的利益に応じて加算）"],
    ],
  },
  {
    area: "労働（残業代請求）",
    rows: [
      ["着手金", "11万円〜（税込）"],
      ["報酬金", "回収額の16〜20%（税込）"],
    ],
  },
  {
    area: "債務整理",
    rows: [
      ["任意整理", "1社あたり4.4万円（税込）"],
      ["個人再生", "44万円〜（税込）"],
      ["自己破産", "33万円〜（税込）"],
    ],
  },
  {
    area: "顧問契約",
    rows: [
      ["月額", "3.3万円〜（税込／業務量に応じてご相談）"],
      ["顧問先割引", "個別案件の着手金・報酬金を10〜20%減額"],
    ],
  },
];

function Fees() {
  return (
    <>
      <PageHero
        title="弁護士費用"
        en="LEGAL FEES"
        lead="ご依頼をお受けする前に、必ず見積書と委任契約書をご提示します。見通しが立たないまま費用が膨らむことのないよう努めています。"
      />

      <section className="container-page py-20 md:py-28">
        <SectionTitle title="ご相談料" en="CONSULTATION" />
        <div className="grid gap-px bg-border sm:grid-cols-3">
          {[
            ["初回相談", "30分 無料", "相続・離婚・労働・交通事故のご相談"],
            ["一般相談", "30分 5,500円（税込）", "上記以外の分野"],
            ["顧問先企業", "無料", "回数の制限はありません"],
          ].map(([t, p, d]) => (
            <div key={t} className="bg-card p-8">
              <p className="text-sm text-primary">{t}</p>
              <p className="mt-3 font-serif text-xl text-gold">{p}</p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface">
        <div className="container-page py-20 md:py-28">
          <SectionTitle title="分野別の費用目安" en="FEE TABLE" />
          <div className="space-y-10">
            {TABLE.map((t) => (
              <div key={t.area}>
                <h3 className="border-b-2 border-gold pb-3 text-lg">{t.area}</h3>
                <dl>
                  {t.rows.map(([k, v]) => (
                    <div
                      key={k}
                      className="grid gap-1 border-b border-border py-4 md:grid-cols-[20rem_1fr] md:gap-6"
                    >
                      <dt className="text-sm text-primary">{k}</dt>
                      <dd className="text-sm text-muted-foreground">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
          <p className="mt-10 text-xs leading-7 text-muted-foreground">
            ※
            記載の金額は目安です。事案の難易度・見込まれる作業量により増減しますので、正式なご依頼の前に個別にお見積りいたします。
            <br />
            ※ 実費（印紙代、郵券、交通費など）は別途申し受けます。
            <br />※
            交通事故では弁護士費用特約をご利用いただける場合があります。保険証券をご確認ください。
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

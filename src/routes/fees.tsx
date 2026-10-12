import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { PageHero, SectionTitle } from "@/components/site/PageHero";
import { FrameImg } from "@/components/site/Decor";
import { FIRM, pageTitle } from "@/lib/firm";
import { seoMeta } from "@/lib/seo";
import { IMG } from "@/lib/media";

export const Route = createFileRoute("/fees")({
  head: () =>
    seoMeta({
      title: pageTitle("弁護士費用"),
      description: `法律相談料は30分5,500円（税込）。法人・個人事業は60分22,000円。交通事故被害相談は概ね1時間5,000円。${FIRM.name}の費用の目安。`,
      path: "/fees",
    }),
  component: Fees,
});

const KINDS: [string, string][] = [
  ["相談料", "弁護士に相談する際の費用です。受任後の打ち合わせに別途相談料はかかりません。"],
  ["着手金", "事件処理にあたって、最初に必要となる費用です。"],
  ["報酬金", "事件処理の結果に応じて発生する費用です。"],
  ["実費", "印紙代、郵券、交通費など、事件処理のために必要となる費用です。"],
  ["日当", "事務所所在地を離れて移動等に時間を費やす場合に発生する費用です。"],
  ["顧問料", "顧問契約を締結することによって継続的に発生する費用です。"],
];

const CIVIL = [
  ["300万円以下の部分", "8.8%", "17.6%"],
  ["300万円超〜3,000万円以下", "5.5%", "11%"],
  ["3,000万円超〜3億円以下", "3.3%", "6.6%"],
  ["3億円を超える部分", "2.2%", "4.4%"],
];

function Fees() {
  return (
    <>
      <PageHero
        title="弁護士費用"
        en="FEES"
        image={IMG.scales}
        imageAlt="法律書と正義の天秤"
        lead="費用がわからなければ、依頼するかどうかを検討できません。目安を公開し、法律相談の場で個別にお示しします。激安ではありません。事件処理の質を犠牲にして料金を下げる方針は採りません。"
      />

      <section className="container-page py-20 md:py-28">
        <div className="grid items-end gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <SectionTitle title="ご相談料" en="CONSULTATION" />
          </div>
          <FrameImg
            src={IMG.consult}
            alt="椅子とテーブル"
            className="hidden aspect-[4/3] lg:block"
          />
        </div>
        <div className="grid gap-px bg-border sm:grid-cols-3">
          {[
            ["個人の方", "30分 5,500円", "以降30分ごとに 5,500円。多くの相談は1時間程度です。"],
            ["法人・個人事業", "60分 22,000円", "事業に関する相談。以降60分ごとに 22,000円。"],
            ["交通事故被害", "概ね1時間 5,000円", "被害者側のご相談。いずれも消費税込。"],
          ].map(([t, p, d]) => (
            <div key={t} className="bg-card p-8">
              <p className="text-sm text-primary">{t}</p>
              <p className="mt-3 font-serif text-xl text-brand">{p}</p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-xs leading-7 text-muted-foreground">
          ※
          電話やメールのみでの法律相談は、顧問先を除きお断りしています。法律相談は原則として来所面談です。
        </p>
      </section>

      <section className="bg-surface">
        <div className="container-page py-20 md:py-28">
          <SectionTitle title="費用の種類" en="WHAT YOU PAY" />
          <dl className="border-t border-border">
            {KINDS.map(([k, v]) => (
              <div
                key={k}
                className="grid gap-1 border-b border-border py-5 md:grid-cols-[10rem_1fr] md:gap-8"
              >
                <dt className="text-sm text-primary">{k}</dt>
                <dd className="text-sm leading-8 text-muted-foreground">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 text-xs leading-7 text-muted-foreground">
            ウェブ会議を利用した場合、その分の旅費・日当は発生しません。依頼者のコストを考慮し、可能な限りウェブ会議の利用に努めています。
          </p>
        </div>
      </section>

      <section className="container-page space-y-16 py-20 md:py-28">
        <SectionTitle title="分野別の目安" en="GUIDELINE" />
        <p className="max-w-2xl text-sm leading-8 text-muted-foreground">
          着手金・報酬金の「％」は経済的利益に対する割合です。原則として消費税込。事件の内容・難易度により増減します。正確な金額は法律相談時にお尋ねください。
        </p>

        <FeeBlock title="一般民事事件">
          <div className="-mx-6 overflow-x-auto px-6 md:mx-0 md:px-0">
            <table className="w-full min-w-[30rem] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-primary">
                  <th scope="col" className="py-3 pr-4 font-normal">
                    経済的利益
                  </th>
                  <th scope="col" className="py-3 pr-4 font-normal">
                    着手金
                  </th>
                  <th scope="col" className="py-3 font-normal">
                    報酬金
                  </th>
                </tr>
              </thead>
              <tbody>
                {CIVIL.map(([a, b, c]) => (
                  <tr key={a} className="border-b border-border">
                    <th scope="row" className="py-3 pr-4 text-left font-normal">
                      {a}
                    </th>
                    <td className="py-3 pr-4 text-muted-foreground">{b}</td>
                    <td className="py-3 text-muted-foreground">{c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FeeBlock>

        <FeeBlock title="交通事故（被害者側）">
          <Rows
            rows={[
              ["死亡事故（訴訟）", "着手金 55万円 / 報酬金 11%"],
              ["後遺障害1級〜7級（訴訟）", "着手金 55万〜110万円 / 報酬金 11%"],
              ["後遺障害8級〜14級・非該当（訴訟）", "着手金 55万円 / 報酬金 11%"],
              ["示談交渉", "着手金 一律 22万円"],
            ]}
          />
          <p className="mt-4 text-xs leading-7 text-muted-foreground">
            自賠責保険金を先行請求し、着手金に充てる取扱いも実施しています。弁護士費用特約が使える場合があります。
          </p>
        </FeeBlock>

        <FeeBlock title="相続">
          <Rows
            rows={[
              ["遺産分割協議・調停・審判", "着手金 55万円〜 / 報酬金 8.8%"],
              ["遺留分・遺産確認・遺言無効等", "原則として一般民事に準じます"],
            ]}
          />
          <p className="mt-4 text-xs leading-7 text-muted-foreground">
            相続人複数人で依頼があっても着手金の増額はありません（利害対立がある場合は同時受任できません）。着手金は原則として手続の種類ごとに必要です。
          </p>
        </FeeBlock>

        <FeeBlock title="離婚">
          <Rows
            rows={[
              ["調停・審判 着手金", "33万円〜"],
              ["訴訟 着手金", "33万円〜（調停から移行する場合は3分の2まで減額）"],
              ["報酬金（離婚等）", "55万円"],
              ["養育費・面会交流・年金分割・婚姻費用", "報酬金 0円（同一手続内）"],
              ["財産分与・慰謝料", "一般民事に準じます"],
            ]}
          />
        </FeeBlock>

        <FeeBlock title="債務整理（個人）">
          <Rows
            rows={[
              ["任意整理", "着手金 1社 2.2万円 / 報酬金 減額分の11%／過払金の22%"],
              ["自己破産", "着手金 33万円〜 / 報酬金 0円"],
              ["個人再生", "着手金 44万円〜 / 報酬金 0円"],
              ["住宅資金特別条項付", "上記に 11万円加算"],
            ]}
          />
          <p className="mt-4 text-xs leading-7 text-muted-foreground">
            法人・事業者の費用、過払金訴訟、裁判所への予納金は法律相談時にお尋ねください。
          </p>
        </FeeBlock>

        <FeeBlock title="その他">
          <Rows
            rows={[
              ["内容証明（構成検討・文案作成）", "11万円〜"],
              ["文書の簡易なリーガルチェック", "5.5万円〜"],
              ["遺言書作成", "11万円〜"],
              ["契約書作成・レビュー", "11万円〜"],
            ]}
          />
        </FeeBlock>

        <p className="text-xs leading-7 text-muted-foreground">
          ※
          特殊な配慮が必要な事案（回収が困難な投資被害、消費者被害、一部の交通事故など）では、別途の報酬体系を用いることがあります。
          <br />※
          刑事事件は原則としてご紹介のある方のみ受任しており、費用は法律相談時にご案内します。
          <br />※ 本ページに記載のない事案は、法律相談時にお尋ねください。
        </p>
      </section>
    </>
  );
}

function FeeBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="border-b border-brand/50 pb-3 text-lg">{title}</h3>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function Rows({ rows }: { rows: [string, string][] }) {
  return (
    <dl>
      {rows.map(([k, v]) => (
        <div
          key={k}
          className="grid gap-1 border-b border-border py-4 md:grid-cols-[20rem_1fr] md:gap-6"
        >
          <dt className="text-sm text-primary">{k}</dt>
          <dd className="text-sm text-muted-foreground">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

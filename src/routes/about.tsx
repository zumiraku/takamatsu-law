import { createFileRoute } from "@tanstack/react-router";
import { PageHero, CtaBand, SectionTitle } from "@/components/site/PageHero";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "事務所案内｜高松法律事務所" },
      {
        name: "description",
        content:
          "高松法律事務所の理念、所在地、アクセス、事務所概要をご案内します。香川県高松市丸の内、高松市役所ほど近くの法律事務所です。",
      },
      { property: "og:title", content: "事務所案内｜高松法律事務所" },
      {
        property: "og:description",
        content: "高松法律事務所の理念と事務所概要、アクセスのご案内。",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

const PROFILE: [string, string][] = [
  ["名称", "高松法律事務所"],
  ["所在地", "〒760-0033 香川県高松市丸の内○-○ ○○ビル4階"],
  ["電話番号", "087-000-0000"],
  ["FAX", "087-000-0001"],
  ["受付時間", "平日 9:00–18:00（時間外・土日は事前予約制）"],
  ["所属", "香川県弁護士会"],
  ["取扱分野", "相続、離婚・男女問題、労働、交通事故、債務整理、企業法務"],
];

function About() {
  return (
    <>
      <PageHero
        title="事務所案内"
        en="ABOUT US"
        lead="高松の街で、暮らしと事業のとなりにある法律事務所でありたいと考えています。"
      />

      <section className="container-page py-20 md:py-28">
        <SectionTitle title="私たちの姿勢" en="PHILOSOPHY" />
        <div className="grid gap-12 md:grid-cols-3">
          {[
            {
              t: "はじめに、見通しを話す",
              d: "結論だけでなく、想定される流れ、期間、費用、そしてうまくいかない場合の可能性まで、最初にお伝えします。判断の材料が揃ってこそ、納得のいく選択ができると考えています。",
            },
            {
              t: "専門用語を、日常語にする",
              d: "法律の言葉は、そのままでは生活の実感と結びつきません。ご相談の場では、いま何が起きていて、次に何が起こるのかを、平易な言葉で説明します。",
            },
            {
              t: "地域の事情を踏まえる",
              d: "香川県内の裁判所・調停の運用、地元企業の商慣行を前提に、現実的に機能する解決策をご提案します。",
            },
          ].map((v) => (
            <div key={v.t} className="border-t-2 border-gold pt-6">
              <h3 className="text-lg">{v.t}</h3>
              <p className="mt-4 text-sm leading-8 text-muted-foreground">{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface">
        <div className="container-page py-20 md:py-28">
          <SectionTitle title="事務所概要" en="PROFILE" />
          <dl className="border-t border-border">
            {PROFILE.map(([k, v]) => (
              <div
                key={k}
                className="grid gap-1 border-b border-border py-5 md:grid-cols-[12rem_1fr] md:gap-6"
              >
                <dt className="text-sm text-primary">{k}</dt>
                <dd className="text-sm leading-8 text-muted-foreground">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="container-page py-20 md:py-28">
        <SectionTitle title="アクセス" en="ACCESS" />
        <div className="grid gap-10 md:grid-cols-2">
          <ul className="space-y-4 text-sm leading-8 text-muted-foreground">
            <li>ことでん「片原町駅」から徒歩約8分</li>
            <li>JR「高松駅」から徒歩約12分</li>
            <li>高松市役所から徒歩約3分</li>
            <li>お車でお越しの場合は近隣のコインパーキングをご利用ください</li>
          </ul>
          <div className="flex min-h-56 items-center justify-center border border-border bg-surface text-sm text-muted-foreground">
            地図（Googleマップ埋め込み予定）
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

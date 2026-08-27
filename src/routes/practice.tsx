import { createFileRoute } from "@tanstack/react-router";
import { Scale, Users, Building2, Car, HeartHandshake, Wallet } from "lucide-react";
import { PageHero, CtaBand } from "@/components/site/PageHero";

export const Route = createFileRoute("/practice")({
  head: () => ({
    meta: [
      { title: "取扱業務｜高松法律事務所" },
      {
        name: "description",
        content:
          "相続・遺言、離婚・男女問題、労働問題、企業法務、交通事故、債務整理。高松法律事務所が取り扱う分野をご案内します。",
      },
      { property: "og:title", content: "取扱業務｜高松法律事務所" },
      { property: "og:description", content: "高松法律事務所が取り扱う6つの分野のご案内。" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/practice" },
    ],
    links: [{ rel: "canonical", href: "/practice" }],
  }),
  component: Practice,
});

const AREAS = [
  {
    icon: Scale,
    title: "相続・遺言",
    lead: "分けることよりも、その後の関係が続くことを見据えて。",
    items: ["遺産分割協議・調停", "遺言書の作成・執行", "相続放棄", "遺留分侵害額請求"],
  },
  {
    icon: HeartHandshake,
    title: "離婚・男女問題",
    lead: "離婚後の生活設計まで含めて取り決めます。",
    items: ["協議離婚・調停・訴訟", "親権・面会交流", "養育費・婚姻費用", "財産分与・慰謝料"],
  },
  {
    icon: Users,
    title: "労働問題",
    lead: "労働者側・使用者側いずれのご相談にも対応します。",
    items: ["未払い残業代請求", "不当解雇・雇止め", "ハラスメント対応", "就業規則の整備"],
  },
  {
    icon: Building2,
    title: "企業法務",
    lead: "顧問契約により、日常的な相談窓口として機能します。",
    items: ["契約書の作成・チェック", "債権回収", "労務管理", "事業承継"],
  },
  {
    icon: Car,
    title: "交通事故",
    lead: "弁護士費用特約が使える場合があります。",
    items: ["示談交渉", "後遺障害等級認定", "損害賠償請求訴訟", "物損事故"],
  },
  {
    icon: Wallet,
    title: "債務整理",
    lead: "受任通知の送付により、督促は止まります。",
    items: ["任意整理", "個人再生", "自己破産", "過払金返還請求"],
  },
];

function Practice() {
  return (
    <>
      <PageHero
        title="取扱業務"
        en="PRACTICE AREAS"
        lead="以下の分野を中心に取り扱っています。該当がはっきりしない場合も、まずはご相談ください。"
      />

      <section className="container-page py-20 md:py-28">
        <ul className="grid gap-px bg-border md:grid-cols-2">
          {AREAS.map(({ icon: Icon, title, lead, items }) => (
            <li key={title} className="bg-card p-8 md:p-10">
              <Icon className="size-6 text-gold" aria-hidden />
              <h2 className="mt-5 text-xl">{title}</h2>
              <p className="mt-3 text-sm leading-8 text-muted-foreground">{lead}</p>
              <ul className="mt-6 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                {items.map((i) => (
                  <li key={i} className="border-l-2 border-gold/40 pl-3">
                    {i}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand />
    </>
  );
}

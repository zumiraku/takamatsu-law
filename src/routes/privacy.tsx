import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "プライバシーポリシー｜高松法律事務所" },
      {
        name: "description",
        content:
          "高松法律事務所における個人情報の取扱い方針、利用目的、第三者提供、開示請求への対応について定めています。",
      },
      { property: "og:title", content: "プライバシーポリシー｜高松法律事務所" },
      { property: "og:description", content: "個人情報の取扱いに関する方針。" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: Privacy,
});

const SECTIONS: [string, string][] = [
  [
    "1. 個人情報の取得",
    "当事務所は、ご相談・ご依頼の受付、お問い合わせへの対応に必要な範囲で、適法かつ公正な手段により個人情報を取得します。",
  ],
  [
    "2. 利用目的",
    "取得した個人情報は、法律相談および事件処理、ご連絡、当事務所からのご案内のために利用します。これら以外の目的で利用する場合は、あらかじめご本人の同意を得ます。",
  ],
  [
    "3. 守秘義務",
    "弁護士は弁護士法第23条により守秘義務を負っています。ご相談内容は、法令に基づく場合を除き、ご本人の同意なく第三者に開示することはありません。",
  ],
  [
    "4. 第三者提供",
    "法令に基づく場合、または事件処理上必要かつご本人の同意を得た場合を除き、個人情報を第三者に提供しません。",
  ],
  [
    "5. 安全管理",
    "個人情報の漏えい、滅失または毀損の防止のため、必要かつ適切な安全管理措置を講じます。",
  ],
  [
    "6. 開示・訂正・削除",
    "ご本人からの開示、訂正、利用停止等のご請求には、法令に従い速やかに対応します。下記までご連絡ください。",
  ],
  ["7. お問い合わせ窓口", "高松法律事務所　TEL 087-000-0000（平日 9:00–18:00）"],
];

function Privacy() {
  return (
    <>
      <PageHero title="プライバシーポリシー" en="PRIVACY POLICY" />
      <section className="container-page max-w-3xl py-20 md:py-28">
        <div className="space-y-10">
          {SECTIONS.map(([t, d]) => (
            <div key={t}>
              <h2 className="text-lg">{t}</h2>
              <p className="mt-3 text-sm leading-9 text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

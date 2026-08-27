import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { FIRM, pageTitle } from "@/lib/firm";
import { seoMeta } from "@/lib/seo";
import { IMG } from "@/lib/media";

export const Route = createFileRoute("/privacy")({
  head: () =>
    seoMeta({
      title: pageTitle("プライバシーポリシー"),
      description: `${FIRM.name}における個人情報の取得、利用、第三者提供、開示請求への対応について定めています。`,
      path: "/privacy",
    }),
  component: Privacy,
});

const SECTIONS: [string, string][] = [
  [
    "1. 個人情報の取得について",
    "当事務所は、適法かつ公正な手段によって、個人情報を取得いたします。",
  ],
  [
    "2. 個人情報の利用について",
    "当事務所は、本人から取得した個人情報につきましては、公益のため又は業務の遂行上必要な限りにおいて利用いたします。個人情報を第三者との間で共同利用し、又は個人情報の取り扱いを第三者に委託する場合には、当該第三者につき厳正な調査を行ったうえ、秘密を保持させるために適正な監督を行います。",
  ],
  [
    "3. 個人情報の第三者提供について",
    "当事務所は法令に定める場合、その他正当な理由のある場合を除き、個人情報を事前に本人の同意を得ることなく第三者に提供しません。",
  ],
  [
    "4. 個人情報の管理について",
    "当事務所は、個人情報の正確性を保ち、これを安全に管理いたします。個人情報の紛失、破壊、改ざん及び漏洩などを防止するため、不正アクセス、コンピュータウイルス等に対する適正な情報セキュリティ対策を講じます。個人情報を持ち出し、外部へ送信する等により漏洩させません。弁護士は弁護士法第23条により守秘義務を負っています。",
  ],
  [
    "5. 開示・訂正・利用停止・消去について",
    "当事務所は、本人が自己の個人情報について、開示・訂正・利用停止・消去等を求める権利を有していることを確認し、これらの要求のある場合には、速やかに検討のうえで対応いたします。",
  ],
  [
    "6. 組織・体制",
    "当事務所は、個人情報管理者を任命し、個人情報の適正な管理を実施いたします。従業員に対し、個人情報の保護及び適正な管理方法についての研修を実施し、日常業務における個人情報の適正な取り扱いを徹底します。",
  ],
];

function Privacy() {
  return (
    <>
      <PageHero
        title="プライバシーポリシー"
        en="PRIVACY POLICY"
        image={IMG.corridor}
        imageAlt=""
        lead={`${FIRM.name}（以下「当事務所」という。）は、高度情報通信社会における個人情報の重要性を認識し、以下の方針に基づき個人情報の保護に努めます。`}
      />
      <section className="container-page max-w-3xl py-20 md:py-28">
        <div className="space-y-12">
          {SECTIONS.map(([t, d]) => (
            <div key={t}>
              <h2 className="text-lg">{t}</h2>
              <p className="mt-4 text-sm leading-9 text-muted-foreground">{d}</p>
            </div>
          ))}
          <div>
            <h2 className="text-lg">7. お問い合わせ窓口</h2>
            <p className="mt-4 text-sm leading-9 text-muted-foreground">
              {FIRM.name}
              <br />
              TEL {FIRM.telMain}（{FIRM.hours}）
              <br />
              {FIRM.address}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { Scale, Users, Building2, Car, HeartHandshake, Wallet, ArrowRight } from "lucide-react";
import heroOffice from "@/assets/hero-office.jpg";
import { SectionTitle, CtaBand } from "@/components/site/PageHero";
import { columns, formatDate } from "@/lib/columns";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "高松法律事務所｜香川・高松の弁護士による法律相談" },
      {
        name: "description",
        content:
          "香川県高松市の高松法律事務所。相続・離婚・労働・交通事故・債務整理・企業法務のご相談に、地域に根ざした弁護士が対応します。",
      },
      { property: "og:title", content: "高松法律事務所｜香川・高松の弁護士による法律相談" },
      {
        property: "og:description",
        content: "香川県高松市の法律事務所。相続・離婚・労働問題などを丁寧にサポートします。",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LegalService",
          name: "高松法律事務所",
          areaServed: "香川県高松市",
          address: {
            "@type": "PostalAddress",
            addressRegion: "香川県",
            addressLocality: "高松市",
            postalCode: "760-0033",
            streetAddress: "丸の内○-○ ○○ビル4階",
          },
          telephone: "+81-87-000-0000",
        }),
      },
    ],
  }),
  component: Home,
});

const PRACTICES = [
  { icon: Scale, title: "相続・遺言", desc: "遺産分割、遺言書の作成、相続放棄。" },
  { icon: HeartHandshake, title: "離婚・男女問題", desc: "親権、養育費、財産分与の取り決め。" },
  { icon: Users, title: "労働問題", desc: "未払い残業代、不当解雇、ハラスメント。" },
  { icon: Building2, title: "企業法務", desc: "契約書チェック、労務、顧問契約。" },
  { icon: Car, title: "交通事故", desc: "示談交渉、後遺障害、損害賠償請求。" },
  { icon: Wallet, title: "債務整理", desc: "任意整理、個人再生、自己破産。" },
];

function Home() {
  const latest = columns.slice(0, 3);

  return (
    <>
      <section className="relative">
        <div className="grid md:grid-cols-2">
          <div className="flex items-center bg-background px-5 py-20 md:py-32">
            <div className="mx-auto w-full max-w-lg">
              <p className="text-[11px] tracking-[0.35em] text-gold">TAKAMATSU LAW OFFICE</p>
              <h1 className="mt-6 text-3xl leading-[1.7] md:text-[2.6rem]">
                法律は、
                <br />
                日常を取り戻すための
                <br />
                道具である。
              </h1>
              <p className="mt-8 text-sm leading-9 text-muted-foreground">
                香川・高松で、地域の方々と企業の相談に向き合ってきました。
                難しい言葉を使わず、いま何が起きていて、これからどう進むのかを、
                はじめにご説明します。
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-primary px-7 py-3.5 text-sm text-primary-foreground transition-opacity hover:opacity-90"
                >
                  相談を予約する <ArrowRight className="size-4" aria-hidden />
                </Link>
                <Link
                  to="/practice"
                  className="inline-flex items-center gap-2 border border-border px-7 py-3.5 text-sm text-foreground transition-colors hover:bg-surface"
                >
                  取扱業務を見る
                </Link>
              </div>
            </div>
          </div>
          <img
            src={heroOffice}
            alt="静かな光が差し込む高松法律事務所の相談室"
            width={1600}
            height={1104}
            className="h-64 w-full object-cover md:h-full"
          />
        </div>
      </section>

      <section className="container-page py-20 md:py-28">
        <SectionTitle title="取扱業務" en="PRACTICE AREAS" />
        <ul className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {PRACTICES.map(({ icon: Icon, title, desc }) => (
            <li key={title} className="bg-card p-8 transition-colors hover:bg-surface">
              <Icon className="size-6 text-gold" aria-hidden />
              <h3 className="mt-5 text-lg">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{desc}</p>
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <Link to="/practice" className="text-sm text-primary underline underline-offset-8">
            取扱業務の一覧を見る
          </Link>
        </div>
      </section>

      <section className="bg-surface">
        <div className="container-page grid gap-12 py-20 md:grid-cols-[1fr_1.2fr] md:py-28">
          <SectionTitle title="当事務所について" en="ABOUT US" />
          <div className="space-y-6 text-sm leading-9 text-muted-foreground">
            <p>
              高松法律事務所は、香川県高松市に拠点を置く法律事務所です。
              個人の方の相続・離婚・労働問題から、地元企業の法務まで、
              生活と事業に密着した分野を中心に取り扱っています。
            </p>
            <p>
              ご相談の場では、まず事実関係を一緒に整理します。
              見通し、かかる期間、費用について、最初にお伝えすることを大切にしています。
            </p>
            <Link to="/about" className="inline-block text-primary underline underline-offset-8">
              事務所案内を見る
            </Link>
          </div>
        </div>
      </section>

      <section className="container-page py-20 md:py-28">
        <SectionTitle title="コラム" en="COLUMN" />
        <ul className="divide-y divide-border border-y border-border">
          {latest.map((c) => (
            <li key={c.slug}>
              <Link
                to="/column/$slug"
                params={{ slug: c.slug }}
                className="group flex flex-col gap-2 py-7 transition-colors hover:bg-surface md:flex-row md:items-baseline md:gap-8"
              >
                <span className="text-xs tracking-widest text-muted-foreground">
                  {formatDate(c.date)}
                </span>
                <span className="w-fit border border-gold/40 px-3 py-0.5 text-xs text-gold">
                  {c.category}
                </span>
                <span className="flex-1 text-base leading-8 group-hover:text-primary">
                  {c.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <Link to="/column" className="text-sm text-primary underline underline-offset-8">
            コラムの一覧を見る
          </Link>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

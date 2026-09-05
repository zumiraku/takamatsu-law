import { createFileRoute } from "@tanstack/react-router";
import { PageHero, JournalBand, SectionTitle } from "@/components/site/PageHero";
import { FrameImg } from "@/components/site/Decor";
import { Reveal } from "@/components/site/Reveal";
import { FIRM, pageTitle } from "@/lib/firm";
import { seoMeta } from "@/lib/seo";
import { IMG } from "@/lib/media";

export const Route = createFileRoute("/about")({
  head: () =>
    seoMeta({
      title: pageTitle("事務所案内"),
      description: `${FIRM.name}の理念、所在地、アクセス。${FIRM.addressShort}。${FIRM.bar}所属。`,
      path: "/about",
    }),
  component: About,
});

const PROFILE: [string, string][] = [
  ["名称", FIRM.name],
  ["代表弁護士", `${FIRM.representative}（${FIRM.bar}所属）`],
  ["所在地", FIRM.address],
  ["代表電話", FIRM.telMain],
  ["相談予約", `${FIRM.telReserve}（${FIRM.hours}）`],
  ["受付時間", `${FIRM.hours}（${FIRM.hoursNote}）`],
  ["取扱分野", "交通事故、相続、離婚・男女問題、借金問題、投資・消費者被害、企業法務 ほか"],
];

function About() {
  return (
    <>
      <PageHero
        title="事務所案内"
        en="ABOUT US"
        image={IMG.corridor}
        imageAlt="光の差す廊下"
        lead="一般の方にも、事業者の方にも、弁護士によるリーガルサービスが届くべきだと考えています。事務所の考えは、コラムでも公開しています。"
      />

      <section className="container-page py-20 md:py-28">
        <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <SectionTitle title="私たちの考え" en="PHILOSOPHY" />
            <div className="space-y-7 text-sm leading-9 text-muted-foreground">
              <p>
                従来の弁護士のイメージは、敷居が高い、費用がいくらかかるのかわからない、紹介がないと相手にされなさそう、といった近寄りがたいものだったのではないかと思います。
              </p>
              <p>
                {FIRM.name}
                は、一般市民や事業者・企業等のさまざまな方々にリーガルサービスが届くべきとの考えから、広く相談を受け付けています。同時に、実務で得た論点をコラムとして残し、事務所の考えを公開することを大切にしています。
              </p>
              <p>
                取り扱う業務は、交通事故、相続、離婚・男女問題、消費者被害、投資被害、債務整理、損害賠償、債権回収、不動産の問題といった個人の問題から、契約書作成、顧問業務、倒産・再生、労務管理、会社関係訴訟といった法人の問題まで、広く対応しています。他事務所の弁護士や他士業とのアライアンスもあり、案件の内容によっては協力して職務を行います。
              </p>
            </div>
          </Reveal>
          <Reveal delay={140}>
            <div className="grid grid-cols-2 gap-3">
              <FrameImg
                src={IMG.consult}
                alt="室内"
                className="col-span-2 aspect-[16/9]"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
              <FrameImg src={IMG.scales} alt="法律書と天秤" className="aspect-square" />
              <FrameImg src={IMG.heroOffice} alt="朝の光が入る室内" className="aspect-square" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-surface">
        <div className="container-page py-20 md:py-28">
          <SectionTitle title="事務所概要" en="PROFILE" />
          <dl className="border-t border-border">
            {PROFILE.map(([k, v]) => (
              <div
                key={k}
                className="grid gap-1 border-b border-border py-5 md:grid-cols-[12rem_1fr] md:gap-8"
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
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm leading-8 text-muted-foreground">{FIRM.address}</p>
            <ul className="mt-6 space-y-3 text-sm leading-8 text-muted-foreground">
              {FIRM.access.map((a) => (
                <li key={a} className="border-l border-brand/40 pl-4">
                  {a}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-muted-foreground">
              お車でお越しの場合は、近隣のコインパーキングをご利用ください。
            </p>
          </div>
          <div className="overflow-hidden border border-border">
            <iframe
              title={`${FIRM.name}の地図`}
              src={FIRM.mapEmbed}
              className="min-h-72 w-full border-0 bg-surface grayscale-[25%] contrast-[0.96]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <JournalBand />
    </>
  );
}

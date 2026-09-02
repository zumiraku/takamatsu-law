import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionTitle } from "@/components/site/PageHero";
import { FrameImg } from "@/components/site/Decor";
import { Reveal } from "@/components/site/Reveal";
import { FIRM, pageTitle } from "@/lib/firm";
import { seoMeta } from "@/lib/seo";
import { IMG } from "@/lib/media";

export const Route = createFileRoute("/flow")({
  head: () =>
    seoMeta({
      title: pageTitle("相談までの流れ"),
      description: `お電話でのご予約から来所相談、ご依頼までの流れ。相談予約専用 ${FIRM.telReserve}（${FIRM.hours}）。`,
      path: "/flow",
    }),
  component: Flow,
});

const STEPS = [
  {
    t: "お電話でご予約",
    img: IMG.scales,
    d: `相談予約専用 ${FIRM.telReserve}（${FIRM.hours}）へお電話ください。お名前、事案の概要、相手方のお名前を伺ったうえで、来所日時を調整します。同種案件の相談は3回を上限とさせていただきます。`,
  },
  {
    t: "来所・ご相談",
    img: IMG.consult,
    d: "予約時刻の少し前にお越しください。相談票をご記入いただいたうえで、弁護士がお話を伺います。資料があればお持ちください。なくてもご相談は可能です。",
  },
  {
    t: "見通しのご説明",
    img: IMG.corridor,
    d: "法的な結論と見通しをお伝えします。前向きな話ができる場合も、厳しい話をせざるを得ない場合もあります。相談したから依頼しなければならない、ということはありません。",
  },
  {
    t: "ご依頼・事件処理",
    img: IMG.heroOffice,
    d: "ご依頼いただける場合、費用をご説明したうえで委任契約を締結します。進捗はその都度ご報告します。事案や件数の都合により、お断りすることがあります。",
  },
];

function Flow() {
  return (
    <>
      <PageHero
        title="相談までの流れ"
        en="CONSULTATION"
        image={IMG.consult}
        imageAlt="対面でお話を伺う相談室"
        lead="紹介は不要です。弁護士への相談が初めての方にも、お気軽にご連絡ください。なお、当事務所は法テラスと契約していないため、法テラスの利用はできません。"
      />

      <section className="container-page py-20 md:py-28">
        <ol className="space-y-10">
          {STEPS.map((s, i) => (
            <li key={s.t}>
              <Reveal delay={i * 70}>
                <div className="grid items-center gap-8 border-t border-border pt-10 md:grid-cols-[minmax(0,16rem)_1fr] md:pt-12">
                  <FrameImg src={s.img} alt="" className="aspect-[4/3]" />
                  <div className="grid gap-4 md:grid-cols-[6rem_1fr]">
                    <span className="font-serif text-3xl text-brand">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h2 className="text-lg">{s.t}</h2>
                      <p className="mt-4 text-sm leading-8 text-muted-foreground">{s.d}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-surface">
        <div className="container-page py-20 md:py-28">
          <SectionTitle title="ご相談時にお持ちいただくもの" en="WHAT TO BRING" />
          <ul className="grid gap-3 text-sm leading-8 text-muted-foreground sm:grid-cols-2">
            {[
              "交通事故：交通事故証明書、診断書など",
              "借金問題：請求書、債権者一覧、給与明細など",
              "相続：相続関係図、不動産の全部事項証明書、固定資産税評価証明書など",
              "相手方から届いた書面（内容証明、訴状、通知書など）",
              "契約書、請求書、やり取りの記録",
              "経緯を時系列でまとめたメモ（書ける範囲で結構です）",
            ].map((i) => (
              <li key={i} className="border-l border-brand/40 pl-4">
                {i}
              </li>
            ))}
          </ul>
          <p className="mt-10 text-xs leading-7 text-muted-foreground">
            ※
            いったんご予約いただいた後のキャンセルは、なるべくご遠慮ください。当日キャンセル・無断キャンセルの場合は相談料をいただくことがあります。
            <br />※
            法律相談は原則有料です。電話・メールのみでの法律相談は、顧問先を除きお受けできません。
          </p>
        </div>
      </section>
    </>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, SectionTitle, JournalBand } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { FrameImg } from "@/components/site/Decor";
import { NoteAccountLink, NotePreview } from "@/components/site/NoteLink";
import { NOTE, PUBLISHING_RULES } from "@/lib/note";
import { CATEGORIES, columns } from "@/lib/columns";
import { FIRM, pageTitle } from "@/lib/firm";
import { jsonLdBreadcrumb, seoMeta } from "@/lib/seo";
import { IMG } from "@/lib/media";

export const Route = createFileRoute("/publishing")({
  head: () => {
    const seo = seoMeta({
      title: pageTitle("発信について"),
      description: `${FIRM.name}の情報発信の方針。コラム・お知らせ・note のそれぞれの役割と、全文の正規の掲載場所について。`,
      path: "/publishing",
    });
    return {
      ...seo,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(
            jsonLdBreadcrumb([
              { name: "ホーム", path: "/" },
              { name: "発信について", path: "/publishing" },
            ]),
          ),
        },
      ],
    };
  },
  component: Publishing,
});

const CHANNELS = [
  {
    en: "JOURNAL",
    t: "コラム",
    role: "全文の正本",
    d: "実務で扱った論点を、一般論として書き起こしたものです。事務所の考え方が最もよく表れる場所であり、全文はこのサイトにのみ置きます。",
    to: "/column" as const,
    cta: "コラムを読む",
  },
  {
    en: "NEWS",
    t: "お知らせ",
    role: "事務的なご案内",
    d: "休業日、相談料の改定など、事務的な連絡です。読み物であるコラムとは分けています。探している情報にすぐ行き着けるようにするためです。",
    to: "/news" as const,
    cta: "お知らせを見る",
  },
  {
    en: "NOTE",
    t: "note",
    role: "要約と、書き下ろし",
    d: "note の読者層に向けた要約と、note 限定の書き下ろしを想定しています。同じ本文を二か所に置くことはしません。",
    to: null,
    cta: "",
  },
];

const MEASUREMENT = [
  {
    n: "01",
    t: "まず、サイトで公開する",
    d: "新しい主題は、はじめに当サイトのコラムとして公開します。全文が事務所のドメインに残り、検索からも読まれる状態を先に作ります。",
  },
  {
    n: "02",
    t: "読まれ方を見る",
    d: "記事ごとの閲覧数に加えて、本文をどこまで読み進めていただけたかを計測しています。「開かれた数」と「最後まで読まれた数」は別の指標です。後者が高い主題ほど、深く知りたい読者がいるということになります。",
  },
  {
    n: "03",
    t: "反応の大きい主題から、note へ",
    d: "読了率の高い主題を選び、note 限定の書き下ろしとして展開します。何を有料にするかを勘で決めるのではなく、実際の反応から決められる状態にしておきます。",
  },
];

function Publishing() {
  return (
    <>
      <PageHero
        title="発信について"
        en="PUBLISHING"
        image={IMG.corridor}
        imageAlt="光の差す廊下"
        lead="広告で名前を広げるのではなく、書いたものを読んでいただくことで事務所を知っていただきたいと考えています。そのための置き方を、あらかじめ決めています。"
      />

      <section className="container-page py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <Reveal>
            <SectionTitle title="なぜ、書くのか" en="WHY WE WRITE" />
            <div className="space-y-7 text-[15px] leading-9 text-muted-foreground">
              <p>
                法律の問題は、多くの方にとって一生に何度もあることではありません。だからこそ、依頼する側から見て、その弁護士がどのように考える人なのかは、事前にはほとんど分かりません。
              </p>
              <p>
                {FIRM.name}
                は、実務のなかで検討した論点を書き残し、公開しています。事件の中身をお話しすることはできませんが、考え方の筋道はお見せできます。それが、事務所を知っていただく最も誠実な方法だと考えています。
              </p>
              <p>
                現在、{columns.length}本のコラムを{CATEGORIES.length}
                の分野に分けて公開しています。2015年に書いたものも、そのまま残しています。
              </p>
            </div>
          </Reveal>
          <Reveal delay={140}>
            <div className="grid grid-cols-2 gap-3">
              <FrameImg
                src={IMG.scales}
                alt="法律書と正義の天秤"
                className="col-span-2 aspect-[16/9]"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
              <FrameImg src={IMG.heroOffice} alt="机上" className="aspect-square" />
              <FrameImg src={IMG.consult} alt="室内" className="aspect-square" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-surface">
        <div className="container-page py-20 md:py-28">
          <SectionTitle title="三つの置き場所" en="WHERE WE PUBLISH" />
          <ul className="grid gap-px border border-border bg-border md:grid-cols-3">
            {CHANNELS.map((c, i) => (
              <li key={c.t} className="flex flex-col bg-background p-8 md:p-9">
                <Reveal delay={i * 90}>
                  <p className="font-serif text-[10px] tracking-[0.3em] text-brand">{c.en}</p>
                  <h3 className="mt-3 text-xl">{c.t}</h3>
                  <p className="mt-2 text-xs tracking-[0.18em] text-muted-foreground">{c.role}</p>
                  <p className="mt-5 text-sm leading-8 text-muted-foreground">{c.d}</p>
                  {c.to ? (
                    <Link
                      to={c.to}
                      className="mt-6 inline-block text-sm text-primary underline underline-offset-8"
                    >
                      {c.cta}
                    </Link>
                  ) : (
                    <p className="mt-6 inline-flex items-center gap-2 text-xs tracking-wider text-muted-foreground">
                      <span aria-hidden className="size-1.5 rotate-45 bg-brand/60" />
                      {NOTE.status === "live" ? "公開中" : "準備中"}
                    </p>
                  )}
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-page py-20 md:py-28">
        <SectionTitle title="掲載の原則" en="OUR RULES" />
        <ol className="grid gap-px border border-border bg-border sm:grid-cols-2">
          {PUBLISHING_RULES.map((r, i) => (
            <li key={r.t} className="bg-background p-8 md:p-10">
              <Reveal delay={(i % 2) * 80}>
                <p className="font-serif text-[11px] tracking-[0.28em] text-brand">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 text-lg leading-8">{r.t}</h3>
                <p className="mt-4 text-sm leading-8 text-muted-foreground">{r.d}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-surface">
        <div className="container-page py-20 md:py-28">
          <SectionTitle title="note の扱い" en="ON NOTE" />
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div className="space-y-7 text-[15px] leading-9 text-muted-foreground">
              <p>
                note
                での発信を検討しています。読者が集まる場所に事務所の言葉を届けられる一方で、同じ本文を当サイトと
                note
                の両方に置くと、検索エンジンからは同一の内容が二か所にある状態に見え、双方の評価が分散します。
              </p>
              <p>
                そこで、note
                には要点の要約と本文への導線を置き、全文は当サイトで読んでいただく形をとります。各コラムには、当サイトのURLを正規（canonical）として明示してあります。
              </p>
              <p>
                有料での販売を行う場合は、当サイトの無料記事とは別に、note
                限定の書き下ろしとして用意します。無料で読めるものを、そのまま有料にすることはしません。
              </p>
              <p className="text-sm">
                アカウントを開設した時点で、コラム一覧・各記事・フッターの導線が同時に有効になります。運用開始の手間は、URLを一か所に登録するだけです。
              </p>
            </div>
            <div className="space-y-6">
              <NotePreview />
              <NoteAccountLink context="publishing" />
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-20 md:py-28">
        <SectionTitle title="反応を見てから、決める" en="MEASUREMENT" />
        <ol className="space-y-10">
          {MEASUREMENT.map((m, i) => (
            <li key={m.n}>
              <Reveal delay={i * 70}>
                <div className="grid gap-4 border-t border-border pt-10 md:grid-cols-[6rem_1fr] md:gap-10">
                  <span className="font-serif text-3xl text-brand">{m.n}</span>
                  <div>
                    <h3 className="text-lg">{m.t}</h3>
                    <p className="mt-4 max-w-2xl text-[15px] leading-9 text-muted-foreground">
                      {m.d}
                    </p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
        <p className="mt-12 max-w-2xl text-xs leading-7 text-muted-foreground">
          ※
          計測しているのは、記事ごとの閲覧と読了率、外部リンクの遷移といった匿名の利用状況です。個人を特定する情報は取得していません。詳しくは
          <Link to="/privacy" className="mx-1 underline underline-offset-4">
            プライバシーポリシー
          </Link>
          をご覧ください。
        </p>
      </section>

      <section className="bg-surface">
        <div className="container-page py-16 md:py-20">
          <SectionTitle title="引用・転載について" en="CITATION" />
          <ul className="grid gap-3 text-sm leading-8 text-muted-foreground sm:grid-cols-2">
            {[
              "出典（記事名と当サイトのURL）を明示していただければ、引用は差し支えありません。",
              "全文の転載はお断りしています。要約のうえ、本文へのリンクをお願いします。",
              "記事の内容は執筆時点のものです。法令・実務の変更を反映していない場合があります。",
              "記載は一般的な情報提供であり、個別の事案についての法的助言ではありません。",
            ].map((t) => (
              <li key={t} className="border-l border-brand/40 pl-4">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <JournalBand />
    </>
  );
}

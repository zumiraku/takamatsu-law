import { createFileRoute } from "@tanstack/react-router";
import { PageHero, CtaBand } from "@/components/site/PageHero";

export const Route = createFileRoute("/lawyers")({
  head: () => ({
    meta: [
      { title: "弁護士紹介｜高松法律事務所" },
      {
        name: "description",
        content:
          "高松法律事務所に在籍する弁護士の経歴、取扱分野、所属団体をご紹介します。香川県弁護士会所属。",
      },
      { property: "og:title", content: "弁護士紹介｜高松法律事務所" },
      { property: "og:description", content: "在籍弁護士の経歴と取扱分野のご紹介。" },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "/lawyers" },
    ],
    links: [{ rel: "canonical", href: "/lawyers" }],
  }),
  component: Lawyers,
});

const LAWYERS = [
  {
    name: "髙松 一郎",
    kana: "たかまつ いちろう",
    role: "所長弁護士",
    fields: ["相続・遺言", "企業法務", "労働（使用者側）"],
    career: ["香川県高松市出身", "2005年 弁護士登録（香川県弁護士会）", "2014年 高松法律事務所 開設"],
    message:
      "ご相談の多くは、法律問題である前に生活の問題です。何を守りたいのかを伺うところから始めます。",
  },
  {
    name: "香川 沙織",
    kana: "かがわ さおり",
    role: "弁護士",
    fields: ["離婚・男女問題", "相続", "交通事故"],
    career: ["2013年 弁護士登録（香川県弁護士会）", "2019年 当事務所入所"],
    message:
      "ご本人が納得できる結論であることを大切にしています。迷いのある段階でのご相談も歓迎します。",
  },
  {
    name: "瀬戸 悠人",
    kana: "せと ゆうと",
    role: "弁護士",
    fields: ["労働（労働者側）", "債務整理", "民事一般"],
    career: ["2019年 弁護士登録（香川県弁護士会）", "2022年 当事務所入所"],
    message: "些細に思えることでも、早い段階でご相談いただくほど選べる手段は多くなります。",
  },
];

function Monogram({ name }: { name: string }) {
  return (
    <div
      aria-hidden
      className="flex size-16 shrink-0 items-center justify-center border border-gold/50 bg-surface font-serif text-2xl text-gold"
    >
      {name.slice(0, 1)}
    </div>
  );
}

function Lawyers() {
  return (
    <>
      <PageHero
        title="弁護士紹介"
        en="OUR LAWYERS"
        lead="経歴と取扱分野を簡潔にまとめています。担当のご指名も承ります。"
      />

      <section className="container-page py-20 md:py-28">
        <ul className="space-y-px bg-border">
          {LAWYERS.map((l) => (
            <li key={l.name} className="bg-card p-8 md:p-12">
              <div className="grid gap-8 md:grid-cols-[auto_1fr]">
                <Monogram name={l.name} />
                <div>
                  <p className="text-xs tracking-[0.25em] text-gold">{l.role}</p>
                  <h2 className="mt-2 text-2xl">
                    {l.name}
                    <span className="ml-3 text-xs tracking-widest text-muted-foreground">
                      {l.kana}
                    </span>
                  </h2>
                  <p className="mt-5 text-sm leading-8 text-muted-foreground">「{l.message}」</p>

                  <div className="mt-8 grid gap-8 sm:grid-cols-2">
                    <div>
                      <h3 className="text-sm text-primary">取扱分野</h3>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {l.fields.map((f) => (
                          <li
                            key={f}
                            className="border border-border px-3 py-1 text-xs text-muted-foreground"
                          >
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-sm text-primary">経歴</h3>
                      <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                        {l.career.map((c) => (
                          <li key={c}>{c}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand />
    </>
  );
}

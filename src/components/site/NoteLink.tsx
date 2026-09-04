import { trackOutbound } from "@/lib/analytics";
import { NOTE, formatYen, noteRefVisible, type NoteRef } from "@/lib/note";
import { cn } from "@/lib/utils";

/**
 * note 導線の見た目。
 * 実リンク（live）と、開設前に発信ページで示す掲載イメージ（preview）で共用する。
 */
function NoteCard({
  label,
  headline,
  body,
  action,
  muted = false,
}: {
  label: string;
  headline: string;
  body: string;
  action: React.ReactNode;
  muted?: boolean;
}) {
  return (
    <div
      className={cn(
        "grid gap-6 border border-border bg-card p-7 md:grid-cols-[1fr_auto] md:items-center md:p-9",
        muted && "bg-surface",
      )}
    >
      <div>
        <p className="text-[11px] tracking-[0.3em] text-brand">{label}</p>
        <p className="mt-3 text-lg leading-8 text-primary">{headline}</p>
        <p className="mt-3 text-sm leading-8 text-muted-foreground">{body}</p>
      </div>
      <div className="md:pl-6">{action}</div>
    </div>
  );
}

const ACTION_CLS =
  "light-pass inline-flex w-full items-center justify-center whitespace-nowrap border border-primary px-7 py-3.5 text-sm text-primary transition-colors hover:bg-primary hover:text-primary-foreground md:w-auto";

/** 記事下の note 導線。アカウント未開設・URL 未設定なら何も出さない。 */
export function ArticleNoteLink({
  noteRef,
  articleSlug,
}: {
  noteRef?: NoteRef | undefined;
  articleSlug: string;
}) {
  if (!noteRefVisible(noteRef)) return null;

  const paid = noteRef.kind === "paid";
  return (
    <NoteCard
      label="NOTE"
      headline={
        paid
          ? `この主題を掘り下げた記事を note で公開しています${noteRef.price ? `（${formatYen(noteRef.price)}）` : ""}`
          : "この記事の要約版を note にも掲載しています"
      }
      body={
        paid
          ? "note 限定の書き下ろしです。当ページの内容とは別に、実務上の手順や判断の分かれ目を詳しくまとめています。"
          : "note では要点のみをお読みいただけます。全文はこのページが正本です。"
      }
      action={
        <a
          href={noteRef.url}
          target="_blank"
          rel="noreferrer"
          className={ACTION_CLS}
          onClick={() => trackOutbound("note", `column/${articleSlug}`)}
        >
          note で読む
        </a>
      }
    />
  );
}

/** コラム一覧・発信ページに置く、アカウントへの導線。 */
export function NoteAccountLink({ context }: { context: string }) {
  if (NOTE.status !== "live" || !NOTE.accountUrl) return null;
  return (
    <NoteCard
      label="NOTE"
      headline="note でも発信しています"
      body="要約版と、note 限定の書き下ろしを掲載しています。コラムの全文は、引き続き当サイトでお読みいただけます。"
      action={
        <a
          href={NOTE.accountUrl}
          target="_blank"
          rel="noreferrer"
          className={ACTION_CLS}
          onClick={() => trackOutbound("note", context)}
        >
          note を見る
        </a>
      }
    />
  );
}

const PREVIEWS = [
  {
    caption: "無料の記事に、note の要約版がある場合",
    headline: "この記事の要約版を note にも掲載しています",
    body: "note では要点のみをお読みいただけます。全文はこのページが正本です。",
  },
  {
    caption: "note で有料の書き下ろしを販売する場合",
    headline: "この主題を掘り下げた記事を note で公開しています（¥500）",
    body: "note 限定の書き下ろしです。当ページの内容とは別に、実務上の手順や判断の分かれ目を詳しくまとめています。",
  },
];

/** 開設前に、記事下へどう出るかを示す掲載イメージ。リンクは張らない。 */
export function NotePreview() {
  return (
    <div className="space-y-8">
      {PREVIEWS.map((p) => (
        <div key={p.caption}>
          <p className="mb-3 text-xs tracking-wide text-muted-foreground">{p.caption}</p>
          <NoteCard
            muted
            label="NOTE"
            headline={p.headline}
            body={p.body}
            action={
              <span
                aria-hidden
                className="inline-flex w-full items-center justify-center whitespace-nowrap border border-border px-7 py-3.5 text-sm text-muted-foreground md:w-auto"
              >
                note で読む
              </span>
            }
          />
        </div>
      ))}
      <p className="text-xs leading-6 text-muted-foreground">
        ※ どちらも掲載イメージです。note のアカウントを開設し、URL
        を登録した時点で、記事ごとにどちらの形で出すかを選べます。無料・有料の切り替えも、記事側の設定だけで済みます。
      </p>
    </div>
  );
}

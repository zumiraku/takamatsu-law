/** ヘッダーの主要導線。コラムを軸にした構成のため、先頭に置く。 */
export const NAV = [
  { to: "/column", label: "コラム" },
  { to: "/about", label: "事務所案内" },
  { to: "/lawyers", label: "弁護士紹介" },
  { to: "/practice", label: "取扱業務" },
  { to: "/fees", label: "弁護士費用" },
  { to: "/flow", label: "相談までの流れ" },
] as const;

/** ヘッダーには置かないが、フッター・サイトマップ・モバイルメニューに出す。 */
export const FOOTER_EXTRA = [
  { to: "/news", label: "お知らせ" },
  { to: "/publishing", label: "発信について" },
  { to: "/faq", label: "よくあるご質問" },
  { to: "/contact", label: "お問い合わせ" },
  { to: "/privacy", label: "プライバシーポリシー" },
  { to: "/sitemap", label: "サイトマップ" },
] as const;

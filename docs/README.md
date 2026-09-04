# 設計ドキュメント

高松総合法律事務所ウェブサイトの、実装・運用に関する資料です。
本リポジトリは**デザインと導線を確認するための試作環境**（TanStack Start / React）で、
納品は WordPress で行います。この `docs/` は、試作で確定した仕様を WordPress 側へ
そのまま移すためのものです。

| 資料                                     | 内容                                                                         |
| ---------------------------------------- | ---------------------------------------------------------------------------- |
| [wordpress-spec.md](./wordpress-spec.md) | 固定ページ／投稿タイプ／カスタムフィールドの構成、管理画面から更新できる範囲 |
| [note-operation.md](./note-operation.md) | note との併用ルール、重複コンテンツの回避、有料記事の扱い、切替手順          |
| [seo-migration.md](./seo-migration.md)   | 301 リダイレクト、sitemap、構造化データ、GA4 / Search Console の設定         |

## 設定を変える場所（試作環境）

| 変えたいもの                              | ファイル               |
| ----------------------------------------- | ---------------------- |
| 事務所名・住所・電話番号・営業時間        | `src/lib/firm.ts`      |
| GA4 測定 ID / Search Console 確認トークン | `src/lib/firm.ts`      |
| note のアカウント URL・公開状態           | `src/lib/note.ts`      |
| コラム本文・カテゴリー                    | `src/lib/columns.ts`   |
| お知らせ                                  | `src/lib/news.ts`      |
| 弁護士プロフィール                        | `src/lib/lawyers.ts`   |
| 取扱業務                                  | `src/lib/practices.ts` |
| よくあるご質問                            | `src/lib/faq.ts`       |
| 旧 URL → 新 URL の対応                    | `src/lib/redirects.ts` |

WordPress 版では、この表の内容がすべて管理画面の入力項目になります。

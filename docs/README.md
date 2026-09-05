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

## 公開先URLの決まり方

canonical・OGP・sitemap・RSS はすべて同じ URL を基準にします。値は
`vite.config.ts` がビルド時に決めます（実行時にホスト名から組み立てると、
サーバーとブラウザで値がずれて表示が壊れるため）。

| 優先 | 元                                             | 用途                                       |
| ---- | ---------------------------------------------- | ------------------------------------------ |
| 1    | 環境変数 `SITE_URL`（または `VITE_SITE_URL`）  | 本番サーバー。ここに本番ドメインを設定する |
| 2    | `VERCEL_PROJECT_PRODUCTION_URL` / `VERCEL_URL` | 確認用のデモ。デモ自身の URL で完結する    |
| 3    | `vite.config.ts` の `PRODUCTION_SITE_URL`      | ローカル開発の既定値                       |

**本番ドメイン以外では自動的に `noindex,nofollow` を出し、`robots.txt` も
全面拒否にします。** 確認用のURLが検索結果に出ると、事務所の本サイトと
同じ内容が二か所にある状態になり、紛らわしいためです。本番ドメインで
ビルドしたときだけ、通常どおりクロールを許可します。

WordPress 版では、この役割をサイトアドレス設定と、検証環境側の
「検索エンジンでの表示」をオフにする設定が担います。

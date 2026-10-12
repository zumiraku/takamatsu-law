# 高松総合法律事務所 ウェブサイト

香川県高松市の法律事務所サイトのリニューアル案です。
**コラムを軸にした情報発信と、事務所のブランディング**を目的として構成しています。
（集客・問い合わせ獲得を主目的とした設計ではありません。）

本リポジトリはデザインと導線を確認するための**試作環境**（TanStack Start / React /
Tailwind CSS）です。納品は WordPress で行います。試作で確定した構成・仕様は
[`docs/`](./docs) にまとめてあり、そのまま WordPress 側へ移せる形にしています。

## 設計の要点

- **コラムは独立した投稿タイプ。** 固定ページ・お知らせと混ざらず、分野ごとの
  アーカイブ（`/column/category/<分野>`）を持ちます。記事が増えても管理画面が
  散らかりません。
- **全文の正本は当サイト。** 各記事に絶対URLの `canonical` を出力しています。
  将来 note に要約を載せても、検索エンジンからの評価は当サイトに集約されます。
  → [docs/note-operation.md](./docs/note-operation.md)
- **読ませるための本文設計。** 記事冒頭の要点、目次（見出しから自動生成・
  スクロール追従）、読了目安時間、前後の記事への送り、共有ボタン、執筆者情報。
  本文は 16.5〜17px / 行間 2.05 で、60代・70代の閲覧を前提にしています。
- **反応が見える。** 記事の表示だけでなく、本文を 50% / 90% まで読み進めた割合を
  計測します。「開かれた数」と「最後まで読まれた数」を分けて取ることが、
  note で何を出すかの判断材料になります。
  → [docs/seo-migration.md](./docs/seo-migration.md)
- **旧サイトの評価を引き継ぐ。** 旧URLから新URLへの 301 を、記事データから
  自動生成しています。日本語URLにも対応。
- **弁護士の写真は使わない。** 氏名の一文字からロゴのダイヤをモチーフにした
  シンボルマークを生成し、無機質にならないようにしています。

## ページ構成（全17ページ）

| ページ                | URL                       |
| --------------------- | ------------------------- |
| トップ                | `/`                       |
| コラム一覧            | `/column`                 |
| コラム記事            | `/column/<slug>`          |
| コラム分野別（6分野） | `/column/category/<slug>` |
| 発信について          | `/publishing`             |
| 事務所案内            | `/about`                  |
| 弁護士紹介            | `/lawyers`                |
| 取扱業務              | `/practice`               |
| 弁護士費用            | `/fees`                   |
| 相談までの流れ        | `/flow`                   |
| よくあるご質問        | `/faq`                    |
| お知らせ一覧 / 記事   | `/news`, `/news/<slug>`   |
| お問い合わせ          | `/contact`                |
| プライバシーポリシー  | `/privacy`                |
| サイトマップ          | `/sitemap`                |

## ドキュメント

| 資料                                               | 内容                                                               |
| -------------------------------------------------- | ------------------------------------------------------------------ |
| [docs/wordpress-spec.md](./docs/wordpress-spec.md) | 投稿タイプ・カスタムフィールド・管理画面から更新できる範囲         |
| [docs/note-operation.md](./docs/note-operation.md) | note との併用ルール、重複コンテンツの回避、開設時の手順            |
| [docs/seo-migration.md](./docs/seo-migration.md)   | 301 リダイレクト、サイトマップ、構造化データ、GA4 / Search Console |

## 設定を変える場所

| 変えたいもの                                                  | ファイル                                                  |
| ------------------------------------------------------------- | --------------------------------------------------------- |
| 事務所情報・公開ドメイン・GA4 測定ID・Search Console トークン | `src/lib/firm.ts`                                         |
| note のアカウントと公開状態                                   | `src/lib/note.ts`                                         |
| コラム／お知らせ／弁護士／取扱業務／FAQ                       | `src/lib/*.ts`                                            |
| 公開先URL（canonical・OGP・sitemap・RSS の基準）              | 環境変数 `SITE_URL`（[docs/README.md](./docs/README.md)） |
| 旧URL → 新URL                                                 | `src/lib/redirects.ts`                                    |

## 開発

Node.js が必要です。

```sh
npm install
npm run dev      # 開発サーバー
npm run build    # 本番ビルド
npm run lint     # ESLint + Prettier
npm run format   # 整形
```

`sitemap.xml`・`robots.txt`・`feed.xml`（RSS）は静的ファイルではなく、コラムや
お知らせのデータから `src/server.ts` が生成して配信します。記事を追加すれば
自動で反映され、更新漏れが起きません。

本番ドメイン以外でビルドした場合は `noindex` を出し、`robots.txt` も全面拒否に
なります。確認用のURLが検索結果に出ないようにするためです。

---

## つくった人

図美楽（ずみらく / zumiraku）— フリーランスのAIエンジニアです。生成AI×Web開発を軸に、業務システムとWebサイトを受託で作っています。

| 媒体 | リンク | 表示名 |
|---|---|---|
| note | [note.com/zumiraku](https://note.com/zumiraku) | 図美楽 |
| Qiita | [qiita.com/zumiraku](https://qiita.com/zumiraku) | ずみらく |
| Zenn | [zenn.dev/zumiraku](https://zenn.dev/zumiraku) | ズミラク |
| YOUTRUST | [youtrust.jp/users/zumiraku](https://youtrust.jp/users/zumiraku) | 図ミラク |
| GitHub | [github.com/zumiraku](https://github.com/zumiraku) | 図美楽 |

表記は媒体によって揺れていますが、どれも同じ人間です。英字は zumiraku で統一しています。

お仕事のご相談は直接お寄せください。NDAも対応します。

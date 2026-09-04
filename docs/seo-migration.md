# 移行と内部SEO・計測

## 1. 301 リダイレクト

現行サイト（2009年開設）には、検索エンジンからの評価が蓄積された URL があります。
URL 構造を変えたまま放置すると、その評価は引き継がれません。旧 URL から新 URL へ
**301（恒久的な移動）**で転送し、評価を新しいページに引き渡します。

実装は `src/lib/redirects.ts`。旧URLの一覧は各データに持たせてあるため、
記事や取扱業務を追加しても、リダイレクト表を手で書き足す必要はありません。

| 旧 URL                            | 新 URL                 |
| --------------------------------- | ---------------------- |
| `/office`                         | `/about`               |
| `/lawyer`                         | `/lawyers`             |
| `/rate`, `/price`                 | `/fees`                |
| `/inquiry`                        | `/flow`                |
| `/reserve`                        | `/contact`             |
| `/policy`                         | `/privacy`             |
| `/blog`, `/consult`               | `/column`              |
| `/topics`, `/topics/*`            | `/news`                |
| `/law/1145` ほか記事URL           | 対応するコラム記事     |
| `/law/*`（上記以外）              | `/column`              |
| `/blog/koutujiko` ほかカテゴリURL | 対応する分野アーカイブ |
| `/personal/*`, `/companies/*`     | `/practice#<分野>`     |
| `/voice`                          | `/about`               |
| `/note`                           | `/publishing`          |

- 記事の旧 URL は `src/lib/columns.ts` の `oldPaths`、取扱業務は
  `src/lib/practices.ts` の `oldPaths` に持たせています。
- 個別記事のURLと分野アーカイブのURLが衝突する場合は、記事側を優先します。
- URL は末尾スラッシュを外して正規化し、日本語URL（パーセントエンコード）も
  デコードして突き合わせます。現行サイトには
  `/law/遺産分割調停` のような日本語URLがあるため、これが必要です。

**移行前に必ず行うこと**: 現行サーバーのアクセスログ、または Search Console の
「ページ」レポートから、実際に流入のある URL を書き出し、この表に取り込みます。
上記は現行サイトの構成から起こしたもので、公開前に実データで補完します。

WordPress 版では、同じ対応表を `Redirection` プラグイン、またはサーバーの
`.htaccess` に落とし込みます（プラグイン管理の方が、後から事務所側で追加できます）。

## 2. サイトマップ

`/sitemap.xml` は静的ファイルではなく、コラム・お知らせ・分野アーカイブの
データから組み立てて配信しています（`src/lib/sitemap.ts` / `src/server.ts`）。
記事を追加すれば自動で載るため、更新漏れが起きません。

- 各 URL に `lastmod`（記事は加筆日、なければ公開日）を出力
- `robots.txt` からサイトマップの場所を明示
- 人が読む一覧は `/sitemap`（HTML）に別途用意

## 2-2. RSS フィード

`/feed.xml` でコラムとお知らせを配信しています（`src/lib/feed.ts`）。
発信を軸にする以上、読み手が購読して追える状態にしておくためです。
全文は載せず、抜粋と要点だけを流します（正本はサイト）。
HTML の `<head>` からも参照しているので、購読ソフトが自動で見つけます。
メール配信や note へ記事を流したくなったときの繋ぎ込み口にもなります。

## 3. 構造化データ

| ページ         | 型                                                                    |
| -------------- | --------------------------------------------------------------------- |
| トップ         | `LegalService`（住所・電話・営業時間・地図座標・`sameAs`）            |
| コラム一覧     | `Blog` + `BreadcrumbList`                                             |
| コラム記事     | `BlogPosting`（著者・公開日・加筆日・分野・文字数）+ `BreadcrumbList` |
| 分野アーカイブ | `BreadcrumbList`                                                      |
| よくあるご質問 | `FAQPage`                                                             |
| 発信について   | `BreadcrumbList`                                                      |

`LegalService` に `@id` を振り、記事の `publisher` から参照しています。
検索エンジンから見て「同じ事務所が発行している記事」として繋がります。

## 4. ページごとの meta

`src/lib/seo.ts` の `seoMeta()` に集約しています。各ページで

- `<title>`（`ページ名｜高松総合法律事務所`）
- `description`
- `canonical`（絶対URL）
- OGP（`og:title` / `og:description` / `og:url` / `og:image` / `og:type`）
- `twitter:card`

を出力します。公開ドメインは `src/lib/firm.ts` の `siteUrl` 一か所で切り替えます。

## 5. 地域SEO

- `LegalService` の `address` / `geo` / `areaServed`（香川県・高松市）
- 事務所案内ページに、住所・アクセス・地図を構造化して掲載
- Google ビジネスプロフィールとの整合（**NAP** = 名称・住所・電話番号を
  サイトとプロフィールで一字一句そろえる）。表記ゆれがあると別の事業所として
  扱われることがあるため、`src/lib/firm.ts` の値を正とします。

## 6. 計測設計（GA4）

`src/lib/firm.ts` の `gaMeasurementId` に測定 ID を入れると有効になります。
Search Console の所有権確認は `searchConsoleToken` に値を入れると meta タグが出ます。

| イベント           | 発火                               | パラメータ                                          |
| ------------------ | ---------------------------------- | --------------------------------------------------- |
| `page_view`        | 画面遷移ごと（SPA のため手動送信） | `page_path` / `page_title`                          |
| `article_view`     | コラム記事の表示                   | `article_id` / `article_title` / `article_category` |
| `article_progress` | 本文の 50% / 90% 到達              | `article_id` / `article_category` / `percent`       |
| `share_click`      | X・Facebook・URLコピー             | `method` / `article_path`                           |
| `outbound_click`   | note などの外部リンク              | `destination` / `context`                           |

自動のページビュー計測は切り、遷移のたびに手動で送っています
（SPA では自動計測が二重に走る、あるいは遷移を取りこぼすため）。

### 見るべき指標

- **どの記事が読まれているか** … `article_view` を `article_id` で分解
- **どの記事が最後まで読まれているか** … `article_progress`（percent = 90）÷ `article_view`
- **どの分野に関心があるか** … `article_category` で分解
- **note に流れているか** … `outbound_click`（destination = note）

GA4 の探索レポートを1つ作っておけば、事務所側は毎回同じ画面を開くだけで
上記が確認できます。note で何を出すかの判断材料は、ここから取ります。

## 7. 公開前チェックリスト

- [ ] `siteUrl` を本番ドメインに設定
- [ ] `gaMeasurementId` / `searchConsoleToken` を設定
- [ ] 現行サーバーのログから流入 URL を洗い出し、リダイレクト表を補完
- [ ] 旧サイトの全 URL について、301 の転送先を実際に叩いて確認
- [ ] Search Console にサイトマップを送信
- [ ] Google ビジネスプロフィールの NAP をサイトと一致させる
- [ ] リッチリザルトテスト（構造化データ）で各テンプレートを検証
- [ ] 実機（iPhone / Android）で本文の文字サイズとタップ領域を確認

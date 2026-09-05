/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * 公開先のURL（末尾スラッシュなし）。canonical・OGP・sitemap・RSS の基準になる。
   * 値は vite.config.ts がビルド時に埋め込む。サーバー側とブラウザ側で
   * 同じ値になるよう、実行時ではなくビルド時に確定させている。
   */
  readonly VITE_SITE_URL: string;
  /** 本番ドメインで動いているか。デモ・検証用URLでは false になり、noindex を出す。 */
  readonly VITE_IS_PRODUCTION_SITE: boolean;
}

export function renderErrorPage(): string {
  return `<!doctype html>
<html lang="ja">
  <head>
    <meta charset="utf-8" />
    <title>ページを表示できませんでした</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font: 15px/1.8 "Hiragino Sans", system-ui, sans-serif; background: #f7f8fb; color: #1a2340; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 28rem; width: 100%; text-align: center; padding: 2rem; }
      h1 { font-size: 1.2rem; font-weight: 500; margin: 0 0 0.75rem; }
      p { color: #5a6480; margin: 0 0 1.5rem; }
      .actions { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.65rem 1.1rem; font: inherit; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      .primary { background: #001a4d; color: #fff; }
      .secondary { background: #fff; color: #001a4d; border-color: #d5dbe8; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>ページを表示できませんでした</h1>
      <p>申し訳ありません。しばらくしてから再度お試しください。</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">再読み込み</button>
        <a class="secondary" href="/">ホームへ戻る</a>
      </div>
    </div>
  </body>
</html>`;
}

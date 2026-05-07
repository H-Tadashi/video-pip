// content.js
// background.jsからのexecuteScriptで直接関数が実行されるため、
// このファイルはサービスの検出とページ固有の対応のみ行う

// Netflixなど一部サービスはPiPを独自に制限している場合があるため
// document.pictureInPictureEnabledをオーバーライドして有効化
(function () {
  // Netflix: PiP無効化を回避
  if (location.hostname.includes('netflix.com')) {
    try {
      Object.defineProperty(document, 'pictureInPictureEnabled', {
        get: () => true,
        configurable: true
      });
    } catch (e) {}
  }

  // Prime Video: autoplay policy対策として、ユーザー操作フラグを維持
  // （追加の対応は不要、videoElementへの直接アクセスで動作する）
})();

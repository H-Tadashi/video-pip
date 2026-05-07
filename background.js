// アイコンクリックで即PiP切替
chrome.action.onClicked.addListener(async (tab) => {
  try {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: togglePiP
    });
  } catch (e) {
    console.error('PiP failed:', e);
  }
});

// content scriptに注入される関数（別スコープなのでself-containedに）
function togglePiP() {
  // 最も再生時間が長い動画要素を選ぶ（広告や小さいプレイヤーを除外）
  const videos = Array.from(document.querySelectorAll('video'));
  if (!videos.length) return;

  const video = videos
    .filter(v => v.readyState > 0 && v.videoWidth > 0)
    .sort((a, b) => (b.videoWidth * b.videoHeight) - (a.videoWidth * a.videoHeight))[0]
    || videos[0];

  if (document.pictureInPictureElement) {
    document.exitPictureInPicture().catch(() => {});
  } else {
    video.requestPictureInPicture().catch((e) => {
      console.warn('PiP request failed:', e);
    });
  }
}

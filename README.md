# Video PiP — Picture-in-Picture for Any Streaming Service

<div align="center">

![icon](icons/icon128.png)

**ワンクリックで動画をフローティングウィンドウに。**  
YouTube・Netflix・Prime Video など 17 サービスに対応した Chrome 拡張機能。

[![License: MIT](https://img.shields.io/badge/License-MIT-lightgrey.svg)](LICENSE)
![Manifest V3](https://img.shields.io/badge/Manifest-V3-blue)
![Chrome](https://img.shields.io/badge/Chrome-Extension-yellow?logo=googlechrome)

</div>

---

## Overview

**Video PiP** は、再生中の動画をブラウザ標準の **Picture-in-Picture（PiP）API** でフローティングウィンドウに切り替えるシンプルな Chrome 拡張機能です。

拡張機能のアイコンをクリックするだけで PiP が起動・停止します。ポップアップや設定画面は一切なく、余計な UI を挟まない設計にこだわりました。

```
アイコンをクリック → 即 PiP 起動
もう一度クリック  → PiP 停止
```

---

## Features

- **ワンクリック操作** — ポップアップ不要。アイコンをクリックした瞬間に PiP が切り替わる
- **17 サービス対応** — 主要な動画配信サービスをカバー
- **スマートな動画選択** — 複数の `<video>` 要素がある場合、最大サイズのものを自動選択（広告や小さいプレイヤーを除外）
- **Netflix 対応** — PiP を独自に制限しているサービスでも動作するよう回避処理を実装
- **軽量** — コードはわずか 3 ファイル、外部ライブラリ・通信ゼロ

---

## Supported Services

| Service | Domain |
|---------|--------|
| YouTube | youtube.com |
| Netflix | netflix.com |
| Prime Video | amazon.co.jp / amazon.com |
| Disney+ | disneyplus.com |
| Apple TV+ | tv.apple.com |
| Hulu | hulu.jp |
| AbemaTV | abema.tv |
| dアニメストア | anime.dmkt-sp.jp |
| ニコニコ動画 | nicovideo.jp |
| TVer | tver.jp |
| Paravi | paravi.jp |
| Lemino | lemino.docomo.ne.jp |
| U-NEXT | unext.jp |
| Crunchyroll | crunchyroll.com |
| Twitch | twitch.tv |
| Vimeo | vimeo.com |

---

## Installation

### Chrome Web Store（準備中）

> Coming soon

### 手動インストール（開発者向け）

```bash
git clone https://github.com/your-username/video-pip.git
```

1. Chrome で `chrome://extensions` を開く
2. 右上の **「デベロッパーモード」** をオン
3. **「パッケージ化されていない拡張機能を読み込む」** をクリック
4. クローンしたフォルダを選択

---

## How It Works

```
[アイコンクリック]
      │
      ▼
background.js  ←  chrome.action.onClicked
      │
      │  executeScript()
      ▼
  対象ページ
      │
      ├─ document.querySelectorAll('video')
      ├─ 最大サイズの video 要素を選択
      │
      ├─ PiP 中なら → exitPictureInPicture()
      └─ 通常時は → requestPictureInPicture()
```

ページへの注入はユーザーがアイコンをクリックした瞬間のみ発生します。常時監視や定期実行は一切行いません。

---

## File Structure

```
video-pip/
├── manifest.json    # 拡張機能の設定（Manifest V3）
├── background.js    # アイコンクリックのハンドラ・PiP 関数の注入
├── content.js       # Netflix 等のサービス固有の回避処理
└── icons/
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

---

## Permissions

| Permission | Purpose |
|------------|---------|
| `scripting` | PiP 切替スクリプトをページに実行するため |
| `tabs` | 対応サービスのタブかどうかを判定するため |
| `activeTab` | クリック時のみ、アクティブタブへ一時アクセスするため |
| `host_permissions` | 対応サービスのドメインにスクリプトを注入するため |

**収集するユーザーデータ: なし。** 外部サーバーとの通信も一切行いません。

---

## Privacy

本拡張機能は：

- ユーザーデータを **収集・送信・保存しない**
- 外部サーバーと **通信しない**
- ブラウザの `storage` API を **使用しない**
- ユーザーの操作（クリック以外）を **監視しない**

すべての処理はユーザーのデバイス上のみで完結します。

---

## Development

```bash
# リポジトリをクローン
git clone https://github.com/your-username/video-pip.git
cd video-pip

# Chrome で読み込む（Installation 参照）
# ファイルを編集後、chrome://extensions でリロードボタンを押すと反映
```

### 新しいサービスを追加する場合

`manifest.json` の `host_permissions` と `content_scripts.matches` に対象ドメインを追加するだけです。

```json
"https://example-streaming.com/*"
```

サービス固有の PiP 制限がある場合は `content.js` に回避処理を追加してください。

---

## License

[MIT](LICENSE)

---

<div align="center">
  <sub>Built with vanilla JS · No dependencies · Manifest V3</sub>
</div>

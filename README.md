# すすメイト / susumate

> 初めての学生プロジェクトで、進め方の全体像が見通せるようになるWebメディア。

## 現在の状態

すすメイトは、学生プロジェクトの開始直後に起こりやすい迷いを減らすためのWebサイトとして企画整理中です。

現在は既存のトップページをもとに、今後の研究・設計・実装方針を整理している段階です。

サイトマップ、MVP、各コンテンツの内容、ページデザインはまだ確定していません。これらは調査と企画整理の結果をもとに、docs/配下の資料で更新していきます。

## 技術構成

現時点では、次の構成を前提にしています。

- HTML
- CSS
- Vanilla JavaScript
- 複数の静的HTMLページ
- GitHub Pagesなどで公開可能な静的サイト

フレームワークやビルド工程は、現段階では導入していません。

## 主な既存ファイル

```text
index.html
style.css
script.js
```

- `index.html`：既存トップページ
- `style.css`：共通スタイル
- `script.js`：共通JavaScript

## 起動方法

ビルド作業は不要です。

簡易サーバーを使う場合は、リポジトリのフォルダで次を実行します。

```bash
python3 -m http.server 8000
```

ブラウザで開きます。

```text
http://localhost:8000/
```

終了するときは、ターミナルで `Control + C` を押します。

## docs/配下の資料

企画や設計に関する詳しい情報は、docs/配下に分けて管理します。

```text
docs/
├── PROJECT.md
├── REQUIREMENTS.md
├── RESEARCH.md
├── ROADMAP.md
├── DESIGN.md
└── DECISIONS.md
```

各資料の役割は次の通りです。

- `docs/PROJECT.md`：コンセプト、目的、対象範囲
- `docs/REQUIREMENTS.md`：要件整理
- `docs/RESEARCH.md`：研究・調査に関する整理
- `docs/ROADMAP.md`：今後の進め方
- `docs/DESIGN.md`：デザイン方針
- `docs/DECISIONS.md`：決定事項の記録

## 作業ルール

Codexや開発者が作業する場合は、先に `AGENTS.md` を確認してください。

`AGENTS.md` には、このリポジトリで作業するときの前提、禁止事項、確認手順をまとめています。

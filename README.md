# SWA Calculator

Azure Static Web Apps で動作する React 電卓アプリケーション

## 🚀 機能

### 基本機能
- ✅ 四則演算（加算、減算、乗算、除算）
- ✅ 小数点演算
- ✅ クリア機能（C / AC）
- ✅ 連続計算

### メモリ機能
- ✅ 5つの独立したメモリスロット
- ✅ メモリ加算（M+）
- ✅ メモリ減算（M-）
- ✅ メモリ呼び出し（MR）
- ✅ メモリクリア（MC）
- ✅ スロット間の切り替え

### 計算履歴機能
- ✅ 最大1000件の履歴保存（FIFO方式）
- ✅ 履歴のクリック再利用
- ✅ 個別履歴の削除
- ✅ 履歴の全クリア
- ✅ JSON形式でのエクスポート
- ✅ テキスト形式でのエクスポート
- ✅ クリップボードへのコピー

### キーボード操作
- **数字キー**: 0-9
- **演算子**: +, -, *, /
- **Enter**: 計算実行（= と同じ）
- **Escape**: クリア（C）
- **Backspace**: クリア（C）
- **Ctrl+Shift+Delete**: オールクリア（AC）

## 🧪 テスト駆動開発

このプロジェクトは **t_wadaのテスト駆動開発（TDD）方法論** に基づいて実装されています。

### テストカバレッジ

```bash
# すべてのテストを実行
npm test

# 特定のテストを実行
npm test src/core/Calculator.test.ts
npm test src/core/MemoryManager.test.ts
npm test src/core/HistoryManager.test.ts
```

### TDD実装サイクル

1. **Red**: 失敗するテストを先に書く
2. **Green**: テストが通る最小限の実装を行う
3. **Refactor**: コードを改善する

## 🛠️ 技術スタック

- **フロントエンド**: React 18 + TypeScript
- **ビルドツール**: Vite 5
- **テストフレームワーク**: Vitest
- **スタイリング**: CSS Modules
- **ホスティング**: Azure Static Web Apps
- **CI/CD**: GitHub Actions

## 📦 セットアップ

### 前提条件

- Node.js 18+
- npm

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/kfuruichi0920/swa-calcurator.git
cd swa-calcurator

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev

# ブラウザで http://localhost:5173/ を開く
```

### ビルド

```bash
# プロダクションビルド
npm run build

# プレビュー
npm run preview
```

## 🚀 デプロイ

### Azure Static Web Apps へのデプロイ

1. **Azure portalでStatic Web Appを作成**
   - リソースグループを選択または作成
   - アプリ名を入力
   - GitHubリポジトリと連携

2. **デプロイトークンを設定**
   - Azure portalからデプロイトークンを取得
   - GitHubリポジトリの Secrets に `AZURE_STATIC_WEB_APPS_API_TOKEN` として追加

3. **自動デプロイ**
   - mainブランチへのpushで自動デプロイ
   - プルリクエストごとにプレビュー環境が作成

## 📐 アーキテクチャ

```
src/
├── core/                 # ビジネスロジック（TDDで実装）
│   ├── Calculator.ts           # 計算エンジン
│   ├── MemoryManager.ts        # メモリ管理
│   ├── HistoryManager.ts       # 履歴管理
│   ├── Calculator.test.ts      # 計算エンジンのテスト
│   ├── MemoryManager.test.ts   # メモリ管理のテスト
│   └── HistoryManager.test.ts  # 履歴管理のテスト
├── components/           # UIコンポーネント
│   ├── Display.tsx             # ディスプレイ
│   ├── ButtonGrid.tsx          # ボタングリッド
│   ├── MemoryPanel.tsx         # メモリパネル
│   └── HistoryPanel.tsx        # 履歴パネル
├── App.tsx              # メインアプリケーション
└── main.tsx             # エントリーポイント
```

## 🧪 テスト

### テストの実行

```bash
# すべてのテストを実行
npm test

# UIモードでテストを実行
npm run test:ui

# カバレッジレポートを生成
npm run test:coverage
```

### テスト結果

- ✅ Calculator: 18テスト
- ✅ MemoryManager: 17テスト
- ✅ HistoryManager: 16テスト
- **合計: 51テスト** すべて合格

## 📱 レスポンシブデザイン

- **デスクトップ**: 1024px 以上
- **タブレット**: 768px - 1023px
- **スマートフォン**: 320px - 767px

## 📄 ライセンス

MIT

## 👤 作成者

kfuruichi0920

## 🙏 謝辞

このプロジェクトは **t_wadaのテスト駆動開発方法論** を参考に実装されました。


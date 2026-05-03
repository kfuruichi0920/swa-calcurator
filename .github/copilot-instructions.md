# Copilot 向け指示

## コマンド

```bash
npm run dev          # 開発サーバーを起動 (http://localhost:5173)
npm run build        # tsc -b && vite build
npm run lint         # ESLint を実行
npm run typecheck    # TypeScript の静的チェックを実行
npm test             # すべてのテストを実行 (Vitest、watch モード)
npm run test:ui      # Vitest UI
npm run test:coverage

# 単一のテストファイルを実行
npm test src/core/Calculator.test.ts
npm test src/core/MemoryManager.test.ts
npm test src/core/HistoryManager.test.ts
```

## アーキテクチャ

このアプリは、明確に分かれた 2 つの層で構成されています。

**`src/core/`** — React に依存しない純粋な TypeScript クラス群です。それぞれに対応する `.test.ts` ファイルがあります。
- `Calculator` — 状態を持つ計算エンジンです。数字や演算子には `input(value)`、計算実行には `equals()`、リセットには `clear()` / `allClear()` を呼び出します。
- `MemoryManager` — 5 つの独立したメモリスロットを管理します。M+、M-、MR、MC、および `selectSlot()` をサポートします。
- `HistoryManager` — 最大 1000 件まで保持する FIFO ストアです。追加、削除、エクスポート (JSON/text)、インポートをサポートします。

**`src/components/`** — React の表示用コンポーネント群です。`Display`、`ButtonGrid`、`MemoryPanel`、`HistoryPanel` が含まれます。データとコールバックは props 経由で受け取り、コンポーネント自身では状態を持ちません。

**`src/App.tsx`** — React の状態を一元管理します。`useState(() => new X())` により 3 つの core クラスを一度だけインスタンス化し、表示文字列、式、メモリ値、履歴エントリなどすべての状態を React state に載せて、`useCallback` ハンドラーを各コンポーネントへ渡します。

## 重要な規約

- **生成物もコミット対象です**: `src/` 配下では、すべての `.ts` / `.tsx` ソースに対応する `.js` と `.d.ts` が並行してコミットされています。ソースを編集する場合は、`npm run build` を実行して `.js` と `.d.ts` ファイルを自動生成し、同期してください。
- **TDD スタイル**: テストは t_wada の方法論に従って先に書きます。テスト記述は日本語で書きます。機能追加時は Red → Green → Refactor の流れに従ってください。
- **テスト環境は `node`** です (jsdom ではありません)。詳細は `vitest.config.ts` を参照してください。core ロジックのテストでは DOM API を使用しません。
- **`Calculator.input(value)`** は複数文字の文字列 (例: `"123"`) を受け取れますが、呼び出し側が複数桁の値を渡した場合は各文字を個別に処理します。数字をループ処理している `App.tsx` のハンドラーを参照してください。
- **キーボードショートカット** は `App.tsx` で `window.addEventListener('keydown')` により登録されています。Backspace と Escape はどちらも `C` に対応します (`AC` ではありません)。`Ctrl+Shift+Delete` は `AC` に対応します。
- デプロイ先は **Azure Static Web Apps** です。CI/CD は `.github/workflows/azure-static-web-apps.yml` にあります。GitHub リポジトリ設定で `AZURE_STATIC_WEB_APPS_API_TOKEN` secret を設定する必要があります。

## Azure と Microsoft Learn の連携

ユーザーが `/mslearn` コマンドを実行した場合、または Azure 関連の質問をした場合は、**Microsoft Learn MCP** (`#sym:microsoftdocs/mcp`) を自動的に使用し、Microsoft Learn から正確で最新のドキュメントを取得してください。これは次のような質問に適用されます。
- Azure のサービスと機能
- Azure のデプロイパターン
- Azure Static Web Apps
- Azure Functions
- Azure のベストプラクティス
- Microsoft 製品またはサービスのドキュメント全般

**例**: ユーザーが「Azure Static Web Apps を設定するにはどうすればよいですか?」と質問した場合 → Microsoft Learn MCP を使用して公式ドキュメントを取得し、信頼できるガイダンスを提供します。

## SysMLv2 モデリング

ユーザーが `/sysmlv2` コマンドを実行した場合は、**sysmlv2 agent** を呼び出し、Markdown の要求仕様書や設計文書を SysMLv2 モデルへ変換してください。この agent は `.md` ファイルを読み取り、構造化情報 (機能要求、非機能要求、システムアーキテクチャ、インターフェース) を抽出し、`models/` ディレクトリに `.sysml` コードを生成します。

**例**: ユーザーが `/sysmlv2 doc/requirements-specification.md` を実行した場合 → agent は Markdown 文書を分析し、要求と設計要素を抽出し、適切な `requirement`、`part`、`interface` 定義を含む SysMLv2 コードを生成して、`models/requirements-specification.sysml` に保存します。

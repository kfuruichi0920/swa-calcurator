/**
 * Auto-generated SysML v2 starter model
 * Generated: 2026-03-01
 * Requirements source: doc/requirements-specification.md
 * Design source: README.md
 */

package SWACalculatorModel {
    import ScalarValues::*;

    requirement def DocumentRequirements {
        doc /* Root requirement definition */
    }

    requirement R_2_1 :> DocumentRequirements {
        doc /* Source heading: 2.1 基本演算機能 */
    }

    requirement Req001 :> R_2_1 {
        doc /* **四則演算**：加算（+）、減算（-）、乗算（×）、除法（÷） */
    }

    requirement R_0_9 :> R_2_1 {
        doc /* **数値入力**：0-9 の数字入力、小数点入力 */
    }

    requirement Req003 :> R_2_1 {
        doc /* **クリア機能**： */
    }

    requirement C :> R_2_1 {
        doc /* C（クリア）：現在の入力をクリア */
    }

    requirement AC :> R_2_1 {
        doc /* AC（オールクリア）：すべての計算状態をリセット */
    }

    requirement Req006 :> R_2_1 {
        doc /* **等号**：計算結果の表示（=） */
    }

    requirement R_2_2 :> DocumentRequirements {
        doc /* Source heading: 2.2 メモリ機能 */
    }

    requirement R_3_5 :> R_2_2 {
        doc /* **複数メモリスロット**：3-5 個のメモリスロットを提供 */
    }

    requirement Req008 :> R_2_2 {
        doc /* **メモリ操作**： */
    }

    requirement M :> R_2_2 {
        doc /* M+（メモリ加算）：現在の値を選択中のメモリスロットに加算 */
    }

    requirement M_2 :> R_2_2 {
        doc /* M-（メモリ減算）：現在の値を選択中のメモリスロットから減算 */
    }

    requirement MR :> R_2_2 {
        doc /* MR（メモリ呼出）：選択中のメモリスロットの値を呼び出し */
    }

    requirement MC :> R_2_2 {
        doc /* MC（メモリクリア）：選択中のメモリスロットをクリア */
    }

    requirement Req013 :> R_2_2 {
        doc /* メモリスロット選択：複数のスロット間を切り替え可能 */
    }

    requirement UI :> R_2_2 {
        doc /* 各スロットの値を一覧表示（UI上で確認可能） */
    }

    requirement R_2_3 :> DocumentRequirements {
        doc /* Source heading: 2.3 計算履歴機能 */
    }

    requirement Req015 :> R_2_3 {
        doc /* **履歴の記録**：各計算式と結果を記録 */
    }

    requirement R_123_456_579 :> R_2_3 {
        doc /* 形式例：`123 + 456 = 579` */
    }

    requirement Req017 :> R_2_3 {
        doc /* **履歴の表示**：計算履歴を時系列で表示（新しいものが上） */
    }

    requirement R_1000 :> R_2_3 {
        doc /* **履歴の上限**：1000 件まで保存 */
        attribute limitCount : Integer = 1000;
    }

    requirement FIFO :> R_2_3 {
        doc /* 上限超過時：最も古い履歴から自動削除（FIFO方式） */
    }

    requirement Req020 :> R_2_3 {
        doc /* **履歴の操作**： */
    }

    requirement Req021 :> R_2_3 {
        doc /* 履歴項目をクリックして値を再利用 */
    }

    requirement Req022 :> R_2_3 {
        doc /* 履歴全体のクリア機能 */
    }

    requirement Req023 :> R_2_3 {
        doc /* 個別履歴の削除機能 */
    }

    requirement R_2_4 :> DocumentRequirements {
        doc /* Source heading: 2.4 データ保存・エクスポート機能 */
    }

    requirement Req024 :> R_2_4 {
        doc /* **セッション中の保存**： */
    }

    requirement Req025 :> R_2_4 {
        doc /* すべてのデータ（計算履歴、メモリスロット）はブラウザのメモリ上に保持 */
    }

    requirement Req026 :> R_2_4 {
        doc /* ページリロード時にデータは消失 */
    }

    requirement Req027 :> R_2_4 {
        doc /* **エクスポート機能**： */
    }

    requirement JSON_JSON :> R_2_4 {
        doc /* **JSONファイルダウンロード**：計算履歴とメモリデータを JSON 形式でダウンロード */
    }

    requirement Req029 :> R_2_4 {
        doc /* **クリップボードコピー**：計算履歴をテキスト形式でコピー */
    }

    requirement JSON :> R_2_4 {
        doc /* **インポート機能**（オプション）：以前ダウンロードした JSON ファイルを読み込んで履歴を復元 */
    }

    requirement R_2_5 :> DocumentRequirements {
        doc /* Source heading: 2.5 キーボード操作機能 */
    }

    requirement R_0_9_2 :> R_2_5 {
        doc /* **数字キー**：0-9 */
    }

    requirement Req032 :> R_2_5 {
        doc /* **演算子キー**：+、-、*、/ */
    }

    requirement Req033 :> R_2_5 {
        doc /* **制御キー**： */
    }

    requirement Enter :> R_2_5 {
        doc /* Enter：計算実行（= と同じ） */
    }

    requirement Backspace_Delete_1 :> R_2_5 {
        doc /* Backspace/Delete：最後の1文字を削除 */
    }

    requirement Escape_C :> R_2_5 {
        doc /* Escape：クリア（C と同じ） */
    }

    requirement Ctrl_Shift_Delete_AC :> R_2_5 {
        doc /* Ctrl+Shift+Delete：オールクリア（AC と同じ） */
    }

    requirement Req038 :> R_2_5 {
        doc /* **その他**： */
    }

    requirement Req039 :> R_2_5 {
        doc /* .（ピリオド）：小数点入力 */
    }

    requirement Req040 :> R_2_5 {
        doc /* キーボードショートカット一覧を表示する機能（?キーまたはヘルプボタン） */
    }

    requirement R_3_1 :> DocumentRequirements {
        doc /* Source heading: 3.1 技術スタック */
    }

    requirement Req041 :> R_3_1 {
        doc /* **フロントエンド**： */
    }

    requirement React_18 :> R_3_1 {
        doc /* React 18+ */
    }

    requirement TypeScript :> R_3_1 {
        doc /* TypeScript（型安全性のため推奨） */
    }

    requirement Vite :> R_3_1 {
        doc /* Vite（ビルドツール） */
    }

    requirement CSS_Modules_Styled_Components :> R_3_1 {
        doc /* CSS Modules または Styled Components（スタイリング） */
    }

    requirement Req046 :> R_3_1 {
        doc /* **バックエンド**：なし（フロントエンドのみの静的アプリケーション） */
    }

    requirement Azure_Static_Web_Apps :> R_3_1 {
        doc /* **ホスティング**：Azure Static Web Apps */
    }

    requirement CI_CD_GitHub_Actions :> R_3_1 {
        doc /* **CI/CD**：GitHub Actions */
    }

    requirement R_3_2_UI_UX :> DocumentRequirements {
        doc /* Source heading: 3.2 UI/UX要件 */
    }

    requirement Req049 :> R_3_2_UI_UX {
        doc /* **レスポンシブデザイン**： */
    }

    requirement R_1024px :> R_3_2_UI_UX {
        doc /* デスクトップ（1024px 以上） */
    }

    requirement R_768px_1023px :> R_3_2_UI_UX {
        doc /* タブレット（768px - 1023px） */
    }

    requirement R_320px_767px :> R_3_2_UI_UX {
        doc /* スマートフォン（320px - 767px） */
    }

    requirement Req053 :> R_3_2_UI_UX {
        doc /* **デザインスタイル**： */
    }

    requirement Req054 :> R_3_2_UI_UX {
        doc /* シンプルで直感的なデザイン */
    }

    requirement UI_2 :> R_3_2_UI_UX {
        doc /* 一般的な電卓アプリケーションの UI パターンを踏襲 */
    }

    requirement Req056 :> R_3_2_UI_UX {
        doc /* ボタンの視覚的フィードバック（ホバー、アクティブ状態） */
    }

    requirement Req057 :> R_3_2_UI_UX {
        doc /* **アクセシビリティ**： */
    }

    requirement Req058 :> R_3_2_UI_UX {
        doc /* キーボードナビゲーション対応 */
    }

    requirement ARIA :> R_3_2_UI_UX {
        doc /* ARIA ラベルの適切な使用 */
    }

    requirement Req060 :> R_3_2_UI_UX {
        doc /* 適切なカラーコントラスト */
    }

    requirement R_3_3 :> DocumentRequirements {
        doc /* Source heading: 3.3 ブラウザ対応 */
    }

    requirement Req061 :> R_3_3 {
        doc /* **対象ブラウザ**： */
    }

    requirement Chrome :> R_3_3 {
        doc /* Chrome（最新版） */
    }

    requirement Firefox :> R_3_3 {
        doc /* Firefox（最新版） */
    }

    requirement Safari :> R_3_3 {
        doc /* Safari（最新版） */
    }

    requirement Edge :> R_3_3 {
        doc /* Edge（最新版） */
    }

    requirement IE11 :> R_3_3 {
        doc /* **非対応**：IE11 */
    }

    requirement R_3_4 :> DocumentRequirements {
        doc /* Source heading: 3.4 パフォーマンス */
    }

    requirement R_3 :> R_3_4 {
        doc /* **初回ロード時間**：3秒以内 */
        attribute timeLimit : String = "3秒";
    }

    requirement R_100ms :> R_3_4 {
        doc /* **操作レスポンス**：100ms 以内 */
    }

    requirement R_500KB_gzip :> R_3_4 {
        doc /* **バンドルサイズ**：500KB 以下（gzip圧縮後） */
    }

    requirement R_3_5_2 :> DocumentRequirements {
        doc /* Source heading: 3.5 セキュリティ */
    }

    requirement Req070 :> R_3_5_2 {
        doc /* **データ保存**：クライアントサイドのみ（サーバーへの送信なし） */
    }

    requirement XSS_React :> R_3_5_2 {
        doc /* **XSS対策**：React の標準的なエスケープ処理を使用 */
    }

    requirement R_4_1_Azure_Static_Web_Apps :> DocumentRequirements {
        doc /* Source heading: 4.1 Azure Static Web Apps */
    }

    requirement Req072 :> R_4_1_Azure_Static_Web_Apps {
        doc /* **環境**： */
    }

    requirement main :> R_4_1_Azure_Static_Web_Apps {
        doc /* 本番環境（main ブランチ） */
    }

    requirement Req074 :> R_4_1_Azure_Static_Web_Apps {
        doc /* プレビュー環境（プルリクエスト毎に自動生成） */
    }

    requirement R_4_2_GitHub_Actions :> DocumentRequirements {
        doc /* Source heading: 4.2 GitHub Actions */
    }

    requirement Req075 :> R_4_2_GitHub_Actions {
        doc /* **自動デプロイフロー**： */
    }

    requirement Req076 :> R_4_2_GitHub_Actions {
        doc /* **プルリクエスト時**： */
    }

    requirement Req077 :> R_4_2_GitHub_Actions {
        doc /* プレビュー環境を自動作成 */
    }

    requirement URL :> R_4_2_GitHub_Actions {
        doc /* プレビュー URL をコメントに追加 */
    }

    requirement R_4_3 :> DocumentRequirements {
        doc /* Source heading: 4.3 環境変数 */
    }

    requirement Req079 :> R_4_3 {
        doc /* 特になし（静的アプリケーションのため） */
    }

    requirement R_5_1 :> DocumentRequirements {
        doc /* Source heading: 5.1 制約事項 */
    }

    requirement Req080 :> R_5_1 {
        doc /* データの永続化は行わない（セッションベース） */
    }

    requirement Req081 :> R_5_1 {
        doc /* 複雑な科学計算機能は含まない（四則演算のみ） */
    }

    requirement Req082 :> R_5_1 {
        doc /* 複数ユーザー間でのデータ共有機能はなし */
    }

    requirement R_5_2 :> DocumentRequirements {
        doc /* Source heading: 5.2 前提条件 */
    }

    requirement GitHub :> R_5_2 {
        doc /* GitHub アカウントを保有していること */
    }

    requirement Azure :> R_5_2 {
        doc /* Azure アカウントを保有していること */
    }

    requirement Node_js_18 :> R_5_2 {
        doc /* Node.js 18+ がインストールされていること */
    }

    requirement R_6_1_Phase_1_MVP :> DocumentRequirements {
        doc /* Source heading: 6.1 Phase 1（MVP） */
    }

    requirement Req086 :> R_6_1_Phase_1_MVP {
        doc /* 基本的な四則演算機能 */
    }

    requirement R_1_M_M_MR_MC :> R_6_1_Phase_1_MVP {
        doc /* 1つのメモリスロット（M+, M-, MR, MC） */
    }

    requirement R_100 :> R_6_1_Phase_1_MVP {
        doc /* 基本的な計算履歴（100件程度） */
        attribute limitCount : Integer = 100;
    }

    requirement Req089 :> R_6_1_Phase_1_MVP {
        doc /* キーボード操作（基本的な数字と演算子） */
    }

    requirement UI_3 :> R_6_1_Phase_1_MVP {
        doc /* シンプルな UI デザイン */
    }

    requirement Azure_Static_Web_Apps_2 :> R_6_1_Phase_1_MVP {
        doc /* Azure Static Web Apps へのデプロイ */
    }

    requirement R_6_2_Phase_2 :> DocumentRequirements {
        doc /* Source heading: 6.2 Phase 2（機能拡張） */
    }

    requirement R_3_5_3 :> R_6_2_Phase_2 {
        doc /* 複数メモリスロット（3-5個）への拡張 */
    }

    requirement R_1000_2 :> R_6_2_Phase_2 {
        doc /* 計算履歴の上限を1000件に拡張 */
        attribute limitCount : Integer = 1000;
    }

    requirement Req094 :> R_6_2_Phase_2 {
        doc /* 履歴のダウンロード/コピー機能 */
    }

    requirement Req095 :> R_6_2_Phase_2 {
        doc /* 拡張キーボードショートカット */
    }

    requirement Req096 :> R_6_2_Phase_2 {
        doc /* レスポンシブデザインの最適化 */
    }

    requirement UI_UX :> R_6_2_Phase_2 {
        doc /* UI/UX の改善 */
    }

    requirement R_6_3_Phase_3 :> DocumentRequirements {
        doc /* Source heading: 6.3 Phase 3（オプション機能） */
    }

    requirement Req098 :> R_6_3_Phase_3 {
        doc /* 履歴のインポート機能 */
    }

    requirement Req099 :> R_6_3_Phase_3 {
        doc /* テーマ切替機能（ライト/ダーク） */
    }

    requirement Req100 :> R_6_3_Phase_3 {
        doc /* 計算履歴の検索/フィルタ機能 */
    }

    requirement PWA :> R_6_3_Phase_3 {
        doc /* PWA 対応（オフライン利用） */
    }

    requirement R_7_1 :> DocumentRequirements {
        doc /* Source heading: 7.1 納品物 */
    }

    requirement React :> R_7_1 {
        doc /* React アプリケーションのソースコード */
    }

    requirement README_md :> R_7_1 {
        doc /* README.md（セットアップ手順、使用方法） */
    }

    requirement GitHub_Actions :> R_7_1 {
        doc /* GitHub Actions ワークフロー設定 */
    }

    requirement Azure_Static_Web_Apps_3 :> R_7_1 {
        doc /* Azure Static Web Apps 設定ファイル */
    }

    requirement R_7_2 :> DocumentRequirements {
        doc /* Source heading: 7.2 ドキュメント */
    }

    requirement Req106 :> R_7_2 {
        doc /* 本要求仕様書 */
    }

    requirement Req107 :> R_7_2 {
        doc /* アーキテクチャ設計書 */
    }

    requirement API :> R_7_2 {
        doc /* API設計書（該当なし） */
    }

    requirement Req109 :> R_7_2 {
        doc /* テスト計画書 */
    }

    requirement R_8_1 :> DocumentRequirements {
        doc /* Source heading: 8.1 機能検収 */
    }

    requirement Req110 :> R_8_1 {
        doc /* [ ] 四則演算が正しく動作する */
    }

    requirement R_3_5_4 :> R_8_1 {
        doc /* [ ] メモリ機能（3-5スロット）が正しく動作する */
    }

    requirement R_1000_3 :> R_8_1 {
        doc /* [ ] 計算履歴が1000件まで正しく記録される */
        attribute limitCount : Integer = 1000;
    }

    requirement Req113 :> R_8_1 {
        doc /* [ ] 履歴のダウンロード/コピーが正常に動作する */
    }

    requirement Req114 :> R_8_1 {
        doc /* [ ] キーボード操作が正しく動作する */
    }

    requirement R_8_2 :> DocumentRequirements {
        doc /* Source heading: 8.2 非機能検収 */
    }

    requirement PC :> R_8_2 {
        doc /* [ ] PC、タブレット、スマートフォンで正しく表示される */
    }

    requirement Req116 :> R_8_2 {
        doc /* [ ] 主要ブラウザで正常に動作する */
    }

    requirement R_3_2 :> R_8_2 {
        doc /* [ ] 初回ロード時間が3秒以内 */
        attribute timeLimit : String = "3秒";
    }

    requirement GitHub_Actions_2 :> R_8_2 {
        doc /* [ ] GitHub Actions で自動デプロイが成功する */
    }

    requirement R_8_3 :> DocumentRequirements {
        doc /* Source heading: 8.3 デプロイ検収 */
    }

    requirement Azure_Static_Web_Apps_4 :> R_8_3 {
        doc /* [ ] Azure Static Web Apps に正常にデプロイされる */
    }

    requirement URL_2 :> R_8_3 {
        doc /* [ ] 本番環境の URL でアクセス可能 */
    }

    requirement Req121 :> R_8_3 {
        doc /* [ ] プルリクエスト時にプレビュー環境が作成される */
    }

    part def SystemDesign {
        doc /* Derived from design source */
        part calculator : Calculator;
        part memoryManager : MemoryManager;
        part historyManager : HistoryManager;
        part calculator_test : Calculator_test;
        part memoryManager_test : MemoryManager_test;
        part historyManager_test : HistoryManager_test;
        part display : Display;
        part buttonGrid : ButtonGrid;
        part memoryPanel : MemoryPanel;
        part historyPanel : HistoryPanel;
        part app : App;
        part main : Main;
    }

    part def Calculator {
        doc /* 計算エンジン */
    }

    part def MemoryManager {
        doc /* メモリ管理 */
    }

    part def HistoryManager {
        doc /* 履歴管理 */
    }

    part def Calculator_test {
        doc /* 計算エンジンのテスト */
    }

    part def MemoryManager_test {
        doc /* メモリ管理のテスト */
    }

    part def HistoryManager_test {
        doc /* 履歴管理のテスト */
    }

    part def Display {
        doc /* ディスプレイ */
    }

    part def ButtonGrid {
        doc /* ボタングリッド */
    }

    part def MemoryPanel {
        doc /* メモリパネル */
    }

    part def HistoryPanel {
        doc /* 履歴パネル */
    }

    part def App {
        doc /* メインアプリケーション */
    }

    part def Main {
        doc /* エントリーポイント */
    }

}
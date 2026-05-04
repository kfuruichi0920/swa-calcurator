/**
 * SWA Calculator - Requirements Specification Model
 * Generated from: doc/requirements-specification.md
 * Date: 2026-02-28
 * Version: 1.0
 */

package SWACalculatorSystem {
    import ScalarValues::*;
    
    // =============================================================================
    // 1. PROJECT OVERVIEW (Section 1)
    // =============================================================================
    
    part def SWACalculator {
        doc /*
         * SWA Calculator（Azure Static Web Apps 電卓アプリケーション）
         * React を使用したモダンな Web 電卓アプリケーション
         * 基本的な四則演算に加え、計算履歴とメモリ機能を備えた実用的な電卓
         */
        
        attribute projectName : String = "SWA Calculator";
        attribute targetUsers : String = "一般ユーザー（PC、タブレット、スマートフォンから利用）";
        attribute hostingPlatform : String = "Azure Static Web Apps";
    }
    
    // =============================================================================
    // 2. FUNCTIONAL REQUIREMENTS (Section 2)
    // =============================================================================
    
    requirement def FunctionalRequirements {
        doc /* 機能要件のルート定義 */
    }
    
    // 2.1 Basic Arithmetic Operations (Section 2.1)
    requirement BasicArithmeticOperations :> FunctionalRequirements {
        doc /* 
         * 四則演算：加算（+）、減算（-）、乗算（×）、除法（÷）
         * 数値入力：0-9 の数字入力、小数点入力
         * クリア機能：C（クリア）、AC（オールクリア）
         * 等号：計算結果の表示（=）
         * Source: Section 2.1
         */
        
        requirement def Addition {
            doc /* 加算（+）操作を提供する */
        }
        
        requirement def Subtraction {
            doc /* 減算（-）操作を提供する */
        }
        
        requirement def Multiplication {
            doc /* 乗算（×）操作を提供する */
        }
        
        requirement def Division {
            doc /* 除法（÷）操作を提供する */
        }
        
        requirement def NumericInput {
            doc /* 0-9 の数字入力、小数点入力を提供する */
        }
        
        requirement def ClearFunction {
            doc /* 
             * C（クリア）：現在の入力をクリア
             * AC（オールクリア）：すべての計算状態をリセット
             */
        }
        
        requirement def EqualsFunction {
            doc /* 計算結果の表示（=）を提供する */
        }
    }
    
    // 2.2 Memory Functions (Section 2.2)
    requirement MemoryFunctions :> FunctionalRequirements {
        doc /*
         * 複数メモリスロット：3-5 個のメモリスロットを提供
         * メモリ操作：M+、M-、MR、MC、メモリスロット選択
         * 各スロットの値を一覧表示
         * Source: Section 2.2
         */
        
        attribute memorySlotCount : Integer = 5;
        
        requirement def MemoryAdd {
            doc /* M+（メモリ加算）：現在の値を選択中のメモリスロットに加算 */
        }
        
        requirement def MemorySubtract {
            doc /* M-（メモリ減算）：現在の値を選択中のメモリスロットから減算 */
        }
        
        requirement def MemoryRecall {
            doc /* MR（メモリ呼出）：選択中のメモリスロットの値を呼び出し */
        }
        
        requirement def MemoryClear {
            doc /* MC（メモリクリア）：選択中のメモリスロットをクリア */
        }
        
        requirement def MemorySlotSelection {
            doc /* メモリスロット選択：複数のスロット間を切り替え可能 */
        }
        
        requirement def MemoryDisplay {
            doc /* 各スロットの値を一覧表示（UI上で確認可能） */
        }
    }
    
    // 2.3 Calculation History (Section 2.3)
    requirement CalculationHistoryFunctions :> FunctionalRequirements {
        doc /*
         * 履歴の記録：各計算式と結果を記録（形式例：123 + 456 = 579）
         * 履歴の表示：計算履歴を時系列で表示（新しいものが上）
         * 履歴の上限：1000 件まで保存
         * 上限超過時：最も古い履歴から自動削除（FIFO方式）
         * Source: Section 2.3
         */
        
        attribute maxHistoryCount : Integer = 1000;
        attribute displayOrder : String = "新しいものが上";
        attribute deletionPolicy : String = "FIFO方式";
        
        requirement def HistoryRecording {
            doc /* 各計算式と結果を記録（形式例：123 + 456 = 579） */
        }
        
        requirement def HistoryDisplay {
            doc /* 計算履歴を時系列で表示（新しいものが上） */
        }
        
        requirement def HistoryLimit {
            doc /* 
             * 履歴の上限：1000 件まで保存
             * 上限超過時：最も古い履歴から自動削除（FIFO方式）
             */
        }
        
        requirement def HistoryOperations {
            doc /*
             * 履歴項目をクリックして値を再利用
             * 履歴全体のクリア機能
             * 個別履歴の削除機能
             */
        }
    }
    
    // 2.4 Data Persistence & Export (Section 2.4)
    requirement DataPersistenceExportFunctions :> FunctionalRequirements {
        doc /*
         * セッション中の保存：ブラウザのメモリ上に保持
         * エクスポート機能：JSONファイルダウンロード、クリップボードコピー
         * インポート機能（オプション）：JSONファイルの読み込みと復元
         * Source: Section 2.4
         */
        
        requirement def SessionStorage {
            doc /*
             * すべてのデータ（計算履歴、メモリスロット）はブラウザのメモリ上に保持
             * ページリロード時にデータは消失
             */
        }
        
        requirement def JSONExport {
            doc /* JSONファイルダウンロード：計算履歴とメモリデータを JSON 形式でダウンロード */
        }
        
        requirement def ClipboardCopy {
            doc /* クリップボードコピー：計算履歴をテキスト形式でコピー */
        }
        
        requirement def JSONImport {
            doc /* インポート機能（オプション）：以前ダウンロードした JSON ファイルを読み込んで履歴を復元 */
        }
    }
    
    // 2.5 Keyboard Operations (Section 2.5)
    requirement KeyboardOperationsFunctions :> FunctionalRequirements {
        doc /*
         * 数字キー：0-9
         * 演算子キー：+、-、*、/
         * 制御キー：Enter、Backspace/Delete、Escape、Ctrl+Shift+Delete
         * その他：.（ピリオド）、キーボードショートカット一覧表示（?キー）
         * Source: Section 2.5
         */
        
        requirement def NumericKeys {
            doc /* 数字キー：0-9 */
        }
        
        requirement def OperatorKeys {
            doc /* 演算子キー：+、-、*、/ */
        }
        
        requirement def ControlKeys {
            doc /*
             * Enter：計算実行（= と同じ）
             * Backspace/Delete：最後の1文字を削除
             * Escape：クリア（C と同じ）
             * Ctrl+Shift+Delete：オールクリア（AC と同じ）
             */
        }
        
        requirement def OtherKeys {
            doc /*
             * .（ピリオド）：小数点入力
             * キーボードショートカット一覧を表示する機能（?キーまたはヘルプボタン）
             */
        }
    }
    
    // =============================================================================
    // 3. NON-FUNCTIONAL REQUIREMENTS (Section 3)
    // =============================================================================
    
    requirement def NonFunctionalRequirements {
        doc /* 非機能要件のルート定義 */
    }
    
    // 3.1 Technology Stack (Section 3.1)
    requirement TechnologyStackRequirements :> NonFunctionalRequirements {
        doc /*
         * フロントエンド：React 18+, TypeScript, Vite, CSS Modules/Styled Components
         * バックエンド：なし（フロントエンドのみの静的アプリケーション）
         * ホスティング：Azure Static Web Apps
         * CI/CD：GitHub Actions
         * Source: Section 3.1
         */
        
        attribute frontendFramework : String = "React 18+";
        attribute language : String = "TypeScript";
        attribute buildTool : String = "Vite";
        attribute styling : String = "CSS Modules または Styled Components";
        attribute backend : String = "なし";
        attribute hosting : String = "Azure Static Web Apps";
        attribute cicd : String = "GitHub Actions";
    }
    
    // 3.2 UI/UX Requirements (Section 3.2)
    requirement UIUXRequirements :> NonFunctionalRequirements {
        doc /*
         * レスポンシブデザイン：デスクトップ、タブレット、スマートフォン対応
         * デザインスタイル：シンプルで直感的、ボタンの視覚的フィードバック
         * アクセシビリティ：キーボードナビゲーション、ARIAラベル、カラーコントラスト
         * Source: Section 3.2
         */
        
        requirement def ResponsiveDesign {
            doc /*
             * デスクトップ（1024px 以上）
             * タブレット（768px - 1023px）
             * スマートフォン（320px - 767px）
             */
            
            attribute desktopBreakpoint : String = "1024px以上";
            attribute tabletBreakpoint : String = "768px - 1023px";
            attribute mobileBreakpoint : String = "320px - 767px";
        }
        
        requirement def DesignStyle {
            doc /*
             * シンプルで直感的なデザイン
             * 一般的な電卓アプリケーションの UI パターンを踏襲
             * ボタンの視覚的フィードバック（ホバー、アクティブ状態）
             */
        }
        
        requirement def Accessibility {
            doc /*
             * キーボードナビゲーション対応
             * ARIA ラベルの適切な使用
             * 適切なカラーコントラスト
             */
        }
    }
    
    // 3.3 Browser Support (Section 3.3)
    requirement BrowserSupportRequirements :> NonFunctionalRequirements {
        doc /*
         * 対象ブラウザ：Chrome、Firefox、Safari、Edge（最新版）
         * 非対応：IE11
         * Source: Section 3.3
         */
        
        attribute supportedBrowsers : String = "Chrome, Firefox, Safari, Edge (最新版)";
        attribute unsupportedBrowsers : String = "IE11";
    }
    
    // 3.4 Performance Requirements (Section 3.4)
    requirement PerformanceRequirements :> NonFunctionalRequirements {
        doc /*
         * 初回ロード時間：3秒以内
         * 操作レスポンス：100ms 以内
         * バンドルサイズ：500KB 以下（gzip圧縮後）
         * Source: Section 3.4
         */
        
        attribute initialLoadTime : String = "3秒以内";
        attribute operationResponse : String = "100ms以内";
        attribute bundleSize : String = "500KB以下（gzip圧縮後）";
    }
    
    // 3.5 Security Requirements (Section 3.5)
    requirement SecurityRequirements :> NonFunctionalRequirements {
        doc /*
         * データ保存：クライアントサイドのみ（サーバーへの送信なし）
         * XSS対策：React の標準的なエスケープ処理を使用
         * Source: Section 3.5
         */
        
        attribute dataStorage : String = "クライアントサイドのみ";
        attribute xssProtection : String = "React の標準的なエスケープ処理";
    }
    
    // =============================================================================
    // 4. DEPLOYMENT REQUIREMENTS (Section 4)
    // =============================================================================
    
    requirement def DeploymentRequirements {
        doc /* デプロイ要件のルート定義 - Source: Section 4 */
    }
    
    // 4.1 Azure Static Web Apps (Section 4.1)
    requirement AzureStaticWebAppsRequirements :> DeploymentRequirements {
        doc /*
         * 環境：本番環境（main ブランチ）、プレビュー環境（プルリクエスト毎）
         * Source: Section 4.1
         */
        
        attribute productionBranch : String = "main";
        attribute previewEnvironment : String = "プルリクエスト毎に自動生成";
    }
    
    // 4.2 GitHub Actions (Section 4.2)
    requirement GitHubActionsRequirements :> DeploymentRequirements {
        doc /*
         * 自動デプロイフロー：
         * 1. main ブランチへの push をトリガー
         * 2. ビルド実行（npm run build）
         * 3. Azure Static Web Apps へデプロイ
         * 4. デプロイ完了通知
         * プルリクエスト時：プレビュー環境を自動作成、プレビュー URL をコメントに追加
         * Source: Section 4.2
         */
        
        requirement def AutomatedDeploymentFlow {
            doc /* 自動デプロイフローの定義 */
        }
        
        requirement def PullRequestPreview {
            doc /* プルリクエスト時のプレビュー環境自動作成 */
        }
    }
    
    // 4.3 Environment Variables (Section 4.3)
    requirement EnvironmentVariablesRequirements :> DeploymentRequirements {
        doc /*
         * 特になし（静的アプリケーションのため）
         * Source: Section 4.3
         */
        
        attribute required : String = "なし";
    }
    
    // =============================================================================
    // 5. CONSTRAINTS & PREREQUISITES (Section 5)
    // =============================================================================
    
    constraint Constraints {
        doc /*
         * データの永続化は行わない（セッションベース）
         * 複雑な科学計算機能は含まない（四則演算のみ）
         * 複数ユーザー間でのデータ共有機能はなし
         * Source: Section 5.1
         */
    }
    
    requirement Prerequisites {
        doc /*
         * GitHub アカウントを保有していること
         * Azure アカウントを保有していること
         * Node.js 18+ がインストールされていること
         * Source: Section 5.2
         */
        
        attribute githubAccount : Boolean = true;
        attribute azureAccount : Boolean = true;
        attribute nodeJsVersion : String = "18+";
    }
    
    // =============================================================================
    // 6. DEVELOPMENT SCOPE - PHASED REQUIREMENTS (Section 6)
    // =============================================================================
    
    requirement def DevelopmentScope {
        doc /* 開発スコープ - Source: Section 6 */
    }
    
    // Phase 1: MVP (Section 6.1)
    requirement Phase1_MVP :> DevelopmentScope {
        doc /*
         * Phase 1（MVP）- 1-2週間
         * 基本的な四則演算機能
         * 1つのメモリスロット（M+, M-, MR, MC）
         * 基本的な計算履歴（100件程度）
         * キーボード操作（基本的な数字と演算子）
         * シンプルな UI デザイン
         * Azure Static Web Apps へのデプロイ
         * Source: Section 6.1
         */
        
        attribute duration : String = "1-2週間";
        attribute historyLimit : Integer = 100;
        attribute memorySlots : Integer = 1;
        
        requirement def BasicArithmetic_Phase1 {
            doc /* 基本的な四則演算機能 */
        }
        
        requirement def SingleMemorySlot_Phase1 {
            doc /* 1つのメモリスロット（M+, M-, MR, MC） */
        }
        
        requirement def BasicHistory_Phase1 {
            doc /* 基本的な計算履歴（100件程度） */
        }
        
        requirement def BasicKeyboard_Phase1 {
            doc /* キーボード操作（基本的な数字と演算子） */
        }
        
        requirement def SimpleUI_Phase1 {
            doc /* シンプルな UI デザイン */
        }
        
        requirement def InitialDeployment_Phase1 {
            doc /* Azure Static Web Apps へのデプロイ */
        }
    }
    
    // Phase 2: Feature Enhancement (Section 6.2)
    requirement Phase2_FeatureEnhancement :> DevelopmentScope {
        doc /*
         * Phase 2（機能拡張）- 1-2週間
         * 複数メモリスロット（3-5個）への拡張
         * 計算履歴の上限を1000件に拡張
         * 履歴のダウンロード/コピー機能
         * 拡張キーボードショートカット
         * レスポンシブデザインの最適化
         * UI/UX の改善
         * Source: Section 6.2
         */
        
        attribute duration : String = "1-2週間";
        attribute historyLimit : Integer = 1000;
        attribute memorySlots : String = "3-5個";
        
        requirement def MultipleMemorySlots_Phase2 {
            doc /* 複数メモリスロット（3-5個）への拡張 */
        }
        
        requirement def ExtendedHistory_Phase2 {
            doc /* 計算履歴の上限を1000件に拡張 */
        }
        
        requirement def ExportFeatures_Phase2 {
            doc /* 履歴のダウンロード/コピー機能 */
        }
        
        requirement def ExtendedKeyboard_Phase2 {
            doc /* 拡張キーボードショートカット */
        }
        
        requirement def ResponsiveOptimization_Phase2 {
            doc /* レスポンシブデザインの最適化 */
        }
        
        requirement def UIUXImprovement_Phase2 {
            doc /* UI/UX の改善 */
        }
    }
    
    // Phase 3: Optional Features (Section 6.3)
    requirement Phase3_OptionalFeatures :> DevelopmentScope {
        doc /*
         * Phase 3（オプション機能）- 1週間
         * 履歴のインポート機能
         * テーマ切替機能（ライト/ダーク）
         * 計算履歴の検索/フィルタ機能
         * PWA 対応（オフライン利用）
         * Source: Section 6.3
         */
        
        attribute duration : String = "1週間";
        
        requirement def HistoryImport_Phase3 {
            doc /* 履歴のインポート機能 */
        }
        
        requirement def ThemeSwitching_Phase3 {
            doc /* テーマ切替機能（ライト/ダーク） */
        }
        
        requirement def HistorySearchFilter_Phase3 {
            doc /* 計算履歴の検索/フィルタ機能 */
        }
        
        requirement def PWASupport_Phase3 {
            doc /* PWA 対応（オフライン利用） */
        }
    }
    
    // =============================================================================
    // 7. SYSTEM ARCHITECTURE - PART DEFINITIONS
    // =============================================================================
    
    part def CalculatorSystem :> SWACalculator {
        doc /*
         * 電卓システムの全体構成
         * コアロジック層とUI層で構成
         */
        
        // Core Logic Layer
        part calculatorCore : CalculatorCore;
        part memoryManager : MemoryManager;
        part historyManager : HistoryManager;
        
        // UI Layer
        part userInterface : UserInterface;
    }
    
    part def CalculatorCore {
        doc /*
         * 計算エンジン本体
         * 四則演算の実行、状態管理を担当
         * 実装: src/core/Calculator.ts
         */
        
        attribute currentValue : Real;
        attribute expression : String;
        attribute operator : String;
        
        port input {
            doc /* 数値・演算子の入力を受け付ける */
        }
        
        port output {
            doc /* 計算結果を出力する */
        }
    }
    
    part def MemoryManager {
        doc /*
         * メモリスロット管理
         * 3-5個のメモリスロットを管理し、M+, M-, MR, MC 操作を提供
         * 実装: src/core/MemoryManager.ts
         */
        
        attribute slotCount : Integer = 5;
        attribute currentSlotIndex : Integer;
        attribute memoryValues : Real[5];
        
        port memoryOperations {
            doc /* メモリ操作（M+, M-, MR, MC）のインターフェース */
        }
    }
    
    part def HistoryManager {
        doc /*
         * 計算履歴管理
         * 最大1000件の履歴をFIFO方式で管理
         * エクスポート/インポート機能を提供
         * 実装: src/core/HistoryManager.ts
         */
        
        attribute maxEntries : Integer = 1000;
        attribute entries : String[1000];
        
        port historyOperations {
            doc /* 履歴操作（追加、削除、エクスポート、インポート）のインターフェース */
        }
    }
    
    part def UserInterface {
        doc /*
         * ユーザーインターフェース層
         * React コンポーネントで構成
         */
        
        part display : Display;
        part buttonGrid : ButtonGrid;
        part memoryPanel : MemoryPanel;
        part historyPanel : HistoryPanel;
    }
    
    part def Display {
        doc /*
         * ディスプレイコンポーネント
         * 現在の値と計算式を表示
         * 実装: src/components/Display.tsx
         */
    }
    
    part def ButtonGrid {
        doc /*
         * ボタングリッドコンポーネント
         * 数字ボタン（0-9）、演算子ボタン（+, -, *, /）、制御ボタン（C, AC, =）を配置
         * 実装: src/components/ButtonGrid.tsx
         */
    }
    
    part def MemoryPanel {
        doc /*
         * メモリパネルコンポーネント
         * メモリスロットの選択と値の表示、メモリ操作ボタンを提供
         * 実装: src/components/MemoryPanel.tsx
         */
    }
    
    part def HistoryPanel {
        doc /*
         * 履歴パネルコンポーネント
         * 計算履歴の一覧表示、エクスポート/インポートボタンを提供
         * 実装: src/components/HistoryPanel.tsx
         */
    }
    
    // =============================================================================
    // 8. ACCEPTANCE CRITERIA (Section 8)
    // =============================================================================
    
    requirement def AcceptanceCriteria {
        doc /* 検収基準 - Source: Section 8 */
    }
    
    requirement FunctionalAcceptance :> AcceptanceCriteria {
        doc /*
         * 機能検収
         * - 四則演算が正しく動作する
         * - メモリ機能（3-5スロット）が正しく動作する
         * - 計算履歴が1000件まで正しく記録される
         * - 履歴のダウンロード/コピーが正常に動作する
         * - キーボード操作が正しく動作する
         * Source: Section 8.1
         */
    }
    
    requirement NonFunctionalAcceptance :> AcceptanceCriteria {
        doc /*
         * 非機能検収
         * - PC、タブレット、スマートフォンで正しく表示される
         * - 主要ブラウザで正常に動作する
         * - 初回ロード時間が3秒以内
         * - GitHub Actions で自動デプロイが成功する
         * Source: Section 8.2
         */
    }
    
    requirement DeploymentAcceptance :> AcceptanceCriteria {
        doc /*
         * デプロイ検収
         * - Azure Static Web Apps に正常にデプロイされる
         * - 本番環境の URL でアクセス可能
         * - プルリクエスト時にプレビュー環境が作成される
         * Source: Section 8.3
         */
    }
}

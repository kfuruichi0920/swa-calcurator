/**
 * Source: doc/requirements-specification.md
 * Generated: 2026-05-03
 */
package SWACalculatorRequirementsModel {
    import ScalarValues::*;

    requirement def FunctionalRequirement {
        doc /* Functional requirement captured from the requirements specification. */
    }

    requirement def NonFunctionalRequirement {
        doc /* Non-functional requirement captured from the requirements specification. */
    }

    requirement def DeploymentRequirement {
        doc /* Deployment and operational requirement captured from the requirements specification. */
    }

    requirement def ConstraintRequirement {
        doc /* Constraint or assumption captured from the requirements specification. */
    }

    requirement def AcceptanceRequirement {
        doc /* Acceptance criterion captured from the requirements specification. */
    }

    actor def EndUser;
    actor def Operator;
    actor def GitHubActions;
    actor def AzureStaticWebApps;

    use case def PerformArithmetic;
    use case def ManageMemorySlots;
    use case def ReviewCalculationHistory;
    use case def ExportAndImportHistory;
    use case def OperateWithKeyboardShortcuts;
    use case def DeployStaticApplication;

    interface def UserInteractionInterface;
    interface def HistoryDataExchangeInterface;
    interface def DeploymentAutomationInterface;

    requirement ProjectPurpose :> FunctionalRequirement {
        // Source: doc/requirements-specification.md §1.2 lines 8-10
        doc /* React を使用したモダンな Web 電卓アプリケーションを構築し、Azure Static Web Apps にデプロイする。基本的な四則演算に加え、計算履歴とメモリ機能を備えた実用的な電卓を提供する。 */
    }

    requirement TargetUsers :> FunctionalRequirement {
        // Source: doc/requirements-specification.md §1.3 lines 12-13
        doc /* 一般ユーザー（PC、タブレット、スマートフォンから利用） */
    }

    requirement BasicArithmetic :> FunctionalRequirement {
        // Source: doc/requirements-specification.md §2.1 lines 19-25
        doc /* 四則演算：加算（+）、減算（-）、乗算（×）、除法（÷） */
    }

    requirement NumericInput :> FunctionalRequirement {
        // Source: doc/requirements-specification.md §2.1 lines 20-21
        doc /* 数値入力：0-9 の数字入力、小数点入力 */
    }

    requirement ClearCurrentInput :> FunctionalRequirement {
        // Source: doc/requirements-specification.md §2.1 lines 22-24
        doc /* C（クリア）：現在の入力をクリア */
    }

    requirement ResetAllState :> FunctionalRequirement {
        // Source: doc/requirements-specification.md §2.1 lines 22-24
        doc /* AC（オールクリア）：すべての計算状態をリセット */
    }

    requirement ShowCalculationResult :> FunctionalRequirement {
        // Source: doc/requirements-specification.md §2.1 line 25
        doc /* 等号：計算結果の表示（=） */
    }

    requirement ProvideMultipleMemorySlots :> FunctionalRequirement {
        // Source: doc/requirements-specification.md §2.2 lines 27-35
        doc /* 複数メモリスロット：3-5 個のメモリスロットを提供 */
        attribute minimumSlotCount : Integer = 3;
        attribute maximumSlotCount : Integer = 5;
    }

    requirement AddToSelectedMemory :> FunctionalRequirement {
        // Source: doc/requirements-specification.md §2.2 lines 29-30
        doc /* M+（メモリ加算）：現在の値を選択中のメモリスロットに加算 */
    }

    requirement SubtractFromSelectedMemory :> FunctionalRequirement {
        // Source: doc/requirements-specification.md §2.2 lines 30-31
        doc /* M-（メモリ減算）：現在の値を選択中のメモリスロットから減算 */
    }

    requirement RecallSelectedMemory :> FunctionalRequirement {
        // Source: doc/requirements-specification.md §2.2 lines 31-32
        doc /* MR（メモリ呼出）：選択中のメモリスロットの値を呼び出し */
    }

    requirement ClearSelectedMemory :> FunctionalRequirement {
        // Source: doc/requirements-specification.md §2.2 lines 32-33
        doc /* MC（メモリクリア）：選択中のメモリスロットをクリア */
    }

    requirement SelectMemorySlot :> FunctionalRequirement {
        // Source: doc/requirements-specification.md §2.2 lines 33-35
        doc /* メモリスロット選択：複数のスロット間を切り替え可能 */
    }

    requirement ShowMemorySlotValues :> FunctionalRequirement {
        // Source: doc/requirements-specification.md §2.2 line 35
        doc /* 各スロットの値を一覧表示（UI上で確認可能） */
    }

    requirement RecordCalculationHistory :> FunctionalRequirement {
        // Source: doc/requirements-specification.md §2.3 lines 37-39
        doc /* 履歴の記録：各計算式と結果を記録。形式例：123 + 456 = 579 */
    }

    requirement ShowCalculationHistory :> FunctionalRequirement {
        // Source: doc/requirements-specification.md §2.3 line 40
        doc /* 履歴の表示：計算履歴を時系列で表示（新しいものが上） */
    }

    requirement LimitHistoryEntries :> FunctionalRequirement {
        // Source: doc/requirements-specification.md §2.3 lines 41-42
        doc /* 履歴の上限：1000 件まで保存。上限超過時：最も古い履歴から自動削除（FIFO方式） */
        attribute maxHistoryCount : Integer = 1000;
    }

    requirement ReuseHistoryValue :> FunctionalRequirement {
        // Source: doc/requirements-specification.md §2.3 lines 43-44
        doc /* 履歴項目をクリックして値を再利用 */
    }

    requirement ClearAllHistory :> FunctionalRequirement {
        // Source: doc/requirements-specification.md §2.3 lines 45-46
        doc /* 履歴全体のクリア機能 */
    }

    requirement DeleteHistoryItem :> FunctionalRequirement {
        // Source: doc/requirements-specification.md §2.3 line 46
        doc /* 個別履歴の削除機能 */
    }

    requirement SessionScopedStorage :> FunctionalRequirement {
        // Source: doc/requirements-specification.md §2.4 lines 48-51
        doc /* すべてのデータ（計算履歴、メモリスロット）はブラウザのメモリ上に保持 */
    }

    requirement ClearDataOnReload :> FunctionalRequirement {
        // Source: doc/requirements-specification.md §2.4 line 51
        doc /* ページリロード時にデータは消失 */
    }

    requirement ExportAsJson :> FunctionalRequirement {
        // Source: doc/requirements-specification.md §2.4 lines 52-54
        doc /* JSONファイルダウンロード：計算履歴とメモリデータを JSON 形式でダウンロード */
    }

    requirement CopyHistoryAsText :> FunctionalRequirement {
        // Source: doc/requirements-specification.md §2.4 lines 54-55
        doc /* クリップボードコピー：計算履歴をテキスト形式でコピー */
    }

    requirement ImportHistoryFromJson :> FunctionalRequirement {
        // Source: doc/requirements-specification.md §2.4 line 55
        doc /* インポート機能（オプション）：以前ダウンロードした JSON ファイルを読み込んで履歴を復元 */
    }

    requirement SupportNumberKeys :> FunctionalRequirement {
        // Source: doc/requirements-specification.md §2.5 lines 57-58
        doc /* 数字キー：0-9 */
    }

    requirement SupportOperatorKeys :> FunctionalRequirement {
        // Source: doc/requirements-specification.md §2.5 line 59
        doc /* 演算子キー：+、-、*、/ */
    }

    requirement EnterExecutesCalculation :> FunctionalRequirement {
        // Source: doc/requirements-specification.md §2.5 lines 60-61
        doc /* Enter：計算実行（= と同じ） */
    }

    requirement BackspaceAndDeleteEditInput :> FunctionalRequirement {
        // Source: doc/requirements-specification.md §2.5 lines 61-63
        doc /* Backspace/Delete：最後の1文字を削除 */
    }

    requirement EscapeClearsInput :> FunctionalRequirement {
        // Source: doc/requirements-specification.md §2.5 line 63
        doc /* Escape：クリア（C と同じ） */
    }

    requirement ShortcutForAllClear :> FunctionalRequirement {
        // Source: doc/requirements-specification.md §2.5 line 64
        doc /* Ctrl+Shift+Delete：オールクリア（AC と同じ） */
    }

    requirement SupportDecimalShortcut :> FunctionalRequirement {
        // Source: doc/requirements-specification.md §2.5 lines 65-66
        doc /* .（ピリオド）：小数点入力 */
    }

    requirement ShowKeyboardShortcutHelp :> FunctionalRequirement {
        // Source: doc/requirements-specification.md §2.5 lines 66-67
        doc /* キーボードショートカット一覧を表示する機能（?キーまたはヘルプボタン） */
    }

    requirement UseReactFrontend :> NonFunctionalRequirement {
        // Source: doc/requirements-specification.md §3.1 lines 73-78
        doc /* フロントエンド：React 18+、TypeScript、Vite、CSS Modules または Styled Components */
    }

    requirement FrontendOnlyArchitecture :> NonFunctionalRequirement {
        // Source: doc/requirements-specification.md §3.1 lines 79-81
        doc /* バックエンド：なし（フロントエンドのみの静的アプリケーション）、ホスティング：Azure Static Web Apps、CI/CD：GitHub Actions */
    }

    requirement ResponsiveDesign :> NonFunctionalRequirement {
        // Source: doc/requirements-specification.md §3.2 lines 83-87
        doc /* デスクトップ、タブレット、スマートフォンに対応するレスポンシブデザイン */
        attribute desktopMinWidthPx : Integer = 1024;
        attribute tabletMinWidthPx : Integer = 768;
        attribute smartphoneMinWidthPx : Integer = 320;
    }

    requirement IntuitiveCalculatorUi :> NonFunctionalRequirement {
        // Source: doc/requirements-specification.md §3.2 lines 88-91
        doc /* シンプルで直感的なデザイン、一般的な電卓 UI パターン、ボタンの視覚的フィードバック */
    }

    requirement AccessibilitySupport :> NonFunctionalRequirement {
        // Source: doc/requirements-specification.md §3.2 lines 92-95
        doc /* キーボードナビゲーション対応、ARIA ラベルの適切な使用、適切なカラーコントラスト */
    }

    requirement SupportedBrowsers :> NonFunctionalRequirement {
        // Source: doc/requirements-specification.md §3.3 lines 97-103
        doc /* Chrome、Firefox、Safari、Edge の最新版を対象とし、IE11 は非対応 */
    }

    requirement InitialLoadPerformance :> NonFunctionalRequirement {
        // Source: doc/requirements-specification.md §3.4 lines 105-108
        doc /* 初回ロード時間：3秒以内 */
        attribute initialLoadTimeSeconds : Integer = 3;
    }

    requirement InteractionPerformance :> NonFunctionalRequirement {
        // Source: doc/requirements-specification.md §3.4 line 107
        doc /* 操作レスポンス：100ms 以内 */
        attribute responseTimeMilliseconds : Integer = 100;
    }

    requirement BundleSizeLimit :> NonFunctionalRequirement {
        // Source: doc/requirements-specification.md §3.4 line 108
        doc /* バンドルサイズ：500KB 以下（gzip圧縮後） */
        attribute bundleSizeKilobytes : Integer = 500;
    }

    requirement ClientSideDataHandling :> NonFunctionalRequirement {
        // Source: doc/requirements-specification.md §3.5 line 111
        doc /* データ保存：クライアントサイドのみ（サーバーへの送信なし） */
    }

    requirement XssMitigation :> NonFunctionalRequirement {
        // Source: doc/requirements-specification.md §3.5 line 112
        doc /* XSS対策：React の標準的なエスケープ処理を使用 */
    }

    requirement ProductionAndPreviewEnvironments :> DeploymentRequirement {
        // Source: doc/requirements-specification.md §4.1 lines 118-121
        doc /* 本番環境（main ブランチ）とプレビュー環境（プルリクエスト毎に自動生成）を提供する */
    }

    requirement AutomatedDeploymentFlow :> DeploymentRequirement {
        // Source: doc/requirements-specification.md §4.2 lines 123-128
        doc /* main ブランチへの push をトリガーに、ビルド、Azure Static Web Apps へのデプロイ、完了通知を行う */
    }

    requirement PullRequestPreviewDeployment :> DeploymentRequirement {
        // Source: doc/requirements-specification.md §4.2 lines 129-131
        doc /* プルリクエスト時にプレビュー環境を自動作成し、プレビュー URL をコメントに追加する */
    }

    requirement NoRuntimeEnvironmentVariables :> DeploymentRequirement {
        // Source: doc/requirements-specification.md §4.3 lines 133-134
        doc /* 特になし（静的アプリケーションのため） */
    }

    requirement NoPersistentStorage :> ConstraintRequirement {
        // Source: doc/requirements-specification.md §5.1 line 141
        doc /* データの永続化は行わない（セッションベース） */
    }

    requirement NoScientificFunctions :> ConstraintRequirement {
        // Source: doc/requirements-specification.md §5.1 line 142
        doc /* 複雑な科学計算機能は含まない（四則演算のみ） */
    }

    requirement NoMultiUserSharing :> ConstraintRequirement {
        // Source: doc/requirements-specification.md §5.1 line 143
        doc /* 複数ユーザー間でのデータ共有機能はなし */
    }

    requirement DevelopmentPrerequisites :> ConstraintRequirement {
        // Source: doc/requirements-specification.md §5.2 lines 145-148
        doc /* GitHub アカウント、Azure アカウント、Node.js 18+ を前提とする */
    }

    requirement ArithmeticAccepted :> AcceptanceRequirement {
        // Source: doc/requirements-specification.md §8.1 line 197
        doc /* 四則演算が正しく動作する */
    }

    requirement MemoryAccepted :> AcceptanceRequirement {
        // Source: doc/requirements-specification.md §8.1 line 198
        doc /* メモリ機能（3-5スロット）が正しく動作する */
    }

    requirement HistoryAccepted :> AcceptanceRequirement {
        // Source: doc/requirements-specification.md §8.1 line 199
        doc /* 計算履歴が1000件まで正しく記録される */
    }

    requirement ExportAccepted :> AcceptanceRequirement {
        // Source: doc/requirements-specification.md §8.1 line 200
        doc /* 履歴のダウンロード/コピーが正常に動作する */
    }

    requirement KeyboardAccepted :> AcceptanceRequirement {
        // Source: doc/requirements-specification.md §8.1 line 201
        doc /* キーボード操作が正しく動作する */
    }

    requirement ResponsiveUiAccepted :> AcceptanceRequirement {
        // Source: doc/requirements-specification.md §8.2 line 204
        doc /* PC、タブレット、スマートフォンで正しく表示される */
    }

    requirement BrowserCompatibilityAccepted :> AcceptanceRequirement {
        // Source: doc/requirements-specification.md §8.2 line 205
        doc /* 主要ブラウザで正常に動作する */
    }

    requirement LoadTimeAccepted :> AcceptanceRequirement {
        // Source: doc/requirements-specification.md §8.2 line 206
        doc /* 初回ロード時間が3秒以内 */
    }

    requirement CiCdAccepted :> AcceptanceRequirement {
        // Source: doc/requirements-specification.md §8.2 line 207
        doc /* GitHub Actions で自動デプロイが成功する */
    }

    requirement DeploymentAccepted :> AcceptanceRequirement {
        // Source: doc/requirements-specification.md §8.3 lines 209-212
        doc /* Azure Static Web Apps に正常にデプロイされ、本番環境の URL でアクセス可能であり、プルリクエスト時にプレビュー環境が作成される */
    }

    part def CalculatorSystem {
        doc /* Top-level system decomposition derived from the requirement specification. */
        part uiShell : UserInterfaceShell;
        part calculatorCore : ArithmeticEngine;
        part memorySubsystem : MemorySubsystem;
        part historySubsystem : HistorySubsystem;
        part dataExchangeSubsystem : DataExchangeSubsystem;
        part keyboardHandler : KeyboardShortcutHandler;
        part deploymentPipeline : DeploymentPipeline;
    }

    part def UserInterfaceShell {
        doc /* Presents calculator UI, responsive layouts, shortcut help, and accessibility affordances. */
        // Traces to: TargetUsers, ResponsiveDesign, IntuitiveCalculatorUi, AccessibilitySupport, ShowMemorySlotValues, ShowCalculationHistory, ShowKeyboardShortcutHelp
    }

    part def ArithmeticEngine {
        doc /* Executes arithmetic expressions, numeric entry, clear operations, and result rendering. */
        // Traces to: BasicArithmetic, NumericInput, ClearCurrentInput, ResetAllState, ShowCalculationResult, NoScientificFunctions
    }

    part def MemorySubsystem {
        doc /* Manages 3-5 user-selectable memory slots and slot-level arithmetic operations. */
        // Traces to: ProvideMultipleMemorySlots, AddToSelectedMemory, SubtractFromSelectedMemory, RecallSelectedMemory, ClearSelectedMemory, SelectMemorySlot, MemoryAccepted
    }

    part def HistorySubsystem {
        doc /* Records, orders, limits, clears, deletes, and reuses calculation history entries. */
        // Traces to: RecordCalculationHistory, ShowCalculationHistory, LimitHistoryEntries, ReuseHistoryValue, ClearAllHistory, DeleteHistoryItem, HistoryAccepted
    }

    part def DataExchangeSubsystem {
        doc /* Keeps session-scoped data in browser memory and supports JSON export, text copy, and optional import. */
        // Traces to: SessionScopedStorage, ClearDataOnReload, ExportAsJson, CopyHistoryAsText, ImportHistoryFromJson, ClientSideDataHandling, NoPersistentStorage
    }

    part def KeyboardShortcutHandler {
        doc /* Maps keyboard commands to calculator behaviors and help interactions. */
        // Traces to: SupportNumberKeys, SupportOperatorKeys, EnterExecutesCalculation, BackspaceAndDeleteEditInput, EscapeClearsInput, ShortcutForAllClear, SupportDecimalShortcut, OperateWithKeyboardShortcuts
    }

    part def DeploymentPipeline {
        doc /* Builds and deploys the static frontend to Azure Static Web Apps through GitHub Actions. */
        // Traces to: FrontendOnlyArchitecture, ProductionAndPreviewEnvironments, AutomatedDeploymentFlow, PullRequestPreviewDeployment, CiCdAccepted, DeploymentAccepted
    }
}

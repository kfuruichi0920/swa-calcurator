/**
 * Source: doc/plan-swaCalculator.prompt.md
 * Generated: 2026-05-03
 */
package SWACalculatorPlanningModel {
    import ScalarValues::*;

    requirement def PlanningRequirement {
        doc /* Requirement captured from the planning prompt document. */
    }

    requirement AppSupportsArithmetic :> PlanningRequirement {
        // Source: doc/plan-swaCalculator.prompt.md §1 line 2
        doc /* 四則演算 */
    }

    requirement AppSupportsMemory :> PlanningRequirement {
        // Source: doc/plan-swaCalculator.prompt.md §1 line 3
        doc /* 途中計算結果のメモリ機能 */
    }

    requirement AppShowsHistory :> PlanningRequirement {
        // Source: doc/plan-swaCalculator.prompt.md §1 line 4
        doc /* 計算履歴を表示機能 */
    }

    requirement AppSupportsKeyboardOperation :> PlanningRequirement {
        // Source: doc/plan-swaCalculator.prompt.md §1 line 5
        doc /* キーボード操作機能 */
    }

    requirement UseReactFrontend :> PlanningRequirement {
        // Source: doc/plan-swaCalculator.prompt.md §2 line 8
        doc /* React */
    }

    requirement DeployToStaticWebApps :> PlanningRequirement {
        // Source: doc/plan-swaCalculator.prompt.md §4 lines 13-15
        doc /* static web apps へのデプロイ、github actions を使用した自動デプロイ */
    }

    part def PlannedCalculatorSystem {
        doc /* High-level system concept captured from the planning prompt. */
        part frontend : FrontendApplication;
        part memoryFeature : MemoryFeature;
        part historyFeature : HistoryFeature;
        part keyboardFeature : KeyboardFeature;
        part deployment : StaticWebAppsDeployment;
    }

    part def FrontendApplication {
        doc /* React-based frontend for calculator interactions. */
        // Traces to: AppSupportsArithmetic, UseReactFrontend
    }

    part def MemoryFeature {
        doc /* Memory function for intermediate results. */
        // Traces to: AppSupportsMemory
    }

    part def HistoryFeature {
        doc /* History display capability for prior calculations. */
        // Traces to: AppShowsHistory
    }

    part def KeyboardFeature {
        doc /* Keyboard-driven operation capability. */
        // Traces to: AppSupportsKeyboardOperation
    }

    part def StaticWebAppsDeployment {
        doc /* Deployment target and automation concept. */
        // Traces to: DeployToStaticWebApps
    }
}

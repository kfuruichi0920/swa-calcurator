/**
 * 四則演算を行う電卓のコアエンジン
 * t_wadaのテスト駆動開発方法論に基づいて実装
 */
export declare class Calculator {
    private display;
    private accumulator;
    private operator;
    private isNewNumber;
    /**
     * 数字または演算子をinput
     */
    input(value: string): void;
    /**
     * 数字入力を処理
     */
    private handleNumber;
    /**
     * 小数点入力を処理
     */
    private handleDecimal;
    /**
     * 演算子入力を処理
     */
    private handleOperator;
    /**
     * 実際の計算を実行
     */
    private performCalculation;
    /**
     * 等号で計算実行
     */
    equals(): string;
    /**
     * 現在の入力をクリア
     */
    clear(): void;
    /**
     * すべての状態をリセット
     */
    allClear(): void;
    /**
     * 表示値を返す
     */
    getDisplay(): string;
}

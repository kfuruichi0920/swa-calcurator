/**
 * 四則演算を行う電卓のコアエンジン
 * t_wadaのテスト駆動開発方法論に基づいて実装
 */
var Calculator = /** @class */ (function () {
    function Calculator() {
        this.display = '0';
        this.accumulator = 0;
        this.operator = null;
        this.isNewNumber = true;
    }
    /**
     * 数字または演算子をinput
     */
    Calculator.prototype.input = function (value) {
        if (value === '+' || value === '-' || value === '*' || value === '/') {
            this.handleOperator(value);
        }
        else if (value === '.') {
            this.handleDecimal();
        }
        else {
            this.handleNumber(value);
        }
    };
    /**
     * 数字入力を処理
     */
    Calculator.prototype.handleNumber = function (value) {
        if (this.isNewNumber) {
            this.display = value;
            this.isNewNumber = false;
        }
        else {
            // 複数の数字を連結
            if (!(this.display === '0' && value === '0')) {
                if (this.display === '0' && value !== '0') {
                    this.display = value;
                }
                else {
                    this.display += value;
                }
            }
        }
    };
    /**
     * 小数点入力を処理
     */
    Calculator.prototype.handleDecimal = function () {
        if (!this.display.includes('.')) {
            this.display += '.';
            this.isNewNumber = false;
        }
    };
    /**
     * 演算子入力を処理
     */
    Calculator.prototype.handleOperator = function (nextOperator) {
        var inputValue = parseFloat(this.display);
        if (this.operator !== null && !this.isNewNumber) {
            // 前の演算を計算
            this.accumulator = this.performCalculation(this.accumulator, inputValue, this.operator);
        }
        else {
            this.accumulator = inputValue;
        }
        this.display = this.accumulator.toString();
        this.operator = nextOperator;
        this.isNewNumber = true;
    };
    /**
     * 実際の計算を実行
     */
    Calculator.prototype.performCalculation = function (prev, current, op) {
        switch (op) {
            case '+':
                return prev + current;
            case '-':
                return prev - current;
            case '*':
                return prev * current;
            case '/':
                if (current === 0) {
                    throw new Error('Division by zero');
                }
                return prev / current;
            default:
                return current;
        }
    };
    /**
     * 等号で計算実行
     */
    Calculator.prototype.equals = function () {
        if (this.operator === null) {
            return this.display;
        }
        var inputValue = parseFloat(this.display);
        try {
            var result = this.performCalculation(this.accumulator, inputValue, this.operator);
            this.display = result.toString();
            this.accumulator = 0;
            this.operator = null;
            this.isNewNumber = true;
            return this.display;
        }
        catch (error) {
            return 'Error';
        }
    };
    /**
     * 現在の入力をクリア
     */
    Calculator.prototype.clear = function () {
        this.display = '0';
        this.isNewNumber = true;
    };
    /**
     * すべての状態をリセット
     */
    Calculator.prototype.allClear = function () {
        this.display = '0';
        this.accumulator = 0;
        this.operator = null;
        this.isNewNumber = true;
    };
    /**
     * 表示値を返す
     */
    Calculator.prototype.getDisplay = function () {
        return this.display;
    };
    return Calculator;
}());
export { Calculator };

/**
 * 四則演算を行う電卓のコアエンジン
 * t_wadaのテスト駆動開発方法論に基づいて実装
 */
export class Calculator {
  private display: string = '0'
  private accumulator: number = 0
  private operator: string | null = null
  private isNewNumber: boolean = true

  /**
   * 数字または演算子をinput
   */
  input(value: string): void {
    if (value === '+' || value === '-' || value === '*' || value === '/') {
      this.handleOperator(value)
    } else if (value === '.') {
      this.handleDecimal()
    } else {
      this.handleNumber(value)
    }
  }

  /**
   * 数字入力を処理
   */
  private handleNumber(value: string): void {
    if (this.isNewNumber) {
      this.display = value
      this.isNewNumber = false
    } else {
      // 複数の数字を連結
      if (!(this.display === '0' && value === '0')) {
        if (this.display === '0' && value !== '0') {
          this.display = value
        } else {
          this.display += value
        }
      }
    }
  }

  /**
   * 小数点入力を処理
   */
  private handleDecimal(): void {
    if (this.isNewNumber) {
      this.display = '0.'
      this.isNewNumber = false
      return
    }

    if (!this.display.includes('.')) {
      this.display += '.'
      this.isNewNumber = false
    }
  }

  /**
   * 演算子入力を処理
   */
  private handleOperator(nextOperator: string): void {
    if (this.display === 'Error') {
      return
    }

    const inputValue = parseFloat(this.display)

    if (this.operator !== null && !this.isNewNumber) {
      // 前の演算を計算
      this.accumulator = this.performCalculation(
        this.accumulator,
        inputValue,
        this.operator
      )
    } else {
      this.accumulator = inputValue
    }

    this.display = this.accumulator.toString()
    this.operator = nextOperator
    this.isNewNumber = true
  }

  /**
   * 実際の計算を実行
   */
  private performCalculation(prev: number, current: number, op: string): number {
    switch (op) {
      case '+':
        return prev + current
      case '-':
        return prev - current
      case '*':
        return prev * current
      case '/':
        if (current === 0) {
          throw new Error('Division by zero')
        }
        return prev / current
      default:
        return current
    }
  }

  /**
   * 等号で計算実行
   */
  equals(): string {
    if (this.operator === null) {
      return this.display
    }

    const inputValue = parseFloat(this.display)

    try {
      const result = this.performCalculation(
        this.accumulator,
        inputValue,
        this.operator
      )
      this.display = result.toString()
      this.accumulator = 0
      this.operator = null
      this.isNewNumber = true
      return this.display
    } catch {
      this.display = 'Error'
      this.accumulator = 0
      this.operator = null
      this.isNewNumber = true
      return this.display
    }
  }

  /**
   * 現在の入力をクリア
   */
  clear(): void {
    this.display = '0'
    this.isNewNumber = true
  }

  /**
   * すべての状態をリセット
   */
  allClear(): void {
    this.display = '0'
    this.accumulator = 0
    this.operator = null
    this.isNewNumber = true
  }

  /**
   * 表示値を返す
   */
  getDisplay(): string {
    return this.display
  }
}

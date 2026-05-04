/**
 * 計算履歴のエントリ
 */
export interface HistoryEntry {
  id: string
  expression: string
  result: number
  timestamp: Date
}

/**
 * 計算履歴管理機能
 * 最大1000件まで保存し、FIFOで古いものから削除する
 */
export class HistoryManager {
  private static readonly MAX_HISTORY_COUNT = 1000
  private entries: HistoryEntry[] = []

  /**
   * 履歴に新しいエントリを追加
   */
  add(expression: string, result: number): void {
    const entry: HistoryEntry = {
      id: this.generateId(),
      expression,
      result,
      timestamp: new Date(),
    }

    // 新しい履歴を先頭に追加
    this.entries.unshift(entry)

    // 上限を超えたら古いものを削除
    if (this.entries.length > HistoryManager.MAX_HISTORY_COUNT) {
      this.entries.pop()
    }
  }

  /**
   * 履歴の件数を取得
   */
  getCount(): number {
    return this.entries.length
  }

  /**
   * すべての履歴を取得（新しい順）
   */
  getAll(): HistoryEntry[] {
    return [...this.entries]
  }

  /**
   * IDで特定の履歴を取得
   */
  getById(id: string): HistoryEntry | undefined {
    return this.entries.find((entry) => entry.id === id)
  }

  /**
   * 特定の履歴を削除
   */
  deleteById(id: string): void {
    this.entries = this.entries.filter((entry) => entry.id !== id)
  }

  /**
   * すべての履歴をクリア
   */
  clear(): void {
    this.entries = []
  }

  /**
   * JSON形式でエクスポート
   */
  exportToJSON(): string {
    return JSON.stringify(this.entries, null, 2)
  }

  /**
   * テキスト形式でエクスポート
   */
  exportToText(): string {
    return this.entries
      .map((entry) => `${entry.expression} = ${entry.result}`)
      .join('\n')
  }

  /**
   * JSON形式でインポート
   */
  importFromJSON(json: string): void {
    try {
      const data = JSON.parse(json) as unknown

      if (!Array.isArray(data)) {
        throw new Error('Invalid JSON format')
      }

      const entries: HistoryEntry[] = []

      for (const entry of data) {
        entries.push(this.parseHistoryEntry(entry))
      }

      this.entries = entries.slice(-HistoryManager.MAX_HISTORY_COUNT)
    } catch {
      throw new Error('Invalid JSON format')
    }
  }

  /**
   * インポートデータを履歴エントリに変換
   */
  private parseHistoryEntry(entry: unknown): HistoryEntry {
    const candidate = entry as Record<string, unknown>

    if (
      typeof entry !== 'object' ||
      entry === null ||
      typeof candidate.id !== 'string' ||
      typeof candidate.expression !== 'string' ||
      typeof candidate.result !== 'number' ||
      Number.isNaN(candidate.result) ||
      !('timestamp' in candidate)
    ) {
      throw new Error('Invalid JSON format')
    }

    const rawTimestamp = candidate.timestamp

    if (
      !(
        typeof rawTimestamp === 'string' ||
        typeof rawTimestamp === 'number' ||
        rawTimestamp instanceof Date
      )
    ) {
      throw new Error('Invalid JSON format')
    }

    const timestamp = new Date(rawTimestamp)

    if (Number.isNaN(timestamp.getTime())) {
      throw new Error('Invalid JSON format')
    }

    return {
      id: candidate.id,
      expression: candidate.expression,
      result: candidate.result,
      timestamp,
    }
  }

  /**
   * ユニークなIDを生成
   */
  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
  }
}

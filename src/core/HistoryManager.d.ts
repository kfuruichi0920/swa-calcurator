/**
 * 計算履歴のエントリ
 */
export interface HistoryEntry {
    id: string;
    expression: string;
    result: number;
    timestamp: Date;
}
/**
 * 計算履歴管理機能
 * 最大1000件まで保存し、FIFOで古いものから削除する
 */
export declare class HistoryManager {
    private static readonly MAX_HISTORY_COUNT;
    private entries;
    /**
     * 履歴に新しいエントリを追加
     */
    add(expression: string, result: number): void;
    /**
     * 履歴の件数を取得
     */
    getCount(): number;
    /**
     * すべての履歴を取得（新しい順）
     */
    getAll(): HistoryEntry[];
    /**
     * IDで特定の履歴を取得
     */
    getById(id: string): HistoryEntry | undefined;
    /**
     * 特定の履歴を削除
     */
    deleteById(id: string): void;
    /**
     * すべての履歴をクリア
     */
    clear(): void;
    /**
     * JSON形式でエクスポート
     */
    exportToJSON(): string;
    /**
     * テキスト形式でエクスポート
     */
    exportToText(): string;
    /**
     * JSON形式でインポート
     */
    importFromJSON(json: string): void;
    /**
     * ユニークなIDを生成
     */
    private generateId;
}

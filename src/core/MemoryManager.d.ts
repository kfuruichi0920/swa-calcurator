/**
 * 電卓のメモリ管理機能
 * 複数のメモリスロット（5個）を管理し、M+, M-, MR, MC を実現する
 */
export declare class MemoryManager {
    private slots;
    private currentSlot;
    /**
     * メモリスロット数を取得
     */
    getSlotCount(): number;
    /**
     * 指定スロット（または現在のスロット）から値を呼び出す (MR)
     */
    recall(slotIndex?: number): number;
    /**
     * 現在選択中のスロット番号を取得
     */
    getCurrentSlot(): number;
    /**
     * 現在のスロットに値を加算 (M+)
     */
    add(value: number): void;
    /**
     * 現在のスロットから値を減算 (M-)
     */
    subtract(value: number): void;
    /**
     * 指定スロット（または現在のスロット）をクリア (MC)
     */
    clear(slotIndex?: number): void;
    /**
     * すべてのスロットをクリア
     */
    clearAll(): void;
    /**
     * スロットを選択
     */
    selectSlot(slotIndex: number): void;
    /**
     * すべてのメモリ値を配列で取得
     */
    getAllValues(): number[];
    /**
     * スロット番号の妥当性チェック
     */
    private validateSlot;
}

/**
 * 電卓のメモリ管理機能
 * 複数のメモリスロット（5個）を管理し、M+, M-, MR, MC を実現する
 */
export class MemoryManager {
  private slots: number[] = [0, 0, 0, 0, 0]
  private currentSlot: number = 0

  /**
   * メモリスロット数を取得
   */
  getSlotCount(): number {
    return this.slots.length
  }

  /**
   * 指定スロット（または現在のスロット）から値を呼び出す (MR)
   */
  recall(slotIndex?: number): number {
    const index = slotIndex !== undefined ? slotIndex : this.currentSlot
    this.validateSlot(index)
    return this.slots[index]
  }

  /**
   * 現在選択中のスロット番号を取得
   */
  getCurrentSlot(): number {
    return this.currentSlot
  }

  /**
   * 現在のスロットに値を加算 (M+)
   */
  add(value: number): void {
    this.slots[this.currentSlot] += value
  }

  /**
   * 現在のスロットから値を減算 (M-)
   */
  subtract(value: number): void {
    this.slots[this.currentSlot] -= value
  }

  /**
   * 指定スロット（または現在のスロット）をクリア (MC)
   */
  clear(slotIndex?: number): void {
    const index = slotIndex !== undefined ? slotIndex : this.currentSlot
    this.validateSlot(index)
    this.slots[index] = 0
  }

  /**
   * すべてのスロットをクリア
   */
  clearAll(): void {
    this.slots = [0, 0, 0, 0, 0]
  }

  /**
   * スロットを選択
   */
  selectSlot(slotIndex: number): void {
    this.validateSlot(slotIndex)
    this.currentSlot = slotIndex
  }

  /**
   * すべてのメモリ値を配列で取得
   */
  getAllValues(): number[] {
    return [...this.slots]
  }

  /**
   * スロット番号の妥当性チェック
   */
  private validateSlot(slotIndex: number): void {
    if (slotIndex < 0 || slotIndex >= this.slots.length) {
      throw new Error(`Invalid slot index: ${slotIndex}`)
    }
  }
}

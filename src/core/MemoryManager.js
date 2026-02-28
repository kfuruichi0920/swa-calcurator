var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
/**
 * 電卓のメモリ管理機能
 * 複数のメモリスロット（5個）を管理し、M+, M-, MR, MC を実現する
 */
var MemoryManager = /** @class */ (function () {
    function MemoryManager() {
        this.slots = [0, 0, 0, 0, 0];
        this.currentSlot = 0;
    }
    /**
     * メモリスロット数を取得
     */
    MemoryManager.prototype.getSlotCount = function () {
        return this.slots.length;
    };
    /**
     * 指定スロット（または現在のスロット）から値を呼び出す (MR)
     */
    MemoryManager.prototype.recall = function (slotIndex) {
        var index = slotIndex !== undefined ? slotIndex : this.currentSlot;
        this.validateSlot(index);
        return this.slots[index];
    };
    /**
     * 現在選択中のスロット番号を取得
     */
    MemoryManager.prototype.getCurrentSlot = function () {
        return this.currentSlot;
    };
    /**
     * 現在のスロットに値を加算 (M+)
     */
    MemoryManager.prototype.add = function (value) {
        this.slots[this.currentSlot] += value;
    };
    /**
     * 現在のスロットから値を減算 (M-)
     */
    MemoryManager.prototype.subtract = function (value) {
        this.slots[this.currentSlot] -= value;
    };
    /**
     * 指定スロット（または現在のスロット）をクリア (MC)
     */
    MemoryManager.prototype.clear = function (slotIndex) {
        var index = slotIndex !== undefined ? slotIndex : this.currentSlot;
        this.validateSlot(index);
        this.slots[index] = 0;
    };
    /**
     * すべてのスロットをクリア
     */
    MemoryManager.prototype.clearAll = function () {
        this.slots = [0, 0, 0, 0, 0];
    };
    /**
     * スロットを選択
     */
    MemoryManager.prototype.selectSlot = function (slotIndex) {
        this.validateSlot(slotIndex);
        this.currentSlot = slotIndex;
    };
    /**
     * すべてのメモリ値を配列で取得
     */
    MemoryManager.prototype.getAllValues = function () {
        return __spreadArray([], this.slots, true);
    };
    /**
     * スロット番号の妥当性チェック
     */
    MemoryManager.prototype.validateSlot = function (slotIndex) {
        if (slotIndex < 0 || slotIndex >= this.slots.length) {
            throw new Error("Invalid slot index: ".concat(slotIndex));
        }
    };
    return MemoryManager;
}());
export { MemoryManager };

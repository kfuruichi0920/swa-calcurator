var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
 * 計算履歴管理機能
 * 最大1000件まで保存し、FIFOで古いものから削除する
 */
var HistoryManager = /** @class */ (function () {
    function HistoryManager() {
        this.entries = [];
    }
    /**
     * 履歴に新しいエントリを追加
     */
    HistoryManager.prototype.add = function (expression, result) {
        var entry = {
            id: this.generateId(),
            expression: expression,
            result: result,
            timestamp: new Date(),
        };
        // 新しい履歴を先頭に追加
        this.entries.unshift(entry);
        // 上限を超えたら古いものを削除
        if (this.entries.length > HistoryManager.MAX_HISTORY_COUNT) {
            this.entries.pop();
        }
    };
    /**
     * 履歴の件数を取得
     */
    HistoryManager.prototype.getCount = function () {
        return this.entries.length;
    };
    /**
     * すべての履歴を取得（新しい順）
     */
    HistoryManager.prototype.getAll = function () {
        return __spreadArray([], this.entries, true);
    };
    /**
     * IDで特定の履歴を取得
     */
    HistoryManager.prototype.getById = function (id) {
        return this.entries.find(function (entry) { return entry.id === id; });
    };
    /**
     * 特定の履歴を削除
     */
    HistoryManager.prototype.deleteById = function (id) {
        this.entries = this.entries.filter(function (entry) { return entry.id !== id; });
    };
    /**
     * すべての履歴をクリア
     */
    HistoryManager.prototype.clear = function () {
        this.entries = [];
    };
    /**
     * JSON形式でエクスポート
     */
    HistoryManager.prototype.exportToJSON = function () {
        return JSON.stringify(this.entries, null, 2);
    };
    /**
     * テキスト形式でエクスポート
     */
    HistoryManager.prototype.exportToText = function () {
        return this.entries
            .map(function (entry) { return "".concat(entry.expression, " = ").concat(entry.result); })
            .join('\n');
    };
    /**
     * JSON形式でインポート
     */
    HistoryManager.prototype.importFromJSON = function (json) {
        try {
            var data = JSON.parse(json);
            // timestampを復元
            this.entries = data.map(function (entry) { return (__assign(__assign({}, entry), { timestamp: new Date(entry.timestamp) })); });
        }
        catch (_a) {
            throw new Error('Invalid JSON format');
        }
    };
    /**
     * ユニークなIDを生成
     */
    HistoryManager.prototype.generateId = function () {
        return "".concat(Date.now(), "-").concat(Math.random().toString(36).substring(2, 9));
    };
    HistoryManager.MAX_HISTORY_COUNT = 1000;
    return HistoryManager;
}());
export { HistoryManager };

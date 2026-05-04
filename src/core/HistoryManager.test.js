import { describe, it, expect, beforeEach } from 'vitest';
import { HistoryManager } from './HistoryManager';
describe('HistoryManager - 計算履歴機能', function () {
    var history;
    beforeEach(function () {
        history = new HistoryManager();
    });
    describe('初期状態', function () {
        it('履歴は空である', function () {
            expect(history.getCount()).toBe(0);
            expect(history.getAll()).toEqual([]);
        });
    });
    describe('履歴の追加', function () {
        it('計算履歴を追加できる', function () {
            history.add('1 + 2', 3);
            expect(history.getCount()).toBe(1);
        });
        it('複数の履歴を追加できる', function () {
            history.add('1 + 2', 3);
            history.add('5 - 3', 2);
            history.add('4 * 5', 20);
            expect(history.getCount()).toBe(3);
        });
        it('追加された履歴は正しい形式で保存される', function () {
            history.add('123 + 456', 579);
            var entries = history.getAll();
            expect(entries).toHaveLength(1);
            expect(entries[0].expression).toBe('123 + 456');
            expect(entries[0].result).toBe(579);
            expect(entries[0].id).toBeDefined();
            expect(entries[0].timestamp).toBeInstanceOf(Date);
        });
        it('新しい履歴が先頭に追加される', function () {
            history.add('1 + 1', 2);
            history.add('2 + 2', 4);
            history.add('3 + 3', 6);
            var entries = history.getAll();
            expect(entries[0].expression).toBe('3 + 3');
            expect(entries[1].expression).toBe('2 + 2');
            expect(entries[2].expression).toBe('1 + 1');
        });
    });
    describe('履歴の上限', function () {
        it('1000件まで保存できる', function () {
            for (var i = 0; i < 1000; i++) {
                history.add("".concat(i, " + ").concat(i), i * 2);
            }
            expect(history.getCount()).toBe(1000);
        });
        it('1001件目は最古の履歴を削除して追加される', function () {
            for (var i = 0; i < 1001; i++) {
                history.add("".concat(i, " + ").concat(i), i * 2);
            }
            expect(history.getCount()).toBe(1000);
            var entries = history.getAll();
            // 最新は 1000 + 1000
            expect(entries[0].expression).toBe('1000 + 1000');
            // 最古は 1 + 1（0 + 0が削除された）
            expect(entries[999].expression).toBe('1 + 1');
        });
    });
    describe('履歴の取得', function () {
        it('IDで特定の履歴を取得できる', function () {
            history.add('100 + 200', 300);
            var entries = history.getAll();
            var id = entries[0].id;
            var entry = history.getById(id);
            expect(entry).toBeDefined();
            expect(entry === null || entry === void 0 ? void 0 : entry.expression).toBe('100 + 200');
            expect(entry === null || entry === void 0 ? void 0 : entry.result).toBe(300);
        });
        it('存在しないIDはundefinedを返す', function () {
            var entry = history.getById('nonexistent-id');
            expect(entry).toBeUndefined();
        });
    });
    describe('履歴の削除', function () {
        it('特定の履歴を削除できる', function () {
            history.add('1 + 1', 2);
            history.add('2 + 2', 4);
            history.add('3 + 3', 6);
            var entries = history.getAll();
            var idToDelete = entries[1].id;
            history.deleteById(idToDelete);
            expect(history.getCount()).toBe(2);
            expect(history.getById(idToDelete)).toBeUndefined();
        });
        it('存在しないIDの削除は何もしない', function () {
            history.add('1 + 1', 2);
            var beforeCount = history.getCount();
            history.deleteById('nonexistent-id');
            expect(history.getCount()).toBe(beforeCount);
        });
    });
    describe('履歴の全削除', function () {
        it('すべての履歴をクリアできる', function () {
            history.add('1 + 1', 2);
            history.add('2 + 2', 4);
            history.add('3 + 3', 6);
            history.clear();
            expect(history.getCount()).toBe(0);
            expect(history.getAll()).toEqual([]);
        });
    });
    describe('エクスポート機能', function () {
        it('JSON形式でエクスポートできる', function () {
            history.add('1 + 2', 3);
            history.add('5 * 6', 30);
            var json = history.exportToJSON();
            var parsed = JSON.parse(json);
            expect(parsed).toHaveLength(2);
            expect(parsed[0].expression).toBe('5 * 6');
            expect(parsed[0].result).toBe(30);
        });
        it('テキスト形式でエクスポートできる', function () {
            history.add('1 + 2', 3);
            history.add('5 - 3', 2);
            var text = history.exportToText();
            expect(text).toContain('5 - 3 = 2');
            expect(text).toContain('1 + 2 = 3');
        });
    });
    describe('インポート機能', function () {
        it('JSON形式でインポートできる', function () {
            var data = [
                {
                    id: 'test-1',
                    expression: '10 + 20',
                    result: 30,
                    timestamp: new Date(),
                },
                {
                    id: 'test-2',
                    expression: '50 * 2',
                    result: 100,
                    timestamp: new Date(),
                },
            ];
            history.importFromJSON(JSON.stringify(data));
            expect(history.getCount()).toBe(2);
            var entries = history.getAll();
            expect(entries[0].expression).toBe('10 + 20');
            expect(entries[1].expression).toBe('50 * 2');
        });
        it('不正なJSONはエラーをスローする', function () {
            expect(function () {
                history.importFromJSON('invalid json');
            }).toThrow();
        });
        it('1000件を超える履歴をインポートしても最新1000件に制限される', function () {
            var data = Array.from({ length: 1001 }, function (_, index) { return ({
                id: "test-".concat(index),
                expression: "".concat(index, " + ").concat(index),
                result: index * 2,
                timestamp: new Date("2024-01-01T00:00:".concat(String(index % 60).padStart(2, '0'), ".000Z")),
            }); });
            history.importFromJSON(JSON.stringify(data));
            var entries = history.getAll();
            expect(entries).toHaveLength(1000);
            expect(entries[0].id).toBe('test-1');
            expect(entries[999].id).toBe('test-1000');
        });
        it('不正な履歴データはエラーをスローする', function () {
            var invalidData = [
                {
                    id: 'test-1',
                    expression: '1 + 2',
                    result: '3',
                    timestamp: new Date(),
                },
            ];
            expect(function () {
                history.importFromJSON(JSON.stringify(invalidData));
            }).toThrow('Invalid JSON format');
        });
    });
});

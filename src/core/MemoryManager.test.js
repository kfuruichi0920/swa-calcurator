import { describe, it, expect, beforeEach } from 'vitest';
import { MemoryManager } from './MemoryManager';
describe('MemoryManager - メモリ機能', function () {
    var memory;
    beforeEach(function () {
        memory = new MemoryManager();
    });
    describe('初期状態', function () {
        it('メモリは5スロット存在する', function () {
            expect(memory.getSlotCount()).toBe(5);
        });
        it('すべてのスロットは0で初期化される', function () {
            for (var i = 0; i < 5; i++) {
                expect(memory.recall(i)).toBe(0);
            }
        });
        it('デフォルトでスロット0が選択されている', function () {
            expect(memory.getCurrentSlot()).toBe(0);
        });
    });
    describe('メモリ加算 (M+)', function () {
        it('スロット0に5を加算できる', function () {
            memory.add(5);
            expect(memory.recall()).toBe(5);
        });
        it('複数回加算できる', function () {
            memory.add(5);
            memory.add(10);
            memory.add(3);
            expect(memory.recall()).toBe(18);
        });
        it('負の値を加算できる', function () {
            memory.add(-5);
            expect(memory.recall()).toBe(-5);
        });
        it('小数を加算できる', function () {
            memory.add(1.5);
            memory.add(2.5);
            expect(memory.recall()).toBe(4);
        });
    });
    describe('メモリ減算 (M-)', function () {
        it('スロット0から5を減算できる', function () {
            memory.subtract(5);
            expect(memory.recall()).toBe(-5);
        });
        it('加算後に減算できる', function () {
            memory.add(10);
            memory.subtract(3);
            expect(memory.recall()).toBe(7);
        });
    });
    describe('メモリ呼び出し (MR)', function () {
        it('メモリに保存した値を呼び出せる', function () {
            memory.add(123);
            var value = memory.recall();
            expect(value).toBe(123);
        });
        it('スロット番号を指定して呼び出せる', function () {
            memory.add(100);
            memory.selectSlot(1);
            memory.add(200);
            expect(memory.recall(0)).toBe(100);
            expect(memory.recall(1)).toBe(200);
        });
    });
    describe('メモリクリア (MC)', function () {
        it('現在のスロットをクリアできる', function () {
            memory.add(100);
            memory.clear();
            expect(memory.recall()).toBe(0);
        });
        it('特定のスロットをクリアできる', function () {
            memory.add(100);
            memory.selectSlot(1);
            memory.add(200);
            memory.clear(0);
            expect(memory.recall(0)).toBe(0);
            expect(memory.recall(1)).toBe(200);
        });
    });
    describe('すべてクリア', function () {
        it('すべてのスロットを一度にクリアできる', function () {
            memory.add(100);
            memory.selectSlot(1);
            memory.add(200);
            memory.selectSlot(2);
            memory.add(300);
            memory.clearAll();
            expect(memory.recall(0)).toBe(0);
            expect(memory.recall(1)).toBe(0);
            expect(memory.recall(2)).toBe(0);
        });
    });
    describe('スロット選択', function () {
        it('スロットを切り替えられる', function () {
            memory.selectSlot(0);
            memory.add(100);
            memory.selectSlot(1);
            memory.add(200);
            memory.selectSlot(2);
            memory.add(300);
            expect(memory.recall(0)).toBe(100);
            expect(memory.recall(1)).toBe(200);
            expect(memory.recall(2)).toBe(300);
        });
        it('範囲外のスロット指定はエラーになる', function () {
            expect(function () { return memory.selectSlot(-1); }).toThrow();
            expect(function () { return memory.selectSlot(5); }).toThrow();
        });
    });
    describe('すべてのメモリ値を取得', function () {
        it('全スロットの値を配列で取得できる', function () {
            memory.selectSlot(0);
            memory.add(10);
            memory.selectSlot(1);
            memory.add(20);
            memory.selectSlot(2);
            memory.add(30);
            var allValues = memory.getAllValues();
            expect(allValues).toHaveLength(5);
            expect(allValues[0]).toBe(10);
            expect(allValues[1]).toBe(20);
            expect(allValues[2]).toBe(30);
            expect(allValues[3]).toBe(0);
            expect(allValues[4]).toBe(0);
        });
    });
});

import { describe, it, expect, beforeEach } from 'vitest';
import { Calculator } from './Calculator';
describe('Calculator - 四則演算', function () {
    var calculator;
    beforeEach(function () {
        calculator = new Calculator();
    });
    describe('加算', function () {
        it('0 + 0 = 0 である', function () {
            calculator.input('0');
            calculator.input('+');
            calculator.input('0');
            var result = calculator.equals();
            expect(result).toBe('0');
        });
        it('1 + 2 = 3 である', function () {
            calculator.input('1');
            calculator.input('+');
            calculator.input('2');
            var result = calculator.equals();
            expect(result).toBe('3');
        });
        it('123 + 456 = 579 である', function () {
            calculator.input('123');
            calculator.input('+');
            calculator.input('456');
            var result = calculator.equals();
            expect(result).toBe('579');
        });
    });
    describe('減算', function () {
        it('5 - 3 = 2 である', function () {
            calculator.input('5');
            calculator.input('-');
            calculator.input('3');
            var result = calculator.equals();
            expect(result).toBe('2');
        });
        it('10 - 10 = 0 である', function () {
            calculator.input('10');
            calculator.input('-');
            calculator.input('10');
            var result = calculator.equals();
            expect(result).toBe('0');
        });
    });
    describe('乗算', function () {
        it('2 * 3 = 6 である', function () {
            calculator.input('2');
            calculator.input('*');
            calculator.input('3');
            var result = calculator.equals();
            expect(result).toBe('6');
        });
        it('0 * 100 = 0 である', function () {
            calculator.input('0');
            calculator.input('*');
            calculator.input('100');
            var result = calculator.equals();
            expect(result).toBe('0');
        });
    });
    describe('除算', function () {
        it('6 / 2 = 3 である', function () {
            calculator.input('6');
            calculator.input('/');
            calculator.input('2');
            var result = calculator.equals();
            expect(result).toBe('3');
        });
        it('1 / 1 = 1 である', function () {
            calculator.input('1');
            calculator.input('/');
            calculator.input('1');
            var result = calculator.equals();
            expect(result).toBe('1');
        });
        it('0 / 5 = 0 である', function () {
            calculator.input('0');
            calculator.input('/');
            calculator.input('5');
            var result = calculator.equals();
            expect(result).toBe('0');
        });
        it('1 / 0 はエラーを返す', function () {
            calculator.input('1');
            calculator.input('/');
            calculator.input('0');
            var result = calculator.equals();
            expect(result).toBe('Error');
        });
    });
    describe('小数演算', function () {
        it('0.5 + 0.5 = 1 である', function () {
            calculator.input('0.5');
            calculator.input('+');
            calculator.input('0.5');
            var result = calculator.equals();
            expect(result).toBe('1');
        });
        it('1.5 * 2 = 3 である', function () {
            calculator.input('1.5');
            calculator.input('*');
            calculator.input('2');
            var result = calculator.equals();
            expect(result).toBe('3');
        });
    });
    describe('表示機能', function () {
        it('数字入力後の表示は入力値である', function () {
            calculator.input('123');
            expect(calculator.getDisplay()).toBe('123');
        });
        it('複数回の数字入力は連結される', function () {
            calculator.input('1');
            calculator.input('2');
            calculator.input('3');
            expect(calculator.getDisplay()).toBe('123');
        });
    });
    describe('クリア機能', function () {
        it('clear() は現在の入力をクリアする', function () {
            calculator.input('123');
            calculator.clear();
            expect(calculator.getDisplay()).toBe('0');
        });
        it('allClear() はすべてをリセットする', function () {
            calculator.input('5');
            calculator.input('+');
            calculator.input('3');
            calculator.allClear();
            expect(calculator.getDisplay()).toBe('0');
            calculator.input('2');
            calculator.input('+');
            calculator.input('2');
            var result = calculator.equals();
            expect(result).toBe('4');
        });
    });
    describe('連続計算', function () {
        it('1 + 2 + 3 + 4 = 10 である', function () {
            calculator.input('1');
            calculator.input('+');
            calculator.input('2');
            calculator.equals();
            calculator.input('+');
            calculator.input('3');
            calculator.equals();
            calculator.input('+');
            calculator.input('4');
            var result = calculator.equals();
            expect(result).toBe('10');
        });
    });
});

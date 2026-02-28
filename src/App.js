import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useCallback } from 'react';
import { Calculator } from './core/Calculator';
import { MemoryManager } from './core/MemoryManager';
import { HistoryManager } from './core/HistoryManager';
import Display from './components/Display';
import ButtonGrid from './components/ButtonGrid';
import MemoryPanel from './components/MemoryPanel';
import HistoryPanel from './components/HistoryPanel';
import './App.css';
function App() {
    var calculator = useState(function () { return new Calculator(); })[0];
    var memory = useState(function () { return new MemoryManager(); })[0];
    var history = useState(function () { return new HistoryManager(); })[0];
    var _a = useState('0'), display = _a[0], setDisplay = _a[1];
    var _b = useState(''), expression = _b[0], setExpression = _b[1];
    var _c = useState([]), memoryValues = _c[0], setMemoryValues = _c[1];
    var _d = useState(0), currentMemorySlot = _d[0], setCurrentMemorySlot = _d[1];
    var _e = useState(history.getAll()), historyEntries = _e[0], setHistoryEntries = _e[1];
    // メモリ値を更新
    var updateMemoryDisplay = useCallback(function () {
        setMemoryValues(memory.getAllValues());
        setCurrentMemorySlot(memory.getCurrentSlot());
    }, [memory]);
    // 履歴を更新
    var updateHistoryDisplay = useCallback(function () {
        setHistoryEntries(history.getAll());
    }, [history]);
    // マウント時にメモリ表示を初期化
    useEffect(function () {
        updateMemoryDisplay();
    }, [updateMemoryDisplay]);
    // ボタンクリックハンドラ
    var handleButtonClick = useCallback(function (value) {
        if (value === '=') {
            var result = calculator.equals();
            setDisplay(result);
            // 履歴に追加（エラー時はスキップ）
            if (expression && result !== 'Error') {
                history.add("".concat(expression).concat(result), parseFloat(result));
                updateHistoryDisplay();
                setExpression('');
            }
            else if (result === 'Error') {
                setExpression('');
            }
        }
        else if (value === 'C') {
            calculator.clear();
            setDisplay(calculator.getDisplay());
        }
        else if (value === 'AC') {
            calculator.allClear();
            setDisplay(calculator.getDisplay());
            setExpression('');
        }
        else if (value === 'M+') {
            // display がエラーでない場合のみメモリに追加
            if (display !== 'Error') {
                memory.add(parseFloat(display));
                updateMemoryDisplay();
            }
        }
        else if (value === 'M-') {
            // display がエラーでない場合のみメモリから減算
            if (display !== 'Error') {
                memory.subtract(parseFloat(display));
                updateMemoryDisplay();
            }
        }
        else if (value === 'MR') {
            var value_1 = memory.recall();
            calculator.input(value_1.toString());
            setDisplay(calculator.getDisplay());
        }
        else if (value === 'MC') {
            memory.clear();
            updateMemoryDisplay();
        }
        else if (/^\d+$/.test(value) && value.length > 1) {
            for (var _i = 0, value_2 = value; _i < value_2.length; _i++) {
                var digit = value_2[_i];
                calculator.input(digit);
            }
            setDisplay(calculator.getDisplay());
        }
        else if (['+', '-', '*', '/'].includes(value)) {
            setExpression(display + ' ' + value + ' ');
            calculator.input(value);
            setDisplay(calculator.getDisplay());
        }
        else {
            calculator.input(value);
            setDisplay(calculator.getDisplay());
        }
    }, [calculator, memory, history, display, expression, updateMemoryDisplay, updateHistoryDisplay]);
    // キーボード操作
    useEffect(function () {
        var handleKeyDown = function (e) {
            e.preventDefault();
            if (e.key >= '0' && e.key <= '9') {
                handleButtonClick(e.key);
            }
            else if (e.key === '.') {
                handleButtonClick('.');
            }
            else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
                handleButtonClick(e.key);
            }
            else if (e.key === 'Enter' || e.key === '=') {
                handleButtonClick('=');
            }
            else if (e.key === 'Escape') {
                handleButtonClick('C');
            }
            else if (e.key === 'Backspace') {
                handleButtonClick('C');
            }
            else if (e.ctrlKey && e.shiftKey && e.key === 'Delete') {
                handleButtonClick('AC');
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return function () { return window.removeEventListener('keydown', handleKeyDown); };
    }, [handleButtonClick]);
    // メモリスロット切り替え
    var handleMemorySlotChange = useCallback(function (slotIndex) {
        memory.selectSlot(slotIndex);
        updateMemoryDisplay();
    }, [memory, updateMemoryDisplay]);
    // 履歴クリック
    var handleHistoryClick = useCallback(function (value) {
        calculator.input(value.toString());
        setDisplay(calculator.getDisplay());
    }, [calculator]);
    // 履歴削除
    var handleHistoryDelete = useCallback(function (id) {
        history.deleteById(id);
        updateHistoryDisplay();
    }, [history, updateHistoryDisplay]);
    // 履歴全クリア
    var handleHistoryClear = useCallback(function () {
        history.clear();
        updateHistoryDisplay();
    }, [history, updateHistoryDisplay]);
    // 履歴エクスポート
    var handleHistoryExport = useCallback(function (format) {
        var content;
        var filename;
        if (format === 'json') {
            content = history.exportToJSON();
            filename = 'calculator-history.json';
        }
        else {
            content = history.exportToText();
            filename = 'calculator-history.txt';
        }
        var blob = new Blob([content], { type: 'text/plain' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    }, [history]);
    // 履歴をクリップボードコピー
    var handleHistoryCopy = useCallback(function () {
        var text = history.exportToText();
        navigator.clipboard.writeText(text);
    }, [history]);
    return (_jsxs("div", { className: "app", children: [_jsxs("header", { className: "app-header", children: [_jsx("h1", { children: "SWA Calculator" }), _jsx("p", { className: "subtitle", children: "Azure Static Web Apps \u96FB\u5353\u30A2\u30D7\u30EA\u30B1\u30FC\u30B7\u30E7\u30F3" })] }), _jsxs("div", { className: "calculator-container", children: [_jsxs("div", { className: "main-calculator", children: [_jsx(Display, { value: display, expression: expression }), _jsx(ButtonGrid, { onButtonClick: handleButtonClick })] }), _jsxs("div", { className: "side-panels", children: [_jsx(MemoryPanel, { values: memoryValues, currentSlot: currentMemorySlot, onSlotChange: handleMemorySlotChange }), _jsx(HistoryPanel, { entries: historyEntries, onEntryClick: handleHistoryClick, onEntryDelete: handleHistoryDelete, onClear: handleHistoryClear, onExport: handleHistoryExport, onCopy: handleHistoryCopy })] })] }), _jsx("footer", { className: "app-footer", children: _jsx("p", { children: "\u30AD\u30FC\u30DC\u30FC\u30C9\u64CD\u4F5C: \u6570\u5B57(0-9), \u6F14\u7B97\u5B50(+,-,*,/), Enter(=), Esc(C), Ctrl+Shift+Del(AC)" }) })] }));
}
export default App;

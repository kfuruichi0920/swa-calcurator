import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './MemoryPanel.css';
function MemoryPanel(_a) {
    var values = _a.values, currentSlot = _a.currentSlot, onSlotChange = _a.onSlotChange;
    return (_jsxs("div", { className: "memory-panel", children: [_jsx("h3", { className: "panel-title", children: "\u30E1\u30E2\u30EA\u30B9\u30ED\u30C3\u30C8" }), _jsx("div", { className: "memory-slots", children: values.map(function (value, index) { return (_jsxs("button", { className: "memory-slot ".concat(index === currentSlot ? 'active' : ''), onClick: function () { return onSlotChange(index); }, "aria-label": "\u30E1\u30E2\u30EA\u30B9\u30ED\u30C3\u30C8 ".concat(index + 1), children: [_jsxs("span", { className: "slot-label", children: ["M", index + 1] }), _jsx("span", { className: "slot-value", children: value })] }, index)); }) })] }));
}
export default MemoryPanel;

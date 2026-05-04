import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './Display.css';
function Display(_a) {
    var value = _a.value, expression = _a.expression;
    return (_jsxs("div", { className: "display-container", children: [expression && (_jsx("div", { className: "display-expression", "aria-label": "\u8A08\u7B97\u5F0F", children: expression })), _jsx("div", { className: "display-value", role: "status", "aria-label": "\u8A08\u7B97\u7D50\u679C", children: value })] }));
}
export default Display;

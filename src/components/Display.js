import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './Display.css';
function Display(_a) {
    var value = _a.value, expression = _a.expression;
    return (_jsxs("div", { className: "display-container", children: [expression && (_jsx("div", { className: "display-expression", children: expression })), _jsx("div", { className: "display-value", children: value })] }));
}
export default Display;

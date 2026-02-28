import { jsx as _jsx } from "react/jsx-runtime";
import './ButtonGrid.css';
function ButtonGrid(_a) {
    var onButtonClick = _a.onButtonClick;
    var buttons = [
        ['MC', 'MR', 'M-', 'M+'],
        ['C', 'AC', '', '/'],
        ['7', '8', '9', '*'],
        ['4', '5', '6', '-'],
        ['1', '2', '3', '+'],
        ['0', '00', '.', '='],
    ];
    var getButtonClass = function (value) {
        if (!value)
            return 'button-empty';
        if (value === '=')
            return 'button button-equals';
        if (['+', '-', '*', '/'].includes(value))
            return 'button button-operator';
        if (['C', 'AC'].includes(value))
            return 'button button-clear';
        if (['M+', 'M-', 'MR', 'MC'].includes(value))
            return 'button button-memory';
        return 'button button-number';
    };
    return (_jsx("div", { className: "button-grid", children: buttons.map(function (row, rowIndex) { return (_jsx("div", { className: "button-row", children: row.map(function (value, colIndex) { return (value ? (_jsx("button", { className: getButtonClass(value), onClick: function () { return onButtonClick(value); }, "aria-label": value, children: value }, "".concat(rowIndex, "-").concat(colIndex))) : (_jsx("div", { className: "button-empty" }, "".concat(rowIndex, "-").concat(colIndex)))); }) }, rowIndex)); }) }));
}
export default ButtonGrid;

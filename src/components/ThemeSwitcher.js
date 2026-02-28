import { jsx as _jsx } from "react/jsx-runtime";
import './ThemeSwitcher.css';
function ThemeSwitcher(_a) {
    var theme = _a.theme, onThemeChange = _a.onThemeChange;
    var options = [
        { value: 'system', label: '🖥 システム' },
        { value: 'light', label: '☀️ ライト' },
        { value: 'dark', label: '🌙 ダーク' },
    ];
    return (_jsx("div", { className: "theme-switcher", role: "group", "aria-label": "\u30C6\u30FC\u30DE\u5207\u308A\u66FF\u3048", children: options.map(function (_a) {
            var value = _a.value, label = _a.label;
            return (_jsx("button", { className: "theme-button".concat(theme === value ? ' active' : ''), onClick: function () { return onThemeChange(value); }, "aria-pressed": theme === value, children: label }, value));
        }) }));
}
export default ThemeSwitcher;

import './ThemeSwitcher.css';
export type Theme = 'system' | 'light' | 'dark';
interface ThemeSwitcherProps {
    theme: Theme;
    onThemeChange: (theme: Theme) => void;
}
declare function ThemeSwitcher({ theme, onThemeChange }: ThemeSwitcherProps): import("react/jsx-runtime").JSX.Element;
export default ThemeSwitcher;

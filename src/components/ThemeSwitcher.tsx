import './ThemeSwitcher.css'

export type Theme = 'system' | 'light' | 'dark'

interface ThemeSwitcherProps {
  theme: Theme
  onThemeChange: (theme: Theme) => void
}

function ThemeSwitcher({ theme, onThemeChange }: ThemeSwitcherProps) {
  const options: { value: Theme; label: string }[] = [
    { value: 'system', label: '🖥 システム' },
    { value: 'light', label: '☀️ ライト' },
    { value: 'dark', label: '🌙 ダーク' },
  ]

  return (
    <div className="theme-switcher" role="group" aria-label="テーマ切り替え">
      {options.map(({ value, label }) => (
        <button
          key={value}
          className={`theme-button${theme === value ? ' active' : ''}`}
          onClick={() => onThemeChange(value)}
          aria-pressed={theme === value}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

export default ThemeSwitcher

import './ButtonGrid.css'

interface ButtonGridProps {
  onButtonClick: (value: string) => void
}

function ButtonGrid({ onButtonClick }: ButtonGridProps) {
  const buttons = [
    ['C', 'AC', 'M+', 'M-'],
    ['7', '8', '9', '/'],
    ['4', '5', '6', '*'],
    ['1', '2', '3', '-'],
    ['0', '.', '=', '+'],
    ['MR', 'MC', '', ''],
  ]

  const getButtonClass = (value: string): string => {
    if (!value) return 'button-empty'
    if (value === '=') return 'button button-equals'
    if (['+', '-', '*', '/'].includes(value)) return 'button button-operator'
    if (['C', 'AC'].includes(value)) return 'button button-clear'
    if (['M+', 'M-', 'MR', 'MC'].includes(value)) return 'button button-memory'
    return 'button button-number'
  }

  return (
    <div className="button-grid">
      {buttons.map((row, rowIndex) => (
        <div key={rowIndex} className="button-row">
          {row.map((value, colIndex) => (
            value ? (
              <button
                key={`${rowIndex}-${colIndex}`}
                className={getButtonClass(value)}
                onClick={() => onButtonClick(value)}
                aria-label={value}
              >
                {value}
              </button>
            ) : (
              <div key={`${rowIndex}-${colIndex}`} className="button-empty" />
            )
          ))}
        </div>
      ))}
    </div>
  )
}

export default ButtonGrid

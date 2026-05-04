import './Display.css'

interface DisplayProps {
  value: string
  expression?: string
}

function Display({ value, expression }: DisplayProps) {
  return (
    <div className="display-container">
      {expression && (
        <div className="display-expression" aria-label="計算式">{expression}</div>
      )}
      <div className="display-value" role="status" aria-label="計算結果">
        {value}
      </div>
    </div>
  )
}

export default Display

import './Display.css'

interface DisplayProps {
  value: string
  expression?: string
}

function Display({ value, expression }: DisplayProps) {
  return (
    <div className="display-container">
      {expression && (
        <div className="display-expression">{expression}</div>
      )}
      <div className="display-value">{value}</div>
    </div>
  )
}

export default Display

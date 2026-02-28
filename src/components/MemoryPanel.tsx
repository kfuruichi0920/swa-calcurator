import './MemoryPanel.css'

interface MemoryPanelProps {
  values: number[]
  currentSlot: number
  onSlotChange: (slot: number) => void
}

function MemoryPanel({ values, currentSlot, onSlotChange }: MemoryPanelProps) {
  return (
    <div className="memory-panel">
      <h3 className="panel-title">メモリスロット</h3>
      <div className="memory-slots">
        {values.map((value, index) => (
          <button
            key={index}
            className={`memory-slot ${index === currentSlot ? 'active' : ''}`}
            onClick={() => onSlotChange(index)}
            aria-label={`メモリスロット ${index + 1}`}
          >
            <span className="slot-label">M{index + 1}</span>
            <span className="slot-value">{value}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default MemoryPanel

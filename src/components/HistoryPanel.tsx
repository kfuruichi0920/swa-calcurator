import { HistoryEntry } from '../core/HistoryManager'
import './HistoryPanel.css'

interface HistoryPanelProps {
  entries: HistoryEntry[]
  onEntryClick: (value: number) => void
  onEntryDelete: (id: string) => void
  onClear: () => void
  onExport: (format: 'json' | 'text') => void
  onCopy: () => void
}

function HistoryPanel({
  entries,
  onEntryClick,
  onEntryDelete,
  onClear,
  onExport,
  onCopy,
}: HistoryPanelProps) {
  return (
    <div className="history-panel">
      <div className="panel-header">
        <h3 className="panel-title">計算履歴 ({entries.length}/1000)</h3>
        <div className="panel-actions">
          <button
            className="action-button"
            onClick={onCopy}
            title="クリップボードにコピー"
            aria-label="履歴をコピー"
          >
            📋
          </button>
          <button
            className="action-button"
            onClick={() => onExport('text')}
            title="テキストでダウンロード"
            aria-label="テキストで履歴をダウンロード"
          >
            📄
          </button>
          <button
            className="action-button"
            onClick={() => onExport('json')}
            title="JSONでダウンロード"
            aria-label="JSONで履歴をダウンロード"
          >
            💾
          </button>
          <button
            className="action-button danger"
            onClick={onClear}
            title="履歴をクリア"
            aria-label="履歴をすべてクリア"
          >
            🗑️
          </button>
        </div>
      </div>
      
      <div className="history-list">
        {entries.length === 0 ? (
          <div className="history-empty">計算履歴はありません</div>
        ) : (
          entries.map((entry) => (
              <div key={entry.id} className="history-entry">
              <button
                type="button"
                className="history-content"
                onClick={() => onEntryClick(entry.result)}
                aria-label={`計算結果 ${entry.expression} = ${entry.result} を追加`}
              >
                <div className="history-expression">{entry.expression}</div>
                <div className="history-result">= {entry.result}</div>
              </button>
              <button
                className="history-delete"
                onClick={() => onEntryDelete(entry.id)}
                aria-label="この履歴を削除"
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default HistoryPanel

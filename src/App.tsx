import { useState, useEffect, useCallback } from 'react'
import { Calculator } from './core/Calculator'
import { MemoryManager } from './core/MemoryManager'
import { HistoryManager } from './core/HistoryManager'
import ThemeSwitcher, { type Theme } from './components/ThemeSwitcher'
import Display from './components/Display'
import ButtonGrid from './components/ButtonGrid'
import MemoryPanel from './components/MemoryPanel'
import HistoryPanel from './components/HistoryPanel'
import './App.css'

function App() {
  const [calculator] = useState(() => new Calculator())
  const [memory] = useState(() => new MemoryManager())
  const [history] = useState(() => new HistoryManager())
  
  const [display, setDisplay] = useState('0')
  const [expression, setExpression] = useState('')
  const [memoryValues, setMemoryValues] = useState<number[]>([])
  const [currentMemorySlot, setCurrentMemorySlot] = useState(0)
  const [historyEntries, setHistoryEntries] = useState(history.getAll())
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const stored = localStorage.getItem('theme')
      if (stored === 'system' || stored === 'light' || stored === 'dark') {
        return stored
      }
      if (stored !== null) {
        localStorage.removeItem('theme')
      }
    } catch (error) {
      // localStorage access failed (e.g., private browsing mode), silently continue
    }
    return 'system'
  })

  // メモリ値を更新
  const updateMemoryDisplay = useCallback(() => {
    setMemoryValues(memory.getAllValues())
    setCurrentMemorySlot(memory.getCurrentSlot())
  }, [memory])

  // 履歴を更新
  const updateHistoryDisplay = useCallback(() => {
    setHistoryEntries(history.getAll())
  }, [history])

  // マウント時にメモリ表示を初期化
  useEffect(() => {
    updateMemoryDisplay()
  }, [updateMemoryDisplay])

  // テーマの管理
  useEffect(() => {
    if (theme === 'system') {
      document.documentElement.removeAttribute('data-theme')
    } else {
      document.documentElement.setAttribute('data-theme', theme)
    }
    try {
      localStorage.setItem('theme', theme)
    } catch (error) {
      // localStorage access failed (e.g., private browsing mode), silently continue without persistence
    }
  }, [theme])

  // ボタンクリックハンドラ
  const handleButtonClick = useCallback((value: string) => {
    if (value === '=') {
      const result = calculator.equals()
      setDisplay(result)
      
      // 履歴に追加（エラー時はスキップ）
      if (expression && result !== 'Error') {
        history.add(`${expression}${result}`, parseFloat(result))
        updateHistoryDisplay()
        setExpression('')
      } else if (result === 'Error') {
        setExpression('')
      }
    } else if (value === 'C') {
      calculator.clear()
      setDisplay(calculator.getDisplay())
    } else if (value === 'AC') {
      calculator.allClear()
      setDisplay(calculator.getDisplay())
      setExpression('')
    } else if (value === 'M+') {
      // display がエラーでない場合のみメモリに追加
      if (display !== 'Error') {
        memory.add(parseFloat(display))
        updateMemoryDisplay()
      }
    } else if (value === 'M-') {
      // display がエラーでない場合のみメモリから減算
      if (display !== 'Error') {
        memory.subtract(parseFloat(display))
        updateMemoryDisplay()
      }
    } else if (value === 'MR') {
      const value = memory.recall()
      calculator.input(value.toString())
      setDisplay(calculator.getDisplay())
    } else if (value === 'MC') {
      memory.clear()
      updateMemoryDisplay()
    } else if (/^\d+$/.test(value) && value.length > 1) {
      for (const digit of value) {
        calculator.input(digit)
      }
      setDisplay(calculator.getDisplay())
    } else if (['+', '-', '*', '/'].includes(value)) {
      setExpression(display + ' ' + value + ' ')
      calculator.input(value)
      setDisplay(calculator.getDisplay())
    } else {
      calculator.input(value)
      setDisplay(calculator.getDisplay())
    }
  }, [calculator, memory, history, display, expression, updateMemoryDisplay, updateHistoryDisplay])

  // キーボード操作
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault()
      
      if (e.key >= '0' && e.key <= '9') {
        handleButtonClick(e.key)
      } else if (e.key === '.') {
        handleButtonClick('.')
      } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        handleButtonClick(e.key)
      } else if (e.key === 'Enter' || e.key === '=') {
        handleButtonClick('=')
      } else if (e.key === 'Escape') {
        handleButtonClick('C')
      } else if (e.key === 'Backspace') {
        handleButtonClick('C')
      } else if (e.ctrlKey && e.shiftKey && e.key === 'Delete') {
        handleButtonClick('AC')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleButtonClick])

  // メモリスロット切り替え
  const handleMemorySlotChange = useCallback((slotIndex: number) => {
    memory.selectSlot(slotIndex)
    updateMemoryDisplay()
  }, [memory, updateMemoryDisplay])

  // 履歴クリック
  const handleHistoryClick = useCallback((value: number) => {
    calculator.input(value.toString())
    setDisplay(calculator.getDisplay())
  }, [calculator])

  // 履歴削除
  const handleHistoryDelete = useCallback((id: string) => {
    history.deleteById(id)
    updateHistoryDisplay()
  }, [history, updateHistoryDisplay])

  // 履歴全クリア
  const handleHistoryClear = useCallback(() => {
    history.clear()
    updateHistoryDisplay()
  }, [history, updateHistoryDisplay])

  // 履歴エクスポート
  const handleHistoryExport = useCallback((format: 'json' | 'text') => {
    let content: string
    let filename: string
    
    if (format === 'json') {
      content = history.exportToJSON()
      filename = 'calculator-history.json'
    } else {
      content = history.exportToText()
      filename = 'calculator-history.txt'
    }
    
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }, [history])

  // 履歴をクリップボードコピー
  const handleHistoryCopy = useCallback(() => {
    const text = history.exportToText()
    navigator.clipboard.writeText(text)
  }, [history])

  return (
    <div className="app">
      <header className="app-header">
        <h1>SWA Calculator</h1>
        <ThemeSwitcher theme={theme} onThemeChange={setTheme} />
        <blockquote className="quote">
          <p>"We can only see a short distance ahead, but we can see plenty there that needs to be done."</p>
          <footer>— Alan Turing（計算機科学の父）</footer>
        </blockquote>
        <p className="subtitle">Azure Static Web Apps 電卓アプリケーション</p>
      </header>
      
      <div className="calculator-container">
        <div className="main-calculator">
          <Display value={display} expression={expression} />
          <ButtonGrid onButtonClick={handleButtonClick} />
        </div>
        
        <div className="side-panels">
          <MemoryPanel
            values={memoryValues}
            currentSlot={currentMemorySlot}
            onSlotChange={handleMemorySlotChange}
          />
          
          <HistoryPanel
            entries={historyEntries}
            onEntryClick={handleHistoryClick}
            onEntryDelete={handleHistoryDelete}
            onClear={handleHistoryClear}
            onExport={handleHistoryExport}
            onCopy={handleHistoryCopy}
          />
        </div>
      </div>
      
      <footer className="app-footer">
        <p>
          キーボード操作: 数字(0-9), 演算子(+,-,*,/), Enter(=), Esc(C), Ctrl+Shift+Del(AC)
        </p>
      </footer>
    </div>
  )
}

export default App

import { describe, it, expect, beforeEach } from 'vitest'
import { HistoryManager, HistoryEntry } from './HistoryManager'

describe('HistoryManager - 計算履歴機能', () => {
  let history: HistoryManager

  beforeEach(() => {
    history = new HistoryManager()
  })

  describe('初期状態', () => {
    it('履歴は空である', () => {
      expect(history.getCount()).toBe(0)
      expect(history.getAll()).toEqual([])
    })
  })

  describe('履歴の追加', () => {
    it('計算履歴を追加できる', () => {
      history.add('1 + 2', 3)
      expect(history.getCount()).toBe(1)
    })

    it('複数の履歴を追加できる', () => {
      history.add('1 + 2', 3)
      history.add('5 - 3', 2)
      history.add('4 * 5', 20)
      expect(history.getCount()).toBe(3)
    })

    it('追加された履歴は正しい形式で保存される', () => {
      history.add('123 + 456', 579)
      const entries = history.getAll()
      expect(entries).toHaveLength(1)
      expect(entries[0].expression).toBe('123 + 456')
      expect(entries[0].result).toBe(579)
      expect(entries[0].id).toBeDefined()
      expect(entries[0].timestamp).toBeInstanceOf(Date)
    })

    it('新しい履歴が先頭に追加される', () => {
      history.add('1 + 1', 2)
      history.add('2 + 2', 4)
      history.add('3 + 3', 6)
      
      const entries = history.getAll()
      expect(entries[0].expression).toBe('3 + 3')
      expect(entries[1].expression).toBe('2 + 2')
      expect(entries[2].expression).toBe('1 + 1')
    })
  })

  describe('履歴の上限', () => {
    it('1000件まで保存できる', () => {
      for (let i = 0; i < 1000; i++) {
        history.add(`${i} + ${i}`, i * 2)
      }
      expect(history.getCount()).toBe(1000)
    })

    it('1001件目は最古の履歴を削除して追加される', () => {
      for (let i = 0; i < 1001; i++) {
        history.add(`${i} + ${i}`, i * 2)
      }
      expect(history.getCount()).toBe(1000)
      
      const entries = history.getAll()
      // 最新は 1000 + 1000
      expect(entries[0].expression).toBe('1000 + 1000')
      // 最古は 1 + 1（0 + 0が削除された）
      expect(entries[999].expression).toBe('1 + 1')
    })
  })

  describe('履歴の取得', () => {
    it('IDで特定の履歴を取得できる', () => {
      history.add('100 + 200', 300)
      const entries = history.getAll()
      const id = entries[0].id
      
      const entry = history.getById(id)
      expect(entry).toBeDefined()
      expect(entry?.expression).toBe('100 + 200')
      expect(entry?.result).toBe(300)
    })

    it('存在しないIDはundefinedを返す', () => {
      const entry = history.getById('nonexistent-id')
      expect(entry).toBeUndefined()
    })
  })

  describe('履歴の削除', () => {
    it('特定の履歴を削除できる', () => {
      history.add('1 + 1', 2)
      history.add('2 + 2', 4)
      history.add('3 + 3', 6)
      
      const entries = history.getAll()
      const idToDelete = entries[1].id
      
      history.deleteById(idToDelete)
      
      expect(history.getCount()).toBe(2)
      expect(history.getById(idToDelete)).toBeUndefined()
    })

    it('存在しないIDの削除は何もしない', () => {
      history.add('1 + 1', 2)
      const beforeCount = history.getCount()
      
      history.deleteById('nonexistent-id')
      
      expect(history.getCount()).toBe(beforeCount)
    })
  })

  describe('履歴の全削除', () => {
    it('すべての履歴をクリアできる', () => {
      history.add('1 + 1', 2)
      history.add('2 + 2', 4)
      history.add('3 + 3', 6)
      
      history.clear()
      
      expect(history.getCount()).toBe(0)
      expect(history.getAll()).toEqual([])
    })
  })

  describe('エクスポート機能', () => {
    it('JSON形式でエクスポートできる', () => {
      history.add('1 + 2', 3)
      history.add('5 * 6', 30)
      
      const json = history.exportToJSON()
      const parsed = JSON.parse(json)
      
      expect(parsed).toHaveLength(2)
      expect(parsed[0].expression).toBe('5 * 6')
      expect(parsed[0].result).toBe(30)
    })

    it('テキスト形式でエクスポートできる', () => {
      history.add('1 + 2', 3)
      history.add('5 - 3', 2)
      
      const text = history.exportToText()
      
      expect(text).toContain('5 - 3 = 2')
      expect(text).toContain('1 + 2 = 3')
    })
  })

  describe('インポート機能', () => {
    it('JSON形式でインポートできる', () => {
      const data: HistoryEntry[] = [
        {
          id: 'test-1',
          expression: '10 + 20',
          result: 30,
          timestamp: new Date(),
        },
        {
          id: 'test-2',
          expression: '50 * 2',
          result: 100,
          timestamp: new Date(),
        },
      ]
      
      history.importFromJSON(JSON.stringify(data))
      
      expect(history.getCount()).toBe(2)
      const entries = history.getAll()
      expect(entries[0].expression).toBe('10 + 20')
      expect(entries[1].expression).toBe('50 * 2')
    })

    it('不正なJSONはエラーをスローする', () => {
      expect(() => {
        history.importFromJSON('invalid json')
      }).toThrow()
    })

    it('1000件を超える履歴をインポートしても最新1000件に制限される', () => {
      const data: HistoryEntry[] = Array.from({ length: 1001 }, (_, index) => ({
        id: `test-${index}`,
        expression: `${index} + ${index}`,
        result: index * 2,
        timestamp: new Date(`2024-01-01T00:00:${String(index % 60).padStart(2, '0')}.000Z`),
      }))

      history.importFromJSON(JSON.stringify(data))

      const entries = history.getAll()
      expect(entries).toHaveLength(1000)
      expect(entries[0].id).toBe('test-1')
      expect(entries[999].id).toBe('test-1000')
    })

    it('不正な履歴データはエラーをスローする', () => {
      const invalidData = [
        {
          id: 'test-1',
          expression: '1 + 2',
          result: '3',
          timestamp: new Date(),
        },
      ]

      expect(() => {
        history.importFromJSON(JSON.stringify(invalidData))
      }).toThrow('Invalid JSON format')
    })
  })
})

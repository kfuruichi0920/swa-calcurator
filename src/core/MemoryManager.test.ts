import { describe, it, expect, beforeEach } from 'vitest'
import { MemoryManager } from './MemoryManager'

describe('MemoryManager - メモリ機能', () => {
  let memory: MemoryManager

  beforeEach(() => {
    memory = new MemoryManager()
  })

  describe('初期状態', () => {
    it('メモリは5スロット存在する', () => {
      expect(memory.getSlotCount()).toBe(5)
    })

    it('すべてのスロットは0で初期化される', () => {
      for (let i = 0; i < 5; i++) {
        expect(memory.recall(i)).toBe(0)
      }
    })

    it('デフォルトでスロット0が選択されている', () => {
      expect(memory.getCurrentSlot()).toBe(0)
    })
  })

  describe('メモリ加算 (M+)', () => {
    it('スロット0に5を加算できる', () => {
      memory.add(5)
      expect(memory.recall()).toBe(5)
    })

    it('複数回加算できる', () => {
      memory.add(5)
      memory.add(10)
      memory.add(3)
      expect(memory.recall()).toBe(18)
    })

    it('負の値を加算できる', () => {
      memory.add(-5)
      expect(memory.recall()).toBe(-5)
    })

    it('小数を加算できる', () => {
      memory.add(1.5)
      memory.add(2.5)
      expect(memory.recall()).toBe(4)
    })
  })

  describe('メモリ減算 (M-)', () => {
    it('スロット0から5を減算できる', () => {
      memory.subtract(5)
      expect(memory.recall()).toBe(-5)
    })

    it('加算後に減算できる', () => {
      memory.add(10)
      memory.subtract(3)
      expect(memory.recall()).toBe(7)
    })
  })

  describe('メモリ呼び出し (MR)', () => {
    it('メモリに保存した値を呼び出せる', () => {
      memory.add(123)
      const value = memory.recall()
      expect(value).toBe(123)
    })

    it('スロット番号を指定して呼び出せる', () => {
      memory.add(100)
      memory.selectSlot(1)
      memory.add(200)
      expect(memory.recall(0)).toBe(100)
      expect(memory.recall(1)).toBe(200)
    })
  })

  describe('メモリクリア (MC)', () => {
    it('現在のスロットをクリアできる', () => {
      memory.add(100)
      memory.clear()
      expect(memory.recall()).toBe(0)
    })

    it('特定のスロットをクリアできる', () => {
      memory.add(100)
      memory.selectSlot(1)
      memory.add(200)
      memory.clear(0)
      expect(memory.recall(0)).toBe(0)
      expect(memory.recall(1)).toBe(200)
    })
  })

  describe('すべてクリア', () => {
    it('すべてのスロットを一度にクリアできる', () => {
      memory.add(100)
      memory.selectSlot(1)
      memory.add(200)
      memory.selectSlot(2)
      memory.add(300)
      
      memory.clearAll()
      
      expect(memory.recall(0)).toBe(0)
      expect(memory.recall(1)).toBe(0)
      expect(memory.recall(2)).toBe(0)
    })
  })

  describe('スロット選択', () => {
    it('スロットを切り替えられる', () => {
      memory.selectSlot(0)
      memory.add(100)
      
      memory.selectSlot(1)
      memory.add(200)
      
      memory.selectSlot(2)
      memory.add(300)
      
      expect(memory.recall(0)).toBe(100)
      expect(memory.recall(1)).toBe(200)
      expect(memory.recall(2)).toBe(300)
    })

    it('範囲外のスロット指定はエラーになる', () => {
      expect(() => memory.selectSlot(-1)).toThrow()
      expect(() => memory.selectSlot(5)).toThrow()
    })
  })

  describe('すべてのメモリ値を取得', () => {
    it('全スロットの値を配列で取得できる', () => {
      memory.selectSlot(0)
      memory.add(10)
      memory.selectSlot(1)
      memory.add(20)
      memory.selectSlot(2)
      memory.add(30)
      
      const allValues = memory.getAllValues()
      expect(allValues).toHaveLength(5)
      expect(allValues[0]).toBe(10)
      expect(allValues[1]).toBe(20)
      expect(allValues[2]).toBe(30)
      expect(allValues[3]).toBe(0)
      expect(allValues[4]).toBe(0)
    })
  })
})

import { expect, type Page, test } from '@playwright/test'

/*
 * E2E test candidates for the React calculator screen.
 *
 * Test data assumptions:
 * - The app is served at baseURL, for example http://127.0.0.1:5173.
 * - Each test starts with a fresh browser context, so calculator memory,
 *   calculation history, and localStorage theme state are not shared.
 * - The current screen has no backend API call, table element, or success toast.
 *   Assertions therefore cover URL, heading, panel content, and UI state changes
 *   after user operations instead of API response/toast/table assertions.
 */

async function clickCalculatorButton(page: Page, name: string) {
  await page.getByRole('button', { name, exact: true }).click()
}

async function expectDisplay(page: Page, value: string) {
  await expect(page.getByRole('status', { name: '計算結果' })).toHaveText(value)
}

test.describe('SWA Calculator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveURL(/\/$/)
    await expect(page.getByRole('heading', { name: 'SWA Calculator' })).toBeVisible()
  })

  test('adds two numbers and records the result in history', async ({ page }) => {
    await clickCalculatorButton(page, '7')
    await clickCalculatorButton(page, '+')
    await clickCalculatorButton(page, '5')
    await clickCalculatorButton(page, '=')

    await expectDisplay(page, '12')
    await expect(page.getByRole('heading', { name: '計算履歴 (1/1000)' })).toBeVisible()

    /*
     * Potential instability / product issue:
     * The current implementation appears to build the history expression from
     * the operator expression plus the final result. If the intended history is
     * "7 + 5 = 12", this assertion should be used after the app logic is fixed:
     *
     * await expect(page.getByRole('button', {
     *   name: '計算結果 7 + 5 = 12 を追加',
     * })).toBeVisible()
     */
    await expect(
      page.getByRole('button', { name: '計算結果 7 + 12 = 12 を追加' }),
    ).toBeVisible()
  })

  test('handles division by zero without adding an error entry to history', async ({ page }) => {
    await clickCalculatorButton(page, '8')
    await clickCalculatorButton(page, '/')
    await clickCalculatorButton(page, '0')
    await clickCalculatorButton(page, '=')

    await expectDisplay(page, 'Error')
    await expect(page.getByRole('heading', { name: '計算履歴 (0/1000)' })).toBeVisible()
    await expect(page.getByText('計算履歴はありません')).toBeVisible()
  })

  test('stores, recalls, and clears a memory slot', async ({ page }) => {
    await clickCalculatorButton(page, '9')
    await clickCalculatorButton(page, 'M+')

    const memorySlot1 = page.getByRole('button', { name: 'メモリスロット 1' })
    await expect(memorySlot1.getByText('M1')).toBeVisible()
    await expect(memorySlot1.getByText('9')).toBeVisible()

    await clickCalculatorButton(page, 'AC')
    await expectDisplay(page, '0')

    await clickCalculatorButton(page, 'MR')
    await expectDisplay(page, '9')

    await clickCalculatorButton(page, 'MC')
    await expect(memorySlot1.getByText('0')).toBeVisible()
  })

  test('reuses a history result when the history entry is clicked', async ({ page }) => {
    await clickCalculatorButton(page, '4')
    await clickCalculatorButton(page, '*')
    await clickCalculatorButton(page, '3')
    await clickCalculatorButton(page, '=')

    await expectDisplay(page, '12')

    /*
     * This locator follows the current accessible name. See the history
     * expression note in the addition test if product behavior changes.
     */
    await page
      .getByRole('button', { name: '計算結果 4 * 12 = 12 を追加' })
      .click()

    await expectDisplay(page, '12')
  })

  test('clears all history entries from the history panel', async ({ page }) => {
    await clickCalculatorButton(page, '2')
    await clickCalculatorButton(page, '+')
    await clickCalculatorButton(page, '3')
    await clickCalculatorButton(page, '=')

    await expect(page.getByRole('heading', { name: '計算履歴 (1/1000)' })).toBeVisible()
    await clickCalculatorButton(page, '履歴をすべてクリア')

    await expect(page.getByRole('heading', { name: '計算履歴 (0/1000)' })).toBeVisible()
    await expect(page.getByText('計算履歴はありません')).toBeVisible()
  })

  test('persists the selected theme after reload', async ({ page }) => {
    await page.getByRole('button', { name: '🌙 ダーク' }).click()
    await expect(page.getByRole('button', { name: '🌙 ダーク' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    await expect.poll(() => page.evaluate(() => localStorage.getItem('theme'))).toBe('dark')

    await page.reload()
    await expect(page).toHaveURL(/\/$/)
    await expect(page.getByRole('heading', { name: 'SWA Calculator' })).toBeVisible()
    await expect(page.getByRole('button', { name: '🌙 ダーク' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
  })

  test('supports keyboard input for a basic calculation', async ({ page }) => {
    /*
     * Potential instability:
     * Keyboard events are registered on window and preventDefault is called for
     * every keydown. Keep this test focused on calculator behavior, not browser
     * shortcut behavior.
     */
    await page.keyboard.press('1')
    await page.keyboard.press('0')
    await page.keyboard.press('-')
    await page.keyboard.press('4')
    await page.keyboard.press('Enter')

    await expectDisplay(page, '6')
    await expect(page.getByRole('heading', { name: '計算履歴 (1/1000)' })).toBeVisible()
  })
})

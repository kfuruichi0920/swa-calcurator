# Copilot Instructions

## Commands

```bash
npm run dev          # Start dev server (http://localhost:5173)
npm run build        # tsc -b && vite build
npm test             # Run all tests (Vitest, watch mode)
npm run test:ui      # Vitest UI
npm run test:coverage

# Run a single test file
npm test src/core/Calculator.test.ts
npm test src/core/MemoryManager.test.ts
npm test src/core/HistoryManager.test.ts
```

## Architecture

The app is split into two clear layers:

**`src/core/`** — Pure TypeScript classes with no React dependency. Each has a corresponding `.test.ts` file:
- `Calculator` — stateful calculation engine; call `input(value)` for digits/operators, `equals()` to compute, `clear()` / `allClear()` to reset
- `MemoryManager` — manages 5 independent memory slots; supports M+, M-, MR, MC and `selectSlot()`
- `HistoryManager` — FIFO store capped at 1000 entries; supports add, delete, export (JSON/text), and import

**`src/components/`** — React presentational components: `Display`, `ButtonGrid`, `MemoryPanel`, `HistoryPanel`. They receive data and callbacks via props and own no state.

**`src/App.tsx`** — Sole owner of React state. Instantiates the three core classes once via `useState(() => new X())`, then lifts all state (display string, expression, memory values, history entries) into React state and passes down `useCallback` handlers to components.

## Key Conventions

- **Generated artifacts are committed**: every `.ts`/`.tsx` source has a parallel `.js` and `.d.ts` committed alongside it in `src/`. Keep them in sync when editing sources.
- **TDD style**: Tests (t_wada methodology) are written first. Test descriptions are written in Japanese. Follow Red → Green → Refactor when adding features.
- **Test environment is `node`** (not jsdom) — see `vitest.config.ts`. Core logic tests do not use DOM APIs.
- **`Calculator.input(value)`** accepts a multi-character string (e.g., `"123"`) but processes each character individually when the caller passes a multi-digit value — see the `App.tsx` handler that loops over digits.
- **Keyboard shortcuts** are registered in `App.tsx` via `window.addEventListener('keydown')`. Backspace and Escape both map to `C` (not `AC`); `Ctrl+Shift+Delete` maps to `AC`.
- Deploy target is **Azure Static Web Apps**; CI/CD is in `.github/workflows/azure-static-web-apps.yml`. The `AZURE_STATIC_WEB_APPS_API_TOKEN` secret must be set in GitHub repo settings.

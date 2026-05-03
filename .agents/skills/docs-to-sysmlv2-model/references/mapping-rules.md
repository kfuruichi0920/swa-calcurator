# Docs to SysMLv2 Mapping Rules

## 1. Requirement Mapping

- Use `requirement def` for reusable requirement categories.
- Use `requirement <Name> :> <Parent>` for concrete requirements.
- Preserve source statements in `doc` comments.
- Keep measurable constraints as attributes when possible.

Examples:
- "履歴の上限: 1000件" -> `attribute maxHistoryCount : Integer = 1000;`
- "初回ロード時間: 3秒以内" -> `attribute initialLoadTime : String = "3秒以内";`

## 2. Design Mapping

- Convert architecture components to `part def`.
- Convert system composition to `part` declarations inside a top-level system `part def`.
- Add a `doc` comment that captures responsibility and source.

Examples:
- `Calculator.ts` -> `part def CalculatorCore`
- `MemoryManager.ts` -> `part def MemoryManager`

## 3. Traceability Rule

- Keep a source marker for each generated requirement.
- Minimum traceability format:
  - Include source section title in `doc` comment.
  - Include file path in the model header comment.

## 4. Naming Rule

- Prefer ASCII identifiers for model element names.
- If heading text is non-ASCII only, use fallback names like `Req001`, `Req002`.
- Avoid spaces and symbols in identifiers.

## 5. Validation Checklist

- No empty requirement blocks.
- No duplicate requirement identifiers.
- At least one top-level package.
- At least one design `part def` if design input is provided.

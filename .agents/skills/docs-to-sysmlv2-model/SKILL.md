---
name: docs-to-sysmlv2-model
description: Convert requirements specifications and design documents into SysML v2 modeling artifacts with traceability. Use when Codex is asked to read markdown/text specs, architecture/design docs, or source-structure descriptions and produce `.sysml` outputs such as requirement models, part definitions, and requirement-to-design links.
---

# Docs To SysMLv2 Model

## Overview

要求仕様書と設計情報を読み取り、SysML v2 のモデル（`requirement` / `part def` / トレーサビリティ情報）へ変換する。  
入力文書が日本語でも英語でも、原文を `doc` コメントに残しつつモデル化する。

## Workflow

1. 入力文書を特定する。
- 必須: 要求仕様書（例: `doc/requirements-specification.md`）
- 任意: 設計書（例: `doc/*design*.md`, `README.md` のアーキテクチャ節, `src/` 構成）

2. 要求を抽出する。
- 見出しと箇条書きから機能要求・非機能要求・制約・受入基準を抽出する。
- 抽出時に出典を保持する（章番号、見出し、原文）。

3. 設計情報を抽出する。
- コンポーネント、モジュール、層構造、責務を `part def` 候補として抽出する。
- 要求を満たす設計要素を対応付ける。

4. SysML v2 モデルへ変換する。
- 要求は `requirement`（必要なら `requirement def`）で定義する。
- 設計は `part def` / `part` で定義する。
- 出典トレースを `doc` コメントまたは属性で明示する。

5. 生成結果を検証する。
- モデル内で重複ID、空要件、孤立した設計要素がないか確認する。
- 文書にある定量条件（例: 1000件、3秒以内）が属性として残っているか確認する。

## Quick Execution

最速で雛形を作るときは、次を実行する。

```powershell
python skills/docs-to-sysmlv2-model/scripts/generate_sysmlv2_model.py `
  --requirements doc/requirements-specification.md `
  --design README.md `
  --output models/generated-sysmlv2-model.sysml `
  --package-name SWACalculatorModel
```

生成後に必ずレビューし、必要なら `references/mapping-rules.md` に沿って手修正する。

## Modeling Rules

詳細ルールは [mapping-rules.md](references/mapping-rules.md) を参照する。特に次を守る。

- 要求文を削らず、`doc` コメントに原文を残す。
- 見出し構造を要件階層へ反映する。
- 設計要素には責務を短く記述する。
- 要求と設計の対応（どの設計がどの要求を担うか）をモデル内コメントで追跡可能にする。

## Resources

- `scripts/generate_sysmlv2_model.py`
  - Markdownの要求仕様書と設計情報から、SysML v2 の初期モデルを自動生成する。
- `references/mapping-rules.md`
  - 要求/設計記述を SysML v2 要素へ対応づけるルール集。

## Output Convention

- 出力先は原則 `models/*.sysml` とする。
- ファイル先頭に入力ソースと生成日をコメントで記録する。
- 要求モデル中心の場合でも、最低1つは `part def` を含めて設計接続点を作る。

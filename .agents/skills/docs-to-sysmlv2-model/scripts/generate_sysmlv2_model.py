#!/usr/bin/env python3
"""Generate a SysML v2 starter model from markdown requirements/design docs."""

from __future__ import annotations

import argparse
import datetime as dt
import pathlib
import re
from typing import List, Tuple


def read_text(path: pathlib.Path) -> str:
    return path.read_text(encoding="utf-8")


def sanitize_identifier(text: str, fallback: str) -> str:
    cleaned = re.sub(r"[^A-Za-z0-9_]+", "_", text).strip("_")
    if not cleaned:
        return fallback
    if re.match(r"^[0-9]", cleaned):
        cleaned = f"R_{cleaned}"
    return cleaned[:80]


def ensure_unique_identifier(base: str, used: set[str]) -> str:
    if base not in used:
        used.add(base)
        return base
    i = 2
    while True:
        candidate = f"{base}_{i}"
        if candidate not in used:
            used.add(candidate)
            return candidate
        i += 1


def extract_heading_and_bullets(text: str) -> List[Tuple[str, List[str]]]:
    sections: List[Tuple[str, List[str]]] = []
    current_heading = "General"
    current_items: List[str] = []

    def flush() -> None:
        nonlocal current_items
        if current_items:
            sections.append((current_heading, current_items))
            current_items = []

    for raw_line in text.splitlines():
        line = raw_line.strip()
        heading_match = re.match(r"^(#{1,6})\s+(.+?)\s*$", line)
        if heading_match:
            flush()
            current_heading = heading_match.group(2)
            continue

        bullet_match = re.match(r"^[-*]\s+(.+)$", line)
        if bullet_match:
            current_items.append(bullet_match.group(1).strip())

    flush()
    return sections


def extract_design_parts(text: str) -> List[Tuple[str, str]]:
    parts: List[Tuple[str, str]] = []
    # Matches lines like:
    # ├── Calculator.ts           # 計算エンジン
    pattern = re.compile(r"^[\s|`├└─│]+([A-Za-z0-9_.\/-]+\.(?:ts|tsx|js|jsx))\s*#\s*(.+)$")
    for raw_line in text.splitlines():
        match = pattern.match(raw_line)
        if not match:
            continue
        file_name, responsibility = match.group(1), match.group(2).strip()
        base = pathlib.Path(file_name).stem
        part_name = sanitize_identifier(base, "DesignPart")
        part_name = f"{part_name[0].upper()}{part_name[1:]}" if part_name else "DesignPart"
        parts.append((part_name, responsibility))
    # Remove duplicates, preserve order
    seen = set()
    unique: List[Tuple[str, str]] = []
    for item in parts:
        if item[0] in seen:
            continue
        seen.add(item[0])
        unique.append(item)
    return unique


def build_model(
    package_name: str,
    requirements_path: pathlib.Path,
    requirements_text: str,
    design_path: pathlib.Path | None,
    design_text: str,
) -> str:
    date_str = dt.date.today().isoformat()
    sections = extract_heading_and_bullets(requirements_text)
    design_parts = extract_design_parts(design_text) if design_text else []

    lines: List[str] = []
    lines.append("/**")
    lines.append(" * Auto-generated SysML v2 starter model")
    lines.append(f" * Generated: {date_str}")
    lines.append(f" * Requirements source: {requirements_path.as_posix()}")
    if design_path:
        lines.append(f" * Design source: {design_path.as_posix()}")
    lines.append(" */")
    lines.append("")
    lines.append(f"package {package_name} {{")
    lines.append("    import ScalarValues::*;")
    lines.append("")
    lines.append("    requirement def DocumentRequirements {")
    lines.append("        doc /* Root requirement definition */")
    lines.append("    }")
    lines.append("")

    used_ids: set[str] = set()
    req_counter = 1
    for heading, items in sections:
        section_name = ensure_unique_identifier(
            sanitize_identifier(heading, f"Section{req_counter}"),
            used_ids,
        )
        lines.append(f"    requirement {section_name} :> DocumentRequirements {{")
        lines.append(f'        doc /* Source heading: {heading} */')
        lines.append("    }")
        lines.append("")
        for item in items:
            req_name = sanitize_identifier(item[:40], f"Req{req_counter:03d}")
            if req_name.lower() in {"requirement", "def", "part"}:
                req_name = f"Req{req_counter:03d}"
            req_name = ensure_unique_identifier(req_name, used_ids)
            lines.append(f"    requirement {req_name} :> {section_name} {{")
            lines.append(f"        doc /* {item} */")

            num_match = re.search(r"(\d+)\s*件", item)
            if num_match:
                lines.append(f"        attribute limitCount : Integer = {num_match.group(1)};")

            sec_match = re.search(r"(\d+)\s*秒", item)
            if sec_match:
                lines.append(f'        attribute timeLimit : String = "{sec_match.group(1)}秒";')

            lines.append("    }")
            lines.append("")
            req_counter += 1

    if design_parts:
        lines.append("    part def SystemDesign {")
        lines.append("        doc /* Derived from design source */")
        for part_name, _ in design_parts:
            instance = part_name[0].lower() + part_name[1:]
            lines.append(f"        part {instance} : {part_name};")
        lines.append("    }")
        lines.append("")

        for part_name, responsibility in design_parts:
            lines.append(f"    part def {part_name} {{")
            lines.append(f"        doc /* {responsibility} */")
            lines.append("    }")
            lines.append("")

    lines.append("}")
    return "\n".join(lines)


def main() -> int:
    parser = argparse.ArgumentParser(description="Generate SysML v2 model from markdown docs")
    parser.add_argument("--requirements", required=True, help="Path to requirements markdown")
    parser.add_argument("--design", help="Path to design markdown/text")
    parser.add_argument("--output", required=True, help="Output .sysml path")
    parser.add_argument(
        "--package-name",
        default="GeneratedSystemModel",
        help="SysML package name (ASCII identifier recommended)",
    )
    args = parser.parse_args()

    requirements_path = pathlib.Path(args.requirements)
    output_path = pathlib.Path(args.output)
    design_path = pathlib.Path(args.design) if args.design else None

    requirements_text = read_text(requirements_path)
    design_text = read_text(design_path) if design_path else ""

    model = build_model(
        package_name=sanitize_identifier(args.package_name, "GeneratedSystemModel"),
        requirements_path=requirements_path,
        requirements_text=requirements_text,
        design_path=design_path,
        design_text=design_text,
    )
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(model, encoding="utf-8")

    print(f"Generated: {output_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

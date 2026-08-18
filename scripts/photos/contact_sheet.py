#!/usr/bin/env python3
"""
Build labelled contact sheets from photo-library/ so the set can be judged by eye.

Why this exists
---------------
`source_commons.py` can verify a licence, a resolution, an aspect ratio, a
subject token and a country. It cannot tell a hero landscape from a red-billed
gull, and both pass every automated gate. Commons is an encyclopaedia: its
"Hot Water Beach" results include the beach and also a seagull standing on it.

So the pipeline is deliberately two-stage — machine filters for what is
*permissible*, a human (or a model that can see) judges what is *good*. This
script produces the artefact that makes the second stage possible.

Usage
-----
  ~/.claude/tools/pdfenv/bin/python scripts/photos/contact_sheet.py
  -> build/contact-sheet-1.jpg, build/contact-sheet-2.jpg, ...
"""
from __future__ import annotations

import json
import pathlib

from PIL import Image, ImageDraw, ImageFont

LIB = pathlib.Path("photo-library")
OUT = pathlib.Path("build")
COLS, ROWS = 4, 5              # 20 per sheet
CELL_W, CELL_H = 480, 300
LABEL_H = 34
PAD = 8


def font(size: int):
    for p in (
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
    ):
        if pathlib.Path(p).exists():
            try:
                return ImageFont.truetype(p, size)
            except OSError:
                pass
    return ImageFont.load_default()


def main() -> int:
    manifest = json.loads((LIB / "manifest.json").read_text())
    OUT.mkdir(exist_ok=True)
    f = font(19)

    per = COLS * ROWS
    sheets = [manifest[i : i + per] for i in range(0, len(manifest), per)]

    for n, chunk in enumerate(sheets, 1):
        W = COLS * (CELL_W + PAD) + PAD
        H = ROWS * (CELL_H + LABEL_H + PAD) + PAD
        sheet = Image.new("RGB", (W, H), (18, 20, 22))
        draw = ImageDraw.Draw(sheet)

        for i, item in enumerate(chunk):
            col, row = i % COLS, i // COLS
            x = PAD + col * (CELL_W + PAD)
            y = PAD + row * (CELL_H + LABEL_H + PAD)

            src = LIB / item["file"]
            if src.exists():
                try:
                    im = Image.open(src)
                    im.draft("RGB", (CELL_W * 2, CELL_H * 2))   # fast JPEG downscale
                    im = im.convert("RGB")
                    im.thumbnail((CELL_W, CELL_H), Image.LANCZOS)
                    sheet.paste(im, (x + (CELL_W - im.width) // 2,
                                     y + (CELL_H - im.height) // 2))
                except Exception as e:                              # noqa: BLE001
                    draw.text((x + 10, y + 10), f"ERR {e}"[:48], fill=(255, 90, 90), font=f)
            else:
                draw.text((x + 10, y + 10), "MISSING", fill=(255, 90, 90), font=f)

            tier = "Q" if item["tier"] == "quality" else " "
            draw.text((x + 4, y + CELL_H + 6),
                      f'{item["id"]} [{tier}] {item["title"][5:44]}',
                      fill=(215, 220, 224), font=f)

        path = OUT / f"contact-sheet-{n}.jpg"
        sheet.save(path, quality=86, optimize=True)
        print(f"{path}  ({len(chunk)} images)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

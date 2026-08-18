#!/usr/bin/env python3
"""
Generate the default social share card.

Built from a real photograph in the library rather than drawn flat, so the card
carries the same palette argument the site makes: basalt ground, sulphur accent,
landscape doing the work.

  ~/.claude/tools/pdfenv/bin/python scripts/brand/og_card.py
  -> public/og/default-share-card.png  (1200x630)
"""
from __future__ import annotations

import pathlib

from PIL import Image, ImageDraw, ImageEnhance, ImageFont

W, H = 1200, 630
SRC = pathlib.Path("public/photos/tongariro-01-2400.webp")
OUT = pathlib.Path("public/og/default-share-card.png")

GROUND = (12, 19, 22)
SULPHUR = (233, 169, 58)
INK = (236, 235, 228)


def font(path_names, size):
    for p in path_names:
        if pathlib.Path(p).exists():
            try:
                return ImageFont.truetype(p, size)
            except OSError:
                pass
    return ImageFont.load_default()


def main() -> int:
    base = Image.open(SRC).convert("RGB")
    # Cover-crop to the card aspect.
    scale = max(W / base.width, H / base.height)
    base = base.resize((round(base.width * scale), round(base.height * scale)), Image.LANCZOS)
    left = (base.width - W) // 2
    top = int((base.height - H) * 0.45)
    card = base.crop((left, top, left + W, top + H))

    # Darken so type sits on it, matching the site's hero scrim logic.
    card = ImageEnhance.Brightness(card).enhance(0.52)
    scrim = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    sd = ImageDraw.Draw(scrim)
    for y in range(H):
        a = int(215 * (y / H) ** 1.35)
        sd.line([(0, y), (W, y)], fill=(*GROUND, a))
    card = Image.alpha_composite(card.convert("RGBA"), scrim).convert("RGB")

    d = ImageDraw.Draw(card)
    serif = font([
        "/System/Library/Fonts/Supplemental/Georgia Bold.ttf",
        "/System/Library/Fonts/Supplemental/Times New Roman Bold.ttf",
    ], 74)
    sans = font([
        "/System/Library/Fonts/Supplemental/Helvetica.ttc",
        "/System/Library/Fonts/Supplemental/Arial.ttf",
    ], 27)
    small = font([
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
    ], 22)

    x, y = 72, 300
    d.text((x, y), "NORTH ISLAND · AOTEAROA NEW ZEALAND", font=small, fill=SULPHUR)
    d.text((x, y + 44), "The North Island,", font=serif, fill=INK)
    d.text((x, y + 128), "at its own pace", font=serif, fill=INK)
    d.text((x, y + 232),
           "Small-group guided tours · one to five days · maximum eight guests",
           font=sans, fill=(200, 205, 205))

    # Wordmark, top-left, matching the header lockup.
    wm = font(["/System/Library/Fonts/Supplemental/Georgia Bold.ttf"], 34)
    d.text((72, 64), "Slow", font=wm, fill=INK)
    slow_w = d.textlength("Slow", font=wm)
    d.text((72 + slow_w, 64), "North", font=wm, fill=SULPHUR)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    card.save(OUT, "PNG", optimize=True)
    print(f"{OUT}  {card.size[0]}x{card.size[1]}  {OUT.stat().st_size // 1024}KB")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

#!/usr/bin/env python3
"""
Turn curated originals into responsive site imagery, and generate the
attribution manifest that makes using them lawful.

Pipeline
--------
  photo-library/*.jpg        originals from Commons (gitignored, 3-50MB each)
  photo-library/manifest.json licence + author + source, from source_commons.py
  photo-library/curation.json hero/gallery/texture/reject, from the visual pass
        |
        v
  public/photos/<id>-<w>.webp        responsive derivatives, approved only
  public/photos/credits.json         per-image attribution, read at render time
  docs/client/image-manifest.md      human-readable, one row per image

Two rules this script enforces
------------------------------
1. **Rejected images never reach public/.** AGENTS.md rule 10: anything under
   public/ is served whether or not a page links to it. A rejected file copied
   "just in case" is published.

2. **Every published image carries its attribution.** 42 of 49 approved files
   are CC BY or CC BY-SA. Attribution is a licence condition, not a courtesy,
   and it has to be reachable from where the image is used - so it ships as
   data (credits.json) rather than as a hand-maintained page that will rot.

The grade
---------
Deliberately light. The reference build (../capital-v3 docs/photography.md)
applied a nine-stage rescue grade because its source archive was 2009-2019
compact-camera snapshots. This library is mostly competent modern photography;
the job here is not rescue, it is *coherence* - a set shot by forty different
people across twenty years should read as one deliberate treatment. So: a
gentle S-curve, a small vibrance lift that leaves skies alone, and nothing else.
No filters, no vignette, no faded blacks.

Usage
-----
  ~/.claude/tools/pdfenv/bin/python scripts/photos/webify.py
"""
from __future__ import annotations

import json
import pathlib
import shutil

import numpy as np
from PIL import Image, ImageEnhance

LIB = pathlib.Path("photo-library")
OUT = pathlib.Path("public/photos")
DOCS = pathlib.Path("docs/client/image-manifest.md")

# Hero images serve a full-bleed band on a 2x display; gallery images never
# exceed a card. Generating 2400px for a card wastes bandwidth on every visit.
WIDTHS = {
    "hero": (640, 1024, 1600, 2400),
    "gallery": (640, 1024, 1600),
    "texture": (640, 1024, 1600),
}
QUALITY = 82


def grade(im: Image.Image) -> Image.Image:
    """Gentle S-curve + skies-safe vibrance. See module docstring."""
    a = np.asarray(im.convert("RGB")).astype(np.float32) / 255.0

    # S-curve on luma only, so hues do not shift.
    lum = a @ np.array([0.2126, 0.7152, 0.0722], dtype=np.float32)
    curved = np.clip(lum + 0.11 * np.sin(2 * np.pi * lum) * -1.0, 0.0, 1.0)
    with np.errstate(divide="ignore", invalid="ignore"):
        ratio = np.where(lum > 1e-4, curved / np.maximum(lum, 1e-4), 1.0)
    a = np.clip(a * ratio[..., None], 0.0, 1.0)

    out = Image.fromarray((a * 255).astype(np.uint8), "RGB")
    # Small global vibrance. Enhance.Color is saturation, so keep it modest or
    # blue skies posterise before the landscape gains anything.
    return ImageEnhance.Color(out).enhance(1.06)


def main() -> int:
    manifest = {m["id"]: m for m in json.loads((LIB / "manifest.json").read_text())}
    curation = json.loads((LIB / "curation.json").read_text())

    if OUT.exists():
        shutil.rmtree(OUT)          # rejects must not survive a re-run
    OUT.mkdir(parents=True)

    credits: dict[str, dict] = {}
    rows: list[tuple] = []
    made = 0

    for img_id, verdict in sorted(curation.items()):
        if img_id.startswith("_"):
            continue
        v = verdict["verdict"]
        meta = manifest.get(img_id)
        if not meta:
            print(f"  ! {img_id}: in curation but not in manifest")
            continue
        if v == "reject":
            rows.append((img_id, meta, verdict, v, []))
            continue

        src = LIB / meta["file"]
        if not src.exists():
            print(f"  ! {img_id}: original missing ({src})")
            continue

        im = Image.open(src)
        im.draft("RGB", (2400 * 2, 2400 * 2))
        im = grade(im.convert("RGB"))

        widths = [w for w in WIDTHS[v] if w <= im.width] or [im.width]
        for w in widths:
            h = round(im.height * w / im.width)
            im.resize((w, h), Image.LANCZOS).save(
                OUT / f"{img_id}-{w}.webp", "WEBP", quality=QUALITY, method=5
            )
            made += 1

        credits[img_id] = {
            "title": meta["title"].removeprefix("File:"),
            "author": meta["author"],
            "licence": meta["licence"],
            "source": meta["descriptionurl"],
            "attributionRequired": meta["attribution_required"],
            "shareAlike": meta["share_alike"],
            "focus": verdict.get("focus", "50% 50%"),
            "role": v,
            "widths": widths,
        }
        rows.append((img_id, meta, verdict, v, widths))
        print(f"  {img_id:18} {v:8} {len(widths)} sizes")

    (OUT / "credits.json").write_text(json.dumps(credits, indent=2, ensure_ascii=False))

    # ---- human-readable manifest -------------------------------------------
    approved = [r for r in rows if r[3] != "reject"]
    rejected = [r for r in rows if r[3] == "reject"]
    sa = sum(1 for c in credits.values() if c["shareAlike"])
    attr = sum(1 for c in credits.values() if c["attributionRequired"])

    lines = [
        "# Image manifest",
        "",
        "**Generated** by `scripts/photos/webify.py`. Do not edit by hand.",
        "",
        "Every photograph published on this site, with its licence and the",
        "attribution that licence requires. Sourced from Wikimedia Commons —",
        "see `docs/research/brand-and-design.md` for why Commons and not",
        "Unsplash/Pexels.",
        "",
        "## Obligations",
        "",
        f"- **{len(approved)} images published**, {made} derivative files.",
        f"- **{attr} require attribution** (CC BY / CC BY-SA). Rendered from",
        "  `public/photos/credits.json`, so the credit travels with the image",
        "  rather than living in a page that can drift out of sync.",
        f"- **{sa} are share-alike** (CC BY-SA). Resizing and grading makes a",
        "  derivative *of the photograph*, which carries the same licence. This",
        "  affects the images only — not the site's code, copy, or design.",
        "- **No model releases.** Neither Commons nor any free-stock platform",
        "  guarantees one. Frames containing identifiable individuals were",
        "  rejected in curation; the few containing distant, unidentifiable",
        "  figures are marked and restricted to gallery scale.",
        "",
        "## Published",
        "",
        "| ID | Role | Licence | Author | Source |",
        "|---|---|---|---|---|",
    ]
    for img_id, meta, verdict, v, widths in approved:
        author = (meta["author"] or "Unknown").replace("|", "/")[:52]
        lines.append(
            f'| `{img_id}` | {v} | {meta["licence"]} | {author} | '
            f'[Commons]({meta["descriptionurl"]}) |'
        )

    lines += [
        "",
        "## Rejected in curation",
        "",
        "Kept in the record because the rejections are the useful part: they show",
        "what an automated licence-and-resolution filter cannot catch.",
        "",
        "| ID | Why |",
        "|---|---|",
    ]
    for img_id, meta, verdict, v, _ in rejected:
        lines.append(f'| `{img_id}` | {verdict.get("note", "—")} |')

    lines += [
        "",
        "## What still needs a real photograph",
        "",
        "- **Waitomo** — only 2 usable frames from 8 fetched. Commons has almost",
        "  no good glowworm-cave photography; caves are hard to shoot and the",
        "  commercial operators restrict it. A venue relationship gives access to",
        "  their media library, which is the actual fix. `SAM-VERIFY`.",
        "- **People.** There is not one usable photograph of a guide, a guest, or",
        "  a group on this site, because publishing identifiable strangers without",
        "  a release is not available to us. Every 'our guests' and 'your guide'",
        "  slot is a designed placeholder. One afternoon with a real camera and",
        "  signed releases fixes this permanently. `SAM-VERIFY`.",
        "- **The vehicle.** Same. A photograph of the actual van, badged, is worth",
        "  more for trust than any landscape here.",
        "",
    ]
    DOCS.parent.mkdir(parents=True, exist_ok=True)
    DOCS.write_text("\n".join(lines))

    print(f"\n{len(approved)} published, {len(rejected)} rejected, {made} files")
    print(f"  {OUT}/credits.json")
    print(f"  {DOCS}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

#!/usr/bin/env bash
# Self-host the two families. Fonts are fetched once and committed; the site
# never requests fonts.googleapis.com at runtime (privacy, and it removes a
# third-party render-blocking request on rural NZ connections).
#
# Subsets: latin + latin-ext ONLY.
#   latin      — English, and German's ä ö ü ß
#   latin-ext  — Māori macrons ā ē ī ō ū (U+0100-017F)
# The macron range is a hard requirement, not an optimisation: Taupō, Ōpōtiki,
# Whakatāne and Te Rēinga all need it. See docs/research/brand-and-design.md.
set -euo pipefail
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
cd "$(dirname "$0")/../.."

fetch() {  # family_query  outprefix
  local q="$1" prefix="$2" css
  css=$(curl -sS -A "$UA" "https://fonts.googleapis.com/css2?family=${q}&display=swap")
  local i=0
  while read -r block; do :; done <<< ""
  # Walk each @font-face, keeping only latin / latin-ext.
  python3 - "$prefix" <<PY
import re, subprocess, sys
css = """$css"""
prefix = sys.argv[1]
faces = re.findall(r"/\*\s*([\w-]+)\s*\*/\s*@font-face\s*\{(.*?)\}", css, re.S)
for subset, body in faces:
    if subset not in ("latin", "latin-ext"):
        continue
    url = re.search(r"url\((https://[^)]+)\)", body).group(1)
    style = "italic" if "italic" in body else "normal"
    name = f"public/fonts/{prefix}-{subset}" + ("-italic" if style == "italic" else "") + ".woff2"
    subprocess.run(["curl", "-sS", "-o", name, url], check=True)
    rng = re.search(r"unicode-range:\s*([^;]+);", body).group(1).strip()
    print(f"{name}|{style}|{rng}")
PY
}

fetch "Fraunces:opsz,wght@9..144,300..700" fraunces > public/fonts/.fraunces.meta
fetch "Inter:wght@300..700" inter > public/fonts/.inter.meta
ls -la public/fonts/*.woff2

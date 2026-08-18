#!/usr/bin/env python3
"""
Source permissively-licensed North Island photography from Wikimedia Commons.

Why Commons and not Unsplash/Pexels
-----------------------------------
Both Unsplash and Pexels grant commercial use with no attribution required, which
is the easiest licence available. Neither is usable *programmatically* here:
`source.unsplash.com` has been retired (503) and pexels.com returns 403 to
automated clients. Their APIs need registered keys this build does not have.

Commons has an open API that returns the licence and author **per file**, which is
exactly what a defensible image manifest needs. The tradeoff is that Commons is
mixed-licence, so every file must be checked rather than assumed — that check is
what this script exists to do.

Licence policy (ACCEPT below)
-----------------------------
- CC0 / Public Domain  -> no obligation
- CC BY                -> attribution required
- CC BY-SA             -> attribution required; a *derivative of the image* is
                          share-alike. Resizing/cropping for the web makes a
                          derivative, so the derivative carries the same licence.
                          It does NOT affect the site's own code or content.
Anything else (NC, ND, fair use, unknown) is rejected outright. NC is rejected
even though this site is non-commercial, because the site depicts a commercial
operator and the distinction would not survive contact with a real launch.

Output
------
  photo-library/<slug>.jpg        original download (full size)
  docs/client/image-manifest.md   generated, one row per image, with licence,
                                  author, source URL and fetch date
  photo-library/manifest.json     machine-readable, drives the responsive build

Usage
-----
  python3 scripts/photos/source_commons.py            # fetch everything
  python3 scripts/photos/source_commons.py --dry-run  # show what would be taken
"""
from __future__ import annotations

import argparse
import json
import pathlib
import re
import sys
import time
import urllib.parse
import urllib.request

API = "https://commons.wikimedia.org/w/api.php"
UA = "nz-tourism-solution/1.0 (https://claralabs.tech; chaseriddick@outlook.com)"

ACCEPT = (
    "cc0", "public domain", "pd-", "cc by 4.0", "cc by 3.0", "cc by 2.0",
    "cc by-sa 4.0", "cc by-sa 3.0", "cc by-sa 2.0",
)
REJECT = ("nc", "nd", "fair use", "non-free", "gfdl only")

# Commons is an encyclopaedic archive, not a stock library. A plain search for
# "Waitomo Caves" returns the visitor centre, the carpark sign and an Admiralty
# chart before it returns a photograph anyone would put on a hero band. These
# title fragments are the documentation-shot signature.
TITLE_BLOCK = (
    "map", "chart", "diagram", "sign", "signage", "information board", "plaque",
    "visitor centre", "visitor center", "logo", "coat of arms", "flag",
    "brochure", "poster", "leaflet", "ticket", "timetable", "graph", "plot",
    "portrait", "gravestone", "memorial", "interior", "museum", "car park",
    "carpark", "toilet", "sculpture", "statue", "monument", "building",
    "church", "cathedral", "hut ", "shed", "fence", "roadworks", "construction",
    "panoramio",          # bulk Panoramio imports are low quality by default
    "arboretum", "botanic", "garden", "cemetery", "airport", "railway station",
    # --- added after the 2026-08-18 visual curation pass. Each of these got
    # through licence + resolution + ratio + subject + country and was rejected
    # by eye. The single worst was a grid of 2023 general election candidate
    # headshots that matched "coast"; that file is why the visual gate exists.
    "election", "candidate", "headshot", "portrait of",
    "iss0", "from space", "satellite", "landsat", "sentinel-",   # orbital imagery
    "deed", "land sale", "manuscript", "lithograph", "engraving",
    "18th", "19th century", "1887", "1900",                      # archival plates
    "starfish", "anemone", "weta", "gull", "seeds", "insect", "spider",
    "fungus", "lichen", "moss", "flower", "seedling",            # macro biology
    "main entrance", "reception", "cafe", "shop",
)

MIN_W, MIN_H = 1600, 900          # below this it cannot serve a hero band
MIN_RATIO, MAX_RATIO = 1.2, 3.2   # reject panoramas and portraits alike

# subject -> {terms, require}
#
# `require` exists because Commons full-text search is loose enough to be
# actively dangerous here: searching `Cathedral Cove incategory:"Quality images"`
# returns the Uspenskyi Cathedral in Kyiv, a beach on Rügen and Preveli Palm
# Beach in Crete before it returns the actual Coromandel headland. Matching a
# licence and a resolution is not enough — the photograph also has to be of the
# place it claims to be. Every candidate must carry at least one `require` token
# in its title or description or it is discarded.
SUBJECTS: dict[str, dict] = {
    "tongariro": {
        "terms": ["Tongariro Alpine Crossing", "Mount Ngauruhoe", "Tongariro National Park landscape"],
        "require": ["tongariro", "ngauruhoe", "ruapehu", "emerald lake", "red crater"],
    },
    "rotorua": {
        "terms": ["Wai-O-Tapu", "Pohutu Geyser", "Rotorua geothermal", "Champagne Pool"],
        "require": ["rotorua", "wai-o-tapu", "waiotapu", "pohutu", "whakarewarewa", "champagne pool"],
    },
    "waitomo": {
        "terms": ["Ruakuri Cave", "Waitomo glowworm grotto", "Marokopa Falls",
                  "Mangapohue Natural Bridge", "Waitomo Caves"],
        "require": ["waitomo", "glowworm", "glow-worm", "ruakuri"],
    },
    "coromandel": {
        "terms": ["Cathedral Cove Coromandel", "Hot Water Beach New Zealand", "Coromandel Peninsula"],
        "require": ["coromandel", "cathedral cove", "hot water beach", "hahei", "whitianga"],
    },
    "bay-of-islands": {
        "terms": ["Bay of Islands New Zealand", "Cape Reinga", "Russell New Zealand", "Paihia"],
        "require": ["bay of islands", "cape reinga", "reinga", "paihia", "waitangi", "kerikeri", "northland"],
    },
    "taupo": {
        "terms": ["Huka Falls", "Lake Taupo", "Taupo New Zealand"],
        "require": ["taupo", "taupō", "huka"],
    },
    "waiheke": {
        "terms": ["Waiheke Island", "Waiheke vineyard"],
        "require": ["waiheke"],
    },
    "auckland": {
        "terms": ["Piha Beach", "Karekare Beach", "Bethells Beach", "Muriwai Beach",
                  "Rangitoto Island", "Auckland skyline"],
        "require": ["auckland", "piha", "karekare", "bethells", "muriwai",
                    "waitakere", "rangitoto", "hauraki"],
    },
    "east-cape": {
        "terms": ["East Cape New Zealand", "Tolaga Bay", "Gisborne New Zealand", "Te Araroa"],
        "require": ["east cape", "tolaga", "gisborne", "eastland", "tairawhiti", "tairāwhiti", "opotiki", "ōpōtiki"],
    },
    "forest": {
        "terms": ["Whirinaki Forest", "Te Urewera", "kauri forest New Zealand", "Lake Waikaremoana"],
        "require": ["whirinaki", "urewera", "kauri", "waikaremoana", "podocarp"],
    },
    "coast": {
        "terms": ["Hokianga Harbour", "Whangarei Heads", "Tutukaka coast",
                  "Ninety Mile Beach", "Pakiri Beach"],
        "require": ["northland", "ninety mile", "hokianga", "pakiri", "whangarei",
                    "tutukaka", "opononi", "omapere"],
    },
    "geothermal": {
        "terms": ["Orakei Korako", "Craters of the Moon Taupo", "Waimangu"],
        "require": ["orakei korako", "craters of the moon", "waimangu", "geothermal"],
    },
}


def api(params: dict) -> dict:
    params = {**params, "format": "json", "formatversion": "2"}
    url = f"{API}?{urllib.parse.urlencode(params)}"
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=45) as r:
        return json.loads(r.read().decode())


def strip_html(s: str) -> str:
    s = re.sub(r"<[^>]+>", "", s or "")
    return re.sub(r"\s+", " ", s).replace("&amp;", "&").strip()


def licence_ok(lic: str) -> bool:
    l = (lic or "").lower()
    if not l or any(bad in l for bad in REJECT):
        return False
    return any(good in l for good in ACCEPT)


def search(term: str, limit: int = 12) -> list[dict]:
    try:
        d = api({
            "action": "query", "generator": "search", "gsrsearch": term,
            "gsrnamespace": "6", "gsrlimit": str(limit),
            "prop": "imageinfo|categories",
            "iiprop": "url|extmetadata|size|mime",
            "cllimit": "max", "clshow": "!hidden",
        })
    except Exception as e:                       # noqa: BLE001
        print(f"    ! search failed for {term!r}: {e}", file=sys.stderr)
        return []
    return d.get("query", {}).get("pages", []) or []


def title_ok(title: str) -> bool:
    """Reject documentation shots by their title."""
    low = title.lower().removeprefix("file:")
    return not any(bad in low for bad in TITLE_BLOCK)


NZ_TOKENS = ("new zealand", "nouvelle-zélande", "neuseeland", "aotearoa")

# This site sells the North Island only. Several search terms collide hard with
# South Island subjects — "Te Araroa" is an East Cape settlement *and* the
# 3,000km national trail, most of whose photographed sections are in Canterbury.
# A South Island shot on a North Island itinerary is exactly the error a New
# Zealand reader spots instantly, so the exclusion is explicit.
SOUTH_ISLAND = (
    "canterbury", "otago", "southland", "nelson", "marlborough", "westland",
    "fiordland", "queenstown", "christchurch", "dunedin", "aoraki", "mount cook",
    "mt cook", "milford sound", "wanaka", "kaikoura", "arthur's pass", "west coast",
    "south island", "stewart island", "banks peninsula", "craigieburn", "hokitika",
)


def in_new_zealand(page: dict, haystack: str) -> bool:
    """Hard geographic guard.

    Subject tokens alone are not enough — `Russell` matches a London hotel, a
    Tasmanian waterfall and a Greenland glacier. Commons categorises almost
    every geolocated file under a `... in New Zealand` / `... of New Zealand`
    tree, so the category list is the reliable signal and the title/description
    is the fallback for the few files that are thinly categorised.
    """
    cats = " ".join(c.get("title", "") for c in page.get("categories", []) or []).lower()
    if any(tok in cats or tok in haystack for tok in SOUTH_ISLAND):
        return False
    return any(tok in cats for tok in NZ_TOKENS) or any(tok in haystack for tok in NZ_TOKENS)


def evaluate(page: dict, tier: str = "search", require: list[str] | None = None) -> dict | None:
    """Return a candidate dict if the file passes licence, subject and quality."""
    if not title_ok(page.get("title", "")):
        return None
    ii = (page.get("imageinfo") or [{}])[0]
    if not ii or "image/" not in (ii.get("mime") or ""):
        return None
    if (ii.get("mime") or "").endswith("svg+xml"):
        return None

    em = ii.get("extmetadata", {}) or {}
    lic = strip_html(em.get("LicenseShortName", {}).get("value", ""))
    if not licence_ok(lic):
        return None

    w, h = ii.get("width") or 0, ii.get("height") or 0
    if w < MIN_W or h < MIN_H:
        return None
    ratio = w / h if h else 0
    if not (MIN_RATIO <= ratio <= MAX_RATIO):
        return None

    em_desc = strip_html(em.get("ImageDescription", {}).get("value", ""))
    cat_text = " ".join(c.get("title", "") for c in page.get("categories", []) or [])
    haystack = f"{page.get('title', '')} {em_desc} {cat_text}".lower()

    if not in_new_zealand(page, haystack):
        return None
    if require and not any(tok in haystack for tok in require):
        return None

    return {
        "title": page.get("title", ""),
        "licence": lic,
        "author": strip_html(em.get("Artist", {}).get("value", "")) or "Unknown",
        "credit": strip_html(em.get("Credit", {}).get("value", "")),
        "descr": em_desc[:300],
        "url": ii.get("url"),
        "descriptionurl": ii.get("descriptionurl"),
        "width": w, "height": h, "ratio": round(ratio, 3),
        "attribution_required": "cc0" not in lic.lower() and "public domain" not in lic.lower(),
        "share_alike": "-sa" in lic.lower(),
        "tier": tier,
    }


def download(url: str, dest: pathlib.Path) -> bool:
    try:
        req = urllib.request.Request(url, headers={"User-Agent": UA})
        with urllib.request.urlopen(req, timeout=180) as r:
            dest.write_bytes(r.read())
        return True
    except Exception as e:                       # noqa: BLE001
        print(f"    ! download failed: {e}", file=sys.stderr)
        return False


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--per-subject", type=int, default=4)
    ap.add_argument("--out", default="photo-library")
    ap.add_argument("--only", default="", help="comma-separated subject slugs")
    ap.add_argument("--start-index", type=int, default=1,
                    help="first numeric suffix, so a top-up does not clobber curated files")
    args = ap.parse_args()

    out = pathlib.Path(args.out)
    out.mkdir(parents=True, exist_ok=True)

    manifest: list[dict] = []
    seen_titles: set[str] = set()

    only = {s.strip() for s in args.only.split(",") if s.strip()}
    for slug, spec in SUBJECTS.items():
        if only and slug not in only:
            continue
        terms, require = spec["terms"], spec["require"]
        print(f"\n{slug}")
        taken = 0
        # Tier 1 is Commons' own peer-reviewed "Quality images" assessment — a
        # human has judged these technically good. It is by far the strongest
        # quality signal available without looking at the pixels, so it is
        # exhausted first and only then does the plain search run.
        attempts = [(f'{t_} incategory:"Quality images"', "quality") for t_ in terms]
        attempts += [(t_, "search") for t_ in terms]

        for term, tier in attempts:
            if taken >= args.per_subject:
                break
            for page in search(term):
                if taken >= args.per_subject:
                    break
                cand = evaluate(page, tier, require)
                if not cand or cand["title"] in seen_titles:
                    continue
                seen_titles.add(cand["title"])
                taken += 1
                idx = f"{slug}-{taken + args.start_index - 1:02d}"
                ext = pathlib.Path(urllib.parse.urlparse(cand["url"]).path).suffix.lower()
                ext = ".jpg" if ext in (".jpeg", "") else ext
                dest = out / f"{idx}{ext}"
                cand.update(slug=slug, id=idx, file=dest.name, search_term=term)

                print(f"  {idx:18} {cand['tier']:8} {cand['licence']:14} "
                      f"{cand['width']}x{cand['height']}  {cand['title'][5:56]}")
                if not args.dry_run:
                    if dest.exists() or download(cand["url"], dest):
                        manifest.append(cand)
                    time.sleep(0.4)          # be polite to Commons
                else:
                    manifest.append(cand)
            time.sleep(0.2)

    if not args.dry_run:
        mpath = out / "manifest.json"
        if mpath.exists() and only:          # top-up: merge, never truncate
            existing = json.loads(mpath.read_text())
            have = {m["id"] for m in manifest}
            manifest = [m for m in existing if m["id"] not in have] + manifest
        mpath.write_text(json.dumps(manifest, indent=2, ensure_ascii=False))
    print(f"\n{len(manifest)} images across {len(SUBJECTS)} subjects")
    if manifest:
        sa = sum(1 for m in manifest if m["share_alike"])
        qi = sum(1 for m in manifest if m["tier"] == "quality")
        print(f"  Commons Quality images: {qi}/{len(manifest)}")
        print(f"  attribution required:   {sum(1 for m in manifest if m['attribution_required'])}")
        print(f"  share-alike:            {sa}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

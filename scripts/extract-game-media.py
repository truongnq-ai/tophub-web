#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
TopHeroes (v1.125.5) 12-Phase Game Media & Bilingual Manifest Extractor.

Strictly Read-Only ("rb") against the TopHeroes game installation directory.
Extracts ~9,860+ 2D UI, Icon, Portrait, and Banner assets (.webp, quality=92, RGBA)
into `tophub-web/public/images/` and generates per-group + root `manifest.json`
enriched with English & Vietnamese metadata from `Meta.bytes`, `Locale_en.bytes`,
`Locale_vi.bytes`, and `src/content/guides/glossary.ts`.

Usage:
  python scripts/extract-game-media.py --build-cache
  python scripts/extract-game-media.py --phase 1,2,3
  python scripts/extract-game-media.py --phase all
  python scripts/extract-game-media.py --merge-manifests
  python scripts/extract-game-media.py --verify
"""

import argparse
import gzip
import io
import json
import os
import re
import struct
import sys
import time
import warnings
from collections import defaultdict
from typing import Any

warnings.filterwarnings("ignore")
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")
if hasattr(sys.stderr, "reconfigure"):
    sys.stderr.reconfigure(encoding="utf-8")

import UnityPy
from PIL import Image

UnityPy.config.FALLBACK_UNITY_VERSION = "2019.4.40f1"

# ============================================================================
# PATH CONFIGURATION (Read-Only Game Source & Target Web Output)
# ============================================================================
GAME_STREAMING_DIR = r"C:\Users\truon\AppData\Local\TopHeroes\app-1.125.5\TopHeroes_Data\StreamingAssets"
BUNDLES_DIR = os.path.join(GAME_STREAMING_DIR, "Bundles")
BUNDLE_OFFSET_PATH = os.path.join(GAME_STREAMING_DIR, "BundleOffsetTable.bytes")
ASSET_CONFIG_PATH = os.path.join(GAME_STREAMING_DIR, "AssetConfig.bytes")
META_BYTES_PATH = os.path.join(GAME_STREAMING_DIR, "Table", "1.0.42291", "Meta.bytes")
LOCALE_EN_PATH = os.path.join(GAME_STREAMING_DIR, "Locale", "1.0.42291", "Locale_en.bytes")
LOCALE_VI_PATH = os.path.join(GAME_STREAMING_DIR, "Locale", "1.0.42291", "Locale_vi.bytes")

REPO_ROOT = r"d:\GitHub\top-hero\tophub-web"
GLOSSARY_TS_PATH = os.path.join(REPO_ROOT, "src", "content", "guides", "glossary.ts")
OUTPUT_IMAGES_DIR = os.path.join(REPO_ROOT, "public", "images")
DEFAULT_CACHE_PATH = os.path.join(
    r"C:\Users\truon\.gemini\antigravity\brain\9eb73855-2920-4d37-90de-7aaba3e9be08\scratch",
    "metadata_cache.json",
)

RACE_MAP = {1: "league", 2: "nature", 3: "horde"}
QUALITY_MAP = {
    1: "common",
    2: "uncommon",
    3: "rare",
    4: "epic",
    5: "legendary",
    6: "mythic",
}

# Explicit mapping for all 51 Glossary Hero IDs -> Game Hero/Unit ID
GLOSSARY_HERO_TO_GAME_ID: dict[str, int] = {
    "hero-rose-princess": 10043,
    "hero-paragon": 10033,
    "hero-bishop": 10046,
    "hero-artificer": 10050,
    "hero-adjudicator": 10031,
    "hero-pyromancer": 10025,
    "hero-nun": 10027,
    "hero-bard": 10030,
    "hero-astrologer": 10024,
    "hero-secret-keeper": 10018,
    "hero-hostess": 10032,
    "hero-knight": 10004,
    "hero-ranger": 10014,
    "hero-minister": 10003,
    "hero-guardsman": 10010,
    "hero-crossbowman": 10002,
    "hero-desert-prince": 10039,
    "hero-storm-maiden": 10041,
    "hero-witch": 10045,
    "hero-wukong": 10047,
    "hero-beastmaster": 10048,
    "hero-shadow-priest": 10052,
    "hero-soulmancer": 10038,
    "hero-warlock": 10028,
    "hero-wilderness-hunter": 10023,
    "hero-swordmaster": 10020,
    "hero-barbarian": 10017,
    "hero-wanderer": 10047,
    "hero-headhunter": 10022,
    "hero-shaman": 10034,
    "hero-boar": 60008,
    "hero-brawler": 10016,
    "hero-rogue": 10011,
    "hero-outlaw": 10015,
    "hero-grunt": 10001,
    "hero-tidecaller": 10044,
    "hero-monk": 10042,
    "hero-ne-zha": 10049,
    "hero-petalis": 10051,
    "hero-pixie": 10037,
    "hero-forest-maiden": 10036,
    "hero-sage": 10035,
    "hero-windwalker": 10040,
    "hero-treeguard": 10019,
    "hero-stonemason": 10026,
    "hero-druid": 10008,
    "hero-watcher": 10021,
    "hero-pathfinder": 10012,
    "hero-priestess": 10013,
    "hero-dancer": 10005,
    "hero-scout": 10054,
}

GAME_ID_TO_GLOSSARY_HEROES: dict[int, list[str]] = defaultdict(list)
for _gid, _hid in GLOSSARY_HERO_TO_GAME_ID.items():
    GAME_ID_TO_GLOSSARY_HEROES[_hid].append(_gid)


# ============================================================================
# BINARY DECODERS (BundleOffsetTable, Locale LZ4, Meta.bytes GZIP)
# ============================================================================
def read_leb128(data: bytes, pos: int) -> tuple[int, int]:
    res = 0
    shift = 0
    while True:
        b = data[pos]
        pos += 1
        res |= (b & 0x7F) << shift
        if b < 0x80:
            break
        shift += 7
    return res, pos


def lz4_decompress_block(src: bytes, uncompressed_size: int) -> bytes:
    dst = bytearray()
    pos = 0
    n = len(src)
    while pos < n and len(dst) < uncompressed_size:
        token = src[pos]
        pos += 1
        lit_len = token >> 4
        if lit_len == 15:
            while pos < n:
                b = src[pos]
                pos += 1
                lit_len += b
                if b != 255:
                    break
        dst.extend(src[pos : pos + lit_len])
        pos += lit_len
        if pos >= n or len(dst) >= uncompressed_size:
            break
        offset = src[pos] | (src[pos + 1] << 8)
        pos += 2
        match_len = (token & 0x0F) + 4
        if (token & 0x0F) == 15:
            while pos < n:
                b = src[pos]
                pos += 1
                match_len += b
                if b != 255:
                    break
        start = len(dst) - offset
        for i in range(match_len):
            dst.append(dst[start + i])
    return bytes(dst)


def load_locale_file(filepath: str) -> dict[str, str]:
    with open(filepath, "rb") as f:
        raw = f.read()
    pos = 0
    out = bytearray()
    while pos < len(raw):
        flag = raw[pos]
        pos += 1
        if flag == 1:
            uncomp_sz, pos = read_leb128(raw, pos)
            comp_sz, pos = read_leb128(raw, pos)
            chunk = raw[pos : pos + comp_sz]
            pos += comp_sz
            out.extend(lz4_decompress_block(chunk, uncomp_sz))
        else:
            uncomp_sz, pos = read_leb128(raw, pos)
            out.extend(raw[pos : pos + uncomp_sz])
            pos += uncomp_sz
    data = bytes(out)
    count = struct.unpack("<I", data[:4])[0]
    p = 4
    res: dict[str, str] = {}
    for _ in range(count):
        klen, p = read_leb128(data, p)
        k = data[p : p + klen].decode("utf-8", errors="replace")
        p += klen
        vlen, p = read_leb128(data, p)
        v = data[p : p + vlen].decode("utf-8", errors="replace")
        p += vlen
        res[k] = v
    return res


def load_bundle_offset_table(filepath: str) -> dict[str, int]:
    offsets: dict[str, int] = {}
    if not os.path.exists(filepath):
        return offsets
    with open(filepath, "rb") as f:
        bot = f.read()
    if len(bot) < 12:
        return offsets
    _magic, _total_len, entry_count = struct.unpack("<III", bot[:12])
    pos = 12
    for _ in range(entry_count):
        if pos >= len(bot):
            break
        strlen, pos = read_leb128(bot, pos)
        name = bot[pos : pos + strlen].decode("utf-8", errors="replace")
        pos += strlen
        offset_val = struct.unpack("<Q", bot[pos : pos + 8])[0]
        pos += 8
        offsets[os.path.basename(name)] = offset_val
    return offsets


def open_unity_bundle_readonly(bundle_path: str, known_offset: int = 0) -> Any:
    """Opens a UnityFS bundle in strictly read-only ('rb') mode with offset handling."""
    with open(bundle_path, "rb") as f:
        raw = f.read()
    if known_offset > 0 and known_offset < len(raw) and raw[known_offset : known_offset + 7] == b"UnityFS":
        return UnityPy.load(io.BytesIO(raw[known_offset:]))
    if raw[:7] == b"UnityFS":
        return UnityPy.load(io.BytesIO(raw))
    idx = raw.find(b"UnityFS")
    if idx > 0:
        return UnityPy.load(io.BytesIO(raw[idx:]))
    return UnityPy.load(io.BytesIO(raw))


def parse_glossary_ts(filepath: str) -> list[dict[str, Any]]:
    with open(filepath, "r", encoding="utf-8") as f:
        txt = f.read()
    terms: list[dict[str, Any]] = []
    block_re = re.compile(
        r'\{\s*id:\s*"(?P<id>[^"]+)",\s*category:\s*"(?P<cat>[^"]+)",\s*'
        r'term:\s*\{\s*vi:\s*"(?P<t_vi>[^"]+)",\s*en:\s*"(?P<t_en>[^"]+)"\s*\},'
        r'(?P<mid>.*?)'
        r'definition:\s*\{\s*vi:\s*"(?P<d_vi>[^"]+)",\s*en:\s*"(?P<d_en>[^"]+)",?\s*\}',
        re.DOTALL,
    )
    for m in block_re.finditer(txt):
        terms.append(
            {
                "id": m.group("id"),
                "category": m.group("cat"),
                "name_en": m.group("t_en"),
                "name_vi": m.group("t_vi"),
                "desc_en": m.group("d_en"),
                "desc_vi": m.group("d_vi"),
            }
        )
    return terms


def load_meta_tables(filepath: str, target_table_names: set[str]) -> dict[str, list[dict[str, Any]]]:
    with open(filepath, "rb") as f:
        raw_meta = f.read()
    dec_meta = gzip.decompress(raw_meta[5:])
    pool_byte_len, pool_str_count = struct.unpack("<II", dec_meta[:8])
    p = 8
    strings: list[str] = []
    for _ in range(pool_str_count):
        slen, p = read_leb128(dec_meta, p)
        strings.append(dec_meta[p : p + slen].decode("utf-8", errors="replace"))
        p += slen

    p_tables = 4 + pool_byte_len
    table_count = struct.unpack("<I", dec_meta[p_tables : p_tables + 4])[0]
    tp = p_tables + 4
    raw_tables: dict[str, bytes] = {}
    for _ in range(table_count):
        tname_len, tp = read_leb128(dec_meta, tp)
        tname = dec_meta[tp : tp + tname_len].decode("utf-8", errors="replace")
        tp += tname_len
        _flag = dec_meta[tp]
        tp += 1
        tbody_len = struct.unpack("<I", dec_meta[tp : tp + 4])[0]
        tp += 4
        if tname in target_table_names:
            raw_tables[tname] = dec_meta[tp : tp + tbody_len]
        tp += tbody_len

    decoded: dict[str, list[dict[str, Any]]] = {}
    for tname, body in raw_tables.items():
        if len(body) < 9:
            continue
        row_cnt, col_cnt = struct.unpack("<II", body[1:9])
        col_names = [strings[struct.unpack("<I", body[9 + c * 4 : 13 + c * 4])[0]] for c in range(col_cnt)]
        nibble_pos = 9 + col_cnt * 4
        col_types = [
            ((body[nibble_pos + (i // 2)] & 0x0F) if i % 2 == 0 else (body[nibble_pos + (i // 2)] >> 4))
            for i in range(col_cnt)
        ]
        roff_pos = nibble_pos + (col_cnt + 1) // 2
        row_offsets = [
            struct.unpack("<I", body[roff_pos + r * 4 : roff_pos + (r + 1) * 4])[0] for r in range(row_cnt + 1)
        ]
        data_start = roff_pos + (row_cnt + 1) * 4
        rows: list[dict[str, Any]] = []
        for r in range(row_cnt):
            rb = body[data_start + row_offsets[r] : data_start + row_offsets[r + 1]]
            if not rb:
                continue
            active_cols = rb[0]
            crumb_bytes = (active_cols + 3) // 4
            pos = 1 + crumb_bytes
            row_dict: dict[str, Any] = {}
            for c in range(min(active_cols, col_cnt)):
                if pos > len(rb):
                    break
                crumb = (rb[1 + (c // 4)] >> ((c % 4) * 2)) & 0x03
                ct = col_types[c]
                cn = col_names[c]
                if crumb == 0:
                    row_dict[cn] = "" if ct == 5 else (0 if ct in (1, 2, 3, 4) else None)
                else:
                    bl = 4 if (crumb == 3 and ct in (1, 2, 3, 4)) else crumb
                    v = int.from_bytes(rb[pos : pos + bl], "little")
                    pos += bl
                    if ct == 5:
                        row_dict[cn] = strings[v] if v < len(strings) else ""
                    elif ct in (1, 2, 3, 4):
                        row_dict[cn] = v
                    else:
                        row_dict[cn] = None
            rows.append(row_dict)
        decoded[tname] = rows
    return decoded


# ============================================================================
# METADATA CACHE BUILDER
# ============================================================================
def build_metadata_cache(cache_path: str = DEFAULT_CACHE_PATH) -> dict[str, Any]:
    t0 = time.time()
    print("[Cache] Decoding Locale_en.bytes & Locale_vi.bytes (LZ4)...")
    loc_en = load_locale_file(LOCALE_EN_PATH)
    loc_vi = load_locale_file(LOCALE_VI_PATH)

    def tr(key: str) -> tuple[str, str]:
        if not key:
            return "", ""
        return loc_en.get(key, ""), loc_vi.get(key, "")

    print("[Cache] Decoding BundleOffsetTable.bytes & AssetConfig.bytes...")
    bundle_offsets = load_bundle_offset_table(BUNDLE_OFFSET_PATH)
    with open(ASSET_CONFIG_PATH, "r", encoding="utf-8") as f:
        ac = json.load(f)

    # Map physical files in Bundles directory by prefix before '(<md5>)'
    phys_files = os.listdir(BUNDLES_DIR)
    phys_by_prefix: dict[str, list[str]] = defaultdict(list)
    atlas_families: dict[str, list[str]] = defaultdict(list)
    for fn in phys_files:
        prefix = fn.split("(")[0]
        phys_by_prefix[prefix].append(fn)
        if ".spriteatlas(" in fn.lower():
            fam = fn.split(".spriteatlas")[0].split("@@")[0]
            atlas_families[fam].append(fn)

    for fam in atlas_families:
        atlas_families[fam].sort()

    # Map virtual .tex folders -> list of (virtual_path, physical_bundle_filename)
    tex_folders: dict[str, list[ list[str] ]] = defaultdict(list)
    seen_tex_vpaths: set[str] = set()
    for n in ac["resList"]["nodes"]:
        nid = n.get("id", "")
        b_base = os.path.basename(n.get("_a", ""))
        if n.get("_d", 0) != 0:
            bundle_offsets[b_base] = max(bundle_offsets.get(b_base, 0), int(n["_d"]))
        if nid.endswith(".tex") and ".prefab" not in b_base.lower():
            if nid in seen_tex_vpaths:
                continue
            prefix = b_base.split("(")[0]
            candidates = phys_by_prefix.get(prefix, [])
            if not candidates:
                continue
            phys_fn = b_base if b_base in candidates else sorted(candidates)[-1]
            seen_tex_vpaths.add(nid)
            if "/Textures/" in nid:
                sub = nid.split("/Textures/", 1)[1]
                folder = "Textures/" + (sub.split("/")[0] if "/" in sub else "_root_fx_textures")
            else:
                parts = nid.split("/")
                folder = "/".join(parts[:4]) if len(parts) >= 4 else nid
            tex_folders[folder].append([nid, phys_fn])

    target_tables = {
        "unit",
        "hero_detail",
        "user_skin",
        "skill",
        "hero_awaken",
        "technology",
        "alliance_tech",
        "hero_talent",
        "equipment",
        "equipment_suit",
        "hero_exclusive",
        "lord_equipment",
        "player_rune",
        "team_rune",
        "goods",
        "artifact",
        "artifact_suit",
        "pet_detail",
        "holybeast",
        "elf_skin",
        "troop_skin",
        "citybuilding",
        "citybuilding_skin",
        "world_skin",
        "citybuilding_DIY_property",
        "shop_type",
        "activity_show",
        "server_task",
        "villagers_skills",
    }
    print(f"[Cache] Decoding {len(target_tables)} tables from Meta.bytes (GZIP)...")
    tables = load_meta_tables(META_BYTES_PATH, target_tables)
    glossary_terms = parse_glossary_ts(GLOSSARY_TS_PATH)

    # Build unified sprite_lookup: sprite_name -> metadata dict
    sprite_meta: dict[str, dict[str, Any]] = {}
    unit_meta: dict[str, dict[str, Any]] = {}

    # 1. Units (Heroes 10001..10054, Soldiers 20101+, Monsters 60001+)
    for r in tables.get("unit", []):
        uid = r.get("id", 0)
        if uid <= 10:
            continue
        name_key = r.get("name", "") or f"hero_name_{uid}"
        en_n, vi_n = tr(name_key)
        if not en_n and 10001 <= uid <= 10099:
            en_n, vi_n = tr(f"hero_name_{uid}")
        en_d, vi_d = tr(f"hero_desc_{uid}")
        qual = QUALITY_MAP.get(r.get("quality", 0), "")
        race = RACE_MAP.get(r.get("race", 0), "")
        gids = GAME_ID_TO_GLOSSARY_HEROES.get(uid, [])
        um = {
            "game_id": uid,
            "name_en": en_n,
            "name_vi": vi_n,
            "desc_en": en_d,
            "desc_vi": vi_d,
            "quality": qual,
            "faction": race,
            "glossary_id": gids[0] if gids else None,
            "glossary_ids": gids,
        }
        unit_meta[str(uid)] = um
        for prefix in ("Lihui_", "Head_"):
            sp = f"{prefix}{uid}"
            sprite_meta[sp] = dict(um)

    # Ensure all 54 heroes 10001..10054 are registered even if not in unit rows
    for hid in range(10001, 10055):
        if str(hid) not in unit_meta:
            en_n, vi_n = tr(f"hero_name_{hid}")
            en_d, vi_d = tr(f"hero_desc_{hid}")
            gids = GAME_ID_TO_GLOSSARY_HEROES.get(hid, [])
            um = {
                "game_id": hid,
                "name_en": en_n,
                "name_vi": vi_n,
                "desc_en": en_d,
                "desc_vi": vi_d,
                "quality": "legendary",
                "faction": "",
                "glossary_id": gids[0] if gids else None,
                "glossary_ids": gids,
            }
            unit_meta[str(hid)] = um
            sprite_meta[f"Lihui_{hid}"] = dict(um)
            sprite_meta[f"Head_{hid}"] = dict(um)

    # 2. User Skins (Hero Skins & Lord Skins)
    for r in tables.get("user_skin", []):
        sid = r.get("id", 0)
        icon = r.get("icon", "")
        hid = r.get("heroID", 0)
        base_hid = hid // 100 if hid > 100000 else hid
        en_n, vi_n = tr(f"skin_name_{sid}")
        if not en_n:
            en_n, vi_n = tr(f"user_skin_name_{sid}")
        if not en_n and str(base_hid) in unit_meta:
            base_um = unit_meta[str(base_hid)]
            en_n = f"{base_um['name_en']} Skin ({icon})" if base_um["name_en"] else icon
            vi_n = f"Trang phục {base_um['name_vi']} ({icon})" if base_um["name_vi"] else icon
        en_d, vi_d = tr(f"skin_desc_{sid}")
        if icon:
            meta_entry = {
                "game_id": sid,
                "hero_id": base_hid,
                "name_en": en_n,
                "name_vi": vi_n,
                "desc_en": en_d,
                "desc_vi": vi_d,
            }
            sprite_meta[icon] = meta_entry
            if icon.startswith("Head_"):
                lihui_equiv = "Lihui_" + icon[5:]
                sprite_meta.setdefault(lihui_equiv, dict(meta_entry))

    # 3. Skills, Tech, Alliance Tech & Hero Talents
    for r in tables.get("skill", []):
        icon = r.get("icon", "")
        if not icon:
            continue
        en_n, vi_n = tr(r.get("name", ""))
        en_d, vi_d = tr(r.get("desc", ""))
        if icon not in sprite_meta or (en_n and not sprite_meta[icon].get("name_en")):
            sprite_meta[icon] = {
                "game_id": r.get("id", 0),
                "name_en": en_n,
                "name_vi": vi_n,
                "desc_en": en_d,
                "desc_vi": vi_d,
            }

    for r in tables.get("technology", []):
        icon = r.get("icon", "")
        if not icon:
            continue
        en_d, vi_d = tr(r.get("des", ""))
        sprite_meta.setdefault(
            icon,
            {
                "game_id": r.get("id", 0),
                "name_en": en_d or icon,
                "name_vi": vi_d or icon,
                "desc_en": en_d,
                "desc_vi": vi_d,
                "glossary_id": "system-research-cottage",
            },
        )

    for r in tables.get("hero_talent", []):
        icon = r.get("talent_icon", "")
        if not icon:
            continue
        en_n, vi_n = tr(r.get("talent_name", ""))
        en_d, vi_d = tr(r.get("talent_dec", ""))
        if icon not in sprite_meta or (en_n and not sprite_meta[icon].get("name_en")):
            sprite_meta[icon] = {
                "game_id": r.get("id", 0),
                "hero_id": r.get("hero_id", 0),
                "name_en": en_n,
                "name_vi": vi_n,
                "desc_en": en_d,
                "desc_vi": vi_d,
                "quality": QUALITY_MAP.get(r.get("talent_quality", 0), ""),
            }

    # 4. Equipment, Exclusive Weapons & Lord Gear
    for r in tables.get("hero_exclusive", []):
        icon = r.get("icon", "")
        if not icon:
            continue
        hid = r.get("use_hero", 0)
        en_n, vi_n = tr(r.get("name", ""))
        en_d, vi_d = tr(f"hero_exclusive_desc_{hid}")
        gids = GAME_ID_TO_GLOSSARY_HEROES.get(hid, [])
        sprite_meta[icon] = {
            "game_id": r.get("id", 0),
            "hero_id": hid,
            "name_en": en_n,
            "name_vi": vi_n,
            "desc_en": en_d,
            "desc_vi": vi_d,
            "quality": "mythic",
            "glossary_id": gids[0] if gids else None,
        }

    for r in tables.get("equipment", []):
        pic = r.get("picture", "")
        if not pic:
            continue
        en_n, vi_n = tr(r.get("name", ""))
        if not en_n:
            en_n, vi_n = tr(f"equipment_name_{r.get('id', 0)}")
        qual = QUALITY_MAP.get(r.get("quality", 0), "")
        for key in (pic, f"icon_{pic}"):
            if key not in sprite_meta or (en_n and not sprite_meta[key].get("name_en")):
                sprite_meta[key] = {
                    "game_id": r.get("id", 0),
                    "name_en": en_n,
                    "name_vi": vi_n,
                    "desc_en": "",
                    "desc_vi": "",
                    "quality": qual,
                }

    for r in tables.get("lord_equipment", []):
        icon = r.get("icon", "")
        if not icon:
            continue
        en_n, vi_n = tr(r.get("lord_equip_name", ""))
        en_d, vi_d = tr(r.get("lord_equip_desc", ""))
        qual = QUALITY_MAP.get(r.get("quality", 0), "")
        if icon not in sprite_meta or (en_n and not sprite_meta[icon].get("name_en")):
            sprite_meta[icon] = {
                "game_id": r.get("id", 0),
                "name_en": en_n,
                "name_vi": vi_n,
                "desc_en": en_d,
                "desc_vi": vi_d,
                "quality": qual,
                "glossary_id": "system-lord-gear",
            }

    # 5. Goods (3,190 items)
    for r in tables.get("goods", []):
        icon = r.get("icon", "")
        if not icon:
            continue
        gid = r.get("id", 0)
        en_n, vi_n = tr(r.get("name", ""))
        en_d, vi_d = tr(r.get("desc", ""))
        qual = QUALITY_MAP.get(r.get("quality", 0), "")
        gtype = r.get("type", 0)
        # Prefer lower canonical ID or non-empty localized name
        existing = sprite_meta.get(icon)
        if not existing or (en_n and not existing.get("name_en")) or (en_n and gid < existing.get("game_id", 999999999)):
            sprite_meta[icon] = {
                "game_id": gid,
                "name_en": en_n,
                "name_vi": vi_n,
                "desc_en": en_d,
                "desc_vi": vi_d,
                "quality": qual,
                "item_type": gtype,
            }

    # 6. Artifacts / Relics
    for r in tables.get("artifact", []):
        pic = r.get("show_picture", "")
        if not pic:
            continue
        en_n, vi_n = tr(r.get("name", ""))
        en_d, vi_d = tr(r.get("desc", ""))
        qual = QUALITY_MAP.get(r.get("quality", 0), "")
        sprite_meta[pic] = {
            "game_id": r.get("id", 0),
            "name_en": en_n,
            "name_vi": vi_n,
            "desc_en": en_d,
            "desc_vi": vi_d,
            "quality": qual,
            "glossary_id": "system-relics",
        }

    # 7. Holybeast (Behemoths) & Elf Skins
    for r in tables.get("holybeast", []):
        en_n, vi_n = tr(r.get("holybeast_name", ""))
        qual = QUALITY_MAP.get(r.get("quality", 0), "")
        for col in ("icon", "image", "holybeast_pic"):
            sp = r.get(col, "")
            if sp:
                sprite_meta[sp] = {
                    "game_id": r.get("id", 0),
                    "name_en": en_n,
                    "name_vi": vi_n,
                    "desc_en": "",
                    "desc_vi": "",
                    "quality": qual,
                    "glossary_id": "system-pets-behemoth",
                }

    for r in tables.get("elf_skin", []):
        sp = r.get("icon", "")
        if sp:
            en_n, vi_n = tr(r.get("name", ""))
            sprite_meta[sp] = {
                "game_id": r.get("id", 0),
                "name_en": en_n,
                "name_vi": vi_n,
                "desc_en": "",
                "desc_vi": "",
                "quality": QUALITY_MAP.get(r.get("rare", 0), ""),
            }

    # 8. Buildings, Building Skins, World Skins (Castle Skins)
    for r in tables.get("citybuilding", []):
        en_n, vi_n = tr(r.get("name", ""))
        en_d, vi_d = tr(r.get("des", ""))
        bid = r.get("id", 0)
        for col in ("lvup_head", "small_head", "head", "building_list_res", "new_small_head", "new_head", "new_building_list_res"):
            val = r.get(col, "")
            if val:
                sp = os.path.splitext(os.path.basename(val))[0]
                if sp not in sprite_meta or (en_n and not sprite_meta[sp].get("name_en")):
                    sprite_meta[sp] = {
                        "game_id": bid,
                        "name_en": en_n,
                        "name_vi": vi_n,
                        "desc_en": en_d,
                        "desc_vi": vi_d,
                    }

    for r in tables.get("citybuilding_skin", []):
        sp = r.get("pic", "")
        if sp:
            en_n, vi_n = tr(r.get("name", ""))
            en_d, vi_d = tr(r.get("desc", ""))
            sprite_meta[sp] = {
                "game_id": r.get("id", 0),
                "name_en": en_n,
                "name_vi": vi_n,
                "desc_en": en_d,
                "desc_vi": vi_d,
                "quality": QUALITY_MAP.get(r.get("quality", 0), ""),
            }

    for r in tables.get("world_skin", []):
        en_n, vi_n = tr(r.get("name", ""))
        en_d, vi_d = tr(r.get("desc", ""))
        qual = QUALITY_MAP.get(r.get("quality", 0), "")
        for col in ("pic", "pic_f", "anim", "anim_f"):
            sp = r.get(col, "")
            if sp and (sp not in sprite_meta or (en_n and not sprite_meta[sp].get("name_en"))):
                sprite_meta[sp] = {
                    "game_id": r.get("id", 0),
                    "name_en": en_n,
                    "name_vi": vi_n,
                    "desc_en": en_d,
                    "desc_vi": vi_d,
                    "quality": qual,
                }

    # 9. Activities / Events (`activity_show`, `server_task`)
    for r in tables.get("activity_show", []):
        sp = r.get("icon", "")
        if sp:
            en_n, vi_n = tr(r.get("name", ""))
            if sp not in sprite_meta or (en_n and not sprite_meta[sp].get("name_en")):
                sprite_meta[sp] = {
                    "game_id": r.get("id", 0),
                    "name_en": en_n,
                    "name_vi": vi_n,
                    "desc_en": "",
                    "desc_vi": "",
                }

    for r in tables.get("server_task", []):
        sp = r.get("name", "")
        if sp:
            en_d, vi_d = tr(r.get("describe", ""))
            sprite_meta[sp] = {
                "game_id": r.get("id", 0),
                "name_en": en_d or sp,
                "name_vi": vi_d or sp,
                "desc_en": en_d,
                "desc_vi": vi_d,
            }

    # Collect quick prefix dictionaries for fallback resolution (attributes, pets, DIY, etc.)
    locale_by_num: dict[str, dict[str, str]] = {}
    for prefix in ("attribute_name_", "pet_name_", "citybuilding_DIY_name_", "lord_title_name_", "skin_name_"):
        for k, v_en in loc_en.items():
            if k.startswith(prefix):
                locale_by_num[k] = {"en": v_en, "vi": loc_vi.get(k, "")}

    cache_obj = {
        "generated_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "bundle_offsets": bundle_offsets,
        "atlas_families": dict(atlas_families),
        "tex_folders": dict(tex_folders),
        "sprite_meta": sprite_meta,
        "unit_meta": unit_meta,
        "glossary_terms": glossary_terms,
        "locale_by_num": locale_by_num,
    }
    os.makedirs(os.path.dirname(cache_path), exist_ok=True)
    with open(cache_path, "w", encoding="utf-8") as f:
        json.dump(cache_obj, f, ensure_ascii=False)
    print(
        f"[Cache] Saved metadata cache ({len(sprite_meta)} sprite mappings, "
        f"{len(glossary_terms)} glossary terms) to {cache_path} in {time.time() - t0:.2f}s"
    )
    return cache_obj


def load_or_build_cache(cache_path: str = DEFAULT_CACHE_PATH) -> dict[str, Any]:
    if os.path.exists(cache_path):
        with open(cache_path, "r", encoding="utf-8") as f:
            return json.load(f)
    return build_metadata_cache(cache_path)


# ============================================================================
# 12-PHASE CONFIGURATION & ROUTING LOGIC
# ============================================================================
PHASE_CONFIG: dict[int, dict[str, Any]] = {
    1: {
        "name": "Heroes, Skins & Lords",
        "groups": ["heroes"],
        "atlases": [
            "UI_Hero_Lihui",
            "UI_Hero_Head",
            "UI_SYS_Hero",
            "UI_SYS_HeroSkin",
            "UI_Hero_Borrow",
            "HeroLevelSource",
            "UI_Monster_Head",  # Only for Head_60008 (Boar)
        ],
        "tex_folders": [
            "Textures/HeroSuit",
            "Textures/Hero",
            "Textures/HeroBorrow",
        ],
    },
    2: {
        "name": "Skills, Tech, Brilliance & Professions",
        "groups": ["skills", "tech"],
        "atlases": [
            "UI_Skill",
            "UI_Talent",
            "UI_Professional",
            "UI_Tech",
            "UI_SYS_Tech",
            "UI_Shine_Technology",
        ],
        "tex_folders": [
            "Textures/Talent",
            "Textures/Professional",
            "Textures/Tech",
            "Textures/ShineTechnology",
        ],
    },
    3: {
        "name": "Equipment, Exclusive Weapons, Lord Gear & Runes",
        "groups": ["equipment"],
        "atlases": [
            "UI_Equipment",
            "UI_Rune",
            "EquipStrength",
            "UI_ForgeRefine",
        ],
        "tex_folders": [
            "Textures/Forge",
        ],
    },
    4: {
        "name": "Items, Currencies, Shards, Spirits & Chests",
        "groups": ["items"],
        "atlases": [
            "UI_Item",
            "UI_SYS_OpenBox",
            "UI_SYS_OpenBoxEaster",
            "UI_SYS_Bag",
        ],
        "tex_folders": [],
    },
    5: {
        "name": "Relics & Artifacts",
        "groups": ["relics"],
        "atlases": [
            "UI_Artifact",
            "Artifact",
            "ArtifactExchange",
            "UI_Relic_Treasure",
        ],
        "tex_folders": [
            "Textures/Artifact",
        ],
    },
    6: {
        "name": "Pets, Behemoths & Companion Elves",
        "groups": ["pets", "behemoths", "elves"],
        "atlases": [
            "UI_Pet_Lihui",
            "UI_Pet_Head",
            "UI_Pet",
            "PalSystemCommon",
            "UI_DivineAvatar",
            "UI_DivineImage",
            "UI_FriendElf",
        ],
        "tex_folders": [
            "Textures/Pet",
            "Textures/DivineAvatar",
            "Textures/FriendElf",
        ],
    },
    7: {
        "name": "Troops, Soldier Skins & Caravans",
        "groups": ["troops"],
        "atlases": [
            "UI_SoldierDev_Lihui",
            "UI_SoldierDev_Head",
            "UI_Army_Head",
            "UI_SYS_SoldierDev",
            "UI_SYS_Army",
            "UI_Caravan",
            "Caravan",
            "Caranva",
            "UI_SYS_Transporter",
            "UI_AllianceTransporter",
            "Army_Car",
            "Army_Car_AR",
            "Army_Car_Alliance",
        ],
        "tex_folders": [
            "Textures/WorldTransporter",
            "Textures/Carriage",
        ],
    },
    8: {
        "name": "Buildings, Castle Skins & City DIY Decorations",
        "groups": ["buildings"],
        "atlases": [
            "UI_Building_List",
            "UI_Building_List_Small",
            "UI_Building",
            "UI_Building_LvUp",
            "UI_SYS_Building",
            "Building",
            "Building2",
            "Building_00",
            "Building_01",
            "Building_02",
            "city_building",
            "city_building_Atlas",
            "special_building_Atlas",
            "UI_Worldskin",
            "WorldSkin",
            "WorldSkinWing",
            "UI_SYS_WorldSkinSuit",
            "Castle",
            "Castle_00",
            "Castle_01",
            "Castle_02",
            "Castle_03",
            "Castle_ZJS",
            "CastleChangeSkin",
            "CastleGift",
            "Build_castle",
            "Building_DIY",
            "Building_DIY_Suit",
            "BuildingDiyNew",
        ],
        "tex_folders": [
            "Textures/Building",
            "Textures/Building_DIY",
            "Textures/WorldSkinSuit",
            "Textures/chengbao",
        ],
    },
    9: {
        "name": "Shops, Gift Packs, VIP Privilege & Gacha",
        "groups": ["shop"],
        "atlases": [
            "UI_SYS_Shop",
            "UI_Activity_Exchange_Shop",
            "PayMethod",
            "NativePayment",
            "UI_Activity_Gift",
            "UI_Goldbrick",
            "UI_SYS_FirstPay",
            "UI_SYS_PayContinue",
            "UI_SYS_TriggerGift",
            "YearGift",
            "PushNoticeRwd",
            "UI_Privilege",
            "VipDecoration",
            "UI_SYS_Gacha",
            "UI_Gashapon",
        ],
        "tex_folders": [
            "Textures/Shop",
            "Textures/GiftBag",
            "Textures/TriggerGift",
            "Textures/StrangerPreviewGift",
            "Textures/PrivilegeList",
            "Textures/SeasonLifeCardActPanel",
            "Textures/Gacha",
        ],
    },
    10: {
        "name": "Events, Seasons S1-S5, KvK & Guild Modes",
        "groups": ["events"],
        "atlases": [
            "UI_Function",
            "Banner",
            "InfoBanner",
            "WorldBanner",
            "UI_Season",
            "UI_SeasonMemory",
            "UI_SeasonAdventure",
            "SeasonIcon_S2",
            "SeasonRanking",
            "SeasonRes_S1",
            "SeasonRes_S2",
            "SeasonRes_S3",
            "SeasonRes_S4",
            "UI_Activity",
            "UI_Activity_Alliance_Mobilization",
            "UI_Activity_ClueSign",
            "UI_Activity_Common",
            "UI_Activity_Dice",
            "UI_Activity_HorseRace",
            "UI_Activity_HorseRaceGuide",
            "UI_Activity_HorseRaceRule",
            "UI_Activity_HorseRaceSakura",
            "UI_Activity_Multiplayer",
            "UI_Activity_RichMan",
            "UI_Activity_SeasonCelebration",
            "UI_SYS_Activity",
            "UI_SYS_ActivityCalendar",
            "UI_SYS_Activity_AnniversarySlot",
            "UI_SYS_ActHeroAwake",
            "UI_SYS_ActHeroAwake2",
            "UI_SYS_ActiveAdventure",
            "UI_Kvk",
            "KVKRes_KM1",
            "KVKRes_KM2",
            "KvkTradingShip",
            "UI_GVG",
            "UI_GVG4",
            "UI_Personal_Gvg",
            "UI_Alliance_Raid",
            "UI_CrossKingCity",
            "UI_CrossIntrusion",
            "UI_DarkLegion",
            "UI_ChampionDuel",
            "UI_FortLeague",
            "UI_LegendBattlefield",
            "UI_GuildWarPreviewPanel",
            "UI_KingCityMain",
            "UI_SYS_AllianceContend",
            "UI_SYS_Arena",
            "UI_SYS_ArenaCross",
            "UI_SYS_PeakArena",
            "UI_SYS_FortressAttack",
            "UI_SYS_TerritoryDefense",
            "UI_SYS_Throne",
            "UI_Adventure",
            "UI_MineTreasure",
            "UI_SecretRealm",
            "UI_TradingShip",
        ],
        "tex_folders": [
            "Textures/ActivityList",
            "Textures/ActivityBanner",
            "Textures/Activity",
            "Textures/ServerTask",
            "Textures/SeasonHonor",
            "Textures/Season",
            "Textures/SeasonAdventure",
            "Textures/Anniversary",
            "Textures/ChristmasTree",
            "Textures/MineTreasure",
            "Textures/Adventure",
            "Textures/ActiveAdventure",
            "Textures/AllianceMilestone",
            "Textures/AllianceConsumption",
            "Textures/AncientBattlefields",
            "Textures/FortressAttack",
            "Textures/Arena",
            "Textures/Task",
            "Textures/Kingdom",
            "Textures/Throne",
            "Textures/CrossServerView",
            "Textures/Junbeijingsai",
            "Textures/SecretRealm",
        ],
    },
    11: {
        "name": "Monsters, World Bosses, Villagers & Minigames",
        "groups": ["monsters", "villagers", "minigames"],
        "atlases": [
            "UI_Monster_Head",
            "UI_Monster_Head_S1",
            "UI_Monster_Head_S2",
            "UI_Monster_Head_S3",
            "UI_Monster_Head_S4",
            "UI_Monster_Head_KM1",
            "UI_Monster_Head_KM2",
            "UI_ActMonsterRank",
            "UI_InfiniteMonsterPanel",
            "UI_Villager",
            "Nongmin",
            "VillageAnimalAtlas",
            "UI_EtherRanch",
            "EtherRanch",
            "UI_Fish",
            "FlappyFish",
            "FlappyFishS1",
            "UI_Cooking",
            "UI_Stranger_Cooking",
            "FoodLottery",
            "Paoku",
            "Skate",
            "Skate_Atlas",
            "SnowRescue",
        ],
        "tex_folders": [
            "Textures/Enemy",
            "Assets/ArtAssets/2DAssets/2DAvatar",
            "Textures/Villager",
            "Textures/FlappyFish",
            "Textures/Paoku",
            "Textures/Skate",
        ],
    },
    12: {
        "name": "Factions, Rarities, Attributes, Frames, Titles & Emojis",
        "groups": ["factions", "ui", "cosmetics"],
        "atlases": [
            "UI_Common",
            "UI_Common_V2",
            "Common",
            "CommonUI",
            "UI_Common_Rank",
            "League",
            "UI_MainUI",
            "UI_Combat",
            "UI_Team",
            "UI_SYS_Alliance",
            "UI_SYS_Alliance_V2",
            "UI_Attribute",
            "UI_Head_Frame",
            "HeadFrameAnim",
            "UI_ProfileSkin",
            "UI_PersonalInfo",
            "PlayerTitle",
            "UI_Nameplate",
            "UI_Achievement",
            "UI_SYS_Achievement",
            "UI_InfluenceLevel",
            "UI_OfficerGrade",
            "OfficerGrade",
            "OfficerGrade1",
            "UI_Chat_Bubble",
            "UI_Chat_Emotion",
            "UI_Chatskin",
            "UI_SYS_Chat",
            "Bubble_Emoji",
            "UI_Flag",
        ],
        "tex_folders": [
            "Textures/HeroRaceType",
            "Textures/UI",
            "Textures/Common",
            "Textures/Team",
            "Textures/Logo",
            "Textures/HeadFrame_resource",
            "Textures/PlayerInfo",
            "Textures/ChatEmoji",
            "Textures/KvkEmoji",
            "Textures/NoticeEmoji",
            "Textures/SkillEmoji",
            "Textures/StarEmoji",
        ],
    },
}


def route_sprite_Subdir(phase: int, source_name: str, sprite_name: str, meta: dict[str, Any]) -> str | None:
    """Determines the exact relative subfolder under `public/images/` for a sprite/texture."""
    sl = sprite_name.lower()

    if phase == 1:
        if source_name == "UI_Monster_Head":
            if sprite_name != "Head_60008":
                return None
            return "heroes/avatars"
        if source_name == "UI_Hero_Lihui":
            if re.match(r"^Lihui_100\d\d$", sprite_name):
                return "heroes/portraits"
            if sprite_name.startswith("Lihui_21"):
                return "heroes/lords"
            return "heroes/skins-portraits"
        if source_name == "UI_Hero_Head":
            if re.match(r"^Head_100\d\d$", sprite_name):
                return "heroes/avatars"
            if sprite_name.startswith("Head_21"):
                return "heroes/lords"
            return "heroes/skins-avatars"
        return "heroes/lords"

    if phase == 2:
        if source_name == "UI_Skill":
            if "artifact" in sl or "relic" in sl:
                return "skills/artifact"
            return "skills/hero"
        if source_name in ("UI_Talent", "Textures/Talent"):
            return "skills/talent"
        if source_name in ("UI_Professional", "Textures/Professional"):
            return "skills/profession"
        if source_name in ("UI_Shine_Technology", "Textures/ShineTechnology") or "radiance" in sl or "shine" in sl:
            return "tech/brilliance"
        return "tech/research"

    if phase == 3:
        if source_name == "UI_Equipment":
            if "exclusive" in sl:
                return "equipment/exclusive-weapons"
            if "lord" in sl or "txt_t" in sl:
                return "equipment/lord-gear"
            return "equipment/hero-gear"
        if source_name == "UI_Rune":
            return "equipment/runes"
        return "equipment/forge"

    if phase == 4:
        en_l = (meta.get("name_en") or "").lower()
        if sprite_name.startswith("valhalla_"):
            return "items/valhalla-spirits"
        if sprite_name.startswith("icon_10"):
            return "items/currencies"
        if sprite_name.startswith("icon_20"):
            return "items/resources"
        if "shard" in en_l or "soul stone" in en_l or "fragment" in en_l or (
            sprite_name.startswith("icon_30") and any(w in en_l for w in ("shard", "soul", "piece"))
        ):
            return "items/shards"
        if (
            sprite_name.startswith("icon_material")
            or any(
                w in en_l
                for w in ("promotion stone", "refined metal", "magic thread", "orichalcum", "blueprint", "dragon blood", "dragon essence", "skill book", "ore", "ingot", "stone")
            )
        ):
            return "items/materials"
        if (
            source_name in ("UI_SYS_OpenBox", "UI_SYS_OpenBoxEaster", "UI_SYS_Bag")
            or any(w in en_l for w in ("chest", "box", "pack", "bag", "pouch", "gift"))
            or "box" in sl
            or "chest" in sl
        ):
            return "items/chests"
        return "items/consumables"

    if phase == 5:
        if sprite_name.startswith("Artifact_"):
            return "relics/illustrations"
        if sprite_name.startswith("icon_art"):
            return "relics/shards-and-scrolls"
        return "relics/ui"

    if phase == 6:
        if source_name == "UI_Pet_Lihui":
            return "pets/illustrations"
        if source_name == "UI_Pet_Head":
            return "pets/avatars"
        if source_name in ("UI_Pet", "PalSystemCommon", "Textures/Pet"):
            return "pets/eggs-and-ui"
        if source_name in ("UI_DivineAvatar", "UI_DivineImage", "Textures/DivineAvatar"):
            return "behemoths"
        return "elves"

    if phase == 7:
        if source_name == "UI_SoldierDev_Lihui":
            return "troops/skins-portraits"
        if source_name == "UI_SoldierDev_Head":
            return "troops/skins-avatars"
        if source_name in ("UI_Army_Head", "UI_SYS_SoldierDev", "UI_SYS_Army"):
            return "troops/faction-units"
        return "troops/caravans"

    if phase == 8:
        if source_name == "Textures/Building" or sprite_name.startswith("paper_"):
            return "buildings/blueprints"
        if source_name in ("Building_DIY", "Building_DIY_Suit", "BuildingDiyNew", "Textures/Building_DIY"):
            return "buildings/diy-decorations"
        if source_name in (
            "UI_Worldskin",
            "WorldSkin",
            "WorldSkinWing",
            "UI_SYS_WorldSkinSuit",
            "Castle",
            "Castle_00",
            "Castle_01",
            "Castle_02",
            "Castle_03",
            "Castle_ZJS",
            "CastleChangeSkin",
            "CastleGift",
            "Build_castle",
            "Textures/WorldSkinSuit",
            "Textures/chengbao",
        ):
            return "buildings/castle-skins"
        return "buildings/structures"

    if phase == 9:
        if source_name in ("UI_SYS_Shop", "UI_Activity_Exchange_Shop", "PayMethod", "NativePayment"):
            return "shop/icons"
        if source_name == "Textures/Shop":
            return "shop/banners"
        if source_name in ("UI_Privilege", "VipDecoration", "Textures/PrivilegeList", "Textures/SeasonLifeCardActPanel"):
            return "shop/vip-privilege"
        if source_name in ("UI_SYS_Gacha", "UI_Gashapon", "Textures/Gacha"):
            return "shop/gacha"
        return "shop/gift-packs"

    if phase == 10:
        if source_name == "UI_Function":
            return "events/entry-icons"
        if source_name.startswith("Textures/Season") or "Season" in source_name:
            return "events/seasons"
        if source_name.startswith("Textures/") or source_name in ("Banner", "InfoBanner", "WorldBanner"):
            return "events/banners"
        return "events/kvk-and-gvg"

    if phase == 11:
        if "Monster" in source_name or source_name == "Textures/Enemy":
            return "monsters/avatars"
        if source_name in ("Assets/ArtAssets/2DAssets/2DAvatar", "Textures/Villager"):
            return "villagers/portraits"
        if source_name in ("UI_Villager", "Nongmin", "VillageAnimalAtlas"):
            return "villagers/icons"
        return "minigames/fishing-and-ranch"

    if phase == 12:
        if (
            source_name in ("Textures/HeroRaceType", "League")
            or any(w in sl for w in ("race_alliance", "race_horde", "race_nature", "bg_faction", "icon_race", "camp_"))
        ):
            return "factions"
        if source_name == "UI_Attribute":
            return "ui/attributes"
        if source_name in ("UI_Head_Frame", "HeadFrameAnim", "UI_ProfileSkin", "UI_PersonalInfo", "Textures/HeadFrame_resource", "Textures/PlayerInfo"):
            return "cosmetics/avatar-frames"
        if source_name in ("PlayerTitle", "UI_Nameplate", "UI_Achievement", "UI_SYS_Achievement", "UI_InfluenceLevel"):
            return "cosmetics/titles"
        if source_name in ("UI_OfficerGrade", "OfficerGrade", "OfficerGrade1"):
            return "cosmetics/military-ranks"
        if source_name in (
            "UI_Chat_Bubble",
            "UI_Chat_Emotion",
            "UI_Chatskin",
            "UI_SYS_Chat",
            "Bubble_Emoji",
            "UI_Flag",
            "Textures/ChatEmoji",
            "Textures/KvkEmoji",
            "Textures/NoticeEmoji",
            "Textures/SkillEmoji",
            "Textures/StarEmoji",
        ):
            return "cosmetics/chat-and-emojis"
        return "ui/rarities"

    return None


def enrich_metadata(sprite_name: str, source_name: str, sub_dir: str, cache: dict[str, Any]) -> dict[str, Any]:
    """Enriches sprite metadata using Meta.bytes cache, Locale dictionaries, and Glossary rules."""
    sprite_meta = cache["sprite_meta"]
    unit_meta = cache["unit_meta"]
    locale_by_num = cache.get("locale_by_num", {})

    base = dict(sprite_meta.get(sprite_name, {}))
    sl = sprite_name.lower()

    # Check if Lihui_<id>_skin* or Head_<id>_skin* can inherit hero info
    m_hero = re.match(r"^(?:Lihui|Head)_(\d{5})(?:_|$)", sprite_name)
    if m_hero:
        hid_str = m_hero.group(1)
        if hid_str in unit_meta:
            um = unit_meta[hid_str]
            base.setdefault("hero_id", um["game_id"])
            base.setdefault("faction", um.get("faction", ""))
            base.setdefault("quality", um.get("quality", ""))
            if not base.get("name_en"):
                if "skin" in sl:
                    base["name_en"] = f"{um['name_en']} ({sprite_name})"
                    base["name_vi"] = f"{um['name_vi']} ({sprite_name})"
                else:
                    base["name_en"] = um["name_en"]
                    base["name_vi"] = um["name_vi"]
                    base["desc_en"] = um.get("desc_en", "")
                    base["desc_vi"] = um.get("desc_vi", "")
                    base["glossary_id"] = um.get("glossary_id")
                    base["glossary_ids"] = um.get("glossary_ids", [])

    # Check Valhalla Heroic Spirits (`valhalla_icon_100xx`)
    m_val = re.match(r"^valhalla_icon_(\d{5})$", sprite_name)
    if m_val and m_val.group(1) in unit_meta:
        um = unit_meta[m_val.group(1)]
        if not base.get("name_en"):
            base["name_en"] = f"{um['name_en']} Heroic Spirit"
            base["name_vi"] = f"Linh Thể Anh Hùng {um['name_vi']}"

    # Check Monster Head_<id>
    m_mon = re.match(r"^(?:Head|Monster)_(\d{5,6})", sprite_name)
    if m_mon and m_mon.group(1) in unit_meta and not base.get("name_en"):
        um = unit_meta[m_mon.group(1)]
        base["game_id"] = um["game_id"]
        base["name_en"] = um["name_en"]
        base["name_vi"] = um["name_vi"]

    # Fallback human-readable title if name_en is still empty
    if not base.get("name_en"):
        clean = sprite_name.replace("_", " ").strip()
        base["name_en"] = clean
    if not base.get("name_vi"):
        base["name_vi"] = base["name_en"]

    # Match Glossary IDs for non-hero categories (factions, items, gear sets, events, buildings)
    en_low = (base.get("name_en") or "").lower()
    gids: list[str] = list(base.get("glossary_ids") or ([] if not base.get("glossary_id") else [base["glossary_id"]]))

    def add_gid(g: str) -> None:
        if g and g not in gids:
            gids.append(g)

    # Factions
    if sprite_name in ("race_alliance", "bg_Faction_1", "icon_race_1"):
        add_gid("faction-league")
        if sprite_name == "bg_Faction_1":
            base["name_en"] = "League Faction Banner"
            base["name_vi"] = "Banner Phe Liên Minh (League)"
        elif sprite_name == "race_alliance":
            base["name_en"] = "League Faction Crest"
            base["name_vi"] = "Huy Hiệu Phe Liên Minh (League)"
    elif sprite_name in ("race_horde", "bg_Faction_2", "icon_race_3"):
        add_gid("faction-horde")
        if sprite_name == "bg_Faction_2":
            base["name_en"] = "Horde Faction Banner"
            base["name_vi"] = "Banner Phe Bộ Lạc (Horde)"
        elif sprite_name == "race_horde":
            base["name_en"] = "Horde Faction Crest"
            base["name_vi"] = "Huy Hiệu Phe Bộ Lạc (Horde)"
    elif sprite_name in ("race_nature", "bg_Faction_3", "icon_race_2"):
        add_gid("faction-nature")
        if sprite_name == "bg_Faction_3":
            base["name_en"] = "Nature Faction Banner"
            base["name_vi"] = "Banner Phe Thiên Nhiên (Nature)"
        elif sprite_name == "race_nature":
            base["name_en"] = "Nature Faction Crest"
            base["name_vi"] = "Huy Hiệu Phe Thiên Nhiên (Nature)"

    # Items & Currencies
    if sprite_name in ("icon_30231", "icon_30232", "icon_30233") or "soul stone" in en_low:
        add_gid("item-soul-stone")
    if sprite_name in ("icon_30176", "icon_30175", "icon_30177") or "universal" in en_low and "shard" in en_low:
        add_gid("item-universal-shard")
    if "skill book" in en_low or sprite_name in ("icon_30031", "icon_30032", "icon_30033"):
        add_gid("item-skill-book")
    if "guild honor" in en_low or sprite_name == "icon_10018":
        add_gid("item-guild-honor")
    if "guild coin" in en_low or "points_guild" in sl or sprite_name in ("icon_10006", "icon_10017"):
        add_gid("item-guild-coins")
    if "promotion stone" in en_low or sprite_name in ("icon_30382", "icon_30383"):
        add_gid("item-promotion-stone")
    if "refined metal" in en_low or sprite_name == "icon_material_1":
        add_gid("item-refined-metal")
    if "magic thread" in en_low or sprite_name == "icon_material_2":
        add_gid("item-magic-thread")
    if "orichalcum" in en_low or "blueprint" in en_low or sprite_name == "icon_material_3":
        add_gid("item-blueprints-orichalcum")
    if "dragon blood" in en_low or sprite_name == "icon_material_4":
        add_gid("item-dragon-blood")
    if "dragon essence" in en_low or sprite_name == "icon_30417":
        add_gid("item-dragon-essence")
    if "glory medal" in en_low or sprite_name in ("icon_10025", "icon_30321"):
        add_gid("item-glory-medal")

    # Gear Sets
    if "titan" in en_low or "fury of blood" in en_low or "fierce" in en_low:
        add_gid("gear-set-blood-of-the-titan")
    if "knight" in en_low and sub_dir.startswith("equipment/"):
        add_gid("gear-set-knights-glory")
    if "sage" in en_low and sub_dir.startswith("equipment/"):
        add_gid("gear-set-glory-of-the-sage")

    # Buildings & Systems
    if sub_dir == "tech/brilliance" or "radiance" in sl or "brilliance" in en_low:
        add_gid("system-brilliance-institute")
    if sub_dir == "tech/research" or "research cottage" in en_low or "yanjiusuo" in sl:
        add_gid("system-research-cottage")
    if "barracks" in en_low or "training ground" in en_low or "bingying" in sl:
        add_gid("system-training-ground")
    if sub_dir == "equipment/lord-gear":
        add_gid("system-lord-gear")
    if sub_dir == "equipment/runes":
        add_gid("system-runes")
    if sub_dir.startswith("relics/"):
        add_gid("system-relics")
    if sub_dir.startswith(("pets/", "behemoths")):
        add_gid("system-pets-behemoth")
    if sub_dir.startswith("troops/skins"):
        add_gid("system-troop-skins")

    # Events
    if "guild race" in en_low or sprite_name in ("Activity_109", "Activity_110"):
        add_gid("event-guild-race")
    if "arms race" in en_low or "junbeijingsai" in sl or sprite_name in ("Activity_101", "Activity_102"):
        add_gid("event-guild-arms-race")
    if "kvk" in sl or "four nations" in en_low or "kingdom" in en_low and sub_dir.startswith("events/"):
        add_gid("event-kvk")
    if "dark empire" in en_low or "crossintrusion" in sl:
        add_gid("event-dark-empire-invasion")
    if "dark legion" in en_low or "darklegion" in sl:
        add_gid("event-dark-legion-challenge")
    if "giant" in en_low or "alliance_raid" in sl or "worldboss" in sl:
        add_gid("event-giant-raid")
    if "wheel" in en_low or "turntable" in sl or "roulette" in sl:
        add_gid("event-fortune-wheel")
    if "dice" in en_low or "richman" in sl or "monopoly" in sl:
        add_gid("event-dice-of-fate")

    base["glossary_id"] = gids[0] if gids else None
    base["glossary_ids"] = gids
    base["category"] = sub_dir
    base["source_atlas"] = source_name
    return base


def sanitize_filename(name: str) -> str:
    """Converts a sprite/texture name into a safe filesystem basename (without extension)."""
    s = re.sub(r'[<>:"/\\|?*\x00-\x1f]', "_", name.strip())
    return s or "unnamed"


# ============================================================================
# PHASE EXTRACTION ENGINE
# ============================================================================
def run_phase(phase_num: int, cache: dict[str, Any]) -> dict[str, Any]:
    cfg = PHASE_CONFIG[phase_num]
    t0 = time.time()
    print(f"\n============================================================================")
    print(f"🚀 STARTING PHASE {phase_num}: {cfg['name']}")
    print(f"============================================================================")

    bundle_offsets = cache["bundle_offsets"]
    atlas_families = cache["atlas_families"]
    tex_folders = cache["tex_folders"]

    # Collect candidate images per (sub_dir, clean_sprite_name):
    # Value: (pixel_area, pil_image, sprite_name, source_name)
    extracted_candidates: dict[tuple[str, str], tuple[int, Image.Image, str, str]] = {}
    bundle_errors = 0
    scanned_bundles = 0

    # 1. Scan SpriteAtlas families assigned to this Phase
    for fam in cfg["atlases"]:
        bfiles = atlas_families.get(fam, [])
        for bfn in bfiles:
            bpath = os.path.join(BUNDLES_DIR, bfn)
            if not os.path.exists(bpath):
                continue
            scanned_bundles += 1
            try:
                env = open_unity_bundle_readonly(bpath, bundle_offsets.get(bfn, 0))
                for obj in env.objects:
                    if obj.type.name != "Sprite":
                        continue
                    try:
                        data = obj.read()
                        sp_name = getattr(data, "m_Name", "") or ""
                        if not sp_name or sp_name.startswith("sactx-"):
                            continue
                        sub_dir = route_sprite_Subdir(
                            phase_num,
                            fam,
                            sp_name,
                            cache["sprite_meta"].get(sp_name, {}),
                        )
                        if not sub_dir:
                            continue
                        img = data.image
                        if not img or img.width <= 0 or img.height <= 0:
                            continue
                        area = img.width * img.height
                        key = (sub_dir, sanitize_filename(sp_name))
                        prev = extracted_candidates.get(key)
                        if prev is None or area >= prev[0]:
                            extracted_candidates[key] = (area, img, sp_name, fam)
                    except Exception:
                        continue
            except Exception as e:
                bundle_errors += 1
                print(f"  [WARN] Failed reading atlas bundle {bfn}: {e}")

    # 2. Scan Standalone .tex folders assigned to this Phase
    for tfolder in cfg["tex_folders"]:
        items = tex_folders.get(tfolder, [])
        for vpath, bfn in items:
            bpath = os.path.join(BUNDLES_DIR, bfn)
            if not os.path.exists(bpath):
                continue
            scanned_bundles += 1
            try:
                env = open_unity_bundle_readonly(bpath, bundle_offsets.get(bfn, 0))
                # Prefer Texture2D in .tex bundles; fallback to Sprite
                chosen_obj = None
                for obj in env.objects:
                    if obj.type.name == "Texture2D":
                        chosen_obj = obj
                        break
                    elif obj.type.name == "Sprite" and chosen_obj is None:
                        chosen_obj = obj
                if chosen_obj is None:
                    continue
                data = chosen_obj.read()
                sp_name = getattr(data, "m_Name", "") or os.path.splitext(os.path.basename(vpath))[0]
                if not sp_name:
                    continue
                sub_dir = route_sprite_Subdir(
                    phase_num,
                    tfolder,
                    sp_name,
                    cache["sprite_meta"].get(sp_name, {}),
                )
                if not sub_dir:
                    continue
                img = data.image
                if not img or img.width <= 0 or img.height <= 0:
                    continue
                area = img.width * img.height
                key = (sub_dir, sanitize_filename(sp_name))
                prev = extracted_candidates.get(key)
                if prev is None or area >= prev[0]:
                    extracted_candidates[key] = (area, img, sp_name, tfolder)
            except Exception as e:
                bundle_errors += 1
                print(f"  [WARN] Failed reading tex bundle {bfn}: {e}")

    # 3. Write .webp files and build per-group manifests
    group_assets: dict[str, list[dict[str, Any]]] = defaultdict(list)
    saved_count = 0

    for (sub_dir, safe_name), (_area, img, sp_name, source_name) in sorted(extracted_candidates.items()):
        top_group = sub_dir.split("/")[0]
        target_dir = os.path.join(OUTPUT_IMAGES_DIR, *sub_dir.split("/"))
        os.makedirs(target_dir, exist_ok=True)

        webp_filename = f"{safe_name}.webp"
        out_filepath = os.path.join(target_dir, webp_filename)
        rel_web_path = f"/images/{sub_dir}/{webp_filename}"

        try:
            if img.mode not in ("RGBA", "RGB"):
                img = img.convert("RGBA")
            img.save(out_filepath, "WEBP", quality=92)
            file_sz = os.path.getsize(out_filepath)
            saved_count += 1
        except Exception as e:
            print(f"  [WARN] Failed saving {out_filepath}: {e}")
            continue

        meta = enrich_metadata(sp_name, source_name, sub_dir, cache)
        asset_record = {
            "path": rel_web_path,
            "sprite_name": sp_name,
            "filename": webp_filename,
            "phase": phase_num,
            "group": top_group,
            "category": sub_dir,
            "source_atlas": source_name,
            "game_id": meta.get("game_id"),
            "glossary_id": meta.get("glossary_id"),
            "glossary_ids": meta.get("glossary_ids", []),
            "name_en": meta.get("name_en", sp_name),
            "name_vi": meta.get("name_vi", sp_name),
            "desc_en": meta.get("desc_en", ""),
            "desc_vi": meta.get("desc_vi", ""),
            "quality": meta.get("quality", ""),
            "faction": meta.get("faction", ""),
            "width": img.width,
            "height": img.height,
            "file_size": file_sz,
        }
        group_assets[top_group].append(asset_record)

    # Write `public/images/<group>/manifest.json` for each group in this Phase
    for grp in cfg["groups"]:
        assets_list = group_assets.get(grp, [])
        grp_dir = os.path.join(OUTPUT_IMAGES_DIR, grp)
        os.makedirs(grp_dir, exist_ok=True)
        grp_manifest_path = os.path.join(grp_dir, "manifest.json")
        grp_manifest = {
            "group": grp,
            "phase": phase_num,
            "phase_name": cfg["name"],
            "game_version": "1.125.5",
            "table_version": "1.0.42291",
            "total_assets": len(assets_list),
            "total_bytes": sum(a["file_size"] for a in assets_list),
            "generated_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
            "assets": assets_list,
        }
        with open(grp_manifest_path, "w", encoding="utf-8") as f:
            json.dump(grp_manifest, f, ensure_ascii=False, indent=2)
        print(f"  [Group '{grp}'] Saved {len(assets_list)} assets -> {grp_manifest_path}")

    elapsed = time.time() - t0
    print(
        f"✅ PHASE {phase_num} COMPLETED in {elapsed:.1f}s | "
        f"Scanned {scanned_bundles} bundles | Extracted {saved_count} .webp images | Errors: {bundle_errors}"
    )
    return {
        "phase": phase_num,
        "saved_count": saved_count,
        "scanned_bundles": scanned_bundles,
        "bundle_errors": bundle_errors,
    }


# ============================================================================
# MERGE MANIFESTS & GLOSSARY MAPPING RESOLVER
# ============================================================================
def merge_all_manifests(cache: dict[str, Any]) -> dict[str, Any]:
    print("\n============================================================================")
    print("📦 MERGING ALL PER-GROUP MANIFESTS INTO ROOT public/images/manifest.json")
    print("============================================================================")

    all_groups: list[str] = []
    for p_num in sorted(PHASE_CONFIG.keys()):
        all_groups.extend(PHASE_CONFIG[p_num]["groups"])

    all_assets: list[dict[str, Any]] = []
    groups_summary: dict[str, Any] = {}
    phases_summary: dict[str, Any] = {}

    for grp in all_groups:
        mpath = os.path.join(OUTPUT_IMAGES_DIR, grp, "manifest.json")
        if not os.path.exists(mpath):
            print(f"  [WARN] Group manifest missing: {mpath}")
            continue
        with open(mpath, "r", encoding="utf-8") as f:
            gm = json.load(f)
        assets = gm.get("assets", [])
        all_assets.extend(assets)
        groups_summary[grp] = {
            "phase": gm.get("phase"),
            "total_assets": len(assets),
            "total_bytes": sum(a.get("file_size", 0) for a in assets),
            "manifest_path": f"/images/{grp}/manifest.json",
        }
        p_key = f"phase_{gm.get('phase')}"
        if p_key not in phases_summary:
            phases_summary[p_key] = {
                "phase": gm.get("phase"),
                "name": gm.get("phase_name"),
                "groups": [],
                "total_assets": 0,
                "total_bytes": 0,
            }
        phases_summary[p_key]["groups"].append(grp)
        phases_summary[p_key]["total_assets"] += len(assets)
        phases_summary[p_key]["total_bytes"] += sum(a.get("file_size", 0) for a in assets)

    # Index assets by sprite_name and glossary_id for 100% glossary resolution
    by_sprite: dict[str, list[dict[str, Any]]] = defaultdict(list)
    by_gid: dict[str, list[dict[str, Any]]] = defaultdict(list)
    for a in all_assets:
        by_sprite[a["sprite_name"]].append(a)
        for g in a.get("glossary_ids", []):
            if g:
                by_gid[g].append(a)
        if a.get("glossary_id") and a["glossary_id"] not in a.get("glossary_ids", []):
            by_gid[a["glossary_id"]].append(a)

    # Explicit fallback sprite rules for abstract/tactical glossary terms
    FALLBACK_SPRITE_BY_GLOSSARY_ID: dict[str, list[str]] = {
        "faction-league": ["race_alliance", "bg_Faction_1"],
        "faction-horde": ["race_horde", "bg_Faction_2"],
        "faction-nature": ["race_nature", "bg_Faction_3"],
        "faction-aura": ["bg_Faction_1", "bg_Faction_2", "bg_Faction_3"],
        "faction-counter-bonus": ["race_alliance", "race_horde", "race_nature"],
        "rarity-mythic": ["Lihui_10047", "Head_10047"],
        "rarity-legendary": ["Lihui_10031", "Head_10031"],
        "rarity-epic": ["Lihui_10016", "Head_10016"],
        "rarity-rare": ["Lihui_10010", "Head_10010"],
        "tier-yellow-stars": ["icon_30176", "Head_10031"],
        "tier-red-stars": ["icon_30176", "Head_10043"],
        "tier-white-stars": ["icon_30176", "Head_10047"],
        "tier-awakening": ["icon_30231", "icon_30232", "icon_30233"],
        "role-main-tank": ["Head_10043", "Head_10048", "Head_10042"],
        "role-bruiser": ["Head_10039", "Head_10049"],
        "role-hyper-carry": ["Head_10047", "Head_10033", "Head_10041"],
        "role-support-healer": ["Head_10044", "Head_10045", "Head_10050"],
        "pos-frontline": ["Head_10043", "Head_10039"],
        "pos-midline": ["Head_10047", "Head_10033"],
        "pos-backline": ["Head_10044", "Head_10045"],
        "event-guild-race": ["Activity_109", "Activity_110", "Activity_1"],
        "event-guild-arms-race": ["Activity_101", "Activity_102", "Activity_2"],
        "event-kvk": ["Activity_1001", "Activity_1002", "Activity_3"],
        "event-dark-empire-invasion": ["Activity_103", "Activity_4"],
        "event-dark-legion-challenge": ["Activity_104", "Activity_5"],
        "event-giant-raid": ["Activity_105", "Activity_6"],
        "event-guild-rush": ["Activity_106", "Activity_7"],
        "event-fortune-wheel": ["Activity_107", "Activity_8"],
        "event-dice-of-fate": ["Activity_108", "Activity_9"],
        "item-soul-stone": ["icon_30231", "icon_30232", "icon_30233"],
        "item-universal-shard": ["icon_30176", "icon_30177", "icon_30175"],
        "item-skill-book": ["icon_30033", "icon_30032", "icon_30031"],
        "item-guild-honor": ["icon_10018", "icon_10006"],
        "item-guild-coins": ["icon_10006", "icon_10017"],
        "item-promotion-stone": ["icon_30382", "icon_30383"],
        "item-refined-metal": ["icon_material_1"],
        "item-magic-thread": ["icon_material_2"],
        "item-blueprints-orichalcum": ["icon_material_3"],
        "item-dragon-blood": ["icon_material_4"],
        "item-dragon-essence": ["icon_30417", "icon_10002"],
        "item-glory-medal": ["icon_10025", "icon_30321"],
        "system-sacred-codex": ["icon_lord_7", "icon_lord_6"],
        "meta-strict-one-queue": ["Lihui_10047", "icon_30176"],
        "meta-double-dip": ["icon_30231", "icon_30176"],
        "meta-horde-pivot": ["bg_Faction_2", "Lihui_10039", "Lihui_10041", "Lihui_10045"],
        "meta-staircase-promotion": ["race1_108", "race2_108", "race3_108"],
        "meta-guild-honor-freeze": ["icon_30231", "icon_10018"],
        "meta-smart-staggered-upgrade": ["icon_lord_7", "icon_material_3"],
        "meta-defense-baiting": ["worldskin_01", "Head_10043"],
    }

    glossary_index: dict[str, Any] = {}
    for gterm in cache["glossary_terms"]:
        gid = gterm["id"]
        matched_assets = list(by_gid.get(gid, []))

        # Hero fallback by explicit game ID
        if not matched_assets and gid in GLOSSARY_HERO_TO_GAME_ID:
            hid = GLOSSARY_HERO_TO_GAME_ID[gid]
            for sp in (f"Lihui_{hid}", f"Head_{hid}"):
                matched_assets.extend(by_sprite.get(sp, []))

        # Explicit fallback sprites
        if not matched_assets and gid in FALLBACK_SPRITE_BY_GLOSSARY_ID:
            for sp in FALLBACK_SPRITE_BY_GLOSSARY_ID[gid]:
                matched_assets.extend(by_sprite.get(sp, []))

        # Category fallback if still empty
        if not matched_assets and all_assets:
            cat = gterm["category"]
            cat_prefix = {
                "factions": "factions",
                "rarities_and_tiers": "ui/rarities",
                "roles_and_positions": "ui/rarities",
                "heroes": "heroes",
                "events": "events",
                "items_and_currencies": "items",
                "buildings_and_systems": "buildings",
                "meta_slang": "factions",
            }.get(cat, "ui")
            matched_assets = [a for a in all_assets if a["category"].startswith(cat_prefix)][:2]

        # Back-annotate the primary asset so it carries glossary_id
        for ma in matched_assets[:3]:
            if gid not in ma.get("glossary_ids", []):
                ma.setdefault("glossary_ids", []).append(gid)
            if not ma.get("glossary_id"):
                ma["glossary_id"] = gid

        paths = []
        for ma in matched_assets:
            if ma["path"] not in paths:
                paths.append(ma["path"])

        glossary_index[gid] = {
            "id": gid,
            "category": gterm["category"],
            "name_en": gterm["name_en"],
            "name_vi": gterm["name_vi"],
            "desc_en": gterm["desc_en"],
            "desc_vi": gterm["desc_vi"],
            "primary_image": paths[0] if paths else None,
            "images": paths[:6],
        }

    root_manifest = {
        "version": "1.0.0",
        "game_version": "1.125.5",
        "table_version": "1.0.42291",
        "generated_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "total_phases": 12,
        "total_groups": len(groups_summary),
        "total_assets": len(all_assets),
        "total_bytes": sum(a.get("file_size", 0) for a in all_assets),
        "total_glossary_terms": len(glossary_index),
        "phases": phases_summary,
        "groups": groups_summary,
        "glossary_index": glossary_index,
        "assets": all_assets,
    }

    root_manifest_path = os.path.join(OUTPUT_IMAGES_DIR, "manifest.json")
    with open(root_manifest_path, "w", encoding="utf-8") as f:
        json.dump(root_manifest, f, ensure_ascii=False, indent=2)

    print(
        f"✅ ROOT MANIFEST GENERATED: {root_manifest_path}\n"
        f"   • Total Assets : {root_manifest['total_assets']:,} .webp files\n"
        f"   • Total Size   : {root_manifest['total_bytes'] / (1024 * 1024):.2f} MB\n"
        f"   • Glossary Map : {len(glossary_index)} / {len(cache['glossary_terms'])} terms mapped"
    )
    return root_manifest


# ============================================================================
# COMPREHENSIVE VERIFICATION SUITE (--verify)
# ============================================================================
def verify_all_outputs() -> bool:
    print("\n============================================================================")
    print("🔍 RUNNING COMPREHENSIVE VERIFICATION SUITE (--verify)")
    print("============================================================================")

    root_manifest_path = os.path.join(OUTPUT_IMAGES_DIR, "manifest.json")
    if not os.path.exists(root_manifest_path):
        print(f"❌ FAIL: Root manifest missing at {root_manifest_path}")
        return False

    with open(root_manifest_path, "r", encoding="utf-8") as f:
        root_manifest = json.load(f)

    # 1. Verify all 19 group manifests exist and parse cleanly
    expected_groups: list[str] = []
    for p_num in sorted(PHASE_CONFIG.keys()):
        expected_groups.extend(PHASE_CONFIG[p_num]["groups"])

    for grp in expected_groups:
        gm_path = os.path.join(OUTPUT_IMAGES_DIR, grp, "manifest.json")
        if not os.path.exists(gm_path):
            print(f"❌ FAIL: Missing group manifest {gm_path}")
            return False
        with open(gm_path, "r", encoding="utf-8") as f:
            gm = json.load(f)
        if gm.get("total_assets", 0) == 0 or not gm.get("assets"):
            print(f"❌ FAIL: Group '{grp}' has 0 assets!")
            return False

    print(f"✅ All {len(expected_groups)} group manifests exist and contain valid JSON records.")

    # 2. Verify every single .webp file referenced in root manifest using Pillow
    assets = root_manifest.get("assets", [])
    corrupt_files: list[str] = []
    missing_files: list[str] = []
    bilingual_count = 0

    for a in assets:
        rel_path = a["path"].lstrip("/")
        disk_path = os.path.join(REPO_ROOT, "public", *rel_path.split("/"))
        if not os.path.exists(disk_path):
            missing_files.append(disk_path)
            continue
        if os.path.getsize(disk_path) == 0:
            corrupt_files.append(f"{disk_path} (0 bytes)")
            continue
        try:
            with Image.open(disk_path) as im:
                if im.format != "WEBP" or im.width <= 0 or im.height <= 0:
                    corrupt_files.append(f"{disk_path} (format={im.format}, size={im.size})")
        except Exception as e:
            corrupt_files.append(f"{disk_path} ({e})")

        if a.get("name_en") and a.get("name_vi"):
            bilingual_count += 1

    if missing_files or corrupt_files:
        print(f"❌ FAIL: Missing files={len(missing_files)}, Corrupt files={len(corrupt_files)}")
        for cf in (missing_files + corrupt_files)[:10]:
            print("  ", cf)
        return False

    print(
        f"✅ Verified {len(assets):,} .webp files with Pillow: "
        f"0 missing, 0 corrupt, 100% valid WEBP headers ({bilingual_count:,} with EN/VI names)."
    )

    # 3. Verify 100% of glossary.ts terms are mapped to existing .webp images
    glossary_terms = parse_glossary_ts(GLOSSARY_TS_PATH)
    g_index = root_manifest.get("glossary_index", {})
    unmapped_glossary: list[str] = []
    for gt in glossary_terms:
        gid = gt["id"]
        entry = g_index.get(gid)
        if not entry or not entry.get("primary_image"):
            unmapped_glossary.append(gid)
            continue
        p_img = entry["primary_image"].lstrip("/")
        disk_p = os.path.join(REPO_ROOT, "public", *p_img.split("/"))
        if not os.path.exists(disk_p):
            unmapped_glossary.append(f"{gid} -> dead link {p_img}")

    if unmapped_glossary:
        print(f"❌ FAIL: Unmapped glossary terms: {unmapped_glossary}")
        return False

    print(f"✅ All {len(glossary_terms)} / {len(glossary_terms)} terms in glossary.ts are mapped to valid .webp files.")
    return True


# ============================================================================
# CLI ENTRYPOINT
# ============================================================================
def main() -> None:
    parser = argparse.ArgumentParser(description="TopHeroes 12-Phase Media & Bilingual Manifest Extractor")
    parser.add_argument("--build-cache", action="store_true", help="Pre-build metadata cache JSON")
    parser.add_argument("--cache-path", type=str, default=DEFAULT_CACHE_PATH, help="Path to metadata cache JSON")
    parser.add_argument("--phase", type=str, help="Phase number(s) to run: e.g. '1', '1,2,3', or 'all'")
    parser.add_argument("--merge-manifests", action="store_true", help="Merge all group manifests into root manifest.json")
    parser.add_argument("--verify", action="store_true", help="Verify all extracted .webp images and manifests")
    args = parser.parse_args()

    if args.build_cache:
        build_metadata_cache(args.cache_path)

    if args.phase:
        cache = load_or_build_cache(args.cache_path)
        if args.phase.strip().lower() == "all":
            phases_to_run = list(range(1, 13))
        else:
            phases_to_run = [int(x.strip()) for x in args.phase.split(",") if x.strip()]
        for p in phases_to_run:
            if p not in PHASE_CONFIG:
                raise ValueError(f"Invalid phase {p}. Must be 1..12.")
            run_phase(p, cache)

    if args.merge_manifests:
        cache = load_or_build_cache(args.cache_path)
        merge_all_manifests(cache)

    if args.verify:
        ok = verify_all_outputs()
        if not ok:
            sys.exit(1)


if __name__ == "__main__":
    main()

#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Deterministic Tier-1 Visual Asset Registry Compiler for Guides Hub v4.0 (Phase 1).
Reads:
  - public/images/manifest.json
  - src/content/guides/glossary.ts
  - src/content/guides/groups/group-*/*.ts
Writes:
  - src/content/guides/asset-registry.ts
"""

from __future__ import annotations

import glob
import json
import os
import re
import sys
from typing import Any, Dict, List, Optional, Tuple

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")
if hasattr(sys.stderr, "reconfigure"):
    sys.stderr.reconfigure(encoding="utf-8")

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
PUBLIC_DIR = os.path.join(ROOT_DIR, "public")
MANIFEST_PATH = os.path.join(PUBLIC_DIR, "images", "manifest.json")
GLOSSARY_PATH = os.path.join(ROOT_DIR, "src", "content", "guides", "glossary.ts")
OUTPUT_PATH = os.path.join(ROOT_DIR, "src", "content", "guides", "asset-registry.ts")

VI_DIACRITIC_REGEX = re.compile(
    r"[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ"
    r"ÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỠỲÝỴỶỸĐ]"
)

# Explicit square-icon overrides for Factions & Rarity/Tier terms (GUARD-P1-06)
GLOSSARY_ICON_OVERRIDES: Dict[str, Tuple[str, Optional[str], str, Optional[str]]] = {
    "faction-league": (
        "/images/factions/race_alliance.webp",
        "/images/factions/bg_Faction_1.webp",
        "mythic",
        "league",
    ),
    "faction-horde": (
        "/images/factions/race_horde.webp",
        "/images/factions/bg_Faction_2.webp",
        "mythic",
        "horde",
    ),
    "faction-nature": (
        "/images/factions/race_nature.webp",
        "/images/factions/bg_Faction_3.webp",
        "mythic",
        "nature",
    ),
    "faction-aura": (
        "/images/factions/race_alliance.webp",
        "/images/factions/bg_Faction_1.webp",
        "epic",
        "neutral",
    ),
    "meta-horde-pivot": (
        "/images/factions/race_horde.webp",
        "/images/factions/bg_Faction_2.webp",
        "mythic",
        "horde",
    ),
    "meta-strict-one-queue": (
        "/images/heroes/avatars/Head_10047.webp",
        "/images/heroes/portraits/Lihui_10047.webp",
        "mythic",
        "horde",
    ),
    "rarity-mythic": (
        "/images/heroes/avatars/Head_10047.webp",
        "/images/heroes/portraits/Lihui_10047.webp",
        "mythic",
        "neutral",
    ),
    "rarity-legendary": (
        "/images/heroes/avatars/Head_10031.webp",
        "/images/heroes/portraits/Lihui_10031.webp",
        "legendary",
        "neutral",
    ),
    "rarity-epic": (
        "/images/heroes/avatars/Head_10016.webp",
        "/images/heroes/portraits/Lihui_10016.webp",
        "epic",
        "neutral",
    ),
    "rarity-rare": (
        "/images/heroes/avatars/Head_10010.webp",
        "/images/heroes/portraits/Lihui_10010.webp",
        "rare",
        "neutral",
    ),
    "gear-set-blood-of-the-titan": (
        "/images/items/consumables/icon_30222.webp",
        None,
        "mythic",
        "horde",
    ),
    "gear-set-knights-glory": (
        "/images/equipment/hero-gear/icon_40005.webp",
        None,
        "mythic",
        "league",
    ),
    "gear-set-glory-of-the-sage": (
        "/images/equipment/hero-gear/icon_40009.webp",
        None,
        "mythic",
        "nature",
    ),
}

# Supplementary non-glossary tactical assets frequently referenced in articles/tables/spotlights
SUPPLEMENTARY_ASSETS: Dict[str, Dict[str, Any]] = {
    "item-diamond": {
        "id": "item-diamond",
        "gameId": 10002,
        "glossaryId": None,
        "category": "items",
        "iconPath": "/images/items/currencies/icon_10002.webp",
        "rarity": "legendary",
        "faction": "neutral",
        "nameVi": "Kim Cương (Diamonds)",
        "nameEn": "Diamonds",
        "inGameNameVi": "Kim Cương",
        "inGameNameEn": "Diamonds",
        "descVi": "Tiền tệ cao cấp dùng cho Vòng Quay Định Mệnh, Xúc Xắc và mua lượt Sự kiện.",
        "descEn": "Premium currency prioritized for Fortune Wheel, Dice of Fate, and event stamina.",
        "aliases": ["item-diamond", "Kim Cương", "Diamonds", "Diamond", "Kim cương"],
    },
    "item-stamina": {
        "id": "item-stamina",
        "gameId": 10007,
        "glossaryId": None,
        "category": "items",
        "iconPath": "/images/items/currencies/icon_10007.webp",
        "rarity": "rare",
        "faction": "neutral",
        "nameVi": "Thể Lực (Stamina)",
        "nameEn": "Stamina",
        "inGameNameVi": "Thể Lực",
        "inGameNameEn": "Stamina",
        "descVi": "Năng lượng tiêu hao khi đánh Boss, càn quét quái bản đồ và sự kiện.",
        "descEn": "Action energy consumed when rallying bosses and hunting world map monsters.",
        "aliases": ["item-stamina", "Thể Lực", "Stamina", "Thịt"],
    },
    "gear-exclusive-weapon": {
        "id": "gear-exclusive-weapon",
        "gameId": None,
        "glossaryId": None,
        "category": "equipment",
        "iconPath": "/images/equipment/exclusive-weapons/equipment_Exclusive006.webp",
        "rarity": "mythic",
        "faction": "neutral",
        "nameVi": "Vũ Khí Độc Quyền (Exclusive Weapon)",
        "nameEn": "Exclusive Weapon",
        "inGameNameVi": "Vũ Khí Độc Quyền",
        "inGameNameEn": "Exclusive Weapon",
        "descVi": "Trang bị trấn phái mở khóa kỹ năng đột phá riêng cho từng Tướng Vàng/Đỏ.",
        "descEn": "Signature hero weapon unlocking passive breakpoints at +5, +10, and +20.",
        "aliases": ["gear-exclusive-weapon", "Vũ Khí Độc Quyền", "Exclusive Weapon", "Exclusive Gear", "VKĐQ"],
    },
    "behemoth-bear": {
        "id": "behemoth-bear",
        "gameId": None,
        "glossaryId": None,
        "category": "pets-behemoths",
        "iconPath": "/images/behemoths/SacredBeast_001.webp",
        "rarity": "mythic",
        "faction": "neutral",
        "nameVi": "Cự Thú Hộ Vệ (Guardian Behemoth)",
        "nameEn": "Guardian Behemoth",
        "inGameNameVi": "Cự Thú",
        "inGameNameEn": "Behemoth",
        "descVi": "Thần thú khổng lồ gia tăng chỉ số toàn đội và kỹ năng dẫm đạp diện rộng.",
        "descEn": "Colossal war beast providing queue-wide stat amplification and AoE shockwaves.",
        "aliases": ["behemoth-bear", "Cự Thú", "Behemoth", "Thần Thú"],
    },
}


def assert_file_exists(web_path: str, context: str) -> None:
    assert web_path.startswith("/images/"), f"{context}: Invalid prefix {web_path}"
    disk_path = os.path.join(PUBLIC_DIR, web_path.lstrip("/").replace("/", os.sep))
    assert os.path.exists(disk_path), f"{context}: Missing file on disk: {disk_path}"


def assert_no_vi_diacritics(text: str, context: str) -> None:
    if VI_DIACRITIC_REGEX.search(text):
        raise AssertionError(f"{context}: Leaked Vietnamese diacritics in EN string: {text!r}")


def parse_glossary_ts() -> List[Dict[str, Any]]:
    with open(GLOSSARY_PATH, "r", encoding="utf-8") as f:
        content = f.read()

    array_start = content.find("export const GUIDE_GLOSSARY")
    assert array_start != -1, "Could not find GUIDE_GLOSSARY in glossary.ts"
    array_end = content.find("export const GLOSSARY_BY_ID", array_start)
    body = content[array_start : array_end if array_end != -1 else len(content)]

    starts = [m.start() for m in re.finditer(r'\{\s*\n\s*id:\s*"', body)]
    entries: List[Dict[str, Any]] = []

    for idx, start_pos in enumerate(starts):
        end_pos = starts[idx + 1] if idx + 1 < len(starts) else len(body)
        chunk = body[start_pos:end_pos]

        id_m = re.search(r'id:\s*"([^"]+)"', chunk)
        cat_m = re.search(r'category:\s*"([^"]+)"', chunk)
        term_m = re.search(
            r'term:\s*\{\s*vi:\s*"((?:\\"|[^"])*)",\s*en:\s*"((?:\\"|[^"])*)"\s*\}',
            chunk,
            re.DOTALL,
        )
        def_m = re.search(
            r'definition:\s*\{\s*vi:\s*"((?:\\"|[^"])*)",\s*en:\s*"((?:\\"|[^"])*)"\s*,?\s*\}',
            chunk,
            re.DOTALL,
        )
        aliases_m = re.search(r'aliases:\s*\{(.*?)\}\s*,', chunk, re.DOTALL)
        hero_meta_m = re.search(
            r'heroMeta:\s*\{\s*faction:\s*"([^"]+)",\s*rarity:\s*"([^"]+)"'
            r'(?:,\s*isAwakenable:\s*(true|false))?'
            r'(?:,\s*isEconomyPassive:\s*(true|false))?\s*\}',
            chunk,
        )

        assert id_m and cat_m and term_m and def_m, f"Failed to parse chunk: {chunk[:120]}"
        tid = id_m.group(1)
        cat = cat_m.group(1)
        term_vi = term_m.group(1).replace('\\"', '"')
        term_en = term_m.group(2).replace('\\"', '"')
        def_vi = def_m.group(1).replace('\\"', '"')
        def_en = def_m.group(2).replace('\\"', '"')

        aliases: List[str] = []
        if aliases_m:
            aliases = [
                a.replace('\\"', '"')
                for a in re.findall(r'"((?:\\"|[^"])*)"', aliases_m.group(1))
            ]

        hero_meta = None
        if hero_meta_m:
            hero_meta = {
                "faction": hero_meta_m.group(1),
                "rarity": hero_meta_m.group(2),
                "isAwakenable": hero_meta_m.group(3) == "true",
                "isEconomyPassive": hero_meta_m.group(4) == "true",
            }

        ingame_vi = term_vi.split("(")[0].strip()
        ingame_en = term_en.split("(")[0].strip()

        entries.append(
            {
                "id": tid,
                "category": cat,
                "vi": term_vi,
                "en": term_en,
                "inGameVi": ingame_vi,
                "inGameEn": ingame_en,
                "aliases": aliases,
                "descriptionVi": def_vi,
                "descriptionEn": def_en,
                "heroMeta": hero_meta,
            }
        )

    assert len(entries) == 111, f"Expected 111 glossary terms, got {len(entries)}"
    return entries


def map_category(glossary_cat: str, term_id: str) -> str:
    if glossary_cat == "heroes" or term_id.startswith("hero-"):
        return "heroes"
    if term_id.startswith("gear-") or term_id in ("system-lord-gear", "system-runes"):
        return "equipment"
    if term_id == "system-relics" or term_id.startswith("relic-"):
        return "relics"
    if term_id == "system-pets-behemoth" or term_id.startswith(("pet-", "behemoth-")):
        return "pets-behemoths"
    if glossary_cat == "buildings_and_systems" or term_id.startswith("building-"):
        return "buildings-decor"
    if glossary_cat == "events" or term_id.startswith("event-"):
        return "events-seasons"
    if glossary_cat in ("roles_and_positions", "meta_slang", "rarities_and_tiers"):
        return "skills-tech"
    return "items"


def infer_rarity_from_term(term_id: str, glossary_cat: str) -> str:
    if any(k in term_id for k in ("mythic", "soul-stone", "blood-of-the-titan", "knights-glory", "glory-of-the-sage", "exclusive", "red-stars", "awakening", "horde-pivot", "strict-one-queue")):
        return "mythic"
    if any(k in term_id for k in ("legendary", "universal-shard", "skill-book", "diamond", "white-stars", "yellow-stars", "fortune-wheel", "dice-of-fate", "kvk", "guild-arms-race")):
        return "legendary"
    if glossary_cat in ("events", "buildings_and_systems", "factions") or "epic" in term_id:
        return "epic"
    return "rare"


def build_exclusive_weapons_by_hero(manifest: Dict[str, Any]) -> Dict[int, Dict[str, Any]]:
    by_hero: Dict[int, Dict[str, Any]] = {}
    for asset in manifest.get("assets", []):
        if asset.get("group") == "equipment" and asset.get("subgroup") == "exclusive-weapons":
            gid = asset.get("game_id")
            web_path = "/" + asset["path"]
            if gid == 11025:
                by_hero[10025] = {"path": web_path, "vi": asset.get("name_vi"), "en": asset.get("name_en")}
            elif isinstance(gid, int) and 10001 <= gid <= 10054:
                by_hero[gid] = {"path": web_path, "vi": asset.get("name_vi"), "en": asset.get("name_en")}
    return by_hero


def scan_media_spotlights() -> List[Dict[str, str]]:
    files = sorted(
        glob.glob(os.path.join(ROOT_DIR, "src", "content", "guides", "groups", "group-*", "*.ts"))
    )
    spotlights: List[Dict[str, str]] = []
    for fp in files:
        with open(fp, "r", encoding="utf-8") as f:
            txt = f.read()
        for m in re.finditer(r'type:\s*["\']media_spotlight["\']', txt):
            window = txt[m.start() : m.start() + 900]
            mc = re.search(r'mediaCode:\s*["\']([^"\']+)["\']', window)
            tr = re.search(r'tier:\s*["\']([^"\']+)["\']', window)
            t_vi = re.search(r'title:\s*\{\s*vi:\s*(?:"([^"]*)"|\'([^\']*)\')', window, re.DOTALL)
            t_en = re.search(r'title:\s*\{[^}]*en:\s*(?:"([^"]*)"|\'([^\']*)\')', window, re.DOTALL)
            assert mc and tr, f"Missing mediaCode/tier in {fp} near {window[:120]}"
            spotlights.append(
                {
                    "mediaCode": mc.group(1),
                    "tier": tr.group(1),
                    "titleVi": (t_vi.group(1) or t_vi.group(2) or "") if t_vi else "",
                    "titleEn": (t_en.group(1) or t_en.group(2) or "") if t_en else "",
                }
            )
    assert len(spotlights) == 91, f"Expected 91 media_spotlight blocks, got {len(spotlights)}"
    return spotlights


def select_showcase_for_spotlight(
    sp: Dict[str, str],
    asset_registry: Dict[str, Dict[str, Any]],
) -> List[Dict[str, Any]]:
    code = sp["mediaCode"]
    text = f"{code} {sp['titleVi']} {sp['titleEn']}".lower()

    def make_item(asset_id: str, badge: str, label_vi: Optional[str] = None, label_en: Optional[str] = None) -> Dict[str, Any]:
        entry = asset_registry[asset_id]
        l_vi = label_vi or entry["nameVi"]
        l_en = label_en or entry["nameEn"]
        assert_no_vi_diacritics(l_en, f"Showcase[{code} -> {asset_id}]")
        return {
            "assetId": asset_id,
            "iconPath": entry["iconPath"],
            "rarity": entry["rarity"],
            "faction": entry.get("faction", "neutral"),
            "labelVi": l_vi,
            "labelEn": l_en,
            "badgeText": badge,
        }

    if sp["tier"] == "tier1_faction_loop" or "faction" in text or "phe" in text or code in ("MED-1.1-03", "MED-2.3-01", "MED-2.3-02", "MED-2.3-03"):
        return [
            make_item("faction-horde", "HORDE", "Bộ Lạc (Horde)", "Horde Faction"),
            make_item("faction-league", "LEAGUE", "Liên Minh (League)", "League Faction"),
            make_item("faction-nature", "NATURE", "Thiên Nhiên (Nature)", "Nature Faction"),
            make_item("hero-wukong", "UR CARRY", "Tôn Ngộ Không", "Wukong"),
            make_item("hero-paragon", "UR CARRY", "Thiện Xạ", "Paragon"),
            make_item("hero-tidecaller", "UR CARRY", "Triệu Hồi Thủy Triều", "Tidecaller"),
        ]
    if any(k in text for k in ("gear", "trang bị", "set", "titan", "forge", "rèn", "med-5.2")):
        return [
            make_item("gear-set-blood-of-the-titan", "HORDE SET"),
            make_item("gear-set-knights-glory", "LEAGUE SET"),
            make_item("gear-set-glory-of-the-sage", "NATURE SET"),
            make_item("system-lord-gear", "LORD GEAR"),
        ]
    if any(k in text for k in ("relic", "thánh vật", "cổ vật", "med-5.3")):
        return [
            make_item("system-relics", "RELIC SYSTEM"),
            make_item("gear-exclusive-weapon", "EXCLUSIVE"),
            make_item("item-soul-stone", "SOUL STONE"),
            make_item("item-promotion-stone", "PROMOTION"),
        ]
    if any(k in text for k in ("pet", "thú cưng", "behemoth", "cự thú", "med-6.1", "med-6.2", "med-6.3")):
        return [
            make_item("system-pets-behemoth", "COMPANION"),
            make_item("behemoth-bear", "BEHEMOTH"),
            make_item("hero-beastmaster", "BEASTMASTER"),
            make_item("hero-tidecaller", "SUMMON CARRY"),
        ]
    if any(k in text for k in ("shard", "mảnh", "awaken", "thức tỉnh", "soul", "hồn đá", "sao", "star", "med-2.4")):
        return [
            make_item("item-universal-shard", "560 SHARDS"),
            make_item("item-soul-stone", "9 SOUL STONES"),
            make_item("item-skill-book", "SKILL BOOKS"),
            make_item("hero-storm-maiden", "FIRST MYTHIC"),
        ]
    if any(k in text for k in ("building", "lâu đài", "queue", "hàng đợi", "thợ", "hospital", "bệnh viện", "statue", "tượng", "med-1.2", "med-4.")):
        return [
            make_item("system-research-cottage", "RESEARCH"),
            make_item("system-brilliance-institute", "BRILLIANCE"),
            make_item("system-training-ground", "BARRACKS"),
            make_item("system-sacred-codex", "CODEX"),
        ]
    if any(k in text for k in ("event", "sự kiện", "kvk", "gar", "wheel", "vòng quay", "gacha", "chess", "dice", "bảng xếp hạng", "med-7.", "med-8.")):
        return [
            make_item("event-guild-arms-race", "GAR EVENT"),
            make_item("event-kvk", "KVK WAR"),
            make_item("event-fortune-wheel", "WHEEL"),
            make_item("event-dice-of-fate", "DICE EVENT"),
        ]
    if any(k in text for k in ("vip", "pack", "gói", "shop", "cửa hàng", "kim cương", "diamond", "med-1.3", "med-3.")):
        return [
            make_item("item-diamond", "DIAMOND"),
            make_item("item-universal-shard", "SSR SHARD"),
            make_item("item-guild-honor", "GUILD HONOR"),
            make_item("hero-pyromancer", "CORE CARRY"),
        ]
    return [
        make_item("hero-pyromancer", "STARTER CARRY"),
        make_item("hero-wukong", "HORDE META"),
        make_item("hero-tidecaller", "NATURE META"),
        make_item("item-universal-shard", "CORE RESOURCE"),
    ]


def main() -> None:
    with open(MANIFEST_PATH, "r", encoding="utf-8") as f:
        manifest = json.load(f)

    glossary_index = manifest.get("glossary_index", {})
    glossary_terms = parse_glossary_ts()
    exclusive_by_hero = build_exclusive_weapons_by_hero(manifest)

    asset_registry: Dict[str, Dict[str, Any]] = {}
    hero_profiles: Dict[str, Dict[str, Any]] = {}
    used_hero_gids = set()

    # 1. Build 51 SSoT Glossary Heroes first (with GUARD-P1-05 Wukong=10047 vs Wanderer=10029)
    for term in glossary_terms:
        if term["category"] != "heroes":
            continue
        tid = term["id"]
        g_idx = glossary_index.get(tid, {})
        prim = g_idx.get("primary_image", "")

        if tid == "hero-wukong":
            gid = 10047
        elif tid == "hero-wanderer":
            gid = 10029
        elif tid == "hero-boar":
            gid = 60008
        else:
            m_gid = re.search(r"(\d{5})", prim)
            assert m_gid, f"Could not extract hero gameId for {tid} from {prim}"
            gid = int(m_gid.group(1))

        used_hero_gids.add(gid)
        hm = term.get("heroMeta") or {"faction": "league", "rarity": "legendary", "isAwakenable": False, "isEconomyPassive": False}
        avatar_path = f"/images/heroes/avatars/Head_{gid}.webp"
        portrait_path = f"/images/heroes/portraits/Lihui_{gid}.webp" if gid != 60008 else avatar_path
        assert_file_exists(avatar_path, f"Hero[{tid}].avatarPath")
        assert_file_exists(portrait_path, f"Hero[{tid}].portraitPath")

        ew = exclusive_by_hero.get(gid)
        if ew:
            assert_file_exists(ew["path"], f"Hero[{tid}].exclusiveWeaponPath")

        assert_no_vi_diacritics(term["en"], f"Hero[{tid}].nameEn")
        assert_no_vi_diacritics(term["inGameEn"], f"Hero[{tid}].inGameNameEn")

        profile_obj: Dict[str, Any] = {
            "id": tid,
            "gameId": gid,
            "glossaryId": tid,
            "faction": hm["faction"],
            "rarity": hm["rarity"],
            "nameVi": term["vi"],
            "nameEn": term["en"],
            "inGameNameVi": term["inGameVi"],
            "inGameNameEn": term["inGameEn"],
            "avatarPath": avatar_path,
            "portraitPath": portrait_path,
            "isAwakenable": bool(hm.get("isAwakenable", False)),
            "isEconomyPassive": bool(hm.get("isEconomyPassive", False)),
        }
        if ew:
            profile_obj["exclusiveWeaponPath"] = ew["path"]
            if ew.get("vi"):
                profile_obj["exclusiveWeaponNameVi"] = ew["vi"]
            if ew.get("en"):
                profile_obj["exclusiveWeaponNameEn"] = ew["en"]

        hero_profiles[tid] = profile_obj

    # Add remaining client heroes from 10001..10054 so all 54 Lihui portraits + Boar (60008) = 55 profiles exist
    extra_hero_names: Dict[int, Tuple[str, str, str, str, str]] = {
        10006: ("hero-wizard", "league", "rare", "Phù Thủy (Wizard)", "Wizard"),
        10007: ("hero-archer", "nature", "rare", "Xạ Thủ (Archer)", "Archer"),
        10009: ("hero-inventor", "league", "legendary", "Nhà Phát Minh (Inventor)", "Inventor"),
        10026: ("hero-butcher", "horde", "rare", "Đồ Tể (Butcher)", "Butcher"),
        10053: ("hero-storm-oracle", "nature", "mythic", "Tiên Tri Sấm Sét (Storm Oracle)", "Storm Oracle"),
    }
    for gid in range(10001, 10055):
        if gid in used_hero_gids:
            continue
        extra_id, faction, rarity, name_vi, name_en = extra_hero_names.get(
            gid, (f"hero-unit-{gid}", "league", "epic", f"Anh Hùng #{gid}", f"Hero #{gid}")
        )
        avatar_path = f"/images/heroes/avatars/Head_{gid}.webp"
        portrait_path = f"/images/heroes/portraits/Lihui_{gid}.webp"
        assert_file_exists(avatar_path, f"ExtraHero[{extra_id}].avatarPath")
        assert_file_exists(portrait_path, f"ExtraHero[{extra_id}].portraitPath")
        ew = exclusive_by_hero.get(gid)

        profile_obj = {
            "id": extra_id,
            "gameId": gid,
            "glossaryId": None,
            "faction": faction,
            "rarity": rarity,
            "nameVi": name_vi,
            "nameEn": name_en,
            "inGameNameVi": name_vi.split("(")[0].strip(),
            "inGameNameEn": name_en,
            "avatarPath": avatar_path,
            "portraitPath": portrait_path,
            "isAwakenable": False,
            "isEconomyPassive": False,
        }
        if ew:
            profile_obj["exclusiveWeaponPath"] = ew["path"]
        hero_profiles[extra_id] = profile_obj

    # 2. Build all 111 Glossary Terms into GAME_ASSET_REGISTRY
    for term in glossary_terms:
        tid = term["id"]
        assert_no_vi_diacritics(term["en"], f"Glossary[{tid}].en")
        assert_no_vi_diacritics(term["descriptionEn"], f"Glossary[{tid}].descriptionEn")

        if tid in hero_profiles:
            hp = hero_profiles[tid]
            icon_path = hp["avatarPath"]
            portrait_path = hp["portraitPath"]
            rarity = hp["rarity"]
            faction = hp["faction"]
            game_id = hp["gameId"]
        elif tid in GLOSSARY_ICON_OVERRIDES:
            icon_path, portrait_path, rarity, faction = GLOSSARY_ICON_OVERRIDES[tid]
            game_id = None
        else:
            g_idx = glossary_index.get(tid, {})
            icon_path = g_idx.get("primary_image", "/images/items/currencies/icon_10002.webp")
            portrait_path = None
            rarity = infer_rarity_from_term(tid, term["category"])
            faction = "neutral"
            game_id = None

        assert_file_exists(icon_path, f"Glossary[{tid}].iconPath")
        if portrait_path:
            assert_file_exists(portrait_path, f"Glossary[{tid}].portraitPath")

        all_aliases = list(
            dict.fromkeys(
                [
                    tid,
                    term["vi"],
                    term["en"],
                    term["inGameVi"],
                    term["inGameEn"],
                    *term["aliases"],
                ]
            )
        )

        entry_obj: Dict[str, Any] = {
            "id": tid,
            "gameId": game_id,
            "glossaryId": tid,
            "category": map_category(term["category"], tid),
            "iconPath": icon_path,
            "rarity": rarity,
            "faction": faction,
            "nameVi": term["vi"],
            "nameEn": term["en"],
            "inGameNameVi": term["inGameVi"],
            "inGameNameEn": term["inGameEn"],
            "descVi": term["descriptionVi"],
            "descEn": term["descriptionEn"],
            "aliases": all_aliases,
        }
        if portrait_path:
            entry_obj["portraitPath"] = portrait_path

        asset_registry[tid] = entry_obj

    # Add extra client heroes & supplementary tactical assets to asset_registry
    for hero_id, hp in hero_profiles.items():
        if hero_id not in asset_registry:
            asset_registry[hero_id] = {
                "id": hero_id,
                "gameId": hp["gameId"],
                "glossaryId": None,
                "category": "heroes",
                "iconPath": hp["avatarPath"],
                "portraitPath": hp["portraitPath"],
                "rarity": hp["rarity"],
                "faction": hp["faction"],
                "nameVi": hp["nameVi"],
                "nameEn": hp["nameEn"],
                "inGameNameVi": hp["inGameNameVi"],
                "inGameNameEn": hp["inGameNameEn"],
                "descVi": hp["nameVi"],
                "descEn": hp["nameEn"],
                "aliases": [hero_id, hp["nameVi"], hp["nameEn"], hp["inGameNameVi"], hp["inGameNameEn"]],
            }

    for sup_id, sup_obj in SUPPLEMENTARY_ASSETS.items():
        assert_file_exists(sup_obj["iconPath"], f"Supplementary[{sup_id}].iconPath")
        assert_no_vi_diacritics(sup_obj["nameEn"], f"Supplementary[{sup_id}].nameEn")
        assert_no_vi_diacritics(sup_obj["descEn"], f"Supplementary[{sup_id}].descEn")
        asset_registry[sup_id] = sup_obj

    # 3. Build 91 MediaSpotlight showcase decks
    spotlights = scan_media_spotlights()
    media_showcase_by_code: Dict[str, List[Dict[str, Any]]] = {}
    for sp in spotlights:
        media_showcase_by_code[sp["mediaCode"]] = select_showcase_for_spotlight(sp, asset_registry)

    # 4. Build O(1) normalized alias lookup map
    alias_map: Dict[str, str] = {}
    for aid, entry in sorted(asset_registry.items()):
        for raw_alias in entry["aliases"]:
            norm = raw_alias.strip().lower()
            if len(norm) >= 2 and norm not in alias_map:
                alias_map[norm] = aid

    explicit_aliases = {
        "mảnh": "item-universal-shard",
        "mảnh vàng": "item-universal-shard",
        "mảnh tướng": "item-universal-shard",
        "mảnh vạn năng": "item-universal-shard",
        "shards": "item-universal-shard",
        "universal shard": "item-universal-shard",
        "universal shards": "item-universal-shard",
        "legendary shard": "item-universal-shard",
        "mythic shard": "item-universal-shard",
        "hồn đá": "item-soul-stone",
        "hồn đá đỏ": "item-soul-stone",
        "soul stone": "item-soul-stone",
        "soul stones": "item-soul-stone",
        "sách": "item-skill-book",
        "sách kỹ năng": "item-skill-book",
        "skill book": "item-skill-book",
        "skill books": "item-skill-book",
        "điểm vinh dự": "item-guild-honor",
        "điểm vinh dự bang": "item-guild-honor",
        "guild honor": "item-guild-honor",
        "kim cương": "item-diamond",
        "diamonds": "item-diamond",
        "diamond": "item-diamond",
        "thể lực": "item-stamina",
        "stamina": "item-stamina",
        "đá thăng cấp": "item-promotion-stone",
        "promotion stone": "item-promotion-stone",
        "promotion stones": "item-promotion-stone",
        "vũ khí độc quyền": "gear-exclusive-weapon",
        "exclusive weapon": "gear-exclusive-weapon",
        "exclusive gear": "gear-exclusive-weapon",
        "blood of the titan": "gear-set-blood-of-the-titan",
        "máu titan": "gear-set-blood-of-the-titan",
        "knight's glory": "gear-set-knights-glory",
        "kỵ sĩ vinh quang": "gear-set-knights-glory",
        "glory of the sage": "gear-set-glory-of-the-sage",
        "vinh quang hiền triết": "gear-set-glory-of-the-sage",
        "gar": "event-guild-arms-race",
        "kvk": "event-kvk",
        "gar / kvk": "event-guild-arms-race",
    }
    alias_map.update(explicit_aliases)

    # 5. Emit TypeScript SSoT file
    ts_lines = [
        "// AUTO-GENERATED BY scripts/build-guides-media-index.py — DO NOT EDIT MANUALLY",
        'import type {',
        '  DiagramNodeLookupInput,',
        '  GameAssetEntry,',
        '  HeroVisualProfile,',
        '  LocalizedText,',
        '  MediaAnnotationPin,',
        '  MediaShowcaseItem,',
        '} from "./types";',
        "",
        f"export const GAME_ASSET_REGISTRY: Readonly<Record<string, GameAssetEntry>> = {json.dumps(asset_registry, ensure_ascii=False, indent=2, sort_keys=True)};",
        "",
        f"export const HERO_VISUAL_PROFILES: Readonly<Record<string, HeroVisualProfile>> = {json.dumps(hero_profiles, ensure_ascii=False, indent=2, sort_keys=True)};",
        "",
        f"export const MEDIA_SHOWCASE_BY_CODE: Readonly<Record<string, readonly MediaShowcaseItem[]>> = {json.dumps(media_showcase_by_code, ensure_ascii=False, indent=2, sort_keys=True)};",
        "",
        f"const RAW_ALIAS_LOOKUP: Readonly<Record<string, string>> = {json.dumps(alias_map, ensure_ascii=False, indent=2, sort_keys=True)};",
        "",
        "export const ALIAS_LOOKUP_MAP: ReadonlyMap<string, string> = new Map(Object.entries(RAW_ALIAS_LOOKUP));",
        "",
        "const QUANTITATIVE_PREFIX_REGEX = /^[+\\-]?\\d[\\d.,/%*xX+\\-\\s]*(?:k|m|b|tr|tỷ|sao|stars?|tầng|tiers?|lv\\.?\\d*)?\\s+/i;",
        "const PAREN_SPLIT_REGEX = /[()\\[\\]•|—–:\\/]+/;",
        "const EMOJI_STRIP_REGEX = /[\\u{1F300}-\\u{1FAFF}\\u{2600}-\\u{27BF}⭐🌟🔥💧🌿⚡🛡️⚔️👑💎🏆🎯📌✅❌⚠️]/gu;",
        "",
        "function normalizeLookupKey(raw: string): string {",
        "  return raw",
        "    .replace(EMOJI_STRIP_REGEX, ' ')",
        "    .replace(/\\s+/g, ' ')",
        "    .trim()",
        "    .toLowerCase();",
        "}",
        "",
        "export function getAssetById(id: string): GameAssetEntry | undefined {",
        "  return GAME_ASSET_REGISTRY[id];",
        "}",
        "",
        "export function getAssetByGlossaryId(glossaryId: string): GameAssetEntry | undefined {",
        "  return GAME_ASSET_REGISTRY[glossaryId];",
        "}",
        "",
        "export function getHeroVisualProfile(idOrName: string): HeroVisualProfile | undefined {",
        "  if (HERO_VISUAL_PROFILES[idOrName]) return HERO_VISUAL_PROFILES[idOrName];",
        "  const asset = resolveEntityFromCodeToken(idOrName);",
        "  if (asset && HERO_VISUAL_PROFILES[asset.id]) return HERO_VISUAL_PROFILES[asset.id];",
        "  return undefined;",
        "}",
        "",
        "export function resolveEntityFromCodeToken(tokenText: string): GameAssetEntry | undefined {",
        "  if (!tokenText || tokenText.length < 2) return undefined;",
        "  const norm = normalizeLookupKey(tokenText);",
        "  if (!norm || /^[#$+\\-]?\\d+[\\d.,/%xX*+\\-]*$/.test(norm) || /^lv\\.?\\s*\\d+$/i.test(norm)) {",
        "    return undefined;",
        "  }",
        "  const directId = ALIAS_LOOKUP_MAP.get(norm);",
        "  if (directId) return GAME_ASSET_REGISTRY[directId];",
        "",
        "  const stripped = norm.replace(QUANTITATIVE_PREFIX_REGEX, '').trim();",
        "  if (stripped && stripped !== norm) {",
        "    const strippedId = ALIAS_LOOKUP_MAP.get(stripped);",
        "    if (strippedId) return GAME_ASSET_REGISTRY[strippedId];",
        "  }",
        "",
        "  const segments = norm.split(PAREN_SPLIT_REGEX).map((s) => s.trim()).filter(Boolean);",
        "  for (const seg of segments) {",
        "    const segId = ALIAS_LOOKUP_MAP.get(seg);",
        "    if (segId) return GAME_ASSET_REGISTRY[segId];",
        "    const segStripped = seg.replace(QUANTITATIVE_PREFIX_REGEX, '').trim();",
        "    if (segStripped) {",
        "      const segStrippedId = ALIAS_LOOKUP_MAP.get(segStripped);",
        "      if (segStrippedId) return GAME_ASSET_REGISTRY[segStrippedId];",
        "    }",
        "  }",
        "  return undefined;",
        "}",
        "",
        "export function resolveEntityFromTableCell(cellText: string): GameAssetEntry | undefined {",
        "  if (!cellText) return undefined;",
        "  const cleaned = cellText.replace(/\\*\\*/g, '').replace(/`/g, '').trim();",
        "  return resolveEntityFromCodeToken(cleaned);",
        "}",
        "",
        "export function resolveEntityFromDiagramNode(",
        "  input: DiagramNodeLookupInput | string,",
        "  legacySubtitle?: string,",
        "  legacyMediaCode?: string",
        "): GameAssetEntry | undefined {",
        "  const candidates: string[] = [];",
        "  if (typeof input === 'string') {",
        "    candidates.push(input);",
        "    if (legacySubtitle) candidates.push(legacySubtitle);",
        "  } else {",
        "    if (input.titleEn) candidates.push(input.titleEn);",
        "    if (input.titleVi) candidates.push(input.titleVi);",
        "    if (input.subtitleEn) candidates.push(input.subtitleEn);",
        "    if (input.subtitleVi) candidates.push(input.subtitleVi);",
        "    if (input.nodeId) candidates.push(input.nodeId);",
        "  }",
        "  for (const candidate of candidates) {",
        "    const exact = resolveEntityFromCodeToken(candidate);",
        "    if (exact) return exact;",
        "  }",
        "  const code = typeof input === 'string' ? legacyMediaCode : input.mediaCode;",
        "  if (code && MEDIA_SHOWCASE_BY_CODE[code]?.length) {",
        "    const fallbackAssetId = MEDIA_SHOWCASE_BY_CODE[code][0].assetId;",
        "    return GAME_ASSET_REGISTRY[fallbackAssetId];",
        "  }",
        "  return undefined;",
        "}",
        "",
        "export function getMediaShowcaseItems(",
        "  mediaCode: string,",
        "  _title?: LocalizedText,",
        "  _annotations?: readonly MediaAnnotationPin[]",
        "): readonly MediaShowcaseItem[] {",
        "  return MEDIA_SHOWCASE_BY_CODE[mediaCode] ?? MEDIA_SHOWCASE_BY_CODE['MED-1.1-01'] ?? [];",
        "}",
        "",
    ]

    with open(OUTPUT_PATH, "w", encoding="utf-8", newline="\n") as f:
        f.write("\n".join(ts_lines))

    print(
        f"[OK] Generated {OUTPUT_PATH}: "
        f"{len(asset_registry)} assets, {len(hero_profiles)} heroes, "
        f"{len(media_showcase_by_code)} media spotlights, {len(alias_map)} O(1) aliases."
    )


if __name__ == "__main__":
    main()

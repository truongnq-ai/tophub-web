#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Deterministic Tier-1 Visual Asset Registry Compiler for Guides Hub v4.0 (Phase 1 & Phase 2).
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
    "item-speedup": {
        "id": "item-speedup",
        "gameId": None,
        "glossaryId": None,
        "category": "items",
        "iconPath": "/images/ui/rarities/icon_speedUp.webp",
        "rarity": "rare",
        "faction": "neutral",
        "nameVi": "Tăng Tốc (Speedups)",
        "nameEn": "Speedups",
        "inGameNameVi": "Tăng Tốc",
        "inGameNameEn": "Speedups",
        "descVi": "Vật phẩm rút ngắn thời gian Xây dựng, Nghiên cứu, Luyện lính và Trị thương.",
        "descEn": "Time-reduction consumables for Construction, Research, Troop Training, and Healing.",
        "aliases": ["item-speedup", "Tăng Tốc", "Speedups", "Speedup", "Tăng tốc"],
    },
    "item-recruit-token": {
        "id": "item-recruit-token",
        "gameId": None,
        "glossaryId": None,
        "category": "items",
        "iconPath": "/images/ui/rarities/icon_recruit.webp",
        "rarity": "legendary",
        "faction": "neutral",
        "nameVi": "Vé Chiêu Mộ (Recruit Tokens)",
        "nameEn": "Recruit Tokens",
        "inGameNameVi": "Vé Chiêu Mộ",
        "inGameNameEn": "Recruit Tokens",
        "descVi": "Vé quay Tướng tại Quán Rượu, tích trữ xả vào Ngày 4 Đua Vũ Trang (GAR/KvK).",
        "descEn": "Tavern recruitment vouchers hoarded for Day 4 Hero Burst in GAR and KvK.",
        "aliases": ["item-recruit-token", "Vé Chiêu Mộ", "Recruit Tokens", "Recruit Token", "Tavern Voucher"],
    },
    "item-decor-token": {
        "id": "item-decor-token",
        "gameId": 10030,
        "glossaryId": None,
        "category": "items",
        "iconPath": "/images/items/currencies/icon_10030.webp",
        "rarity": "epic",
        "faction": "neutral",
        "nameVi": "Xu Trang Trí (Decor Tokens)",
        "nameEn": "Decor Tokens",
        "inGameNameVi": "Xu Trang Trí",
        "inGameNameEn": "Decor Tokens",
        "descVi": "Tiền tệ nâng cấp vật phẩm Trang Trí Lâu Đài cộng chỉ số vĩnh viễn toàn tài khoản.",
        "descEn": "Currency used to upgrade Castle Decorations for permanent account-wide stat boosts.",
        "aliases": ["item-decor-token", "Xu Trang Trí", "Decor Tokens", "Rương Trang Trí", "Castle Decor"],
    },
    "season-s1": {
        "id": "season-s1",
        "gameId": None,
        "glossaryId": None,
        "category": "events-seasons",
        "iconPath": "/images/events/seasons/icon_castleS1.webp",
        "rarity": "mythic",
        "faction": "nature",
        "nameVi": "Mùa Giải S1: Mùa Xuân Khô Héo (Blighted Spring)",
        "nameEn": "Season 1: Blighted Spring",
        "inGameNameVi": "Mùa Giải S1",
        "inGameNameEn": "Season 1",
        "descVi": "Mùa giải đầu tiên với Suối Mùa Xuân, Cây Thế Giới và bộ ba Thiên Nhiên Thủy Triều.",
        "descEn": "First major season introducing the Spring of Nature, World Tree, and Tidecaller meta.",
        "aliases": ["season-s1", "Season 1", "Mùa Giải S1", "Mùa 1"],
    },
    "season-s2": {
        "id": "season-s2",
        "gameId": None,
        "glossaryId": None,
        "category": "events-seasons",
        "iconPath": "/images/events/seasons/icon_castleS2.webp",
        "rarity": "mythic",
        "faction": "horde",
        "nameVi": "Mùa Giải S2: Kỷ Nguyên Băng Giá (Frozen Epoch)",
        "nameEn": "Season 2: Frozen Epoch",
        "inGameNameVi": "Mùa Giải S2",
        "inGameNameEn": "Season 2",
        "descVi": "Mùa giải Băng Giá với Lò Sưởi Bang Hội và sự xuất hiện của Tôn Ngộ Không, Beastmaster.",
        "descEn": "Frozen tundra season featuring the Guild Furnace and the arrival of Wukong and Beastmaster.",
        "aliases": ["season-s2", "Season 2", "Mùa Giải S2", "Mùa 2"],
    },
    "season-s3": {
        "id": "season-s3",
        "gameId": None,
        "glossaryId": None,
        "category": "events-seasons",
        "iconPath": "/images/events/seasons/icon_castleS3.webp",
        "rarity": "mythic",
        "faction": "league",
        "nameVi": "Mùa Giải S3: Thánh Chiến Tinh Quang (Starlight Crusade)",
        "nameEn": "Season 3: Starlight Crusade",
        "inGameNameVi": "Mùa Giải S3",
        "inGameNameEn": "Season 3",
        "descVi": "Mùa giải S3 mở rộng giới hạn Thức Tỉnh, Pha Lê Ánh Sáng và chiến trường liên máy chủ.",
        "descEn": "Season 3 expanding Awakening tiers, Shining Crystal tech, and cross-server warfare.",
        "aliases": ["season-s3", "Season 3", "Mùa Giải S3", "Mùa 3"],
    },
    "season-s4": {
        "id": "season-s4",
        "gameId": None,
        "glossaryId": None,
        "category": "events-seasons",
        "iconPath": "/images/events/seasons/icon_castleS4.webp",
        "rarity": "mythic",
        "faction": "neutral",
        "nameVi": "Mùa Giải S4: Đỉnh Cao Vương Giả (Apex Sovereign)",
        "nameEn": "Season 4: Apex Sovereign",
        "inGameNameVi": "Mùa Giải S4",
        "inGameNameEn": "Season 4",
        "descVi": "Mùa giải S4 hội tụ 3 Đội hình 3v3 hoàn chỉnh và đấu trường Đỉnh Cao liên cụm.",
        "descEn": "Season 4 endgame featuring full 3-queue 3v3 formations and multi-cluster Apex tournaments.",
        "aliases": ["season-s4", "Season 4", "Mùa Giải S4", "Mùa 4"],
    },
    "building-spring-s1": {
        "id": "building-spring-s1",
        "gameId": None,
        "glossaryId": None,
        "category": "buildings-decor",
        "iconPath": "/images/events/seasons/icon_guild_spring.webp",
        "rarity": "epic",
        "faction": "nature",
        "nameVi": "Suối Nguồn Mùa Xuân (S1 Spring)",
        "nameEn": "Spring of Nature (S1)",
        "inGameNameVi": "Suối Mùa Xuân",
        "inGameNameEn": "Spring of Nature",
        "descVi": "Công trình mùa giải S1 sản sinh Nước Thánh và kháng hiệu ứng Khô Héo.",
        "descEn": "Season 1 seasonal structure generating Sacred Water and Blight resistance.",
        "aliases": ["building-spring-s1", "Suối Mùa Xuân", "Spring of Nature"],
    },
    "building-furnace-s2": {
        "id": "building-furnace-s2",
        "gameId": None,
        "glossaryId": None,
        "category": "buildings-decor",
        "iconPath": "/images/events/seasons/icon_guild_furnace.webp",
        "rarity": "epic",
        "faction": "horde",
        "nameVi": "Lò Sưởi Bang Hội (S2 Guild Furnace)",
        "nameEn": "Guild Furnace (S2)",
        "inGameNameVi": "Lò Sưởi Bang",
        "inGameNameEn": "Guild Furnace",
        "descVi": "Công trình trung tâm Mùa 2 giúp sưởi ấm lãnh thổ bang và chống đóng băng.",
        "descEn": "Season 2 thermal core protecting guild territory from sub-zero freeze penalties.",
        "aliases": ["building-furnace-s2", "Lò Sưởi Bang", "Guild Furnace"],
    },
    "item-golden-root-s1": {
        "id": "item-golden-root-s1",
        "gameId": 30527,
        "glossaryId": None,
        "category": "items",
        "iconPath": "/images/events/seasons/icon_30527.webp",
        "rarity": "legendary",
        "faction": "nature",
        "nameVi": "Rễ Cây Vàng S1 (Golden Root)",
        "nameEn": "Golden Root (S1)",
        "inGameNameVi": "Rễ Cây Vàng",
        "inGameNameEn": "Golden Root",
        "descVi": "Tài nguyên cốt lõi Mùa 1 dùng nâng cấp công trình mùa giải và Cây Thế Giới.",
        "descEn": "Core Season 1 resource used to upgrade seasonal structures and the World Tree.",
        "aliases": ["item-golden-root-s1", "Rễ Cây Vàng", "Golden Root"],
    },
    "item-obsidian-s2": {
        "id": "item-obsidian-s2",
        "gameId": 30604,
        "glossaryId": None,
        "category": "items",
        "iconPath": "/images/events/seasons/icon_30604.webp",
        "rarity": "legendary",
        "faction": "horde",
        "nameVi": "Hắc Diện Thạch S2 (Obsidian)",
        "nameEn": "Obsidian (S2)",
        "inGameNameVi": "Hắc Diện Thạch",
        "inGameNameEn": "Obsidian",
        "descVi": "Khoáng thạch nhiệt năng Mùa 2 dùng duy trì Lò Sưởi và rèn công nghệ chống rét.",
        "descEn": "Thermal mineral in Season 2 used to fuel the Furnace and research frost resistance.",
        "aliases": ["item-obsidian-s2", "Hắc Diện Thạch", "Obsidian"],
    },
    "item-shining-crystal-s3": {
        "id": "item-shining-crystal-s3",
        "gameId": 30721,
        "glossaryId": None,
        "category": "items",
        "iconPath": "/images/events/seasons/icon_30721.webp",
        "rarity": "legendary",
        "faction": "league",
        "nameVi": "Pha Lê Ánh Sáng S3 (Shining Crystal)",
        "nameEn": "Shining Crystal (S3)",
        "inGameNameVi": "Pha Lê Ánh Sáng",
        "inGameNameEn": "Shining Crystal",
        "descVi": "Tinh thể năng lượng Mùa 3 dùng kích hoạt kỹ năng mùa giải và tháp ánh sáng.",
        "descEn": "Season 3 energy crystal used to activate seasonal tech and Starlight spires.",
        "aliases": ["item-shining-crystal-s3", "Pha Lê Ánh Sáng", "Shining Crystal"],
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
        if asset.get("group") == "equipment" and (
            asset.get("category") == "equipment/exclusive-weapons"
            or asset.get("subgroup") == "exclusive-weapons"
        ):
            gid = asset.get("game_id")
            web_path = "/" + asset["path"].lstrip("/")
            if gid == 11025:
                by_hero[10025] = {
                    "path": web_path,
                    "vi": "Hơi Thở Rồng (Dragon Breath)",
                    "en": "Dragon Breath",
                }
            elif isinstance(gid, int) and 10001 <= gid <= 10054:
                by_hero[gid] = {
                    "path": web_path,
                    "vi": asset.get("name_vi"),
                    "en": asset.get("name_en"),
                }
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

    # Explicit bespoke Group 2 Showcase Decks (Phase 2)
    group2_bespoke: Dict[str, List[Dict[str, Any]]] = {
        "MED-2.1-01": [
            make_item("faction-horde", "HORDE", "Bộ Lạc (Horde)", "Horde Faction"),
            make_item("faction-league", "LEAGUE", "Liên Minh (League)", "League Faction"),
            make_item("faction-nature", "NATURE", "Thiên Nhiên (Nature)", "Nature Faction"),
            make_item("hero-wukong", "UR CARRY", "Tôn Ngộ Không", "Wukong"),
            make_item("hero-paragon", "UR CARRY", "Thiện Xạ", "Paragon"),
            make_item("hero-tidecaller", "UR CARRY", "Thuật Sĩ Thủy Triều", "Tidecaller"),
        ],
        "MED-2.1-02": [
            make_item("tier-yellow-stars", "1-5 STARS"),
            make_item("tier-red-stars", "1★ RED MVS"),
            make_item("tier-white-stars", "1★ WHITE ROI"),
            make_item("item-universal-shard", "560 / 280"),
            make_item("item-soul-stone", "9 SOUL STONES"),
            make_item("gear-exclusive-weapon", "UW +10 / +20"),
        ],
        "MED-2.1-04": [
            make_item("hero-wukong", "S+ HORDE"),
            make_item("hero-desert-prince", "S+ BRUISER"),
            make_item("hero-storm-maiden", "S+ AOE"),
            make_item("hero-tidecaller", "S+ NATURE"),
            make_item("hero-paragon", "S+ LEAGUE"),
            make_item("hero-rose-princess", "S+ TANK"),
        ],
        "MED-2.2-01": [
            make_item("hero-adjudicator", "SLOT 1 TANK"),
            make_item("hero-rose-princess", "SLOT 2 MYTHIC"),
            make_item("hero-pyromancer", "SLOT 3 SAFE"),
            make_item("hero-paragon", "SLOT 4 CARRY"),
            make_item("hero-nun", "SLOT 5 HEAL"),
            make_item("hero-bard", "SLOT 6 BUFF"),
        ],
        "MED-2.2-02": [
            make_item("hero-beastmaster", "SLOT 1 TANK"),
            make_item("hero-desert-prince", "SLOT 2 BRUISER"),
            make_item("hero-wukong", "SLOT 3 CARRY"),
            make_item("hero-storm-maiden", "SLOT 4 AOE"),
            make_item("hero-witch", "SLOT 5 HEAL"),
            make_item("hero-soulmancer", "SLOT 6 AWAKEN"),
        ],
        "MED-2.2-04": [
            make_item("hero-monk", "SLOT 1 TANK"),
            make_item("hero-ne-zha", "SLOT 2 BRUISER"),
            make_item("hero-tidecaller", "SLOT 3 CARRY"),
            make_item("hero-pixie", "SLOT 4 BURST"),
            make_item("hero-forest-maiden", "SLOT 5 ENERGY"),
            make_item("hero-petalis", "SLOT 6 SHIELD"),
        ],
        "MED-2.3-01": [
            make_item("faction-horde", "+20% VS LEAGUE", "Bộ Lạc (Horde)", "Horde Faction"),
            make_item("faction-league", "+20% VS NATURE", "Liên Minh (League)", "League Faction"),
            make_item("faction-nature", "+20% VS HORDE", "Thiên Nhiên (Nature)", "Nature Faction"),
            make_item("hero-wukong", "HORDE CORE"),
            make_item("hero-paragon", "LEAGUE CORE"),
            make_item("hero-tidecaller", "NATURE CORE"),
        ],
        "MED-2.3-02": [
            make_item("hero-adjudicator", "FRONTLINE 1"),
            make_item("hero-desert-prince", "FRONTLINE 2"),
            make_item("hero-pyromancer", "SAFE ZONE 3"),
            make_item("hero-wukong", "SAFE ZONE 4"),
            make_item("hero-nun", "BACKLINE 5"),
            make_item("hero-witch", "BACKLINE 6"),
        ],
        "MED-2.3-04": [
            make_item("hero-rose-princess", "SWAP SLOT 1⇄2"),
            make_item("hero-adjudicator", "SWAP SLOT 2⇄1"),
            make_item("hero-wukong", "ANTI-DIVE TRAP"),
            make_item("hero-tidecaller", "SAFE SLOT 3"),
            make_item("hero-storm-maiden", "COLUMN DODGE"),
            make_item("hero-paragon", "WEAK-WING FOCUS"),
        ],
        "MED-2.4-01": [
            make_item("item-universal-shard", "560 MYTHIC"),
            make_item("tier-yellow-stars", "60 / 30 SHARDS"),
            make_item("tier-red-stars", "1★ RED MVS"),
            make_item("tier-white-stars", "1★ WHITE ROI"),
            make_item("hero-storm-maiden", "DAY 21 MYTHIC"),
            make_item("hero-wukong", "S2 HYPER-CARRY"),
        ],
        "MED-2.4-02": [
            make_item("item-soul-stone", "9 SOUL STONES"),
            make_item("item-guild-honor", "360K HONOR"),
            make_item("item-guild-coins", "54K COINS"),
            make_item("hero-pyromancer", "AWAKEN #1"),
            make_item("hero-adjudicator", "AWAKEN #2"),
            make_item("hero-soulmancer", "HORDE AWAKEN"),
        ],
        "MED-2.4-04": [
            make_item("item-skill-book", "SKILL BOOKS"),
            make_item("gear-exclusive-weapon", "UW BREAKPOINT"),
            make_item("item-universal-shard", "ZERO WASTE"),
            make_item("hero-wukong", "MAX BOOKS #1"),
            make_item("hero-tidecaller", "MAX BOOKS #2"),
            make_item("hero-paragon", "MAX BOOKS #3"),
        ],
        "MED-2.5-01": [
            make_item("hero-brawler", "+30% RESEARCH"),
            make_item("hero-knight", "+30% TRAINING"),
            make_item("hero-ranger", "+30% RUBY"),
            make_item("hero-minister", "+30% HEALING"),
            make_item("hero-priestess", "+30% HEALING"),
            make_item("hero-dancer", "+30% HEALING"),
        ],
        "MED-2.5-02": [
            make_item("hero-brawler", "TRAIT 3 LV.30"),
            make_item("hero-knight", "TRAIT 3 LV.30"),
            make_item("hero-rogue", "+30% STONE"),
            make_item("hero-outlaw", "+30% TIMBER"),
            make_item("item-diamond", "2,000 TRAP"),
            make_item("tier-white-stars", "12★ = 300"),
        ],
        "MED-2.5-04": [
            make_item("hero-bard", "+40% BUILD"),
            make_item("hero-shaman", "+40% RESEARCH"),
            make_item("hero-hostess", "+40% TRAINING"),
            make_item("hero-stonemason", "+40% STONE"),
            make_item("item-universal-shard", "EXCHANGE SHOP"),
            make_item("tier-white-stars", "15★ = 500"),
        ],
        # Group 1 Bespoke Decks (Phase 3)
        "MED-1.1-01": [
            make_item("meta-strict-one-queue", "80-90% FOCUS"),
            make_item("item-universal-shard", "QUEUE 1 ONLY"),
            make_item("item-skill-book", "CORE CARRY"),
            make_item("gear-set-blood-of-the-titan", "MYTHIC GEAR"),
            make_item("system-lord-gear", "ACCOUNT STAT"),
            make_item("system-relics", "QUEUE POWER"),
        ],
        "MED-1.1-02": [
            make_item("item-universal-shard", "TIER S HOARD"),
            make_item("item-soul-stone", "360K HONOR"),
            make_item("item-diamond", "GACHA ONLY"),
            make_item("item-skill-book", "CARRY ONLY"),
            make_item("item-recruit-token", "GAR DAY 4"),
            make_item("item-speedup", "DOUBLE-DIP"),
        ],
        "MED-1.1-03": [
            make_item("faction-league", "DAYS 1-20 S0"),
            make_item("faction-horde", "DAY 21+ PIVOT"),
            make_item("faction-nature", "S1 COUNTER"),
            make_item("hero-pyromancer", "STARTER CARRY"),
            make_item("hero-desert-prince", "HORDE CORE"),
            make_item("hero-wukong", "S2 GOD CARRY"),
        ],
        "MED-1.1-05": [
            make_item("event-guild-arms-race", "GAR PREP"),
            make_item("event-kvk", "KVK WAR"),
            make_item("meta-double-dip", "300% BURST"),
            make_item("item-guild-honor", "HONOR FLOOR"),
            make_item("item-soul-stone", "9 STONES = 1 UR"),
            make_item("meta-horde-pivot", "ZERO-LOSS"),
        ],
        "MED-1.2-05": [
            make_item("system-research-cottage", "ARMS RACE PREP"),
            make_item("system-training-ground", "STAIRCASE T10"),
            make_item("system-brilliance-institute", "CASTLE LV.30+"),
            make_item("item-speedup", "RUSH CASTLE"),
            make_item("item-dragon-essence", "MON BUILD"),
            make_item("hero-bard", "+40% BUILD"),
        ],
        "MED-1.2-02": [
            make_item("hero-secret-keeper", "SLOT 1 TANK"),
            make_item("hero-adjudicator", "SLOT 2 TANK"),
            make_item("hero-pyromancer", "SLOT 3 CARRY"),
            make_item("hero-astrologer", "0 BOOKS/SHARDS"),
            make_item("hero-bard", "SLOT 5 BUFFER"),
            make_item("hero-nun", "SLOT 6 HEALER"),
        ],
        "MED-1.2-04": [
            make_item("item-stamina", "DAILY RADAR"),
            make_item("item-diamond", "VIP POINTS"),
            make_item("item-guild-honor", "360K FLOOR"),
            make_item("item-guild-coins", "54K FLOOR"),
            make_item("item-recruit-token", "SAVE FOR THU"),
            make_item("item-universal-shard", "LOCK IN VAULT"),
        ],
        "MED-1.3-01": [
            make_item("item-diamond", "S+ CURRENCY"),
            make_item("event-fortune-wheel", "750 KC / SPIN"),
            make_item("event-dice-of-fate", "800 KC / ROLL"),
            make_item("item-universal-shard", "MYTHIC PITY"),
            make_item("gear-exclusive-weapon", "UW SHARDS"),
            make_item("item-stamina", "2X DAILY MAX"),
        ],
        "MED-1.3-02": [
            make_item("event-fortune-wheel", "LEAGUE WHEEL"),
            make_item("event-dice-of-fate", "NATURE DICE"),
            make_item("hero-desert-prince", "DAY 21 GACHA"),
            make_item("hero-storm-maiden", "DAY 21 GACHA"),
            make_item("hero-witch", "DAY 41 GACHA"),
            make_item("item-diamond", "30K+ BUFFER"),
        ],
        "MED-1.3-04": [
            make_item("item-diamond", "VIP 4 / VIP 8"),
            make_item("item-universal-shard", "WEEKLY VIP"),
            make_item("item-speedup", "DISCOUNT ONLY"),
            make_item("item-stamina", "EVENT RALLY"),
            make_item("item-recruit-token", "NEVER 300 KC"),
            make_item("hero-brawler", "NEVER 2,000 KC"),
        ],
        "MED-1.4-01": [
            make_item("item-universal-shard", "TRAP #1 SHARD"),
            make_item("item-soul-stone", "TRAP #2 STONE"),
            make_item("gear-set-knights-glory", "TRAP #3 GEAR"),
            make_item("event-guild-arms-race", "TRAP #4 GAR"),
            make_item("hero-brawler", "TRAP #5 2K KC"),
            make_item("meta-staircase-promotion", "TRAP #10 TROOP"),
        ],
        "MED-1.4-02": [
            make_item("item-universal-shard", "TRAP #1 SHARD"),
            make_item("item-soul-stone", "TRAP #2 STONE"),
            make_item("gear-set-knights-glory", "TRAP #3 GEAR"),
            make_item("event-guild-arms-race", "TRAP #4 GAR"),
            make_item("hero-brawler", "TRAP #5 2K KC"),
            make_item("meta-staircase-promotion", "TRAP #10 TROOP"),
        ],
        "MED-1.4-03": [
            make_item("gear-set-blood-of-the-titan", "HORDE FACTION MARK"),
            make_item("gear-set-knights-glory", "LEAGUE FACTION MARK"),
            make_item("gear-set-glory-of-the-sage", "NATURE FACTION MARK"),
            make_item("system-lord-gear", "+10/+20/+30 SYNC"),
            make_item("gear-exclusive-weapon", "UW BREAKPOINT"),
            make_item("system-runes", "HOLD TIL LV.4+"),
        ],
        "MED-1.4-05": [
            make_item("system-research-cottage", "TRAP #6 TECH"),
            make_item("system-runes", "TRAP #7 RUNES"),
            make_item("system-brilliance-institute", "TRAP #8 CASTLE"),
            make_item("gear-exclusive-weapon", "TRAP #9 UW"),
            make_item("item-universal-shard", "STOP-LOSS NOW"),
            make_item("meta-horde-pivot", "RECOVERY PATH"),
        ],
        # Group 3 Bespoke Decks (Phase 3)
        "MED-3.1-01": [
            make_item("event-guild-arms-race", "GAR 6-DAY"),
            make_item("event-kvk", "KVK CROSS-SVR"),
            make_item("item-guild-coins", "GUILD RACE"),
            make_item("item-guild-honor", "GUILD RUSH"),
            make_item("event-fortune-wheel", "3-WEEK GACHA"),
            make_item("meta-double-dip", "300% OVERLAP"),
        ],
        "MED-3.1-02": [
            make_item("item-guild-coins", "PHASE 1 WEEKLY"),
            make_item("event-fortune-wheel", "750 KC WHEEL"),
            make_item("event-dice-of-fate", "800 KC DICE"),
            make_item("item-diamond", "1,000 KC GACHA"),
            make_item("item-universal-shard", "HOARD PHASE 1"),
            make_item("item-soul-stone", "UNLOCK LV.30"),
        ],
        "MED-3.1-04": [
            make_item("event-guild-arms-race", "02:00 UTC MON"),
            make_item("item-dragon-essence", "06:00 UTC SHIFT"),
            make_item("system-runes", "10:00 UTC PEAK"),
            make_item("item-universal-shard", "14:00 UTC SHIFT"),
            make_item("meta-double-dip", "+20% OVERLAP"),
            make_item("item-guild-honor", "CHEST 9 MAX"),
        ],
        "MED-3.2-01": [
            make_item("item-guild-coins", "9-SLOT BOARD"),
            make_item("system-pets-behemoth", "MON-TUE PETS"),
            make_item("system-relics", "WED-THU RELIC"),
            make_item("system-lord-gear", "FRI-SAT LORD"),
            make_item("item-guild-honor", "TIER 9 CHEST"),
            make_item("item-soul-stone", "54K COINS"),
        ],
        "MED-3.2-02": [
            make_item("system-lord-gear", "DAY 5 UNLOCK"),
            make_item("item-glory-medal", "TROOP SKIN"),
            make_item("meta-staircase-promotion", "GOLD TROOP TASK"),
            make_item("item-speedup", "GOLD SPEED TASK"),
            make_item("item-guild-coins", "+300 TO +450 PT"),
            make_item("meta-double-dip", "FRI-SAT 300%"),
        ],
        "MED-3.2-04": [
            make_item("item-guild-coins", "18K FLOOR"),
            make_item("item-soul-stone", "6,000 COINS"),
            make_item("item-universal-shard", "NEVER SHARED"),
            make_item("item-recruit-token", "NEVER SHARED"),
            make_item("item-diamond", "NO DAY 1-4 BUY"),
            make_item("system-lord-gear", "HOLD TIL FRI"),
        ],
        "MED-3.3-01": [
            make_item("item-dragon-essence", "DAY 1 BUILD"),
            make_item("system-runes", "DAY 2 TECH/RUNE"),
            make_item("item-stamina", "DAY 3 STAMINA"),
            make_item("item-universal-shard", "DAY 4 HERO"),
            make_item("meta-staircase-promotion", "DAY 5 TROOP/PET"),
            make_item("event-kvk", "DAY 6 WAR/SKIN"),
        ],
        "MED-3.3-02": [
            make_item("system-research-cottage", "ARMS RACE PREP"),
            make_item("event-guild-arms-race", "9 CHESTS = 2X"),
            make_item("item-guild-honor", "HONOR MEDALS"),
            make_item("item-soul-stone", "40K HONOR STONE"),
            make_item("item-universal-shard", "DOUBLE REWARDS"),
            make_item("meta-double-dip", "10:00-14:00 UTC"),
        ],
        "MED-3.3-04": [
            make_item("system-relics", "0 PT ON FRI GAR"),
            make_item("system-lord-gear", "0 PT ON SAT GAR"),
            make_item("behemoth-bear", "0 PT ON WED GAR"),
            make_item("item-glory-medal", "SAT KVK/GAR"),
            make_item("item-decor-token", "MON/SAT SCORE"),
            make_item("meta-staircase-promotion", "T7->T8->T9->T10"),
        ],
        "MED-3.4-01": [
            make_item("gear-set-blood-of-the-titan", "GROUP A SPEND"),
            make_item("item-universal-shard", "GROUP B HOARD"),
            make_item("item-soul-stone", "120K PT STONE"),
            make_item("system-lord-gear", "300% TRIPLE-DIP"),
            make_item("system-relics", "GAR D1-2 / GR D3-4"),
            make_item("system-pets-behemoth", "GAR D5-6 / GR D1-2"),
        ],
        "MED-3.4-02": [
            make_item("gear-set-knights-glory", "GROUP A SPEND"),
            make_item("item-promotion-stone", "GROUP A SPEND"),
            make_item("item-universal-shard", "GROUP B HOARD"),
            make_item("item-soul-stone", "GROUP B HOARD"),
            make_item("item-recruit-token", "GROUP B HOARD"),
            make_item("item-speedup", "GROUP B HOARD"),
        ],
        "MED-3.4-04": [
            make_item("item-universal-shard", "#1 SHARDS THU"),
            make_item("item-soul-stone", "#2 SOUL STONE"),
            make_item("item-skill-book", "#3 SKILL BOOKS"),
            make_item("system-lord-gear", "#6 LORD GEAR"),
            make_item("system-runes", "#9 RUNES TUE"),
            make_item("item-dragon-essence", "#10 ESSENCE MON"),
        ],
        # Group 4 Bespoke Decks (Phase 3)
        "MED-4.1-01": [
            make_item("hero-pyromancer", "DAY 1 STARTER"),
            make_item("hero-adjudicator", "DAY 7 TANK"),
            make_item("hero-desert-prince", "DAY 21 MYTHIC #1"),
            make_item("hero-storm-maiden", "DAY 21 MYTHIC #2"),
            make_item("hero-witch", "DAY 41 MYTHIC #3"),
            make_item("hero-rose-princess", "PRE-S1 LEAGUE"),
        ],
        "MED-4.1-03": [
            make_item("event-fortune-wheel", "LEAGUE 750 KC"),
            make_item("item-diamond", "HORDE 1,000 KC"),
            make_item("event-dice-of-fate", "NATURE 800 KC"),
            make_item("hero-desert-prince", "160 SHARDS = 1★R"),
            make_item("hero-storm-maiden", "560 SHARDS = 1★W"),
            make_item("gear-exclusive-weapon", "UW +5 / +10"),
        ],
        "MED-4.1-04": [
            make_item("item-universal-shard", "0 ON LEAGUE"),
            make_item("item-soul-stone", "SAVE 9 STONES"),
            make_item("item-guild-honor", "360K HONOR"),
            make_item("item-guild-coins", "54K COINS"),
            make_item("hero-soulmancer", "AWAKEN AT S1"),
            make_item("meta-horde-pivot", "DAY 21 PIVOT"),
        ],
        "MED-4.2-03": [
            make_item("hero-secret-keeper", "S1: 6 LEAGUE"),
            make_item("hero-desert-prince", "S2: 4L+2H BRIDGE"),
            make_item("hero-storm-maiden", "S2: 1★ RED MVS"),
            make_item("hero-witch", "S3: 6 HORDE Q1"),
            make_item("hero-wukong", "S4: 5 UR + 1 SSR"),
            make_item("hero-soulmancer", "9 SOUL STONES"),
        ],
        "MED-4.2-02": [
            make_item("item-soul-stone", "9 VS 27 (-67%)"),
            make_item("hero-soulmancer", "1 HORDE AWAKEN"),
            make_item("hero-pyromancer", "LEAGUE = 27 STONES"),
            make_item("gear-set-blood-of-the-titan", "CRAFT FOR Q1"),
            make_item("gear-set-knights-glory", "INHERIT TO Q2"),
            make_item("meta-strict-one-queue", "ZERO-LOSS Q2"),
        ],
        "MED-4.2-04": [
            make_item("hero-beastmaster", "Q1 SLOT 1"),
            make_item("hero-desert-prince", "Q1 SLOT 2"),
            make_item("hero-wukong", "Q1 SLOT 3"),
            make_item("hero-storm-maiden", "Q1 SLOT 4"),
            make_item("hero-witch", "Q1 SLOT 5"),
            make_item("hero-soulmancer", "Q1 SLOT 6"),
        ],
        "MED-4.3-03": [
            make_item("season-s1", "S1 SPRING"),
            make_item("season-s2", "S2 FROZEN"),
            make_item("season-s3", "S3 STARLIGHT"),
            make_item("season-s4", "S4 SOVEREIGN"),
            make_item("building-spring-s1", "S1 SPRING TECH"),
            make_item("building-furnace-s2", "S2 FURNACE"),
        ],
        "MED-4.3-02": [
            make_item("season-s1", "S1: TIDECALLER"),
            make_item("hero-tidecaller", "NATURE S1 META"),
            make_item("season-s2", "S2: WUKONG ERA"),
            make_item("hero-wukong", "COUNTER NATURE"),
            make_item("hero-beastmaster", "S2 UR TANK"),
            make_item("hero-petalis", "S3 NATURE UR"),
        ],
        "MED-4.3-04": [
            make_item("item-golden-root-s1", "S1 GOLDEN ROOT"),
            make_item("item-obsidian-s2", "S2 OBSIDIAN"),
            make_item("item-shining-crystal-s3", "S3 CRYSTAL"),
            make_item("system-brilliance-institute", "BRILLIANCE TECH"),
            make_item("system-sacred-codex", "3V3 CODEX"),
            make_item("event-kvk", "CROSS-SVR WAR"),
        ],
    }

    if code in group2_bespoke:
        return group2_bespoke[code]

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
                assert_no_vi_diacritics(ew["en"], f"Hero[{tid}].exclusiveWeaponNameEn")
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
            if ew.get("vi"):
                profile_obj["exclusiveWeaponNameVi"] = ew["vi"]
            if ew.get("en"):
                profile_obj["exclusiveWeaponNameEn"] = ew["en"]
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
        "huyết titan": "gear-set-blood-of-the-titan",
        "nộ huyết": "gear-set-blood-of-the-titan",
        "knight's glory": "gear-set-knights-glory",
        "kỵ sĩ vinh quang": "gear-set-knights-glory",
        "vinh quang kỵ sĩ": "gear-set-knights-glory",
        "glory of the sage": "gear-set-glory-of-the-sage",
        "vinh quang hiền triết": "gear-set-glory-of-the-sage",
        "hiền triết quang vinh": "gear-set-glory-of-the-sage",
        "gar": "event-guild-arms-race",
        "kvk": "event-kvk",
        "gar / kvk": "event-guild-arms-race",
        "pyro": "hero-pyromancer",
        "awakened pyro": "hero-pyromancer",
        "pyromancer đỏ": "hero-pyromancer",
        "pyromancer thức tỉnh": "hero-pyromancer",
        "awakened sage": "hero-sage",
        "sage đỏ": "hero-sage",
        "sage thức tỉnh": "hero-sage",
        "adjudicator (awakened)": "hero-adjudicator",
        "nun (awakened)": "hero-nun",
        "pixie (awakened)": "hero-pixie",
        "forest maiden (awakened)": "hero-forest-maiden",
        "warlock (awakened)": "hero-warlock",
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
        "export function resolveSlotHeroProfiles(rawSlotText: string): readonly HeroVisualProfile[] {",
        "  if (!rawSlotText) return [];",
        "  const withoutParens = rawSlotText.replace(/\\([^)]*\\)/g, ' ');",
        "  const parts = withoutParens.split('/').map((s) => s.trim()).filter(Boolean);",
        "  const results: HeroVisualProfile[] = [];",
        "  const seen = new Set<string>();",
        "  for (const part of parts) {",
        "    const cleanedPart = part.replace(/\\b(awakened|thức tỉnh|đỏ)\\b/gi, '').trim();",
        "    const prof = getHeroVisualProfile(part) ?? getHeroVisualProfile(cleanedPart);",
        "    if (prof && !seen.has(prof.id)) {",
        "      seen.add(prof.id);",
        "      results.push(prof);",
        "    }",
        "  }",
        "  if (results.length === 0) {",
        "    const fallback = getHeroVisualProfile(rawSlotText);",
        "    if (fallback) results.push(fallback);",
        "  }",
        "  return results;",
        "}",
        "",
        "export function extractHeroProfilesFromText(rawText: string, maxCount = 4): readonly HeroVisualProfile[] {",
        "  if (!rawText) return [];",
        "  const lower = rawText.toLowerCase();",
        "  const matches: Array<{ index: number; profile: HeroVisualProfile }> = [];",
        "  for (const prof of Object.values(HERO_VISUAL_PROFILES)) {",
        "    const enName = prof.inGameNameEn.toLowerCase();",
        "    const viName = prof.inGameNameVi.toLowerCase();",
        "    const idxEn = enName.length >= 3 ? lower.indexOf(enName) : -1;",
        "    const idxVi = viName.length >= 3 ? lower.indexOf(viName) : -1;",
        "    const bestIdx = idxEn !== -1 && idxVi !== -1 ? Math.min(idxEn, idxVi) : Math.max(idxEn, idxVi);",
        "    if (bestIdx !== -1) {",
        "      matches.push({ index: bestIdx, profile: prof });",
        "    }",
        "  }",
        "  matches.sort((a, b) => a.index - b.index);",
        "  const unique: HeroVisualProfile[] = [];",
        "  const seen = new Set<string>();",
        "  for (const m of matches) {",
        "    if (!seen.has(m.profile.id)) {",
        "      seen.add(m.profile.id);",
        "      unique.push(m.profile);",
        "      if (unique.length >= maxCount) break;",
        "    }",
        "  }",
        "  return unique;",
        "}",
        "",
        "export function resolveGearSetAssetsFromText(",
        "  rawText: string,",
        "  fallbackFaction?: 'league' | 'horde' | 'nature'",
        "): readonly GameAssetEntry[] {",
        "  const lower = (rawText || '').toLowerCase();",
        "  const sets: GameAssetEntry[] = [];",
        "  const pushSet = (id: string) => {",
        "    const entry = GAME_ASSET_REGISTRY[id];",
        "    if (entry && !sets.some((s) => s.id === entry.id)) sets.push(entry);",
        "  };",
        "  if (/titan|nộ huyết|fury of blood/.test(lower)) {",
        "    pushSet('gear-set-blood-of-the-titan');",
        "  }",
        "  if (/knight|kỵ sĩ vinh quang|vinh quang kỵ sĩ/.test(lower)) {",
        "    pushSet('gear-set-knights-glory');",
        "  }",
        "  if (/sage|hiền triết|hiền nhân/.test(lower)) {",
        "    pushSet('gear-set-glory-of-the-sage');",
        "  }",
        "  if (sets.length === 0 && fallbackFaction) {",
        "    if (fallbackFaction === 'horde') pushSet('gear-set-blood-of-the-titan');",
        "    else if (fallbackFaction === 'league') pushSet('gear-set-knights-glory');",
        "    else if (fallbackFaction === 'nature') pushSet('gear-set-glory-of-the-sage');",
        "  }",
        "  return sets;",
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
        "  const cleaned = cellText",
        "    .replace(/\\*\\*/g, '')",
        "    .replace(/`/g, '')",
        "    .replace(/^(?:[#]?\\d+[.)]?\\s*)/, '')",
        "    .trim();",
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

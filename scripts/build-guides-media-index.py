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
    # Phase 4 — Group 5: Golden Gear Slots, Promotion Stones, Lord Gear & Materials
    "gear-slot-weapon-knight": {
        "id": "gear-slot-weapon-knight",
        "gameId": 40005,
        "glossaryId": None,
        "category": "equipment",
        "iconPath": "/images/equipment/hero-gear/icon_40005.webp",
        "rarity": "mythic",
        "faction": "league",
        "nameVi": "Kiếm Kỵ Sĩ Vinh Quang (Knight's Glory Sword)",
        "nameEn": "Knight's Glory Sword",
        "inGameNameVi": "Kiếm Kỵ Sĩ",
        "inGameNameEn": "Knight's Glory Sword",
        "descVi": "Vũ khí Bộ Kỵ Sĩ Vinh Quang tăng tối đa Flat ATK và tỷ lệ bạo kích cho Hyper-Carry.",
        "descEn": "Knight's Glory weapon slot maximizing Flat ATK and Critical Rate for Hyper-Carries.",
        "aliases": ["gear-slot-weapon-knight", "Kiếm Kỵ Sĩ", "Knight's Glory Sword"],
    },
    "gear-slot-boots-knight": {
        "id": "gear-slot-boots-knight",
        "gameId": 40006,
        "glossaryId": None,
        "category": "equipment",
        "iconPath": "/images/equipment/hero-gear/icon_40006.webp",
        "rarity": "mythic",
        "faction": "league",
        "nameVi": "Giày Kỵ Sĩ Vinh Quang (Knight's Glory Boots)",
        "nameEn": "Knight's Glory Boots",
        "inGameNameVi": "Giày Kỵ Sĩ",
        "inGameNameEn": "Knight's Glory Boots",
        "descVi": "Giày chiến Bộ Kỵ Sĩ Vinh Quang gia tăng ATK và sát thương bạo kích.",
        "descEn": "Knight's Glory boots slot boosting offensive ATK and Critical Damage.",
        "aliases": ["gear-slot-boots-knight", "Giày Kỵ Sĩ", "Knight's Glory Boots"],
    },
    "gear-slot-helmet-knight": {
        "id": "gear-slot-helmet-knight",
        "gameId": 40007,
        "glossaryId": None,
        "category": "equipment",
        "iconPath": "/images/equipment/hero-gear/icon_40007.webp",
        "rarity": "mythic",
        "faction": "league",
        "nameVi": "Mũ Kỵ Sĩ Vinh Quang (Knight's Glory Helmet)",
        "nameEn": "Knight's Glory Helmet",
        "inGameNameVi": "Mũ Kỵ Sĩ",
        "inGameNameEn": "Knight's Glory Helmet",
        "descVi": "Mũ giáp Bộ Kỵ Sĩ Vinh Quang kích hoạt cộng hưởng +80% Gear ATK và +6% Damage Increase.",
        "descEn": "Knight's Glory helmet slot completing the +80% Gear ATK and +6% Damage Increase set.",
        "aliases": ["gear-slot-helmet-knight", "Mũ Kỵ Sĩ", "Knight's Glory Helmet"],
    },
    "gear-slot-armor-knight": {
        "id": "gear-slot-armor-knight",
        "gameId": 40008,
        "glossaryId": None,
        "category": "equipment",
        "iconPath": "/images/equipment/hero-gear/icon_40008.webp",
        "rarity": "mythic",
        "faction": "league",
        "nameVi": "Giáp Kỵ Sĩ Vinh Quang (Knight's Glory Armor)",
        "nameEn": "Knight's Glory Armor",
        "inGameNameVi": "Giáp Kỵ Sĩ",
        "inGameNameEn": "Knight's Glory Armor",
        "descVi": "Áo giáp Bộ Kỵ Sĩ Vinh Quang bảo vệ tuyến sau và cộng hưởng sát thương bùng nổ.",
        "descEn": "Knight's Glory chest armor slot balancing survivability and burst resonance.",
        "aliases": ["gear-slot-armor-knight", "Giáp Kỵ Sĩ", "Knight's Glory Armor"],
    },
    "gear-slot-weapon-sage": {
        "id": "gear-slot-weapon-sage",
        "gameId": 40009,
        "glossaryId": None,
        "category": "equipment",
        "iconPath": "/images/equipment/hero-gear/icon_40009.webp",
        "rarity": "mythic",
        "faction": "nature",
        "nameVi": "Trượng Hiền Triết Quang Vinh (Glory of the Sage Staff)",
        "nameEn": "Glory of the Sage Staff",
        "inGameNameVi": "Trượng Hiền Triết",
        "inGameNameEn": "Glory of the Sage Staff",
        "descVi": "Vũ khí Bộ Hiền Triết Quang Vinh tối ưu hóa +40% ATK, +80% HP và +8% Skill Damage Amplify.",
        "descEn": "Glory of the Sage weapon slot optimizing +40% ATK, +80% HP, and +8% Skill Damage Amplify.",
        "aliases": ["gear-slot-weapon-sage", "Trượng Hiền Triết", "Glory of the Sage Staff"],
    },
    "gear-slot-boots-sage": {
        "id": "gear-slot-boots-sage",
        "gameId": 40010,
        "glossaryId": None,
        "category": "equipment",
        "iconPath": "/images/equipment/hero-gear/icon_40010.webp",
        "rarity": "mythic",
        "faction": "nature",
        "nameVi": "Giày Hiền Triết Quang Vinh (Glory of the Sage Boots)",
        "nameEn": "Glory of the Sage Boots",
        "inGameNameVi": "Giày Hiền Triết",
        "inGameNameEn": "Glory of the Sage Boots",
        "descVi": "Giày Bộ Hiền Triết Quang Vinh tăng tốc độ xoay vòng kỹ năng cho Healer và Controller.",
        "descEn": "Glory of the Sage boots slot accelerating skill rotation for Healers and Controllers.",
        "aliases": ["gear-slot-boots-sage", "Giày Hiền Triết", "Glory of the Sage Boots"],
    },
    "gear-slot-helmet-sage": {
        "id": "gear-slot-helmet-sage",
        "gameId": 40011,
        "glossaryId": None,
        "category": "equipment",
        "iconPath": "/images/equipment/hero-gear/icon_40011.webp",
        "rarity": "mythic",
        "faction": "nature",
        "nameVi": "Mũ Hiền Triết Quang Vinh (Glory of the Sage Helmet)",
        "nameEn": "Glory of the Sage Helmet",
        "inGameNameVi": "Mũ Hiền Triết",
        "inGameNameEn": "Glory of the Sage Helmet",
        "descVi": "Mũ Bộ Hiền Triết Quang Vinh gia tăng Kháng Bạo Kích (Crit Resistance) chống sốc sát thương.",
        "descEn": "Glory of the Sage helmet slot boosting Crit Resistance against backline assassins.",
        "aliases": ["gear-slot-helmet-sage", "Mũ Hiền Triết", "Glory of the Sage Helmet"],
    },
    "gear-slot-armor-sage": {
        "id": "gear-slot-armor-sage",
        "gameId": 40012,
        "glossaryId": None,
        "category": "equipment",
        "iconPath": "/images/equipment/hero-gear/icon_40012.webp",
        "rarity": "mythic",
        "faction": "nature",
        "nameVi": "Giáp Hiền Triết Quang Vinh (Glory of the Sage Armor)",
        "nameEn": "Glory of the Sage Armor",
        "inGameNameVi": "Giáp Hiền Triết",
        "inGameNameEn": "Glory of the Sage Armor",
        "descVi": "Giáp Bộ Hiền Triết Quang Vinh cung cấp +80% Gear HP và độ lì đòn cho tướng Hỗ trợ.",
        "descEn": "Glory of the Sage armor slot providing +80% Gear HP and sustained fight durability.",
        "aliases": ["gear-slot-armor-sage", "Giáp Hiền Triết", "Glory of the Sage Armor"],
    },
    "gear-slot-weapon-titan": {
        "id": "gear-slot-weapon-titan",
        "gameId": 40013,
        "glossaryId": None,
        "category": "equipment",
        "iconPath": "/images/equipment/hero-gear/icon_40013.webp",
        "rarity": "mythic",
        "faction": "horde",
        "nameVi": "Rìu Huyết Titan (Blood of the Titan Axe)",
        "nameEn": "Blood of the Titan Weapon",
        "inGameNameVi": "Rìu Huyết Titan",
        "inGameNameEn": "Blood of the Titan Weapon",
        "descVi": "Vũ khí Bộ Huyết Titan cộng hưởng +160% Gear HP và +6% Giảm Sát Thương Nhận Vào.",
        "descEn": "Blood of the Titan weapon slot resonating with +160% Gear HP and +6% Damage Reduction.",
        "aliases": ["gear-slot-weapon-titan", "Rìu Huyết Titan", "Blood of the Titan Weapon"],
    },
    "gear-slot-boots-titan": {
        "id": "gear-slot-boots-titan",
        "gameId": 40014,
        "glossaryId": None,
        "category": "equipment",
        "iconPath": "/images/equipment/hero-gear/icon_40014.webp",
        "rarity": "mythic",
        "faction": "horde",
        "nameVi": "Giày Huyết Titan (Blood of the Titan Greaves)",
        "nameEn": "Blood of the Titan Boots",
        "inGameNameVi": "Giày Huyết Titan",
        "inGameNameEn": "Blood of the Titan Boots",
        "descVi": "Giày chiến Bộ Huyết Titan tăng DEF và HP tối đa cho Main Tank tuyến đầu.",
        "descEn": "Blood of the Titan boots slot maximizing frontline DEF and Max HP scaling.",
        "aliases": ["gear-slot-boots-titan", "Giày Huyết Titan", "Blood of the Titan Boots"],
    },
    "gear-slot-helmet-titan": {
        "id": "gear-slot-helmet-titan",
        "gameId": 40015,
        "glossaryId": None,
        "category": "equipment",
        "iconPath": "/images/equipment/hero-gear/icon_40015.webp",
        "rarity": "mythic",
        "faction": "horde",
        "nameVi": "Mũ Huyết Titan (Blood of the Titan Helm)",
        "nameEn": "Blood of the Titan Helmet",
        "inGameNameVi": "Mũ Huyết Titan",
        "inGameNameEn": "Blood of the Titan Helmet",
        "descVi": "Mũ giáp Bộ Huyết Titan tối đa hóa Khiên theo % Max HP (Beastmaster, Rose Princess, Adjudicator).",
        "descEn": "Blood of the Titan helmet slot maximizing % Max HP shields for frontline tanks.",
        "aliases": ["gear-slot-helmet-titan", "Mũ Huyết Titan", "Blood of the Titan Helmet"],
    },
    "gear-slot-armor-titan": {
        "id": "gear-slot-armor-titan",
        "gameId": 40016,
        "glossaryId": None,
        "category": "equipment",
        "iconPath": "/images/equipment/hero-gear/icon_40016.webp",
        "rarity": "mythic",
        "faction": "horde",
        "nameVi": "Giáp Huyết Titan (Blood of the Titan Chestplate)",
        "nameEn": "Blood of the Titan Armor",
        "inGameNameVi": "Giáp Huyết Titan",
        "inGameNameEn": "Blood of the Titan Armor",
        "descVi": "Áo giáp hạng nặng Bộ Huyết Titan mang lại lượng máu và giảm sát thương cao nhất game.",
        "descEn": "Blood of the Titan heavy chestplate granting maximum HP pool and damage mitigation.",
        "aliases": ["gear-slot-armor-titan", "Giáp Huyết Titan", "Blood of the Titan Armor"],
    },
    "item-gold-ingot": {
        "id": "item-gold-ingot",
        "gameId": 30222,
        "glossaryId": None,
        "category": "items",
        "iconPath": "/images/items/consumables/icon_30222.webp",
        "rarity": "legendary",
        "faction": "neutral",
        "nameVi": "Thỏi Vàng Rèn Đồ (Gold Ingots / Titan Iron)",
        "nameEn": "Gold Ingots (Blacksmith)",
        "inGameNameVi": "Thỏi Vàng",
        "inGameNameEn": "Gold Ingots",
        "descVi": "Nguyên liệu cốt lõi trong Lò Rèn dùng đúc Trang bị Vàng đúng Dấu Hệ và nâng sao Đồ Đỏ.",
        "descEn": "Core Blacksmith currency used to forge Faction-Marked Golden Gear and promote Mythic stars.",
        "aliases": ["item-gold-ingot", "Thỏi Vàng", "Gold Ingots", "Gold Ingot"],
    },
    "item-upgrade-rune": {
        "id": "item-upgrade-rune",
        "gameId": 10018,
        "glossaryId": None,
        "category": "items",
        "iconPath": "/images/items/currencies/icon_10018.webp",
        "rarity": "epic",
        "faction": "neutral",
        "nameVi": "Quặng Cường Hóa Trang Bị (Upgrade Runes / Enhancement Ore)",
        "nameEn": "Upgrade Runes (Enhancement Ore)",
        "inGameNameVi": "Quặng Cường Hóa",
        "inGameNameEn": "Upgrade Runes",
        "descVi": "Quặng đập cấp trang bị anh hùng từ Lv.0 lên Lv.40 (780,000 Quặng/tướng), hoàn trả 100% khi phân giải.",
        "descEn": "Enhancement ore used to level Hero Gear from Lv.0 to Lv.40 (780,000 Ore/hero) with 100% dismantle refund.",
        "aliases": ["item-upgrade-rune", "Quặng Cường Hóa", "Upgrade Runes", "Enhancement Ore", "Đá Cường Hóa"],
    },
    "item-ruby": {
        "id": "item-ruby",
        "gameId": 10005,
        "glossaryId": None,
        "category": "items",
        "iconPath": "/images/items/currencies/icon_10005.webp",
        "rarity": "rare",
        "faction": "neutral",
        "nameVi": "Hồng Ngọc (Rubies)",
        "nameEn": "Rubies",
        "inGameNameVi": "Ruby",
        "inGameNameEn": "Rubies",
        "descVi": "Tài nguyên cơ bản tiêu thụ lớn khi cường hóa Trang bị, nâng cấp Công trình và Nghiên cứu.",
        "descEn": "Core resource consumed heavily during Gear Enhancement, Construction, and Tech Research.",
        "aliases": ["item-ruby", "Ruby", "Rubies", "Hồng Ngọc"],
    },
    "item-legendary-promotion-stone": {
        "id": "item-legendary-promotion-stone",
        "gameId": 30382,
        "glossaryId": None,
        "category": "items",
        "iconPath": "/images/items/materials/icon_30382.webp",
        "rarity": "legendary",
        "faction": "neutral",
        "nameVi": "Đá Thăng Cấp Huyền Thoại (Legendary Promotion Stone — Đá Vàng)",
        "nameEn": "Legendary Promotion Stone (Golden Stone)",
        "inGameNameVi": "Đá Thăng Cấp Vàng",
        "inGameNameEn": "Legendary Promotion Stone",
        "descVi": "Đá Vàng dùng đột phá bước 5/5 của Trang bị Vàng từ 1★ lên 4★ (50 viên/món = 200 viên/tướng).",
        "descEn": "Golden Promotion Stone required at step 5/5 to promote Golden Gear from 1★ to 4★ (50 stones/piece).",
        "aliases": ["item-legendary-promotion-stone", "Đá Thăng Cấp Huyền Thoại", "Legendary Promotion Stone", "Đá Vàng"],
    },
    "item-mythic-promotion-stone": {
        "id": "item-mythic-promotion-stone",
        "gameId": 30383,
        "glossaryId": None,
        "category": "items",
        "iconPath": "/images/items/materials/icon_30383.webp",
        "rarity": "mythic",
        "faction": "neutral",
        "nameVi": "Đá Thăng Cấp Thần Thoại (Mythic Promotion Stone — Đá Đỏ)",
        "nameEn": "Mythic Promotion Stone (Red Stone)",
        "inGameNameVi": "Đá Thăng Cấp Đỏ",
        "inGameNameEn": "Mythic Promotion Stone",
        "descVi": "Đá Đỏ quý hiếm dùng tiến hóa món đồ Vàng 4★ lên 5★ Thần Thoại Đỏ (30 viên/món = 120 viên/tướng).",
        "descEn": "Endgame Red Promotion Stone required to evolve 4★ Golden Gear into 5★ Mythic Red Gear (30 stones/piece).",
        "aliases": ["item-mythic-promotion-stone", "Đá Thăng Cấp Thần Thoại", "Mythic Promotion Stone", "Đá Đỏ"],
    },
    "gear-lord-sword": {
        "id": "gear-lord-sword",
        "gameId": None,
        "glossaryId": None,
        "category": "equipment",
        "iconPath": "/images/items/consumables/icon_lord_1.webp",
        "rarity": "mythic",
        "faction": "horde",
        "nameVi": "Kiếm Chúa Tể — Bộ Lạc (Lord Sword — Horde)",
        "nameEn": "Lord Sword (Horde Branch)",
        "inGameNameVi": "Kiếm Chúa Tể",
        "inGameNameEn": "Lord Sword",
        "descVi": "Ô Trang bị Chúa Tể #1 (Nhánh Trái): Gia tăng trực tiếp % ATK và % HP cho toàn bộ tướng Bộ Lạc.",
        "descEn": "Lord Gear Slot #1 (Left Branch): Directly amplifies % ATK and % HP for all Horde heroes.",
        "aliases": ["gear-lord-sword", "Kiếm Chúa Tể", "Lord Sword"],
    },
    "gear-lord-wand": {
        "id": "gear-lord-wand",
        "gameId": None,
        "glossaryId": None,
        "category": "equipment",
        "iconPath": "/images/items/consumables/icon_lord_2.webp",
        "rarity": "mythic",
        "faction": "horde",
        "nameVi": "Quyền Trượng Chúa Tể — Bộ Lạc (Lord Wand — Horde)",
        "nameEn": "Lord Wand (Horde Branch)",
        "inGameNameVi": "Trượng Chúa Tể",
        "inGameNameEn": "Lord Wand",
        "descVi": "Ô Trang bị Chúa Tể #2 (Nhánh Phải): Cộng hưởng chỉ số tấn công/phòng thủ cho hệ Bộ Lạc.",
        "descEn": "Lord Gear Slot #2 (Right Branch): Amplifies offensive and defensive stats for Horde heroes.",
        "aliases": ["gear-lord-wand", "Quyền Trượng Chúa Tể", "Lord Wand"],
    },
    "gear-lord-chest": {
        "id": "gear-lord-chest",
        "gameId": None,
        "glossaryId": None,
        "category": "equipment",
        "iconPath": "/images/items/consumables/icon_lord_3.webp",
        "rarity": "mythic",
        "faction": "nature",
        "nameVi": "Giáp Chúa Tể — Thiên Nhiên (Lord Armor — Nature)",
        "nameEn": "Lord Armor (Nature Branch)",
        "inGameNameVi": "Giáp Chúa Tể",
        "inGameNameEn": "Lord Armor",
        "descVi": "Ô Trang bị Chúa Tể #3 (Nhánh Trái): Gia tăng % ATK và % HP cho toàn bộ tướng Thiên Nhiên.",
        "descEn": "Lord Gear Slot #3 (Left Branch): Boosts % ATK and % HP across all Nature faction heroes.",
        "aliases": ["gear-lord-chest", "Giáp Chúa Tể", "Lord Armor"],
    },
    "gear-lord-greaves": {
        "id": "gear-lord-greaves",
        "gameId": None,
        "glossaryId": None,
        "category": "equipment",
        "iconPath": "/images/items/consumables/icon_lord_4.webp",
        "rarity": "mythic",
        "faction": "nature",
        "nameVi": "Giày Chúa Tể — Thiên Nhiên (Lord Greaves — Nature)",
        "nameEn": "Lord Greaves (Nature Branch)",
        "inGameNameVi": "Giày Chúa Tể",
        "inGameNameEn": "Lord Greaves",
        "descVi": "Ô Trang bị Chúa Tể #4 (Nhánh Phải): Gia tăng chỉ số chiến đấu cho hệ Thiên Nhiên.",
        "descEn": "Lord Gear Slot #4 (Right Branch): Enhances combat attributes for Nature faction heroes.",
        "aliases": ["gear-lord-greaves", "Giày Chúa Tể", "Lord Greaves"],
    },
    "gear-lord-helm": {
        "id": "gear-lord-helm",
        "gameId": None,
        "glossaryId": None,
        "category": "equipment",
        "iconPath": "/images/items/consumables/icon_lord_5.webp",
        "rarity": "mythic",
        "faction": "league",
        "nameVi": "Vương Miện Chúa Tể — Liên Minh (Lord Helm — League)",
        "nameEn": "Lord Helm (League Branch)",
        "inGameNameVi": "Mũ Chúa Tể",
        "inGameNameEn": "Lord Helm",
        "descVi": "Ô Trang bị Chúa Tể #5 (Nhánh Trái): Gia tăng % ATK và % HP cho toàn bộ tướng Liên Minh.",
        "descEn": "Lord Gear Slot #5 (Left Branch): Increases % ATK and % HP for all League faction heroes.",
        "aliases": ["gear-lord-helm", "Vương Miện Chúa Tể", "Lord Helm"],
    },
    "gear-lord-ring": {
        "id": "gear-lord-ring",
        "gameId": None,
        "glossaryId": None,
        "category": "equipment",
        "iconPath": "/images/items/consumables/icon_lord_6.webp",
        "rarity": "mythic",
        "faction": "league",
        "nameVi": "Nhẫn Chúa Tể — Liên Minh (Lord Ring — League)",
        "nameEn": "Lord Ring (League Branch)",
        "inGameNameVi": "Nhẫn Chúa Tể",
        "inGameNameEn": "Lord Ring",
        "descVi": "Ô Trang bị Chúa Tể #6 (Nhánh Phải): Cộng hưởng chỉ số toàn diện cho hệ Liên Minh.",
        "descEn": "Lord Gear Slot #6 (Right Branch): Provides comprehensive stat resonance for League heroes.",
        "aliases": ["gear-lord-ring", "Nhẫn Chúa Tể", "Lord Ring"],
    },
    "item-lord-refined-metal": {
        "id": "item-lord-refined-metal",
        "gameId": None,
        "glossaryId": None,
        "category": "items",
        "iconPath": "/images/items/materials/icon_material_1.webp",
        "rarity": "rare",
        "faction": "neutral",
        "nameVi": "Thép Tinh Luyện (Refined Metal)",
        "nameEn": "Refined Metal",
        "inGameNameVi": "Thép Tinh Luyện",
        "inGameNameEn": "Refined Metal",
        "descVi": "Nguyên liệu cơ bản rèn và nâng cấp Trang bị Chúa Tể, xả vào Thứ Tư/Thứ Năm GAR & Thứ Sáu Guild Race.",
        "descEn": "Base Lord Gear upgrade material scored during GAR Wed/Thu and Guild Race Fri/Sat.",
        "aliases": ["item-lord-refined-metal", "Thép Tinh Luyện", "Refined Metal"],
    },
    "item-lord-magic-thread": {
        "id": "item-lord-magic-thread",
        "gameId": None,
        "glossaryId": None,
        "category": "items",
        "iconPath": "/images/items/materials/icon_material_2.webp",
        "rarity": "epic",
        "faction": "neutral",
        "nameVi": "Chỉ Phép Thuật (Magic Thread)",
        "nameEn": "Magic Thread",
        "inGameNameVi": "Chỉ Phép",
        "inGameNameEn": "Magic Thread",
        "descVi": "Nguyên liệu dệt Trang bị Chúa Tể bậc Lam/Tím/Vàng, tích trữ ăn điểm 300% Triple-Dip.",
        "descEn": "Lord Gear weaving material hoarded for 300% Triple-Dip event windows.",
        "aliases": ["item-lord-magic-thread", "Chỉ Phép", "Chỉ Phép Thuật", "Magic Thread"],
    },
    "item-lord-orichalcum": {
        "id": "item-lord-orichalcum",
        "gameId": None,
        "glossaryId": None,
        "category": "items",
        "iconPath": "/images/items/materials/icon_material_3.webp",
        "rarity": "legendary",
        "faction": "neutral",
        "nameVi": "Bản Vẽ / Kim Loại Thần (Orichalcum)",
        "nameEn": "Orichalcum (Lord Blueprint)",
        "inGameNameVi": "Orichalcum",
        "inGameNameEn": "Orichalcum",
        "descVi": "Nút cổ chai số 1 của hệ thống Trang bị Chúa Tể từ bậc Tím (Epic) lên Huyền Thoại (Legendary).",
        "descEn": "Primary bottleneck material for promoting Lord Gear from Epic to Legendary tiers.",
        "aliases": ["item-lord-orichalcum", "Orichalcum", "Bản Vẽ Chúa Tể"],
    },
    "item-lord-dragon-blood": {
        "id": "item-lord-dragon-blood",
        "gameId": None,
        "glossaryId": None,
        "category": "items",
        "iconPath": "/images/items/materials/icon_material_4.webp",
        "rarity": "mythic",
        "faction": "neutral",
        "nameVi": "Máu Rồng (Dragon Blood)",
        "nameEn": "Dragon Blood",
        "inGameNameVi": "Máu Rồng",
        "inGameNameEn": "Dragon Blood",
        "descVi": "Nguyên liệu tối thượng nâng cấp Trang bị Chúa Tể bậc Đỏ (Mythic), đổi tại Kingdom Emblem Shop.",
        "descEn": "Endgame Mythic Lord Gear material obtained primarily from the Kingdom Emblem Shop.",
        "aliases": ["item-lord-dragon-blood", "Máu Rồng", "Dragon Blood"],
    },
    "building-blacksmith": {
        "id": "building-blacksmith",
        "gameId": None,
        "glossaryId": None,
        "category": "buildings-decor",
        "iconPath": "/images/buildings/structures/icon_building_tiejiangpu.webp",
        "rarity": "legendary",
        "faction": "neutral",
        "nameVi": "Lò Rèn (Blacksmith)",
        "nameEn": "Blacksmith",
        "inGameNameVi": "Lò Rèn",
        "inGameNameEn": "Blacksmith",
        "descVi": "Công trình đúc Trang bị Vàng theo Ma trận 3 Bộ × 4 Cột và phân giải hoàn trả 100% Quặng Cường Hóa.",
        "descEn": "Core forge structure housing the 3x4 Golden Gear Matrix and 100% Upgrade Rune dismantle system.",
        "aliases": ["building-blacksmith", "Lò Rèn", "Blacksmith"],
    },
    # Phase 4 — Group 6: Runes, Relics, Pets, Behemoths & Elves
    "rune-slot-1": {
        "id": "rune-slot-1",
        "gameId": None,
        "glossaryId": None,
        "category": "equipment",
        "iconPath": "/images/equipment/runes/icon_runes_105.webp",
        "rarity": "legendary",
        "faction": "neutral",
        "nameVi": "Cổ Ngữ Khe 1 — Tấn Công (Slot 1 Attack Rune)",
        "nameEn": "Slot 1 Attack Rune",
        "inGameNameVi": "Cổ Ngữ Khe 1",
        "inGameNameEn": "Slot 1 Rune",
        "descVi": "Cổ Ngữ Khe I gia tăng ATK cố định và mở khóa dòng phụ bạo kích ở mốc Lv.5 / Lv.8.",
        "descEn": "Slot I Rune boosting Flat ATK and unlocking critical secondary stats at Lv.5 / Lv.8.",
        "aliases": ["rune-slot-1", "Cổ Ngữ Khe 1", "Slot 1 Attack Rune"],
    },
    "rune-slot-2": {
        "id": "rune-slot-2",
        "gameId": None,
        "glossaryId": None,
        "category": "equipment",
        "iconPath": "/images/equipment/runes/icon_runes_205.webp",
        "rarity": "legendary",
        "faction": "neutral",
        "nameVi": "Cổ Ngữ Khe 2 — Sinh Mệnh (Slot 2 HP Rune)",
        "nameEn": "Slot 2 Vitality Rune",
        "inGameNameVi": "Cổ Ngữ Khe 2",
        "inGameNameEn": "Slot 2 Rune",
        "descVi": "Cổ Ngữ Khe II gia tăng HP và Giảm Sát Thương cho dàn chắn tuyến đầu.",
        "descEn": "Slot II Rune amplifying Max HP and Damage Reduction for frontline tanks.",
        "aliases": ["rune-slot-2", "Cổ Ngữ Khe 2", "Slot 2 Vitality Rune"],
    },
    "rune-slot-3": {
        "id": "rune-slot-3",
        "gameId": None,
        "glossaryId": None,
        "category": "equipment",
        "iconPath": "/images/equipment/runes/icon_runes_305.webp",
        "rarity": "legendary",
        "faction": "neutral",
        "nameVi": "Cổ Ngữ Khe 3 — Phòng Thủ (Slot 3 Defense Rune)",
        "nameEn": "Slot 3 Bastion Rune",
        "inGameNameVi": "Cổ Ngữ Khe 3",
        "inGameNameEn": "Slot 3 Rune",
        "descVi": "Cổ Ngữ Khe III gia tăng Kháng Bạo Kích và Phòng thủ toàn diện.",
        "descEn": "Slot III Rune increasing Crit Resistance and overall defensive mitigation.",
        "aliases": ["rune-slot-3", "Cổ Ngữ Khe 3", "Slot 3 Bastion Rune"],
    },
    "rune-slot-4": {
        "id": "rune-slot-4",
        "gameId": None,
        "glossaryId": None,
        "category": "equipment",
        "iconPath": "/images/equipment/runes/icon_runes_405.webp",
        "rarity": "legendary",
        "faction": "neutral",
        "nameVi": "Cổ Ngữ Khe 4 — Khuếch Đại (Slot 4 Amplify Rune)",
        "nameEn": "Slot 4 Surge Rune",
        "inGameNameVi": "Cổ Ngữ Khe 4",
        "inGameNameEn": "Slot 4 Rune",
        "descVi": "Cổ Ngữ Khe IV gia tăng Khuếch đại Sát thương Kỹ năng (Skill Damage Amplify).",
        "descEn": "Slot IV Rune boosting Skill Damage Amplification and offensive output.",
        "aliases": ["rune-slot-4", "Cổ Ngữ Khe 4", "Slot 4 Surge Rune"],
    },
    "rune-slot-5": {
        "id": "rune-slot-5",
        "gameId": None,
        "glossaryId": None,
        "category": "equipment",
        "iconPath": "/images/equipment/runes/icon_runes_505.webp",
        "rarity": "mythic",
        "faction": "neutral",
        "nameVi": "Cổ Ngữ Khe 5 — Cấp Kỹ Năng (Slot 5 Combat Skill Level Rune)",
        "nameEn": "Slot 5 Combat Skill Rune (+Skill Lv)",
        "inGameNameVi": "Cổ Ngữ Khe 5",
        "inGameNameEn": "Slot 5 Skill Rune",
        "descVi": "Khe Cổ Ngữ quan trọng nhất: cộng trực tiếp +1/+2 Cấp Kỹ Năng Chiến Đấu (Combat Skill Level) ở Lv.5+.",
        "descEn": "Highest-priority Rune slot granting +1/+2 Combat Skill Level at Lv.5+ breakpoints.",
        "aliases": ["rune-slot-5", "Cổ Ngữ Khe 5", "Slot 5 Combat Skill Rune"],
    },
    "rune-slot-6": {
        "id": "rune-slot-6",
        "gameId": None,
        "glossaryId": None,
        "category": "equipment",
        "iconPath": "/images/equipment/runes/icon_runes_605.webp",
        "rarity": "mythic",
        "faction": "neutral",
        "nameVi": "Cổ Ngữ Khe 6 — Cộng Hưởng Tối Thượng (Slot 6 Apex Rune)",
        "nameEn": "Slot 6 Apex Resonance Rune",
        "inGameNameVi": "Cổ Ngữ Khe 6",
        "inGameNameEn": "Slot 6 Apex Rune",
        "descVi": "Cổ Ngữ Khe VI hoàn tất bộ đồng bộ 6 viên Lv.5 / Lv.8 kích hoạt hào quang Cổ Ngữ.",
        "descEn": "Slot VI Rune completing the 6-piece Lv.5 / Lv.8 resonance set.",
        "aliases": ["rune-slot-6", "Cổ Ngữ Khe 6", "Slot 6 Apex Resonance Rune"],
    },
    "item-rune-chest-epic": {
        "id": "item-rune-chest-epic",
        "gameId": 30242,
        "glossaryId": None,
        "category": "items",
        "iconPath": "/images/items/chests/icon_30242.webp",
        "rarity": "epic",
        "faction": "neutral",
        "nameVi": "Rương Cổ Ngữ Tím (Epic Rune Chest)",
        "nameEn": "Epic Rune Chest",
        "inGameNameVi": "Rương Cổ Ngữ Tím",
        "inGameNameEn": "Epic Rune Chest",
        "descVi": "Rương Cổ Ngữ bậc Tím — giữ nguyên trong kho chờ ghép trực tiếp lên Lv.4/Lv.5 vào Thứ Ba GAR.",
        "descEn": "Epic Rune Chest hoarded in inventory to merge directly into Lv.4/Lv.5 on GAR Tuesday.",
        "aliases": ["item-rune-chest-epic", "Rương Cổ Ngữ Tím", "Epic Rune Chest"],
    },
    "item-rune-chest-legendary": {
        "id": "item-rune-chest-legendary",
        "gameId": 30248,
        "glossaryId": None,
        "category": "items",
        "iconPath": "/images/items/chests/icon_30248.webp",
        "rarity": "legendary",
        "faction": "neutral",
        "nameVi": "Rương Cổ Ngữ Vàng Tự Chọn (Legendary Choice Rune Chest)",
        "nameEn": "Legendary Choice Rune Chest",
        "inGameNameVi": "Rương Cổ Ngữ Vàng",
        "inGameNameEn": "Legendary Rune Chest",
        "descVi": "Rương Cổ Ngữ Tự Chọn dùng bù đúng mảnh Khe V (Combat Skill Level) còn thiếu để kích mốc Lv.5 / Lv.8.",
        "descEn": "Choice Rune Chest reserved strictly to snipe missing Slot V (Combat Skill Level) runes for Lv.5 / Lv.8.",
        "aliases": ["item-rune-chest-legendary", "Rương Cổ Ngữ Vàng", "Legendary Choice Rune Chest", "Choice Rune Chest"],
    },
    "item-rune-dust": {
        "id": "item-rune-dust",
        "gameId": 10029,
        "glossaryId": None,
        "category": "items",
        "iconPath": "/images/items/currencies/icon_10029.webp",
        "rarity": "epic",
        "faction": "neutral",
        "nameVi": "Bụi Cổ Ngữ (Rune Dust / Rune Fragments)",
        "nameEn": "Rune Dust",
        "inGameNameVi": "Bụi Cổ Ngữ",
        "inGameNameEn": "Rune Dust",
        "descVi": "Tài nguyên nâng cấp Cổ Ngữ (327,660 Bụi cho 1 viên Lv.12), xả vào Thứ Ba Kỳ GAR/KvK.",
        "descEn": "Core Rune upgrade currency (327,660 Dust per Lv.12 rune), spent exclusively on GAR/KvK Tuesday.",
        "aliases": ["item-rune-dust", "Bụi Cổ Ngữ", "Rune Dust"],
    },
    "relic-dragons-might": {
        "id": "relic-dragons-might",
        "gameId": 50002,
        "glossaryId": None,
        "category": "relics",
        "iconPath": "/images/relics/illustrations/Artifact_50002.webp",
        "rarity": "mythic",
        "faction": "horde",
        "nameVi": "Thánh Vật Uy Lực Của Rồng (Dragon's Might)",
        "nameEn": "Dragon's Might (Offense Relic)",
        "inGameNameVi": "Uy Lực Của Rồng",
        "inGameNameEn": "Dragon's Might",
        "descVi": "Thánh Vật Khe Công (Assault) trấn phái gây sát thương bùng nổ và buff ATK toàn đội.",
        "descEn": "Premier Assault-slot Legendary/Mythic Relic delivering AoE burst and team-wide ATK amplification.",
        "aliases": ["relic-dragons-might", "Uy Lực Của Rồng", "Dragon's Might"],
    },
    "relic-eternal-wings": {
        "id": "relic-eternal-wings",
        "gameId": 50001,
        "glossaryId": None,
        "category": "relics",
        "iconPath": "/images/relics/illustrations/Artifact_50001.webp",
        "rarity": "mythic",
        "faction": "league",
        "nameVi": "Thánh Vật Đôi Cánh Vĩnh Hằng (Eternal Wings)",
        "nameEn": "Eternal Wings (Defense Relic)",
        "inGameNameVi": "Đôi Cánh Vĩnh Hằng",
        "inGameNameEn": "Eternal Wings",
        "descVi": "Thánh Vật Khe Thủ (Defense) tạo lá chắn bảo hộ và giảm sát thương diện rộng cho Đội 1.",
        "descEn": "Top-tier Defense-slot Relic generating protective barriers and AoE damage mitigation for Queue 1.",
        "aliases": ["relic-eternal-wings", "Đôi Cánh Vĩnh Hằng", "Eternal Wings"],
    },
    "relic-undefeated-crown": {
        "id": "relic-undefeated-crown",
        "gameId": 50003,
        "glossaryId": None,
        "category": "relics",
        "iconPath": "/images/relics/illustrations/Artifact_50003.webp",
        "rarity": "legendary",
        "faction": "league",
        "nameVi": "Vương Miện Bất Bại (Undefeated Crown)",
        "nameEn": "Undefeated Crown",
        "inGameNameVi": "Vương Miện Bất Bại",
        "inGameNameEn": "Undefeated Crown",
        "descVi": "Thánh Vật Huyền Thoại tăng cường kháng hiệu ứng khống chế và độ bền tuyến đầu.",
        "descEn": "Legendary Relic fortifying crowd-control immunity and frontline tenacity.",
        "aliases": ["relic-undefeated-crown", "Vương Miện Bất Bại", "Undefeated Crown"],
    },
    "relic-scale-of-injustice": {
        "id": "relic-scale-of-injustice",
        "gameId": 50004,
        "glossaryId": None,
        "category": "relics",
        "iconPath": "/images/relics/illustrations/Artifact_50004.webp",
        "rarity": "legendary",
        "faction": "horde",
        "nameVi": "Cán Cân Phán Quyết (Scale of Injustice)",
        "nameEn": "Scale of Injustice",
        "inGameNameVi": "Cán Cân Phán Quyết",
        "inGameNameEn": "Scale of Injustice",
        "descVi": "Thánh Vật Khe Hỗ Trợ/Công làm suy yếu phòng thủ mục tiêu và khuếch đại sát thương chuẩn.",
        "descEn": "Tactical Relic shredding enemy defenses and amplifying burst execution damage.",
        "aliases": ["relic-scale-of-injustice", "Cán Cân Phán Quyết", "Scale of Injustice"],
    },
    "relic-philosophers-stone": {
        "id": "relic-philosophers-stone",
        "gameId": 50005,
        "glossaryId": None,
        "category": "relics",
        "iconPath": "/images/relics/illustrations/Artifact_50005.webp",
        "rarity": "mythic",
        "faction": "nature",
        "nameVi": "Hòn Đá Hiền Triết (Philosopher's Stone)",
        "nameEn": "Philosopher's Stone (Support Relic)",
        "inGameNameVi": "Hòn Đá Hiền Triết",
        "inGameNameEn": "Philosopher's Stone",
        "descVi": "Thánh Vật Khe Hỗ Trợ (Support) hồi máu và bơm năng lượng vượt trội cho đội hình triệu hồi.",
        "descEn": "Premier Support-slot Relic providing team-wide sustain and energy regeneration.",
        "aliases": ["relic-philosophers-stone", "Hòn Đá Hiền Triết", "Philosopher's Stone"],
    },
    "relic-sacred-scroll": {
        "id": "relic-sacred-scroll",
        "gameId": 50006,
        "glossaryId": None,
        "category": "relics",
        "iconPath": "/images/relics/illustrations/Artifact_50006.webp",
        "rarity": "legendary",
        "faction": "league",
        "nameVi": "Cuộn Thánh Thư (Sacred Scroll / Arcane Vault)",
        "nameEn": "Sacred Scroll (Arcane Vault)",
        "inGameNameVi": "Cuộn Thánh Thư",
        "inGameNameEn": "Sacred Scroll",
        "descVi": "Thánh Vật kích hoạt liên kết sưu tập (Collection Bond) gia tăng % ATK/HP toàn quân.",
        "descEn": "Legendary Relic activating Collection Bond passive % ATK/HP bonuses across all queues.",
        "aliases": ["relic-sacred-scroll", "Cuộn Thánh Thư", "Sacred Scroll", "Arcane Vault"],
    },
    "relic-moonstone": {
        "id": "relic-moonstone",
        "gameId": 50007,
        "glossaryId": None,
        "category": "relics",
        "iconPath": "/images/relics/illustrations/Artifact_50007.webp",
        "rarity": "legendary",
        "faction": "nature",
        "nameVi": "Nguyệt Thạch Rừng Thiêng (Oath of the Sacred Forest / Moonstone)",
        "nameEn": "Moonstone (Sacred Forest Oath)",
        "inGameNameVi": "Nguyệt Thạch",
        "inGameNameEn": "Moonstone",
        "descVi": "Thánh Vật hệ Thiên Nhiên bảo hộ đồng minh và chống chế áp Sao (-50% Star Suppression).",
        "descEn": "Nature-aligned Legendary Relic shielding allies and countering -50% Star Rating Suppression.",
        "aliases": ["relic-moonstone", "Nguyệt Thạch", "Moonstone", "Oath of the Sacred Forest"],
    },
    "relic-feather-of-pact": {
        "id": "relic-feather-of-pact",
        "gameId": 50008,
        "glossaryId": None,
        "category": "relics",
        "iconPath": "/images/relics/illustrations/Artifact_50008.webp",
        "rarity": "legendary",
        "faction": "nature",
        "nameVi": "Lông Vũ Khế Ước (Feather of Pact)",
        "nameEn": "Feather of Pact",
        "inGameNameVi": "Lông Vũ Khế Ước",
        "inGameNameEn": "Feather of Pact",
        "descVi": "Thánh Vật gia tăng tốc độ hành quân và tốc độ ra đòn đầu trận.",
        "descEn": "Legendary Relic accelerating march speed and opening combat tempo.",
        "aliases": ["relic-feather-of-pact", "Lông Vũ Khế Ước", "Feather of Pact"],
    },
    "relic-scroll-exp": {
        "id": "relic-scroll-exp",
        "gameId": None,
        "glossaryId": None,
        "category": "relics",
        "iconPath": "/images/relics/shards-and-scrolls/icon_art_1101.webp",
        "rarity": "legendary",
        "faction": "neutral",
        "nameVi": "Cuộn Kinh Nghiệm Thánh Vật (Relic EXP Scroll)",
        "nameEn": "Relic EXP Scroll",
        "inGameNameVi": "Cuộn EXP Thánh Vật",
        "inGameNameEn": "Relic EXP Scroll",
        "descVi": "Vật phẩm nâng cấp cấp độ Thánh Vật, chỉ xả vào Thứ Hai/Thứ Ba GAR hoặc Thứ Tư/Thứ Năm Guild Race.",
        "descEn": "Relic leveling scroll scored on GAR Mon/Tue and Guild Race Wed/Thu (0 points on GAR Friday).",
        "aliases": ["relic-scroll-exp", "Cuộn Kinh Nghiệm Thánh Vật", "Relic EXP Scroll", "Relic EXP Scrolls"],
    },
    "pet-cactini": {
        "id": "pet-cactini",
        "gameId": 70001,
        "glossaryId": None,
        "category": "pets-behemoths",
        "iconPath": "/images/pets/avatars/Head_pet_1001.webp",
        "rarity": "legendary",
        "faction": "nature",
        "nameVi": "Thú Cưng Xương Rồng (Cactini — Nature Pet)",
        "nameEn": "Cactini (Nature Pet)",
        "inGameNameVi": "Cactini",
        "inGameNameEn": "Cactini",
        "descVi": "Thú cưng hệ Thiên Nhiên kích hoạt 3x Faction Bonus (+All Nature Hero ATK/HP).",
        "descEn": "Nature companion pet activating the 3x Faction Bonus (+All Nature Hero ATK/HP).",
        "aliases": ["pet-cactini", "Cactini", "Xương Rồng Cactini"],
    },
    "pet-howli": {
        "id": "pet-howli",
        "gameId": 70004,
        "glossaryId": None,
        "category": "pets-behemoths",
        "iconPath": "/images/pets/avatars/Head_pet_101.webp",
        "rarity": "legendary",
        "faction": "horde",
        "nameVi": "Thú Cưng Sói Con (Howli / Wolf — Horde Pet)",
        "nameEn": "Howli (Horde Wolf Pet)",
        "inGameNameVi": "Howli",
        "inGameNameEn": "Howli",
        "descVi": "Thú cưng hệ Bộ Lạc tăng sát thương bạo kích và 3x Faction Bonus cho đội hình Horde.",
        "descEn": "Horde wolf companion boosting Critical Damage and 3x Horde Faction Bonus.",
        "aliases": ["pet-howli", "Howli", "Sói Con Howli"],
    },
    "pet-flickerkit": {
        "id": "pet-flickerkit",
        "gameId": 70007,
        "glossaryId": None,
        "category": "pets-behemoths",
        "iconPath": "/images/pets/avatars/Head_pet_1101.webp",
        "rarity": "mythic",
        "faction": "horde",
        "nameVi": "Thú Cưng Mèo Lửa / Hổ Con (Flickerkit / Tiger — Horde BiS Pet)",
        "nameEn": "Flickerkit / Tiger (Horde BiS Pet)",
        "inGameNameVi": "Flickerkit",
        "inGameNameEn": "Flickerkit",
        "descVi": "Thú cưng trấn phái số 1 cho Đội 1 Bộ Lạc (Wukong / Storm Maiden), tối ưu hóa sát thương dồn.",
        "descEn": "#1 Best-in-Slot Horde companion pet for Queue 1 (Wukong / Storm Maiden), maximizing burst output.",
        "aliases": ["pet-flickerkit", "Flickerkit", "Hổ Con", "Mèo Lửa"],
    },
    "pet-eggribird": {
        "id": "pet-eggribird",
        "gameId": 70010,
        "glossaryId": None,
        "category": "pets-behemoths",
        "iconPath": "/images/pets/avatars/Head_pet_1201.webp",
        "rarity": "mythic",
        "faction": "league",
        "nameVi": "Thú Cưng Chim Ưng / Trứng Nộ (Eggribird / Sparrow — League BiS Pet)",
        "nameEn": "Eggribird / Sparrow (League BiS Pet)",
        "inGameNameVi": "Eggribird",
        "inGameNameEn": "Eggribird",
        "descVi": "Thú cưng trấn phái hệ Liên Minh cộng hưởng sát thương kỹ năng cho Paragon và Pyromancer.",
        "descEn": "Premier League companion pet amplifying skill burst for Paragon and Pyromancer.",
        "aliases": ["pet-eggribird", "Eggribird", "Chim Ưng"],
    },
    "pet-ignispal": {
        "id": "pet-ignispal",
        "gameId": 70016,
        "glossaryId": None,
        "category": "pets-behemoths",
        "iconPath": "/images/pets/avatars/Head_pet_1301.webp",
        "rarity": "mythic",
        "faction": "horde",
        "nameVi": "Thú Cưng Hỏa Linh (Ignispal — Flame Companion)",
        "nameEn": "Ignispal (Flame Companion)",
        "inGameNameVi": "Ignispal",
        "inGameNameEn": "Ignispal",
        "descVi": "Thú cưng Hỏa Linh tiến hóa 3 cấp gia tăng Hệ số chuyển đổi chỉ số (Stat Conversion Rate).",
        "descEn": "3-stage evolving Flame Pet scaling Stat Conversion Rate up to 60%+ at high levels.",
        "aliases": ["pet-ignispal", "Ignispal", "Hỏa Linh"],
    },
    "pet-florapuff": {
        "id": "pet-florapuff",
        "gameId": 70022,
        "glossaryId": None,
        "category": "pets-behemoths",
        "iconPath": "/images/pets/avatars/Head_pet_1401.webp",
        "rarity": "mythic",
        "faction": "nature",
        "nameVi": "Thú Cưng Hoa Mây (Florapuff / Bear — Nature BiS Pet)",
        "nameEn": "Florapuff (Nature BiS Pet)",
        "inGameNameVi": "Florapuff",
        "inGameNameEn": "Florapuff",
        "descVi": "Thú cưng trấn phái hệ Thiên Nhiên gia tăng hồi phục và độ bền cho Tidecaller & Monk.",
        "descEn": "Best-in-Slot Nature companion pet boosting sustain and durability for Tidecaller and Monk.",
        "aliases": ["pet-florapuff", "Florapuff", "Hoa Mây"],
    },
    "pet-egg-legendary": {
        "id": "pet-egg-legendary",
        "gameId": None,
        "glossaryId": None,
        "category": "pets-behemoths",
        "iconPath": "/images/pets/eggs-and-ui/bg_auto_egg.webp",
        "rarity": "legendary",
        "faction": "neutral",
        "nameVi": "Trứng Thú Cưng Huyền Thoại (Legendary Pet Egg)",
        "nameEn": "Legendary Pet Egg",
        "inGameNameVi": "Trứng Pet Vàng",
        "inGameNameEn": "Legendary Pet Egg",
        "descVi": "Trứng ấp Thú Cưng phẩm chất cao dùng kiếm phôi trùng (Same-Pet Copies) mở khóa mốc Lv.10/20/30.",
        "descEn": "High-rarity Pet Egg hatched to secure duplicate copies for Lv.10/20/30 promotion gates.",
        "aliases": ["pet-egg-legendary", "Trứng Thú Cưng", "Trứng Pet", "Legendary Pet Egg"],
    },
    "item-pet-food": {
        "id": "item-pet-food",
        "gameId": 10035,
        "glossaryId": None,
        "category": "items",
        "iconPath": "/images/items/currencies/icon_10035.webp",
        "rarity": "epic",
        "faction": "neutral",
        "nameVi": "Thức Ăn Thú Cưng (Pet Food)",
        "nameEn": "Pet Food",
        "inGameNameVi": "Thức Ăn Pet",
        "inGameNameEn": "Pet Food",
        "descVi": "Lương thực nâng cấp Pet từ Lv.1 lên Lv.120, tích trữ xả vào Thứ Sáu GAR hoặc Thứ Hai/Thứ Ba Guild Race.",
        "descEn": "Core Pet leveling resource (Lv.1-120), hoarded for GAR Friday or Guild Race Mon/Tue.",
        "aliases": ["item-pet-food", "Thức Ăn Pet", "Thức Ăn Thú Cưng", "Pet Food"],
    },
    "item-pet-essence": {
        "id": "item-pet-essence",
        "gameId": 10036,
        "glossaryId": None,
        "category": "items",
        "iconPath": "/images/items/currencies/icon_10036.webp",
        "rarity": "legendary",
        "faction": "neutral",
        "nameVi": "Tinh Chất Thú Cưng (Pet Essence)",
        "nameEn": "Pet Essence",
        "inGameNameVi": "Tinh Chất Pet",
        "inGameNameEn": "Pet Essence",
        "descVi": "Tinh chất đột phá bậc sao Thú Cưng, giúp tăng mạnh điểm sự kiện vào Ngày 5 Đua Vũ Trang (GAR).",
        "descEn": "Breakthrough essence required for Pet Star Promotions on GAR Day 5 (Friday).",
        "aliases": ["item-pet-essence", "Tinh Chất Thú Cưng", "Tinh Chất Pet", "Pet Essence"],
    },
    "behemoth-lion": {
        "id": "behemoth-lion",
        "gameId": None,
        "glossaryId": None,
        "category": "pets-behemoths",
        "iconPath": "/images/behemoths/SacredBeast_002.webp",
        "rarity": "mythic",
        "faction": "league",
        "nameVi": "Thần Thú Sư Tử Ánh Sáng (Sacred Lion Behemoth)",
        "nameEn": "Sacred Lion Behemoth",
        "inGameNameVi": "Thần Thú Sư Tử",
        "inGameNameEn": "Sacred Lion",
        "descVi": "Cự Thú Thần Thú số 2 hộ vệ đội hình Liên Minh và cộng hưởng +Hero Level Cap.",
        "descEn": "Sacred Beast #2 fortifying League formations and raising the global Hero Level Cap.",
        "aliases": ["behemoth-lion", "Thần Thú Sư Tử", "Sacred Lion Behemoth"],
    },
    "behemoth-tiger": {
        "id": "behemoth-tiger",
        "gameId": None,
        "glossaryId": None,
        "category": "pets-behemoths",
        "iconPath": "/images/behemoths/SacredBeast_003.webp",
        "rarity": "mythic",
        "faction": "horde",
        "nameVi": "Thần Thú Chiến Hổ (Sacred Tiger Behemoth)",
        "nameEn": "Sacred Tiger Behemoth",
        "inGameNameVi": "Thần Thú Chiến Hổ",
        "inGameNameEn": "Sacred Tiger",
        "descVi": "Cự Thú Thần Thú số 3 gia tăng sát thương bạo kích diện rộng cho đội hình Bộ Lạc.",
        "descEn": "Sacred Beast #3 unleashing AoE critical shockwaves for Horde lineups.",
        "aliases": ["behemoth-tiger", "Thần Thú Chiến Hổ", "Sacred Tiger Behemoth"],
    },
    "behemoth-gorilla": {
        "id": "behemoth-gorilla",
        "gameId": None,
        "glossaryId": None,
        "category": "pets-behemoths",
        "iconPath": "/images/behemoths/SacredBeast_004.webp",
        "rarity": "mythic",
        "faction": "horde",
        "nameVi": "Thần Thú Khỉ Đột Khổng Lồ (Sacred Gorilla Behemoth)",
        "nameEn": "Sacred Gorilla Behemoth",
        "inGameNameVi": "Thần Thú Khỉ Đột",
        "inGameNameEn": "Sacred Gorilla",
        "descVi": "Cự Thú Thần Thú số 4 gây choáng diện rộng và phá vỡ đội hình tuyến đầu đối phương.",
        "descEn": "Sacred Beast #4 delivering AoE stun slams and frontline disruption.",
        "aliases": ["behemoth-gorilla", "Thần Thú Khỉ Đột", "Sacred Gorilla Behemoth"],
    },
    "behemoth-boar": {
        "id": "behemoth-boar",
        "gameId": None,
        "glossaryId": None,
        "category": "pets-behemoths",
        "iconPath": "/images/behemoths/SacredBeast_005.webp",
        "rarity": "mythic",
        "faction": "nature",
        "nameVi": "Thần Thú Lợn Rừng Cổ Đại (Sacred Boar Behemoth)",
        "nameEn": "Sacred Boar Behemoth",
        "inGameNameVi": "Thần Thú Lợn Rừng",
        "inGameNameEn": "Sacred Boar",
        "descVi": "Cự Thú Thần Thú số 5 húc xuyên hàng thủ và tăng sức chống chịu cho đội hình.",
        "descEn": "Sacred Beast #5 charging enemy frontlines while granting team-wide tenacity.",
        "aliases": ["behemoth-boar", "Thần Thú Lợn Rừng", "Sacred Boar Behemoth"],
    },
    "behemoth-rhino": {
        "id": "behemoth-rhino",
        "gameId": None,
        "glossaryId": None,
        "category": "pets-behemoths",
        "iconPath": "/images/behemoths/SacredBeast_006.webp",
        "rarity": "mythic",
        "faction": "nature",
        "nameVi": "Thần Thú Tê Giác Thiết Giáp (Sacred Rhino Behemoth)",
        "nameEn": "Sacred Rhino Behemoth",
        "inGameNameVi": "Thần Thú Tê Giác",
        "inGameNameEn": "Sacred Rhino",
        "descVi": "Cự Thú Thần Thú số 6 mở khóa giới hạn cấp độ Anh Hùng (+1 ➔ +9 Hero Level Cap) ở Mùa 3.",
        "descEn": "Sacred Beast #6 unlocking the Season 3 Covenant Seal +1 to +9 Hero Level Cap.",
        "aliases": ["behemoth-rhino", "Thần Thú Tê Giác", "Sacred Rhino Behemoth"],
    },
    "elf-guardian-1": {
        "id": "elf-guardian-1",
        "gameId": None,
        "glossaryId": None,
        "category": "pets-behemoths",
        "iconPath": "/images/elves/bg_elves_Role001.webp",
        "rarity": "mythic",
        "faction": "nature",
        "nameVi": "Tinh Linh Hộ Vệ Rừng Xanh (Sacred Forest Elf)",
        "nameEn": "Sacred Forest Elf",
        "inGameNameVi": "Tinh Linh Rừng Xanh",
        "inGameNameEn": "Sacred Elf",
        "descVi": "Tinh Linh đồng hành trợ chiến gia tăng chỉ số cộng hưởng và hồi phục theo mùa giải.",
        "descEn": "Companion Spirit Elf providing seasonal combat resonance and team-wide sustain.",
        "aliases": ["elf-guardian-1", "Tinh Linh", "Sacred Forest Elf", "Elves"],
    },
    # Phase 4 — Group 7: Shops, Currencies, VIP & Troop Skins
    "shop-arena-star": {
        "id": "shop-arena-star",
        "gameId": 10012,
        "glossaryId": None,
        "category": "items",
        "iconPath": "/images/items/currencies/icon_10012.webp",
        "rarity": "legendary",
        "faction": "neutral",
        "nameVi": "Sao Đấu Trường (Arena Stars)",
        "nameEn": "Arena Stars",
        "inGameNameVi": "Sao Đấu Trường",
        "inGameNameEn": "Arena Stars",
        "descVi": "Tiền tệ Tiệm Đấu Trường (#1): Khóa đáy ví 1,900–2,000 Sao mỗi tuần để vét gói 300 KC (50 Sao) và 5 Mảnh Vàng.",
        "descEn": "Arena Shop (#1) currency: Lock a 1,900-2,000 Star weekly floor to sweep the 50-Star Diamond Pack and 5x Shards.",
        "aliases": ["shop-arena-star", "Sao Đấu Trường", "Arena Stars", "Arena Star"],
    },
    "shop-guild-point": {
        "id": "shop-guild-point",
        "gameId": 10008,
        "glossaryId": None,
        "category": "items",
        "iconPath": "/images/items/currencies/icon_10008.webp",
        "rarity": "epic",
        "faction": "neutral",
        "nameVi": "Điểm Cống Hiến Bang (Guild Points)",
        "nameEn": "Guild Points",
        "inGameNameVi": "Điểm Cống Hiến Bang",
        "inGameNameEn": "Guild Points",
        "descVi": "Tiền tệ Tiệm Cống Hiến Bang (#2): Giữ đáy ví 12,000–15,000 Điểm mua Điểm VIP, Thể Lực và Khiên Hòa Bình.",
        "descEn": "Guild Points Shop (#2) currency: Maintain a 12,000-15,000 Point floor for VIP Points, Stamina, and Peace Shields.",
        "aliases": ["shop-guild-point", "Điểm Cống Hiến Bang", "Guild Points", "Guild Point"],
    },
    "shop-valor-coin": {
        "id": "shop-valor-coin",
        "gameId": 10014,
        "glossaryId": None,
        "category": "items",
        "iconPath": "/images/items/currencies/icon_10014.webp",
        "rarity": "legendary",
        "faction": "neutral",
        "nameVi": "Xu Dũng Khí Chiến Trường (Combat Valor Coins)",
        "nameEn": "Combat Valor Coins",
        "inGameNameVi": "Xu Dũng Khí",
        "inGameNameEn": "Valor Coins",
        "descVi": "Tiền tệ Tiệm Chiến Trường (#3): Dồn 100% mua Mảnh Tướng Vàng Vạn Năng giảm giá, Vũ Khí Độc Quyền và Orichalcum.",
        "descEn": "Combat Valor Shop (#3) currency prioritized for discounted Universal Shards, Exclusive Gear Shards, and Orichalcum.",
        "aliases": ["shop-valor-coin", "Xu Dũng Khí", "Valor Coins", "Combat Valor"],
    },
    "shop-clash-coin": {
        "id": "shop-clash-coin",
        "gameId": 10023,
        "glossaryId": None,
        "category": "items",
        "iconPath": "/images/items/currencies/icon_10023.webp",
        "rarity": "legendary",
        "faction": "neutral",
        "nameVi": "Xu Chiến Đấu 4 Quốc Gia (4 Nations / Citadel Clash Coins)",
        "nameEn": "Citadel Clash Coins (4 Nations)",
        "inGameNameVi": "Xu Chiến Đấu",
        "inGameNameEn": "Clash Coins",
        "descVi": "Tiền tệ Tiệm 4 Quốc Gia (#4): Ưu tiên mua Mảnh Vũ Khí Độc Quyền Vạn Năng và Đá Thăng Cấp Trang Bị.",
        "descEn": "4 Nations / Citadel Clash (#4) currency prioritized for Universal Exclusive Weapon Shards and Promotion Stones.",
        "aliases": ["shop-clash-coin", "Xu Chiến Đấu", "Clash Coins", "Citadel Clash"],
    },
    "item-soul-stone-league": {
        "id": "item-soul-stone-league",
        "gameId": 30231,
        "glossaryId": None,
        "category": "items",
        "iconPath": "/images/items/shards/icon_30231.webp",
        "rarity": "mythic",
        "faction": "league",
        "nameVi": "Hồn Đá Đỏ Liên Minh (League Soul Stone)",
        "nameEn": "League Soul Stone",
        "inGameNameVi": "Hồn Đá Liên Minh",
        "inGameNameEn": "League Soul Stone",
        "descVi": "Đá Thức Tỉnh hệ Liên Minh (9 viên = 1 Tướng Vàng hóa Đỏ: Pyromancer, Adjudicator, Nun).",
        "descEn": "League Awakening Soul Stone (9 stones = 1 SSR to Mythic Red: Pyromancer, Adjudicator, Nun).",
        "aliases": ["item-soul-stone-league", "Hồn Đá Liên Minh", "League Soul Stone"],
    },
    "item-soul-stone-horde": {
        "id": "item-soul-stone-horde",
        "gameId": 30232,
        "glossaryId": None,
        "category": "items",
        "iconPath": "/images/items/shards/icon_30232.webp",
        "rarity": "mythic",
        "faction": "horde",
        "nameVi": "Hồn Đá Đỏ Bộ Lạc (Horde Soul Stone)",
        "nameEn": "Horde Soul Stone",
        "inGameNameVi": "Hồn Đá Bộ Lạc",
        "inGameNameEn": "Horde Soul Stone",
        "descVi": "Đá Thức Tỉnh hệ Bộ Lạc — Đội 1 Bộ Lạc chỉ tốn đúng 9 viên cho Soulmancer (tiết kiệm 67% so với Liên Minh).",
        "descEn": "Horde Awakening Soul Stone — Horde Queue 1 only needs 9 stones for Soulmancer (saving 67% vs League).",
        "aliases": ["item-soul-stone-horde", "Hồn Đá Bộ Lạc", "Horde Soul Stone"],
    },
    "item-soul-stone-nature": {
        "id": "item-soul-stone-nature",
        "gameId": 30233,
        "glossaryId": None,
        "category": "items",
        "iconPath": "/images/items/shards/icon_30233.webp",
        "rarity": "mythic",
        "faction": "nature",
        "nameVi": "Hồn Đá Đỏ Thiên Nhiên (Nature Soul Stone)",
        "nameEn": "Nature Soul Stone",
        "inGameNameVi": "Hồn Đá Thiên Nhiên",
        "inGameNameEn": "Nature Soul Stone",
        "descVi": "Đá Thức Tỉnh hệ Thiên Nhiên dùng thức tỉnh Pixie, Forest Maiden và Sage lên phẩm chất Đỏ.",
        "descEn": "Nature Awakening Soul Stone used to awaken Pixie, Forest Maiden, and Sage to Mythic Red.",
        "aliases": ["item-soul-stone-nature", "Hồn Đá Thiên Nhiên", "Nature Soul Stone"],
    },
    "item-vip-points": {
        "id": "item-vip-points",
        "gameId": 30371,
        "glossaryId": None,
        "category": "items",
        "iconPath": "/images/items/consumables/icon_30371.webp",
        "rarity": "legendary",
        "faction": "neutral",
        "nameVi": "Điểm Đặc Quyền VIP (VIP Points)",
        "nameEn": "VIP Points",
        "inGameNameVi": "Điểm VIP",
        "inGameNameEn": "VIP Points",
        "descVi": "Điểm mở khóa đặc quyền VIP 4, VIP 6, VIP 8 (+1 Hàng đợi & +10% Tốc độ Nghiên cứu), mua vét hàng tuần ở Tiệm Bang.",
        "descEn": "Points unlocking VIP 4, VIP 6, and VIP 8 perks (+1 March Queue & +10% Research Speed), swept weekly in Guild Shop.",
        "aliases": ["item-vip-points", "Điểm VIP", "VIP Points", "VIP Point", "VIP 1", "VIP 8", "VIP"],
    },
    "vip-privilege-chest": {
        "id": "vip-privilege-chest",
        "gameId": None,
        "glossaryId": None,
        "category": "items",
        "iconPath": "/images/shop/vip-privilege/pri_103.webp",
        "rarity": "mythic",
        "faction": "neutral",
        "nameVi": "Đặc Quyền VIP & Rương Tiệm VIP (VIP Privilege & Shop)",
        "nameEn": "VIP Privilege & Shop Chest",
        "inGameNameVi": "Đặc Quyền VIP",
        "inGameNameEn": "VIP Privilege",
        "descVi": "Biểu tượng đặc quyền VIP mở khóa Tiệm VIP (#6) mua Mảnh Vàng giảm giá và Thể Lực.",
        "descEn": "VIP Privilege emblem unlocking discounted Universal Legendary Shards and Stamina Potions in VIP Shop.",
        "aliases": ["vip-privilege-chest", "Đặc Quyền VIP", "VIP Privilege", "Tiệm VIP"],
    },
    "item-kingdom-emblem": {
        "id": "item-kingdom-emblem",
        "gameId": 10040,
        "glossaryId": None,
        "category": "items",
        "iconPath": "/images/items/currencies/icon_10040.webp",
        "rarity": "mythic",
        "faction": "neutral",
        "nameVi": "Huy Hiệu Vương Quốc (Kingdom Emblems)",
        "nameEn": "Kingdom Emblems",
        "inGameNameVi": "Huy Hiệu Vương Quốc",
        "inGameNameEn": "Kingdom Emblems",
        "descVi": "Tiền tệ Tiệm Vương Quốc (#11): Nguồn cung cấp độc quyền Máu Rồng (Dragon Blood) và Tinh Chất Rồng.",
        "descEn": "Kingdom Emblem Shop (#11) currency: Primary source for Dragon Blood, Dragon Essence, and Exclusive Shards.",
        "aliases": ["item-kingdom-emblem", "Huy Hiệu Vương Quốc", "Kingdom Emblems", "Kingdom Emblem"],
    },
    "item-invasion-coin": {
        "id": "item-invasion-coin",
        "gameId": 10016,
        "glossaryId": None,
        "category": "items",
        "iconPath": "/images/items/currencies/icon_10016.webp",
        "rarity": "legendary",
        "faction": "neutral",
        "nameVi": "Xu Xâm Lăng Rồng Đen / Yeti (Invasion Coins)",
        "nameEn": "Invasion Coins (Black Dragon / Yeti)",
        "inGameNameVi": "Xu Xâm Lăng",
        "inGameNameEn": "Invasion Coins",
        "descVi": "Tiền tệ Tiệm Xâm Lăng (#12): Dồn mua Mảnh Thánh Vật Vàng (Legendary Relic Shards) và Mảnh Tướng Vàng.",
        "descEn": "Invasion Shop (#12) currency spent strictly on Legendary Relic Shards and Universal Legendary Hero Shards.",
        "aliases": ["item-invasion-coin", "Xu Xâm Lăng", "Invasion Coins", "Invasion Shop"],
    },
    "item-peace-shield": {
        "id": "item-peace-shield",
        "gameId": 30041,
        "glossaryId": None,
        "category": "items",
        "iconPath": "/images/items/consumables/icon_30041.webp",
        "rarity": "epic",
        "faction": "neutral",
        "nameVi": "Khiên Hòa Bình 8h / 24h (Peace Shield)",
        "nameEn": "Peace Shield (8h / 24h)",
        "inGameNameVi": "Khiên Hòa Bình",
        "inGameNameEn": "Peace Shield",
        "descVi": "Khiên bảo vệ Lâu Đài trong ngày Thứ Bảy Chiến Sự (KvK), mua sẵn bằng Guild Points để không tốn Kim Cương.",
        "descEn": "Castle protection shield for Saturday KvK Kill Events, pre-purchased with Guild Points to save Diamonds.",
        "aliases": ["item-peace-shield", "Khiên Hòa Bình", "Peace Shield", "8h / 24h Peace Shield"],
    },
    "item-stamina-potion": {
        "id": "item-stamina-potion",
        "gameId": 30037,
        "glossaryId": None,
        "category": "items",
        "iconPath": "/images/items/consumables/icon_30037.webp",
        "rarity": "epic",
        "faction": "neutral",
        "nameVi": "Bình Thể Lực 25 (Stamina Potion 25)",
        "nameEn": "Stamina Potion (25 Stamina)",
        "inGameNameVi": "Bình Thể Lực",
        "inGameNameEn": "Stamina Potion",
        "descVi": "Bình hồi 25 Thể Lực mua từ Tiệm Bang & Tiệm VIP, cất kho chờ Thứ Tư Kỳ GAR/KvK xả săn Boss.",
        "descEn": "25-Stamina recovery potion bought from Guild and VIP Shops, banked for GAR/KvK Wednesday rallies.",
        "aliases": ["item-stamina-potion", "Bình Thể Lực", "Bình Thể Lực 25", "Stamina Potion", "Stamina Potion 25"],
    },
    "troop-skin-heavy-cavalry": {
        "id": "troop-skin-heavy-cavalry",
        "gameId": 80005,
        "glossaryId": None,
        "category": "items",
        "iconPath": "/images/troops/skins-avatars/ArmsHead_10005_1.webp",
        "rarity": "legendary",
        "faction": "league",
        "nameVi": "Quân Trang Kỵ Binh Thiết Giáp (Heavy Cavalry Troop Skin)",
        "nameEn": "Heavy Cavalry Troop Skin",
        "inGameNameVi": "Kỵ Binh Thiết Giáp",
        "inGameNameEn": "Heavy Cavalry",
        "descVi": "Quân Trang Huyền Thoại tăng tốc độ hành quân và cộng chỉ số Sở Hữu (Owned Passive) ở mốc Lv.10 / Lv.20.",
        "descEn": "Legendary Troop Skin boosting march speed and global Owned Passive stats at Lv.10 / Lv.20.",
        "aliases": ["troop-skin-heavy-cavalry", "Kỵ Binh Thiết Giáp", "Heavy Cavalry", "Quân Trang"],
    },
    "troop-skin-samurai": {
        "id": "troop-skin-samurai",
        "gameId": 80006,
        "glossaryId": None,
        "category": "items",
        "iconPath": "/images/troops/skins-avatars/ArmsHead_10006_1.webp",
        "rarity": "legendary",
        "faction": "horde",
        "nameVi": "Quân Trang Võ Sĩ Samurai (Samurai Warrior Troop Skin)",
        "nameEn": "Samurai Warrior Troop Skin",
        "inGameNameVi": "Võ Sĩ Samurai",
        "inGameNameEn": "Samurai Troop Skin",
        "descVi": "Quân Trang Huyền Thoại chủ lực PvP gia tăng sát thương binh chủng và Owned ATK/HP ở Lv.10★ / Lv.20★★.",
        "descEn": "Premier PvP Legendary Troop Skin amplifying troop damage and global Owned ATK/HP at Lv.10 / Lv.20.",
        "aliases": ["troop-skin-samurai", "Võ Sĩ Samurai", "Samurai Troop Skin"],
    },
    "troop-skin-bear": {
        "id": "troop-skin-bear",
        "gameId": 80007,
        "glossaryId": None,
        "category": "items",
        "iconPath": "/images/troops/skins-avatars/ArmsHead_10007_1.webp",
        "rarity": "legendary",
        "faction": "nature",
        "nameVi": "Quân Trang Giáp Gấu Rừng (Bearskin Guard Troop Skin)",
        "nameEn": "Bearskin Guard Troop Skin",
        "inGameNameVi": "Giáp Gấu Rừng",
        "inGameNameEn": "Bearskin Guard",
        "descVi": "Quân Trang Huyền Thoại phòng thủ giảm sát thương nhận vào và tăng máu toàn quân.",
        "descEn": "Defensive Legendary Troop Skin mitigating incoming damage and boosting global troop HP.",
        "aliases": ["troop-skin-bear", "Giáp Gấu Rừng", "Bearskin Guard"],
    },
    "troop-skin-drum": {
        "id": "troop-skin-drum",
        "gameId": 80015,
        "glossaryId": None,
        "category": "items",
        "iconPath": "/images/troops/skins-avatars/ArmsHead_10015_1.webp",
        "rarity": "mythic",
        "faction": "horde",
        "nameVi": "Quân Trang Trống Chiến Bộ Lạc (War Drum Troop Skin)",
        "nameEn": "War Drum Troop Skin",
        "inGameNameVi": "Trống Chiến",
        "inGameNameEn": "War Drum Skin",
        "descVi": "Quân Trang Thần Thoại tăng khí thế toàn quân và chỉ số sở hữu vĩnh viễn cho cả 3 Đội hình.",
        "descEn": "Mythic War Drum Troop Skin granting combat morale and permanent Owned Passive stats.",
        "aliases": ["troop-skin-drum", "Trống Chiến", "War Drum Troop Skin"],
    },
    "troop-skin-siege": {
        "id": "troop-skin-siege",
        "gameId": 80004,
        "glossaryId": None,
        "category": "items",
        "iconPath": "/images/troops/skins-avatars/ArmsHead_10004_1.webp",
        "rarity": "epic",
        "faction": "neutral",
        "nameVi": "Quân Trang Xe Công Thành (Siege Engine Troop Skin)",
        "nameEn": "Siege Engine Troop Skin",
        "inGameNameVi": "Xe Công Thành",
        "inGameNameEn": "Siege Engine",
        "descVi": "Quân Trang Tím mở khóa tại Tiệm Huân Chương (30,000 Glory Medals), nâng lên Lv.10 chỉ tốn 40,200 Medals.",
        "descEn": "Epic Troop Skin unlocked in Medal Shop (30,000 Glory Medals), reaching Lv.10 for just 40,200 Medals.",
        "aliases": ["troop-skin-siege", "Xe Công Thành", "Siege Engine"],
    },
    "troop-skin-legendary-chest": {
        "id": "troop-skin-legendary-chest",
        "gameId": 30255,
        "glossaryId": None,
        "category": "items",
        "iconPath": "/images/items/chests/icon_30255.webp",
        "rarity": "legendary",
        "faction": "neutral",
        "nameVi": "Rương Quân Trang Vàng Vạn Năng (Universal Legendary Troop Skin)",
        "nameEn": "Universal Legendary Troop Skin Chest",
        "inGameNameVi": "Rương Quân Trang Vàng",
        "inGameNameEn": "Legendary Troop Skin Chest",
        "descVi": "Vật phẩm nâng sao Quân Trang Vàng — lưu ý trong Tiệm Vinh Dự luôn ưu tiên Hồn Đá Đỏ trước.",
        "descEn": "Universal Legendary Troop Skin upgrade item — never buy before securing your 9 Awakening Soul Stones.",
        "aliases": ["troop-skin-legendary-chest", "Rương Quân Trang Vàng", "Universal Legendary Troop Skin"],
    },
    "troop-rank-1": {
        "id": "troop-rank-1",
        "gameId": None,
        "glossaryId": None,
        "category": "items",
        "iconPath": "/images/troops/faction-units/army_quality_1.webp",
        "rarity": "common",
        "faction": "neutral",
        "nameVi": "Binh Chủng Bậc Thấp (Tier 5–6 Troops)",
        "nameEn": "Tier 5–6 Troops (Base Rank)",
        "inGameNameVi": "Lính Bậc 5–6",
        "inGameNameEn": "Tier 5–6 Troops",
        "descVi": "Cấp bậc lính cơ sở giai đoạn tân thủ (T5–T6), giữ lại làm phôi đôn bậc cầu thang (Staircase Promotion).",
        "descEn": "Early-game troop rank (T5-T6) retained as base fodder for Friday Staircase Promotions.",
        "aliases": ["troop-rank-1", "Lính Bậc 5", "Tier 5 Troops", "Lính Bậc 6", "Tier 6 Troops"],
    },
    "troop-rank-2": {
        "id": "troop-rank-2",
        "gameId": None,
        "glossaryId": None,
        "category": "items",
        "iconPath": "/images/troops/faction-units/army_quality_2.webp",
        "rarity": "uncommon",
        "faction": "neutral",
        "nameVi": "Binh Chủng Trung Cấp (Tier 7 Troops)",
        "nameEn": "Tier 7 Troops (Uncommon Rank)",
        "inGameNameVi": "Lính Bậc 7",
        "inGameNameEn": "Tier 7 Troops",
        "descVi": "Lính Bậc 7 mở khóa ở Lâu Đài Lv.20, dùng làm bàn đạp đôn bậc lên T8/T9 vào Thứ Sáu GAR.",
        "descEn": "Tier 7 troops unlocked at Castle Lv.20, used as stepping stones for GAR Friday promotions.",
        "aliases": ["troop-rank-2", "Lính Bậc 7", "Tier 7 Troops"],
    },
    "troop-rank-3": {
        "id": "troop-rank-3",
        "gameId": None,
        "glossaryId": None,
        "category": "items",
        "iconPath": "/images/troops/faction-units/army_quality_3.webp",
        "rarity": "rare",
        "faction": "neutral",
        "nameVi": "Binh Chủng Tinh Nhuệ (Tier 8–9 Troops)",
        "nameEn": "Tier 8–9 Troops (Elite Rank)",
        "inGameNameVi": "Lính Bậc 8–9",
        "inGameNameEn": "Tier 8–9 Troops",
        "descVi": "Lính Bậc 8 (Lv.24) & Bậc 9 (Lv.28) gánh vác giai đoạn Giữa game trước khi chạm ngưỡng Lv.35.",
        "descEn": "Mid-game Tier 8 (Lv.24) and Tier 9 (Lv.28) troops carrying formations prior to Castle Lv.35.",
        "aliases": ["troop-rank-3", "Lính Bậc 8", "Tier 8 Troops", "Lính Bậc 9", "Tier 9 Troops"],
    },
    "troop-rank-4": {
        "id": "troop-rank-4",
        "gameId": None,
        "glossaryId": None,
        "category": "items",
        "iconPath": "/images/troops/faction-units/army_quality_4.webp",
        "rarity": "legendary",
        "faction": "neutral",
        "nameVi": "Binh Chủng Huyền Thoại T10 (Tier 10 Troops — Castle Lv.35)",
        "nameEn": "Tier 10 Troops (Castle Lv.35 +1 Level)",
        "inGameNameVi": "Lính Bậc 10 (T10)",
        "inGameNameEn": "Tier 10 Troops (T10)",
        "descVi": "Bước nhảy vọt sức mạnh lớn nhất cho F2P: mở khóa tại Trại Lính Lv.35 cộng trực tiếp +1 Cấp Quân Lính.",
        "descEn": "Biggest F2P power spike: unlocked at Barracks Lv.35 granting +1 Troop Level across the board.",
        "aliases": ["troop-rank-4", "Lính Bậc 10", "Tier 10 Troops", "T10"],
    },
    "troop-rank-5": {
        "id": "troop-rank-5",
        "gameId": None,
        "glossaryId": None,
        "category": "items",
        "iconPath": "/images/troops/faction-units/army_quality_5.webp",
        "rarity": "mythic",
        "faction": "neutral",
        "nameVi": "Binh Chủng Thần Thoại T11 (Tier 11 Troops — 5,422 Dragon Essence)",
        "nameEn": "Tier 11 Troops (5,422 Dragon Essence Path)",
        "inGameNameVi": "Lính Bậc 11 (T11)",
        "inGameNameEn": "Tier 11 Troops (T11)",
        "descVi": "Binh chủng tối thượng mở khóa qua Viện Huy Hoàng & Nhánh Nghiên Cứu Chiến Đấu (5,422 Tinh Hoa Rồng).",
        "descEn": "Endgame apex troops unlocked via the Brilliance Institute & Combat Tech path (5,422 Dragon Essence).",
        "aliases": ["troop-rank-5", "Lính Bậc 11", "Tier 11 Troops", "T11"],
    },
    # Phase 4 — Group 8: Castle, Brilliance, Villagers, Research & Master Tables
    "building-castle": {
        "id": "building-castle",
        "gameId": None,
        "glossaryId": None,
        "category": "buildings-decor",
        "iconPath": "/images/buildings/structures/icon_building_chengbao.webp",
        "rarity": "mythic",
        "faction": "neutral",
        "nameVi": "Lâu Đài Chính (Main Castle Lv.1–40 & Brilliance)",
        "nameEn": "Main Castle (Lv.1–40 & Brilliance)",
        "inGameNameVi": "Lâu Đài Chính",
        "inGameNameEn": "Main Castle",
        "descVi": "Trái tim của vương quốc quyết định giới hạn Cấp Tướng và mở khóa Lính Bậc 10 ở mốc Lv.35.",
        "descEn": "Core citadel governing Hero Level Caps and unlocking Tier 10 Troops at the Lv.35 milestone.",
        "aliases": ["building-castle", "Lâu Đài Chính", "Main Castle", "Castle Lv.35", "Castle Lv.40"],
    },
    "building-barracks-horde": {
        "id": "building-barracks-horde",
        "gameId": None,
        "glossaryId": None,
        "category": "buildings-decor",
        "iconPath": "/images/buildings/structures/icon_building_buzubingying.webp",
        "rarity": "legendary",
        "faction": "horde",
        "nameVi": "Trại Lính Bộ Lạc (Horde Barracks)",
        "nameEn": "Horde Barracks",
        "inGameNameVi": "Trại Lính Bộ Lạc",
        "inGameNameEn": "Horde Barracks",
        "descVi": "Công trình huấn luyện lính Bộ Lạc và cộng hưởng chỉ số trực tiếp cho toàn bộ tướng Horde.",
        "descEn": "Horde military barracks training troops and granting faction-wide stat buffs to Horde heroes.",
        "aliases": ["building-barracks-horde", "Trại Lính Bộ Lạc", "Horde Barracks"],
    },
    "building-barracks-league": {
        "id": "building-barracks-league",
        "gameId": None,
        "glossaryId": None,
        "category": "buildings-decor",
        "iconPath": "/images/buildings/structures/icon_building_lianmengbingying.webp",
        "rarity": "legendary",
        "faction": "league",
        "nameVi": "Trại Lính Liên Minh (League Barracks)",
        "nameEn": "League Barracks",
        "inGameNameVi": "Trại Lính Liên Minh",
        "inGameNameEn": "League Barracks",
        "descVi": "Công trình huấn luyện lính Liên Minh, điều kiện tiên quyết để bấm Lâu Đài ở các cấp bậc tương ứng.",
        "descEn": "League military barracks serving as a key prerequisite along the Castle Rush critical path.",
        "aliases": ["building-barracks-league", "Trại Lính Liên Minh", "League Barracks"],
    },
    "building-barracks-nature": {
        "id": "building-barracks-nature",
        "gameId": None,
        "glossaryId": None,
        "category": "buildings-decor",
        "iconPath": "/images/buildings/structures/icon_building_ziranbingying.webp",
        "rarity": "legendary",
        "faction": "nature",
        "nameVi": "Trại Lính Thiên Nhiên (Nature Barracks)",
        "nameEn": "Nature Barracks",
        "inGameNameVi": "Trại Lính Thiên Nhiên",
        "inGameNameEn": "Nature Barracks",
        "descVi": "Công trình huấn luyện lính Thiên Nhiên và mở khóa bậc lính T10 ở cấp độ 35.",
        "descEn": "Nature military barracks unlocking Tier 10 Troops upon reaching Lv.35.",
        "aliases": ["building-barracks-nature", "Trại Lính Thiên Nhiên", "Nature Barracks"],
    },
    "building-statue-horde": {
        "id": "building-statue-horde",
        "gameId": None,
        "glossaryId": None,
        "category": "buildings-decor",
        "iconPath": "/images/buildings/structures/icon_building_buzudiaoxiang.webp",
        "rarity": "epic",
        "faction": "horde",
        "nameVi": "Tượng Thần Bộ Lạc (Horde Faction Statue)",
        "nameEn": "Horde Faction Statue",
        "inGameNameVi": "Tượng Bộ Lạc",
        "inGameNameEn": "Horde Statue",
        "descVi": "Tượng đài phe phái gia tăng trực tiếp % ATK và % HP cho mọi anh hùng thuộc hệ Bộ Lạc.",
        "descEn": "Faction monument directly amplifying % ATK and % HP for all Horde heroes.",
        "aliases": ["building-statue-horde", "Tượng Bộ Lạc", "Horde Faction Statue", "Horde Statue"],
    },
    "building-workers-hall": {
        "id": "building-workers-hall",
        "gameId": None,
        "glossaryId": None,
        "category": "buildings-decor",
        "iconPath": "/images/buildings/structures/icon_building_WorkersHall.webp",
        "rarity": "legendary",
        "faction": "neutral",
        "nameVi": "Sảnh Nhân Tài / Nhà Dân Làng (Talent Hall / Workers Hall)",
        "nameEn": "Talent Hall (Villager Management)",
        "inGameNameVi": "Sảnh Nhân Tài",
        "inGameNameEn": "Talent Hall",
        "descVi": "Trung tâm quản lý và thăng cấp Dân Làng (Lv.1–6) phân bổ vào Viện Nghiên Cứu, Sảnh Huân Chương và Mỏ.",
        "descEn": "Central hub for upgrading and assigning Villagers (Lv.1-6) to Research Cottage and Medal Hall.",
        "aliases": ["building-workers-hall", "Sảnh Nhân Tài", "Talent Hall", "Workers Hall"],
    },
    "building-guild": {
        "id": "building-guild",
        "gameId": None,
        "glossaryId": None,
        "category": "buildings-decor",
        "iconPath": "/images/buildings/structures/icon_building_gonghui.webp",
        "rarity": "epic",
        "faction": "neutral",
        "nameVi": "Đại Sảnh Bang Hội (Guild Hall)",
        "nameEn": "Guild Hall",
        "inGameNameVi": "Đại Sảnh Bang",
        "inGameNameEn": "Guild Hall",
        "descVi": "Công trình tăng số lượt Giúp đỡ Bang hội (Guild Helps) và quy mô tập kết (Rally Capacity).",
        "descEn": "Alliance structure increasing Guild Help count, time reduction per help, and Rally Capacity.",
        "aliases": ["building-guild", "Đại Sảnh Bang", "Guild Hall"],
    },
    "building-hospital": {
        "id": "building-hospital",
        "gameId": None,
        "glossaryId": None,
        "category": "buildings-decor",
        "iconPath": "/images/buildings/structures/icon_building_hospital.webp",
        "rarity": "epic",
        "faction": "neutral",
        "nameVi": "Bệnh Viện Chiến Trường (Hospital)",
        "nameEn": "Military Hospital",
        "inGameNameVi": "Bệnh Viện",
        "inGameNameEn": "Hospital",
        "descVi": "Công trình bảo vệ sức chứa thương binh, ngăn chặn chết lính vĩnh viễn khi giao tranh KvK.",
        "descEn": "Medical facility expanding wounded capacity to prevent permanent troop loss during KvK.",
        "aliases": ["building-hospital", "Bệnh Viện", "Hospital", "Military Hospital"],
    },
    "building-tavern": {
        "id": "building-tavern",
        "gameId": None,
        "glossaryId": None,
        "category": "buildings-decor",
        "iconPath": "/images/buildings/structures/icon_building_jiuguan.webp",
        "rarity": "epic",
        "faction": "neutral",
        "nameVi": "Quán Rượu Chiêu Mộ (Tavern)",
        "nameEn": "Recruitment Tavern",
        "inGameNameVi": "Quán Rượu",
        "inGameNameEn": "Tavern",
        "descVi": "Công trình chiêu mộ Anh hùng bằng Vé Chiêu Mộ (xả vào Ngày 4 Đua Vũ Trang GAR/KvK).",
        "descEn": "Hero recruitment hall where hoarded Recruit Tokens are spent on GAR/KvK Thursday.",
        "aliases": ["building-tavern", "Quán Rượu", "Tavern"],
    },
    "building-relic-hall": {
        "id": "building-relic-hall",
        "gameId": None,
        "glossaryId": None,
        "category": "buildings-decor",
        "iconPath": "/images/buildings/structures/icon_building_mibaodating.webp",
        "rarity": "legendary",
        "faction": "neutral",
        "nameVi": "Điện Thánh Vật (Relic Hall / Sacred Hall)",
        "nameEn": "Relic Hall (Sacred Hall)",
        "inGameNameVi": "Điện Thánh Vật",
        "inGameNameEn": "Relic Hall",
        "descVi": "Công trình kích hoạt Liên kết Sưu tập Thánh Vật (Collection Bonds) và chế tạo mảnh Bí bảo.",
        "descEn": "Sanctuary housing Relic Collection Bonds and passive Owned Relic stat bonuses.",
        "aliases": ["building-relic-hall", "Điện Thánh Vật", "Relic Hall"],
    },
    "building-pet-paradise": {
        "id": "building-pet-paradise",
        "gameId": None,
        "glossaryId": None,
        "category": "buildings-decor",
        "iconPath": "/images/buildings/structures/icon_building_pet.webp",
        "rarity": "legendary",
        "faction": "neutral",
        "nameVi": "Đảo Thú Cưng (Pet Paradise)",
        "nameEn": "Pet Paradise",
        "inGameNameVi": "Đảo Thú Cưng",
        "inGameNameEn": "Pet Paradise",
        "descVi": "Khu bảo tồn ấp Trứng Pet, sản xuất Thức ăn Thú cưng và tiến hóa 3 cấp ngoại hình.",
        "descEn": "Sanctuary for hatching Pet Eggs, producing Pet Food, and unlocking 3-stage Pet evolutions.",
        "aliases": ["building-pet-paradise", "Đảo Thú Cưng", "Pet Paradise"],
    },
    "tech-brilliance-league": {
        "id": "tech-brilliance-league",
        "gameId": 101,
        "glossaryId": None,
        "category": "skills-tech",
        "iconPath": "/images/tech/brilliance/icon_Radiance_101.webp",
        "rarity": "mythic",
        "faction": "league",
        "nameVi": "Thiên Phú Huy Hoàng Liên Minh (League Brilliance Talent)",
        "nameEn": "League Brilliance Talent",
        "inGameNameVi": "Huy Hoàng Liên Minh",
        "inGameNameEn": "League Brilliance",
        "descVi": "Nhánh công nghệ Viện Huy Hoàng mở khóa sức mạnh T11 và +1 Cấp Quân Lính Liên Minh.",
        "descEn": "Brilliance Institute talent tree unlocking Tier 11 Troops and +1 League Troop Level.",
        "aliases": ["tech-brilliance-league", "Huy Hoàng Liên Minh", "League Brilliance Talent"],
    },
    "tech-brilliance-horde": {
        "id": "tech-brilliance-horde",
        "gameId": 201,
        "glossaryId": None,
        "category": "skills-tech",
        "iconPath": "/images/tech/brilliance/icon_Radiance_201.webp",
        "rarity": "mythic",
        "faction": "horde",
        "nameVi": "Thiên Phú Huy Hoàng Bộ Lạc (Horde Brilliance Talent)",
        "nameEn": "Horde Brilliance Talent",
        "inGameNameVi": "Huy Hoàng Bộ Lạc",
        "inGameNameEn": "Horde Brilliance",
        "descVi": "Nhánh công nghệ Viện Huy Hoàng tốn 5,422 Tinh Hoa Rồng mở khóa Lính T11 Bộ Lạc.",
        "descEn": "5,422 Dragon Essence Brilliance Institute path unlocking Tier 11 Horde Troops.",
        "aliases": ["tech-brilliance-horde", "Huy Hoàng Bộ Lạc", "Horde Brilliance Talent"],
    },
    "tech-brilliance-nature": {
        "id": "tech-brilliance-nature",
        "gameId": 301,
        "glossaryId": None,
        "category": "skills-tech",
        "iconPath": "/images/tech/brilliance/icon_Radiance_301.webp",
        "rarity": "mythic",
        "faction": "nature",
        "nameVi": "Thiên Phú Huy Hoàng Thiên Nhiên (Nature Brilliance Talent)",
        "nameEn": "Nature Brilliance Talent",
        "inGameNameVi": "Huy Hoàng Thiên Nhiên",
        "inGameNameEn": "Nature Brilliance",
        "descVi": "Nhánh công nghệ Viện Huy Hoàng gia tăng chỉ số tối thượng cho hệ Thiên Nhiên.",
        "descEn": "Brilliance Institute talent branch amplifying Nature faction endgame combat stats.",
        "aliases": ["tech-brilliance-nature", "Huy Hoàng Thiên Nhiên", "Nature Brilliance Talent"],
    },
    "tech-research-1001": {
        "id": "tech-research-1001",
        "gameId": 1001,
        "glossaryId": None,
        "category": "skills-tech",
        "iconPath": "/images/tech/research/tech_1001.webp",
        "rarity": "legendary",
        "faction": "neutral",
        "nameVi": "Nhánh Nghiên Cứu Chuẩn Bị Đua Vũ Trang (Arms Race Prep / Commendation Tech)",
        "nameEn": "Arms Race Prep / Commendation Tech",
        "inGameNameVi": "Nghiên Cứu Sự Kiện",
        "inGameNameEn": "Arms Race Prep Tech",
        "descVi": "Nhánh công nghệ ưu tiên số 1 tại Viện Nghiên Cứu: nhân đôi phần thưởng và mở Rương 6–9 GAR.",
        "descEn": "#1 priority Research Cottage tree: unlocks double event rewards and GAR Chests 6-9.",
        "aliases": ["tech-research-1001", "Arms Race Prep", "Commendation Tech", "Nghiên Cứu Sự Kiện"],
    },
    "tech-research-1101": {
        "id": "tech-research-1101",
        "gameId": 1101,
        "glossaryId": None,
        "category": "skills-tech",
        "iconPath": "/images/tech/research/tech_1101.webp",
        "rarity": "legendary",
        "faction": "neutral",
        "nameVi": "Nhánh Nghiên Cứu Hàng Đợi & Anh Hùng (Queue Boost & Hero Tech)",
        "nameEn": "Queue Boost & Hero Tech Tree",
        "inGameNameVi": "Nghiên Cứu Hàng Đợi",
        "inGameNameEn": "Queue Boost Tech",
        "descVi": "Nhánh công nghệ tăng Quy mô Hành quân (March Size) và chỉ số trực tiếp cho Đội 1.",
        "descEn": "Research tree expanding March Size and directly boosting Queue 1 combat attributes.",
        "aliases": ["tech-research-1101", "Queue Boost", "Nghiên Cứu Hàng Đợi"],
    },
    "tech-research-1201": {
        "id": "tech-research-1201",
        "gameId": 1201,
        "glossaryId": None,
        "category": "skills-tech",
        "iconPath": "/images/tech/research/tech_1201.webp",
        "rarity": "mythic",
        "faction": "neutral",
        "nameVi": "Nhánh Nghiên Cứu Chiến Đấu T11 (Soldiers / T11 Critical Path — 4,677 DE)",
        "nameEn": "Soldiers / T11 Combat Tech Path (4,677 DE)",
        "inGameNameVi": "Nghiên Cứu Lính T11",
        "inGameNameEn": "T11 Combat Tech",
        "descVi": "Đường găng 4,677 Tinh Hoa Rồng trong Viện Nghiên Cứu để mở khóa Lính Bậc 11 (T11).",
        "descEn": "4,677 Dragon Essence critical path inside the Research Cottage required to unlock T11 Troops.",
        "aliases": ["tech-research-1201", "Nghiên Cứu Lính T11", "T11 Combat Tech"],
    },
    "villager-01": {
        "id": "villager-01",
        "gameId": None,
        "glossaryId": None,
        "category": "buildings-decor",
        "iconPath": "/images/villagers/portraits/villager_01.webp",
        "rarity": "legendary",
        "faction": "neutral",
        "nameVi": "Dân Làng Học Giả — Viện Nghiên Cứu (Research Scholar Villager)",
        "nameEn": "Research Scholar Villager",
        "inGameNameVi": "Dân Làng Nghiên Cứu",
        "inGameNameEn": "Scholar Villager",
        "descVi": "Dân Làng ưu tiên số 1 đóng quân tại Viện Nghiên Cứu giúp rút ngắn hàng trăm ngày công nghệ.",
        "descEn": "#1 priority Villager stationed in the Research Cottage to slash technology timers.",
        "aliases": ["villager-01", "Dân Làng", "Villager", "Villagers", "Research Scholar Villager"],
    },
    "villager-02": {
        "id": "villager-02",
        "gameId": None,
        "glossaryId": None,
        "category": "buildings-decor",
        "iconPath": "/images/villagers/portraits/villager_02.webp",
        "rarity": "legendary",
        "faction": "neutral",
        "nameVi": "Dân Làng Kiến Trúc Sư — Xây Dựng (Master Builder Villager)",
        "nameEn": "Master Builder Villager",
        "inGameNameVi": "Dân Làng Xây Dựng",
        "inGameNameEn": "Builder Villager",
        "descVi": "Dân Làng tăng tốc độ Xây dựng Lâu Đài và giảm chi phí tài nguyên nâng cấp công trình.",
        "descEn": "Villager accelerating Castle construction speed and reducing building resource costs.",
        "aliases": ["villager-02", "Dân Làng Xây Dựng", "Master Builder Villager"],
    },
    "villager-03": {
        "id": "villager-03",
        "gameId": None,
        "glossaryId": None,
        "category": "buildings-decor",
        "iconPath": "/images/villagers/portraits/villager_11.webp",
        "rarity": "epic",
        "faction": "neutral",
        "nameVi": "Dân Làng Huấn Luyện — Sảnh Huân Chương (Medal Hall Villager)",
        "nameEn": "Medal Hall Villager",
        "inGameNameVi": "Dân Làng Huân Chương",
        "inGameNameEn": "Medal Villager",
        "descVi": "Dân Làng đóng tại Sảnh Huân Chương và Trại Lính tăng hiệu suất Quân Trang và tốc độ luyện lính.",
        "descEn": "Villager stationed in the Medal Hall and Barracks boosting troop training and skin resonance.",
        "aliases": ["villager-03", "Dân Làng Huân Chương", "Medal Hall Villager"],
    },
    "villager-04": {
        "id": "villager-04",
        "gameId": None,
        "glossaryId": None,
        "category": "buildings-decor",
        "iconPath": "/images/villagers/portraits/villager_04.webp",
        "rarity": "epic",
        "faction": "neutral",
        "nameVi": "Dân Làng Khai Khoáng — Mỏ Ruby (Ruby Miner Villager)",
        "nameEn": "Ruby Miner Villager",
        "inGameNameVi": "Dân Làng Mỏ Ruby",
        "inGameNameEn": "Ruby Villager",
        "descVi": "Dân Làng tăng sản lượng khai thác Ruby và Hộp Quà Mái Nhà (Roof Gift Boxes).",
        "descEn": "Villager boosting passive Ruby production and Roof Gift Box accumulation.",
        "aliases": ["villager-04", "Dân Làng Mỏ Ruby", "Ruby Miner Villager"],
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
    assert len(spotlights) in (91, 94), f"Expected 91 or 94 media_spotlight blocks, got {len(spotlights)}"
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
        # Phase 4 — Group 5 Bespoke Showcase Decks (MED-5.1 to MED-5.4)
        "MED-5.1-01": [
            make_item("gear-slot-weapon-knight", "HERO GEAR"),
            make_item("item-upgrade-rune", "0 EVENT PTS"),
            make_item("item-gold-ingot", "BLACKSMITH"),
            make_item("gear-exclusive-weapon", "UW SHARDS"),
            make_item("gear-lord-sword", "LORD GEAR"),
            make_item("item-lord-orichalcum", "300% SCORE"),
        ],
        "MED-5.1-02": [
            make_item("building-blacksmith", "100% REFUND"),
            make_item("item-upgrade-rune", "780K / HERO"),
            make_item("item-ruby", "3.74M RUBIES"),
            make_item("gear-slot-weapon-titan", "SLOT 1 WEAPON"),
            make_item("gear-slot-armor-titan", "SLOT 4 ARMOR"),
            make_item("gear-lord-helm", "LORD PROFILE"),
        ],
        "MED-5.1-03": [
            make_item("gear-set-knights-glory", "4-PC HERO GEAR"),
            make_item("gear-exclusive-weapon", "UW +10 / +20"),
            make_item("gear-lord-sword", "6-SLOT LORD"),
            make_item("item-upgrade-rune", "SPEND ANYTIME"),
            make_item("item-lord-orichalcum", "GAR WED/THU"),
            make_item("item-lord-dragon-blood", "GUILD RACE FRI"),
        ],
        "MED-5.1-04": [
            make_item("building-blacksmith", "FORGE GUIDE"),
            make_item("gear-set-blood-of-the-titan", "TANK BIS"),
            make_item("gear-set-knights-glory", "CARRY BIS"),
            make_item("gear-set-glory-of-the-sage", "SUPPORT BIS"),
            make_item("item-legendary-promotion-stone", "1★-4★ STONE"),
            make_item("item-mythic-promotion-stone", "5★ MYTHIC"),
        ],
        "MED-5.2-01": [
            make_item("gear-set-knights-glory", "ROW 1 CARRY"),
            make_item("gear-set-blood-of-the-titan", "ROW 2 TANK"),
            make_item("gear-set-glory-of-the-sage", "ROW 3 SUPPORT"),
            make_item("faction-league", "COL 1 +30%"),
            make_item("faction-horde", "COL 2 +30%"),
            make_item("faction-nature", "COL 3 +30%"),
        ],
        "MED-5.2-02": [
            make_item("building-blacksmith", "3x4 MATRIX"),
            make_item("faction-league", "COL 1 LEAGUE"),
            make_item("faction-horde", "COL 2 HORDE"),
            make_item("faction-nature", "COL 3 NATURE"),
            make_item("item-gold-ingot", "750 INGOTS"),
            make_item("gear-slot-weapon-knight", "NEVER COL 4"),
        ],
        "MED-5.2-03": [
            make_item("hero-wukong", "#1 CARRY GEAR"),
            make_item("gear-set-knights-glory", "+80% ATK SET"),
            make_item("hero-beastmaster", "#2 TANK GEAR"),
            make_item("gear-set-blood-of-the-titan", "+160% HP SET"),
            make_item("hero-witch", "#3 HEAL GEAR"),
            make_item("gear-set-glory-of-the-sage", "+8% SKILL AMP"),
        ],
        "MED-5.2-04": [
            make_item("gear-slot-weapon-knight", "KNIGHT WEAPON"),
            make_item("gear-slot-armor-knight", "KNIGHT ARMOR"),
            make_item("gear-slot-weapon-titan", "TITAN WEAPON"),
            make_item("gear-slot-armor-titan", "TITAN ARMOR"),
            make_item("gear-slot-weapon-sage", "SAGE WEAPON"),
            make_item("gear-slot-armor-sage", "SAGE ARMOR"),
        ],
        "MED-5.3-01": [
            make_item("item-upgrade-rune", "MASTER +10/+40"),
            make_item("item-ruby", "936K / PIECE"),
            make_item("item-legendary-promotion-stone", "50 GOLD STONES"),
            make_item("item-mythic-promotion-stone", "30 RED STONES"),
            make_item("item-gold-ingot", "6,000 INGOTS"),
            make_item("gear-exclusive-weapon", "UW LV.10/20"),
        ],
        "MED-5.3-02": [
            make_item("gear-slot-weapon-knight", "SYNC +10/+20"),
            make_item("gear-slot-boots-knight", "SYNC +10/+20"),
            make_item("gear-slot-helmet-knight", "SYNC +10/+20"),
            make_item("gear-slot-armor-knight", "SYNC +10/+20"),
            make_item("item-upgrade-rune", "780K / HERO"),
            make_item("building-blacksmith", "RESONANCE ON"),
        ],
        "MED-5.3-03": [
            make_item("item-legendary-promotion-stone", "1★-4★ (200)"),
            make_item("item-mythic-promotion-stone", "5★ RED (120)"),
            make_item("item-gold-ingot", "6,000 INGOTS"),
            make_item("gear-exclusive-weapon", "UW +5 UNLOCK"),
            make_item("hero-wukong", "UW +10 SPIKE"),
            make_item("hero-tidecaller", "UW +20 APEX"),
        ],
        "MED-5.3-04": [
            make_item("gear-exclusive-weapon", "38 EXCLUSIVE"),
            make_item("item-mythic-promotion-stone", "MYTHIC 5★"),
            make_item("item-legendary-promotion-stone", "GOLDEN 1★-4★"),
            make_item("hero-wukong", "RUYI JINGU"),
            make_item("hero-paragon", "SOLAR BLADE"),
            make_item("hero-tidecaller", "TIDAL STAFF"),
        ],
        "MED-5.4-01": [
            make_item("gear-lord-sword", "SLOT 1 HORDE"),
            make_item("gear-lord-wand", "SLOT 2 HORDE"),
            make_item("gear-lord-chest", "SLOT 3 NATURE"),
            make_item("gear-lord-greaves", "SLOT 4 NATURE"),
            make_item("gear-lord-helm", "SLOT 5 LEAGUE"),
            make_item("gear-lord-ring", "SLOT 6 LEAGUE"),
        ],
        "MED-5.4-02": [
            make_item("item-lord-refined-metal", "REFINED METAL"),
            make_item("item-lord-magic-thread", "MAGIC THREAD"),
            make_item("item-lord-orichalcum", "ORICHALCUM"),
            make_item("item-lord-dragon-blood", "DRAGON BLOOD"),
            make_item("event-guild-arms-race", "GAR DAY 3-4"),
            make_item("item-guild-coins", "GR FRI-SAT"),
        ],
        "MED-5.4-03": [
            make_item("gear-lord-sword", "LEFT BRANCH"),
            make_item("gear-lord-wand", "RIGHT BRANCH"),
            make_item("item-lord-orichalcum", "BOTTLENECK #1"),
            make_item("item-lord-dragon-blood", "MYTHIC TIER"),
            make_item("faction-horde", "SYNC 6 PIECES"),
            make_item("meta-double-dip", "300% SCORE"),
        ],
        # Phase 4 — Group 6 Bespoke Showcase Decks (MED-6.1 to MED-6.3)
        "MED-6.1-01": [
            make_item("rune-slot-1", "SLOT I ATK"),
            make_item("rune-slot-2", "SLOT II HP"),
            make_item("rune-slot-3", "SLOT III DEF"),
            make_item("rune-slot-4", "SLOT IV AMP"),
            make_item("rune-slot-5", "SLOT V +SKILL"),
            make_item("rune-slot-6", "SLOT VI APEX"),
        ],
        "MED-6.1-02": [
            make_item("item-rune-chest-legendary", "CHOICE CHEST"),
            make_item("item-rune-chest-epic", "HOLD TIL LV.4"),
            make_item("item-rune-dust", "327,660 DUST"),
            make_item("rune-slot-5", "+COMBAT SKILL"),
            make_item("rune-slot-1", "LV.5 BREAKPT"),
            make_item("rune-slot-6", "LV.8 BREAKPT"),
        ],
        "MED-6.1-03": [
            make_item("item-rune-chest-epic", "HOLD LV.1-3"),
            make_item("rune-slot-5", "SNIPE SLOT V"),
            make_item("item-rune-chest-legendary", "FILL GAP LV.5"),
            make_item("item-rune-dust", "GAR TUESDAY"),
            make_item("rune-slot-1", "SYNC 6x LV.5"),
            make_item("rune-slot-6", "SYNC 6x LV.8"),
        ],
        "MED-6.1-04": [
            make_item("rune-slot-5", "COMBAT SKILL"),
            make_item("item-rune-chest-legendary", "CHOICE RUNE"),
            make_item("item-rune-dust", "RUNE DUST"),
            make_item("rune-slot-1", "ATK RUNE"),
            make_item("rune-slot-2", "HP RUNE"),
            make_item("event-guild-arms-race", "TUE RUNE DAY"),
        ],
        "MED-6.2-01": [
            make_item("relic-dragons-might", "ASSAULT SLOT"),
            make_item("relic-eternal-wings", "DEFENSE SLOT"),
            make_item("relic-philosophers-stone", "SUPPORT SLOT"),
            make_item("relic-undefeated-crown", "LEAGUE BOND"),
            make_item("relic-scale-of-injustice", "HORDE BOND"),
            make_item("relic-moonstone", "NATURE BOND"),
        ],
        "MED-6.2-02": [
            make_item("building-relic-hall", "RELIC HALL"),
            make_item("relic-sacred-scroll", "OWNED PASSIVE"),
            make_item("relic-dragons-might", "-50% SUPPRESS"),
            make_item("relic-feather-of-pact", "BOND BONUS"),
            make_item("relic-scroll-exp", "RELIC SCROLL"),
            make_item("item-invasion-coin", "INVASION SHOP"),
        ],
        "MED-6.2-03": [
            make_item("relic-eternal-wings", "SLOT 1 SHIELD"),
            make_item("relic-dragons-might", "SLOT 2 BURST"),
            make_item("relic-philosophers-stone", "SLOT 3 HEAL"),
            make_item("relic-scroll-exp", "GAR MON/TUE"),
            make_item("item-guild-coins", "GR WED/THU"),
            make_item("building-relic-hall", "0 PT ON FRI"),
        ],
        "MED-6.2-04": [
            make_item("relic-dragons-might", "S+ OFFENSE"),
            make_item("relic-eternal-wings", "S+ DEFENSE"),
            make_item("relic-philosophers-stone", "S+ SUPPORT"),
            make_item("relic-undefeated-crown", "CROWN RELIC"),
            make_item("relic-scale-of-injustice", "SCALE RELIC"),
            make_item("relic-moonstone", "MOONSTONE"),
        ],
        "MED-6.3-01": [
            make_item("pet-flickerkit", "HORDE BIS PET"),
            make_item("pet-eggribird", "LEAGUE BIS PET"),
            make_item("pet-florapuff", "NATURE BIS PET"),
            make_item("pet-howli", "HORDE WOLF"),
            make_item("pet-cactini", "NATURE CACTUS"),
            make_item("pet-egg-legendary", "3x FACTION"),
        ],
        "MED-6.3-02": [
            make_item("behemoth-bear", "BEHEMOTH #1"),
            make_item("behemoth-lion", "BEHEMOTH #2"),
            make_item("behemoth-tiger", "BEHEMOTH #3"),
            make_item("behemoth-gorilla", "BEHEMOTH #4"),
            make_item("behemoth-boar", "BEHEMOTH #5"),
            make_item("behemoth-rhino", "+9 HERO CAP"),
        ],
        "MED-6.3-03": [
            make_item("pet-egg-legendary", "HATCH FODDER"),
            make_item("item-pet-food", "LV.10/20/30"),
            make_item("item-pet-essence", "STAR PROMOTE"),
            make_item("pet-flickerkit", "36%->44% CONV"),
            make_item("behemoth-bear", "S3 BEHEMOTH"),
            make_item("elf-guardian-1", "SACRED ELF"),
        ],
        "MED-6.3-04": [
            make_item("building-pet-paradise", "PET PARADISE"),
            make_item("pet-ignispal", "3-STAGE EVO"),
            make_item("item-pet-food", "GAR FRIDAY"),
            make_item("item-pet-essence", "GR MON-TUE"),
            make_item("behemoth-tiger", "0 PT GAR WED"),
            make_item("elf-guardian-1", "ELF SYSTEM"),
        ],
        # Phase 4 — Group 7 Bespoke Showcase Decks (MED-7.1 to MED-7.4)
        "MED-7.1-01": [
            make_item("shop-arena-star", "#1 ARENA 2K"),
            make_item("shop-guild-point", "#2 GUILD 15K"),
            make_item("item-guild-honor", "#5 HONOR 40K"),
            make_item("item-diamond", "#6 VIP 32K"),
            make_item("item-glory-medal", "#10 MEDAL 30K"),
            make_item("item-kingdom-emblem", "#11 EMBLEM"),
        ],
        "MED-7.1-02": [
            make_item("item-diamond", "50★ = 300 KC"),
            make_item("item-recruit-token", "50★ TOKEN"),
            make_item("item-universal-shard", "1,500★ 5x SSR"),
            make_item("item-vip-points", "1,000 GP VIP"),
            make_item("item-stamina-potion", "800 GP STAMINA"),
            make_item("item-peace-shield", "KVK SHIELD"),
        ],
        "MED-7.1-03": [
            make_item("shop-arena-star", "LOCK 2,000★"),
            make_item("shop-guild-point", "LOCK 15,000 GP"),
            make_item("item-guild-honor", "LOCK 40,000 GH"),
            make_item("item-soul-stone", "SWEEP S+ FIRST"),
            make_item("gear-exclusive-weapon", "UW SHARDS"),
            make_item("item-lord-orichalcum", "ORICHALCUM"),
        ],
        "MED-7.1-04": [
            make_item("shop-valor-coin", "VALOR SHOP"),
            make_item("shop-clash-coin", "4 NATIONS"),
            make_item("item-invasion-coin", "INVASION SHOP"),
            make_item("item-decor-token", "DECOR SHOP"),
            make_item("event-fortune-wheel", "WHEEL SHOP"),
            make_item("event-dice-of-fate", "DICE SHOP"),
        ],
        "MED-7.2-01": [
            make_item("item-soul-stone", "9 STONES = 1 UR"),
            make_item("item-soul-stone-league", "LEAGUE STONE"),
            make_item("item-soul-stone-horde", "HORDE STONE"),
            make_item("item-soul-stone-nature", "NATURE STONE"),
            make_item("item-guild-honor", "360K HONOR"),
            make_item("item-guild-coins", "54K COINS"),
        ],
        "MED-7.2-02": [
            make_item("item-guild-honor", "40K / STONE"),
            make_item("item-guild-coins", "6,000 / STONE"),
            make_item("item-soul-stone", "TOP SLOT #1"),
            make_item("troop-skin-legendary-chest", "12K COIN TRAP"),
            make_item("hero-soulmancer", "HORDE AWAKEN"),
            make_item("hero-pyromancer", "LEAGUE AWAKEN"),
        ],
        "MED-7.2-03": [
            make_item("building-castle", "CASTLE LV.30"),
            make_item("season-s1", "S1 ROTATION"),
            make_item("item-soul-stone-league", "WEEK 1 LEAGUE"),
            make_item("item-soul-stone-horde", "WEEK 2 HORDE"),
            make_item("item-soul-stone-nature", "WEEK 3 NATURE"),
            make_item("hero-soulmancer", "SAVE 67% COST"),
        ],
        "MED-7.2-04": [
            make_item("item-soul-stone", "AWAKEN GUIDE"),
            make_item("item-guild-honor", "FREEZE 40K"),
            make_item("item-guild-coins", "FREEZE 18K"),
            make_item("hero-soulmancer", "9 STONES ONLY"),
            make_item("hero-adjudicator", "LEAGUE TANK"),
            make_item("hero-pixie", "NATURE BURST"),
        ],
        "MED-7.3-01": [
            make_item("item-vip-points", "VIP 4/6/8/10"),
            make_item("vip-privilege-chest", "VIP PERKS"),
            make_item("item-universal-shard", "15★ EXCHANGE"),
            make_item("event-fortune-wheel", "WHEEL COINS"),
            make_item("event-dice-of-fate", "DICE VOUCHERS"),
            make_item("item-diamond", "32K+ RESERVE"),
        ],
        "MED-7.3-02": [
            make_item("event-fortune-wheel", "CARRY OVER"),
            make_item("event-dice-of-fate", "300-600 COINS"),
            make_item("item-soul-stone", "REDEEM STONE"),
            make_item("gear-exclusive-weapon", "REDEEM UW"),
            make_item("hero-wukong", "MYTHIC BOX"),
            make_item("item-decor-token", "LEGEN DECOR"),
        ],
        "MED-7.3-03": [
            make_item("hero-knight", "500 SHARD 15★"),
            make_item("hero-brawler", "12★ TRAIT 3"),
            make_item("item-universal-shard", "WEEKLY SWEEP"),
            make_item("item-vip-points", "VIP 8 +1 QUEUE"),
            make_item("event-fortune-wheel", "HOARD TOKENS"),
            make_item("event-dice-of-fate", "ZERO EXPIRY"),
        ],
        "MED-7.3-04": [
            make_item("event-fortune-wheel", "WHEEL STRATEGY"),
            make_item("event-dice-of-fate", "DICE STRATEGY"),
            make_item("vip-privilege-chest", "VIP ROI TIER"),
            make_item("item-diamond", "F2P BUDGET"),
            make_item("item-soul-stone", "SOUL STONE BOX"),
            make_item("gear-exclusive-weapon", "UW CHOICE BOX"),
        ],
        "MED-7.4-01": [
            make_item("item-glory-medal", "GLORY MEDALS"),
            make_item("troop-skin-heavy-cavalry", "CAVALRY SKIN"),
            make_item("troop-skin-samurai", "SAMURAI SKIN"),
            make_item("troop-skin-bear", "BEARSKIN GUARD"),
            make_item("troop-skin-drum", "WAR DRUM SKIN"),
            make_item("troop-skin-siege", "SIEGE ENGINE"),
        ],
        "MED-7.4-02": [
            make_item("item-glory-medal", "15K / 30K SHOP"),
            make_item("troop-skin-siege", "40,200 LV.10"),
            make_item("troop-skin-samurai", "80,400 LV.10"),
            make_item("troop-skin-heavy-cavalry", "MARCH SPEED"),
            make_item("troop-skin-bear", "COMBAT SWAP"),
            make_item("event-kvk", "SAT KVK BURST"),
        ],
        "MED-7.4-03": [
            make_item("item-glory-medal", "MEDAL BUDGET"),
            make_item("troop-skin-siege", "STEP 1 UNLOCK"),
            make_item("troop-skin-samurai", "STEP 2 LV.10★"),
            make_item("troop-skin-heavy-cavalry", "STEP 3 LV.20★★"),
            make_item("troop-skin-drum", "OWNED PASSIVE"),
            make_item("troop-skin-legendary-chest", "SPREAD WIDE"),
        ],
        "MED-7.4-04": [
            make_item("item-glory-medal", "MEDAL GUIDE"),
            make_item("troop-skin-samurai", "LV.10 BREAKPT"),
            make_item("troop-skin-heavy-cavalry", "LV.20 BREAKPT"),
            make_item("troop-rank-4", "T10 SYNERGY"),
            make_item("troop-rank-5", "T11 SYNERGY"),
            make_item("event-guild-arms-race", "GAR DAY 6"),
        ],
        # Phase 4 — Group 8 Bespoke Showcase Decks (MED-8.1 to MED-8.4)
        "MED-8.1-01": [
            make_item("building-castle", "CASTLE LV.35"),
            make_item("system-research-cottage", "RESEARCH PREREQ"),
            make_item("building-barracks-horde", "BARRACKS LV.35"),
            make_item("troop-rank-4", "UNLOCK T10 +1"),
            make_item("system-brilliance-institute", "BRILLIANCE"),
            make_item("item-dragon-essence", "5,422 DE T11"),
        ],
        "MED-8.1-02": [
            make_item("building-castle", "LV.35 MILESTONE"),
            make_item("troop-rank-4", "TIER 10 TROOPS"),
            make_item("building-barracks-horde", "HORDE T10"),
            make_item("building-barracks-league", "LEAGUE T10"),
            make_item("building-barracks-nature", "NATURE T10"),
            make_item("item-speedup", "CASTLE RUSH"),
        ],
        "MED-8.1-03": [
            make_item("item-dragon-essence", "5,422 VS 8,400"),
            make_item("system-brilliance-institute", "BRILLIANCE T11"),
            make_item("tech-brilliance-horde", "HORDE TALENT"),
            make_item("tech-brilliance-league", "LEAGUE TALENT"),
            make_item("tech-brilliance-nature", "NATURE TALENT"),
            make_item("troop-rank-5", "UNLOCK T11"),
        ],
        "MED-8.1-04": [
            make_item("building-castle", "LV.35 -> LV.40"),
            make_item("item-dragon-essence", "DRAGON ESSENCE"),
            make_item("system-brilliance-institute", "INSTITUTE"),
            make_item("tech-research-1201", "4,677 DE TECH"),
            make_item("troop-rank-4", "T10 BREAKPT"),
            make_item("troop-rank-5", "T11 APEX"),
        ],
        "MED-8.2-01": [
            make_item("building-workers-hall", "TALENT HALL"),
            make_item("villager-01", "SCHOLAR #1"),
            make_item("villager-02", "BUILDER #2"),
            make_item("hero-bard", "+40% BUILD"),
            make_item("hero-brawler", "+30% RESEARCH"),
            make_item("building-castle", "GIFT BOX BANK"),
        ],
        "MED-8.2-02": [
            make_item("building-castle", "ROOF GIFT BOX"),
            make_item("building-workers-hall", "3-4 QUEUES"),
            make_item("villager-02", "BUILDER QUEUE"),
            make_item("item-speedup", "GAR MONDAY"),
            make_item("item-dragon-essence", "PRE-UPGRADE"),
            make_item("building-guild", "GUILD HELPS"),
        ],
        "MED-8.2-03": [
            make_item("villager-01", "RESEARCH SLOT"),
            make_item("villager-03", "MEDAL HALL"),
            make_item("villager-04", "RUBY MINE"),
            make_item("system-research-cottage", "MAX SPEED %"),
            make_item("building-workers-hall", "VILLAGER LV.6"),
            make_item("hero-shaman", "+40% RESEARCH"),
        ],
        "MED-8.2-04": [
            make_item("villager-01", "LV.1-6 GUIDE"),
            make_item("villager-02", "BUILDER OPT"),
            make_item("hero-brawler", "TRAIT 3 LV.30"),
            make_item("hero-knight", "TRAIT 3 LV.30"),
            make_item("building-workers-hall", "WORKERS HALL"),
            make_item("building-castle", "BANK BOXES"),
        ],
        "MED-8.3-01": [
            make_item("system-research-cottage", "RESEARCH TREE"),
            make_item("tech-research-1001", "#1 ARMS PREP"),
            make_item("tech-research-1101", "#2 QUEUE BOOST"),
            make_item("tech-research-1201", "#3 T11 COMBAT"),
            make_item("event-guild-arms-race", "CHEST 6-9 2X"),
            make_item("item-guild-honor", "DOUBLE HONOR"),
        ],
        "MED-8.3-02": [
            make_item("tech-research-1001", "COMMENDATION"),
            make_item("tech-research-1101", "MARCH SIZE"),
            make_item("tech-research-1201", "4,677 DE T11"),
            make_item("villager-01", "PRE-CLICK BUFF"),
            make_item("hero-shaman", "SNAPSHOT SPEED"),
            make_item("item-speedup", "TUE TECH BURST"),
        ],
        "MED-8.3-03": [
            make_item("system-research-cottage", "SNAPSHOT COMBO"),
            make_item("villager-01", "STATION FIRST"),
            make_item("hero-brawler", "+30% TRAIT 3"),
            make_item("item-vip-points", "VIP 8 +10%"),
            make_item("building-guild", "GUILD HELP"),
            make_item("item-speedup", "SAVE 35%+ TIME"),
        ],
        "MED-8.3-04": [
            make_item("tech-research-1001", "ARMS RACE TECH"),
            make_item("tech-research-1201", "4,677 DE PATH"),
            make_item("item-dragon-essence", "DE BUDGET"),
            make_item("hero-rose-princess", "BAIT SLOT 1⇄2"),
            make_item("hero-wukong", "COUNTER DIVE"),
            make_item("troop-rank-5", "T11 UNLOCK"),
        ],
        "MED-8.4-01": [
            make_item("item-universal-shard", "1.1 HERO STARS"),
            make_item("item-soul-stone", "1.2 AWAKENING"),
            make_item("item-upgrade-rune", "1.3 GEAR +40"),
            make_item("troop-rank-4", "1.4 TROOP T10"),
            make_item("rune-slot-5", "4.4 RUNES LV.12"),
            make_item("item-glory-medal", "4.6 SKINS LV.50"),
        ],
        "MED-8.4-02": [
            make_item("item-universal-shard", "1,000 SHARDS"),
            make_item("item-skill-book", "24,700 BOOKS"),
            make_item("item-soul-stone", "9 SOUL STONES"),
            make_item("item-upgrade-rune", "780,000 ORE"),
            make_item("troop-rank-4", "LV.35 T10 +1"),
            make_item("troop-rank-5", "5,422 DE T11"),
        ],
        "MED-8.4-03": [
            make_item("gear-lord-sword", "4.3 LORD GEAR"),
            make_item("rune-slot-5", "4.4 RUNES 327K"),
            make_item("pet-flickerkit", "4.5 PETS LV.120"),
            make_item("troop-skin-samurai", "4.6 SKINS 80.4K"),
            make_item("item-vip-points", "4.7 VIP 1-20"),
            make_item("item-dragon-essence", "4.1 FACTION 80"),
        ],
        "MED-8.4-04": [
            make_item("gear-lord-sword", "LEFT: HORDE"),
            make_item("gear-lord-chest", "LEFT: NATURE"),
            make_item("gear-lord-helm", "LEFT: LEAGUE"),
            make_item("troop-skin-samurai", "OWNED PASSIVE"),
            make_item("troop-skin-heavy-cavalry", "LV.10 / LV.20"),
            make_item("item-glory-medal", "80,400 MEDALS"),
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
        10006: ("hero-wizard", "league", "rare", "Pháp Sư Già (Wizard)", "Wizard"),
        10007: ("hero-archer", "nature", "rare", "Dược Sư (Pharmacist)", "Pharmacist"),
        10009: ("hero-inventor", "league", "epic", "Thợ Rèn (Blacksmith)", "Blacksmith"),
        10026: ("hero-butcher", "nature", "legendary", "Thợ Đá (Stonemason)", "Stonemason"),
        10053: ("hero-storm-oracle", "league", "legendary", "Nữ Hầu Ly Ly (Lilia Maid)", "Lilia Maid"),
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
    for diag_code in ["MED-5.1-03", "MED-5.2-03", "MED-5.3-03", "MED-5.4-03", "MED-6.1-03", "MED-6.2-03", "MED-6.3-03", "MED-7.1-03", "MED-7.2-03", "MED-7.3-03", "MED-7.4-03", "MED-8.1-01", "MED-8.2-01", "MED-8.3-02", "MED-8.4-01"]:
        if diag_code not in media_showcase_by_code:
            media_showcase_by_code[diag_code] = select_showcase_for_spotlight({"mediaCode": diag_code, "articleCode": diag_code.split("-")[1], "titleVi": "", "titleEn": "", "descVi": "", "descEn": ""}, asset_registry)

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
        "1 ➔ 5 sao vàng": "tier-yellow-stars",
        "yellow stars": "tier-yellow-stars",
        "1 ➔ 5 yellow stars": "tier-yellow-stars",
        "1 ➔ 5 sao đỏ": "tier-red-stars",
        "red stars": "tier-red-stars",
        "1 ➔ 5 red stars": "tier-red-stars",
        "1 ➔ 5 sao trắng": "tier-white-stars",
        "white stars": "tier-white-stars",
        "1 ➔ 5 white stars": "tier-white-stars",
        "quặng cường hóa": "item-upgrade-rune",
        "enhancement ore": "item-upgrade-rune",
        "thỏi vàng": "item-gold-ingot",
        "gold ingot": "item-gold-ingot",
        "gold ingots": "item-gold-ingot",
        "lõi sắt thiên thạch": "item-upgrade-rune",
        "meteoric iron core": "item-upgrade-rune",
        "meteoric iron cores": "item-upgrade-rune",
        "hồng ngọc": "item-ruby",
        "ruby": "item-ruby",
        "rubies": "item-ruby",
        "thép tinh luyện": "item-lord-refined-metal",
        "refined metal": "item-lord-refined-metal",
        "chỉ phép": "item-lord-magic-thread",
        "magic thread": "item-lord-magic-thread",
        "bản vẽ orichalcum": "item-lord-orichalcum",
        "orichalcum": "item-lord-orichalcum",
        "máu rồng": "item-lord-dragon-blood",
        "dragon blood": "item-lord-dragon-blood",
        "bụi cổ ngữ": "item-rune-dust",
        "rune dust": "item-rune-dust",
        "mảnh cổ ngữ": "item-rune-fragments",
        "rune fragments": "item-rune-fragments",
        "thức ăn pet": "item-pet-food",
        "pet food": "item-pet-food",
        "tinh chất pet": "item-pet-essence",
        "pet essence": "item-pet-essence",
        "sao đấu trường": "shop-arena-star",
        "arena stars": "shop-arena-star",
        "điểm cống hiến bang": "shop-guild-point",
        "guild points": "shop-guild-point",
        "xu dũng khí": "shop-valor-coin",
        "valor coins": "shop-valor-coin",
        "xu chiến đấu": "shop-clash-coin",
        "clash coins": "shop-clash-coin",
        "điểm vip": "item-vip-points",
        "vip points": "item-vip-points",
        "huy hiệu vương quốc": "item-kingdom-emblem",
        "kingdom emblems": "item-kingdom-emblem",
        "xu xâm lăng": "item-invasion-coin",
        "invasion coins": "item-invasion-coin",
        "khiên hòa bình": "item-peace-shield",
        "peace shield": "item-peace-shield",
        "bình thể lực": "item-stamina-potion",
        "stamina potion": "item-stamina-potion",
        "lính bậc 10": "troop-rank-4",
        "tier 10 troops": "troop-rank-4",
        "lính bậc 11": "troop-rank-5",
        "tier 11 troops": "troop-rank-5",
        "lâu đài chính": "building-castle",
        "main castle": "building-castle",
        "viện huy hoàng": "building-brilliance-institute",
        "brilliance institute": "building-brilliance-institute",
        "viện nghiên cứu": "building-research-cottage",
        "research cottage": "building-research-cottage",
        "sảnh nhân tài": "building-workers-hall",
        "talent hall": "building-workers-hall",
        "tinh hoa rồng": "item-dragon-essence",
        "dragon essence": "item-dragon-essence",
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

    build_codex_shards(manifest, glossary_terms, asset_registry, hero_profiles)


CODEX_OUTPUT_DIR = os.path.join(PUBLIC_DIR, "data", "codex")

CODEX_CATEGORIES: Tuple[str, ...] = (
    "heroes",
    "items",
    "equipment",
    "relics",
    "pets-behemoths",
    "buildings-decor",
    "skills-tech",
    "troops",
    "events-seasons",
    "monsters",
    "cosmetics",
    "shop-vip",
)

DEFAULT_RELATED_ARTICLES: Dict[str, List[str]] = {
    "heroes": [
        "heroes/encyclopedia",
        "heroes/meta-lineups",
        "heroes/shards-and-skill-books",
    ],
    "items": [
        "getting-started/diamond-and-spending-guide",
        "economy/shops-tier-list",
        "events/double-dip-schedule",
    ],
    "equipment": [
        "gear/gear-overview",
        "gear/golden-gear-sets",
        "gear/enhancement-and-mythic",
        "power-systems/runes-guide",
    ],
    "relics": [
        "power-systems/relics-guide",
        "events/double-dip-schedule",
    ],
    "pets-behemoths": [
        "power-systems/pets-and-behemoth",
        "infrastructure/master-data-tables",
    ],
    "buildings-decor": [
        "infrastructure/castle-and-brilliance",
        "infrastructure/builder-queues-and-villagers",
    ],
    "skills-tech": [
        "heroes/shards-and-skill-books",
        "infrastructure/research-and-baiting",
        "infrastructure/castle-and-brilliance",
    ],
    "troops": [
        "economy/troop-skins-and-medals",
        "infrastructure/master-data-tables",
    ],
    "events-seasons": [
        "events/biweekly-rotation",
        "events/week-a-guild-race",
        "events/week-b-arms-race",
        "roadmap/season-1-to-4-roadmap",
    ],
    "monsters": [
        "events/biweekly-rotation",
        "power-systems/relics-guide",
    ],
    "cosmetics": [
        "economy/shops-tier-list",
        "economy/exchange-and-vip-shops",
    ],
    "shop-vip": [
        "economy/shops-tier-list",
        "economy/exchange-and-vip-shops",
        "infrastructure/master-data-tables",
    ],
}

RAW_NAME_NORMALIZATION_MAP: Dict[str, Tuple[str, str]] = {
    "icon 30491": ("Rương Tiếp Tế Chiến Trường #30491", "Battlefield Supply Chest #30491"),
    "icon 30650": ("Vật Phẩm Mùa Giải Đặc Biệt #30650", "Seasonal Special Token #30650"),
    "icon 31028": ("Lễ Hộp Kỷ Niệm Vương Quốc #31028", "Kingdom Anniversary Giftbox #31028"),
    "Head 22001": ("Binh Sĩ Hộ Vệ Hoàng Gia #22001", "Royal Guard Unit #22001"),
    "Activity 52": ("Sự Kiện Lễ Hội Vương Quốc #52", "Kingdom Festival Event #52"),
    "Activity 114": ("Sự Kiện Đua Điểm Liên Server #114", "Cross-Server Point Race #114"),
    "Activity 115": ("Sự Kiện Tiếp Tế Chiến Dịch #115", "Campaign Supply Event #115"),
    "Activity 116": ("Sự Kiện Chinh Phạt Thủ Lĩnh #116", "Boss Conquest Event #116"),
    "Activity 160": ("Sự Kiện Vòng Quay Mùa Giải #160", "Seasonal Wheel Event #160"),
    "Activity 373": ("Sự Kiện Kho Báu Cổ Đại #373", "Ancient Treasure Event #373"),
    "Head 60148": ("Thủ Lĩnh Quái Vật Tinh Anh #60148", "Elite Monster Boss #60148"),
    "Head 60153": ("Thủ Lĩnh Quái Vật Tinh Anh #60153", "Elite Monster Boss #60153"),
    "Head 60154": ("Thủ Lĩnh Quái Vật Tinh Anh #60154", "Elite Monster Boss #60154"),
    "Head 60179": ("Thủ Lĩnh Quái Vật Tinh Anh #60179", "Elite Monster Boss #60179"),
    "Head 60503": ("Thủ Lĩnh Hư Không Tinh Anh #60503", "Void Elite Boss #60503"),
    "Head 60504": ("Thủ Lĩnh Hư Không Tinh Anh #60504", "Void Elite Boss #60504"),
    "Head 60505": ("Thủ Lĩnh Hư Không Tinh Anh #60505", "Void Elite Boss #60505"),
    "Head 60506": ("Thủ Lĩnh Hư Không Tinh Anh #60506", "Void Elite Boss #60506"),
}

RARITY_PRIORITY_ORDER: Dict[str, int] = {
    "mythic": 0,
    "legendary": 1,
    "epic": 2,
    "rare": 3,
    "uncommon": 4,
    "common": 5,
}


def map_manifest_group_to_codex_category(group: str, sub_category: str) -> str:
    if group == "heroes":
        return "heroes"
    if group == "items" or (group == "ui" and sub_category == "rarities"):
        return "items"
    if group == "equipment":
        return "equipment"
    if group == "relics":
        return "relics"
    if group in ("behemoths", "elves", "pets"):
        return "pets-behemoths"
    if group == "buildings":
        return "buildings-decor"
    if group in ("skills", "tech"):
        return "skills-tech"
    if group == "troops":
        return "troops"
    if group in ("events", "minigames", "factions"):
        return "events-seasons"
    if group == "monsters":
        return "monsters"
    if group == "cosmetics":
        return "cosmetics"
    if group == "shop":
        return "shop-vip"
    return "items"


def infer_codex_rarity(
    category: str,
    sub_category: str,
    name_en: str,
    name_vi: str,
    glossary_rarity: Optional[str] = None,
) -> str:
    if glossary_rarity in RARITY_PRIORITY_ORDER:
        return glossary_rarity
    text = f"{name_en} {name_vi} {sub_category}".lower()
    if any(k in text for k in ("mythic", "thần thoại", "đỏ", "awakened", "thức tỉnh", "exclusive", "độc quyền", "behemoth", "sacredbeast")):
        return "mythic"
    if any(k in text for k in ("legendary", "huyền thoại", "vàng", "ssr", "ur", "gold", "vip", "castle")):
        return "legendary"
    if any(k in text for k in ("epic", "sử thi", "tím", "sr", "relic", "thánh vật", "rune", "cổ ngữ")):
        return "epic"
    if any(k in text for k in ("rare", "hiếm", "lam", "blue", "shard", "mảnh")):
        return "rare"
    if category in ("heroes", "equipment", "relics", "pets-behemoths", "shop-vip"):
        return "legendary"
    if category in ("buildings-decor", "skills-tech", "troops", "events-seasons", "cosmetics"):
        return "epic"
    return "common"


def infer_codex_faction(
    category: str,
    name_en: str,
    name_vi: str,
    glossary_faction: Optional[str] = None,
) -> str:
    if glossary_faction in ("horde", "league", "nature", "neutral"):
        return glossary_faction
    text = f"{name_en} {name_vi}".lower()
    if any(k in text for k in ("horde", "bộ lạc", "bộ tộc", "wukong", "ngộ không", "titan")):
        return "horde"
    if any(k in text for k in ("league", "liên minh", "alliance", "paragon", "pyromancer", "knight", "kỵ sĩ")):
        return "league"
    if any(k in text for k in ("nature", "thiên nhiên", "forest", "tidecaller", "pixie", "sage", "druid")):
        return "nature"
    return "neutral"


def generate_fallback_descriptions(
    category: str,
    sub_category: str,
    name_vi: str,
    name_en: str,
    rarity: str,
    faction: str,
) -> Tuple[str, str]:
    faction_vi = {
        "horde": "Hệ Bộ Lạc (Horde)",
        "league": "Hệ Liên Minh (League)",
        "nature": "Hệ Thiên Nhiên (Nature)",
        "neutral": "Đa hệ (Universal)",
    }.get(faction, "Đa hệ")
    faction_en = {
        "horde": "Horde faction",
        "league": "League faction",
        "nature": "Nature faction",
        "neutral": "Universal",
    }.get(faction, "Universal")

    if category == "heroes":
        return (
            f"{name_vi} — Anh hùng/Trang phục chiến thuật thuộc {faction_vi}, sử dụng trong đội hình viễn chinh, Đấu Trường và leo tháp.",
            f"{name_en} — Tactical hero/skin asset aligned with the {faction_en}, deployed in expedition queues and Arena formations.",
        )
    if category == "equipment":
        return (
            f"{name_vi} — Trang bị chiến thuật và nguyên liệu rèn đúc giúp gia tăng chỉ số công/thủ trực tiếp cho đội hình chủ lực.",
            f"{name_en} — Tactical equipment and forging gear providing direct offensive and defensive stat scaling for main queues.",
        )
    if category == "relics":
        return (
            f"{name_vi} — Thánh vật cổ đại kích hoạt kỹ năng hỗ trợ và cộng hưởng chỉ số toàn đội hình trong giao tranh.",
            f"{name_en} — Ancient relic granting active battlefield support and global stat resonance across hero formations.",
        )
    if category == "pets-behemoths":
        return (
            f"{name_vi} — Thú cưng/Cự thú đồng hành gia tăng giới hạn cấp độ Tướng và cung cấp kỹ năng hỗ trợ diện rộng.",
            f"{name_en} — Companion pet/behemoth raising hero level caps and providing AoE battlefield support skills.",
        )
    if category == "buildings-decor":
        return (
            f"{name_vi} — Công trình/Trang trí Lâu Đài giúp tăng tốc độ phát triển kinh tế và cộng chỉ số vĩnh viễn toàn tài khoản.",
            f"{name_en} — Castle structure/decoration accelerating base progression and granting permanent account-wide stat bonuses.",
        )
    if category == "skills-tech":
        return (
            f"{name_vi} — Kỹ năng và công nghệ nghiên cứu nâng cao hiệu suất chiến đấu, khai thác tài nguyên và điểm sự kiện.",
            f"{name_en} — Skill and research technology enhancing combat efficiency, resource output, and event scoring.",
        )
    if category == "troops":
        return (
            f"{name_vi} — Binh chủng và Quân trang gia tăng chỉ số Lính cùng thuộc tính Sở Hữu Vĩnh Viễn (Owned Passive).",
            f"{name_en} — Troop unit and military skin boosting soldier stats with permanent Owned Passive bonuses.",
        )
    if category == "events-seasons":
        return (
            f"{name_vi} — Hoạt động sự kiện và cơ chế Mùa giải (S0–S4) mang lại nguồn Mảnh Tướng Vàng, Hồn Đá Đỏ và Kim Cương.",
            f"{name_en} — Seasonal event and server activity (S0–S4) yielding Universal Shards, Soul Stones, and Diamonds.",
        )
    if category == "monsters":
        return (
            f"{name_vi} — Quái vật và Thủ lĩnh bản đồ thế giới tiêu hao Thể Lực khi tiêu diệt để nhận tài nguyên rèn đúc và mảnh ghép.",
            f"{name_en} — World map monster and boss target hunted with Stamina for forging materials and progression shards.",
        )
    if category == "cosmetics":
        return (
            f"{name_vi} — Vật phẩm ngoại trang, Khung Avatar và Danh hiệu tôn vinh thành tích cá nhân và liên minh.",
            f"{name_en} — Cosmetic avatar frame, chat emblem, and title showcasing commander and guild achievements.",
        )
    if category == "shop-vip":
        return (
            f"{name_vi} — Đặc quyền VIP và gói cửa hàng tối ưu hóa hiệu suất đầu tư (ROI) và phúc lợi hàng ngày.",
            f"{name_en} — VIP privilege and shop bundle optimizing daily resource income and investment ROI.",
        )
    return (
        f"{name_vi} — Vật phẩm chiến thuật trong Top Heroes dùng để nâng cấp sức mạnh đội hình và tích trữ cho các mốc sự kiện.",
        f"{name_en} — Tactical item in Top Heroes used for queue progression and strategic event hoarding.",
    )


def scan_article_slug_links(glossary_terms: List[Dict[str, Any]]) -> Dict[str, List[str]]:
    """Map glossaryId -> list of <categorySlug>/<articleSlug> that mention this term."""
    group_dir_to_cat = {
        "group-1-getting-started": "getting-started",
        "group-2-heroes": "heroes",
        "group-3-events": "events",
        "group-4-roadmap": "roadmap",
        "group-5-gear": "gear",
        "group-6-power-systems": "power-systems",
        "group-7-economy": "economy",
        "group-8-infrastructure": "infrastructure",
    }
    groups_root = os.path.join(ROOT_DIR, "src", "content", "guides", "groups")
    article_texts: List[Tuple[str, str]] = []
    for g_folder, cat_slug in sorted(group_dir_to_cat.items()):
        folder_path = os.path.join(groups_root, g_folder)
        if not os.path.isdir(folder_path):
            continue
        for ts_path in sorted(glob.glob(os.path.join(folder_path, "*.ts"))):
            with open(ts_path, "r", encoding="utf-8") as f:
                raw = f.read()
            m_slug = re.search(r'slug:\s*"([^"]+)"', raw)
            if m_slug:
                full_slug = f"{cat_slug}/{m_slug.group(1)}"
                article_texts.append((full_slug, raw.lower()))

    glossary_links: Dict[str, List[str]] = {}
    for term in glossary_terms:
        tid = term["id"]
        matched: List[str] = []
        needles = [
            tid.lower(),
            term["inGameEn"].lower(),
            term["inGameVi"].lower(),
        ]
        for full_slug, lower_body in article_texts:
            if any(len(n) >= 3 and n in lower_body for n in needles):
                matched.append(full_slug)
            if len(matched) >= 4:
                break
        if matched:
            glossary_links[tid] = matched
    return glossary_links


def map_canonical_sub_category(
    category: str,
    raw_sub: str,
    stem_or_aid: str = "",
    rarity: str = "common",
    name_en: str = "",
) -> str:
    sub = (raw_sub or "").strip().lower()
    rid = (stem_or_aid or "").strip().lower()
    nen = (name_en or "").strip().lower()

    if category == "heroes":
        if "skin" in sub or "_skin" in rid or re.search(r"^\d{5}[-_]1$", rid):
            return "hero-skins"
        return "hero-units"

    if category == "pets-behemoths":
        if sub in ("companion-pets", "avatars", "illustrations") or rid.startswith("pet-8"):
            return "companion-pets"
        if sub in ("spirits", "elves") or "elf" in rid or "elves" in rid or "spirit" in nen:
            return "spirits"
        return "behemoths"

    if category == "troops":
        if sub in ("troop-units", "faction-units") or rid.startswith("troop-rank") or "army_quality" in rid or "army-quality" in rid:
            return "troop-units"
        return "troop-skins"

    if category == "equipment":
        if sub == "exclusive-weapons" or "exclusive" in rid:
            return "exclusive-weapons"
        if sub == "lord-gear" or "lord" in rid:
            return "lord-gear"
        if sub == "runes" or "rune" in rid:
            return "runes"
        return "hero-gear"

    if category == "relics":
        if sub in ("shards-and-scrolls", "relic-scrolls") or "scroll" in rid or "icon-art-" in rid or "icon_art_" in rid or "shard" in nen:
            return "relic-scrolls"
        return "relic-artefacts"

    if category == "skills-tech":
        if sub in ("research", "brilliance", "research-tech") or "brilliance" in rid or "radiance" in rid or rid.startswith("tech-") or rid.startswith("tech_"):
            return "research-tech"
        return "hero-skills"

    if category == "items":
        if sub == "currencies" or any(k in nen for k in ("diamond", "token", "coin", "voucher", "points", "star", "emblem", "honor")):
            return "currencies"
        if sub in ("shards", "shards-souls") or "shard" in nen or "soul stone" in nen:
            return "shards-souls"
        if sub == "chests" or any(k in nen for k in ("chest", "box", "pack")):
            return "chests"
        if any(k in nen for k in ("speedup", "stamina", "ruby", "timber")) or "speedup" in rid:
            return "resources-speedups"
        if sub == "materials" or any(k in nen for k in ("essence", "refined", "blueprint", "medal", "book", "anvil", "stone", "orichalcum", "thread", "blood", "ingot", "dust", "rune")):
            return "upgrade-materials"
        return "consumables"

    if category == "buildings-decor":
        if sub == "castle-skins" or "castle-skin" in rid or "worldskin" in rid:
            return "castle-skins"
        if sub in ("diy-decorations", "decorations") or "decor" in rid:
            return "decorations"
        return "city-buildings"

    if category == "shop-vip":
        if any(k in nen for k in ("pass", "pack", "chest", "ad-free", "carriage", "monthly", "gift")):
            return "shops"
        return "vip-perks"

    if category == "events-seasons":
        if sub == "seasons" or rid.startswith("season-") or "castles" in rid or "season" in nen:
            return "seasons"
        if sub in ("minigames", "fishing-and-ranch") or any(k in nen for k in ("chess", "farm", "pinball", "fishing", "ranch")):
            return "minigames"
        return "events"

    if category == "monsters":
        if sub in ("world-bosses", "bosses") or rarity in ("mythic", "legendary") or any(k in nen for k in ("boss", "lord", "king")):
            return "bosses"
        return "world-monsters"

    if category == "cosmetics":
        if "emoji" in sub or "emoji" in rid or "chat" in sub:
            return "emojis"
        if "title" in sub or "medal" in sub or "nameplate" in sub or "title" in nen:
            return "titles-badges"
        return "avatar-frames"

    return sub or "general"


def load_meta_enrichment() -> Dict[str, Any]:
    """Load authentic Meta.bytes + Locale_vi.bytes + Locale_en.bytes metadata when available."""
    import importlib.util

    result: Dict[str, Any] = {
        "hero_skins": {},
        "companion_pets": [],
        "equipment_suits": [],
        "lord_equipments": [],
    }

    ext_path = os.path.join(os.path.dirname(__file__), "extract-game-media.py")
    if not os.path.exists(ext_path):
        return result

    try:
        spec = importlib.util.spec_from_file_location("extract_game_media", ext_path)
        if not spec or not spec.loader:
            return result
        ext = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(ext)
        if not (os.path.exists(ext.META_BYTES_PATH) and os.path.exists(ext.LOCALE_VI_PATH) and os.path.exists(ext.LOCALE_EN_PATH)):
            return result

        tables = ext.load_meta_tables(
            ext.META_BYTES_PATH,
            {"hero", "unit", "skin", "hero_skin", "pet_detail", "pet_break", "equipment_suit", "lord_equipment"},
        )
        loc_vi = ext.load_locale_file(ext.LOCALE_VI_PATH)
        loc_en = ext.load_locale_file(ext.LOCALE_EN_PATH)
    except Exception as exc:
        print(f"[WARN] Could not load Meta.bytes directly ({exc}); using manifest fallback.")
        return result

    race_map = {1: "league", 2: "horde", 3: "nature"}
    rarity_map = {1: "common", 2: "uncommon", 3: "rare", 4: "epic", 5: "legendary", 6: "mythic"}

    units_by_id = {int(u["id"]): u for u in tables.get("unit", []) if u.get("id") is not None}
    skins_by_id = {int(s["id"]): s for s in tables.get("skin", []) if s.get("id") is not None}

    # 1. Hero Skins (hero_skin x skin)
    for hs in tables.get("hero_skin", []):
        hs_id = hs.get("id")
        hero_id = hs.get("hero_id")
        skin_id = hs.get("skin_id")
        if hs_id is None or hero_id is None or skin_id is None:
            continue
        skin_row = skins_by_id.get(int(skin_id), {})
        head_pic = str(skin_row.get("head") or "")
        body_pic = str(skin_row.get("image") or "")
        s_key = ""
        for pic in (head_pic, body_pic):
            m = re.match(r"^(?:Head|Lihui)_(\d+_.+)$", pic)
            if m:
                s_key = m.group(1).lower()
                break
        if not s_key:
            continue
        name_key = str(hs.get("skin_name") or "")
        name_vi = str(loc_vi.get(name_key) or "").strip()
        name_en = str(loc_en.get(name_key) or "").strip()
        if not name_en or VI_DIACRITIC_REGEX.search(name_en):
            continue
        if not name_vi:
            name_vi = name_en
        result["hero_skins"][s_key] = {
            "gameId": int(hs_id),
            "heroId": int(hero_id),
            "isAwaken": bool(hs.get("is_awaken")),
            "rarity": rarity_map.get(int(hs.get("quality") or 5), "legendary"),
            "nameVi": name_vi,
            "nameEn": name_en,
        }

    # 2. 21 Companion Pets (pet_detail x unit x pet_break x skin)
    pet_breaks_by_pid: Dict[int, List[Dict[str, Any]]] = {}
    for pb in tables.get("pet_break", []):
        pid = pb.get("pet_id")
        if pid is not None and pb.get("pet_skin_id"):
            pet_breaks_by_pid.setdefault(int(pid), []).append(pb)

    for pd in sorted(tables.get("pet_detail", []), key=lambda x: int(x.get("id", 0))):
        pid = int(pd["id"])
        u_row = units_by_id.get(pid, {})
        pb_list = sorted(pet_breaks_by_pid.get(pid, []), key=lambda x: int(x.get("break_level") or 0))
        name_key = str(u_row.get("name") or "")
        if not name_key and pb_list:
            first_skin = skins_by_id.get(int(pb_list[0]["pet_skin_id"]), {})
            name_key = str(first_skin.get("name") or "")
        name_vi = str(loc_vi.get(name_key) or "").strip()
        name_en = str(loc_en.get(name_key) or "").strip()
        if not name_en or VI_DIACRITIC_REGEX.search(name_en):
            name_en = f"Companion Pet #{pid}"
        if not name_vi:
            name_vi = name_en

        faction = race_map.get(int(u_row.get("race") or 0), "neutral")
        max_qual = max([int(pb.get("quality") or 0) for pb in pb_list] + [int(u_row.get("quality") or 4)])
        rarity = rarity_map.get(max_qual, "legendary")

        head_paths: List[str] = []
        body_paths: List[str] = []
        for pb in pb_list:
            s_row = skins_by_id.get(int(pb["pet_skin_id"]), {})
            hp_name = str(s_row.get("head") or "")
            bp_name = str(s_row.get("image") or "")
            if hp_name:
                cand_h = f"/images/pets/avatars/{hp_name}.webp"
                if os.path.exists(os.path.join(PUBLIC_DIR, cand_h.lstrip("/"))):
                    if cand_h not in head_paths:
                        head_paths.append(cand_h)
            if bp_name:
                cand_b = f"/images/pets/illustrations/{bp_name}.webp"
                if os.path.exists(os.path.join(PUBLIC_DIR, cand_b.lstrip("/"))):
                    if cand_b not in body_paths:
                        body_paths.append(cand_b)

        primary_path = head_paths[-1] if head_paths else "/images/pets/avatars/Head_pet_1904.webp"
        portrait_path = body_paths[-1] if body_paths else primary_path
        gallery_paths = list(dict.fromkeys([*head_paths, *body_paths]))

        result["companion_pets"].append(
            {
                "gameId": pid,
                "unitId": pid,
                "nameVi": name_vi,
                "nameEn": name_en,
                "faction": faction,
                "rarity": rarity,
                "path": primary_path,
                "portraitPath": portrait_path,
                "galleryPaths": gallery_paths,
            }
        )

    # 3. 6 Equipment Suits (equipment_suit)
    suit_visual_map = {
        103: ("legendary", "horde", "/images/equipment/hero-gear/icon_40013.webp", ["/images/equipment/hero-gear/icon_40013.webp", "/images/equipment/hero-gear/icon_40014.webp", "/images/equipment/hero-gear/icon_40015.webp", "/images/equipment/hero-gear/icon_40016.webp"]),
        104: ("legendary", "league", "/images/equipment/hero-gear/icon_40005.webp", ["/images/equipment/hero-gear/icon_40005.webp", "/images/equipment/hero-gear/icon_40006.webp", "/images/equipment/hero-gear/icon_40007.webp", "/images/equipment/hero-gear/icon_40008.webp"]),
        105: ("legendary", "nature", "/images/equipment/hero-gear/icon_40009.webp", ["/images/equipment/hero-gear/icon_40009.webp", "/images/equipment/hero-gear/icon_40010.webp", "/images/equipment/hero-gear/icon_40011.webp", "/images/equipment/hero-gear/icon_40012.webp"]),
        1101: ("mythic", "neutral", "/images/equipment/hero-gear/icon_40001.webp", ["/images/equipment/hero-gear/icon_40001.webp", "/images/equipment/hero-gear/icon_40002.webp", "/images/equipment/hero-gear/icon_40003.webp", "/images/equipment/hero-gear/icon_40004.webp"]),
        1102: ("mythic", "horde", "/images/equipment/hero-gear/icon_40016.webp", ["/images/equipment/hero-gear/icon_40013.webp", "/images/equipment/hero-gear/icon_40014.webp", "/images/equipment/hero-gear/icon_40015.webp", "/images/equipment/hero-gear/icon_40016.webp"]),
        1103: ("mythic", "league", "/images/equipment/hero-gear/icon_40008.webp", ["/images/equipment/hero-gear/icon_40005.webp", "/images/equipment/hero-gear/icon_40006.webp", "/images/equipment/hero-gear/icon_40007.webp", "/images/equipment/hero-gear/icon_40008.webp"]),
    }
    for es in sorted(tables.get("equipment_suit", []), key=lambda x: int(x.get("id", 0))):
        sid = int(es["id"])
        if sid not in suit_visual_map:
            continue
        name_key = str(es.get("suit_name") or "")
        n_vi = str(loc_vi.get(name_key) or "").strip()
        n_en = str(loc_en.get(name_key) or "").strip()
        if not n_en or VI_DIACRITIC_REGEX.search(n_en):
            continue
        s_rarity, s_faction, s_path, s_gallery = suit_visual_map[sid]
        result["equipment_suits"].append(
            {
                "gameId": sid,
                "nameVi": f"Bộ Trang Bị: {n_vi}",
                "nameEn": f"Gear Set: {n_en}",
                "communityNameVi": n_vi,
                "communityNameEn": n_en,
                "rarity": s_rarity,
                "faction": s_faction,
                "path": s_path,
                "galleryPaths": s_gallery,
            }
        )

    # 4. 7 Lord Equipment slots (lord_equipment_name01..07)
    lord_slot_configs = [
        (900001, "lord_equip_name01", "horde", "/images/items/consumables/icon_lord_1.webp", "gear-lord-sword"),
        (900002, "lord_equip_name02", "horde", "/images/items/consumables/icon_lord_2.webp", "gear-lord-wand"),
        (900003, "lord_equip_name03", "nature", "/images/items/consumables/icon_lord_3.webp", "gear-lord-chest"),
        (900004, "lord_equip_name04", "nature", "/images/items/consumables/icon_lord_4.webp", "gear-lord-greaves"),
        (900005, "lord_equip_name05", "league", "/images/items/consumables/icon_lord_5.webp", "gear-lord-helm"),
        (900006, "lord_equip_name06", "league", "/images/items/consumables/icon_lord_6.webp", "gear-lord-ring"),
        (900007, "lord_equip_name07", "neutral", "/images/items/consumables/icon_lord_6.webp", None),
    ]
    for l_gid, l_key, l_faction, l_path, sup_id in lord_slot_configs:
        n_vi = str(loc_vi.get(l_key) or "").strip()
        n_en = str(loc_en.get(l_key) or "").strip()
        if n_en and not VI_DIACRITIC_REGEX.search(n_en):
            result["lord_equipments"].append(
                {
                    "gameId": l_gid,
                    "nameVi": n_vi or n_en,
                    "nameEn": n_en,
                    "faction": l_faction,
                    "rarity": "mythic",
                    "path": l_path,
                    "supId": sup_id,
                }
            )

    return result


def build_codex_shards(
    manifest: Dict[str, Any],
    glossary_terms: List[Dict[str, Any]],
    asset_registry: Dict[str, Dict[str, Any]],
    hero_profiles: Dict[str, Dict[str, Any]],
) -> None:
    import zlib

    os.makedirs(CODEX_OUTPUT_DIR, exist_ok=True)
    glossary_by_id = {t["id"]: t for t in glossary_terms}
    glossary_article_links = scan_article_slug_links(glossary_terms)
    meta_enrichment = load_meta_enrichment()

    hero_by_gid: Dict[int, Dict[str, Any]] = {}
    for hp in hero_profiles.values():
        hero_by_gid[int(hp["gameId"])] = hp

    shards: Dict[str, List[Dict[str, Any]]] = {cat: [] for cat in CODEX_CATEGORIES}
    seen_paths = set()

    # -------------------------------------------------------------------------
    # A. Build Canonical `heroes` Shard (55 Base Heroes + Merged Hero Skins)
    # -------------------------------------------------------------------------
    for gid, hp in sorted(hero_by_gid.items()):
        gl_id = hp.get("glossaryId")
        gl_term = glossary_by_id.get(gl_id) if gl_id else None
        avatar_path = hp["avatarPath"]
        portrait_path = hp.get("portraitPath") or avatar_path
        seen_paths.add(avatar_path)
        seen_paths.add(portrait_path)

        gallery = [avatar_path]
        if portrait_path != avatar_path:
            gallery.append(portrait_path)
        if hp.get("exclusiveWeaponPath"):
            gallery.append(hp["exclusiveWeaponPath"])

        extra_tags: List[str] = []
        if hp.get("isAwakenable"):
            extra_tags.append("awakenable")
        if hp.get("isEconomyPassive"):
            extra_tags.append("economy")

        desc_vi = gl_term["descriptionVi"] if gl_term else ""
        desc_en = gl_term["descriptionEn"] if gl_term else ""
        fb_vi, fb_en = generate_fallback_descriptions(
            "heroes", "hero-units", hp["inGameNameVi"], hp["inGameNameEn"], hp["rarity"], hp["faction"]
        )
        if not desc_vi:
            desc_vi = fb_vi
        if not desc_en or VI_DIACRITIC_REGEX.search(desc_en):
            desc_en = fb_en

        related_slugs = (
            glossary_article_links.get(gl_id)
            if gl_id and gl_id in glossary_article_links
            else DEFAULT_RELATED_ARTICLES["heroes"]
        )

        hero_rec: Dict[str, Any] = {
            "id": hp["id"],
            "gameId": int(gid),
            "glossaryId": gl_id,
            "category": "heroes",
            "subCategory": "hero-units",
            "path": avatar_path,
            "portraitPath": portrait_path,
            "galleryPaths": gallery,
            "nameVi": hp["inGameNameVi"],
            "nameEn": hp["inGameNameEn"],
            "communityNameVi": hp["nameVi"],
            "communityNameEn": hp["nameEn"],
            "descVi": desc_vi,
            "descEn": desc_en,
            "rarity": hp["rarity"],
            "faction": hp["faction"],
            "relatedArticleSlugs": related_slugs,
        }
        if extra_tags:
            hero_rec["extraTags"] = extra_tags
        shards["heroes"].append(hero_rec)

    # Group all hero skin sprites (Head_<hero>_<suffix> + Lihui_<hero>_<suffix>) by skin_key
    raw_images = manifest.get("assets", [])
    skin_groups: Dict[str, Dict[str, Any]] = {}
    for img in raw_images:
        gid = img.get("game_id")
        if gid is None or str(img.get("group")) != "heroes":
            continue
        rel_path = "/" + str(img["path"]).lstrip("/")
        raw_cat = str(img.get("category", ""))
        sub_cat = raw_cat.split("/")[-1] if "/" in raw_cat else raw_cat
        if sub_cat in ("avatars", "portraits"):
            seen_paths.add(rel_path)
            continue
        assert_file_exists(rel_path, f"CodexSkin[{rel_path}]")
        seen_paths.add(rel_path)
        stem = os.path.splitext(os.path.basename(rel_path))[0]
        m_skin = re.match(r"^(Head|Lihui)_(\d+)_(.+)$", stem, re.I)
        if not m_skin:
            continue
        kind, h_id_str, suffix = m_skin.group(1).lower(), m_skin.group(2), m_skin.group(3).lower()
        s_key = f"{h_id_str}_{suffix}"
        grp = skin_groups.setdefault(
            s_key,
            {
                "heroId": int(h_id_str),
                "suffix": suffix,
                "fallbackGid": int(gid),
                "avatarPath": None,
                "portraitPath": None,
            },
        )
        if kind == "head":
            grp["avatarPath"] = rel_path
        else:
            grp["portraitPath"] = rel_path

    hero_skins_meta = meta_enrichment.get("hero_skins", {})
    for s_key, grp in sorted(skin_groups.items()):
        parent_hp = hero_by_gid.get(grp["heroId"])
        parent_vi = parent_hp["inGameNameVi"] if parent_hp else f"Anh Hùng #{grp['heroId']}"
        parent_en = parent_hp["inGameNameEn"] if parent_hp else f"Hero #{grp['heroId']}"
        faction = parent_hp["faction"] if parent_hp else "neutral"
        gl_id = parent_hp.get("glossaryId") if parent_hp else None

        hs_info = hero_skins_meta.get(s_key)
        if hs_info:
            skin_gid = hs_info["gameId"]
            name_vi = hs_info["nameVi"]
            name_en = hs_info["nameEn"]
            rarity = hs_info["rarity"]
            is_awaken = hs_info["isAwaken"]
        else:
            skin_gid = grp["fallbackGid"]
            suf = grp["suffix"]
            is_awaken = suf == "1"
            if is_awaken:
                name_vi = f"{parent_vi}·Thức Tỉnh"
                name_en = f"{parent_en}: Awaken"
                rarity = "mythic"
            else:
                skin_num = re.sub(r"^skin", "", suf)
                name_vi = f"{parent_vi}: Trang Phục #{skin_num}"
                name_en = f"{parent_en}: Skin #{skin_num}"
                rarity = parent_hp["rarity"] if parent_hp else "legendary"

        primary_path = grp["avatarPath"] or grp["portraitPath"]
        portrait_path = grp["portraitPath"] or grp["avatarPath"]
        gallery = list(dict.fromkeys([p for p in (grp["avatarPath"], grp["portraitPath"]) if p]))

        fb_vi, fb_en = generate_fallback_descriptions(
            "heroes", "hero-skins", name_vi, name_en, rarity, faction
        )
        related_slugs = (
            glossary_article_links.get(gl_id)
            if gl_id and gl_id in glossary_article_links
            else DEFAULT_RELATED_ARTICLES["heroes"]
        )
        clean_key = re.sub(r"[^a-z0-9]+", "-", s_key).strip("-")
        skin_rec: Dict[str, Any] = {
            "id": f"heroes-skin-{clean_key}",
            "gameId": int(skin_gid),
            "glossaryId": gl_id,
            "category": "heroes",
            "subCategory": "hero-skins",
            "path": primary_path,
            "portraitPath": portrait_path,
            "nameVi": name_vi,
            "nameEn": name_en,
            "communityNameVi": parent_hp["nameVi"] if parent_hp else None,
            "communityNameEn": parent_hp["nameEn"] if parent_hp else None,
            "descVi": fb_vi,
            "descEn": fb_en,
            "rarity": rarity,
            "faction": faction,
            "relatedArticleSlugs": related_slugs,
        }
        if len(gallery) > 1:
            skin_rec["galleryPaths"] = gallery
        if is_awaken or (parent_hp and parent_hp.get("isAwakenable")):
            skin_rec["extraTags"] = ["awakenable"]
        shards["heroes"].append(skin_rec)

    # -------------------------------------------------------------------------
    # B. Build 21 Canonical Companion Pets (`830001..840018`) in `pets-behemoths`
    # -------------------------------------------------------------------------
    sup_pet_by_unit_en = {
        "cactini": SUPPLEMENTARY_ASSETS.get("pet-cactini"),
        "howli": SUPPLEMENTARY_ASSETS.get("pet-howli"),
        "flickerkit": SUPPLEMENTARY_ASSETS.get("pet-flickerkit"),
        "eggribird": SUPPLEMENTARY_ASSETS.get("pet-eggribird"),
        "ignispal": SUPPLEMENTARY_ASSETS.get("pet-ignispal"),
        "florapuff": SUPPLEMENTARY_ASSETS.get("pet-florapuff"),
    }
    companion_pets_meta = meta_enrichment.get("companion_pets", [])
    for pet in companion_pets_meta:
        for gp in pet["galleryPaths"]:
            seen_paths.add(gp)
        seen_paths.add(pet["path"])
        if pet.get("portraitPath"):
            seen_paths.add(pet["portraitPath"])

        sup_match = sup_pet_by_unit_en.get(pet["nameEn"].strip().lower())
        comm_vi = sup_match["nameVi"] if sup_match else f"Thú Cưng {pet['nameVi']} ({pet['nameEn']})"
        comm_en = sup_match["nameEn"] if sup_match else f"{pet['nameEn']} (Companion Pet)"
        fb_vi, fb_en = generate_fallback_descriptions(
            "pets-behemoths", "companion-pets", pet["nameVi"], pet["nameEn"], pet["rarity"], pet["faction"]
        )
        desc_vi = sup_match["descVi"] if sup_match else fb_vi
        desc_en = sup_match["descEn"] if sup_match else fb_en

        pet_rec: Dict[str, Any] = {
            "id": f"pet-{pet['gameId']}",
            "gameId": int(pet["gameId"]),
            "glossaryId": "system-pets-behemoth",
            "category": "pets-behemoths",
            "subCategory": "companion-pets",
            "path": pet["path"],
            "portraitPath": pet["portraitPath"],
            "nameVi": pet["nameVi"],
            "nameEn": pet["nameEn"],
            "communityNameVi": comm_vi,
            "communityNameEn": comm_en,
            "descVi": desc_vi,
            "descEn": desc_en,
            "rarity": pet["rarity"],
            "faction": pet["faction"],
            "relatedArticleSlugs": DEFAULT_RELATED_ARTICLES["pets-behemoths"],
        }
        if len(pet["galleryPaths"]) > 1:
            pet_rec["galleryPaths"] = pet["galleryPaths"]
        shards["pets-behemoths"].append(pet_rec)

    # -------------------------------------------------------------------------
    # C. Build 6 Equipment Suits & 7 Lord Equipment Slots in `equipment`
    # -------------------------------------------------------------------------
    for suit in meta_enrichment.get("equipment_suits", []):
        fb_vi, fb_en = generate_fallback_descriptions(
            "equipment", "hero-gear", suit["nameVi"], suit["nameEn"], suit["rarity"], suit["faction"]
        )
        shards["equipment"].append(
            {
                "id": f"equipment-suit-{suit['gameId']}",
                "gameId": int(suit["gameId"]),
                "glossaryId": None,
                "category": "equipment",
                "subCategory": "hero-gear",
                "path": suit["path"],
                "galleryPaths": suit["galleryPaths"],
                "nameVi": suit["nameVi"],
                "nameEn": suit["nameEn"],
                "communityNameVi": suit["communityNameVi"],
                "communityNameEn": suit["communityNameEn"],
                "descVi": fb_vi,
                "descEn": fb_en,
                "rarity": suit["rarity"],
                "faction": suit["faction"],
                "relatedArticleSlugs": DEFAULT_RELATED_ARTICLES["equipment"],
            }
        )

    for leq in meta_enrichment.get("lord_equipments", []):
        sup_obj = SUPPLEMENTARY_ASSETS.get(leq["supId"]) if leq.get("supId") else None
        seen_paths.add(leq["path"])
        fb_vi, fb_en = generate_fallback_descriptions(
            "equipment", "lord-gear", leq["nameVi"], leq["nameEn"], leq["rarity"], leq["faction"]
        )
        shards["equipment"].append(
            {
                "id": leq["supId"] or f"gear-lord-{leq['gameId']}",
                "gameId": int(leq["gameId"]),
                "glossaryId": "system-lord-gear",
                "category": "equipment",
                "subCategory": "lord-gear",
                "path": leq["path"],
                "nameVi": leq["nameVi"],
                "nameEn": leq["nameEn"],
                "communityNameVi": sup_obj["nameVi"] if sup_obj else leq["nameVi"],
                "communityNameEn": sup_obj["nameEn"] if sup_obj else leq["nameEn"],
                "descVi": sup_obj["descVi"] if sup_obj else fb_vi,
                "descEn": sup_obj["descEn"] if sup_obj else fb_en,
                "rarity": leq["rarity"],
                "faction": leq["faction"],
                "relatedArticleSlugs": DEFAULT_RELATED_ARTICLES["equipment"],
            }
        )

    # -------------------------------------------------------------------------
    # D. Process Remaining `manifest["assets"]` with Canonical SubCategories
    # -------------------------------------------------------------------------
    rune_tier_labels = {
        "1": ("Bậc I — Thường", "Tier I — Common", "common"),
        "2": ("Bậc II — Khá", "Tier II — Uncommon", "uncommon"),
        "3": ("Bậc III — Hiếm", "Tier III — Rare", "rare"),
        "4": ("Bậc IV — Sử Thi", "Tier IV — Epic", "epic"),
        "5": ("Bậc V — Huyền Thoại", "Tier V — Legendary", "legendary"),
    }

    for img in raw_images:
        gid = img.get("game_id")
        if gid is None:
            continue

        rel_path = "/" + str(img["path"]).lstrip("/")
        if "bg_Radiance_plate" in rel_path or "bg_SecretTreasureExchange" in rel_path:
            continue
        if str(img.get("group")) == "heroes":
            continue
        # Skip raw pet evolution stage sprites if 21 canonical companion pets were loaded
        if companion_pets_meta and str(img.get("group")) == "pets" and any(
            seg in str(img.get("category", "")) for seg in ("avatars", "illustrations")
        ):
            seen_paths.add(rel_path)
            continue

        assert_file_exists(rel_path, f"Codex[{rel_path}]")
        seen_paths.add(rel_path)

        group = str(img.get("group", "items"))
        raw_cat = str(img.get("category", "general"))
        raw_sub = raw_cat.split("/")[-1] if "/" in raw_cat else raw_cat
        category = map_manifest_group_to_codex_category(group, raw_sub)

        gl_id = img.get("glossary_id")
        gl_term = glossary_by_id.get(gl_id) if gl_id else None

        raw_name_vi = str(img.get("name_vi") or "").strip()
        raw_name_en = str(img.get("name_en") or "").strip()

        # GAP-P5-02: Normalize raw sprite fallback names
        if raw_name_en in RAW_NAME_NORMALIZATION_MAP:
            raw_name_vi, raw_name_en = RAW_NAME_NORMALIZATION_MAP[raw_name_en]
        elif raw_name_vi in RAW_NAME_NORMALIZATION_MAP:
            raw_name_vi, raw_name_en = RAW_NAME_NORMALIZATION_MAP[raw_name_vi]
        else:
            if re.match(r"^(?:icon|Head|Activity)\s+\d+$", raw_name_en, re.I):
                raw_name_en = f"Tactical Asset #{gid}"
            if re.match(r"^(?:icon|Head|Activity)\s+\d+$", raw_name_vi, re.I):
                raw_name_vi = f"Vật Phẩm Chiến Thuật #{gid}"

        if not raw_name_en:
            raw_name_en = gl_term["inGameEn"] if gl_term else f"Tactical Asset #{gid}"
        if not raw_name_vi:
            raw_name_vi = gl_term["inGameVi"] if gl_term else raw_name_en

        if VI_DIACRITIC_REGEX.search(raw_name_en):
            raw_name_en = gl_term["inGameEn"] if gl_term else f"Tactical Asset #{gid}"

        community_vi: Optional[str] = gl_term["vi"] if gl_term else None
        community_en: Optional[str] = gl_term["en"] if gl_term else None
        if community_en and VI_DIACRITIC_REGEX.search(community_en):
            community_en = raw_name_en

        rarity = infer_codex_rarity(
            category,
            raw_sub,
            raw_name_en,
            raw_name_vi,
            asset_registry.get(gl_id, {}).get("rarity") if gl_id else None,
        )

        # Disambiguate Runes (icon_runes_101..605.webp) by tier
        m_rune = re.search(r"icon_runes_(\d)0(\d)\.webp$", rel_path)
        if m_rune and m_rune.group(2) in rune_tier_labels:
            t_vi, t_en, t_rarity = rune_tier_labels[m_rune.group(2)]
            raw_name_vi = f"{raw_name_vi} [{t_vi}]"
            raw_name_en = f"{raw_name_en} [{t_en}]"
            rarity = t_rarity

        # Fix inverted faction from old manifest if present
        manifest_faction = str(img.get("faction") or "")
        if manifest_faction == "horde":
            manifest_faction = "nature"
        elif manifest_faction == "nature":
            manifest_faction = "horde"

        faction = infer_codex_faction(
            category,
            raw_name_en,
            raw_name_vi,
            (asset_registry.get(gl_id, {}).get("faction") if gl_id else None)
            or (manifest_faction if manifest_faction in ("league", "horde", "nature") else None),
        )

        stem = os.path.splitext(os.path.basename(rel_path))[0].lower()
        clean_stem = re.sub(r"[^a-z0-9]+", "-", stem).strip("-")
        rec_id = f"{category}-{gid}-{clean_stem}"
        sub_category = map_canonical_sub_category(category, raw_sub, clean_stem, rarity, raw_name_en)

        # Merge castle skin Lv.2 sprite (worldskin_<X>_lv2.webp) into base gameId <X>
        m_ws_lv2 = re.search(r"worldskin_(\d+)_lv2\.webp$", rel_path, re.I)
        if m_ws_lv2 and category == "buildings-decor":
            gid = int(m_ws_lv2.group(1))

        raw_desc_vi = str(img.get("desc_vi") or "").strip()
        raw_desc_en = str(img.get("desc_en") or "").strip()
        if (not raw_desc_vi or not raw_desc_en) and gl_term:
            if not raw_desc_vi:
                raw_desc_vi = gl_term["descriptionVi"]
            if not raw_desc_en:
                raw_desc_en = gl_term["descriptionEn"]

        fb_vi, fb_en = generate_fallback_descriptions(
            category, sub_category, raw_name_vi, raw_name_en, rarity, faction
        )
        if not raw_desc_vi:
            raw_desc_vi = fb_vi
        if not raw_desc_en or VI_DIACRITIC_REGEX.search(raw_desc_en):
            raw_desc_en = fb_en

        related_slugs = (
            glossary_article_links.get(gl_id)
            if gl_id and gl_id in glossary_article_links
            else DEFAULT_RELATED_ARTICLES.get(category, ["getting-started/overview"])
        )

        record: Dict[str, Any] = {
            "id": rec_id,
            "gameId": int(gid),
            "glossaryId": gl_id,
            "category": category,
            "subCategory": sub_category,
            "path": rel_path,
            "nameVi": raw_name_vi,
            "nameEn": raw_name_en,
            "communityNameVi": community_vi,
            "communityNameEn": community_en,
            "descVi": raw_desc_vi,
            "descEn": raw_desc_en,
            "rarity": rarity,
            "faction": faction,
            "relatedArticleSlugs": related_slugs,
        }
        shards[category].append(record)

    # -------------------------------------------------------------------------
    # E. Merge SSoT Glossary & Supplementary Assets (Zero Duplicate Cards)
    # -------------------------------------------------------------------------
    for aid, entry in sorted(asset_registry.items()):
        icon_path = entry["iconPath"]
        if "bg_Radiance_plate" in icon_path or "bg_SecretTreasureExchange" in icon_path:
            continue
        cat = "troops" if aid.startswith("troop-rank-") else entry["category"]
        if cat not in shards:
            cat = "items"
        if cat == "heroes":
            continue

        gl_id = entry.get("glossaryId")
        entry_gid = (9000 + int(entry["gameId"])) if aid.startswith("tech-brilliance-") and entry.get("gameId") else entry.get("gameId")
        entry_ingame_en = (entry.get("inGameNameEn") or entry["nameEn"]).strip().lower()

        # Try to find an existing record in the target shard by path, gameId, glossaryId, or exact nameEn
        existing = None
        for r in shards[cat]:
            if r["path"] == icon_path:
                existing = r
                break
            if entry_gid is not None and r.get("gameId") == entry_gid:
                existing = r
                break
            if gl_id and r.get("glossaryId") == gl_id:
                existing = r
                break
            if r["nameEn"].strip().lower() == entry_ingame_en:
                existing = r
                break

        if existing is not None:
            if gl_id and not existing.get("glossaryId"):
                existing["glossaryId"] = gl_id
            if not existing.get("communityNameVi") and entry.get("nameVi"):
                existing["communityNameVi"] = entry["nameVi"]
            if not existing.get("communityNameEn") and entry.get("nameEn") and not VI_DIACRITIC_REGEX.search(entry["nameEn"]):
                existing["communityNameEn"] = entry["nameEn"]
            if entry.get("descVi") and len(entry["descVi"]) > len(existing.get("descVi", "")):
                existing["descVi"] = entry["descVi"]
            if entry.get("descEn") and not VI_DIACRITIC_REGEX.search(entry["descEn"]) and len(entry["descEn"]) > len(existing.get("descEn", "")):
                existing["descEn"] = entry["descEn"]
            continue

        if icon_path in seen_paths and gl_id is None and not aid.startswith("troop-rank-"):
            continue

        related_slugs = (
            glossary_article_links.get(gl_id)
            if gl_id and gl_id in glossary_article_links
            else DEFAULT_RELATED_ARTICLES.get(cat, ["getting-started/overview"])
        )
        rarity = entry.get("rarity", "legendary")
        sub_category = map_canonical_sub_category(cat, "", aid, rarity, entry.get("inGameNameEn") or entry["nameEn"])

        rec: Dict[str, Any] = {
            "id": f"ssot-{aid}",
            "gameId": entry_gid,
            "glossaryId": gl_id,
            "category": cat,
            "subCategory": sub_category,
            "path": icon_path,
            "nameVi": entry.get("inGameNameVi") or entry["nameVi"],
            "nameEn": entry.get("inGameNameEn") or entry["nameEn"],
            "communityNameVi": entry["nameVi"],
            "communityNameEn": entry["nameEn"],
            "descVi": entry.get("descVi") or entry["nameVi"],
            "descEn": entry.get("descEn") or entry["nameEn"],
            "rarity": rarity,
            "faction": entry.get("faction", "neutral"),
            "relatedArticleSlugs": related_slugs,
        }
        if entry.get("portraitPath"):
            rec["portraitPath"] = entry["portraitPath"]
        shards[cat].append(rec)
        seen_paths.add(icon_path)

    # -------------------------------------------------------------------------
    # F. Deduplicate Each Shard by gameId & Disambiguate Names
    # -------------------------------------------------------------------------
    def sprite_preference_score(path_str: str) -> int:
        p = path_str.lower()
        if p.endswith("_f.webp") or "small" in p or "lvup" in p or "_lv2" in p or "/blueprints/" in p:
            return 2
        if "sacredbeast_" in p:
            return 1
        return 0

    category_counts: Dict[str, int] = {}
    all_records: List[Dict[str, Any]] = []

    for cat in CODEX_CATEGORIES:
        raw_list = shards[cat]
        deduped_list: List[Dict[str, Any]] = []
        by_gid_key: Dict[int, Dict[str, Any]] = {}

        for r in raw_list:
            gid_val = r.get("gameId")
            if isinstance(gid_val, int) and cat != "heroes":
                if gid_val in by_gid_key:
                    canon = by_gid_key[gid_val]
                    gallery = list(canon.get("galleryPaths") or [canon["path"]])
                    if r["path"] not in gallery:
                        gallery.append(r["path"])
                    # Prefer cleaner primary icon path (non-flipped, non-small, non-blueprint)
                    if sprite_preference_score(r["path"]) < sprite_preference_score(canon["path"]):
                        if "sacredbeast_" in canon["path"].lower() and not canon.get("portraitPath"):
                            canon["portraitPath"] = canon["path"]
                        canon["path"] = r["path"]
                    elif "sacredbeast_" in r["path"].lower() and not canon.get("portraitPath"):
                        canon["portraitPath"] = r["path"]
                    if len(gallery) > 1:
                        canon["galleryPaths"] = gallery
                    if r.get("glossaryId") and not canon.get("glossaryId"):
                        canon["glossaryId"] = r["glossaryId"]
                    if r.get("communityNameVi") and not canon.get("communityNameVi"):
                        canon["communityNameVi"] = r["communityNameVi"]
                    if r.get("communityNameEn") and not canon.get("communityNameEn"):
                        canon["communityNameEn"] = r["communityNameEn"]
                    continue
                by_gid_key[gid_val] = r
            deduped_list.append(r)

        # Disambiguate remaining identical nameEn/nameVi with different gameIds in the same shard
        name_en_counts: Dict[str, int] = {}
        for r in deduped_list:
            k = r["nameEn"].strip().lower()
            name_en_counts[k] = name_en_counts.get(k, 0) + 1

        for r in deduped_list:
            k = r["nameEn"].strip().lower()
            gid_val = r.get("gameId")
            if name_en_counts.get(k, 0) > 1 and isinstance(gid_val, int):
                suffix = f" (#{gid_val})"
                if not r["nameEn"].endswith(suffix):
                    r["nameEn"] = f"{r['nameEn']}{suffix}"
                if not r["nameVi"].endswith(suffix):
                    r["nameVi"] = f"{r['nameVi']}{suffix}"

        deduped_list.sort(
            key=lambda r: (
                0 if r.get("glossaryId") else 1,
                RARITY_PRIORITY_ORDER.get(r["rarity"], 5),
                r["nameEn"].lower(),
                r["id"],
            )
        )
        shards[cat] = deduped_list
        category_counts[cat] = len(deduped_list)
        all_records.extend(deduped_list)

        shard_payload = {
            "category": cat,
            "total": len(deduped_list),
            "items": deduped_list,
        }
        shard_path = os.path.join(CODEX_OUTPUT_DIR, f"{cat}.json")
        with open(shard_path, "w", encoding="utf-8", newline="\n") as f:
            json.dump(shard_payload, f, ensure_ascii=False, separators=(",", ":"))

    # 4. Build deduplicated priority search-index.json (< 45 KB gzip — GAP-P5-10)
    def search_priority_key(r: Dict[str, Any]) -> Tuple[int, int, int, int, str]:
        is_ssot = 0 if r.get("glossaryId") else 1
        is_skin_dup = 1 if r.get("subCategory") == "hero-skins" else 0
        is_monster = 1 if r["category"] == "monsters" else 0
        r_order = RARITY_PRIORITY_ORDER.get(r["rarity"], 5)
        return (is_ssot, is_skin_dup, is_monster, r_order, r["nameEn"].lower())

    sorted_candidates = sorted(all_records, key=search_priority_key)
    deduped_index_items: List[Dict[str, Any]] = []
    seen_keys = set()

    for r in sorted_candidates:
        dedup_key = (r["category"], r["nameEn"].strip().lower(), r.get("glossaryId") or "")
        if dedup_key in seen_keys and not r.get("glossaryId"):
            continue
        seen_keys.add(dedup_key)

        if r.get("glossaryId"):
            short_desc_vi = r["descVi"][:90].strip()
            short_desc_en = r["descEn"][:90].strip()
        else:
            short_desc_vi = r["nameVi"]
            short_desc_en = r["nameEn"]

        idx_item: Dict[str, Any] = {
            "id": r["id"],
            "gameId": r["gameId"],
            "glossaryId": r["glossaryId"],
            "category": r["category"],
            "subCategory": r["subCategory"],
            "path": r["path"],
            "nameVi": r["nameVi"],
            "nameEn": r["nameEn"],
            "communityNameVi": r["communityNameVi"],
            "communityNameEn": r["communityNameEn"],
            "descVi": short_desc_vi,
            "descEn": short_desc_en,
            "rarity": r["rarity"],
            "faction": r["faction"],
            "relatedArticleSlugs": r["relatedArticleSlugs"][:1],
        }
        if r.get("portraitPath"):
            idx_item["portraitPath"] = r["portraitPath"]
        if r.get("extraTags"):
            idx_item["extraTags"] = r["extraTags"]

        deduped_index_items.append(idx_item)
        if len(deduped_index_items) >= 505:
            break

    # Group by category first to maximize LZ77/Gzip dictionary locality (< 45 KB gzip)
    deduped_index_items.sort(
        key=lambda x: (
            0 if x.get("glossaryId") else 1,
            x["category"],
            x["path"],
        )
    )

    search_index_payload = {
        "version": "4.0.0",
        "totalEntities": len(all_records),
        "indexedEntities": len(deduped_index_items),
        "categoryCounts": category_counts,
        "items": deduped_index_items,
    }
    search_index_path = os.path.join(CODEX_OUTPUT_DIR, "search-index.json")
    raw_json_bytes = json.dumps(
        search_index_payload, ensure_ascii=False, separators=(",", ":")
    ).encode("utf-8")
    with open(search_index_path, "wb") as f:
        f.write(raw_json_bytes)

    gzip_kb = len(zlib.compress(raw_json_bytes, level=9)) / 1024.0
    print(
        f"[OK] Generated 12 Codex shards ({len(all_records)} total entities, counts={category_counts}) "
        f"& search-index.json ({len(deduped_index_items)} priority items, {gzip_kb:.2f} KB gzip)."
    )


if __name__ == "__main__":
    main()

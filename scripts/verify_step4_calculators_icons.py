#!/usr/bin/env python3
"""Automated verification script for Step 4 (/calculators icon & metadata remediation).

Verifies all 45 audit findings (AUD-CALC-001 .. AUD-CALC-045) and asserts that every
/images/... path referenced in tophub-web/src/content/calculators/*.ts exists on disk.
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")

ROOT = Path(__file__).resolve().parents[1]
CALC_DIR = ROOT / "src" / "content" / "calculators"
CALC_COMP_DIR = ROOT / "src" / "components" / "calculators"
PUBLIC_DIR = ROOT / "public"


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def verify_all_image_paths_exist(errors: list[str]) -> int:
    img_re = re.compile(r'["\'](/images/[^"\']+\.(?:webp|png|svg))["\']')
    checked = 0
    for ts_file in sorted(CALC_DIR.glob("*.ts")):
        content = read_text(ts_file)
        for match in img_re.finditer(content):
            rel_path = match.group(1)
            checked += 1
            disk_path = PUBLIC_DIR / rel_path.lstrip("/")
            if not disk_path.is_file():
                errors.append(
                    f"[404] {ts_file.name}: missing image file on disk -> {rel_path}"
                )
    return checked


def verify_exclusive_weapons(errors: list[str]) -> None:
    content = read_text(CALC_DIR / "exclusive-weapon-data.ts")
    expected_map = {
        "adjudicator": "/images/equipment/exclusive-weapons/equipment_Exclusive002.webp",
        "paragon": "/images/equipment/exclusive-weapons/equipment_Exclusive008.webp",
        "rose_princess": "/images/equipment/exclusive-weapons/equipment_Exclusive009.webp",
        "bishop": "/images/equipment/exclusive-weapons/equipment_Exclusive011.webp",
        "pyromancer": "/images/equipment/exclusive-weapons/equipment_Exclusive001.webp",
        "astrologer": "/images/equipment/exclusive-weapons/equipment_Exclusive005.webp",
        "tidecaller": "/images/equipment/exclusive-weapons/equipment_Exclusive024.webp",
        "monk": "/images/equipment/exclusive-weapons/equipment_Exclusive021.webp",
        "pixie": "/images/equipment/exclusive-weapons/equipment_Exclusive022.webp",
        "forest_maiden": "/images/equipment/exclusive-weapons/equipment_Exclusive020.webp",
        "windwalker": "/images/equipment/exclusive-weapons/equipment_Exclusive004.webp",
        "desert_prince": "/images/equipment/exclusive-weapons/equipment_Exclusive013.webp",
        "storm_maiden": "/images/equipment/exclusive-weapons/equipment_Exclusive015.webp",
        "witch": "/images/equipment/exclusive-weapons/equipment_Exclusive016.webp",
        "wukong": "/images/equipment/exclusive-weapons/equipment_Exclusive006.webp",
        "beastmaster": "/images/equipment/exclusive-weapons/equipment_Exclusive018.webp",
    }
    if "/images/codex/equipment/" in content:
        errors.append(
            "[AUD-CALC-001..016] exclusive-weapon-data.ts still contains legacy '/images/codex/equipment/' path."
        )
    for hero_id, expected_path in expected_map.items():
        pattern = re.compile(
            rf'heroId:\s*"{hero_id}".*?weaponIconPath:\s*"([^"]+)"',
            re.DOTALL,
        )
        m = pattern.search(content)
        if not m:
            errors.append(f"[AUD-CALC-001..016] Missing heroId='{hero_id}' in exclusive-weapon-data.ts")
        elif m.group(1) != expected_path:
            errors.append(
                f"[AUD-CALC-001..016] {hero_id}: expected {expected_path}, got {m.group(1)}"
            )


def verify_faction_levels(errors: list[str]) -> None:
    content = read_text(CALC_DIR / "faction-level-data.ts")
    expected = {
        "league": "/images/heroes/avatars/Head_10033.webp",
        "horde": "/images/heroes/avatars/Head_10039.webp",
        "nature": "/images/heroes/avatars/Head_10044.webp",
    }
    for faction_id, exp_icon in expected.items():
        pattern = re.compile(
            rf'id:\s*"{faction_id}".*?defaultHeroIconPath:\s*"([^"]+)"',
            re.DOTALL,
        )
        m = pattern.search(content)
        if not m or m.group(1) != exp_icon:
            actual = m.group(1) if m else "NOT_FOUND"
            errors.append(
                f"[AUD-CALC-017..019] faction '{faction_id}': expected {exp_icon}, got {actual}"
            )


def verify_gear_promotion(errors: list[str]) -> None:
    content = read_text(CALC_DIR / "gear-promotion-data.ts")
    expected_sets = {
        "knights_glory": ("42064", "42053", "064", "053"),
        "titans_might": ("40063", "40052", "063", "052"),
        "fury_of_blood": ("40062", "40059", "062", "059"),
        "commanders_set": ("40060", "40051", "060", "051"),
    }
    slot_prefixes = {"weapon": "40", "boots": "42", "armor": "41", "helmet": "45"}
    for set_id, (sample_leg, sample_myth, leg_suffix, myth_suffix) in expected_sets.items():
        set_block_m = re.search(
            rf'id:\s*"{set_id}".*?(?=\n  \{{|\n\];)', content, re.DOTALL
        )
        if not set_block_m:
            errors.append(f"[AUD-CALC-020..023] Missing set '{set_id}' in gear-promotion-data.ts")
            continue
        block = set_block_m.group(0)
        exp_sample_leg = f"/images/equipment/hero-gear/icon_{sample_leg}.webp"
        exp_sample_myth = f"/images/equipment/hero-gear/icon_{sample_myth}.webp"
        if f'sampleLegendaryIconPath: "{exp_sample_leg}"' not in block:
            errors.append(
                f"[AUD-CALC-020..023] {set_id}.sampleLegendaryIconPath != {exp_sample_leg}"
            )
        if f'sampleMythicIconPath: "{exp_sample_myth}"' not in block:
            errors.append(
                f"[AUD-CALC-020..023] {set_id}.sampleMythicIconPath != {exp_sample_myth}"
            )
        for slot_name, pref in slot_prefixes.items():
            exp_leg = f"/images/equipment/hero-gear/icon_{pref}{leg_suffix}.webp"
            exp_myth = f"/images/equipment/hero-gear/icon_{pref}{myth_suffix}.webp"
            slot_m = re.search(
                rf'{slot_name}:\s*\{{.*?legendaryIconPath:\s*"([^"]+)".*?mythicIconPath:\s*"([^"]+)"',
                block,
                re.DOTALL,
            )
            if not slot_m:
                errors.append(f"[AUD-CALC-020..023] {set_id}.{slot_name} not found")
            else:
                if slot_m.group(1) != exp_leg:
                    errors.append(
                        f"[AUD-CALC-020..023] {set_id}.{slot_name}.legendaryIconPath: expected {exp_leg}, got {slot_m.group(1)}"
                    )
                if slot_m.group(2) != exp_myth:
                    errors.append(
                        f"[AUD-CALC-020..023] {set_id}.{slot_name}.mythicIconPath: expected {exp_myth}, got {slot_m.group(2)}"
                    )


def verify_gear_enhance(errors: list[str]) -> None:
    content = read_text(CALC_DIR / "gear-enhance-data.ts")
    expected_samples = {
        "legendary": "/images/equipment/hero-gear/icon_42064.webp",
        "epic": "/images/equipment/hero-gear/icon_40002.webp",
        "rare": "/images/equipment/hero-gear/icon_40004.webp",
    }
    for rarity, exp_sample in expected_samples.items():
        m = re.search(
            rf'rarity:\s*"{rarity}".*?sampleIconPath:\s*"([^"]+)"',
            content,
            re.DOTALL,
        )
        if not m or m.group(1) != exp_sample:
            actual = m.group(1) if m else "NOT_FOUND"
            errors.append(
                f"[AUD-CALC-024..026] GEAR_ENHANCE_RARITY_CONFIGS.{rarity}.sampleIconPath: expected {exp_sample}, got {actual}"
            )

    expected_slots = {
        1531: "/images/equipment/hero-gear/icon_40064.webp",
        1533: "/images/equipment/hero-gear/icon_42064.webp",
        1532: "/images/equipment/hero-gear/icon_41064.webp",
        1534: "/images/equipment/hero-gear/icon_45064.webp",
        1401: "/images/equipment/hero-gear/icon_40002.webp",
        1403: "/images/equipment/hero-gear/icon_42020.webp",
        1402: "/images/equipment/hero-gear/icon_41003.webp",
        1404: "/images/equipment/hero-gear/icon_45003.webp",
        1301: "/images/equipment/hero-gear/icon_40004.webp",
        1303: "/images/equipment/hero-gear/icon_42010.webp",
        1302: "/images/equipment/hero-gear/icon_41005.webp",
        1304: "/images/equipment/hero-gear/icon_45022.webp",
    }
    for game_id, exp_icon in expected_slots.items():
        m = re.search(
            rf'gameId:\s*{game_id}\b.*?iconPath:\s*"([^"]+)"',
            content,
            re.DOTALL,
        )
        if not m or m.group(1) != exp_icon:
            actual = m.group(1) if m else "NOT_FOUND"
            errors.append(
                f"[AUD-CALC-024..026] gear-enhance gameId={game_id}: expected {exp_icon}, got {actual}"
            )


def verify_troop_skins(errors: list[str]) -> None:
    content = read_text(CALC_DIR / "troop-skins-data.ts")
    if 'TROOP_SKIN_UNIVERSAL_CHEST_ICON = "/images/items/consumables/icon_30566.webp"' not in content:
        errors.append(
            "[AUD-CALC-027] TROOP_SKIN_UNIVERSAL_CHEST_ICON must be '/images/items/consumables/icon_30566.webp'"
        )
    expected_avatars = {
        "heavy-cavalry": "/images/troops/skins-avatars/ArmsHead_10010_1.webp",
        "divine-spirit": "/images/troops/skins-avatars/ArmsHead_10019_1.webp",
        "desert-knight": "/images/troops/skins-avatars/ArmsHead_10018_1.webp",
        "tree-spirit": "/images/troops/skins-avatars/ArmsHead_10017_1.webp",
        "brave-fighter": "/images/troops/skins-avatars/ArmsHead_10015_1.webp",
        "skeleton-soldier": "/images/troops/skins-avatars/ArmsHead_10016_1.webp",
        "honor-guard": "/images/troops/skins-avatars/ArmsHead_10008_1.webp",
        "siege-vehicle": "/images/troops/skins-avatars/ArmsHead_10013_1.webp",
        "samurai": "/images/troops/skins-avatars/ArmsHead_10007_1.webp",
        "bearskin-warrior": "/images/troops/skins-avatars/ArmsHead_10006_1.webp",
        "logistic-follower": "/images/troops/skins-avatars/ArmsHead_10009_1.webp",
        "drum-corps": "/images/troops/skins-avatars/ArmsHead_10014_1.webp",
        "elegant-butler": "/images/troops/skins-avatars/ArmsHead_10012_1.webp",
        "shield-soldier": "/images/troops/skins-avatars/ArmsHead_10001_1.webp",
        "cavalry": "/images/troops/skins-avatars/ArmsHead_10002_1.webp",
    }
    for skin_id, exp_avatar in expected_avatars.items():
        m = re.search(
            rf'id:\s*"{skin_id}".*?iconPath:\s*"([^"]+)"',
            content,
            re.DOTALL,
        )
        if not m or m.group(1) != exp_avatar:
            actual = m.group(1) if m else "NOT_FOUND"
            errors.append(
                f"[AUD-CALC-028..039] troop skin '{skin_id}': expected {exp_avatar}, got {actual}"
            )


def verify_vip_relics_traits_events(errors: list[str]) -> None:
    vip_content = read_text(CALC_DIR / "vip-and-shops-data.ts")
    if "icon_30242.webp" in vip_content:
        errors.append("[AUD-CALC-040] vip-and-shops-data.ts still references icon_30242.webp")
    if "getSoulStoneMaterialForPlan" not in vip_content:
        errors.append(
            "[AUD-CALC-041] vip-and-shops-data.ts missing getSoulStoneMaterialForPlan helper for dynamic faction Soul Stone icon"
        )

    reg_content = read_text(CALC_DIR / "registry.ts")
    if 'iconPath: "/images/items/consumables/icon_30397.webp"' not in reg_content:
        errors.append("[AUD-CALC-042] registry.ts relicScroll.iconPath must be icon_30397.webp")

    relics_content = read_text(CALC_DIR / "relics-data.ts")
    for art_id in [
        "Artifact_40005.webp",
        "Artifact_50004.webp",
        "Artifact_50006.webp",
        "Artifact_50007.webp",
        "Artifact_50010.webp",
        "Artifact_50012.webp",
        "Artifact_50019.webp",
    ]:
        if art_id not in relics_content:
            errors.append(f"[AUD-CALC-043] relics-data.ts missing {art_id}")

    traits_content = read_text(CALC_DIR / "hero-traits-data.ts")
    stale_trait_phrases = [
        "Tướng Vàng Liên Minh: Tăng khả năng tự bảo vệ trước sát thương bạo kích.",
        "League Legendary: Improves resilience against critical damage.",
        "Benched Economic Epic: Upgrade Slot 1 Lv.15",
        "Thiên Phú Nội Chính Cơ Bản (Tướng Lam)",
        "Base Economy Trait (Rare Hero)",
        "Thiên Phú Trinh Sát & Hành Quân Cơ Bản (Tướng Lam)",
        "Base Scouting & March Trait (Rare Hero)",
    ]
    for phrase in stale_trait_phrases:
        if phrase in traits_content:
            errors.append(
                f"[AUD-CALC-044] hero-traits-data.ts still contains stale pre-Step-1 rarity text: '{phrase}'"
            )

    ev_data_content = read_text(CALC_DIR / "event-points-data.ts")
    if "Activity_74.webp" not in ev_data_content or "Activity_113.webp" not in ev_data_content:
        errors.append(
            "[AUD-CALC-045] event-points-data.ts must define EVENT_SCORING_MODE_META with Activity_74.webp (GAR) and Activity_113.webp (KvK)"
        )
    ev_comp_content = read_text(CALC_COMP_DIR / "event-points-calculator.tsx")
    if "EVENT_SCORING_MODE_META" not in ev_comp_content:
        errors.append(
            "[AUD-CALC-045] event-points-calculator.tsx must render EVENT_SCORING_MODE_META icons on GAR/KvK mode buttons"
        )


def main() -> int:
    errors: list[str] = []
    checked_paths = verify_all_image_paths_exist(errors)
    verify_exclusive_weapons(errors)
    verify_faction_levels(errors)
    verify_gear_promotion(errors)
    verify_gear_enhance(errors)
    verify_troop_skins(errors)
    verify_vip_relics_traits_events(errors)

    if errors:
        print(f"❌ Step 4 Verification FAILED with {len(errors)} error(s):")
        for err in errors:
            print(f"  - {err}")
        return 1

    print(
        f"✅ Step 4 Verification PASSED! Checked {checked_paths} calculator image paths on disk + all 45 AUD-CALC-001..045 rules."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

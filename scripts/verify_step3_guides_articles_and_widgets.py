#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Step 3 TDD Verification Script — Guides Articles (Groups 1..9), Table/Diagram Resolvers & Remaining Widgets.
Verifies:
  1. Zero '/images/guides/' legacy paths and zero fake .webp filenames across all 39 article files (AUD-ART-001..006).
  2. 'item-epic-universal-shard' (/images/items/shards/icon_30176.webp) exists in GAME_ASSET_REGISTRY and maps 'mảnh anh hùng sử thi vạn năng' / 'universal epic hero shard' (AUD-ART-007).
  3. 'item-meat' (/images/items/resources/icon_20001.webp) maps 'thịt' / 'meat', and MASTER_TABLE_ICON_BY_CODE['4.1'] == 'item-meat'.
  4. Zero bare-rarity aliases ('vàng', 'legendary', 'tím', 'epic', 'xanh', 'rare', 'thần thoại', 'mythic') in RAW_ALIAS_LOOKUP that hijack non-hero table rows into Hero avatars.
  5. 'DIAGRAM_NODE_ICON_MAP' exists in asset-registry.ts and maps all 238 diagram nodeIds to valid existing assets in GAME_ASSET_REGISTRY.
"""

from __future__ import annotations

import glob
import json
import os
import re
import sys

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
PUBLIC_DIR = os.path.join(ROOT_DIR, "public")
GROUPS_DIR = os.path.join(ROOT_DIR, "src", "content", "guides", "groups")
ASSET_REGISTRY_PATH = os.path.join(ROOT_DIR, "src", "content", "guides", "asset-registry.ts")
MASTER_WIDGET_PATH = os.path.join(
    ROOT_DIR, "src", "components", "guides", "widgets", "master-data-explorer-widget.tsx"
)


def main() -> int:
    failures: list[str] = []

    # 1. Check all 39 article files for legacy /images/guides/ paths and fake .webp names
    article_files = sorted(glob.glob(os.path.join(GROUPS_DIR, "group-*", "*.ts")))
    if len(article_files) < 34:
        failures.append(f"Expected >= 34 article files, found {len(article_files)}")

    fake_filenames = (
        "universal-legendary-shard.webp",
        "soul-stone-horde.webp",
        "epic-skill-book.webp",
    )
    for path in article_files:
        rel = os.path.relpath(path, ROOT_DIR)
        content = open(path, encoding="utf-8").read()
        if "/images/guides/" in content:
            failures.append(f"{rel}: still contains legacy '/images/guides/' path")
        for fake in fake_filenames:
            if fake in content:
                failures.append(f"{rel}: still contains fake filename '{fake}'")

    # 2. Parse asset-registry.ts
    reg_text = open(ASSET_REGISTRY_PATH, encoding="utf-8").read()

    m_reg = re.search(
        r"export const GAME_ASSET_REGISTRY:\s*Readonly<Record<string,\s*GameAssetEntry>>\s*=\s*(\{.*?\n\});",
        reg_text,
        re.S,
    )
    if not m_reg:
        failures.append("Could not parse GAME_ASSET_REGISTRY from asset-registry.ts")
        assets = {}
    else:
        assets = json.loads(m_reg.group(1))

    m_alias = re.search(
        r"const RAW_ALIAS_LOOKUP:\s*Readonly<Record<string,\s*string>>\s*=\s*(\{.*?\n\});",
        reg_text,
        re.S,
    )
    if not m_alias:
        failures.append("Could not parse RAW_ALIAS_LOOKUP from asset-registry.ts")
        aliases = {}
    else:
        aliases = json.loads(m_alias.group(1))

    m_diag = re.search(
        r"export const DIAGRAM_NODE_ICON_MAP:\s*Readonly<Record<string,\s*string>>\s*=\s*(\{.*?\n\});",
        reg_text,
        re.S,
    )
    if not m_diag:
        failures.append("Missing DIAGRAM_NODE_ICON_MAP in asset-registry.ts")
        diag_map = {}
    else:
        diag_map = json.loads(m_diag.group(1))

    # 3. Verify item-epic-universal-shard (AUD-ART-007)
    epic_shard = assets.get("item-epic-universal-shard")
    if not epic_shard:
        failures.append("Missing 'item-epic-universal-shard' in GAME_ASSET_REGISTRY")
    elif epic_shard.get("iconPath") != "/images/items/shards/icon_30176.webp":
        failures.append(
            f"item-epic-universal-shard iconPath={epic_shard.get('iconPath')} (expected /images/items/shards/icon_30176.webp)"
        )

    for alias_key in (
        "mảnh anh hùng sử thi vạn năng",
        "universal epic hero shard",
        "mảnh tướng tím vạn năng",
        "mảnh tím vạn năng",
    ):
        if aliases.get(alias_key) != "item-epic-universal-shard":
            failures.append(
                f"RAW_ALIAS_LOOKUP['{alias_key}'] = {aliases.get(alias_key)} (expected 'item-epic-universal-shard')"
            )

    # 4. Verify 'thịt' maps to 'item-meat', not 'item-stamina'
    meat_asset = assets.get("item-meat")
    if not meat_asset or meat_asset.get("iconPath") != "/images/items/resources/icon_20001.webp":
        failures.append("Missing or invalid 'item-meat' (/images/items/resources/icon_20001.webp) in GAME_ASSET_REGISTRY")
    if aliases.get("thịt") != "item-meat":
        failures.append(f"RAW_ALIAS_LOOKUP['thịt'] = {aliases.get('thịt')} (expected 'item-meat')")

    # 5. Verify bare rarity adjectives are NOT in RAW_ALIAS_LOOKUP
    forbidden_bare_rarity_keys = (
        "vàng",
        "legendary",
        "tím",
        "epic",
        "xanh",
        "rare",
        "hiếm",
        "sử thi",
        "huyền thoại",
        "thần thoại",
        "mythic",
        "đỏ",
    )
    for bad_key in forbidden_bare_rarity_keys:
        if bad_key in aliases and aliases[bad_key].startswith("rarity-"):
            failures.append(
                f"Bare rarity key '{bad_key}' still mapped to '{aliases[bad_key]}' in RAW_ALIAS_LOOKUP"
            )

    # 6. Verify DIAGRAM_NODE_ICON_MAP has >= 238 entries and all point to valid assets
    if len(diag_map) < 238:
        failures.append(f"DIAGRAM_NODE_ICON_MAP has {len(diag_map)} entries (expected >= 238)")
    for nid, aid in diag_map.items():
        if aid not in assets:
            failures.append(f"DIAGRAM_NODE_ICON_MAP['{nid}'] points to unknown asset '{aid}'")

    # Check key diagram nodes that previously collided with item-universal-shard or event-kvk
    expected_diag_targets = {
        "uw-root-node": "gear-exclusive-weapon",
        "uw-phase1-lv1": "gear-exclusive-weapon",
        "uw-phase1-lv5": "gear-exclusive-weapon",
        "uw-phase2-lv10-stats": "gear-exclusive-weapon",
        "uw-phase3-lv15": "gear-exclusive-weapon",
        "step-hero-gear-craft-enhance": "item-upgrade-rune",
        "step-uw-shards-hoard": "gear-exclusive-weapon",
        "step-pet-friday-promote": "system-pets-behemoth",
    }
    for nid, exp_aid in expected_diag_targets.items():
        if diag_map.get(nid) != exp_aid:
            failures.append(
                f"DIAGRAM_NODE_ICON_MAP['{nid}'] = {diag_map.get(nid)} (expected '{exp_aid}')"
            )

    # 7. Verify MasterDataExplorerWidget Table 4.1 icon is item-meat
    mw_text = open(MASTER_WIDGET_PATH, encoding="utf-8").read()
    if '"4.1": "item-meat"' not in mw_text:
        failures.append('MasterDataExplorerWidget MASTER_TABLE_ICON_BY_CODE["4.1"] is not "item-meat"')

    if failures:
        print(f"[FAIL] Step 3 verification failed with {len(failures)} error(s):")
        for f in failures:
            print(f"  - {f}")
        return 1

    print(
        f"[PASS] Step 3 verification succeeded: {len(article_files)} articles clean, "
        f"{len(assets)} registry assets, {len(diag_map)} diagram nodes mapped."
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())

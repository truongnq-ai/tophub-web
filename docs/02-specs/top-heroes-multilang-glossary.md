# Top Heroes Multi-Language Glossary & Editorial Localization Standard (`DEC-V4-03`)

- **Document ID**: `SPEC-GUIDES-V4-GLOSSARY`
- **Code SSoT**: [`src/content/guides/glossary.ts`](file:///d:/GitHub/top-hero/tophub-web/src/content/guides/glossary.ts)
- **Automated Gate**: [`tests/guides-bilingual-purity.test.ts`](file:///d:/GitHub/top-hero/tophub-web/tests/guides-bilingual-purity.test.ts)
- **Parent Spec**: [`2026-10-16-guides-v4-editorial-html-and-ui-overhaul-master-plan.md`](file:///d:/GitHub/top-hero/tophub-web/docs/02-specs/2026-10-16-guides-v4-editorial-html-and-ui-overhaul-master-plan.md) (`DEC-V4-03`, `Section 3.3`, `AC-V4-4.1`, `NFR-V4-03`)

---

## 1. Editorial Localization Rules (`VI` vs `EN` Purity)

1. **English (`en`) 100% Purity Rule (`AC-V4-4.1`)**:
   - Every `.en` string across all 31 articles, 8 category wrappers, 3 zones, `messages/en.json`, `glossary.ts`, and all 8 Interactive Widgets (`locale="en"`) MUST be **100% pure international English** (`0` Vietnamese diacritics matching `/[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i`).
   - Never include Vietnamese parenthetical glosses inside `.en` strings (e.g., write `"Guild Race"` instead of `"Guild Race (Thi Đấu Hội)"`, `"9 Red Soul Stones"` instead of `"9 Hồn Đá Đỏ / Soul Stones"`).
2. **Vietnamese (`vi`) First-Mention & Naturalness Rule**:
   - Use natural Vietnamese terminology paired with the canonical English game term in parentheses or `` `code` `` badge on first mention in a section (e.g., `**Thi Đấu Hội (\`Guild Race\`)**`, `**Hồn Đá Đỏ (\`Red Soul Stone\`)**`), then use concise Vietnamese (`Thi Đấu Hội`, `Hồn Đá Đỏ`, `Mảnh Vạn Năng`) in subsequent lines.
3. **Multi-Language Extensibility (`NFR-V4-03`)**:
   - [`src/content/guides/glossary.ts`](file:///d:/GitHub/top-hero/tophub-web/src/content/guides/glossary.ts) defines `GlossaryExtendedLocale = "vi" | "en" | "ja" | "ko" | "zh" | "th"`.
   - Adding a new language (`ja`, `ko`, `zh`, `th`) only requires populating the optional locale key in `GUIDE_GLOSSARY`; `translateGlossaryTerm(termId, locale)` automatically falls back to `term.en` whenever an optional locale is omitted.

---

## 2. Canonical 8-Group Terminology Tables

### 2.1. Group 1 — Factions (`factions`)

| Term ID | Vietnamese (`vi`) | Canonical English (`en`) | Tactical Summary |
| :--- | :--- | :--- | :--- |
| `faction-league` | Phe Liên Minh (League) | League Faction | Counters Nature (`+20% DMG`); smoothest S0 starter faction (Days 1–20). |
| `faction-horde` | Phe Bộ Lạc (Horde) | Horde Faction | Counters League (`+20% DMG`); meta-dominating faction from Day 21+ with 5–6 Native Mythics. |
| `faction-nature` | Phe Thiên Nhiên (Nature) | Nature Faction | Counters Horde (`+20% DMG`); endgame summon-swarm & sustain powerhouse (S1–S4). |
| `faction-aura` | Hào Quang Hệ Phái (Faction Aura) | Faction Aura | Team-wide stat multiplier when deploying 4, 5, or 6 same-faction heroes. |
| `faction-counter-bonus` | Khắc Chế Hệ Phái (Faction Counter) | Faction Counter Bonus | League ➔ Nature ➔ Horde ➔ League elemental counter triangle. |

### 2.2. Group 2 — Rarities & Star Tiers (`rarities_and_tiers`)

| Term ID | Vietnamese (`vi`) | Canonical English (`en`) | Tactical Benchmark |
| :--- | :--- | :--- | :--- |
| `rarity-mythic` | Tướng Đỏ (Mythic) | Mythic (UR) | `160 Shards` (`1★ Red`), `560 Shards` (`1★ White`), `1,000 Shards` (`5★ White / 15★`). |
| `rarity-legendary` | Tướng Vàng (Legendary) | Legendary (SSR) | `80 Shards` (`1★ Red`), `280 Shards` (`1★ White`), `500 Shards` (`5★ White / 15★`). |
| `rarity-epic` | Tướng Tím (Epic) | Epic (SR) | `300 Shards` (`2★ White / 12★`) unlocks Trait 3 Lv.30 `+30%` Economy Passive. |
| `rarity-rare` | Tướng Xanh (Rare) | Rare (R) | Starter heroes kept on bench strictly for Hero Bonds. |
| `tier-yellow-stars` | Sao Vàng (Yellow Stars 1★–5★) | Yellow Stars (1★–5★) | Initial 5-star tier (`60 Mythic` / `30 Legendary` Shards). |
| `tier-red-stars` | Sao Đỏ (Red Stars 6★–10★) | Red Stars (1★–5★ Red / 6★–10★) | `1 Red Star` (`6★`) unlocks the 5th/6th combat skill. |
| `tier-white-stars` | Sao Trắng / Bạc (White Stars 11★–15★) | White / Silver Stars (1★–5★ White / 11★–15★) | `1 White Star` (`11★`) is the optimal F2P combat stopping point. |
| `tier-awakening` | Thức Tỉnh Tướng Vàng (Awakening) | Hero Awakening | `9 Red Soul Stones` + `345–385 Hero Shards` across 4 tiers after `1★ White`. |

### 2.3. Group 3 — Roles & Formation Positions (`roles_and_positions`)

| Term ID | Vietnamese (`vi`) | Canonical English (`en`) | Standard Golden Gear Set |
| :--- | :--- | :--- | :--- |
| `role-main-tank` | Đỡ Đòn Chính (Main Tank) | Main Tank | `Blood of the Titan` (`Huyết Titan`) |
| `role-bruiser` | Đấu Sĩ Bán Chống Chịu (Bruiser / Off-Tank) | Bruiser / Off-Tank | `Blood of the Titan` / `Knight's Glory` |
| `role-hyper-carry` | Chủ Lực Sát Thương (Hyper-Carry DPS) | Hyper-Carry DPS | `Knight's Glory` (`Kỵ Sĩ Vinh Quang`) |
| `role-support-healer` | Hỗ Trợ / Hồi Máu (Support / Healer) | Support / Healer | `Glory of the Sage` (`Hiền Triết Quang Vinh`) |
| `pos-frontline` | Hàng Trước (Frontline — Ô 1 & 2) | Frontline (Slots 1 & 2) | Absorbs opening focus fire and frontal cleaves. |
| `pos-midline` | Hàng Giữa (Midline — Ô 3 & 4) | Midline (Slots 3 & 4) | Safest pocket for Hyper-Carry DPS units. |
| `pos-backline` | Hàng Sau (Backline — Ô 5 & 6) | Backline (Slots 5 & 6) | Rear slots for Healers, Buffers, and Controllers. |

### 2.4. Group 4 — All 51 SSoT Heroes (`heroes`)

| Faction | Rarity | Hero ID | Vietnamese (`vi`) | Canonical English (`en`) |
| :---: | :---: | :--- | :--- | :--- |
| **League (16)** | Mythic (4) | `hero-rose-princess`, `hero-paragon`, `hero-bishop`, `hero-artificer` | Công Chúa Rose, Thiện Xạ, Giám Mục, Thợ Chế Tạo | Rose Princess, Paragon, Bishop, Artificer |
| **League (16)** | Legendary (7) | `hero-adjudicator`, `hero-pyromancer`, `hero-nun`, `hero-bard`, `hero-astrologer`, `hero-secret-keeper`, `hero-hostess` | Thẩm Phán, Pháp Sư Lửa, Nữ Tu, Nhà Thơ, Chiêm Tinh Gia, Người Giữ Bí Mật, Nữ Chủ Quán | Adjudicator, Pyromancer, Nun, Bard, Astrologer, Secret Keeper, Hostess |
| **League (16)** | Epic (3) & Rare (2) | `hero-knight`, `hero-ranger`, `hero-minister`, `hero-guardsman`, `hero-crossbowman` | Kỵ Sĩ, Cung Thủ / Thợ Săn, Bộ Trưởng, Vệ Binh, Nỏ Thủ | Knight, Ranger, Minister, Guardsman, Crossbowman |
| **Horde (19)** | Mythic (6) | `hero-desert-prince`, `hero-storm-maiden`, `hero-witch`, `hero-wukong`, `hero-beastmaster`, `hero-shadow-priest` | Hoàng Tử Sa Mạc, Nữ Thần Bão Tố, Phù Thủy, Tôn Ngộ Không, Thú Tướng, Giáo Sĩ Bóng Tối | Desert Prince, Storm Maiden, Witch, Wukong, Beastmaster, Shadow Priest |
| **Horde (19)** | Legendary (9) | `hero-soulmancer`, `hero-warlock`, `hero-wilderness-hunter`, `hero-swordmaster`, `hero-barbarian`, `hero-wanderer`, `hero-headhunter`, `hero-shaman`, `hero-boar` | Thuật Sĩ Linh Hồn, Pháp Sư Bóng Tối, Thợ Săn Hoang Dã, Kiếm Thánh, Chiến Binh Man Rợ, Kẻ Lang Thang, Thợ Săn Đầu Người, Pháp Sư Bộ Lạc, Người Heo Rừng | Soulmancer, Warlock, Wilderness Hunter, Swordmaster, Barbarian, Wanderer, Headhunter, Shaman, Boar |
| **Horde (19)** | Epic (3) & Rare (1) | `hero-brawler`, `hero-rogue`, `hero-outlaw`, `hero-grunt` | Đấu Sĩ, Đạo Tặc / Sát Thủ, Kẻ Ngoài Vòng Pháp Luật, Lính Đánh Thuê | Brawler, Rogue, Outlaw, Grunt |
| **Nature (16)** | Mythic (4) | `hero-tidecaller`, `hero-monk`, `hero-ne-zha`, `hero-petalis` | Thuật Sĩ Thủy Triều, Hòa Thượng / Tu Sĩ, Na Tra, Tiên Hoa Petalis | Tidecaller, Monk, Ne Zha, Petalis |
| **Nature (16)** | Legendary (9) | `hero-pixie`, `hero-forest-maiden`, `hero-sage`, `hero-windwalker`, `hero-treeguard`, `hero-stonemason`, `hero-druid`, `hero-watcher`, `hero-pathfinder` | Tiên Nhỏ, Thiếu Nữ Rừng Xanh, Hiền Giả, Phong Hành Giả, Vệ Thần Rừng, Thợ Đá, Đại Tư Tế Rừng, Người Quan Sát, Người Mở Đường | Pixie, Forest Maiden, Sage, Windwalker, Treeguard, Stonemason, Druid, Watcher, Pathfinder |
| **Nature (16)** | Epic (2) & Rare (1) | `hero-priestess`, `hero-dancer`, `hero-scout` | Nữ Tư Tế, Vũ Công, Trinh Sát Rừng | Priestess, Dancer, Scout |

### 2.5. Group 5 — Events & Rotations (`events`)

| Term ID | Vietnamese (`vi`) | Canonical English (`en`) |
| :--- | :--- | :--- |
| `event-guild-race` | Thi Đấu Hội (Guild Race — Tuần A) | Guild Race (Week A) |
| `event-guild-arms-race` | Chạy Đua Vũ Trang Bang Hội (Guild Arms Race — GAR) | Guild Arms Race (GAR — Week B) |
| `event-kvk` | Chiến Tranh Vương Quốc (Kingdom vs Kingdom — KvK) | Kingdom vs Kingdom (KvK / Four Nations League) |
| `event-dark-empire-invasion` | Đế Quốc Hắc Ám Xâm Nhập (Dark Empire Invasion) | Dark Empire Invasion |
| `event-dark-legion-challenge` | Khiêu Chiến Của Đội Quân Hắc Ám (Dark Legion Challenge) | Dark Legion Challenge |
| `event-giant-raid` | Tập Kích Cự Ma (Giant Raid / Guild Boss) | Giant Raid (Guild Boss) |
| `event-guild-rush` | Đua Điểm Bang Hội (Guild Rush / Ultimate Power) | Guild Rush / Ultimate Power |
| `event-fortune-wheel` | Vòng Quay May Mắn (Fortune Wheel) | Fortune Wheel |
| `event-dice-of-fate` | Xúc Xắc Định Mệnh (Dice of Fate) | Dice of Fate |

### 2.6. Group 6 — Items, Currencies & Gear Sets (`items_and_currencies`)

| Term ID | Vietnamese (`vi`) | Canonical English (`en`) |
| :--- | :--- | :--- |
| `item-soul-stone` | Hồn Đá Đỏ (Red Soul Stone) | Red Soul Stone |
| `item-universal-shard` | Mảnh Tướng Vàng Vạn Năng (Universal Legendary Hero Shard) | Universal Legendary Hero Shard |
| `item-skill-book` | Sách Kỹ Năng (Skill Book) | Skill Book |
| `item-guild-honor` | Điểm Vinh Dự Bang Hội (Guild Honor) | Guild Honor |
| `item-guild-coins` | Xu Vinh Quang Bang Hội (Guild Coins) | Guild Coins |
| `item-promotion-stone` | Đá Thăng Cấp Trang Bị (Promotion Stone) | Promotion Stone |
| `item-refined-metal` | Đá Xanh / Thép Tinh Luyện (Refined Metal) | Refined Metal |
| `item-magic-thread` | Dây Gai / Chỉ Phép (Magic Thread) | Magic Thread |
| `item-blueprints-orichalcum` | Bản Vẽ / Hợp Kim (Blueprints / Orichalcum) | Blueprints / Orichalcum |
| `item-dragon-blood` | Nguyên Liệu Đỏ / Máu Rồng (Dragon Blood) | Dragon Blood (Mythic Material) |
| `item-dragon-essence` | Tinh Hoa Rồng (Dragon Essence — DE-Dust) | Dragon Essence (DE-Dust) |
| `item-glory-medal` | Huy Chương Vinh Quang (Glory Medal) | Glory Medal |
| `gear-set-blood-of-the-titan` | Huyết Titan / Nộ Huyết (Blood of the Titan) | Blood of the Titan (Fury of Blood) |
| `gear-set-knights-glory` | Kỵ Sĩ Vinh Quang (Knight's Glory) | Knight's Glory |
| `gear-set-glory-of-the-sage` | Hiền Triết Quang Vinh (Glory of the Sage) | Glory of the Sage |

### 2.7. Group 7 — Buildings & Progression Systems (`buildings_and_systems`)

| Term ID | Vietnamese (`vi`) | Canonical English (`en`) |
| :--- | :--- | :--- |
| `system-brilliance-institute` | Viện Huy Hoàng (Brilliance Institute) | Brilliance Institute |
| `system-research-cottage` | Viện Nghiên Cứu (Research Cottage) | Research Cottage |
| `system-training-ground` | Trại Huấn Luyện (Training Ground) | Training Ground |
| `system-lord-gear` | Trang Bị Chúa Tể (Lord Gear / Military Gear) | Lord Gear (Military Gear) |
| `system-sacred-codex` | Thánh Điển (Sacred Codex) | Sacred Codex |
| `system-runes` | Đá Cổ Ngữ (Runes) | Runes |
| `system-relics` | Thánh Vật (Relics) | Relics |
| `system-pets-behemoth` | Thú Cưng & Cự Thú (Pets & Behemoth) | Pets & Behemoth |
| `system-troop-skins` | Quân Trang (Troop Skins) | Troop Skins |

### 2.8. Group 8 — Meta Slang & Tactical Concepts (`meta_slang`)

| Term ID | Vietnamese (`vi`) | Canonical English (`en`) |
| :--- | :--- | :--- |
| `meta-strict-one-queue` | Kỷ Luật Độc Tôn Đội 1 (Strict One-Queue Rule) | Strict One-Queue Rule |
| `meta-double-dip` | Ăn Kép Sự Kiện (Double-Dip / Triple-Dip) | Double-Dip / Triple-Dip |
| `meta-horde-pivot` | Xoay Trục Bộ Lạc (Horde Pivot) | Horde Pivot |
| `meta-staircase-promotion` | Thăng Cấp Lính Bậc Thang (Staircase Promotion) | Staircase Troop Promotion |
| `meta-guild-honor-freeze` | Đóng Băng Điểm Vinh Dự (Guild Honor Freeze) | Guild Honor Freeze |
| `meta-smart-staggered-upgrade` | Nâng Cấp Lệch Pha Thông Minh (Smart Staggered Upgrade) | Smart Staggered Upgrade |
| `meta-defense-baiting` | Bẫy Thủ Thành & Giấu Quân (Defense Baiting) | Defense Baiting & Garrison Trap |

# Wave 5 Implementation Plan — Multi-Language Glossary (`glossary.ts`) & 100% Bilingual Purity (`EN` / `VI`) Across All 31 Guides & Interactive Widgets

- **Document ID**: `PLAN-GUIDES-V4-WAVE5`
- **Parent Spec**: [`2026-10-16-guides-v4-editorial-html-and-ui-overhaul-master-plan.md`](file:///d:/GitHub/top-hero/tophub-web/docs/02-specs/2026-10-16-guides-v4-editorial-html-and-ui-overhaul-master-plan.md) (`DEC-V4-03`, `Section 3.3`, `AC-V4-4.1`, `NFR-V4-03`, `Section 6 — Wave 5`)
- **Sibling References**:
  - [`2026-10-16-wave3-content-restructuring-group-1-to-4-plan.md`](file:///d:/GitHub/top-hero/tophub-web/docs/02-specs/2026-10-16-wave3-content-restructuring-group-1-to-4-plan.md)
  - [`2026-10-16-wave4-content-restructuring-group-5-to-8-plan.md`](file:///d:/GitHub/top-hero/tophub-web/docs/02-specs/2026-10-16-wave4-content-restructuring-group-5-to-8-plan.md)
- **Date**: `2026-10-17`
- **Status**: `✅ COMPLETED (All 6 Tasks Executed — 40/40 Bilingual Purity Tests & 34/34 Test Suites PASS)`
- **Target Scope**:
  1. **New Multi-Language Terminology Engine & Reference Specification**:
     - `tophub-web/src/content/guides/glossary.ts` *(New SSoT Module — 8 Categories, 110+ Terms including all 51 SSoT Heroes, extensible for `vi`, `en`, `ja`, `ko`, `zh`, `th`)*
     - `tophub-web/docs/02-specs/top-heroes-multilang-glossary.md` *(New Human-Readable Reference Spec)*
  2. **14 Guide Articles with `en:` Vietnamese Leaks (`253` leaked `en:` strings ➔ `0`)**:
     - **Group 1 (`40` leaks across 4 files)**: `1.1-overview.ts` (`11`), `1.2-strict-one-queue-rule.ts` (`10`), `1.3-diamond-and-spending-guide.ts` (`14`), `1.4-top-10-account-traps.ts` (`5`)
     - **Group 2 (`157` leaks across 4 files)**: `2.1-encyclopedia.ts` (`99`), `2.2-meta-lineups.ts` (`19`), `2.4-shards-and-skill-books.ts` (`1`), `2.5-epic-hero-traits.ts` (`38`)
     - **Groups 3–7 (`56` leaks across 6 files)**: `3.1-biweekly-rotation.ts` (`6`), `4.1-preseason-mythic-calendar.ts` (`1`), `5.4-lord-gear-strategy.ts` (`6`), `6.1-runes-guide.ts` (`6`), `7.1-shops-tier-list.ts` (`26`), `7.4-troop-skins-and-medals.ts` (`11`)
     - *(Note: The remaining `17/31` articles — `2.3`, `3.2`, `3.3`, `3.4`, `4.2`, `4.3`, `5.1`, `5.2`, `5.3`, `6.2`, `6.3`, `7.2`, `7.3`, `8.1`, `8.2`, `8.3`, `8.4` — already have `0` Vietnamese characters in `en:`.)*
  3. **Interactive Widget Bilingual Purity (`locale="en"` DOM Leak Elimination)**:
     - `tophub-web/src/components/guides/widgets/hero-encyclopedia-widget.tsx` (`LABELS.en.searchPlaceholder` + locale-gating `({hero.nameVi})` badge)
     - `tophub-web/src/components/guides/widgets/horde-pivot-stepper-widget.tsx` (Bilingualizing `STAGE_META[1..4].queue1Heroes[].note` & `queue2Heroes[].note`)
  4. **Automated Bilingual Purity & Glossary Gate**:
     - `tophub-web/tests/guides-bilingual-purity.test.ts` *(New Test Suite)*

---

## 1. Executive Summary & Quantitative Audit Baseline

Following the 100% completion of **Wave 1** (`<RichGuideText />` AST Parser), **Wave 2** (Clean Editorial Gaming UI Overhaul), **Wave 3** (Groups 1–4 Content Restructuring), and **Wave 4** (Groups 5–8 Content Restructuring), **Wave 5 (Final Wave)** resolves **Requirement 5 (`DEC-V4-03`, `AC-V4-4.1`, `NFR-V4-03`)** of the Master Plan:
1. Establish a canonical, extensible **Multi-Language Glossary (`src/content/guides/glossary.ts` & `docs/02-specs/top-heroes-multilang-glossary.md`)** covering 8 domain categories and 110+ standardized terms.
2. Eradicate **100% of the `253` `en:` strings containing Vietnamese diacritics** across `14/31` articles so that `/en/guides/*` reads as native, idiomatic international gaming English (`0` Vietnamese character leaks).
3. Eradicate **100% of the Vietnamese DOM leaks in Interactive Widgets** when rendered with `locale="en"` (`HeroEncyclopediaWidget` and `HordePivotStepperWidget`).
4. Lock in permanent regression protection via **`tests/guides-bilingual-purity.test.ts`** while preserving `100%` of existing assertions across all `33` test files (`304` tests), including `wave3-content-scannability.test.ts` (`65/65`) and `wave4-content-scannability.test.ts` (`61/61`).

### 1.1. Quantitative Audit Summary Across All 31 Articles (`en:` Vietnamese Diacritic Scan)

Using the canonical Vietnamese diacritic regex:
```ts
const VI_DIACRITIC_REGEX =
  /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ]/;
```
we audited every `LocalizedText` node across all 31 articles, 8 category wrappers, 3 zone definitions, `messages/en.json`, and all 8 Interactive Widgets:

| Group | Article Code & Slug | `en:` Strings with VI Diacritics | Primary Leak Categories & Locations | Target Post-Wave 5 |
| :---: | :--- | :---: | :--- | :---: |
| **Group 1** | `1.1` `overview` | **`11`** | `"9 Hồn Đá Đỏ"`, `"Thi Đấu Hội"`, `"Tập Kích Cự Ma"`, `"Khiêu Chiến Của Đội Quân Hắc Ám"`, `"2 Sao Trắng"`, `"1,181.16 Triệu Thịt"`, `"300 Mảnh"` in tables, callouts & case study | **`0`** |
| **Group 1** | `1.2` `strict-one-queue-rule` | **`10`** | `"1 Sao Trắng"`, `"Mảnh Tướng Vàng Vạn Năng"`, `"9 Hồn Đá Đỏ"`, `"Sách Kỹ Năng"`, `"24,700 Sách/kỹ năng"`, `"1.18 Tỷ Thịt"`, `"~600,000+ Sách"` in `sec-1`, `sec-2`, `sec-4` | **`0`** |
| **Group 1** | `1.3` `diamond-and-spending-guide` | **`14`** | `"Thi Đấu Hội"`, `"9 Hồn Đá Đỏ"`, `"Tập Kích Cự Ma"`, `"Khiêu Chiến Của Đội Quân Hắc Ám"`, `"Đế Quốc Hắc Ám Xâm Nhập"`, `"01 giờ 59 phút"`, `"KC"` in `keyTakeaways`, `sec-1..5` | **`0`** |
| **Group 1** | `1.4` `top-10-account-traps` | **`5`** | `"Thi Đấu Hội"`, `"Khiêu Chiến Của Đội Quân Hắc Ám"`, `"Tập Kích Cự Ma"`, `"Thăng cấp Lính Bậc Thang"`, `"400 Mảnh Vàng Vạn Năng"` in `sub-trap-4`, `sub-trap-10`, `sec-4`, `sec-5` | **`0`** |
| **Group 2** | `2.1` `encyclopedia` | **`99`** | `50` hero `row[1].en` cells (`"Công Chúa Rose"`..`"Trinh Sát Rừng"`), `23` gear set names in `sub-2-1..2-3` `row[5].en` (`"Huyết Titan"`, `"Kỵ Sĩ Vinh Quang"`, `"Hiền Triết Quang Vinh"`), `23` gear set names in `sub-4-1` `row[6].en`, `3` prose/list items in `sec-1` | **`0`** |
| **Group 2** | `2.2` `meta-lineups` | **`19`** | `"9 Hồn Đá Đỏ"`, `"345–385 Mảnh Tướng"`, `"1 Sao Đỏ"`, `"1 Sao Trắng"`, `"360,000 Điểm Vinh Dự"`, `"54,000 Xu Vinh Quang"`, `"160 Mảnh"`, `"560 Mảnh"` in `tldr`, `sub-4-2`, `sub-4-3`, `sec-5` | **`0`** |
| **Group 2** | `2.3` `formation-and-counters` | **`0`** | Clean (`0` leaks) | **`0`** |
| **Group 2** | `2.4` `shards-and-skill-books` | **`1`** | `"Guild Race (Thi Đấu Hội)"` in `sec-3` table `rows[0][2].en` | **`0`** |
| **Group 2** | `2.5` `epic-hero-traits` | **`38`** | `"Brawler (Đấu Sĩ)"`, `"Knight (Kỵ Sĩ)"` in `tldr.immediateAction.en`; `"của anh hùng này"` in `sub-3-1` callout; `36` table cells in `sub-4-1` (8 Epics) & `sub-4-2` (10 Legendaries) with Vietnamese parentheticals | **`0`** |
| **Group 3** | `3.1` `biweekly-rotation` | **`6`** | `"Guild Race (Thi Đấu Hội)"` in `tldr.coreRule.en`, `media_spotlight`, `sub-1-1`, `sub-1-3` | **`0`** |
| **Group 3** | `3.2`–`3.4` (`3` articles) | **`0`** | Clean (`0` leaks) | **`0`** |
| **Group 4** | `4.1` `preseason-mythic-calendar` | **`1`** | `"Guild Race (Thi Đấu Hội)"` in `sub-4-1` table `rows[5][1].en` | **`0`** |
| **Group 4** | `4.2`–`4.3` (`2` articles) | **`0`** | Clean (`0` leaks) | **`0`** |
| **Group 5** | `5.1`–`5.3` (`3` articles) | **`0`** | Clean (`0` leaks) | **`0`** |
| **Group 5** | `5.4` `lord-gear-strategy` | **`6`** | `"Sacred Codex (Thánh Điển)"` in `keyTakeaways[1].en`; `"Đá Xanh / Thép"`, `"Dây Gai"`, `"Bản Vẽ"`, `"Máu Rồng"` in `sec-2` paragraph & `sec-4` table headers | **`0`** |
| **Group 6** | `6.1` `runes-guide` | **`6`** | `"Hero HP Rune (Cổ Ngữ Sinh Lực Tướng)"` etc. in `sub-1-1` table `rows[0..5][1].en` | **`0`** |
| **Group 6** | `6.2`–`6.3` (`2` articles) | **`0`** | Clean (`0` leaks) | **`0`** |
| **Group 7** | `7.1` `shops-tier-list` | **`26`** | `25` cells in `sub-1-2` 13-Shop table (`row[1].en` shop names & `row[2].en` currency names with Vietnamese parentheticals) + `1` cell in `sub-4-1` `rows[3][1].en` (`"Soul Stone (Hồn Đá Đỏ)"`) | **`0`** |
| **Group 7** | `7.2`–`7.3` (`2` articles) | **`0`** | Clean (`0` leaks) | **`0`** |
| **Group 7** | `7.4` `troop-skins-and-medals` | **`11`** | `11` cells in `sub-1-2` Troop Skin Groups table `rows[0..10][1].en` (`"Heavy Cavalry (Kỵ Binh Hạng Nặng)"` etc.) | **`0`** |
| **Group 8** | `8.1`–`8.4` (`4` articles) | **`0`** | Clean (`0` leaks) | **`0`** |
| **TOTAL** | **31 Articles (`1.1` ➔ `8.4`)** | **`253`** | **Across `14` articles (`17` articles already at `0`)** | **`0` (`100% Pure`)** |

### 1.2. Quantitative Audit Summary of Interactive Widgets & i18n Dictionaries (`locale="en"`)

| File / Component | `en` Leak Count | Exact Leak Details & Root Cause | Target Post-Wave 5 |
| :--- | :---: | :--- | :---: |
| `messages/en.json` | **`0`** | 100% pure English across all 467 lines (`Guides.*` keys included). | **`0`** |
| `src/content/guides/registry.ts` & `group-1..8-*.ts` | **`0`** | All `GUIDE_ZONES` and `GUIDE_CATEGORIES` `en` titles/descriptions are 100% pure English. | **`0`** |
| `src/components/guides/widgets/hero-encyclopedia-widget.tsx` | **`2` root causes (`51` DOM leaks)** | 1. Line 139: `LABELS.en.searchPlaceholder` contains `"gear set (Huyết Titan)"`.<br>2. Lines 748–752: `({hero.nameVi})` is rendered unconditionally even when `locale === "en"`, leaking 50 Vietnamese hero names into `/en/guides/heroes/encyclopedia`. | **`0`** |
| `src/components/guides/widgets/horde-pivot-stepper-widget.tsx` | **`18` static notes** | Lines 66–164: `STAGE_META[1..4].queue1Heroes` and `queue2Heroes` store monolingual Vietnamese `note: string` (e.g., `"Chờ tiếp quản Đội 1"`, `"1★ Đỏ (160 Mảnh)"`, `"Lùi xuống Đội 2"`, `"1★ Trắng (560 Mảnh)"`, `"Đội 2 Nguyên vẹn (2.8M)"`, `"Awakened (9 Hồn Đá Đỏ)"`) rendered at lines 412 & 439 in both `vi` and `en`. | **`0`** |
| Other 6 Widgets (`biweekly-calendar`, `master-data-explorer`, `account-traps-triage`, `tactical-formation-board`, `blacksmith-anvil-matrix`, `shop-safety-floor`) | **`0`** | All Vietnamese text is properly isolated inside `vi:` keys or `locale === "vi"` branches. | **`0`** |

---

## 2. 5-Dimension Technical Impact Analysis & Gap Matrix (`GAP-W5-01` to `GAP-W5-12`)

Before modifying any content or widget file, we cross-checked every test suite (`tests/group-1..8-content.test.ts`, `tests/wave3-content-scannability.test.ts`, `tests/wave4-content-scannability.test.ts`, `tests/guides-phase3-widgets.test.tsx`, `tests/guides-phase4-micro-ux.test.tsx`) to guarantee **zero regressions**:

| Gap ID | Impact Dimension | Risk / Blindspot Discovered | Mandatory Safeguard in Wave 5 Execution |
| :--- | :--- | :--- | :--- |
| **`GAP-W5-01`** | **Widget Data Contract (`HeroEncyclopediaWidget` + `2.1-encyclopedia.ts`)** | In `2.1-encyclopedia.ts`, `sub-2-1-league-heroes` (16 rows), `sub-2-2-horde-heroes` (19 rows), and `sub-2-3-nature-heroes` (16 rows) have `row[1]` as `{ vi: "Công Chúa Rose", en: "Công Chúa Rose" }`. Meanwhile, `extractHeroesFromArticle21` (`hero-encyclopedia-widget.tsx:316-317`) reads `const nameEn = row[0].en.trim()` and `const nameVi = row[1].vi.trim()`. | 1. Keep `row[1].vi` 100% unchanged (`"Công Chúa Rose"`, `"Tôn Ngộ Không"`, etc.) so `extractHeroesFromArticle21` still populates `hero.nameVi` for Vietnamese search (`"Ngộ Không"` test at `guides-phase3-widgets.test.tsx:150`) and Vietnamese card display.<br>2. Change `headers[1].en` in `sub-2-1..2-3` to `"Hero Title / Alias (EN)"` and replace `row[1].en` across all 50 leaked rows with pure English titles/canonical names (e.g., `"Rose Princess"`, `"Monkey King (Wukong)"`, `"Tidecaller"`).<br>3. Never add `**` or `` ` `` to `row[0].en` or `row[1].vi`.<br>4. In `hero-encyclopedia-widget.tsx:748`, gate `({hero.nameVi})` with `locale === "vi" &&` so `locale="en"` renders pure English cards. |
| **`GAP-W5-02`** | **Widget Data Contract (`ShopSafetyFloorWidget` + `7.1-shops-tier-list.ts`)** | `ShopSafetyFloorWidget` (`shop-safety-floor-widget.tsx`) parses `sub-1-2-thirteen-shops-master-map` (13 rows) and `sub-4-1-diamond-equivalent-roi-matrix` (16 rows) in `7.1-shops-tier-list.ts`, and `wave4-content-scannability.test.ts` enforces that `sub-1-2` `row[0..4]` and `sub-4-1` `row[0], row[2]` contain **NO** `**` or `` ` `` characters! | When removing Vietnamese parentheticals from `sub-1-2` `row[1].en` (`"Arena Shop (Cửa hàng Đấu Trường)"` ➔ `"Arena Shop"`), `row[2].en` (`"Arena Stars (Sao Đấu Trường)"` ➔ `"Arena Stars"`), and `sub-4-1` `rows[3][1].en` (`"Soul Stone (Hồn Đá Đỏ)"` ➔ `"Soul Stone"`), keep the strings **100% plain text** (zero `**` or `` ` ``) and preserve all required English tokens (`"Arena Shop"`, `"Guild Points"`, `"Medal Shop"`, `"VIP Shop"`, `"Exchange Shop"`, `"Wheel"`, `"Dice of Fate"`, `"Kingdom Emblem"`). |
| **`GAP-W5-03`** | **Widget Data Contract (`HordePivotStepperWidget`)** | `guides-phase4-micro-ux.test.tsx:250-286` renders `<HordePivotStepperWidget article={ARTICLE_4_2_HORDE_PIVOT_ROADMAP} locale="vi" forceUnlockPro={true} />` and asserts `/Witch\|2\.8M\|Đội 2/i` on Stage 3 and `/9 Hồn Đá Đỏ\|9 Soul Stones\|Wukong\|Soulmancer\|Warlock/i` on Stage 4. | Convert `STAGE_META[1..4].queue1Heroes[].note` and `queue2Heroes[].note` from `string` to `{ vi: string; en: string }`, keeping `note.vi` 100% compatible with existing Vietnamese tokens while providing pure English in `note.en` (e.g., `{ vi: "1★ Đỏ (160 Mảnh)", en: "1★ Red (160 Shards)" }`, `{ vi: "Awakened (9 Hồn Đá Đỏ)", en: "Awakened (9 Soul Stones)" }`). Render `{hero.note[locale]}` at lines 412 and 439. |
| **`GAP-W5-04`** | **Group 1–3 Test Suite Compatibility (`JSON.stringify` Assertions)** | `tests/group-1-content.test.ts`, `tests/group-2-content.test.ts`, and `tests/group-3-content.test.ts` assert Vietnamese strings like `"9 Hồn Đá Đỏ"`, `"Thi Đấu Hội"`, `"Tập Kích Cự Ma"`, `"Khiêu Chiến Của Đội Quân Hắc Ám"` on `JSON.stringify(category)`. | Because `JSON.stringify(category)` serializes both `vi` and `en`, and all `vi:` strings remain 100% intact, removing those Vietnamese substrings from `en:` is 100% safe and will not break `group-1..3-content.test.ts`. |
| **`GAP-W5-05`** | **Group 4–7 Independent Locale Test Compatibility (`extractLocaleText(article, "en")`)** | `tests/group-4..7-content.test.ts` run `extractLocaleText(article, "en")` and assert specific English tokens on `4.1`, `5.4`, `6.1`, `7.1`, `7.4`. | Verify that every required `en` token remains intact when stripping Vietnamese parentheticals:<br>• `4.1`: `"Guild Race"` (`rows[5][1].en`)<br>• `5.4`: `"Sacred Codex"`, `"Refined Metal"`, `"Magic Thread"`, `"Blueprints / Orichalcum"`, `"Dragon Blood"`<br>• `6.1`: `"Hero HP Rune"`, `"Hero Attack Rune"`, `"Soldier HP Rune"`, `"Soldier Attack Rune"`, `"Relic Mastery Rune"`, `"Queue Attack Rune"`<br>• `7.1`: `"Arena Shop"`, `"Guild Points"`, `"Medal Shop"`, `"VIP Shop"`, `"Exchange Shop"`, `"Wheel"`, `"Dice of Fate"`, `"Kingdom Emblem"`, `"Soul Stone"`<br>• `7.4`: `"Heavy Cavalry"`, `"Divine Spirit"`, `"Desert Knight"`, `"Tree Spirit"`, `"Brave Fighter"`, `"Skeleton Soldier"`, `"Honor Guard"`, `"Siege Vehicle"`, `"Samurai"`, `"Bearskin Warrior"`, `"Logistic Follower"`, `"Shield Soldier"` |
| **`GAP-W5-06`** | **Wave 3 & Wave 4 Scannability Gate Compatibility (`AC-W3-01..05` & `AC-W4-01..05`)** | `tests/wave3-content-scannability.test.ts` and `tests/wave4-content-scannability.test.ts` strictly enforce on EVERY `en:` string:<br>1. `<= 220` chars per line (split by `\n`).<br>2. `\n•`, `**bold**`, and `` `code` `` in `tldr`.<br>3. Starts with `**` and contains `` `code` `` in `keyTakeaways`.<br>4. Single-line (`!\n`) + `**bold**` in `list.items`.<br>5. Zero forbidden emojis (`/(?!\u2605)[\p{Emoji_Presentation}\p{Extended_Pictographic}]\|[\u200D\uFE0F\u2640\u2642]/u`). | Every single `en:` replacement in Tasks 3, 4, and 5 is pre-verified to be **shorter** than or equal to the original line (`<= 220` chars), preserves all existing `\n•`, `**bold**`, and `` `code` `` formatting tokens, and introduces zero emojis. |
| **`GAP-W5-07`** | **Protected Benchmark Substrings in `2.2` and `2.5` (`wave3-content-scannability.test.ts`)** | `wave3-content-scannability.test.ts` checks `JSON.stringify(category)` for Group 2 benchmarks (`"9 Hồn Đá Đỏ"`, `"560"`, `"280"`, `"345"`, `"385"`, `"360,000"`, `"54,000"`, `"Brawler"`, `"Knight"`, `"Ranger"`, `"Minister"`, `"Priestess"`, `"Dancer"`, `"Rogue"`, `"Outlaw"`, `"Bard"`, `"Stonemason"`). | In `2.2-meta-lineups.ts` and `2.5-epic-hero-traits.ts`, keep all numeric benchmarks (`560`, `280`, `345–385`, `360,000`, `54,000`, `9 Soul Stones`) and English hero names (`Brawler`, `Knight`, etc.) in `en:`, while `vi:` retains `"9 Hồn Đá Đỏ"`, `"Đấu Sĩ"`, etc. |
| **`GAP-W5-08`** | **Extensible Multi-Language Schema (`NFR-V4-03`)** | `glossary.ts` must allow future locales (`ja`, `ko`, `zh`, `th`) to be added via dictionary map extension without altering component or helper function signatures. | Define `GlossaryExtendedLocale = GuideLocale \| "ja" \| "ko" \| "zh" \| "th"` and `GlossaryLocalizedText`, with `translateGlossaryTerm(termId, locale)` falling back gracefully to `en` if an optional future locale is not yet populated. |
| **`GAP-W5-09`** | **`<RichGuideText />` Non-Nested Token Invariant (`5.4-lord-gear-strategy.ts`)** | `<RichGuideText />` uses `INLINE_TOKEN_REGEX = /(\*\*[^*\n]+\*\*\|`[^`\n]+`\|➔)/g`, which matches `**...**` as a flat non-recursive token. Any backticks nested inside `**...**` (such as `"**\`Sacred Codex\` Unlock:**"`) would render literal backticks instead of a `<code />` pill! | Never nest `` `code` `` backticks inside `**bold**` markers. In `5.4-lord-gear-strategy.ts`, replace `"**Sacred Codex (\`Thánh Điển\`) Unlock:**"` with `"**Sacred Codex Unlock:**"` and `"**Refined Metal (\`Đá Xanh / Thép\`)**"` with `"**Refined Metal**"` (eliminating the pre-existing nested backtick defect as well). |
| **`GAP-W5-10`** | **Full-Article `<GuideArticleRenderer locale="en" />` Chrome Purity** | Testing only standalone widgets in `Suite 3` of `tests/guides-bilingual-purity.test.ts` could overlook `<GuideArticleRenderer />` chrome (`ProContentGate`, tabs, badges, consolidated subsection stubs) when rendered in `locale="en"`. | Add full-article `<GuideArticleRenderer locale="en" />` assertions in `Suite 3` of `tests/guides-bilingual-purity.test.ts` on representative widget-bearing articles (`2.1`, `4.2`, `5.2`, `7.1`, `8.4`), verifying zero Vietnamese diacritics in the full rendered article DOM. |
| **`GAP-W5-11`** | **Vietnamese (`vi`) Prose Completeness & Readability Gate** | Master Plan Wave 5 specifies: *"Rà soát toàn bộ bản tiếng Việt (`vi`) để đảm bảo hành văn tự nhiên, chỉ giữ thuật ngữ tiếng Anh ở lần nhắc đầu tiên hoặc trong Badge/Tooltip."* | Add a `vi` completeness assertion in `Suite 2` of `tests/guides-bilingual-purity.test.ts` ensuring every `LocalizedText.vi` across all 31 articles is non-empty, contains valid Vietnamese diacritics on prose blocks (`summary`, `tldr`, `keyTakeaways`, `paragraph`, `callout`), and was not accidentally overwritten with English during `en` cleanup. |
| **`GAP-W5-12`** | **Parallel Subagent File-Scope Isolation (`Tasks 3, 4, 5`)** | Tasks 3, 4, and 5 modify 14 guide files across disjoint directories (`group-1/`, `group-2/`, `group-3..7/`). Concurrent edits to overlapping files would cause race conditions. | Enforce strict file-scope boundaries per task: Task 3 touches ONLY `group-1/*.ts` (4 files), Task 4 touches ONLY `group-2/*.ts` (4 files), and Task 5 touches ONLY `group-3..7/*.ts` (6 files), allowing safe parallel subagent execution after Tasks 1 and 2 finish. |

---

## 3. Architecture of `src/content/guides/glossary.ts` & `docs/02-specs/top-heroes-multilang-glossary.md` (`DEC-V4-03`)

### 3.1. Type System & Lookup API (`src/content/guides/glossary.ts`)

```ts
import type { GuideLocale } from "./types";

export type GlossaryExtendedLocale = GuideLocale | "ja" | "ko" | "zh" | "th";

export type GlossaryCategory =
  | "factions"
  | "rarities_and_tiers"
  | "roles_and_positions"
  | "heroes"
  | "events"
  | "items_and_currencies"
  | "buildings_and_systems"
  | "meta_slang";

export interface GlossaryLocalizedText {
  vi: string;
  en: string;
  ja?: string;
  ko?: string;
  zh?: string;
  th?: string;
}

export interface GlossaryTerm {
  /** Unique, stable kebab-case identifier (e.g., "faction-horde", "hero-wukong", "item-soul-stone") */
  id: string;
  /** Standardized 8-group classification per DEC-V4-03 */
  category: GlossaryCategory;
  /** Canonical localized display names (no mixed-language parentheticals inside `en`) */
  term: GlossaryLocalizedText;
  /** Optional community aliases / abbreviations for search & disambiguation */
  aliases?: {
    vi?: string[];
    en?: string[];
  };
  /** Concise tactical definition in both languages */
  definition: GlossaryLocalizedText;
  /** Optional hero/faction metadata when category === "heroes" */
  heroMeta?: {
    faction: "league" | "horde" | "nature";
    rarity: "mythic" | "legendary" | "epic" | "rare";
    isAwakenable?: boolean;
    isEconomyPassive?: boolean;
  };
}
```

### 3.2. Required Exports & Helper Functions in `src/content/guides/glossary.ts`
1. `GLOSSARY_CATEGORIES: readonly GlossaryCategory[]` — All 8 canonical category identifiers.
2. `GUIDE_GLOSSARY: readonly GlossaryTerm[]` — Complete array of `110+` standardized terms across all 8 categories (including all `51` SSoT heroes from Article `2.1`).
3. `GUIDE_GLOSSARY_BY_ID: ReadonlyMap<string, GlossaryTerm>` — $O(1)$ lookup map by `term.id`.
4. `getGlossaryTerm(termId: string): GlossaryTerm | undefined` — Retrieves a term by ID.
5. `getGlossaryTermsByCategory(category: GlossaryCategory): GlossaryTerm[]` — Filters terms by category.
6. `translateGlossaryTerm(termId: string, locale: GlossaryExtendedLocale): string` — Returns `term.term[locale] ?? term.term.en` for seamless multi-language expansion (`NFR-V4-03`).
7. `searchGlossaryTerms(query: string, locale?: GuideLocale): GlossaryTerm[]` — Searches across `id`, `term.vi`, `term.en`, `aliases`, and `definition` using `normalizeSearchText`.

---

## 4. Bite-Sized TDD Implementation Tasks

### Task 1: Create `src/content/guides/glossary.ts`, `docs/02-specs/top-heroes-multilang-glossary.md` & `tests/guides-bilingual-purity.test.ts`
- **Files in Scope**:
  - Create: `tophub-web/src/content/guides/glossary.ts`
  - Create: `tophub-web/docs/02-specs/top-heroes-multilang-glossary.md`
  - Create: `tophub-web/tests/guides-bilingual-purity.test.ts`
- **Action**:
  1. Implement `src/content/guides/glossary.ts` with all 8 `GlossaryCategory` groups (`factions`, `rarities_and_tiers`, `roles_and_positions`, `heroes` [all 51 SSoT heroes], `events`, `items_and_currencies`, `buildings_and_systems`, `meta_slang`), ensuring `0` Vietnamese characters exist inside any `.en` field of `GUIDE_GLOSSARY`.
  2. Author `docs/02-specs/top-heroes-multilang-glossary.md` documenting the 8 terminology tables, translation rules (`vi` first-mention convention vs `en` 100% pure English convention), and instructions for adding `ja`/`ko`/`zh`/`th` locales.
  3. Create `tests/guides-bilingual-purity.test.ts` with 4 automated test suites:
     - **Suite 1 (`Glossary SSoT & NFR-V4-03 Scalability`)**: Verifies all 8 categories are populated, all 51 SSoT heroes exist in `heroes`, `getGlossaryTerm` / `translateGlossaryTerm` / `searchGlossaryTerms` work accurately, and `GUIDE_GLOSSARY` has `0` Vietnamese diacritics in `.en`.
     - **Suite 2 (`31 Articles, 8 Categories & 3 Zones — Zero Vietnamese Leak in EN + VI Prose Integrity`)**: Walks every `LocalizedText` object in `GUIDE_ZONES`, `GUIDE_CATEGORIES`, and all `31` `GuideArticle` records, asserting that `VI_DIACRITIC_REGEX.test(node.en) === false` (`0` leaks across all 31 articles) and that `vi` prose fields (`summary.vi`, `tldr.*.vi`, `keyTakeaways[].vi`) retain valid Vietnamese diacritics (`GAP-W5-11`).
     - **Suite 3 (`Interactive Widgets & GuideArticleRenderer — Zero Vietnamese Leak in EN DOM`)**: Renders `HeroEncyclopediaWidget`, `BiweeklyCalendarWidget`, `MasterDataExplorerWidget`, `AccountTrapsTriageWidget`, `TacticalFormationBoardWidget`, `HordePivotStepperWidget` (stepping through Stages 1, 2, 3, 4), `BlacksmithAnvilMatrixWidget`, `ShopSafetyFloorWidget`, and full `<GuideArticleRenderer />` (`GAP-W5-10`) with `locale="en"` and `forceUnlockPro={true}`, asserting `VI_DIACRITIC_REGEX.test(container.textContent) === false`.
     - **Suite 4 (`messages/en.json Purity`)**: Asserts `VI_DIACRITIC_REGEX.test(JSON.stringify(enMessages)) === false`.
- **Verification**:
  - Run `pnpm test tests/guides-bilingual-purity.test.ts`: Suite 1 & Suite 4 PASS immediately; Suites 2 & 3 enter Red phase identifying the exact `253` article leaks and `2` widget leaks to be fixed in Tasks 2–5.

---

### Task 2: Remediate Interactive Widget Bilingual Leaks (`HeroEncyclopediaWidget` & `HordePivotStepperWidget`)
- **Files in Scope**:
  - Modify: `tophub-web/src/components/guides/widgets/hero-encyclopedia-widget.tsx`
  - Modify: `tophub-web/src/components/guides/widgets/horde-pivot-stepper-widget.tsx`
- **Action**:
  1. **`src/components/guides/widgets/hero-encyclopedia-widget.tsx`**:
     - Line 139: Update `LABELS.en.searchPlaceholder` from:
       `"Search hero name (Wukong, Tidecaller, Paragon...), gear set (Huyết Titan), or keyword..."`
       to:
       `"Search hero name (Wukong, Tidecaller, Paragon...), gear set (Blood of the Titan), or keyword..."`
     - Line 748: Update `{hero.nameVi && hero.nameVi !== hero.nameEn && (` to:
       `{locale === "vi" && hero.nameVi && hero.nameVi !== hero.nameEn && (`
       so that `({hero.nameVi})` is displayed in Vietnamese mode (`locale="vi"`) and omitted in English mode (`locale="en"`).
  2. **`src/components/guides/widgets/horde-pivot-stepper-widget.tsx`**:
     - Update `ParsedPivotStage` and `STAGE_META` hero note type from `note: string` to `note: { vi: string; en: string }`:
       - Stage 1:
         - `Secret Keeper`: `{ vi: "Tank (0 Mảnh)", en: "Tank (0 Shards)" }`
         - `Adjudicator`: `{ vi: "Tank", en: "Tank" }`
         - `Pyromancer`: `{ vi: "Main Carry", en: "Main Carry" }`
         - `Astrologer`: `{ vi: "Burst (0 Sách)", en: "Burst (0 Books)" }`
         - `Bard`: `{ vi: "Buffer", en: "Buffer" }`
         - `Nun`: `{ vi: "Healer", en: "Healer" }`
         - `6 SSR Horde (Parked Lv.135–150)`: `{ vi: "Chờ tiếp quản Đội 1", en: "Waiting to take over Queue 1" }`
       - Stage 2:
         - `Desert Prince`: `{ vi: "1★ Đỏ (160 Mảnh)", en: "1★ Red (160 Shards)" }`
         - `Adjudicator`: `{ vi: "Sub-Tank", en: "Sub-Tank" }`
         - `Storm Maiden`: `{ vi: "1★ Đỏ (160 Mảnh)", en: "1★ Red (160 Shards)" }`
         - `Pyromancer`: `{ vi: "Sub-Carry", en: "Sub-Carry" }`
         - `Bard`: `{ vi: "Buffer", en: "Buffer" }`
         - `Nun`: `{ vi: "Healer", en: "Healer" }`
         - `Secret Keeper` & `Astrologer`: `{ vi: "Lùi xuống Đội 2", en: "Moved to Queue 2" }`
       - Stage 3:
         - `Desert Prince` & `Storm Maiden`: `{ vi: "1★ Trắng (560 Mảnh)", en: "1★ White (560 Shards)" }`
         - `Swordmaster / Barbarian`: `{ vi: "Sub-Tank", en: "Sub-Tank" }`
         - `Wilderness Hunter`: `{ vi: "Buff Tốc Đánh", en: "ATK Speed Buffer" }`
         - `Witch`: `{ vi: "Ngày 41 • 1★ Đỏ (160 Mảnh)", en: "Day 41 • 1★ Red (160 Shards)" }`
         - `Soulmancer / Warlock`: `{ vi: "Chia sẻ Sát thương", en: "Damage Link Support" }`
         - `Adjudicator`: `{ vi: "Đội 2 Nguyên vẹn (2.8M)", en: "Intact Queue 2 (2.8M)" }`
         - `Secret Keeper`, `Pyromancer`, `Astrologer`, `Bard`, `Nun`: `{ vi: "Đội 2 Nguyên vẹn", en: "Intact Queue 2" }`
       - Stage 4:
         - `Beastmaster`: `{ vi: "S2 Mythic Tank", en: "S2 Mythic Tank" }`
         - `Desert Prince` & `Storm Maiden`: `{ vi: "UW +10 ➔ +20", en: "UW +10 ➔ +20" }`
         - `Wukong`: `{ vi: "S2 Mythic God Carry", en: "S2 Mythic God Carry" }`
         - `Witch`: `{ vi: "Mythic Healer/CC", en: "Mythic Healer/CC" }`
         - `Soulmancer / Warlock`: `{ vi: "Awakened (9 Hồn Đá Đỏ)", en: "Awakened (9 Soul Stones)" }`
         - `Pure League Queue 2 (6 Heroes)`: `{ vi: "3v3 Apex Arena & Giữ Mỏ", en: "3v3 Apex Arena & Mine Defense" }`
         - `Pure Nature Queue 3 (Natural Drops)`: `{ vi: "Đội 3 Tự nhiên", en: "Natural Queue 3" }`
     - At lines 412 and 439, render `{hero.note[locale]}`.
- **Verification**:
  - Run `pnpm test tests/guides-bilingual-purity.test.ts -t "Suite 3"` ➔ 100% PASS.
  - Run `pnpm test tests/guides-phase3-widgets.test.tsx tests/guides-phase4-micro-ux.test.tsx` ➔ 100% PASS.

---

### Task 3: Clean All `40` `en:` Vietnamese Leaks in Group 1 (`1.1`, `1.2`, `1.3`, `1.4`)
- **Files in Scope**:
  - Modify: `tophub-web/src/content/guides/groups/group-1/1.1-overview.ts` (`11` leaks ➔ `0`)
  - Modify: `tophub-web/src/content/guides/groups/group-1/1.2-strict-one-queue-rule.ts` (`10` leaks ➔ `0`)
  - Modify: `tophub-web/src/content/guides/groups/group-1/1.3-diamond-and-spending-guide.ts` (`14` leaks ➔ `0`)
  - Modify: `tophub-web/src/content/guides/groups/group-1/1.4-top-10-account-traps.ts` (`5` leaks ➔ `0`)
- **Exact Replacements by File**:
  1. **`1.1-overview.ts` (`11` leaks)**:
     - `freeSections[0].subSections[0].blocks[0].rows[4][2].en`: `"9 Hồn Đá Đỏ / Soul Stones + 345–385 Hero Shards"` ➔ `"9 Red Soul Stones + 345–385 Hero Shards"`
     - `freeSections[0].subSections[0].blocks[0].rows[5][2].en`: Remove `"Thi Đấu Hội "`, `"/ Tập Kích Cự Ma "`, `"/ Khiêu Chiến Của Đội Quân Hắc Ám"` parentheticals, keeping `"continuous weekly Guild Race (running Monday 09:00 ➔ Monday 09:00 in early Pre-Season while climbing Guild Rank D ➔ S alongside Giant Raid & Dark Legion Challenge)"`.
     - `freeSections[1].subSections[0].blocks[0].rows[1][2].en`: `"9 Hồn Đá Đỏ / Soul Stones"` ➔ `"9 Red Soul Stones"`
     - `freeSections[1].subSections[2].blocks[1].rows[0][2].en`: Remove `"Thi Đấu Hội "`, `"/ Tập Kích Cự Ma "`, `"/ Khiêu Chiến Của Đội Quân Hắc Ám"`.
     - `freeSections[1].subSections[2].blocks[2].content.en`: `` `9 Hồn Đá Đỏ` (`Soul Stones`) `` ➔ `` `9 Red Soul Stones` ``
     - `freeSections[2].blocks[0].rows[0][1].en`: `"2 Sao Trắng / White Stars (12 Sao = 300 Mảnh / Shards)"` ➔ `"2 White Stars (12 Stars = 300 Shards)"`
     - `proSections[0].subSections[0].blocks[1].rows[1][2].en`: `"Thi Đấu Hội / Guild Race mode"` ➔ `"Guild Race mode"`
     - `proSections[0].subSections[0].blocks[1].rows[1][3].en`: `"9 Hồn Đá Đỏ / Soul Stones"` ➔ `"9 Red Soul Stones"`
     - `proSections[0].subSections[0].blocks[1].rows[2][4].en`: `"1,181.16 Million Meat (1,181.16 Triệu Thịt)"` ➔ `"1,181.16 Million Meat"`
     - `proSections[0].subSections[0].blocks[1].rows[3][4].en`: `"Complete Brawler 2 White Stars (Brawler 2 Sao Trắng = 300 Mảnh = +30% Tech Research Rate)"` ➔ `"Complete Brawler 2 White Stars (12 Stars = 300 Shards = +30% Tech Research Rate)"`
     - `proSections[1].blocks[0].profileSummary.en`: `` `Guild Race` (`Thi Đấu Hội`) `` ➔ `` `Guild Race` ``
  2. **`1.2-strict-one-queue-rule.ts` (`10` leaks)**:
     - `freeSections[0].subSections[0].blocks[0].items[1].en`: `` `1 Sao Trắng` `` ➔ `` `1 White Star` ``
     - `freeSections[1].subSections[0].blocks[0].rows[0][1].en`: `"Universal Legendary Hero Shards (Mảnh Tướng Vàng Vạn Năng)"` ➔ `"Universal Legendary Hero Shards"`
     - `freeSections[1].subSections[0].blocks[0].rows[0][2].en`: `"560 / 280 / 1,000 / 500 Mảnh milestones — and Awakening (9 Red Soul Stones / 9 Hồn Đá Đỏ + 345–385 Mảnh)"` ➔ `"560 / 280 / 1,000 / 500 Shard milestones — and Awakening (9 Red Soul Stones + 345–385 Shards)"`
     - `freeSections[1].subSections[0].blocks[0].rows[1][1].en`: `"Orange / Purple Skill Books (Sách Kỹ Năng)"` ➔ `"Orange / Purple Skill Books"`
     - `freeSections[1].subSections[0].blocks[0].rows[1][2].en`: `"24,700 Sách/kỹ năng = 98,800–123,500 Sách/tướng"` ➔ `"24,700 Books/skill = 98,800–123,500 Books/hero"`
     - `freeSections[1].subSections[0].blocks[1].annotations[0].detail.en`: `"560 / 280 / 1,000 / 500 Mảnh"` ➔ `"560 / 280 / 1,000 / 500 Shards"`
     - `freeSections[1].subSections[0].blocks[2].content.en`: Remove ` (` + `` `1.18 Tỷ Thịt` `` + `)`.
     - `proSections[0].subSections[0].blocks[0].rows[3][1].en`: `"9 Red Soul Stones (9 Hồn Đá Đỏ + 345–385 Mảnh)"` ➔ `"9 Red Soul Stones + 345–385 Hero Shards"`
     - `proSections[0].subSections[0].blocks[0].rows[4][1].en`: `"24,700 Books/skill (24,700 Sách/kỹ năng: Lv.1 ➔ Lv.10 = 8,000; Lv.11 ➔ Lv.15 = +16,700)"` ➔ `"24,700 Books/skill (Lv.1 ➔ Lv.10 = 8,000; Lv.11 ➔ Lv.15 = +16,700)"`
     - `proSections[0].subSections[0].blocks[0].rows[4][2].en`: `"~600,000+ Skill Books (~600,000+ Sách: 592,800–741,000 Books for 6 heroes)"` ➔ `"~600,000+ Skill Books (592,800–741,000 Books for 6 heroes)"`
  3. **`1.3-diamond-and-spending-guide.ts` (`14` leaks)**:
     - Replace all `" (Thi Đấu Hội)"` / `" (`Thi Đấu Hội`)"`, `" (Tập Kích Cự Ma)"`, `" (`Tập Kích Cự Ma`, `Khiêu Chiến Của Đội Quân Hắc Ám`)"`, `" (`Đế Quốc Hắc Ám Xâm Nhập` ⇄ `Khiêu Chiến Của Đội Quân Hắc Ám`, `Tập Kích Cự Ma`)"`, `" (01 giờ 59 phút)"`, and `` `9 Hồn Đá Đỏ` (`9 Soul Stones`) `` with their pure English Glossary equivalents (`Guild Race`, `Giant Raid`, `Dark Legion Challenge`, `Dark Empire Invasion`, `01h59m`, `` `9 Red Soul Stones` ``).
  4. **`1.4-top-10-account-traps.ts` (`5` leaks)**:
     - `freeSections[1].subSections[3].blocks[0].items[2].en`: `` `Thi Đấu Hội` with `Khiêu Chiến Của Đội Quân Hắc Ám` & `Tập Kích Cự Ma` `` ➔ `` `Guild Race` with `Dark Legion Challenge` & `Giant Raid` ``
     - `freeSections[1].subSections[9].blocks[1].content.en`: Remove `" (Thăng cấp Lính Bậc Thang)"`.
     - `proSections[0].blocks[1].rows[0][4].en`: Remove `"over 400 Mảnh Vàng Vạn Năng — "`.
     - `proSections[0].blocks[1].rows[1][2].en`: Remove `" (Thi Đấu Hội)"`.
     - `proSections[1].blocks[1].items[0].detail.en`: `"**Guild Race Week (Thi Đấu Hội — with Dark Legion Challenge & Giant Raid, or Week A):**"` ➔ `"**Guild Race Week (with Dark Legion Challenge & Giant Raid, or Week A):**"`
- **Verification**:
  - Run `pnpm test tests/group-1-content.test.ts tests/wave3-content-scannability.test.ts -t "1\\.1|1\\.2|1\\.3|1\\.4"` ➔ 100% PASS.

---

### Task 4: Clean All `157` `en:` Vietnamese Leaks in Group 2 (`2.1`, `2.2`, `2.4`, `2.5`)
- **Files in Scope**:
  - Modify: `tophub-web/src/content/guides/groups/group-2/2.1-encyclopedia.ts` (`99` leaks ➔ `0`)
  - Modify: `tophub-web/src/content/guides/groups/group-2/2.2-meta-lineups.ts` (`19` leaks ➔ `0`)
  - Modify: `tophub-web/src/content/guides/groups/group-2/2.4-shards-and-skill-books.ts` (`1` leak ➔ `0`)
  - Modify: `tophub-web/src/content/guides/groups/group-2/2.5-epic-hero-traits.ts` (`38` leaks ➔ `0`)
- **Exact Replacements by File**:
  1. **`2.1-encyclopedia.ts` (`99` leaks — Respecting `GAP-W5-01` `HeroEncyclopediaWidget` Contract)**:
     - `freeSections[0].subSections[0].blocks[0].items[1].en`: `` `9 Hồn Đá Đỏ` `` ➔ `` `9 Red Soul Stones` ``
     - `freeSections[0].subSections[0].blocks[1].description.en`: `"1 Sao Trắng / 1 White Star (560 Mảnh / Shards)"` ➔ `"1 White Star (560 Shards)"`
     - `freeSections[0].subSections[2].blocks[2].items[0..2].en`:
       - `"**Huyết Titan / Nộ Huyết (`Blood of the Titan / Fury of Blood`):**"` ➔ `"**Blood of the Titan / Fury of Blood (`Tank & Bruiser Set`):**"`
       - `"**Kỵ Sĩ Vinh Quang (`Knight's Glory`):**"` ➔ `"**Knight's Glory (`Burst & Skill DPS Set`):**"`
       - `"**Hiền Triết Quang Vinh (`Glory of the Sage`):**"` ➔ `"**Glory of the Sage (`Support & Speed Set`):**"`
     - In `sub-2-1-league-heroes` (16 rows), `sub-2-2-horde-heroes` (19 rows), and `sub-2-3-nature-heroes` (16 rows):
       - Keep `row[1].vi` 100% untouched (`"Công Chúa Rose"`, `"Tôn Ngộ Không"`, etc.) so `HeroEncyclopediaWidget` continues extracting `hero.nameVi` from `row[1].vi`.
       - Replace `row[1].en` across all 50 leaked rows with pure English role/title aliases (e.g., `"Rose Princess"`, `"Paragon"`, `"Bishop"`, `"Artificer"`, `"Adjudicator"`, `"Pyromancer"`, `"Nun"`, `"Bard"`, `"Astrologer"`, `"Secret Keeper"`, `"Hostess"`, `"Knight"`, `"Ranger"`, `"Minister"`, `"Guard"`, `"Crossbowman"`, `"Desert Prince"`, `"Storm Maiden"`, `"Witch"`, `"Monkey King (Wukong)"`, `"Beastmaster"`, `"Shadow Priest"`, `"Soulmancer"`, `"Warlock"`, `"Wilderness Hunter"`, `"Swordmaster"`, `"Barbarian"`, `"Wanderer"`, `"Headhunter"`, `"Shaman"`, `"Boarman"`, `"Brawler"`, `"Rogue"`, `"Outlaw"`, `"Mercenary"`, `"Tidecaller"`, `"Monk"`, `"Ne Zha"`, `"Petalis"`, `"Pixie"`, `"Forest Maiden"`, `"Sage"`, `"Windwalker"`, `"Treeguard"`, `"Stonemason"`, `"Druid"`, `"Watcher"`, `"Pathfinder"`, `"Priestess"`, `"Dancer"`, `"Forest Scout"`).
       - In `row[5].en` of `sub-2-1..2-3` (23 cells) and `row[6].en` of `sub-4-1-pro-24-heroes-table` (23 cells): Replace `"Huyết Titan / Nộ Huyết"` / `"Huyết Titan"` with `"Blood of the Titan"`, `"Kỵ Sĩ Vinh Quang"` with `"Knight's Glory"`, and `"Hiền Triết Quang Vinh"` with `"Glory of the Sage"`.
  2. **`2.2-meta-lineups.ts` (`19` leaks — Respecting `GAP-W5-07`)**:
     - Replace all occurrences in `.en` of:
       - `"9 Hồn Đá Đỏ (Soul Stones) + 345–385 Mảnh Tướng"` / `"9 Hồn Đá Đỏ + 345–385 Mảnh"` ➔ `"9 Red Soul Stones + 345–385 Hero Shards"` (or `"9 Soul Stones + 345–385 Shards"`)
       - `"18–27 Hồn Đá Đỏ + 690–1,155 Mảnh"` ➔ `"18–27 Soul Stones + 690–1,155 Shards"`
       - `"18 Hồn Đá Đỏ + 690–770 Mảnh"` ➔ `"18 Soul Stones + 690–770 Shards"`
       - `"360,000 Điểm Vinh Dự"` / `"720,000 – 1,080,000 Điểm Vinh Dự"` / `"720,000 Điểm Vinh Dự"` ➔ `"360,000 Guild Honor"` / `"720,000 – 1,080,000 Guild Honor"` / `"720,000 Guild Honor"`
       - `"54,000 Xu Vinh Quang"` / `"108,000 – 162,000 Xu Vinh Quang"` / `"108,000 Xu Vinh Quang"` ➔ `"54,000 Guild Coins"` / `"108,000 – 162,000 Guild Coins"` / `"108,000 Guild Coins"`
       - `"1 Sao Đỏ (160 Mảnh Mythic / 80 Mảnh Leg)"` ➔ `"1 Red Star (160 Mythic / 80 Leg Shards)"`
       - `"1 Sao Trắng (560 Mảnh Mythic / 280 Mảnh Leg)"` ➔ `"1 White Star (560 Mythic / 280 Leg Shards)"`
       - `"1 Sao Đỏ (6★ = 160 Mảnh)"` / `"1 Sao Đỏ (160 Mảnh)"` / `"5 Sao Đỏ (400 Mảnh)"` / `"1 Sao Trắng (11★ = 560 Mảnh)"` / `"1 Sao Đỏ = 160 Mảnh"` ➔ `"1 Red Star (6★ = 160 Shards)"` / `"1 Red Star (160 Shards)"` / `"5 Red Stars (400 Shards)"` / `"1 White Star (11★ = 560 Shards)"` / `"1 Red Star = 160 Shards"`
       - `"1 Sao Đỏ (160/80)"`, `"5 Sao Đỏ (400/200)"`, `"1 Sao Trắng (560/280)"`, `"5 Sao Trắng (1,000/500 Shards)"` ➔ `"1 Red Star (160/80)"`, `"5 Red Stars (400/200)"`, `"1 White Star (560/280)"`, `"5 White Stars (1,000/500 Shards)"`
  3. **`2.4-shards-and-skill-books.ts` (`1` leak)**:
     - `freeSections[2].blocks[0].rows[0][2].en`: `"Guild Race (Thi Đấu Hội)"` ➔ `"Guild Race"`
  4. **`2.5-epic-hero-traits.ts` (`38` leaks)**:
     - `tldr.immediateAction.en`: `"**Brawler (Đấu Sĩ)** and **Knight (Kỵ Sĩ)**"` ➔ `"**Brawler** and **Knight**"`
     - `freeSections[2].subSections[0].blocks[1].content.en`: `"(of this hero / của anh hùng này)"` ➔ `"(of this hero)"`
     - In `sub-4-1` (8 Epic rows) and `sub-4-2` (10 Legendary rows): Strip the Vietnamese parenthetical `(...)` from `row[1].en` (`"Brawler (Đấu Sĩ)"` ➔ `"Brawler"`, `"Knight (Kỵ Sĩ)"` ➔ `"Knight"`, etc.) and `row[3].en` (`"Tech Research Rate (Tăng Tốc độ Nghiên cứu Công nghệ)"` ➔ `"Tech Research Rate"`, etc.), keeping `vi` untouched.
- **Verification**:
  - Run `pnpm test tests/group-2-content.test.ts tests/wave3-content-scannability.test.ts -t "2\\.1|2\\.2|2\\.3|2\\.4|2\\.5" tests/guides-phase3-widgets.test.tsx tests/guides-phase4-micro-ux.test.tsx` ➔ 100% PASS.

---

### Task 5: Clean All `56` `en:` Vietnamese Leaks in Groups 3–7 (`3.1`, `4.1`, `5.4`, `6.1`, `7.1`, `7.4`) & Finalize Master Plan
- **Files in Scope**:
  - Modify: `tophub-web/src/content/guides/groups/group-3/3.1-biweekly-rotation.ts` (`6` leaks ➔ `0`)
  - Modify: `tophub-web/src/content/guides/groups/group-4/4.1-preseason-mythic-calendar.ts` (`1` leak ➔ `0`)
  - Modify: `tophub-web/src/content/guides/groups/group-5/5.4-lord-gear-strategy.ts` (`6` leaks ➔ `0`)
  - Modify: `tophub-web/src/content/guides/groups/group-6/6.1-runes-guide.ts` (`6` leaks ➔ `0`)
  - Modify: `tophub-web/src/content/guides/groups/group-7/7.1-shops-tier-list.ts` (`26` leaks ➔ `0`)
  - Modify: `tophub-web/src/content/guides/groups/group-7/7.4-troop-skins-and-medals.ts` (`11` leaks ➔ `0`)
  - Modify: `tophub-web/docs/02-specs/2026-10-16-guides-v4-editorial-html-and-ui-overhaul-master-plan.md` *(Update status to `5/5 Waves Completed` after all tests pass)*
- **Exact Replacements by File**:
  1. **`3.1-biweekly-rotation.ts` (`6` leaks)**:
     - Remove `" (Thi Đấu Hội)"` / `"Thi Đấu Hội / "` from all 6 `.en` fields (`tldr.coreRule.en`, `freeSections[0].blocks[1].description.en`, `freeSections[0].blocks[1].annotations[0].label.en`, `freeSections[0].subSections[0].blocks[0].text.en`, `freeSections[0].subSections[2].blocks[0].headers[1].en`, `freeSections[0].subSections[2].blocks[0].rows[0][1].en`).
  2. **`4.1-preseason-mythic-calendar.ts` (`1` leak)**:
     - `proSections[0].subSections[0].blocks[0].rows[5][1].en`: `"Guild Race (Thi Đấu Hội)"` ➔ `"Guild Race"`
  3. **`5.4-lord-gear-strategy.ts` (`6` leaks — Respecting `GAP-W5-05` & `GAP-W5-09`)**:
     - `keyTakeaways[1].en`: `"**Sacred Codex (`Thánh Điển`) Unlock:**"` ➔ `"**Sacred Codex Unlock:**"` *(No nested backticks inside `**...**` per `GAP-W5-09`; the item already has 5 `` `code` `` pills!)*
     - `freeSections[1].blocks[0].text.en`: `"**Refined Metal (`Đá Xanh / Thép`)**, **Magic Thread (`Dây Gai`)**, **Blueprints / Orichalcum (`Bản Vẽ`)**, and **Dragon Blood (`Máu Rồng`)**."` ➔ `"**Refined Metal**, **Magic Thread**, **Blueprints / Orichalcum**, and **Dragon Blood**."`
     - `proSections[0].blocks[1].headers[2..5].en`:
       - `"Refined Metal (Đá Xanh / Thép)"` ➔ `"Refined Metal"`
       - `"Magic Thread (Dây Gai / Chỉ Phép)"` ➔ `"Magic Thread"`
       - `"Blueprints / Orichalcum (Bản Vẽ)"` ➔ `"Blueprints / Orichalcum"`
       - `"Mythic Material / Dragon Blood (Máu Rồng)"` ➔ `"Mythic Material / Dragon Blood"`
  4. **`6.1-runes-guide.ts` (`6` leaks — Respecting `GAP-W5-05`)**:
     - `freeSections[0].subSections[0].blocks[1].rows[0..5][1].en`: Strip the Vietnamese parentheticals so they read `"Hero HP Rune"`, `"Hero Attack Rune"`, `"Soldier HP Rune"`, `"Soldier Attack Rune"`, `"Relic Mastery Rune"`, `"Queue Attack Rune"`.
  5. **`7.1-shops-tier-list.ts` (`26` leaks — Respecting `GAP-W5-02` & `GAP-W5-05` `ShopSafetyFloorWidget` Plain-Text Contract)**:
     - In `sub-1-2-thirteen-shops-master-map` (13 rows): Strip the Vietnamese parentheticals from `row[1].en` and `row[2].en` (keeping plain text, zero `**` or `` ` ``):
       - Row 0: `"Arena Shop"` | `"Arena Stars"`
       - Row 1: `"Guild Points Shop"` | `"Guild Points"`
       - Row 2: `"Combat Valor / Battlefield Shop"` | `"Valor Coins"`
       - Row 3: `"4 Nations / Citadel Clash Shop"` | `"Clash Coins / Tickets"`
       - Row 4: `"Guild Honor / Guild Coin Shop"` | `"Guild Honor / Guild Coins"`
       - Row 5: `"VIP Shop"` | `"Diamonds"`
       - Row 6: `"Exchange Shop"` | (already pure EN)
       - Row 7: `"Wheel Token Shop (Wheel)"` | `"Wheel Coins"`
       - Row 8: `"Dice of Fate Shop"` | `"Dice Vouchers / Coins"`
       - Row 9: `"Medal Shop"` | `"Glory Medals"`
       - Row 10: `"Kingdom Emblem Shop"` | `"Kingdom Emblems"`
       - Row 11: `"Black Dragon / Yeti Invasion Shop"` | `"Invasion Coins"`
       - Row 12: `"Decor Token Shop"` | `"Decor Tokens"`
     - In `sub-4-1-diamond-equivalent-roi-matrix`: `rows[3][1].en`: `"Soul Stone (Hồn Đá Đỏ)"` ➔ `"Soul Stone"`.
  6. **`7.4-troop-skins-and-medals.ts` (`11` leaks — Respecting `GAP-W5-05`)**:
     - In `sub-1-2` table `rows[0..10][1].en`: Strip the Vietnamese parentheticals so they read:
       - `"Heavy Cavalry"`
       - `"Divine Spirit"`
       - `"Desert Knight / Peloton"`
       - `"Tree Spirit"`
       - `"Brave Fighter"`
       - `"Skeleton Soldier"`
       - `"Honor Guard & Siege Vehicle / Balloon"`
       - `"Samurai"`
       - `"Bearskin Warrior / Battle Bear"`
       - `"Logistic Follower & Drum Corps & Elegant Butler"`
       - `"Shield Soldier & Cavalry"`
- **Verification**:
  - Run `pnpm test` across the entire repository (`34/34` test files including `tests/guides-bilingual-purity.test.ts`, `tests/wave3-content-scannability.test.ts`, `tests/wave4-content-scannability.test.ts`) ➔ 100% PASS.
  - Run `pnpm build` ➔ 87/87 static pages generated cleanly (`exit code 0`).

---

## 5. 12-Point Senior Tech Lead Audit Matrix (`/review-plan` Verification Gate)

| # | Audit Dimension (`checklist.md`) | Status | Concrete Evidence & Hardening Applied |
| :---: | :--- | :---: | :--- |
| **1** | **Requirement Completeness** | ✅ **PASS** | Covers 100% of `DEC-V4-03`, `Section 3.3`, `AC-V4-4.1`, and `NFR-V4-03`: `glossary.ts` (8 categories, 110+ terms), `top-heroes-multilang-glossary.md`, `253` `en:` article leaks, `2` widget DOM leaks, and `guides-bilingual-purity.test.ts`. |
| **2** | **Architecture & Design Integrity** | ✅ **PASS** | `glossary.ts` is a pure, zero-dependency SSoT dictionary module under `src/content/guides/` with $O(1)$ lookup (`GUIDE_GLOSSARY_BY_ID`) and extensible locale fallback (`translateGlossaryTerm`). |
| **3** | **Cross-System Impact Analysis** | ✅ **PASS** | Mapped all 12 cross-system contracts (`GAP-W5-01` through `GAP-W5-12`), protecting `HeroEncyclopediaWidget`, `ShopSafetyFloorWidget`, `HordePivotStepperWidget`, `<RichGuideText />`, and all `group-1..8-content.test.ts` & `wave3/4-content-scannability.test.ts` suites. |
| **4** | **Data Model & State Safety** | ✅ **PASS** | Zero schema mutations to `GuideArticle` (`src/content/guides/types.ts`). `HordePivotStepperWidget` `STAGE_META` note field is upgraded cleanly to `{ vi: string; en: string }`. |
| **5** | **Error Handling & Edge Cases** | ✅ **PASS** | `getGlossaryTerm(id)` returns `undefined` safely for unknown IDs; `translateGlossaryTerm(id, locale)` falls back gracefully to `term.term.en` when optional future locales (`ja`, `ko`, `zh`, `th`) are not yet populated (`GAP-W5-08`). |
| **6** | **Security & Access Control** | ✅ **PASS** | Static TypeScript data and React text nodes only (`0` `dangerouslySetInnerHTML`, `0` external inputs); `ProContentGate` gating remains untouched (`GAP-W5-10`). |
| **7** | **Performance & Scalability** | ✅ **PASS** | `GUIDE_GLOSSARY_BY_ID` is pre-indexed once at module load ($O(1)$ lookup); removing redundant Vietnamese parentheticals from `253` `en:` strings reduces static HTML/RSC payload size across `/en/guides/*`. |
| **8** | **Testing & Verification Strategy (TDD)** | ✅ **PASS** | Task 1 establishes `tests/guides-bilingual-purity.test.ts` (Suites 1–4) in Red phase first, followed by Tasks 2–5 turning every suite Green while keeping all 33 existing test suites Green. |
| **9** | **Task Granularity & Ordering** | ✅ **PASS** | 5 bite-sized tasks with strict file-scope isolation (`GAP-W5-12`), allowing Tasks 3, 4, and 5 to run in parallel via isolated subagents after Tasks 1 and 2 complete. |
| **10** | **Rollout & Rollback Safety** | ✅ **PASS** | Purely additive (`glossary.ts`, `top-heroes-multilang-glossary.md`, `guides-bilingual-purity.test.ts`) and localized string/widget updates (`14` articles, `2` widgets) with instant git revert capability per task. |
| **11** | **Documentation & Traceability** | ✅ **PASS** | Creates `docs/02-specs/top-heroes-multilang-glossary.md` and updates Master Plan `2026-10-16-guides-v4-editorial-html-and-ui-overhaul-master-plan.md` upon completion. |
| **12** | **Formatting & Scannability Invariants** | ✅ **PASS** | Patched `GAP-W5-09` so `5.4-lord-gear-strategy.ts` never nests `` `code` `` inside `**bold**`, and verified all `253` replacements obey `<= 220` chars/line and zero forbidden emojis. |


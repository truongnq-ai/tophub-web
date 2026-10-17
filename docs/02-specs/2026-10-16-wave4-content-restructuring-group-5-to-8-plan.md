# Guides Hub v4.0 — Wave 4: Content Restructuring Part 2 (Groups 5–8) Hardened Implementation Plan

> **For Agentic Workers:** REQUIRED SUB-SKILL: Use `common/subagent-driven-development` or `common/executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
>
> **Audit Status (`/review-plan`):** `APPROVED WITH REVISIONS (HARDENED v4.2 — ZERO-GAP CERTIFIED)` — Audited twice against the 12-Point Senior Tech Lead Checklist, the 5-Dimension Impact Analysis Framework (`common/impact-analysis`), the exact TypeScript AST schema in `src/content/guides/types.ts`, and every single assertion in `tests/group-5..8-content.test.ts`, `tests/guides-phase3-widgets.test.tsx`, `tests/guides-phase4-micro-ux.test.tsx`, and `tests/guides-registry.test.ts`. All **9 technical blindspots (`GAP-W4-01` through `GAP-W4-09`)** have been patched directly into this plan.

**Goal:** Refactor all **15 SSoT guide articles across Groups 5, 6, 7, and 8** (`5.1` through `8.4`) from dense, single-paragraph "Wall of Text" strings (`220–1,090` characters per block) into **3-Layer Scannable Editorial Content** (`**Bold Lead Sentence**` + `\n•` Micro-bullets `<= 220 chars/line` + `` `Monospace Metric Pills` `` + `➔` inline progression arrows), while purging all **455 `vi` / 455 `en` decorative, spreadsheet-tab, and status emoji occurrences** (including ZWJ sequences `🧛‍♀️`, `💂‍♀️`, `🀄️`, `♾️`) across all 10 block types (`DEC-V4-01`, `DEC-V4-02`) with **zero regressions** across existing content, registry, and interactive widget test suites.

**Architecture:** Pure SSoT data transformation inside `tophub-web/src/content/guides/groups/group-{5..8}/*.ts` paired with a strict, type-safe TDD verification suite (`tophub-web/tests/wave4-content-scannability.test.ts`). Leverages the AST-like semantic parser `<RichGuideText />` (`tophub-web/src/components/guides/blocks/rich-guide-text.tsx`) delivered in Wave 1 and the Clean Editorial UI containers (`TldrActionBox`, `CalloutBox`, `ResponsiveDataTable`, `StepRoadmap`, `VisualDiagramBlock`, `InteractiveChecklistBlock`, `CaseStudyBlock`, `MediaSpotlightBlock`, `GuideArticleRenderer`) delivered in Wave 2. No UI component schemas (`types.ts`) are mutated; all **314 multi-word anchor strings**, negative regex guards, `searchGuides()` queries, and plain-text cell contracts required by `tests/group-5..8-content.test.ts`, `tests/guides-registry.test.ts`, and Phase 3/4 Interactive Widgets (`BlacksmithAnvilMatrixWidget`, `ShopSafetyFloorWidget`, `MasterDataExplorerWidget`) are strictly preserved.

**Tech Stack:** TypeScript 5 (`strict`), Next.js 16, React 19, Vitest (`jsdom`), `<RichGuideText />` AST Parser (`default`, `structured-brief`, and `inline` variants).

---

## 0. Báo Cáo Kiểm Toán & Gia Cố Kế Hoạch (`/review-plan` Gap & Impact Analysis)

### 0.1. 9 Lỗ Hổng Kỹ Thuật Đặc Thù Của Wave 4 (`GAP-W4-01` ➔ `GAP-W4-09`) Đã Phát Hiện & Vá Triệt Để

| Mã GAP | Hạng Mục Kiểm Toán | Phát Hiện / Điểm Mù Trong Dữ Liệu & Bộ Test Nhóm 5–8 | Mức Độ Rủi Ro | Biện Pháp Vá Cứng Trong Bản Hardened Plan `v4.2` Này |
| :---: | :--- | :--- | :---: | :--- |
| **`GAP-W4-01`** | **ZWJ Sequences, Variation Selectors (`\uFE0F`) & Gender Symbols (`♀`/`♂`)** | Các bài `6.1` ➔ `8.4` trích dẫn tên Tab từ bảng tính gốc bằng tổ hợp Emoji phức hợp: `Tab 🀄️Runes` (`\u{1F004}\uFE0F`), `Tab 🧛‍♀️Behemoth` (`\u{1F9DB}\u200D\u2640\uFE0F`), `Tab 💂‍♀️Troop Skins` (`\u{1F482}\u200D\u2640\uFE0F`), `Tab ♾️DE-Dust` (`\u267E\uFE0F`), `Tab 🧑🌾Villagers`, `Tab 🏰Castle`, `Tab 👤Heroes`, `Tab ⚔️Gear`, `Tab 👑Relics`. Nếu chỉ xóa ký tự chính mà quên xóa `\u200D` (ZWJ), `\uFE0F` (VS-16) và `\u2640` (`♀`), chuỗi sẽ còn sót ký tự rác `"Tab ♀Behemoth"` hoặc `"Tab ♀Troop Skins"`. | `CRITICAL` | Cưỡng chế làm sạch trọn cụm tổ hợp Emoji + ZWJ (`\u200D`) + Variation Selector (`\uFE0F`) + ký hiệu giới tính đi kèm (`\u2640`, `\u2642`) và kiểm tra bằng regex `/(?!\u2605)[\p{Emoji_Presentation}\p{Extended_Pictographic}]\|[\u200D\uFE0F\u2640\u2642]/u` trong `tests/wave4-content-scannability.test.ts` (Task 1) để đảm bảo **0 ký tự rác** (VD: `"Tab 🧛‍♀️Behemoth"` ➔ `"Tab Behemoth"`). |
| **`GAP-W4-02`** | **`BlacksmithAnvilMatrixWidget` Faction Parser (`5.2-golden-gear-sets.ts`)** | Trong [blacksmith-anvil-matrix-widget.tsx](file:///d:/GitHub/top-hero/tophub-web/src/components/guides/widgets/blacksmith-anvil-matrix-widget.tsx#L28-L35), hàm `detectFaction(text)` kiểm tra `/Horde\|Bộ Lạc\|🔴/i` và `/Nature\|Thiên Nhiên\|🟢/i` trên cột `row[0][locale]` của 3 bảng (`sub-4-1-tank-frontline-bis-table`, `sub-4-2-carry-dps-bis-table`, `sub-4-3-support-healer-bis-table` — tổng 24 dòng). Nếu xóa `🔴`/`🟢`/`🔵` và vô tình rút gọn tên hệ ở `row[0]`, bộ lọc Phe của Widget sẽ hỏng. | `HIGH` | Khi xóa Emoji `🔵 `, `🔴 `, `🟢 `, `🩸 `, `⚔️ `, `⚡ ` trong 3 bảng của `5.2-golden-gear-sets.ts`, bắt buộc giữ nguyên cụm từ `"Liên Minh (League)"`, `"Bộ Lạc (Horde)"`, `"Thiên Nhiên (Nature)"` trong `row[0]` trên toàn bộ `24` dòng (`6` Tank + `8` Carry + `10` Support). |
| **`GAP-W4-03`** | **`ShopSafetyFloorWidget` Plain-Text Cell & Tier Regex Contract (`7.1-shops-tier-list.ts`)** | Trong [shop-safety-floor-widget.tsx](file:///d:/GitHub/top-hero/tophub-web/src/components/guides/widgets/shop-safety-floor-widget.tsx#L53-L108):<br>1. Bảng `sub-1-2-thirteen-shops-master-map` (13 dòng): `row[0]` (`"1"`..`"13"`), `row[1]` (`shopName`), `row[2]` (`currencySource`), `row[3]` (`architectureTier` khớp `/Static\|Tĩnh/i` và `/Event\|Sự kiện/i`), `row[4]` (`resetCycle`) được render dưới dạng **plain text `{shop.shopName}`** (chỉ `row[5]` dùng `<RichGuideText />`).<br>2. Bảng `sub-4-1-diamond-equivalent-roi-matrix` (16 dòng): `row[0]` (`tier` khớp `/^S\+|^S\b\|Must-Buy\|Core Buy/i` và `/^F\b\|Trap\|Cấm/i`) được render trực tiếp `<span>{item.tier}</span>`, còn `row[2]` (`shopSource`) dùng để so khớp `roiKeywords`. Nếu bọc `**` hoặc `` ` `` vào các cột này, giao diện Widget sẽ hiện dấu `**`/`` ` `` thô và gãy regex `^S+`! | `CRITICAL` | Quy định cứng trong Task 4 (`7.1-shops-tier-list.ts`):<br>1. Ở bảng `sub-1-2` (13 dòng): **CẤM bọc `**` hay `` ` `` vào cột `row[0]..row[4]`** (chỉ định dạng ở `row[5]`).<br>2. Ở bảng `sub-4-1` (16 dòng): **CẤM bọc `**` hay `` ` `` vào cột `row[0]` (`tier`) và `row[2]` (`shopSource`)**; giữ nguyên chuỗi đầu dòng `"S+ (Must-Buy)"`, `"S (Core Buy)"`, `"F (Trap — Cấm Mua)"`. |
| **`GAP-W4-04`** | **`MasterDataExplorerWidget` 12-Table & Breakpoint Highlight Contract (`8.4-master-data-tables.ts`)** | Trong [master-data-explorer-widget.tsx](file:///d:/GitHub/top-hero/tophub-web/src/components/guides/widgets/master-data-explorer-widget.tsx#L39-L90), Widget trích xuất đúng **12 bảng** (`sub-1-1`..`sub-1-4`, `sec-3-master-tables-common-pitfalls`, `sub-4-1`..`sub-4-7`) và hiển thị `sub.title` / `sec3.title` dưới dạng plain text `<h4>{selectedTable.fullTitle}</h4>`. Ngoài ra, các dòng Điểm gãy trong 12 bảng đang dùng `🔥`, `👑`, `🌟`, `⭐` để kích hoạt `ResponsiveDataTable.isBreakpointRow()`. | `HIGH` | Trong `8.4-master-data-tables.ts`:<br>1. Xóa Emoji `🐣`, `💂‍♀️` khỏi `sub-4-5.title` và `sub-4-6.title`; **CẤM thêm `**` hoặc `` ` `` vào bất kỳ `sec.title` hay `sub.title` nào**.<br>2. Khi xóa `🔥`, `👑`, `🌟`, `⭐` trong 12 bảng, thay thế bằng ký hiệu ngôi sao đơn sắc `★` (`\u2605`, VD: `"Lv.10 ★ (Mốc 1)"`, `"Lv.40 ★ (Mốc 4)"`, `"+5.00% Queue HP ★ (Tổng +5%)"`) để bảo toàn 100% hiệu ứng tô sáng dòng Điểm gãy. |
| **`GAP-W4-05`** | **Same-Line Semantic Disambiguation Regex Gates (`6.2` & `6.3`)** | Trong [group-6-content.test.ts](file:///d:/GitHub/top-hero/tophub-web/tests/group-6-content.test.ts#L281-L287), bộ test kiểm tra regex `/GAR.*không tính điểm.*Ngày 5/i` (`vi`) & `/GAR.*does NOT score.*Day 5/i` (`en`) trên `6.2`, và `/Cactini.*Thiên Nhiên/i` (`vi`) & `/Cactini.*Nature/i` (`en`) trên `6.3`. Vì `.` trong regex không khớp với ký tự xuống dòng `\n`, nếu tách dòng `\n•` cắt đôi giữa hai vế của regex, bài test sẽ FAIL! | `HIGH` | 1. Trong `6.2-relics-guide.ts`: giữ cụm `"GAR (Tuần B) hoàn toàn không tính điểm Mảnh Thánh Tích ở Ngày 5"` và `"GAR (Week B) does NOT score Relic Shards on Day 5"` nằm trọn trên **cùng 1 dòng**.<br>2. Trong `6.3-pets-and-behemoth.ts`: giữ `"Cactini"` và `"Thiên Nhiên"` / `"Nature"` nằm trên **cùng 1 dòng**. |
| **`GAP-W4-06`** | **Danh Mục Đầy Đủ `314` Chuỗi Neo Trong `tests/group-5..8-content.test.ts` (Phát hiện ở vòng `/review-plan` thứ 2)** | Bản nháp đầu của kế hoạch chỉ liệt kê tóm tắt ~15 số liệu/bài trong Mục 1.2, bỏ sót hơn 240 chuỗi con đang được kiểm tra bằng `.toContain(kw)` trong `tests/group-5..8-content.test.ts` (như `"24 DE"`, `"+18.50%"`, `"Combat Skill Level"`, `"Arcane Crystal"`, `"Duke's Signet Ring"`, `"Sacred Scroll"`, `"Universal Legendary Troop Skin"`, `"Deluxe Choice Chest"`, `"Solar Gold Ingot"`, `"Secretary of Science"`, `"1,181.162M"`, `"$33,670.00"`). Nếu chèn `*` hoặc `` ` `` vào giữa các cụm này (VD: `` `24` DE ``), test sẽ gãy! | `CRITICAL` | Liệt kê **đầy đủ 100% toàn bộ `314` chuỗi neo** của cả 15 bài viết trong Mục 1.2 và từng bước thực thi của Tasks 2–5, cấm tuyệt đối chèn `*` hay `` ` `` cắt đôi bất kỳ chuỗi neo nào. |
| **`GAP-W4-07`** | **Bảo Toàn `28` Truy Vấn `searchGuides()` Song Ngữ (`group-5..8-content.test.ts` & `guides-registry.test.ts`)** | Các file test chạy `searchGuides()` cho 28 cụm từ khóa (`"huyết titan"`, `"blood of the titan"`, `"bậc thầy cường hóa"`, `"meteoric iron"`, `"lệch pha thông minh"`, `"sacred codex"`, `"co ngu"`, `"combat skill level"`, `"ap che sao"`, `"star rating suppression"`, `"cu thu"`, `"covenant seals"`, `"cua hang dau truong"`, `"arena shop"`, `"hon da do"`, `"soul stone"`, `"tiem doi manh"`, `"deluxe choice chest"`, `"huy chuong vinh quang"`, `"heavy cavalry"`, `"vien huy hoang"`, `"brilliance institute"`, `"dan lang"`, `"gift box banking"`, `"moi nhu pha tuyen"`, `"formation tank baiting"`, `"bang so lieu"`, `"master data tables"`). Vì `searchGuides()` chỉ quét `title`, `summary`, `keywords`, `tldr`, `sec.title`, `sub.title` và không lọc dấu `*`/`` ` ``, nếu cắt đôi cụm từ khóa trong `tldr`/`summary` sẽ làm rỗng kết quả tìm kiếm. | `HIGH` | Khóa cứng quy tắc không chèn `*` hay `` ` `` vào giữa 28 cụm từ khóa tìm kiếm này trong `title`, `summary`, `tldr`, `sec.title`, `sub.title`, đồng thời tích hợp kiểm tra trực tiếp vào `tests/wave4-content-scannability.test.ts`. |
| **`GAP-W4-08`** | **Bẫy Regex Phủ Định (`not.toMatch`) — Đặc Biệt Là `/Castle\s*40\b/i` & `/\bVIP\s*9\b/i` Khi Rút Gọn Câu** | `tests/group-6..8-content.test.ts` quét toàn bộ JSON bằng regex cấm `/Castle\s*40\b/i` và `/\bVIP\s*9\b/i`. Nếu trong lúc biên tập rút gọn câu tiếng Anh (`<= 220` ký tự), người viết vô tình đổi `"Castle Lv.40"` thành `"Castle 40"`, regex `/Castle\s*40\b/i` sẽ khớp và đánh trượt bài test ngay lập tức! Ngoài ra còn có các regex cấm: `Brawler` ở Vũ khí Độc quyền Lv.10 (`5.1`–`5.4`), `12–15 sao để mở tiệm` (`7.1`), `"Shaman"` (`7.2`), `18,500 DE` / `64,000+ DE` (`8.1`), và `8.37M` (`8.4`). | `CRITICAL` | Cảnh báo rõ trong Mục 1.2 (luôn viết `"Castle Lv.40"` / `"Lâu đài Lv.40"`, tuyệt đối không viết `"Castle 40"` hay `"VIP 9"`) và nhúng toàn bộ cổng kiểm tra `Zero-Personalization & Negative Hallucination Gate` vào `tests/wave4-content-scannability.test.ts`. |
| **`GAP-W4-09`** | **Khớp Chính Xác Định Danh `widgetType` & `subSection.id` Trong `guides-phase4-micro-ux.test.tsx`** | Bản nháp đầu ghi tên `widgetType` bằng dấu gạch ngang (`blacksmith-anvil-matrix`, `shop-safety-floor-calculator`). Thực tế trong `types.ts` và `tests/guides-phase4-micro-ux.test.tsx`, định danh chính xác là `"blacksmith_anvil_matrix"` (`5.2`), `"shop_safety_floor_explorer"` (`7.1`), `"master_data_explorer"` (`8.4`), và các ID subsection hợp nhất là `"sub-4-1-tank-frontline-bis-table"`, `"sub-4-2-carry-dps-bis-table"`, `"sub-4-3-support-healer-bis-table"` (`5.2`). | `MEDIUM` | Chuẩn hóa chính xác 100% tên `widgetType` và `subSection.id` trong kế hoạch và kiểm định tự động trong `AC-W4-05` của `tests/wave4-content-scannability.test.ts`. |

---

### 0.2. Báo Cáo Phân Tích Tác Động 5 Chiều (`common/impact-analysis` 5-Dimension Audit)

| Chiều Phân Tích | Phạm Vi Đánh Giá | Kết Quả Kiểm Toán & Biện Pháp Kiểm Soát |
| :--- | :--- | :--- |
| **1. Direct & Transitive Dependencies** | `src/content/guides/groups/group-5..8/*.ts` ➔ `registry.ts` ➔ `GuideArticleRenderer`, `BlacksmithAnvilMatrixWidget`, `ShopSafetyFloorWidget`, `MasterDataExplorerWidget`. | Không thay đổi cấu trúc export hay kiểu dữ liệu `GuideArticle`. Mọi thay đổi chỉ diễn ra trong nội dung chuỗi `LocalizedString` (`{ vi, en }`), tương thích 100% với `<RichGuideText />`. |
| **2. API & Data Contracts** | `GuideContentBlock` union (`types.ts`), `checklistId` (lưu `localStorage`), `mediaCode`, `widgetType`. | Toàn bộ `15` `checklistId`, `60` `mediaCode` (`MED-5.1-01` ➔ `MED-8.4-04`), và `3` `widgetType` (`blacksmith_anvil_matrix`, `shop_safety_floor_explorer`, `master_data_explorer`) được khóa cứng bằng assertion trong `AC-W4-05`. |
| **3. Database & State** | Trạng thái đánh dấu Checklist lưu trong `localStorage` của người dùng theo khóa `checklistId`. | Giữ nguyên 100% chuỗi `checklistId` và `item.id` của cả 15 bài viết (`gear-overview-daily-audit-v2` ➔ `master-tables-reverse-budget-audit-v2`), đảm bảo người dùng không bị mất trạng thái tick chọn sau khi nâng cấp. |
| **4. Performance & Resource Limits** | Thời gian build SSG (`pnpm build` cho 87 trang tĩnh) và độ phức tạp render của `<RichGuideText />`. | Việc chuẩn hóa các khối văn bản dài (`up to 1,090 chars` ở bài `8.4`) thành các dòng `\n•` `<= 220` ký tự giúp `<RichGuideText />` đi thẳng vào nhánh tách dòng tường minh `O(N)` thay vì chạy regex tách câu dự phòng. |
| **5. Security & Multi-Tenant Isolation** | Ranh giới hiển thị nội dung Miễn phí (`freeSections`) và Chuyên sâu (`proSections` qua `ProContentGate`). | Giữ nguyên 100% phân bổ `3` `freeSections` và `2` `proSections` trên tất cả 15 bài viết; không rò rỉ dữ liệu giữa hai phân vùng. |

---

### 0.3. Kiểm Toán 12 Điểm Chuẩn Senior Tech Lead (`12-Point Plan Audit Checklist`)

| # | Tiêu Chí Đánh Giá | Kết Quả Kiểm Toán & Cơ Chế Đảm Bảo Trong Kế Hoạch |
| :---: | :--- | :--- |
| **1** | **Data Loss & Integrity** | **PASS**: Bài test `AC-W4-05` trong `wave4-content-scannability.test.ts` khóa chặt số lượng `freeSections` (`3`), `proSections` (`2`), `checklistId`, và số hàng của toàn bộ `53` bảng dữ liệu trên 15 bài viết. |
| **2** | **Rollback Strategy** | **PASS**: Mỗi Task (Task 2 ➔ Task 5) thực thi độc lập theo từng Nhóm (`group-5` ➔ `group-8`). Nếu bất kỳ bài test nào thất bại, khôi phục tức thì bằng `git checkout -- tophub-web/src/content/guides/groups/group-N/`. |
| **3** | **Performance & Scale** | **PASS**: Dữ liệu tĩnh SSoT biên dịch lúc build; không phát sinh bất kỳ truy vấn runtime hay cấp phát bộ nhớ dư thừa nào; `searchGuides()` duy trì tốc độ `< 50ms`. |
| **4** | **Security & Auth Scope** | **PASS**: Không thay đổi logic `ProContentGate` hay quyền truy cập `isPro` trên các section `proSections`. |
| **5** | **Contract Breaking** | **PASS**: Không thay đổi bất kỳ interface nào trong `src/content/guides/types.ts` hay chữ ký hàm trong `src/content/guides/registry.ts`. |
| **6** | **Idempotency & Concurrency** | **PASS**: Các Task 2, 3, 4, 5 thao tác trên 4 thư mục hoàn toàn tách biệt (`group-5`, `group-6`, `group-7`, `group-8`), cho phép thực thi song song (Parallel Subagent Execution) không xung đột file. |
| **7** | **Edge Cases & Null Safety** | **PASS**: Đã xử lý triệt để edge case ZWJ/Variation Selector (`GAP-W4-01`), plain-text cells trong `ShopSafetyFloorWidget` (`GAP-W4-03`), plain-text titles trong `MasterDataExplorerWidget` (`GAP-W4-04`), regex cùng dòng trong `6.2`/`6.3` (`GAP-W4-05`), và bẫy regex `/Castle\s*40\b/i` (`GAP-W4-08`). |
| **8** | **No Placeholders Law** | **PASS**: Không có bất kỳ `TODO`, `TBD` hay câu lệnh mơ hồ nào; toàn bộ code của `tests/wave4-content-scannability.test.ts` và quy tắc biến đổi từng bài viết đều được cung cấp đầy đủ. |
| **9** | **Atomic Granularity** | **PASS**: Chia thành 5 Task với các bước nguyên tử theo đúng chu trình: kiểm tra bài viết ➔ biên tập song ngữ ➔ chạy test nhóm + test scannability ➔ xác nhận PASS. |
| **10** | **TDD Verification Flow** | **PASS**: Task 1 tạo `tests/wave4-content-scannability.test.ts` và chạy xác nhận **RED** trước khi sửa bất kỳ file dữ liệu nào ở Tasks 2–5. |
| **11** | **Env & Secret Isolation** | **PASS**: Không chứa biến môi trường, secret hay URL cứng. |
| **12** | **Strict Type Safety** | **PASS**: Toàn bộ code kiểm thử trong Task 1 tuân thủ `strict` TypeScript, không dùng `any`, khớp chính xác 100% với `GuideContentBlock` trong `src/content/guides/types.ts`. |

---

## 1. Báo Cáo Kiểm Toán Định Lượng Toàn Diện 15 Bài Viết Nhóm 5–8 (`Full AST Audit`)

### 1.1. Bảng Thống Kê Định Lượng Hiện Trạng Trên Tất Cả 10 Loại Khối (`types.ts`)

Kết quả quét định lượng toàn bộ 15 file dữ liệu bài viết thuộc Nhóm 5–8 (`src/content/guides/groups/group-5..8/*.ts`) bằng script AST khớp 100% `GuideContentBlock`:

| Mã Bài | File Dữ Liệu (`src/content/guides/groups/...`) | Độ dài `tldr` `vi` (`core` / `action` / `taboo`) | `tldr` có `\n•`? | `keyTakeaways` Wall (`>220`c) / Max len | `paragraph` & `callout` Wall (`>220`c) | `list.items` Wall (`>220`c) | `roadmap`, `checklist` & `case_study` Wall (`>220`c) | Tổng số chuỗi chứa Emoji cần làm sạch (`vi` / `en`) |
| :---: | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **`5.1`** | `group-5/5.1-gear-overview.ts` | `414` / `376` / `400` | `0/3` | `3/3` Wall (Max `410`) | `3` para + `3` callout | `9 / 9` | `2` road + `0` chk + `5` case | **`7` / `7`** |
| **`5.2`** | `group-5/5.2-golden-gear-sets.ts` | `515` / `442` / `205` | `0/3` | `3/3` Wall (Max `731`) | `2` para + `2` callout | `11 / 17` | `0` road + `0` chk + `5` case | **`125` / `125`** |
| **`5.3`** | `group-5/5.3-enhancement-and-mythic.ts` | `282` / `283` / `256` | `0/3` | `3/3` Wall (Max `787`) | `3` para + `2` callout | `10 / 10` | `1` road + `0` chk + `6` case | **`24` / `24`** |
| **`5.4`** | `group-5/5.4-lord-gear-strategy.ts` | `351` / `322` / `321` | `0/3` | `3/3` Wall (Max `389`) | `2` para + `3` callout | `4 / 6` | `1` road + `0` chk + `6` case | **`25` / `25`** |
| **`6.1`** | `group-6/6.1-runes-guide.ts` | `412` / `471` / `370` | `0/3` | `3/3` Wall (Max `626`) | `4` para + `2` callout | `3 / 3` | `3` road + `0` chk + `4` case | **`19` / `19`** |
| **`6.2`** | `group-6/6.2-relics-guide.ts` | `513` / `485` / `560` | `0/3` | `3/3` Wall (Max `643`) | `3` para + `3` callout | `4 / 4` | `3` road + `1` chk + `6` case | **`16` / `16`** |
| **`6.3`** | `group-6/6.3-pets-and-behemoth.ts` | `569` / `498` / `416` | `0/3` | `3/3` Wall (Max `660`) | `5` para + `4` callout | `4 / 4` | `0` road + `2` chk + `7` case | **`25` / `25`** |
| **`7.1`** | `group-7/7.1-shops-tier-list.ts` | `306` / `376` / `360` | `0/3` | `4/4` Wall (Max `529`) | `3` para + `2` callout | `8 / 8` | `0` road + `0` chk + `6` case | **`6` / `6`** |
| **`7.2`** | `group-7/7.2-guild-honor-freeze.ts` | `365` / `434` / `294` | `0/3` | `4/4` Wall (Max `435`) | `7` para + `2` callout | `6 / 8` | `3` road + `0` chk + `5` case | **`11` / `11`** |
| **`7.3`** | `group-7/7.3-exchange-and-vip-shops.ts` | `451` / `460` / `337` | `0/3` | `4/4` Wall (Max `473`) | `3` para + `1` callout | `7 / 12` | `0` road + `0` chk + `6` case | **`14` / `14`** |
| **`7.4`** | `group-7/7.4-troop-skins-and-medals.ts` | `346` / `481` / `384` | `0/3` | `4/4` Wall (Max `560`) | `5` para + `1` callout | `2 / 2` | `0` road + `3` chk + `6` case | **`44` / `44`** |
| **`8.1`** | `group-8/8.1-castle-and-brilliance.ts` | `313` / `351` / `301` | `0/3` | `3/3` Wall (Max `544`) | `5` para + `2` callout | `11 / 12` | `0` road + `1` chk + `5` case | **`11` / `11`** |
| **`8.2`** | `group-8/8.2-builder-queues-and-villagers.ts` | `383` / `474` / `329` | `0/3` | `3/3` Wall (Max `640`) | `3` para + `0` callout | `4 / 8` | `0` road + `2` chk + `7` case | **`25` / `25`** |
| **`8.3`** | `group-8/8.3-research-and-baiting.ts` | `340` / `383` / `260` | `0/3` | `3/3` Wall (Max `807`) | `6` para + `0` callout | `13 / 15` | `0` road + `1` chk + `7` case | **`38` / `38`** |
| **`8.4`** | `group-8/8.4-master-data-tables.ts` | `492` / `380` / `332` | `0/3` | `3/3` Wall (Max `1090`) | `13` para + `0` callout | `2 / 2` | `0` road + `0` chk + `7` case | **`65` / `65`** |
| **TỔNG** | **15 Files (`group-5` ➔ `group-8`)** | **Max `569` chars** | **`0/45`** | **`49/49` Wall (Max `1090`)** | **`67` para + `24` callout** | **`94 / 120`** | **`13` road + `10` chk + `88` case** | **`455` (`vi`) / `455` (`en`)** |

#### Danh mục đầy đủ các vị trí chứa Emoji cần làm sạch (`DEC-V4-02` & `GAP-W4-01`) theo từng bài viết:
1. **`5.1-gear-overview.ts` (`7` `vi` / `7` `en`)**:
   - `list.items` (1): Xóa `🩸 `, `⚔️ `, `⚡ ` trước tên 3 bộ đồ Vàng trong `sub-1-1`.
   - `roadmap.steps` (2): Xóa `🔵`, `🔴`, `🟢` trong `steps[1].description` và `steps[2].title`.
   - `visual_diagram.centerNode.title` (1): Xóa `📦 ` đầu tiêu đề.
   - `callout.content` (1): Xóa `🩸 `, `⚔️ `, `⚡ ` trong `sub-4-2`.
   - `case_study` (2): Xóa `⚔️`, `🩸`, `⚡` trong `profileSummary` và `recoverySteps[1].detail`.
2. **`5.2-golden-gear-sets.ts` (`125` `vi` / `125` `en`)**:
   - `tldr` (3) & `keyTakeaways` (2): Xóa `🩸`, `⚡`, `⚔️`, `🔵`, `🔴`, `🟢`, `⚪`.
   - `media_spotlight` (7): Xóa `🔵`, `🔴`, `🟢`, `🩸`, `⚡`, `⚔️`, `❌`, `⚪` trong `description` và `annotations`.
   - `list.items` (15), `callout.content` (1), `checklist.items` (5), `visual_diagram` (9), `case_study` (9): Xóa toàn bộ `🩸`, `⚡`, `⚔️`, `🔵`, `🔴`, `🟢`, `⚪`, `❌`, `✅`.
   - `table.rows` (74 ô trên 3 bảng `sub-4-1-tank-frontline-bis-table`, `sub-4-2-carry-dps-bis-table`, `sub-4-3-support-healer-bis-table`): Xóa toàn bộ `🔵`, `🔴`, `🟢`, `🩸`, `⚡`, `⚔️` (giữ nguyên tên hệ `"Liên Minh (League)"`, `"Bộ Lạc (Horde)"`, `"Thiên Nhiên (Nature)"` ở `row[0]` cho `BlacksmithAnvilMatrixWidget` — `GAP-W4-02`).
3. **`5.3-enhancement-and-mythic.ts` (`24` `vi` / `24` `en`)**:
   - `table.caption` (1): Xóa `(Trích xuất chính xác Tab ⚔️Gear)` ➔ `(Trích xuất chính xác Tab Gear)`.
   - `table.rows` (15): Đổi `⭐`..`⭐⭐⭐⭐⭐` (`\u2B50`) thành `1★`..`5★` (`\u2605`) ở Bảng 4.1 & Bảng 4.4; xóa `🔥 `, `🎯 `, `⚡ `, `👑 ` ở đầu ô (thêm `"★"` vào các dòng Mốc Đột Phá Lv.5, Lv.10, Lv.15, Lv.20 để bảo toàn `isBreakpointRow`).
   - `visual_diagram` (5): Xóa `🗡️ `, `🎯 `, `🔥 `, `⚡ `, `👑 ` ở `centerNode` và `branches`.
   - `list.items` (3): Xóa `🔴 `, `🔵 `, `🟢 ` đầu dòng trong `sub-4-4`.
4. **`5.4-lord-gear-strategy.ts` (`25` `vi` / `25` `en`)**:
   - `callout.content` (1) & `table.rows` (2): Xóa `👉 `, `👈 ` trước Nhánh Phải / Nhánh Trái.
   - `roadmap.steps` (1) & `checklist.items` (1): Xóa `🔴`, `🔵`, `🟢`.
   - `visual_diagram.centerNode.title` (1) & `table.caption` (1): Xóa `👑 `, `⚔️`.
   - `table.rows` (16 ô tại Bảng 2): Xóa `🟢 `, `🔵 `, `🟣 `, `🟡 `, `🔴 `, `🎯 `, `🔥 ` (gắn `"★"` vào các dòng Y1, Y2, R1–R2, R3–R4 để bảo toàn `isBreakpointRow`).
   - `case_study.recoverySteps` (2): Xóa `🔴`.
5. **`6.1-runes-guide.ts` (`19` `vi` / `19` `en`)**:
   - Xóa cụm `🀄️` (`\u{1F004}\uFE0F`) và `👑` trong `summary`, `keyTakeaways[0]`, `sub-1-1.title`, `sub-1-1.table.caption`, `sec-4.title`, `sec-4.paragraph`, `sub-4-1.title`, `sub-4-1.table.caption`, `sub-4-2.paragraph` (`Tab 🀄️Runes` ➔ `Tab Runes`, `Tab 👑KvK` ➔ `Tab KvK`).
   - Đổi `🔥`, `⭐`, `👑` ở `keyTakeaways[1]` và `table.rows` (`Lv.5 🔥`, `Lv.6 ⭐`, `Lv.8 👑`) sang ký hiệu ngôi sao đơn sắc `★` (`Lv.5 ★`, `Lv.6 ★`, `Lv.8 ★`).
   - Xóa `🔴 `, `🔵 `, `🟢 ` ở `roadmap.steps[0..2].badge`.
6. **`6.2-relics-guide.ts` (`16` `vi` / `16` `en`)**:
   - Xóa `👑` trong `summary`, `keyTakeaways[2]`, `callout.content`, `sec-4.title`, `sec-4.paragraph`, `sub-4-1.table.caption`, `sub-4-2.title`, `sub-4-3.table.footnote` (`Tab 👑Relics` ➔ `Tab Relics`, `Tab 👑KvK` ➔ `Tab KvK`).
   - Xóa `🔴 `, `🔵 `, `🟢 ` trong `keyTakeaways[0]`.
   - Xóa `🔥 `, `🛡️ `, `🌿 `, `👑 ` trong `table.rows` (thêm `"★"` vào các dòng Bậc 1..4 Sao 5 để giữ `isBreakpointRow`).
7. **`6.3-pets-and-behemoth.ts` (`25` `vi` / `25` `en`)**:
   - Xóa `🐣` và tổ hợp ZWJ `🧛‍♀️` (`\u{1F9DB}\u200D\u2640\uFE0F` — chú ý xóa sạch cả `\u200D\u2640\uFE0F` theo `GAP-W4-01`) trong `summary`, `keyTakeaways[1]`, `sub-1-1.badge`, `sub-1-1.paragraph`, `sub-1-2.badge`, `sub-1-2.paragraph`, `sec-4.title`, `sec-4.paragraph`, `sub-4-1.title`, `sub-4-1.badge`, `sub-4-2.title`, `sub-4-2.badge`, `sub-4-3.visual_diagram.centerNode.title`, `sub-4-3.table.caption`.
   - Xóa `🛡️ `, `🔥 `, `🌿 ` ở bảng `sec-2`, và đổi `🔥`, `⭐`, `👑` ở các dòng mốc đột phá Pet (`Lv.45`, `Lv.75`, `Lv.90`) & Behemoth (`Lv.20`, `Lv.40`, `Lv.60`, `Lv.80`, `Lv.100`) sang `★`.
8. **`7.1-shops-tier-list.ts` (`6` `vi` / `6` `en`)**:
   - `list.items` (3): Xóa `✅ `, `❌ ` ở `sub-2-1`.
   - `table.headers` (3): Xóa `❌ `, `💥 `, `✅ ` ở bảng `sec-3`.
9. **`7.2-guild-honor-freeze.ts` (`11` `vi` / `11` `en`)**:
   - `roadmap.steps[0..2].badge` (3): Xóa `🔴 `, `🔵 `, `🟢 `.
   - `table.headers` (3): Xóa `❌ `, `💥 `, `✅ `.
   - `table.rows` (5): Đổi `"Bậc II (Tier II) 🔥"` ➔ `"Bậc II (Tier II) ★"`, `"Bậc IV (Tier IV — Ascended) 👑"` ➔ `"Bậc IV (Tier IV — Ascended) ★"`, và đổi `"⭐⭐⭐⭐⭐"` / `"⭐⭐"` / `"⭐⭐⭐"` thành `"5/5 ★"` / `"2/5 ★"` / `"3/5 ★"`.
10. **`7.3-exchange-and-vip-shops.ts` (`14` `vi` / `14` `en`)**:
    - `list.items` (6): Xóa `✅ `, `⚠️ `, `❌ `, `🔴 `, `🔵 `, `🟢 `.
    - `table.headers` (3): Xóa `❌ `, `💥 `, `✅ `.
    - `table.rows` (5): Đổi `⭐`, `⭐⭐`, `⭐⭐⭐`, `👑` ở các dòng `VIP 4`, `VIP 6`, `VIP 8`, `VIP 10`, `VIP 15` thành `★`, `2★`, `3★`, `★`.
11. **`7.4-troop-skins-and-medals.ts` (`44` `vi` / `44` `en`)**:
    - Đổi toàn bộ ký tự `⭐` (`\u2B50`, gồm `⭐`, `⭐⭐`, `⭐⭐⭐`, `⭐⭐⭐⭐`, `⭐⭐⭐⭐⭐`, `⭐⭐⭐⭐⭐⭐`) sang ký hiệu ngôi sao đơn sắc `★` (`\u2605`: `1★`, `2★`, `3★`, `4★`, `5★`, `6★` hoặc `★`..`★★★★★★`) trên `keyTakeaways[2]`, `list.items[1]`, `checklist.items[2..3]`, `table.rows`, `visual_diagram`, và `case_study`.
    - Xóa tổ hợp ZWJ `💂‍♀️` (`\u{1F482}\u200D\u2640\uFE0F` — xóa sạch cả `♀` theo `GAP-W4-01`) trong `proSections[0].blocks[0].text` (`Tab 💂‍♀️Troop Skins` ➔ `Tab Troop Skins`).
    - Xóa `🏆 `, `🔥 `, `⚡ `, `🌿 `, `⚔️ `, `💀 `, `🛡️ `, `🗡️ `, `🐻 `, `🤝 `, `🌾 ` ở cột đánh giá của 11 Quân trang trong bảng `sec-1`, và xóa `❌ `, `✅ ` ở `table.headers` của bảng `sec-3`.
12. **`8.1-castle-and-brilliance.ts` (`11` `vi` / `11` `en`)**:
    - `list.items` (3): Xóa `🔵 `, `🔴 `, `🟢 `.
    - `table.headers` (2): Xóa `❌ `, `✅ `.
    - `callout` & `paragraph` (4): Xóa `🏰`, `👤`, `♾️` (`\u267E\uFE0F`), `💡 ` (`Tab 🏰Castle, 👤Heroes & ♾️DE-Dust` ➔ `Tab Castle, Heroes & DE-Dust`).
    - `table.rows` (2): Đổi `"🔥 Lv.35"` ➔ `"Lv.35 ★"` và `"👑 Lv.40"` ➔ `"Lv.40 ★"`.
13. **`8.2-builder-queues-and-villagers.ts` (`25` `vi` / `25` `en`)**:
    - Xóa tổ hợp `🧑🌾` (`Tab 🧑🌾Villagers` ➔ `Tab Villagers`) trong `keyTakeaways[1]`, `proSections[0].blocks[0].text`, `sub-4-1.table.caption`, `sub-4-2.visual_diagram.footnote`.
    - Xóa `👷 ` ở 4 hàng bảng Thợ Xây (`sub-1-1`) và ở `visual_diagram.centerNode.title`.
    - Xóa `❌ `, `✅ ` ở `table.headers` (`sec-3`).
    - Xóa `🔥 `, `⚔️ `, `🛡️ `, `🏥 `, `💎 `, `🗺️ ` ở 14 hàng Bảng Dân Làng (`sub-4-1`, đổi `"🔥 S+ (Số 1)"` ➔ `"[S+ ★] (Số 1)"` để giữ `isBreakpointRow`).
14. **`8.3-research-and-baiting.ts` (`38` `vi` / `38` `en`)**:
    - Xóa `♾️` (`\u267E\uFE0F`) trong `keyTakeaways[2]`, `sub-4-3.title`, `sub-4-3.paragraph`, `sub-4-3.table.caption` (`Tab ♾️DE-Dust` ➔ `Tab DE-Dust`).
    - Xóa `🥇 `, `🥈 `, `🥉 `, `🏅 `, `❄️ ` ở 5 hàng bảng `sub-1-1` (thêm `"★"` vào dòng `"SỐ 1 TUYỆT ĐỐI ★"`).
    - Xóa `🔬 `, `🔴 `, `🔵 `, `🟢 ` ở `list.items` (5), và xóa `❌ `, `✅ ` ở `table.headers` (2).
    - Xóa `⚔️ `, `⏱️ `, `🔥 ` ở `visual_diagram` (`sub-4-1`, 5 vị trí).
    - Xóa `🏛️ `, `🔥 `, `⚔️ `, `❄️ ` ở 17 hàng bảng Công nghệ Tinh Chất Rồng (`sub-4-3`, giữ `"★"` ở hàng 11 `"Viện Huy Hoàng ★"`).
15. **`8.4-master-data-tables.ts` (`65` `vi` / `65` `en`)**:
    - Xóa `📚 `, `📊 `, `🗡️ `, `⚔️`, `🀄️`, `🐣`, `💂‍♀️` (kèm `\u200D\u2640\uFE0F`), `💂 ` trong `paragraph`, `visual_diagram`, `sub-4-5.title`, `sub-4-6.title`.
    - Xóa `❌ `, `✅ ` ở `table.headers` (`sec-3`).
    - Đổi toàn bộ `🔥`, `👑`, `🌟`, `⭐` (`\u2B50`) trên 12 bảng dữ liệu và `case_study` sang ký hiệu ngôi sao đơn sắc `★` (`\u2605`) để bảo toàn 100% logic `ResponsiveDataTable.isBreakpointRow()` và `MasterDataExplorerWidget` (`GAP-W4-04`).

---

### 1.2. Ma Trận Đầy Đủ `314` Từ Khóa, Chuỗi Neo & Regex Bảo Vệ (`Protected Test Assertions Matrix` — `GAP-W4-06`, `GAP-W4-07`, `GAP-W4-08`)

> [!IMPORTANT]
> **QUY TẮC BẢO TOÀN TEST TUYỆT ĐỐI (`ZERO TEST REGRESSION`)**:
> 1. **Cấm chèn ký tự `*` hoặc `` ` `` vào GIỮA một chuỗi con nằm trong bảng `Protected Substrings` dưới đây.** Ví dụ: trong bài `8.3` phải viết `` `24 DE` ``, tuyệt đối **CẤM** viết `` `24` DE `` vì `.toContain("24 DE")` sẽ FAIL!
> 2. **Cấm tuyệt đối rút gọn `"Castle Lv.40"` thành `"Castle 40"` hoặc viết `"VIP 9"` (`GAP-W4-08`)**: Các bài test `group-6..8-content.test.ts` quét regex cấm `/Castle\s*40\b/i` và `/\bVIP\s*9\b/i` trên toàn bộ JSON. Luôn viết `"Castle Lv.40"` / `"Lâu đài Lv.40"`.
> 3. **Cấm từ vựng cá nhân hóa**: Tuyệt đối không dùng `"Tập đoàn"`, `"Kịch bản"`, `"Sếp"`, `"chúng ta"`, `"các bạn"`, `"[GAS]Max"`, `"10956"`, `"10766"`, `"acc của anh"`, `"tài khoản của anh"`, `"account của bạn"`, `"acc của bạn"`, `"nick của bạn"`, `"cá nhân mình"`, `"theo kinh nghiệm của mình"`.

| Test File | Bài Viết | Danh Sách Đầy Đủ 100% Chuỗi Neo (`vi` & `en`), Truy Vấn `searchGuides()` & Regex Bắt Buộc Bảo Toàn |
| :--- | :---: | :--- |
| **[group-5-content.test.ts](file:///d:/GitHub/top-hero/tophub-web/tests/group-5-content.test.ts)** | `5.1` ➔ `5.4` | • **Negative Regexes (`5.1`–`5.4`)**: Cấm khớp `/Vũ khí Độc quyền Lv\.10 cho Đấu Sĩ/i`, `/Lv\.10 Exclusive Weapons for Brawler/i`, `/Sát thương chủ lực \(Đấu Sĩ/i`, `/DPS carries \(Brawler/i`.<br>• **Bài `5.1` (`vi` & `en`)**: `"0"`, `"Lv.40"`, `"1★"`, `"5★"`, `"275"`, `"1,185"`, `"920"`, `"Brawler"`, `"+30%"`, `"gear-overview-daily-audit-v2"`.<br>• **Bài `5.2` (`vi` & `en`)**: `"Blood of the Titan"`, `"Glory of the Sage"`, `"Knight's Glory"`, `"+160%"`, `"+6%"`, `"+40%"`, `"+80%"`, `"+8%"`, `"+30%"`, `"750"`, `"3,000"`, `"18,000"`, `"Adjudicator"`, `"Rose Princess"`, `"Desert Prince"`, `"Beastmaster"`, `"Monk"`, `"Sage"`, `"Paragon"`, `"Pyromancer"`, `"Wukong"`, `"Storm Maiden"`, `"Wilderness Hunter"`, `"Tidecaller"`, `"Ne Zha"`, `"Pixie"`, `"Nun"`, `"Bishop"`, `"Artificer"`, `"Bard"`, `"Witch"`, `"Soulmancer"`, `"Warlock"`, `"Shadow Priest"`, `"Forest Maiden"`, `"Petalis"`, `"blacksmith_anvil_matrix"`, `"golden-gear-faction-mark-audit-v2"`.<br>• **Bài `5.3` (`vi` & `en`)**: `"21,000"`, `"100,800"`, `"504,000"`, `"+5,900"`, `"+74,000"`, `"60,000"`, `"288,000"`, `"118,500"`, `"568,800"`, `"195,000"`, `"936,000"`, `"780,000"`, `"3,744,000"`, `"4,680,000"`, `"22,464,000"`, `"62,500"`, `"81,250"`, `"100,000"`, `"118,750"`, `"137,500"`, `"1,650"`, `"6,000"`, `"500,000"`, `"23,980,000"`, `"575.52M"`, `"275"`, `"500"`, `"605"`, `"1,160"`, `"1,035"`, `"1,185"`, `"1,850"`, `"-2.30%"`, `"+18.50%"`, `"+37.00%"`, `"7,110"`, `"920"`, `"Wukong"`, `"Storm Maiden"`, `"Desert Prince"`, `"Beastmaster"`, `"Witch"`, `"Soulmancer"`, `"Warlock"`, `"Paragon"`, `"Pyromancer"`, `"Rose Princess"`, `"Adjudicator"`, `"Bishop"`, `"Artificer"`, `"Nun"`, `"Tidecaller"`, `"Ne Zha"`, `"Monk"`, `"Pixie"`, `"Petalis"`, `"Forest Maiden"`, `"enhancement-resonance-audit-v2"`.<br>• **Bài `5.4` (`vi` & `en`)**: `"+41.45%"`, `"+113.95%"`, `"+14.40%"`, `"+18.70%"`, `"+38.90%"`, `"+34.25%"`, `"+20.75%"`, `"+43.15%"`, `"+38.00%"`, `"958,800"`, `"9,955"`, `"2,030"`, `"101"`, `"175"`, `"1,050"`, `"5,752,800"`, `"59,730"`, `"12,180"`, `"606"`, `"Sacred Codex"`, `"lord-gear-staggered-audit-v2"`.<br>• **`searchGuides()` (`5.2`–`5.4`)**: `"huyết titan"`, `"blood of the titan"`, `"bậc thầy cường hóa"`, `"meteoric iron"`, `"lệch pha thông minh"`, `"sacred codex"`. |
| **[group-6-content.test.ts](file:///d:/GitHub/top-hero/tophub-web/tests/group-6-content.test.ts)** | `6.1` ➔ `6.3` | • **Same-Line Regexes (`GAP-W4-05`)**: `6.2` phải khớp `/GAR.*không tính điểm.*Ngày 5/i` (`vi`) & `/GAR.*does NOT score.*Day 5/i` (`en`) trên **cùng 1 dòng**; `6.3` phải khớp `/Cactini.*Thiên Nhiên/i` (`vi`) & `/Cactini.*Nature/i` (`en`) trên **cùng 1 dòng**.<br>• **Bài `6.1` (`vi` & `en`)**: `"Hero HP Rune"`, `"Hero Attack Rune"`, `"Soldier HP Rune"`, `"Soldier Attack Rune"`, `"Relic Mastery Rune"`, `"Queue Attack Rune"`, `"81"`, `"243"`, `"729"`, `"2,187"`, `"8,000"`, `"48,000"`, `"25,000"`, `"150,000"`, `"225,000"`, `"1,350,000"`, `"15,091"`, `"40,616"`, `"191,019"`, `"722,271"`, `"371"`, `"999"`, `"4,696"`, `"17,753"`, `"28,660"`, `"108,500"`, `"3,845"`, `"6,922"`, `"14,000"`, `"Combat Skill Level"`, `"3,000"`, `"5,000"`, `"600"`, `"1,200"`, `"Arcane Crystal"`, `"runes-guide-weekly-audit-v2"`, `"MED-6.1-01"`..`"04"`.<br>• **Bài `6.2` (`vi` & `en`)**: `"-50%"`, `"4,810"`, `"3,130"`, `"1,800"`, `"+6.00%"`, `"+12.00%"`, `"+20.00%"`, `"+40.00%"`, `"130"`, `"330"`, `"490"`, `"1,100"`, `"Thunder Judgment"`, `"Dragonheart"`, `"Dragonbone Amulet"`, `"Petrification Staff"`, `"Soul Guard Orb"`, `"Feather of the Pact"`, `"Vineborne Bow"`, `"Undefeated Crown"`, `"Sacred Scroll"`, `"Frost Diadem"`, `"Duke's Signet Ring"`, `"Scale of Injustice"`, `"Eternal Wings"`, `"Moonstone"`, `"1,500"`, `"5,000"`, `"Guild Rush"`, `"relics-guide-weekly-audit-v2"`, `"MED-6.2-01"`..`"04"`.<br>• **Bài `6.3` (`vi` & `en`)**: `"36.00%"`, `"60.00%"`, `"84.00%"`, `"96.00%"`, `"104.00%"`, `"Eggy"`, `"Sparrow"`, `"Tiggy"`, `"Howli"`, `"Flickerkit"`, `"Cactini"`, `"Bear"`, `"Candy Boo"`, `"98,550"`, `"368,600"`, `"596,600"`, `"596,850"`, `"3,525"`, `"714,000"`, `"40,050"`, `"44"`, `"161"`, `"58"`, `"211"`, `"+35.70%"`, `"+52.50%"`, `"+66.30%"`, `"+97.50%"`, `"+81.60%"`, `"+120.00%"`, `"5,880"`, `"1,500"`, `"750"`, `"3,500"`, `"6,080"`, `"6,346"`, `"4,648,680"`, `"69,000"`, `"210.00%"`, `"630.00%"`, `"15.00%"`, `"175.00%"`, `"960"`, `"36,000"`, `"2,000"`, `"pets-behemoth-weekly-audit-v2"`, `"MED-6.3-01"`..`"04"`.<br>• **`searchGuides()` (`6.1`–`6.3`)**: `"co ngu"`, `"combat skill level"`, `"ap che sao"`, `"star rating suppression"`, `"cu thu"`, `"covenant seals"`. |
| **[group-7-content.test.ts](file:///d:/GitHub/top-hero/tophub-web/tests/group-7-content.test.ts)** | `7.1` ➔ `7.4` | • **Negative Assertions**: `7.1` cấm khớp `/đạt 12[–-]15 sao để mở tiệm/i`; `7.2` cấm chứa `"Shaman"`.<br>• **Bài `7.1` (`vi` & `en`)**: `"Arena Shop"`, `"Guild Points"`, `"Medal Shop"`, `"VIP Shop"`, `"Exchange Shop"`, `"Wheel"`, `"Dice of Fate"`, `"Kingdom Emblem"`, `"1,900"`, `"2,000"`, `"12,000"`, `"15,000"`, `"40,000"`, `"6,000"`, `"600%"`, `"300%"`, `"1,500"`, `"Soulmancer"`, `"Warlock"`, `"Pyromancer"`, `"Adjudicator"`, `"Pixie"`, `"Orichalcum"`, `"shop_safety_floor_explorer"`, `"checklist-7-1-weekly-shop-routine"`, `"MED-7.1-01"`..`"04"`.<br>• **Bài `7.2` (`vi` & `en`)**: `"40,000"`, `"360,000"`, `"6,000"`, `"54,000"`, `"720,000"`, `"1,080,000"`, `"108,000"`, `"162,000"`, `"55–65"`, `"75–95"`, `"85–95"`, `"130"`, `"345–385"`, `"12,000"`, `"Universal Legendary Troop Skin"`, `"Soulmancer"`, `"Warlock"`, `"Pyromancer"`, `"Adjudicator"`, `"Pixie"`, `"checklist-7-2-guild-honor-freeze"`, `"MED-7.2-01"`..`"04"`.<br>• **Bài `7.3` (`vi` & `en`)**: `"500"`, `"1,000"`, `"+30%"`, `"Deluxe Choice Chest"`, `"100"`, `"300"`, `"600"`, `"1,200"`, `"2,400"`, `"DE-Dust"`, `"Solar Gold Ingot"`, `"$1.00"`, `"$50.00"`, `"$166.70"`, `"$1,000.00"`, `"$5,000.00"`, `"$33,670.00"`, `"200,000"`, `"3,000,000"`, `"$500k"`, `"42,000"`, `"checklist-7-3-exchange-vip-event-audit"`, `"MED-7.3-01"`..`"04"`.<br>• **Bài `7.4` (`vi` & `en`)**: `"Heavy Cavalry"`, `"Divine Spirit"`, `"Desert Knight"`, `"Tree Spirit"`, `"Brave Fighter"`, `"Skeleton Soldier"`, `"Honor Guard"`, `"Siege Vehicle"`, `"Samurai"`, `"Bearskin Warrior"`, `"Logistic Follower"`, `"Shield Soldier"`, `"+14.38%"`, `"+21.46%"`, `"+11.49%"`, `"+19.24%"`, `"80,400"`, `"40,200"`, `"20,100"`, `"948,400"`, `"1,155,400"`, `"474,200"`, `"577,700"`, `"4,259,400"`, `"4,791,400"`, `"10,960,400"`, `"11,832,400"`, `"20,845,400"`, `"10,422,700"`, `"5,211,350"`, `"28,345,400"`, `"14,172,700"`, `"7,086,350"`, `"2,411,200"`, `"checklist-7-4-troop-skin-medal-audit"`, `"MED-7.4-01"`..`"04"`.<br>• **`searchGuides()` (`7.1`–`7.4`)**: `"cua hang dau truong"`, `"arena shop"`, `"hon da do"`, `"soul stone"`, `"tiem doi manh"`, `"deluxe choice chest"`, `"huy chuong vinh quang"`, `"heavy cavalry"`. |
| **[group-8-content.test.ts](file:///d:/GitHub/top-hero/tophub-web/tests/group-8-content.test.ts)** | `8.1` ➔ `8.4` | • **Negative Assertions**: `8.1` cấm khớp `/18[.,]500\s*DE/i` & `/64[.,]000\+?\s*DE/i`; `8.4` cấm khớp `/8\.37M/i`.<br>• **Bài `8.1` (`vi` & `en`)**: `"Training Ground"`, `"Research Cottage"`, `"Hospital"`, `"Bard"`, `"+40%"`, `"Brawler"`, `"+30%"`, `"Shaman"`, `"19,950"`, `"22,800"`, `"26.6M"`, `"8.36M"`, `"139M"`, `"51.8M"`, `"490M"`, `"500M"`, `"165M"`, `"82M"`, `"417M"`, `"142.8M"`, `"126"`, `"630"`, `"151"`, `"755"`, `"227"`, `"1,135"`, `"303"`, `"1,515"`, `"388"`, `"1,940"`, `"485"`, `"2,425"`, `"8,400"`, `"1,238.8M"`, `"4,931.8M"`, `"745"`, `"4,677"`, `"5,422"`, `"288"`, `"castle-rush-weekly-audit-v2"`, `"MED-8.1-01"`..`"04"`.<br>• **Bài `8.2` (`vi` & `en`)**: `"Bard"`, `"Brawler"`, `"Shaman"`, `"Knight"`, `"Hostess"`, `"Ranger"`, `"Rogue"`, `"Outlaw"`, `"Headhunter"`, `"Stonemason"`, `"Treeguard"`, `"Minister"`, `"Priestess"`, `"Dancer"`, `"+0.60%"`, `"+3.20%"`, `"40s"`, `"360s"`, `"432s"`, `"160s"`, `"+17.50%"`, `"+5.60%"`, `"+4.40%"`, `"+13"`, `"+2,100"`, `"+57.50%"`, `"+143.75%"`, `"16,560s"`, `"builder-villager-daily-audit-v2"`, `"MED-8.2-01"`..`"04"`.<br>• **Bài `8.3` (`vi` & `en`)**: `"Arms Race Prep"`, `"Commendation"`, `"Extra Rewards"`, `"Double Rewards"`, `"200%"`, `"Combat Expertise"`, `"Peacekeeper"`, `"Euclidean"`, `"Desert Prince"`, `"Wukong"`, `"Storm Maiden"`, `"Paragon"`, `"Pyromancer"`, `"Tidecaller"`, `"Ne Zha"`, `"Pixie"`, `"Adjudicator"`, `"Secretary of Science"`, `"24 DE"`, `"197"`, `"394"`, `"292"`, `"584"`, `"390"`, `"193"`, `"290"`, `"580"`, `"482"`, `"1,158"`, `"2,316"`, `"770"`, `"1,444"`, `"2,888"`, `"288"`, `"4,677"`, `"1,152"`, `"461"`, `"723"`, `"374"`, `"441"`, `"95.3%"`, `"36.6%"`, `"24.8%"`, `"research-snapshot-baiting-audit-v2"`, `"MED-8.3-01"`..`"04"`.<br>• **Bài `8.4` (`vi` & `en`)**: `"500"`, `"1,000"`, `"280"`, `"560"`, `"24,700"`, `"8,000"`, `"345"`, `"385"`, `"21,000"`, `"60,000"`, `"118,500"`, `"195,000"`, `"780,000"`, `"4,680,000"`, `"936,000"`, `"5,422"`, `"1,181.162M"`, `"1,307"`, `"+4,908"`, `"+96,200"`, `"+20.00%"`, `"6,000"`, `"500K"`, `"1,185"`, `"920"`, `"958,800"`, `"9,955"`, `"2,030"`, `"101"`, `"+41.45%"`, `"+113.95%"`, `"+14.40%"`, `"+20.75%"`, `"+43.15%"`, `"+38.00%"`, `"+15,091"`, `"+191,019"`, `"+722,271"`, `"+17,753"`, `"+108,500"`, `"+14,000"`, `"596,600"`, `"596,850"`, `"3,525"`, `"714,000"`, `"40,050"`, `"36.00%"`, `"96.00%"`, `"80,400"`, `"40,200"`, `"20,100"`, `"948,400"`, `"1,155,400"`, `"4,259,400"`, `"4,791,400"`, `"10,960,400"`, `"11,832,400"`, `"20,845,400"`, `"28,345,400"`, `"14,172,700"`, `"7,086,350"`, `"+14.38%"`, `"+21.46%"`, `"+11.49%"`, `"+19.24%"`, `"$1.00"`, `"$50.00"`, `"$166.70"`, `"$1,000.00"`, `"$5,000.00"`, `"$33,670.00"`, `"200,000"`, `"3,000,000"`, `"$500,000.00"`, `"250,000"`, `"180,000"`, `"156,000"`, `"327,660"`, `"master-tables-reverse-budget-audit-v2"`, `"MED-8.4-01"`..`"04"`.<br>• **`searchGuides()` (`8.1`–`8.4`)**: `"vien huy hoang"`, `"brilliance institute"`, `"dan lang"`, `"gift box banking"`, `"moi nhu pha tuyen"`, `"formation tank baiting"`, `"bang so lieu"`, `"master data tables"`. |

---

### 1.3. Ràng Buộc Trích Xuất Dữ Liệu Của Các Interactive Widgets (`Widget SSoT Invariants` — `GAP-W4-02`, `GAP-W4-03`, `GAP-W4-04`, `GAP-W4-09`)

| Widget Component | Bài Viết SSoT | Cơ Chế Trích Xuất (`Extractor Logic`) | Quy Tắc Bảo Toàn Khi Biên Tập Ở Wave 4 |
| :--- | :---: | :--- | :--- |
| **[BlacksmithAnvilMatrixWidget](file:///d:/GitHub/top-hero/tophub-web/src/components/guides/widgets/blacksmith-anvil-matrix-widget.tsx)** | `5.2-golden-gear-sets.ts` | • Nhúng qua `widgetType: "blacksmith_anvil_matrix"` tại `sec-1-three-golden-sets-and-three-stat-layers`.<br>• Đọc `sec-4-twenty-four-hero-gear-matrix` (`sub-4-1-tank-frontline-bis-table`, `sub-4-2-carry-dps-bis-table`, `sub-4-3-support-healer-bis-table` — tổng 24 dòng).<br>• Dùng `detectFaction(row[0][locale])` với regex `/Horde\|Bộ Lạc\|🔴/i` và `/Nature\|Thiên Nhiên\|🟢/i`.<br>• Dùng `detectSetKey(row[1][locale])` với regex `/Titan\|Huyết/i` và `/Sage\|Hiền Triết/i`. | 1. Khi xóa Emoji `🔵`, `🔴`, `🟢`, `🩸`, `⚡`, `⚔️` khỏi 3 bảng (`6` + `8` + `10` = `24` hàng), **bắt buộc giữ nguyên tên hệ `"Liên Minh (League)"`, `"Bộ Lạc (Horde)"`, `"Thiên Nhiên (Nature)"` trong `row[0]`**.<br>2. Giữ nguyên tên bộ trang bị (`"Blood of the Titan"` / `"Huyết Titan"`, `"Glory of the Sage"` / `"Hiền Triết"`, `"Knight's Glory"` / `"Kỵ Sĩ"`) trong `row[1]` và `row[2]`. |
| **[ShopSafetyFloorWidget](file:///d:/GitHub/top-hero/tophub-web/src/components/guides/widgets/shop-safety-floor-widget.tsx)** | `7.1-shops-tier-list.ts` | • Nhúng qua `widgetType: "shop_safety_floor_explorer"` tại `overview-and-mechanics`.<br>• Đọc 13 dòng của bảng `sub-1-2-thirteen-shops-master-map` trong `sec-1`: `row[0]` (`index`), `row[1]` (`shopName`), `row[2]` (`currencySource`), `row[3]` (`architectureTier` khớp `/Static\|Tĩnh/i` & `/Event\|Sự kiện/i`), `row[4]` (`resetCycle`) được render bằng **plain text** (chỉ `row[5]` dùng `<RichGuideText />`).<br>• Đọc 16 dòng của bảng `sub-4-1-diamond-equivalent-roi-matrix` trong `sec-4`: `row[0]` (`tier` khớp `/^S\+|^S\b\|Must-Buy\|Core Buy/i` & `/^F\b\|Trap\|Cấm/i`) render bằng **plain text**, và `row[2]` (`shopSource`) dùng để khớp từ khóa `roiKeywords`. | 1. Trong bảng `sub-1-2-thirteen-shops-master-map` (13 dòng): **TUYỆT ĐỐI KHÔNG bọc `**` hay `` ` `` vào cột `row[0]..row[4]`**.<br>2. Trong bảng `sub-4-1-diamond-equivalent-roi-matrix` (16 dòng): **TUYỆT ĐỐI KHÔNG bọc `**` hay `` ` `` vào cột `row[0]` (`tier`) và `row[2]` (`shopSource`)**; giữ nguyên chuỗi đầu dòng `"S+ (Must-Buy)"`, `"S (Core Buy)"`, `"F (Trap — Cấm Mua)"`. |
| **[MasterDataExplorerWidget](file:///d:/GitHub/top-hero/tophub-web/src/components/guides/widgets/master-data-explorer-widget.tsx)** | `8.4-master-data-tables.ts` | • Trích xuất 12 bảng từ `sec-1` (`sub-1-1-hero-star-and-skill-books-table`..`sub-1-4`), `sec-3-master-tables-common-pitfalls`, và `sec-4` (`sub-4-1`..`sub-4-7`).<br>• Render `sub.title` / `sec3.title` dưới dạng **plain text** trong `<h4>{selectedTable.fullTitle}</h4>` và truyền `tableBlock` vào `<ResponsiveDataTable />`. | 1. Giữ nguyên 100% cấu trúc 12 bảng (`3`, `5`, `4`, `7`, `2`, `18`, `5`, `10`, `12`, `18`, `20`, `16` hàng) và các ID `sub-1-1`..`sub-4-7`.<br>2. Xóa Emoji `🐣`, `💂‍♀️` khỏi `sub-4-5.title` và `sub-4-6.title`; **CẤM bọc `**` hay `` ` `` vào `sec.title` hoặc `sub.title`**.<br>3. Thay thế `🔥`, `👑`, `🌟`, `⭐` trong 12 bảng bằng ký hiệu `★` (`\u2605`) để giữ hiệu ứng tô sáng dòng Điểm gãy. |

---

## 2. Đặc Tả Quy Chuẩn Biên Tập Phân Lớp (`Wave 4 Editorial Transformation Rules`)

### 2.1. Công thức 1: Khối `tldr` (`coreRule`, `immediateAction`, `strictTaboo`)
`TldrActionBox` truyền dữ liệu vào `<RichGuideText variant="structured-brief" />`. Khi chuỗi có ký tự xuống dòng `\n` và dòng đầu tiên không bắt đầu bằng `•`, `<RichGuideText />` tự động render **Dòng 0 làm tiêu đề mở đầu in đậm (`font-semibold text-foreground mb-2`)** và các dòng `\n•` tiếp theo làm danh sách micro-bullets có chấm tròn màu theo đúng tone (`amber` / `emerald` / `rose`).

- **Cấu trúc bắt buộc (cả `vi` và `en`)**:
  ```
  **[Câu kết luận cốt lõi ngắn gọn <= 150 ký tự, chứa từ khóa/con số chính]**
  • **[Nhãn hành động/Hệ thống 1]:** [Chi tiết định lượng có bọc `con số/mốc điểm gãy` và mũi tên ➔, độ dài dòng <= 210 ký tự]
  • **[Nhãn hành động/Hệ thống 2]:** [Chi tiết định lượng có bọc `con số/mốc điểm gãy` và mũi tên ➔, độ dài dòng <= 210 ký tự]
  ```
- **Ràng buộc định lượng**:
  - Bắt buộc có ít nhất `1` dấu `\n•` (tối thiểu 2 dòng: 1 Lead Sentence + 1–3 Micro-bullets).
  - Độ dài mỗi dòng đơn lẻ (tách theo `\n`) **bắt buộc `<= 220` ký tự**.
  - Có ít nhất `1` cụm `**bold**` và `1` nhãn `` `code` `` trong mỗi trường `coreRule`, `immediateAction`, `strictTaboo`.

### 2.2. Công thức 2: Khối `keyTakeaways` (Tóm Tắt Cốt Lõi — Đang có các mục dài tới `1,090` ký tự ở `8.4`)
- Mỗi mục bắt đầu bằng **`**[Nhãn Kết Luận Ngắn 3–7 từ]:**`** theo sau là mệnh đề giải thích súc tích có bọc `` `số liệu/điểm gãy` ``.
- Vì tất cả `49/49` mục `keyTakeaways` của Nhóm 5–8 đều vượt quá `220` ký tự (lên tới `731`c ở `5.2`, `787`c ở `5.3`, `807`c ở `8.3`, `1,090`c ở `8.4`), bắt buộc tách mỗi mục thành **1 câu Lead in đậm + `\n•` từ 2 đến 5 micro-bullets**, đảm bảo không có dòng đơn lẻ nào vượt quá `220` ký tự mà vẫn bảo toàn 100% số liệu SSoT.

### 2.3. Công thức 3: Khối `paragraph`, `callout`, `roadmap.steps.description`, `checklist.items.detail`, và `case_study`
- Tất cả các trường văn bản khối dài (`paragraph.text`, `callout.content`, `roadmap.steps.description`, `checklist.items.detail`, `case_study.profileSummary`, `case_study.diagnostics`, `case_study.recoverySteps.detail`, `case_study.conclusion`) đều được render qua `<RichGuideText />` (`variant="default"` hoặc `variant="structured-brief"`).
- Mọi trường có dòng đơn lẻ `> 220` ký tự phải được tách thành **1 câu chủ đề (`**Bold Lead**`)** + **`\n•` các gạch đầu dòng phân tích ngắn (`<= 220` ký tự/dòng)**, bọc số liệu trong `` `code` `` và dùng mũi tên `➔`.

### 2.4. Công thức 4: Khối `list.items`, `table`, `subSection`, `visual_diagram`, `media_spotlight`
- **Quy tắc 1 dòng cho `list.items`**:
  - Vì `GuideArticleRenderer` render `<ol>` (`ordered: true`) bằng `<RichGuideText variant="inline" />`, **tuyệt đối không dùng `\n•` bên trong `list.items`**.
  - Mỗi phần tử `list.items[i]` phải được biên tập súc tích thành **1 dòng đơn duy nhất `<= 220` ký tự**, mở đầu bằng `**Cụm Chủ Ngữ / Hành Động:**` + nội dung định lượng có bọc `` `code` `` (bảo toàn 100% số liệu và chuỗi neo).
- **Quy tắc bảo toàn Breakpoint Highlight trong `table.rows` (`GAP-W4-04`)**:
  - Khi xóa Emoji `🔥`, `👑`, `⭐`, `🌟` ở các dòng Điểm gãy / Hạng S+ trong bảng, nếu dòng đó chưa chứa từ khóa `Mythic`, `Điểm gãy`, `Breakpoint`, `Mốc gãy`, hãy thêm ký hiệu ngôi sao đơn sắc `★` (`\u2605`, ví dụ `"[S+ ★]"`, `"Lv.10 ★"`, `"VIP 4 ★"`) để `isBreakpointRow(row)` vẫn trả về `true` và hiển thị icon `<Flame />` chuẩn thiết kế.
- **Quy tắc Zero Pictographic Emoji & Zero Orphaned ZWJ/VS16 (`DEC-V4-02` & `GAP-W4-01`)**:
  - Xóa triệt để toàn bộ **455 (`vi`) / 455 (`en`)** chuỗi chứa Emoji khớp `/(?!\u2605)[\p{Emoji_Presentation}\p{Extended_Pictographic}]/u` VÀ xóa sạch mọi ký tự nối/biến thể đi kèm (`\u200D`, `\uFE0F`, `\u2640`, `\u2642`) trên mọi trường văn bản của 15 bài viết.

---

### 2.5. Tiêu Chí Nghiệm Thu Đơn Nguyên (`Atomic Acceptance Criteria`)

- **`AC-W4-01` (100% Layered TL;DR Briefs)**: Cả `45/45` trường `tldr` (`coreRule`, `immediateAction`, `strictTaboo` trên 15 bài viết Nhóm 5–8, ở cả `vi` và `en`) đều chứa ít nhất 1 dấu tách dòng `\n•`, có câu mở đầu in đậm `**...**`, có ít nhất 1 nhãn số liệu `` `...` ``, và mọi dòng đơn lẻ (tách theo `\n`) đều có độ dài `<= 220` ký tự.
- **`AC-W4-02` (100% Scannable Key Takeaways)**: Toàn bộ `49/49` mục `keyTakeaways` trên 15 bài viết (cả `vi` và `en`) đều mở đầu bằng cụm `**...**`, chứa ít nhất 1 nhãn định lượng/thuật ngữ `` `...` ``, và không có bất kỳ dòng đơn lẻ nào dài quá `220` ký tự.
- **`AC-W4-03` (Zero Wall-of-Text Across All Prose Blocks + Single-Line `list.items`)**:
  1. Không còn bất kỳ trường nào trong `paragraph.text`, `callout.content`, `roadmap.steps.description`, `checklist.items.detail`, hay `case_study` (`profileSummary`, `diagnostics`, `recoverySteps.detail`, `conclusion`) có dòng đơn lẻ (tách theo `\n`) vượt quá `220` ký tự.
  2. Mọi phần tử trong `list.items` (`120/120` mục) là 1 dòng đơn (`!item.includes("\n")`) có độ dài `<= 220` ký tự và chứa `**...**`.
- **`AC-W4-04` (Zero Decorative/Status Emojis & Zero Orphaned ZWJ/Gender Symbols Anywhere in Article Data — `DEC-V4-02` & `GAP-W4-01`)**: Quét toàn bộ 15 bài viết bằng biểu thức chính quy Unicode `/(?!\u2605)[\p{Emoji_Presentation}\p{Extended_Pictographic}]|[\u200D\uFE0F\u2640\u2642]/u` trên tất cả các trường văn bản của `GuideArticle` và cả 10 loại `GuideContentBlock` trả về **0 vi phạm** (`455 ➔ 0` ở `vi` và `455 ➔ 0` ở `en`).
- **`AC-W4-05` (100% SSoT Structural, Widget, Search & Zero-Personalization Integrity — `GAP-W4-02`..`GAP-W4-09`)**: Bảo toàn 100% số lượng `freeSections` (`3`), `proSections` (`2`), `sec.id`, `sub.id`, `table.rows.length` trên toàn bộ `53` bảng, `checklist.checklistId`, `media_spotlight.mediaCode`, `widget.widgetType` (`blacksmith_anvil_matrix`, `shop_safety_floor_explorer`, `master_data_explorer`), `28` truy vấn `searchGuides()`, cổng `Zero-Personalization` (cấm `/Castle\s*40\b/i`, `/\bVIP\s*9\b/i`, v.v.), và hợp đồng plain-text của 3 Widgets; toàn bộ 33+ bộ test Vitest và `pnpm build` đều PASS 100%.

---

## 3. Kế Hoạch Triển Khai Chi Tiết Theo Từng Task (Bite-Sized TDD Tasks)

### Task 1: Xây dựng Bộ Test Kiểm Định Độ Súc Tích, Phân Lớp, Zero-Emoji/ZWJ & Bảo Toàn Cấu Trúc SSoT (`TDD Red Gate`)

**Files:**
- Create: `tophub-web/tests/wave4-content-scannability.test.ts`

- [ ] **Step 1.1: Tạo file test `tophub-web/tests/wave4-content-scannability.test.ts` khớp 100% kiểu tĩnh `src/content/guides/types.ts` để kiểm định `AC-W4-01` ➔ `AC-W4-05` (bao gồm cả cổng `GAP-W4-01` ➔ `GAP-W4-09`)**

```ts
// tophub-web/tests/wave4-content-scannability.test.ts
import { describe, expect, it } from "vitest";
import {
  getAllCategories,
  getArticleBySlug,
  searchGuides,
} from "../src/content/guides/registry";
import type {
  GuideArticle,
  GuideContentBlock,
  GuideLocale,
  VisualDiagramNode,
} from "../src/content/guides/types";

const WAVE4_CATEGORIES = getAllCategories().filter(
  (c) => c.order >= 5 && c.order <= 8
);
const WAVE4_ARTICLES: GuideArticle[] = WAVE4_CATEGORIES.flatMap(
  (c) => c.articles
);
const LOCALES: GuideLocale[] = ["vi", "en"];

// Matches any color/pictographic emoji OR orphaned ZWJ/Variation Selector/gender symbol while allowing monochrome star '★' (\u2605)
const FORBIDDEN_EMOJI_REGEX =
  /(?!\u2605)[\p{Emoji_Presentation}\p{Extended_Pictographic}]|[\u200D\uFE0F\u2640\u2642]/u;

// Zero-Personalization & Hallucination Gate across Groups 5-8 (GAP-W4-08)
const FORBIDDEN_PERSONALIZATION_PATTERNS = [
  /\[GAS\]Max/i,
  /10956/,
  /10766/,
  /Tập đoàn/i,
  /Kịch bản/i,
  /Sếp/i,
  /chúng ta/i,
  /các bạn/i,
  /acc của anh/i,
  /tài khoản của anh/i,
  /account của bạn/i,
  /acc của bạn/i,
  /nick của bạn/i,
  /cá nhân mình/i,
  /theo kinh nghiệm của mình/i,
  /\bVIP\s*9\b/i,
  /Castle\s*40\b/i,
];

function assertMaxLineLength(
  text: string | undefined,
  maxChars: number,
  contextLabel: string
) {
  if (!text) return;
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  for (const [idx, line] of lines.entries()) {
    expect(
      line.length,
      `${contextLabel} [line ${idx + 1}] exceeds ${maxChars} chars (${line.length} chars): "${line.slice(0, 80)}..."`
    ).toBeLessThanOrEqual(maxChars);
  }
}

describe("Wave 4 — Content Restructuring, Scannability & Zero-Emoji Gate (Groups 5–8, 15 Articles)", () => {
  it("AC-W4-05: preserves exact category, article, section, checklistId, table row counts, widget contracts, search queries, and zero-personalization gates across Groups 5–8", () => {
    expect(WAVE4_CATEGORIES.length).toBe(4);
    expect(WAVE4_ARTICLES.length).toBe(15);

    const expectedMeta: Record<
      string,
      { checklistId: string; tableRows: number[] }
    > = {
      "5.1": {
        checklistId: "gear-overview-daily-audit-v2",
        tableRows: [5, 4],
      },
      "5.2": {
        checklistId: "golden-gear-faction-mark-audit-v2",
        tableRows: [6, 8, 10],
      },
      "5.3": {
        checklistId: "enhancement-resonance-audit-v2",
        tableRows: [4, 6, 20, 5],
      },
      "5.4": {
        checklistId: "lord-gear-staggered-audit-v2",
        tableRows: [2, 14],
      },
      "6.1": {
        checklistId: "runes-guide-weekly-audit-v2",
        tableRows: [6, 8, 12, 2],
      },
      "6.2": {
        checklistId: "relics-guide-weekly-audit-v2",
        tableRows: [3, 3, 20, 6],
      },
      "6.3": {
        checklistId: "pets-behemoth-weekly-audit-v2",
        tableRows: [3, 19, 14, 6],
      },
      "7.1": {
        checklistId: "checklist-7-1-weekly-shop-routine",
        tableRows: [13, 4, 16],
      },
      "7.2": {
        checklistId: "checklist-7-2-guild-honor-freeze",
        tableRows: [4, 5, 3],
      },
      "7.3": {
        checklistId: "checklist-7-3-exchange-vip-event-audit",
        tableRows: [4, 16, 7],
      },
      "7.4": {
        checklistId: "checklist-7-4-troop-skin-medal-audit",
        tableRows: [11, 4, 34],
      },
      "8.1": {
        checklistId: "castle-rush-weekly-audit-v2",
        tableRows: [3, 3, 32, 7],
      },
      "8.2": {
        checklistId: "builder-villager-daily-audit-v2",
        tableRows: [4, 2, 3, 14],
      },
      "8.3": {
        checklistId: "research-snapshot-baiting-audit-v2",
        tableRows: [5, 3, 17],
      },
      "8.4": {
        checklistId: "master-tables-reverse-budget-audit-v2",
        tableRows: [3, 5, 4, 7, 2, 18, 5, 10, 12, 18, 20, 16],
      },
    };

    for (const art of WAVE4_ARTICLES) {
      expect(art.freeSections.length, `${art.code} freeSections`).toBe(3);
      expect(art.proSections.length, `${art.code} proSections`).toBe(2);

      const allBlocks: GuideContentBlock[] = [
        ...art.freeSections,
        ...art.proSections,
      ].flatMap((s) => [
        ...s.blocks,
        ...(s.subSections ?? []).flatMap((sub) => sub.blocks),
      ]);

      const checklists = allBlocks.filter((b) => b.type === "checklist");
      expect(checklists.length, `${art.code} checklist count`).toBe(1);
      if (checklists[0]?.type === "checklist") {
        expect(checklists[0].checklistId, `${art.code} checklistId`).toBe(
          expectedMeta[art.code].checklistId
        );
      }

      const tableRowCounts = allBlocks
        .filter(
          (b): b is Extract<GuideContentBlock, { type: "table" }> =>
            b.type === "table"
        )
        .map((t) => t.rows.length);
      expect(tableRowCounts, `${art.code} table row counts`).toEqual(
        expectedMeta[art.code].tableRows
      );

      // Zero-Personalization Gate per article (GAP-W4-08)
      const rawJson = JSON.stringify(art);
      for (const pattern of FORBIDDEN_PERSONALIZATION_PATTERNS) {
        expect(
          rawJson,
          `${art.code} triggered forbidden pattern ${pattern}`
        ).not.toMatch(pattern);
      }
    }

    // Verify 7.1 ShopSafetyFloorWidget plain-text cell contract (GAP-W4-03)
    const art71 = getArticleBySlug("economy", "shops-tier-list")!;
    const sub12 = art71.freeSections[0].subSections?.find(
      (s) => s.id === "sub-1-2-thirteen-shops-master-map"
    );
    const tbl12 = sub12?.blocks.find((b) => b.type === "table");
    if (tbl12?.type === "table") {
      tbl12.rows.forEach((row, rIdx) => {
        for (let c = 0; c <= 4; c++) {
          for (const loc of LOCALES) {
            expect(
              row[c][loc],
              `7.1 sub-1-2 row[${rIdx}][${c}].${loc} must be plain text without ** or \``
            ).not.toMatch(/\*\*|`/);
          }
        }
      });
    }
    const sub41 = art71.proSections[0].subSections?.find(
      (s) => s.id === "sub-4-1-diamond-equivalent-roi-matrix"
    );
    const tbl41 = sub41?.blocks.find((b) => b.type === "table");
    if (tbl41?.type === "table") {
      tbl41.rows.forEach((row, rIdx) => {
        for (const c of [0, 2]) {
          for (const loc of LOCALES) {
            expect(
              row[c][loc],
              `7.1 sub-4-1 row[${rIdx}][${c}].${loc} must be plain text without ** or \``
            ).not.toMatch(/\*\*|`/);
          }
        }
      });
    }

    // Verify 28 searchGuides() queries across Groups 5-8 (GAP-W4-07)
    const searchPairs: Array<{ q: string; loc: GuideLocale; slug: string }> = [
      { q: "huyết titan", loc: "vi", slug: "golden-gear-sets" },
      { q: "blood of the titan", loc: "en", slug: "golden-gear-sets" },
      { q: "bậc thầy cường hóa", loc: "vi", slug: "enhancement-and-mythic" },
      { q: "meteoric iron", loc: "en", slug: "enhancement-and-mythic" },
      { q: "lệch pha thông minh", loc: "vi", slug: "lord-gear-strategy" },
      { q: "sacred codex", loc: "en", slug: "lord-gear-strategy" },
      { q: "co ngu", loc: "vi", slug: "runes-guide" },
      { q: "combat skill level", loc: "en", slug: "runes-guide" },
      { q: "ap che sao", loc: "vi", slug: "relics-guide" },
      { q: "star rating suppression", loc: "en", slug: "relics-guide" },
      { q: "cu thu", loc: "vi", slug: "pets-and-behemoth" },
      { q: "covenant seals", loc: "en", slug: "pets-and-behemoth" },
      { q: "cua hang dau truong", loc: "vi", slug: "shops-tier-list" },
      { q: "arena shop", loc: "en", slug: "shops-tier-list" },
      { q: "hon da do", loc: "vi", slug: "guild-honor-freeze" },
      { q: "soul stone", loc: "en", slug: "guild-honor-freeze" },
      { q: "tiem doi manh", loc: "vi", slug: "exchange-and-vip-shops" },
      { q: "deluxe choice chest", loc: "en", slug: "exchange-and-vip-shops" },
      { q: "huy chuong vinh quang", loc: "vi", slug: "troop-skins-and-medals" },
      { q: "heavy cavalry", loc: "en", slug: "troop-skins-and-medals" },
      { q: "vien huy hoang", loc: "vi", slug: "castle-and-brilliance" },
      { q: "brilliance institute", loc: "en", slug: "castle-and-brilliance" },
      { q: "dan lang", loc: "vi", slug: "builder-queues-and-villagers" },
      { q: "gift box banking", loc: "en", slug: "builder-queues-and-villagers" },
      { q: "moi nhu pha tuyen", loc: "vi", slug: "research-and-baiting" },
      { q: "formation tank baiting", loc: "en", slug: "research-and-baiting" },
      { q: "bang so lieu", loc: "vi", slug: "master-data-tables" },
      { q: "master data tables", loc: "en", slug: "master-data-tables" },
    ];
    for (const sp of searchPairs) {
      expect(
        searchGuides(sp.q, sp.loc).some((a) => a.slug === sp.slug),
        `searchGuides("${sp.q}", "${sp.loc}") failed to match ${sp.slug}`
      ).toBe(true);
    }
  });

  describe("AC-W4-01: 3-Layer Scannable TL;DR Briefs (coreRule, immediateAction, strictTaboo)", () => {
    for (const article of WAVE4_ARTICLES) {
      it(`[${article.code} ${article.slug}] enforces Lead Sentence + \\n• micro-bullets (<= 220 chars/line) + **bold** + \`code\` in both vi and en`, () => {
        expect(article.tldr).toBeDefined();
        const tldr = article.tldr!;

        for (const field of [
          "coreRule",
          "immediateAction",
          "strictTaboo",
        ] as const) {
          for (const locale of LOCALES) {
            const val = tldr[field][locale].trim();
            const ctx = `${article.code} tldr.${field}.${locale}`;

            expect(
              val.includes("\n•"),
              `${ctx} must contain "\\n•" micro-bullets`
            ).toBe(true);
            expect(val.includes("**"), `${ctx} must contain **bold**`).toBe(
              true
            );
            expect(
              val.includes("`"),
              `${ctx} must contain \`code\` metric pill`
            ).toBe(true);

            assertMaxLineLength(val, 220, ctx);
          }
        }
      });
    }
  });

  describe("AC-W4-02: Scannable Key Takeaways (**Bold Lead** + `Metric Pills` + <= 220 chars/line)", () => {
    for (const article of WAVE4_ARTICLES) {
      it(`[${article.code} ${article.slug}] formats all keyTakeaways with **bold** lead, \`code\` pills, and <= 220 chars/line`, () => {
        expect(article.keyTakeaways.length).toBeGreaterThanOrEqual(3);

        article.keyTakeaways.forEach((kt, idx) => {
          for (const locale of LOCALES) {
            const val = kt[locale].trim();
            const ctx = `${article.code} keyTakeaways[${idx}].${locale}`;

            expect(
              val.startsWith("**"),
              `${ctx} must start with a **Bold Lead**: "${val.slice(0, 40)}..."`
            ).toBe(true);
            expect(
              val.includes("`"),
              `${ctx} must include at least one \`code\` pill`
            ).toBe(true);
            assertMaxLineLength(val, 220, ctx);
          }
        });
      });
    }
  });

  describe("AC-W4-03: Zero Wall-of-Text Across All Prose Blocks & Single-Line List Items (<= 220 chars/line)", () => {
    for (const article of WAVE4_ARTICLES) {
      it(`[${article.code} ${article.slug}] keeps paragraph, callout, list, roadmap, checklist, and case_study lines <= 220 chars in vi and en`, () => {
        const allSecs = [...article.freeSections, ...article.proSections];

        for (const sec of allSecs) {
          const allBlocks: GuideContentBlock[] = [
            ...sec.blocks,
            ...(sec.subSections ?? []).flatMap((sub) => sub.blocks),
          ];

          for (const [bIdx, block] of allBlocks.entries()) {
            for (const locale of LOCALES) {
              const prefix = `${article.code} ${sec.id} block[${bIdx}](${block.type}).${locale}`;

              switch (block.type) {
                case "paragraph":
                  assertMaxLineLength(block.text[locale], 220, prefix);
                  break;
                case "callout":
                  assertMaxLineLength(block.content[locale], 220, prefix);
                  break;
                case "list":
                  block.items.forEach((item, iIdx) => {
                    const itemVal = item[locale].trim();
                    expect(
                      itemVal.includes("\n"),
                      `${prefix}.item[${iIdx}] must be a single line (no \\n inside list.items to protect <ol> inline rendering)`
                    ).toBe(false);
                    expect(
                      itemVal.includes("**"),
                      `${prefix}.item[${iIdx}] must contain **Bold Lead**`
                    ).toBe(true);
                    assertMaxLineLength(
                      itemVal,
                      220,
                      `${prefix}.item[${iIdx}]`
                    );
                  });
                  break;
                case "roadmap":
                  block.steps.forEach((st, sIdx) => {
                    assertMaxLineLength(
                      st.description[locale],
                      220,
                      `${prefix}.step[${sIdx}].description`
                    );
                  });
                  break;
                case "checklist":
                  block.items.forEach((it, iIdx) => {
                    assertMaxLineLength(
                      it.detail[locale],
                      220,
                      `${prefix}.item[${iIdx}].detail`
                    );
                  });
                  break;
                case "case_study":
                  assertMaxLineLength(
                    block.profileSummary[locale],
                    220,
                    `${prefix}.profileSummary`
                  );
                  assertMaxLineLength(
                    block.conclusion?.[locale],
                    220,
                    `${prefix}.conclusion`
                  );
                  (block.diagnostics ?? []).forEach((diag, dIdx) => {
                    assertMaxLineLength(
                      diag[locale],
                      220,
                      `${prefix}.diagnostics[${dIdx}]`
                    );
                  });
                  block.recoverySteps.forEach((step, sIdx) => {
                    assertMaxLineLength(
                      step.detail[locale],
                      220,
                      `${prefix}.recoverySteps[${sIdx}].detail`
                    );
                  });
                  break;
              }
            }
          }
        }
      });
    }
  });

  describe("AC-W4-04: Zero Pictographic/Status Emojis & Zero Orphaned ZWJ/VS16 Symbols Across All Fields (DEC-V4-02 & GAP-W4-01)", () => {
    for (const article of WAVE4_ARTICLES) {
      it(`[${article.code} ${article.slug}] contains 0 forbidden emojis or orphaned ZWJ/gender symbols across all text fields in vi and en`, () => {
        const violations: string[] = [];

        const checkEmoji = (str: string | undefined, label: string) => {
          if (!str) return;
          if (FORBIDDEN_EMOJI_REGEX.test(str)) {
            const match = str.match(FORBIDDEN_EMOJI_REGEX)?.[0] ?? "";
            violations.push(
              `${label} (found "${match}" U+${match
                .codePointAt(0)
                ?.toString(16)
                .toUpperCase()}): "${str.slice(0, 45)}"`
            );
          }
        };

        const checkDiagramNode = (
          node: VisualDiagramNode | undefined,
          label: string,
          locale: GuideLocale
        ) => {
          if (!node) return;
          checkEmoji(node.badge?.[locale], `${label}.badge.${locale}`);
          checkEmoji(node.title[locale], `${label}.title.${locale}`);
          checkEmoji(node.subtitle?.[locale], `${label}.subtitle.${locale}`);
          (node.metrics ?? []).forEach((m, mIdx) =>
            checkEmoji(m[locale], `${label}.metrics[${mIdx}].${locale}`)
          );
        };

        for (const locale of LOCALES) {
          checkEmoji(article.title[locale], `title.${locale}`);
          checkEmoji(article.summary[locale], `summary.${locale}`);

          if (article.tldr) {
            checkEmoji(article.tldr.coreRule[locale], `tldr.coreRule.${locale}`);
            checkEmoji(
              article.tldr.immediateAction[locale],
              `tldr.immediateAction.${locale}`
            );
            checkEmoji(
              article.tldr.strictTaboo[locale],
              `tldr.strictTaboo.${locale}`
            );
          }

          article.keyTakeaways.forEach((kt, i) =>
            checkEmoji(kt[locale], `keyTakeaways[${i}].${locale}`)
          );

          for (const sec of [...article.freeSections, ...article.proSections]) {
            checkEmoji(sec.title[locale], `sec(${sec.id}).title.${locale}`);
            const allBlocks: GuideContentBlock[] = [...sec.blocks];

            for (const sub of sec.subSections ?? []) {
              checkEmoji(sub.title[locale], `sub(${sub.id}).title.${locale}`);
              checkEmoji(sub.badge?.[locale], `sub(${sub.id}).badge.${locale}`);
              allBlocks.push(...sub.blocks);
            }

            for (const [bIdx, block] of allBlocks.entries()) {
              const bLabel = `${sec.id}.block[${bIdx}](${block.type})`;
              switch (block.type) {
                case "paragraph":
                  checkEmoji(block.text[locale], `${bLabel}.text.${locale}`);
                  break;
                case "callout":
                  checkEmoji(block.title[locale], `${bLabel}.title.${locale}`);
                  checkEmoji(
                    block.content[locale],
                    `${bLabel}.content.${locale}`
                  );
                  break;
                case "list":
                  block.items.forEach((it, idx) =>
                    checkEmoji(
                      it[locale],
                      `${bLabel}.items[${idx}].${locale}`
                    )
                  );
                  break;
                case "table":
                  checkEmoji(
                    block.caption?.[locale],
                    `${bLabel}.caption.${locale}`
                  );
                  checkEmoji(
                    block.footnote?.[locale],
                    `${bLabel}.footnote.${locale}`
                  );
                  block.headers.forEach((h, idx) =>
                    checkEmoji(
                      h[locale],
                      `${bLabel}.headers[${idx}].${locale}`
                    )
                  );
                  block.rows.forEach((r, rIdx) =>
                    r.forEach((c, cIdx) =>
                      checkEmoji(
                        c[locale],
                        `${bLabel}.rows[${rIdx}][${cIdx}].${locale}`
                      )
                    )
                  );
                  break;
                case "roadmap":
                  block.steps.forEach((st, sIdx) => {
                    checkEmoji(
                      st.badge[locale],
                      `${bLabel}.steps[${sIdx}].badge.${locale}`
                    );
                    checkEmoji(
                      st.title[locale],
                      `${bLabel}.steps[${sIdx}].title.${locale}`
                    );
                    checkEmoji(
                      st.timing[locale],
                      `${bLabel}.steps[${sIdx}].timing.${locale}`
                    );
                    checkEmoji(
                      st.description[locale],
                      `${bLabel}.steps[${sIdx}].description.${locale}`
                    );
                  });
                  break;
                case "visual_diagram":
                  checkEmoji(block.title[locale], `${bLabel}.title.${locale}`);
                  checkEmoji(
                    block.subtitle?.[locale],
                    `${bLabel}.subtitle.${locale}`
                  );
                  checkEmoji(
                    block.footnote?.[locale],
                    `${bLabel}.footnote.${locale}`
                  );
                  checkDiagramNode(
                    block.centerNode,
                    `${bLabel}.centerNode`,
                    locale
                  );
                  (block.nodes ?? []).forEach((n, nIdx) =>
                    checkDiagramNode(
                      n,
                      `${bLabel}.nodes[${nIdx}]`,
                      locale
                    )
                  );
                  (block.branches ?? []).forEach((br, brIdx) => {
                    checkEmoji(
                      br.title[locale],
                      `${bLabel}.branches[${brIdx}].title.${locale}`
                    );
                    checkEmoji(
                      br.badge?.[locale],
                      `${bLabel}.branches[${brIdx}].badge.${locale}`
                    );
                    checkEmoji(
                      br.outcome[locale],
                      `${bLabel}.branches[${brIdx}].outcome.${locale}`
                    );
                    br.steps.forEach((st, sIdx) =>
                      checkDiagramNode(
                        st,
                        `${bLabel}.branches[${brIdx}].steps[${sIdx}]`,
                        locale
                      )
                    );
                  });
                  break;
                case "checklist":
                  checkEmoji(block.title[locale], `${bLabel}.title.${locale}`);
                  checkEmoji(
                    block.description?.[locale],
                    `${bLabel}.description.${locale}`
                  );
                  block.items.forEach((it, iIdx) => {
                    checkEmoji(
                      it.label[locale],
                      `${bLabel}.items[${iIdx}].label.${locale}`
                    );
                    checkEmoji(
                      it.detail[locale],
                      `${bLabel}.items[${iIdx}].detail.${locale}`
                    );
                    checkEmoji(
                      it.badge?.[locale],
                      `${bLabel}.items[${iIdx}].badge.${locale}`
                    );
                  });
                  break;
                case "case_study":
                  checkEmoji(block.badge[locale], `${bLabel}.badge.${locale}`);
                  checkEmoji(block.title[locale], `${bLabel}.title.${locale}`);
                  checkEmoji(
                    block.profileSummary[locale],
                    `${bLabel}.profileSummary.${locale}`
                  );
                  checkEmoji(
                    block.conclusion?.[locale],
                    `${bLabel}.conclusion.${locale}`
                  );
                  (block.diagnostics ?? []).forEach((d, dIdx) =>
                    checkEmoji(
                      d[locale],
                      `${bLabel}.diagnostics[${dIdx}].${locale}`
                    )
                  );
                  block.recoverySteps.forEach((st, sIdx) => {
                    checkEmoji(
                      st.title[locale],
                      `${bLabel}.recoverySteps[${sIdx}].title.${locale}`
                    );
                    checkEmoji(
                      st.detail[locale],
                      `${bLabel}.recoverySteps[${sIdx}].detail.${locale}`
                    );
                    checkEmoji(
                      st.impactBadge?.[locale],
                      `${bLabel}.recoverySteps[${sIdx}].impactBadge.${locale}`
                    );
                  });
                  break;
                case "media_spotlight":
                  checkEmoji(block.title[locale], `${bLabel}.title.${locale}`);
                  checkEmoji(
                    block.description[locale],
                    `${bLabel}.description.${locale}`
                  );
                  (block.annotations ?? []).forEach((ann, aIdx) => {
                    checkEmoji(
                      ann.label[locale],
                      `${bLabel}.annotations[${aIdx}].label.${locale}`
                    );
                    checkEmoji(
                      ann.detail[locale],
                      `${bLabel}.annotations[${aIdx}].detail.${locale}`
                    );
                  });
                  break;
              }
            }
          }
        }

        expect(violations, `Forbidden emojis in ${article.code}`).toEqual([]);
      });
    }
  });
});
```

- [ ] **Step 1.2: Chạy Vitest để xác nhận trạng thái RED ban đầu trước khi biên tập**

Run:
```bash
pnpm --dir tophub-web test tests/wave4-content-scannability.test.ts
```
Expected: `AC-W4-05` PASS (`1 passed`), còn `AC-W4-01` ➔ `AC-W4-04` **FAIL** trên 15 bài viết (`60 failed` — đúng chuẩn TDD Red Gate).

---

### Task 2: Tái Cấu Trúc Nhóm 5 — Trang Bị Anh Hùng, Đồ Vàng & Trang Bị Chúa Tể (`5.1` ➔ `5.4`)

**Files:**
- Modify: `tophub-web/src/content/guides/groups/group-5/5.1-gear-overview.ts`
- Modify: `tophub-web/src/content/guides/groups/group-5/5.2-golden-gear-sets.ts`
- Modify: `tophub-web/src/content/guides/groups/group-5/5.3-enhancement-and-mythic.ts`
- Modify: `tophub-web/src/content/guides/groups/group-5/5.4-lord-gear-strategy.ts`
- Test: `tophub-web/tests/group-5-content.test.ts`, `tophub-web/tests/guides-phase4-micro-ux.test.tsx`, `tophub-web/tests/wave4-content-scannability.test.ts`

- [ ] **Step 2.1: Biên tập `5.1-gear-overview.ts` (`Tổng Quan Hệ Thống Trang Bị: Trang Bị Tướng vs. Chúa Tể`)**
  - **Chuỗi neo bắt buộc bảo toàn (`vi` & `en`)**: `"0"`, `"Lv.40"`, `"1★"`, `"5★"`, `"275"`, `"1,185"`, `"920"`, `"Brawler"`, `"+30%"`, `"gear-overview-daily-audit-v2"`. Không khớp các regex cấm của `Brawler`.
  - **Cập nhật `tldr` (`414`/`376`/`400`c), `keyTakeaways` (3), `paragraph` (3), `callout` (3), `roadmap.steps.description` (2), `case_study` (5)** bằng `\n•` (`<= 220` ký tự/dòng), và rút gọn **9 mục `list.items`** thành 1 dòng đơn `<= 220` ký tự (`**Bold Lead:** ...`).
  - **Xóa 7 chuỗi chứa Emoji (`vi` & `en`)**: `list.items` (1), `roadmap.steps` (2), `visual_diagram.centerNode.title` (1), `callout.content` (1), `case_study` (2).

- [ ] **Step 2.2: Biên tập `5.2-golden-gear-sets.ts` (`3 Bộ Trang Bị Huyền Thoại Vàng & Quy Tắc Đúc Đúng Dấu Hệ +30%`)**
  - **Chuỗi neo & Widget Invariants bắt buộc bảo toàn (`GAP-W4-02`, `GAP-W4-06`, `GAP-W4-09`)**: `"Blood of the Titan"`, `"Glory of the Sage"`, `"Knight's Glory"`, `"+160%"`, `"+6%"`, `"+40%"`, `"+80%"`, `"+8%"`, `"+30%"`, `"750"`, `"3,000"`, `"18,000"`, `"Adjudicator"`, `"Rose Princess"`, `"Desert Prince"`, `"Beastmaster"`, `"Monk"`, `"Sage"`, `"Paragon"`, `"Pyromancer"`, `"Wukong"`, `"Storm Maiden"`, `"Wilderness Hunter"`, `"Tidecaller"`, `"Ne Zha"`, `"Pixie"`, `"Nun"`, `"Bishop"`, `"Artificer"`, `"Bard"`, `"Witch"`, `"Soulmancer"`, `"Warlock"`, `"Shadow Priest"`, `"Forest Maiden"`, `"Petalis"`, `"blacksmith_anvil_matrix"`, `"golden-gear-faction-mark-audit-v2"`, `"sub-4-1-tank-frontline-bis-table"`, `"sub-4-2-carry-dps-bis-table"`, `"sub-4-3-support-healer-bis-table"`. Trong 3 bảng (`6` + `8` + `10` = `24` hàng), giữ nguyên `"Liên Minh (League)"`, `"Bộ Lạc (Horde)"`, `"Thiên Nhiên (Nature)"` ở `row[0]`.
  - **Cập nhật `tldr` (`515`/`442`/`205`c), `keyTakeaways` (3 — mục dài nhất `731`c ➔ tách thành Lead + 4 dòng `\n•`), `paragraph` (2), `callout` (2), `case_study` (5)** bằng `\n•` (`<= 220` ký tự/dòng), và rút gọn **17 mục `list.items`** thành 1 dòng đơn `<= 220` ký tự.
  - **Xóa 125 chuỗi chứa Emoji (`vi` & `en`)**: Xóa toàn bộ `🩸`, `⚡`, `⚔️`, `🔵`, `🔴`, `🟢`, `⚪`, `❌`, `✅` trên `tldr` (3), `keyTakeaways` (2), `media_spotlight` (7), `list.items` (15), `callout` (1), `checklist` (5), `visual_diagram` (9), `table.rows` (74), và `case_study` (9).

- [ ] **Step 2.3: Biên tập `5.3-enhancement-and-mythic.ts` (`Cường Hóa Cộng Hưởng Bậc +10, Đột Phá Đỏ 5★ & Vũ Khí Độc Quyền`)**
  - **Chuỗi neo bắt buộc bảo toàn (`vi` & `en`)**: `"21,000"`, `"100,800"`, `"504,000"`, `"+5,900"`, `"+74,000"`, `"60,000"`, `"288,000"`, `"118,500"`, `"568,800"`, `"195,000"`, `"936,000"`, `"780,000"`, `"3,744,000"`, `"4,680,000"`, `"22,464,000"`, `"62,500"`, `"81,250"`, `"100,000"`, `"118,750"`, `"137,500"`, `"1,650"`, `"6,000"`, `"500,000"`, `"23,980,000"`, `"575.52M"`, `"275"`, `"500"`, `"605"`, `"1,160"`, `"1,035"`, `"1,185"`, `"1,850"`, `"-2.30%"`, `"+18.50%"`, `"+37.00%"`, `"7,110"`, `"920"`, `"Wukong"`, `"Storm Maiden"`, `"Desert Prince"`, `"Beastmaster"`, `"Witch"`, `"Soulmancer"`, `"Warlock"`, `"Paragon"`, `"Pyromancer"`, `"Rose Princess"`, `"Adjudicator"`, `"Bishop"`, `"Artificer"`, `"Nun"`, `"Tidecaller"`, `"Ne Zha"`, `"Monk"`, `"Pixie"`, `"Petalis"`, `"Forest Maiden"`, `"enhancement-resonance-audit-v2"`.
  - **Cập nhật `tldr`, `keyTakeaways` (3 — mục dài nhất `787`c ➔ tách thành Lead + 4 dòng `\n•`), `paragraph` (3), `callout` (2), `roadmap.steps.description` (1), `case_study` (6)** bằng `\n•` (`<= 220` ký tự/dòng), và rút gọn **10 mục `list.items`** thành 1 dòng đơn `<= 220` ký tự.
  - **Xóa 24 chuỗi chứa Emoji (`vi` & `en`)**: Đổi `⭐`..`⭐⭐⭐⭐⭐` thành `1★`..`5★` trong Bảng 4.1 & 4.4, xóa `⚔️` trong `table.caption`, xóa `🗡️`, `🎯`, `🔥`, `⚡`, `👑` trong `visual_diagram` & Bảng 4.3 (dùng `"Lv.5 ★"`, `"Lv.10 ★"`, `"Lv.15 ★"`, `"Lv.20 ★"`), và xóa `🔴`, `🔵`, `🟢` ở `list.items` (3).

- [ ] **Step 2.4: Biên tập `5.4-lord-gear-strategy.ts` (`Chiến Lược Trang Bị Chúa Tể: Nhánh Phải Trước & Bậc Thang 6 Món`)**
  - **Chuỗi neo bắt buộc bảo toàn (`vi` & `en`)**: `"+41.45%"`, `"+113.95%"`, `"+14.40%"`, `"+18.70%"`, `"+38.90%"`, `"+34.25%"`, `"+20.75%"`, `"+43.15%"`, `"+38.00%"`, `"958,800"`, `"9,955"`, `"2,030"`, `"101"`, `"175"`, `"1,050"`, `"5,752,800"`, `"59,730"`, `"12,180"`, `"606"`, `"Sacred Codex"`, `"lord-gear-staggered-audit-v2"`.
  - **Cập nhật `tldr`, `keyTakeaways` (3), `paragraph` (2), `callout` (3), `roadmap.steps.description` (1), `case_study` (6)** bằng `\n•` (`<= 220` ký tự/dòng), và rút gọn **6 mục `list.items`** thành 1 dòng đơn `<= 220` ký tự.
  - **Xóa 25 chuỗi chứa Emoji (`vi` & `en`)**: Xóa `👉`, `👈`, `🔴`, `🔵`, `🟢`, `🟣`, `🟡`, `👑`, `⚔️`, `🎯`, `🔥` trên `callout`, `roadmap`, `checklist`, `visual_diagram`, `table`, `case_study`.

- [ ] **Step 2.5: Chạy kiểm thử xác nhận Nhóm 5 + Blacksmith Anvil Matrix Widget**

Run:
```bash
pnpm --dir tophub-web test tests/group-5-content.test.ts tests/guides-phase4-micro-ux.test.tsx tests/wave4-content-scannability.test.ts -t "5.1|5.2|5.3|5.4|Group 5|Blacksmith"
```
Expected: **PASS 100%** cho cả 4 bài `5.1` ➔ `5.4`.

---

### Task 3: Tái Cấu Trúc Nhóm 6 — Cổ Ngữ, Thánh Vật, Thú Cưng & Cự Thú (`6.1` ➔ `6.3`)

**Files:**
- Modify: `tophub-web/src/content/guides/groups/group-6/6.1-runes-guide.ts`
- Modify: `tophub-web/src/content/guides/groups/group-6/6.2-relics-guide.ts`
- Modify: `tophub-web/src/content/guides/groups/group-6/6.3-pets-and-behemoth.ts`
- Test: `tophub-web/tests/group-6-content.test.ts`, `tophub-web/tests/wave4-content-scannability.test.ts`

- [ ] **Step 3.1: Biên tập `6.1-runes-guide.ts` (`Cổ Ngữ: 6 Ô Khảm, Kỷ Luật Rương Tự Chọn & Toán Học 3^(n-1)`)**
  - **Chuỗi neo bắt buộc bảo toàn (`vi` & `en`)**: `"Hero HP Rune"`, `"Hero Attack Rune"`, `"Soldier HP Rune"`, `"Soldier Attack Rune"`, `"Relic Mastery Rune"`, `"Queue Attack Rune"`, `"81"`, `"243"`, `"729"`, `"2,187"`, `"8,000"`, `"48,000"`, `"25,000"`, `"150,000"`, `"225,000"`, `"1,350,000"`, `"15,091"`, `"40,616"`, `"191,019"`, `"722,271"`, `"371"`, `"999"`, `"4,696"`, `"17,753"`, `"28,660"`, `"108,500"`, `"3,845"`, `"6,922"`, `"14,000"`, `"Combat Skill Level"`, `"3,000"`, `"5,000"`, `"600"`, `"1,200"`, `"Arcane Crystal"`, `"runes-guide-weekly-audit-v2"`, `"MED-6.1-01"`..`"04"`.
  - **Cập nhật `tldr` (`412`/`471`/`370`c), `keyTakeaways` (3 — max `626`c), `paragraph` (4), `callout` (2), `roadmap.steps.description` (3), `case_study` (4)** bằng `\n•` (`<= 220` ký tự/dòng), và rút gọn **3 mục `list.items`** thành 1 dòng đơn `<= 220` ký tự.
  - **Xóa 19 chuỗi chứa Emoji (`vi` & `en` — `GAP-W4-01`)**: Xóa sạch `🀄️` (`\u{1F004}\uFE0F`), `👑`, `🔴`, `🔵`, `🟢`, và đổi `Lv.5 🔥`, `Lv.6 ⭐`, `Lv.8 👑` thành `Lv.5 ★`, `Lv.6 ★`, `Lv.8 ★`.

- [ ] **Step 3.2: Biên tập `6.2-relics-guide.ts` (`Thánh Vật: Ma Trận 3 Ô BiS, Bảng 20 Cấp Sao & Lịch Xả Điểm`)**
  - **Chuỗi neo & Regex cùng dòng bắt buộc bảo toàn (`GAP-W4-05`, `GAP-W4-06`)**: `"-50%"`, `"4,810"`, `"3,130"`, `"1,800"`, `"+6.00%"`, `"+12.00%"`, `"+20.00%"`, `"+40.00%"`, `"130"`, `"330"`, `"490"`, `"1,100"`, `"Thunder Judgment"`, `"Dragonheart"`, `"Dragonbone Amulet"`, `"Petrification Staff"`, `"Soul Guard Orb"`, `"Feather of the Pact"`, `"Vineborne Bow"`, `"Undefeated Crown"`, `"Sacred Scroll"`, `"Frost Diadem"`, `"Duke's Signet Ring"`, `"Scale of Injustice"`, `"Eternal Wings"`, `"Moonstone"`, `"1,500"`, `"5,000"`, `"Guild Rush"`, `"relics-guide-weekly-audit-v2"`, `"MED-6.2-01"`..`"04"`. Giữ mệnh đề khớp `/GAR.*không tính điểm.*Ngày 5/i` (`vi`) và `/GAR.*does NOT score.*Day 5/i` (`en`) nằm trọn vẹn trên **cùng 1 dòng**.
  - **Cập nhật `tldr` (`513`/`485`/`560`c), `keyTakeaways` (3 — max `643`c), `paragraph` (3), `callout` (3), `roadmap.steps.description` (3), `checklist.items.detail` (1), `case_study` (6)** bằng `\n•` (`<= 220` ký tự/dòng), và rút gọn **4 mục `list.items`** thành 1 dòng đơn `<= 220` ký tự.
  - **Xóa 16 chuỗi chứa Emoji (`vi` & `en`)**: Xóa `👑`, `🔴`, `🔵`, `🟢`, `🔥`, `🛡️`, `🌿` (thêm `"★"` vào các dòng Bậc 1..4 Sao 5 để giữ `isBreakpointRow`).

- [ ] **Step 3.3: Biên tập `6.3-pets-and-behemoth.ts` (`Thú Cưng Season 1 & Cự Thú Season 3: Tiến Hóa 3x & 6,346 Ấn Giao Ước`)**
  - **Chuỗi neo & Regex cùng dòng bắt buộc bảo toàn (`GAP-W4-05`, `GAP-W4-06`)**: `"36.00%"`, `"60.00%"`, `"84.00%"`, `"96.00%"`, `"104.00%"`, `"Eggy"`, `"Sparrow"`, `"Tiggy"`, `"Howli"`, `"Flickerkit"`, `"Cactini"`, `"Bear"`, `"Candy Boo"`, `"98,550"`, `"368,600"`, `"596,600"`, `"596,850"`, `"3,525"`, `"714,000"`, `"40,050"`, `"44"`, `"161"`, `"58"`, `"211"`, `"+35.70%"`, `"+52.50%"`, `"+66.30%"`, `"+97.50%"`, `"+81.60%"`, `"+120.00%"`, `"5,880"`, `"1,500"`, `"750"`, `"3,500"`, `"6,080"`, `"6,346"`, `"4,648,680"`, `"69,000"`, `"210.00%"`, `"630.00%"`, `"15.00%"`, `"175.00%"`, `"960"`, `"36,000"`, `"2,000"`, `"pets-behemoth-weekly-audit-v2"`, `"MED-6.3-01"`..`"04"`. Giữ `"Cactini"` và `"Thiên Nhiên"` (`vi`) / `"Nature"` (`en`) nằm trên **cùng 1 dòng**.
  - **Cập nhật `tldr` (`569`/`498`/`416`c), `keyTakeaways` (3 — max `660`c), `paragraph` (5), `callout` (4), `checklist.items.detail` (2), `case_study` (7)** bằng `\n•` (`<= 220` ký tự/dòng), và rút gọn **4 mục `list.items`** thành 1 dòng đơn `<= 220` ký tự.
  - **Xóa 25 chuỗi chứa Emoji (`vi` & `en` — `GAP-W4-01`)**: Xóa sạch `🐣`, tổ hợp ZWJ `🧛‍♀️` (`\u{1F9DB}\u200D\u2640\uFE0F` — không để sót `♀`), `🛡️`, `🔥`, `🌿`, `👑`, và đổi `🔥`/`⭐`/`👑` ở các mốc `Lv.45`, `Lv.75`, `Lv.90`, `Lv.20`, `Lv.40`, `Lv.60`, `Lv.80`, `Lv.100` sang `★`.

- [ ] **Step 3.4: Chạy kiểm thử xác nhận Nhóm 6**

Run:
```bash
pnpm --dir tophub-web test tests/group-6-content.test.ts tests/wave4-content-scannability.test.ts -t "6.1|6.2|6.3|Group 6"
```
Expected: **PASS 100%** cho cả 3 bài `6.1` ➔ `6.3`.

---

### Task 4: Tái Cấu Trúc Nhóm 7 — Cửa Hàng, Đóng Băng Xu Bang, VIP & Quân Trang (`7.1` ➔ `7.4`)

**Files:**
- Modify: `tophub-web/src/content/guides/groups/group-7/7.1-shops-tier-list.ts`
- Modify: `tophub-web/src/content/guides/groups/group-7/7.2-guild-honor-freeze.ts`
- Modify: `tophub-web/src/content/guides/groups/group-7/7.3-exchange-and-vip-shops.ts`
- Modify: `tophub-web/src/content/guides/groups/group-7/7.4-troop-skins-and-medals.ts`
- Test: `tophub-web/tests/group-7-content.test.ts`, `tophub-web/tests/guides-phase4-micro-ux.test.tsx`, `tophub-web/tests/wave4-content-scannability.test.ts`

- [ ] **Step 4.1: Biên tập `7.1-shops-tier-list.ts` (`Bản Đồ 13 Cửa Hàng, Xếp Hạng ROI & Ngưỡng Đóng Băng Dự Phòng`)**
  - **Chuỗi neo & Widget Invariants bắt buộc bảo toàn (`GAP-W4-03`, `GAP-W4-06`, `GAP-W4-09`)**: `"Arena Shop"`, `"Guild Points"`, `"Medal Shop"`, `"VIP Shop"`, `"Exchange Shop"`, `"Wheel"`, `"Dice of Fate"`, `"Kingdom Emblem"`, `"1,900"`, `"2,000"`, `"12,000"`, `"15,000"`, `"40,000"`, `"6,000"`, `"600%"`, `"300%"`, `"1,500"`, `"Soulmancer"`, `"Warlock"`, `"Pyromancer"`, `"Adjudicator"`, `"Pixie"`, `"Orichalcum"`, `"shop_safety_floor_explorer"`, `"checklist-7-1-weekly-shop-routine"`, `"MED-7.1-01"`..`"04"`. **TUYỆT ĐỐI KHÔNG bọc `**` hay `` ` `` vào `row[0]..row[4]` của bảng `sub-1-2` (13 hàng) và `row[0]`, `row[2]` của bảng `sub-4-1` (16 hàng)**.
  - **Cập nhật `tldr`, `keyTakeaways` (4 — max `529`c), `paragraph` (3), `callout` (2), `case_study` (6)** bằng `\n•` (`<= 220` ký tự/dòng), và rút gọn **8 mục `list.items`** thành 1 dòng đơn `<= 220` ký tự.
  - **Xóa 6 chuỗi chứa Emoji (`vi` & `en`)**: `list.items` (3 — xóa `✅ `, `❌ `) và `table.headers` (3 — xóa `❌ `, `💥 `, `✅ `).

- [ ] **Step 4.2: Biên tập `7.2-guild-honor-freeze.ts` (`Chiến Lược Đóng Băng Xu Vinh Quang Bang Hội & Toán Học 9–27 Hồn Đá`)**
  - **Chuỗi neo bắt buộc bảo toàn (`vi` & `en`)**: `"40,000"`, `"360,000"`, `"6,000"`, `"54,000"`, `"720,000"`, `"1,080,000"`, `"108,000"`, `"162,000"`, `"55–65"`, `"75–95"`, `"85–95"`, `"130"`, `"345–385"`, `"12,000"`, `"Universal Legendary Troop Skin"`, `"Soulmancer"`, `"Warlock"`, `"Pyromancer"`, `"Adjudicator"`, `"Pixie"`, `"checklist-7-2-guild-honor-freeze"`, `"MED-7.2-01"`..`"04"`. Cấm xuất hiện từ `"Shaman"`.
  - **Cập nhật `tldr`, `keyTakeaways` (4 — max `435`c), `paragraph` (7), `callout` (2), `roadmap.steps.description` (3), `case_study` (5)** bằng `\n•` (`<= 220` ký tự/dòng), và rút gọn **8 mục `list.items`** thành 1 dòng đơn `<= 220` ký tự.
  - **Xóa 11 chuỗi chứa Emoji (`vi` & `en`)**: `roadmap.steps.badge` (3), `table.headers` (3), `table.rows` (5 — đổi `🔥`/`👑` thành `★` và đổi `⭐⭐⭐⭐⭐`/`⭐⭐`/`⭐⭐⭐` thành `5/5 ★`/`2/5 ★`/`3/5 ★`).

- [ ] **Step 4.3: Biên tập `7.3-exchange-and-vip-shops.ts` (`Cửa Hàng Quy Đổi Mảnh Dư, Quán Rượu & Lộ Trình Đặc Quyền VIP 0–15`)**
  - **Chuỗi neo bắt buộc bảo toàn (`vi` & `en`)**: `"500"`, `"1,000"`, `"+30%"`, `"Deluxe Choice Chest"`, `"100"`, `"300"`, `"600"`, `"1,200"`, `"2,400"`, `"DE-Dust"`, `"Solar Gold Ingot"`, `"$1.00"`, `"$50.00"`, `"$166.70"`, `"$1,000.00"`, `"$5,000.00"`, `"$33,670.00"`, `"200,000"`, `"3,000,000"`, `"$500k"`, `"42,000"`, `"checklist-7-3-exchange-vip-event-audit"`, `"MED-7.3-01"`..`"04"`.
  - **Cập nhật `tldr`, `keyTakeaways` (4 — max `473`c), `paragraph` (3), `callout` (1), `case_study` (6)** bằng `\n•` (`<= 220` ký tự/dòng), và rút gọn **12 mục `list.items`** thành 1 dòng đơn `<= 220` ký tự.
  - **Xóa 14 chuỗi chứa Emoji (`vi` & `en`)**: `list.items` (6), `table.headers` (3), `table.rows` (5 — đổi `⭐`/`⭐⭐`/`⭐⭐⭐`/`👑` ở các dòng `VIP 4..15` sang `★`/`2★`/`3★`/`★`).

- [ ] **Step 4.4: Biên tập `7.4-troop-skins-and-medals.ts` (`Quân Trang & Huân Chương Vinh Quang: Tỷ Lệ 4:2:1 & Điểm Gãy Lv.10/Lv.20`)**
  - **Chuỗi neo bắt buộc bảo toàn (`vi` & `en`)**: `"Heavy Cavalry"`, `"Divine Spirit"`, `"Desert Knight"`, `"Tree Spirit"`, `"Brave Fighter"`, `"Skeleton Soldier"`, `"Honor Guard"`, `"Siege Vehicle"`, `"Samurai"`, `"Bearskin Warrior"`, `"Logistic Follower"`, `"Shield Soldier"`, `"+14.38%"`, `"+21.46%"`, `"+11.49%"`, `"+19.24%"`, `"80,400"`, `"40,200"`, `"20,100"`, `"948,400"`, `"1,155,400"`, `"474,200"`, `"577,700"`, `"4,259,400"`, `"4,791,400"`, `"10,960,400"`, `"11,832,400"`, `"20,845,400"`, `"10,422,700"`, `"5,211,350"`, `"28,345,400"`, `"14,172,700"`, `"7,086,350"`, `"2,411,200"`, `"checklist-7-4-troop-skin-medal-audit"`, `"MED-7.4-01"`..`"04"`.
  - **Cập nhật `tldr`, `keyTakeaways` (4 — max `560`c), `paragraph` (5), `callout` (1), `checklist.items.detail` (3), `case_study` (6)** bằng `\n•` (`<= 220` ký tự/dòng), và rút gọn **2 mục `list.items`** thành 1 dòng đơn `<= 220` ký tự.
  - **Xóa 44 chuỗi chứa Emoji (`vi` & `en` — `GAP-W4-01`)**: Đổi toàn bộ `⭐` (`\u2B50`) sang `★` (`\u2605`), xóa tổ hợp ZWJ `💂‍♀️` (`\u{1F482}\u200D\u2640\uFE0F` — xóa sạch cả `♀`), xóa 11 icon đầu ô trong bảng Quân trang `sec-1`, và xóa `❌ `/`✅ ` ở `table.headers`.

- [ ] **Step 4.5: Chạy kiểm thử xác nhận Nhóm 7 + Shop Safety Floor Widget**

Run:
```bash
pnpm --dir tophub-web test tests/group-7-content.test.ts tests/guides-phase4-micro-ux.test.tsx tests/wave4-content-scannability.test.ts -t "7.1|7.2|7.3|7.4|Group 7|ShopSafetyFloor"
```
Expected: **PASS 100%** cho cả 4 bài `7.1` ➔ `7.4`.

---

### Task 5: Tái Cấu Trúc Nhóm 8 — Lâu Đài, Thợ Xây/Dân Làng, Nghiên Cứu & Master Data Tables (`8.1` ➔ `8.4`) & Nghiệm Thu Toàn Diện Wave 4

**Files:**
- Modify: `tophub-web/src/content/guides/groups/group-8/8.1-castle-and-brilliance.ts`
- Modify: `tophub-web/src/content/guides/groups/group-8/8.2-builder-queues-and-villagers.ts`
- Modify: `tophub-web/src/content/guides/groups/group-8/8.3-research-and-baiting.ts`
- Modify: `tophub-web/src/content/guides/groups/group-8/8.4-master-data-tables.ts`
- Test: `tophub-web/tests/group-8-content.test.ts`, `tophub-web/tests/guides-phase3-widgets.test.tsx`, `tophub-web/tests/wave4-content-scannability.test.ts`

- [ ] **Step 5.1: Biên tập `8.1-castle-and-brilliance.ts` (`Lộ Trình Đẩy Lâu Đài Lv.1–Lv.40, Huy Hoàng 1–5 & Ngân Sách 5,422 Tinh Chất Rồng`)**
  - **Chuỗi neo bắt buộc bảo toàn (`vi` & `en` — `GAP-W4-06`, `GAP-W4-08`)**: `"Training Ground"`, `"Research Cottage"`, `"Hospital"`, `"Bard"`, `"+40%"`, `"Brawler"`, `"+30%"`, `"Shaman"`, `"19,950"`, `"22,800"`, `"26.6M"`, `"8.36M"`, `"139M"`, `"51.8M"`, `"490M"`, `"500M"`, `"165M"`, `"82M"`, `"417M"`, `"142.8M"`, `"126"`, `"630"`, `"151"`, `"755"`, `"227"`, `"1,135"`, `"303"`, `"1,515"`, `"388"`, `"1,940"`, `"485"`, `"2,425"`, `"8,400"`, `"1,238.8M"`, `"4,931.8M"`, `"745"`, `"4,677"`, `"5,422"`, `"288"`, `"castle-rush-weekly-audit-v2"`, `"MED-8.1-01"`..`"04"`. **Lưu ý tuyệt đối không viết `"Castle 40"` (phải viết `"Castle Lv.40"`) để không vi phạm regex `/Castle\s*40\b/i`!**
  - **Cập nhật `tldr`, `keyTakeaways` (3 — max `544`c), `paragraph` (5), `callout` (2), `checklist.items.detail` (1), `case_study` (5)** bằng `\n•` (`<= 220` ký tự/dòng), và rút gọn **12 mục `list.items`** thành 1 dòng đơn `<= 220` ký tự.
  - **Xóa 11 chuỗi chứa Emoji (`vi` & `en` — `GAP-W4-01`)**: Xóa `🔵`, `🔴`, `🟢`, `❌`, `✅`, `🏰`, `👤`, `♾️` (`\u267E\uFE0F`), `💡`, và đổi `"🔥 Lv.35"` / `"👑 Lv.40"` thành `"Lv.35 ★"` / `"Lv.40 ★"`.

- [ ] **Step 5.2: Biên tập `8.2-builder-queues-and-villagers.ts` (`Quản Trị Hàng Đợi Thợ Xây, Nhịp Sinh Học & Bảng 14 Dân Làng Danh Tiếng`)**
  - **Chuỗi neo bắt buộc bảo toàn (`vi` & `en`)**: `"Bard"`, `"Brawler"`, `"Shaman"`, `"Knight"`, `"Hostess"`, `"Ranger"`, `"Rogue"`, `"Outlaw"`, `"Headhunter"`, `"Stonemason"`, `"Treeguard"`, `"Minister"`, `"Priestess"`, `"Dancer"`, `"+0.60%"`, `"+3.20%"`, `"40s"`, `"360s"`, `"432s"`, `"160s"`, `"+17.50%"`, `"+5.60%"`, `"+4.40%"`, `"+13"`, `"+2,100"`, `"+57.50%"`, `"+143.75%"`, `"16,560s"`, `"builder-villager-daily-audit-v2"`, `"MED-8.2-01"`..`"04"`.
  - **Cập nhật `tldr`, `keyTakeaways` (3 — max `640`c), `paragraph` (3), `checklist.items.detail` (2), `case_study` (7)** bằng `\n•` (`<= 220` ký tự/dòng), và rút gọn **8 mục `list.items`** thành 1 dòng đơn `<= 220` ký tự.
  - **Xóa 25 chuỗi chứa Emoji (`vi` & `en`)**: Xóa `🧑🌾`, `👷`, `❌`, `✅`, `🔥`, `⚔️`, `🛡️`, `🏥`, `💎`, `🗺️` (dùng `"[S+ ★] (Số 1..2)"` ở Bảng 4.1 để giữ `isBreakpointRow`).

- [ ] **Step 5.3: Biên tập `8.3-research-and-baiting.ts` (`Cây Công Nghệ Học Viện, Công Thức Pre-Click Snapshot & Mồi Nhử Phá Tuyến`)**
  - **Chuỗi neo bắt buộc bảo toàn (`vi` & `en`)**: `"Arms Race Prep"`, `"Commendation"`, `"Extra Rewards"`, `"Double Rewards"`, `"200%"`, `"Combat Expertise"`, `"Peacekeeper"`, `"Euclidean"`, `"Desert Prince"`, `"Wukong"`, `"Storm Maiden"`, `"Paragon"`, `"Pyromancer"`, `"Tidecaller"`, `"Ne Zha"`, `"Pixie"`, `"Adjudicator"`, `"Secretary of Science"`, `"24 DE"`, `"197"`, `"394"`, `"292"`, `"584"`, `"390"`, `"193"`, `"290"`, `"580"`, `"482"`, `"1,158"`, `"2,316"`, `"770"`, `"1,444"`, `"2,888"`, `"288"`, `"4,677"`, `"1,152"`, `"461"`, `"723"`, `"374"`, `"441"`, `"95.3%"`, `"36.6%"`, `"24.8%"`, `"research-snapshot-baiting-audit-v2"`, `"MED-8.3-01"`..`"04"`. *(Lưu ý: bọc trọn `` `24 DE` ``, không tách thành `` `24` DE ``).*
  - **Cập nhật `tldr`, `keyTakeaways` (3 — max `807`c ➔ tách thành Lead + 4 dòng `\n•`), `paragraph` (6), `checklist.items.detail` (1), `case_study` (7)** bằng `\n•` (`<= 220` ký tự/dòng), và rút gọn **15 mục `list.items`** thành 1 dòng đơn `<= 220` ký tự.
  - **Xóa 38 chuỗi chứa Emoji (`vi` & `en` — `GAP-W4-01`)**: Xóa `♾️` (`\u267E\uFE0F`), `🥇`, `🥈`, `🥉`, `🏅`, `❄️`, `🔬`, `🔴`, `🔵`, `🟢`, `❌`, `✅`, `⚔️`, `⏱️`, `🔥`, `🏛️`.

- [ ] **Step 5.4: Biên tập `8.4-master-data-tables.ts` (`Trung Tâm Bảng Dữ Liệu Gốc SSoT: 12 Bảng Tra Cứu Toàn Diện`)**
  - **Chuỗi neo & Widget Invariants bắt buộc bảo toàn (`GAP-W4-04`, `GAP-W4-06`, `GAP-W4-09`)**: `"500"`, `"1,000"`, `"280"`, `"560"`, `"24,700"`, `"8,000"`, `"345"`, `"385"`, `"21,000"`, `"60,000"`, `"118,500"`, `"195,000"`, `"780,000"`, `"4,680,000"`, `"936,000"`, `"5,422"`, `"1,181.162M"`, `"1,307"`, `"+4,908"`, `"+96,200"`, `"+20.00%"`, `"6,000"`, `"500K"`, `"1,185"`, `"920"`, `"958,800"`, `"9,955"`, `"2,030"`, `"101"`, `"+41.45%"`, `"+113.95%"`, `"+14.40%"`, `"+20.75%"`, `"+43.15%"`, `"+38.00%"`, `"+15,091"`, `"+191,019"`, `"+722,271"`, `"+17,753"`, `"+108,500"`, `"+14,000"`, `"596,600"`, `"596,850"`, `"3,525"`, `"714,000"`, `"40,050"`, `"36.00%"`, `"96.00%"`, `"80,400"`, `"40,200"`, `"20,100"`, `"948,400"`, `"1,155,400"`, `"4,259,400"`, `"4,791,400"`, `"10,960,400"`, `"11,832,400"`, `"20,845,400"`, `"28,345,400"`, `"14,172,700"`, `"7,086,350"`, `"+14.38%"`, `"+21.46%"`, `"+11.49%"`, `"+19.24%"`, `"$1.00"`, `"$50.00"`, `"$166.70"`, `"$1,000.00"`, `"$5,000.00"`, `"$33,670.00"`, `"200,000"`, `"3,000,000"`, `"$500,000.00"`, `"250,000"`, `"180,000"`, `"156,000"`, `"327,660"`, `"master-tables-reverse-budget-audit-v2"`, `"MED-8.4-01"`..`"04"`. Bảo toàn đúng 12 bảng (`3`, `5`, `4`, `7`, `2`, `18`, `5`, `10`, `12`, `18`, `20`, `16` hàng) và **không thêm `**` hay `` ` `` vào bất kỳ `sec.title` hoặc `sub.title` nào**.
  - **Cập nhật `tldr` (`492`/`380`/`332`c), `keyTakeaways` (3 — mục dài nhất `1,090`c ➔ tách thành Lead + 5 dòng `\n•`), `paragraph` (13), `case_study` (7)** bằng `\n•` (`<= 220` ký tự/dòng), và rút gọn **2 mục `list.items`** thành 1 dòng đơn `<= 220` ký tự.
  - **Xóa 65 chuỗi chứa Emoji (`vi` & `en` — `GAP-W4-01` & `GAP-W4-04`)**: Xóa sạch `📚`, `📊`, `🗡️`, `⚔️`, `🀄️` (`\uFE0F`), `🐣`, `💂‍♀️` (`\u200D\u2640\uFE0F`), `💂`, `❌`, `✅`, và thay thế toàn bộ `🔥`, `👑`, `🌟`, `⭐` trên 12 bảng bằng ký hiệu ngôi sao đơn sắc `★` (`\u2605`).

- [ ] **Step 5.5: Chạy toàn bộ cổng kiểm định chất lượng Wave 4 (`wave4-content-scannability.test.ts` + Full Vitest Suite + Next.js Production Build)**

Run:
```bash
pnpm --dir tophub-web test tests/wave4-content-scannability.test.ts
pnpm --dir tophub-web test
pnpm --dir tophub-web build
```
Expected: **100% Test Suites PASS** (bao gồm `61/61` bài kiểm định trong `wave4-content-scannability.test.ts` và toàn bộ 33 bộ test của dự án) + `pnpm build` thành công với **0 lỗi TypeScript/ESLint**.

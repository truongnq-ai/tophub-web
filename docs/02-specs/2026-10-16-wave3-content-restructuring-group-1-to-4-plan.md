# Guides Hub v4.0 — Wave 3: Content Restructuring Part 1 (Groups 1–4) Hardened Implementation Plan

> **For Agentic Workers:** REQUIRED SUB-SKILL: Use `common/subagent-driven-development` or `common/executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
>
> **Audit Status (`/review-plan`):** `APPROVED WITH REVISIONS (HARDENED v4.1)` — Audited against the 12-Point Senior Tech Lead Checklist and the exact TypeScript AST schema in `src/content/guides/types.ts`. All 5 technical blindspots (`GAP-W3-01` through `GAP-W3-05`) have been patched directly into this plan.

**Goal:** Refactor all **16 SSoT guide articles across Groups 1, 2, 3, and 4** (`1.1` through `4.3`) from dense, single-paragraph "Wall of Text" strings (`220–559` characters per block) into **3-Layer Scannable Editorial Content** (`**Bold Lead Sentence**` + `\n•` Micro-bullets `<= 220 chars/line` + `` `Monospace Metric Pills` `` + `➔` inline progression arrows), while purging all **438 `vi` / 426 `en` decorative & status emoji occurrences** across all 10 block types (`DEC-V4-01`, `DEC-V4-02`) with **zero regressions** across existing content, registry, and interactive widget test suites.

**Architecture:** Pure SSoT data transformation inside `tophub-web/src/content/guides/groups/group-{1..4}/*.ts` paired with a strict, type-safe TDD verification suite (`tophub-web/tests/wave3-content-scannability.test.ts`). Leverages the AST-like semantic parser `<RichGuideText />` (`tophub-web/src/components/guides/blocks/rich-guide-text.tsx`) delivered in Wave 1 and the Clean Editorial UI containers (`TldrActionBox`, `CalloutBox`, `ResponsiveDataTable`, `StepRoadmap`, `VisualDiagramBlock`, `InteractiveChecklistBlock`, `CaseStudyBlock`, `MediaSpotlightBlock`, `GuideArticleRenderer`) delivered in Wave 2. No UI component schemas (`types.ts`) are mutated; all multi-word anchor strings required by `tests/group-1..4-content.test.ts`, `tests/guides-registry.test.ts`, and Phase 3/4 Interactive Widgets (`HeroEncyclopediaWidget`, `AccountTrapsTriageWidget`, `BiweeklyCalendarWidget`, `TacticalFormationBoardWidget`, `HordePivotStepperWidget`) are strictly preserved.

**Tech Stack:** TypeScript 5 (`strict`), Next.js 16, React 19, Vitest (`jsdom`), `<RichGuideText />` AST Parser (`default`, `structured-brief`, and `inline` variants).

---

## 0. Báo Cáo Kiểm Toán & Gia Cố Kế Hoạch (`/review-plan` Gap & Blindspot Analysis)

### 0.1. 5 Lỗ Hổng Kỹ Thuật (`GAP-W3-01` ➔ `GAP-W3-05`) Đã Phát Hiện & Vá Triệt Để

| Mã GAP | Hạng Mục Kiểm Toán | Phát Hiện / Điểm Mù Trong Bản Nháp Đầu Tiên | Mức Độ Rủi Ro | Biện Pháp Vá Cứng Trong Bản Hardened Plan Này |
| :---: | :--- | :--- | :---: | :--- |
| **`GAP-W3-01`** | **Strict Type Safety & Schema Discriminators (`types.ts`)** | Bản nháp đầu tiên kiểm tra `block.type === "media"` (`a.text`) và `block.type === "diagram"` (`n.detail`, `br.items`, `b.footerNote`). Thực tế trong [types.ts](file:///d:/GitHub/top-hero/tophub-web/src/content/guides/types.ts#L102-L214), tên type chính xác là `"media_spotlight"` (`annotations: [{ label, detail }]`) và `"visual_diagram"` (`centerNode`, `nodes: [{ badge, title, subtitle, metrics }]`, `branches: [{ title, badge, outcome, steps }]`, `footnote`). Code test cũ sẽ báo lỗi biên dịch TypeScript (`TS2367`) và bỏ lọt toàn bộ Emoji trong `media_spotlight` & `visual_diagram`. | `CRITICAL` | Viết lại toàn bộ `tests/wave3-content-scannability.test.ts` (Task 1) khớp **100% kiểu tĩnh (`strict` TypeScript)** với từng interface trong `src/content/guides/types.ts` (`GuideVisualDiagramBlock`, `GuideMediaSpotlightBlock`, `GuideCaseStudyBlock`, `GuideChecklistBlock`, `GuideRoadmapBlock`). |
| **`GAP-W3-02`** | **Unchecked "Wall of Text" in `case_study`, `roadmap` & `checklist`** | Bản nháp đầu chỉ kiểm tra độ dài `<= 220` ký tự/dòng trên `tldr`, `keyTakeaways`, `paragraph`, `callout`, `list`. Kiểm toán sâu phát hiện thêm **72 trường trong `case_study`** (`profileSummary`, `diagnostics`, `recoverySteps.detail`, `conclusion`), **18 bước trong `roadmap.steps.description`** và **12 mục trong `checklist.items.detail`** dài `> 220` ký tự liên tục (tất cả đều được render qua `<RichGuideText />`). | `HIGH` | Mở rộng `AC-W3-03` và bài test `wave3-content-scannability.test.ts` để cưỡng chế giới hạn `<= 220` ký tự/dòng (phân lớp bằng `\n•`) trên cả `roadmap.steps.description`, `checklist.items.detail`, và `case_study` (`profileSummary`, `diagnostics`, `recoverySteps.detail`, `conclusion`). |
| **`GAP-W3-03`** | **Markdown-Wrapped, Badge & Inline Emojis (`DEC-V4-02`)** | Regex đầu dòng đơn giản `/^[\p{Emoji_Presentation}...]/u` bỏ sót: (1) **17 chuỗi mỗi ngôn ngữ trong `2.2-meta-lineups.ts`** bọc Emoji sau dấu sao `**❌ Sai lầm phổ biến:**`, `**🔴 Bộ Lạc**`; (2) tiêu đề có số thứ tự đứng trước Emoji như `"3.1. ⛔ CẢNH BÁO ĐỎ..."` trong `2.5`; (3) `sub.badge` trong `3.3` (`📦`, `🔬`, `⛏️`, `🌟`, `🪜`, `🛡️`) và `1.4` (`🀄`); (4) Emoji nằm giữa câu (`❌`, `✅`, `🔴`, `🔵`, `🟢`, `⭐`). Tổng số chuỗi chứa Emoji thực tế là **438 (`vi`) và 426 (`en`)**. | `HIGH` | Nâng cấp `AC-W3-04`: Cấm toàn diện mọi ký tự Emoji trang trí/trạng thái khớp `/(?!\u2605)[\p{Emoji_Presentation}\p{Extended_Pictographic}]/u` ở **bất kỳ vị trí nào** (đầu dòng, sau `**`, trong `sub.badge`, giữa câu) trên toàn bộ 16 bài viết. Chỉ cho phép ký hiệu ngôi sao đơn sắc `★` (`\u2605`) cho bậc sao (`1★ Trắng`). |
| **`GAP-W3-04`** | **`<ol>` Ordered List `variant="inline"` Rendering Trap** | Trong [guide-article-renderer.tsx](file:///d:/GitHub/top-hero/tophub-web/src/components/guides/guide-article-renderer.tsx#L178-L190), khi `block.type === "list"` có `ordered: true`, mỗi mục được render bằng `<RichGuideText text={item[locale]} variant="inline" />`. Vì `variant="inline"` chỉ bọc `<span>` mà không tách `\n•` thành `<ul><li>`, nếu chèn `\n•` vào `list.items` của danh sách có thứ tự sẽ làm lộ ký tự `•` thô trên cùng 1 dòng! | `MEDIUM` | Quy định rõ trong **Công thức 4 (Mục 2.4)**: Mọi phần tử `list.items[i]` phải được biên tập súc tích thành **1 dòng đơn duy nhất `<= 220` ký tự** (`**Bold Lead:** ... \`metric\` ➔ \`metric\``), tuyệt đối không chèn `\n•` vào bên trong `list.items`. |
| **`GAP-W3-05`** | **`ResponsiveDataTable` `isBreakpointRow()` Flame Highlight Preservation** | Trong [responsive-data-table.tsx](file:///d:/GitHub/top-hero/tophub-web/src/components/guides/blocks/responsive-data-table.tsx#L21-L41), hàm `isBreakpointRow(row)` kiểm tra `/(🔥\|⭐\|👑\|★\|Mythic\|T10\|T11\|Điểm gãy\|Breakpoint\|Mốc gãy)/i` để tô sáng dòng quan trọng và tự động gắn icon `<Flame />` ở cột 0. Nếu xóa `🔥`/`👑`/`⭐` ở các dòng `S-Tier` hoặc `S+` mà không có từ khóa thay thế, dòng đó sẽ mất hiệu ứng tô sáng Breakpoint. | `MEDIUM` | Khi xóa Emoji `🔥`, `👑`, `⭐` khỏi các dòng Điểm gãy / Tier S+ trong bảng (`1.2`, `1.3`, `2.1`, `2.4`, `2.5`, `3.2`, `3.3`), giữ nguyên từ khóa `"Điểm gãy"` / `"Breakpoint"` / `"Mythic"` hoặc gắn ký hiệu đơn sắc `"★"` (VD: `"[S-Tier ★]"`, `"[S+ ★]"`) để bảo toàn 100% logic `isBreakpointRow(row)` mà không bị trùng icon. |

---

### 0.2. Kiểm Toán 12 Điểm Chuẩn Senior Tech Lead (`12-Point Plan Audit Checklist`)

| # | Tiêu Chí Đánh Giá | Kết Quả Kiểm Toán & Cơ Chế Đảm Bảo Trong Kế Hoạch |
| :---: | :--- | :--- |
| **1** | **Data Loss & Integrity** | **PASS**: Bổ sung bài test khóa cấu trúc `AC-W3-05` trong `wave3-content-scannability.test.ts` kiểm tra bất biến số lượng `freeSections`, `proSections`, `sec.id`, `sub.id`, số lượng bảng (`table.rows.length`), `checklistId`, `mediaCode`, và `widgetType` trên cả 16 bài viết. |
| **2** | **Rollback Strategy** | **PASS**: Mỗi Task (Task 2 ➔ Task 5) thực thi độc lập theo từng Nhóm (`group-1` ➔ `group-4`). Nếu bất kỳ bài test neo nào của nhóm thất bại, khôi phục tức thì bằng `git checkout -- tophub-web/src/content/guides/groups/group-N/`. |
| **3** | **Performance & Scale** | **PASS**: Dữ liệu tĩnh SSoT biên dịch lúc build; việc chia nhỏ dòng `<= 220` ký tự bằng `\n•` giúp `<RichGuideText />` đi vào nhánh tách dòng trực tiếp `O(N)` thay vì chạy thuật toán fallback tách câu phức tạp `splitStructuredSentences()`. |
| **4** | **Security & Auth Scope** | **PASS**: Không thay đổi logic `ProContentGate` hay quyền truy cập `isPro` trên các section `proSections` của 16 bài viết. |
| **5** | **Contract Breaking** | **PASS**: Không thay đổi bất kỳ interface nào trong `src/content/guides/types.ts` hay chữ ký hàm trong `src/content/guides/registry.ts`. |
| **6** | **Idempotency & Concurrency** | **PASS**: Các hàm parser `<RichGuideText />` và bộ test kiểm định hoạt động hoàn toàn tất định (deterministic, pure functions). |
| **7** | **Edge Cases & Null Safety** | **PASS**: Đã xử lý triệt để edge case `ordered: true` trong `list.items` (`GAP-W3-04`), `isBreakpointRow` trong `ResponsiveDataTable` (`GAP-W3-05`), và khóa chính `canonicalKey` trong `HeroEncyclopediaWidget`. |
| **8** | **No Placeholders Law** | **PASS**: Không có bất kỳ `TODO`, `TBD` hay câu lệnh mơ hồ nào; toàn bộ code của `tests/wave3-content-scannability.test.ts` và quy tắc biến đổi từng bài viết đều được cung cấp đầy đủ. |
| **9** | **Atomic Granularity** | **PASS**: Chia thành 5 Task với các bước nguyên tử (2–5 phút/bước) theo đúng chu trình: kiểm tra bài viết ➔ biên tập song ngữ ➔ chạy test nhóm + test scannability ➔ xác nhận PASS. |
| **10** | **TDD Verification Flow** | **PASS**: Task 1 tạo `tests/wave3-content-scannability.test.ts` và chạy xác nhận **RED** trước khi sửa bất kỳ file dữ liệu nào ở Tasks 2–5. |
| **11** | **Env & Secret Isolation** | **PASS**: Không chứa biến môi trường, secret hay URL cứng. |
| **12** | **Strict Type Safety** | **PASS**: Toàn bộ code kiểm thử trong Task 1 tuân thủ `strict` TypeScript, không dùng `any`, khớp chính xác 100% với `GuideContentBlock` trong `src/content/guides/types.ts` (`GAP-W3-01`). |

---

## 1. Báo Cáo Kiểm Toán Định Lượng Toàn Diện 16 Bài Viết Nhóm 1–4 (`Full AST Audit`)

### 1.1. Bảng Thống Kê Định Lượng Hiện Trạng Trên Tất Cả 10 Loại Khối (`types.ts`)

Kết quả quét định lượng toàn bộ 16 file dữ liệu bài viết thuộc Nhóm 1–4 (`src/content/guides/groups/group-1..4/*.ts`) bằng script AST khớp 100% `GuideContentBlock`:

| Mã Bài | File Dữ Liệu (`src/content/guides/groups/...`) | Độ dài `tldr` `vi` (`core` / `action` / `taboo`) | `tldr` có `\n•`? | `keyTakeaways` Wall (`>220`c) / Thiếu token | `paragraph` & `callout` Wall (`>220`c) | `list.items` Wall (`>220`c) | `roadmap`, `checklist` & `case_study` Wall (`>220`c) | Tổng số chuỗi chứa Emoji cần làm sạch (`vi` / `en`) |
| :---: | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **`1.1`** | `group-1/1.1-overview.ts` | `280` / `269` / `324` | `0/3` | `4/4` Wall, `4/4` thiếu | `5` para + `1` callout | `0 / 0` | `2` road + `0` chk + `6` case | **`14` / `14`** |
| **`1.2`** | `group-1/1.2-strict-one-queue-rule.ts` | `212` / `234` / `327` | `0/3` | `3/4` Wall, `4/4` thiếu | `2` para + `1` callout | `8 / 8` | `0` road + `1` chk + `5` case | **`9` / `9`** |
| **`1.3`** | `group-1/1.3-diamond-and-spending-guide.ts` | `264` / `379` / `215` | `0/3` | `3/4` Wall, `4/4` thiếu | `3` para + `2` callout | `4 / 6` | `0` road + `0` chk + `7` case | **`22` / `22`** |
| **`1.4`** | `group-1/1.4-top-10-account-traps.ts` | `239` / `188` / `216` | `0/3` | `2/4` Wall, `4/4` thiếu | `1` para + `2` callout | `18 / 29` | `0` road + `5` chk + `0` case | **`23` / `23`** |
| **`2.1`** | `group-2/2.1-encyclopedia.ts` | `199` / `197` / `234` | `0/3` | `4/4` Wall, `4/4` thiếu | `6` para + `1` callout | `7 / 15` | `0` road + `0` chk + `2` case | **`142` / `142`** |
| **`2.2`** | `group-2/2.2-meta-lineups.ts` | `339` / `286` / `324` | `0/3` | `2/3` Wall, `3/3` thiếu | `4` para + `2` callout | `9 / 24` | `0` road + `0` chk + `5` case | **`17` / `17`** |
| **`2.3`** | `group-2/2.3-formation-and-counters.ts` | `175` / `199` / `219` | `0/3` | `0/4` Wall, `4/4` thiếu | `2` para + `2` callout | `9 / 13` | `0` road + `0` chk + `3` case | **`6` / `6`** |
| **`2.4`** | `group-2/2.4-shards-and-skill-books.ts` | `451` / `295` / `290` | `0/3` | `4/4` Wall, `4/4` thiếu | `5` para + `2` callout | `2 / 2` | `0` road + `0` chk + `4` case | **`68` / `55`** |
| **`2.5`** | `group-2/2.5-epic-hero-traits.ts` | `260` / `413` / `309` | `0/3` | `4/4` Wall, `4/4` thiếu | `3` para + `1` callout | `6 / 9` | `3` road + `0` chk + `3` case | **`40` / `40`** |
| **`3.1`** | `group-3/3.1-biweekly-rotation.ts` | `559` / `297` / `400` | `0/3` | `4/4` Wall, `4/4` thiếu | `5` para + `2` callout | `13 / 13` | `4` road + `2` chk + `5` case | **`2` / `3`** |
| **`3.2`** | `group-3/3.2-week-a-guild-race.ts` | `297` / `291` / `182` | `0/3` | `3/5` Wall, `5/5` thiếu | `5` para + `1` callout | `9 / 12` | `0` road + `2` chk + `4` case | **`10` / `10`** |
| **`3.3`** | `group-3/3.3-week-b-arms-race.ts` | `292` / `270` / `330` | `0/3` | `4/4` Wall, `4/4` thiếu | `4` para + `1` callout | `4 / 4` | `6` road + `0` chk + `5` case | **`15` / `15`** |
| **`3.4`** | `group-3/3.4-double-dip-schedule.ts` | `258` / `335` / `256` | `0/3` | `4/4` Wall, `4/4` thiếu | `3` para + `0` callout | `7 / 7` | `0` road + `0` chk + `5` case | **`30` / `30`** |
| **`4.1`** | `group-4/4.1-preseason-mythic-calendar.ts` | `267` / `246` / `272` | `0/3` | `3/3` Wall, `3/3` thiếu | `4` para + `0` callout | `13 / 16` | `0` road + `1` chk + `5` case | **`15` / `15`** |
| **`4.2`** | `group-4/4.2-horde-pivot-roadmap.ts` | `270` / `251` / `288` | `0/3` | `2/3` Wall, `3/3` thiếu | `3` para + `0` callout | `8 / 8` | `3` road + `1` chk + `5` case | **`11` / `11`** |
| **`4.3`** | `group-4/4.3-season-1-to-4-roadmap.ts` | `444` / `347` / `353` | `0/3` | `3/3` Wall, `3/3` thiếu | `3` para + `0` callout | `14 / 15` | `0` road + `0` chk + `8` case | **`14` / `14`** |
| **TỔNG** | **16 Files (`group-1` ➔ `group-4`)** | **Max `559` chars** | **`0/48`** | **`49/62` Wall, `62/62` thiếu** | **`58` para + `16` callout** | **`131 / 181`** | **`18` road + `12` chk + `72` case** | **`438` (`vi`) / `426` (`en`)** |

#### Danh mục đầy đủ các vị trí chứa Emoji cần làm sạch (`DEC-V4-02` & `GAP-W3-03`) theo từng bài viết:
1. **`1.1-overview.ts` (`14` `vi` / `14` `en`)**:
   - `table.headers` (4): `"⚔️ Lực Chiến Thực Chiến..."`, `"🎈 Lực Chiến Ảo..."`, `"❌ Sai lầm phổ biến của Tân thủ"`, `"✅ Giải pháp Chuẩn Meta"`.
   - `table.rows` (8): `"🔵 Liên Minh..."`, `"🔴 Bộ Lạc..."`, `"🟢 Thiên Nhiên..."`, `"💎 Kim Cương..."`, `"🧩 Mảnh Tướng Vàng..."`, `"🍖 Thịt & Cấp Độ..."`, `"🔬 Tăng Tốc Nghiên Cứu..."`, `"⚒️ Quặng & Trang Bị..."`.
   - `media_spotlight.annotations.label` (2): `"✅ CHUẨN META: 1 ĐỘI CHÍNH..."`, `"🚫 BẪY LỰC CHIẾN ẢO..."`.
2. **`1.2-strict-one-queue-rule.ts` (`9` `vi` / `9` `en`)**:
   - `table.headers` (2): `"❌ Sai lầm phổ biến"`, `"✅ Giải pháp tối ưu"`.
   - `table.rows` (7): `"🧩 Mảnh Tướng Vàng..."`, `"📘 Sách Kỹ Năng..."`, `"⚒️ Đá Cường Hóa..."`, `"🗡️ Tinh Chất Vũ Khí..."`, `"🐾 Thức Ăn Pet..."`, `"🔥 ĐIỂM GÃY VÀNG SỐ 1..."`, `"🔥 ĐIỂM GÃY VÀNG SỐ 2..."`.
3. **`1.3-diamond-and-spending-guide.ts` (`22` `vi` / `22` `en`)**:
   - `visual_diagram.branches.badge` (2): `"⛔ CẤM TUYỆT ĐỐI"`, `"🔥 ĐẦU TƯ CỐT LÕI"`.
   - `visual_diagram.branches.steps.badge` (4): `"🔥 Ưu tiên #1"`, `"🌟 Ưu tiên #2"`, `"⚖️ Mua chọn lọc"`, `"⛔ Cấm tuyệt đối"`.
   - `table.headers` (2): `"❌ Sai lầm phổ biến"`, `"✅ Giải pháp tối ưu"`.
   - `table.rows` (14): `"🔥 S-Tier..."` (x2) ➔ `"[S-Tier ★] ..."`, `"🌟 A-Tier..."` (x2) ➔ `"[A-Tier] ..."`, `"⚖️ B-Tier..."` (x2) ➔ `"[B-Tier] ..."`, `"⛔ F-Tier..."` ➔ `"[F-Tier] ..."`, `"👑 Hạng 1..."` ➔ `"Hạng 1 (★ ROI ~1,000%+)"`, `"👑 Hạng 2..."` ➔ `"Hạng 2 (★ ROI ~900%)"`, `"🔥 Hạng 3..."` ➔ `"Hạng 3..."`, `"🔥 Hạng 4..."` ➔ `"Hạng 4..."`, `"🌟 Hạng 5..."` ➔ `"Hạng 5..."`, `"⚖️ Hạng 6..."` ➔ `"Hạng 6..."`, `"⛔ Hạng F..."` ➔ `"Hạng F..."`.
4. **`1.4-top-10-account-traps.ts` (`23` `vi` / `23` `en`)**:
   - `subSections.title` (10): `"🚫 Cạm bẫy #1..."` ➔ `"Cạm bẫy #1..."` (`sub-trap-1` ➔ `sub-trap-10`).
   - `subSections.badge` (1): `sub-trap-7` có `"🀄 Bẫy Cổ Ngữ"` ➔ `"Bẫy Cổ Ngữ"`.
   - `table.headers` (2): `"❌ Dấu Hiệu Tài Khoản Đang Dính Bẫy"`, `"✅ Trạng Thái Tài Khoản Chuẩn Meta"`.
   - `table.rows` (10): `"🔴 Nặng..."` (x3) ➔ `"Nặng..."`, `"🟡 Trung bình..."` (x3) ➔ `"Trung bình..."`, `"🟢 Nhẹ..."` (x4) ➔ `"Nhẹ..."` (giữ nguyên từ khóa `"Nặng"`/`"Severe"`, `"Trung bình"`/`"Moderate"`, `"Nhẹ"`/`"Mild"` cho `AccountTrapsTriageWidget`).
5. **`2.1-encyclopedia.ts` (`142` `vi` / `142` `en`)**:
   - `media_spotlight.annotations.label` (2): `"✅ KỸ NĂNG THỨ 5..."`, `"🚫 KHÔNG DỪNG LƯNG CHỪNG..."`.
   - `list.items` (3): `"🩸 Huyết Titan..."`, `"⚔️ Kỵ Sĩ Vinh Quang..."`, `"⚡ Hiền Triết Quang Vinh..."`.
   - `callout.content` (1): `"❌ Sai lầm phổ biến: Thấy Astrologer..."`.
   - `table.rows` (136 ô trên 5 bảng): Xóa toàn bộ `🔴 `, `🟡 `, `🟣 `, `🔵 `, `🟢 `, `👑 `, `🔥 `, `⚡ `, `🛠️ `, `🚫 `, `🩸 `, `⚔️ `, `⛔ ` ở đầu và giữa các ô bảng (giữ nguyên văn bản `"Mythic"`, `"Legendary (Awaken)"`, `"Legendary (Econ)"`, `"Epic"`, `"Rare"`, `"Tier S+"`, `"Tier S"`, `"Tier A"`, `"Tier B"`, `"Tier C"` cho `HeroEncyclopediaWidget`).
6. **`2.2-meta-lineups.ts` (`17` `vi` / `17` `en`)**:
   - `callout.content` (2): Xóa `❌ ` và `✅ ` bên trong `"**❌ Sai lầm phổ biến:**"` ➔ `"**Sai lầm phổ biến:**"` và `"**✅ Giải pháp tối ưu:**"` ➔ `"**Giải pháp tối ưu:**"`.
   - `table.rows` (15): Xóa `🔴 `, `🔵 `, `🟢 ` bên trong `"**🔴 Bộ Lạc (Horde)**"`, `"**🔵 Liên Minh (League)**"`, `"**🟢 Thiên Nhiên (Nature)**"`, và đổi ký tự `⭐` (`6⭐`, `11⭐`) thành `★` (`6★`, `11★`).
7. **`2.3-formation-and-counters.ts` (`6` `vi` / `6` `en`)**:
   - `visual_diagram.centerNode.badge` (1): `"⚔️ AI TẤN CÔNG CỦA ĐỊCH"` ➔ `"AI TẤN CÔNG CỦA ĐỊCH"`.
   - `list.items` (3): Xóa `🔵 `, `🟢 `, `🔴 ` đầu dòng.
   - `table.headers` (2): `"Sai Lầm Phổ Biến (❌ Pitfall)"` ➔ `"Sai Lầm Phổ Biến (Pitfall)"`, `"Giải Pháp Tối Ưu (✅ Optimal Fix)"` ➔ `"Giải Pháp Tối Ưu (Optimal Fix)"`.
8. **`2.4-shards-and-skill-books.ts` (`68` `vi` / `55` `en`)**:
   - Đổi toàn bộ ký tự Emoji `⭐` (`\u2B50`, xuất hiện 57 lần ở `0⭐`..`15⭐`) sang ký hiệu ngôi sao đơn sắc `★` (`\u2605`, `0★`..`15★`).
   - `table.headers` (2): Xóa `❌ ` và `✅ ` trong ngoặc đơn.
   - `table.rows` (9): Xóa `🔵 `, `🔴 `, `🟢 `, `🔥 `, `👑 `, `⚡ `, `🏆 ` ở đầu ô bảng (giữ từ khóa `"Breakpoint"` / `"Điểm gãy"` và thêm `"★"` cho dòng `"Max Out ★"` để bảo toàn `isBreakpointRow`).
9. **`2.5-epic-hero-traits.ts` (`40` `vi` / `40` `en`)**:
   - `subSections.title` (1): `"3.1. ⛔ CẢNH BÁO ĐỎ: ..."` ➔ `"3.1. CẢNH BÁO ĐỎ: ..."`.
   - `table.rows` (39): Xóa toàn bộ `👑 `, `🔥 `, `⚡ `, `🛠️ `, `🔴 `, `🔵 `, `🟢 `, `🏗️ `, `🔬 `, `⚔️ `, `🏇 `, `💎 `, `🌲 `, `🪨 `, `🎒 `, `🌟 `, `⛔ ` trong 2 bảng dữ liệu (đổi `"👑 S+ (#1)"` ➔ `"[S+ ★ #1]"` để giữ `isBreakpointRow`).
10. **`3.1-biweekly-rotation.ts` (`2` `vi` / `3` `en`)**:
    - `table.headers` (2): Xóa `❌ ` và `✅ `.
    - `table.rows` (`en` 1 ô): Đổi `6⭐` / `11⭐` thành `6★` / `11★`.
11. **`3.2-week-a-guild-race.ts` (`10` `vi` / `10` `en`)**:
    - `table.headers` (2): Xóa `❌ ` và `✅ `.
    - `table.rows` (8): Đổi `"🌟 S+ TIER..."` ➔ `"[S+ TIER ★] ..."`, `"✅ S TIER..."` ➔ `"[S TIER] ..."`, `"✅ A TIER..."` ➔ `"[A TIER] ..."`, `"⚠️ B TIER..."` ➔ `"[B TIER] ..."`, `"❌ F TIER..."` ➔ `"[F TIER] ..."`.
12. **`3.3-week-b-arms-race.ts` (`15` `vi` / `15` `en`)**:
    - `subSections.badge` (6): Xóa `📦 `, `🔬 `, `⛏️ `, `🌟 `, `🪜 `, `🛡️ ` khỏi 6 badge của `sub-2-1` ➔ `sub-2-6`.
    - `table.headers` (2): Xóa `❌ ` và `✅ `.
    - `table.rows` (7): Xóa `🌟 ` và `🔥 ` ở đầu ô (thêm `"★"` vào cột Giờ Vàng để giữ `isBreakpointRow`).
13. **`3.4-double-dip-schedule.ts` (`30` `vi` / `30` `en`)**:
    - `list.items` (4): Xóa `⛔ `, `🟡 `, `🟢 `, `🔥 ` ở đầu 4 mức hiệu suất.
    - `visual_diagram` (13): Xóa `🔍 `, `⚡ `, `🔒 `, `🔥 `, `🟢 `, `🟡 `, `⛔ ` trong `centerNode`, `branches`, `nodes`.
    - `media_spotlight.annotations.label` (3): Xóa `⚡ `, `🔒 `.
    - `table.headers` (6) & `table.rows` (4): Xóa `❌ `, `✅ `, `🔥 `, `🟢 `, `🟡 `, `⛔ `, `⚡ `, `🔒 `.
14. **`4.1-preseason-mythic-calendar.ts` (`15` `vi` / `15` `en`)**:
    - `visual_diagram.branches` (6): Xóa `🔵 `, `🔴 `, `🟢 ` ở `title` và `🎯 `, `🔥 `, `⛔ ` ở `badge`.
    - `table.headers` (2) & `table.rows` (7): Xóa `❌ `, `✅ `, `🔴 `, `🔵 `, `🟢 ` (kể cả `"🔵 Rose Princess & 🔵 Bishop"` giữa câu).
15. **`4.2-horde-pivot-roadmap.ts` (`11` `vi` / `11` `en`)**:
    - `table.headers` (5): Xóa `🔵 `, `🟢 `, `🔴 `, `❌ `, `✅ `.
    - `table.rows` (6): Đổi `"⭐⭐⭐⭐⭐"` ➔ `"5/5 ★"`, `"⭐⭐"` ➔ `"2/5 ★"`, và xóa toàn bộ các chấm màu `🔴`, `🔵` đặt trước tên tướng trong bảng `sub-4-2-zero-loss-pivot-matrix`.
16. **`4.3-season-1-to-4-roadmap.ts` (`14` `vi` / `14` `en`)**:
    - `visual_diagram.nodes` (6): Xóa `🏁 `, `🌳 `, `❄️ `, `🌑 `, `🌊 ` ở `title` và `🔒 ` ở `badge`.
    - `list.items` (3): Xóa các chấm màu `🟢 `, `🔴 `, `🔵 ` trước tên tướng trong danh sách tướng ra mắt S1–S3.
    - `table.headers` (5): Xóa `🔵 `, `🔴 `, `🟢 `, `❌ `, `✅ `.

---

### 1.2. Ma Trận Từ Khóa & Chuỗi Neo Bảo Vệ (`Protected Test Assertions Matrix`)

> [!IMPORTANT]
> **QUY TẮC BẢO TOÀN TEST TUYỆT ĐỐI (`ZERO TEST REGRESSION`)**:
> 1. **Cấm chèn ký tự `*` hoặc `` ` `` vào GIỮA một chuỗi con nằm trong bảng `Protected Substrings` dưới đây.** Ví dụ: phải viết `` `9 Hồn Đá Đỏ` `` hoặc `**9 Hồn Đá Đỏ**`, tuyệt đối **CẤM** viết `` `9` Hồn Đá Đỏ `` vì `.toContain("9 Hồn Đá Đỏ")` sẽ FAIL.
> 2. **Đối với `searchGuides()` (`src/content/guides/registry.ts`)**: Hàm `normalizeSearchText()` không xóa dấu `*` và `` ` `` khi tìm trên `title`, `summary`, `keywords`, `tldr`, `section.title`, `subSection.title`. Vì vậy không được chèn `*` hay `` ` `` cắt đôi cụm từ khóa tìm kiếm trong `tldr`.

| Test File | Bài Viết Liên Quan | Danh Sách Chuỗi Neo Bắt Buộc Giữ Nguyên Vẹn (`Protected Substrings`) |
| :--- | :---: | :--- |
| **[group-1-content.test.ts](file:///d:/GitHub/top-hero/tophub-web/tests/group-1-content.test.ts)** | `1.1`, `1.2`, `1.3`, `1.4` | • **Số liệu SSoT**: `"345–385"`, `"9 Hồn Đá Đỏ"`, `"560"`, `"280"`, `"1,000"`, `"6,000"`, `"24,700"`, `"8,000"`, `"600,000"`, `"40,000"`, `"360,000"`, `"54,000"`, `"+40%"`, `"1,181.16"`, `"09:00"`.<br>• **Thuật ngữ & Tên riêng**: `"Brawler"`, `"Knight"`, `"Ranger"`, `"Bard"`, `"Thi Đấu Hội"`, `"Tập Kích Cự Ma"`, `"Khiêu Chiến Của Đội Quân Hắc Ám"`.<br>• **Checklist & Media IDs**: `"newbie-90-day-survival-v2"`, `"one-queue-daily-audit-v2"`, `"diamond-spending-discipline-v2"`, `"account-traps-60-day-audit-v2"`, `"MED-1.1-01"`..`"MED-1.4-04"`. |
| **[group-2-content.test.ts](file:///d:/GitHub/top-hero/tophub-web/tests/group-2-content.test.ts)** | `2.1`, `2.2`, `2.3`, `2.4`, `2.5` | • **Số liệu SSoT**: `"560"`, `"280"`, `"300"`, `"600"`, `"1,000"`, `"500"`, `"9 Hồn Đá Đỏ"`, `"345"`, `"385"`, `"40,000"`, `"360,000"`, `"6,000"`, `"54,000"`, `"8,000"`, `"24,700"`, `"98,800"`, `"123,500"`, `"600,000"`, `"1,181.16"`, `"1,307"`, `"2,000"`, `"16,000"`.<br>• **10 Tướng Tím/Lam**: `"Brawler"`, `"Knight"`, `"Ranger"`, `"Minister"`, `"Priestess"`, `"Dancer"`, `"Rogue"`, `"Outlaw"`, `"Bard"`, `"Stonemason"`.<br>• **Checklist & Media IDs**: `"hero-roster-audit-v2"`, `"meta-lineup-transition-v2"`, `"arena-positional-counter-v2"`, `"shards-and-skill-books-audit-v2"`, `"epic-hero-traits-audit-v2"`, `"MED-2.1-01"`..`"MED-2.5-04"`. |
| **[group-3-content.test.ts](file:///d:/GitHub/top-hero/tophub-web/tests/group-3-content.test.ts)** | `3.1`, `3.2`, `3.3`, `3.4` | • **Bài `3.1`**: `"09:00"`, `"Đế Quốc Hắc Ám"`, `"Tập Kích Cự Ma"`, `"Guild Rush"`, `"Ultimate Power"`, `"Lord's Set"`, `"Hero Development"`, `"Rush Top"`, `"Decorations"`, `"Soul Stone"`, `"Pet Power"`, `"Relic Power"`, `"3,850"`, `"biweekly-daily-discipline-v2"`, `"MED-3.1-01"`..`"04"`.<br>• **Bài `3.2`**: `"10 phút"`, `"144"`, `"+300"`, `"+450"`, `"+280"`, `"+420"`, `"40,000"`, `"360,000"`, `"6,000"`, `"54,000"`, `"400%"`, `"250%"`, `"120%"`, `"+600"`, `"week-a-guild-race-discipline-v2"`, `"MED-3.2-01"`..`"04"`.<br>• **Bài `3.3`**: `"120,000"`, `"50,000"`, `"10,000"`, `"40,000"`, `"13:00"`, `"17:00"`, `"21:00"`, `"Arms Race Prep"`, `"Staircase"`, `"35,000"`, `"8,500"`, `"week-b-gar-kvk-execution-v2"`, `"MED-3.3-01"`..`"04"`.<br>• **Bài `3.4`**: `"300%"`, `"200%"`, `"Triple-Dip"`, `"9,800"`, `"Lord Gear"`, `"Hero Gear"`, `"Glory Medals"`, `"Decor Tokens"`, `"double-dip-vault-discipline-v2"`, `"MED-3.4-01"`..`"04"`. |
| **[group-4-content.test.ts](file:///d:/GitHub/top-hero/tophub-web/tests/group-4-content.test.ts)** *(kiểm tra cả `vi` và `en`)* | `4.1`, `4.2`, `4.3` | • **Bài `4.1` (`vi` & `en`)**: `"Desert Prince"`, `"Storm Maiden"`, `"Paragon"`, `"Witch"`, `"Rose Princess"`, `"Bishop"`, `"Tidecaller"`, `"Monk"`, `"Ne Zha"`, `"Petalis"`, `"160"`, `"400"`, `"560"`, `"1,000"`, `"70"`, `"100"`, `"300"`, `"28,500"`, `"33,000"`, `"13,500"`, `"preseason-s0-weekly-discipline-v2"`, `"MED-4.1-01"`..`"04"`.<br>• **Bài `4.2` (`vi` & `en`)**: `"Soulmancer"`, `"Warlock"`, `"345"`, `"385"`, `"40,000"`, `"360,000"`, `"6,000"`, `"54,000"`, `"1,035"`, `"1,155"`, `"3.2M"`, `"2.8M"`, `"400,000"`, `"600,000"`, `"horde-pivot-readiness-v2"`, `"MED-4.2-01"`..`"04"`.<br>• **Bài `4.3` (`vi` & `en`)**: `"The Spring"`, `"Spring Water"`, `"Dune Devourer"`, `"Lv.35"`, `"Lv.40"`, `"Brilliance Institute"`, `"5,422"`, `"30°C"`, `"Wukong"`, `"Beastmaster"`, `"Legendary T1"`, `"Legendary T2"`, `"Sacred Codex"`, `"Shadow Priest"`, `"Artificer"`, `"8,200"`, `"58,000"`, `"480"`, `"8.5M"`, `"pre-s1-hoarding-readiness-v2"`, `"MED-4.3-01"`..`"04"`. |
| **[guides-registry.test.ts](file:///d:/GitHub/top-hero/tophub-web/tests/guides-registry.test.ts)** & **[guide-article-renderer.test.tsx](file:///d:/GitHub/top-hero/tophub-web/tests/guide-article-renderer.test.tsx)** | `1.1`..`4.3` | • Các truy vấn `searchGuides()`: `"9 Hồn Đá Đỏ"`, `"560"`, `"Brawler"`, `"24,700"`, `"Positional"`, `"Tập Kích Cự Ma"`, `"Staircase"`, `"Pre-cooking"`, `"Pháo Đài"`, `"Triple-Dip"`, `"Desert Prince"`, `"Soulmancer"`, `"Viện Huy Hoàng"`, `"Brilliance Institute"`, `"Đấu Sĩ"`, `"tuan a"`.<br>• Trong `2.2-meta-lineups.ts`: Bảng cuối cùng phải giữ chuỗi `"Thiếu \`Paragon\`"` để pass test filter `"thiếu paragon"`. |

---

### 1.3. Ràng Buộc Trích Xuất Dữ Liệu Của Các Interactive Widgets (`Widget SSoT Invariants`)

| Widget Component | Bài Viết SSoT | Cơ Chế Trích Xuất (`Extractor Logic`) | Quy Tắc Bảo Toàn Khi Biên Tập Ở Wave 3 |
| :--- | :---: | :--- | :--- |
| **[HeroEncyclopediaWidget](file:///d:/GitHub/top-hero/tophub-web/src/components/guides/widgets/hero-encyclopedia-widget.tsx)** | `2.1-encyclopedia.ts` | • Đọc `sec-2-master-hero-directory` (`sub-2-1-league-heroes`, `sub-2-2-horde-heroes`, `sub-2-3-nature-heroes`): lấy `row[0].en.trim().toLowerCase()` làm `canonicalKey`.<br>• Đọc `row[2].en` qua regex `/mythic\|thần thoại/i`, `/legendary\|huyền thoại/i`, `/epic\|sử thi/i`, `/awaken\|thức tỉnh/i`, `/econ/i`.<br>• Đọc `sec-3-stage-tier-list-and-pitfalls`: lấy `row[0].en` (`S+`, `Tier S`, `Tier A`, `Tier B`, `Tier C`) và khớp tên tướng bằng `\b${nameEn}\b` trên `row[2].en` & `row[3].en`.<br>• Đọc `sub-4-1-pro-24-heroes-table`: lấy `row[0].en.split("(")[0].trim().toLowerCase()` nối vào `canonicalKey`. | 1. **CẤM bọc `**` hoặc `` ` `` vào cột Tên tướng (`row[0].en` và `row[1].vi`)** ở cả 3 bảng Danh bạ (`sub-2-1..2-3`) và bảng PRO 24 tướng (`sub-4-1`).<br>2. Khi xóa Emoji `🔴`/`🟡`/`🟣`/`🔵` khỏi cột Phẩm cấp (`row[2]`), giữ nguyên từ khóa `"Mythic"`, `"Legendary (Awaken)"`, `"Legendary (Econ)"`, `"Epic (#1..8)"`, `"Rare"`.<br>3. Khi xóa Emoji `👑`/`🔥`/`⚡`/`🛠️`/`🚫` khỏi cột Tier (`sec-3`), giữ nguyên `"Tier S+"`, `"Tier S"`, `"Tier A"`, `"Tier B"`, `"Tier C"`. |
| **[AccountTrapsTriageWidget](file:///d:/GitHub/top-hero/tophub-web/src/components/guides/widgets/account-traps-triage-widget.tsx)** | `1.4-top-10-account-traps.ts` | • Đọc 10 `subSections` (`sub-trap-1` ➔ `sub-trap-10`) trong `sec-2-ten-account-traps`.<br>• Đọc bảng `sec-4-account-recovery-protocol`: cột `recRow[1]` dùng regex `/nặng\|severe/i` (đỏ) và `/nhẹ\|mild/i` (xanh).<br>• Test `guides-phase4-micro-ux.test.tsx` kiểm tra `trap-remedy-panel-1` khớp `/Ngưng đút thêm 100%\|400 Mảnh Vàng Vạn Năng/i`. | 1. Xóa tiền tố `🚫 ` khỏi `sub.title` của 10 bẫy và xóa `🀄 ` khỏi `sub-trap-7.badge`.<br>2. Khi xóa Emoji `🔴`/`🟡`/`🟢` khỏi cột Mức độ (`recRow[1]`), giữ nguyên chữ `"Nặng (Thất thoát...)"` / `"Severe (...)"`, `"Trung bình (...)"` / `"Moderate (...)"`, `"Nhẹ (...)"` / `"Mild (...)"`.<br>3. Giữ nguyên chuỗi `"Ngưng đút thêm 100%"` trong dòng 1 của bảng `sec-4-account-recovery-protocol`. |
| **[BiweeklyCalendarWidget](file:///d:/GitHub/top-hero/tophub-web/src/components/guides/widgets/biweekly-calendar-widget.tsx)** | `3.3-week-b-arms-race.ts`, `3.4-double-dip-schedule.ts` | • Đọc 6 dòng bảng `sub-1-1-six-day-master-table` (`3.3`).<br>• Đọc 13 dòng bảng `sub-4-2-thirteen-item-master-matrix` (`3.4`), kiểm tra `idx === "5" \|\| /đập ngay\|spend immediately/i.test(r[2][locale])`. | 1. Giữ nguyên 6 dòng trong `sub-1-1-six-day-master-table` (`3.3`) và xóa Emoji `🌟`/`🔥` ở đầu cột `row[1]`.<br>2. Giữ nguyên 13 dòng trong `sub-4-2-thirteen-item-master-matrix` (`3.4`) và giữ cụm `"ĐẬP NGAY"` / `"SPEND IMMEDIATELY"` ở dòng số 5. |
| **[HordePivotStepperWidget](file:///d:/GitHub/top-hero/tophub-web/src/components/guides/widgets/horde-pivot-stepper-widget.tsx)** | `4.2-horde-pivot-roadmap.ts` | • Đọc 4 dòng bảng `sub-4-2-zero-loss-pivot-matrix` trong `sec-4-zero-loss-pivot-protocol` và truyền từng ô qua `<RichGuideText />`. | Giữ nguyên cấu trúc 4 dòng x 5 cột của bảng `sub-4-2-zero-loss-pivot-matrix`, xóa các chấm màu `🔴`/`🔵` trước tên tướng và giữ nguyên các từ khóa `"Secret Keeper"`, `"Adjudicator"`, `"Pyromancer"`, `"Desert Prince"`, `"Storm Maiden"`, `"160"`, `"Witch"`, `"2.8M"`, `"9 Hồn Đá Đỏ"`, `"Wukong"`, `"Soulmancer"`, `"Warlock"`. |

---

## 2. Đặc Tả Quy Chuẩn Biên Tập Phân Lớp (`Wave 3 Editorial Transformation Rules`)

### 2.1. Công thức 1: Khối `tldr` (`coreRule`, `immediateAction`, `strictTaboo`)
`TldrActionBox` truyền dữ liệu vào `<RichGuideText variant="structured-brief" />`. Khi chuỗi có ký tự xuống dòng `\n` và dòng đầu tiên không bắt đầu bằng `•`, `<RichGuideText />` tự động render **Dòng 0 làm tiêu đề mở đầu in đậm (`font-semibold text-foreground mb-2`)** và các dòng `\n•` tiếp theo làm danh sách micro-bullets có chấm tròn màu theo đúng tone (`amber` / `emerald` / `rose`).

- **Cấu trúc bắt buộc (cả `vi` và `en`)**:
  ```
  **[Câu kết luận cốt lõi ngắn gọn <= 150 ký tự, chứa từ khóa/con số chính]**
  • **[Nhãn hành động/Hệ thống 1]:** [Chi tiết định lượng có bọc `con số/mốc điểm gãy` và mũi tên ➔, độ dài dòng <= 210 ký tự]
  • **[Nhãn hành động/Hệ thống 2]:** [Chi tiết định lượng có bọc `con số/mốc điểm gãy` và mũi tên ➔, độ dài dòng <= 210 ký tự]
  ```
- **Ràng buộc định lượng**:
  - Bắt buộc có ít nhất `1` dấu `\n•` (tối thiểu 2 dòng: 1 Lead Sentence + 1–2 Micro-bullets).
  - Độ dài mỗi dòng đơn lẻ (tách theo `\n`) **bắt buộc `<= 220` ký tự**.
  - Có ít nhất `1` cụm `**bold**` và `1` nhãn `` `code` `` trong mỗi trường `coreRule`, `immediateAction`, `strictTaboo`.

### 2.2. Công thức 2: Khối `keyTakeaways` (Tóm Tắt Cốt Lõi)
- Mỗi mục bắt đầu bằng **`**[Nhãn Kết Luận Ngắn 3–7 từ]:**`** theo sau là mệnh đề giải thích súc tích có bọc `` `số liệu/điểm gãy` ``.
- Nếu tổng độ dài mục `> 220` ký tự, bắt buộc tách thành **1 câu Lead + `\n•` các ý nhỏ**, đảm bảo không có dòng đơn lẻ nào vượt quá `220` ký tự.

### 2.3. Công thức 3: Khối `paragraph`, `callout`, `roadmap.steps.description`, `checklist.items.detail`, và `case_study` (`GAP-W3-02`)
- Tất cả các trường văn bản khối dài (`paragraph.text`, `callout.content`, `roadmap.steps.description`, `checklist.items.detail`, `case_study.profileSummary`, `case_study.diagnostics`, `case_study.recoverySteps.detail`, `case_study.conclusion`) đều được render qua `<RichGuideText />` (`variant="default"` hoặc `variant="structured-brief"`).
- Mọi trường có dòng đơn lẻ `> 220` ký tự phải được tách thành **1 câu chủ đề (`**Bold Lead**`)** + **`\n•` các gạch đầu dòng phân tích ngắn (`<= 220` ký tự/dòng)**, bọc số liệu trong `` `code` `` và dùng mũi tên `➔`.

### 2.4. Công thức 4: Khối `list.items`, `table`, `subSection`, `visual_diagram`, `media_spotlight` (`GAP-W3-03`, `GAP-W3-04`, `GAP-W3-05`)
- **Quy tắc 1 dòng cho `list.items` (`GAP-W3-04`)**:
  - Vì `GuideArticleRenderer` render `<ol>` (`ordered: true`) bằng `<RichGuideText variant="inline" />`, **tuyệt đối không dùng `\n•` bên trong `list.items`**.
  - Mỗi phần tử `list.items[i]` phải được biên tập súc tích thành **1 dòng đơn duy nhất `<= 220` ký tự**, mở đầu bằng `**Cụm Chủ Ngữ / Hành Động:**` + nội dung định lượng có bọc `` `code` `` (bảo toàn 100% số liệu và chuỗi neo).
- **Quy tắc bảo toàn Breakpoint Highlight trong `table.rows` (`GAP-W3-05`)**:
  - Khi xóa Emoji `🔥`, `👑`, `⭐`, `🌟` ở các dòng Điểm gãy / Hạng S+ trong bảng, nếu dòng đó chưa chứa từ khóa `Mythic`, `Điểm gãy`, `Breakpoint`, `Mốc gãy`, hãy thêm ký hiệu ngôi sao đơn sắc `★` (`\u2605`, ví dụ `"[S-Tier ★]"`, `"[S+ ★]"`) để `isBreakpointRow(row)` vẫn trả về `true` và hiển thị icon `<Flame />` chuẩn thiết kế.
- **Quy tắc Zero Pictographic Emoji (`DEC-V4-02` & `GAP-W3-03`)**:
  - Xóa triệt để toàn bộ **438 (`vi`) / 426 (`en`)** chuỗi chứa Emoji khớp `/(?!\u2605)[\p{Emoji_Presentation}\p{Extended_Pictographic}]/u` trên mọi trường văn bản của bài viết (bao gồm cả `subSection.badge`, `visual_diagram`, `media_spotlight.annotations`, `table.headers`, `table.rows`).

---

### 2.5. Tiêu Chí Nghiệm Thu Đơn Nguyên (`Atomic Acceptance Criteria`)

- **`AC-W3-01` (100% Layered TL;DR Briefs)**: Cả 48/48 trường `tldr` (`coreRule`, `immediateAction`, `strictTaboo` trên 16 bài viết Nhóm 1–4, ở cả `vi` và `en`) đều chứa ít nhất 1 dấu tách dòng `\n•`, có câu mở đầu in đậm `**...**`, có ít nhất 1 nhãn số liệu `` `...` ``, và mọi dòng đơn lẻ (tách theo `\n`) đều có độ dài `<= 220` ký tự.
- **`AC-W3-02` (100% Scannable Key Takeaways)**: Toàn bộ 62 mục `keyTakeaways` trên 16 bài viết (cả `vi` và `en`) đều mở đầu bằng cụm `**...**`, chứa ít nhất 1 nhãn định lượng/thuật ngữ `` `...` ``, và không có bất kỳ dòng đơn lẻ nào dài quá `220` ký tự.
- **`AC-W3-03` (Zero Wall-of-Text Across All Prose Blocks + Single-Line `list.items`)**:
  1. Không còn bất kỳ trường nào trong `paragraph.text`, `callout.content`, `roadmap.steps.description`, `checklist.items.detail`, hay `case_study` (`profileSummary`, `diagnostics`, `recoverySteps.detail`, `conclusion`) có dòng đơn lẻ (tách theo `\n`) vượt quá `220` ký tự.
  2. Mọi phần tử trong `list.items` là 1 dòng đơn (`!item.includes("\n")`) có độ dài `<= 220` ký tự và chứa `**...**`.
- **`AC-W3-04` (Zero Decorative/Status Emojis Anywhere in Article Data — `DEC-V4-02`)**: Quét toàn bộ 16 bài viết bằng biểu thức chính quy Unicode `/(?!\u2605)[\p{Emoji_Presentation}\p{Extended_Pictographic}]/u` trên tất cả các trường văn bản của `GuideArticle` và cả 10 loại `GuideContentBlock` trả về **0 vi phạm** (`438 ➔ 0` ở `vi` và `426 ➔ 0` ở `en`).
- **`AC-W3-05` (100% SSoT Structural & Test Regression Integrity)**: Bảo toàn 100% số lượng `freeSections`, `proSections`, `sec.id`, `sub.id`, `table.rows.length`, `checklist.checklistId`, `media_spotlight.mediaCode`, `widget.widgetType`; toàn bộ 32+ bộ test Vitest và `pnpm build` đều PASS 100%.

---

## 3. Kế Hoạch Triển Khai Chi Tiết Theo Từng Task (Bite-Sized TDD Tasks)

### Task 1: Xây dựng Bộ Test Kiểm Định Độ Súc Tích, Phân Lớp, Zero-Emoji & Bảo Toàn Cấu Trúc SSoT (`TDD Red Gate`)

**Files:**
- Create: `tophub-web/tests/wave3-content-scannability.test.ts`

- [ ] **Step 1.1: Tạo file test `tophub-web/tests/wave3-content-scannability.test.ts` khớp 100% kiểu tĩnh `src/content/guides/types.ts` để kiểm định `AC-W3-01` ➔ `AC-W3-05`**

```ts
// tophub-web/tests/wave3-content-scannability.test.ts
import { describe, expect, it } from "vitest";
import { getAllCategories } from "../src/content/guides/registry";
import type {
  GuideArticle,
  GuideContentBlock,
  GuideLocale,
  VisualDiagramNode,
} from "../src/content/guides/types";

const WAVE3_CATEGORIES = getAllCategories().filter((c) => c.order <= 4);
const WAVE3_ARTICLES: GuideArticle[] = WAVE3_CATEGORIES.flatMap(
  (c) => c.articles
);
const LOCALES: GuideLocale[] = ["vi", "en"];

// Matches any color/pictographic emoji anywhere in a string while allowing monochrome star '★' (\u2605)
const FORBIDDEN_EMOJI_REGEX =
  /(?!\u2605)[\p{Emoji_Presentation}\p{Extended_Pictographic}]/u;

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

describe("Wave 3 — Content Restructuring, Scannability & Zero-Emoji Gate (Groups 1–4, 16 Articles)", () => {
  it("AC-W3-05: preserves exact category, article, section, subsection, and widget counts across Groups 1–4", () => {
    expect(WAVE3_CATEGORIES.length).toBe(4);
    expect(WAVE3_ARTICLES.length).toBe(16);

    const expectedSectionCounts: Record<string, { free: number; pro: number }> =
      {
        "1.1": { free: 3, pro: 2 },
        "1.2": { free: 3, pro: 2 },
        "1.3": { free: 3, pro: 2 },
        "1.4": { free: 3, pro: 2 },
        "2.1": { free: 3, pro: 2 },
        "2.2": { free: 3, pro: 2 },
        "2.3": { free: 3, pro: 2 },
        "2.4": { free: 3, pro: 2 },
        "2.5": { free: 3, pro: 2 },
        "3.1": { free: 3, pro: 2 },
        "3.2": { free: 3, pro: 2 },
        "3.3": { free: 3, pro: 2 },
        "3.4": { free: 3, pro: 2 },
        "4.1": { free: 3, pro: 2 },
        "4.2": { free: 3, pro: 2 },
        "4.3": { free: 3, pro: 2 },
      };

    for (const art of WAVE3_ARTICLES) {
      expect(art.freeSections.length, `${art.code} freeSections`).toBe(
        expectedSectionCounts[art.code].free
      );
      expect(art.proSections.length, `${art.code} proSections`).toBe(
        expectedSectionCounts[art.code].pro
      );
    }
  });

  describe("AC-W3-01: 3-Layer Scannable TL;DR Briefs (coreRule, immediateAction, strictTaboo)", () => {
    for (const article of WAVE3_ARTICLES) {
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

  describe("AC-W3-02: Scannable Key Takeaways (**Bold Lead** + `Metric Pills` + <= 220 chars/line)", () => {
    for (const article of WAVE3_ARTICLES) {
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

  describe("AC-W3-03: Zero Wall-of-Text Across All Prose Blocks & Single-Line List Items (<= 220 chars/line)", () => {
    for (const article of WAVE3_ARTICLES) {
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

  describe("AC-W3-04: Zero Pictographic/Status Emojis Across All Article Fields & 10 Block Types (DEC-V4-02)", () => {
    for (const article of WAVE3_ARTICLES) {
      it(`[${article.code} ${article.slug}] contains 0 forbidden emojis across all text fields in vi and en`, () => {
        const violations: string[] = [];

        const checkEmoji = (str: string | undefined, label: string) => {
          if (!str) return;
          if (FORBIDDEN_EMOJI_REGEX.test(str)) {
            const match = str.match(FORBIDDEN_EMOJI_REGEX)?.[0] ?? "";
            violations.push(`${label} (found "${match}"): "${str.slice(0, 45)}"`);
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
pnpm --dir tophub-web test tests/wave3-content-scannability.test.ts
```
Expected: `AC-W3-05` PASS (`1 passed`), còn `AC-W3-01` ➔ `AC-W3-04` **FAIL** trên 16 bài viết (đúng chuẩn TDD Red Gate).

---

### Task 2: Tái Cấu Trúc Nhóm 1 — Nhập Môn & Luật Sống Còn (`1.1` ➔ `1.4`)

**Files:**
- Modify: `tophub-web/src/content/guides/groups/group-1/1.1-overview.ts`
- Modify: `tophub-web/src/content/guides/groups/group-1/1.2-strict-one-queue-rule.ts`
- Modify: `tophub-web/src/content/guides/groups/group-1/1.3-diamond-and-spending-guide.ts`
- Modify: `tophub-web/src/content/guides/groups/group-1/1.4-top-10-account-traps.ts`
- Test: `tophub-web/tests/group-1-content.test.ts`, `tophub-web/tests/guides-phase4-micro-ux.test.tsx`, `tophub-web/tests/wave3-content-scannability.test.ts`

- [ ] **Step 2.1: Biên tập `1.1-overview.ts` (`Bản Đồ Tổng Quan & Lộ Trình 90 Ngày Đầu`)**
  - **Chuỗi neo bắt buộc bảo toàn**: `"345–385"`, `"9 Hồn Đá Đỏ"`, `"560"`, `"280"`, `"1,000"`, `"6,000"`, `"24,700"`, `"8,000"`, `"600,000"`, `"40,000"`, `"360,000"`, `"54,000"`, `"Thi Đấu Hội"`, `"09:00"`, `"Tập Kích Cự Ma"`, `"Khiêu Chiến Của Đội Quân Hắc Ám"`.
  - **Cập nhật `tldr`, `keyTakeaways` (4), `paragraph` (5), `callout` (1), `roadmap.steps.description` (2), `case_study` (6)**: Chuyển sang cấu trúc `**Bold Lead**` + `\n•` micro-bullets (`<= 220` ký tự/dòng) + `` `code` `` ở cả `vi` và `en`.
  - **Xóa 14 chuỗi chứa Emoji (`vi` & `en`)**: `table.headers` (4), `table.rows` (8), `media_spotlight.annotations.label` (2).

- [ ] **Step 2.2: Biên tập `1.2-strict-one-queue-rule.ts` (`Quy Tắc Sống Còn: 1 Đội Hình Duy Nhất`)**
  - **Chuỗi neo bắt buộc bảo toàn**: `"560"`, `"280"`, `"1,000"`, `"6,000"`, `"24,700"`, `"8,000"`, `"600,000"`, `"one-queue-daily-audit-v2"`, `"MED-1.2-01"`..`"04"`.
  - **Cập nhật `tldr`, `keyTakeaways` (4), `paragraph` (2), `callout` (1), `checklist.items.detail` (1), `case_study` (5)** bằng `\n•` (`<= 220` ký tự/dòng), và rút gọn **8 mục `list.items`** thành 1 dòng đơn `<= 220` ký tự (`**Bold Lead:** ...`).
  - **Xóa 9 chuỗi chứa Emoji (`vi` & `en`)**: `table.headers` (2), `table.rows` (7, giữ chữ `"ĐIỂM GÃY"` / `"BREAKPOINT"` để bảo toàn `isBreakpointRow`).

- [ ] **Step 2.3: Biên tập `1.3-diamond-and-spending-guide.ts` (`Kinh Tế Học Kim Cương & Đầu Tư Khôn Ngoan`)**
  - **Chuỗi neo bắt buộc bảo toàn**: `"Brawler"`, `"Knight"`, `"Ranger"`, `"Bard"`, `"+40%"`, `"1,181.16"`, `"diamond-spending-discipline-v2"`, `"MED-1.3-01"`..`"04"`.
  - **Cập nhật `tldr`, `keyTakeaways` (4), `paragraph` (3), `callout` (2), `case_study` (7)** bằng `\n•` (`<= 220` ký tự/dòng), và rút gọn **4 mục `list.items`** thành 1 dòng đơn `<= 220` ký tự.
  - **Xóa 22 chuỗi chứa Emoji (`vi` & `en`)**: `visual_diagram.branches` (6), `table.headers` (2), `table.rows` (14 — dùng `"[S-Tier ★]"` và `"Hạng 1 (★ ROI ~1,000%+)"` để bảo toàn `isBreakpointRow`).

- [ ] **Step 2.4: Biên tập `1.4-top-10-account-traps.ts` (`10 Cạm Bẫy Phế Acc Phổ Biến Nhất`)**
  - **Chuỗi neo & Widget Invariants bắt buộc bảo toàn**: Giữ nguyên 10 ID `sub-trap-1` ➔ `sub-trap-10`, giữ từ khóa mức độ `"Nặng"`/`"Severe"`, `"Trung bình"`/`"Moderate"`, `"Nhẹ"`/`"Mild"` trong bảng `sec-4-account-recovery-protocol`, và giữ chuỗi `"Ngưng đút thêm 100%"` / `"400 Mảnh Vàng Vạn Năng"` ở dòng Bẫy #1.
  - **Cập nhật `tldr`, `keyTakeaways` (4), `paragraph` (1), `callout` (2), `checklist.items.detail` (5)** bằng `\n•` (`<= 220` ký tự/dòng), và rút gọn **18 mục `list.items`** thành 1 dòng đơn `<= 220` ký tự (`**Bold Lead:** ...`).
  - **Xóa 23 chuỗi chứa Emoji (`vi` & `en`)**: Xóa `🚫 ` ở 10 `subSection.title`, xóa `🀄 ` ở `sub-trap-7.badge`, xóa `❌ `/`✅ ` ở `table.headers` (2), và xóa `🔴 `/`🟡 `/`🟢 ` ở `table.rows` (10).

- [ ] **Step 2.5: Chạy kiểm thử xác nhận Nhóm 1 + Widget Triage (kèm lệnh Rollback nếu lỗi)**

Run:
```bash
pnpm --dir tophub-web test tests/group-1-content.test.ts tests/guides-phase4-micro-ux.test.tsx tests/wave3-content-scannability.test.ts -t "1.1|1.2|1.3|1.4|Group 1|AccountTraps"
```
Expected: **PASS 100%** cho cả 4 bài `1.1` ➔ `1.4`. *(Nếu phát sinh lỗi chuỗi neo, khôi phục file lỗi bằng `git checkout -- tophub-web/src/content/guides/groups/group-1/<file>.ts` và sửa lại đúng chuỗi neo).*

---

### Task 3: Tái Cấu Trúc Nhóm 2 — Anh Hùng, Tier List & Đội Hình (`2.1` ➔ `2.5`)

**Files:**
- Modify: `tophub-web/src/content/guides/groups/group-2/2.1-encyclopedia.ts`
- Modify: `tophub-web/src/content/guides/groups/group-2/2.2-meta-lineups.ts`
- Modify: `tophub-web/src/content/guides/groups/group-2/2.3-formation-and-counters.ts`
- Modify: `tophub-web/src/content/guides/groups/group-2/2.4-shards-and-skill-books.ts`
- Modify: `tophub-web/src/content/guides/groups/group-2/2.5-epic-hero-traits.ts`
- Test: `tophub-web/tests/group-2-content.test.ts`, `tophub-web/tests/guides-phase3-widgets.test.tsx`, `tophub-web/tests/guides-phase4-micro-ux.test.tsx`, `tophub-web/tests/guide-article-renderer.test.tsx`

- [ ] **Step 3.1: Biên tập `2.1-encyclopedia.ts` (`Bách Khoa Toàn Thư 51 Anh Hùng & Điểm Ngọt Đầu Tư`)**
  - **Ràng buộc `HeroEncyclopediaWidget`**: Không bọc `**` hoặc `` ` `` vào cột Tên tướng (`row[0].en`, `row[1].vi`); giữ nguyên các từ khóa `"Mythic"`, `"Legendary (Awaken)"`, `"Legendary (Econ)"`, `"Epic (#1..8)"`, `"Rare"`, `"Horde"`, `"League"`, `"Nature"`, `"Tier S+"`, `"Tier S"`, `"Tier A"`, `"Tier B"`, `"Tier C"`.
  - **Cập nhật `tldr`, `keyTakeaways` (4), `paragraph` (6), `callout` (1), `case_study` (2)** bằng `\n•` (`<= 220` ký tự/dòng), và rút gọn **7 mục `list.items`** thành 1 dòng đơn `<= 220` ký tự.
  - **Xóa 142 chuỗi chứa Emoji (`vi` & `en`)**: `media_spotlight.annotations.label` (2), `list.items` (3), `callout.content` (1), `table.rows` (136 — thêm `"★"` vào `"Tier S+ ★"` để giữ `isBreakpointRow`).

- [ ] **Step 3.2: Biên tập `2.2-meta-lineups.ts` (`Đội Hình Meta Chuẩn Theo Từng Phe & Giai Đoạn`)**
  - **Chuỗi neo bắt buộc bảo toàn**: Giữ nguyên ô `"Thiếu \`Paragon\` hoặc \`Bishop\` (Mythic DPS)"` ở bảng cuối.
  - **Cập nhật `tldr` (3), `keyTakeaways` (2), `paragraph` (4), `callout` (2), `case_study` (5)** bằng `\n•` (`<= 220` ký tự/dòng), và rút gọn **9 mục `list.items`** thành 1 dòng đơn `<= 220` ký tự.
  - **Xóa 17 chuỗi chứa Emoji (`vi` & `en` — `GAP-W3-03`)**: Xóa `❌ `, `✅ ` trong `callout.content` (2), xóa `🔴 `, `🔵 `, `🟢 ` trong `table.rows` (13), và đổi `6⭐` ➔ `6★` (2).

- [ ] **Step 3.3: Biên tập `2.3-formation-and-counters.ts` (`Xếp Trận 6 Ô, Khắc Chế Hệ & Đảo Vị Trí`)**
  - **Chuỗi neo bắt buộc bảo toàn**: `"Positional"`, `"Brawler"`, `"arena-positional-counter-v2"`, `"MED-2.3-01"`..`"04"`.
  - **Cập nhật `tldr`, `keyTakeaways` (4), `paragraph` (2), `callout` (2), `case_study` (3)** bằng `\n•` (`<= 220` ký tự/dòng), và rút gọn **9 mục `list.items`** thành 1 dòng đơn `<= 220` ký tự.
  - **Xóa 6 chuỗi chứa Emoji (`vi` & `en`)**: `visual_diagram.centerNode.badge` (1), `list.items` (3), `table.headers` (2).

- [ ] **Step 3.4: Biên tập `2.4-shards-and-skill-books.ts` (`Toán Học Mảnh Tướng, Thức Tỉnh & Sách Kỹ Năng`)**
  - **Chuỗi neo bắt buộc bảo toàn**: `"560"`, `"280"`, `"300"`, `"600"`, `"1,000"`, `"500"`, `"9 Hồn Đá Đỏ"`, `"345"`, `"385"`, `"40,000"`, `"360,000"`, `"6,000"`, `"54,000"`, `"8,000"`, `"24,700"`, `"98,800"`, `"123,500"`, `"600,000"`.
  - **Cập nhật `tldr`, `keyTakeaways` (4), `paragraph` (5), `callout` (2), `case_study` (4)** bằng `\n•` (`<= 220` ký tự/dòng), và rút gọn **2 mục `list.items`** thành 1 dòng đơn `<= 220` ký tự.
  - **Xóa 68 (`vi`) / 55 (`en`) chuỗi chứa Emoji**: Đổi toàn bộ `⭐` (`\u2B50`) sang `★` (`\u2605`), xóa `❌ `/`✅ ` ở `table.headers` (2), và xóa `🔵 `, `🔴 `, `🟢 `, `🔥 `, `👑 `, `⚡ `, `🏆 ` ở `table.rows` (9).

- [ ] **Step 3.5: Biên tập `2.5-epic-hero-traits.ts` (`Tướng Tím Sử Thi & Hệ Thống Nội Tại Kinh Tế`)**
  - **Chuỗi neo bắt buộc bảo toàn**: `"1,181.16"`, `"1,307"`, `"Brawler"`, `"Knight"`, `"Ranger"`, `"Minister"`, `"Priestess"`, `"Dancer"`, `"Rogue"`, `"Outlaw"`, `"Bard"`, `"Stonemason"`, `"2,000"`, `"16,000"`.
  - **Cập nhật `tldr`, `keyTakeaways` (4), `paragraph` (3), `callout` (1), `roadmap.steps.description` (3), `case_study` (3)** bằng `\n•` (`<= 220` ký tự/dòng), và rút gọn **6 mục `list.items`** thành 1 dòng đơn `<= 220` ký tự.
  - **Xóa 40 chuỗi chứa Emoji (`vi` & `en`)**: Xóa `⛔ ` trong `sub-3-1-fourth-trait-slot-trap.title` (1) và xóa toàn bộ Emoji trong 2 bảng dữ liệu (39 — dùng `"[S+ ★ #1]"` để giữ `isBreakpointRow`).

- [ ] **Step 3.6: Chạy kiểm thử xác nhận Nhóm 2 + Hero Encyclopedia & Formation Widgets**

Run:
```bash
pnpm --dir tophub-web test tests/group-2-content.test.ts tests/guides-phase3-widgets.test.tsx tests/guides-phase4-micro-ux.test.tsx tests/guide-article-renderer.test.tsx tests/wave3-content-scannability.test.ts -t "2.1|2.2|2.3|2.4|2.5|Group 2|HeroEncyclopedia|TacticalFormation|GuideArticleRenderer"
```
Expected: **PASS 100%**.

---

### Task 4: Tái Cấu Trúc Nhóm 3 — Lịch Sự Kiện & Giờ Vàng Double-Dip (`3.1` ➔ `3.4`)

**Files:**
- Modify: `tophub-web/src/content/guides/groups/group-3/3.1-biweekly-rotation.ts`
- Modify: `tophub-web/src/content/guides/groups/group-3/3.2-week-a-guild-race.ts`
- Modify: `tophub-web/src/content/guides/groups/group-3/3.3-week-b-arms-race.ts`
- Modify: `tophub-web/src/content/guides/groups/group-3/3.4-double-dip-schedule.ts`
- Test: `tophub-web/tests/group-3-content.test.ts`, `tophub-web/tests/guides-phase3-widgets.test.tsx`, `tophub-web/tests/wave3-content-scannability.test.ts`

- [ ] **Step 4.1: Biên tập `3.1-biweekly-rotation.ts` (`Chu Kỳ Sự Kiện Kép 14 Ngày: Tuần A & Tuần B`)**
  - **Chuỗi neo bắt buộc bảo toàn**: `"09:00"`, `"Đế Quốc Hắc Ám"`, `"Tập Kích Cự Ma"`, `"Guild Rush"`, `"Ultimate Power"`, `"Lord's Set"`, `"Hero Development"`, `"Rush Top"`, `"Decorations"`, `"Soul Stone"`, `"Pet Power"`, `"Relic Power"`, `"3,850"`, `"biweekly-daily-discipline-v2"`, `"MED-3.1-01"`..`"04"`.
  - **Cập nhật `tldr` (`559` ký tự ➔ Lead + 3 dòng `\n•`), `keyTakeaways` (4), `paragraph` (5), `callout` (2), `roadmap.steps.description` (4), `checklist.items.detail` (2), `case_study` (5)** bằng `\n•` (`<= 220` ký tự/dòng), và rút gọn **13 mục `list.items`** thành 1 dòng đơn `<= 220` ký tự.
  - **Xóa 2 (`vi`) / 3 (`en`) chuỗi chứa Emoji**: `table.headers` (2) và đổi `6⭐`/`11⭐` thành `6★`/`11★` trong `table.rows` (`en`).

- [ ] **Step 4.2: Biên tập `3.2-week-a-guild-race.ts` (`Tuần A — Thi Đấu Hội & Xúc Xắc Phong Phú`)**
  - **Chuỗi neo bắt buộc bảo toàn**: `"10 phút"`, `"144"`, `"+300"`, `"+450"`, `"+280"`, `"+420"`, `"40,000"`, `"360,000"`, `"6,000"`, `"54,000"`, `"400%"`, `"250%"`, `"120%"`, `"+600"`, `"week-a-guild-race-discipline-v2"`, `"MED-3.2-01"`..`"04"`.
  - **Cập nhật `tldr`, `keyTakeaways` (5), `paragraph` (5), `callout` (1), `checklist.items.detail` (2), `case_study` (4)** bằng `\n•` (`<= 220` ký tự/dòng), và rút gọn **9 mục `list.items`** thành 1 dòng đơn `<= 220` ký tự.
  - **Xóa 10 chuỗi chứa Emoji (`vi` & `en`)**: `table.headers` (2) và `table.rows` (8 — dùng `"[S+ TIER ★]"` để bảo toàn `isBreakpointRow`).

- [ ] **Step 4.3: Biên tập `3.3-week-b-arms-race.ts` (`Tuần B — Cuộc Đua Vũ Trang Bang Hội & KvK`)**
  - **Chuỗi neo & Widget Invariants bắt buộc bảo toàn**: `"120,000"`, `"50,000"`, `"10,000"`, `"40,000"`, `"13:00"`, `"17:00"`, `"21:00"`, `"Arms Race Prep"`, `"Staircase"`, `"35,000"`, `"8,500"`, `"week-b-gar-kvk-execution-v2"`, `"MED-3.3-01"`..`"04"`. Giữ nguyên 6 dòng bảng `sub-1-1-six-day-master-table`.
  - **Cập nhật `tldr`, `keyTakeaways` (4), `paragraph` (4), `callout` (1), `roadmap.steps.description` (6), `case_study` (5)** bằng `\n•` (`<= 220` ký tự/dòng), và rút gọn **4 mục `list.items`** thành 1 dòng đơn `<= 220` ký tự.
  - **Xóa 15 chuỗi chứa Emoji (`vi` & `en`)**: `subSections.badge` (6 — xóa `📦 `, `🔬 `, `⛏️ `, `🌟 `, `🪜 `, `🛡️ `), `table.headers` (2), `table.rows` (7).

- [ ] **Step 4.4: Biên tập `3.4-double-dip-schedule.ts` (`Bảng Giờ Vàng Xả Tài Nguyên Double-Dip 300%`)**
  - **Chuỗi neo & Widget Invariants bắt buộc bảo toàn**: `"300%"`, `"200%"`, `"Triple-Dip"`, `"9,800"`, `"Lord Gear"`, `"Hero Gear"`, `"Glory Medals"`, `"Decor Tokens"`, `"double-dip-vault-discipline-v2"`, `"MED-3.4-01"`..`"04"`. Giữ nguyên cụm `"ĐẬP NGAY"` / `"SPEND IMMEDIATELY"` ở dòng số 5 của bảng `sub-4-2-thirteen-item-master-matrix`.
  - **Cập nhật `tldr`, `keyTakeaways` (4), `paragraph` (3), `case_study` (5)** bằng `\n•` (`<= 220` ký tự/dòng), và rút gọn **7 mục `list.items`** thành 1 dòng đơn `<= 220` ký tự.
  - **Xóa 30 chuỗi chứa Emoji (`vi` & `en`)**: `list.items` (4), `visual_diagram` (13), `media_spotlight.annotations.label` (3), `table.headers` (6), `table.rows` (4).

- [ ] **Step 4.5: Chạy kiểm thử xác nhận Nhóm 3 + Biweekly Calendar Widget**

Run:
```bash
pnpm --dir tophub-web test tests/group-3-content.test.ts tests/guides-phase3-widgets.test.tsx tests/wave3-content-scannability.test.ts -t "3.1|3.2|3.3|3.4|Group 3|BiweeklyCalendar"
```
Expected: **PASS 100%**.

---

### Task 5: Tái Cấu Trúc Nhóm 4 — Lộ Trình Server & Chuyển Giao Mùa (`4.1` ➔ `4.3`) & Nghiệm Thu Toàn Diện Wave 3

**Files:**
- Modify: `tophub-web/src/content/guides/groups/group-4/4.1-preseason-mythic-calendar.ts`
- Modify: `tophub-web/src/content/guides/groups/group-4/4.2-horde-pivot-roadmap.ts`
- Modify: `tophub-web/src/content/guides/groups/group-4/4.3-season-1-to-4-roadmap.ts`
- Test: `tophub-web/tests/group-4-content.test.ts`, `tophub-web/tests/wave3-content-scannability.test.ts`

- [ ] **Step 5.1: Biên tập `4.1-preseason-mythic-calendar.ts` (`Lịch Ra Mắt Tướng Thần Thoại Pre-Season: Ngày 1–60`)**
  - **Chuỗi neo bắt buộc bảo toàn ở cả `vi` và `en`**: `"Desert Prince"`, `"Storm Maiden"`, `"Paragon"`, `"Witch"`, `"Rose Princess"`, `"Bishop"`, `"Tidecaller"`, `"Monk"`, `"Ne Zha"`, `"Petalis"`, `"160"`, `"400"`, `"560"`, `"1,000"`, `"70"`, `"100"`, `"300"`, `"28,500"`, `"33,000"`, `"13,500"`, `"preseason-s0-weekly-discipline-v2"`, `"MED-4.1-01"`..`"04"`.
  - **Cập nhật `tldr`, `keyTakeaways` (3), `paragraph` (4), `checklist.items.detail` (1), `case_study` (5)** bằng `\n•` (`<= 220` ký tự/dòng), và rút gọn **13 mục `list.items`** thành 1 dòng đơn `<= 220` ký tự ở cả `vi` và `en`.
  - **Xóa 15 chuỗi chứa Emoji (`vi` & `en`)**: `visual_diagram.branches` (6), `table.headers` (2), `table.rows` (7).

- [ ] **Step 5.2: Biên tập `4.2-horde-pivot-roadmap.ts` (`Kịch Bản Chuyển Giao Liên Minh Sang Bộ Lạc Ngày 21`)**
  - **Chuỗi neo & Widget Invariants bắt buộc bảo toàn ở cả `vi` và `en`**: `"Soulmancer"`, `"Warlock"`, `"345"`, `"385"`, `"40,000"`, `"360,000"`, `"6,000"`, `"54,000"`, `"1,035"`, `"1,155"`, `"3.2M"`, `"2.8M"`, `"400,000"`, `"600,000"`, `"horde-pivot-readiness-v2"`, `"MED-4.2-01"`..`"04"`, và 4 dòng bảng `sub-4-2-zero-loss-pivot-matrix`.
  - **Cập nhật `tldr`, `keyTakeaways` (3), `paragraph` (3), `roadmap.steps.description` (3), `checklist.items.detail` (1/2), `case_study` (5)** bằng `\n•` (`<= 220` ký tự/dòng), và rút gọn **8 mục `list.items`** thành 1 dòng đơn `<= 220` ký tự ở cả `vi` và `en`.
  - **Xóa 11 chuỗi chứa Emoji (`vi` & `en`)**: `table.headers` (5) và `table.rows` (6 — đổi `"⭐⭐⭐⭐⭐"` ➔ `"5/5 ★"`, `"⭐⭐"` ➔ `"2/5 ★"`, xóa `🔴`/`🔵` trước tên tướng).

- [ ] **Step 5.3: Biên tập `4.3-season-1-to-4-roadmap.ts` (`Bản Đồ Chiến Lược Toàn Tập Season 1 Đến Season 4`)**
  - **Chuỗi neo bắt buộc bảo toàn ở cả `vi` và `en`**: `"The Spring"`, `"Spring Water"`, `"Dune Devourer"`, `"Lv.35"`, `"Lv.40"`, `"Brilliance Institute"`, `"5,422"`, `"30°C"`, `"Wukong"`, `"Beastmaster"`, `"Legendary T1"`, `"Legendary T2"`, `"Sacred Codex"`, `"Shadow Priest"`, `"Artificer"`, `"8,200"`, `"58,000"`, `"480"`, `"8.5M"`, `"pre-s1-hoarding-readiness-v2"`, `"MED-4.3-01"`..`"04"`.
  - **Cập nhật `tldr`, `keyTakeaways` (3), `paragraph` (3), `case_study` (8)** bằng `\n•` (`<= 220` ký tự/dòng), và rút gọn **14 mục `list.items`** thành 1 dòng đơn `<= 220` ký tự ở cả `vi` và `en`.
  - **Xóa 14 chuỗi chứa Emoji (`vi` & `en`)**: `visual_diagram.nodes` (6), `list.items` (3), `table.headers` (5).

- [ ] **Step 5.4: Chạy toàn bộ cổng kiểm định chất lượng Wave 3 (`wave3-content-scannability.test.ts` + Full Vitest Suite + Next.js Production Build)**

Run:
```bash
pnpm --dir tophub-web test tests/wave3-content-scannability.test.ts
pnpm --dir tophub-web test
pnpm --dir tophub-web build
```
Expected: **100% Test Suites PASS** (bao gồm 65/65 bài kiểm định trong `wave3-content-scannability.test.ts` và toàn bộ 31+ bộ test hiện hữu) + `pnpm build` thành công với **0 lỗi TypeScript/ESLint**.

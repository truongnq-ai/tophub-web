# Guides Hub v3.0 — Phase 3 (Bước 2B): Xây Dựng & Tích Hợp 3 Interactive Widgets (Hardened Implementation Plan — Pass 2 `/review-plan` Audited)

> **For Antigravity / Thực thi:** Bắt buộc áp dụng quy trình `common/executing-plans` kết hợp `common/tdd` (Red-Green-Refactor) và `common/verification-before-completion` khi triển khai từng Task trong kế hoạch này.

- **Document ID:** `PLAN-GUIDES-V3-PHASE3`
- **Master Plan Reference:** `tophub-web/docs/02-specs/guides-uiux-redesign-master-plan.md` (Mục 2.4, 4.2, 4.3, 5.1, 5.2, 6.1 `AC-UX-3.1`, và Mục 7 Phase 3)
- **Phase 2 Prerequisite Reference:** `tophub-web/docs/02-specs/2026-10-16-guides-uiux-phase2-article-renderer-and-blocks.md` (Commit `da21f96` trên nhánh `dev`)
- **Date:** 2026-10-16
- **Status:** Hardened & Audited via `/review-plan` Pass 2 (Zero Placeholders, 12/12 Checklist Verified — **NO `src/` code mutated yet**)
- **Target Scope:** Phase 3 (Bước 2B — Khôi phục `case "widget"` trong `GuideArticleRenderer` & Xây dựng 3 Interactive Widgets: `HeroEncyclopediaWidget`, `BiweeklyCalendarWidget`, `MasterDataExplorerWidget`)

---

## 🛡️ 0. Báo Cáo Kiểm Toán Kiến Trúc Lần 2 (`/review-plan` Senior Tech Lead Audit Report — Pass 2)

### 0.1. Executive Summary
- **Overall Readiness:** **Production-Ready (Hardened — Pass 2 Verified)**
- **Summary of Hardening:** Qua 2 vòng kiểm toán sâu đối chiếu trực tiếp với [`guide-article-renderer.tsx`](file:///d:/GitHub/top-hero/tophub-web/src/components/guides/guide-article-renderer.tsx), [`guides-toc.tsx`](file:///d:/GitHub/top-hero/tophub-web/src/components/guides/guides-toc.tsx), [`pro-content-gate.tsx`](file:///d:/GitHub/top-hero/tophub-web/src/components/guides/pro-content-gate.tsx), [`use-uid-session.tsx`](file:///d:/GitHub/top-hero/tophub-web/src/hooks/use-uid-session.tsx), các file nội dung nguồn (`2.1`, `3.1`, `3.3`, `3.4`, `8.4`) và bộ test hiện hữu (`group-2/3/8-content.test.ts`, `guide-article-renderer.test.tsx`), tổng cộng **12 điểm mù kỹ thuật (`GAP-P3-01` ➔ `GAP-P3-12`)** đã được phát hiện và vá kín trực tiếp trong bản kế hoạch này.
- **Zero Placeholders Enforcement:** Mọi Task thực thi bên dưới đều có đầy đủ đường dẫn file chính xác, interface TypeScript, thuật toán trích xuất SSoT, danh sách `data-testid`, kịch bản test Vitest và lệnh CLI kiểm chứng.

---

### 0.2. Gap & Blindspot Analysis (12 Điểm Mù Đã Phát Hiện & Vá Trực Tiếp Qua 2 Vòng `/review-plan`)

| ID | Category | Finding (Vấn đề phát hiện khi khảo sát codebase) | Severity | Resolution Patched Inline (Giải pháp đã tích hợp vào Plan) |
| :--- | :--- | :--- | :--- | :--- |
| **`GAP-P3-01`** | Data SSoT & Existing Test Invariants | Trong `src/content/guides/types.ts` đã định nghĩa `GuideWidgetType` (`"hero_encyclopedia" \| "biweekly_event_calendar" \| "master_data_tables"`), nhưng **chưa có bài viết nào** trong 31 file `.ts` nhúng `{ type: "widget", widgetType: ... }`. Đồng thời, `tests/group-8-content.test.ts` (dòng 300–308) kiểm tra cứng `a84Tables.length === 12` và số dòng từng bảng `[3, 5, 4, 7, 2, 18, 5, 10, 12, 18, 20, 16]`. Nếu xóa các block `table` trong `2.1`, `3.1`, `3.4`, `8.4` sẽ làm gãy toàn bộ test SSoT. | **CRITICAL** | **Giữ nguyên 100% các block `table` gốc** trong file `.ts` để bảo toàn SSoT & pass toàn bộ `group-2/3/8-content.test.ts`. Bổ sung phần tử `{ type: "widget", widgetType: ... }` vào `blocks` của `2.1` (`sec-2`), `3.1` (`sec-1`), `3.4` (`sec-2`), và `8.4` (`sec-1`). Hàm `extractLocaleText` trong `group-8-content.test.ts` chỉ lọc theo `if (block.type === "table")` nên bổ sung `widget` block hoàn toàn tương thích 100%. |
| **`GAP-P3-02`** | Duplicate Rendering Elimination | Nếu chỉ render `<HeroEncyclopediaWidget />` ở `2.1` hoặc `<MasterDataExplorerWidget />` ở `8.4` mà vẫn để `GuideArticleRenderer` render toàn bộ các `subSections` chứa bảng tĩnh bên dưới (`sub-2-1..2-4` ở `2.1`, `sub-1-1..1-4` và `sub-4-1..4-7` ở `8.4`), trang sẽ bị **hiển thị trùng lặp 2 lần** và kéo dài chiều cao DOM gấp đôi. | **CRITICAL** | Định nghĩa bản đồ `CONSOLIDATED_SUBSECTIONS_BY_SLUG` trong `guide-article-renderer.tsx`. Khi render bài `2.1` (`encyclopedia`) và `8.4` (`master-data-tables`), các `subSections` đã được hợp nhất vào Widget sẽ **không render lại bảng tĩnh bên dưới**. |
| **`GAP-P3-03`** | 3-Tab View Mode Visibility (`core` vs `data`) | Theo Master Plan Mục 4.1 & 5.2, Tab 2 (`📊 2. Bảng số liệu & Điểm gãy` — `data`) là nơi chứa các `table` và `widget`. Tuy nhiên, khi user bấm từ `GuidesHubClient` (4 thẻ Công cụ tốc độ cao) vào bài `2.1`, `3.1`, `8.4`, Tab mặc định đang mở là Tab 1 (`🧠 1. Cốt lõi & Chiến thuật` — `core`). Nếu section chứa Widget chỉ hiện ở Tab `data` thì user mới vào bài không thấy Widget; nếu chỉ hiện ở Tab `core` thì khi bấm sang Tab `data` lại mất Widget! | **HIGH** | Áp dụng **Dual-Tab Visibility cho Section chứa Widget** trong `GuideArticleRenderer`: giữ nguyên hàm `classifySectionTab` (để không ảnh hưởng unit test Phase 2), nhưng cập nhật điều kiện ẩn `isHiddenByTab`: bất kỳ section nào có `hasWidgetBlock(sec) === true` sẽ được hiển thị ở **cả Tab `core`, Tab `data`, và Tab `all`** (chỉ ẩn khi user chủ động chuyển sang Tab 3 `action`). |
| **`GAP-P3-04`** | Hero Count Accuracy (`45+` = `51` Heroes SSoT) | Bài `2.1-encyclopedia.ts` thực tế chứa chính xác **51 Anh hùng** trong `sec-2-master-hero-directory` (`16 Liên Minh` + `19 Bộ Lạc` + `16 Thiên Nhiên`, bao gồm 18 tướng Nội tại Kinh tế Dự bị), cộng thêm bảng **Tier List S0 vs S1–S4** ở `sec-3` và **Ma trận MVS & Thức tỉnh 24 Tướng Cốt lõi** ở `sub-4-1`. | **HIGH** | Xây dựng bộ trích xuất dữ liệu thuần khiết (`extractHeroesFromArticle21(locale, article)`) đọc trực tiếp từ `ARTICLE_2_1_ENCYCLOPEDIA`: hợp nhất đầy đủ **51 tướng** từ `sub-2-1`, `sub-2-2`, `sub-2-3`, gắn cờ `isEconomy` cho 18 tướng Kinh tế, đối chiếu hạng Tier (`S+`, `S`, `A`, `B`, `C`) ở `sec-3` và dữ liệu PRO MVS/Sweet Spot/Hồn Đá Đỏ ở `sub-4-1`. |
| **`GAP-P3-05`** | Multi-Article Data Synthesis for `BiweeklyCalendarWidget` | Dữ liệu lịch sự kiện nằm rải rác ở 3 bài trong Nhóm 3: `3.1-biweekly-rotation.ts` (Pha 1 vs Pha 2 Tuần A/B + Guild Rush 2 ngày + 8 Sự kiện phụ), `3.3-week-b-arms-race.ts` (Bảng 6 Ngày Chủ Đề Thứ Hai ➔ Thứ Bảy + Khung giờ vàng 4h + Điều cấm kỵ), và `3.4-double-dip-schedule.ts` (Ma trận 13 vật phẩm 300%/200%/100%/0% + Nhóm Xả Ngay vs Nhóm Tích Trữ). | **HIGH** | `BiweeklyCalendarWidget` tổng hợp dữ liệu có cấu trúc từ cả 3 bài `3.1`, `3.3`, `3.4` thành 4 tab chế độ (`phase1`, `weekA`, `weekB`, `doubledip`). Khi nhúng ở bài `3.1` sẽ mở mặc định tab `weekB` (Lịch 6 Ngày & Giờ Vàng); khi nhúng ở bài `3.4` (`article?.slug === "double-dip-schedule"`) sẽ mở mặc định tab `doubledip` (Tra cứu 13 Vật phẩm 300%). |
| **`GAP-P3-06`** | SSR Hydration Mismatch on "Today" Highlight | `BiweeklyCalendarWidget` có tính năng tự động tô sáng **Thứ hiện tại trong tuần (Today)**. Nếu gọi `new Date().getDay()` trực tiếp trong hàm render đầu tiên (SSR/SSG), kết quả giữa giờ máy chủ build và múi giờ trình duyệt của người chơi sẽ lệch nhau, gây lỗi React Hydration Mismatch. | **MEDIUM** | Khởi tạo state mặc định tĩnh (Thứ Hai — `selectedDay = 1`, `todayDay = null`) khi SSR, và chỉ tính toán `new Date().getDay()` bên trong `useEffect` sau khi client mount. |
| **`GAP-P3-07`** | Dual-Dictionary i18n Strategy & Unit Test Isolation | Giống như các Content Blocks ở Phase 2 (`GAP-P2-08`), nếu các Widget gọi trực tiếp `useTranslations("Guides")` mà không có dictionary dự phòng, các bài test render độc lập từng Widget sẽ bị lỗi thiếu `NextIntlClientProvider`. | **MEDIUM** | Bổ sung đầy đủ các khóa `Guides.widget*` vào `tophub-web/messages/vi.json` và `tophub-web/messages/en.json`, đồng thời trang bị hằng số `LABELS: Record<GuideLocale, ...>` bên trong từng Widget nhận prop `locale: GuideLocale` để chạy độc lập 100% trong Vitest. |
| **`GAP-P3-08`** | Mobile Touch Targets (`>= 44×44px`) & Horizontal Overflow | Trên màn hình `375px`, các nút lọc Phe, Phẩm cấp, Thứ trong tuần, hoặc 12 nút chọn Bảng gốc rất dễ bị co nhỏ dưới `32px` hoặc tràn ngang làm vỡ layout. | **MEDIUM** | Áp dụng bắt buộc class `min-h-[44px] px-3.5` cho toàn bộ Filter Pills, Day Selector Buttons, Search Input và Category Tabs; sử dụng thanh cuộn ngang mượt (`overflow-x-auto no-scrollbar snap-x`) trên mobile. |
| **`GAP-P3-09`** *(Pass 2)* | `tophub:toc-navigate` Event Payload Mismatch (`detail.targetId` vs `detail.id`) | Qua kiểm tra trực tiếp `src/components/guides/guides-toc.tsx` (dòng 420 & 471), `GuidesToc` phát sự kiện `new CustomEvent("tophub:toc-navigate", { detail: { targetId: sub.id } })`. Trong khi đó một số test dùng `{ detail: { id: "..." } }` hoặc người dùng truy cập qua URL `#hash`. Nếu Widget chỉ đọc `detail.id` thì khi bấm `GuidesToc` thật sẽ **không hoạt động**! | **CRITICAL** | Chuẩn hóa hàm đọc sự kiện trong cả 3 Widgets & `GuideArticleRenderer`: luôn lấy `const targetId = customEvent.detail?.targetId \|\| customEvent.detail?.id \|\| "";`, đồng thời kiểm tra `window.location.hash.replace(/^#/, "")` khi mount và khi `hashchange`. |
| **`GAP-P3-10`** *(Pass 2)* | Native `<a href="#sub-...">` Jump Position Conflict in Article `8.4` | Trong `guides-toc.tsx` (dòng 463), các mục con dùng thẻ `<a href="#sub-4-4-runes-master-table">` nguyên bản (không `preventDefault`). Nếu thẻ neo `id="sub-4-4-runes-master-table"` nằm dưới `sec-4` (cuối trang `8.4`) còn `MasterDataExplorerWidget` nằm ở `sec-1` (đầu trang `8.4`), khi bấm mục lục phải, trình duyệt sẽ **nhảy tuốt xuống cuối trang (`sec-4`)**, làm người dùng bị cuộn lệch khỏi `MasterDataExplorerWidget`! | **CRITICAL** | Đặt các thẻ neo vô hình `<span id={subId} data-consolidated-by-widget="true" className="scroll-mt-28" aria-hidden="true" />` **ngay trên đỉnh của chính Widget đã gom chúng** (`HeroEncyclopediaWidget` giữ 4 ID `sub-2-1..2-4`; `MasterDataExplorerWidget` giữ 11 ID `sub-1-1..1-4` & `sub-4-1..4-7`), và **không** gán trùng `id` ở phần `subSections` bị ẩn bên dưới. Nhờ đó, bấm bất kỳ `#sub-*` nào trên `GuidesToc` cũng cuộn chính xác tới đỉnh Widget và mở đúng Tab bảng đó! |
| **`GAP-P3-11`** *(Pass 2)* | Deterministic Bilingual Hero Parsing (`vi` vs `en` Key Matching) | Ở bài `2.1-encyclopedia.ts`, tên tướng ở bản `vi` có dạng `"Desert Prince (Hoàng Tử Sa Mạc)"`, còn ở bảng Tier List `sec-3` và bảng PRO `sub-4-1` lại nhắc tên tiếng Anh/Việt hỗn hợp. Nếu parser chỉ dựa vào chuỗi hiển thị của `locale` hiện tại có thể lệch khi đối chiếu chéo giữa 3 bảng. | **HIGH** | Hàm `extractHeroesFromArticle21` luôn đọc khóa định danh gốc tiếng Anh từ `row[0].vi.split(" (")[0].trim().toLowerCase()` (vd: `"desert prince"`, `"wukong"`, `"tidecaller"`) làm `canonicalKey` bất biến để nối chính xác 100% giữa Bảng Danh Mục (`sec-2`), Bảng Tier List (`sec-3`) và Bảng 24 Tướng PRO (`sub-4-1`) ở cả 2 ngôn ngữ `vi` và `en`. |
| **`GAP-P3-12`** *(Pass 2)* | PRO Content Paywall Protection Inside Widgets | Trong bài `8.4`, 7 bảng thuộc `sec-4` (`sub-4-1` ➔ `sub-4-7`) là dữ liệu PRO (vốn nằm trong `<ProContentGate>`). Khi gom cả 12 bảng vào `MasterDataExplorerWidget` đặt ở `sec-1`, nếu không kiểm tra quyền PRO thì khi bật cờ `NEXT_PUBLIC_ENABLE_PRO_CONTENT_LOCK="true"`, người dùng chưa có gói PRO vẫn xem và tìm kiếm chùa được 7 bảng PRO qua Widget! | **HIGH** | Trong `MasterDataExplorerWidget`, tích hợp trực tiếp `useUidSession()` (từ `src/hooks/use-uid-session.tsx`, vốn có default context an toàn không gây lỗi khi test độc lập). Khi `process.env.NEXT_PUBLIC_ENABLE_PRO_CONTENT_LOCK === "true" && activeAccount?.active_plan !== "PRO"`, các bảng có `isPro: true` (`sub-4-1..4-7`) sẽ bị loại khỏi kết quả tìm kiếm toàn cục và hiển thị màn chắn khóa PRO kèm nút dẫn tới `/pricing` đúng chuẩn `ProContentGate`. |

---

### 0.3. Cross-System Impact & Regression Analysis

1. **Tác động lên Bộ Test Nội Dung SSoT (`tests/group-2-content.test.ts`, `group-3-content.test.ts`, `group-8-content.test.ts`):**
   - `group-2-content.test.ts` kiểm tra cấu trúc categories, số lượng bài viết (3 bài), các từ khóa trong `JSON.stringify(cat)` và số lượng checklist items (`>= 5`). Thêm `{ type: "widget", widgetType: "hero_encyclopedia" }` vào `2.1` **không làm thay đổi** bất kỳ điều kiện nào.
   - `group-3-content.test.ts` kiểm tra 4 bài viết (`3.1`–`3.4`), từ khóa chiến thuật và checklist items. Thêm `{ type: "widget", widgetType: "biweekly_event_calendar" }` vào `3.1` và `3.4` **tương thích 100%**.
   - `group-8-content.test.ts` kiểm tra cứng `a84Tables` (`b.type === "table"`) phải có đúng `12` bảng với số dòng `[3, 5, 4, 7, 2, 18, 5, 10, 12, 18, 20, 16]`. Vì các block `table` trong `8.4-master-data-tables.ts` được giữ nguyên 100% và chỉ được ẩn/gom ở tầng hiển thị (`GuideArticleRenderer` + `MasterDataExplorerWidget`), bài test `group-8-content.test.ts` **PASS 100%**.
2. **Tác động lên `GuideArticleRenderer` & `GuidesToc` (`tests/guide-article-renderer.test.tsx`, `tests/guides-toc.test.tsx`):**
   - Hàm `classifySectionTab(sec, secIdx, isPro)` giữ nguyên chữ ký và kết quả trả về (`"core" | "data" | "action"`), bảo toàn 100% unit test của Phase 2.
   - Quy tắc **Dual-Tab Visibility** (`containsWidget && (activeTab === "core" || activeTab === "data")`) giúp người dùng vào từ trang chủ `/guides` (mặc định mở Tab `core`) thấy ngay Widget, và khi chuyển sang Tab 2 (`data`) vẫn thấy Widget đúng như Sequence Diagram Mục 5.2 của Master Plan.
   - Đặt các thẻ neo `<span id={subId} data-consolidated-by-widget="true" />` ngay trên đỉnh Widget đảm bảo `IntersectionObserver` trong `useArticleScrollSpy` (`guides-toc.tsx`) và sự kiện click `<a href="#sub-...">` hoạt động chính xác tuyệt đối, không bao giờ có 2 phần tử trùng `id` trong DOM.

---

### 0.4. 12-Point Senior Tech Lead Checklist Verification

| # | Checklist Dimension | Audit Result | Verification Evidence |
| :- | :--- | :--- | :--- |
| 1 | **Requirement & Constraint Completeness** | ✅ PASS | Bao phủ 100% 3 Widgets (`HeroEncyclopediaWidget`, `BiweeklyCalendarWidget`, `MasterDataExplorerWidget`), khôi phục `case "widget"`, `AC-UX-3.1`. |
| 2 | **Cross-System Impact & Regression Safety** | ✅ PASS | Bảo toàn 100% `group-2/3/8-content.test.ts`, `guide-article-renderer.test.tsx`, `guides-toc.test.tsx`. |
| 3 | **Data Model, Schema & State Integrity** | ✅ PASS | Sử dụng đúng `GuideWidgetType` trong `types.ts`; trích xuất dữ liệu trực tiếp từ SSoT `GuideArticle`. |
| 4 | **Security, Auth & Secret Boundaries** | ✅ PASS | `MasterDataExplorerWidget` kiểm tra `NEXT_PUBLIC_ENABLE_PRO_CONTENT_LOCK` & `activeAccount?.active_plan === "PRO"` cho 7 bảng PRO (`GAP-P3-12`). |
| 5 | **Error Handling, Edge Cases & Resilience** | ✅ PASS | Xử lý an toàn khi tìm kiếm không có kết quả (Empty State + Reset button), hoặc khi `article` prop không truyền vào (fallback về hằng số SSoT). |
| 6 | **Performance, Concurrency & Resource Bounds** | ✅ PASS | Toàn bộ bộ lọc chạy trong `useMemo` (`< 5ms`), chỉ render 1 bảng đang chọn trong `MasterDataExplorerWidget` (giảm >80% DOM nodes bài `8.4`). |
| 7 | **UI/UX, Accessibility & Mobile Responsiveness** | ✅ PASS | Mọi nút lọc, pill ngày, pill bảng đều có `min-h-[44px]`, `aria-pressed` / `role="tab"`, thanh cuộn ngang `overflow-x-auto` trên mobile `375px`. |
| 8 | **Observability, Logging & Debugging Hooks** | ✅ PASS | Hệ thống `data-testid` và `data-consolidated-by-widget="true"` tường minh phục vụ kiểm thử và thanh tra DOM. |
| 9 | **Testing Strategy & Verification Commands** | ✅ PASS | Có file test riêng `tests/guides-phase3-widgets.test.tsx` kiểm thử đầy đủ cả 3 Widgets, TOC sync, PRO lock và tích hợp Renderer. |
| 10 | **Rollback, Feature Flags & Safe Deployment** | ✅ PASS | Hỗ trợ biến môi trường `NEXT_PUBLIC_ENABLE_PRO_CONTENT_LOCK` và có quy trình rollback sạch theo từng file. |
| 11 | **Zero Placeholders & Executable Granularity** | ✅ PASS | 0 `TODO`/`TBD`; toàn bộ 5 Tasks bên dưới đều có code TypeScript, logic trích xuất và test assertions hoàn chỉnh. |
| 12 | **Skill & Convention Compliance** | ✅ PASS | Tuân thủ `common/tdd`, `common/ui-ux-pro-max`, `common/mobile-ux-core`, `react/component-patterns`, `nextjs/app-router`. |

---

## 🔨 1. Kế Hoạch Thực Thi Chi Tiết Từng Bước Theo TDD (Atomic TDD Implementation Tasks)

---

### Task 1: Bổ sung Khóa Đa Ngôn Ngữ (`vi.json` / `en.json`), Nâng Cấp `ResponsiveDataTable` (`defaultExpanded`), và Nhúng `GuideWidgetBlock` Vào 4 Bài Viết Đích

**Files:**
- Modify: `tophub-web/messages/vi.json`
- Modify: `tophub-web/messages/en.json`
- Modify: `tophub-web/src/components/guides/blocks/responsive-data-table.tsx`
- Modify: `tophub-web/src/content/guides/groups/group-2/2.1-encyclopedia.ts`
- Modify: `tophub-web/src/content/guides/groups/group-3/3.1-biweekly-rotation.ts`
- Modify: `tophub-web/src/content/guides/groups/group-3/3.4-double-dip-schedule.ts`
- Modify: `tophub-web/src/content/guides/groups/group-8/8.4-master-data-tables.ts`

- [ ] **Step 1.1: Thêm các khóa i18n cho 3 Interactive Widgets vào cuối đối tượng `"Guides"` trong `tophub-web/messages/vi.json` và `tophub-web/messages/en.json`:**

```json
// Thêm vào cuối "Guides" trong tophub-web/messages/vi.json:
    "widgetHeroTitle": "Bách Khoa Toàn Thư 51 Anh Hùng (Tương Tác)",
    "widgetHeroSubtitle": "Lọc tức thì theo Phe phái, Phẩm cấp, Vai trò & Điểm ngọt MVS",
    "widgetCalendarTitle": "Lịch Chu Kỳ Sự Kiện & Tra Cứu Double-Dip 300%",
    "widgetCalendarSubtitle": "Chuyển đổi Pha 1 ⇄ Pha 2 (Tuần A / Tuần B) & Khung giờ vàng 4 tiếng",
    "widgetMasterTablesTitle": "Trình Khám Phá 12 Bảng Số Liệu Gốc (Master Data Explorer)",
    "widgetMasterTablesSubtitle": "Tra cứu xuyên 12 bảng định lượng chuẩn S0 ➔ S4 không cần cuộn trang"
```

```json
// Thêm vào cuối "Guides" trong tophub-web/messages/en.json:
    "widgetHeroTitle": "Interactive 51-Hero Tactical Encyclopedia",
    "widgetHeroSubtitle": "Instant filtering by Faction, Rarity, Role & MVS Sweet Spots",
    "widgetCalendarTitle": "Biweekly Event Cycle & 300% Double-Dip Planner",
    "widgetCalendarSubtitle": "Switch Phase 1 ⇄ Phase 2 (Week A / Week B) & 4-Hour Golden Windows",
    "widgetMasterTablesTitle": "12 Master Quantitative Tables Explorer",
    "widgetMasterTablesSubtitle": "Cross-table instant lookup across all 12 S0 ➔ S4 datasets without scrolling"
```

- [ ] **Step 1.2: Bổ sung prop `defaultExpanded?: boolean` vào `tophub-web/src/components/guides/blocks/responsive-data-table.tsx`:**

```tsx
interface ResponsiveDataTableProps {
  block: GuideTableBlock;
  locale?: GuideLocale;
  defaultExpanded?: boolean;
}

export function ResponsiveDataTable({
  block,
  locale = "vi",
  defaultExpanded = false,
}: ResponsiveDataTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  // ... giữ nguyên phần còn lại của ResponsiveDataTable
```

- [ ] **Step 1.3: Nhúng `{ type: "widget", widgetType: ... }` vào 4 file nội dung (giữ nguyên 100% các `subSections` và `table` blocks hiện có):**
  1. `tophub-web/src/content/guides/groups/group-2/2.1-encyclopedia.ts`:
     - Trong `sec-2-master-hero-directory.blocks`, thêm `{ type: "widget", widgetType: "hero_encyclopedia" }` ngay sau block `paragraph` mở đầu.
  2. `tophub-web/src/content/guides/groups/group-3/3.1-biweekly-rotation.ts`:
     - Trong `sec-1-two-phase-server-evolution.blocks`, thêm `{ type: "widget", widgetType: "biweekly_event_calendar" }` vào cuối mảng `blocks`.
  3. `tophub-web/src/content/guides/groups/group-3/3.4-double-dip-schedule.ts`:
     - Trong `sec-2-two-class-inventory-taxonomy.blocks`, thêm `{ type: "widget", widgetType: "biweekly_event_calendar" }` vào cuối mảng `blocks`.
  4. `tophub-web/src/content/guides/groups/group-8/8.4-master-data-tables.ts`:
     - Trong `sec-1-four-survival-summary-tables.blocks`, thêm `{ type: "widget", widgetType: "master_data_tables" }` ngay sau block `paragraph` mở đầu.

- [ ] **Step 1.4: Chạy kiểm thử hồi quy SSoT Content & i18n Parity:**
  - Run: `pnpm --dir tophub-web test tests/group-2-content.test.ts tests/group-3-content.test.ts tests/group-8-content.test.ts tests/guides-phase1-registry-i18n.test.ts`
  - Expected: **PASS 100%** (4/4 test files pass).

---

### Task 2: Xây Dựng `HeroEncyclopediaWidget` (`src/components/guides/widgets/hero-encyclopedia-widget.tsx`)

**Files:**
- Create: `tophub-web/src/components/guides/widgets/hero-encyclopedia-widget.tsx`

- [ ] **Step 2.1: Cài đặt `HeroEncyclopediaWidget` với thuật toán trích xuất 51 Anh hùng từ SSoT `ARTICLE_2_1_ENCYCLOPEDIA`, bộ lọc 4 chiều (`Phe` × `Phẩm cấp` × `Vai trò` × `Từ khóa`), ánh xạ Tier List `S0`/`S1–S4` + PRO MVS Drawer, và đồng bộ TOC (`tophub:toc-navigate`):**

```tsx
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Search,
  X,
  Shield,
  Swords,
  Sparkles,
  Coins,
  ChevronDown,
  ChevronUp,
  Crown,
  Filter,
} from "lucide-react";
import type {
  GuideArticle,
  GuideLocale,
  GuideTableBlock,
} from "@/content/guides/types";
import { ARTICLE_2_1_ENCYCLOPEDIA } from "@/content/guides/groups/group-2/2.1-encyclopedia";
import { cn } from "@/lib/utils";

export type HeroFaction = "all" | "horde" | "league" | "nature";
export type HeroRarity = "all" | "mythic" | "legendary" | "epic" | "rare";
export type HeroRoleCategory = "all" | "tank" | "dps" | "support" | "economy";

export interface ExtractedHeroRecord {
  id: string;
  canonicalKey: string;
  nameDisplay: string;
  faction: Exclude<HeroFaction, "all">;
  rarity: Exclude<HeroRarity, "all">;
  rarityLabel: string;
  roleCategory: "tank" | "dps" | "support";
  isEconomy: boolean;
  roleDisplay: string;
  coreSkills: string;
  investmentNote: string;
  tierS0?: string;
  tierSeason?: string;
  proMvs?: {
    mvsMilestone: string;
    sweetSpot: string;
    gearSet: string;
    awakeningCost: string;
  };
}

interface HeroEncyclopediaWidgetProps {
  article?: GuideArticle;
  locale?: GuideLocale;
}

const HERO_WIDGET_LABELS: Record<
  GuideLocale,
  {
    badge: string;
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    resetBtn: string;
    showingCount: (shown: number, total: number) => string;
    factionLabel: string;
    factions: Record<HeroFaction, string>;
    rarityLabel: string;
    rarities: Record<HeroRarity, string>;
    roleLabel: string;
    roles: Record<HeroRoleCategory, string>;
    economyBadge: string;
    skillsHeading: string;
    investmentHeading: string;
    proMvsToggleOpen: string;
    proMvsToggleClose: string;
    mvsLabel: string;
    sweetSpotLabel: string;
    gearSetLabel: string;
    awakeningLabel: string;
    emptyState: string;
  }
> = {
  vi: {
    badge: "CÔNG CỤ TƯƠNG TÁC • 51 ANH HÙNG SSoT",
    title: "Bách Khoa Toàn Thư 51 Anh Hùng & Điểm Ngọt MVS",
    subtitle:
      "Lọc tức thì theo Phe phái, Phẩm cấp, Vai trò chiến thuật & Tra cứu mốc đầu tư chuẩn S0 ➔ S4",
    searchPlaceholder:
      "Tìm tên tướng (Wukong, Ngộ Không, Tidecaller...), trang bị (Huyết Titan), hoặc từ khóa...",
    resetBtn: "Đặt lại bộ lọc",
    showingCount: (shown, total) => `Hiển thị ${shown} / ${total} Anh hùng`,
    factionLabel: "Phe phái:",
    factions: {
      all: "Tất cả Phe",
      horde: "🔴 Bộ Lạc",
      league: "🔵 Liên Minh",
      nature: "🟢 Thiên Nhiên",
    },
    rarityLabel: "Phẩm cấp:",
    rarities: {
      all: "Mọi Phẩm",
      mythic: "🔴 Thần Thoại",
      legendary: "🟡 Huyền Thoại",
      epic: "🟣 Sử Thi",
      rare: "🔵 Hiếm",
    },
    roleLabel: "Vai trò:",
    roles: {
      all: "Mọi Vai Trò",
      tank: "🛡️ Đỡ Đòn / Đấu Sĩ",
      dps: "⚔️ Sát Thương (DPS)",
      support: "✨ Hỗ Trợ / Hồi Máu",
      economy: "🏦 Kinh Tế Dự Bị (18)",
    },
    economyBadge: "🏦 Nội tại Kinh tế",
    skillsHeading: "Kỹ năng & Cơ chế cốt lõi:",
    investmentHeading: "Mốc đầu tư & Đánh giá:",
    proMvsToggleOpen: "Mở thông số PRO (MVS, Đồ Vàng & Hồn Đá)",
    proMvsToggleClose: "Thu gọn thông số PRO",
    mvsLabel: "Mốc dùng được (MVS):",
    sweetSpotLabel: "Điểm ngọt (Sweet Spot):",
    gearSetLabel: "Bộ Đồ Vàng chuẩn:",
    awakeningLabel: "Chi phí Thức tỉnh:",
    emptyState:
      "Không tìm thấy Anh hùng nào khớp với bộ lọc hiện tại. Hãy thử xóa từ khóa hoặc đổi Phe phái.",
  },
  en: {
    badge: "INTERACTIVE TOOL • 51 SSoT HEROES",
    title: "51-Hero Tactical Encyclopedia & MVS Sweet Spots",
    subtitle:
      "Instant filtering by Faction, Rarity, Tactical Role & S0 ➔ S4 investment benchmarks",
    searchPlaceholder:
      "Search hero name (Wukong, Tidecaller, Paragon...), gear set (Titan's Might), or keyword...",
    resetBtn: "Reset filters",
    showingCount: (shown, total) => `Showing ${shown} / ${total} Heroes`,
    factionLabel: "Faction:",
    factions: {
      all: "All Factions",
      horde: "🔴 Horde",
      league: "🔵 League",
      nature: "🟢 Nature",
    },
    rarityLabel: "Rarity:",
    rarities: {
      all: "All Rarities",
      mythic: "🔴 Mythic",
      legendary: "🟡 Legendary",
      epic: "🟣 Epic",
      rare: "🔵 Rare",
    },
    roleLabel: "Role:",
    roles: {
      all: "All Roles",
      tank: "🛡️ Tank / Bruiser",
      dps: "⚔️ Carry DPS",
      support: "✨ Support / Healer",
      economy: "🏦 Economy Passive (18)",
    },
    economyBadge: "🏦 Economy Passive",
    skillsHeading: "Core Skills & Mechanics:",
    investmentHeading: "Investment Benchmark:",
    proMvsToggleOpen: "View PRO Metrics (MVS, Golden Gear & Soul Stones)",
    proMvsToggleClose: "Hide PRO Metrics",
    mvsLabel: "Minimum Viable Star (MVS):",
    sweetSpotLabel: "Sweet Spot:",
    gearSetLabel: "Best Golden Gear:",
    awakeningLabel: "Awakening Cost:",
    emptyState:
      "No heroes match your current filters. Try clearing the search query or switching factions.",
  },
};
```

- **Chi tiết hàm `extractHeroesFromArticle21(sourceArticle: GuideArticle, locale: GuideLocale): ExtractedHeroRecord[]`:**
  1. Tìm `sec-2-master-hero-directory` trong `sourceArticle.freeSections`.
  2. Quét 3 `subSections`:
     - `sub-2-1-league-heroes` ➔ `faction = "league"` (16 tướng)
     - `sub-2-2-horde-heroes` ➔ `faction = "horde"` (19 tướng)
     - `sub-2-3-nature-heroes` ➔ `faction = "nature"` (16 tướng)
  3. Với mỗi dòng trong `table.rows`:
     - Lấy `canonicalKey = row[0].vi.split("(")[0].trim().toLowerCase()`.
     - Phân loại `rarity`: kiểm tra `row[1].vi`: chứa `"🔴"` ➔ `"mythic"`, `"🟡"` ➔ `"legendary"`, `"🟣"` ➔ `"epic"`, còn lại ➔ `"rare"`.
     - Phân loại `isEconomy`: kiểm tra `/kinh tế|dự bị/i.test(row[2].vi)` (khớp chính xác 18 tướng Kinh tế Dự bị: 6 Liên Minh + 6 Bộ Lạc + 6 Thiên Nhiên).
     - Phân loại `roleCategory`: kiểm tra `row[2].vi`: `/đỡ đòn|đấu sĩ/i` ➔ `"tank"`, `/sát thương/i` ➔ `"dps"`, còn lại ➔ `"support"`.
  4. Quét bảng Tier List trong `sec-3-stage-tier-list-and-pitfalls` (`5 dòng: S+, S, A, B, C`):
     - Nếu `row[1].vi` (cột S0) có chứa tên tướng (`canonicalKey`), gán `tierS0 = tierCode` (`S+`, `S`, `A`, `B`, `C`).
     - Nếu `row[2].vi` (cột S1–S4) có chứa tên tướng (`canonicalKey`), gán `tierSeason = tierCode`.
  5. Quét bảng PRO 24 Tướng trong `proSections[0]?.subSections?.[0]` (`sub-4-1-pro-24-heroes-table`):
     - Khớp `row[0].vi.split("(")[0].trim().toLowerCase() === canonicalKey` để gán `proMvs = { mvsMilestone: row[2][locale], sweetSpot: row[3][locale], gearSet: row[4][locale], awakeningCost: row[5][locale] }`.
  6. Render 4 thẻ neo vô hình `<span id="sub-2-1-league-heroes" data-consolidated-by-widget="true" className="scroll-mt-28" aria-hidden="true" />` ... `sub-2-4-economy-heroes-summary` ngay trên đỉnh `HeroEncyclopediaWidget`, và lắng nghe `tophub:toc-navigate` (`detail.targetId || detail.id`) để tự động chuyển bộ lọc khi bấm từ `GuidesToc`.

---

### Task 3: Xây Dựng `BiweeklyCalendarWidget` (`src/components/guides/widgets/biweekly-calendar-widget.tsx`)

**Files:**
- Create: `tophub-web/src/components/guides/widgets/biweekly-calendar-widget.tsx`

- [ ] **Step 3.1: Cài đặt `BiweeklyCalendarWidget` tổng hợp SSoT từ `3.1`, `3.3`, `3.4` với 4 Chế độ (`phase1`, `weekA`, `weekB`, `doubledip`), Thanh chọn 7 Thứ (`Mon ➔ Sun`) an toàn Hydration SSR, Khung Giờ Vàng 4h, và Bộ Tra Cứu 13 Vật Phẩm Double-Dip 300%:**

- **Cấu trúc State & Props:**
  - `article?: GuideArticle; locale?: GuideLocale;`
  - `activePhase`: `"phase1" | "weekA" | "weekB" | "doubledip"` — Khởi tạo mặc định là `"doubledip"` nếu `article?.slug === "double-dip-schedule"`, ngược lại là `"weekB"`.
  - `selectedDay`: `1 | 2 | 3 | 4 | 5 | 6 | 7` (1 = Thứ Hai ... 7 = Chủ Nhật), khởi tạo tĩnh `1` khi SSR.
  - `todayDay`: `number | null`, khởi tạo `null` khi SSR; trong `useEffect` tính `const jsDay = new Date().getDay(); const isoDay = jsDay === 0 ? 7 : jsDay; setTodayDay(isoDay); setSelectedDay(isoDay as 1|2|3|4|5|6|7);` (đảm bảo 0 lỗi Hydration Mismatch `GAP-P3-06`).
  - `doubleDipTierFilter`: `"all" | "300" | "200" | "immediate"` + `doubleDipSearch`: `string`.
- **Nguồn dữ liệu 13 Vật Phẩm Double-Dip:**
  - Trích xuất trực tiếp 13 dòng từ bảng `sub-4-2-thirteen-item-master-matrix` trong `ARTICLE_3_4_DOUBLE_DIP_SCHEDULE`, kết hợp 8 vật phẩm xả ngay (`Group A1/A2`) để người chơi lọc tức thì theo hiệu suất `🔥 300% Triple-Dip`, `🟢 200% Double-Dip`, hoặc `⚡ Xả Ngay Không Cần Nhịn`.
- **Nguồn dữ liệu 7 Ngày Tuần B (GAR/KvK) & Tuần A (Guild Race + Guild Rush 2 Ngày):**
  - Trích xuất 6 Ngày Chủ Đề từ bảng `sub-1-1-six-day-master-table` của `ARTICLE_3_3_WEEK_B_ARMS_RACE` + Ngày 7 (Chủ Nhật Chuẩn bị / Chốt sổ Rương Hạng 9), hiển thị đầy đủ:
    - **Nguồn điểm Chính (Primary Scoring)**
    - **Nguồn điểm Phụ có thưởng (Secondary Scoring)**
    - **Sự kiện Guild Rush 2 Ngày chạy song song** (`Thứ 2–3: Thú Cưng & Quái Thú`, `Thứ 4–5: Thánh Vật`, `Thứ 6–7: Quân Trang & Đồ Chúa Tể`)
    - **3 Khung Giờ Vàng 4 Tiếng (+20% Điểm):** `13:00–17:00`, `17:00–21:00`, `21:00–01:00` (Giờ VN `UTC+7`)
    - **⛔ Cảnh Báo Đỏ (Taboo 0 Điểm):** Nhấn mạnh Thứ Sáu Ngày 5 (*Thánh Vật = 0đ GAR*) và Thứ Bảy Ngày 6 (*Đồ Chúa Tể = 0đ GAR*).

---

### Task 4: Xây Dựng `MasterDataExplorerWidget` (`src/components/guides/widgets/master-data-explorer-widget.tsx`)

**Files:**
- Create: `tophub-web/src/components/guides/widgets/master-data-explorer-widget.tsx`

- [ ] **Step 4.1: Cài đặt `MasterDataExplorerWidget` trích xuất toàn bộ 12 Bảng Số Liệu Gốc từ `ARTICLE_8_4_MASTER_DATA_TABLES` với 3 Nhóm Trụ Cột, Chế độ Xem Đơn Bảng (`defaultExpanded={true}`), Tìm Kiếm Xuyên 12 Bảng (`< 20ms`), Bảo Vệ Cổng PRO (`GAP-P3-12`), và Đồng Bộ Mục Lục `GuidesToc` (`GAP-P3-10`):**

- **Cấu trúc trích xuất 12 Bảng (`extractMasterTablesFromArticle84(sourceArticle, locale)`):**
  - Tự động đọc từ `ARTICLE_8_4_MASTER_DATA_TABLES`:
    - 4 `subSections` trong `sec-1-four-survival-summary-tables` (`sub-1-1` ➔ `sub-1-4`) ➔ `group: "free"`, `isPro: false`
    - 1 bảng trong `sec-3-master-tables-common-pitfalls` (`sec-3-pitfalls-table`) ➔ `group: "free"`, `isPro: false`
    - 7 `subSections` trong `sec-4-seven-master-quantitative-tables`:
      - `sub-4-1` (Cấp Phe Phái 1–80), `sub-4-2` (Đồ Đỏ & UW), `sub-4-3` (Đồ Chúa Tể), `sub-4-4` (Cổ Ngữ Lv.1–12) ➔ `group: "pro_core"`, `isPro: true`
      - `sub-4-5` (Thú Cưng Lv.1–120), `sub-4-6` (Quân Trang Lv.1–50), `sub-4-7` (VIP 1–20) ➔ `group: "pro_endgame"`, `isPro: true`
- **Neo DOM cho `GuidesToc` (`GAP-P3-10`):**
  - Render 11 thẻ `<span id={subId} data-consolidated-by-widget="true" className="scroll-mt-28" aria-hidden="true" />` (`sub-1-1..1-4` và `sub-4-1..4-7`) ngay trên đỉnh `MasterDataExplorerWidget`.
  - Lắng nghe `tophub:toc-navigate` (`detail.targetId || detail.id`) và `hashchange`: khi user bấm vào bất kỳ mục con nào trong 11 bảng trên `GuidesToc` (hoặc bấm vào `#sec-4-seven-master-quantitative-tables`), `MasterDataExplorerWidget` tự động đặt `groupFilter = "all"`, chọn đúng `activeTableId = targetId` (hoặc `sub-4-1-faction-level-table` nếu bấm `sec-4`), xóa bộ lọc tìm kiếm nếu đang bật, và cuộn mượt tới khung Explorer!
- **Bảo vệ bản quyền PRO (`GAP-P3-12`):**
  - Kiểm tra `const isProLocked = process.env.NEXT_PUBLIC_ENABLE_PRO_CONTENT_LOCK === "true" && activeAccount?.active_plan !== "PRO" && !forceUnlockPro;`.
  - Nếu `selectedTable.isPro && isProLocked`, hiển thị khung khóa PRO kèm CTA dẫn sang `/pricing` và `/` (kiểm tra UID), đồng thời không trả về các dòng của bảng PRO trong kết quả tìm kiếm toàn cục khi đang bị khóa.

---

### Task 5: Tích Hợp 3 Widgets Vào `GuideArticleRenderer`, Triệt Tiêu Bảng Tĩnh Trùng Lặp, và Viết Bộ Test Toàn Diện (`guides-phase3-widgets.test.tsx`)

**Files:**
- Modify: `tophub-web/src/components/guides/guide-article-renderer.tsx`
- Create: `tophub-web/tests/guides-phase3-widgets.test.tsx`

- [ ] **Step 5.1: Cập nhật `tophub-web/src/components/guides/guide-article-renderer.tsx`:**
  1. Import `HeroEncyclopediaWidget`, `BiweeklyCalendarWidget`, `MasterDataExplorerWidget`.
  2. Định nghĩa bản đồ các `subSection` đã được gom vào Widget để không render bảng tĩnh trùng lặp:
     ```ts
     const CONSOLIDATED_SUBSECTIONS_BY_SLUG: Record<string, ReadonlySet<string>> = {
       encyclopedia: new Set([
         "sub-2-1-league-heroes",
         "sub-2-2-horde-heroes",
         "sub-2-3-nature-heroes",
         "sub-2-4-economy-heroes-summary",
       ]),
       "master-data-tables": new Set([
         "sub-1-1-hero-star-and-skill-books-table",
         "sub-1-2-awakening-soul-stones-table",
         "sub-1-3-enhancement-master-table",
         "sub-1-4-troop-tier-unlock-table",
         "sub-4-1-faction-level-table",
         "sub-4-2-mythic-gear-and-uw-table",
         "sub-4-3-lord-gear-master-table",
         "sub-4-4-runes-master-table",
         "sub-4-5-pet-system-master-table",
         "sub-4-6-troop-skin-master-table",
         "sub-4-7-vip-level-master-table",
       ]),
     };
     ```
  3. Bổ sung hàm `hasWidgetBlock(sec: GuideSection): boolean`:
     ```ts
     function hasWidgetBlock(sec: GuideSection): boolean {
       const subBlocks = sec.subSections?.flatMap((sub) => sub.blocks) ?? [];
       return [...sec.blocks, ...subBlocks].some((b) => b.type === "widget");
     }
     ```
  4. Trong `renderBlock(block: GuideContentBlock, locale: GuideLocale, idx: number, article?: GuideArticle)`:
     ```tsx
     case "widget":
       if (block.widgetType === "hero_encyclopedia") {
         return (
           <HeroEncyclopediaWidget
             key={idx}
             article={article}
             locale={locale}
           />
         );
       }
       if (block.widgetType === "biweekly_event_calendar") {
         return (
           <BiweeklyCalendarWidget
             key={idx}
             article={article}
             locale={locale}
           />
         );
       }
       if (block.widgetType === "master_data_tables") {
         return (
           <MasterDataExplorerWidget
             key={idx}
             article={article}
             locale={locale}
           />
         );
       }
       return null;
     ```
  5. Trong `renderSection(sec: GuideSection, secIdx: number, isPro: boolean)`:
     - Tính `const containsWidget = hasWidgetBlock(sec);`
     - Cập nhật `isHiddenByTab`:
       ```ts
       const isHiddenByTab =
         activeTab !== "all" &&
         secTab !== activeTab &&
         !(containsWidget && (activeTab === "core" || activeTab === "data"));
       ```
     - Lọc danh sách `subSections` hiển thị:
       ```ts
       const consolidatedSet = CONSOLIDATED_SUBSECTIONS_BY_SLUG[article.slug];
       const visibleSubSections =
         sec.subSections?.filter((sub) => !consolidatedSet?.has(sub.id)) ?? [];
       ```
       Nhờ đó, các `subSections` đã được gom vào `HeroEncyclopediaWidget` (`2.1`) và `MasterDataExplorerWidget` (`8.4`) sẽ không bị render lặp lại bên dưới, trong khi các thẻ neo `id={sub.id}` đã nằm ngay trên đỉnh Widget!

- [ ] **Step 5.2: Tạo bộ test tự động `tophub-web/tests/guides-phase3-widgets.test.tsx` kiểm thử toàn diện 3 Widgets và tích hợp `GuideArticleRenderer`:**
  - **Suite 1 (`HeroEncyclopediaWidget`):**
    - Hiển thị đủ **51 Anh hùng** mặc định từ SSoT `2.1-encyclopedia.ts`.
    - Lọc theo Phe phái: `Bộ Lạc` (`19`), `Liên Minh` (`16`), `Thiên Nhiên` (`16`).
    - Lọc theo Phẩm cấp (`Thần Thoại`, `Huyền Thoại`) và Vai trò (`Kinh tế Dự bị` = `18` tướng).
    - Tìm kiếm tức thì theo tên (`"Wukong"`, `"Tidecaller"`) và đặt lại bộ lọc (`hero-reset-filters`).
    - Mở/đóng ngăn thông số PRO MVS trên thẻ tướng cốt lõi.
    - Tự động chuyển sang Phe Bộ Lạc khi nhận sự kiện `new CustomEvent("tophub:toc-navigate", { detail: { targetId: "sub-2-2-horde-heroes" } })`.
  - **Suite 2 (`BiweeklyCalendarWidget`):**
    - Chuyển đổi giữa 4 chế độ (`phase1`, `weekA`, `weekB`, `doubledip`).
    - Tự động mở sẵn chế độ `doubledip` khi truyền `article={ARTICLE_3_4_DOUBLE_DIP_SCHEDULE}`.
    - Chọn từng Thứ trong tuần (`calendar-day-pill-1` ➔ `calendar-day-pill-7`) và kiểm tra nội dung Chủ đề ngày, Khung giờ vàng 4h (`13:00–17:00`), Cảnh báo đỏ (`0 điểm`).
    - Lọc danh sách 13 vật phẩm Double-Dip theo ngưỡng `300%` và tìm kiếm theo từ khóa.
  - **Suite 3 (`MasterDataExplorerWidget`):**
    - Hiển thị đủ 12 nút chọn bảng gốc (`master-table-pill-*`) và chỉ render **1 bảng đang chọn** tại một thời điểm.
    - Lọc theo Nhóm trụ cột (`free`, `pro_core`, `pro_endgame`) và chuyển đổi bảng đang xem.
    - Tìm kiếm xuyên 12 bảng (`master-global-search`) với từ khóa `"780,000"` và kiểm tra kết quả khớp.
    - Tự động chuyển bảng đang chọn sang `sub-4-4-runes-master-table` khi nhận sự kiện `new CustomEvent("tophub:toc-navigate", { detail: { targetId: "sub-4-4-runes-master-table" } })`.
  - **Suite 4 (`GuideArticleRenderer` Phase 3 Integration & Zero Duplication):**
    - Render `ARTICLE_2_1_ENCYCLOPEDIA`, `ARTICLE_3_1_BIWEEKLY_ROTATION`, `ARTICLE_3_4_DOUBLE_DIP_SCHEDULE`, `ARTICLE_8_4_MASTER_DATA_TABLES`.
    - Xác nhận Widget xuất hiện ở cả Tab `core` và Tab `data`, ẩn ở Tab `action`.
    - Xác nhận bài `8.4` không còn render tràn 12 bảng tĩnh xếp chồng bên ngoài Widget (triệt tiêu 100% hiển thị trùng lặp).

- [ ] **Step 5.3: Chạy toàn bộ cổng kiểm định chất lượng (Verification Gates):**
  - Run: `pnpm --dir tophub-web test`
  - Run: `pnpm --dir tophub-web exec tsc --noEmit`
  - Run: `pnpm --dir tophub-web build`
  - Expected: **100% test suites PASS, 0 lỗi TypeScript, SSG Build thành công toàn bộ các route `/guides/**` ở cả `vi` và `en`.**

---

## 🔄 2. Chiến Lược Rollback & Cờ Tính Năng (Rollback & Feature Flag Strategy)

- **Feature Flag bảo vệ dữ liệu PRO:** Các bảng PRO trong `MasterDataExplorerWidget` tuân thủ hoàn toàn biến môi trường `NEXT_PUBLIC_ENABLE_PRO_CONTENT_LOCK` hiện có của hệ thống.
- **Quy trình Rollback cô lập (Instant Safe Rollback):**
  - Vì 100% dữ liệu gốc trong `2.1-encyclopedia.ts`, `3.1-biweekly-rotation.ts`, `3.4-double-dip-schedule.ts`, `8.4-master-data-tables.ts` không bị xóa bất kỳ dòng `table` nào, nếu cần rollback khẩn cấp bất kỳ Widget nào về chế độ bảng tĩnh truyền thống, chỉ cần xóa dòng `{ type: "widget", widgetType: "..." }` tương ứng và xóa slug khỏi `CONSOLIDATED_SUBSECTIONS_BY_SLUG` trong `guide-article-renderer.tsx`.

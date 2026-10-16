# 🛡️ Plan Audit & Hardening Report — Guides Hub v3.0 Phase 4 (Hardened v1.3 — Pass 3 Deep Audit)

**Evaluated Plan**: [`tophub-web/docs/02-specs/2026-10-16-guides-uiux-phase4-category-micro-ux-and-final-qa.md`](file:///d:/GitHub/top-hero/tophub-web/docs/02-specs/2026-10-16-guides-uiux-phase4-category-micro-ux-and-final-qa.md)
**Master Spec Reference**: [`tophub-web/docs/02-specs/guides-uiux-redesign-master-plan.md`](file:///d:/GitHub/top-hero/tophub-web/docs/02-specs/guides-uiux-redesign-master-plan.md)
**Audit Result**: `APPROVED WITH REVISIONS (Hardened v1.3 — 19/19 Gaps Patched, 12/12 Senior Tech Lead Checkpoints Passed, 0 Ambiguities)`

---

## 0. Bức Tranh Tổng Thể Master Plan (`Guides Hub v3.0` — 4 Phases)

Dự án cải tổ `Guides Hub v3.0` chuyển đổi kho dữ liệu chiến thuật `Top Heroes` (**31 bài viết** thuộc **8 Danh mục lớn**, song ngữ `vi`/`en`, khoảng **37.000 dòng dữ liệu SSoT**) từ giao diện văn bản dài truyền thống sang **Tactical Command Center v3.0**:

| Giai đoạn | Trọng tâm Kiến trúc | Trạng thái & Đầu ra Kỹ thuật |
| :--- | :--- | :--- |
| **Phase 1 (Bước 1)** | **Layout 3 Cột, Navigation & 4-Layer Hub** | ✅ **Hoàn tất 100%** — `GuidesShell` (`max-w-[1440px]`), `GuidesSidebar` (`w-64`, Single-Accordion, `CompactUidStatusPill`), `GuidesToc` (`w-56`, Neon Shuttle Bubble + Mobile Sticky Sub-Header), `GuidesHubClient` 4 tầng. |
| **Phase 2 (Bước 2A)** | **Article Renderer v3.0 & 8 Content Blocks** | ✅ **Hoàn tất 100%** — Khử hộp (De-Boxing), Unified 3-Column Tactical Brief, Sticky 3-Tab View Mode (`core \| data \| action \| all`), đồng bộ `tophub:toc-navigate`, nâng cấp 8 Content Blocks (`ResponsiveDataTable` đã có `table-filter-input`, `table-expand-toggle` và `data-breakpoint-row`). |
| **Phase 3 (Bước 2B)** | **3 Flagship Interactive Widgets** | ✅ **Hoàn tất 100%** — `HeroEncyclopediaWidget` (`2.1`), `BiweeklyCalendarWidget` (`3.1`, `3.4`), `MasterDataExplorerWidget` (`8.4`), cơ chế Dual-Tab Visibility (`core` + `data`) và `CONSOLIDATED_SUBSECTIONS_BY_SLUG` (`151/151 tests passing`). |
| **Phase 4 (Bước 2C)** | **Micro-UX Chuyên biệt 8 Danh mục (31 Bài) & Nghiệm thu Tổng thể** | 🔄 **Trọng tâm Bản Kế Hoạch này** — Xây dựng và tích hợp 5 Category Micro-UX Widgets cho 6 bài hạt nhân (`1.4`, `2.2`, `2.3`, `4.2`, `5.2`, `7.1`), đồng bộ hóa trải nghiệm 3-Tab trên toàn bộ 31 bài viết trong 8 Danh mục, và nghiệm thu tổng thể đa thiết bị. |

---

## 1. 🔍 Gap & Blindspot Analysis (19/19 Gaps Identified & Patched Across Pass 1, Pass 2 & Pass 3)

| # | Mã GAP | Hạng mục kiểm tra | Phát hiện / Điểm mù (Blindspot) | Mức độ rủi ro | Biện pháp vá trong Revised Plan v1.3 |
|---|---|---|---|---|---|
| 1 | `GAP-P4-13` | **Contract Breaking (`types.ts`)** | Trong bản nháp v1.0, `GuideWidgetType` bị viết nhầm là `"biweekly_calendar"` và `"master_data_explorer"`. Thực tế trong [`src/content/guides/types.ts`](file:///d:/GitHub/top-hero/tophub-web/src/content/guides/types.ts#L188-L191) và [`tests/guides-phase3-widgets.test.tsx`](file:///d:/GitHub/top-hero/tophub-web/tests/guides-phase3-widgets.test.tsx#L79-L98), 3 khóa Phase 3 chính xác là `"hero_encyclopedia" \| "biweekly_event_calendar" \| "master_data_tables"`. | `CRITICAL` | Giữ nguyên 100% 3 khóa Phase 3 (`"hero_encyclopedia"`, `"biweekly_event_calendar"`, `"master_data_tables"`) và chỉ nối thêm 5 khóa mới của Phase 4 vào `GuideWidgetType`. |
| 2 | `GAP-P4-14` | **Runtime Crash (`CONSOLIDATED_SUBSECTIONS_BY_SLUG`)** | Trong [`guide-article-renderer.tsx`](file:///d:/GitHub/top-hero/tophub-web/src/components/guides/guide-article-renderer.tsx#L50-L70), `CONSOLIDATED_SUBSECTIONS_BY_SLUG` có kiểu `Record<string, ReadonlySet<string>>` (gọi `consolidatedSet?.has(sub.id)` ở dòng 248) với khóa `"encyclopedia"` và `"master-data-tables"`. Bản nháp v1.0 dùng mảng `string[]` và ghi nhầm slug `"all-heroes-tier-list"`, `"twelve-master-data-tables"`, sẽ gây lỗi `TypeError: consolidatedSet.has is not a function`! | `CRITICAL` | Giữ nguyên kiểu `Record<string, ReadonlySet<string>>` (`new Set([...])`) và bảo toàn nguyên vẹn 2 khóa `"encyclopedia"`, `"master-data-tables"` của Phase 3; chỉ bổ sung các khóa `ReadonlySet<string>` của Phase 4. |
| 3 | `GAP-P4-15` | **Self-Hiding Widget Bug (`section.blocks` vs `subSection.blocks`)** | Trong bản nháp v1.0, block `{ type: "widget" }` của bài `5.2` được chèn vào `sub-1-1-three-golden-sets-decoded-table.blocks`, nhưng `sub-1-1-three-golden-sets-decoded-table` lại nằm trong `CONSOLIDATED_SUBSECTIONS_BY_SLUG`! Khi `renderSection` lọc bỏ `sub-1-1`, **chính Widget bên trong nó cũng bị ẩn mất hoàn toàn**! | `CRITICAL` | Tuân thủ đúng chuẩn Phase 3: Luôn chèn `{ type: "widget", widgetType: "..." }` vào cấp **`section.blocks` (`GuideSection.blocks`)**, tuyệt đối không bao giờ đặt Widget bên trong một `subSection` bị gom ẩn. |
| 4 | `GAP-P4-16` | **Regression trên `ResponsiveDataTable` (`guide-blocks.test.tsx`)** | Khảo sát sâu [`responsive-data-table.tsx`](file:///d:/GitHub/top-hero/tophub-web/src/components/guides/blocks/responsive-data-table.tsx#L53-L94) và [`tests/guide-blocks.test.tsx`](file:///d:/GitHub/top-hero/tophub-web/tests/guide-blocks.test.tsx#L217-L251) cho thấy `ResponsiveDataTable` **ĐÃ CÓ SẴN** bộ lọc nhanh `data-testid="table-filter-input"` (kích hoạt khi `rows.length > 5`), nút thu gọn `table-expand-toggle` (`rows.length > 8`) và tô sáng điểm gãy `data-breakpoint-row="true"`. Việc sửa lại `ResponsiveDataTable` sang `table-quick-filter-input` là dư thừa và sẽ làm gãy test Phase 2! | `HIGH` | **Không chạm vào `responsive-data-table.tsx`**. Toàn bộ 21 bài viết còn lại trong 8 Danh mục đã tự động hưởng lợi từ `table-filter-input`, `StepRoadmap` stepper pills và `CaseStudyBlock` split grid của Phase 2. |
| 5 | `GAP-P4-17` | **Tab Visibility Desync khi Gom SubSection thuộc Tab `action`** | Trong bài `4.2` (`horde-pivot-roadmap`), `sec-2-three-step-hybrid-bridge` chứa `checklist` nên được `classifySectionTab` xếp vào Tab `action`. Nếu gom `sub-2-1-hybrid-bridge-roadmap` (thuộc `sec-2`) vào Widget nằm ở `sec-1` (chỉ hiện ở Tab `core` và `data`), khi bấm `#sub-2-1-hybrid-bridge-roadmap` trên `GuidesToc`, trang sẽ chuyển sang Tab `action` làm ẩn mất `sec-1` (nơi chứa Widget)! | `HIGH` | Chỉ gom các `subSection` thuộc các mục `core` hoặc `data` (tuyệt đối không gom `subSection` của mục `action`). Cụ thể ở Bài `4.2`, giữ nguyên `sec-2` cho Tab `action` và chỉ gom bảng ma trận 4 giai đoạn `sub-4-2-zero-loss-pivot-matrix` (thuộc `sec-4`, Tab `data`) vào `HordePivotStepperWidget`. |
| 6 | `GAP-P4-18` | **Empty Section H2 Header khi Gom hết SubSections của Mục không chứa Widget** | Trong bài `2.2` (`meta-lineups`), `sec-2-horde-lineups` có `blocks: []` và 2 mục con `sub-2-1`, `sub-2-2`. Nếu gom cả `sub-2-1` và `sub-2-2` vào Widget đặt ở `sec-1`, thì `sec-2` sẽ render một tiêu đề `<h2>2. Đội Hình Chuẩn Phe Bộ Lạc</h2>` trống rỗng không có nội dung bên dưới! | `HIGH` | Chỉ gom các `subSection` chứa bảng tĩnh trùng lặp khi mục cha của nó có chứa Widget hoặc vẫn còn `blocks`/`subSections` khác hiển thị. Ở Bài `2.2` và `2.3`, các mục con là văn bản phân tích chiến thuật (không phải bảng lặp), nên giữ nguyên hiển thị và đồng bộ `tophub:toc-navigate` để tự động đổi đội hình trên Bàn cờ `2×3`. |
| 7 | `GAP-P4-19` | **Test Context Isolation & `forceUnlockPro` Prop Contract** | Trong Phase 3 ([`master-data-explorer-widget.tsx`](file:///d:/GitHub/top-hero/tophub-web/src/components/guides/widgets/master-data-explorer-widget.tsx#L40-L44)), các Widget dùng từ điển song ngữ nội bộ `LABELS[locale]` (không gọi `useTranslations` trực tiếp trong Widget) và nhận prop `forceUnlockPro?: boolean` để unit test kiểm tra dễ dàng cả trạng thái khóa và mở khóa PRO mà không cần bọc `NextIntlClientProvider`. | `MEDIUM` | Chuẩn hóa giao diện Props cho cả 5 Widget Phase 4: `{ article?: GuideArticle; locale?: GuideLocale; forceUnlockPro?: boolean }` kèm từ điển `LABELS: Record<GuideLocale, ...>` nội bộ. |
| 8 | `GAP-P4-01` | **Sai lệch Tên File & Slug thực tế của Bài `2.3` và `4.2`** | Bài `2.3` thực tế là `src/content/guides/groups/group-2/2.3-formation-and-counters.ts` (`slug: "formation-and-counters"`, `ARTICLE_2_3_FORMATION_COUNTERS`). Bài `4.2` thực tế là `src/content/guides/groups/group-4/4.2-horde-pivot-roadmap.ts` (`slug: "horde-pivot-roadmap"`, `ARTICLE_4_2_HORDE_PIVOT_ROADMAP`). | `HIGH` | Sử dụng chính xác 100% đường dẫn file, tên hằng số export và `slug` thực tế trong toàn bộ kế hoạch và code. |
| 9 | `GAP-P4-02` | **Bảo toàn Tuyệt đối Invariants của `tests/group-1..8-content.test.ts`** | Các bộ test nội dung kiểm tra nghiêm ngặt số lượng `freeSections` (`3`), `proSections` (`2`), `tenTrapsSection.subSections` (`10`), số lượng `table` của bài `5.2` (`[6, 8, 10]`) và bài `7.1` (`[13, 4, 16]`). | `CRITICAL` | Không xóa hoặc sửa bất kỳ `subSection` hay `table` nào trong các file `.ts` dữ liệu gốc; chỉ thêm `{ type: "widget", widgetType: "..." }` vào `section.blocks`. |
| 10 | `GAP-P4-03` | **Cấu trúc ID thật của 10 Cạm Bẫy trong Bài `1.4`** | Trong `sec-2-ten-account-traps`, 10 `subSections` có ID là `sub-trap-1` ➔ `sub-trap-10`; 4 nhóm hệ thống nằm ở `sec-1-irreversible-currencies` (`MED-1.4-01`: `#1/#5/#9`, `#2/#4`, `#3/#7`, `#6/#8/#10`); bảng 10 dòng cấp cứu nằm ở `sec-4-account-recovery-protocol`. | `MEDIUM` | `AccountTrapsTriageWidget` trích xuất và liên kết tự động cả 3 nguồn dữ liệu trên theo số thứ tự Trap `#1` ➔ `#10`. |
| 11 | `GAP-P4-04` | **Liên kết Bàn cờ `2×3` giữa Bài `2.2` và Bài `2.3`** | Bài `2.2` tập trung vào 6 đội hình chuẩn 3 Phe theo giai đoạn, còn Bài `2.3` tập trung vào cơ chế vật lý 6 Ô (`Ô 1–2`, `Ô 3–4`, `Ô 5–6`), Tam giác khắc chế `±20%` và 4 Kỹ thuật Đảo vị trí Arena (`sub-4-1-four-arena-swaps`). | `MEDIUM` | `TacticalFormationBoardWidget` hỗ trợ cả 2 chế độ: khi gắn ở `2.2` mở mặc định Tab **6 Đội hình Meta trên Bàn cờ 2×3**; khi gắn ở `2.3` hiển thị nổi bật **Cơ chế Vật lý 3 Hàng + Mô phỏng 4 Kỹ thuật Đảo vị trí Arena**. |
| 12 | `GAP-P4-05` | **Trực quan hóa Dịch chuyển Đội 1 ⇄ Đội 2 ở Bài `4.2`** | Người đọc khó hình dung tướng Liên Minh nào rút xuống Đội 2 ở từng mốc Ngày 1–20, 21–35, 36–45, 46+. | `MEDIUM` | `HordePivotStepperWidget` trích xuất trực tiếp 4 dòng từ bảng `sub-4-2-zero-loss-pivot-matrix` và bài toán `9 vs 27 Đá Hồn` (`sub-1-1`) để vẽ sơ đồ 2 Hàng đợi (`Đội 1 Chủ lực` ⇄ `Đội 2 Mỏ neo Zero-Loss`). |
| 13 | `GAP-P4-06` | **Ma trận Lò Rèn `3×4` và 24 Tướng BiS ở Bài `5.2`** | Giao diện Đe Rèn có 3 Bộ × 4 Cột (Cột 4 Không Dấu Hệ là bẫy mất vĩnh viễn `+30%`), kèm 3 bảng 24 tướng BiS ở `sec-4`. | `MEDIUM` | `BlacksmithAnvilMatrixWidget` mô phỏng trực quan lưới `3×4` (gạch chéo đỏ Cột 4) và hợp nhất 3 bảng BiS (`6 + 8 + 10 = 24 tướng`) thành bộ tra cứu tức thì. |
| 14 | `GAP-P4-07` | **Bộ chọn 13 Cửa hàng & Đáy Ví An Toàn ở Bài `7.1`** | Bảng 13 Cửa hàng (`sub-1-2`), các ngưỡng Đáy Ví (`sub-2-1`, `sub-2-2`) và bảng 16 vật phẩm ROI (`sub-4-1`) nằm tách rời nhau. | `MEDIUM` | `ShopSafetyFloorWidget` hợp nhất thành 13 Shop Selector Pills hiển thị ngay **Đáy Ví An Toàn** + **3 Cột Phân Loại (`Nên Vét S+/S` \| `Mua Khi Dư A/B` \| `Cấm Mua F`)** + Tab tra cứu 16 Vật phẩm ROI Kim Cương. |
| 15 | `GAP-P4-08` | **Bảo vệ Cổng Khóa PRO (`hasProAccess`) bên trong 5 Widgets** | Dữ liệu trích xuất từ `proSections` (`sec-4`) bên trong Widget cần tuân thủ khóa PRO khi `NEXT_PUBLIC_ENABLE_PRO_CONTENT_LOCK === "true"`. | `HIGH` | Dùng `useUidSession()` + `forceUnlockPro` giống hệt `MasterDataExplorerWidget`: tính năng tương tác cơ bản luôn mở; dữ liệu chuyên sâu từ `sec-4` hiển thị khóa PRO thanh lịch nếu `hasProAccess === false`. |
| 16 | `GAP-P4-09` | **Đảm bảo Mục 4.3 Master Plan cho toàn bộ 31 bài trong 8 Danh mục** | Cần xác nhận rõ giải pháp UX cho cả 10 bài gắn Widget lẫn 21 bài còn lại trong 8 Danh mục lớn. | `LOW` | Lập ma trận ánh xạ đầy đủ 31 bài viết trong Mục 2.1 bên dưới. |
| 17 | `GAP-P4-10` | **Đồng bộ Neo Cuộn `#hash` & `tophub:toc-navigate` cho mọi SubSection được gom** | Mọi `subSection.id` nằm trong `CONSOLIDATED_SUBSECTIONS_BY_SLUG` phải vẫn tồn tại trong DOM để `GuidesToc` Scroll-Spy không bị đứt gãy. | `HIGH` | Render `<span key={id} id={id} data-consolidated-by-widget="true" className="scroll-mt-28" aria-hidden="true" />` ở đầu mỗi Widget tương ứng. |
| 18 | `GAP-P4-11` | **Đối xứng Đa ngôn ngữ `vi`/`en`** | Dữ liệu trích xuất từ SSoT và nhãn điều khiển của cả 5 Widget phải hiển thị đúng ngôn ngữ `locale` (`"vi"` hoặc `"en"`). | `MEDIUM` | Mọi hàm trích xuất đều đọc `cell[locale]`, `text[locale]`, `title[locale]` trực tiếp từ AST song ngữ của `GuideArticle`. |
| 19 | `GAP-P4-12` | **Vùng chạm Di động `>= 44×44px` & Không tràn ngang ở `375px`** | Các nút lọc, pill cửa hàng và ô bàn cờ trên mobile cần đạt chuẩn `min-h-[44px]`. | `MEDIUM` | Áp dụng `min-h-[44px]` cho toàn bộ nút bấm tương tác và `overflow-x-auto` cho thanh chọn pill trên mobile. |

---

## 2. ⚡ Cross-System Impact Assessment Matrix

- **API Contracts**: `[NO BREAKING CHANGES]` — Không thay đổi bất kỳ API endpoint hay route nào.
- **Database / Schema**: `[SAFE — ADDITIVE ONLY]` — Mở rộng union `GuideWidgetType` thêm 5 khóa mới; chèn thêm đúng 1 phần tử `{ type: "widget", widgetType: "..." }` vào `section.blocks` của 6 bài viết (`1.4`, `2.2`, `2.3`, `4.2`, `5.2`, `7.1`); giữ nguyên 100% số lượng `freeSections`, `proSections`, `subSections` và `tables`.
- **Auth & Permissions**: `[ENFORCED]` — Toàn bộ dữ liệu trích xuất từ `proSections` bên trong 5 Widget đều kiểm tra `hasProAccess = forceUnlockPro || process.env.NEXT_PUBLIC_ENABLE_PRO_CONTENT_LOCK !== "true" || activeAccount?.active_plan === "PRO"`.
- **Regression Scope**: `[ZERO REGRESSION ON PHASE 1–3]` — Không sửa đổi `ResponsiveDataTable` hay 3 Widget của Phase 3; toàn bộ `151/151` bài test hiện hành được bảo toàn 100%.

### 2.1. Ma Trận Phủ Sóng UX Chuyên Biệt Toàn Bộ 31 Bài Viết (8 Danh Mục Lớn)

| Danh mục | Các bài viết (`31 bài`) | Giải pháp UX Chuyên biệt & Vi tương tác (`Guides Hub v3.0`) |
| :--- | :--- | :--- |
| **Mục 1: Nhập Môn, Tân Thủ & Chẩn Đoán Acc** (`4 bài`) | `1.1`, `1.2`, `1.3`, **`1.4`** | • **Bài `1.4` (`top-10-account-traps`):** Tích hợp **`AccountTrapsTriageWidget`** — Bộ lọc 4 Nhóm Hệ thống + Accordion Khám bệnh 1-Click cho 10 Cạm bẫy (`Trap #1 ➔ #10`: *"🩺 Tôi đang mắc lỗi này ➔ Xem thuốc giải"*).<br>• **Bài `1.1–1.3`:** `StepRoadmap` stepper pills, `InteractiveChecklistBlock` (`48px` lưu `localStorage`), `CaseStudyBlock` split grid và `ResponsiveDataTable` (`table-filter-input`). |
| **Mục 2: Bách Khoa Anh Hùng & Đội Hình** (`5 bài`) | **`2.1`**, **`2.2`**, **`2.3`**, `2.4`, `2.5` | • **Bài `2.1` (`encyclopedia`):** **`HeroEncyclopediaWidget`** (Phase 3 — 51 Anh hùng + 24 hồ sơ MVS).<br>• **Bài `2.2` (`meta-lineups`) & Bài `2.3` (`formation-and-counters`):** Tích hợp **`TacticalFormationBoardWidget`** — **Sàn đấu 6 Ô `2×3` Trực Quan (`Ô 1–2 Hàng trước`, `Ô 3–4 Vùng an toàn`, `Ô 5–6 Hàng sau`)** + Chuyển đổi 6 Đội hình Meta 3 Phe + **Bộ mô phỏng 4 Kỹ thuật Đảo vị trí Arena (`Counter-Swap Simulator`)**.<br>• **Bài `2.4–2.5`:** Bảng điểm ngọt MVS & Thức tỉnh có `table-filter-input` + Highlight `🔥/⭐/👑`. |
| **Mục 3: Lịch Chu Kỳ Sự Kiện & Đua Điểm** (`4 bài`) | **`3.1`**, `3.2`, `3.3`, **`3.4`** | • **Bài `3.1` (`biweekly-rotation`) & Bài `3.4` (`double-dip-schedule`):** **`BiweeklyCalendarWidget`** (Phase 3 — Lịch Pha 1 ⇄ Pha 2 Tuần A/B + 13 vật phẩm Giờ Vàng Double-Dip `300%`).<br>• **Bài `3.2` (`week-a-guild-race`) & Bài `3.3` (`week-b-arms-race`):** Bảng Nhiệm vụ Vàng Đua Bang & Bảng 6 Ngày KvK GAR tích hợp sẵn `table-filter-input` + `StepRoadmap` stepper pills. |
| **Mục 4: Chiến Lược 3 Phe & Lộ Trình Chuyển Hệ** (`3 bài`) | `4.1`, **`4.2`**, `4.3` | • **Bài `4.2` (`horde-pivot-roadmap`):** Tích hợp **`HordePivotStepperWidget`** — **Trình mô phỏng 4 Giai đoạn Chuyển Hệ Bộ Lạc Zero-Loss (`Ngày 1–20` ➔ `21–35` ➔ `36–45` ➔ `Ngày 46+/S1–S3`)** hiển thị trực quan sự dịch chuyển tướng giữa Đội 1 và Đội 2 + Bài toán kinh tế `0` vs `9` vs `27` Đá Hồn.<br>• **Bài `4.1` & `4.3`:** Lịch ra mắt tướng Thần Thoại S0 & Lộ trình S1–S4 với `table-filter-input` + `StepRoadmap`. |
| **Mục 5: Trang Bị, Lò Rèn & Vũ Khí Độc Quyền** (`4 bài`) | `5.1`, **`5.2`**, `5.3`, `5.4` | • **Bài `5.2` (`golden-gear-sets`):** Tích hợp **`BlacksmithAnvilMatrixWidget`** — **Ma trận Đe Rèn `3 Hàng × 4 Cột`** (Tô sáng Cột 1–3 `+30% Dấu Hệ` 🔵/🔴/🟢, gạch chéo đỏ Cột 4 Không Dấu Hệ) + **Bộ tra cứu BiS 24 Anh hùng** theo Vai trò & Phe phái.<br>• **Bài `5.1`, `5.3`, `5.4`:** Bảng Cộng hưởng Cường hóa `+10/+20/+30/+40`, Đồ Đỏ Mythic & Đồ Chúa Tể có `table-filter-input` + `VisualDiagramBlock`. |
| **Mục 6: Cổ Ngữ, Thánh Vật, Thú Cưng & Cự Thú** (`3 bài`) | `6.1`, `6.2`, `6.3` | • **Bài `6.1` (`runes-guide`), `6.2` (`relics-guide`), `6.3` (`pets-and-behemoth`):** Sơ đồ 6 Ô Khảm Cổ Ngữ (`Lv.5/8/12`), Bộ 3 Thánh Vật BiS 3 Phe, và Hệ thống Thú Cưng vs Cự Thú Behemoth kết hợp `VisualDiagramBlock` + `table-filter-input` + `InteractiveChecklistBlock`. |
| **Mục 7: Kinh Tế Học, 13 Cửa Hàng & Tối Ưu Chi Tiêu** (`4 bài`) | **`7.1`**, `7.2`, `7.3`, `7.4` | • **Bài `7.1` (`shops-tier-list`):** Tích hợp **`ShopSafetyFloorWidget`** — **Dải Pills Chọn Nhanh 13 Cửa Hàng** hiển thị tức thì **💰 Đáy Ví An Toàn (`Safety Floor`)** + **Phân loại 3 cột (`✅ Nên Vét S+/S` \| `⚠️ Mua Khi Dư A/B` \| `🚫 Cấm Mua F`)** + Trình duyệt 16 Vật phẩm ROI Kim Cương.<br>• **Bài `7.2–7.4`:** Quy tắc đóng băng `40.000 Vinh Dự`, Cửa hàng VIP & Quân Trang có `table-filter-input` + `CaseStudyBlock`. |
| **Mục 8: Lâu Đài, Công Nghệ, Làng Mạc & 12 Bảng Gốc** (`4 bài`) | `8.1`, `8.2`, `8.3`, **`8.4`** | • **Bài `8.4` (`master-data-tables`):** **`MasterDataExplorerWidget`** (Phase 3 — Trình duyệt 12 Bảng số liệu gốc + Tìm kiếm xuyên 12 bảng).<br>• **Bài `8.1–8.3`:** Đường găng Lâu Đài `Lv.35/40` (`T10/T11`), Hàng đợi Xây dựng & Cây Công nghệ Nhử điểm (`Baiting`) có `StepRoadmap` + `table-filter-input`. |

---

## 3. 🛠️ Revised Plan (Kế Hoạch Thực Thi Nguyên Tử Theo Chuẩn TDD — Sẵn Sàng Thực Thi)

**Goal**: Xây dựng và tích hợp 5 Category Micro-UX Widgets (`AccountTrapsTriageWidget`, `TacticalFormationBoardWidget`, `HordePivotStepperWidget`, `BlacksmithAnvilMatrixWidget`, `ShopSafetyFloorWidget`) vào 6 bài viết trọng tâm (`1.4`, `2.2`, `2.3`, `4.2`, `5.2`, `7.1`), đồng bộ hóa `GuideArticleRenderer` mà không làm trùng lặp bảng tĩnh, và hoàn tất nghiệm thu tổng thể 31 bài viết.
**Architecture**: Mỗi Widget trích xuất dữ liệu trực tiếp từ AST song ngữ (`vi`/`en`) của `GuideArticle` truyền vào (kèm fallback về hằng số bài viết gốc), render các neo `<span id={subId} data-consolidated-by-widget="true" />` cho các `subSection` được gom trong `CONSOLIDATED_SUBSECTIONS_BY_SLUG`, lắng nghe sự kiện `tophub:toc-navigate` từ `GuidesToc`, và tuân thủ cổng khóa `hasProAccess` (`useUidSession`).
**Tech Stack**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, `next-intl`, `lucide-react`, Vitest + React Testing Library.

---

### Task 1: Mở Rộng `GuideWidgetType`, Bổ Sung Khóa Đa Ngôn Ngữ (`vi.json` / `en.json`) & Gắn Widget Block Vào 6 Bài Viết SSoT

**Files:**
- Modify: [`tophub-web/src/content/guides/types.ts`](file:///d:/GitHub/top-hero/tophub-web/src/content/guides/types.ts)
- Modify: [`tophub-web/messages/vi.json`](file:///d:/GitHub/top-hero/tophub-web/messages/vi.json)
- Modify: [`tophub-web/messages/en.json`](file:///d:/GitHub/top-hero/tophub-web/messages/en.json)
- Modify: [`tophub-web/src/content/guides/groups/group-1/1.4-top-10-account-traps.ts`](file:///d:/GitHub/top-hero/tophub-web/src/content/guides/groups/group-1/1.4-top-10-account-traps.ts)
- Modify: [`tophub-web/src/content/guides/groups/group-2/2.2-meta-lineups.ts`](file:///d:/GitHub/top-hero/tophub-web/src/content/guides/groups/group-2/2.2-meta-lineups.ts)
- Modify: [`tophub-web/src/content/guides/groups/group-2/2.3-formation-and-counters.ts`](file:///d:/GitHub/top-hero/tophub-web/src/content/guides/groups/group-2/2.3-formation-and-counters.ts)
- Modify: [`tophub-web/src/content/guides/groups/group-4/4.2-horde-pivot-roadmap.ts`](file:///d:/GitHub/top-hero/tophub-web/src/content/guides/groups/group-4/4.2-horde-pivot-roadmap.ts)
- Modify: [`tophub-web/src/content/guides/groups/group-5/5.2-golden-gear-sets.ts`](file:///d:/GitHub/top-hero/tophub-web/src/content/guides/groups/group-5/5.2-golden-gear-sets.ts)
- Modify: [`tophub-web/src/content/guides/groups/group-7/7.1-shops-tier-list.ts`](file:///d:/GitHub/top-hero/tophub-web/src/content/guides/groups/group-7/7.1-shops-tier-list.ts)
- Create: [`tophub-web/tests/guides-phase4-micro-ux.test.tsx`](file:///d:/GitHub/top-hero/tophub-web/tests/guides-phase4-micro-ux.test.tsx)

- [ ] **1.1 (Red):** Tạo file [`tophub-web/tests/guides-phase4-micro-ux.test.tsx`](file:///d:/GitHub/top-hero/tophub-web/tests/guides-phase4-micro-ux.test.tsx) với Suite kiểm tra sự tồn tại của 10 khóa i18n Phase 4 trong `vi.json` & `en.json` và sự hiện diện của `GuideWidgetBlock` trong `section.blocks` của 6 bài viết (`1.4`, `2.2`, `2.3`, `4.2`, `5.2`, `7.1`).
- [ ] **1.2 (Verify Red):** Chạy `pnpm --dir tophub-web test tests/guides-phase4-micro-ux.test.tsx` để xác nhận test fail.
- [ ] **1.3 (Green — `types.ts`):** Cập nhật `GuideWidgetType` trong [`tophub-web/src/content/guides/types.ts`](file:///d:/GitHub/top-hero/tophub-web/src/content/guides/types.ts#L188-L191) (bảo toàn 100% 3 khóa Phase 3):
  ```ts
  export type GuideWidgetType =
    | "hero_encyclopedia"
    | "biweekly_event_calendar"
    | "master_data_tables"
    | "account_traps_triage"
    | "tactical_formation_board"
    | "horde_pivot_stepper"
    | "blacksmith_anvil_matrix"
    | "shop_safety_floor_explorer";
  ```
- [ ] **1.4 (Green — `vi.json` & `en.json`):** Thêm 10 khóa i18n Phase 4 vào cuối `"Guides"` trong [`tophub-web/messages/vi.json`](file:///d:/GitHub/top-hero/tophub-web/messages/vi.json) và [`tophub-web/messages/en.json`](file:///d:/GitHub/top-hero/tophub-web/messages/en.json):
  - `widgetTrapsTitle`, `widgetTrapsSubtitle`
  - `widgetFormationTitle`, `widgetFormationSubtitle`
  - `widgetPivotTitle`, `widgetPivotSubtitle`
  - `widgetAnvilTitle`, `widgetAnvilSubtitle`
  - `widgetShopSafetyTitle`, `widgetShopSafetySubtitle`
- [ ] **1.5 (Green — Gắn Widget ở cấp `section.blocks` cho 6 bài viết):**
  1. `1.4-top-10-account-traps.ts`: Trong `sec-2-ten-account-traps`, cập nhật `blocks: [{ type: "widget", widgetType: "account_traps_triage" }]`.
  2. `2.2-meta-lineups.ts`: Trong `sec-1-league-lineups`, cập nhật `blocks: [{ type: "widget", widgetType: "tactical_formation_board" }]`.
  3. `2.3-formation-and-counters.ts`: Trong `sec-1-six-slot-grid-mechanics`, cập nhật `blocks: [{ type: "widget", widgetType: "tactical_formation_board" }]`.
  4. `4.2-horde-pivot-roadmap.ts`: Trong `sec-1-economic-math-why-horde`, cập nhật `blocks: [{ type: "widget", widgetType: "horde_pivot_stepper" }]`.
  5. `5.2-golden-gear-sets.ts`: Trong `sec-1-three-golden-sets-and-three-stat-layers`, cập nhật `blocks: [{ type: "widget", widgetType: "blacksmith_anvil_matrix" }]`.
  6. `7.1-shops-tier-list.ts`: Trong `overview-and-mechanics`, cập nhật `blocks: [{ type: "widget", widgetType: "shop_safety_floor_explorer" }]`.
- [ ] **1.6 (Verify Green):** Chạy `pnpm --dir tophub-web test tests/group-1-content.test.ts tests/group-2-content.test.ts tests/group-4-content.test.ts tests/group-5-content.test.ts tests/group-7-content.test.ts` để xác nhận mọi invariant của SSoT đều PASS 100%.

---

### Task 2: Xây Dựng `AccountTrapsTriageWidget` (Bài `1.4` — Bộ Lọc 4 Nhóm Hệ Thống & Accordion Cấp Cứu 10 Cạm Bẫy)

**Files:**
- Create: [`tophub-web/src/components/guides/widgets/account-traps-triage-widget.tsx`](file:///d:/GitHub/top-hero/tophub-web/src/components/guides/widgets/account-traps-triage-widget.tsx)
- Modify: [`tophub-web/tests/guides-phase4-micro-ux.test.tsx`](file:///d:/GitHub/top-hero/tophub-web/tests/guides-phase4-micro-ux.test.tsx)

- [ ] **2.1 (Red):** Bổ sung Suite test cho `AccountTrapsTriageWidget` trong `tests/guides-phase4-micro-ux.test.tsx`:
  - Kiểm tra render đủ 10 Cạm bẫy (`#1` ➔ `#10`) và 10 neo `#sub-trap-1` ➔ `#sub-trap-10`.
  - Kiểm tra lọc theo 4 Nhóm Hệ thống:
    - `heroes_skills` (`#1, #5, #9` — 3 bẫy)
    - `shops_events` (`#2, #4` — 2 bẫy)
    - `gear_runes` (`#3, #7` — 2 bẫy)
    - `infra_tech` (`#6, #8, #10` — 3 bẫy)
  - Kiểm tra bấm nút `data-testid="trap-diagnose-btn-1"` mở ngăn kéo Phác đồ cắt lỗ (`sec-4` row `#1`) và tăng bộ đếm lỗi mắc phải (`afflictedCount`), cũng như tự động mở Trap `#7` khi nhận sự kiện `CustomEvent("tophub:toc-navigate", { detail: { targetId: "sub-trap-7" } })`.
- [ ] **2.2 (Verify Red):** Chạy `pnpm --dir tophub-web test tests/guides-phase4-micro-ux.test.tsx` để xác nhận fail.
- [ ] **2.3 (Green):** Triển khai [`tophub-web/src/components/guides/widgets/account-traps-triage-widget.tsx`](file:///d:/GitHub/top-hero/tophub-web/src/components/guides/widgets/account-traps-triage-widget.tsx):
  - Trích xuất 10 `subSections` (`sub-trap-1` ➔ `sub-trap-10`) từ `sec-2-ten-account-traps` (lấy `title[locale]`, `badge[locale]`, `list.items[0][locale]` làm Triệu chứng, `list.items[1][locale]` làm Cơ chế gây hại, `callout.title[locale]` & `callout.content[locale]` làm Luật Thép Meta).
  - Trích xuất 10 dòng tương ứng từ bảng trong `sec-4-account-recovery-protocol` (`[Mã Bẫy, Mức Độ Thiệt Hại, Phác Đồ Cắt Lỗ Tức Thì, Thời Gian Phục Hồi Dự Kiến, Ngưỡng Khuyên Tạo Lại Acc]`).
  - Render `<span id={trap.subSectionId} data-consolidated-by-widget="true" className="scroll-mt-28" aria-hidden="true" />` cho cả 10 bẫy.
  - Hỗ trợ đánh dấu `"🩺 Tôi đang mắc lỗi này ➔ Xem thuốc giải"` (mở ngăn kéo Thuốc giải 2 cột: Luật Thép Meta + Phác đồ Cắt lỗ `sec-4` có kiểm tra `hasProAccess`) và thanh tổng kết mức độ sức khỏe tài khoản ở đầu Widget.
- [ ] **2.4 (Verify Green):** Chạy lại `pnpm --dir tophub-web test tests/guides-phase4-micro-ux.test.tsx` xác nhận Suite `AccountTrapsTriageWidget` PASS.

---

### Task 3: Xây Dựng `TacticalFormationBoardWidget` (Bài `2.2` & `2.3` — Sàn Đấu 6 Ô `2×3` & Bộ Mô Phỏng Đảo Vị Trí Arena)

**Files:**
- Create: [`tophub-web/src/components/guides/widgets/tactical-formation-board-widget.tsx`](file:///d:/GitHub/top-hero/tophub-web/src/components/guides/widgets/tactical-formation-board-widget.tsx)
- Modify: [`tophub-web/tests/guides-phase4-micro-ux.test.tsx`](file:///d:/GitHub/top-hero/tophub-web/tests/guides-phase4-micro-ux.test.tsx)

- [ ] **3.1 (Red):** Bổ sung Suite test cho `TacticalFormationBoardWidget` trong `tests/guides-phase4-micro-ux.test.tsx`:
  - Kiểm tra hiển thị đủ 6 Ô (`formation-slot-1` ➔ `formation-slot-6`) chia làm 3 tuyến (`Ô 1–2 Hàng Trước`, `Ô 3–4 Vùng An Toàn`, `Ô 5–6 Hàng Sau`).
  - Kiểm tra chuyển đổi giữa 6 Đội hình chuẩn 3 Phe (`league-starter`, `league-endgame`, `horde-hybrid`, `horde-endgame`, `nature-transition`, `nature-endgame`) cập nhật chính xác các tướng trong 6 ô và chỉ số Hào quang đồng hệ (`+35%` vs `Hybrid`).
  - Kiểm tra chế độ **4 Kỹ thuật Đảo vị trí Arena (`Counter-Swap Simulator`)** trích xuất từ `sub-4-1-four-arena-swaps` của Bài `2.3` (`swap-1` ➔ `swap-4`) và đồng bộ `tophub:toc-navigate`.
- [ ] **3.2 (Verify Red):** Chạy test để xác nhận fail.
- [ ] **3.3 (Green):** Triển khai [`tophub-web/src/components/guides/widgets/tactical-formation-board-widget.tsx`](file:///d:/GitHub/top-hero/tophub-web/src/components/guides/widgets/tactical-formation-board-widget.tsx):
  - Khi `article.slug === "formation-and-counters"` (`2.3`), hiển thị nổi bật cơ chế vật lý của từng Ô (`70–85% Aggro` tại Ô 1–2, `Safe Zone` tại Ô 3–4, `Assassin Dive Target` tại Ô 5–6) và cho phép chuyển nhanh sang Tab **4 Kỹ thuật Đảo vị trí Arena (`sub-4-1-four-arena-swaps`)**.
  - Khi `article.slug === "meta-lineups"` (`2.2`), mở mặc định bộ chọn **6 Đội hình Meta 3 Phe (S0 ➔ Endgame)** kèm thông tin chi tiết từ `sub-1-1`, `sub-1-2`, `sub-2-1`, `sub-2-2`, `sub-3-1`, `sub-3-2`.
  - Lắng nghe `tophub:toc-navigate` để tự động chuyển đội hình hoặc kịch bản swap tương ứng khi người đọc bấm vào mục con trên `GuidesToc`.
- [ ] **3.4 (Verify Green):** Chạy `pnpm --dir tophub-web test tests/guides-phase4-micro-ux.test.tsx` xác nhận PASS.

---

### Task 4: Xây Dựng `HordePivotStepperWidget` (Bài `4.2` — Trình Mô Phỏng 4 Giai Đoạn Xoay Trục Bộ Lạc Zero-Loss)

**Files:**
- Create: [`tophub-web/src/components/guides/widgets/horde-pivot-stepper-widget.tsx`](file:///d:/GitHub/top-hero/tophub-web/src/components/guides/widgets/horde-pivot-stepper-widget.tsx)
- Modify: [`tophub-web/tests/guides-phase4-micro-ux.test.tsx`](file:///d:/GitHub/top-hero/tophub-web/tests/guides-phase4-micro-ux.test.tsx)

- [ ] **4.1 (Red):** Bổ sung Suite test cho `HordePivotStepperWidget` trong `tests/guides-phase4-micro-ux.test.tsx`:
  - Kiểm tra render 4 nút Giai đoạn (`pivot-stage-btn-0` ➔ `pivot-stage-btn-3`) trích xuất từ bảng 4 giai đoạn `sub-4-2-zero-loss-pivot-matrix` của Bài `4.2` (`Ngày 1–20`, `Ngày 21–35`, `Ngày 36–45`, `Ngày 46+ đến S1–S3`).
  - Kiểm tra khi bấm từng giai đoạn sẽ hiển thị rõ đội hình Đội 1, vai trò của dàn Liên Minh rút xuống Đội 2, quy tắc Mảnh Vàng/Đá Hồn và quy tắc Đồ Vàng/UW.
  - Kiểm tra thanh so sánh Kinh tế Đá Hồn (`0` Đá Hồn cho 5 Thần Thoại Bộ Lạc vs `9` Đá Hồn Liên Minh vs `27` Đá Hồn Tự Nhiên) và neo `#sub-4-2-zero-loss-pivot-matrix`.
- [ ] **4.2 (Verify Red):** Chạy test xác nhận fail.
- [ ] **4.3 (Green):** Triển khai [`tophub-web/src/components/guides/widgets/horde-pivot-stepper-widget.tsx`](file:///d:/GitHub/top-hero/tophub-web/src/components/guides/widgets/horde-pivot-stepper-widget.tsx):
  - Trích xuất 4 dòng từ bảng `sub-4-2-zero-loss-pivot-matrix` (`[Giai Đoạn & Tuổi Server, Đội Hình Đội 1, Quy Tắc Mảnh Vàng & Đá Hồn, Quy Tắc Đồ Vàng & Vũ Khí Độc Quyền, Vai Trò Của Dàn Liên Minh Cũ]`) và 3 bước cầu nối từ `sub-2-1-hybrid-bridge-roadmap`.
  - Render `<span id="sub-4-2-zero-loss-pivot-matrix" data-consolidated-by-widget="true" className="scroll-mt-28" aria-hidden="true" />`.
  - Hiển thị trực quan 6 vị trí Đội 1 (tô màu `🔵 Liên Minh` vs `🔴 Bộ Lạc`) và khung Đội 2 Zero-Loss bên cạnh, có kiểm tra `hasProAccess` cho thông số định lượng sâu của `sec-4`.
- [ ] **4.4 (Verify Green):** Chạy `pnpm --dir tophub-web test tests/guides-phase4-micro-ux.test.tsx` xác nhận PASS.

---

### Task 5: Xây Dựng `BlacksmithAnvilMatrixWidget` (Bài `5.2` — Ma Trận Đe Rèn `3×4` & Bộ Lọc BiS 24 Anh Hùng)

**Files:**
- Create: [`tophub-web/src/components/guides/widgets/blacksmith-anvil-matrix-widget.tsx`](file:///d:/GitHub/top-hero/tophub-web/src/components/guides/widgets/blacksmith-anvil-matrix-widget.tsx)
- Modify: [`tophub-web/tests/guides-phase4-micro-ux.test.tsx`](file:///d:/GitHub/top-hero/tophub-web/tests/guides-phase4-micro-ux.test.tsx)

- [ ] **5.1 (Red):** Bổ sung Suite test cho `BlacksmithAnvilMatrixWidget` trong `tests/guides-phase4-micro-ux.test.tsx`:
  - Kiểm tra lưới Đe Rèn `3 Hàng × 4 Cột` (`12 ô`): Cột 1–3 (`Liên Minh 🔵`, `Bộ Lạc 🔴`, `Tự Nhiên 🟢`) hiển thị `+30%`, Cột 4 (`Không Dấu Hệ ⚪`) hiển thị cảnh báo cấm đúc (`data-testid="anvil-col-4-forbidden-badge"`).
  - Kiểm tra trích xuất đủ `24 Anh hùng` từ 3 bảng BiS trong `sec-4-three-faction-bis-gear-matrix` (`6 Tank/Bruiser` + `8 Carry/DPS` + `10 Support/Control`) và lọc tức thì theo Vai trò, Phe phái và ô tìm kiếm tên tướng.
  - Kiểm tra sự tồn tại của 4 neo được gom: `#sub-1-1-three-golden-sets-decoded-table`, `#sub-4-1-tank-bruiser-bis-table`, `#sub-4-2-carry-dps-bis-table`, `#sub-4-3-support-healer-control-bis-table`.
- [ ] **5.2 (Verify Red):** Chạy test xác nhận fail.
- [ ] **5.3 (Green):** Triển khai [`tophub-web/src/components/guides/widgets/blacksmith-anvil-matrix-widget.tsx`](file:///d:/GitHub/top-hero/tophub-web/src/components/guides/widgets/blacksmith-anvil-matrix-widget.tsx):
  - Trích xuất 3 Bộ Đồ Vàng từ bảng `sub-1-1-three-golden-sets-decoded-table` và quy tắc 4 Cột Đe Rèn từ `sub-2-1-four-blacksmith-columns-rule`.
  - Trích xuất 24 dòng Anh hùng từ 3 bảng `sub-4-1-tank-bruiser-bis-table` (6 dòng), `sub-4-2-carry-dps-bis-table` (8 dòng), `sub-4-3-support-healer-control-bis-table` (10 dòng).
  - Khi bấm vào một ô `[Bộ X, Phe Y]` trên lưới Đe Rèn `3×4`, tự động lọc danh sách Anh hùng thuộc Phe `Y` sử dụng Bộ `X` BiS!
- [ ] **5.4 (Verify Green):** Chạy `pnpm --dir tophub-web test tests/guides-phase4-micro-ux.test.tsx` xác nhận PASS.

---

### Task 6: Xây Dựng `ShopSafetyFloorWidget` (Bài `7.1` — Bộ Chọn 13 Cửa Hàng Nhanh & Đáy Ví An Toàn)

**Files:**
- Create: [`tophub-web/src/components/guides/widgets/shop-safety-floor-widget.tsx`](file:///d:/GitHub/top-hero/tophub-web/src/components/guides/widgets/shop-safety-floor-widget.tsx)
- Modify: [`tophub-web/tests/guides-phase4-micro-ux.test.tsx`](file:///d:/GitHub/top-hero/tophub-web/tests/guides-phase4-micro-ux.test.tsx)

- [ ] **6.1 (Red):** Bổ sung Suite test cho `ShopSafetyFloorWidget` trong `tests/guides-phase4-micro-ux.test.tsx`:
  - Kiểm tra trích xuất đủ `13 Cửa hàng` từ bảng `sub-1-2-thirteen-shops-master-map` (`shop-pill-1` ➔ `shop-pill-13`) và lọc theo 3 Tầng Kiến Trúc (`Tier 1`, `Tier 2`, `Tier 3`).
  - Kiểm tra khi chọn Shop Đấu Trường / Điểm Bang / Vinh Dự Bang hiển thị chính xác **💰 Đáy Ví An Toàn (`Safety Floor`)** (`2,000`, `15,000`, `40,000`) và khung phân loại 3 cột (`✅ Nên Vét S+/S`, `⚠️ Mua Khi Dư A/B`, `🚫 Cấm Mua F-Tier`).
  - Kiểm tra chế độ xem **16 Vật phẩm Định giá ROI Kim Cương** (`sub-4-1-diamond-equivalent-roi-matrix`) lọc theo hạng `S+ | S | A | B | F` và sự tồn tại của 2 neo `#sub-1-2-thirteen-shops-master-map`, `#sub-4-1-diamond-equivalent-roi-matrix`.
- [ ] **6.2 (Verify Red):** Chạy test xác nhận fail.
- [ ] **6.3 (Green):** Triển khai [`tophub-web/src/components/guides/widgets/shop-safety-floor-widget.tsx`](file:///d:/GitHub/top-hero/tophub-web/src/components/guides/widgets/shop-safety-floor-widget.tsx):
  - Trích xuất 13 dòng cửa hàng từ `sub-1-2-thirteen-shops-master-map`, bảng 4 quy tắc F2P từ `f2p-core-rules`, và 16 dòng định giá ROI từ `sub-4-1-diamond-equivalent-roi-matrix`.
  - Hỗ trợ chuyển đổi tức thì giữa 13 Cửa hàng (hiển thị Banner Đáy Ví An Toàn + 3 Cột Hàng Hóa) và Tab **Bảng Xếp Hạng 16 Vật Phẩm ROI Kim Cương (`S+ ➔ F`)** (có kiểm tra `hasProAccess`).
- [ ] **6.4 (Verify Green):** Chạy `pnpm --dir tophub-web test tests/guides-phase4-micro-ux.test.tsx` xác nhận PASS.

---

### Task 7: Nối 5 Widgets Vào `GuideArticleRenderer`, Cập Nhật `CONSOLIDATED_SUBSECTIONS_BY_SLUG` & Nghiệm Thu Tổng Thể

**Files:**
- Modify: [`tophub-web/src/components/guides/guide-article-renderer.tsx`](file:///d:/GitHub/top-hero/tophub-web/src/components/guides/guide-article-renderer.tsx)
- Modify: [`tophub-web/tests/guides-phase4-micro-ux.test.tsx`](file:///d:/GitHub/top-hero/tophub-web/tests/guides-phase4-micro-ux.test.tsx)

- [ ] **7.1 (Red):** Bổ sung Suite test tích hợp `GuideArticleRenderer` cho cả 6 bài viết (`1.4`, `2.2`, `2.3`, `4.2`, `5.2`, `7.1`) vào `tests/guides-phase4-micro-ux.test.tsx`:
  - Kiểm tra 5 Widget hiển thị ở cả Tab 1 (`core`) và Tab 2 (`data`), ẩn ở Tab 3 (`action`).
  - Kiểm tra các `subSection` trong `CONSOLIDATED_SUBSECTIONS_BY_SLUG` không bị render trùng lặp thành bảng tĩnh ở dưới nhưng vẫn có đầy đủ neo `#sub-...` trong DOM cho `GuidesToc`.
- [ ] **7.2 (Verify Red):** Chạy test xác nhận fail.
- [ ] **7.3 (Green):** Cập nhật [`tophub-web/src/components/guides/guide-article-renderer.tsx`](file:///d:/GitHub/top-hero/tophub-web/src/components/guides/guide-article-renderer.tsx):
  - Import 5 Widget mới và bổ sung vào `switch (block.widgetType)` trong `renderBlock`.
  - Mở rộng `CONSOLIDATED_SUBSECTIONS_BY_SLUG` (giữ nguyên kiểu `Record<string, ReadonlySet<string>>` và 2 khóa Phase 3):
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
        "sub-1-2-hero-awakening-cost-table",
        "sub-1-3-gear-enhancement-master-table",
        "sub-1-4-troop-tiers-unlock-table",
        "sub-4-1-faction-level-table",
        "sub-4-2-mythic-gear-and-uw-table",
        "sub-4-3-lord-gear-master-table",
        "sub-4-4-runes-master-table",
        "sub-4-5-pets-master-table",
        "sub-4-6-troop-skins-master-table",
        "sub-4-7-vip-master-table",
      ]),
      "top-10-account-traps": new Set([
        "sub-trap-1",
        "sub-trap-2",
        "sub-trap-3",
        "sub-trap-4",
        "sub-trap-5",
        "sub-trap-6",
        "sub-trap-7",
        "sub-trap-8",
        "sub-trap-9",
        "sub-trap-10",
      ]),
      "horde-pivot-roadmap": new Set([
        "sub-4-2-zero-loss-pivot-matrix",
      ]),
      "golden-gear-sets": new Set([
        "sub-1-1-three-golden-sets-decoded-table",
        "sub-4-1-tank-bruiser-bis-table",
        "sub-4-2-carry-dps-bis-table",
        "sub-4-3-support-healer-control-bis-table",
      ]),
      "shops-tier-list": new Set([
        "sub-1-2-thirteen-shops-master-map",
        "sub-4-1-diamond-equivalent-roi-matrix",
      ]),
    };
    ```
- [ ] **7.4 (Final QA & Verification):** Chạy toàn bộ chuỗi lệnh nghiệm thu:
  1. `pnpm --dir tophub-web test` (Xác nhận toàn bộ `151` bài test cũ + các bài test mới của Phase 4 đều PASS 100%).
  2. `pnpm --dir tophub-web exec tsc --noEmit` (Xác nhận `0` lỗi TypeScript).
  3. `pnpm --dir tophub-web build` (Xác nhận kết xuất tĩnh SSG thành công cho toàn bộ 31 bài viết `/vi/guides/...` và `/en/guides/...`).

---

## 4. 🛑 Fail-Safe Checkpoint & Rollback Strategy

- **Rollback Strategy**: Mọi thay đổi đều nằm gọn trong tầng View (`src/components/guides/widgets/*`, `guide-article-renderer.tsx`) và 6 phần tử `{ type: "widget" }` trong `section.blocks`. Nếu cần khôi phục tức thì, chỉ cần xóa khóa slug tương ứng khỏi `CONSOLIDATED_SUBSECTIONS_BY_SLUG` hoặc chạy `git checkout -- tophub-web/src/content/guides/groups/`.
- **Checkpoint Status**: ✅ *Trường hợp A — Kế hoạch đã được kiểm toán sâu qua 3 vòng (vá kín 19/19 điểm mù kỹ thuật, 0 giả định mơ hồ) và sẵn sàng thực thi ngay.*

# 🛡️ Plan Audit & Hardening Report (`/review-plan`) — Lộ Trình Sự Kiện Theo Tiến Độ Server (Thay Thế Mô Hình Tuần A / Tuần B)

**Evaluated Plan**: `tophub-web/docs/02-specs/2026-10-17-server-progression-event-roadmap-overhaul-plan.md`
**Audit Result**: `APPROVED WITH REVISIONS (HARDENED — ZERO GAPS REMAINING)`

---

## 1. 🔍 Gap & Blindspot Analysis (12-Point Senior Tech Lead Audit)

Qua quá trình rà soát đệ quy toàn bộ kho mã nguồn (`Get-ChildItem -Recurse | Select-String`) và đối chiếu với 34 bộ kiểm thử Vitest hiện hành, **8 khoảng trống kỹ thuật (Gaps & Blindspots)** đã được phát hiện và khóa chặt trong bản kế hoạch nâng cấp dưới đây:

| # | Hạng mục kiểm tra | Phát hiện / Điểm mù (Gap / Blindspot) | Mức độ rủi ro | Biện pháp vá trong Revised Plan (Mitigation) |
| :-: | :--- | :--- | :-: | :--- |
| **1** | **Dual Docs Tree & PowerShell Globbing (`GAP-01`)** | 1. Lệnh `Select-String -Path "**"` trong PowerShell không tự đệ quy nếu thiếu `Get-ChildItem -Recurse`.<br>2. Kho mã nguồn có **2 cây thư mục `06-game-guides` song song**: `docs/06-game-guides/` (**43 file**) và `tophub-web/docs/06-game-guides/` (**13 file**), cộng với `tophub-web/docs/02-specs/top-heroes-multilang-glossary.md` (**1 file**) — tổng cộng **57 file Markdown** (bản plan cũ mới liệt kê 28 file). | `CRITICAL` | Liệt kê đầy đủ cả **57 file Markdown** trong **Task 5**; cập nhật chuẩn hóa trên `docs/06-game-guides/**` rồi đồng bộ 1:1 sang `tophub-web/docs/06-game-guides/**` và `top-heroes-multilang-glossary.md`. Dùng `Get-ChildItem -Recurse` làm cổng kiểm chứng cuối cùng. |
| **2** | **`keywords` & `sourceFiles` Collision (`GAP-02`)** | Trong `3.1`, `3.2`, `3.3`, `3.4`, mảng `keywords` đang chứa `"tuần a tuần b"`, `"week a week b"`, `"biweekly rotation"`, `"Week A"`, `"Tuần A"`, `"Week B"`, `"Tuần B"`. Nếu giữ nguyên, kiểm định `expect(JSON.stringify(category)).not.toMatch(/Tuần A|Tuần B|Week A|Week B/i)` sẽ FAIL. Đồng thời `sourceFiles` chứa tên file vật lý `topic-6-biweekly-event-schedule-week-a-b.md`. | `HIGH` | Thay thế toàn bộ từ khóa `"tuần a"`, `"tuần b"`, `"week a"`, `"week b"`, `"biweekly rotation"` trong `keywords[]` của `3.1` ➔ `3.4` bằng bộ từ khóa chuẩn (`"lộ trình sự kiện server"`, `"server event roadmap"`, `"thi đấu hội"`, `"guild race"`, `"chạy đua vũ trang"`, `"guild arms race"`). Giữ nguyên đường dẫn vật lý trong `sourceFiles`. |
| **3** | **Widget Table Plain-Text Contract (`GAP-03`)** | `tests/wave4-content-scannability.test.ts` (dòng `183–216`) bắt buộc bảng `sub-1-2-thirteen-shops-master-map` (cột `0..4`) và `sub-4-1-diamond-equivalent-roi-matrix` (cột `0, 2`) trong `7.1-shops-tier-list.ts` phải là **plain text tuyệt đối** (cấm chứa `**` hoặc `` ` ``) để `ShopSafetyFloorWidget` parse không lỗi. | `HIGH` | Khi thay `"Tuần A / Tuần B"` ở cột `4` (`resetCycle`) của bảng `sub-1-2` và cột `2` của bảng `sub-4-1` trong `7.1-shops-tier-list.ts`, bắt buộc ghi bằng **Plain Text 100%** (không thêm `**` hay `` ` ``). |
| **4** | **SSoT Table Cardinality & IDs (`GAP-04`)** | `wave3`, `wave4`, `group-3`, `group-5`, `group-6`, `group-7`, `group-8` khóa cứng số lượng dòng của mọi bảng (`tableRows`), `checklistId`, `sec.id`, `sub.id`, `node.id`, `step.id`, và `mediaCode` (`MED-x.y-01..04`). | `HIGH` | Cấm thêm/xóa bất kỳ dòng/cột bảng nào; giữ nguyên 100% mọi ID định danh cấu trúc (`sec.id`, `sub.id`, `checklistId`, `mediaCode`). |
| **5** | **Line Length Ceiling `<= 220` chars (`GAP-05`)** | Thay `"Tuần A"` (6 ký tự) bằng `"Tuần Thi Đấu Hội (Guild Race)"` (29 ký tự) làm tăng 23 ký tự/lần xuất hiện, có nguy cơ đẩy các dòng đang dài `198–218` ký tự trong `tldr`, `keyTakeaways`, `list.items`, `paragraph`, `callout` vượt ngưỡng `220` ký tự của `wave3` & `wave4`. | `HIGH` | Áp dụng **Quy tắc Rút gọn Ký tự Thông minh (Compact Token Rule)**: dùng `Kỳ Thi Đấu Hội (Guild Race)` / `Kỳ GAR/KvK` cho câu ngắn và `Kỳ Thi Đấu Hội` / `Kỳ GAR/KvK` (`Guild Race` / `GAR/KvK`) cho câu sát ngưỡng `185–220` ký tự; chạy test scannability ngay sau mỗi bước. |
| **6** | **Group 6 Forbidden Words & Emoji Gate (`GAP-06`)** | `tests/group-6-content.test.ts` (dòng `459–467`) và `wave4` cấm tuyệt đối các từ `/Kịch bản/i`, `/chúng ta/i`, `/các bạn/i`, `/\bVIP\s*9\b/i`, `/Castle\s*40\b/i` và cấm mọi emoji màu / ký tự `\uFE0F` trong toàn bộ 31 bài viết `.ts`. | `MEDIUM` | Tuyệt đối không dùng từ `"Kịch bản"`, `"chúng ta"`, `"các bạn"` khi biên tập nội dung (đặc biệt trong Nhóm 6) và không chèn emoji vào các file `.ts`. |
| **7** | **Hidden `"Chu kỳ 2 Tuần"` in `1.4` & `1.3` (`GAP-07`)** | Quét đệ quy phát hiện thêm `1.4-top-10-account-traps.ts` (dòng `782–783`, `937–938`) có cột `"Thời Gian Phục Hồi Dự Kiến (Tính theo Chu kỳ 2 Tuần)"` / `"1 Chu kỳ Tuần B"` và `1.3-diamond-and-spending-guide.ts` có `"Tuần A"` ở dòng `776`. | `MEDIUM` | Đổi tiêu đề cột bảng của `1.4` thành `"Thời Gian Phục Hồi Dự Kiến (Theo Kỳ Sự Kiện)"` / `"Estimated Recovery Time (By Event Cycle)"` và `"1 Kỳ GAR/KvK (Thứ Ba — Ngày Cổ Ngữ)"`. |
| **8** | **Atomic Task Granularity (`GAP-08`)** | Task 3 trong bản plan cũ gộp toàn bộ 23 file của `Groups 1, 2, 4, 5, 6, 7, 8` (417 vị trí) vào 1 task duy nhất, quá lớn để kiểm soát lỗi. | `MEDIUM` | Tách Task 3 thành **Task 3 (Wave 3: Groups 1, 2, 4 — 10 file)** và **Task 4 (Wave 4: Groups 5, 6, 7, 8 — 13 file)** gắn với bộ test riêng của từng Wave. |

---

## 2. ⚡ Impact Assessment Matrix

- **URL Routes & Bookmarks (`API/Routing Contracts`)**: `NO BREAKING CHANGES` — Giữ nguyên 100% URL slugs (`biweekly-rotation`, `week-a-guild-race`, `week-b-arms-race`, `double-dip-schedule`), tên file vật lý, TOC anchor IDs (`#sec-...`, `#sub-...`) và `data-testid` của mọi React component.
- **Database / Schema**: `SAFE (UNTOUCHED)` — Dữ liệu Cẩm nang là SSoT tĩnh bằng TypeScript (`src/content/guides/**`) và Markdown (`docs/06-game-guides/**`), không tác động tới cơ sở dữ liệu PostgreSQL/Prisma.
- **Auth & Permissions**: `UNTOUCHED` — Cơ chế khóa/mở `ProContentGate` (`isPro: true`) được giữ nguyên 100%.
- **Regression Scope**: `ISOLATED TO GUIDES CONTENT, WIDGETS & DOCS` — Bảo vệ bởi 34 bộ kiểm thử Vitest (`wave3-content-scannability.test.ts`, `wave4-content-scannability.test.ts`, `guides-bilingual-purity.test.ts`, `group-1..8-content.test.ts`, `guides-phase1..4`).

---

## 3. 🛠️ Revised Plan (Kế Hoạch Đã Tái Cấu Trúc & Vá Lỗi Toàn Diện)

### Lộ Trình Sự Kiện Theo Tiến Độ Server (Thay Thế Mô Hình Tuần A / Tuần B) — Hardened Implementation Plan

**Goal:** Xóa bỏ hoàn toàn khái niệm giả định *"Nhịp Đập 14 Ngày: Chu Kỳ Luân Phiên Tuần A & Tuần B"* trên toàn bộ Web UI (`src/`, `messages/`, `tests/` — **36 tập tin mã nguồn & kiểm thử**) và hệ thống Tài liệu (`docs/06-game-guides/`, `tophub-web/docs/06-game-guides/`, `top-heroes-multilang-glossary.md` — **57 tập tin Markdown**), thay thế bằng **Lộ Trình Sự Kiện Theo Tiến Độ Server (3 Giai Đoạn Thực Tế)** và **2 Trục Sự Kiện Cốt Lõi: `Tuần Thi Đấu Hội (Guild Race)` vs `Tuần Đua Vũ Trang & Liên Server (GAR / KvK / 4 Quốc Gia)`**.

**Architecture:**
- **Bảo toàn 100% Hợp đồng Định tuyến & DOM:** Không đổi `slug`, tên file `.ts`/`.tsx`/`.md`, `sec.id`, `sub.id`, `checklistId`, `mediaCode`, hay `data-testid`.
- **Mô hình Sự kiện Chuẩn Ground-Truth (3 Giai đoạn Tiến độ Server):**
  1. **Nguyên tắc Tối thượng:** *"Tình hình mở event thực tế sẽ lấy game làm chuẩn"* (`Event ➔ Lịch Event`, làm mới lúc `09:00` sáng Thứ Hai).
  2. **Giai đoạn 1 — Khởi tạo Server (`Ngày 1–14 / Tuần 1–2`):** Mở Server & **`Lãnh Chúa Mạnh Nhất (Strongest Lord / Top Lord — 7 Giai đoạn)`**.
  3. **Giai đoạn 2 — Tiền Mùa Giải S0 (`Từ Tuần 3 / Ngày 15–49+`):** **`Thi Đấu Hội (Guild Race)` chạy liên tiếp mỗi tuần** (leo hạng `D ➔ C ➔ B ➔ A ➔ S`) + Sự kiện Vệ tinh xoay tua hàng tuần (`Đế Quốc Hắc Ám Xâm Nhập` ⇄ `Khiêu Chiến Của Đội Quân Hắc Ám`; `Bắt Bướm` ⇄ `Tập Kích Cự Ma`) + Lịch mở khóa Tướng Đỏ S0 cố định (`Ngày 21, 27, 35, 41, 46`) rồi đi vào **Chu kỳ Gacha 3 Tuần/Lần độc lập** (`Vòng Quay 750 KC — Liên Minh` ➔ `Hero Gacha 1,000 KC — Bộ Lạc` ➔ `Xúc Xắc 800 KC — Tự Nhiên`).
  4. **Giai đoạn 3 — Server Trưởng Thành & Mùa Giải (`Cuối S0 ➔ Season 1–4`):** Luân phiên theo lịch ghép cặp máy chủ giữa **`Tuần Thi Đấu Hội (Guild Race — Bảng 9 Ô)`** và **`Tuần Đua Vũ Trang / Liên Server (GAR / KvK / 4 Quốc Gia — 6 Ngày Chủ Đề)`**, đi kèm **2 Mẫu Lịch `Guild Rush` 2 Ngày** (Mẫu `Guild Race` vs Mẫu `GAR/KvK`) và **8 Sự kiện Phụ 2–3 Ngày (`Mini-Rush`)**.

**Tech Stack:** Next.js 15 App Router, TypeScript 5, React 19, `next-intl`, Vitest + React Testing Library.

---

### Bảng Định Chuẩn Thay Thế Thuật Ngữ (Canonical Terminology Mapping)

| Cụm từ cũ (Loại bỏ 100%) | Cụm từ chuẩn mới — Dạng Đầy Đủ (`< 185` chars) | Cụm từ chuẩn mới — Dạng Ngắn Gọn (`185–220` chars) | Tiếng Anh chuẩn (`.en`) |
| :--- | :--- | :--- | :--- |
| `Nhịp Đập 14 Ngày: Chu Kỳ Luân Phiên Tuần A & Tuần B (Bi-weekly Rotation)` | `Lộ Trình Sự Kiện Theo Tiến Độ Server & 2 Trục Sự Kiện Cốt Lõi (Server Event Progression & Rotation)` | — | `Server Event Progression Roadmap & Core Event Rotation` |
| `Chiến Thuật Tuần A: Đua Bang Hội & Săn Nhiệm Vụ Độc Quyền Vàng (Guild Race)` | `Chiến Thuật Thi Đấu Hội: Làm Chủ Bảng 9 Ô & Săn Nhiệm Vụ Độc Quyền Vàng (Guild Race)` | — | `Guild Race Strategy: 9-Slot Board & Exclusive Gold Task Mastery` |
| `Chiến Thuật Tuần B: Giải Phẫu 6 Ngày Chạy Đua Vũ Trang & Chiến Sự Liên Server (GAR / KvK / SvS)` | `Chiến Thuật Đua Vũ Trang & Liên Server: Giải Phẫu Lịch 6 Ngày (GAR / KvK / 4 Quốc Gia)` | — | `Arms Race & Cross-Server Strategy: 6-Day Event Anatomy (GAR / KvK / 4 Nations)` |
| `Tuần A (Thi Đấu Hội / Guild Race)` / `Tuần A` | `Tuần Thi Đấu Hội (Guild Race)` | `Kỳ Thi Đấu Hội` | `Guild Race Week` / `Guild Race` |
| `Tuần B (GAR / KvK)` / `Tuần B` | `Tuần Đua Vũ Trang (GAR / KvK)` | `Kỳ GAR/KvK` | `GAR/KvK Week` / `GAR/KvK` |
| `Thứ Hai..Thứ Bảy Tuần B` | `Thứ Hai..Thứ Bảy GAR/KvK (Ngày 1..6)` | `Thứ Hai..Thứ Bảy GAR/KvK` | `Monday..Saturday of GAR/KvK (Day 1..6)` |
| `Ngày 5–7 Tuần A (Guild Race)` | `Ngày 5–7 Thi Đấu Hội (Guild Race)` | `Ngày 5–7 Thi Đấu Hội` | `Guild Race Days 5–7` |

---

### Task 1: Chuẩn Hóa Nhóm 3 — Metadata & 4 Bài Viết Sự Kiện (`group-3-events-and-calendar.ts` & `3.1` ➔ `3.4`)

**Files (6 files):**
- Modify: `tophub-web/src/content/guides/groups/group-3-events-and-calendar.ts` (`4` vị trí)
- Modify: `tophub-web/src/content/guides/groups/group-3/3.1-biweekly-rotation.ts` (`191` vị trí)
- Modify: `tophub-web/src/content/guides/groups/group-3/3.2-week-a-guild-race.ts` (`44` vị trí)
- Modify: `tophub-web/src/content/guides/groups/group-3/3.3-week-b-arms-race.ts` (`36` vị trí)
- Modify: `tophub-web/src/content/guides/groups/group-3/3.4-double-dip-schedule.ts` (`123` vị trí)
- Modify: `tophub-web/tests/group-3-content.test.ts`

- [ ] **1.1 (Red Phase):** Bổ sung unit test vào `tophub-web/tests/group-3-content.test.ts` kiểm tra tiêu đề mới của `3.1`, `3.2`, `3.3` và khẳng định toàn bộ dữ liệu hiển thị + `keywords` của Nhóm 3 không còn chứa `/Tuần A|Tuần B|Week A|Week B|Nhịp Đập 14 Ngày|14-Day Heartbeat|biweekly rotation/i`.
- [ ] **1.2 (Verify Red):** Chạy `npx vitest run tests/group-3-content.test.ts` tại `tophub-web` và xác nhận test mới FAIL.
- [ ] **1.3 (Green Phase — `group-3-events-and-calendar.ts` & `3.1-biweekly-rotation.ts`):**
  - Cập nhật `description` của `group-3-events-and-calendar.ts`.
  - Cập nhật `title`, `summary`, `keywords` (xóa `"biweekly rotation"`, `"tuần a tuần b"`, `"week a week b"`), `tldr`, `keyTakeaways`, `freeSections`, `proSections` của `3.1-biweekly-rotation.ts` sang **Lộ Trình Sự Kiện 3 Giai Đoạn Theo Tiến Độ Server & 2 Trục Sự Kiện Cốt Lõi (`Thi Đấu Hội` vs `GAR / KvK`)**.
- [ ] **1.4 (Green Phase — `3.2-week-a-guild-race.ts`, `3.3-week-b-arms-race.ts`, `3.4-double-dip-schedule.ts`):**
  - Đổi `title` và `keywords` của `3.2` và `3.3`; thay toàn bộ tham chiếu `"Tuần A"` / `"Tuần B"` trong `3.2`, `3.3`, `3.4` sang `Tuần Thi Đấu Hội (Guild Race)` / `Kỳ Thi Đấu Hội` và `Tuần Đua Vũ Trang (GAR / KvK)` / `Kỳ GAR/KvK`.
- [ ] **1.5 (Verify Green):** Chạy `npx vitest run tests/group-3-content.test.ts tests/wave3-content-scannability.test.ts tests/guides-bilingual-purity.test.ts` và xác nhận PASS 100%.

---

### Task 2: Cập Nhật Interactive Widgets, Glossary & Đa Ngôn Ngữ (`biweekly-calendar-widget.tsx`, `shop-safety-floor-widget.tsx`, `glossary.ts`, `messages/*.json`)

**Files (7 files):**
- Modify: `tophub-web/src/components/guides/widgets/biweekly-calendar-widget.tsx` (`33` vị trí)
- Modify: `tophub-web/src/components/guides/widgets/shop-safety-floor-widget.tsx` (`5` vị trí)
- Modify: `tophub-web/src/content/guides/glossary.ts` (`16` vị trí)
- Modify: `tophub-web/messages/vi.json` (`5` vị trí)
- Modify: `tophub-web/messages/en.json` (`6` vị trí)
- Modify: `tophub-web/tests/guides-phase3-widgets.test.tsx`
- Modify: `tophub-web/tests/guides-hub-client.test.tsx`

- [ ] **2.1 (Red Phase):** Cập nhật assertions trong `tests/guides-phase3-widgets.test.tsx` (kiểm tra nút `calendar-phase-weekA` hiển thị `"🛡️ Guild Race (9-Slot Board)"`, `calendar-phase-weekB` hiển thị `"⚔️ Arms Race (6-Day GAR/KvK)"`, và toàn bộ widget không chứa `/Tuần A|Tuần B|Week A|Week B/i`) và `tests/guides-hub-client.test.tsx` (`toolCalendarTitle`: `"Lộ Trình & Lịch Sự Kiện"`).
- [ ] **2.2 (Verify Red):** Chạy `npx vitest run tests/guides-phase3-widgets.test.tsx tests/guides-hub-client.test.tsx` và xác nhận FAIL.
- [ ] **2.3 (Green Phase):**
  - Cập nhật `UI_COPY`, `WEEK_B_DAYS`, `WEEK_A_DAYS` trong `biweekly-calendar-widget.tsx` (giữ nguyên 100% `data-testid`).
  - Cập nhật `shop-safety-floor-widget.tsx` (dòng `92–93` và `799–806`).
  - Cập nhật `glossary.ts` (`event-guild-race`, `event-guild-arms-race`, `event-fortune-wheel`, `event-dice-of-fate`, `system-training-ground`, `system-runes` — xóa `"Tuần A"`, `"Tuần B"`, `"Week A"`, `"Week B"` khỏi `term`, `aliases`, `definition`).
  - Cập nhật `messages/vi.json` và `messages/en.json` (`hubDescription`, `searchPlaceholder`, `toolCalendarTitle`, `toolCalendarDesc`, `widgetCalendarTitle`, `widgetCalendarSubtitle`).
- [ ] **2.4 (Verify Green):** Chạy `npx vitest run tests/guides-phase3-widgets.test.tsx tests/guides-hub-client.test.tsx tests/guides-phase4-micro-ux.test.tsx tests/guides-bilingual-purity.test.ts` và xác nhận PASS 100%.

---

### Task 3: Làm Sạch Tham Chiếu Chéo Tại Wave 3 (`Groups 1, 2, 4` — 10 Tập Tin Bài Viết)

**Files (10 files — 62 vị trí):**
- Modify: `tophub-web/src/content/guides/groups/group-1/1.1-overview.ts` (`2` vị trí)
- Modify: `tophub-web/src/content/guides/groups/group-1/1.2-strict-one-queue-rule.ts` (`4` vị trí)
- Modify: `tophub-web/src/content/guides/groups/group-1/1.3-diamond-and-spending-guide.ts` (`10` vị trí)
- Modify: `tophub-web/src/content/guides/groups/group-1/1.4-top-10-account-traps.ts` (`20` vị trí — bao gồm cả `"Chu kỳ 2 Tuần"` ở dòng `782–783`)
- Modify: `tophub-web/src/content/guides/groups/group-2/2.1-encyclopedia.ts` (`6` vị trí)
- Modify: `tophub-web/src/content/guides/groups/group-2/2.2-meta-lineups.ts` (`2` vị trí)
- Modify: `tophub-web/src/content/guides/groups/group-2/2.4-shards-and-skill-books.ts` (`6` vị trí)
- Modify: `tophub-web/src/content/guides/groups/group-2/2.5-epic-hero-traits.ts` (`4` vị trí)
- Modify: `tophub-web/src/content/guides/groups/group-4/4.1-preseason-mythic-calendar.ts` (`2` vị trí)
- Modify: `tophub-web/src/content/guides/groups/group-4/4.3-season-1-to-4-roadmap.ts` (`6` vị trí)
- Modify: `tophub-web/tests/wave3-content-scannability.test.ts`

- [ ] **3.1 (Red Phase):** Thêm kiểm định vào `tests/wave3-content-scannability.test.ts` khẳng định cả 16 bài thuộc `Groups 1–4` (`WAVE3_CATEGORIES`) không chứa bất kỳ chuỗi `/Tuần A|Tuần B|Week A|Week B|Nhịp Đập 14 Ngày|14-Day Heartbeat/i` nào.
- [ ] **3.2 (Verify Red):** Chạy `npx vitest run tests/wave3-content-scannability.test.ts` và xác nhận FAIL trên 10 bài viết thuộc `Groups 1, 2, 4`.
- [ ] **3.3 (Green Phase):** Cập nhật toàn bộ 62 vị trí trong 10 bài thuộc `Groups 1, 2, 4` theo Bảng Định Chuẩn Thay Thế Thuật Ngữ, đảm bảo mọi dòng `<= 220` ký tự và `0` emoji.
- [ ] **3.4 (Verify Green):** Chạy `npx vitest run tests/wave3-content-scannability.test.ts tests/group-1-content.test.ts tests/group-2-content.test.ts tests/group-3-content.test.ts tests/group-4-content.test.ts tests/guides-phase4-micro-ux.test.tsx` và xác nhận PASS 100%.

---

### Task 4: Làm Sạch Tham Chiếu Chéo Tại Wave 4 (`Groups 5, 6, 7, 8` — 15 Tập Tin Bài Viết & Danh Mục)

**Files (15 files — 361 vị trí):**
- Modify: `tophub-web/src/content/guides/groups/group-5/5.1-gear-overview.ts` (`26` vị trí)
- Modify: `tophub-web/src/content/guides/groups/group-5/5.3-enhancement-and-mythic.ts` (`8` vị trí)
- Modify: `tophub-web/src/content/guides/groups/group-5/5.4-lord-gear-strategy.ts` (`26` vị trí)
- Modify: `tophub-web/src/content/guides/groups/group-6-power-systems.ts` (`2` vị trí)
- Modify: `tophub-web/src/content/guides/groups/group-6/6.1-runes-guide.ts` (`46` vị trí)
- Modify: `tophub-web/src/content/guides/groups/group-6/6.2-relics-guide.ts` (`48` vị trí — bảo toàn câu khẳng định `/GAR.*không tính điểm.*Ngày 5/i` và `/GAR.*does NOT score.*Day 5/i`)
- Modify: `tophub-web/src/content/guides/groups/group-6/6.3-pets-and-behemoth.ts` (`32` vị trí)
- Modify: `tophub-web/src/content/guides/groups/group-7/7.1-shops-tier-list.ts` (`56` vị trí — tuân thủ tuyệt đối **Plain-Text Contract `GAP-03`** ở bảng `sub-1-2` cột `0..4` và `sub-4-1` cột `0, 2`)
- Modify: `tophub-web/src/content/guides/groups/group-7/7.2-guild-honor-freeze.ts` (`18` vị trí)
- Modify: `tophub-web/src/content/guides/groups/group-7/7.3-exchange-and-vip-shops.ts` (`4` vị trí)
- Modify: `tophub-web/src/content/guides/groups/group-7/7.4-troop-skins-and-medals.ts` (`6` vị trí)
- Modify: `tophub-web/src/content/guides/groups/group-8/8.1-castle-and-brilliance.ts` (`4` vị trí)
- Modify: `tophub-web/src/content/guides/groups/group-8/8.2-builder-queues-and-villagers.ts` (`40` vị trí)
- Modify: `tophub-web/src/content/guides/groups/group-8/8.3-research-and-baiting.ts` (`29` vị trí)
- Modify: `tophub-web/src/content/guides/groups/group-8/8.4-master-data-tables.ts` (`16` vị trí)
- Modify: `tophub-web/tests/wave4-content-scannability.test.ts`

- [ ] **4.1 (Red Phase):** Thêm kiểm định vào `tests/wave4-content-scannability.test.ts` khẳng định cả 15 bài và 4 danh mục thuộc `Groups 5–8` (`WAVE4_CATEGORIES`) không chứa bất kỳ chuỗi `/Tuần A|Tuần B|Week A|Week B|Nhịp Đập 14 Ngày|14-Day Heartbeat/i` nào.
- [ ] **4.2 (Verify Red):** Chạy `npx vitest run tests/wave4-content-scannability.test.ts` và xác nhận FAIL trên các bài thuộc `Groups 5–8`.
- [ ] **4.3 (Green Phase — Groups 5 & 6):** Cập nhật `5.1`, `5.3`, `5.4`, `group-6-power-systems.ts`, `6.1`, `6.2`, `6.3` (lưu ý không dùng từ cấm `"Kịch bản"`, `"chúng ta"`, `"các bạn"` trong Group 6 và giữ nguyên câu `/GAR.*không tính điểm.*Ngày 5/i` ở `6.2`).
- [ ] **4.4 (Green Phase — Groups 7 & 8):** Cập nhật `7.1` (giữ plain-text ở cột `0..4` bảng `sub-1-2` và cột `0, 2` bảng `sub-4-1`), `7.2`, `7.3`, `7.4`, `8.1`, `8.2`, `8.3`, `8.4`.
- [ ] **4.5 (Verify Green):** Chạy toàn bộ test suites tại `tophub-web`: `npx vitest run` (xác nhận toàn bộ 34 test files PASS 100%).

---

### Task 5: Đồng Bộ Hóa Toàn Diện 57 Tập Tin Tài Liệu Markdown (`docs/06-game-guides/**`, `tophub-web/docs/06-game-guides/**` & `top-heroes-multilang-glossary.md`)

**Files (57 Markdown files):**
1. **Nhóm `07-standardized-web-guides` (30 files tại `docs/06-game-guides/07-standardized-web-guides/`):**
   - `README.md`
   - `group-1-getting-started/`: `1.1-overview.md`, `1.2-strict-one-queue-rule.md`, `1.3-diamond-and-spending-guide.md`, `1.4-top-10-account-traps.md`
   - `group-2-heroes-and-meta/`: `2.1-encyclopedia.md`, `2.2-meta-lineups.md`, `2.4-shards-and-skill-books.md`, `2.5-epic-hero-traits.md`
   - `group-3-events-double-dip/`: `3.1-biweekly-rotation.md`, `3.2-week-a-guild-race.md`, `3.3-week-b-arms-race.md`, `3.4-double-dip-schedule.md`
   - `group-4-server-roadmap/`: `4.1-preseason-mythic-calendar.md`, `4.3-season-1-to-4-roadmap.md`
   - `group-5-gear-and-weapons/`: `5.1-gear-overview.md`, `5.3-enhancement-and-mythic.md`, `5.4-lord-gear-strategy.md`
   - `group-6-runes-relics-pets/`: `6.1-runes-guide.md`, `6.2-relics-guide.md`, `6.3-pets-and-behemoth.md`
   - `group-7-shops-and-economy/`: `7.1-shops-tier-list.md`, `7.2-guild-honor-freeze.md`, `7.3-exchange-and-vip-shops.md`, `7.4-troop-skins-and-medals.md`
   - `group-8-infrastructure/`: `8.1-castle-and-brilliance.md`, `8.2-builder-queues-and-villagers.md`, `8.3-research-and-baiting.md`, `8.4-master-data-tables.md`
2. **Nhóm Tài liệu Nghiệp vụ Gốc (`00` ➔ `06` + `README.md` — 13 files tại `docs/06-game-guides/` VÀ 13 files bản sao tương ứng tại `tophub-web/docs/06-game-guides/` = 26 files):**
   - `README.md`
   - `00-master-dashboard/master-dashboard-7-topics.md`
   - `00-master-dashboard/notebooklm-ai-synthesis-and-chat-history.md`
   - `01-core-strategic-topics/topic-1-heroes-1queue-rule-epic-traits.md`
   - `01-core-strategic-topics/topic-2-and-4-buildings-and-research-tech.md`
   - `01-core-strategic-topics/topic-3-hero-gear-lord-gear-exclusive-weapon.md`
   - `01-core-strategic-topics/topic-5-shops-currencies-military-gear.md`
   - `01-core-strategic-topics/topic-6-biweekly-event-schedule-week-a-b.md`
   - `01-core-strategic-topics/topic-7-server-timeline-s0-s4-horde-pivot.md`
   - `04-account-audits-and-consultations/preseason-upgrade-consultation-full.md`
   - `05-events-and-community-guides/event-strategy-hub-guide.md`
   - `05-events-and-community-guides/gameplay-and-core-features-2game.md`
   - `05-events-and-community-guides/top-heroes-event-schedule-studio.md`
   - `06-platform-and-ai-integration/antigravity-notebooklm-mcp-integration.md`
3. **Đặc tả Glossary Đa Ngôn Ngữ (1 file):**
   - `tophub-web/docs/02-specs/top-heroes-multilang-glossary.md`

- [ ] **5.1:** Cập nhật 4 bài Nhóm 3 (`3.1` ➔ `3.4`) và 26 file còn lại trong `docs/06-game-guides/07-standardized-web-guides/` đồng bộ 100% với nội dung TypeScript đã chuẩn hóa ở Tasks 1, 3, 4.
- [ ] **5.2:** Cập nhật 13 file tài liệu gốc (`00` ➔ `06` + `README.md`) trong `docs/06-game-guides/`, sau đó đồng bộ 1:1 sang `tophub-web/docs/06-game-guides/` và cập nhật `tophub-web/docs/02-specs/top-heroes-multilang-glossary.md`.
- [ ] **5.3 (Zero-Residual Final Gate):**
  - Chạy lệnh quét đệ quy:
    ```powershell
    Get-ChildItem -Path "tophub-web/src","tophub-web/messages","docs/06-game-guides","tophub-web/docs/06-game-guides","tophub-web/docs/02-specs/top-heroes-multilang-glossary.md" -Recurse -File | Select-String -Pattern "Tuần A|Tuần B|Week A|Week B|Nhịp Đập 14 Ngày|14-Day Heartbeat|Chu kỳ 14 ngày"
    ```
    Xác nhận kết quả trả về bằng **0**.
  - Chạy `npx vitest run` và `npx tsc --noEmit` tại `tophub-web` xác nhận 34/34 test suites và TypeScript compiler PASS 100%.

---

## 4. 🛑 Fail-Safe Checkpoint

> ✅ **Kế hoạch đã được kiểm toán theo 12 tiêu chí Senior Tech Lead (`/review-plan`), khóa chặt toàn bộ 8 điểm mù (bao gồm 57 file Markdown ở cả 2 cây thư mục `docs/`, hợp đồng Plain-Text của `ShopSafetyFloorWidget`, giới hạn `<= 220` ký tự/dòng và danh sách từ cấm của từng nhóm).**
> **Hardened plan ready. Proceed to execution? (Y / specify changes)**

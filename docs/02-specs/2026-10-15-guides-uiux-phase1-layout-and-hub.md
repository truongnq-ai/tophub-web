# 🛡️ Guides Hub v3.0 UI/UX Redesign — Phase 1 Hardened Implementation Plan (v1.1)

> **For agentic workers:** REQUIRED SUB-SKILL: Use `common/subagent-driven-development` (recommended) or `common/executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
> **Audit Status:** `APPROVED WITH REVISIONS (Hardened v1.1 via /review-plan)` — Đã vá toàn bộ 9 điểm mù kỹ thuật (`GAP-01` ➔ `GAP-09`).

**Goal:** Tái thiết kế toàn diện kiến trúc Layout vĩ mô (`max-w-[1440px]`), thanh điều hướng trái (`GuidesSidebar` `w-64` có nút thu gọn Icon Rail `w-14`, Single-Accordion và `CompactUidStatusPill`), thanh mục lục phải (`GuidesToc` `w-56` hợp nhất 1 instance duy nhất cho cả Mobile/Tablet Sticky Sub-header và Desktop Scroll-Spy + Reading Progress `%`) cùng trang chủ **Smart Command Hub (`/guides`)** 4 tầng theo đúng Master Plan v3.0 đã được PO phê duyệt (`DEC-UX-01`, `DEC-UX-02`, `DEC-UX-03`).

**Architecture:** Giữ nguyên kiến trúc Next.js 14 App Router (SSR/SSG tại `guides/page.tsx` và `guides/[category]/[slug]/page.tsx`) kết hợp các Client Component chuyên biệt (`CompactUidStatusPill`, `GuidesSidebar`, `GuidesToc`, `GuidesHubClient`). Hợp nhất Mobile/Tablet Sticky TOC (`< 1280px`) và Desktop Right TOC (`>= 1280px`) vào chung một instance `<GuidesToc article={article} />` thông qua CSS Flexbox Order (`flex-col xl:flex-row` + `xl:order-1` / `xl:order-2`) để chỉ khởi tạo duy nhất 1 `IntersectionObserver` và 1 `scroll` listener trên mỗi trang bài viết.

**Tech Stack:** Next.js 14 (App Router), React 18, TypeScript 5, Tailwind CSS 3.4, Radix UI / shadcn/ui (`Accordion`, `Sheet`, `Tabs`, `Popover`, `Badge`, `Button`, `Input`), Lucide Icons (`lucide-react`), `next-intl`, Vitest + React Testing Library (`@testing-library/react`).

---

## 🔍 1. Gap & Blindspot Analysis (Kết Quả Kiểm Toán `/review-plan`)

| Mã GAP | Hạng mục kiểm toán | Phát hiện / Điểm mù trong bản nháp v1.0 | Mức độ rủi ro | Biện pháp vá trong Hardened Plan v1.1 |
| :---: | :--- | :--- | :---: | :--- |
| **GAP-01** | **Test Directory Convention** | Bản nháp v1.0 đặt file test trong `src/**/__tests__/`, trong khi toàn bộ 22 file test hiện hữu của repo nằm tại `tophub-web/tests/*.test.{ts,tsx}`. | `MEDIUM` | Chuyển toàn bộ 4 file test mới về đúng thư mục chuẩn `tophub-web/tests/` (`guides-phase1-registry-i18n.test.ts`, `guides-sidebar.test.tsx`, `guides-toc.test.tsx`, `guides-hub-client.test.tsx`). |
| **GAP-02** | **Bilingual `#HotTags` Search Accuracy** | `HOT_TAGS` trong `GuidesHubClient` hardcode nhãn tiếng Việt và dùng `query: "12"` cho `#Brawler12Sao` (khớp nhầm mọi số 12) hoặc `query: "Bộ Lạc"` (trả về rỗng khi đọc bản tiếng Anh `/en/guides`). | `HIGH` | Chuẩn hóa `HOT_TAGS` đa ngôn ngữ `{ label: { vi, en }, query: { vi, en } }` và dùng từ khóa chính xác (`"560"`, `"Hồn Đá Đỏ"` / `"Soul Stone"`, `"Double-Dip"`, `"Bộ Lạc"` / `"Horde"`, `"Brawler"`). |
| **GAP-03** | **Single-Accordion Verification** | Cần kiểm chứng rõ hành vi `Accordion type="single" collapsible` khi bọc ngoài 3 nhóm `GUIDE_ZONES` để đảm bảo mở Nhóm khác sẽ tự động đóng Nhóm cũ. | `MEDIUM` | Bổ sung assertion kiểm tra trực tiếp thuộc tính `data-state="open"` / `data-state="closed"` khi click chuyển đổi giữa các Category trong `tests/guides-sidebar.test.tsx`. |
| **GAP-04** | **Duplicate Scroll-Spy & Event Listeners** | Bản nháp v1.0 mount đồng thời cả `<GuidesMobileTocBar />` (`xl:hidden`) và `<GuidesToc />` (`hidden xl:block`), làm nhân đôi số lượng `IntersectionObserver` và `window.scroll` listener trên mỗi trang. | `HIGH` | Hợp nhất giao diện Mobile/Tablet Sticky TOC Bar (`xl:hidden`) và Desktop Right Rail (`hidden xl:block`) vào **duy nhất 1 component `<GuidesToc />`**, kết hợp bố cục `flex-col xl:flex-row` và `xl:order-1` / `xl:order-2` trong `GuideArticlePage`. |
| **GAP-05** | **SPA Route Transition State Stale** | Trong `useArticleScrollSpy`, điều kiện `if (sectionIds.length > 0 && !activeId)` khiến `activeId` bị kẹt ở ID của bài viết cũ khi người đọc bấm `Prev / Next Article`. | `HIGH` | Sửa điều kiện thành `if (sectionIds.length > 0 && !sectionIds.includes(activeId))` để tự động reset `activeId` về `sectionIds[0]` ngay khi chuyển sang bài viết mới. |
| **GAP-06** | **Bottom-of-Page 100% Scroll Highlight** | Khi cuộn chạm đáy trang (`100%`), mục H3 cuối cùng ngắn có thể nằm dưới vùng cắt `rootMargin: "-96px 0px -65% 0px"` nên không bao giờ được tô sáng. | `MEDIUM` | Trong hàm `updateProgress`, khi chạm đáy trang (`scrollTop >= docHeight - 24`), tự động gán `progress = 100` và kích hoạt `activeId = sectionIds[sectionIds.length - 1]`. |
| **GAP-07** | **Desktop TOC Internal Auto-Scroll** | Với bài viết dài 15+ mục con (như `2.1`, `8.4`), khi cuộn xuống cuối bài, mục đang active trong khung TOC bên phải có thể bị khuất bên dưới vùng `overflow-y-auto`. | `LOW` | Thêm `tocScrollRef` cho khung TOC Desktop và tự động điều chỉnh `scrollTop` nội bộ của khung TOC khi `activeId` thay đổi mà không ảnh hưởng tới cuộn trang chính. |
| **GAP-08** | **Mobile Drawer Trigger UID Visibility** | Trên màn hình `< 1024px`, người dùng phải mở Drawer mới thấy trạng thái UID trong `CompactUidStatusPill`. | `LOW` | Hiển thị thêm chấm trạng thái xanh `🟢 {activeAccount.nickname}` ngay trên thanh nút mở Drawer Mobile (`lg:hidden`) khi đã kết nối UID. |
| **GAP-09** | **Strict Type Safety (`no-any`)** | Đảm bảo không ép kiểu mù trong các bài test i18n và mock component. | `LOW` | Sử dụng kiểu tĩnh chặt chẽ `Record<string, unknown>` và kiểm tra đầy đủ 12 điểm của `review-plan`. |

---

## ⚡ 2. Impact Assessment Matrix (Ma Trận Đánh Giá Tác Động)

- **API Contracts**: `[NO BREAKING CHANGES]` — Giữ nguyên 100% route `/[locale]/guides` và `/[locale]/guides/[category]/[slug]`, giữ nguyên `GuidesShellProps` và `GuidesTocProps`.
- **Database / Schema**: `[SAFE]` — Không tác động CSDL; `localStorage` (`tophub_guides_sidebar_collapsed`) có bọc `try/catch` và chỉ đọc sau khi mount (`useEffect`).
- **Auth & Permissions**: `[UNTOUCHED]` — Chỉ đọc trạng thái công khai từ `useUidSession()` (`nickname`, `server_id`, `active_plan`) sau khi `isLoaded === true`.
- **Regression Scope**: `[ISOLATED]` — Cô lập hoàn toàn trong phân hệ `guides` (`src/components/guides/*`, `src/app/[locale]/guides/*`, `src/content/guides/groups/group-4-server-roadmap.ts`, `messages/{vi,en}.json`) và tương thích 100% với 22 bộ test hiện hữu trong `tophub-web/tests/`.

---

## 🗂️ 3. Bản Đồ Tập Tin Thay Đổi (Hardened File Map)

| Thao tác | Đường dẫn file (`tophub-web/`) | Trách nhiệm (Responsibility) |
| :---: | :--- | :--- |
| **Modify** | `src/content/guides/groups/group-4-server-roadmap.ts` | Xóa tiền tố lặp `"Nhóm 4: "` / `"Group 4: "` khỏi `title.vi` và `title.en`. |
| **Modify** | `messages/vi.json` | Bổ sung 27 khóa i18n Phase 1 vào namespace `"Guides"`. |
| **Modify** | `messages/en.json` | Bổ sung 27 khóa i18n tiếng Anh tương ứng 1:1 với `messages/vi.json`. |
| **Create** | `tests/guides-phase1-registry-i18n.test.ts` | Unit test kiểm tra tiêu đề Nhóm 4, 13 bài viết trọng tâm trên Hub, 5 `#HotTags` ở cả 2 ngôn ngữ và đồng bộ khóa i18n `vi.json` ⇄ `en.json`. |
| **Create** | `src/components/guides/compact-uid-status-pill.tsx` | Component `CompactUidStatusPill` (`DEC-UX-02`) hiển thị trạng thái UID gọn nhẹ 1 dòng. |
| **Modify** | `src/components/guides/guides-sidebar.tsx` | Cải tổ Sidebar trái: nhúng `CompactUidStatusPill`, `w-64` + nút thu gọn `w-14` Icon Rail, `Accordion type="single" collapsible`, `line-clamp-1`. |
| **Create** | `tests/guides-sidebar.test.tsx` | Unit test kiểm tra `CompactUidStatusPill`, Single-Accordion state transition, tìm kiếm tức thì và Collapsible Desktop Rail. |
| **Modify** | `src/components/guides/guides-shell.tsx` | Mở rộng khung container từ `max-w-7xl` (`1280px`) lên `max-w-[1440px]`. |
| **Modify** | `src/components/guides/guides-toc.tsx` | Cải tổ `GuidesToc` (1 instance hợp nhất): xóa thẻ UID cồng kềnh, thêm thanh tiến độ đọc (`0% ➔ 100%`), `IntersectionObserver` Scroll-Spy (có xử lý chuyển trang SPA & chạm đáy 100%), và thanh Sticky Mobile/Tablet TOC Bar (`< 1280px`). |
| **Modify** | `src/app/[locale]/guides/[category]/[slug]/page.tsx` | Đổi container sang `flex-col xl:flex-row` với `xl:order-1` (Article) và `xl:order-2` (`GuidesToc`) để dùng chung 1 instance `GuidesToc` duy nhất cho cả Mobile/Tablet và Desktop. |
| **Create** | `tests/guides-toc.test.tsx` | Unit test kiểm tra render H2/H3, thanh tiến độ `%`, Mobile Popover TOC và tự động reset `activeId` khi đổi bài viết. |
| **Create** | `src/components/guides/guides-hub-client.tsx` | Client Component hiển thị **4-Layer Smart Command Hub** (Hero Search + Bilingual `#HotTags`, 3-Stage Server Selector Tabs, 4 Interactive Tools Strip, Clean 8-Category Bento Grid). |
| **Modify** | `src/app/[locale]/guides/page.tsx` | Render `GuidesHubClient` toàn chiều rộng (bỏ `<GuidesToc />` dư thừa trên trang chủ Cẩm Nang). |
| **Create** | `tests/guides-hub-client.test.tsx` | Unit test kiểm tra đủ 4 tầng trên Smart Command Hub, lọc `#HotTags` song ngữ (`vi`/`en`), chuyển tab Stage và đóng/mở Bento Grid. |

---

## 🛠️ 4. Revised Plan — Chi Tiết Từng Bước Thực Thi Nguyên Tử (Atomic TDD Steps)

### Task 1: Chuẩn hóa tiêu đề Nhóm 4 & Bổ sung bộ khóa đa ngôn ngữ Phase 1 (`vi.json` & `en.json`)

**Files:**
- Create: `tophub-web/tests/guides-phase1-registry-i18n.test.ts`
- Modify: `tophub-web/src/content/guides/groups/group-4-server-roadmap.ts:11-15`
- Modify: `tophub-web/messages/vi.json:378-412`
- Modify: `tophub-web/messages/en.json:378-412`

- [x] **Step 1.1: Viết failing unit test tại `tophub-web/tests/guides-phase1-registry-i18n.test.ts`**

```typescript
import { describe, expect, it } from "vitest";
import {
  getArticleBySlug,
  getCategoryBySlug,
  searchGuides,
} from "../src/content/guides/registry";
import viMessages from "../messages/vi.json";
import enMessages from "../messages/en.json";

describe("Phase 1 Guides Registry, Hot Tags & i18n Integrity", () => {
  it("removes duplicate 'Nhóm 4:' / 'Group 4:' prefix from category 4 title", () => {
    const group4 = getCategoryBySlug("roadmap");
    expect(group4).toBeDefined();
    expect(group4?.title.vi).toBe("Lộ Trình Server & Chuyển Giao Mùa");
    expect(group4?.title.en).toBe("Server Roadmap & Seasonal Transitions");
    expect(group4?.title.vi.startsWith("Nhóm 4")).toBe(false);
    expect(group4?.title.en.startsWith("Group 4")).toBe(false);
  });

  it("resolves all 13 curated articles for the 3-Stage Selector and 4 Interactive Tools Strip", () => {
    const requiredPairs: Array<[string, string]> = [
      // Stage 1: Early Game (Days 1-20)
      ["getting-started", "overview"],
      ["getting-started", "strict-one-queue-rule"],
      ["getting-started", "top-10-account-traps"],
      // Stage 2: Horde Pivot (Days 21-45)
      ["roadmap", "horde-pivot-roadmap"],
      ["events", "double-dip-schedule"],
      ["economy", "guild-honor-freeze"],
      // Stage 3: Seasonal Era (S1-S4)
      ["roadmap", "season-1-to-4-roadmap"],
      ["infrastructure", "castle-and-brilliance"],
      ["power-systems", "pets-and-behemoth"],
      // 4 Interactive Tools Strip
      ["heroes", "encyclopedia"],
      ["events", "biweekly-rotation"],
      ["economy", "shops-tier-list"],
      ["infrastructure", "master-data-tables"],
    ];

    for (const [categorySlug, articleSlug] of requiredPairs) {
      const article = getArticleBySlug(categorySlug, articleSlug);
      expect(
        article,
        `Expected article ${categorySlug}/${articleSlug} to exist`
      ).toBeDefined();
    }
  });

  it("returns non-empty search results for all 5 bilingual Hot Tags in both vi and en", () => {
    const hotTagQueries = [
      { vi: "560", en: "560" },
      { vi: "Hồn Đá Đỏ", en: "Soul Stone" },
      { vi: "Double-Dip", en: "Double-Dip" },
      { vi: "Bộ Lạc", en: "Horde" },
      { vi: "Brawler", en: "Brawler" },
    ];

    for (const q of hotTagQueries) {
      expect(
        searchGuides(q.vi, "vi").length,
        `Expected VI hot tag query "${q.vi}" to match articles`
      ).toBeGreaterThan(0);
      expect(
        searchGuides(q.en, "en").length,
        `Expected EN hot tag query "${q.en}" to match articles`
      ).toBeGreaterThan(0);
    }
  });

  it("contains all 27 Phase 1 Guides i18n keys in both vi.json and en.json", () => {
    const requiredKeys = [
      "collapseSidebar",
      "expandSidebar",
      "searchResultsCount",
      "uidPillLinkAccount",
      "uidPillManageBot",
      "readingProgressLabel",
      "mobileTocBtn",
      "hotTagsLabel",
      "stageSelectorTitle",
      "stageEarlyLabel",
      "stageEarlySub",
      "stagePivotLabel",
      "stagePivotSub",
      "stageSeasonLabel",
      "stageSeasonSub",
      "toolsStripTitle",
      "toolEncyclopediaTitle",
      "toolEncyclopediaDesc",
      "toolCalendarTitle",
      "toolCalendarDesc",
      "toolShopsTitle",
      "toolShopsDesc",
      "toolMasterTablesTitle",
      "toolMasterTablesDesc",
      "startWithArticleBtn",
      "showMoreArticlesBtn",
      "hideMoreArticlesBtn",
    ] as const;

    const viGuides = viMessages.Guides as Record<string, string>;
    const enGuides = enMessages.Guides as Record<string, string>;

    for (const key of requiredKeys) {
      expect(viGuides[key], `Missing vi.json Guides.${key}`).toBeTruthy();
      expect(enGuides[key], `Missing en.json Guides.${key}`).toBeTruthy();
    }
  });
});
```

- [x] **Step 1.2: Chạy test để xác nhận FAIL (Red)**

Run:
```bash
pnpm --dir tophub-web test tests/guides-phase1-registry-i18n.test.ts
```
Expected: FAIL (`expected 'Nhóm 4: Lộ Trình Server & Chuyển Giao Mùa' to be 'Lộ Trình Server & Chuyển Giao Mùa'` và thiếu 27 khóa i18n mới).

- [x] **Step 1.3: Cập nhật `group-4-server-roadmap.ts`, `messages/vi.json` và `messages/en.json`**

Cập nhật `tophub-web/src/content/guides/groups/group-4-server-roadmap.ts`:

```typescript
import type { GuideCategory } from "../types";
import { ARTICLE_4_1_PRESEASON_MYTHIC_CALENDAR } from "./group-4/4.1-preseason-mythic-calendar";
import { ARTICLE_4_2_HORDE_PIVOT_ROADMAP } from "./group-4/4.2-horde-pivot-roadmap";
import { ARTICLE_4_3_SEASON_1_TO_4_ROADMAP } from "./group-4/4.3-season-1-to-4-roadmap";

export const GROUP_4_SERVER_ROADMAP_CATEGORY: GuideCategory = {
  order: 4,
  slug: "roadmap",
  zoneId: "zone_events_roadmap",
  iconName: "Map",
  title: {
    vi: "Lộ Trình Server & Chuyển Giao Mùa",
    en: "Server Roadmap & Seasonal Transitions",
  },
  description: {
    vi: "Lịch ra mắt Tướng Đỏ Pre-Season (Ngày 1–65), Phác đồ chuyển phe Bộ Lạc Zero-Loss và Lộ trình Công trình / Mùa giải S1 ➔ S4.",
    en: "Pre-Season Mythic release calendar (Days 1–65), Zero-Loss Horde pivot blueprint, and Season 1 ➔ Season 4 building & progression roadmap.",
  },
  articles: [
    ARTICLE_4_1_PRESEASON_MYTHIC_CALENDAR,
    ARTICLE_4_2_HORDE_PIVOT_ROADMAP,
    ARTICLE_4_3_SEASON_1_TO_4_ROADMAP,
  ],
};
```

Cập nhật khối `"Guides"` trong `tophub-web/messages/vi.json` (từ dòng 378 đến cuối file):

```json
  "Guides": {
    "hubBadge": "Bách Khoa Chiến Thuật Top Heroes (S0 ➔ S4)",
    "hubTitle": "Cẩm Nang Chiến Thuật & Bảng Số Liệu Min-Max",
    "hubDescription": "Hệ thống 8 nhóm chuyên đề và 31 cẩm nang thực chiến được chuẩn hóa từ dữ liệu máy chủ thực tế: Quy tắc 1 Hàng, Lịch Sự kiện Tuần A/B, Lộ trình Bộ Lạc và Bảng tính định lượng.",
    "searchPlaceholder": "Tìm tướng, sự kiện, cổ ngữ, mẹo... (VD: Đấu Sĩ, 2000, Tuần A)",
    "searchNoResults": "Không tìm thấy bài viết nào khớp với từ khóa của bạn.",
    "clearSearch": "Xóa bộ lọc tìm kiếm",
    "mobileMenuBtn": "Danh Mục Cẩm Nang (8 Nhóm)",
    "onThisPage": "Trên Trang Này",
    "freeTierBadge": "Kiến Thức Cơ Bản (Free)",
    "proTierBadge": "Chiến Thuật PRO",
    "hotBadge": "Hot",
    "proPreviewHeader": "Chiến Thuật Nâng Cao & Số Liệu Định Lượng (PRO)",
    "proPreviewSubtext": "Đang mở miễn phí trải nghiệm sớm toàn bộ dữ liệu Min-Max",
    "proLockedTitle": "Nội Dung Dành Riêng Cho Thành Viên PRO (1–2$/tháng)",
    "proLockedDesc": "Mở khóa toàn bộ lộ trình Chuyển giao Bộ Lạc, khung giờ vàng Double-Dip 4 tiếng, ngưỡng đóng băng tiền tệ và bảng tính số liệu cấp cao.",
    "proLockedCheckUidBtn": "Liên Kết UID Tại Trang Chủ",
    "proLockedUpgradeBtn": "Nâng Cấp Gói PRO Ngay",
    "prevArticle": "Bài trước",
    "nextArticle": "Bài tiếp theo",
    "backToHub": "Tổng quan Cẩm Nang",
    "readingTime": "{minutes} phút đọc",
    "activeUidCardTitle": "Tài Khoản Đang Đồng Hành",
    "noActiveUidDesc": "Bạn chưa chọn nhân vật UID. Hãy nhập UID tại Trang Chủ để Bot tự động nạp code và đồng bộ quyền PRO.",
    "goToHomeBtn": "Nhập UID Kích Hoạt Bot",
    "quickLinksTitle": "Cẩm Nang Sống Còn Hàng Ngày",
    "categoriesGridTitle": "8 Nhóm Chuyên Đề Chiến Thuật (S0 ➔ S4)",
    "articlesCount": "{count} bài viết",
    "readArticleBtn": "Đọc chi tiết",
    "keyTakeawaysTitle": "Tóm Tắt Cốt Lõi (Key Takeaways)",
    "freeSectionTitle": "Kiến Thức Nền Tảng (Free Tier)",
    "proSectionTitle": "Phân Tích Định Lượng & Tối Ưu Sâu (PRO Tier)",
    "sourceFilesLabel": "Nguồn dữ liệu chuẩn hóa",
    "collapseSidebar": "Thu gọn danh mục",
    "expandSidebar": "Mở rộng danh mục",
    "searchResultsCount": "{count} kết quả",
    "uidPillLinkAccount": "Liên kết Game UID • Bật Bot & PRO",
    "uidPillManageBot": "Quản lý Bot",
    "readingProgressLabel": "Tiến độ đọc",
    "mobileTocBtn": "Mục lục bài viết",
    "hotTagsLabel": "Từ khóa nóng:",
    "stageSelectorTitle": "Lộ Trình Đọc Theo Độ Tuổi Máy Chủ",
    "stageEarlyLabel": "Tân Thủ (Ngày 1–20)",
    "stageEarlySub": "Khởi đầu Liên Minh, Kỷ luật 1 Đội hình & Né 10 bẫy phế acc",
    "stagePivotLabel": "Chuyển Hệ (Ngày 21–45)",
    "stagePivotSub": "Xoay trục Bộ Lạc Zero-Loss, Giờ vàng Double-Dip & Đóng băng 40k Honor",
    "stageSeasonLabel": "Chiến Sự (Season 1–4)",
    "stageSeasonSub": "Đua Lâu Đài Lv.35/40 (Lính T10/T11), Thú cưng & Công trình Mùa giải",
    "toolsStripTitle": "Công Cụ & Bảng Tra Cứu Tốc Độ Cao",
    "toolEncyclopediaTitle": "Bách Khoa 45+ Tướng",
    "toolEncyclopediaDesc": "Tier List S0➔S4 & Mốc sao tối thiểu 3 Phe",
    "toolCalendarTitle": "Lịch Chu Kỳ Tuần A/B",
    "toolCalendarDesc": "Nhịp đập 14 ngày Đua Bang & KvK GAR",
    "toolShopsTitle": "Xếp Hạng 13 Cửa Hàng",
    "toolShopsDesc": "ROI 600% & Ngưỡng đóng băng ví hàng tuần",
    "toolMasterTablesTitle": "12 Bảng Số Liệu Gốc",
    "toolMasterTablesDesc": "Điểm gãy Mảnh, Sách, Quặng, Cổ Ngữ & Pet",
    "startWithArticleBtn": "Bắt đầu: Bài {code}",
    "showMoreArticlesBtn": "Xem đầy đủ {count} bài trong nhóm",
    "hideMoreArticlesBtn": "Thu gọn danh sách bài"
  }
```

Cập nhật khối `"Guides"` trong `tophub-web/messages/en.json` (từ dòng 378 đến cuối file):

```json
  "Guides": {
    "hubBadge": "Top Heroes Tactical Encyclopedia (S0 ➔ S4)",
    "hubTitle": "Strategy Guides & Min-Max Data Tables",
    "hubDescription": "8 specialized topic groups and 31 battle-tested guides standardized from real server mechanics: 1-Queue Rule, Week A/B Event Rotation, Horde Pivot, and Quantitative Data Tables.",
    "searchPlaceholder": "Search heroes, events, runes, tips... (e.g., Brawler, 2000, Week A)",
    "searchNoResults": "No guide articles matched your search query.",
    "clearSearch": "Clear search filter",
    "mobileMenuBtn": "Guides Directory (8 Groups)",
    "onThisPage": "On This Page",
    "freeTierBadge": "Core Guide (Free)",
    "proTierBadge": "PRO Strategy",
    "hotBadge": "Hot",
    "proPreviewHeader": "Advanced Strategy & Quantitative Data (PRO)",
    "proPreviewSubtext": "Early-access preview unlocked free for all commanders",
    "proLockedTitle": "Exclusive PRO Commander Content ($1–2/month)",
    "proLockedDesc": "Unlock the complete 3-Step Horde Pivot blueprint, 4-hour Double-Dip windows, 18k Currency Freeze thresholds, and full level 1–80 tables.",
    "proLockedCheckUidBtn": "Link UID on Home Page",
    "proLockedUpgradeBtn": "Upgrade to PRO Now",
    "prevArticle": "Previous Guide",
    "nextArticle": "Next Guide",
    "backToHub": "Guides Overview",
    "readingTime": "{minutes} min read",
    "activeUidCardTitle": "Active Companion Account",
    "noActiveUidDesc": "No active UID selected. Enter your Game UID on the Home page to activate 24/7 Bot & sync PRO access.",
    "goToHomeBtn": "Enter UID & Activate Bot",
    "quickLinksTitle": "Daily Survival Must-Reads",
    "categoriesGridTitle": "8 Tactical Topic Groups (S0 ➔ S4)",
    "articlesCount": "{count} guides",
    "readArticleBtn": "Read Guide",
    "keyTakeawaysTitle": "Key Takeaways",
    "freeSectionTitle": "Core Fundamentals (Free Tier)",
    "proSectionTitle": "Quantitative Min-Max & Deep Optimization (PRO Tier)",
    "sourceFilesLabel": "Standardized Knowledge Sources",
    "collapseSidebar": "Collapse sidebar",
    "expandSidebar": "Expand sidebar",
    "searchResultsCount": "{count} results",
    "uidPillLinkAccount": "Link Game UID • Enable Bot & PRO",
    "uidPillManageBot": "Manage Bot",
    "readingProgressLabel": "Reading progress",
    "mobileTocBtn": "On This Page",
    "hotTagsLabel": "Hot topics:",
    "stageSelectorTitle": "Progression Roadmap By Server Age",
    "stageEarlyLabel": "Early Game (Days 1–20)",
    "stageEarlySub": "League starter, Strict 1-Queue Rule & avoiding Top 10 account traps",
    "stagePivotLabel": "Horde Pivot (Days 21–45)",
    "stagePivotSub": "Zero-Loss Horde transition, Double-Dip windows & 40k Honor Freeze",
    "stageSeasonLabel": "Seasonal Era (S1–S4)",
    "stageSeasonSub": "Castle Lv.35/40 Rush (T10/T11), Pets & Seasonal Buildings",
    "toolsStripTitle": "High-Speed Lookup Tools & Master Tables",
    "toolEncyclopediaTitle": "45+ Hero Encyclopedia",
    "toolEncyclopediaDesc": "S0➔S4 Tier List & Minimum Viable Stars",
    "toolCalendarTitle": "Week A/B Event Cycle",
    "toolCalendarDesc": "14-day Guild Race & KvK GAR heartbeat",
    "toolShopsTitle": "13-Shop ROI Tier List",
    "toolShopsDesc": "600% ROI picks & Weekly Wallet Safety Floors",
    "toolMasterTablesTitle": "12 Master Data Tables",
    "toolMasterTablesDesc": "Shards, Books, Ore, Runes & Pet breakpoints",
    "startWithArticleBtn": "Start: Guide {code}",
    "showMoreArticlesBtn": "View all {count} guides in group",
    "hideMoreArticlesBtn": "Hide group guide list"
  }
```

- [x] **Step 1.4: Chạy lại test mới + test `i18n.test.ts` và `group-4-content.test.ts` để xác nhận PASS (Green)**

Run:
```bash
pnpm --dir tophub-web test tests/guides-phase1-registry-i18n.test.ts tests/i18n.test.ts tests/group-4-content.test.ts
```
Expected: PASS (100% tests pass, 0 regressions).

---

### Task 2: Tạo `CompactUidStatusPill` & Nâng cấp `GuidesSidebar` (`w-64`, Single-Accordion, Collapsible Desktop Rail & Mobile Active UID Badge)

**Files:**
- Create: `tophub-web/src/components/guides/compact-uid-status-pill.tsx`
- Modify: `tophub-web/src/components/guides/guides-sidebar.tsx`
- Create: `tophub-web/tests/guides-sidebar.test.tsx`

- [x] **Step 2.1: Viết failing unit test tại `tophub-web/tests/guides-sidebar.test.tsx`**

```tsx
import React from "react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { GuidesSidebar } from "../src/components/guides/guides-sidebar";

const mockPathname = vi.fn(() => "/guides/roadmap/horde-pivot-roadmap");
const mockUidSession = vi.fn(() => ({
  activeAccount: {
    uid: "1000000000001",
    nickname: "CommanderVN",
    server_id: "105",
    added_at: 1700000000000,
    active_plan: "PRO" as const,
  },
  isLoaded: true,
}));

vi.mock("next-intl", () => ({
  useLocale: () => "vi",
  useTranslations: () => (key: string, params?: Record<string, unknown>) => {
    if (key === "searchResultsCount" && params) return `${params.count} kết quả`;
    if (key === "articlesCount" && params) return `${params.count} bài viết`;
    const map: Record<string, string> = {
      searchPlaceholder: "Tìm tướng, sự kiện...",
      clearSearch: "Xóa bộ lọc tìm kiếm",
      backToHub: "Tổng quan Cẩm Nang",
      mobileMenuBtn: "Danh Mục Cẩm Nang (8 Nhóm)",
      collapseSidebar: "Thu gọn danh mục",
      expandSidebar: "Mở rộng danh mục",
      uidPillLinkAccount: "Liên kết Game UID • Bật Bot & PRO",
      uidPillManageBot: "Quản lý Bot",
      searchNoResults: "Không tìm thấy bài viết nào.",
    };
    return map[key] ?? key;
  },
}));

vi.mock("@/i18n/routing", () => ({
  Link: ({
    href,
    children,
    ...rest
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
  usePathname: () => mockPathname(),
}));

vi.mock("@/hooks/use-uid-session", () => ({
  useUidSession: () => mockUidSession(),
}));

describe("GuidesSidebar (Phase 1 Hardened Redesign)", () => {
  beforeEach(() => {
    window.localStorage.clear();
    mockPathname.mockReturnValue("/guides/roadmap/horde-pivot-roadmap");
  });

  it("renders CompactUidStatusPill with active account details", () => {
    render(<GuidesSidebar />);
    expect(screen.getAllByText(/CommanderVN/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/S105/i).length).toBeGreaterThan(0);
  });

  it("enforces Single-Accordion behavior: only active category is open initially, and clicking another category closes the previous one", () => {
    render(<GuidesSidebar />);

    const group4Btn = screen.getByRole("button", {
      name: /4\. Lộ Trình Server & Chuyển Giao Mùa/i,
    });
    const group1Btn = screen.getByRole("button", {
      name: /1\. Nhập Môn & Luật Sống Còn/i,
    });

    expect(group4Btn.getAttribute("data-state")).toBe("open");
    expect(group1Btn.getAttribute("data-state")).toBe("closed");

    // Click Group 1 -> Group 1 opens, Group 4 closes
    fireEvent.click(group1Btn);
    expect(group1Btn.getAttribute("data-state")).toBe("open");
    expect(group4Btn.getAttribute("data-state")).toBe("closed");
  });

  it("toggles desktop sidebar collapsed rail and persists state to localStorage", () => {
    render(<GuidesSidebar />);
    const collapseBtn = screen.getByRole("button", {
      name: /Thu gọn danh mục/i,
    });
    fireEvent.click(collapseBtn);

    expect(
      window.localStorage.getItem("tophub_guides_sidebar_collapsed")
    ).toBe("1");
    expect(
      screen.getByRole("button", { name: /Mở rộng danh mục/i })
    ).toBeDefined();
  });
});
```

- [x] **Step 2.2: Chạy test để xác nhận FAIL (Red)**

Run:
```bash
pnpm --dir tophub-web test tests/guides-sidebar.test.tsx
```
Expected: FAIL (`CompactUidStatusPill` chưa tồn tại, `group1Btn` đang `data-state="open"` do `type="multiple"` cũ).

- [x] **Step 2.3: Tạo `compact-uid-status-pill.tsx` và nâng cấp `guides-sidebar.tsx`**

Tạo file `tophub-web/src/components/guides/compact-uid-status-pill.tsx`:

```tsx
"use client";

import React from "react";
import { ArrowUpRight, Crown, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { useUidSession } from "@/hooks/use-uid-session";
import { cn } from "@/lib/utils";

interface CompactUidStatusPillProps {
  className?: string;
  onNavigate?: () => void;
}

export function CompactUidStatusPill({
  className,
  onNavigate,
}: CompactUidStatusPillProps) {
  const t = useTranslations("Guides");
  const { activeAccount, isLoaded } = useUidSession();

  if (isLoaded && activeAccount) {
    const isPro = activeAccount.active_plan === "PRO";
    return (
      <Link
        href="/"
        onClick={onNavigate}
        title={t("uidPillManageBot")}
        className={cn(
          "group flex items-center justify-between gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10 hover:border-emerald-500/50 px-3 py-2 text-xs transition-all min-h-[40px]",
          className
        )}
      >
        <div className="flex items-center gap-2 min-w-0">
          <span
            className="h-2 w-2 rounded-full bg-emerald-500 shrink-0 animate-pulse"
            aria-hidden="true"
          />
          <span className="font-heading font-bold text-foreground truncate">
            {activeAccount.nickname}
          </span>
          <span className="font-mono text-[11px] text-muted-foreground shrink-0">
            • S{activeAccount.server_id}
          </span>
        </div>

        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 font-mono text-[10px] font-bold shrink-0",
            isPro
              ? "bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30"
              : "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
          )}
        >
          {isPro && <Crown className="h-2.5 w-2.5 fill-current" />}
          {isPro ? "PRO" : "Bot 24/7"}
        </span>
      </Link>
    );
  }

  return (
    <Link
      href="/"
      onClick={onNavigate}
      className={cn(
        "group flex items-center justify-between gap-2 rounded-xl border border-amber-500/35 bg-amber-500/10 hover:bg-amber-500/15 px-3 py-2 text-xs font-bold text-amber-600 dark:text-amber-400 transition-all min-h-[40px]",
        className
      )}
    >
      <span className="flex items-center gap-1.5 truncate">
        <Sparkles className="h-3.5 w-3.5 text-amber-500 shrink-0" />
        <span className="truncate">{t("uidPillLinkAccount")}</span>
      </span>
      <ArrowUpRight className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );
}
```

Cập nhật `tophub-web/src/components/guides/guides-sidebar.tsx`:

```tsx
"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Sprout,
  ShieldAlert,
  CalendarClock,
  Map,
  Swords,
  Sparkles,
  ShoppingBag,
  Castle,
  Search,
  X,
  BookOpen,
  Flame,
  Crown,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { useUidSession } from "@/hooks/use-uid-session";
import {
  GUIDE_ZONES,
  getAllCategories,
  searchGuides,
} from "@/content/guides/registry";
import type {
  GuideBadgeType,
  GuideCategoryIconName,
  GuideLocale,
} from "@/content/guides/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CompactUidStatusPill } from "./compact-uid-status-pill";
import { cn } from "@/lib/utils";

const SIDEBAR_COLLAPSED_STORAGE_KEY = "tophub_guides_sidebar_collapsed";

const categoryIcons: Record<GuideCategoryIconName, React.ElementType> = {
  Sprout,
  ShieldAlert,
  CalendarClock,
  Map,
  Swords,
  Sparkles,
  ShoppingBag,
  Castle,
};

function renderArticleIndicator(badge: GuideBadgeType) {
  if (badge === "HOT") {
    return (
      <span
        title="HOT"
        className="inline-flex items-center justify-center rounded-md bg-rose-500/15 border border-rose-500/30 px-1.5 py-0.5 text-[10px] font-mono font-bold text-rose-600 dark:text-rose-400 shrink-0"
      >
        <Flame className="h-2.5 w-2.5 fill-current" />
      </span>
    );
  }
  if (badge === "PRO") {
    return (
      <span
        title="PRO"
        className="inline-flex items-center justify-center rounded-md bg-amber-500/15 border border-amber-500/30 px-1.5 py-0.5 text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400 shrink-0"
      >
        <Crown className="h-2.5 w-2.5 fill-current" />
      </span>
    );
  }
  return null;
}

interface SidebarContentProps {
  onNavigate?: () => void;
  onCollapseDesktop?: () => void;
}

function SidebarNavigationTree({
  onNavigate,
  onCollapseDesktop,
}: SidebarContentProps) {
  const t = useTranslations("Guides");
  const rawLocale = useLocale();
  const locale: GuideLocale = rawLocale === "en" ? "en" : "vi";
  const pathname = usePathname();

  const [searchQuery, setSearchQuery] = useState("");

  const activeCategorySlug = useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments[0] === "guides" && segments[1]) {
      return segments[1];
    }
    return "getting-started";
  }, [pathname]);

  const [openCategory, setOpenCategory] = useState<string>(activeCategorySlug);

  useEffect(() => {
    setOpenCategory(activeCategorySlug);
  }, [activeCategorySlug]);

  const searchResults = useMemo(() => {
    if (searchQuery.trim().length < 2) return null;
    return searchGuides(searchQuery, locale);
  }, [searchQuery, locale]);

  return (
    <div className="space-y-3.5">
      {/* Compact UID Companion Status Pill (DEC-UX-02) */}
      <CompactUidStatusPill onNavigate={onNavigate} />

      {/* Quick Search Box + Optional Desktop Collapse Trigger */}
      <div className="flex items-center gap-1.5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-amber-500" />
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="pl-8 pr-8 h-10 rounded-xl bg-background/80 text-xs border-border/80 focus-visible:ring-amber-500/30 focus-visible:border-amber-500"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              aria-label={t("clearSearch")}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md text-muted-foreground hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {onCollapseDesktop && (
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={onCollapseDesktop}
            aria-label={t("collapseSidebar")}
            title={t("collapseSidebar")}
            className="h-10 w-10 shrink-0 rounded-xl border-border/80 bg-card/60 text-muted-foreground hover:text-amber-500 hover:border-amber-500/40"
          >
            <PanelLeftClose className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Overview Hub Link */}
      <Link
        href="/guides"
        onClick={onNavigate}
        className={cn(
          "flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all min-h-[40px] border",
          pathname === "/guides"
            ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/35 shadow-sm"
            : "border-border/60 bg-card/40 text-muted-foreground hover:text-foreground hover:bg-muted/50"
        )}
      >
        <BookOpen className="h-4 w-4 text-amber-500 shrink-0" />
        <span>{t("backToHub")}</span>
      </Link>

      {/* Instant Search Results View */}
      {searchResults !== null ? (
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between px-1">
            <span className="text-[11px] font-mono font-bold text-amber-600 dark:text-amber-400">
              {t("searchResultsCount", { count: searchResults.length })}
            </span>
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="text-[11px] text-muted-foreground hover:text-foreground underline"
            >
              {t("clearSearch")}
            </button>
          </div>

          {searchResults.length > 0 ? (
            <div className="space-y-1">
              {searchResults.map((article) => {
                const href = `/guides/${article.categorySlug}/${article.slug}`;
                const isActive = pathname === href;
                return (
                  <Link
                    key={`${article.categorySlug}/${article.slug}`}
                    href={href}
                    onClick={onNavigate}
                    className={cn(
                      "flex items-center justify-between gap-2 rounded-xl px-2.5 py-2 text-xs transition-all min-h-[40px] border",
                      isActive
                        ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30 font-bold"
                        : "border-border/50 bg-card/50 text-foreground/90 hover:border-amber-500/30"
                    )}
                  >
                    <div className="overflow-hidden flex items-center gap-1.5 min-w-0">
                      <span className="font-mono text-[10px] text-amber-500 shrink-0">
                        {article.code}
                      </span>
                      <span className="line-clamp-1">{article.title[locale]}</span>
                    </div>
                    {renderArticleIndicator(article.badge)}
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border/80 p-4 text-center space-y-2">
              <p className="text-xs text-muted-foreground">
                {t("searchNoResults")}
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setSearchQuery("")}
                className="text-xs h-8 rounded-lg"
              >
                {t("clearSearch")}
              </Button>
            </div>
          )}
        </div>
      ) : (
        /* 3 Zones -> 8 Categories Single-Accordion -> 31 Articles */
        <Accordion
          type="single"
          collapsible
          value={openCategory}
          onValueChange={setOpenCategory}
          className="space-y-4"
        >
          {GUIDE_ZONES.map((zone) => (
            <div key={zone.id} className="space-y-1.5">
              <div className="px-2 text-[10px] font-mono font-bold uppercase tracking-wider text-amber-600/90 dark:text-amber-400/90">
                {zone.title[locale]}
              </div>

              <div className="space-y-1.5">
                {zone.categories.map((category) => {
                  const Icon = categoryIcons[category.iconName] || BookOpen;
                  const isCategoryActive = activeCategorySlug === category.slug;

                  return (
                    <AccordionItem
                      key={category.slug}
                      value={category.slug}
                      className={cn(
                        "rounded-xl border px-2 transition-colors",
                        isCategoryActive
                          ? "border-amber-500/35 bg-amber-500/5 dark:bg-card/80"
                          : "border-border/60 bg-card/35"
                      )}
                    >
                      <AccordionTrigger className="py-2.5 hover:no-underline min-h-[42px]">
                        <div className="flex items-center gap-2 text-left pr-1.5 min-w-0">
                          <div
                            className={cn(
                              "flex h-6 w-6 items-center justify-center rounded-lg shrink-0",
                              isCategoryActive
                                ? "bg-amber-500 text-slate-950"
                                : "bg-amber-500/15 text-amber-500"
                            )}
                          >
                            <Icon className="h-3.5 w-3.5" />
                          </div>
                          <span className="font-heading font-bold text-xs text-foreground leading-snug line-clamp-1">
                            {category.order}. {category.title[locale]}
                          </span>
                        </div>
                      </AccordionTrigger>

                      <AccordionContent className="pb-2 pt-0.5">
                        <div className="space-y-1 pl-2 border-l border-border/70 ml-2.5">
                          {category.articles.map((article) => {
                            const href = `/guides/${category.slug}/${article.slug}`;
                            const isArticleActive = pathname === href;

                            return (
                              <Link
                                key={article.slug}
                                href={href}
                                onClick={onNavigate}
                                title={article.title[locale]}
                                className={cn(
                                  "flex items-center justify-between gap-1.5 rounded-lg px-2 py-1.5 text-xs transition-all min-h-[38px]",
                                  isArticleActive
                                    ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 font-bold border border-amber-500/30"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                )}
                              >
                                <span className="line-clamp-1 leading-snug min-w-0">
                                  <strong className="font-mono text-[10px] text-amber-500 mr-1.5">
                                    {article.code}
                                  </strong>
                                  {article.title[locale]}
                                </span>
                                {renderArticleIndicator(article.badge)}
                              </Link>
                            );
                          })}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </div>
            </div>
          ))}
        </Accordion>
      )}
    </div>
  );
}

export function GuidesSidebar() {
  const t = useTranslations("Guides");
  const rawLocale = useLocale();
  const locale: GuideLocale = rawLocale === "en" ? "en" : "vi";
  const pathname = usePathname();
  const { activeAccount, isLoaded } = useUidSession();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);
  const categories = getAllCategories();

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(SIDEBAR_COLLAPSED_STORAGE_KEY);
      if (saved === "1") {
        setDesktopCollapsed(true);
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const toggleDesktopCollapsed = (collapsed: boolean) => {
    setDesktopCollapsed(collapsed);
    try {
      window.localStorage.setItem(
        SIDEBAR_COLLAPSED_STORAGE_KEY,
        collapsed ? "1" : "0"
      );
    } catch {
      // Ignore storage errors
    }
  };

  return (
    <>
      {/* Mobile Drawer Trigger Bar (< 1024px) with inline UID indicator (GAP-08 fix) */}
      <div className="lg:hidden mb-3">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between min-h-[44px] rounded-2xl border-amber-500/30 bg-card/85 px-4 font-heading font-bold text-xs sm:text-sm"
            >
              <span className="flex items-center gap-2 min-w-0">
                <BookOpen className="h-4 w-4 text-amber-500 shrink-0" />
                <span className="truncate">{t("mobileMenuBtn")}</span>
              </span>
              <span className="flex items-center gap-2 shrink-0">
                {isLoaded && activeAccount && (
                  <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/15 px-1.5 py-0.5 font-mono text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    {activeAccount.active_plan === "PRO" ? "PRO" : "Bot"}
                  </span>
                )}
                <span className="font-mono text-[11px] text-amber-600 dark:text-amber-400">
                  {categories.length} Topics
                </span>
              </span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[320px] sm:w-[360px] overflow-y-auto bg-card/95 backdrop-blur-2xl p-5"
          >
            <SheetHeader className="pb-4 border-b border-border/60">
              <SheetTitle className="flex items-center gap-2 text-left font-heading text-base">
                <BookOpen className="h-5 w-5 text-amber-500" />
                <span>{t("mobileMenuBtn")}</span>
              </SheetTitle>
            </SheetHeader>
            <div className="mt-4">
              <SidebarNavigationTree onNavigate={() => setMobileOpen(false)} />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Left Sidebar (Expanded w-64 vs Collapsed w-14 Icon Rail) */}
      <aside
        className={cn(
          "hidden lg:block shrink-0 transition-all duration-200",
          desktopCollapsed ? "w-14" : "w-64"
        )}
      >
        <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pr-1 pb-8">
          {desktopCollapsed ? (
            <div className="flex flex-col items-center gap-2 rounded-2xl border border-border/70 bg-card/50 p-2">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => toggleDesktopCollapsed(false)}
                aria-label={t("expandSidebar")}
                title={t("expandSidebar")}
                className="h-10 w-10 rounded-xl text-amber-500 hover:bg-amber-500/15"
              >
                <PanelLeftOpen className="h-4 w-4" />
              </Button>

              <Link
                href="/guides"
                title={t("backToHub")}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-xl border transition-colors",
                  pathname === "/guides"
                    ? "border-amber-500/40 bg-amber-500/15 text-amber-500"
                    : "border-transparent text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                )}
              >
                <BookOpen className="h-4 w-4" />
              </Link>

              <div className="h-px w-8 bg-border/70 my-0.5" />

              {categories.map((category) => {
                const Icon = categoryIcons[category.iconName] || BookOpen;
                const firstArticle = category.articles[0];
                const href = firstArticle
                  ? `/guides/${category.slug}/${firstArticle.slug}`
                  : "/guides";
                const isActive = pathname.startsWith(`/guides/${category.slug}`);

                return (
                  <Link
                    key={category.slug}
                    href={href}
                    title={`${category.order}. ${category.title[locale]}`}
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-xl border transition-colors",
                      isActive
                        ? "border-amber-500/40 bg-amber-500 text-slate-950 shadow-sm"
                        : "border-transparent text-muted-foreground hover:bg-amber-500/10 hover:text-amber-500"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </Link>
                );
              })}
            </div>
          ) : (
            <SidebarNavigationTree
              onCollapseDesktop={() => toggleDesktopCollapsed(true)}
            />
          )}
        </div>
      </aside>
    </>
  );
}
```

- [x] **Step 2.4: Chạy lại unit test của `GuidesSidebar` để xác nhận PASS (Green)**

Run:
```bash
pnpm --dir tophub-web test tests/guides-sidebar.test.tsx
```
Expected: PASS (3 passed).

---

### Task 3: Mở rộng `GuidesShell` (`max-w-[1440px]`) & Hợp nhất `GuidesToc` (`w-56`, Single-Instance Scroll-Spy, Reading Progress `%`, Mobile/Tablet Sticky Sub-Header)

**Files:**
- Modify: `tophub-web/src/components/guides/guides-shell.tsx`
- Modify: `tophub-web/src/components/guides/guides-toc.tsx`
- Modify: `tophub-web/src/app/[locale]/guides/[category]/[slug]/page.tsx`
- Create: `tophub-web/tests/guides-toc.test.tsx`

- [x] **Step 3.1: Viết failing unit test tại `tophub-web/tests/guides-toc.test.tsx`**

```tsx
import React from "react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { GuidesToc } from "../src/components/guides/guides-toc";
import { ARTICLE_1_2_STRICT_ONE_QUEUE } from "../src/content/guides/groups/group-1/1.2-strict-one-queue-rule";
import { ARTICLE_1_3_DIAMOND_SPENDING } from "../src/content/guides/groups/group-1/1.3-diamond-and-spending-guide";

vi.mock("next-intl", () => ({
  useLocale: () => "vi",
  useTranslations: () => (key: string) => {
    const map: Record<string, string> = {
      onThisPage: "Trên Trang Này",
      readingProgressLabel: "Tiến độ đọc",
      mobileTocBtn: "Mục lục bài viết",
    };
    return map[key] ?? key;
  },
}));

describe("GuidesToc (Single-Instance Hardened Scroll-Spy & Mobile Bar)", () => {
  const observeSpy = vi.fn();
  const disconnectSpy = vi.fn();

  beforeEach(() => {
    observeSpy.mockClear();
    disconnectSpy.mockClear();

    class MockIntersectionObserver {
      observe = observeSpy;
      unobserve = vi.fn();
      disconnect = disconnectSpy;
    }
    vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
  });

  it("returns null when no article is provided (e.g., on Hub page)", () => {
    const { container } = render(<GuidesToc />);
    expect(container.firstChild).toBeNull();
  });

  it("renders both the mobile sticky trigger and desktop TOC rail from a single instance without bulky UID card", () => {
    render(<GuidesToc article={ARTICLE_1_2_STRICT_ONE_QUEUE} />);

    expect(screen.getByText("Trên Trang Này")).toBeDefined();
    expect(screen.getByText("Tiến độ đọc")).toBeDefined();
    expect(
      screen.getByRole("button", { name: /Mục lục bài viết/i })
    ).toBeDefined();
    expect(
      screen.getByText(ARTICLE_1_2_STRICT_ONE_QUEUE.freeSections[0].title.vi)
    ).toBeDefined();
    expect(screen.queryByText("Tài Khoản Đang Đồng Hành")).toBeNull();
  });

  it("resets active section highlight when navigating to a different article (GAP-05 fix)", () => {
    const { rerender } = render(
      <GuidesToc article={ARTICLE_1_2_STRICT_ONE_QUEUE} />
    );
    const firstSec12 = ARTICLE_1_2_STRICT_ONE_QUEUE.freeSections[0].title.vi;
    expect(screen.getByText(firstSec12)).toBeDefined();

    // Rerender with Article 1.3
    rerender(<GuidesToc article={ARTICLE_1_3_DIAMOND_SPENDING} />);
    const firstSec13 = ARTICLE_1_3_DIAMOND_SPENDING.freeSections[0].title.vi;
    const link13 = screen.getByText(firstSec13).closest("a");
    expect(link13?.className).toContain("font-bold");
  });
});
```

- [x] **Step 3.2: Chạy test để xác nhận FAIL (Red)**

Run:
```bash
pnpm --dir tophub-web test tests/guides-toc.test.tsx
```
Expected: FAIL (`GuidesToc` cũ vẫn render `Tài Khoản Đang Đồng Hành` và chưa có `Tiến độ đọc` hay nút `Mục lục bài viết`).

- [x] **Step 3.3: Cập nhật `guides-shell.tsx`, `guides-toc.tsx` và `guides/[category]/[slug]/page.tsx`**

Cập nhật `tophub-web/src/components/guides/guides-shell.tsx`:

```tsx
import React from "react";
import { GuidesSidebar } from "./guides-sidebar";

interface GuidesShellProps {
  children: React.ReactNode;
}

export function GuidesShell({ children }: GuidesShellProps) {
  return (
    <div className="container mx-auto max-w-[1440px] px-4 sm:px-6 py-6 sm:py-8">
      <div className="flex flex-col lg:flex-row lg:items-start gap-6 xl:gap-8">
        <GuidesSidebar />
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </div>
  );
}
```

Cập nhật `tophub-web/src/components/guides/guides-toc.tsx` (hợp nhất 1 instance duy nhất cho cả `< 1280px` Sticky Sub-Header và `>= 1280px` Right Rail, kèm vá `GAP-04`, `GAP-05`, `GAP-06`, `GAP-07`):

```tsx
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Crown, ListTree } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type { GuideArticle, GuideLocale } from "@/content/guides/types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface GuidesTocProps {
  article?: GuideArticle;
}

interface FlattenedTocSection {
  id: string;
  title: string;
  isPro: boolean;
  subSections: Array<{
    id: string;
    title: string;
  }>;
}

function useArticleScrollSpy(sectionIds: string[]) {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? "");
  const [progress, setProgress] = useState<number>(0);

  // GAP-05 Fix: Reset activeId whenever article changes and previous activeId is no longer in sectionIds
  useEffect(() => {
    if (sectionIds.length > 0 && !sectionIds.includes(activeId)) {
      setActiveId(sectionIds[0]);
      setProgress(0);
    }
  }, [sectionIds, activeId]);

  useEffect(() => {
    if (typeof window === "undefined" || sectionIds.length === 0) return;

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0 || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top
          );

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-96px 0px -65% 0px",
        threshold: [0, 1],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIds]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let rafId = 0;
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setProgress(0);
        return;
      }

      // GAP-06 Fix: Clamp to 100% and highlight last anchor when scrolled to bottom
      if (scrollTop >= docHeight - 24) {
        setProgress(100);
        if (sectionIds.length > 0) {
          setActiveId(sectionIds[sectionIds.length - 1]);
        }
        return;
      }

      const pct = Math.min(
        100,
        Math.max(0, Math.round((scrollTop / docHeight) * 100))
      );
      setProgress(pct);
    };

    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [sectionIds]);

  return { activeId, setActiveId, progress };
}

function buildTocSections(
  article: GuideArticle | undefined,
  locale: GuideLocale
): FlattenedTocSection[] {
  if (!article) return [];
  const raw = [
    ...article.freeSections.map((s) => ({ ...s, isPro: false })),
    ...article.proSections.map((s) => ({ ...s, isPro: true })),
  ];
  return raw.map((sec) => ({
    id: sec.id,
    title: sec.title[locale],
    isPro: sec.isPro,
    subSections: (sec.subSections ?? []).map((sub) => ({
      id: sub.id,
      title: sub.title[locale],
    })),
  }));
}

export function GuidesToc({ article }: GuidesTocProps) {
  const t = useTranslations("Guides");
  const rawLocale = useLocale();
  const locale: GuideLocale = rawLocale === "en" ? "en" : "vi";
  const [mobilePopoverOpen, setMobilePopoverOpen] = useState(false);
  const desktopTocContainerRef = useRef<HTMLDivElement | null>(null);

  const sections = useMemo(
    () => buildTocSections(article, locale),
    [article, locale]
  );

  const allAnchorIds = useMemo(
    () =>
      sections.flatMap((sec) => [
        sec.id,
        ...sec.subSections.map((sub) => sub.id),
      ]),
    [sections]
  );

  const { activeId, setActiveId, progress } = useArticleScrollSpy(allAnchorIds);

  // GAP-07 Fix: Keep active TOC item visible inside scrollable desktop TOC container
  useEffect(() => {
    const container = desktopTocContainerRef.current;
    if (!container || !activeId) return;
    const activeEl = container.querySelector<HTMLElement>(
      `[data-toc-id="${activeId}"]`
    );
    if (!activeEl) return;

    const containerRect = container.getBoundingClientRect();
    const activeRect = activeEl.getBoundingClientRect();
    const isAbove = activeRect.top < containerRect.top + 32;
    const isBelow = activeRect.bottom > containerRect.bottom - 32;

    if (isAbove || isBelow) {
      const targetScrollTop =
        container.scrollTop +
        (activeRect.top - containerRect.top) -
        containerRect.height / 2;
      container.scrollTo({
        top: Math.max(0, targetScrollTop),
        behavior: "smooth",
      });
    }
  }, [activeId]);

  if (!article || sections.length === 0) {
    return null;
  }

  return (
    <aside className="w-full xl:w-56 shrink-0 xl:order-2 sticky top-16 xl:static z-30 xl:z-auto">
      {/* 1. Mobile & Tablet Sticky Sub-Header TOC Bar (< 1280px) */}
      <div className="xl:hidden rounded-2xl border border-border/80 bg-card/90 backdrop-blur-md px-3 py-2 shadow-sm">
        <div className="flex items-center justify-between gap-2">
          <Popover open={mobilePopoverOpen} onOpenChange={setMobilePopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                aria-label={t("mobileTocBtn")}
                className="h-9 px-2.5 text-xs font-heading font-bold text-foreground hover:text-amber-500 flex items-center gap-1.5"
              >
                <ListTree className="h-4 w-4 text-amber-500 shrink-0" />
                <span>{t("mobileTocBtn")}</span>
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              className="w-[300px] sm:w-[360px] max-h-[65vh] overflow-y-auto rounded-2xl border-border/80 bg-card/95 backdrop-blur-xl p-3.5"
            >
              <p className="text-[11px] font-heading font-bold uppercase tracking-wider text-amber-500 mb-2">
                {t("onThisPage")}
              </p>
              <ul className="space-y-1.5 text-xs">
                {sections.map((sec) => {
                  const isSecActive = activeId === sec.id;
                  return (
                    <li key={sec.id} className="space-y-1">
                      <a
                        href={`#${sec.id}`}
                        onClick={() => {
                          setActiveId(sec.id);
                          setMobilePopoverOpen(false);
                        }}
                        className={cn(
                          "flex items-start justify-between gap-2 rounded-lg px-2 py-1.5 transition-colors leading-snug",
                          isSecActive
                            ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 font-bold"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        <span className="line-clamp-2">{sec.title}</span>
                        {sec.isPro && (
                          <Crown className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />
                        )}
                      </a>
                      {sec.subSections.length > 0 && (
                        <ul className="pl-3 border-l border-border/70 space-y-1 ml-2">
                          {sec.subSections.map((sub) => {
                            const isSubActive = activeId === sub.id;
                            return (
                              <li key={sub.id}>
                                <a
                                  href={`#${sub.id}`}
                                  onClick={() => {
                                    setActiveId(sub.id);
                                    setMobilePopoverOpen(false);
                                  }}
                                  className={cn(
                                    "block rounded-md px-2 py-1 text-[11px] transition-colors line-clamp-1",
                                    isSubActive
                                      ? "text-amber-500 font-bold bg-amber-500/10"
                                      : "text-muted-foreground/85 hover:text-foreground"
                                  )}
                                >
                                  {sub.title}
                                </a>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </PopoverContent>
          </Popover>

          <div className="flex items-center gap-2 shrink-0">
            <div className="w-20 h-1.5 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-amber-500 transition-all duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="font-mono text-[11px] font-bold text-amber-600 dark:text-amber-400 w-9 text-right">
              {progress}%
            </span>
          </div>
        </div>
      </div>

      {/* 2. Desktop Right Rail Scroll-Spy TOC (>= 1280px) */}
      <div className="hidden xl:block sticky top-20 space-y-3">
        <div
          ref={desktopTocContainerRef}
          className="rounded-2xl border border-border/80 bg-card/55 p-4 space-y-3.5 max-h-[calc(100vh-7rem)] overflow-y-auto"
        >
          {/* Reading Progress Header */}
          <div className="space-y-1.5 pb-2.5 border-b border-border/60">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-mono text-muted-foreground">
                {t("readingProgressLabel")}
              </span>
              <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
                {progress}%
              </span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <h4 className="flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-wider text-foreground">
            <ListTree className="h-4 w-4 text-amber-500" />
            <span>{t("onThisPage")}</span>
          </h4>

          <ul className="space-y-2 text-xs">
            {sections.map((sec) => {
              const isSecActive =
                activeId === sec.id ||
                sec.subSections.some((sub) => sub.id === activeId);

              return (
                <li key={sec.id} className="space-y-1">
                  <a
                    href={`#${sec.id}`}
                    data-toc-id={sec.id}
                    onClick={() => setActiveId(sec.id)}
                    className={cn(
                      "flex items-start justify-between gap-2 rounded-lg px-2 py-1 transition-colors leading-snug",
                      activeId === sec.id
                        ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 font-bold"
                        : isSecActive
                          ? "text-foreground font-semibold"
                          : "text-muted-foreground hover:text-amber-500 dark:hover:text-amber-400 font-medium"
                    )}
                  >
                    <span className="line-clamp-2">{sec.title}</span>
                    {sec.isPro && (
                      <Crown className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />
                    )}
                  </a>

                  {sec.subSections.length > 0 && (
                    <ul className="pl-2.5 border-l border-border/70 space-y-1 ml-2">
                      {sec.subSections.map((sub) => {
                        const isSubActive = activeId === sub.id;
                        return (
                          <li key={sub.id}>
                            <a
                              href={`#${sub.id}`}
                              data-toc-id={sub.id}
                              onClick={() => setActiveId(sub.id)}
                              className={cn(
                                "block rounded-md px-2 py-0.5 text-[11px] transition-colors line-clamp-1",
                                isSubActive
                                  ? "border-l-2 border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold"
                                  : "text-muted-foreground/85 hover:text-amber-500 dark:hover:text-amber-400"
                              )}
                            >
                              {sub.title}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </aside>
  );
}
```

Cập nhật `tophub-web/src/app/[locale]/guides/[category]/[slug]/page.tsx` (sử dụng `flex-col xl:flex-row` và `xl:order-1` / `xl:order-2` để chỉ mount duy nhất 1 `<GuidesToc article={article} />`):

```tsx
import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import {
  getAdjacentArticles,
  getAllArticles,
  getArticleBySlug,
  getCategoryBySlug,
} from "@/content/guides/registry";
import type { GuideLocale } from "@/content/guides/types";
import { GuideArticleRenderer } from "@/components/guides/guide-article-renderer";
import { GuidesToc } from "@/components/guides/guides-toc";

interface GuideArticlePageProps {
  params: {
    locale: string;
    category: string;
    slug: string;
  };
}

export function generateStaticParams() {
  const articles = getAllArticles();
  return routing.locales.flatMap((locale) =>
    articles.map((article) => ({
      locale,
      category: article.categorySlug,
      slug: article.slug,
    }))
  );
}

export async function generateMetadata({
  params: { locale, category, slug },
}: GuideArticlePageProps): Promise<Metadata> {
  const article = getArticleBySlug(category, slug);
  if (!article) {
    return {
      title: "Not Found | TopHub Guides",
    };
  }

  const safeLocale: GuideLocale = locale === "en" ? "en" : "vi";
  const title = `${article.code} ${article.title[safeLocale]} | TopHub`;
  const description = article.summary[safeLocale];

  return {
    title,
    description,
    keywords: article.keywords,
    openGraph: {
      title,
      description,
      type: "article",
      locale: safeLocale === "vi" ? "vi_VN" : "en_US",
    },
  };
}

export default function GuideArticlePage({
  params: { locale, category, slug },
}: GuideArticlePageProps) {
  setRequestLocale(locale);

  const categoryObj = getCategoryBySlug(category);
  const article = getArticleBySlug(category, slug);

  if (!categoryObj || !article) {
    notFound();
  }

  const { prev, next } = getAdjacentArticles(category, slug);

  return (
    <div className="flex flex-col xl:flex-row xl:items-start gap-4 xl:gap-8">
      <GuidesToc article={article} />
      <div className="flex-1 min-w-0 xl:order-1">
        <GuideArticleRenderer
          category={categoryObj}
          article={article}
          prevArticle={prev}
          nextArticle={next}
        />
      </div>
    </div>
  );
}
```

- [x] **Step 3.4: Chạy lại unit test của `GuidesToc` để xác nhận PASS (Green)**

Run:
```bash
pnpm --dir tophub-web test tests/guides-toc.test.tsx
```
Expected: PASS (3 passed).

---

### Task 4: Tái thiết kế trang chủ `/guides` thành **4-Layer Smart Command Hub** (với Bilingual `#HotTags`)

**Files:**
- Create: `tophub-web/src/components/guides/guides-hub-client.tsx`
- Modify: `tophub-web/src/app/[locale]/guides/page.tsx`
- Create: `tophub-web/tests/guides-hub-client.test.tsx`

- [x] **Step 4.1: Viết failing unit test tại `tophub-web/tests/guides-hub-client.test.tsx`**

```tsx
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { GuidesHubClient } from "../src/components/guides/guides-hub-client";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string, params?: Record<string, unknown>) => {
    if (key === "startWithArticleBtn" && params)
      return `Bắt đầu: Bài ${params.code}`;
    if (key === "showMoreArticlesBtn" && params)
      return `Xem đầy đủ ${params.count} bài trong nhóm`;
    if (key === "articlesCount" && params) return `${params.count} bài viết`;
    if (key === "searchResultsCount" && params) return `${params.count} kết quả`;
    if (key === "readingTime" && params) return `${params.minutes} phút đọc`;
    const map: Record<string, string> = {
      hubBadge: "Bách Khoa Chiến Thuật Top Heroes (S0 ➔ S4)",
      hubTitle: "Cẩm Nang Chiến Thuật & Bảng Số Liệu Min-Max",
      hubDescription: "Hệ thống 8 nhóm chuyên đề và 31 cẩm nang thực chiến.",
      searchPlaceholder: "Tìm tướng, sự kiện...",
      clearSearch: "Xóa bộ lọc tìm kiếm",
      searchNoResults: "Không tìm thấy bài viết nào.",
      hotTagsLabel: "Từ khóa nóng:",
      stageSelectorTitle: "Lộ Trình Đọc Theo Độ Tuổi Máy Chủ",
      stageEarlyLabel: "Tân Thủ (Ngày 1–20)",
      stageEarlySub: "Khởi đầu Liên Minh",
      stagePivotLabel: "Chuyển Hệ (Ngày 21–45)",
      stagePivotSub: "Xoay trục Bộ Lạc Zero-Loss",
      stageSeasonLabel: "Chiến Sự (Season 1–4)",
      stageSeasonSub: "Đua Lâu Đài Lv.35/40",
      toolsStripTitle: "Công Cụ & Bảng Tra Cứu Tốc Độ Cao",
      toolEncyclopediaTitle: "Bách Khoa 45+ Tướng",
      toolEncyclopediaDesc: "Tier List S0➔S4",
      toolCalendarTitle: "Lịch Chu Kỳ Tuần A/B",
      toolCalendarDesc: "Nhịp đập 14 ngày",
      toolShopsTitle: "Xếp Hạng 13 Cửa Hàng",
      toolShopsDesc: "ROI 600%",
      toolMasterTablesTitle: "12 Bảng Số Liệu Gốc",
      toolMasterTablesDesc: "Điểm gãy Mảnh, Sách",
      categoriesGridTitle: "8 Nhóm Chuyên Đề Chiến Thuật (S0 ➔ S4)",
      hideMoreArticlesBtn: "Thu gọn danh sách bài",
    };
    return map[key] ?? key;
  },
}));

vi.mock("@/i18n/routing", () => ({
  Link: ({
    href,
    children,
    ...rest
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

describe("GuidesHubClient (4-Layer Smart Command Hub — Hardened)", () => {
  it("renders all 4 layers: Hero + Hot Tags, 3-Stage Tabs, 4 Tools Strip, and 8 Bento Category Cards", () => {
    render(<GuidesHubClient locale="vi" />);

    // Layer 1: Hero & Hot Tags
    expect(
      screen.getByText("Cẩm Nang Chiến Thuật & Bảng Số Liệu Min-Max")
    ).toBeDefined();
    expect(screen.getByRole("button", { name: /#DoubleDip/i })).toBeDefined();

    // Layer 2: 3-Stage Server Selector Tabs
    expect(
      screen.getByRole("tab", { name: /Tân Thủ \(Ngày 1–20\)/i })
    ).toBeDefined();
    expect(
      screen.getByRole("tab", { name: /Chuyển Hệ \(Ngày 21–45\)/i })
    ).toBeDefined();
    expect(
      screen.getByRole("tab", { name: /Chiến Sự \(Season 1–4\)/i })
    ).toBeDefined();

    // Layer 3: 4 Interactive Tools Strip
    expect(screen.getByText("Bách Khoa 45+ Tướng")).toBeDefined();
    expect(screen.getByText("Lịch Chu Kỳ Tuần A/B")).toBeDefined();
    expect(screen.getByText("Xếp Hạng 13 Cửa Hàng")).toBeDefined();
    expect(screen.getByText("12 Bảng Số Liệu Gốc")).toBeDefined();

    // Layer 4: Clean 8-Category Bento Grid with Primary Start CTA
    expect(screen.getByText(/Bắt đầu: Bài 1\.1/i)).toBeDefined();
  });

  it("filters articles in both VI and EN locales when clicking a localized Hot Keyword Tag chip (GAP-02 fix)", () => {
    const { unmount } = render(<GuidesHubClient locale="vi" />);
    fireEvent.click(screen.getByRole("button", { name: /#HordePivot/i }));
    expect(screen.getByText(/kết quả/i)).toBeDefined();
    unmount();

    render(<GuidesHubClient locale="en" />);
    fireEvent.click(screen.getByRole("button", { name: /#9SoulStones/i }));
    expect(screen.getByText(/kết quả/i)).toBeDefined();
  });

  it("expands and collapses category article list on demand in Bento Grid", () => {
    render(<GuidesHubClient locale="vi" />);
    const expandBtns = screen.getAllByRole("button", {
      name: /Xem đầy đủ/i,
    });
    expect(expandBtns.length).toBe(8);

    fireEvent.click(expandBtns[0]);
    expect(
      screen.getByRole("button", { name: /Thu gọn danh sách bài/i })
    ).toBeDefined();
  });
});
```

- [x] **Step 4.2: Chạy test để xác nhận FAIL (Red)**

Run:
```bash
pnpm --dir tophub-web test tests/guides-hub-client.test.tsx
```
Expected: FAIL (`Cannot find module '../src/components/guides/guides-hub-client'`).

- [x] **Step 4.3: Tạo `guides-hub-client.tsx` và cập nhật `src/app/[locale]/guides/page.tsx`**

Tạo file `tophub-web/src/components/guides/guides-hub-client.tsx`:

```tsx
"use client";

import React, { useMemo, useState } from "react";
import {
  Sprout,
  ShieldAlert,
  CalendarClock,
  Map,
  Swords,
  Sparkles,
  ShoppingBag,
  Castle,
  BookOpen,
  Flame,
  Crown,
  ArrowRight,
  Search,
  X,
  Compass,
  Wrench,
  ChevronDown,
  ChevronUp,
  Table2,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import {
  getAllCategories,
  getArticleBySlug,
  searchGuides,
} from "@/content/guides/registry";
import type {
  GuideArticle,
  GuideCategoryIconName,
  GuideLocale,
  LocalizedText,
} from "@/content/guides/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface GuidesHubClientProps {
  locale: GuideLocale;
}

const categoryIcons: Record<GuideCategoryIconName, React.ElementType> = {
  Sprout,
  ShieldAlert,
  CalendarClock,
  Map,
  Swords,
  Sparkles,
  ShoppingBag,
  Castle,
};

interface HotTagItem {
  id: string;
  label: LocalizedText;
  query: LocalizedText;
}

// GAP-02 Fix: Bilingual Hot Tags with high-precision search queries for both vi and en
const HOT_TAGS: HotTagItem[] = [
  {
    id: "560-shards",
    label: { vi: "#560Mảnh", en: "#560Shards" },
    query: { vi: "560", en: "560" },
  },
  {
    id: "9-soul-stones",
    label: { vi: "#9HồnĐáĐỏ", en: "#9SoulStones" },
    query: { vi: "Hồn Đá Đỏ", en: "Soul Stone" },
  },
  {
    id: "double-dip",
    label: { vi: "#DoubleDip", en: "#DoubleDip" },
    query: { vi: "Double-Dip", en: "Double-Dip" },
  },
  {
    id: "horde-pivot",
    label: { vi: "#HordePivot", en: "#HordePivot" },
    query: { vi: "Bộ Lạc", en: "Horde" },
  },
  {
    id: "brawler-12-star",
    label: { vi: "#Brawler12Sao", en: "#12StarEpic" },
    query: { vi: "Brawler", en: "Brawler" },
  },
];

export function GuidesHubClient({ locale }: GuidesHubClientProps) {
  const t = useTranslations("Guides");
  const categories = useMemo(() => getAllCategories(), []);

  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >({});

  const toggleCategoryExpand = (slug: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [slug]: !prev[slug],
    }));
  };

  const stageArticles = useMemo(() => {
    const resolveList = (pairs: Array<[string, string]>): GuideArticle[] =>
      pairs
        .map(([cat, slug]) => getArticleBySlug(cat, slug))
        .filter((a): a is GuideArticle => Boolean(a));

    return {
      early: resolveList([
        ["getting-started", "overview"],
        ["getting-started", "strict-one-queue-rule"],
        ["getting-started", "top-10-account-traps"],
      ]),
      pivot: resolveList([
        ["roadmap", "horde-pivot-roadmap"],
        ["events", "double-dip-schedule"],
        ["economy", "guild-honor-freeze"],
      ]),
      season: resolveList([
        ["roadmap", "season-1-to-4-roadmap"],
        ["infrastructure", "castle-and-brilliance"],
        ["power-systems", "pets-and-behemoth"],
      ]),
    };
  }, []);

  const quickTools = useMemo(
    () => [
      {
        code: "2.1",
        href: "/guides/heroes/encyclopedia",
        icon: ShieldAlert,
        title: t("toolEncyclopediaTitle"),
        desc: t("toolEncyclopediaDesc"),
        accent: "text-rose-500 bg-rose-500/10 border-rose-500/25",
      },
      {
        code: "3.1",
        href: "/guides/events/biweekly-rotation",
        icon: CalendarClock,
        title: t("toolCalendarTitle"),
        desc: t("toolCalendarDesc"),
        accent: "text-amber-500 bg-amber-500/10 border-amber-500/25",
      },
      {
        code: "7.1",
        href: "/guides/economy/shops-tier-list",
        icon: ShoppingBag,
        title: t("toolShopsTitle"),
        desc: t("toolShopsDesc"),
        accent: "text-emerald-500 bg-emerald-500/10 border-emerald-500/25",
      },
      {
        code: "8.4",
        href: "/guides/infrastructure/master-data-tables",
        icon: Table2,
        title: t("toolMasterTablesTitle"),
        desc: t("toolMasterTablesDesc"),
        accent: "text-sky-500 bg-sky-500/10 border-sky-500/25",
      },
    ],
    [t]
  );

  const searchResults = useMemo(() => {
    if (searchQuery.trim().length < 2) return null;
    return searchGuides(searchQuery, locale);
  }, [searchQuery, locale]);

  const renderStageCards = (articles: GuideArticle[]) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
      {articles.map((art) => (
        <Link
          key={`${art.categorySlug}/${art.slug}`}
          href={`/guides/${art.categorySlug}/${art.slug}`}
          className="group rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-card/85 to-card p-4 flex flex-col justify-between space-y-3 hover:border-amber-500/60 transition-all shadow-sm"
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-xs font-bold text-amber-500">
                #{art.code}
              </span>
              {art.badge === "HOT" && (
                <Badge className="bg-rose-500/15 text-rose-500 border-rose-500/30 text-[10px] font-mono">
                  <Flame className="h-3 w-3 mr-1 fill-current" />
                  HOT
                </Badge>
              )}
              {art.badge === "PRO" && (
                <Badge className="bg-amber-500/15 text-amber-500 border-amber-500/30 text-[10px] font-mono">
                  <Crown className="h-3 w-3 mr-1 fill-current" />
                  PRO
                </Badge>
              )}
            </div>
            <h3 className="font-heading font-bold text-sm sm:text-base text-foreground group-hover:text-amber-500 transition-colors line-clamp-2">
              {art.title[locale]}
            </h3>
            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
              {art.summary[locale]}
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-border/50 text-[11px] font-mono text-amber-600 dark:text-amber-400">
            <span>{t("readingTime", { minutes: art.readingMinutes })}</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </div>
        </Link>
      ))}
    </div>
  );

  return (
    <div className="space-y-8">
      {/* LAYER 1: Compact Hero + Instant Search + Hot Keyword Tags */}
      <section className="card-rpg rounded-3xl p-5 sm:p-7 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-amber-600 dark:text-amber-400">
            <BookOpen className="h-3.5 w-3.5 text-amber-500" />
            <span>{t("hubBadge")}</span>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-foreground leading-tight">
            {t("hubTitle")}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-3xl">
            {t("hubDescription")}
          </p>
        </div>

        {/* Instant Hub Search Input + Bilingual Hot Tags */}
        <div className="pt-1 space-y-2.5">
          <div className="relative max-w-2xl">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-amber-500" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("searchPlaceholder")}
              className="pl-10 pr-10 h-11 rounded-2xl bg-background/85 text-xs sm:text-sm border-border/80 focus-visible:ring-amber-500/30 focus-visible:border-amber-500"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label={t("clearSearch")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="font-mono text-[11px] text-muted-foreground mr-1">
              {t("hotTagsLabel")}
            </span>
            {HOT_TAGS.map((tag) => {
              const targetQuery = tag.query[locale];
              const isSelected =
                searchQuery.trim().toLowerCase() === targetQuery.toLowerCase();
              return (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() =>
                    setSearchQuery(isSelected ? "" : targetQuery)
                  }
                  className={cn(
                    "rounded-full border px-2.5 py-1 font-mono text-[11px] font-semibold transition-all",
                    isSelected
                      ? "border-amber-500 bg-amber-500 text-slate-950"
                      : "border-border/70 bg-background/60 text-muted-foreground hover:border-amber-500/40 hover:text-amber-500"
                  )}
                >
                  {tag.label[locale]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Instant Search Results Panel inside Hero */}
        {searchResults !== null && (
          <div className="rounded-2xl border border-amber-500/30 bg-background/80 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
                {t("searchResultsCount", { count: searchResults.length })}
              </span>
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="text-xs text-muted-foreground hover:text-foreground underline"
              >
                {t("clearSearch")}
              </button>
            </div>

            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {searchResults.map((art) => (
                  <Link
                    key={`${art.categorySlug}/${art.slug}`}
                    href={`/guides/${art.categorySlug}/${art.slug}`}
                    className="group flex items-center justify-between gap-2 rounded-xl border border-border/70 bg-card/70 hover:border-amber-500/50 p-3 text-xs transition-all"
                  >
                    <div className="min-w-0 space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[11px] font-bold text-amber-500 shrink-0">
                          #{art.code}
                        </span>
                        <span className="font-heading font-bold text-foreground group-hover:text-amber-500 line-clamp-1">
                          {art.title[locale]}
                        </span>
                      </div>
                      <p className="text-[11px] text-muted-foreground line-clamp-1">
                        {art.summary[locale]}
                      </p>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-amber-500 shrink-0" />
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground py-2">
                {t("searchNoResults")}
              </p>
            )}
          </div>
        )}
      </section>

      {/* LAYER 2: 3-Stage Server Progression Selector Tabs */}
      <section className="space-y-3">
        <h2 className="text-xs font-heading font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5 px-1">
          <Compass className="h-4 w-4" />
          <span>{t("stageSelectorTitle")}</span>
        </h2>

        <Tabs defaultValue="early" className="space-y-3">
          <TabsList className="grid grid-cols-1 sm:grid-cols-3 h-auto gap-1.5 rounded-2xl bg-card/70 border border-border/80 p-1.5">
            <TabsTrigger
              value="early"
              className="rounded-xl py-2.5 px-3 text-left flex flex-col items-start gap-0.5 data-[state=active]:bg-amber-500/15 data-[state=active]:text-amber-600 dark:data-[state=active]:text-amber-400 data-[state=active]:border-amber-500/30 border border-transparent"
            >
              <span className="font-heading font-bold text-xs sm:text-sm">
                🌱 {t("stageEarlyLabel")}
              </span>
              <span className="text-[11px] text-muted-foreground line-clamp-1 font-normal">
                {t("stageEarlySub")}
              </span>
            </TabsTrigger>

            <TabsTrigger
              value="pivot"
              className="rounded-xl py-2.5 px-3 text-left flex flex-col items-start gap-0.5 data-[state=active]:bg-amber-500/15 data-[state=active]:text-amber-600 dark:data-[state=active]:text-amber-400 data-[state=active]:border-amber-500/30 border border-transparent"
            >
              <span className="font-heading font-bold text-xs sm:text-sm">
                🔥 {t("stagePivotLabel")}
              </span>
              <span className="text-[11px] text-muted-foreground line-clamp-1 font-normal">
                {t("stagePivotSub")}
              </span>
            </TabsTrigger>

            <TabsTrigger
              value="season"
              className="rounded-xl py-2.5 px-3 text-left flex flex-col items-start gap-0.5 data-[state=active]:bg-amber-500/15 data-[state=active]:text-amber-600 dark:data-[state=active]:text-amber-400 data-[state=active]:border-amber-500/30 border border-transparent"
            >
              <span className="font-heading font-bold text-xs sm:text-sm">
                ⚔️ {t("stageSeasonLabel")}
              </span>
              <span className="text-[11px] text-muted-foreground line-clamp-1 font-normal">
                {t("stageSeasonSub")}
              </span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="early">
            {renderStageCards(stageArticles.early)}
          </TabsContent>
          <TabsContent value="pivot">
            {renderStageCards(stageArticles.pivot)}
          </TabsContent>
          <TabsContent value="season">
            {renderStageCards(stageArticles.season)}
          </TabsContent>
        </Tabs>
      </section>

      {/* LAYER 3: 4 Interactive Tools & Master Lookup Strip */}
      <section className="space-y-3">
        <h2 className="text-xs font-heading font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 px-1">
          <Wrench className="h-4 w-4 text-amber-500" />
          <span>{t("toolsStripTitle")}</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5">
          {quickTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.code}
                href={tool.href}
                className="group rounded-2xl border border-border/80 bg-card/70 hover:border-amber-500/50 p-4 flex items-start gap-3.5 transition-all shadow-sm"
              >
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-xl border shrink-0",
                    tool.accent
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-mono text-[10px] font-bold text-amber-500">
                      #{tool.code}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-amber-500 transition-transform group-hover:translate-x-0.5" />
                  </div>
                  <h3 className="font-heading font-bold text-xs sm:text-sm text-foreground group-hover:text-amber-500 transition-colors truncate">
                    {tool.title}
                  </h3>
                  <p className="text-[11px] text-muted-foreground line-clamp-1">
                    {tool.desc}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* LAYER 4: Clean 8-Category Bento Grid */}
      <section className="space-y-4">
        <h2 className="text-xs font-heading font-bold uppercase tracking-wider text-muted-foreground px-1">
          {t("categoriesGridTitle")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {categories.map((category) => {
            const Icon = categoryIcons[category.iconName] || BookOpen;
            const firstArticle = category.articles[0];
            const isExpanded = Boolean(expandedCategories[category.slug]);

            return (
              <div
                key={category.slug}
                className="rounded-3xl border border-border/80 dark:border-amber-500/20 bg-card/70 p-5 sm:p-6 flex flex-col justify-between space-y-4 shadow-sm hover:border-amber-500/40 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 shadow-sm shrink-0">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="text-[11px] font-mono font-bold text-amber-600 dark:text-amber-400">
                          TOPIC 0{category.order}
                        </span>
                        <h3 className="font-heading font-black text-base sm:text-lg text-foreground leading-snug">
                          {category.title[locale]}
                        </h3>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className="font-mono text-[11px] shrink-0"
                    >
                      {t("articlesCount", { count: category.articles.length })}
                    </Badge>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {category.description[locale]}
                  </p>
                </div>

                {/* Primary Entry CTA + Progressive Disclosure Toggle for All Articles */}
                <div className="space-y-2.5 pt-3 border-t border-border/60">
                  {firstArticle && (
                    <Link
                      href={`/guides/${category.slug}/${firstArticle.slug}`}
                      className="group flex items-center justify-between gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/15 px-3.5 py-2.5 text-xs font-bold text-amber-600 dark:text-amber-400 transition-all min-h-[42px]"
                    >
                      <span className="truncate">
                        🚀 {t("startWithArticleBtn", { code: firstArticle.code })} —{" "}
                        {firstArticle.title[locale]}
                      </span>
                      <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  )}

                  <button
                    type="button"
                    onClick={() => toggleCategoryExpand(category.slug)}
                    className="w-full flex items-center justify-between px-2 py-1.5 text-[11px] font-mono font-semibold text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <span>
                      {isExpanded
                        ? t("hideMoreArticlesBtn")
                        : t("showMoreArticlesBtn", {
                            count: category.articles.length,
                          })}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="h-3.5 w-3.5" />
                    ) : (
                      <ChevronDown className="h-3.5 w-3.5" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="space-y-1 pt-1">
                      {category.articles.map((article) => (
                        <Link
                          key={article.slug}
                          href={`/guides/${category.slug}/${article.slug}`}
                          className="group flex items-center justify-between gap-2 rounded-xl px-3 py-2 text-xs hover:bg-amber-500/10 transition-colors min-h-[38px]"
                        >
                          <span className="truncate font-medium text-foreground/90 group-hover:text-amber-500">
                            <strong className="font-mono text-[11px] text-amber-500 mr-1.5">
                              {article.code}
                            </strong>
                            {article.title[locale]}
                          </span>
                          <span className="flex items-center gap-1.5 shrink-0">
                            {article.badge === "PRO" && (
                              <Crown className="h-3.5 w-3.5 text-amber-500" />
                            )}
                            {article.badge === "HOT" && (
                              <Flame className="h-3.5 w-3.5 text-rose-500" />
                            )}
                            <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-amber-500 transition-transform group-hover:translate-x-0.5" />
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
```

Cập nhật `tophub-web/src/app/[locale]/guides/page.tsx`:

```tsx
import React from "react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { GuideLocale } from "@/content/guides/types";
import { GuidesHubClient } from "@/components/guides/guides-hub-client";

interface GuidesHubPageProps {
  params: {
    locale: string;
  };
}

export async function generateMetadata({
  params: { locale },
}: GuidesHubPageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Guides" });
  const title = `${t("hubTitle")} | TopHub`;
  const description = t("hubDescription");

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      locale: locale === "vi" ? "vi_VN" : "en_US",
    },
  };
}

export default async function GuidesHubPage({
  params: { locale },
}: GuidesHubPageProps) {
  setRequestLocale(locale);
  const safeLocale: GuideLocale = locale === "en" ? "en" : "vi";

  return <GuidesHubClient locale={safeLocale} />;
}
```

- [x] **Step 4.4: Chạy lại unit test của `GuidesHubClient` để xác nhận PASS (Green)**

Run:
```bash
pnpm --dir tophub-web test tests/guides-hub-client.test.tsx
```
Expected: PASS (3 passed).

---

### Task 5: Kiểm định toàn diện Phase 1 Quality Gates (`vitest`, `next lint`, `next build`)

- [x] **Step 5.1: Chạy toàn bộ 26 test files trong `tophub-web/tests/` bằng Vitest**

Run:
```bash
pnpm --dir tophub-web test
```
Expected: Toàn bộ 26 test suites PASS, 0 lỗi.

- [x] **Step 5.2: Chạy kiểm tra ESLint & TypeScript**

Run:
```bash
pnpm --dir tophub-web lint
```
Expected: `✔ No ESLint warnings or errors`.

- [x] **Step 5.3: Chạy `next build` xác nhận SSG 62 trang bài viết + 2 trang Hub build thành công**

Run:
```bash
pnpm --dir tophub-web build
```
Expected: Build thành công, 0 lỗi SSG/SSR.

---

## ✅ 5. Senior Tech Lead 12-Point Plan Audit Checklist (`common/review-plan/references/checklist.md`)

| # | Tiêu chí đánh giá | Trạng thái | Đối chiếu & Xác thực chi tiết trên Hardened Plan v1.1 |
| :-: | :--- | :---: | :--- |
| **1** | **Data Loss & Integrity** | ✅ **PASS** | Không có bất kỳ thao tác xóa dữ liệu nào; toàn bộ 31 bài viết trong `src/content/guides/` và khóa i18n cũ được giữ nguyên 100%. |
| **2** | **Rollback Strategy** | ✅ **PASS** | Thay đổi thuần túy ở tầng Presentation (`src/components/guides/*`, `guides/page.tsx`, `guides/[category]/[slug]/page.tsx`); có thể `git checkout` / `git revert` tức thì về trạng thái cũ mà không cần migration. |
| **3** | **Performance & Scale** | ✅ **PASS** | Đã vá `GAP-04`: Hợp nhất `GuidesToc` thành 1 instance duy nhất (chỉ 1 `IntersectionObserver` + 1 `requestAnimationFrame` passive `scroll` listener). Giảm >55% số lượng thẻ `<Link>` mở sẵn trên DOM ban đầu. |
| **4** | **Security & Auth Scope** | ✅ **PASS** | Không mở thêm API endpoint; `CompactUidStatusPill` chỉ hiển thị `nickname`, `server_id`, `active_plan` sau khi `isLoaded === true`; tìm kiếm thuần client-side không dùng `dangerouslySetInnerHTML`. |
| **5** | **Contract Breaking** | ✅ **PASS** | Giữ nguyên 100% chữ ký `GuidesShellProps`, `GuidesTocProps` (`{ article?: GuideArticle }`), URL `/[locale]/guides/*` và cấu trúc `messages/{vi,en}.json`. |
| **6** | **Idempotency & Concurrency** | ✅ **PASS** | Click lặp vào `#HotTags` tự động toggle bật/tắt bộ lọc; click lặp vào nút thu gọn Sidebar ghi đè an toàn `"1"` / `"0"` vào `localStorage`; `requestAnimationFrame` hủy frame cũ (`cancelAnimationFrame`) trước khi tạo frame mới. |
| **7** | **Edge Cases & Null Safety** | ✅ **PASS** | Đã vá `GAP-05` (reset `activeId` khi chuyển bài viết SPA), `GAP-06` (highlight mục cuối khi chạm đáy trang 100%), xử lý `docHeight <= 0`, `localStorage` bị chặn (Safari Private Mode) và `IntersectionObserver` undefined. |
| **8** | **No Placeholders Law** | ✅ **PASS** | Tuyệt đối không có `TODO`, `TBD`, `...` hay hàm rỗng; 100% code và test đều đầy đủ từng dòng. |
| **9** | **Atomic Granularity** | ✅ **PASS** | Mỗi Task được chia nhỏ thành các bước nguyên tử `Step X.1` ➔ `Step X.4` (2–5 phút/bước). |
| **10** | **TDD Verification Flow** | ✅ **PASS** | Đầy đủ chu trình: Viết test (`tests/*.test.ts(x)`) ➔ Chạy xác nhận FAIL ➔ Viết code ➔ Chạy xác nhận PASS. |
| **11** | **Env & Secret Isolation** | ✅ **PASS** | Không có bất kỳ API key, secret, port hay domain hardcode nào trong code. |
| **12** | **Strict Type Safety** | ✅ **PASS** | Không sử dụng `any` hay ép kiểu mù; mọi props và dữ liệu i18n đều có kiểu tĩnh chặt chẽ. |

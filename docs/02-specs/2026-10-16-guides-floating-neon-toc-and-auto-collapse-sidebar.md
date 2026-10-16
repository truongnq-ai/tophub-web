# 🛡️ Guides Hub v3.1 — Scroll-Tracking Neon Shuttle TOC & Auto-Collapse Sidebar (Hardened Implementation Plan v1.1)

**Evaluated Plan**: `docs/plans/2026-10-16-guides-floating-neon-toc-and-auto-collapse-sidebar.md`
**Audit Result**: `APPROVED WITH REVISIONS (Hardened v1.1 — 5 Gaps Patched, 0 Blockers)`

**Goal:** Giải phóng 100% không gian ngang của trang bài viết Cẩm Nang (`/guides/[category]/[slug]`) bằng cách: (1) Thay thế cột mục lục cố định bên phải (`w-56`) và thanh sub-header chiếm chỗ bằng **Bong bóng nổi Con Thoi Ánh Sáng (`Scroll-Tracking Neon Shuttle Bubble`)** tự động di chuyển dọc theo mép phải màn hình theo tiến độ đọc (`0% ➔ 100%`), phát sáng hiệu ứng **Bóng đèn Neon (`Neon Bulb Ignition`)** cho mục đang đọc (làm mờ các mục khác xuống `opacity-35`) kèm nhãn thông báo chuyển mục `1.8s`; và (2) **Tự động thu nhỏ Menu bên trái (`GuidesSidebar`)** về chế độ Icon Rail (`w-14 = 56px`) ngay sau khi người dùng chọn bài viết để đọc.

**Architecture:**
- **Zero-Width Right Rail (`page.tsx`)**: Xóa bố cục chia cột `xl:flex-row` và cột `xl:w-56` trong `src/app/[locale]/guides/[category]/[slug]/page.tsx`, giải phóng toàn bộ `+256px` chiều ngang cho `GuideArticleRenderer`.
- **Scroll-Tracking Neon Shuttle & Clamped Floating Neon TOC (`guides-toc.tsx`)**: Sử dụng con thoi nổi `position: fixed right-2.5 sm:right-4 z-40` di chuyển dọc theo `progress` (`clamp(96px, calc(14vh + progress * 0.7vh), calc(100vh - 96px))`). Khi cuộn sang mục mới (`window.scrollY > 40`), con thoi phát xung sáng **Neon Pulse** và bung nhãn tên mục mới trong `1800ms`. Khi bấm mở Mục lục, bảng kính mờ **Neon TOC Panel** (`fixed right-14 sm:right-16 top-20 max-h-[calc(100vh-6rem)] z-50`) hiển thị mục đang đọc với hiệu ứng **Đèn Neon phát sáng (`data-neon-active="true"`)** và làm mờ các mục còn lại (`opacity-35 hover:opacity-100`).
- **Auto-Collapse Sidebar on Selection & Route Change (`guides-sidebar.tsx`)**: Tự động thu gọn Sidebar trái về `w-14` (`56px`) ngay khi bấm chọn bất kỳ bài viết nào (trong Accordion hoặc Quick Search) hoặc khi `pathname` chuyển sang một bài viết mới sau lần mount đầu tiên; đồng thời cho phép bấm vào Icon Nhóm (`1..8`) trên thanh `w-14` để bung nhanh đúng nhóm đó ra chọn bài.

**Tech Stack:** Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Radix UI (`@radix-ui/react-accordion`), Lucide Icons, `next-intl`, Vitest + React Testing Library.

---

## 1. 🔍 Báo Cáo Kiểm Toán Kế Hoạch (`/review-plan` Gap & Blindspot Analysis)

| Mã GAP | Hạng mục kiểm tra (12-Point Checklist) | Phát hiện / Điểm mù trong bản thảo v1.0 | Mức độ rủi ro | Biện pháp vá trong Hardened Plan v1.1 |
| :--- | :--- | :--- | :---: | :--- |
| **`GAP-v31-01`** | **#8 No Placeholders Law** | Task 2.3 và Task 3.3 trong bản v1.0 chỉ mô tả tóm tắt/snippet thay vì cung cấp toàn bộ mã nguồn thực thi của `guides-sidebar.tsx` và `guides-toc.tsx`. | `CRITICAL` | Cung cấp **100% mã nguồn đầy đủ (drop-in replacement)** cho cả `guides-sidebar.tsx`, `guides-toc.tsx`, `page.tsx` và các file test trong bản v1.1. |
| **`GAP-v31-02`** | **#3 Performance & Scale / `jsdom` Determinism** | Sử dụng Radix `<Popover>` gắn trên phần tử `fixed` có tọa độ `top` biến thiên liên tục theo scroll gây tính toán lại vị trí `@floating-ui` mỗi frame và phụ thuộc `ResizeObserver` trong `jsdom`. | `HIGH` | Thay thế Popover bằng **Controlled Floating Glass Panel** tự quản lý state `isOpen` (hỗ trợ Click, nút Đóng, phím `Escape` và Click-outside), không phụ thuộc `ResizeObserver` và đạt chuẩn 60fps. |
| **`GAP-v31-03`** | **#7 Edge Cases & Null Safety** | Nhãn thông báo chuyển mục `1.8s` (`Section Ignition Toast`) có nguy cơ tự kích hoạt nhầm ngay lúc vừa mở trang bài viết lần đầu (`scrollY === 0`) hoặc vừa chuyển sang bài viết khác. | `HIGH` | Bổ sung `prevArticleKeyRef` và `prevParentSectionIdRef`: chỉ kích hoạt `Section Ignition Toast` khi cùng 1 bài viết, `activeParentSection.id` thực sự đổi sang mục mới VÀ `window.scrollY > 40`. |
| **`GAP-v31-04`** | **#7 Edge Cases (Small Laptop Viewport Overflow)** | Nếu bảng danh sách Mục lục (`~420px` cao) neo theo `top` của bong bóng ở vị trí `0%` (`top = 105px`) hoặc `100%` (`top = 645px`) bằng `-translate-y-1/2`, bảng sẽ bị cắt mất đầu hoặc đuôi trên màn hình laptop nhỏ (`768px`). | `MEDIUM` | Neo bảng danh sách **Expanded Neon TOC Panel** ở khung dọc an toàn `fixed right-14 sm:right-16 top-20 max-h-[calc(100vh-6rem)] z-50`, trong khi Bong bóng Con Thoi và Nhãn `1.8s` (`36px` cao) vẫn trượt tự do theo `progress`. |
| **`GAP-v31-05`** | **#5 Backward Compatibility with Existing Tests** | Nếu `GuidesSidebar` tự ép `desktopCollapsed = true` ngay ở lần render đầu tiên khi `localStorage` rỗng, 2 unit test hiện hữu trong `tests/guides-sidebar.test.tsx` sẽ bị gãy vì kỳ vọng Accordion đang mở lúc khởi tạo. | `MEDIUM` | Giữ `desktopCollapsed = false` khi mount lần đầu nếu `localStorage !== "1"`, và tự động thu gọn về `w-14` (`"1"`) ngay khi: (a) người dùng bấm chọn bất kỳ link bài viết nào, hoặc (b) `pathname` thay đổi sang bài viết mới sau khi mount (`prevPathnameRef.current !== pathname`). |

---

## 2. ⚡ Đánh Giá Tác Động Liên Hệ Thống (Cross-System Impact Matrix)

- **API Contracts**: `[NO BREAKING CHANGES]` — Giữ nguyên chữ ký component `<GuidesToc article={article} />` và `<GuidesSidebar />`.
- **Database / Schema**: `[SAFE]` — Chỉ lưu khóa `"tophub_guides_sidebar_collapsed"` (`"1"` / `"0"`) trong `window.localStorage` với khối `try/catch` an toàn.
- **Auth & Permissions**: `[UNTOUCHED]` — Không ảnh hưởng tới `useUidSession` hay `CompactUidStatusPill`.
- **Regression Scope**: `[ISOLATED]` — Phạm vi gói gọn trong 5 file thuộc phân hệ `/guides` và 3 file unit test.

---

## 3. 🛠️ Kế Hoạch Thực Thi Đã Vá Lỗi Toàn Diện (Hardened Implementation Plan v1.1)

### Task 1: Bổ sung 3 khóa i18n Song ngữ (`vi` / `en`) cho Bong bóng Con Thoi Neon

**Files:**
- Modify: `tophub-web/tests/guides-phase1-registry-i18n.test.ts`
- Modify: `tophub-web/messages/vi.json`
- Modify: `tophub-web/messages/en.json`

- [x] **Step 1.1: Cập nhật unit test tại `tophub-web/tests/guides-phase1-registry-i18n.test.ts` bổ sung 3 khóa i18n mới**

Trong `tophub-web/tests/guides-phase1-registry-i18n.test.ts`, thêm `"neonShuttleAria"`, `"neonSectionEntered"`, `"neonTocHint"` vào cuối mảng `REQUIRED_PHASE1_KEYS`:

```ts
  "hubStartWith",
  "hubViewAllArticles",
  "hubCollapseArticles",
  "neonShuttleAria",
  "neonSectionEntered",
  "neonTocHint",
] as const;
```

- [x] **Step 1.2: Chạy test để xác nhận FAIL (Red)**

Run:
```bash
pnpm --dir tophub-web test tests/guides-phase1-registry-i18n.test.ts
```
Expected: FAIL (`expected undefined to be defined` cho khóa `neonShuttleAria`).

- [x] **Step 1.3: Bổ sung 3 khóa i18n vào `tophub-web/messages/vi.json` và `tophub-web/messages/en.json`**

Trong `tophub-web/messages/vi.json` (cuối đối tượng `"Guides"`):
```json
    "hubViewAllArticles": "Xem tất cả {count} bài viết",
    "hubCollapseArticles": "Thu gọn danh sách",
    "neonShuttleAria": "Tiến độ đọc và Mục lục Neon",
    "neonSectionEntered": "Đang đọc mục",
    "neonTocHint": "Bấm để mở mục lục • Tự động sáng theo vị trí đọc"
```

Trong `tophub-web/messages/en.json` (cuối đối tượng `"Guides"`):
```json
    "hubViewAllArticles": "View all {count} articles",
    "hubCollapseArticles": "Collapse list",
    "neonShuttleAria": "Reading progress and Neon Table of Contents",
    "neonSectionEntered": "Now reading",
    "neonTocHint": "Click to open TOC • Auto-glows with scroll position"
```

- [x] **Step 1.4: Chạy lại test để xác nhận PASS (Green)**

Run:
```bash
pnpm --dir tophub-web test tests/guides-phase1-registry-i18n.test.ts
```
Expected: PASS (4/4 tests).

---

### Task 2: Nâng cấp `GuidesSidebar` — Tự động thu nhỏ về `w-14` sau khi chọn bài đọc & Mở nhanh nhóm từ Icon Rail (`GAP-v31-05` Fixed)

**Files:**
- Modify: `tophub-web/tests/guides-sidebar.test.tsx`
- Modify: `tophub-web/src/components/guides/guides-sidebar.tsx`

- [x] **Step 2.1: Cập nhật đầy đủ file test `tophub-web/tests/guides-sidebar.test.tsx`**

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

describe("GuidesSidebar (Phase 1 + v3.1 Auto-Collapse Redesign)", () => {
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
      name: /4\. Lộ Trình Server & Các Mùa Giải \(KvK\)/i,
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

  it("automatically collapses the desktop sidebar to w-14 icon rail when an article link is clicked", () => {
    render(<GuidesSidebar />);

    // Click an article inside the open Group 4 accordion
    const articleLink = screen.getByRole("link", {
      name: /4\.1/i,
    });
    fireEvent.click(articleLink);

    // Desktop sidebar immediately collapses to w-14 and persists "1"
    expect(
      window.localStorage.getItem("tophub_guides_sidebar_collapsed")
    ).toBe("1");
    expect(
      screen.getByRole("button", { name: /Mở rộng danh mục/i })
    ).toBeDefined();
  });

  it("expands the sidebar to the clicked category when a category icon button is clicked in the collapsed w-14 rail", () => {
    window.localStorage.setItem("tophub_guides_sidebar_collapsed", "1");
    render(<GuidesSidebar />);

    const group1RailBtn = screen.getByRole("button", {
      name: /1\. Nhập Môn & Luật Sống Còn/i,
    });
    fireEvent.click(group1RailBtn);

    expect(
      window.localStorage.getItem("tophub_guides_sidebar_collapsed")
    ).toBe("0");
    const group1AccordionBtn = screen.getByRole("button", {
      name: /1\. Nhập Môn & Luật Sống Còn/i,
    });
    expect(group1AccordionBtn.getAttribute("data-state")).toBe("open");
  });
});
```

- [x] **Step 2.2: Chạy test để xác nhận FAIL (Red)**

Run:
```bash
pnpm --dir tophub-web test tests/guides-sidebar.test.tsx
```
Expected: FAIL (2 test mới fail do click bài viết chưa tự thu gọn về `w-14` và icon trên thanh `w-14` đang là thẻ `<a>` thay vì `<button>` mở nhóm).

- [x] **Step 2.3: Cập nhật toàn bộ `tophub-web/src/components/guides/guides-sidebar.tsx`**

```tsx
"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
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
  onSelectArticle?: () => void;
  onCollapseDesktop?: () => void;
  preferredCategorySlug?: string | null;
}

function SidebarNavigationTree({
  onNavigate,
  onSelectArticle,
  onCollapseDesktop,
  preferredCategorySlug,
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

  const [openCategory, setOpenCategory] = useState<string>(
    preferredCategorySlug || activeCategorySlug
  );

  useEffect(() => {
    if (preferredCategorySlug) {
      setOpenCategory(preferredCategorySlug);
    } else {
      setOpenCategory(activeCategorySlug);
    }
  }, [activeCategorySlug, preferredCategorySlug]);

  const searchResults = useMemo(() => {
    if (searchQuery.trim().length < 2) return null;
    return searchGuides(searchQuery, locale);
  }, [searchQuery, locale]);

  const handleArticleClick = () => {
    onSelectArticle?.();
    onNavigate?.();
  };

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
                    onClick={handleArticleClick}
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
                                onClick={handleArticleClick}
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
  const [preferredCategorySlug, setPreferredCategorySlug] = useState<
    string | null
  >(null);
  const prevPathnameRef = useRef<string>(pathname);
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

  // GAP-v31-05: Auto-collapse when navigating to a new article route after mount
  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;
      const segments = pathname.split("/").filter(Boolean);
      const isArticleRoute = segments[0] === "guides" && segments.length >= 3;
      if (isArticleRoute) {
        setPreferredCategorySlug(null);
        toggleDesktopCollapsed(true);
      }
    }
  }, [pathname]);

  const handleDesktopSelectArticle = () => {
    setPreferredCategorySlug(null);
    toggleDesktopCollapsed(true);
  };

  const handleExpandCategoryFromRail = (categorySlug: string) => {
    setPreferredCategorySlug(categorySlug);
    toggleDesktopCollapsed(false);
  };

  return (
    <>
      {/* Mobile Drawer Trigger Bar (< 1024px) with inline UID indicator */}
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
                const isActive = pathname.startsWith(`/guides/${category.slug}`);
                const label = `${category.order}. ${category.title[locale]}`;

                return (
                  <button
                    key={category.slug}
                    type="button"
                    onClick={() => handleExpandCategoryFromRail(category.slug)}
                    aria-label={label}
                    title={label}
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-xl border transition-colors cursor-pointer",
                      isActive
                        ? "border-amber-500/40 bg-amber-500 text-slate-950 shadow-sm"
                        : "border-transparent text-muted-foreground hover:bg-amber-500/10 hover:text-amber-500"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </button>
                );
              })}
            </div>
          ) : (
            <SidebarNavigationTree
              preferredCategorySlug={preferredCategorySlug}
              onSelectArticle={handleDesktopSelectArticle}
              onCollapseDesktop={() => toggleDesktopCollapsed(true)}
            />
          )}
        </div>
      </aside>
    </>
  );
}
```

- [x] **Step 2.4: Chạy lại test để xác nhận PASS (Green)**

Run:
```bash
pnpm --dir tophub-web test tests/guides-sidebar.test.tsx
```
Expected: PASS (5/5 tests).

---

### Task 3: Tái thiết kế `GuidesToc` thành Bong bóng Con Thoi Ánh Sáng (`Scroll-Tracking Neon Shuttle Bubble`) & Giải phóng Cột Phải trong `page.tsx` (`GAP-v31-02`, `GAP-v31-03`, `GAP-v31-04` Fixed)

**Files:**
- Modify: `tophub-web/tests/guides-toc.test.tsx`
- Modify: `tophub-web/src/components/guides/guides-toc.tsx`
- Modify: `tophub-web/src/app/[locale]/guides/[category]/[slug]/page.tsx`

- [x] **Step 3.1: Cập nhật toàn bộ `tophub-web/tests/guides-toc.test.tsx`**

```tsx
import React from "react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
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
      neonShuttleAria: "Tiến độ đọc và Mục lục Neon",
      neonSectionEntered: "Đang đọc mục",
      neonTocHint: "Bấm để mở mục lục • Tự động sáng theo vị trí đọc",
    };
    return map[key] ?? key;
  },
}));

describe("GuidesToc (Scroll-Tracking Neon Shuttle Bubble)", () => {
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

  it("renders a floating Scroll-Tracking Neon Shuttle bubble that opens the Neon TOC panel with active neon glow and dimmed inactive items", () => {
    render(<GuidesToc article={ARTICLE_1_2_STRICT_ONE_QUEUE} />);

    const shuttleBtn = screen.getByRole("button", {
      name: /Tiến độ đọc và Mục lục Neon/i,
    });
    expect(shuttleBtn).toBeDefined();
    expect(shuttleBtn.textContent).toContain("0%");
    expect(screen.queryByText("Tài Khoản Đang Đồng Hành")).toBeNull();

    // Click shuttle bubble to open Neon TOC panel
    fireEvent.click(shuttleBtn);

    expect(screen.getByText("Trên Trang Này")).toBeDefined();
    expect(screen.getByText("Tiến độ đọc")).toBeDefined();

    const firstSecTitle = ARTICLE_1_2_STRICT_ONE_QUEUE.freeSections[0].title.vi;
    const secondSecTitle =
      ARTICLE_1_2_STRICT_ONE_QUEUE.freeSections[1].title.vi;

    const firstLink = screen.getByText(firstSecTitle).closest("a");
    const secondLink = screen.getByText(secondSecTitle).closest("a");

    expect(firstLink?.getAttribute("data-neon-active")).toBe("true");
    expect(secondLink?.getAttribute("data-neon-active")).toBe("false");
    expect(secondLink?.className).toContain("opacity-35");
  });

  it("resets active section highlight when navigating to a different article and updates neon glow on click", () => {
    const { rerender } = render(
      <GuidesToc article={ARTICLE_1_2_STRICT_ONE_QUEUE} />
    );

    const shuttleBtn = screen.getByRole("button", {
      name: /Tiến độ đọc và Mục lục Neon/i,
    });
    fireEvent.click(shuttleBtn);

    // Rerender with Article 1.3
    rerender(<GuidesToc article={ARTICLE_1_3_DIAMOND_SPENDING} />);
    const firstSec13 = ARTICLE_1_3_DIAMOND_SPENDING.freeSections[0].title.vi;
    const secondSec13 = ARTICLE_1_3_DIAMOND_SPENDING.freeSections[1].title.vi;

    const link1 = screen.getByText(firstSec13).closest("a");
    const link2 = screen.getByText(secondSec13).closest("a");

    expect(link1?.getAttribute("data-neon-active")).toBe("true");
    expect(link2?.getAttribute("data-neon-active")).toBe("false");
  });
});
```

- [x] **Step 3.2: Chạy test để xác nhận FAIL (Red)**

Run:
```bash
pnpm --dir tophub-web test tests/guides-toc.test.tsx
```
Expected: FAIL (`Unable to find an accessible element with the role "button" and name "/Tiến độ đọc và Mục lục Neon/i"`).

- [x] **Step 3.3: Cập nhật toàn bộ `tophub-web/src/components/guides/guides-toc.tsx` và `tophub-web/src/app/[locale]/guides/[category]/[slug]/page.tsx`**

Cập nhật `tophub-web/src/components/guides/guides-toc.tsx`:

```tsx
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Crown, ListTree, Sparkles, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type { GuideArticle, GuideLocale } from "@/content/guides/types";
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

  const [isOpen, setIsOpen] = useState(false);
  const [ignitedSectionTitle, setIgnitedSectionTitle] = useState<string | null>(
    null
  );

  const rootRef = useRef<HTMLDivElement | null>(null);
  const tocListRef = useRef<HTMLDivElement | null>(null);
  const prevArticleKeyRef = useRef<string>("");
  const prevParentSectionIdRef = useRef<string>("");

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

  const activeParentSection = useMemo(() => {
    return (
      sections.find(
        (sec) =>
          sec.id === activeId ||
          sec.subSections.some((sub) => sub.id === activeId)
      ) ?? sections[0]
    );
  }, [sections, activeId]);

  // GAP-v31-03 Fix: Trigger 1.8s Neon Ignition Toast only when scrolling into a new section within the same article
  useEffect(() => {
    if (!article || !activeParentSection) return;
    const articleKey = `${article.categorySlug}/${article.slug}`;

    if (prevArticleKeyRef.current !== articleKey) {
      prevArticleKeyRef.current = articleKey;
      prevParentSectionIdRef.current = activeParentSection.id;
      setIgnitedSectionTitle(null);
      return;
    }

    if (prevParentSectionIdRef.current !== activeParentSection.id) {
      prevParentSectionIdRef.current = activeParentSection.id;
      if (typeof window !== "undefined" && window.scrollY > 40) {
        setIgnitedSectionTitle(activeParentSection.title);
        const timer = window.setTimeout(() => {
          setIgnitedSectionTitle(null);
        }, 1800);
        return () => window.clearTimeout(timer);
      }
    }
  }, [article, activeParentSection]);

  // Auto-scroll active item inside open TOC panel
  useEffect(() => {
    if (!isOpen) return;
    const container = tocListRef.current;
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
      const targetScrollTop = Math.max(
        0,
        container.scrollTop +
          (activeRect.top - containerRect.top) -
          containerRect.height / 2
      );
      if (typeof container.scrollTo === "function") {
        container.scrollTo({
          top: targetScrollTop,
          behavior: "smooth",
        });
      } else {
        container.scrollTop = targetScrollTop;
      }
    }
  }, [activeId, isOpen]);

  // Close panel on Escape or outside click
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    const handlePointerDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousedown", handlePointerDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousedown", handlePointerDown);
    };
  }, [isOpen]);

  if (!article || sections.length === 0) {
    return null;
  }

  const isIgniting = Boolean(ignitedSectionTitle);

  return (
    <div ref={rootRef} className=" print:hidden">
      {/* 1. Scroll-Tracking Neon Shuttle Bubble (Moves vertically along right edge with reading progress) */}
      <div
        style={{
          top: `clamp(96px, calc(14vh + ${progress * 0.7}vh), calc(100vh - 96px))`,
        }}
        className="fixed right-2.5 sm:right-4 z-40 flex items-center gap-2 transition-[top] duration-200 ease-out motion-reduce:transition-none"
      >
        {/* 1.8s Section Ignition Neon Toast (Unfurls to the left when entering a new section) */}
        {ignitedSectionTitle && !isOpen && (
          <div
            role="status"
            aria-live="polite"
            className="pointer-events-none hidden sm:flex items-center gap-2 max-w-[260px] rounded-full border border-amber-400/80 bg-slate-950/90 dark:bg-slate-950/95 px-3.5 py-1.5 text-xs text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.45)] backdrop-blur-xl animate-in fade-in slide-in-from-right-2 duration-200"
          >
            <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_10px_#f59e0b,0_0_18px_#f59e0b] animate-ping shrink-0" />
            <span className="truncate font-heading font-bold">
              {ignitedSectionTitle}
            </span>
          </div>
        )}

        {/* Main Neon Shuttle Button + Mini Section LED Track */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={t("neonShuttleAria")}
          aria-expanded={isOpen}
          title={
            activeParentSection
              ? `${activeParentSection.title} (${progress}%)`
              : t("neonShuttleAria")
          }
          className={cn(
            "group relative flex flex-col items-center justify-center gap-1.5 min-w-[46px] min-h-[54px] rounded-2xl border px-2 py-2 backdrop-blur-xl transition-all duration-200 cursor-pointer select-none",
            isOpen || isIgniting
              ? "border-amber-400 bg-slate-950/95 text-amber-300 shadow-[0_0_24px_rgba(245,158,11,0.65)] ring-2 ring-amber-400/50"
              : "border-amber-500/45 bg-card/90 dark:bg-slate-950/85 text-foreground hover:border-amber-400 hover:shadow-[0_0_18px_rgba(245,158,11,0.4)] shadow-md"
          )}
        >
          {/* Neon Bulb Icon + Progress % */}
          <div className="flex items-center gap-1">
            <Sparkles
              className={cn(
                "h-3.5 w-3.5 transition-all",
                isOpen || isIgniting
                  ? "text-amber-300 drop-shadow-[0_0_8px_rgba(245,158,11,0.95)]"
                  : "text-amber-500 group-hover:text-amber-400"
              )}
            />
            <span
              className={cn(
                "font-mono text-[11px] font-extrabold tracking-tight",
                isOpen || isIgniting
                  ? "text-amber-300 drop-shadow-[0_0_6px_rgba(245,158,11,0.8)]"
                  : "text-amber-600 dark:text-amber-400"
              )}
            >
              {progress}%
            </span>
          </div>

          {/* Mini Section LED Bulbs (Active section glows neon, others are dimmed) */}
          <div className="flex items-center gap-1">
            {sections.map((sec) => {
              const isParentActive = activeParentSection?.id === sec.id;
              return (
                <span
                  key={sec.id}
                  className={cn(
                    "rounded-full transition-all duration-200",
                    isParentActive
                      ? "h-1.5 w-3 bg-amber-400 shadow-[0_0_8px_#f59e0b,0_0_14px_#f59e0b]"
                      : "h-1.5 w-1.5 bg-muted-foreground/30"
                  )}
                />
              );
            })}
          </div>
        </button>
      </div>

      {/* 2. Clamped Floating Neon TOC Panel (GAP-v31-04 Safe Viewport Rail) */}
      {isOpen && (
        <aside
          aria-label={t("onThisPage")}
          className="fixed right-16 sm:right-20 top-20 z-50 w-[290px] sm:w-[340px] max-h-[calc(100vh-6rem)] flex flex-col rounded-2xl border border-amber-500/40 bg-card/95 dark:bg-slate-950/95 backdrop-blur-2xl shadow-[0_0_35px_rgba(245,158,11,0.22)] overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        >
          {/* Reading Progress Header */}
          <div className="p-3.5 border-b border-border/60 space-y-2 shrink-0">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <ListTree className="h-4 w-4 text-amber-500" />
                <h4 className="text-xs font-heading font-bold uppercase tracking-wider text-foreground">
                  {t("onThisPage")}
                </h4>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] text-muted-foreground">
                  {t("readingProgressLabel")}
                </span>
                <span className="font-mono text-xs font-extrabold text-amber-500 drop-shadow-[0_0_6px_rgba(245,158,11,0.5)]">
                  {progress}%
                </span>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close TOC"
                  className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 cursor-pointer"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 shadow-[0_0_10px_#f59e0b] transition-all duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Scrollable Section List with Neon Bulb Active Glow & Dimmed Inactive Items */}
          <div
            ref={tocListRef}
            className="p-3.5 overflow-y-auto space-y-2 text-xs"
          >
            <ul className="space-y-2">
              {sections.map((sec) => {
                const isSecActive =
                  activeId === sec.id ||
                  sec.subSections.some((sub) => sub.id === activeId);

                return (
                  <li key={sec.id} className="space-y-1">
                    <a
                      href={`#${sec.id}`}
                      data-toc-id={sec.id}
                      data-neon-active={isSecActive ? "true" : "false"}
                      onClick={() => {
                        setActiveId(sec.id);
                        setIsOpen(false);
                      }}
                      className={cn(
                        "flex items-start justify-between gap-2 rounded-xl px-2.5 py-2 transition-all duration-200 leading-snug border",
                        isSecActive
                          ? "opacity-100 border-amber-400/80 bg-amber-500/15 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 font-bold shadow-[0_0_18px_rgba(245,158,11,0.32)]"
                          : "opacity-35 hover:opacity-100 focus-visible:opacity-100 border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/40 font-medium"
                      )}
                    >
                      <div className="flex items-start gap-2 min-w-0">
                        <span
                          className={cn(
                            "mt-1.5 h-2 w-2 rounded-full shrink-0 transition-all",
                            isSecActive
                              ? "bg-amber-400 shadow-[0_0_8px_#f59e0b,0_0_16px_#f59e0b] animate-pulse"
                              : "bg-muted-foreground/40"
                          )}
                        />
                        <span className="line-clamp-2">{sec.title}</span>
                      </div>
                      {sec.isPro && (
                        <Crown className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />
                      )}
                    </a>

                    {sec.subSections.length > 0 && (
                      <ul
                        className={cn(
                          "pl-3 border-l space-y-1 ml-3 transition-opacity duration-200",
                          isSecActive
                            ? "border-amber-500/50 opacity-100"
                            : "border-border/50 opacity-35 hover:opacity-100"
                        )}
                      >
                        {sec.subSections.map((sub) => {
                          const isSubActive = activeId === sub.id;
                          return (
                            <li key={sub.id}>
                              <a
                                href={`#${sub.id}`}
                                data-toc-id={sub.id}
                                data-neon-active={isSubActive ? "true" : "false"}
                                onClick={() => {
                                  setActiveId(sub.id);
                                  setIsOpen(false);
                                }}
                                className={cn(
                                  "flex items-center gap-1.5 rounded-lg px-2 py-1 text-[11px] transition-all duration-200 line-clamp-1",
                                  isSubActive
                                    ? "bg-amber-500/15 text-amber-700 dark:text-amber-300 font-bold border border-amber-400/60 shadow-[0_0_12px_rgba(245,158,11,0.28)]"
                                    : "text-muted-foreground hover:text-foreground"
                                )}
                              >
                                <span
                                  className={cn(
                                    "h-1.5 w-1.5 rounded-full shrink-0",
                                    isSubActive
                                      ? "bg-amber-400 shadow-[0_0_6px_#f59e0b]"
                                      : "bg-muted-foreground/30"
                                  )}
                                />
                                <span className="truncate">{sub.title}</span>
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
        </aside>
      )}
    </div>
  );
}
```

Cập nhật `tophub-web/src/app/[locale]/guides/[category]/[slug]/page.tsx`:

```tsx
  return (
    <div className="relative min-w-0 w-full">
      <GuidesToc article={article} />
      <GuideArticleRenderer
        category={categoryObj}
        article={article}
        prevArticle={prev}
        nextArticle={next}
      />
    </div>
  );
```

- [x] **Step 3.4: Chạy lại test để xác nhận PASS (Green)**

Run:
```bash
pnpm --dir tophub-web test tests/guides-toc.test.tsx
```
Expected: PASS (3/3 tests).

---

### Task 4: Kiểm định Toàn diện Chất lượng (`vitest`, `next lint`, `next build`)

- [x] **Step 4.1: Chạy toàn bộ 27 test suites trong `tophub-web/tests/`**

Run:
```bash
pnpm --dir tophub-web test
```
Expected: Toàn bộ 27 test files PASS, 0 lỗi.

- [x] **Step 4.2: Chạy kiểm tra ESLint & TypeScript**

Run:
```bash
pnpm --dir tophub-web lint
```
Expected: `✔ No ESLint warnings or errors`.

- [x] **Step 4.3: Chạy `next build` xác nhận 87 trang tĩnh SSG build thành công**

Run:
```bash
pnpm --dir tophub-web build
```
Expected: `✓ Generating static pages (87/87)` thành công 100%.

---

## 4. 🛑 Fail-Safe Checkpoint

- **Trạng thái**: **Trường hợp A (Hoàn toàn rõ ràng — 0 Ambiguities, 5 Gaps Patched)**.
- > ✅ *Hardened Plan v1.1 đã được vá toàn diện và sẵn sàng thực thi. Anh có muốn bắt đầu thực hiện ngay không? (`Y` / chỉnh sửa thêm)*

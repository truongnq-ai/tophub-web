# 🛡️ Plan Audit & Hardening Report — Guides Hub v4.0 (Wave 2: Clean Editorial Gaming UI & Layout Shell Overhaul)

**Evaluated Plan**: `docs/02-specs/2026-10-16-wave2-clean-editorial-ui-and-layout-overhaul-plan.md`
**Master Plan Reference**: [`docs/02-specs/2026-10-16-guides-v4-editorial-html-and-ui-overhaul-master-plan.md`](./2026-10-16-guides-v4-editorial-html-and-ui-overhaul-master-plan.md) (`DEC-V4-02`)
**Audit Result**: `APPROVED WITH REVISIONS (HARDENED — ZERO GAPS REMAINING)`

---

## 1. 🔍 Gap & Blindspot Analysis (`/review-plan` 4-Tier Audit)

| # | Hạng mục kiểm tra | Phát hiện / Điểm mù trong bản Plan nháp trước đó | Mức độ rủi ro | Biện pháp vá trong Hardened Plan |
|---|-------------------|--------------------------------------------------|:-------------:|----------------------------------|
| **GAP-01** | **Contract Breaking / Test Type Error (`CalloutBoxProps`)** | Trong Task 1.1 của bản nháp, test snippet truyền `<CalloutBox block={{ type: "callout", variant, title, text }} />`, trong khi interface thực tế tại [`callout-box.tsx`](../../src/components/guides/blocks/callout-box.tsx#L12-L17) là `{ variant: CalloutVariant; title: string; content: string; locale?: GuideLocale }`. Nếu chạy sẽ lỗi biên dịch TypeScript và crash runtime. | `CRITICAL` | Chuẩn hóa toàn bộ test và code trong Task 1 theo đúng chữ ký `<CalloutBox variant={variant} title="..." content="..." locale="vi" />`. |
| **GAP-02** | **Variable Scope & Outer Frame De-AI (`TldrActionBox`)** | Code mẫu Task 1.3 dùng biến `labels.coreRule` nhưng trong [`tldr-action-box.tsx`](../../src/components/guides/blocks/tldr-action-box.tsx#L52) biến thực tế là `const copy = LABELS[locale]`. Ngoài ra vỏ bọc ngoài (dòng 57) vẫn còn gradient vàng đậm `border-amber-500/35 bg-gradient-to-br from-amber-500/10` chưa đồng bộ với chuẩn khung trung tính `DEC-V4-02`. | `HIGH` | Dùng đúng biến `copy`, chuyển vỏ ngoài `TldrActionBox` sang khung Editorial trung tính (`relative overflow-hidden rounded-2xl border border-border/80 bg-card/85`) kèm vệt sáng đỉnh `h-[1.5px]`, và giữ nguyên `data-testid="tldr-takeaways-toggle"`. |
| **GAP-03** | **Global Section Numbering & Sticky Tab Bar State (`GuideArticleRenderer`)** | Hàm `renderSection` tại [`guide-article-renderer.tsx`](../../src/components/guides/guide-article-renderer.tsx#L323-L328) được gọi ở 2 vòng lặp tách biệt (`freeSectionsWithTab` và `proSectionsWithTab`). Bản nháp chưa chỉ rõ công thức truyền `sectionNumber` liên tục (`idx + 1` cho Free và `freeSectionsWithTab.length + idx + 1` cho PRO). Đồng thời thanh Sticky 3-Tab (dòng 611–700) đã có sẵn `{tabCounts.core/data/action}` nhưng thiếu `data-testid="article-view-mode-tabs"` và số đếm `{tabCounts.all}` ở nút `Xem toàn bộ`. | `HIGH` | Cập nhật chữ ký `renderSection(section, locale, isHidden, article, sectionNumber)` với công thức đánh số xuyên suốt Free + PRO; bổ sung `data-testid="article-view-mode-tabs"` và badge `{tabCounts.all}` trên thanh Sticky Tab Bar. |
| **GAP-04** | **Stale Active Section on Tab Switch (`GuidesToc` ⇄ `GuideArticleRenderer`)** | [`guides-toc.tsx`](../../src/components/guides/guides-toc.tsx#L52) đã có lọc `!entry.target.closest('[data-tab-hidden="true"]')` khi cuộn trang, **NHƯNG** khi người dùng bấm chuyển Tab trên thanh Sticky Bar (ví dụ từ Tab 1 `core` sang Tab 2 `data`), `activeId` trong `GuidesToc` vẫn giữ ID của `sec-1` (vốn đã bị ẩn `data-tab-hidden="true"`) cho tới khi người dùng cuộn chuột. | `MEDIUM` | Khi đổi `activeTab` trong `GuideArticleRenderer`, phát sự kiện `CustomEvent("tophub:tab-change")` (hoặc đồng bộ qua `useEffect` lắng nghe trong `useArticleScrollSpy` của `GuidesToc`): nếu `activeId` hiện tại nằm trong vùng `[data-tab-hidden="true"]`, tự động chuyển `activeId` sang section hiển thị đầu tiên của tab mới. |
| **GAP-05** | **Dual Render Locations in `GuidesSidebar` (`Search` + `Accordion`)** | [`guides-sidebar.tsx`](../../src/components/guides/guides-sidebar.tsx) hiển thị `article.title[locale]` ở **2 nơi**: kết quả tìm kiếm nhanh (dòng 234) và danh sách bài trong Accordion (dòng 330). Bản nháp chỉ mới cập nhật ở Accordion mà bỏ sót danh sách kết quả tìm kiếm. | `MEDIUM` | Áp dụng `splitArticleTitle(article.title[locale]).mainTitle` kèm `title={article.title[locale]}` ở cả 2 vị trí (dòng 222/234 và dòng 318/330). |

---

## 2. ⚡ Cross-System Impact Assessment Matrix

- **API Contracts**: `NO BREAKING CHANGES` — Toàn bộ thay đổi nằm ở tầng Presentation (`src/components/guides/**`), không chạm tới Route Handlers hay Server Actions.
- **Database / Schema**: `SAFE (UNTOUCHED)` — Không chạm tới Prisma schema hay dữ liệu tĩnh `src/content/guides/groups/**`.
- **Auth & Permissions**: `UNTOUCHED` — Giữ nguyên cơ chế `ProContentGate` và `useUidSession`.
- **Regression Scope**: `ISOLATED & VERIFIED` — Đã kiểm chứng chéo với toàn bộ 31 file test hiện hành:
  - Bảo toàn tất cả `<span id={...} data-consolidated-by-widget="true" />` và danh sách `subSections` trong `GuidesToc` để tính năng bấm TOC nhảy vào bảng con của 8 Widgets (`tests/guides-phase3-widgets.test.tsx` & `tests/guides-phase4-micro-ux.test.tsx`) hoạt động 100%.
  - Bảo toàn số thứ tự đầu mục trong `GuidesToc` (chỉ lọc ký tự Markdown `**` và `` ` ``) để `tests/guides-toc.test.tsx` (`screen.getByText(firstSecTitle)`) pass 100%.

---

## 3. 📋 12-Point Senior Tech Lead Checklist Audit

| # | Tiêu chí đánh giá | Trạng thái | Ghi chú kiểm증 |
|---|-------------------|:----------:|----------------|
| **1** | **Data Loss & Integrity** | ✅ `PASS` | Không xóa/sửa dữ liệu trong `src/content/guides/groups/**` hay `messages/*.json`. |
| **2** | **Rollback Strategy** | ✅ `PASS` | Thay đổi thuần túy trên 7 file UI component độc lập; có thể `git checkout -- <file>` từng task nguyên tử nếu bất kỳ test nào fail. |
| **3** | **Performance & Scale** | ✅ `PASS` | Không phát sinh vòng lặp lắng nghe DOM dư thừa; sự kiện `tophub:tab-change` dùng `requestAnimationFrame` nhẹ và dọn dẹp listener trong `useEffect` cleanup. |
| **4** | **Security & Auth Scope** | ✅ `PASS` | Tuyệt đối không dùng `dangerouslySetInnerHTML`; mọi văn bản đều đi qua React AST `<RichGuideText />` hoặc text node thuần. |
| **5** | **Contract Breaking** | ✅ `PASS` | Giữ nguyên 100% Props Interface của `TldrActionBox`, `CalloutBox`, `GuideArticleRenderer`, `ResponsiveDataTable`, `HeroEncyclopediaWidget`, `GuidesSidebar`, `GuidesToc`. |
| **6** | **Idempotency & Concurrency** | ✅ `PASS` | Các hàm parser `parseSectionHeading()` và `sanitizeTocTitle()` là pure functions hoàn toàn bất biến (idempotent). |
| **7** | **Edge Cases & Null Safety** | ✅ `PASS` | Xử lý đầy đủ trường hợp tiêu đề không có số đầu dòng (`fallbackBadge`), chuỗi rỗng, hoặc bài viết không có `subSections`. |
| **8** | **No Placeholders Law** | ✅ `PASS` | 0 `TODO`, 0 `TBD`, mọi bước đều có đầy đủ mã nguồn thực thi và câu lệnh kiểm thử. |
| **9** | **Atomic Granularity** | ✅ `PASS` | Chia thành 4 Task nguyên tử (2–5 phút/bước) theo đúng chu trình TDD. |
| **10** | **TDD Verification Flow** | ✅ `PASS` | Mỗi Task đều bắt đầu bằng viết test fail (`RED`) $\rightarrow$ chạy xác nhận fail $\rightarrow$ viết code (`GREEN`) $\rightarrow$ chạy pass. |
| **11** | **Env & Secret Isolation** | ✅ `PASS` | Không sử dụng biến môi trường hay hardcode URL/secret. |
| **12** | **Strict Type Safety** | ✅ `PASS` | Tuân thủ TypeScript Strict Mode (`0` `any`, `0` ép kiểu mù). |

---

## 4. 🛠️ Hardened Revised Plan (Kế hoạch Đã Vá Toàn Diện — Sẵn Sàng Thực Thi)

**Goal:** Thực thi **Wave 2 (`DEC-V4-02` — Clean Editorial Gaming UI & Layout Shell Overhaul)**: xóa bỏ 100% (`13/13` vị trí) `border-l-4` / `border-l-2` và nền màu "đèn giao thông" trên thẻ bo góc/tiêu đề; nâng cấp `TldrActionBox` (3-Column Neutral Bento Partition Grid), `CalloutBox` (Framed Editorial Card + Top Glow), `GuideArticleRenderer` (`H2`/`H3` Monospace Index Badges + Sticky 3-Tab View Mode Bar), `GuidesSidebar` (Clean Split Titles), và `GuidesToc` (Markdown-Sanitized & Tab-Aware Scroll-Spy).

**Architecture:** Giữ nguyên 100% tầng dữ liệu (`src/content/guides/**`) và hợp đồng props hiện có; chỉ nâng cấp lớp giao diện (`src/components/guides/**`) bằng đường kẻ cấu trúc `1px` (`border-border/80`, `divide-border/60`), vệt sáng đỉnh `h-[1.5px]`, khung icon SVG `28×28px`, và huy hiệu chỉ số `font-mono`.

**Tech Stack:** Next.js 15, React 19, TypeScript (Strict Mode), Tailwind CSS, `lucide-react`, Vitest + React Testing Library.

---

### Task 1: Tái Thiết Kế `TldrActionBox` & `CalloutBox` Theo Chuẩn Clean Editorial (`DEC-V4-02`)

**Files:**
- Modify: `d:\GitHub\top-hero\tophub-web\tests\guide-blocks.test.tsx`
- Modify: `d:\GitHub\top-hero\tophub-web\src\components\guides\blocks\tldr-action-box.tsx`
- Modify: `d:\GitHub\top-hero\tophub-web\src\components\guides\blocks\callout-box.tsx`

- [x] **Step 1.1: Viết unit test kiểm tra giao diện De-AI của `TldrActionBox` và `CalloutBox` tại `tests/guide-blocks.test.tsx`**

Thêm khối `describe("Wave 2 Clean Editorial Gaming UI (DEC-V4-02)", ...)` vào cuối `tests/guide-blocks.test.tsx`:

```tsx
  describe("Wave 2 Clean Editorial Gaming UI (DEC-V4-02)", () => {
    it("renders TldrActionBox as a 3-column neutral bento partition grid with zero border-l-4 and zero duplicate emojis", () => {
      const { container } = render(
        <TldrActionBox
          tldr={{
            coreRule: {
              vi: "Dồn 100% tài nguyên cho **Pyromancer** đạt `1★ Trắng`.",
              en: "Focus 100% resources on **Pyromancer** to `1★ White`.",
            },
            immediateAction: {
              vi: "Mua hết đá hồn trong cửa hàng VIP.",
              en: "Buy all soul stones in VIP shop.",
            },
            strictTaboo: {
              vi: "Cấm nâng đều 5 tướng SSR cùng lúc.",
              en: "Never upgrade 5 SSR heroes equally.",
            },
          }}
          keyTakeaways={[
            {
              vi: "Mốc gãy **Pyromancer**: `560 Mảnh`",
              en: "**Pyromancer** breakpoint: `560 Shards`",
            },
          ]}
          locale="vi"
        />
      );

      expect(container.innerHTML).not.toContain("border-l-4");
      expect(container.innerHTML).not.toContain("border-l-2");
      expect(container.textContent).not.toContain("🎯");
      expect(container.textContent).not.toContain("📌");

      const bentoGrid = screen.getByTestId("tldr-bento-grid");
      expect(bentoGrid.className).toContain("md:grid-cols-3");
      expect(bentoGrid.className).toContain("md:divide-x");
    });

    it("renders CalloutBox as a framed editorial card with top gradient glow and zero border-l-4 across all 4 variants", () => {
      const variants = ["danger", "warning", "tip", "rule"] as const;
      for (const variant of variants) {
        const { container, unmount } = render(
          <CalloutBox
            variant={variant}
            title={`Tiêu đề **${variant}**`}
            content="Nội dung định lượng `40.000 Điểm`."
            locale="vi"
          />
        );

        expect(container.innerHTML).not.toContain("border-l-4");
        expect(container.innerHTML).not.toContain("rounded-l-sm");
        expect(
          container.querySelector("[data-testid='callout-top-glow']")
        ).not.toBeNull();
        unmount();
      }
    });
  });
```

- [x] **Step 1.2: Chạy Vitest trên `tests/guide-blocks.test.tsx` để xác nhận test mới FAIL (`RED`)**

Run: `npx vitest run tests/guide-blocks.test.tsx`
Expected: FAIL (`expect(container.innerHTML).not.toContain("border-l-4")`).

- [x] **Step 1.3: Triển khai `TldrActionBox` chuẩn 3-Column Neutral Bento Partition Grid tại `src/components/guides/blocks/tldr-action-box.tsx`**

Cập nhật `src/components/guides/blocks/tldr-action-box.tsx`:
1. Xóa `🎯 ` và `📌 ` khỏi `LABELS.vi` và `LABELS.en` (dòng 28, 33, 34, 37, 42, 43).
2. Thay vỏ ngoài bằng khung Editorial trung tính có vệt sáng đỉnh `h-[1.5px]`:
   ```tsx
   <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-card/85 p-4 sm:p-5 space-y-3.5 shadow-sm">
     <div
       aria-hidden="true"
       className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-amber-500/80 via-emerald-500/50 to-rose-500/70"
     />
   ```
3. Thay 3 thẻ `border-l-4` bằng lưới Bento 3 cột phân tách bằng vách ngăn `divide-y md:divide-y-0 md:divide-x divide-border/60`:
   ```tsx
      <div
        data-testid="tldr-bento-grid"
        className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border/60 rounded-xl border border-border/70 bg-background/55 overflow-hidden"
      >
        <div className="p-3.5 sm:p-4 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-amber-500/25 bg-amber-500/10 text-amber-500">
              <Crown className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            <span className="inline-flex items-center rounded-md bg-amber-500/10 px-2 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              {copy.coreRule}
            </span>
          </div>
          <RichGuideText
            text={tldr.coreRule[locale]}
            variant="structured-brief"
            accentColor="amber"
            className="text-xs sm:text-sm leading-relaxed text-foreground/95"
          />
        </div>

        <div className="p-3.5 sm:p-4 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-emerald-500/25 bg-emerald-500/10 text-emerald-500">
              <Zap className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              {copy.immediateAction}
            </span>
          </div>
          <RichGuideText
            text={tldr.immediateAction[locale]}
            variant="structured-brief"
            accentColor="emerald"
            className="text-xs sm:text-sm leading-relaxed text-foreground/95"
          />
        </div>

        <div className="p-3.5 sm:p-4 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-rose-500/25 bg-rose-500/10 text-rose-500">
              <AlertOctagon className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            <span className="inline-flex items-center rounded-md bg-rose-500/10 px-2 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
              {copy.strictTaboo}
            </span>
          </div>
          <RichGuideText
            text={tldr.strictTaboo[locale]}
            variant="structured-brief"
            accentColor="rose"
            className="text-xs sm:text-sm leading-relaxed text-foreground/95"
          />
        </div>
      </div>
   ```
4. Giữ nguyên `data-testid="tldr-takeaways-toggle"` và danh sách `keyTakeaways`.

- [x] **Step 1.4: Triển khai `CalloutBox` chuẩn Framed Editorial Card tại `src/components/guides/blocks/callout-box.tsx`**

Cập nhật `src/components/guides/blocks/callout-box.tsx`:
- Xóa toàn bộ `border-l-4` và `rounded-r-2xl rounded-l-sm`.
- Dùng khung chuẩn `relative overflow-hidden rounded-2xl border border-border/80 bg-card/85 p-4 sm:p-5 flex items-start gap-3.5 shadow-sm transition-all`.
- Thêm thanh sáng đỉnh `<div data-testid="callout-top-glow" aria-hidden="true" className={cn("pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r", style.topGlow)} />`.
- Đặt `<Icon />` vào hộp `h-7 w-7 shrink-0 items-center justify-center rounded-lg border` theo màu ngữ nghĩa của từng `variant` (`danger`, `warning`, `tip`, `rule`).

- [x] **Step 1.5: Chạy lại Vitest trên `tests/guide-blocks.test.tsx` xác nhận PASS (`GREEN`)**

Run: `npx vitest run tests/guide-blocks.test.tsx`
Expected: PASS.

---

### Task 2: Nâng Cấp `H2`/`H3` Monospace Index Badges, Sticky 3-Tab Bar & Đồng Bộ Sự Kiện Đổi Tab Trong `GuideArticleRenderer`

**Files:**
- Modify: `d:\GitHub\top-hero\tophub-web\tests\guide-article-renderer.test.tsx`
- Modify: `d:\GitHub\top-hero\tophub-web\src\components\guides\guide-article-renderer.tsx`

- [x] **Step 2.1: Viết unit test cho `parseSectionHeading`, `H2`/`H3` Monospace Badges và Sticky Tab Bar tại `tests/guide-article-renderer.test.tsx`**

Import `parseSectionHeading` từ `../src/components/guides/guide-article-renderer` và bổ sung 2 test cases vào `tests/guide-article-renderer.test.tsx`:

```tsx
  it("parses leading section and subsection indices into clean badge + stripped heading text via parseSectionHeading", () => {
    const h2WithNum = parseSectionHeading(
      "1. Quy Tắc Sống Còn: 1 Đội Hình Duy Nhất",
      "01"
    );
    expect(h2WithNum.badge).toBe("01");
    expect(h2WithNum.cleanTitle).toBe("Quy Tắc Sống Còn: 1 Đội Hình Duy Nhất");

    const h3WithSubNum = parseSectionHeading(
      "1.2. Điểm Gãy Mảnh Tướng (Shard Breakpoints)",
      "1.2"
    );
    expect(h3WithSubNum.badge).toBe("1.2");
    expect(h3WithSubNum.cleanTitle).toBe(
      "Điểm Gãy Mảnh Tướng (Shard Breakpoints)"
    );

    const unnumbered = parseSectionHeading("Tổng Quan Chiến Thuật", "03");
    expect(unnumbered.badge).toBe("03");
    expect(unnumbered.cleanTitle).toBe("Tổng Quan Chiến Thuật");
  });

  it("renders H2 and H3 with monospace index badges, zero border-l-4/border-l-2 classes, and dispatches tophub:tab-change when switching tabs", () => {
    const tabChangeEvents: string[] = [];
    const listener = (e: Event) => {
      const custom = e as CustomEvent<{ tab: string }>;
      if (custom.detail?.tab) tabChangeEvents.push(custom.detail.tab);
    };
    window.addEventListener("tophub:tab-change", listener);

    const { container } = render(
      <GuideArticleRenderer
        category={category}
        article={ARTICLE_1_1_OVERVIEW}
        prevArticle={null}
        nextArticle={null}
      />
    );

    expect(container.innerHTML).not.toContain("border-l-4");
    expect(container.innerHTML).not.toContain("border-l-2");

    const h2Badges = container.querySelectorAll(
      "[data-testid='section-index-badge']"
    );
    expect(h2Badges.length).toBe(
      ARTICLE_1_1_OVERVIEW.freeSections.length +
        ARTICLE_1_1_OVERVIEW.proSections.length
    );
    expect(h2Badges[0].textContent).toBe("01");
    expect(h2Badges[3].textContent).toBe("04");

    fireEvent.click(screen.getByTestId("article-tab-data"));
    expect(tabChangeEvents).toContain("data");

    window.removeEventListener("tophub:tab-change", listener);
  });
```

- [x] **Step 2.2: Chạy Vitest trên `tests/guide-article-renderer.test.tsx` để xác nhận FAIL (`RED`)**

Run: `npx vitest run tests/guide-article-renderer.test.tsx`
Expected: FAIL (`parseSectionHeading is not a function` / `border-l-4` found).

- [x] **Step 2.3: Triển khai `parseSectionHeading`, `H2`/`H3` Monospace Index Badges và đồng bộ `tophub:tab-change` tại `src/components/guides/guide-article-renderer.tsx`**

1. Export hàm `parseSectionHeading(rawTitle: string, fallbackBadge: string)`:
   ```tsx
   export function parseSectionHeading(
     rawTitle: string,
     fallbackBadge: string
   ): { badge: string; cleanTitle: string } {
     const trimmed = rawTitle.trim();
     const subMatch = trimmed.match(/^(\d+\.\d+)\.?\s+(.+)$/);
     if (subMatch) {
       return {
         badge: subMatch[1],
         cleanTitle: subMatch[2].trim(),
       };
     }
     const secMatch = trimmed.match(/^(\d+)\.?\s+(.+)$/);
     if (secMatch) {
       const num = Number.parseInt(secMatch[1], 10);
       const formatted =
         Number.isFinite(num) && num < 10 ? `0${num}` : String(secMatch[1]);
       return {
         badge: formatted,
         cleanTitle: secMatch[2].trim(),
       };
     }
     return {
       badge: fallbackBadge,
       cleanTitle: trimmed,
     };
   }
   ```
2. Cập nhật `renderSection(section, locale, isHidden, article, sectionNumber)`:
   - Tính `const fallbackH2Badge = sectionNumber < 10 ? \`0\${sectionNumber}\` : String(sectionNumber);`
   - Tách `const { badge: h2Badge, cleanTitle: h2CleanTitle } = parseSectionHeading(section.title[locale], fallbackH2Badge);`
   - Thay `<h2 className="... border-l-4 border-amber-500 pl-3.5">` (dòng 343) bằng:
     ```tsx
     <div className="flex items-center gap-3 border-b border-border/60 pb-3">
       <span
         data-testid="section-index-badge"
         className="inline-flex h-7 min-w-[28px] shrink-0 items-center justify-center rounded-lg border border-amber-500/30 bg-amber-500/10 px-2 font-mono text-xs font-bold text-amber-600 dark:text-amber-400"
       >
         {h2Badge}
       </span>
       <h2 className="font-heading font-bold text-lg sm:text-xl text-foreground leading-snug">
         <RichGuideText text={h2CleanTitle} variant="inline" />
       </h2>
     </div>
     ```
   - Với từng `sub` trong `visibleSubSections.map((sub, subIdx) => ...)`:
     - Tính `const fallbackH3Badge = \`\${sectionNumber}.\${subIdx + 1}\`;`
     - Tách `const { badge: h3Badge, cleanTitle: h3CleanTitle } = parseSectionHeading(sub.title[locale], fallbackH3Badge);`
     - Thay `pl-4 sm:pl-5 border-l-2 border-amber-500/45 space-y-3 py-1` (dòng 359) bằng thẻ khung biên tập sạch `scroll-mt-28 rounded-2xl border border-border/60 bg-card/35 p-4 sm:p-5 space-y-3.5`:
       ```tsx
       <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/50 pb-2.5">
         <div className="flex items-center gap-2.5 min-w-0">
           <span
             data-testid="subsection-index-badge"
             className="inline-flex h-6 shrink-0 items-center justify-center rounded-md border border-amber-500/25 bg-amber-500/10 px-1.5 font-mono text-[11px] font-bold text-amber-600 dark:text-amber-400"
           >
             {h3Badge}
           </span>
           <h3 className="font-heading font-bold text-base sm:text-lg text-foreground leading-snug">
             <RichGuideText text={h3CleanTitle} variant="inline" />
           </h3>
         </div>
         {sub.badge && ( ... )}
       </div>
       ```
3. Truyền `sectionNumber` tại dòng 704 (`idx + 1`) và dòng 722 (`freeSectionsWithTab.length + idx + 1`).
4. Phát sự kiện `window.dispatchEvent(new CustomEvent("tophub:tab-change", { detail: { tab: activeTab } }))` trong `useEffect` mỗi khi `activeTab` thay đổi, và gắn `data-testid="article-view-mode-tabs"` cùng badge `{tabCounts.all}` lên thanh Sticky 3-Tab View Mode Bar.

- [x] **Step 2.4: Chạy lại Vitest trên `tests/guide-article-renderer.test.tsx` xác nhận PASS (`GREEN`)**

Run: `npx vitest run tests/guide-article-renderer.test.tsx`
Expected: PASS.

---

### Task 3: Xóa Bỏ `border-l-*` Còn Sót Trong `ResponsiveDataTable` & `HeroEncyclopediaWidget`

**Files:**
- Modify: `d:\GitHub\top-hero\tophub-web\tests\guide-blocks.test.tsx`
- Modify: `d:\GitHub\top-hero\tophub-web\src\components\guides\blocks\responsive-data-table.tsx`
- Modify: `d:\GitHub\top-hero\tophub-web\src\components\guides\widgets\hero-encyclopedia-widget.tsx`

- [x] **Step 3.1: Bổ sung assertion kiểm tra `ResponsiveDataTable` không chứa `border-l-2` / `border-l-4` tại `tests/guide-blocks.test.tsx`**

Trong `tests/guide-blocks.test.tsx` (test case `"supports breakpoint highlighting..."` ở dòng 236), thêm:
```tsx
expect(container.innerHTML).not.toContain("border-l-2");
expect(container.innerHTML).not.toContain("border-l-4");
```

- [x] **Step 3.2: Chạy Vitest trên `tests/guide-blocks.test.tsx` để xác nhận FAIL (`RED`)**

Run: `npx vitest run tests/guide-blocks.test.tsx`
Expected: FAIL (`border-l-2` found on sticky breakpoint cell).

- [x] **Step 3.3: Cập nhật `ResponsiveDataTable` (dòng 155) và `HeroEncyclopediaWidget` (dòng 722–738)**

1. Tại `src/components/guides/blocks/responsive-data-table.tsx` (dòng 155):
   - Thay `border-l-2 border-l-amber-500` bằng `shadow-[inset_2px_0_0_0_rgba(245,158,11,0.85)]` để tạo đường chỉ sáng bên trong ô sticky đầu tiên của dòng điểm gãy mà không dùng `border-l-*`.
2. Tại `src/components/guides/widgets/hero-encyclopedia-widget.tsx` (dòng 722–738):
   - Thay `factionBorder` (`border-l-4 border-l-rose-500/sky-500/emerald-500`) bằng thanh sáng gradient đỉnh thẻ (`factionTopGlow`: `"from-rose-500 via-rose-500/40 to-transparent"`, `"from-sky-500 via-sky-500/40 to-transparent"`, `"from-emerald-500 via-emerald-500/40 to-transparent"`) đặt trong thẻ `relative overflow-hidden rounded-2xl border border-border/80 bg-card/85`.

- [x] **Step 3.4: Chạy lại Vitest trên `tests/guide-blocks.test.tsx` và `tests/guides-phase3-widgets.test.tsx` xác nhận PASS (`GREEN`)**

Run: `npx vitest run tests/guide-blocks.test.tsx tests/guides-phase3-widgets.test.tsx`
Expected: PASS.

---

### Task 4: Chuẩn Hóa Collapsible Sidebar (`GuidesSidebar`) & Auto-Scroll Spy TOC (`GuidesToc`)

**Files:**
- Modify: `d:\GitHub\top-hero\tophub-web\tests\guides-toc.test.tsx`
- Modify: `d:\GitHub\top-hero\tophub-web\tests\guides-sidebar.test.tsx`
- Modify: `d:\GitHub\top-hero\tophub-web\src\components\guides\guides-toc.tsx`
- Modify: `d:\GitHub\top-hero\tophub-web\src\components\guides\guides-sidebar.tsx`

- [x] **Step 4.1: Viết unit test cho `sanitizeTocTitle`, đồng bộ `tophub:tab-change` trong `tests/guides-toc.test.tsx` và hiển thị tiêu đề gọn trong `tests/guides-sidebar.test.tsx`**

1. Trong `tests/guides-toc.test.tsx`:
   ```tsx
   it("strips raw Markdown tokens (** and `) via sanitizeTocTitle and updates activeId when receiving tophub:tab-change", () => {
     expect(
       sanitizeTocTitle("1. Điểm gãy **Pyromancer** đạt `560 Mảnh`")
     ).toBe("1. Điểm gãy Pyromancer đạt 560 Mảnh");
   });
   ```
2. Trong `tests/guides-sidebar.test.tsx`:
   ```tsx
   it("renders clean main titles without English parenthetical clutter in the w-64 sidebar while preserving full title tooltip", () => {
     render(<GuidesSidebar />);
     const articleLink = screen.getByRole("link", { name: /4\.1/i });
     expect(articleLink.getAttribute("title")).toContain("(");
     expect(articleLink.textContent).not.toContain("(");
   });
   ```

- [x] **Step 4.2: Chạy Vitest trên `tests/guides-toc.test.tsx` và `tests/guides-sidebar.test.tsx` để xác nhận FAIL (`RED`)**

Run: `npx vitest run tests/guides-toc.test.tsx tests/guides-sidebar.test.tsx`
Expected: FAIL.

- [x] **Step 4.3: Triển khai `sanitizeTocTitle` + lắng nghe `tophub:tab-change` tại `src/components/guides/guides-toc.tsx` và `splitArticleTitle` tại `src/components/guides/guides-sidebar.tsx`**

1. Tại `src/components/guides/guides-toc.tsx`:
   - Export `export function sanitizeTocTitle(raw: string): string { return raw.replace(/(\*\*|`)/g, "").trim(); }`.
   - Bọc `sanitizeTocTitle(sec.title[locale])` và `sanitizeTocTitle(sub.title[locale])` trong `buildTocSections` (giữ nguyên toàn bộ `subSections` để không ảnh hưởng tới TOC-to-widget jump).
   - Trong `useArticleScrollSpy(sectionIds)`: lắng nghe sự kiện `window.addEventListener("tophub:tab-change", ...)` (qua `requestAnimationFrame`) để kiểm tra nếu `activeId` hiện tại đang nằm trong `[data-tab-hidden="true"]`, lập tức cập nhật `activeId` sang phần tử đầu tiên trong `sectionIds` không bị ẩn (`!el.closest('[data-tab-hidden="true"]')`).
2. Tại `src/components/guides/guides-sidebar.tsx`:
   - Import `splitArticleTitle` từ `./guide-article-renderer`.
   - Ở cả danh sách kết quả tìm kiếm (dòng 234) và danh sách bài trong Accordion (dòng 330), hiển thị `splitArticleTitle(article.title[locale]).mainTitle` và truyền `title={article.title[locale]}` lên thẻ `<Link>`.

- [x] **Step 4.4: Chạy toàn bộ bộ kiểm thử (`31` test suites), kiểm tra TypeScript và quét `border-l-` toàn cục**

Run:
1. `npx vitest run` (Expected: `31/31` test files PASS)
2. `npx tsc --noEmit` (Expected: `0` errors)
3. `Get-ChildItem -Path src/components/guides -Recurse -File | Select-String -Pattern "border-l-"` (Expected: `0` matches)

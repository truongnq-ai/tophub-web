# Wave 1 Hardening Implementation Plan (Guides Hub v4.0)

> **For Agentic Workers:** REQUIRED SUB-SKILL: Use `common/executing-plans` or `common/tdd` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Resolve the 3 `[MAJOR]` and 1 `[NIT-01]` audit findings from the Wave 1 Code Review so that `<RichGuideText />` sentence splitting, W3C HTML5 interactive checklist semantics, Markdown-agnostic table search, and all dynamic `GuideArticle`-extracting widgets are 100% hardened before Waves 2–5.

**Architecture:**
1. **Sentence Boundary Precision (`rich-guide-text.tsx`):** Refine `ABBREVIATION_END_REGEX` from `/(?:^|[\s(])(?:Lv|vs|Mr|Mrs|Dr|St|No|Fig|Bài|Mục|Tab|S\d|T\d|\d+)$/i` to `/^(?:\d+)|(?:^|[\s(])(?:Lv|vs|Mr|Mrs|Dr|St|No|Fig|Bài|Mục|Tab)$/i`. Because `splitStructuredSentences()` already guards decimal numbers (`5.1`, `1.000`, `Lv.40`) via `/\s/.test(trimmed[i + 1])`, removing `S\d|T\d|\d+` at the end of a sentence allows sentences ending with numbers, troop tiers, or seasons (e.g., `"...Đội hình 1. Đúc..."`, `"...vào S1. Tuyệt đối..."`, `"...lính T10. Sau đó..."`) to split cleanly in `structured-brief` mode while still protecting standalone leading step numbers (`"1. Bước một"`).
2. **W3C HTML5 Interactive Checklist Semantics (`interactive-checklist-block.tsx`):** Replace `<button type="button" role="checkbox">` with `<div role="checkbox" tabIndex={0}>` and an explicit `onKeyDown` handler (`Enter` and `" "` Space keys) so that block-level children rendered by `<RichGuideText />` (`<div>`, `<p>`, `<ul>`) satisfy W3C HTML5 phrasing-content rules without breaking keyboard navigation or `getByRole("checkbox")` in tests.
3. **Markdown-Agnostic Search Filtering (`responsive-data-table.tsx` & Widgets):** Strip Markdown emphasis/code delimiters (`/[*`]/g`) from search haystacks before `.toLowerCase().includes(...)` so searching plain phrases (e.g., `"thiếu rose"`) matches formatted strings (`"Thiếu \`Rose Princess\`"`).
4. **Widget `<RichGuideText />` Integration (`src/components/guides/widgets/`):** Wire `<RichGuideText />` into all dynamic article-extracted text fields across the 7 interactive widgets (`account-traps-triage-widget.tsx`, `horde-pivot-stepper-widget.tsx`, `blacksmith-anvil-matrix-widget.tsx`, `master-data-explorer-widget.tsx`, `shop-safety-floor-widget.tsx`, `biweekly-calendar-widget.tsx`, `hero-encyclopedia-widget.tsx`) so Waves 3–5 content enrichment (`**bold**`, `` `code` ``, `\n•`) renders as rich semantic HTML inside interactive widgets.

**Tech Stack:** Next.js 16, React 19, TypeScript 5, Tailwind CSS v4, Vitest + React Testing Library.

---

## Technical Impact Analysis Summary

| Dimension | Assessment |
| :--- | :--- |
| **Breaking Changes** | **None.** All component prop interfaces (`RichGuideTextProps`, `InteractiveChecklistBlock`, `ResponsiveDataTable`, and all 7 widget props) remain 100% backward-compatible. |
| **Accessibility (W3C / ARIA)** | **Improved.** Converting `<button role="checkbox">` to `<div role="checkbox" tabIndex={0}>` with `Enter`/`Space` keyboard handlers eliminates invalid `<button><div><p>...</p></div></button>` DOM nesting while preserving full keyboard & screen-reader parity. |
| **Performance** | **Negligible overhead.** Stripping `/[*`]/g` in `useMemo` search filters and rendering `<RichGuideText />` on active/visible widget cards adds `< 1ms` per render. |
| **Data & Migration** | **None.** Purely presentational and parser-level improvements in `src/components/guides/`. |

---

## File Structure & Modification Map

- **Modify:**
  - `src/components/guides/blocks/rich-guide-text.tsx` *(Fix `ABBREVIATION_END_REGEX` at lines 69–70)*
  - `src/components/guides/blocks/interactive-checklist-block.tsx` *(Convert `<button role="checkbox">` to `<div role="checkbox" tabIndex={0}>` with `onKeyDown` at lines 159–215)*
  - `src/components/guides/blocks/responsive-data-table.tsx` *(Strip `[*`]` in `filteredRows` search filter at lines 56–61)*
  - `src/components/guides/widgets/account-traps-triage-widget.tsx` *(Render extracted trap fields with `<RichGuideText />` and strip `[*`]` in search haystack)*
  - `src/components/guides/widgets/horde-pivot-stepper-widget.tsx` *(Render extracted stage fields with `<RichGuideText />`)*
  - `src/components/guides/widgets/blacksmith-anvil-matrix-widget.tsx` *(Render extracted table cell fields with `<RichGuideText />` and strip `[*`]` in search haystack)*
  - `src/components/guides/widgets/master-data-explorer-widget.tsx` *(Render `table.introParagraphs` with `<RichGuideText />` and strip `[*`]` in cross-table search)*
  - `src/components/guides/widgets/shop-safety-floor-widget.tsx` *(Render `supremeTarget` and shop matrix cells with `<RichGuideText />`)*
  - `src/components/guides/widgets/biweekly-calendar-widget.tsx` *(Render `scoringDetail`, `tabooWarning`, and item matrix fields with `<RichGuideText />` and strip `[*`]` in search haystack)*
  - `src/components/guides/widgets/hero-encyclopedia-widget.tsx` *(Render `assessment` and `proMvs` fields with `<RichGuideText />`)*
- **Test:**
  - `tests/rich-guide-text.test.tsx` *(Add regression tests for sentences ending with numbers, `S1.`, and `T10.` in `structured-brief` mode)*
  - `tests/guide-article-renderer.test.tsx` *(Add unit tests for `<div role="checkbox">` keyboard `Space`/`Enter` toggling, no `<button>` nesting block elements, and Markdown-agnostic table search)*

---

## Task-by-Task Implementation Steps

### Task 1: Fix `ABBREVIATION_END_REGEX` in `<RichGuideText />` (`[MAJOR-01]`)

**Files:**
- Modify: `src/components/guides/blocks/rich-guide-text.tsx`
- Test: `tests/rich-guide-text.test.tsx`

- [ ] **Step 1: Write the failing test in `tests/rich-guide-text.test.tsx`**

Add a test inside `describe("variant='structured-brief' (Layered Restructuring Mode)", ...)` in `tests/rich-guide-text.test.tsx` verifying that a dense paragraph (> 180 chars) where the first sentence ends with a number (`Đội hình 1.`), season (`S1.`), or troop tier (`T10.`) splits cleanly into a Lead Headline + micro-bullet list while still preserving inline decimals (`Lv.40`, `1.000`):

```tsx
    it("splits sentences ending with numbers, S1, or T10 while preserving Lv.40 and 1.000", () => {
      const denseWithTrailingNumber =
        "Dồn toàn bộ tài nguyên nâng cấp vào Đội hình 1. Tuyệt đối không chia đều mảnh vàng cho tướng phụ ở S1. Sau khi đạt lính T10. Bạn mới bắt đầu mở rộng sang đội hình thứ hai ở mốc Lv.40 với 1.000 Đá.";

      const { container } = render(
        <RichGuideText text={denseWithTrailingNumber} variant="structured-brief" />
      );

      const listItems = container.querySelectorAll("ul > li");
      expect(listItems.length).toBe(3);
      expect(screen.getByText(/Dồn toàn bộ tài nguyên nâng cấp vào Đội hình 1\./)).toBeInTheDocument();
      expect(screen.getByText(/Tuyệt đối không chia đều mảnh vàng cho tướng phụ ở S1\./)).toBeInTheDocument();
      expect(screen.getByText(/Lv\.40 với 1\.000 Đá\./)).toBeInTheDocument();
    });
```

- [ ] **Step 2: Run Vitest to verify the test fails**

Run: `npx vitest run tests/rich-guide-text.test.tsx`
Expected: FAIL (`listItems.length` is `0` because `1.`, `S1.`, and `T10.` were treated as abbreviations).

- [ ] **Step 3: Update `ABBREVIATION_END_REGEX` in `src/components/guides/blocks/rich-guide-text.tsx`**

In `src/components/guides/blocks/rich-guide-text.tsx` (lines 69–70), replace:

```tsx
const ABBREVIATION_END_REGEX =
  /(?:^|[\s(])(?:Lv|vs|Mr|Mrs|Dr|St|No|Fig|Bài|Mục|Tab|S\d|T\d|\d+)$/i;
```

with:

```tsx
const ABBREVIATION_END_REGEX =
  /^(?:\d+)|(?:^|[\s(])(?:Lv|vs|Mr|Mrs|Dr|St|No|Fig|Bài|Mục|Tab)$/i;
```

- [ ] **Step 4: Re-run `tests/rich-guide-text.test.tsx` to verify green**

Run: `npx vitest run tests/rich-guide-text.test.tsx`
Expected: PASS (all tests in `tests/rich-guide-text.test.tsx` pass).

---

### Task 2: Standardize W3C HTML5 `<div role="checkbox">` in `InteractiveChecklistBlock` & Strip `[*`]` in `ResponsiveDataTable` (`[MAJOR-03]` & `[NIT-01]`)

**Files:**
- Modify: `src/components/guides/blocks/interactive-checklist-block.tsx`
- Modify: `src/components/guides/blocks/responsive-data-table.tsx`
- Test: `tests/guide-article-renderer.test.tsx`

- [ ] **Step 1: Write the failing tests in `tests/guide-article-renderer.test.tsx`**

Add tests in `tests/guide-article-renderer.test.tsx` verifying:
1. `InteractiveChecklistBlock` renders checkbox items using a W3C-valid `<div role="checkbox" tabIndex={0}>` (not `<button>`) and toggles state via keyboard `Space` and `Enter` keys.
2. `ResponsiveDataTable` search matches cells containing Markdown backticks/asterisks when searching plain text without backticks/asterisks (e.g., searching `"thiếu rose"` matches `"Thiếu \`Rose Princess\`"` in `2.2-meta-lineups`).

```tsx
  it("renders InteractiveChecklistBlock items as W3C-valid div[role='checkbox'] with Space/Enter keyboard support", () => {
    render(<GuideArticleRenderer article={metaLineupsArticle} locale="vi" />);

    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes.length).toBeGreaterThan(0);

    const firstCheckbox = checkboxes[0];
    expect(firstCheckbox.tagName).toBe("DIV");
    expect(firstCheckbox).toHaveAttribute("tabindex", "0");
    expect(firstCheckbox).toHaveAttribute("aria-checked", "false");

    fireEvent.keyDown(firstCheckbox, { key: " " });
    expect(firstCheckbox).toHaveAttribute("aria-checked", "true");

    fireEvent.keyDown(firstCheckbox, { key: "Enter" });
    expect(firstCheckbox).toHaveAttribute("aria-checked", "false");
  });

  it("strips Markdown backticks and asterisks when filtering ResponsiveDataTable rows", () => {
    render(<GuideArticleRenderer article={metaLineupsArticle} locale="vi" />);

    const searchInputs = screen.getAllByPlaceholderText("Lọc dữ liệu trong bảng...");
    expect(searchInputs.length).toBeGreaterThan(0);

    // Table in 2.2-meta-lineups has cell: "Thiếu `Rose Princess`"
    const replacementTableInput = searchInputs[searchInputs.length - 1];
    fireEvent.change(replacementTableInput, { target: { value: "thiếu rose princess" } });

    expect(screen.queryByText("Không tìm thấy dữ liệu phù hợp.")).not.toBeInTheDocument();
  });
```

- [ ] **Step 2: Run `tests/guide-article-renderer.test.tsx` to verify failure**

Run: `npx vitest run tests/guide-article-renderer.test.tsx`
Expected: FAIL (`firstCheckbox.tagName` is `"BUTTON"`, and `"thiếu rose princess"` fails to match `"Thiếu \`Rose Princess\`"`).

- [ ] **Step 3: Update `src/components/guides/blocks/interactive-checklist-block.tsx` and `src/components/guides/blocks/responsive-data-table.tsx`**

1. In `src/components/guides/blocks/interactive-checklist-block.tsx` (lines 159–215), replace `<button type="button" role="checkbox" ...>...</button>` with `<div role="checkbox" tabIndex={0} ...>...</div>`:

```tsx
              <div
                role="checkbox"
                tabIndex={0}
                aria-checked={isChecked}
                onClick={() => toggleItem(item.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleItem(item.id);
                  }
                }}
                className={cn(
                  "group flex w-full cursor-pointer items-start gap-3.5 rounded-xl border p-3.5 text-left transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50",
                  isChecked
                    ? "border-emerald-500/30 bg-emerald-500/[0.04] dark:bg-emerald-950/15"
                    : "border-border/70 bg-card hover:border-amber-500/35 hover:bg-muted/30"
                )}
              >
```
*(and close with `</div>` instead of `</button>` at line 215).*

2. In `src/components/guides/blocks/responsive-data-table.tsx` (lines 56–61), strip `[*`]` before matching:

```tsx
  const filteredRows = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    if (!normalizedQuery) return rows;
    return rows.filter((row) =>
      row.some((cell) =>
        cell.replace(/[*`]/g, "").toLowerCase().includes(normalizedQuery)
      )
    );
  }, [rows, searchQuery]);
```

- [ ] **Step 4: Re-run `tests/guide-article-renderer.test.tsx` to verify green**

Run: `npx vitest run tests/guide-article-renderer.test.tsx`
Expected: PASS.

---

### Task 3: Integrate `<RichGuideText />` into Interactive Widgets (`[MAJOR-02]`)

**Files:**
- Modify: `src/components/guides/widgets/account-traps-triage-widget.tsx`
- Modify: `src/components/guides/widgets/horde-pivot-stepper-widget.tsx`
- Modify: `src/components/guides/widgets/blacksmith-anvil-matrix-widget.tsx`
- Modify: `src/components/guides/widgets/master-data-explorer-widget.tsx`
- Modify: `src/components/guides/widgets/shop-safety-floor-widget.tsx`
- Modify: `src/components/guides/widgets/biweekly-calendar-widget.tsx`
- Modify: `src/components/guides/widgets/hero-encyclopedia-widget.tsx`

- [ ] **Step 1: Update `account-traps-triage-widget.tsx`**
  1. Import `RichGuideText` from `@/components/guides/blocks/rich-guide-text`.
  2. Strip `[*`]` in `filteredTraps` search haystack (line 336):
     ```tsx
     const haystack =
       `${trap.number} ${trap.title} ${trap.symptoms.join(" ")} ${trap.whyItRuins} ${trap.stopLossAction}`
         .replace(/[*`]/g, "")
         .toLowerCase();
     ```
  3. Wrap `trap.title` (`<RichGuideText text={trap.title} variant="inline" />`), each `symp` (`<RichGuideText text={symp} />`), `trap.whyItRuins` (`<RichGuideText text={trap.whyItRuins} accentColor="rose" />`), `trap.metaRuleContent` (`<RichGuideText text={trap.metaRuleContent} accentColor="amber" />`), `trap.stopLossAction` (`<RichGuideText text={trap.stopLossAction} accentColor="emerald" />`), `trap.recoveryTime` (`<RichGuideText text={trap.recoveryTime} variant="inline" />`), and `trap.rerollThreshold` (`<RichGuideText text={trap.rerollThreshold} variant="inline" accentColor="rose" />`).

- [ ] **Step 2: Update `horde-pivot-stepper-widget.tsx`**
  1. Import `RichGuideText` from `@/components/guides/blocks/rich-guide-text`.
  2. Wrap `currentStage.stageAndMilestone` (`variant="inline"`), `currentStage.queue1Lineup` (`variant="inline"`), `currentStage.leagueRosterRole`, `currentStage.shardAndBookRule` (`accentColor="amber"`), and `currentStage.gearAndBuildingRule` (`accentColor="emerald"`).

- [ ] **Step 3: Update `blacksmith-anvil-matrix-widget.tsx`**
  1. Import `RichGuideText` from `@/components/guides/blocks/rich-guide-text`.
  2. Strip `[*`]` in `filteredRows` haystack (line 230):
     ```tsx
     const haystack =
       `${row.heroAndFaction} ${row.primaryBisSet} ${row.altSet} ${row.rationale}`
         .replace(/[*`]/g, "")
         .toLowerCase();
     ```
  3. Wrap `row.heroAndFaction` (`variant="inline"`), `row.primaryBisSet` (`variant="inline"`), `row.altSet` (`variant="inline"`), and `row.rationale` (`<RichGuideText text={row.rationale} />`) in both Desktop table and Mobile card views.

- [ ] **Step 4: Update `master-data-explorer-widget.tsx`**
  1. Import `RichGuideText` from `@/components/guides/blocks/rich-guide-text`.
  2. Strip `[*`]` in `crossTableSearchResults` row matching (line 395):
     ```tsx
     cell.replace(/[*`]/g, "").toLowerCase().includes(normalizedSearch)
     ```
  3. Wrap `table.introParagraphs` in both cross-table search view (line 590) and active-tab view (line 664) with `<RichGuideText text={p} />`.

- [ ] **Step 5: Update `shop-safety-floor-widget.tsx`**
  1. Import `RichGuideText` from `@/components/guides/blocks/rich-guide-text`.
  2. Wrap `activeShop.supremeTarget` (`<RichGuideText text={activeShop.supremeTarget} accentColor="amber" />`), `item.itemName` (`variant="inline"`), `item.costAndCap` (`variant="inline"`), `item.diamondValue` (`variant="inline"`), and `item.roiDirective` (`<RichGuideText text={item.roiDirective} />`).

- [ ] **Step 6: Update `biweekly-calendar-widget.tsx`**
  1. Import `RichGuideText` from `@/components/guides/blocks/rich-guide-text`.
  2. Strip `[*`]` in `filteredItemRows` haystack (line 569):
     ```tsx
     const haystack =
       `${row.itemName} ${row.tripleDip300} ${row.doubleDip200} ${row.singleDip100} ${row.forbidden0}`
         .replace(/[*`]/g, "")
         .toLowerCase();
     ```
  3. Wrap `activeDayEntry.scoringDetail`, `activeDayEntry.tabooWarning` (`accentColor="rose"`), `item.itemName` (`variant="inline"`), `item.tripleDip300` (`accentColor="emerald"`), `item.doubleDip200` (`accentColor="sky"`), `item.singleDip100` (`accentColor="amber"`), and `item.forbidden0` (`accentColor="rose"`) with `<RichGuideText />`.

- [ ] **Step 7: Update `hero-encyclopedia-widget.tsx`**
  1. Import `RichGuideText` from `@/components/guides/blocks/rich-guide-text`.
  2. Strip `[*`]` in `filteredHeroes` haystack (line 368).
  3. Wrap `hero.assessment` (`<RichGuideText text={hero.assessment} />`), `hero.proMvs.source` (`variant="inline"`), `hero.proMvs.mvsMilestone` (`variant="inline"`), `hero.proMvs.sweetSpot` (`variant="inline"`), and `hero.proMvs.gearAndAwakening` (`variant="inline"`) with `<RichGuideText />`.

- [ ] **Step 8: Run full TypeScript compiler and Vitest test suite**

Run:
1. `npx tsc --noEmit`
2. `npx vitest run`
Expected: `0` TypeScript errors and `100%` of test files passing.

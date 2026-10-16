import React from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import viMessages from "../messages/vi.json";
import enMessages from "../messages/en.json";
import { ARTICLE_2_1_ENCYCLOPEDIA } from "../src/content/guides/groups/group-2/2.1-encyclopedia";
import { ARTICLE_3_1_BIWEEKLY_ROTATION } from "../src/content/guides/groups/group-3/3.1-biweekly-rotation";
import { ARTICLE_3_4_DOUBLE_DIP_SCHEDULE } from "../src/content/guides/groups/group-3/3.4-double-dip-schedule";
import { ARTICLE_8_4_MASTER_DATA_TABLES } from "../src/content/guides/groups/group-8/8.4-master-data-tables";
import { HeroEncyclopediaWidget } from "../src/components/guides/widgets/hero-encyclopedia-widget";
import { BiweeklyCalendarWidget } from "../src/components/guides/widgets/biweekly-calendar-widget";
import { MasterDataExplorerWidget } from "../src/components/guides/widgets/master-data-explorer-widget";
import { GuideArticleRenderer } from "../src/components/guides/guide-article-renderer";

vi.mock("next-intl", () => ({
  useLocale: () => "vi",
  useTranslations: () => (key: string, params?: Record<string, unknown>) => {
    if (key === "readingTime" && params) return `${params.minutes} phút đọc`;
    if (key === "sectionCountLabel" && params) return `${params.count} mục lớn`;
    const guidesMap = viMessages.Guides as Record<string, string>;
    return guidesMap[key] ?? key;
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

describe("Phase 3 — Interactive Widgets & GuideArticleRenderer Integration", () => {
  describe("Task 1: i18n Keys & Content SSoT Widget Embedding", () => {
    it("includes Phase 3 widget translation keys in both vi.json and en.json", () => {
      const viGuides = viMessages.Guides as Record<string, unknown>;
      const enGuides = enMessages.Guides as Record<string, unknown>;

      const requiredKeys = [
        "widgetHeroTitle",
        "widgetHeroSubtitle",
        "widgetCalendarTitle",
        "widgetCalendarSubtitle",
        "widgetMasterTablesTitle",
        "widgetMasterTablesSubtitle",
      ];

      for (const key of requiredKeys) {
        expect(typeof viGuides[key]).toBe("string");
        expect((viGuides[key] as string).length).toBeGreaterThan(5);
        expect(typeof enGuides[key]).toBe("string");
        expect((enGuides[key] as string).length).toBeGreaterThan(5);
      }
    });

    it("embeds GuideWidgetBlock in target articles 2.1, 3.1, 3.4, and 8.4 while preserving all SSoT tables", () => {
      const a21Sec2 = ARTICLE_2_1_ENCYCLOPEDIA.freeSections.find(
        (s) => s.id === "sec-2-master-hero-directory"
      );
      expect(
        a21Sec2?.blocks.some(
          (b) => b.type === "widget" && b.widgetType === "hero_encyclopedia"
        )
      ).toBe(true);

      const a31Sec1 = ARTICLE_3_1_BIWEEKLY_ROTATION.freeSections.find(
        (s) => s.id === "sec-1-two-phase-server-evolution"
      );
      expect(
        a31Sec1?.blocks.some(
          (b) =>
            b.type === "widget" && b.widgetType === "biweekly_event_calendar"
        )
      ).toBe(true);

      const a34Sec2 = ARTICLE_3_4_DOUBLE_DIP_SCHEDULE.freeSections.find(
        (s) => s.id === "sec-2-spend-now-vs-hoard-boundary"
      );
      expect(
        a34Sec2?.blocks.some(
          (b) =>
            b.type === "widget" && b.widgetType === "biweekly_event_calendar"
        )
      ).toBe(true);

      const a84Sec1 = ARTICLE_8_4_MASTER_DATA_TABLES.freeSections.find(
        (s) => s.id === "sec-1-four-survival-summary-tables"
      );
      expect(
        a84Sec1?.blocks.some(
          (b) => b.type === "widget" && b.widgetType === "master_data_tables"
        )
      ).toBe(true);
    });
  });

  describe("Suite 1: HeroEncyclopediaWidget (51 SSoT Heroes)", () => {
    it("extracts and displays all 51 heroes by default and filters instantaneously by Faction, Rarity, Role, and Search", () => {
      render(
        <HeroEncyclopediaWidget
          article={ARTICLE_2_1_ENCYCLOPEDIA}
          locale="vi"
        />
      );

      expect(screen.getByTestId("widget-hero-encyclopedia")).toBeDefined();
      expect(screen.getByTestId("hero-results-count").textContent).toContain(
        "51 / 51"
      );

      // Filter by Horde (19 heroes)
      fireEvent.click(screen.getByTestId("hero-filter-faction-horde"));
      expect(screen.getByTestId("hero-results-count").textContent).toContain(
        "19 / 51"
      );

      // Filter by League (16 heroes)
      fireEvent.click(screen.getByTestId("hero-filter-faction-league"));
      expect(screen.getByTestId("hero-results-count").textContent).toContain(
        "16 / 51"
      );

      // Filter by Nature (16 heroes)
      fireEvent.click(screen.getByTestId("hero-filter-faction-nature"));
      expect(screen.getByTestId("hero-results-count").textContent).toContain(
        "16 / 51"
      );

      // Reset Faction to All, then filter by Economy Passive (18 heroes)
      fireEvent.click(screen.getByTestId("hero-filter-faction-all"));
      fireEvent.click(screen.getByTestId("hero-filter-role-economy"));
      expect(screen.getByTestId("hero-results-count").textContent).toContain(
        "18 / 51"
      );

      // Reset all filters and search for "Ngộ Không"
      fireEvent.click(screen.getByTestId("hero-reset-filters"));
      expect(screen.getByTestId("hero-results-count").textContent).toContain(
        "51 / 51"
      );

      const searchInput = screen.getByTestId("hero-search-input");
      fireEvent.change(searchInput, { target: { value: "Ngộ Không" } });
      expect(screen.getByTestId("hero-results-count").textContent).toContain(
        "1 / 51"
      );
      expect(screen.getByText(/Wukong/i)).toBeDefined();
    });

    it("syncs active Faction/Role filter when receiving tophub:toc-navigate event (GAP-P3-09 & GAP-P3-10)", () => {
      render(
        <HeroEncyclopediaWidget
          article={ARTICLE_2_1_ENCYCLOPEDIA}
          locale="vi"
        />
      );

      act(() => {
        window.dispatchEvent(
          new CustomEvent("tophub:toc-navigate", {
            detail: { targetId: "sub-2-2-horde-heroes" },
          })
        );
      });

      expect(screen.getByTestId("hero-results-count").textContent).toContain(
        "19 / 51"
      );

      act(() => {
        window.dispatchEvent(
          new CustomEvent("tophub:toc-navigate", {
            detail: { id: "sub-2-4-economy-heroes-summary" },
          })
        );
      });

      expect(screen.getByTestId("hero-results-count").textContent).toContain(
        "18 / 51"
      );
    });
  });

  describe("Suite 2: BiweeklyCalendarWidget (Phase 1/2 Cycle & 300% Double-Dip)", () => {
    it("switches cleanly between Phase 1, Week A, Week B, and Double-Dip 300% modes and selects weekdays 1..7", () => {
      render(
        <BiweeklyCalendarWidget
          article={ARTICLE_3_1_BIWEEKLY_ROTATION}
          locale="vi"
        />
      );

      expect(screen.getByTestId("widget-biweekly-calendar")).toBeDefined();

      // Switch to Day 5 (Friday — Total Training / Troop Day)
      fireEvent.click(screen.getByTestId("calendar-day-pill-5"));
      expect(
        screen.getByTestId("calendar-active-day-panel").textContent
      ).toMatch(/Thánh Vật|Relic|0 điểm|0 pt/i);

      // Switch to Phase 1 (New Server)
      fireEvent.click(screen.getByTestId("calendar-phase-phase1"));
      expect(screen.getByTestId("widget-biweekly-calendar").textContent).toMatch(
        /Đế Quốc Hắc Ám|Bắt Bướm|Thi Đấu Hội/i
      );

      // Switch to Week A (Guild Race)
      fireEvent.click(screen.getByTestId("calendar-phase-weekA"));
      expect(screen.getByTestId("widget-biweekly-calendar").textContent).toMatch(
        /Guild Rush|Xúc Xắc|Nhiệm vụ Huyền Thoại/i
      );
    });

    it("defaults to Double-Dip 300% lookup mode when mounted in Article 3.4 and filters 13 core items", () => {
      render(
        <BiweeklyCalendarWidget
          article={ARTICLE_3_4_DOUBLE_DIP_SCHEDULE}
          locale="vi"
        />
      );

      const searchInput = screen.getByTestId("calendar-doubledip-search");
      expect(searchInput).toBeDefined();

      // Filter by 300% Triple-Dip
      fireEvent.click(screen.getByTestId("calendar-tier-filter-300"));
      expect(screen.getByTestId("widget-biweekly-calendar").textContent).toMatch(
        /300%|Đá Linh Hồn|Mảnh Tướng/i
      );
    });
  });

  describe("Suite 3: MasterDataExplorerWidget (12 SSoT Tables Explorer)", () => {
    it("extracts all 12 tables from Article 8.4, renders only 1 active table at a time, and supports cross-table global search", () => {
      render(
        <MasterDataExplorerWidget
          article={ARTICLE_8_4_MASTER_DATA_TABLES}
          locale="vi"
          forceUnlockPro={true}
        />
      );

      expect(screen.getByTestId("widget-master-data-explorer")).toBeDefined();

      // Verify 12 table selector pills exist
      const tablePills = screen.getAllByTestId(/^master-table-pill-/);
      expect(tablePills.length).toBe(12);

      // Only 1 ResponsiveDataTable should be rendered in single-table mode
      expect(screen.getAllByTestId("block-table").length).toBe(1);

      // Switch to PRO Table 4.4 (Runes Lv.1-12) via TOC CustomEvent
      act(() => {
        window.dispatchEvent(
          new CustomEvent("tophub:toc-navigate", {
            detail: { targetId: "sub-4-4-runes-master-table" },
          })
        );
      });
      expect(
        screen.getByTestId("widget-master-data-explorer").textContent
      ).toMatch(/327,660|Cổ Ngữ/i);

      // Global search across all 12 tables for "780,000" (Faction Soul Points in Table 4.1)
      const globalSearch = screen.getByTestId("master-global-search");
      fireEvent.change(globalSearch, { target: { value: "780,000" } });
      expect(
        screen.getByTestId("widget-master-data-explorer").textContent
      ).toMatch(/780,000/);
    });
  });

  describe("Suite 4: GuideArticleRenderer Integration & Duplicate Table Elimination", () => {
    it("renders HeroEncyclopediaWidget in Article 2.1 in both Core and Data tabs and suppresses duplicate static hero tables", () => {
      render(
        <GuideArticleRenderer
          article={ARTICLE_2_1_ENCYCLOPEDIA}
          locale="vi"
        />
      );

      // Visible on initial Core tab
      const widgetInCore = screen.getByTestId("widget-hero-encyclopedia");
      expect(widgetInCore.closest('[data-tab-hidden="true"]')).toBeNull();

      // Switch to Tab 2 (Data) -> Widget remains visible (GAP-P3-03 Dual-Tab Visibility)
      fireEvent.click(screen.getByTestId("article-tab-data"));
      expect(widgetInCore.closest('[data-tab-hidden="true"]')).toBeNull();

      // Switch to Tab 3 (Action) -> Widget section hides cleanly
      fireEvent.click(screen.getByTestId("article-tab-action"));
      expect(widgetInCore.closest('[data-tab-hidden="true"]')).not.toBeNull();
    });

    it("renders MasterDataExplorerWidget in Article 8.4 and consolidates static subSection tables to eliminate duplicate rendering", () => {
      const { container } = render(
        <GuideArticleRenderer
          article={ARTICLE_8_4_MASTER_DATA_TABLES}
          locale="vi"
        />
      );

      expect(screen.getByTestId("widget-master-data-explorer")).toBeDefined();

      // Consolidated anchor IDs must still exist in the DOM for GuidesToc Scroll-Spy
      expect(
        container.querySelector("#sub-1-1-hero-star-and-skill-books-table")
      ).not.toBeNull();
      expect(
        container.querySelector("#sub-4-4-runes-master-table")
      ).not.toBeNull();

      // Total rendered ResponsiveDataTable instances in the entire article DOM should be at most 2 (1 active inside Explorer + 1 in sec-3 pitfalls), NOT 12+1!
      const renderedTables = screen.getAllByTestId("block-table");
      expect(renderedTables.length).toBeLessThanOrEqual(2);
    });
  });
});

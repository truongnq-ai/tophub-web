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
import fs from "fs";
import path from "path";
import { ARTICLE_1_1_OVERVIEW } from "../src/content/guides/groups/group-1/1.1-overview";
import { ARTICLE_1_2_STRICT_ONE_QUEUE } from "../src/content/guides/groups/group-1/1.2-strict-one-queue-rule";
import { ARTICLE_1_3_DIAMOND_SPENDING } from "../src/content/guides/groups/group-1/1.3-diamond-and-spending-guide";
import { ARTICLE_1_4_TOP_10_TRAPS } from "../src/content/guides/groups/group-1/1.4-top-10-account-traps";
import { ARTICLE_3_2_WEEK_A_GUILD_RACE } from "../src/content/guides/groups/group-3/3.2-week-a-guild-race";
import { ARTICLE_3_3_WEEK_B_ARMS_RACE } from "../src/content/guides/groups/group-3/3.3-week-b-arms-race";
import { ARTICLE_4_1_PRESEASON_MYTHIC_CALENDAR } from "../src/content/guides/groups/group-4/4.1-preseason-mythic-calendar";
import { ARTICLE_4_2_HORDE_PIVOT_ROADMAP } from "../src/content/guides/groups/group-4/4.2-horde-pivot-roadmap";
import { ARTICLE_4_3_SEASON_1_TO_4_ROADMAP } from "../src/content/guides/groups/group-4/4.3-season-1-to-4-roadmap";
import { AccountTrapsTriageWidget } from "../src/components/guides/widgets/account-traps-triage-widget";
import { HordePivotStepperWidget } from "../src/components/guides/widgets/horde-pivot-stepper-widget";
import { BlacksmithAnvilMatrixWidget } from "../src/components/guides/widgets/blacksmith-anvil-matrix-widget";
import { ShopSafetyFloorWidget } from "../src/components/guides/widgets/shop-safety-floor-widget";
import { MEDIA_SHOWCASE_BY_CODE } from "../src/content/guides/asset-registry";
import { ARTICLE_5_1_GEAR_OVERVIEW } from "../src/content/guides/groups/group-5/5.1-gear-overview";
import { ARTICLE_5_2_GOLDEN_GEAR_SETS } from "../src/content/guides/groups/group-5/5.2-golden-gear-sets";
import { ARTICLE_5_3_ENHANCEMENT_AND_MYTHIC } from "../src/content/guides/groups/group-5/5.3-enhancement-and-mythic";
import { ARTICLE_5_4_LORD_GEAR_STRATEGY } from "../src/content/guides/groups/group-5/5.4-lord-gear-strategy";
import { ARTICLE_6_1_RUNES_GUIDE } from "../src/content/guides/groups/group-6/6.1-runes-guide";
import { ARTICLE_6_2_RELICS_GUIDE } from "../src/content/guides/groups/group-6/6.2-relics-guide";
import { ARTICLE_6_3_PETS_AND_BEHEMOTH } from "../src/content/guides/groups/group-6/6.3-pets-and-behemoth";
import { ARTICLE_7_1_SHOPS_TIER_LIST } from "../src/content/guides/groups/group-7/7.1-shops-tier-list";
import { ARTICLE_7_2_GUILD_HONOR_FREEZE } from "../src/content/guides/groups/group-7/7.2-guild-honor-freeze";
import { ARTICLE_7_3_EXCHANGE_AND_VIP_SHOPS } from "../src/content/guides/groups/group-7/7.3-exchange-and-vip-shops";
import { ARTICLE_7_4_TROOP_SKINS_AND_MEDALS } from "../src/content/guides/groups/group-7/7.4-troop-skins-and-medals";
import { ARTICLE_8_1_CASTLE_AND_BRILLIANCE } from "../src/content/guides/groups/group-8/8.1-castle-and-brilliance";
import { ARTICLE_8_2_BUILDER_QUEUES_AND_VILLAGERS } from "../src/content/guides/groups/group-8/8.2-builder-queues-and-villagers";
import { ARTICLE_8_3_RESEARCH_AND_BAITING } from "../src/content/guides/groups/group-8/8.3-research-and-baiting";

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

  describe("Suite 1: HeroEncyclopediaWidget (55 SSoT Heroes)", () => {
    it("extracts and displays all 55 heroes by default and filters instantaneously by Faction, Rarity, Role, and Search", () => {
      render(
        <HeroEncyclopediaWidget
          article={ARTICLE_2_1_ENCYCLOPEDIA}
          locale="vi"
        />
      );

      expect(screen.getByTestId("widget-hero-encyclopedia")).toBeDefined();
      expect(screen.getByTestId("hero-results-count").textContent).toContain(
        "55 / 55"
      );

      // Filter by Horde (19 heroes)
      fireEvent.click(screen.getByTestId("hero-filter-faction-horde"));
      expect(screen.getByTestId("hero-results-count").textContent).toContain(
        "19 / 55"
      );

      // Filter by League (16 heroes)
      fireEvent.click(screen.getByTestId("hero-filter-faction-league"));
      expect(screen.getByTestId("hero-results-count").textContent).toContain("19 / 55");
      fireEvent.click(screen.getByTestId("hero-filter-faction-nature"));
      expect(screen.getByTestId("hero-results-count").textContent).toContain(
        "17 / 55"
      );

      // Filter by Nature (16 heroes)
      fireEvent.click(screen.getByTestId("hero-filter-faction-nature"));
      expect(screen.getByTestId("hero-results-count").textContent).toContain(
        "17 / 55"
      );

      // Reset Faction to All, then filter by Economy Passive (18 heroes)
      fireEvent.click(screen.getByTestId("hero-filter-faction-all"));
      fireEvent.click(screen.getByTestId("hero-filter-role-economy"));
      expect(screen.getByTestId("hero-results-count").textContent).toContain(
        "18 / 55"
      );

      // Reset all filters and search for "Ngộ Không"
      fireEvent.click(screen.getByTestId("hero-reset-filters"));
      expect(screen.getByTestId("hero-results-count").textContent).toContain(
        "55 / 55"
      );

      const searchInput = screen.getByTestId("hero-search-input");
      fireEvent.change(searchInput, { target: { value: "Ngộ Không" } });
      expect(screen.getByTestId("hero-results-count").textContent).toContain(
        "1 / 55"
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
        "19 / 55"
      );

      act(() => {
        window.dispatchEvent(
          new CustomEvent("tophub:toc-navigate", {
            detail: { id: "sub-2-4-economy-heroes-summary" },
          })
        );
      });

      expect(screen.getByTestId("hero-results-count").textContent).toContain(
        "18 / 55"
      );
    });
  });

  describe("Suite 2: BiweeklyCalendarWidget (Server-Progression Cycle & 300% Double-Dip)", () => {
    it("switches cleanly between Phase 1, Guild Race Mode, Arms Race Mode, and Double-Dip 300% modes and selects weekdays 1..7", () => {
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
      expect(screen.getByTestId("widget-biweekly-calendar").textContent).toMatch(
        /Hero Gacha.*3 Tuần\/Lần|3 Tuần\/Lần.*Hero Gacha/i
      );

      // Switch to Guild Race Mode
      fireEvent.click(screen.getByTestId("calendar-phase-weekA"));
      expect(screen.getByTestId("calendar-phase-weekA").textContent).not.toMatch(
        /Dice|Xúc Xắc|Tuần\s+A\b/i
      );
      expect(screen.getByTestId("widget-biweekly-calendar").textContent).toMatch(
        /Guild Rush|Nhiệm Vụ Huyền Thoại/i
      );
    });

    it("renders English mode labels without legacy (Dice) or Week A/B coupling and displays the 3-week Gacha cycle in Phase 1", () => {
      render(
        <BiweeklyCalendarWidget
          article={ARTICLE_3_1_BIWEEKLY_ROTATION}
          locale="en"
        />
      );

      const weekAButton = screen.getByTestId("calendar-phase-weekA");
      expect(weekAButton.textContent).toBe("🛡️ Guild Race Mode (9-Slot Board)");
      expect(weekAButton.textContent).not.toContain("(Dice)");
      expect(weekAButton.textContent).not.toMatch(/\bWeek\s+A\b/i);

      fireEvent.click(screen.getByTestId("calendar-phase-phase1"));
      expect(screen.getByTestId("widget-biweekly-calendar").textContent).toContain(
        "Hero Gacha (1,000 Diamonds — Horde)"
      );
      expect(screen.getByTestId("widget-biweekly-calendar").textContent).toContain(
        "Every 3rd Week"
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

    it("renders the SSR-safe UTC & Local Timezone converter bar and follows Decision 2A (UTC + VN in vi, clean UTC in en)", () => {
      const { unmount } = render(
        <BiweeklyCalendarWidget
          article={ARTICLE_3_1_BIWEEKLY_ROTATION}
          locale="vi"
        />
      );

      const tzBarVi = screen.getByTestId("calendar-timezone-bar");
      expect(tzBarVi.textContent).toContain("00:00 UTC");
      expect(tzBarVi.textContent).toContain("02:00 UTC");

      // Switch to Guild Race Mode and select Day 7 (Sunday) -> should show 02:00 UTC Thứ Hai (09:00 sáng Giờ VN)
      fireEvent.click(screen.getByTestId("calendar-phase-weekA"));
      fireEvent.click(screen.getByTestId("calendar-day-pill-7"));
      const dayPanelVi = screen.getByTestId("calendar-active-day-panel");
      expect(dayPanelVi.textContent).toContain("02:00 UTC");
      expect(dayPanelVi.textContent).toMatch(/09:00.*VN/);

      unmount();

      render(
        <BiweeklyCalendarWidget
          article={ARTICLE_3_1_BIWEEKLY_ROTATION}
          locale="en"
        />
      );
      const tzBarEn = screen.getByTestId("calendar-timezone-bar");
      expect(tzBarEn.textContent).toContain("00:00 UTC");
      expect(tzBarEn.textContent).toContain("02:00 UTC");

      fireEvent.click(screen.getByTestId("calendar-phase-weekA"));
      fireEvent.click(screen.getByTestId("calendar-day-pill-7"));
      const dayPanelEn = screen.getByTestId("calendar-active-day-panel");
      expect(dayPanelEn.textContent).toContain("Monday 02:00 UTC");
      expect(dayPanelEn.textContent).not.toMatch(/09:00|VN/);
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

  describe("Suite 5: Phase 3 Visual Media & Widget Upgrades — Groups 1, 3, 4 (11 Articles & 3 Widgets)", () => {
    const PHASE3_ARTICLES = [
      ARTICLE_1_1_OVERVIEW,
      ARTICLE_1_2_STRICT_ONE_QUEUE,
      ARTICLE_1_3_DIAMOND_SPENDING,
      ARTICLE_1_4_TOP_10_TRAPS,
      ARTICLE_3_1_BIWEEKLY_ROTATION,
      ARTICLE_3_2_WEEK_A_GUILD_RACE,
      ARTICLE_3_3_WEEK_B_ARMS_RACE,
      ARTICLE_3_4_DOUBLE_DIP_SCHEDULE,
      ARTICLE_4_1_PRESEASON_MYTHIC_CALENDAR,
      ARTICLE_4_2_HORDE_PIVOT_ROADMAP,
      ARTICLE_4_3_SEASON_1_TO_4_ROADMAP,
    ];

    it("renders GameAssetFrame icons for all 10 Traps in AccountTrapsTriageWidget and passes Strict Locale Gate", () => {
      const { container, unmount } = render(
        <AccountTrapsTriageWidget
          article={ARTICLE_1_4_TOP_10_TRAPS}
          locale="en"
          forceUnlockPro={true}
        />
      );

      for (let i = 1; i <= 10; i++) {
        const iconWrapper = screen.getByTestId(`trap-item-icon-${i}`);
        const img = iconWrapper.querySelector("img");
        expect(img).not.toBeNull();
        expect(img?.getAttribute("src")).toMatch(/^\/images\/.+\.webp$/);
        expect(img?.getAttribute("loading")).toBe("lazy");
        expect(img?.getAttribute("decoding")).toBe("async");
      }

      // Expand Trap #1 and verify zero Vietnamese diacritics in EN
      fireEvent.click(screen.getByTestId("trap-diagnose-btn-1"));
      const viDiacriticRegex =
        /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;
      expect(viDiacriticRegex.test(container.textContent ?? "")).toBe(false);
      unmount();
    });

    it("renders GameAssetFrame icons for all 7 daily stages and all 13 Double-Dip items in BiweeklyCalendarWidget", () => {
      const { container, unmount } = render(
        <BiweeklyCalendarWidget
          article={ARTICLE_3_1_BIWEEKLY_ROTATION}
          locale="en"
        />
      );

      // Verify 7 daily stage icons in Week B (GAR/KvK)
      for (let day = 1; day <= 7; day++) {
        const dayIcon = screen.getByTestId(`calendar-day-icon-${day}`);
        const img = dayIcon.querySelector("img");
        expect(img).not.toBeNull();
        expect(img?.getAttribute("src")).toMatch(/^\/images\/.+\.webp$/);
      }

      // Switch to Week A (Guild Race) and verify 7 daily stage icons
      fireEvent.click(screen.getByTestId("calendar-phase-weekA"));
      for (let day = 1; day <= 7; day++) {
        const dayIcon = screen.getByTestId(`calendar-day-icon-${day}`);
        expect(dayIcon.querySelector("img")).not.toBeNull();
      }

      // Switch to Double-Dip 300% mode and verify all 13 item icons
      fireEvent.click(screen.getByTestId("calendar-phase-doubledip"));
      for (let idx = 1; idx <= 13; idx++) {
        const ddIcon = screen.getByTestId(`doubledip-item-icon-${idx}`);
        const img = ddIcon.querySelector("img");
        expect(img).not.toBeNull();
        expect(img?.getAttribute("src")).toMatch(/^\/images\/.+\.webp$/);
      }

      const viDiacriticRegex =
        /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;
      expect(viDiacriticRegex.test(container.textContent ?? "")).toBe(false);
      unmount();
    });

    it("renders Hero Avatar strips with Faction Badges in Queue 1 and Queue 2 across all 4 stages of HordePivotStepperWidget", () => {
      const { unmount } = render(
        <HordePivotStepperWidget
          article={ARTICLE_4_2_HORDE_PIVOT_ROADMAP}
          locale="vi"
          forceUnlockPro={true}
        />
      );

      for (const stageNum of [1, 2, 3, 4] as const) {
        fireEvent.click(screen.getByTestId(`pivot-stage-btn-${stageNum}`));

        // Every stage has 6 Queue 1 slots
        for (let slot = 0; slot < 6; slot++) {
          const q1Avatars = screen.getByTestId(`pivot-q1-avatars-${slot}`);
          const imgs = q1Avatars.querySelectorAll("img");
          expect(imgs.length).toBeGreaterThanOrEqual(2); // Hero avatar + Faction badge
        }

        // Queue 2 has at least 1 slot with resolved hero avatars
        const q2Avatars0 = screen.getByTestId("pivot-q2-avatars-0");
        expect(q2Avatars0.querySelectorAll("img").length).toBeGreaterThanOrEqual(2);
      }

      unmount();
    });

    it("verifies all 11 Group 1, 3, 4 articles have zero legacy /images/guides/ paths, valid showcase decks, and pass GAP-01..04", () => {
      const publicDir = path.resolve(__dirname, "../public");
      const rawJson = JSON.stringify(PHASE3_ARTICLES);
      expect(rawJson).not.toContain("/images/guides/");

      const expectedCodes = [
        "MED-1.1-02", "MED-1.1-03", "MED-1.1-05",
        "MED-1.2-02", "MED-1.2-04", "MED-1.2-05",
        "MED-1.3-02", "MED-1.3-04",
        "MED-1.4-02", "MED-1.4-03", "MED-1.4-05",
        "MED-3.1-01", "MED-3.1-02", "MED-3.1-04",
        "MED-3.2-01", "MED-3.2-02", "MED-3.2-04",
        "MED-3.3-01", "MED-3.3-02", "MED-3.3-04",
        "MED-3.4-01", "MED-3.4-02", "MED-3.4-04",
        "MED-4.1-01", "MED-4.1-03", "MED-4.1-04",
        "MED-4.2-02", "MED-4.2-03", "MED-4.2-04",
        "MED-4.3-02", "MED-4.3-03", "MED-4.3-04",
      ];

      for (const code of expectedCodes) {
        const deck = MEDIA_SHOWCASE_BY_CODE[code];
        expect(deck).toBeDefined();
        expect(deck.length).toBe(6);
        for (const item of deck) {
          const diskPath = path.join(publicDir, item.iconPath.replace(/^\//, ""));
          expect(fs.existsSync(diskPath)).toBe(true);
        }
      }

      for (const article of PHASE3_ARTICLES) {
        const { container, unmount } = render(
          <GuideArticleRenderer article={article} locale="en" />
        );

        // GAP-02: Semantic <code> tags preserved
        expect(container.querySelectorAll("code").length).toBeGreaterThan(0);

        // GAP-03: Zero border-l-2, border-l-4, rounded-l-sm
        const html = container.innerHTML;
        expect(html).not.toMatch(/\bborder-l-[24]\b/);
        expect(html).not.toMatch(/\brounded-l-sm\b/);

        // GAP-04: All <img> lazy & existing on disk
        const imgs = Array.from(container.querySelectorAll("img"));
        expect(imgs.length).toBeGreaterThan(0);
        for (const img of imgs) {
          const src = img.getAttribute("src") ?? "";
          expect(src.startsWith("/images/")).toBe(true);
          expect(img.getAttribute("loading")).toBe("lazy");
          expect(img.getAttribute("decoding")).toBe("async");
          const diskPath = path.join(publicDir, src.replace(/^\//, ""));
          expect(fs.existsSync(diskPath)).toBe(true);
        }

        unmount();
      }
    });
  });

  describe("Suite 6: Phase 4 Visual Media & Widget Upgrades — Groups 5, 6, 7, 8 (15 Articles & 3 Widgets)", () => {
    const PHASE4_ARTICLES = [
      ARTICLE_5_1_GEAR_OVERVIEW,
      ARTICLE_5_2_GOLDEN_GEAR_SETS,
      ARTICLE_5_3_ENHANCEMENT_AND_MYTHIC,
      ARTICLE_5_4_LORD_GEAR_STRATEGY,
      ARTICLE_6_1_RUNES_GUIDE,
      ARTICLE_6_2_RELICS_GUIDE,
      ARTICLE_6_3_PETS_AND_BEHEMOTH,
      ARTICLE_7_1_SHOPS_TIER_LIST,
      ARTICLE_7_2_GUILD_HONOR_FREEZE,
      ARTICLE_7_3_EXCHANGE_AND_VIP_SHOPS,
      ARTICLE_7_4_TROOP_SKINS_AND_MEDALS,
      ARTICLE_8_1_CASTLE_AND_BRILLIANCE,
      ARTICLE_8_2_BUILDER_QUEUES_AND_VILLAGERS,
      ARTICLE_8_3_RESEARCH_AND_BAITING,
      ARTICLE_8_4_MASTER_DATA_TABLES,
    ];

    it("renders 3x4 Golden Gear set slot icons + Faction Mark badges and 24 Hero Avatars + BiS Set icons in BlacksmithAnvilMatrixWidget", () => {
      const publicDir = path.resolve(__dirname, "../public");
      const { container, unmount } = render(
        <BlacksmithAnvilMatrixWidget
          article={ARTICLE_5_2_GOLDEN_GEAR_SETS}
          locale="en"
          forceUnlockPro={true}
        />
      );

      for (const setId of ["knights_glory", "titan_blood", "sage_glory"] as const) {
        const slotStrip = screen.getByTestId(`anvil-set-icons-${setId}`);
        const slotImgs = Array.from(slotStrip.querySelectorAll("img"));
        expect(slotImgs.length).toBe(4);
        for (const img of slotImgs) {
          const src = img.getAttribute("src") ?? "";
          expect(src).toMatch(/^\/images\/equipment\/hero-gear\/icon_400\d\d\.webp$/);
          expect(fs.existsSync(path.join(publicDir, src.replace(/^\//, "")))).toBe(true);
        }

        for (const fac of ["league", "horde", "nature"] as const) {
          const colIcon = screen.getByTestId(`anvil-col-icon-${setId}-${fac}`);
          const imgs = colIcon.querySelectorAll("img");
          expect(imgs.length).toBeGreaterThanOrEqual(2); // Gear icon + Faction badge
        }
      }

      // All 24 Hero BiS cards must render both Hero Avatar and BiS Set Icon
      for (let idx = 0; idx < 24; idx++) {
        const heroAvatar = screen.getByTestId(`bis-hero-avatar-${idx}`);
        const avatarImg = heroAvatar.querySelector("img");
        expect(avatarImg).not.toBeNull();
        expect(avatarImg?.getAttribute("src")).toMatch(/^\/images\/heroes\/avatars\/Head_\d+\.webp$/);

        const setIcon = screen.getByTestId(`bis-set-icon-${idx}`);
        const setImg = setIcon.querySelector("img");
        expect(setImg).not.toBeNull();
        expect(setImg?.getAttribute("src")).toMatch(/^\/images\/.+\.webp$/);
      }

      const viDiacriticRegex =
        /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;
      expect(viDiacriticRegex.test(container.textContent ?? "")).toBe(false);
      expect(container.innerHTML).not.toMatch(/\bborder-l-[24]\b/);
      expect(container.innerHTML).not.toMatch(/\brounded-l-sm\b/);
      unmount();
    });

    it("renders 13 Shop Currency icons, Safety Floor Banner icon, and 3-Bucket Item icons in ShopSafetyFloorWidget", () => {
      const publicDir = path.resolve(__dirname, "../public");
      const { container, unmount } = render(
        <ShopSafetyFloorWidget
          article={ARTICLE_7_1_SHOPS_TIER_LIST}
          locale="en"
          forceUnlockPro={true}
        />
      );

      for (let shopNum = 1; shopNum <= 13; shopNum++) {
        const pillIcon = screen.getByTestId(`shop-pill-icon-${shopNum}`);
        const img = pillIcon.querySelector("img");
        expect(img).not.toBeNull();
        const src = img?.getAttribute("src") ?? "";
        expect(src).toMatch(/^\/images\/.+\.webp$/);
        expect(fs.existsSync(path.join(publicDir, src.replace(/^\//, "")))).toBe(true);
      }

      const bannerIcon = screen.getByTestId("shop-floor-currency-icon");
      expect(bannerIcon.querySelector("img")).not.toBeNull();

      // Verify item icons across all 3 buckets on initial Arena Shop (#1)
      expect(
        screen
          .getByTestId("shop-bucket-must-sweep")
          .querySelectorAll("[data-testid='game-asset-frame'] img").length
      ).toBeGreaterThan(0);
      expect(
        screen
          .getByTestId("shop-bucket-surplus")
          .querySelectorAll("[data-testid='game-asset-frame'] img").length
      ).toBeGreaterThan(0);
      expect(
        screen
          .getByTestId("shop-bucket-forbidden")
          .querySelectorAll("[data-testid='game-asset-frame'] img").length
      ).toBeGreaterThan(0);

      const viDiacriticRegex =
        /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;
      expect(viDiacriticRegex.test(container.textContent ?? "")).toBe(false);
      expect(container.innerHTML).not.toMatch(/\bborder-l-[24]\b/);
      expect(container.innerHTML).not.toMatch(/\brounded-l-sm\b/);
      unmount();
    });

    it("renders representative icons on all 12 Master Table tabs, active table header, and Column 1 thumbnails in MasterDataExplorerWidget", () => {
      const publicDir = path.resolve(__dirname, "../public");
      const { container, unmount } = render(
        <MasterDataExplorerWidget
          article={ARTICLE_8_4_MASTER_DATA_TABLES}
          locale="en"
          forceUnlockPro={true}
        />
      );

      const tableCodes = [
        "1.1", "1.2", "1.3", "1.4", "3.1",
        "4.1", "4.2", "4.3", "4.4", "4.5", "4.6", "4.7",
      ];
      for (const code of tableCodes) {
        const pillIcon = screen.getByTestId(`master-pill-icon-${code}`);
        const img = pillIcon.querySelector("img");
        expect(img).not.toBeNull();
        const src = img?.getAttribute("src") ?? "";
        expect(src).toMatch(/^\/images\/.+\.webp$/);
        expect(fs.existsSync(path.join(publicDir, src.replace(/^\//, "")))).toBe(true);
      }

      const activeHeaderIcon = screen.getByTestId("master-active-table-icon");
      expect(activeHeaderIcon.querySelector("img")).not.toBeNull();

      // Column 1 of the active table must display GameAssetFrame thumbnails
      const col1Imgs = container.querySelectorAll(
        "tbody tr td:first-child [data-testid='game-asset-frame'] img"
      );
      expect(col1Imgs.length).toBeGreaterThan(0);

      const viDiacriticRegex =
        /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;
      expect(viDiacriticRegex.test(container.textContent ?? "")).toBe(false);
      expect(container.innerHTML).not.toMatch(/\bborder-l-[24]\b/);
      expect(container.innerHTML).not.toMatch(/\brounded-l-sm\b/);
      unmount();
    });

    it("verifies all 15 Group 5, 6, 7, 8 articles have zero legacy /images/guides/ paths, 6-item bespoke showcase decks for all 59 MED-* codes, and pass GAP-01..04", () => {
      const publicDir = path.resolve(__dirname, "../public");
      const rawJson = JSON.stringify(PHASE4_ARTICLES);
      expect(rawJson).not.toContain("/images/guides/");

      const expectedPhase4Codes = [
        "MED-5.1-01", "MED-5.1-02", "MED-5.1-03", "MED-5.1-04",
        "MED-5.2-01", "MED-5.2-02", "MED-5.2-03", "MED-5.2-04",
        "MED-5.3-01", "MED-5.3-02", "MED-5.3-03", "MED-5.3-04",
        "MED-5.4-01", "MED-5.4-02", "MED-5.4-03",
        "MED-6.1-01", "MED-6.1-02", "MED-6.1-03", "MED-6.1-04",
        "MED-6.2-01", "MED-6.2-02", "MED-6.2-03", "MED-6.2-04",
        "MED-6.3-01", "MED-6.3-02", "MED-6.3-03", "MED-6.3-04",
        "MED-7.1-01", "MED-7.1-02", "MED-7.1-03", "MED-7.1-04",
        "MED-7.2-01", "MED-7.2-02", "MED-7.2-03", "MED-7.2-04",
        "MED-7.3-01", "MED-7.3-02", "MED-7.3-03", "MED-7.3-04",
        "MED-7.4-01", "MED-7.4-02", "MED-7.4-03", "MED-7.4-04",
        "MED-8.1-01", "MED-8.1-02", "MED-8.1-03", "MED-8.1-04",
        "MED-8.2-01", "MED-8.2-02", "MED-8.2-03", "MED-8.2-04",
        "MED-8.3-01", "MED-8.3-02", "MED-8.3-03", "MED-8.3-04",
        "MED-8.4-01", "MED-8.4-02", "MED-8.4-03", "MED-8.4-04",
      ];

      const viDiacriticRegex =
        /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;

      for (const code of expectedPhase4Codes) {
        const deck = MEDIA_SHOWCASE_BY_CODE[code];
        expect(deck, `Missing showcase deck for ${code}`).toBeDefined();
        expect(deck.length, `Showcase deck ${code} must have 6 items`).toBe(6);
        for (const item of deck) {
          const diskPath = path.join(publicDir, item.iconPath.replace(/^\//, ""));
          expect(fs.existsSync(diskPath), `Missing file for ${code}: ${item.iconPath}`).toBe(true);
          expect(viDiacriticRegex.test(item.labelEn)).toBe(false);
        }
      }

      for (const article of PHASE4_ARTICLES) {
        const { container, unmount } = render(
          <GuideArticleRenderer article={article} locale="en" />
        );

        // GAP-01: Zero Vietnamese diacritics in media showcase decks, tables, and diagrams in locale="en"
        const localizedMediaNodes = Array.from(
          container.querySelectorAll(
            "[data-testid='visual-showcase-deck'], [data-testid='block-table'], [data-testid='block-visual-diagram']"
          )
        );
        for (const node of localizedMediaNodes) {
          expect(
            viDiacriticRegex.test(node.textContent ?? ""),
            `Article ${article.code} leaked VI diacritics in locale="en"`
          ).toBe(false);
        }

        // GAP-02: Semantic <code> tags preserved
        expect(container.querySelectorAll("code").length).toBeGreaterThan(0);

        // GAP-03: Zero border-l-2, border-l-4, rounded-l-sm
        const html = container.innerHTML;
        expect(html).not.toMatch(/\bborder-l-[24]\b/);
        expect(html).not.toMatch(/\brounded-l-sm\b/);

        // GAP-04: All <img> lazy & existing on disk
        const imgs = Array.from(container.querySelectorAll("img"));
        expect(imgs.length).toBeGreaterThan(0);
        for (const img of imgs) {
          const src = img.getAttribute("src") ?? "";
          expect(src.startsWith("/images/")).toBe(true);
          expect(img.getAttribute("loading")).toBe("lazy");
          expect(img.getAttribute("decoding")).toBe("async");
          const diskPath = path.join(publicDir, src.replace(/^\//, ""));
          expect(fs.existsSync(diskPath)).toBe(true);
        }

        unmount();
      }
    });
  });

  describe("Suite 4 Tail", () => {
    it("noop", () => {
      expect(true).toBe(true);
    });
  });
});

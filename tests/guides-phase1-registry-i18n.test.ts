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
      "neonShuttleAria",
      "neonSectionEntered",
      "neonTocHint",
    ] as const;

    const viGuides = viMessages.Guides as Record<string, string>;
    const enGuides = enMessages.Guides as Record<string, string>;

    for (const key of requiredKeys) {
      expect(viGuides[key], `Missing vi.json Guides.${key}`).toBeTruthy();
      expect(enGuides[key], `Missing en.json Guides.${key}`).toBeTruthy();
    }
  });

  it("contains all Phase 2 Guides i18n keys in both vi.json and en.json", () => {
    const phase2Keys = [
      "viewModeTabCore",
      "viewModeTabData",
      "viewModeTabAction",
      "viewModeTabAll",
      "viewModeNextTabPrefix",
      "keyTakeawaysCollapsedLabel",
      "keyTakeawaysHideLabel",
    ] as const;

    const viGuides = viMessages.Guides as Record<string, string>;
    const enGuides = enMessages.Guides as Record<string, string>;

    for (const key of phase2Keys) {
      expect(viGuides[key], `Missing vi.json Guides.${key}`).toBeTruthy();
      expect(enGuides[key], `Missing en.json Guides.${key}`).toBeTruthy();
    }
  });
});


import React from "react";
import { describe, expect, it, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import enMessages from "../messages/en.json";
import {
  GLOSSARY_CATEGORIES,
  GUIDE_GLOSSARY,
  GUIDE_GLOSSARY_BY_ID,
  getGlossaryTerm,
  getGlossaryTermsByCategory,
  translateGlossaryTerm,
  searchGlossaryTerms,
} from "../src/content/guides/glossary";
import {
  GUIDE_ZONES,
  GUIDE_CATEGORIES,
  getAllArticles,
} from "../src/content/guides/registry";
import { ARTICLE_1_4_TOP_10_TRAPS } from "../src/content/guides/groups/group-1/1.4-top-10-account-traps";
import { ARTICLE_2_1_ENCYCLOPEDIA } from "../src/content/guides/groups/group-2/2.1-encyclopedia";
import { ARTICLE_2_2_META_LINEUPS } from "../src/content/guides/groups/group-2/2.2-meta-lineups";
import { ARTICLE_2_3_FORMATION_COUNTERS } from "../src/content/guides/groups/group-2/2.3-formation-and-counters";
import { ARTICLE_3_1_BIWEEKLY_ROTATION } from "../src/content/guides/groups/group-3/3.1-biweekly-rotation";
import { ARTICLE_3_2_WEEK_A_GUILD_RACE } from "../src/content/guides/groups/group-3/3.2-week-a-guild-race";
import { ARTICLE_3_3_WEEK_B_ARMS_RACE } from "../src/content/guides/groups/group-3/3.3-week-b-arms-race";
import { ARTICLE_3_4_DOUBLE_DIP_SCHEDULE } from "../src/content/guides/groups/group-3/3.4-double-dip-schedule";
import { ARTICLE_4_2_HORDE_PIVOT_ROADMAP } from "../src/content/guides/groups/group-4/4.2-horde-pivot-roadmap";
import { ARTICLE_5_2_GOLDEN_GEAR_SETS } from "../src/content/guides/groups/group-5/5.2-golden-gear-sets";
import { ARTICLE_7_1_SHOPS_TIER_LIST } from "../src/content/guides/groups/group-7/7.1-shops-tier-list";
import { ARTICLE_8_4_MASTER_DATA_TABLES } from "../src/content/guides/groups/group-8/8.4-master-data-tables";
import { HeroEncyclopediaWidget } from "../src/components/guides/widgets/hero-encyclopedia-widget";
import { BiweeklyCalendarWidget } from "../src/components/guides/widgets/biweekly-calendar-widget";
import { MasterDataExplorerWidget } from "../src/components/guides/widgets/master-data-explorer-widget";
import { AccountTrapsTriageWidget } from "../src/components/guides/widgets/account-traps-triage-widget";
import { TacticalFormationBoardWidget } from "../src/components/guides/widgets/tactical-formation-board-widget";
import { HordePivotStepperWidget } from "../src/components/guides/widgets/horde-pivot-stepper-widget";
import { BlacksmithAnvilMatrixWidget } from "../src/components/guides/widgets/blacksmith-anvil-matrix-widget";
import { ShopSafetyFloorWidget } from "../src/components/guides/widgets/shop-safety-floor-widget";
import { GuideArticleRenderer } from "../src/components/guides/guide-article-renderer";

vi.mock("next-intl", () => ({
  useLocale: () => "en",
  useTranslations: () => (key: string, params?: Record<string, unknown>) => {
    if (key === "readingTime" && params) return `${params.minutes} min read`;
    if (key === "sectionCountLabel" && params) return `${params.count} sections`;
    const guidesMap = enMessages.Guides as Record<string, string>;
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
  }) => React.createElement("a", { href, ...rest }, children),
}));

const VI_DIACRITIC_REGEX =
  /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ]/;

function collectVietnameseLeaksInEn(
  node: unknown,
  path: string,
  leaks: string[]
): void {
  if (!node || typeof node !== "object") return;
  if (Array.isArray(node)) {
    node.forEach((item, index) =>
      collectVietnameseLeaksInEn(item, `${path}[${index}]`, leaks)
    );
    return;
  }

  const record = node as Record<string, unknown>;
  if (typeof record.vi === "string" && typeof record.en === "string") {
    if (VI_DIACRITIC_REGEX.test(record.en)) {
      leaks.push(`${path}.en => ${JSON.stringify(record.en)}`);
    }
    return;
  }

  for (const [key, value] of Object.entries(record)) {
    collectVietnameseLeaksInEn(value, `${path}.${key}`, leaks);
  }
}

describe("Wave 5 — Multi-Language Glossary (DEC-V4-03) & 100% Bilingual Purity (AC-V4-4.1)", () => {
  describe("Suite 1: Glossary SSoT & NFR-V4-03 Multi-Language Extensibility", () => {
    it("populates all 8 canonical glossary categories and all 51 SSoT heroes", () => {
      expect(GLOSSARY_CATEGORIES).toHaveLength(8);
      for (const category of GLOSSARY_CATEGORIES) {
        const items = getGlossaryTermsByCategory(category);
        expect(
          items.length,
          `Category ${category} must not be empty`
        ).toBeGreaterThan(0);
      }

      const heroTerms = getGlossaryTermsByCategory("heroes");
      expect(heroTerms).toHaveLength(51);
      expect(
        heroTerms.filter((h) => h.heroMeta?.faction === "league")
      ).toHaveLength(16);
      expect(
        heroTerms.filter((h) => h.heroMeta?.faction === "horde")
      ).toHaveLength(19);
      expect(
        heroTerms.filter((h) => h.heroMeta?.faction === "nature")
      ).toHaveLength(16);
    });

    it("enforces unique IDs, O(1) lookup, search accuracy, and NFR-V4-03 fallback for future locales", () => {
      expect(GUIDE_GLOSSARY_BY_ID.size).toBe(GUIDE_GLOSSARY.length);

      const wukong = getGlossaryTerm("hero-wukong");
      expect(wukong?.term.en).toBe("Wukong");
      expect(wukong?.term.vi).toContain("Tôn Ngộ Không");

      expect(translateGlossaryTerm("item-soul-stone", "vi")).toContain(
        "Hồn Đá Đỏ"
      );
      expect(translateGlossaryTerm("item-soul-stone", "en")).toBe(
        "Red Soul Stone"
      );
      // NFR-V4-03: Unpopulated future locales gracefully fall back to .en
      expect(translateGlossaryTerm("item-soul-stone", "ja")).toBe(
        "Red Soul Stone"
      );
      expect(translateGlossaryTerm("item-soul-stone", "ko")).toBe(
        "Red Soul Stone"
      );
      expect(translateGlossaryTerm("unknown-id", "en")).toBe("unknown-id");

      const searchVi = searchGlossaryTerms("ngộ không", "vi");
      expect(searchVi.some((t) => t.id === "hero-wukong")).toBe(true);

      const searchEn = searchGlossaryTerms("Staircase", "en");
      expect(
        searchEn.some((t) => t.id === "meta-staircase-promotion")
      ).toBe(true);
    });

    it("contains 0 Vietnamese diacritics inside any .en field of GUIDE_GLOSSARY", () => {
      const leaks: string[] = [];
      for (const entry of GUIDE_GLOSSARY) {
        if (VI_DIACRITIC_REGEX.test(entry.term.en)) {
          leaks.push(`${entry.id}.term.en => ${entry.term.en}`);
        }
        if (VI_DIACRITIC_REGEX.test(entry.definition.en)) {
          leaks.push(`${entry.id}.definition.en => ${entry.definition.en}`);
        }
        for (const aliasEn of entry.aliases?.en ?? []) {
          if (VI_DIACRITIC_REGEX.test(aliasEn)) {
            leaks.push(`${entry.id}.aliases.en => ${aliasEn}`);
          }
        }
      }
      expect(leaks).toEqual([]);
    });
  });

  describe("Suite 2: 31 Articles, 8 Categories & 3 Zones — Zero Vietnamese Leak in EN + VI Prose Integrity", () => {
    it("has 0 Vietnamese diacritics in GUIDE_ZONES and GUIDE_CATEGORIES .en metadata fields", () => {
      const leaks: string[] = [];
      for (const zone of GUIDE_ZONES) {
        collectVietnameseLeaksInEn(
          { title: zone.title },
          `Zone[${zone.id}]`,
          leaks
        );
      }
      for (const cat of GUIDE_CATEGORIES) {
        collectVietnameseLeaksInEn(
          {
            title: cat.title,
            description: cat.description,
          },
          `Category[${cat.slug}]`,
          leaks
        );
      }
      expect(leaks).toEqual([]);
    });

    for (const article of getAllArticles()) {
      it(`Article ${article.code} (${article.slug}) has 0 Vietnamese character leaks in .en and valid .vi prose`, () => {
        const leaks: string[] = [];
        collectVietnameseLeaksInEn(article, `Article[${article.code}]`, leaks);
        expect(
          leaks,
          `Found ${leaks.length} Vietnamese leak(s) in Article ${article.code}:\n${leaks.join("\n")}`
        ).toEqual([]);

        // GAP-W5-11: Verify .vi core prose fields remain valid Vietnamese and were not overwritten with English
        expect(VI_DIACRITIC_REGEX.test(article.title.vi)).toBe(true);
        expect(VI_DIACRITIC_REGEX.test(article.summary.vi)).toBe(true);
        expect(VI_DIACRITIC_REGEX.test(article.tldr?.coreRule.vi ?? "")).toBe(true);
        expect(VI_DIACRITIC_REGEX.test(article.tldr?.immediateAction.vi ?? "")).toBe(
          true
        );
        expect(VI_DIACRITIC_REGEX.test(article.tldr?.strictTaboo.vi ?? "")).toBe(true);
        for (const kt of article.keyTakeaways) {
          expect(VI_DIACRITIC_REGEX.test(kt.vi)).toBe(true);
        }
      });
    }
  });

  describe("Suite 3: Interactive Widgets & GuideArticleRenderer — Zero Vietnamese Leak in EN DOM", () => {
    it("renders HeroEncyclopediaWidget in locale='en' with 0 Vietnamese characters (including placeholder and cards)", () => {
      const { container } = render(
        React.createElement(HeroEncyclopediaWidget, {
          article: ARTICLE_2_1_ENCYCLOPEDIA,
          locale: "en",
        })
      );
      const input = container.querySelector("input");
      expect(input?.getAttribute("placeholder") ?? "").not.toMatch(
        VI_DIACRITIC_REGEX
      );
      expect(container.textContent ?? "").not.toMatch(VI_DIACRITIC_REGEX);
    });

    it("renders HordePivotStepperWidget across all 4 stages in locale='en' with 0 Vietnamese characters", () => {
      const { container } = render(
        React.createElement(HordePivotStepperWidget, {
          article: ARTICLE_4_2_HORDE_PIVOT_ROADMAP,
          locale: "en",
          forceUnlockPro: true,
        })
      );

      for (const stageNum of [1, 2, 3, 4]) {
        const stageBtn = container.querySelector(
          `[data-testid="pivot-stage-btn-${stageNum}"]`
        );
        if (stageBtn) fireEvent.click(stageBtn);
        expect(
          container.textContent ?? "",
          `Stage ${stageNum} leaked Vietnamese in locale="en"`
        ).not.toMatch(VI_DIACRITIC_REGEX);
      }
    });

    it("renders the remaining 6 Interactive Widgets in locale='en' with 0 Vietnamese characters", () => {
      const widgets = [
        React.createElement(BiweeklyCalendarWidget, {
          key: "cal",
          article: ARTICLE_3_1_BIWEEKLY_ROTATION,
          locale: "en",
        }),
        React.createElement(MasterDataExplorerWidget, {
          key: "mde",
          article: ARTICLE_8_4_MASTER_DATA_TABLES,
          locale: "en",
        }),
        React.createElement(AccountTrapsTriageWidget, {
          key: "traps",
          article: ARTICLE_1_4_TOP_10_TRAPS,
          locale: "en",
          forceUnlockPro: true,
        }),
        React.createElement(TacticalFormationBoardWidget, {
          key: "board",
          article: ARTICLE_2_2_META_LINEUPS,
          locale: "en",
          forceUnlockPro: true,
        }),
        React.createElement(BlacksmithAnvilMatrixWidget, {
          key: "anvil",
          article: ARTICLE_5_2_GOLDEN_GEAR_SETS,
          locale: "en",
          forceUnlockPro: true,
        }),
        React.createElement(ShopSafetyFloorWidget, {
          key: "shop",
          article: ARTICLE_7_1_SHOPS_TIER_LIST,
          locale: "en",
          forceUnlockPro: true,
        }),
      ];

      for (const element of widgets) {
        const { container, unmount } = render(element);
        expect(container.textContent ?? "").not.toMatch(VI_DIACRITIC_REGEX);
        unmount();
      }
    });

    it("renders full GuideArticleRenderer in locale='en' across all 31 articles with 0 Vietnamese leaks (GAP-W5-10)", () => {
      for (const article of getAllArticles()) {
        const { container, unmount } = render(
          React.createElement(GuideArticleRenderer, {
            article,
          })
        );
        const text = container.textContent ?? "";
        const match = text.match(
          new RegExp(`.{0,30}${VI_DIACRITIC_REGEX.source}.{0,30}`)
        );
        expect(
          match ? `${article.code}: ${match[0]}` : null,
          `Full GuideArticleRenderer for ${article.code} leaked Vietnamese in locale="en"`
        ).toBeNull();
        unmount();
      }
    });
  });

  describe("Suite 4: messages/en.json Dictionary Purity", () => {
    it("contains 0 Vietnamese diacritics anywhere in messages/en.json", () => {
      expect(JSON.stringify(enMessages)).not.toMatch(VI_DIACRITIC_REGEX);
    });
  });

  describe("Suite 5: UTC & Timezone Standardization Purity (Decisions 1A, 2A, 3A)", () => {
    it("enforces clean UTC in .en (0 legacy UTC+7 event times or VN labels) and UTC + (Giờ VN) in .vi across all 31 articles", () => {
      const enViolations: string[] = [];
      const viViolations: string[] = [];

      const LEGACY_VN_CLOCK_IN_EN =
        /\b(01:00|05:00|07:00|09:00|13:00|17:00|17:05|17:15|17:30|21:00|21:10)\b/;
      const VN_LABEL_IN_EN =
        /\b(Giờ VN|VN Time|UTC\+7|GMT\+7)\b|\(\d{2}:\d{2}[^)]*VN\)/i;
      const UNACCOMPANIED_VN_CLOCK_IN_VI =
        /\b(01:00|05:00|07:00|09:00|13:00|17:00|17:05|17:15|17:30|21:00|21:10)\b/;
      const UTC_CLOCK_IN_VI =
        /\b(00:00|00:05|00:30|02:00|06:00|10:00|10:05|10:15|10:30|14:00|14:10|18:00|22:00)\s*UTC\b/;

      function walkBilingual(node: unknown, path: string, articleCode: string): void {
        if (!node || typeof node !== "object") return;
        if (Array.isArray(node)) {
          node.forEach((item, index) =>
            walkBilingual(item, `${path}[${index}]`, articleCode)
          );
          return;
        }
        const record = node as Record<string, unknown>;
        if (typeof record.vi === "string" && typeof record.en === "string") {
          const viText = record.vi;
          const enText = record.en;

          // Check .en for legacy VN event clock hours
          if (LEGACY_VN_CLOCK_IN_EN.test(enText)) {
            enViolations.push(`${path}.en (legacy VN hour) => ${enText}`);
          }
          if (VN_LABEL_IN_EN.test(enText)) {
            enViolations.push(`${path}.en (VN label in EN) => ${enText}`);
          }

          // Check .vi: if it has a VN event clock hour, it must also contain "UTC"
          if (UNACCOMPANIED_VN_CLOCK_IN_VI.test(viText) && !/\bUTC\b/.test(viText)) {
            viViolations.push(`${path}.vi (missing UTC primary) => ${viText}`);
          }
          // Check .vi: if it has a UTC clock hour, it must also reference VN time
          if (
            UTC_CLOCK_IN_VI.test(viText) &&
            !/(01:00|05:00|07:00|07:05|09:00|13:00|17:00|17:05|17:15|17:30|21:00|21:10|VN)/.test(
              viText
            )
          ) {
            viViolations.push(`${path}.vi (UTC missing VN parenthetical) => ${viText}`);
          }

          // Check 8.2 personal sleep-cycle hours (08:00 / 22:00 / 23:00)
          if (articleCode === "8.2" && /\b(08:00|23:00)\b/.test(enText)) {
            if (!/local time/i.test(enText)) {
              enViolations.push(
                `${path}.en (8.2 sleep-cycle missing 'local time') => ${enText}`
              );
            }
          }
          if (articleCode === "8.2" && /\b(08:00|23:00)\b/.test(viText)) {
            if (!/giờ địa phương/i.test(viText)) {
              viViolations.push(
                `${path}.vi (8.2 sleep-cycle missing 'giờ địa phương') => ${viText}`
              );
            }
          }
          return;
        }

        for (const [key, value] of Object.entries(record)) {
          walkBilingual(value, `${path}.${key}`, articleCode);
        }
      }

      for (const article of getAllArticles()) {
        walkBilingual(article, `Article[${article.code}]`, article.code);
      }

      expect(
        enViolations,
        `EN Timezone Violations:\n${enViolations.join("\n")}`
      ).toEqual([]);
      expect(
        viViolations,
        `VI Timezone Violations:\n${viViolations.join("\n")}`
      ).toEqual([]);
    });

    it("preserves protected non-clock patterns (00:00 ➔ 00:03 AI targeting window in 8.3, 00:00:00 building timer in 3.3, 02:15 – 08:40 video timestamp in 1.1)", () => {
      const articles = getAllArticles();
      const a11 = JSON.stringify(articles.find((a) => a.code === "1.1"));
      const a33 = JSON.stringify(articles.find((a) => a.code === "3.3"));
      const a83 = JSON.stringify(articles.find((a) => a.code === "8.3"));

      expect(a11).toContain("02:15 – 08:40");
      expect(a33).toContain("00:00:00");
      expect(a83).toContain("00:00 ➔ 00:03");
    });
  });
});

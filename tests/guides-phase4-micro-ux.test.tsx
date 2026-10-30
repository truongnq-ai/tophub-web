import fs from "node:fs";
import path from "node:path";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import viMessages from "../messages/vi.json";
import enMessages from "../messages/en.json";
import { ARTICLE_1_4_TOP_10_TRAPS } from "../src/content/guides/groups/group-1/1.4-top-10-account-traps";
import { ARTICLE_2_2_META_LINEUPS } from "../src/content/guides/groups/group-2/2.2-meta-lineups";
import { ARTICLE_2_3_FORMATION_COUNTERS } from "../src/content/guides/groups/group-2/2.3-formation-and-counters";
import { ARTICLE_4_2_HORDE_PIVOT_ROADMAP } from "../src/content/guides/groups/group-4/4.2-horde-pivot-roadmap";
import { ARTICLE_5_2_GOLDEN_GEAR_SETS } from "../src/content/guides/groups/group-5/5.2-golden-gear-sets";
import { ARTICLE_7_1_SHOPS_TIER_LIST } from "../src/content/guides/groups/group-7/7.1-shops-tier-list";
import { ARTICLE_8_4_MASTER_DATA_TABLES } from "../src/content/guides/groups/group-8/8.4-master-data-tables";
import { AccountTrapsTriageWidget } from "../src/components/guides/widgets/account-traps-triage-widget";
import { HeroEncyclopediaWidget } from "../src/components/guides/widgets/hero-encyclopedia-widget";
import { TacticalFormationBoardWidget } from "../src/components/guides/widgets/tactical-formation-board-widget";
import { BiweeklyCalendarWidget } from "../src/components/guides/widgets/biweekly-calendar-widget";
import { HordePivotStepperWidget } from "../src/components/guides/widgets/horde-pivot-stepper-widget";
import { BlacksmithAnvilMatrixWidget } from "../src/components/guides/widgets/blacksmith-anvil-matrix-widget";
import { ShopSafetyFloorWidget } from "../src/components/guides/widgets/shop-safety-floor-widget";
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

describe("Phase 4 — Category Micro-UX Widgets & GuideArticleRenderer Integration", () => {
  describe("Task 1: i18n Keys & SSoT Section-Level Widget Embedding", () => {
    it("includes all 10 Phase 4 widget translation keys in both vi.json and en.json", () => {
      const viGuides = viMessages.Guides as Record<string, unknown>;
      const enGuides = enMessages.Guides as Record<string, unknown>;

      const requiredKeys = [
        "widgetTrapsTitle",
        "widgetTrapsSubtitle",
        "widgetFormationTitle",
        "widgetFormationSubtitle",
        "widgetPivotTitle",
        "widgetPivotSubtitle",
        "widgetAnvilTitle",
        "widgetAnvilSubtitle",
        "widgetShopSafetyTitle",
        "widgetShopSafetySubtitle",
      ];

      for (const key of requiredKeys) {
        expect(typeof viGuides[key], `Missing vi.json Guides.${key}`).toBe("string");
        expect((viGuides[key] as string).length).toBeGreaterThan(5);
        expect(typeof enGuides[key], `Missing en.json Guides.${key}`).toBe("string");
        expect((enGuides[key] as string).length).toBeGreaterThan(5);
      }
    });

    it("embeds GuideWidgetBlock in section.blocks of target articles 1.4, 2.2, 2.3, 4.2, 5.2, and 7.1 while preserving all SSoT subSections & tables", () => {
      const a14Sec2 = ARTICLE_1_4_TOP_10_TRAPS.freeSections.find(
        (s) => s.id === "sec-2-ten-account-traps"
      );
      expect(
        a14Sec2?.blocks.some(
          (b) => b.type === "widget" && b.widgetType === "account_traps_triage"
        )
      ).toBe(true);

      const a22Sec1 = ARTICLE_2_2_META_LINEUPS.freeSections.find(
        (s) => s.id === "sec-1-league-lineups"
      );
      expect(
        a22Sec1?.blocks.some(
          (b) =>
            b.type === "widget" && b.widgetType === "tactical_formation_board"
        )
      ).toBe(true);

      const a23Sec1 = ARTICLE_2_3_FORMATION_COUNTERS.freeSections.find(
        (s) => s.id === "sec-1-six-slot-grid-mechanics"
      );
      expect(
        a23Sec1?.blocks.some(
          (b) =>
            b.type === "widget" && b.widgetType === "tactical_formation_board"
        )
      ).toBe(true);

      const a42Sec1 = ARTICLE_4_2_HORDE_PIVOT_ROADMAP.freeSections.find(
        (s) => s.id === "sec-1-why-league-to-horde-is-king"
      );
      expect(
        a42Sec1?.blocks.some(
          (b) => b.type === "widget" && b.widgetType === "horde_pivot_stepper"
        )
      ).toBe(true);

      const a52Sec1 = ARTICLE_5_2_GOLDEN_GEAR_SETS.freeSections.find(
        (s) => s.id === "sec-1-three-golden-sets-and-three-stat-layers"
      );
      expect(
        a52Sec1?.blocks.some(
          (b) =>
            b.type === "widget" && b.widgetType === "blacksmith_anvil_matrix"
        )
      ).toBe(true);

      const a71Sec1 = ARTICLE_7_1_SHOPS_TIER_LIST.freeSections.find(
        (s) => s.id === "overview-and-mechanics"
      );
      expect(
        a71Sec1?.blocks.some(
          (b) =>
            b.type === "widget" && b.widgetType === "shop_safety_floor_explorer"
        )
      ).toBe(true);
    });
  });

  describe("Suite 1: AccountTrapsTriageWidget (10 Account Traps & 4 System Groups)", () => {
    it("extracts all 10 traps, filters by 4 System Groups (#1/#5/#9, #2/#4, #3/#7, #6/#8/#10), and opens 1-Click Triage & Stop-Loss Protocol", () => {
      const { container } = render(
        <AccountTrapsTriageWidget
          article={ARTICLE_1_4_TOP_10_TRAPS}
          locale="vi"
          forceUnlockPro={true}
        />
      );

      expect(screen.getByTestId("widget-account-traps-triage")).toBeDefined();
      expect(screen.getAllByTestId(/^trap-card-/).length).toBe(10);

      // Consolidated TOC anchors must exist in DOM
      expect(container.querySelector("#sub-trap-1")).not.toBeNull();
      expect(container.querySelector("#sub-trap-10")).not.toBeNull();

      // Filter by Group 1: Heroes & Skills (#1, #5, #9 -> 3 traps)
      fireEvent.click(screen.getByTestId("trap-group-filter-heroes_skills"));
      expect(screen.getAllByTestId(/^trap-card-/).length).toBe(3);

      // Filter by Group 2: Shops & Events (#2, #4 -> 2 traps)
      fireEvent.click(screen.getByTestId("trap-group-filter-shops_events"));
      expect(screen.getAllByTestId(/^trap-card-/).length).toBe(2);

      // Filter by Group 3: Gear & Runes (#3, #7 -> 2 traps)
      fireEvent.click(screen.getByTestId("trap-group-filter-gear_runes"));
      expect(screen.getAllByTestId(/^trap-card-/).length).toBe(2);

      // Filter by Group 4: Infrastructure & Tech (#6, #8, #10 -> 3 traps)
      fireEvent.click(screen.getByTestId("trap-group-filter-infra_tech"));
      expect(screen.getAllByTestId(/^trap-card-/).length).toBe(3);

      // Reset to All (10 traps) and click 1-Click Diagnose on Trap #1
      fireEvent.click(screen.getByTestId("trap-group-filter-all"));
      expect(screen.getAllByTestId(/^trap-card-/).length).toBe(10);

      fireEvent.click(screen.getByTestId("trap-diagnose-btn-1"));
      expect(screen.getByTestId("trap-remedy-panel-1").textContent).toMatch(
        /Ngưng đút thêm 100%|400 Mảnh Vàng Vạn Năng/i
      );

      // Sync with GuidesToc CustomEvent for sub-trap-7
      act(() => {
        window.dispatchEvent(
          new CustomEvent("tophub:toc-navigate", {
            detail: { targetId: "sub-trap-7" },
          })
        );
      });
      expect(screen.getByTestId("trap-remedy-panel-7")).toBeDefined();
    });
  });

  describe("Suite 2: TacticalFormationBoardWidget (2x3 6-Slot Grid, 6 Meta Lineups & 4 Arena Swaps)", () => {
    it("renders the 2x3 6-slot tactical board on Article 2.2 and switches across all 6 Faction Meta Lineups", () => {
      render(
        <TacticalFormationBoardWidget
          article={ARTICLE_2_2_META_LINEUPS}
          locale="vi"
          forceUnlockPro={true}
        />
      );

      expect(screen.getByTestId("widget-tactical-formation-board")).toBeDefined();
      for (let slot = 1; slot <= 6; slot++) {
        expect(screen.getByTestId(`formation-slot-${slot}`)).toBeDefined();
      }

      // Switch to Horde Endgame Pure (5 Mythics + 1 Awakened Legendary = 9 Soul Stones)
      fireEvent.click(screen.getByTestId("formation-lineup-pill-horde-endgame"));
      expect(screen.getByTestId("formation-slot-1").textContent).toMatch(
        /Beastmaster|Chúa Tể Muông Thú/i
      );
      expect(screen.getByTestId("formation-slot-2").textContent).toMatch(
        /Desert Prince|Hoàng Tử Sa Mạc/i
      );
      expect(screen.getByTestId("formation-slot-3").textContent).toMatch(
        /Wukong|Ngộ Không|Storm Maiden/i
      );
      expect(screen.getByTestId("formation-aura-badge").textContent).toMatch(
        /\+35%/
      );

      // Switch to Nature Endgame Pure via TOC CustomEvent
      act(() => {
        window.dispatchEvent(
          new CustomEvent("tophub:toc-navigate", {
            detail: { targetId: "sub-3-2-nature-endgame-pure" },
          })
        );
      });
      expect(
        screen.getByTestId("widget-tactical-formation-board").textContent
      ).toMatch(/Tidecaller|Monk|Ne Zha/i);
    });

    it("renders 4 Arena Positional Counter-Swaps on Article 2.3 and visualizes Anti-Assassin & Brawler Trap swaps", () => {
      render(
        <TacticalFormationBoardWidget
          article={ARTICLE_2_3_FORMATION_COUNTERS}
          locale="vi"
          forceUnlockPro={true}
        />
      );

      fireEvent.click(screen.getByTestId("formation-mode-swaps"));
      expect(screen.getAllByTestId(/^arena-swap-pill-/).length).toBe(4);

      fireEvent.click(screen.getByTestId("arena-swap-pill-2"));
      expect(screen.getByTestId("arena-active-swap-panel").textContent).toMatch(
        /Wukong|Beastmaster|Hàng sau|Ô 5/i
      );
    });
  });

  describe("Suite 3: HordePivotStepperWidget (4-Stage League -> Horde Zero-Loss Pivot)", () => {
    it("steps through all 4 transition stages, shows Queue 1 -> Queue 2 hero flow and 9 vs 27 Soul Stones savings", () => {
      render(
        <HordePivotStepperWidget
          article={ARTICLE_4_2_HORDE_PIVOT_ROADMAP}
          locale="vi"
          forceUnlockPro={true}
        />
      );

      expect(screen.getByTestId("widget-horde-pivot-stepper")).toBeDefined();
      expect(screen.getAllByTestId(/^pivot-stage-btn-/).length).toBe(4);

      // Stage 1 default: 6 SSR League, 0 Universal Shards spent
      expect(screen.getByTestId("pivot-active-stage-panel").textContent).toMatch(
        /Secret Keeper|Adjudicator|Pyromancer/i
      );

      // Stage 2: Days 21-35 Hybrid 4 League + 2 Horde (Desert Prince & Storm Maiden 1-Red Star / 160 shards)
      fireEvent.click(screen.getByTestId("pivot-stage-btn-2"));
      expect(screen.getByTestId("pivot-active-stage-panel").textContent).toMatch(
        /Desert Prince|Storm Maiden|160/i
      );

      // Stage 3: Days 36-45 Full Horde Queue 1 + Intact 2.8M Power League moved to Queue 2
      fireEvent.click(screen.getByTestId("pivot-stage-btn-3"));
      expect(screen.getByTestId("pivot-active-stage-panel").textContent).toMatch(
        /Witch|2\.8M|Đội 2/i
      );

      // Stage 4: Day 46+ S1-S3 9 Soul Stones Awakening & Wukong + Beastmaster
      fireEvent.click(screen.getByTestId("pivot-stage-btn-4"));
      expect(screen.getByTestId("pivot-active-stage-panel").textContent).toMatch(
        /9 Hồn Đá Đỏ|9 Soul Stones|Wukong|Soulmancer|Warlock/i
      );
      expect(screen.getByTestId("pivot-soulstone-meter").textContent).toMatch(
        /9.*27/
      );
    });
  });

  describe("Suite 4: BlacksmithAnvilMatrixWidget (3x4 Blacksmith Anvil Matrix + 24-Hero BiS Gear Explorer)", () => {
    it("renders the 3x4 Blacksmith Anvil Matrix with Column 4 Forbidden taboo and filters all 24 Hero BiS Gear rows", () => {
      render(
        <BlacksmithAnvilMatrixWidget
          article={ARTICLE_5_2_GOLDEN_GEAR_SETS}
          locale="vi"
          forceUnlockPro={true}
        />
      );

      expect(screen.getByTestId("widget-blacksmith-anvil-matrix")).toBeDefined();

      // 3 rows: knights_glory, titan_blood, sage_glory
      expect(screen.getByTestId("anvil-row-knights_glory")).toBeDefined();
      expect(screen.getByTestId("anvil-row-titan_blood")).toBeDefined();
      expect(screen.getByTestId("anvil-row-sage_glory")).toBeDefined();

      // Column 4 Unmarked Forbidden Banner
      expect(screen.getByTestId("anvil-col4-forbidden-banner").textContent).toMatch(
        /Cột 4|Không Dấu Hệ|Cấm|30%/i
      );

      // 24 Hero BiS rows loaded from SSoT (6 Tank + 8 Carry + 10 Support)
      expect(screen.getAllByTestId(/^bis-hero-row-/).length).toBe(24);

      // Filter by Role: Carry (8 heroes)
      fireEvent.click(screen.getByTestId("bis-role-filter-carry"));
      expect(screen.getAllByTestId(/^bis-hero-row-/).length).toBe(8);

      // Filter by Faction: Horde within Carry (Wukong, Storm Maiden, Wilderness Hunter = 3)
      fireEvent.click(screen.getByTestId("bis-faction-filter-horde"));
      expect(screen.getAllByTestId(/^bis-hero-row-/).length).toBe(3);

      // Search for Wukong
      fireEvent.change(screen.getByTestId("bis-hero-search-input"), {
        target: { value: "Wukong" },
      });
      const wukongRows = screen.getAllByTestId(/^bis-hero-row-/);
      expect(wukongRows.length).toBe(1);
      expect(wukongRows[0].textContent).toMatch(
        /Knight's Glory|Cuồng Chiến|Kỵ Sĩ Vinh Quang|\+80%.*ATK/i
      );
    });
  });

  describe("Suite 5: ShopSafetyFloorWidget (13-Shop Selector, Safety Floor Banner & 3-Bucket Item Priority)", () => {
    it("renders all 13 shops, displays Safety Floor thresholds, and classifies items into Must-Sweep, Surplus-Only, and Forbidden", () => {
      render(
        <ShopSafetyFloorWidget
          article={ARTICLE_7_1_SHOPS_TIER_LIST}
          locale="vi"
          forceUnlockPro={true}
        />
      );

      expect(screen.getByTestId("widget-shop-safety-floor")).toBeDefined();
      expect(screen.getAllByTestId(/^shop-pill-\d+$/).length).toBe(13);

      // Default Shop #1: Arena Shop (1,900-2,000 Arena Stars floor, 600% ROI 50-Star pack, Forbidden 12,000-Star Guardian Skin)
      expect(screen.getByTestId("shop-safety-floor-banner").textContent).toMatch(
        /1,900.*2,000|Arena Stars|Sao Đấu Trường/i
      );
      expect(screen.getByTestId("shop-bucket-must-sweep").textContent).toMatch(
        /600%|300 KC|Soulmancer|Warlock|Pyromancer/i
      );
      expect(screen.getByTestId("shop-bucket-forbidden").textContent).toMatch(
        /12,000|Guardian Skin|Trang Phục/i
      );

      // Switch to Shop #5: Guild Honor / Guild Coin Shop (40,000 Guild Honor / 6,000 Guild Coins Soul Stone floor)
      fireEvent.click(screen.getByTestId("shop-pill-5"));
      expect(screen.getByTestId("shop-safety-floor-banner").textContent).toMatch(
        /40,000.*6,000|Soul Stone|Hồn Đá Đỏ/i
      );

      // Switch to Shop #7: Exchange Shop (12-Star Trait 3 +30% vs 15-Star 500/1,000 shards unlock)
      fireEvent.click(screen.getByTestId("shop-pill-7"));
      expect(screen.getByTestId("shop-safety-floor-banner").textContent).toMatch(
        /12 Sao|15 Sao|500|1,000/i
      );
    });
  });

  describe("Suite 6: GuideArticleRenderer Integration, Dual-Tab Visibility & Consolidated Subsections", () => {
    it("renders all 5 Phase 4 widgets across the 6 target articles, keeps them visible in Core & Data tabs, and consolidates duplicate subsections while preserving TOC #id anchors", () => {
      const cases = [
        {
          article: ARTICLE_1_4_TOP_10_TRAPS,
          widgetTestId: "widget-account-traps-triage",
          consolidatedId: "sub-trap-1",
        },
        {
          article: ARTICLE_2_2_META_LINEUPS,
          widgetTestId: "widget-tactical-formation-board",
          consolidatedId: "sub-1-1-league-starter-transition",
        },
        {
          article: ARTICLE_2_3_FORMATION_COUNTERS,
          widgetTestId: "widget-tactical-formation-board",
          consolidatedId: "sub-4-1-four-arena-swaps",
        },
        {
          article: ARTICLE_4_2_HORDE_PIVOT_ROADMAP,
          widgetTestId: "widget-horde-pivot-stepper",
          consolidatedId: "sub-4-2-zero-loss-pivot-matrix",
        },
        {
          article: ARTICLE_5_2_GOLDEN_GEAR_SETS,
          widgetTestId: "widget-blacksmith-anvil-matrix",
          consolidatedId: "sub-4-2-carry-dps-bis-table",
        },
        {
          article: ARTICLE_7_1_SHOPS_TIER_LIST,
          widgetTestId: "widget-shop-safety-floor",
          consolidatedId: "sub-1-2-thirteen-shops-master-map",
        },
      ] as const;

      for (const item of cases) {
        const { unmount } = render(
          <GuideArticleRenderer article={item.article} locale="vi" />
        );

        const widgetEl = screen.getByTestId(item.widgetTestId);
        expect(widgetEl).toBeDefined();

        // Visible in default "core" tab
        const parentSec = widgetEl.closest("[data-tab-hidden]");
        expect(parentSec?.getAttribute("data-tab-hidden")).toBe("false");

        // Switch to "data" tab -> still visible (Dual-Tab Visibility)
        fireEvent.click(screen.getByTestId("article-tab-data"));
        expect(parentSec?.getAttribute("data-tab-hidden")).toBe("false");

        // Consolidated subsection anchor exists exactly once via widget stub
        const anchorEl = document.getElementById(item.consolidatedId);
        expect(anchorEl).not.toBeNull();
        expect(anchorEl?.getAttribute("data-consolidated-by-widget")).toBe(
          "true"
        );

        unmount();
      }
    });
  });

  describe("Suite 7: Track 3 Phase 3.5 — MD3 Typography, Touch Target >= 44px, iOS Input >= 16px & Single-Layer Containment (Groups 5, 7, 8)", () => {
    it("Task 1: enforces zero sub-12px classes, 16px mobile search input, >= 44px touch targets, and single-layer mobile containment in BlacksmithAnvilMatrixWidget", () => {
      const anvilSource = fs.readFileSync(
        path.resolve(__dirname, "../src/components/guides/widgets/blacksmith-anvil-matrix-widget.tsx"),
        "utf-8"
      );
      expect(anvilSource).not.toMatch(/\btext-\[(?:8|9|10|11)px\]/);
      expect(anvilSource).not.toContain("dark:text-rose-900 dark:text-rose-100/90");

      render(
        <BlacksmithAnvilMatrixWidget
          article={ARTICLE_5_2_GOLDEN_GEAR_SETS}
          locale="vi"
          forceUnlockPro={true}
        />
      );
      const bisSearchInput = screen.getByTestId("bis-hero-search-input");
      expect(bisSearchInput.className).toContain("text-base");
      expect(bisSearchInput.className).toContain("sm:text-sm");
      expect(bisSearchInput.className).toContain("min-h-[44px]");

      expect(screen.getByTestId("bis-role-filter-carry").className).toContain("min-h-[44px]");
      expect(screen.getByTestId("bis-faction-filter-horde").className).toContain("min-h-[44px]");

      expect(screen.getByTestId("anvil-col4-forbidden-banner").className).toContain("border-0");
      expect(screen.getByTestId("anvil-row-knights_glory").className).toContain("border-0");
    });

    it("Task 2: enforces zero sub-12px classes, >= 44px Codex links, horizontal snap-x 13-shop selector, and flat divide-y buckets in ShopSafetyFloorWidget", () => {
      const shopSource = fs.readFileSync(
        path.resolve(__dirname, "../src/components/guides/widgets/shop-safety-floor-widget.tsx"),
        "utf-8"
      );
      expect(shopSource).not.toMatch(/\btext-\[(?:8|9|10|11)px\]/);

      const { container } = render(
        <ShopSafetyFloorWidget
          article={ARTICLE_7_1_SHOPS_TIER_LIST}
          locale="vi"
          forceUnlockPro={true}
        />
      );
      expect(screen.getByTestId("shop-codex-link-shops").className).toContain("min-h-[44px]");
      expect(screen.getByTestId("shop-codex-link-items").className).toContain("min-h-[44px]");
      expect(screen.getByTestId("shop-arch-filter-all").className).toContain("min-h-[44px]");
      expect(screen.getByTestId("shop-pill-1").className).toContain("min-h-[44px]");

      const shopTablist = container.querySelector('[role="tablist"]');
      expect(shopTablist?.className).toContain("overflow-x-auto");
      expect(shopTablist?.className).toContain("snap-x");

      expect(screen.getByTestId("shop-safety-floor-banner").className).toContain("border-0");
      const mustSweepBucket = screen.getByTestId("shop-bucket-must-sweep");
      expect(mustSweepBucket.className).toContain("border-0");
      expect(mustSweepBucket.innerHTML).toContain("divide-y");
    });

    it("Task 3: enforces zero sub-12px classes, 16px mobile search input, >= 44px clear/Codex controls, and unboxed mobile Mode A/B wrappers in MasterDataExplorerWidget", () => {
      const masterSource = fs.readFileSync(
        path.resolve(__dirname, "../src/components/guides/widgets/master-data-explorer-widget.tsx"),
        "utf-8"
      );
      expect(masterSource).not.toMatch(/\btext-\[(?:8|9|10|11)px\]/);

      render(
        <MasterDataExplorerWidget
          article={ARTICLE_8_4_MASTER_DATA_TABLES}
          locale="vi"
          forceUnlockPro={true}
        />
      );
      const masterSearchInput = screen.getByTestId("master-global-search");
      expect(masterSearchInput.className).toContain("text-base");
      expect(masterSearchInput.className).toContain("sm:text-sm");
      expect(masterSearchInput.className).toContain("min-h-[44px]");

      const activeCodexLink = screen.getByTestId("master-active-codex-link");
      expect(activeCodexLink.className).toContain("min-h-[44px]");

      // Mode B wrapper unboxed on mobile
      const modeBWrapper = activeCodexLink.closest("div.space-y-4");
      expect(modeBWrapper?.className).toContain("border-0");

      // Trigger Mode A cross-table search to verify clear buttons & Mode A Codex links >= 44px
      fireEvent.change(masterSearchInput, { target: { value: "780,000" } });
      const clearButtons = screen.getAllByRole("button", {
        name: /Xóa tìm kiếm|Clear search/i,
      });
      expect(clearButtons.length).toBeGreaterThanOrEqual(1);
      for (const btn of clearButtons) {
        expect(btn.className).toContain("min-h-[44px]");
      }
    });
  });

  describe("Suite 8: Track 3 Phase 3.4 — MD3 Typography, Touch Target >= 44px, iOS Input >= 16px & Single-Layer Containment (Groups 1–4)", () => {
    it("enforces zero sub-12px font classes (text-[8px]..text-[11px]) across all 5 Group 1–4 widgets", () => {
      const widgetFiles = [
        "account-traps-triage-widget.tsx",
        "hero-encyclopedia-widget.tsx",
        "tactical-formation-board-widget.tsx",
        "biweekly-calendar-widget.tsx",
        "horde-pivot-stepper-widget.tsx",
      ];

      for (const file of widgetFiles) {
        const filePath = path.resolve(
          __dirname,
          "../src/components/guides/widgets",
          file
        );
        const source = fs.readFileSync(filePath, "utf-8");
        expect(
          source,
          `${file} must not contain sub-12px font classes`
        ).not.toMatch(/\btext-\[(?:8|9|10|11)px\]/);
      }
    });

    it("enforces 16px mobile font size (text-base sm:text-sm) and >= 44px height on all 3 search inputs to prevent iOS Safari auto-zoom", () => {
      const { unmount: u1 } = render(
        <AccountTrapsTriageWidget
          article={ARTICLE_1_4_TOP_10_TRAPS}
          locale="vi"
          forceUnlockPro={true}
        />
      );
      const trapSearchInput = screen.getByTestId("trap-search-input");
      expect(trapSearchInput.className).toContain("text-base");
      expect(trapSearchInput.className).toContain("sm:text-sm");
      expect(trapSearchInput.className).toContain("min-h-[44px]");
      u1();

      const { unmount: u2 } = render(<HeroEncyclopediaWidget locale="vi" />);
      const heroSearchInput = screen.getByTestId("hero-search-input");
      expect(heroSearchInput.className).toContain("text-base");
      expect(heroSearchInput.className).toContain("sm:text-sm");
      expect(heroSearchInput.className).toContain("min-h-[44px]");
      u2();

      const { unmount: u3 } = render(<BiweeklyCalendarWidget locale="vi" />);
      fireEvent.click(screen.getByTestId("calendar-phase-doubledip"));
      const calendarSearchInput = screen.getByTestId("calendar-doubledip-search");
      expect(calendarSearchInput.className).toContain("text-base");
      expect(calendarSearchInput.className).toContain("sm:text-sm");
      expect(calendarSearchInput.className).toContain("min-h-[44px]");
      u3();
    });

    it("enforces >= 44px touch targets on trap-reset-triage and hero-portrait-toggle buttons", () => {
      const { unmount: u1 } = render(
        <AccountTrapsTriageWidget
          article={ARTICLE_1_4_TOP_10_TRAPS}
          locale="vi"
          forceUnlockPro={true}
        />
      );
      fireEvent.click(screen.getByTestId("trap-diagnose-btn-1"));
      expect(screen.getByTestId("trap-reset-triage").className).toContain(
        "min-h-[44px]"
      );
      u1();

      const { unmount: u2 } = render(<HeroEncyclopediaWidget locale="vi" />);
      expect(
        screen.getByTestId("hero-portrait-toggle-pyromancer").className
      ).toContain("min-h-[44px]");
      u2();
    });

    it("enforces Single-Layer Containment on mobile for widget-account-traps-triage, formation-grid-board, calendar-active-day-panel, and pivot-active-stage-panel", () => {
      const { unmount: u0 } = render(
        <AccountTrapsTriageWidget
          article={ARTICLE_1_4_TOP_10_TRAPS}
          locale="vi"
          forceUnlockPro={true}
        />
      );
      const trapsShell = screen.getByTestId("widget-account-traps-triage");
      expect(trapsShell.className).toContain("rounded-none");
      expect(trapsShell.className).toContain("px-0");
      u0();

      const { unmount: u1 } = render(
        <TacticalFormationBoardWidget
          article={ARTICLE_2_2_META_LINEUPS}
          locale="vi"
          forceUnlockPro={true}
        />
      );
      const gridBoard = screen.getByTestId("formation-grid-board");
      expect(gridBoard.className).toContain("border-0");
      expect(gridBoard.className).toContain("p-0");
      u1();

      const { unmount: u2 } = render(<BiweeklyCalendarWidget locale="vi" />);
      const activeDayPanel = screen.getByTestId("calendar-active-day-panel");
      expect(activeDayPanel.className).toContain("border-0");
      u2();

      const { unmount: u3 } = render(
        <HordePivotStepperWidget
          article={ARTICLE_4_2_HORDE_PIVOT_ROADMAP}
          locale="vi"
          forceUnlockPro={true}
        />
      );
      const stagePanel = screen.getByTestId("pivot-active-stage-panel");
      expect(stagePanel.className).toContain("border-0");
      expect(stagePanel.className).toContain("p-0");
      u3();
    });
  });
});

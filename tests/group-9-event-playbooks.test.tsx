import fs from "node:fs";
import path from "node:path";
import React from "react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  EVENT_PLAYBOOKS_DATA,
  getPlaybooksByArticleCode,
  getPlaybookById,
  filterPlaybooksBySeason,
} from "../src/content/guides/event-playbooks-data";
import { EventPlaybookExplorerWidget } from "../src/components/guides/widgets/event-playbook-explorer-widget";
import type { GuideArticle } from "../src/content/guides/types";
import { ARTICLE_3_1_BIWEEKLY_ROTATION } from "../src/content/guides/groups/group-3/3.1-biweekly-rotation";
import { ARTICLE_4_1_PRESEASON_MYTHIC_CALENDAR } from "../src/content/guides/groups/group-4/4.1-preseason-mythic-calendar";
import { ARTICLE_4_3_SEASON_1_TO_4_ROADMAP } from "../src/content/guides/groups/group-4/4.3-season-1-to-4-roadmap";

const PUBLIC_DIR = path.resolve(__dirname, "../public");

const VI_DIACRITIC_REGEX =
  /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỠỲÝỴỶỸĐ]/u;

function assertValidWebpOnDisk(webPath: string, context: string) {
  expect(
    webPath.startsWith("/images/"),
    `${context}: ${webPath} must start with /images/`
  ).toBe(true);
  expect(
    webPath.endsWith(".webp"),
    `${context}: ${webPath} must end with .webp`
  ).toBe(true);
  const diskPath = path.join(PUBLIC_DIR, webPath.replace(/^\//, ""));
  expect(
    fs.existsSync(diskPath),
    `${context}: File does not exist on disk: ${diskPath}`
  ).toBe(true);
  const stat = fs.statSync(diskPath);
  expect(
    stat.size,
    `${context}: WebP file is too small (${stat.size}B)`
  ).toBeGreaterThan(64);
}

function collectEnglishStrings(node: unknown, out: string[] = []): string[] {
  if (!node || typeof node !== "object") return out;
  if (Array.isArray(node)) {
    for (const item of node) collectEnglishStrings(item, out);
    return out;
  }
  const rec = node as Record<string, unknown>;
  if (typeof rec.vi === "string" && typeof rec.en === "string") {
    out.push(rec.en);
    return out;
  }
  for (const val of Object.values(rec)) {
    collectEnglishStrings(val, out);
  }
  return out;
}

describe("Zone II Part 3 — Suite 1: S0 ➔ GAR Event Playbooks SSoT Data (Task 1)", () => {
  it("contains all 10 canonical S0 ➔ GAR events partitioned across articles 9.1, 9.2, and 9.3", () => {
    expect(EVENT_PLAYBOOKS_DATA).toHaveLength(10);

    const a91 = getPlaybooksByArticleCode("9.1");
    const a92 = getPlaybooksByArticleCode("9.2");
    const a93 = getPlaybooksByArticleCode("9.3");

    expect(a91.map((e) => e.id)).toEqual([
      "top-lord",
      "guild-race",
      "guild-arms-race",
    ]);
    expect(a92.map((e) => e.id)).toEqual([
      "treasure-dice-storm-maiden",
      "lucky-wheel",
      "hero-gacha",
    ]);
    expect(a93.map((e) => e.id)).toEqual([
      "butterfly-catching",
      "giant-troll-raid",
      "dark-empire-and-legion",
      "mini-rushes-and-guild-rush",
    ]);
  });

  it("enforces complete 4-Tab data structure, valid disk .webp icons, 3-Tier Budget Matrix, and S/A/F Shop Tier List for every event", () => {
    const englishStrings = collectEnglishStrings(EVENT_PLAYBOOKS_DATA);
    expect(englishStrings.length).toBeGreaterThan(150);
    for (const str of englishStrings) {
      expect(
        VI_DIACRITIC_REGEX.test(str),
        `English string leaked Vietnamese diacritics: ${str}`
      ).toBe(false);
    }

    for (const ev of EVENT_PLAYBOOKS_DATA) {
      assertValidWebpOnDisk(ev.iconPath, `Event[${ev.id}].iconPath`);
      expect(ev.seasons.includes("S0")).toBe(true);
      expect(ev.overview.summary.vi.length).toBeGreaterThan(30);
      expect(ev.overview.summary.en.length).toBeGreaterThan(30);
      expect(ev.overview.carryoverRule.vi.length).toBeGreaterThan(20);
      expect(ev.overview.goldenRule.vi.length).toBeGreaterThan(20);

      expect(ev.hoardingItems.length).toBeGreaterThanOrEqual(3);
      for (const h of ev.hoardingItems) {
        assertValidWebpOnDisk(h.iconPath, `Hoard[${ev.id}:${h.id}].iconPath`);
      }

      expect(ev.dailyStages.length).toBeGreaterThanOrEqual(2);
      expect(ev.economy.budgetTiers.map((t) => t.tierId)).toEqual([
        "f2p",
        "low_mid",
        "whale",
      ]);

      const shopTiers = new Set(ev.economy.shopTierList.map((s) => s.tier));
      expect(shopTiers.has("S")).toBe(true);
      expect(shopTiers.has("A")).toBe(true);
      expect(shopTiers.has("F")).toBe(true);
      for (const sItem of ev.economy.shopTierList) {
        assertValidWebpOnDisk(
          sItem.iconPath,
          `Shop[${ev.id}:${sItem.id}].iconPath`
        );
      }
    }
  });

  it("provides 6 complete Day-by-Day stages for Guild Arms Race (GAR) and Day 27 Storm Maiden Treasure Dice strategy", () => {
    const gar = getPlaybookById("guild-arms-race")!;
    expect(gar).toBeDefined();
    expect(gar.dailyStages).toHaveLength(6);
    expect(gar.dailyStages.map((d) => d.dayNumber)).toEqual([1, 2, 3, 4, 5, 6]);
    expect(JSON.stringify(gar)).toContain("Arms Race Prep");
    expect(JSON.stringify(gar)).toContain("Double Rewards");
    expect(JSON.stringify(gar)).toContain("02:00 UTC");

    const dice = getPlaybookById("treasure-dice-storm-maiden")!;
    expect(dice).toBeDefined();
    expect(JSON.stringify(dice)).toContain("Storm Maiden");
    expect(JSON.stringify(dice)).toContain("27");
    expect(JSON.stringify(dice)).toContain("$0.99");
    expect(JSON.stringify(dice)).toContain("$4.99");

    const s0Events = filterPlaybooksBySeason(EVENT_PLAYBOOKS_DATA, "S0");
    expect(s0Events).toHaveLength(10);
  });
});


describe("Zone II Part 3 — Suite 2: EventPlaybookExplorerWidget 4-Tab & Day Selector UI (Task 2)", () => {
  const mockArticle91 = {
    code: "9.1",
    slug: "s0-major-point-races",
    categorySlug: "event-playbooks",
  } as unknown as GuideArticle;

  const mockArticle92 = {
    code: "9.2",
    slug: "s0-gacha-mythic-banners",
    categorySlug: "event-playbooks",
  } as unknown as GuideArticle;

  it("defaults to Guild Arms Race (GAR) on article 9.1 and switches across all 4 horizontal tabs and 6 GAR days", () => {
    render(<EventPlaybookExplorerWidget article={mockArticle91} locale="vi" />);

    // Default event for 9.1 is guild-arms-race
    expect(
      screen.getByTestId("playbook-active-event-title").textContent
    ).toContain("Guild Arms Race");

    // Tab 1 (overview) active by default
    expect(screen.getByTestId("playbook-panel-overview")).toBeDefined();
    expect(
      screen.getByTestId("playbook-panel-overview").textContent
    ).toContain("Arms Race Prep");

    // Switch to Tab 2 (hoarding)
    fireEvent.click(screen.getByTestId("playbook-tab-hoarding"));
    expect(screen.getByTestId("playbook-panel-hoarding")).toBeDefined();
    expect(
      screen.getByTestId("playbook-panel-hoarding").textContent
    ).toContain("Dragon Essence");

    // Switch to Tab 3 (daily) and test Day 1..6 pills
    fireEvent.click(screen.getByTestId("playbook-tab-daily"));
    expect(screen.getByTestId("playbook-panel-daily")).toBeDefined();
    expect(screen.getByTestId("playbook-day-pill-1")).toBeDefined();
    expect(screen.getByTestId("playbook-day-pill-6")).toBeDefined();

    // Click Day 4 (Hero Development — Storm Maiden dump day!)
    fireEvent.click(screen.getByTestId("playbook-day-pill-4"));
    expect(
      screen.getByTestId("playbook-panel-daily").textContent
    ).toContain("Storm Maiden");

    // Switch to Tab 4 (economy) and verify Pre-buy + 3-Tier Budget + S/A/F Shop
    fireEvent.click(screen.getByTestId("playbook-tab-economy"));
    const econText =
      screen.getByTestId("playbook-panel-economy").textContent ?? "";
    expect(econText).toContain("F2P ($0)");
    expect(econText).toContain("Low-Mid Spender");
    expect(econText).toContain("Whale ($100+)");
    expect(econText).toContain("Tier S");
    expect(econText).toContain("Tier A");
    expect(econText).toContain("Tier F");
  });

  it("defaults to Storm Maiden Treasure Dice on article 9.2, filters by Season, and renders 100% pure English when locale='en'", () => {
    const { container } = render(
      <EventPlaybookExplorerWidget article={mockArticle92} locale="en" />
    );

    expect(
      screen.getByTestId("playbook-active-event-title").textContent
    ).toContain("Storm Maiden");

    // Filter season S0
    fireEvent.click(screen.getByTestId("playbook-season-filter-S0"));

    // Verify 0 Vietnamese diacritics in English render across all 4 tabs
    expect(VI_DIACRITIC_REGEX.test(container.textContent ?? "")).toBe(false);

    fireEvent.click(screen.getByTestId("playbook-tab-hoarding"));
    expect(VI_DIACRITIC_REGEX.test(container.textContent ?? "")).toBe(false);

    fireEvent.click(screen.getByTestId("playbook-tab-daily"));
    expect(VI_DIACRITIC_REGEX.test(container.textContent ?? "")).toBe(false);

    fireEvent.click(screen.getByTestId("playbook-tab-economy"));
    expect(VI_DIACRITIC_REGEX.test(container.textContent ?? "")).toBe(false);
  });
});


describe("Zone II Parts 1 & 2 — Suite 3: 5-Tier Recurring Events (3.1) & Seasonal Event Rosters (4.1, 4.3) (Task 3)", () => {
  it("enriches Part 1 (Article 3.1) with the 5-Tier Recurring Events Master Table (Daily, 4h Hourly, 2-Day Guild Rush & 8 Mini-Rushes, Weekly, Weekend)", () => {
    const sub14 = ARTICLE_3_1_BIWEEKLY_ROTATION.freeSections[0].subSections?.find(
      (s) => s.id === "sub-1-4-five-tier-recurring-events-roster"
    );
    expect(sub14).toBeDefined();
    const raw = JSON.stringify(sub14);
    expect(raw).toContain("00:00 UTC");
    expect(raw).toContain("Guild Rush");
    expect(raw).toContain("Ancient Battlefield");
    expect(raw).toContain("Apex Arena");
  });

  it("enriches Part 2 (Articles 4.1 & 4.3) with the S0 Week-by-Week Schedule (Day 21, Day 27 Storm Maiden, Day 28 GAR) and S0➔S4 Master Event Roster", () => {
    const sub41 = ARTICLE_4_1_PRESEASON_MYTHIC_CALENDAR.freeSections[0].subSections?.find(
      (s) => s.id === "sub-1-3-s0-weekly-event-schedule"
    );
    expect(sub41).toBeDefined();
    const raw41 = JSON.stringify(sub41);
    expect(raw41).toContain("Desert Prince");
    expect(raw41).toContain("Storm Maiden");
    expect(raw41).toContain("Guild Arms Race");

    const sub43 = ARTICLE_4_3_SEASON_1_TO_4_ROADMAP.freeSections[0].subSections?.find(
      (s) => s.id === "sub-1-4-seasonal-event-master-roster"
    );
    expect(sub43).toBeDefined();
    const raw43 = JSON.stringify(sub43);
    expect(raw43).toContain("Dune Devourer");
    expect(raw43).toContain("Behemoth");
    expect(raw43).toContain("Sea Giant");
  });
});


describe("Zone II Part 3 — Suite 4: Group 9 Category, 3 Articles (9.1..9.3) & 3-Part Zone II Architecture (Task 4)", () => {
  it("structures Zone II (zone_events_roadmap) into exactly 3 Categories (events, roadmap, event-playbooks) and validates AST parity for 9.1, 9.2, 9.3", async () => {
    const { GUIDE_ZONES, getCategoryBySlug } = await import(
      "../src/content/guides/registry"
    );
    const { MEDIA_SHOWCASE_BY_CODE } = await import(
      "../src/content/guides/asset-registry"
    );

    const zone2 = GUIDE_ZONES.find((z) => z.id === "zone_events_roadmap");
    expect(zone2).toBeDefined();
    expect(zone2!.categories.map((c) => c.slug)).toEqual([
      "events",
      "roadmap",
      "event-playbooks",
    ]);

    const cat9 = getCategoryBySlug("event-playbooks");
    expect(cat9).toBeDefined();
    expect(cat9!.order).toBe(9);
    expect(cat9!.iconName).toBe("Flame");
    expect(cat9!.articles).toHaveLength(3);
    expect(cat9!.articles.map((a) => a.code)).toEqual(["9.1", "9.2", "9.3"]);

    for (const code of ["MED-9.1-01", "MED-9.2-01", "MED-9.3-01"]) {
      expect(MEDIA_SHOWCASE_BY_CODE[code]).toBeDefined();
      expect(MEDIA_SHOWCASE_BY_CODE[code].length).toBe(6);
    }

    for (const article of cat9!.articles) {
      expect(article.freeSections).toHaveLength(3);
      expect(article.proSections).toHaveLength(2);

      const allSections = [...article.freeSections, ...article.proSections];
      const allBlocks = allSections.flatMap((s) => [
        ...s.blocks,
        ...(s.subSections?.flatMap((sub) => sub.blocks) ?? []),
      ]);

      expect(
        allBlocks.filter(
          (b) =>
            b.type === "widget" && b.widgetType === "event_playbook_explorer"
        )
      ).toHaveLength(1);
      expect(
        allBlocks.filter((b) => b.type === "media_spotlight")
      ).toHaveLength(1);
      expect(
        allBlocks.filter((b) => b.type === "visual_diagram")
      ).toHaveLength(1);
      expect(allBlocks.filter((b) => b.type === "table")).toHaveLength(2);
      expect(allBlocks.filter((b) => b.type === "checklist")).toHaveLength(1);
      expect(allBlocks.filter((b) => b.type === "case_study")).toHaveLength(1);

      const enStrings = collectEnglishStrings(article);
      for (const str of enStrings) {
        expect(
          VI_DIACRITIC_REGEX.test(str),
          `Article ${article.code} EN string has Vietnamese diacritics: ${str}`
        ).toBe(false);
      }
    }
  });
});

import React from "react";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import viMessages from "../messages/vi.json";
import enMessages from "../messages/en.json";
import { HeroEncyclopediaWidget } from "@/components/guides/widgets/hero-encyclopedia-widget";
import { TacticalFormationBoardWidget } from "@/components/guides/widgets/tactical-formation-board-widget";
import { GuideArticleRenderer } from "@/components/guides/guide-article-renderer";
import { ARTICLE_2_1_ENCYCLOPEDIA } from "@/content/guides/groups/group-2/2.1-encyclopedia";
import { ARTICLE_2_2_META_LINEUPS } from "@/content/guides/groups/group-2/2.2-meta-lineups";
import { ARTICLE_2_3_FORMATION_COUNTERS } from "@/content/guides/groups/group-2/2.3-formation-and-counters";
import { ARTICLE_2_4_SHARDS_SKILL_BOOKS } from "@/content/guides/groups/group-2/2.4-shards-and-skill-books";
import { ARTICLE_2_5_EPIC_HERO_TRAITS } from "@/content/guides/groups/group-2/2.5-epic-hero-traits";
import { HERO_VISUAL_PROFILES, getHeroVisualProfile } from "@/content/guides/asset-registry";

let activeMockLocale: "vi" | "en" = "vi";

vi.mock("next-intl", () => ({
  useLocale: () => activeMockLocale,
  useTranslations: () => (key: string, params?: Record<string, unknown>) => {
    if (activeMockLocale === "en") {
      if (key === "readingTime" && params) return `${params.minutes} min read`;
      if (key === "sectionCountLabel" && params) return `${params.count} sections`;
      const enMap = enMessages.Guides as Record<string, string>;
      return enMap[key] ?? key;
    }
    if (key === "readingTime" && params) return `${params.minutes} phút đọc`;
    if (key === "sectionCountLabel" && params) return `${params.count} mục lớn`;
    const viMap = viMessages.Guides as Record<string, string>;
    return viMap[key] ?? key;
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

const VI_DIACRITIC_REGEX =
  /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỠỲÝỴỶỸĐ]/u;

describe("Phase 2 — Group 2 Heroes & Formations Visual Upgrade", () => {
  describe("Suite 1: Task P2.1 — HeroEncyclopediaWidget Visual Upgrade", () => {
    it("populates exclusiveWeaponPath on HERO_VISUAL_PROFILES for key awakenable & mythic heroes", () => {
      expect(HERO_VISUAL_PROFILES["hero-pyromancer"]?.exclusiveWeaponPath).toBe(
        "/images/equipment/exclusive-weapons/equipment_Exclusive001.webp"
      );
      expect(HERO_VISUAL_PROFILES["hero-adjudicator"]?.exclusiveWeaponPath).toBe(
        "/images/equipment/exclusive-weapons/equipment_Exclusive002.webp"
      );
      expect(HERO_VISUAL_PROFILES["hero-wukong"]?.exclusiveWeaponPath).toBe(
        "/images/equipment/exclusive-weapons/equipment_Exclusive006.webp"
      );
      expect(HERO_VISUAL_PROFILES["hero-paragon"]?.exclusiveWeaponPath).toBe(
        "/images/equipment/exclusive-weapons/equipment_Exclusive008.webp"
      );
      expect(HERO_VISUAL_PROFILES["hero-rose-princess"]?.exclusiveWeaponPath).toBe(
        "/images/equipment/exclusive-weapons/equipment_Exclusive009.webp"
      );
      expect(HERO_VISUAL_PROFILES["hero-tidecaller"]?.exclusiveWeaponPath).toBe(
        "/images/equipment/exclusive-weapons/equipment_Exclusive024.webp"
      );
    });

    it("renders faction crest WebP icons in filter pills and 56x56 GameAssetFrame avatars on all 55 hero cards", () => {
      const { container } = render(<HeroEncyclopediaWidget locale="vi" />);

      expect(screen.getByTestId("hero-results-count").textContent).toContain("55");

      const hordeFilter = screen.getByTestId("hero-filter-faction-horde");
      const leagueFilter = screen.getByTestId("hero-filter-faction-league");
      const natureFilter = screen.getByTestId("hero-filter-faction-nature");

      expect(hordeFilter.querySelector("img")?.getAttribute("src")).toBe(
        "/images/factions/race_horde.webp"
      );
      expect(leagueFilter.querySelector("img")?.getAttribute("src")).toBe(
        "/images/factions/race_alliance.webp"
      );
      expect(natureFilter.querySelector("img")?.getAttribute("src")).toBe(
        "/images/factions/race_nature.webp"
      );

      // Verify GUARD-P1-05 (Wukong = 10047 vs Wanderer = 10029) & key hero cards
      const wukongCard = screen.getByTestId("hero-card-wukong");
      expect(
        Array.from(wukongCard.querySelectorAll("img")).some(
          (img) => img.getAttribute("src") === "/images/heroes/avatars/Head_10047.webp"
        )
      ).toBe(true);

      const wandererCard = screen.getByTestId("hero-card-wanderer");
      expect(
        Array.from(wandererCard.querySelectorAll("img")).some(
          (img) => img.getAttribute("src") === "/images/heroes/avatars/Head_10029.webp"
        )
      ).toBe(true);

      const pyroCard = screen.getByTestId("hero-card-pyromancer");
      expect(
        Array.from(pyroCard.querySelectorAll("img")).some(
          (img) => img.getAttribute("src") === "/images/heroes/avatars/Head_10025.webp"
        )
      ).toBe(true);

      // Check GAP-04 lazy loading on all images
      const allImgs = Array.from(container.querySelectorAll("img"));
      // Verify the 4 newly synchronized base heroes (Lilia Maid, Blacksmith, Wizard, Pharmacist)
      expect(getHeroVisualProfile("Blacksmith")?.id).toBe("hero-inventor");
      expect(screen.getByTestId("hero-card-lilia-maid")).toBeDefined();
      expect(screen.getByTestId("hero-card-blacksmith")).toBeDefined();
      expect(screen.getByTestId("hero-card-wizard")).toBeDefined();
      expect(screen.getByTestId("hero-card-pharmacist")).toBeDefined();
      expect(container.textContent).toContain("Đấng Toàn Năng");
      expect(container.textContent).toContain("Thẩm Phán Quan");
      expect(allImgs.length).toBeGreaterThanOrEqual(58);
      for (const img of allImgs) {
        expect(img.getAttribute("loading")).toBe("lazy");
        expect(img.getAttribute("decoding")).toBe("async");
      }
    });

    it("toggles standing Lihui portrait preview independently and renders Exclusive Weapon + Golden Gear + Soul Stone in PRO drawer", () => {
      render(<HeroEncyclopediaWidget locale="vi" />);

      const portraitToggle = screen.getByTestId("hero-portrait-toggle-pyromancer");
      fireEvent.click(portraitToggle);

      const portraitPreview = screen.getByTestId("hero-portrait-preview-pyromancer");
      expect(
        portraitPreview.querySelector("img")?.getAttribute("src")
      ).toBe("/images/heroes/portraits/Lihui_10025.webp");

      // PRO drawer should still be closed after clicking portrait toggle
      expect(screen.queryByTestId("hero-pro-uw-pyromancer")).toBeNull();

      // Now open the PRO MVS drawer on Pyromancer
      const pyroCard = screen.getByTestId("hero-card-pyromancer");
      const proDrawerBtn = Array.from(pyroCard.querySelectorAll("button")).find(
        (btn) => btn !== portraitToggle
      );
      expect(proDrawerBtn).toBeDefined();
      fireEvent.click(proDrawerBtn!);

      const uwBanner = screen.getByTestId("hero-pro-uw-pyromancer");
      expect(
        Array.from(uwBanner.querySelectorAll("img")).some(
          (img) =>
            img.getAttribute("src") ===
            "/images/equipment/exclusive-weapons/equipment_Exclusive001.webp"
        )
      ).toBe(true);

      const gearBanner = screen.getByTestId("hero-pro-gear-pyromancer");
      const gearSrcs = Array.from(gearBanner.querySelectorAll("img")).map((img) =>
        img.getAttribute("src")
      );
      expect(gearSrcs).toContain("/images/equipment/hero-gear/icon_40005.webp");
      expect(gearSrcs).toContain("/images/items/shards/icon_30231.webp");
    });

    it("enforces GAP-01 (zero Vietnamese diacritics in locale='en') and GAP-03 (zero left border stripes)", () => {
      const { container } = render(<HeroEncyclopediaWidget locale="en" />);

      // Open Pyromancer portrait & PRO drawer in English mode
      fireEvent.click(screen.getByTestId("hero-portrait-toggle-pyromancer"));
      const pyroCard = screen.getByTestId("hero-card-pyromancer");
      const buttons = Array.from(pyroCard.querySelectorAll("button"));
      for (const btn of buttons) {
        if (btn.getAttribute("data-testid") !== "hero-portrait-toggle-pyromancer") {
          fireEvent.click(btn);
        }
      }

      expect(VI_DIACRITIC_REGEX.test(container.textContent || "")).toBe(false);
      expect(container.innerHTML).not.toMatch(/border-l-[24]|rounded-l-sm/);
    });
  });

  describe("Suite 2: Task P2.2 — TacticalFormationBoardWidget Visual 2x3 Board & Swaps", () => {
    it("renders faction crests on lineup selector pills and hero avatars in all 6 formation slots", () => {
      render(<TacticalFormationBoardWidget locale="vi" />);

      const leagueStarterPill = screen.getByTestId("formation-lineup-pill-league-starter");
      expect(leagueStarterPill.querySelector("img")?.getAttribute("src")).toBe(
        "/images/factions/race_alliance.webp"
      );

      for (let slotNum = 1; slotNum <= 6; slotNum++) {
        const slotAvatars = screen.getByTestId(`formation-slot-avatars-${slotNum}`);
        const imgs = Array.from(slotAvatars.querySelectorAll("img"));
        expect(imgs.length).toBeGreaterThanOrEqual(1);
      }

      // League Starter Slot 4 is "Paragon / Astrologer" -> overlapping dual-option avatars
      const slot4Avatars = screen.getByTestId("formation-slot-avatars-4");
      const slot4Srcs = Array.from(slot4Avatars.querySelectorAll("img")).map((i) =>
        i.getAttribute("src")
      );
      expect(slot4Srcs).toContain("/images/heroes/avatars/Head_10033.webp");
      expect(slot4Srcs).toContain("/images/heroes/avatars/Head_10024.webp");

      // Inspector shows visual loadout strip with avatar + exclusive weapon + gear set
      const inspectorLoadout = screen.getByTestId("formation-inspector-loadout");
      expect(inspectorLoadout.querySelectorAll("img").length).toBeGreaterThanOrEqual(2);
    });

    it("renders overlapping dual-option avatars for Horde Endgame Slot 6 (Soulmancer / Warlock) and visual Arena Swap row", () => {
      render(<TacticalFormationBoardWidget locale="vi" />);

      fireEvent.click(screen.getByTestId("formation-lineup-pill-horde-endgame"));
      const slot6Avatars = screen.getByTestId("formation-slot-avatars-6");
      const slot6Srcs = Array.from(slot6Avatars.querySelectorAll("img")).map((i) =>
        i.getAttribute("src")
      );
      expect(slot6Srcs).toContain("/images/heroes/avatars/Head_10038.webp");
      expect(slot6Srcs).toContain("/images/heroes/avatars/Head_10028.webp");

      // Switch to Arena Counter-Swaps mode
      fireEvent.click(screen.getByTestId("formation-mode-swaps"));
      const swapVisualRow = screen.getByTestId("arena-swap-visual-row");
      const swapImgs = Array.from(swapVisualRow.querySelectorAll("img"));
      expect(swapImgs.length).toBeGreaterThanOrEqual(2);
    });

    it("enforces GAP-01 (zero Vietnamese diacritics in locale='en') and GAP-03 in both Board and Swaps modes", () => {
      const { container } = render(<TacticalFormationBoardWidget locale="en" />);
      expect(VI_DIACRITIC_REGEX.test(container.textContent || "")).toBe(false);

      fireEvent.click(within(container).getByTestId("formation-mode-swaps"));
      expect(VI_DIACRITIC_REGEX.test(container.textContent || "")).toBe(false);
      expect(container.innerHTML).not.toMatch(/border-l-[24]|rounded-l-sm/);
    });
  });

  describe("Suite 3: Task P2.3 — Group 2 Articles (2.1..2.5) Visual Integration & Regression Guards", () => {
    const group2Articles = [
      ARTICLE_2_1_ENCYCLOPEDIA,
      ARTICLE_2_2_META_LINEUPS,
      ARTICLE_2_3_FORMATION_COUNTERS,
      ARTICLE_2_4_SHARDS_SKILL_BOOKS,
      ARTICLE_2_5_EPIC_HERO_TRAITS,
    ];

    it("renders all 8 Epic Economy Hero avatars in Article 2.5 tables and showcase decks", () => {
      const { container } = render(
        <GuideArticleRenderer article={ARTICLE_2_5_EPIC_HERO_TRAITS} locale="vi" />
      );

      const allImgSrcs = new Set(
        Array.from(container.querySelectorAll("img")).map((img) =>
          img.getAttribute("src")
        )
      );

      const eightEpicHeroAvatars = [
        "/images/heroes/avatars/Head_10016.webp", // Brawler
        "/images/heroes/avatars/Head_10004.webp", // Knight
        "/images/heroes/avatars/Head_10014.webp", // Ranger
        "/images/heroes/avatars/Head_10003.webp", // Minister
        "/images/heroes/avatars/Head_10013.webp", // Priestess
        "/images/heroes/avatars/Head_10005.webp", // Dancer
        "/images/heroes/avatars/Head_10011.webp", // Rogue
        "/images/heroes/avatars/Head_10015.webp", // Outlaw
      ];

      for (const avatarPath of eightEpicHeroAvatars) {
        expect(
          allImgSrcs.has(avatarPath),
          `Expected Article 2.5 to render Epic hero avatar ${avatarPath}`
        ).toBe(true);
      }
    });

    it("enforces GAP-01, GAP-02, GAP-03, and GAP-04 across all 5 Group 2 articles in locale='en'", () => {
      activeMockLocale = "en";
      for (const article of group2Articles) {
        const { container, unmount } = render(
          <GuideArticleRenderer article={article} locale="en" />
        );

        // GAP-01: Zero Vietnamese diacritics in English locale
        expect(
          VI_DIACRITIC_REGEX.test(container.textContent || ""),
          `Article ${article.code} leaked Vietnamese diacritics in locale='en'`
        ).toBe(false);

        // GAP-02: Preserves semantic <code> tags
        expect(container.querySelectorAll("code").length).toBeGreaterThan(0);

        // GAP-03: Zero left border stripes
        expect(container.innerHTML).not.toMatch(/border-l-[24]|rounded-l-sm/);

        // GAP-04: All <img> use native lazy loading
        for (const img of Array.from(container.querySelectorAll("img"))) {
          expect(img.getAttribute("loading")).toBe("lazy");
          expect(img.getAttribute("decoding")).toBe("async");
        }

        unmount();
      }
    });
  });
});

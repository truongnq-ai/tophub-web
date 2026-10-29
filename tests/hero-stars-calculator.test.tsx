import React from "react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import viMessages from "../messages/vi.json";
import enMessages from "../messages/en.json";
import {
  HERO_STAR_RARITY_CONFIGS,
  HERO_STAR_MILESTONES,
  getHeroesByRarity,
  stateToPetalIndex,
  petalIndexToState,
  calculateHeroStarUpgrade,
} from "../src/content/calculators/hero-stars-data";
import { COUNTER_CLOCKWISE_PETAL_ANGLES } from "../src/components/calculators/hero-star-petal-selector";
import { getCalculatorToolBySlug } from "../src/content/calculators/registry";
import { CalculatorPlaceholderView } from "../src/components/calculators/calculator-placeholder-view";

let mockLocale: "vi" | "en" = "vi";

vi.mock("next-intl", () => ({
  useLocale: () => mockLocale,
  useTranslations: (ns?: string) => (key: string, params?: Record<string, unknown>) => {
    const dict = (mockLocale === "en" ? enMessages : viMessages) as unknown as Record<
      string,
      Record<string, string>
    >;
    const raw = (ns ? dict[ns]?.[key] : undefined) ?? key;
    if (!params) return raw;
    return Object.entries(params).reduce(
      (acc, [k, v]) => acc.replace(`{${k}}`, String(v)),
      raw
    );
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
  usePathname: () => "/calculators/heroes/hero-stars",
}));

vi.mock("@/hooks/use-uid-session", () => ({
  useUidSession: () => ({
    activeAccount: null,
    savedAccounts: [],
    selectAccount: vi.fn(),
    logout: vi.fn(),
    isLoaded: true,
  }),
}));

vi.mock("@/actions/comments", () => ({
  getPublicCommentsAction: vi.fn(async () => ({
    success: true,
    data: { items: [], total: 0 },
  })),
  createPublicCommentAction: vi.fn(),
  toggleCommentLikeAction: vi.fn(),
  deleteOwnCommentAction: vi.fn(),
}));

const VI_DIACRITIC_REGEX =
  /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ]/;

describe("Suite 1 — Hero Stars Math Engine & In-Game Terminology (Thiên Phú / Mở khóa)", () => {
  it("computes exact 0★ -> 15★ (5★ Silver) totals for Mythic (1000), Legendary (500), Epic (470 & 500), and Rare (290 & 500)", () => {
    expect(
      calculateHeroStarUpgrade({
        rarity: "mythic",
        fromPetalIndex: 0,
        toPetalIndex: 75,
        ownedShards: 0,
      }).requiredShards
    ).toBe(1000);

    expect(
      calculateHeroStarUpgrade({
        rarity: "legendary",
        fromPetalIndex: 0,
        toPetalIndex: 75,
        ownedShards: 0,
      }).requiredShards
    ).toBe(500);

    expect(
      calculateHeroStarUpgrade({
        rarity: "epic",
        costProfile: "standard",
        fromPetalIndex: 0,
        toPetalIndex: 75,
        ownedShards: 0,
      }).requiredShards
    ).toBe(470);

    expect(
      calculateHeroStarUpgrade({
        rarity: "epic",
        costProfile: "legacy_500",
        fromPetalIndex: 0,
        toPetalIndex: 75,
        ownedShards: 0,
      }).requiredShards
    ).toBe(500);

    expect(
      calculateHeroStarUpgrade({
        rarity: "rare",
        costProfile: "standard",
        fromPetalIndex: 0,
        toPetalIndex: 75,
        ownedShards: 0,
      }).requiredShards
    ).toBe(290);

    expect(
      calculateHeroStarUpgrade({
        rarity: "rare",
        costProfile: "legacy_500",
        fromPetalIndex: 0,
        toPetalIndex: 75,
        ownedShards: 0,
      }).requiredShards
    ).toBe(500);
  });

  it("solves the Desert Prince (Hoàng Tử Sa Mạc) benchmark and uses 'Mở khóa' & 'Thiên Phú' terminology in milestones", () => {
    const fromStep6 = stateToPetalIndex("gold", 1, 1);
    const fromStep7 = stateToPetalIndex("gold", 1, 2);
    const to1Silver = stateToPetalIndex("silver", 1, 0);

    expect(fromStep6).toBe(6);
    expect(fromStep7).toBe(7);
    expect(to1Silver).toBe(55);

    const resStep6 = calculateHeroStarUpgrade({
      rarity: "mythic",
      fromPetalIndex: fromStep6,
      toPetalIndex: to1Silver,
      ownedShards: 100,
    });
    expect(resStep6.alreadyInvestedShards).toBe(12);
    expect(resStep6.targetCumulativeShards).toBe(560);
    expect(resStep6.requiredShards).toBe(548);
    expect(resStep6.missingShards).toBe(448);
    expect(resStep6.starStepsBreakdown.length).toBe(10);

    // Terminology verification: uses "Mở khóa" & "Thiên Phú", never "Điểm Gãy Vàng"
    expect(HERO_STAR_MILESTONES[11].vi).toContain("Mở khóa");
    expect(HERO_STAR_MILESTONES[11].vi).toContain("Thiên Phú");
    expect(HERO_STAR_MILESTONES[11].vi).not.toContain("Điểm Gãy Vàng");
  });

  it("handles round-trip petalIndex <-> Star/Petal state, boundary clamping at 75, and invalid range (fromPetal >= toPetal) safely", () => {
    for (let i = 0; i <= 75; i++) {
      const state = petalIndexToState(i);
      const roundTrip = stateToPetalIndex(
        state.tier,
        state.starsInTier,
        state.petalsInNextStar
      );
      expect(roundTrip).toBe(i);
    }

    expect(stateToPetalIndex("silver", 5, 3)).toBe(75);
    expect(stateToPetalIndex("none", 2, 3)).toBe(0);

    const invalidRes = calculateHeroStarUpgrade({
      rarity: "mythic",
      fromPetalIndex: 60,
      toPetalIndex: 40,
      ownedShards: 50,
    });
    expect(invalidRes.isInvalidRange).toBe(true);
    expect(invalidRes.requiredShards).toBe(0);
    expect(invalidRes.missingShards).toBe(0);
    expect(invalidRes.starStepsBreakdown).toHaveLength(0);
  });

  it("provides valid representative heroes for all 4 rarities with zero Vietnamese diacritics in English names", () => {
    const rarities = ["mythic", "legendary", "epic", "rare"] as const;
    for (const r of rarities) {
      const list = getHeroesByRarity(r);
      expect(list.length).toBeGreaterThan(0);
      expect(
        list.some((h) => h.id === HERO_STAR_RARITY_CONFIGS[r].defaultHeroId)
      ).toBe(true);
      for (const h of list) {
        expect(VI_DIACRITIC_REGEX.test(h.nameEn)).toBe(false);
        expect(h.iconPath.startsWith("/images/heroes/")).toBe(true);
      }
    }
  });
});

describe("Suite 2 — Compact v2.1 UI: 15 Integrated 5-Petal Stars, 12h Top CCW [0, 288, 216, 144, 72], Slider +/- Ends & [i] Breakdown", () => {
  beforeEach(() => {
    mockLocale = "vi";
  });

  it("starts Petal 1 at 12h Top (0°) and progresses counter-clockwise [0, 288, 216, 144, 72]", () => {
    expect(COUNTER_CLOCKWISE_PETAL_ANGLES).toEqual([0, 288, 216, 144, 72]);
  });

  it("renders 15 integrated 5-petal stars directly on the bar, +/- buttons at slider ends, single Hero Name under Central Avatar, and [i] Breakdown", () => {
    const resolved = getCalculatorToolBySlug("heroes", "hero-stars")!;
    expect(resolved.tool.status).toBe("ready");

    render(
      <CalculatorPlaceholderView
        mode="tool"
        zone={resolved.zone}
        category={resolved.category}
        tool={resolved.tool}
      />
    );

    expect(screen.getByTestId("hero-stars-calculator")).toBeDefined();

    // 1. Hero Name is displayed ONLY ONCE on the page, directly under the Central Avatar
    expect(screen.getByTestId("central-hero-name").textContent).toBe(
      "Hoàng Tử Sa Mạc"
    );
    expect(screen.getAllByText("Hoàng Tử Sa Mạc")).toHaveLength(1);

    // 2. Integrated 5-petal stars on the 15-star track:
    // At default fromPetalIndex = 6 (1★ Gold + 1 Petal of Star 2):
    // Star 1 has 5 lit petals, Star 2 has 1 lit petal, Star 3 has 0 lit petals
    expect(
      screen.getByTestId("from-milestone-star-1").getAttribute("data-lit-petals")
    ).toBe("5");
    expect(
      screen.getByTestId("from-milestone-star-2").getAttribute("data-lit-petals")
    ).toBe("1");
    expect(
      screen.getByTestId("from-milestone-star-3").getAttribute("data-lit-petals")
    ).toBe("0");

    // 3. Click + button at the end of the slider bar (step 6 -> step 7 => Star 2 now has 2 lit petals, required = 546)
    fireEvent.click(screen.getByTestId("from-petal-plus-btn"));
    expect(
      screen.getByTestId("from-milestone-star-2").getAttribute("data-lit-petals")
    ).toBe("2");
    expect(
      screen.getByTestId("hero-stars-total-required").textContent
    ).toContain("546");

    // 4. Click on 15-Star Milestone Bar (target star 12 = 2★ Silver = 60 petals)
    fireEvent.click(screen.getByTestId("to-milestone-star-12"));
    expect(
      screen.getByTestId("hero-stars-total-required").textContent
    ).toContain("586");

    // 5. Star Breakdown hidden by default, shows updated 'Mở khóa' & 'Thiên Phú' wording when [i] clicked
    expect(screen.queryByTestId("star-breakdown-popover")).toBeNull();
    fireEvent.click(screen.getByTestId("toggle-star-breakdown-btn"));
    const popover = screen.getByTestId("star-breakdown-popover");
    expect(popover.textContent).toContain("Mở khóa");
    expect(popover.textContent).toContain("Thiên Phú");
    expect(popover.textContent).not.toContain("Điểm Gãy Vàng");
  });

  it("renders 100% pure English without any Vietnamese diacritics when locale='en' (including open popovers)", () => {
    mockLocale = "en";
    const resolved = getCalculatorToolBySlug("heroes", "hero-stars")!;

    const { container } = render(
      <CalculatorPlaceholderView
        mode="tool"
        zone={resolved.zone}
        category={resolved.category}
        tool={resolved.tool}
      />
    );

    expect(screen.getByTestId("hero-stars-calculator")).toBeDefined();
    expect(container.textContent ?? "").not.toMatch(VI_DIACRITIC_REGEX);

    fireEvent.click(screen.getByTestId("central-hero-avatar-trigger"));
    fireEvent.click(screen.getByTestId("toggle-star-breakdown-btn"));
    expect(container.textContent ?? "").not.toMatch(VI_DIACRITIC_REGEX);
  });
});

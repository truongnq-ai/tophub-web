import React from "react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import viMessages from "../messages/vi.json";
import enMessages from "../messages/en.json";
import {
  HERO_STAR_RARITY_CONFIGS,
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

describe("Suite 1 — Hero Stars Math Engine (15 Stars x 5 Petals = 75 Steps SSoT)", () => {
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

  it("solves the Desert Prince (Hoàng Tử Sa Mạc) benchmark from 1★ Gold + 1 Petal (step 6) and 1★ Gold + 2 Petals (step 7) to 1★ Silver (step 55)", () => {
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

    const resStep7 = calculateHeroStarUpgrade({
      rarity: "mythic",
      fromPetalIndex: fromStep7,
      toPetalIndex: to1Silver,
      ownedShards: 0,
    });
    expect(resStep7.alreadyInvestedShards).toBe(14);
    expect(resStep7.requiredShards).toBe(546);
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

describe("Suite 2 — Compact v2.0 UI: Central Avatar Sequential Picker, 15-Star Bar, CCW Petals & [i] Breakdown", () => {
  beforeEach(() => {
    mockLocale = "vi";
  });

  it("orders star petals counter-clockwise [288, 216, 144, 72, 0] matching in-game progression", () => {
    expect(COUNTER_CLOCKWISE_PETAL_ANGLES).toEqual([288, 216, 144, 72, 0]);
  });

  it("renders Central Hero Avatar between X and Y with single Hero Name occurrence, supports sequential Rarity -> Hero selection that auto-hides, and toggles Star Breakdown via [i] icon", () => {
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

    // Sequential picker is closed initially
    expect(screen.queryByTestId("hero-sequential-picker")).toBeNull();

    // 2. Click Central Avatar -> Opens Step 1 (Select Rarity)
    fireEvent.click(screen.getByTestId("central-hero-avatar-trigger"));
    expect(screen.getByTestId("hero-sequential-picker")).toBeDefined();
    expect(screen.getByTestId("rarity-card-mythic")).toBeDefined();
    expect(screen.getByTestId("rarity-card-legendary")).toBeDefined();
    expect(screen.getByTestId("rarity-card-epic")).toBeDefined();
    expect(screen.getByTestId("rarity-card-rare")).toBeDefined();

    // 3. Click Epic Rarity -> Advances to Step 2 (Select Hero for Epic)
    fireEvent.click(screen.getByTestId("rarity-card-epic"));
    const brawlerBtn = screen.getByTestId("select-hero-hero-brawler");
    expect(brawlerBtn).toBeDefined();

    // 4. Click Hero Avatar -> Selects hero and automatically hides the picker!
    fireEvent.click(brawlerBtn);
    expect(screen.queryByTestId("hero-sequential-picker")).toBeNull();
    expect(
      screen.getByTestId("hero-stars-universal-shard-name").textContent
    ).toContain("Mảnh Vạn Năng Anh Hùng Tím");

    // Switch back to Mythic -> Desert Prince to test 15-star bar & [i] breakdown
    fireEvent.click(screen.getByTestId("central-hero-avatar-trigger"));
    fireEvent.click(screen.getByTestId("rarity-card-mythic"));
    fireEvent.click(screen.getByTestId("select-hero-hero-desert-prince"));
    expect(screen.queryByTestId("hero-sequential-picker")).toBeNull();

    // Default state: 1★ Gold + 1 Petal (6) -> 1★ Silver (55) = 548 shards
    expect(
      screen.getByTestId("hero-stars-total-required").textContent
    ).toContain("548");

    // 5. Stepper +1 petal on Current Star (X: step 6 -> step 7 => 546 shards)
    fireEvent.click(screen.getByTestId("from-petal-plus-btn"));
    expect(
      screen.getByTestId("hero-stars-total-required").textContent
    ).toContain("546");

    // 6. Click on 15-Star Milestone Bar (e.g. target star 12 = 2★ Silver = 60 petals)
    fireEvent.click(screen.getByTestId("to-milestone-star-12"));
    expect(
      screen.getByTestId("hero-stars-total-required").textContent
    ).toContain("586"); // 600 - 14 = 586

    // 7. Inventory input: 186 owned -> 400 missing
    const ownedInput = screen.getByTestId("hero-stars-owned-input");
    fireEvent.change(ownedInput, { target: { value: "186" } });
    expect(
      screen.getByTestId("hero-stars-missing-value").textContent
    ).toContain("400");

    // 8. Star Breakdown is hidden by default, shown only when clicking [i] icon next to result
    expect(screen.queryByTestId("star-breakdown-popover")).toBeNull();
    fireEvent.click(screen.getByTestId("toggle-star-breakdown-btn"));
    expect(screen.getByTestId("star-breakdown-popover")).toBeDefined();
    fireEvent.click(screen.getByTestId("close-star-breakdown-btn"));
    expect(screen.queryByTestId("star-breakdown-popover")).toBeNull();
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

    // Open both Avatar Picker and Breakdown Popover in English to verify 0 diacritics
    fireEvent.click(screen.getByTestId("central-hero-avatar-trigger"));
    fireEvent.click(screen.getByTestId("toggle-star-breakdown-btn"));
    expect(container.textContent ?? "").not.toMatch(VI_DIACRITIC_REGEX);
  });
});

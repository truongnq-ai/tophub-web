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

describe("Suite 2 — HeroStarsCalculator Interactive UI & Bilingual Purity", () => {
  beforeEach(() => {
    mockLocale = "vi";
  });

  it("renders the interactive calculator for 1.1 hero-stars with 4 Rarity Cards, SVG Petal Wheels, Inventory input, and Star Breakdown table", () => {
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
    expect(screen.getByTestId("rarity-card-mythic")).toBeDefined();
    expect(screen.getByTestId("rarity-card-legendary")).toBeDefined();
    expect(screen.getByTestId("rarity-card-epic")).toBeDefined();
    expect(screen.getByTestId("rarity-card-rare")).toBeDefined();

    // Default state solves Desert Prince benchmark (1★ Gold + 1 Petal -> 1★ Silver = 548 shards)
    expect(
      screen.getByTestId("hero-stars-total-required").textContent
    ).toContain("548");

    // Stepper +1 petal on Current Star (X: step 6 -> step 7 => 546 shards)
    fireEvent.click(screen.getByTestId("from-petal-plus-btn"));
    expect(
      screen.getByTestId("hero-stars-total-required").textContent
    ).toContain("546");

    // Enter owned shards in inventory input (146 owned -> 400 missing)
    const ownedInput = screen.getByTestId("hero-stars-owned-input");
    fireEvent.change(ownedInput, { target: { value: "146" } });
    expect(
      screen.getByTestId("hero-stars-missing-value").textContent
    ).toContain("400");

    // Switch rarity to Epic (Tướng Tím -> Võ Sĩ / Đấu Sĩ)
    fireEvent.click(screen.getByTestId("rarity-card-epic"));
    expect(
      screen.getByTestId("hero-stars-universal-shard-name").textContent
    ).toContain("Mảnh Vạn Năng Anh Hùng Tím");
  });

  it("renders 100% pure English without any Vietnamese diacritics when locale='en'", () => {
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
  });
});

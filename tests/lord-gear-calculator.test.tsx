import React from "react";
import { describe, expect, it, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import viMessages from "../messages/vi.json";
import enMessages from "../messages/en.json";
import { getCalculatorToolBySlug } from "../src/content/calculators/registry";
import { CalculatorPlaceholderView } from "../src/components/calculators/calculator-placeholder-view";
import {
  LordGearUpgradeCalculator,
  LORD_GEAR_SHARED_STORAGE_KEY,
} from "../src/components/calculators/lord-gear-upgrade-calculator";
import { LordGearResonanceCalculator } from "../src/components/calculators/lord-gear-resonance-calculator";
import {
  findMonoElementsWithVietnamese,
  findMicroTextElements,
  VI_DIACRITIC_REGEX,
} from "./utils/md3-audit";

let mockLocale: "vi" | "en" = "vi";
const mockPathname = vi.fn(() => "/calculators/lord-gear/lord-gear-upgrade");

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
    onClick,
    ...rest
  }: {
    href: string;
    children: React.ReactNode;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  }) => (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        onClick?.(e);
      }}
      {...rest}
    >
      {children}
    </a>
  ),
  usePathname: () => mockPathname(),
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    prefetch: vi.fn(),
    refresh: vi.fn(),
  }),
}));

describe("5.1 & 5.2 Lord Gear Calculators — Suite 1: 5.1 LordGearUpgradeCalculator Interactive Features", () => {
  const resolved51 = getCalculatorToolBySlug("lord-gear", "lord-gear-upgrade")!;

  beforeEach(() => {
    mockLocale = "vi";
    mockPathname.mockReturnValue("/calculators/lord-gear/lord-gear-upgrade");
    window.localStorage.clear();
  });

  it("renders 6 interactive slot cards, 4 material summary cards, and GAR/KvK discipline tip", () => {
    render(
      <LordGearUpgradeCalculator
        zone={resolved51.zone}
        category={resolved51.category}
        tool={resolved51.tool}
        locale="vi"
      />
    );

    expect(screen.getByTestId("lord-gear-upgrade-calculator")).toBeDefined();

    // 6 slot cards
    expect(screen.getByTestId("lord-gear-slot-nature_shield")).toBeDefined();
    expect(screen.getByTestId("lord-gear-slot-league_crown")).toBeDefined();
    expect(screen.getByTestId("lord-gear-slot-horde_spear")).toBeDefined();
    expect(screen.getByTestId("lord-gear-slot-nature_totem")).toBeDefined();
    expect(screen.getByTestId("lord-gear-slot-league_ring")).toBeDefined();
    expect(screen.getByTestId("lord-gear-slot-horde_collar")).toBeDefined();

    // 4 material summary cards
    expect(screen.getByTestId("material-card-refinedMetal")).toBeDefined();
    expect(screen.getByTestId("material-card-magicThread")).toBeDefined();
    expect(screen.getByTestId("material-card-orichalcum")).toBeDefined();
    expect(screen.getByTestId("material-card-dragonBlood")).toBeDefined();

    // Event discipline tip box
    expect(
      screen.getByText(/Đua Vũ Trang \(GAR\) & KvK/i)
    ).toBeDefined();
    expect(
      screen.getByText(/Tuyệt đối KHÔNG xả vào Thứ Bảy/i)
    ).toBeDefined();
  });

  it("applies batch upgrade to target scope (e.g. League faction) and updates costs accordingly", () => {
    render(
      <LordGearUpgradeCalculator
        zone={resolved51.zone}
        category={resolved51.category}
        tool={resolved51.tool}
        locale="vi"
      />
    );

    // Select League scope
    const scopeSelect = screen.getByTestId("batch-scope-select") as HTMLSelectElement;
    fireEvent.change(scopeSelect, { target: { value: "league" } });

    // Set batch toLevel = 33 (Epic 0★)
    const toSelect = screen.getByTestId("batch-to-select") as HTMLSelectElement;
    fireEvent.change(toSelect, { target: { value: "33" } });

    // Click Batch Apply
    const applyBtn = screen.getByTestId("batch-apply-btn");
    fireEvent.click(applyBtn);

    // Verify league_crown and league_ring updated to level 33
    const crownTo = screen.getByTestId("slot-league_crown-to-select") as HTMLSelectElement;
    expect(crownTo.value).toBe("33");

    const ringTo = screen.getByTestId("slot-league_ring-to-select") as HTMLSelectElement;
    expect(ringTo.value).toBe("33");

    // Other factions (e.g. nature_shield) remain unchanged
    const shieldTo = screen.getByTestId("slot-nature_shield-to-select") as HTMLSelectElement;
    expect(shieldTo.value).toBe("4");
  });

  it("evaluates inventory sufficiency and dynamically updates the readiness badge", () => {
    render(
      <LordGearUpgradeCalculator
        zone={resolved51.zone}
        category={resolved51.category}
        tool={resolved51.tool}
        locale="vi"
      />
    );

    // Provide sufficient materials (metal, thread, and orichalcum for level 6) -> sufficient
    const metalInput = screen.getByTestId("owned-input-refinedMetal");
    fireEvent.change(metalInput, { target: { value: "200000" } });
    const threadInput = screen.getByTestId("owned-input-magicThread");
    fireEvent.change(threadInput, { target: { value: "2000" } });
    const orichalcumInput = screen.getByTestId("owned-input-orichalcum");
    fireEvent.change(orichalcumInput, { target: { value: "100" } });

    const badge = screen.getByTestId("lord-gear-sufficiency-badge");
    expect(badge.textContent).toContain("Đủ nguyên liệu");

    // Clear owned metal to 0 -> should become insufficient
    fireEvent.change(metalInput, { target: { value: "0" } });

    const updatedBadge = screen.getByTestId("lord-gear-sufficiency-badge");
    expect(updatedBadge.textContent).toContain("Đang thiếu nguyên liệu");
  });

  it("toggles extended mode to reveal the Sacred Tome card and allow levels up to 166", () => {
    render(
      <LordGearUpgradeCalculator
        zone={resolved51.zone}
        category={resolved51.category}
        tool={resolved51.tool}
        locale="vi"
      />
    );

    // Sacred tome card initially hidden
    expect(screen.queryByTestId("lord-gear-sacred-tome-card")).toBeNull();

    // Toggle extended mode
    const toggleBtn = screen.getByTestId("lord-gear-toggle-extended-btn");
    fireEvent.click(toggleBtn);

    // Sacred tome card now visible
    expect(screen.getByTestId("lord-gear-sacred-tome-card")).toBeDefined();

    // Slot select now includes level 166
    const crownTo = screen.getByTestId("slot-league_crown-to-select");
    expect(crownTo.textContent).toContain("Lv.166");
  });

  it("persists slot levels to localStorage under tophub_calc_lord_gear_shared_v1", () => {
    render(
      <LordGearUpgradeCalculator
        zone={resolved51.zone}
        category={resolved51.category}
        tool={resolved51.tool}
        locale="vi"
      />
    );

    const raw = window.localStorage.getItem(LORD_GEAR_SHARED_STORAGE_KEY);
    expect(raw).not.toBeNull();
    const parsed = JSON.parse(raw!);
    expect(parsed.currentLevels).toHaveProperty("league_crown");
    expect(parsed.currentLevels.league_crown).toBe(3);
  });
});

describe("5.1 & 5.2 Lord Gear Calculators — Suite 2: 5.2 LordGearResonanceCalculator & Mastery Table", () => {
  const resolved52 = getCalculatorToolBySlug("lord-gear", "lord-gear-resonance")!;

  beforeEach(() => {
    mockLocale = "vi";
    mockPathname.mockReturnValue("/calculators/lord-gear/lord-gear-resonance");
    window.localStorage.clear();
  });

  it("renders Faction selector, active 3pc/6pc mastery resonance cards, and staggered cycle plan", () => {
    render(
      <LordGearResonanceCalculator
        zone={resolved52.zone}
        category={resolved52.category}
        tool={resolved52.tool}
        locale="vi"
      />
    );

    expect(screen.getAllByText(/Cộng Hưởng 3 Món/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Cộng Hưởng 6 Món/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/Chu Trình Lệch Pha 4 Bước/i)).toBeDefined();
    expect(screen.getAllByText(/Tổng Quan Thuộc Tính Bậc Thầy/i).length).toBeGreaterThanOrEqual(1);
  });

  it("syncs levels from localStorage snapshot saved by 5.1", () => {
    // Seed localStorage with custom levels
    window.localStorage.setItem(
      LORD_GEAR_SHARED_STORAGE_KEY,
      JSON.stringify({
        currentLevels: {
          nature_shield: 10,
          league_crown: 11,
          horde_spear: 14,
          nature_totem: 10,
          league_ring: 11,
          horde_collar: 14,
        },
      })
    );

    render(
      <LordGearResonanceCalculator
        zone={resolved52.zone}
        category={resolved52.category}
        tool={resolved52.tool}
        locale="vi"
      />
    );

    // Initial mount syncs from localStorage
    expect(screen.getByText(/Món thứ 3:/i)).toBeDefined();
    expect(screen.getByText(/Món thấp nhất:/i)).toBeDefined();
  });
});

describe("5.1 & 5.2 Lord Gear Calculators — Suite 3: Routing & Mount via CalculatorPlaceholderView", () => {
  const resolved51 = getCalculatorToolBySlug("lord-gear", "lord-gear-upgrade")!;
  const resolved52 = getCalculatorToolBySlug("lord-gear", "lord-gear-resonance")!;

  beforeEach(() => {
    mockLocale = "vi";
  });

  it("mounts LordGearUpgradeCalculator when tool.slug is lord-gear-upgrade", () => {
    render(
      <CalculatorPlaceholderView
        mode="tool"
        zone={resolved51.zone}
        category={resolved51.category}
        tool={resolved51.tool}
      />
    );

    expect(screen.getByTestId("lord-gear-upgrade-calculator")).toBeDefined();
    expect(screen.queryByTestId("calculator-example-preview")).toBeNull();
  });

  it("mounts LordGearResonanceCalculator when tool.slug is lord-gear-resonance", () => {
    render(
      <CalculatorPlaceholderView
        mode="tool"
        zone={resolved52.zone}
        category={resolved52.category}
        tool={resolved52.tool}
      />
    );

    expect(screen.getByText(/Chu Trình Lệch Pha 4 Bước/i)).toBeDefined();
    expect(screen.queryByTestId("calculator-example-preview")).toBeNull();
  });
});

describe("5.1 & 5.2 Lord Gear Calculators — Suite 4: MD3 Compliance & Bilingual Purity (AC-CALC-05)", () => {
  const resolved51 = getCalculatorToolBySlug("lord-gear", "lord-gear-upgrade")!;
  const resolved52 = getCalculatorToolBySlug("lord-gear", "lord-gear-resonance")!;

  it("complies with Zero Sub-12px and No-Mono-On-Vietnamese rules in Vietnamese DOM", () => {
    mockLocale = "vi";
    const { container: container51 } = render(
      <LordGearUpgradeCalculator
        zone={resolved51.zone}
        category={resolved51.category}
        tool={resolved51.tool}
        locale="vi"
      />
    );

    expect(findMicroTextElements(container51)).toEqual([]);
    expect(findMonoElementsWithVietnamese(container51)).toEqual([]);

    const { container: container52 } = render(
      <LordGearResonanceCalculator
        zone={resolved52.zone}
        category={resolved52.category}
        tool={resolved52.tool}
        locale="vi"
      />
    );

    expect(findMicroTextElements(container52)).toEqual([]);
    expect(findMonoElementsWithVietnamese(container52)).toEqual([]);
  });

  it("maintains 100% pure English DOM with zero Vietnamese diacritics when locale='en' (AC-CALC-05)", () => {
    mockLocale = "en";
    const { container: container51 } = render(
      <LordGearUpgradeCalculator
        zone={resolved51.zone}
        category={resolved51.category}
        tool={resolved51.tool}
        locale="en"
      />
    );

    const text51 = container51.textContent ?? "";
    const matches51 = text51.match(VI_DIACRITIC_REGEX);
    expect(matches51).toBeNull();

    const { container: container52 } = render(
      <LordGearResonanceCalculator
        zone={resolved52.zone}
        category={resolved52.category}
        tool={resolved52.tool}
        locale="en"
      />
    );

    const text52 = container52.textContent ?? "";
    const matches52 = text52.match(VI_DIACRITIC_REGEX);
    expect(matches52).toBeNull();
  });
});

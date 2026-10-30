import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ExclusiveWeaponCalculator } from "../exclusive-weapon-calculator";
import { getCalculatorToolBySlug } from "@/content/calculators/registry";
import {
  VI_DIACRITIC_REGEX,
  countMicroTextOccurrences,
  findMicroTextElements,
  findMonoElementsWithVietnamese,
  getMaxBorderedContainerDepth,
  readSource,
} from "../../../../tests/utils/md3-audit";

describe("4.3 Vũ Khí Độc Quyền — v2.0 4-Zone Architecture, 2-Step Avatar Picker, 4 Gold + 1 Red Star & K/M Resources", () => {
  const resolved = getCalculatorToolBySlug("hero-gear", "exclusive-weapon")!;
  const tool = resolved.tool;

  it("renders the 4 symmetrical v2.0 zones with single-entity (×1) default and zero multiplier buttons or TỪ/ĐẾN badges", () => {
    const { container } = render(
      <ExclusiveWeaponCalculator tool={tool} locale="vi" />
    );

    expect(
      screen.getByRole("heading", { level: 1, name: /Vũ Khí Độc Quyền/i })
    ).toBeDefined();

    // 4 Core v2.0 Zones exist
    expect(screen.getByTestId("ew-zone-current")).toBeDefined();
    expect(screen.getByTestId("ew-zone-avatar")).toBeDefined();
    expect(screen.getByTestId("ew-zone-target")).toBeDefined();
    expect(screen.getByTestId("exclusive-weapon-kpi-card")).toBeDefined();

    // Old multiplier buttons and steppers are completely removed (Rule R1)
    expect(screen.queryByTestId("hero-preset-1")).toBeNull();
    expect(screen.queryByTestId("hero-preset-2")).toBeNull();
    expect(screen.queryByTestId("hero-preset-3")).toBeNull();
    expect(screen.queryByTestId("hero-preset-6")).toBeNull();
    expect(screen.queryByTestId("hero-count-minus")).toBeNull();
    expect(screen.queryByTestId("hero-count-plus")).toBeNull();

    // Clean labels without (X), (Y), TỪ, ĐẾN (Rule R4)
    expect(screen.getByText("Trạng Thái Hiện Tại")).toBeDefined();
    expect(screen.getByText("Trạng Thái Mục Tiêu")).toBeDefined();
    expect(screen.getByText("Cấp Hiện Tại")).toBeDefined();
    expect(screen.getByText("Cấp Mục Tiêu")).toBeDefined();
    expect(screen.queryByText("TỪ")).toBeNull();
    expect(screen.queryByText("ĐẾN")).toBeNull();
    expect(container.textContent ?? "").not.toContain("(X)");
    expect(container.textContent ?? "").not.toContain("(Y)");

    // Default Lv.0 -> Lv.20 (1.19K / 1,185 Shards) and 0★ -> 5★ (920 Cores)
    expect(screen.getByTestId("ew-total-shards").textContent).toBe("1.19K");
    expect(screen.getByTestId("ew-total-shards").getAttribute("title")).toBe(
      "1,185"
    );
    expect(screen.getByTestId("ew-total-cores").textContent).toBe("920");
  });

  it("opens 2-step sequential Avatar Picker (Step 1: Faction ➔ Step 2: Hero & Weapon) and auto-closes on selection", () => {
    render(<ExclusiveWeaponCalculator tool={tool} locale="vi" />);

    const avatarBtn = screen.getByTestId("ew-central-avatar-btn");
    expect(screen.queryByTestId("ew-avatar-picker-popover")).toBeNull();

    // Click central Avatar -> opens Step 1 (Choose Faction)
    fireEvent.click(avatarBtn);
    expect(screen.getByTestId("ew-avatar-picker-popover")).toBeDefined();
    expect(screen.getByTestId("ew-faction-league")).toBeDefined();
    expect(screen.getByTestId("ew-faction-nature")).toBeDefined();
    expect(screen.getByTestId("ew-faction-horde")).toBeDefined();

    // Click Nature faction -> transitions to Step 2 (Choose Hero in Nature)
    fireEvent.click(screen.getByTestId("ew-faction-nature"));
    expect(screen.getByTestId("ew-picker-back-to-faction")).toBeDefined();
    expect(screen.getByTestId("ew-hero-tidecaller")).toBeDefined();

    // Test back button to Step 1, then select Horde -> Desert Prince
    fireEvent.click(screen.getByTestId("ew-picker-back-to-faction"));
    fireEvent.click(screen.getByTestId("ew-faction-horde"));
    fireEvent.click(screen.getByTestId("ew-hero-desert_prince"));

    // Popover auto-closes and updates central Avatar to Desert Prince (Loan Đao Cát Cháy)
    expect(screen.queryByTestId("ew-avatar-picker-popover")).toBeNull();
    expect(screen.getAllByText(/Loan Đao Cát Cháy/i).length).toBeGreaterThan(0);
    expect(
      screen.getAllByText(/Desert Prince \(Hoàng Tử Sa Mạc\)/i).length
    ).toBeGreaterThan(0);
  });

  it("updates required Shards & Cores when selecting Level chips, 4 Gold + 1 Red Stars, Petals (1/5–5/5), and Core Profile (920 vs 2,385)", () => {
    render(<ExclusiveWeaponCalculator tool={tool} locale="vi" />);

    // Select Target Level chip Lv.10 (275 Shards)
    fireEvent.click(screen.getByTestId("ew-to-level-chip-10"));
    expect(screen.getByTestId("ew-total-shards").textContent).toBe("275");

    // Select Target Star 4★ (Gold Star, step 20 -> 705 Cores in 920 profile)
    fireEvent.click(screen.getByTestId("ew-to-star-star-4"));
    expect(screen.getByTestId("ew-total-cores").textContent).toBe("705");

    // Select Petal 3/5 inside 4★ (step 18 -> 490 + 40 + 40 + 45 = 615 Cores)
    fireEvent.click(screen.getByTestId("ew-to-star-petal-3"));
    expect(screen.getByTestId("ew-total-cores").textContent).toBe("615");

    // Switch to Raw Subtier profile (2,385 Cores max) and select 5★ Red Star (step 25)
    fireEvent.click(screen.getByTestId("core-profile-raw_subtier_2385"));
    fireEvent.click(screen.getByTestId("ew-to-star-star-5"));
    expect(screen.getByTestId("ew-total-cores").textContent).toBe("2.38K");
    expect(screen.getByTestId("ew-total-cores").getAttribute("title")).toBe(
      "2,385"
    );
  });

  it("supports K/M shorthand inputs in the 3-column horizontal Resource cards and displays Sufficient (+Dư ...) state", () => {
    render(<ExclusiveWeaponCalculator tool={tool} locale="vi" />);

    const shardsInput = screen.getByTestId("owned-ew-shards-input");
    const coresInput = screen.getByTestId("owned-ew-cores-input");

    // Enter 500 shards (1,185 - 500 = 685 missing) and 1k cores (1,000 >= 920 required -> +80 surplus)
    fireEvent.change(shardsInput, { target: { value: "500" } });
    fireEvent.change(coresInput, { target: { value: "1k" } });

    expect(screen.getByTestId("ew-missing-shards").textContent).toBe("685");
    expect(screen.getByTestId("ew-missing-cores").textContent).toContain(
      "Đủ nguyên liệu (+Dư 80)"
    );

    // Enter 1.5k shards (1,500 >= 1,185 required -> +315 surplus)
    fireEvent.change(shardsInput, { target: { value: "1.5k" } });
    expect(screen.getByTestId("ew-missing-shards").textContent).toContain(
      "Đủ nguyên liệu (+Dư 315)"
    );
  });

  it("moves all guides, 5 Skill Milestones table, and Star Core breakdown table into <CalculatorInfoPopover /> (i)", () => {
    render(<ExclusiveWeaponCalculator tool={tool} locale="vi" />);

    // Before clicking (i), modal is closed
    expect(screen.queryByTestId("ew-info-dialog")).toBeNull();

    // Open (i) modal
    fireEvent.click(screen.getByTestId("ew-info-trigger"));
    expect(screen.getByTestId("ew-info-dialog")).toBeDefined();
    expect(
      screen.getAllByText(/5 Mốc Đột Phá Kỹ Năng Độc Quyền/i).length
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText(/Phân Bổ Lõi Sắt Thiên Thạch/i).length
    ).toBeGreaterThan(0);

    // Close modal with Escape
    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByTestId("ew-info-dialog")).toBeNull();
  });

  it("enforces MD3 single-border containment (max depth <= 1), zero sub-12px micro-text, and zero Vietnamese in font-mono", () => {
    expect(
      countMicroTextOccurrences(
        readSource("src/components/calculators/exclusive-weapon-calculator.tsx")
      )
    ).toBe(0);
    expect(
      countMicroTextOccurrences(
        readSource(
          "src/components/calculators/exclusive-weapon-step-selector.tsx"
        )
      )
    ).toBe(0);

    const { container } = render(
      <ExclusiveWeaponCalculator tool={tool} locale="vi" />
    );

    expect(getMaxBorderedContainerDepth(container)).toBeLessThanOrEqual(1);
    expect(findMicroTextElements(container)).toEqual([]);
    expect(findMonoElementsWithVietnamese(container)).toEqual([]);
  });

  it("renders 100% pure English copy when locale='en' with zero Vietnamese diacritics (including open Avatar Picker and Info Modal)", () => {
    const { container } = render(
      <ExclusiveWeaponCalculator tool={tool} locale="en" />
    );

    fireEvent.click(screen.getByTestId("ew-central-avatar-btn"));
    fireEvent.click(screen.getByTestId("ew-info-trigger"));

    const text = container.textContent ?? "";
    expect(text).toContain("Universal Exclusive Gear Shard");
    expect(text).toContain("Meteoric Iron Core");
    expect(text).toContain("Wings of Judgement");
    expect(VI_DIACRITIC_REGEX.test(text)).toBe(false);
  });
});

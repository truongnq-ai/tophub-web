import React from "react";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import {
  CALC_MD3,
  CalculatorMetricValue,
  CalculatorStepperButton,
  CalculatorToolHeader,
} from "../src/components/calculators/calculator-md3-primitives";
import {
  ALL_SIDE_BORDER_REGEX,
  FORBIDDEN_MICRO_TEXT_REGEX,
} from "./utils/md3-audit";

describe("Track 2 Foundation — Calculator MD3 primitives", () => {
  it("exposes MD3 tokens with a 12px floor, 44px touch targets and borderless tonal groups", () => {
    for (const token of Object.values(CALC_MD3)) {
      expect(token).not.toMatch(FORBIDDEN_MICRO_TEXT_REGEX);
    }
    expect(CALC_MD3.surfaceCard).toMatch(ALL_SIDE_BORDER_REGEX);
    expect(CALC_MD3.surfaceCard).toContain("p-3.5");
    expect(CALC_MD3.surfaceCard).toContain("sm:p-5");
    expect(CALC_MD3.tonalGroup).not.toMatch(ALL_SIDE_BORDER_REGEX);
    expect(CALC_MD3.tonalTile).not.toMatch(ALL_SIDE_BORDER_REGEX);
    expect(CALC_MD3.iconButton).toContain("min-h-[44px]");
    expect(CALC_MD3.iconButton).toContain("min-w-[44px]");
    expect(CALC_MD3.chipButton).toContain("min-h-[44px]");
    expect(CALC_MD3.dataInput).toContain("h-11");
    expect(CALC_MD3.dataInput).toContain("text-base");
    expect(CALC_MD3.metricValue).toContain("text-3xl");
    expect(CALC_MD3.metricValue).toContain("sm:text-4xl");
    expect(CALC_MD3.eyebrow).toContain("font-sans");
    expect(CALC_MD3.eyebrow).not.toContain("font-mono");
    expect(CALC_MD3.dividedList).toContain("divide-y");
  });

  it("renders CalculatorToolHeader as a flat header (hairline only) with an MD3 headline", () => {
    render(
      <CalculatorToolHeader
        code="1.1"
        title="Nâng Sao Tướng"
        actions={<button type="button">Hành động</button>}
      />
    );
    const header = screen.getByTestId("calculator-tool-header");
    expect(header.tagName).toBe("HEADER");
    expect(header.className).not.toMatch(ALL_SIDE_BORDER_REGEX);
    expect(header.className).toContain("border-b");

    const heading = screen.getByRole("heading", { level: 1, name: "Nâng Sao Tướng" });
    expect(heading.className).toContain("text-xl");
    expect(heading.className).toContain("font-heading");
    expect(screen.getByText("1.1").className).toContain("font-mono");
    expect(screen.getByRole("button", { name: "Hành động" })).toBeDefined();
  });

  it("renders CalculatorStepperButton as a 44×44 accessible touch target that respects disabled", () => {
    const onClick = vi.fn();
    const { rerender } = render(
      <CalculatorStepperButton
        direction="increase"
        testId="demo-plus"
        ariaLabel="Tăng 1 nấc"
        onClick={onClick}
      />
    );
    const button = screen.getByTestId("demo-plus");
    expect(button.className).toContain("h-11");
    expect(button.className).toContain("w-11");
    expect(button.getAttribute("aria-label")).toBe("Tăng 1 nấc");
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);

    rerender(
      <CalculatorStepperButton
        direction="increase"
        testId="demo-plus"
        ariaLabel="Tăng 1 nấc"
        disabled
        onClick={onClick}
      />
    );
    fireEvent.click(screen.getByTestId("demo-plus"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("keeps value-only text inside the CalculatorMetricValue testId node (test-contract safe)", () => {
    render(<CalculatorMetricValue testId="demo-metric" value="1,200" unit="Mảnh" />);
    const value = screen.getByTestId("demo-metric");
    expect(value.textContent).toBe("1,200");
    expect(value.className).toContain("text-3xl");
    expect(value.className).toContain("font-heading");
    expect(screen.getByText("Mảnh").className).toContain("text-sm");
  });
});

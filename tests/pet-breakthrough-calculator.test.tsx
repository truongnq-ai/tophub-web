import React from "react";
import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import viMessages from "../messages/vi.json";
import { getCalculatorToolBySlug } from "../src/content/calculators/registry";
import { PetBreakthroughCalculator } from "../src/components/calculators/pet-breakthrough-calculator";

function renderWithIntl(ui: React.ReactElement) {
  return render(
    <NextIntlClientProvider locale="vi" messages={viMessages}>
      {ui}
    </NextIntlClientProvider>
  );
}

describe("7.2 Đột Phá Thú Cưng — PetBreakthroughCalculator", () => {
  const toolContext = getCalculatorToolBySlug("pets-behemoths", "breakthrough");

  it("renders PetBreakthroughCalculator with proper header and selected pet", () => {
    expect(toolContext).not.toBeNull();
    if (!toolContext) return;

    renderWithIntl(
      <PetBreakthroughCalculator
        zone={toolContext.zone}
        category={toolContext.category}
        tool={toolContext.tool}
        locale="vi"
      />
    );

    // Header badge and title
    expect(screen.getByText("7.2")).toBeDefined();
    expect(screen.getAllByText("7.2 Đột Phá").length).toBeGreaterThan(0);

    // Default pet Mèo Ánh Lửa
    expect(screen.getAllByText("Mèo Ánh Lửa").length).toBeGreaterThan(0);

    // Initial state: Break 5 to Break 16
    expect(screen.getByText("Break 5")).toBeDefined();
    expect(screen.getByText("Break 16")).toBeDefined();
  });

  it("updates calculation when quick jump chip is clicked", () => {
    const toolContext = getCalculatorToolBySlug("pets-behemoths", "breakthrough");
    if (!toolContext) return;

    renderWithIntl(
      <PetBreakthroughCalculator
        zone={toolContext.zone}
        category={toolContext.category}
        tool={toolContext.tool}
        locale="vi"
      />
    );

    // Click quick chip Titan 5★ F4 (Break 23)
    const titanChip = screen.getByText("Titan 5★ F4");
    fireEvent.click(titanChip);

    // Target should now be Break 23
    expect(screen.getByText("Break 23")).toBeDefined();
    // Required same copies for Break 5 to 23 is 57
    expect(screen.getByText("57")).toBeDefined();
    // Required any fodder is 211
    expect(screen.getByText("211")).toBeDefined();
    // Required essence is 31,000
    expect(screen.getByText("31,000")).toBeDefined();
  });

  it("handles bag inventory subtraction properly", () => {
    const toolContext = getCalculatorToolBySlug("pets-behemoths", "breakthrough");
    if (!toolContext) return;

    renderWithIntl(
      <PetBreakthroughCalculator
        zone={toolContext.zone}
        category={toolContext.category}
        tool={toolContext.tool}
        locale="vi"
      />
    );

    // Initial is Break 5 to 16: requires 18 same copies, 71 any fodder
    // Enter 10 into same copy input
    const sameInput = screen.getByLabelText(/Bản Sao Cùng Loài/i);
    fireEvent.change(sameInput, { target: { value: "10" } });

    // Missing same copies should now be 18 - 10 = 8
    expect(screen.getByText("Thiếu 8")).toBeDefined();
  });

  it("expands detailed breakthrough table on toggle click", () => {
    const toolContext = getCalculatorToolBySlug("pets-behemoths", "breakthrough");
    if (!toolContext) return;

    renderWithIntl(
      <PetBreakthroughCalculator
        zone={toolContext.zone}
        category={toolContext.category}
        tool={toolContext.tool}
        locale="vi"
      />
    );

    // Click button to expand table
    const expandBtn = screen.getByText(/Xem Chi Tiết Từng Bậc Sao/i);
    fireEvent.click(expandBtn);

    // Table headers should appear
    expect(screen.getByText("Bản Sao Bước")).toBeDefined();
    expect(screen.getByText("Phôi Bước")).toBeDefined();
    expect(screen.getByText("Kế Thừa")).toBeDefined();
  });
});

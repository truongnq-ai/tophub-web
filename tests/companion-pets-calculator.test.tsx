import React from "react";
import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import viMessages from "../messages/vi.json";
import { getCalculatorToolBySlug } from "../src/content/calculators/registry";
import { CompanionPetsCalculator } from "../src/components/calculators/companion-pets-calculator";

function renderWithIntl(ui: React.ReactElement) {
  return render(
    <NextIntlClientProvider locale="vi" messages={viMessages}>
      {ui}
    </NextIntlClientProvider>
  );
}

describe("7.1 Nâng Cấp Thú Cưng — CompanionPetsCalculator", () => {
  const toolContext = getCalculatorToolBySlug("pets-behemoths", "companion-pets");

  it("renders CompanionPetsCalculator with proper header and selected pet", () => {
    expect(toolContext).not.toBeNull();
    if (!toolContext) return;

    renderWithIntl(
      <CompanionPetsCalculator
        zone={toolContext.zone}
        category={toolContext.category}
        tool={toolContext.tool}
        locale="vi"
      />
    );

    // Header badge and title
    expect(screen.getByText("7.1")).toBeDefined();
    expect(screen.getAllByText("7.1 Nâng Cấp").length).toBeGreaterThan(0);

    // Default pet Tia Điện (Zapp)
    expect(screen.getAllByText("Tia Điện").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Liên Minh").length).toBeGreaterThan(0);

    // Initial level state Lv.1 to Lv.90
    expect(screen.getByText("Lv. 1")).toBeDefined();
    expect(screen.getByText("Lv. 90")).toBeDefined();
  });

  it("updates calculation when quick milestone chip is clicked", () => {
    const toolContext = getCalculatorToolBySlug("pets-behemoths", "companion-pets");
    if (!toolContext) return;

    renderWithIntl(
      <CompanionPetsCalculator
        zone={toolContext.zone}
        category={toolContext.category}
        tool={toolContext.tool}
        locale="vi"
      />
    );

    // Click Lv.45 Epic quick chip
    const chip45 = screen.getByText("Lv.45 Epic");
    fireEvent.click(chip45);

    // Target level should now be Lv. 45
    expect(screen.getByText("Lv. 45")).toBeDefined();
    // Required Food from Lv.1 to Lv.45 is 98,550
    expect(screen.getByText("98,550")).toBeDefined();
  });

  it("handles bag inventory subtraction and shows missing deficit", () => {
    const toolContext = getCalculatorToolBySlug("pets-behemoths", "companion-pets");
    if (!toolContext) return;

    renderWithIntl(
      <CompanionPetsCalculator
        zone={toolContext.zone}
        category={toolContext.category}
        tool={toolContext.tool}
        locale="vi"
      />
    );

    // Jump to Lv.45 (cost 98,550)
    fireEvent.click(screen.getByText("Lv.45 Epic"));

    // Enter 50,000 into owned food input
    const foodInput = screen.getByLabelText(/Đồ Ăn Thú Cưng Trong Túi/i);
    fireEvent.change(foodInput, { target: { value: "50000" } });

    // Missing should be 98,550 - 50,000 = 48,550
    expect(screen.getByText("Còn thiếu 48,550")).toBeDefined();
  });

  it("expands detailed breakdown table on toggle click", () => {
    const toolContext = getCalculatorToolBySlug("pets-behemoths", "companion-pets");
    if (!toolContext) return;

    renderWithIntl(
      <CompanionPetsCalculator
        zone={toolContext.zone}
        category={toolContext.category}
        tool={toolContext.tool}
        locale="vi"
      />
    );

    // Click button to expand table
    const expandBtn = screen.getByText(/Xem Chi Tiết Chi Phí Từng Cấp/i);
    fireEvent.click(expandBtn);

    // Header of breakdown table should be present
    expect(screen.getByText("Đồ Ăn Bước")).toBeDefined();
    expect(screen.getByText("Tinh Chất Bước")).toBeDefined();
    expect(screen.getByText("Đồ Ăn Lũy Kế")).toBeDefined();
  });
});

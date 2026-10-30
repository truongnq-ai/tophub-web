import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CalculatorInfoPopover } from "../src/components/calculators/calculator-info-popover";
import {
  countMicroTextOccurrences,
  findMicroTextElements,
  findMonoElementsWithVietnamese,
  getMaxBorderedContainerDepth,
  readSource,
} from "./utils/md3-audit";

describe("CalculatorInfoPopover — Shared MD3 Floating Info Popup Component", () => {
  it("contains zero sub-12px micro-text classes in source file", () => {
    expect(
      countMicroTextOccurrences(
        readSource("src/components/calculators/calculator-info-popover.tsx")
      )
    ).toBe(0);
  });

  it("opens popup dialog on trigger click and closes via close button, backdrop, or Escape key", () => {
    const { container } = render(
      <CalculatorInfoPopover
        title="Thông tin & Bảng chi phí"
        subtitle="Dữ liệu giải mã từ Meta.bytes"
        locale="vi"
        triggerTestId="test-info-trigger"
        dialogTestId="test-info-dialog"
      >
        <div>Nội dung hướng dẫn chi tiết</div>
      </CalculatorInfoPopover>
    );

    expect(screen.queryByTestId("test-info-dialog")).toBeNull();

    // Open via trigger click
    fireEvent.click(screen.getByTestId("test-info-trigger"));
    expect(screen.getByTestId("test-info-dialog")).toBeDefined();
    expect(screen.getByText("Nội dung hướng dẫn chi tiết")).toBeDefined();
    expect(getMaxBorderedContainerDepth(container)).toBeLessThanOrEqual(1);
    expect(findMicroTextElements(container)).toEqual([]);
    expect(findMonoElementsWithVietnamese(container)).toEqual([]);

    // Close via Escape key
    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByTestId("test-info-dialog")).toBeNull();

    // Reopen and close via backdrop click
    fireEvent.click(screen.getByTestId("test-info-trigger"));
    expect(screen.getByTestId("test-info-dialog")).toBeDefined();
    fireEvent.click(screen.getByTestId("test-info-dialog-backdrop"));
    expect(screen.queryByTestId("test-info-dialog")).toBeNull();

    // Reopen and close via close [X] button
    fireEvent.click(screen.getByTestId("test-info-trigger"));
    expect(screen.getByTestId("test-info-dialog")).toBeDefined();
    fireEvent.click(screen.getByTestId("test-info-dialog-close"));
    expect(screen.queryByTestId("test-info-dialog")).toBeNull();
  });
});

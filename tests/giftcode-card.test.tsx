import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import React from "react";
import { GiftcodeCard } from "../src/components/giftcode/giftcode-card";

describe("GiftcodeCard Component", () => {
  const mockCode = {
    code: "TOPHERO2026",
    status: "ACTIVE" as const,
    discovered_at: "2026-10-11T10:00:00Z",
    expires_at: null,
  };

  it("should render giftcode text and active status badge", () => {
    render(<GiftcodeCard item={mockCode} />);
    expect(screen.getByText("TOPHERO2026")).toBeDefined();
    expect(screen.getByText(/còn hạn|active/i)).toBeDefined();
  });

  it("should trigger clipboard copy when button is clicked", async () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });

    render(<GiftcodeCard item={mockCode} />);
    const btn = screen.getByRole("button", { name: /sao chép|copy/i });
    await act(async () => {
      fireEvent.click(btn);
    });
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("TOPHERO2026");
  });

  it("should format discovered_at and expires_at according to locale prop", () => {
    const codeWithExpiry = {
      ...mockCode,
      expires_at: "2026-12-25T10:00:00Z",
    };
    const { unmount } = render(<GiftcodeCard item={codeWithExpiry} locale="en" />);
    // In en-US, month comes before day (10/11/2026 and 12/25/2026)
    expect(screen.getByText("12/25/2026")).toBeDefined();
    unmount();

    render(<GiftcodeCard item={codeWithExpiry} locale="vi" />);
    // In vi-VN, day comes before month (25/12/2026)
    expect(screen.getByText("25/12/2026")).toBeDefined();
  });
});

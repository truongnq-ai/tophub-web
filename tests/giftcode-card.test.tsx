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
});

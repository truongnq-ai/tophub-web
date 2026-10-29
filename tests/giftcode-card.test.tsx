import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import React from "react";
import fs from "node:fs";
import path from "node:path";
import { GiftcodeCard } from "../src/components/giftcode/giftcode-card";
import { GiftcodeList } from "../src/components/giftcode/giftcode-list";

const FORBIDDEN_MICRO_TEXT_REGEX = /text-\[(?:8|9|10|11)px\]/;

describe("GiftcodeCard & Phase 1.3 Auxiliary Components (MD3 Compliance)", () => {
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

  it("Phase 1.3: eliminates all sub-12px classes and enforces >=44px touch targets & Single-Layer Containment across auxiliary components", () => {
    const phase13Files = [
      "../src/components/giftcode/giftcode-card.tsx",
      "../src/components/giftcode/giftcode-list.tsx",
      "../src/components/check/check-client.tsx",
      "../src/components/check/status-card.tsx",
      "../src/components/pricing/pricing-section.tsx",
      "../src/components/pricing/plan-card.tsx",
      "../src/components/pricing/billing-selector.tsx",
      "../src/components/pricing/payos-modal.tsx",
      "../src/components/dashboard/account-card.tsx",
      "../src/components/dashboard/user-status-card.tsx",
    ];

    for (const relPath of phase13Files) {
      const fullPath = path.resolve(__dirname, relPath);
      const source = fs.readFileSync(fullPath, "utf-8");
      expect(
        FORBIDDEN_MICRO_TEXT_REGEX.test(source),
        `Found forbidden sub-12px class in ${relPath}`
      ).toBe(false);
    }

    render(
      <GiftcodeList
        initialItems={[mockCode]}
        translations={{
          badgeActive: "Còn Hạn",
          badgeExpired: "Hết Hạn",
          filterAll: "Tất cả",
          filterActive: "Đang mở",
          filterExpired: "Hết hạn",
          searchPlaceholder: "Tìm giftcode...",
          discoveredAt: "Phát hiện",
          expiresAt: "Hạn",
          empty: "Trống",
          copy: "Sao chép",
          copied: "Đã chép!",
        }}
      />
    );

    const copyBtn = screen.getByRole("button", { name: "Sao chép" });
    expect(copyBtn.className).toContain("min-h-[44px]");

    const codeElement = screen.getByText("TOPHERO2026");
    const innerCodeBox = codeElement.closest("div")?.parentElement;
    expect(innerCodeBox?.className).toContain("border-0");

    const searchInput = screen.getByPlaceholderText("Tìm giftcode...");
    expect(searchInput.className).toContain("text-base");
  });
});

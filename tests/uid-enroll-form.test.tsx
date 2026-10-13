import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import React from "react";
import { UidEnrollForm } from "../src/components/home/uid-enroll-form";

vi.mock("@/hooks/use-uid-session", () => ({
  useUidSession: () => ({
    savedAccounts: [],
    selectAccount: vi.fn(),
    saveAccount: vi.fn(),
    removeSavedAccount: vi.fn(),
  }),
}));

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      "activeCodes.title": "Mã Giftcode Đang Hoạt Động",
      "activeCodes.scanning": "Đang quét",
      "activeCodes.empty": "Hệ thống đang quét tìm giftcode mới 24/7. Chưa có mã hoạt động.",
      "form.validationError": "UID không hợp lệ",
    };
    return translations[key] || key;
  },
}));

describe("UidEnrollForm Component - Active Giftcodes", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("should render real giftcodes when initialActiveCodes has items", () => {
    const mockCodes = [
      { code: "DrAg0n", status: "VALID" },
      { code: "Fl1gHt", status: "VALID" },
      { code: "ScAl3Z", status: "VALID" },
      { code: "GB803DF7896", status: "VALID" },
    ];

    render(<UidEnrollForm initialActiveCodes={mockCodes} />);

    expect(screen.getByText("Mã Giftcode Đang Hoạt Động · 4")).toBeDefined();
    expect(screen.getByText("DrAg0n")).toBeDefined();
    expect(screen.getByText("Fl1gHt")).toBeDefined();
    expect(screen.getByText("ScAl3Z")).toBeDefined();
    expect(screen.getByText("GB803DF7896")).toBeDefined();

    // Verify demo codes are NOT rendered
    expect(screen.queryByText("TOPHERO2026")).toBeNull();
    expect(screen.queryByText("HEROES2026")).toBeNull();
    expect(screen.queryByText("THVIP888")).toBeNull();
    expect(screen.queryByText("TOPHEROESGO")).toBeNull();
  });

  it("should copy giftcode to clipboard on click", async () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });

    const mockCodes = [{ code: "DrAg0n", status: "VALID" }];
    render(<UidEnrollForm initialActiveCodes={mockCodes} />);

    const codeBtn = screen.getByRole("button", { name: "DrAg0n" });
    await act(async () => {
      fireEvent.click(codeBtn);
    });

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("DrAg0n");
  });

  it("should render empty state and count 0 when initialActiveCodes is empty", () => {
    render(<UidEnrollForm initialActiveCodes={[]} />);

    expect(screen.getByText("Mã Giftcode Đang Hoạt Động · 0")).toBeDefined();
    expect(
      screen.getByText(/Hệ thống đang quét tìm giftcode mới 24\/7\. Chưa có mã hoạt động\./i)
    ).toBeDefined();

    // Verify demo codes are NOT rendered
    expect(screen.queryByText("TOPHERO2026")).toBeNull();
    expect(screen.queryByText("HEROES2026")).toBeNull();
    expect(screen.queryByText("THVIP888")).toBeNull();
    expect(screen.queryByText("TOPHEROESGO")).toBeNull();
  });

  it("should render empty state and count 0 when initialActiveCodes is undefined", () => {
    render(<UidEnrollForm />);

    expect(screen.getByText("Mã Giftcode Đang Hoạt Động · 0")).toBeDefined();
    expect(
      screen.getByText(/Hệ thống đang quét tìm giftcode mới 24\/7\. Chưa có mã hoạt động\./i)
    ).toBeDefined();

    // Verify demo codes are NOT rendered
    expect(screen.queryByText("TOPHERO2026")).toBeNull();
    expect(screen.queryByText("HEROES2026")).toBeNull();
    expect(screen.queryByText("THVIP888")).toBeNull();
    expect(screen.queryByText("TOPHEROESGO")).toBeNull();
  });
});

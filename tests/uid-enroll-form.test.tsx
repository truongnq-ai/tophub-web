import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import React from "react";
import fs from "node:fs";
import path from "node:path";
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
      "hero.description": "Đăng ký mã số người chơi một lần duy nhất.",
      "activeCodes.title": "Mã Giftcode Đang Hoạt Động",
      "activeCodes.scanning": "Đang quét",
      "activeCodes.empty": "Hệ thống đang quét tìm giftcode mới 24/7. Chưa có mã hoạt động.",
      "form.validationError": "UID không hợp lệ",
      "faq.a1": "Hoàn toàn an toàn, chỉ dùng API chính thức.",
    };
    return translations[key] || key;
  },
}));

const FORBIDDEN_MICRO_TEXT_REGEX = /text-\[(?:8|9|10|11)px\]/;

describe("UidEnrollForm Component - Active Giftcodes & MD3 Standards", () => {
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

  it("Phase 1.2: enforces 16px (text-base) reading prose, >=44px touch targets, and zero sub-12px classes in UidEnrollForm & Index.tsx", () => {
    const enrollPath = path.resolve(__dirname, "../src/components/home/uid-enroll-form.tsx");
    const indexPath = path.resolve(__dirname, "../src/app/[locale]/Index.tsx");
    const enrollSource = fs.readFileSync(enrollPath, "utf-8");
    const indexSource = fs.readFileSync(indexPath, "utf-8");

    expect(FORBIDDEN_MICRO_TEXT_REGEX.test(enrollSource)).toBe(false);
    expect(FORBIDDEN_MICRO_TEXT_REGEX.test(indexSource)).toBe(false);
    expect(indexSource).toContain("px-3 sm:px-6");

    render(<UidEnrollForm initialActiveCodes={[{ code: "DrAg0n", status: "VALID" }]} />);

    const heroDesc = screen.getByText("Đăng ký mã số người chơi một lần duy nhất.");
    expect(heroDesc.className).toContain("text-base");

    const faqAnswer = screen.getByText("Hoàn toàn an toàn, chỉ dùng API chính thức.");
    expect(faqAnswer.className).toContain("text-base");

    const codeBtn = screen.getByRole("button", { name: "DrAg0n" });
    expect(codeBtn.className).toContain("min-h-[44px]");
  });
});

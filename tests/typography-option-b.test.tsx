import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
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
    const map: Record<string, string> = {
      "hero.badge": "Sảnh Hiệp Sĩ • Tự Động Hóa 24/7 Miễn Phí",
      "hero.title": "Tự Động Nhận Giftcode & Điểm Danh Hàng Ngày",
      "hero.description": "Đăng ký mã số người chơi một lần duy nhất.",
      "form.uidLabel": "MÃ SỐ NGƯỜI CHƠI (GAME UID)",
      "form.uidPlaceholder": "Ví dụ: 100000000001...",
      "form.checkBtn": "Kiểm Tra UID",
      "activeCodes.title": "Mã Giftcode Đang Hoạt Động",
      "activeCodes.scanning": "Đang quét tự động 24/7",
      "activeCodes.empty": "Chưa có mã hoạt động.",
    };
    return map[key] || key;
  },
}));

describe("Option B Typography System (Nunito + Be Vietnam Pro + JetBrains Mono)", () => {
  it("configures Nunito variable font and Vietnamese subset for JetBrains_Mono in layout.tsx", () => {
    const layoutPath = path.resolve(__dirname, "../src/app/[locale]/layout.tsx");
    const content = fs.readFileSync(layoutPath, "utf-8");

    expect(content).toContain("Nunito");
    expect(content).not.toContain("Chakra_Petch");
    expect(content).toContain("nunito.variable");

    // Verify JetBrains_Mono includes vietnamese subset
    const jetbrainsBlock = content.slice(content.indexOf("JetBrains_Mono({"));
    expect(jetbrainsBlock).toContain('"vietnamese"');
  });

  it("applies tight tracking on Hero H1 and stats numbers, and sans-serif on Vietnamese placeholders/status", () => {
    render(<UidEnrollForm initialActiveCodes={[{ code: "G874BF214FBC", status: "VALID" }]} />);

    const heading = screen.getByRole("heading", {
      level: 1,
      name: /Tự Động Nhận Giftcode & Điểm Danh Hàng Ngày/i,
    });
    expect(heading.className).toContain("font-heading");
    expect(heading.className).toContain("font-black");
    expect(heading.className).toContain("tracking-tight");
    expect(heading.className).not.toContain("tracking-wide");

    const input = screen.getByPlaceholderText("Ví dụ: 100000000001...");
    expect(input.className).toContain("font-mono");
    expect(input.className).toContain("placeholder:font-sans");

    const scanningStatus = screen.getByText("Đang quét tự động 24/7");
    expect(scanningStatus.className).not.toContain("font-mono");
    expect(scanningStatus.className).toContain("font-semibold");
  });
});

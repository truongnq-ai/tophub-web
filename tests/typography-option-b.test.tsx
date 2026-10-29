import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import React from "react";
import fs from "node:fs";
import path from "node:path";
import { UidEnrollForm } from "../src/components/home/uid-enroll-form";
import { Header } from "../src/components/header";
import { Footer } from "../src/components/footer";
import { HomeAnnouncementTicker } from "../src/components/home/home-announcement-ticker";

vi.mock("@/i18n/routing", () => ({
  Link: ({
    href,
    children,
    className,
    ...rest
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
    [key: string]: unknown;
  }) => (
    <a href={href} className={className} {...rest}>
      {children}
    </a>
  ),
  usePathname: () => "/",
}));

vi.mock("@/hooks/use-uid-session", () => ({
  useUidSession: () => ({
    activeAccount: {
      uid: "2446869146316",
      nickname: "CommanderOne",
      server_id: "S1024",
      added_at: 1700000000000,
    },
    savedAccounts: [
      {
        uid: "2446869146316",
        nickname: "CommanderOne",
        server_id: "S1024",
        added_at: 1700000000000,
      },
      {
        uid: "999888777666",
        nickname: "SubHero",
        server_id: "S1025",
        added_at: 1700000001000,
      },
    ],
    selectAccount: vi.fn(),
    saveAccount: vi.fn(),
    removeSavedAccount: vi.fn(),
    logout: vi.fn(),
    isLoaded: true,
  }),
}));

vi.mock("next-intl", () => ({
  useLocale: () => "vi",
  useTranslations: (ns?: string) => (key: string) => {
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
      calculatorsNewBadge: "MỚI",
    };
    if (ns === "Navigation" && key === "calculatorsNewBadge") {
      return "MỚI";
    }
    return map[key] || key;
  },
}));

const FORBIDDEN_MICRO_TEXT_REGEX = /text-\[(?:8|9|10|11)px\]/;

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

  it("Phase 1.1: defines MD3 surface-card and surface-tonal utility classes in global.css", () => {
    const cssPath = path.resolve(__dirname, "../src/styles/global.css");
    const cssContent = fs.readFileSync(cssPath, "utf-8");

    expect(cssContent).toContain(".surface-card");
    expect(cssContent).toContain(".surface-tonal");
    expect(cssContent).toContain(".touch-target");
  });

  it("Phase 1.1: eliminates all sub-12px classes and font-mono Vietnamese badges in Header, Footer, and HomeAnnouncementTicker", () => {
    const phase11Files = [
      "../src/components/header.tsx",
      "../src/components/footer.tsx",
      "../src/components/home/home-announcement-ticker.tsx",
    ];

    for (const relPath of phase11Files) {
      const fullPath = path.resolve(__dirname, relPath);
      const source = fs.readFileSync(fullPath, "utf-8");
      expect(
        FORBIDDEN_MICRO_TEXT_REGEX.test(source),
        `Found forbidden sub-12px class in ${relPath}`
      ).toBe(false);
    }

    render(
      <div>
        <Header />
        <HomeAnnouncementTicker locale="vi" />
        <Footer />
      </div>
    );

    const calcBadge = screen.getByTestId("header-calculators-new-badge");
    expect(calcBadge.className).toContain("text-xs");
    expect(calcBadge.className).toContain("font-sans");
    expect(calcBadge.className).not.toContain("font-mono");

    const ticker = screen.getByTestId("home-announcement-ticker");
    const tickerLink = ticker.querySelector("a");
    expect(tickerLink?.className).toContain("min-h-[44px]");
  });
});

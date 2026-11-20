import fs from "node:fs";
import path from "node:path";
import React from "react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { GuidesHubClient } from "../src/components/guides/guides-hub-client";

vi.mock("next-intl", () => ({
  useLocale: () => "vi",
  useTranslations: () => (key: string, params?: Record<string, unknown>) => {
    return key;
  },
}));

vi.mock("@/i18n/routing", () => ({
  Link: ({
    href,
    children,
    ...rest
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

vi.mock("@/hooks/use-uid-session", () => ({
  useUidSession: () => ({
    activeAccount: null,
  }),
}));

describe("GuidesHubClient v3.1 (Editorial Flat Header, Zero Search, Streamlined 9 Master Sections & Mobile Drawer)", () => {
  beforeEach(() => {
    window.localStorage.clear();
    Element.prototype.scrollIntoView = vi.fn();
  });

  it("renders Editorial Flat Header (H1 + italic subtitle, zero badge, zero search box), Sticky Sidebar, and all 9 Master Sections", () => {
    render(<GuidesHubClient locale="vi" />);

    // 1. Editorial Flat Header & Subtitle
    expect(
      screen.getByText("Cẩm Nang Chiến Thuật & Bảng Số Liệu Chuẩn Hóa")
    ).toBeDefined();
    const subtitle = screen.getByText(
      "Cẩm nang thực chiến và dữ liệu tra cứu chính xác dành cho người chơi Top Heroes."
    );
    expect(subtitle).toBeDefined();
    expect(subtitle.className).toContain("italic");

    // 2. No Search Input or Heavy Badge
    expect(
      screen.queryByPlaceholderText(/Tìm kiếm bài viết, tướng, sự kiện/i)
    ).toBeNull();
    expect(
      screen.queryByText(/BÁCH KHOA TOÀN THƯ TOP HEROES/i)
    ).toBeNull();

    // 3. Master Sticky Sidebar with 9 Sections
    expect(screen.getByTestId("guides-hub-sidebar")).toBeDefined();
    expect(screen.getByText("Mục Lục Chuyên Đề")).toBeDefined();

    // 4. All 9 Sections are rendered in order (#sec-1 to #sec-9)
    for (let i = 1; i <= 9; i++) {
      expect(screen.getByTestId(`hub-section-${i}`)).toBeDefined();
    }

    // 5. Section 1 contains Article 1.1 with "Đọc ngay" badge
    expect(
      screen.getAllByText("1. Cẩm Nang Đầu Tay").length
    ).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Đọc ngay").length).toBeGreaterThanOrEqual(1);

    // 6. Section 2 contains shell articles with "Sắp ra mắt" badge
    expect(
      screen.getAllByText("2. Thông Tin Các Phe (S0 - S4)").length
    ).toBeGreaterThanOrEqual(1);
    const comingSoonBadges = screen.getAllByText("Sắp ra mắt");
    expect(comingSoonBadges.length).toBeGreaterThan(0);

    // 7. Zero-Prefix UI: No technical prefixes
    expect(screen.queryByText(/TOPIC 0/i)).toBeNull();
    expect(screen.queryByText(/PHÂN KHU/i)).toBeNull();
    expect(screen.queryByText(/TRỤC \d/i)).toBeNull();

    // 8. No obsolete Hot Tags, 3-Stage Tabs, or Quick Tools Strip
    expect(screen.queryByText("#560Mảnh")).toBeNull();
    expect(screen.queryByTestId("hub-stage-progression")).toBeNull();
    expect(screen.queryByTestId("hub-tool-codex")).toBeNull();

    // 9. Calculators Strip rendered under Section 1
    expect(screen.getByTestId("section-1-calculators")).toBeDefined();
    expect(
      screen.getByText("Máy Tính Mảnh Nâng Sao Anh Hùng")
    ).toBeDefined();

    // 10. Mobile Drawer trigger button
    expect(
      screen.getByTestId("guides-mobile-drawer-trigger")
    ).toBeDefined();
  });

  it("opens mobile drawer and allows section selection", () => {
    render(<GuidesHubClient locale="vi" />);

    const drawerTrigger = screen.getByTestId("guides-mobile-drawer-trigger");
    fireEvent.click(drawerTrigger);

    expect(screen.getByTestId("guides-mobile-drawer-sheet")).toBeDefined();
    expect(screen.getByText("9 Mục Cẩm Nang")).toBeDefined();
  });

  it("renders clean English version with localized subtitle", () => {
    render(<GuidesHubClient locale="en" />);

    expect(
      screen.getByText("Tactical Guides & Min-Max Master Data")
    ).toBeDefined();
    const enSubtitle = screen.getByText(
      "Tactical gameplay guides and reference data for Top Heroes players."
    );
    expect(enSubtitle).toBeDefined();
    expect(enSubtitle.className).toContain("italic");
  });

  it("enforces Google MD3 standards: touch targets >= 44px and zero sub-12px classes", () => {
    render(<GuidesHubClient locale="vi" />);

    const drawerTrigger = screen.getByTestId("guides-mobile-drawer-trigger");
    expect(drawerTrigger.className).toContain("min-h-[44px]");

    const source = fs.readFileSync(
      path.resolve(
        __dirname,
        "../src/components/guides/guides-hub-client.tsx"
      ),
      "utf8"
    );
    expect(source).not.toMatch(/text-\[(8|9|10|11)px\]/);
  });
});

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

describe("GuidesHubClient v3.1 (Streamlined 9 Master Sections, Master Sticky Sidebar, Zero-Prefix UI & Mobile Drawer)", () => {
  beforeEach(() => {
    window.localStorage.clear();
    Element.prototype.scrollIntoView = vi.fn();
  });

  it("renders Hero Header, Instant Search, Sticky Sidebar, and all 9 Master Sections cleanly", () => {
    render(<GuidesHubClient locale="vi" />);

    // 1. Hero Header & Search
    expect(
      screen.getByText("Cẩm Nang Chiến Thuật & Bảng Số Liệu Chuẩn Hóa")
    ).toBeDefined();
    const searchInput = screen.getByPlaceholderText(
      /Tìm kiếm bài viết, tướng, sự kiện/i
    );
    expect(searchInput).toBeDefined();

    // 2. Master Sticky Sidebar with 9 Sections
    expect(screen.getByTestId("guides-hub-sidebar")).toBeDefined();
    expect(screen.getByText("Mục Lục Chuyên Đề")).toBeDefined();

    // 3. All 9 Sections are rendered in order (#sec-1 to #sec-9)
    for (let i = 1; i <= 9; i++) {
      expect(screen.getByTestId(`hub-section-${i}`)).toBeDefined();
    }

    // 4. Section 1 contains Article 1.1 with "Đọc ngay" badge
    expect(
      screen.getAllByText("1. Cẩm Nang Đầu Tay").length
    ).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("Đọc ngay")).toBeDefined();

    // 5. Section 2 contains shell articles with "Sắp ra mắt" badge
    expect(
      screen.getAllByText("2. Thông Tin Các Phe (S0 - S4)").length
    ).toBeGreaterThanOrEqual(1);
    const comingSoonBadges = screen.getAllByText("Sắp ra mắt");
    expect(comingSoonBadges.length).toBeGreaterThan(0);

    // 6. Zero-Prefix UI: No technical prefixes
    expect(screen.queryByText(/TOPIC 0/i)).toBeNull();
    expect(screen.queryByText(/PHÂN KHU/i)).toBeNull();
    expect(screen.queryByText(/TRỤC \d/i)).toBeNull();

    // 7. No obsolete Hot Tags, 3-Stage Tabs, or Quick Tools Strip
    expect(screen.queryByText("#560Mảnh")).toBeNull();
    expect(screen.queryByTestId("hub-stage-progression")).toBeNull();
    expect(screen.queryByTestId("hub-tool-codex")).toBeNull();

    // 8. Calculators Strip rendered under Section 1
    expect(screen.getByTestId("section-1-calculators")).toBeDefined();
    expect(
      screen.getByText("Máy Tính Mảnh Nâng Sao Anh Hùng")
    ).toBeDefined();

    // 9. Mobile Drawer trigger button
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

  it("filters articles on search input without leaking unneeded UI elements", () => {
    render(<GuidesHubClient locale="vi" />);

    const searchInput = screen.getByPlaceholderText(
      /Tìm kiếm bài viết, tướng, sự kiện/i
    );
    fireEvent.change(searchInput, { target: { value: "Bản Đồ" } });

    expect(screen.getByTestId("hub-search-results")).toBeDefined();
    expect(
      screen.getByText(/Kết quả tìm kiếm bài viết/i)
    ).toBeDefined();
  });

  it("enforces Google MD3 standards: 16px search input and touch targets >= 44px", () => {
    render(<GuidesHubClient locale="vi" />);

    const searchInput = screen.getByPlaceholderText(
      /Tìm kiếm bài viết, tướng, sự kiện/i
    );
    expect(searchInput.className).toContain("text-base");
    expect(searchInput.className).toContain("h-12");

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

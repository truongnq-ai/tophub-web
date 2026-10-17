import React from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { GuidesHubClient } from "../src/components/guides/guides-hub-client";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string, params?: Record<string, unknown>) => {
    if (key === "startWithArticleBtn" && params)
      return `Bắt đầu: Bài ${params.code}`;
    if (key === "showMoreArticlesBtn" && params)
      return `Xem đầy đủ ${params.count} bài trong nhóm`;
    if (key === "articlesCount" && params) return `${params.count} bài viết`;
    if (key === "searchResultsCount" && params) return `${params.count} kết quả`;
    if (key === "readingTime" && params) return `${params.minutes} phút đọc`;
    const map: Record<string, string> = {
      hubBadge: "Bách Khoa Chiến Thuật Top Heroes (S0 ➔ S4)",
      hubTitle: "Cẩm Nang Chiến Thuật & Bảng Số Liệu Min-Max",
      hubDescription: "Hệ thống 8 nhóm chuyên đề và 31 cẩm nang thực chiến.",
      searchPlaceholder: "Tìm tướng, sự kiện...",
      clearSearch: "Xóa bộ lọc tìm kiếm",
      searchNoResults: "Không tìm thấy bài viết nào.",
      hotTagsLabel: "Từ khóa nóng:",
      stageSelectorTitle: "Lộ Trình Đọc Theo Độ Tuổi Máy Chủ",
      stageEarlyLabel: "Tân Thủ (Ngày 1–20)",
      stageEarlySub: "Khởi đầu Liên Minh",
      stagePivotLabel: "Chuyển Hệ (Ngày 21–45)",
      stagePivotSub: "Xoay trục Bộ Lạc Zero-Loss",
      stageSeasonLabel: "Chiến Sự (Season 1–4)",
      stageSeasonSub: "Đua Lâu Đài Lv.35/40",
      toolsStripTitle: "Công Cụ & Bảng Tra Cứu Tốc Độ Cao",
      toolEncyclopediaTitle: "Bách Khoa 45+ Tướng",
      toolEncyclopediaDesc: "Tier List S0➔S4",
      toolCalendarTitle: "Lộ Trình Sự Kiện Server",
      toolCalendarDesc: "Thi Đấu Hội & Đua Vũ Trang",
      toolShopsTitle: "Xếp Hạng 13 Cửa Hàng",
      toolShopsDesc: "ROI 600%",
      toolMasterTablesTitle: "12 Bảng Số Liệu Gốc",
      toolMasterTablesDesc: "Điểm gãy Mảnh, Sách",
      categoriesGridTitle: "8 Nhóm Chuyên Đề Chiến Thuật (S0 ➔ S4)",
      hideMoreArticlesBtn: "Thu gọn danh sách bài",
    };
    return map[key] ?? key;
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

describe("GuidesHubClient (4-Layer Smart Command Hub — Hardened)", () => {
  it("renders all 4 layers: Hero + Hot Tags, 3-Stage Tabs, 4 Tools Strip, and 8 Bento Category Cards", () => {
    render(<GuidesHubClient locale="vi" />);

    // Layer 1: Hero & Hot Tags
    expect(
      screen.getByText("Cẩm Nang Chiến Thuật & Bảng Số Liệu Min-Max")
    ).toBeDefined();
    expect(screen.getByRole("button", { name: /#DoubleDip/i })).toBeDefined();

    // Layer 2: 3-Stage Server Selector Tabs
    expect(
      screen.getByRole("tab", { name: /Tân Thủ \(Ngày 1–20\)/i })
    ).toBeDefined();
    expect(
      screen.getByRole("tab", { name: /Chuyển Hệ \(Ngày 21–45\)/i })
    ).toBeDefined();
    expect(
      screen.getByRole("tab", { name: /Chiến Sự \(Season 1–4\)/i })
    ).toBeDefined();

    // Layer 3: 4 Interactive Tools Strip
    expect(screen.getByText("Bách Khoa 45+ Tướng")).toBeDefined();
    expect(screen.getByText("Lộ Trình Sự Kiện Server")).toBeDefined();
    expect(screen.getByText("Xếp Hạng 13 Cửa Hàng")).toBeDefined();
    expect(screen.getByText("12 Bảng Số Liệu Gốc")).toBeDefined();

    // Layer 4: Clean 8-Category Bento Grid with Primary Start CTA
    expect(screen.getByText(/Bắt đầu: Bài 1\.1/i)).toBeDefined();
  });

  it("filters articles in both VI and EN locales when clicking a localized Hot Keyword Tag chip (GAP-02 fix)", () => {
    const { unmount } = render(<GuidesHubClient locale="vi" />);
    fireEvent.click(screen.getByRole("button", { name: /#HordePivot/i }));
    expect(screen.getByText(/kết quả/i)).toBeDefined();
    unmount();

    render(<GuidesHubClient locale="en" />);
    fireEvent.click(screen.getByRole("button", { name: /#9SoulStones/i }));
    expect(screen.getByText(/kết quả/i)).toBeDefined();
  });

  it("expands and collapses category article list on demand in Bento Grid", () => {
    render(<GuidesHubClient locale="vi" />);
    const expandBtns = screen.getAllByRole("button", {
      name: /Xem đầy đủ/i,
    });
    expect(expandBtns.length).toBe(8);

    fireEvent.click(expandBtns[0]);
    expect(
      screen.getByRole("button", { name: /Thu gọn danh sách bài/i })
    ).toBeDefined();
  });
});

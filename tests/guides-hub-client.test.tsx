import fs from "node:fs";
import path from "node:path";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { GuidesHubClient } from "../src/components/guides/guides-hub-client";

vi.mock("next-intl", () => ({
  useLocale: () => "vi",
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
      hubDescription: "Hệ thống cẩm nang thực chiến miễn phí 100%.",
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
      toolCodexTitle: "Kho Đồ Giám (3,400+ Vật Phẩm)",
      toolCodexDesc: "Từ điển Anh – Việt Tướng, Đồ Vàng, Cổ Ngữ & Thánh Vật",
      hubSearchArticlesHeading: "Bài Viết Cẩm Nang Khớp Từ Khóa",
      hubSearchCodexHeading: "Thực Thể & Vật Phẩm Trong Kho Đồ Giám",
      hubSearchOpenCodexBtn: "Mở Kho Đồ Giám đầy đủ →",
      categoriesGridTitle: "Danh Mục Chuyên Đề Chiến Thuật",
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

vi.mock("@/hooks/use-uid-session", () => ({
  useUidSession: () => ({
    activeAccount: null,
  }),
}));

describe("GuidesHubClient v3.0 (Phase 1 Lean Hub, Published-Only Filtering, Zero PRO Badges & Google MD3 Audit)", () => {
  it("renders Hero + Hot Tags and ONLY published Category 1 (Article 1.1) while auto-hiding unpublished stage tabs, quick tools, Codex, PRO badges, and beta notices", () => {
    render(<GuidesHubClient locale="vi" />);

    // Layer 1: Hero & Hot Tags
    expect(
      screen.getByText("Cẩm Nang Chiến Thuật & Bảng Số Liệu Min-Max")
    ).toBeDefined();
    expect(screen.getByRole("button", { name: /#DoubleDip/i })).toBeDefined();

    // Layer 2 & 3 auto-hidden in Phase 1 because Pivot/Season stages and Quick Tools target unpublished guides/Codex
    expect(
      screen.queryByRole("tab", { name: /Chuyển Hệ \(Ngày 21–45\)/i })
    ).toBeNull();
    expect(screen.queryByTestId("hub-tool-codex")).toBeNull();
    expect(screen.queryByTestId("hub-tool-2.1")).toBeNull();
    expect(screen.queryByTestId("hub-tool-3.1")).toBeNull();

    // Layer 4: Only Group 1 ("Nhập Môn & Luật Sống Còn") with Article 1.1 CTA is rendered
    expect(screen.getByText(/Bắt đầu: Bài 1\.1/i)).toBeDefined();
    expect(screen.queryByText(/TOPIC 02/i)).toBeNull();
    expect(screen.queryByText(/TOPIC 04/i)).toBeNull();

    // Zero Beta Feedback Notice on /guides hub
    expect(screen.queryByTestId("guides-feedback-pre-comment")).toBeNull();
  });

  it("filters published articles in both VI and EN locales when clicking a localized Hot Keyword Tag chip", () => {
    const { unmount } = render(<GuidesHubClient locale="vi" />);
    fireEvent.click(screen.getByRole("button", { name: /#BộLạc5Mythic/i }));
    expect(screen.getByText(/1 kết quả/i)).toBeDefined();
    expect(screen.queryByTestId("hub-search-codex-section")).toBeNull();
    unmount();

    render(<GuidesHubClient locale="en" />);
    fireEvent.click(screen.getByRole("button", { name: /#9SoulStones/i }));
    expect(screen.getByText(/1 kết quả/i)).toBeDefined();
  });

  it("expands and collapses the published Group 1 category article list on demand in Bento Grid with zero PRO badges", () => {
    render(<GuidesHubClient locale="vi" />);
    const expandBtns = screen.getAllByRole("button", {
      name: /Xem đầy đủ/i,
    });
    expect(expandBtns.length).toBe(1);

    fireEvent.click(expandBtns[0]);
    expect(
      screen.getByRole("button", { name: /Thu gọn danh sách bài/i })
    ).toBeDefined();
  });

  it("enforces Google MD3 Phase 3.1 standards: 16px mobile search input, 44px touch targets on Hot Tags, and zero sub-12px classes", () => {
    render(<GuidesHubClient locale="vi" />);

    const searchInput = screen.getByPlaceholderText(/Tìm tướng, sự kiện/i);
    expect(searchInput.className).toContain("text-base");
    expect(searchInput.className).toContain("h-11");

    const hotTagBtn = screen.getByRole("button", { name: /#DoubleDip/i });
    expect(hotTagBtn.className).toContain("min-h-[44px]");
    expect(hotTagBtn.className).toContain("font-sans");

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

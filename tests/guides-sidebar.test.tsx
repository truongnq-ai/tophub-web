import React from "react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { GuidesSidebar } from "../src/components/guides/guides-sidebar";

const mockPathname = vi.fn(() => "/guides/roadmap/horde-pivot-roadmap");
const mockUidSession = vi.fn(() => ({
  activeAccount: {
    uid: "1000000000001",
    nickname: "CommanderVN",
    server_id: "105",
    added_at: 1700000000000,
    active_plan: "PRO" as const,
  },
  isLoaded: true,
}));

vi.mock("next-intl", () => ({
  useLocale: () => "vi",
  useTranslations: () => (key: string, params?: Record<string, unknown>) => {
    if (key === "searchResultsCount" && params) return `${params.count} kết quả`;
    if (key === "articlesCount" && params) return `${params.count} bài viết`;
    const map: Record<string, string> = {
      searchPlaceholder: "Tìm tướng, sự kiện...",
      clearSearch: "Xóa bộ lọc tìm kiếm",
      backToHub: "Tổng quan Cẩm Nang",
      mobileMenuBtn: "Danh Mục Cẩm Nang (8 Nhóm)",
      collapseSidebar: "Thu gọn danh mục",
      expandSidebar: "Mở rộng danh mục",
      uidPillLinkAccount: "Liên kết Game UID • Bật Bot & PRO",
      uidPillManageBot: "Quản lý Bot",
      searchNoResults: "Không tìm thấy bài viết nào.",
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
  usePathname: () => mockPathname(),
}));

vi.mock("@/hooks/use-uid-session", () => ({
  useUidSession: () => mockUidSession(),
}));

describe("GuidesSidebar (Phase 1 Hardened Redesign)", () => {
  beforeEach(() => {
    window.localStorage.clear();
    mockPathname.mockReturnValue("/guides/roadmap/horde-pivot-roadmap");
  });

  it("renders CompactUidStatusPill with active account details", () => {
    render(<GuidesSidebar />);
    expect(screen.getAllByText(/CommanderVN/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/S105/i).length).toBeGreaterThan(0);
  });

  it("enforces Single-Accordion behavior: only active category is open initially, and clicking another category closes the previous one", () => {
    render(<GuidesSidebar />);

    const group4Btn = screen.getByRole("button", {
      name: /4\. Lộ Trình Server & Chuyển Giao Mùa/i,
    });
    const group1Btn = screen.getByRole("button", {
      name: /1\. Nhập Môn & Luật Sống Còn/i,
    });

    expect(group4Btn.getAttribute("data-state")).toBe("open");
    expect(group1Btn.getAttribute("data-state")).toBe("closed");

    // Click Group 1 -> Group 1 opens, Group 4 closes
    fireEvent.click(group1Btn);
    expect(group1Btn.getAttribute("data-state")).toBe("open");
    expect(group4Btn.getAttribute("data-state")).toBe("closed");
  });

  it("toggles desktop sidebar collapsed rail and persists state to localStorage", () => {
    render(<GuidesSidebar />);
    const collapseBtn = screen.getByRole("button", {
      name: /Thu gọn danh mục/i,
    });
    fireEvent.click(collapseBtn);

    expect(
      window.localStorage.getItem("tophub_guides_sidebar_collapsed")
    ).toBe("1");
    expect(
      screen.getByRole("button", { name: /Mở rộng danh mục/i })
    ).toBeDefined();
  });
});

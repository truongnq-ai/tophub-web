import fs from "node:fs";
import path from "node:path";
import React from "react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { GuidesShell } from "../src/components/guides/guides-shell";
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
      sidebarCodexLink: "Kho Đồ Giám (Codex)",
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
    onClick,
    ...rest
  }: {
    href: string;
    children: React.ReactNode;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  }) => (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        onClick?.(e);
      }}
      {...rest}
    >
      {children}
    </a>
  ),
  usePathname: () => mockPathname(),
}));

vi.mock("@/hooks/use-uid-session", () => ({
  useUidSession: () => mockUidSession(),
}));

describe("GuidesSidebar (Phase 1 Hardened Redesign & Phase 3.1 Google MD3 Audit)", () => {
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

  it("automatically collapses the desktop sidebar to w-14 icon rail when an article link is clicked", () => {
    render(<GuidesSidebar />);

    // Click an article inside the open Group 4 accordion
    const articleLink = screen.getByRole("link", {
      name: /4\.1/i,
    });
    fireEvent.click(articleLink);

    // Desktop sidebar immediately collapses to w-14 and persists "1"
    expect(
      window.localStorage.getItem("tophub_guides_sidebar_collapsed")
    ).toBe("1");
    expect(
      screen.getByRole("button", { name: /Mở rộng danh mục/i })
    ).toBeDefined();
  });

  it("expands the sidebar to the clicked category when a category icon button is clicked in the collapsed w-14 rail", () => {
    window.localStorage.setItem("tophub_guides_sidebar_collapsed", "1");
    render(<GuidesSidebar />);

    const group1RailBtn = screen.getByRole("button", {
      name: /1\. Nhập Môn & Luật Sống Còn/i,
    });
    fireEvent.click(group1RailBtn);

    expect(
      window.localStorage.getItem("tophub_guides_sidebar_collapsed")
    ).toBe("0");
    const group1AccordionBtn = screen.getByRole("button", {
      name: /1\. Nhập Môn & Luật Sống Còn/i,
    });
    expect(group1AccordionBtn.getAttribute("data-state")).toBe("open");
  });

  it("renders clean main titles without English parenthetical clutter in the w-64 sidebar while preserving full title tooltip", () => {
    render(<GuidesSidebar />);
    const articleLink = screen.getByRole("link", { name: /4\.1/i });
    expect(articleLink.getAttribute("title")).toContain("(");
    expect(articleLink.textContent).not.toContain("(");
  });

  it("enforces Google MD3 Phase 3.1 standards: px-3 sm:px-6 mobile shell gutter, 44px touch targets, 16px mobile search input, and zero sub-12px classes across GuidesShell, CompactUidStatusPill, and GuidesSidebar", () => {
    const { container } = render(
      <GuidesShell locale="vi">
        <div data-testid="shell-child">Child Content</div>
      </GuidesShell>
    );

    // 1. GuidesShell outer container uses px-3 sm:px-6 for maximum 375px mobile reading width
    const shellRoot = container.firstElementChild as HTMLElement;
    expect(shellRoot.className).toContain("px-3");
    expect(shellRoot.className).toContain("sm:px-6");

    // 2. Search input uses text-base sm:text-sm and h-11 / min-h-[44px] (prevents iOS Safari auto-zoom)
    const searchInput = screen.getByPlaceholderText(/Tìm tướng, sự kiện/i);
    expect(searchInput.className).toContain("text-base");
    expect(searchInput.className).toContain("h-11");

    // 3. Hub & Codex navigation links and UID status pill enforce min-h-[44px]
    const codexLink = screen.getByTestId("sidebar-codex-link");
    expect(codexLink.className).toContain("min-h-[44px]");

    // 4. Static source scan: zero sub-12px classes (text-[8px..11px]) in all 3 files
    const filesToAudit = [
      "../src/components/guides/guides-shell.tsx",
      "../src/components/guides/compact-uid-status-pill.tsx",
      "../src/components/guides/guides-sidebar.tsx",
    ];
    for (const relPath of filesToAudit) {
      const source = fs.readFileSync(path.resolve(__dirname, relPath), "utf8");
      expect(source).not.toMatch(/text-\[(8|9|10|11)px\]/);
    }
  });

  it("renders sequential menu numbering 1 ➔ 9 without 'Phần 1/2/3 •' prefix and shows '5. Danh sách event' with 6 canonical sub-menus (5.1 ➔ 5.6)", () => {
    const { container } = render(<GuidesSidebar />);

    // Zero 'Phần 1 •' / 'Part 1 •' clutter anywhere in the sidebar
    expect(container.textContent).not.toMatch(/Phần\s+[123]\s*•/i);
    expect(container.textContent).not.toMatch(/Part\s+[123]\s*•/i);

    const cat5Btn = screen.getByRole("button", {
      name: /^5\.\s*Danh sách event$/i,
    });
    expect(cat5Btn).toBeDefined();

    // Open Category 5 and verify 6 sub-menus 5.1 ➔ 5.6
    fireEvent.click(cat5Btn);
    expect(cat5Btn.getAttribute("data-state")).toBe("open");

    for (const code of ["5.1", "5.2", "5.3", "5.4", "5.5", "5.6"]) {
      expect(screen.getByRole("link", { name: new RegExp(code) })).toBeDefined();
    }

    // Verify Zone III categories display as 6, 7, 8, 9
    expect(
      screen.getByRole("button", {
        name: /^6\.\s*Trang Bị, Lãnh Chúa & Vũ Khí$/i,
      })
    ).toBeDefined();
    expect(
      screen.getByRole("button", {
        name: /^9\.\s*Hạ Tầng, Công Nghệ & Bảng Số Liệu$/i,
      })
    ).toBeDefined();
  });
});

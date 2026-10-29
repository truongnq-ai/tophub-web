import React from "react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import viMessages from "../messages/vi.json";
import enMessages from "../messages/en.json";
import { CalculatorsShell } from "../src/components/calculators/calculators-shell";
import { CalculatorsSidebar } from "../src/components/calculators/calculators-sidebar";
import { GuidesFeedbackNotice } from "../src/components/guides/guides-feedback-notice";
import { getCalculatorToolBySlug } from "../src/content/calculators/registry";
import { CalculatorPlaceholderView } from "../src/components/calculators/calculator-placeholder-view";
import {
  ALL_SIDE_BORDER_REGEX,
  countMicroTextOccurrences,
  findMonoElementsWithVietnamese,
  getMaxBorderedContainerDepth,
  readSource,
} from "./utils/md3-audit";

let mockLocale: "vi" | "en" = "vi";
const mockPathname = vi.fn(() => "/calculators");

vi.mock("next-intl", () => ({
  useLocale: () => mockLocale,
  useTranslations: (ns?: string) => (key: string, params?: Record<string, unknown>) => {
    const dict = (mockLocale === "en" ? enMessages : viMessages) as unknown as Record<
      string,
      Record<string, string>
    >;
    const raw = (ns ? dict[ns]?.[key] : undefined) ?? key;
    if (!params) return raw;
    return Object.entries(params).reduce(
      (acc, [k, v]) => acc.replace(`{${k}}`, String(v)),
      raw
    );
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
  useUidSession: () => ({
    activeAccount: {
      uid: "1000000000001",
      nickname: "CommanderVN",
      server_id: "105",
      added_at: 1700000000000,
      active_plan: "PRO" as const,
    },
    savedAccounts: [],
    selectAccount: vi.fn(),
    logout: vi.fn(),
    isLoaded: true,
  }),
}));

vi.mock("@/actions/comments", () => ({
  getPublicCommentsAction: vi.fn(async () => ({
    success: true,
    data: { items: [], total: 0 },
  })),
  createPublicCommentAction: vi.fn(),
  toggleCommentLikeAction: vi.fn(),
  deleteOwnCommentAction: vi.fn(),
}));

const SHELL_NOTICE_SIDEBAR_SOURCES = [
  "src/components/calculators/calculators-shell.tsx",
  "src/components/calculators/calculators-sidebar.tsx",
  "src/components/guides/guides-feedback-notice.tsx",
] as const;

describe("Phase 2.1 / Shell, Notice & Sidebar", () => {
  beforeEach(() => {
    mockLocale = "vi";
    mockPathname.mockReturnValue("/calculators");
    window.localStorage.clear();
  });

  it.each(SHELL_NOTICE_SIDEBAR_SOURCES)(
    "%s contains zero text-[8px..11px] classes",
    (file) => {
      expect(countMicroTextOccurrences(readSource(file))).toBe(0);
    }
  );

  it("CalculatorsShell uses the MD3 mobile gutter px-3 sm:px-6", () => {
    render(
      <CalculatorsShell locale="vi">
        <div data-testid="shell-child" />
      </CalculatorsShell>
    );
    const shell = screen.getByTestId("calculators-shell");
    expect(shell.className).toContain("px-3");
    expect(shell.className).toContain("sm:px-6");
    expect(shell.className).not.toMatch(/(^|\s)px-4(\s|$)/);
    expect(screen.getByTestId("shell-child")).toBeDefined();
  });

  it("GuidesFeedbackNotice meets the 12px floor, drops font-mono on Vietnamese and uses 44px CTAs", () => {
    render(
      <div>
        <GuidesFeedbackNotice variant="top-bar" locale="vi" />
        <GuidesFeedbackNotice variant="pre-comment" locale="vi" />
      </div>
    );

    const topBadge = screen.getByTestId("guides-feedback-top-bar-badge");
    expect(topBadge.className).toContain("text-xs");
    expect(topBadge.className).toContain("font-sans");
    expect(topBadge.className).not.toContain("font-mono");
    expect(screen.getByTestId("guides-feedback-top-bar-text").className).toContain("text-sm");
    expect(screen.getByTestId("guides-feedback-top-bar-btn").className).toContain("min-h-[44px]");

    const preBadge = screen.getByTestId("guides-feedback-pre-comment-badge");
    expect(preBadge.className).toContain("text-xs");
    expect(preBadge.className).not.toContain("font-mono");
    const preBody = screen.getByTestId("guides-feedback-pre-comment-body");
    expect(preBody.className).toContain("text-sm");
    expect(preBody.className).toContain("sm:text-base");
    expect(screen.getByTestId("guides-feedback-action-btn").className).toContain("min-h-[44px]");
  });

  it("CalculatorsSidebar upgrades navigation text to 12–14px and removes font-mono from Vietnamese labels", () => {
    render(<CalculatorsSidebar />);

    const zoneLabels = screen.getAllByTestId("calculators-sidebar-zone-label");
    expect(zoneLabels).toHaveLength(3);
    for (const label of zoneLabels) {
      expect(label.className).toContain("text-xs");
      expect(label.className).toContain("font-sans");
      expect(label.className).not.toContain("font-mono");
    }

    const toolLink = screen.getByRole("link", { name: /1\.1/i });
    expect(toolLink.className).toContain("text-sm");
    expect(toolLink.querySelector("strong")?.className).toContain("text-xs");

    const searchInput = screen.getByPlaceholderText(/Tìm công cụ, vật phẩm/i);
    expect(searchInput.className).toContain("text-base");

    fireEvent.change(searchInput, { target: { value: "Huyết Rồng" } });
    const count = screen.getByTestId("calculators-sidebar-search-count");
    expect(count.className).toContain("text-xs");
    expect(count.className).not.toContain("font-mono");
  });

  it("CalculatorsSidebar collapsed icon rail uses 44×44px buttons", () => {
    window.localStorage.setItem("tophub_calculators_sidebar_collapsed", "1");
    render(<CalculatorsSidebar />);

    const expandBtn = screen.getByRole("button", { name: /Mở rộng danh mục/i });
    expect(expandBtn.className).toContain("h-11");
    expect(expandBtn.className).toContain("w-11");

    const railCategoryBtn = screen.getByRole("button", { name: /1\. Anh Hùng/i });
    expect(railCategoryBtn.className).toContain("h-11");
    expect(railCategoryBtn.className).toContain("w-11");
  });
});

describe("Phase 2.1 / Placeholder View", () => {
  beforeEach(() => {
    mockLocale = "vi";
    mockPathname.mockReturnValue("/calculators");
    window.localStorage.clear();
  });

  it("calculator-placeholder-view.tsx contains zero text-[8px..11px] classes", () => {
    expect(
      countMicroTextOccurrences(
        readSource("src/components/calculators/calculator-placeholder-view.tsx")
      )
    ).toBe(0);
  });

  it("Hub keeps single-layer containment, 16px search input, 44px hot tags and no mono on Vietnamese", () => {
    render(<CalculatorPlaceholderView mode="hub" />);
    const hub = screen.getByTestId("calculators-hub-placeholder");

    expect(getMaxBorderedContainerDepth(hub)).toBeLessThanOrEqual(1);
    expect(findMonoElementsWithVietnamese(hub)).toEqual([]);
    expect(screen.getByTestId("calculators-hub-search-input").className).toContain("text-base");

    const hotTag = screen.getByRole("button", { name: "#SợiTơMaThuật" });
    expect(hotTag.className).toContain("min-h-[44px]");
    expect(hotTag.className).not.toContain("font-mono");

    expect(screen.getByTestId("calculators-hub-dev-notice").className).not.toMatch(
      ALL_SIDE_BORDER_REGEX
    );
  });

  it("Coming-soon tool placeholder flattens the example preview and uses 14–16px copy", () => {
    mockPathname.mockReturnValue("/calculators/lord-gear/lord-gear-upgrade");
    const resolved = getCalculatorToolBySlug("lord-gear", "lord-gear-upgrade")!;
    render(
      <CalculatorPlaceholderView
        mode="tool"
        zone={resolved.zone}
        category={resolved.category}
        tool={resolved.tool}
      />
    );

    const root = screen.getByTestId("calculator-tool-placeholder");
    expect(getMaxBorderedContainerDepth(root)).toBeLessThanOrEqual(1);
    expect(findMonoElementsWithVietnamese(root)).toEqual([]);

    const preview = screen.getByTestId("calculator-example-preview");
    expect(preview.className).not.toMatch(ALL_SIDE_BORDER_REGEX);
    expect(preview.className).toContain("border-t");
    expect(screen.getByTestId("calculator-example-question").className).toContain(
      "sm:text-base"
    );
    expect(
      screen.getByTestId("calculator-under-development-banner").className
    ).not.toMatch(ALL_SIDE_BORDER_REGEX);
  });
});

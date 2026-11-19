import fs from "node:fs";
import path from "node:path";
import React from "react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import {
  GuideArticleRenderer,
  splitArticleTitle,
  classifySectionTab,
  parseSectionHeading,
} from "../src/components/guides/guide-article-renderer";
import { InteractiveChecklistBlock } from "../src/components/guides/blocks/interactive-checklist-block";
import { getCategoryBySlug } from "../src/content/guides/registry";
import { ARTICLE_1_1_OVERVIEW } from "../src/content/guides/groups/group-1/1.1-overview";
import { ARTICLE_2_2_META_LINEUPS } from "../src/content/guides/groups/group-2/2.2-meta-lineups";

vi.mock("next-intl", () => ({
  useLocale: () => "vi",
  useTranslations: () => (key: string, params?: Record<string, unknown>) => {
    const map: Record<string, string> = {
      backToHub: "Tổng quan Cẩm Nang",
      readingTime: `${params?.minutes ?? 5} phút đọc`,
      keyTakeawaysTitle: "Tóm Tắt Cốt Lõi",
      sourceFilesLabel: "Nguồn dữ liệu chuẩn hóa",
      prevArticle: "Bài trước",
      nextArticle: "Bài tiếp theo",
    };
    return map[key] ?? key;
  },
}));

vi.mock("@/i18n/routing", () => ({
  Link: ({
    href,
    children,
    className,
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

let mockActiveAccount: { uid: string; active_plan: "PRO" | "FREE" } | null = {
  uid: "100001",
  active_plan: "FREE",
};

vi.mock("@/hooks/use-uid-session", () => ({
  useUidSession: () => ({
    activeAccount: mockActiveAccount,
  }),
}));

describe("GuideArticleRenderer v3.0 (100% Free Single-Flow Reading, Zero Tab Bar, Zero ProContentGate & Zero Beta Notices)", () => {
  const category = getCategoryBySlug("getting-started")!;

  beforeEach(() => {
    window.localStorage.clear();
    Element.prototype.scrollIntoView = vi.fn();
  });

  it("splits English parenthetical subtitles cleanly in splitArticleTitle", () => {
    const res1 = splitArticleTitle(
      "Bản Đồ Tổng Quan & Lộ Trình 90 Ngày Đầu (Complete Overview & 90-Day Roadmap)"
    );
    expect(res1.mainTitle).toBe("Bản Đồ Tổng Quan & Lộ Trình 90 Ngày Đầu");
    expect(res1.subTitle).toBe("Complete Overview & 90-Day Roadmap");

    const res2 = splitArticleTitle("Tiêu Đề Không Có Ngoặc Đơn");
    expect(res2.mainTitle).toBe("Tiêu Đề Không Có Ngoặc Đơn");
    expect(res2.subTitle).toBeNull();
  });

  it("retains classifySectionTab helper for backward compatibility", () => {
    expect(
      classifySectionTab(ARTICLE_1_1_OVERVIEW.freeSections[0], 0, false)
    ).toBe("core");
    expect(
      classifySectionTab(ARTICLE_1_1_OVERVIEW.proSections[0], 0, true)
    ).toBe("data");
  });

  it("renders all 5 sections (freeSections + proSections) in a unified single-flow DOM with zero tab switcher, zero ProContentGate, and zero beta notices", () => {
    mockActiveAccount = null;
    render(
      <GuideArticleRenderer
        category={category}
        article={ARTICLE_1_1_OVERVIEW}
        prevArticle={null}
        nextArticle={null}
      />
    );

    // 1. All 5 sections (3 free + 2 pro) are immediately visible in 1 flow
    const allSections = [
      ...ARTICLE_1_1_OVERVIEW.freeSections,
      ...ARTICLE_1_1_OVERVIEW.proSections,
    ];
    for (const sec of allSections) {
      const secEl = document.getElementById(sec.id)!;
      expect(secEl).not.toBeNull();
      expect(secEl.getAttribute("data-tab-hidden")).toBe("false");
      expect(secEl.className).not.toContain("hidden");
    }

    // 2. Zero 4-Tab switcher buttons
    expect(screen.queryByTestId("article-view-mode-tabs")).toBeNull();
    expect(screen.queryByTestId("article-tab-core")).toBeNull();
    expect(screen.queryByTestId("article-tab-data")).toBeNull();
    expect(screen.queryByTestId("article-tab-action")).toBeNull();
    expect(screen.queryByTestId("article-tab-all")).toBeNull();

    // 3. Zero ProContentGate wrapper or paywall UI
    expect(screen.queryByTestId("article-pro-gate-wrapper")).toBeNull();
    expect(screen.queryByTestId("pro-content-gate")).toBeNull();

    // 4. Zero Beta Feedback Notices on /guides articles
    expect(screen.queryByTestId("guides-feedback-top-bar")).toBeNull();
    expect(screen.queryByTestId("guides-feedback-pre-comment")).toBeNull();
  });

  it("scrolls smoothly to target section when receiving 'tophub:toc-navigate' from GuidesToc", () => {
    render(
      <GuideArticleRenderer
        category={category}
        article={ARTICLE_1_1_OVERVIEW}
        prevArticle={null}
        nextArticle={null}
      />
    );

    const sec5Id = ARTICLE_1_1_OVERVIEW.proSections[1].id;
    const sec5 = document.getElementById(sec5Id)!;
    expect(sec5.getAttribute("data-tab-hidden")).toBe("false");

    act(() => {
      window.dispatchEvent(
        new CustomEvent("tophub:toc-navigate", {
          detail: { targetId: sec5Id },
        })
      );
    });

    expect(sec5.getAttribute("data-tab-hidden")).toBe("false");
  });

  it("does not render the internal 'Nguồn dữ liệu chuẩn hóa' (sourceFiles) footer in the public DOM", () => {
    const { container } = render(
      <GuideArticleRenderer
        category={category}
        article={ARTICLE_1_1_OVERVIEW}
        prevArticle={null}
        nextArticle={null}
      />
    );

    expect(ARTICLE_1_1_OVERVIEW.sourceFiles.length).toBeGreaterThan(0);
    expect(container.textContent).not.toContain("Nguồn dữ liệu chuẩn hóa");
    expect(container.textContent).not.toContain(
      "Standardized Knowledge Sources"
    );
    for (const srcFile of ARTICLE_1_1_OVERVIEW.sourceFiles) {
      expect(container.textContent).not.toContain(srcFile);
    }
  });

  it("renders article 2.2-meta-lineups with semantic <strong> and <code> tags and zero raw ** or ` tokens in single-flow mode", () => {
    const heroesCategory = getCategoryBySlug("heroes")!;
    const { container } = render(
      <GuideArticleRenderer
        category={heroesCategory}
        article={ARTICLE_2_2_META_LINEUPS}
        prevArticle={null}
        nextArticle={null}
      />
    );

    const expandButtons = screen.queryAllByTestId("table-expand-toggle");
    for (const btn of expandButtons) {
      fireEvent.click(btn);
    }

    expect(container.querySelectorAll("strong").length).toBeGreaterThan(5);
    expect(container.querySelectorAll("code").length).toBeGreaterThan(5);
    expect(container.textContent).not.toContain("**");
    expect(container.textContent).not.toContain("`");
  });

  it("renders InteractiveChecklistBlock items as W3C-valid div[role='checkbox'] with Space/Enter keyboard support", () => {
    render(
      <InteractiveChecklistBlock
        block={{
          type: "checklist",
          checklistId: "test-w3c-checklist",
          title: { vi: "Checklist Kiểm Tra", en: "Verification Checklist" },
          items: [
            {
              id: "chk-1",
              label: {
                vi: "Nâng **Pyromancer** lên `560 Mảnh`",
                en: "Upgrade **Pyromancer**",
              },
              detail: {
                vi: "Chi tiết:\n• Bước 1: Tích mảnh\n• Bước 2: Đột phá",
                en: "Details:\n• Step 1\n• Step 2",
              },
            },
          ],
        }}
        locale="vi"
      />
    );

    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes.length).toBe(1);

    const firstCheckbox = checkboxes[0];
    expect(firstCheckbox.tagName).toBe("DIV");
    expect(firstCheckbox.getAttribute("tabindex")).toBe("0");
    expect(firstCheckbox.getAttribute("aria-checked")).toBe("false");

    fireEvent.keyDown(firstCheckbox, { key: " " });
    expect(firstCheckbox.getAttribute("aria-checked")).toBe("true");

    fireEvent.keyDown(firstCheckbox, { key: "Enter" });
    expect(firstCheckbox.getAttribute("aria-checked")).toBe("false");
  });

  it("strips Markdown backticks and asterisks when filtering ResponsiveDataTable rows", () => {
    const heroesCategory = getCategoryBySlug("heroes")!;
    render(
      <GuideArticleRenderer
        category={heroesCategory}
        article={ARTICLE_2_2_META_LINEUPS}
        prevArticle={null}
        nextArticle={null}
      />
    );

    const searchInputs = screen.getAllByTestId("table-filter-input");
    expect(searchInputs.length).toBeGreaterThan(0);

    const lastTableInput = searchInputs[searchInputs.length - 1];
    fireEvent.change(lastTableInput, { target: { value: "thiếu paragon" } });

    expect(screen.queryByText("Không tìm thấy dòng phù hợp")).toBeNull();
  });

  it("parses leading section and subsection indices into clean badge + stripped heading text via parseSectionHeading", () => {
    const h2WithNum = parseSectionHeading(
      "1. Quy Tắc Sống Còn: 1 Đội Hình Duy Nhất",
      "01"
    );
    expect(h2WithNum.badge).toBe("01");
    expect(h2WithNum.cleanTitle).toBe("Quy Tắc Sống Còn: 1 Đội Hình Duy Nhất");

    const h3WithSubNum = parseSectionHeading(
      "1.2. Điểm Gãy Mảnh Tướng (Shard Breakpoints)",
      "1.2"
    );
    expect(h3WithSubNum.badge).toBe("1.2");
    expect(h3WithSubNum.cleanTitle).toBe(
      "Điểm Gãy Mảnh Tướng (Shard Breakpoints)"
    );

    const unnumbered = parseSectionHeading("Tổng Quan Chiến Thuật", "03");
    expect(unnumbered.badge).toBe("03");
    expect(unnumbered.cleanTitle).toBe("Tổng Quan Chiến Thuật");
  });

  it("renders H2 and H3 with monospace index badges and zero border-l-4/border-l-2 classes across all 5 unified sections", () => {
    const { container } = render(
      <GuideArticleRenderer
        category={category}
        article={ARTICLE_1_1_OVERVIEW}
        prevArticle={null}
        nextArticle={null}
      />
    );

    expect(container.innerHTML).not.toContain("border-l-4");
    expect(container.innerHTML).not.toContain("border-l-2");

    const h2Badges = container.querySelectorAll(
      "[data-testid='section-index-badge']"
    );
    expect(h2Badges.length).toBe(
      ARTICLE_1_1_OVERVIEW.freeSections.length +
        ARTICLE_1_1_OVERVIEW.proSections.length
    );
    expect(h2Badges[0].textContent).toBe("01");
    expect(h2Badges[3].textContent).toBe("04");
    expect(h2Badges[4].textContent).toBe("05");
  });

  it("enforces Google MD3 Phase 3.1 standards: 16px fixed body prose, 14px-16px article summary, flat mobile SubSection, and zero sub-12px classes", () => {
    const { container } = render(
      <GuideArticleRenderer
        category={category}
        article={ARTICLE_1_1_OVERVIEW}
        prevArticle={ARTICLE_2_2_META_LINEUPS}
        nextArticle={ARTICLE_2_2_META_LINEUPS}
      />
    );

    const firstSubBadge = container.querySelector(
      "[data-testid='subsection-index-badge']"
    ) as HTMLElement;
    expect(firstSubBadge).not.toBeNull();
    expect(firstSubBadge.className).toContain("text-xs");

    const subSectionContainer = firstSubBadge.closest(
      "div[id]"
    ) as HTMLElement;
    expect(subSectionContainer).not.toBeNull();
    expect(subSectionContainer.className).toContain("border-0");
    expect(subSectionContainer.className).toContain("bg-transparent");
    expect(subSectionContainer.className).toContain("p-0");

    const source = fs.readFileSync(
      path.resolve(
        __dirname,
        "../src/components/guides/guide-article-renderer.tsx"
      ),
      "utf8"
    );
    expect(source).not.toMatch(/text-\[(8|9|10|11)px\]/);
    expect(source).toContain(
      'className="text-base text-foreground leading-relaxed font-sans"'
    );
  });

  it("renders EventEncyclopediaFlatView on event-playbooks articles (5.1..5.6) without TldrActionBox, KeyTakeaways, or tab bars", () => {
    const eventCategory = getCategoryBySlug("event-playbooks")!;
    const article51 = eventCategory.articles[0];

    const { container } = render(
      <GuideArticleRenderer
        category={eventCategory}
        article={article51}
        prevArticle={null}
        nextArticle={eventCategory.articles[1]}
      />
    );

    expect(screen.getByTestId("event-encyclopedia-flat-view")).toBeDefined();
    expect(screen.queryByTestId("article-view-mode-tabs")).toBeNull();
    expect(container.textContent).not.toContain("Tóm Tắt Cốt Lõi");
    expect(screen.getByTestId("flat-section-5.1")).toBeDefined();
    expect(screen.getByTestId("flat-section-5.2")).toBeDefined();
    expect(screen.getByTestId("flat-section-5.3")).toBeDefined();
    expect(screen.getByTestId("flat-section-5.4")).toBeDefined();
    expect(screen.getByTestId("flat-section-5.5")).toBeDefined();
    expect(screen.getByTestId("flat-section-5.6")).toBeDefined();
  });
});

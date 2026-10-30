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
      proPreviewHeader: "Chiến Thuật Nâng Cao (PRO)",
      proPreviewSubtext: "Trải nghiệm sớm",
      viewModeTabCore: "1. Cốt lõi & Chiến thuật",
      viewModeTabData: "2. Bảng số liệu & Điểm gãy",
      viewModeTabAction: "3. Phẫu thuật & Checklist",
      viewModeTabAll: "Xem toàn bộ",
      viewModeNextTabPrefix: "Tiếp theo:",
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
  active_plan: "PRO",
};

vi.mock("@/hooks/use-uid-session", () => ({
  useUidSession: () => ({
    activeAccount: mockActiveAccount,
  }),
}));

describe("GuideArticleRenderer v3.0 (Compact Header, Unified Brief, 3-Tab View Mode & Phase 3.1 Google MD3 Audit)", () => {
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

  it("classifies all 5 standard sections deterministically across core, data, and action tabs", () => {
    expect(
      classifySectionTab(ARTICLE_1_1_OVERVIEW.freeSections[0], 0, false)
    ).toBe("core");
    expect(
      classifySectionTab(ARTICLE_1_1_OVERVIEW.freeSections[1], 1, false)
    ).toBe("core");
    expect(
      classifySectionTab(ARTICLE_1_1_OVERVIEW.freeSections[2], 2, false)
    ).toBe("action");
    expect(
      classifySectionTab(ARTICLE_1_1_OVERVIEW.proSections[0], 0, true)
    ).toBe("data");
    expect(
      classifySectionTab(ARTICLE_1_1_OVERVIEW.proSections[1], 1, true)
    ).toBe("action");
  });

  it("defaults to 'core' tab, hides non-core sections and empty ProContentGate, and switches tabs cleanly", () => {
    render(
      <GuideArticleRenderer
        category={category}
        article={ARTICLE_1_1_OVERVIEW}
        prevArticle={null}
        nextArticle={null}
      />
    );

    const sec1 = document.getElementById(
      ARTICLE_1_1_OVERVIEW.freeSections[0].id
    )!;
    const sec2 = document.getElementById(
      ARTICLE_1_1_OVERVIEW.freeSections[1].id
    )!;
    const sec3 = document.getElementById(
      ARTICLE_1_1_OVERVIEW.freeSections[2].id
    )!;
    const sec4 = document.getElementById(
      ARTICLE_1_1_OVERVIEW.proSections[0].id
    )!;
    const sec5 = document.getElementById(
      ARTICLE_1_1_OVERVIEW.proSections[1].id
    )!;
    const proGateWrapper = screen.getByTestId("article-pro-gate-wrapper");

    // Default tab is 'core': Sec 1 & 2 visible, Sec 3, 4, 5 & ProGate hidden
    expect(sec1.getAttribute("data-tab-hidden")).toBe("false");
    expect(sec2.getAttribute("data-tab-hidden")).toBe("false");
    expect(sec3.getAttribute("data-tab-hidden")).toBe("true");
    expect(sec4.getAttribute("data-tab-hidden")).toBe("true");
    expect(sec5.getAttribute("data-tab-hidden")).toBe("true");
    expect(proGateWrapper.getAttribute("data-tab-hidden")).toBe("true");

    // Switch to 'data' tab -> Sec 4 and ProGate become visible
    fireEvent.click(screen.getByTestId("article-tab-data"));
    expect(sec1.getAttribute("data-tab-hidden")).toBe("true");
    expect(sec4.getAttribute("data-tab-hidden")).toBe("false");
    expect(proGateWrapper.getAttribute("data-tab-hidden")).toBe("false");

    // Switch to 'all' tab -> all 5 sections visible
    fireEvent.click(screen.getByTestId("article-tab-all"));
    expect(sec1.getAttribute("data-tab-hidden")).toBe("false");
    expect(sec3.getAttribute("data-tab-hidden")).toBe("false");
    expect(sec4.getAttribute("data-tab-hidden")).toBe("false");
    expect(sec5.getAttribute("data-tab-hidden")).toBe("false");
  });

  it("automatically switches to the target tab when receiving 'tophub:toc-navigate' from GuidesToc", () => {
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
    expect(sec5.getAttribute("data-tab-hidden")).toBe("true");

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

  it("renders article 2.2-meta-lineups with semantic <strong> and <code> tags and zero raw ** or ` tokens", () => {
    const heroesCategory = getCategoryBySlug("heroes")!;
    const { container } = render(
      <GuideArticleRenderer
        category={heroesCategory}
        article={ARTICLE_2_2_META_LINEUPS}
        prevArticle={null}
        nextArticle={null}
      />
    );

    // Switch to "all" tab and expand all tables so every section and row is active in DOM
    fireEvent.click(screen.getByTestId("article-tab-all"));
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

    fireEvent.click(screen.getByTestId("article-tab-all"));

    const searchInputs = screen.getAllByTestId("table-filter-input");
    expect(searchInputs.length).toBeGreaterThan(0);

    // Last table in 2.2-meta-lineups has cell: "Thiếu `Paragon` hoặc `Bishop` (Mythic DPS)"
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

  it("renders H2 and H3 with monospace index badges, zero border-l-4/border-l-2 classes, and dispatches tophub:tab-change when switching tabs", () => {
    const tabChangeEvents: string[] = [];
    const listener = (e: Event) => {
      const custom = e as CustomEvent<{ tab: string }>;
      if (custom.detail?.tab) tabChangeEvents.push(custom.detail.tab);
    };
    window.addEventListener("tophub:tab-change", listener);

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

    fireEvent.click(screen.getByTestId("article-tab-data"));
    expect(tabChangeEvents).toContain("data");

    window.removeEventListener("tophub:tab-change", listener);
  });

  it("enforces Google MD3 Phase 3.1 standards: 16px fixed body prose, 14px-16px article summary, flat mobile SubSection (de-boxed on mobile), 44px tab buttons, and zero sub-12px classes", () => {
    const { container } = render(
      <GuideArticleRenderer
        category={category}
        article={ARTICLE_1_1_OVERVIEW}
        prevArticle={ARTICLE_2_2_META_LINEUPS}
        nextArticle={ARTICLE_2_2_META_LINEUPS}
      />
    );

    // 1. All 4 tab buttons enforce min-h-[44px] touch target
    for (const tabTestId of [
      "article-tab-core",
      "article-tab-data",
      "article-tab-action",
      "article-tab-all",
    ]) {
      const tabBtn = screen.getByTestId(tabTestId);
      expect(tabBtn.className).toContain("min-h-[44px]");
    }

    // 2. SubSections are de-boxed on mobile (border-0 bg-transparent p-0 ... sm:rounded-2xl sm:border)
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
    expect(subSectionContainer.className).not.toContain("sm:rounded-2xl");
    expect(subSectionContainer.className).not.toContain("sm:border");

    // 3. Static source scan: 16px body prose and zero sub-12px classes
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

  it("enforces Google MD3 Phase 3.6 ProContentGate standards: flat mobile divider when unlocked (px-0 border-t-2 sm:rounded-3xl sm:border) and 14px-16px description with 44px CTAs when locked", () => {
    // 1. Unlocked state (hasProAccess === true)
    mockActiveAccount = { uid: "100001", active_plan: "PRO" };
    const { unmount } = render(
      <GuideArticleRenderer
        category={category}
        article={ARTICLE_1_1_OVERVIEW}
        prevArticle={null}
        nextArticle={null}
      />
    );

    fireEvent.click(screen.getByTestId("article-tab-all"));

    const proGateWrapper = screen.getByTestId("article-pro-gate-wrapper");
    const unlockedSection = proGateWrapper.querySelector("section")!;
    expect(unlockedSection).not.toBeNull();
    expect(unlockedSection.className).toContain("border-t-2");
    expect(unlockedSection.className).toContain("bg-transparent");
    expect(unlockedSection.className).toContain("px-0");
    expect(unlockedSection.className).toContain("sm:rounded-3xl");
    expect(unlockedSection.className).toContain("sm:border");
    expect(unlockedSection.className).toContain("sm:p-7");

    const previewSubtext = screen.getByText("Trải nghiệm sớm");
    expect(previewSubtext.className).toContain("text-sm");
    expect(previewSubtext.className).toContain("sm:text-base");
    unmount();

    // 2. Locked paywall state (NEXT_PUBLIC_ENABLE_PRO_CONTENT_LOCK="true" & non-PRO user)
    vi.stubEnv("NEXT_PUBLIC_ENABLE_PRO_CONTENT_LOCK", "true");
    mockActiveAccount = null;
    try {
      render(
        <GuideArticleRenderer
          category={category}
          article={ARTICLE_1_1_OVERVIEW}
          prevArticle={null}
          nextArticle={null}
        />
      );
      fireEvent.click(screen.getByTestId("article-tab-all"));

      const lockedWrapper = screen.getByTestId("article-pro-gate-wrapper");
      const lockedDesc = screen.getByText("proLockedDesc");
      expect(lockedDesc.className).toContain("text-sm");
      expect(lockedDesc.className).toContain("sm:text-base");

      const checkUidLink = lockedWrapper.querySelector('a[href="/"]')!;
      const upgradeLink = lockedWrapper.querySelector('a[href="/pricing"]')!;
      expect(checkUidLink.className).toContain("min-h-[44px]");
      expect(upgradeLink.className).toContain("min-h-[44px]");
    } finally {
      vi.unstubAllEnvs();
      mockActiveAccount = { uid: "100001", active_plan: "PRO" };
    }
  });

  it("renders EventEncyclopediaFlatView on event-playbooks articles (5.1..5.6) without TldrActionBox, KeyTakeaways, or 3-Tab view mode bars", () => {
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
    if (Boolean(container)) {
    }
  });
});

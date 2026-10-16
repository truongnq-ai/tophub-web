import React from "react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import {
  GuideArticleRenderer,
  splitArticleTitle,
  classifySectionTab,
} from "../src/components/guides/guide-article-renderer";
import { getCategoryBySlug } from "../src/content/guides/registry";
import { ARTICLE_1_1_OVERVIEW } from "../src/content/guides/groups/group-1/1.1-overview";

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

vi.mock("@/hooks/use-uid-session", () => ({
  useUidSession: () => ({
    activeAccount: { uid: "100001", active_plan: "PRO" },
  }),
}));

describe("GuideArticleRenderer v3.0 (Compact Header, Unified Brief & 3-Tab View Mode)", () => {
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
});

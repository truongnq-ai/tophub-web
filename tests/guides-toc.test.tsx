import React from "react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { GuidesToc } from "../src/components/guides/guides-toc";
import { ARTICLE_1_2_STRICT_ONE_QUEUE } from "../src/content/guides/groups/group-1/1.2-strict-one-queue-rule";
import { ARTICLE_1_3_DIAMOND_SPENDING } from "../src/content/guides/groups/group-1/1.3-diamond-and-spending-guide";

vi.mock("next-intl", () => ({
  useLocale: () => "vi",
  useTranslations: () => (key: string) => {
    const map: Record<string, string> = {
      onThisPage: "Trên Trang Này",
      readingProgressLabel: "Tiến độ đọc",
      mobileTocBtn: "Mục lục bài viết",
    };
    return map[key] ?? key;
  },
}));

describe("GuidesToc (Single-Instance Hardened Scroll-Spy & Mobile Bar)", () => {
  const observeSpy = vi.fn();
  const disconnectSpy = vi.fn();

  beforeEach(() => {
    observeSpy.mockClear();
    disconnectSpy.mockClear();

    class MockIntersectionObserver {
      observe = observeSpy;
      unobserve = vi.fn();
      disconnect = disconnectSpy;
    }
    vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
  });

  it("returns null when no article is provided (e.g., on Hub page)", () => {
    const { container } = render(<GuidesToc />);
    expect(container.firstChild).toBeNull();
  });

  it("renders both the mobile sticky trigger and desktop TOC rail from a single instance without bulky UID card", () => {
    render(<GuidesToc article={ARTICLE_1_2_STRICT_ONE_QUEUE} />);

    expect(screen.getByText("Trên Trang Này")).toBeDefined();
    expect(screen.getByText("Tiến độ đọc")).toBeDefined();
    expect(
      screen.getByRole("button", { name: /Mục lục bài viết/i })
    ).toBeDefined();
    expect(
      screen.getByText(ARTICLE_1_2_STRICT_ONE_QUEUE.freeSections[0].title.vi)
    ).toBeDefined();
    expect(screen.queryByText("Tài Khoản Đang Đồng Hành")).toBeNull();
  });

  it("resets active section highlight when navigating to a different article (GAP-05 fix)", () => {
    const { rerender } = render(
      <GuidesToc article={ARTICLE_1_2_STRICT_ONE_QUEUE} />
    );
    const firstSec12 = ARTICLE_1_2_STRICT_ONE_QUEUE.freeSections[0].title.vi;
    expect(screen.getByText(firstSec12)).toBeDefined();

    // Rerender with Article 1.3
    rerender(<GuidesToc article={ARTICLE_1_3_DIAMOND_SPENDING} />);
    const firstSec13 = ARTICLE_1_3_DIAMOND_SPENDING.freeSections[0].title.vi;
    const link13 = screen.getByText(firstSec13).closest("a");
    expect(link13?.className).toContain("font-bold");
  });
});

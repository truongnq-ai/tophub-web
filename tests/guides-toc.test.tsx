import React from "react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
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
      neonShuttleAria: "Tiến độ đọc và Mục lục Neon",
      neonSectionEntered: "Đang đọc mục",
      neonTocHint: "Bấm để mở mục lục • Tự động sáng theo vị trí đọc",
    };
    return map[key] ?? key;
  },
}));

describe("GuidesToc (Scroll-Tracking Neon Shuttle Bubble)", () => {
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

  it("renders a floating Scroll-Tracking Neon Shuttle bubble that opens the Neon TOC panel with active neon glow and dimmed inactive items", () => {
    render(<GuidesToc article={ARTICLE_1_2_STRICT_ONE_QUEUE} />);

    const shuttleBtn = screen.getByRole("button", {
      name: /Tiến độ đọc và Mục lục Neon/i,
    });
    expect(shuttleBtn).toBeDefined();
    expect(shuttleBtn.textContent).toContain("0%");
    expect(screen.queryByText("Tài Khoản Đang Đồng Hành")).toBeNull();

    // Click shuttle bubble to open Neon TOC panel
    fireEvent.click(shuttleBtn);

    expect(screen.getByText("Trên Trang Này")).toBeDefined();
    expect(screen.getByText("Tiến độ đọc")).toBeDefined();

    const firstSecTitle = ARTICLE_1_2_STRICT_ONE_QUEUE.freeSections[0].title.vi;
    const secondSecTitle =
      ARTICLE_1_2_STRICT_ONE_QUEUE.freeSections[1].title.vi;

    const firstLink = screen.getByText(firstSecTitle).closest("a");
    const secondLink = screen.getByText(secondSecTitle).closest("a");

    expect(firstLink?.getAttribute("data-neon-active")).toBe("true");
    expect(secondLink?.getAttribute("data-neon-active")).toBe("false");
    expect(secondLink?.className).toContain("opacity-35");
  });

  it("resets active section highlight when navigating to a different article and updates neon glow on click", () => {
    const { rerender } = render(
      <GuidesToc article={ARTICLE_1_2_STRICT_ONE_QUEUE} />
    );

    const shuttleBtn = screen.getByRole("button", {
      name: /Tiến độ đọc và Mục lục Neon/i,
    });
    fireEvent.click(shuttleBtn);

    // Rerender with Article 1.3
    rerender(<GuidesToc article={ARTICLE_1_3_DIAMOND_SPENDING} />);
    const firstSec13 = ARTICLE_1_3_DIAMOND_SPENDING.freeSections[0].title.vi;
    const secondSec13 = ARTICLE_1_3_DIAMOND_SPENDING.freeSections[1].title.vi;

    const link1 = screen.getByText(firstSec13).closest("a");
    const link2 = screen.getByText(secondSec13).closest("a");

    expect(link1?.getAttribute("data-neon-active")).toBe("true");
    expect(link2?.getAttribute("data-neon-active")).toBe("false");
  });
});

import fs from "node:fs";
import path from "node:path";
import React from "react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import {
  GuidesToc,
  sanitizeTocTitle,
} from "../src/components/guides/guides-toc";
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

describe("GuidesToc (Scroll-Tracking Neon Shuttle Bubble & Phase 3.1 Google MD3 Audit)", () => {
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

  it("strips raw Markdown tokens (** and `) via sanitizeTocTitle and updates activeId when receiving tophub:tab-change", () => {
    expect(
      sanitizeTocTitle("1. Điểm gãy **Pyromancer** đạt `560 Mảnh`")
    ).toBe("1. Điểm gãy Pyromancer đạt 560 Mảnh");

    const sec1Id = ARTICLE_1_2_STRICT_ONE_QUEUE.freeSections[0].id;
    const sec2Id = ARTICLE_1_2_STRICT_ONE_QUEUE.freeSections[1].id;

    render(
      <div>
        <div id={sec1Id} data-tab-hidden="true" />
        <div id={sec2Id} data-tab-hidden="false" />
        <GuidesToc article={ARTICLE_1_2_STRICT_ONE_QUEUE} />
      </div>
    );

    const shuttleBtn = screen.getByRole("button", {
      name: /Tiến độ đọc và Mục lục Neon/i,
    });
    fireEvent.click(shuttleBtn);

    act(() => {
      window.dispatchEvent(
        new CustomEvent("tophub:tab-change", { detail: { tab: "data" } })
      );
    });

    const secondSecTitle =
      ARTICLE_1_2_STRICT_ONE_QUEUE.freeSections[1].title.vi;
    const secondLink = screen.getByText(secondSecTitle).closest("a");
    expect(secondLink?.getAttribute("data-neon-active")).toBe("true");
  });

  it("enforces Google MD3 Phase 3.1 standards: Close TOC button >= 44x44px, font-sans on Vietnamese progress label, and zero sub-12px classes", () => {
    render(<GuidesToc article={ARTICLE_1_2_STRICT_ONE_QUEUE} />);

    const shuttleBtn = screen.getByRole("button", {
      name: /Tiến độ đọc và Mục lục Neon/i,
    });
    fireEvent.click(shuttleBtn);

    const closeBtn = screen.getByRole("button", { name: "Close TOC" });
    expect(closeBtn.className).toContain("min-h-[44px]");
    expect(closeBtn.className).toContain("min-w-[44px]");

    const progressLabel = screen.getByText("Tiến độ đọc");
    expect(progressLabel.className).toContain("font-sans");
    expect(progressLabel.className).toContain("text-xs");
    expect(progressLabel.className).not.toContain("font-mono");

    const source = fs.readFileSync(
      path.resolve(__dirname, "../src/components/guides/guides-toc.tsx"),
      "utf8"
    );
    expect(source).not.toMatch(/text-\[(8|9|10|11)px\]/);
  });
});

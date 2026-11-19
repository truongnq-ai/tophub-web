import React from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { GuideArticleShell } from "../src/components/guides/guide-article-shell";
import type { GuideArticle, GuideCategory } from "../src/content/guides/types";

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

const mockCategory: GuideCategory = {
  order: 2,
  displayOrder: 2,
  slug: "factions",
  zoneId: "zone_onboarding_meta",
  iconName: "ShieldAlert",
  title: {
    vi: "2. Thông Tin Các Phe (S0 - S4)",
    en: "2. Faction & Meta Guides (S0 - S4)",
  },
  description: {
    vi: "Mô tả chuyên mục phe phái",
    en: "Faction guides description",
  },
  articles: [],
};

const mockShellArticle: GuideArticle = {
  code: "2.1",
  displayCode: "2.1",
  slug: "faction-overview",
  categorySlug: "factions",
  badge: "FREE",
  status: "shell",
  readingMinutes: 8,
  title: {
    vi: "Phân Tích Chuyên Sâu & Hướng Dẫn Chọn Phe",
    en: "In-Depth Faction Guide: Nature vs League vs Horde",
  },
  summary: {
    vi: "So sánh toàn diện ưu/nhược điểm của 3 phe lớn.",
    en: "Comprehensive comparison of all 3 factions.",
  },
  plannedOutline: [
    {
      vi: "Đặc trưng lối chơi 3 phe",
      en: "Playstyle identity of 3 factions",
    },
    {
      vi: "Phân tích độ thân thiện F2P",
      en: "F2P friendliness analysis",
    },
  ],
  relatedCalculatorSlugs: ["hero-stars", "hero-awakening"],
  keyTakeaways: [],
  keywords: [],
  sourceFiles: [],
  freeSections: [],
  proSections: [],
};

describe("GuideArticleShell Component", () => {
  it("renders breadcrumbs, title, coming soon banner, planned outline, and related calculator links", () => {
    render(
      <GuideArticleShell
        article={mockShellArticle}
        category={mockCategory}
        locale="vi"
      />
    );

    // 1. Breadcrumbs & Title
    expect(screen.getByText("Cẩm Nang")).toBeDefined();
    expect(
      screen.getByText("Phân Tích Chuyên Sâu & Hướng Dẫn Chọn Phe")
    ).toBeDefined();

    // 2. Coming Soon Banner
    expect(
      screen.getByText("Nội Dung Đang Được Biên Tập Chuyên Sâu")
    ).toBeDefined();
    expect(
      screen.getByText(/đang được đội ngũ biên tập đối soát số liệu thực tế/i)
    ).toBeDefined();

    // 3. Planned Outline
    expect(screen.getByText("Đặc trưng lối chơi 3 phe")).toBeDefined();
    expect(screen.getByText("Phân tích độ thân thiện F2P")).toBeDefined();

    // 4. Calculator Links
    expect(
      screen.getByText("Máy Tính Mảnh Nâng Sao Anh Hùng")
    ).toBeDefined();
    expect(
      screen.getByText("Máy Tính Chi Phí Thức Tỉnh Tướng Đỏ")
    ).toBeDefined();

    // 5. Back to Hub button
    expect(screen.getByText("Quay lại Mục Lục Cẩm Nang")).toBeDefined();
  });

  it("renders clean English version without Vietnamese text leak", () => {
    render(
      <GuideArticleShell
        article={mockShellArticle}
        category={mockCategory}
        locale="en"
      />
    );

    expect(screen.getByText("Guides")).toBeDefined();
    expect(
      screen.getByText("In-Depth Faction Guide: Nature vs League vs Horde")
    ).toBeDefined();
    expect(screen.getByText("In-Depth Content In Progress")).toBeDefined();
    expect(
      screen.getByText("Playstyle identity of 3 factions")
    ).toBeDefined();
    expect(
      screen.getByText("Hero Star Promotion Calculator")
    ).toBeDefined();
    expect(screen.getByText("Back to Guides Hub")).toBeDefined();
  });
});

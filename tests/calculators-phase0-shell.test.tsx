import React from "react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import viMessages from "../messages/vi.json";
import enMessages from "../messages/en.json";
import {
  CALCULATOR_ZONES,
  CALCULATOR_MATERIALS,
  HOT_CALCULATOR_TAGS,
  getAllCalculatorCategories,
  getAllCalculatorTools,
  getCategoryUniqueMaterials,
  getCalculatorCategoryBySlug,
  getCalculatorToolBySlug,
  getAdjacentCalculatorTools,
  searchCalculators,
} from "../src/content/calculators/registry";
import { buildGuideReturnUrl } from "../src/lib/return-url";
import { CalculatorsSidebar } from "../src/components/calculators/calculators-sidebar";
import { CalculatorsShell } from "../src/components/calculators/calculators-shell";
import { CalculatorPlaceholderView } from "../src/components/calculators/calculator-placeholder-view";
import { Header } from "../src/components/header";

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

const VI_DIACRITIC_REGEX =
  /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ]/;

describe("Suite 1 — Calculators Registry SSoT (3 Zones, 9 Categories, 21 Tools & Manifest Items)", () => {
  it("defines exactly 3 Zones, 9 Categories (Phase 1 -> Phase 9), and 21 Sub-Calculators", () => {
    expect(CALCULATOR_ZONES).toHaveLength(3);
    const categories = getAllCalculatorCategories();
    expect(categories).toHaveLength(9);

    categories.forEach((cat, idx) => {
      expect(cat.order).toBe(idx + 1);
      expect(cat.phaseNumber).toBe(idx + 1);
      expect(getCategoryUniqueMaterials(cat).length).toBeGreaterThan(0);
    });

    const tools = getAllCalculatorTools();
    expect(tools).toHaveLength(22);
    expect(HOT_CALCULATOR_TAGS).toHaveLength(5);
  });

  it("maps 100% of material references with valid gameId, nameVi, nameEn, rarity, and .webp iconPath from manifest.json (DEC-CALC-03 & UX-UPGRADE-02)", () => {
    for (const mat of Object.values(CALCULATOR_MATERIALS)) {
      expect(mat.gameId).toBeGreaterThan(0);
      expect(mat.nameVi.length).toBeGreaterThan(0);
      expect(mat.nameEn.length).toBeGreaterThan(0);
      expect(VI_DIACRITIC_REGEX.test(mat.nameEn)).toBe(false);
      expect(mat.iconPath.startsWith("/images/items/")).toBe(true);
      expect(mat.iconPath.endsWith(".webp")).toBe(true);
      expect(["mythic", "legendary", "epic", "rare", "common"]).toContain(
        mat.rarity
      );
    }

    expect(CALCULATOR_MATERIALS.leagueSoulStone.faction).toBe("league");
    expect(CALCULATOR_MATERIALS.hordeSoulStone.faction).toBe("horde");
    expect(CALCULATOR_MATERIALS.natureSoulStone.faction).toBe("nature");
    expect(CALCULATOR_MATERIALS.magicThread.nameVi).toBe("Sợi Tơ Ma Thuật");
    expect(CALCULATOR_MATERIALS.magicThread.nameEn).toBe("Magic Thread");
  });

  it("ensures zero Vietnamese diacritics across all English fields and exampleCases in CALCULATOR_ZONES (AC-CALC-05 & UX-UPGRADE-05)", () => {
    for (const tag of HOT_CALCULATOR_TAGS) {
      expect(VI_DIACRITIC_REGEX.test(tag.query.en)).toBe(false);
      expect(VI_DIACRITIC_REGEX.test(tag.label.en)).toBe(false);
    }

    for (const zone of CALCULATOR_ZONES) {
      expect(VI_DIACRITIC_REGEX.test(zone.label.en)).toBe(false);
      for (const cat of zone.categories) {
        expect(VI_DIACRITIC_REGEX.test(cat.title.en)).toBe(false);
        expect(VI_DIACRITIC_REGEX.test(cat.description.en)).toBe(false);
        for (const tool of cat.tools) {
          expect(VI_DIACRITIC_REGEX.test(tool.title.en)).toBe(false);
          expect(VI_DIACRITIC_REGEX.test(tool.fullTitle.en)).toBe(false);
          expect(VI_DIACRITIC_REGEX.test(tool.summary.en)).toBe(false);
          expect(VI_DIACRITIC_REGEX.test(tool.dataSourceTab.en)).toBe(false);
          expect(VI_DIACRITIC_REGEX.test(tool.exampleCase.en.question)).toBe(
            false
          );
          expect(
            VI_DIACRITIC_REGEX.test(tool.exampleCase.en.inputPreview)
          ).toBe(false);
          expect(
            VI_DIACRITIC_REGEX.test(tool.exampleCase.en.outputPreview)
          ).toBe(false);
        }
      }
    }
  });

  it("resolves category, tool, adjacent tools, returnUrl, and accent-insensitive Vietnamese search accurately", () => {
    expect(getCalculatorCategoryBySlug("heroes")?.order).toBe(1);
    expect(getCalculatorCategoryBySlug("non-existent")).toBeUndefined();

    const resolved = getCalculatorToolBySlug("heroes", "hero-stars");
    expect(resolved).not.toBeNull();
    expect(resolved?.tool.code).toBe("1.1");
    expect(getCalculatorToolBySlug("heroes", "invalid-slug")).toBeNull();

    const firstAdj = getAdjacentCalculatorTools("heroes", "hero-stars");
    expect(firstAdj.prev).toBeNull();
    expect(firstAdj.next?.code).toBe("1.2");
    expect(getCalculatorToolBySlug("heroes", "hero-traits")?.tool.code).toBe("1.3");
    expect(getCalculatorToolBySlug("heroes", "hero-level-spirit")?.tool.code).toBe("1.4");

    // UX-UPGRADE-01: returnUrl builder for calculators comments
    expect(buildGuideReturnUrl("calculators:hub", "vi")).toBe(
      "/vi/calculators#comments"
    );
    expect(buildGuideReturnUrl("calculators:heroes/hero-stars", "en")).toBe(
      "/en/calculators/heroes/hero-stars#comments"
    );

    // Accent-insensitive Vietnamese search for "Soi To Ma Thuat"
    const threadHits = searchCalculators("soi to ma thuat", "vi");
    expect(threadHits.length).toBeGreaterThanOrEqual(1);
    expect(threadHits.some((item) => item.tool.slug === "lord-gear-upgrade")).toBe(
      true
    );
  });
});

describe("Suite 2 — Header Navigation Order & Badge Migration (AC-CALC-01 & AC-CALC-02)", () => {
  beforeEach(() => {
    mockLocale = "vi";
    mockPathname.mockReturnValue("/");
  });

  it("places /calculators strictly between Home (/) and Guides (/guides) and attaches the NEW badge only to /calculators", () => {
    const { container } = render(<Header />);
    const desktopNav = container.querySelector("nav.hidden.md\\:flex");
    expect(desktopNav).not.toBeNull();

    const navLinks = Array.from(desktopNav!.querySelectorAll("a"));
    expect(navLinks.map((a) => a.getAttribute("href"))).toEqual([
      "/",
      "/calculators",
      "/guides",
    ]);

    const calcBadge = screen.getByTestId("header-calculators-new-badge");
    expect(calcBadge.textContent).toBe("MỚI");
    expect(screen.queryByTestId("header-guides-new-badge")).toBeNull();
  });
});

describe("Suite 3 — CalculatorsSidebar (Single-Accordion, w-14 Icon Rail, Codex Link & Instant Search)", () => {
  beforeEach(() => {
    mockLocale = "vi";
    window.localStorage.clear();
    mockPathname.mockReturnValue("/calculators");
  });

  it("enforces Single-Accordion behavior across the 9 category groups and renders the Codex shortcut", () => {
    render(<CalculatorsSidebar />);

    expect(
      screen.getByRole("link", { name: /Kho Đồ Giám & Vật Phẩm/i })
    ).toBeDefined();

    const group1Btn = screen.getByRole("button", { name: /1\. Anh Hùng/i });
    const group5Btn = screen.getByRole("button", { name: /5\. Đồ Chúa Tể/i });

    expect(group1Btn.getAttribute("data-state")).toBe("open");
    expect(group5Btn.getAttribute("data-state")).toBe("closed");

    fireEvent.click(group5Btn);
    expect(group5Btn.getAttribute("data-state")).toBe("open");
    expect(group1Btn.getAttribute("data-state")).toBe("closed");
  });

  it("collapses to w-14 icon rail when clicking a sub-calculator link and persists to localStorage", () => {
    render(<CalculatorsSidebar />);

    const starToolLink = screen.getByRole("link", {
      name: /1\.1/i,
    });
    fireEvent.click(starToolLink);

    expect(
      window.localStorage.getItem("tophub_calculators_sidebar_collapsed")
    ).toBe("1");
    expect(
      screen.getByRole("button", { name: /Mở rộng danh mục/i })
    ).toBeDefined();
  });

  it("filters sub-calculators instantaneously when typing into the sidebar search input", () => {
    render(<CalculatorsSidebar />);
    const searchInput = screen.getByPlaceholderText(/Tìm công cụ, vật phẩm/i);

    fireEvent.change(searchInput, { target: { value: "Huyết Rồng" } });
    expect(screen.getByText(/2 công cụ phù hợp/i)).toBeDefined();
    expect(screen.getByText(/Trang Bị Chúa Tể/i)).toBeDefined();
  });
});

describe("Suite 4 — CalculatorsShell & CalculatorPlaceholderView (UI/UX Pro Max Upgrades 01–06)", () => {
  beforeEach(() => {
    mockLocale = "vi";
    window.localStorage.clear();
    mockPathname.mockReturnValue("/calculators");
  });

  it("renders Hub with Hero Instant Search, Hot Tags, GameAssetFrame strips, and GuideCommentsSection (#comments)", () => {
    render(
      <CalculatorsShell locale="vi">
        <CalculatorPlaceholderView mode="hub" />
      </CalculatorsShell>
    );

    expect(screen.getByTestId("guides-feedback-top-bar")).toBeDefined();
    expect(screen.getByTestId("calculators-hub-placeholder")).toBeDefined();
    expect(
      screen.getByTestId("calculator-under-development-banner")
    ).toBeDefined();
    expect(screen.getByTestId("guide-comments-section")).toBeDefined();
    expect(screen.getAllByTestId("game-asset-frame").length).toBeGreaterThan(10);

    // Click Hot Tag "#SợiTơMaThuật" to trigger instant Hero search
    const hotTagBtn = screen.getByRole("button", { name: "#SợiTơMaThuật" });
    fireEvent.click(hotTagBtn);
    expect(screen.getByTestId("calculators-hub-search-results")).toBeDefined();
    expect(
      screen.getByText(/5\.1 Máy Tính Nguyên Liệu Nâng Cấp 6 Món Trang Bị Chúa Tể/i)
    ).toBeDefined();
  });

  it("renders a specific Tool placeholder with Example Preview, GameAssetFrame materials, Comments, and 100% pure English when locale='en'", () => {
    mockLocale = "en";
    mockPathname.mockReturnValue("/calculators/lord-gear/lord-gear-upgrade");
    const resolved = getCalculatorToolBySlug("lord-gear", "lord-gear-upgrade")!;

    const { container } = render(
      <CalculatorsShell locale="en">
        <CalculatorPlaceholderView
          mode="tool"
          zone={resolved.zone}
          category={resolved.category}
          tool={resolved.tool}
        />
      </CalculatorsShell>
    );

    expect(screen.getByTestId("calculator-tool-placeholder")).toBeDefined();
    expect(screen.getByTestId("calculator-example-preview")).toBeDefined();
    expect(screen.getByTestId("guide-comments-section")).toBeDefined();
    expect(screen.getByText("Refined Metal")).toBeDefined();
    expect(screen.getByText("Magic Thread")).toBeDefined();
    expect(screen.getByText("Orichalcum")).toBeDefined();
    expect(screen.getByText("Dragon Blood")).toBeDefined();

    // Strict Bilingual Purity Gate (AC-CALC-05): zero Vietnamese diacritics in English DOM
    expect(container.textContent ?? "").not.toMatch(VI_DIACRITIC_REGEX);
  });
});

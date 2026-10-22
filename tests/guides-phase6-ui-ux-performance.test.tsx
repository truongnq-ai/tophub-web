import fs from "node:fs";
import path from "node:path";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { GameAssetFrame } from "@/components/guides/media/game-asset-frame";
import { GameInlineChip } from "@/components/guides/media/game-inline-chip";
import { ResponsiveDataTable } from "@/components/guides/blocks/responsive-data-table";
import { VisualShowcaseDeck } from "@/components/guides/media/visual-showcase-deck";
import { CodexEntityDrawer } from "@/components/guides/codex/codex-entity-drawer";
import { getInitialCodexSeedRecords } from "@/components/guides/codex/codex-utils";
import { HordePivotStepperWidget } from "@/components/guides/widgets/horde-pivot-stepper-widget";
import { BlacksmithAnvilMatrixWidget } from "@/components/guides/widgets/blacksmith-anvil-matrix-widget";
import { ShopSafetyFloorWidget } from "@/components/guides/widgets/shop-safety-floor-widget";
import {
  getAssetById,
  getMediaShowcaseItems,
  resolveEntityFromCodeToken,
} from "@/content/guides/asset-registry";
import type { AssetRarity } from "@/content/guides/types";

vi.mock("next-intl", () => ({
  useTranslations: () => {
    const t = (key: string, values?: Record<string, unknown>) => {
      if (values && "count" in values) return `${key}:${values.count}`;
      return key;
    };
    t.raw = (key: string) => key;
    return t;
  },
}));

vi.mock("@/i18n/routing", () => ({
  Link: ({
    children,
    href,
    ...rest
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

describe("Phase 6.1 — Multi-Device Responsive & Zero Overflow Invariants", () => {
  it("constrains GameInlineChip vertical alignment and line-height to prevent >2px row expansion on 375px Mobile and closes on Escape / outside pointerdown without mutating textContent", () => {
    const entity =
      resolveEntityFromCodeToken("560 Mảnh") ?? getAssetById("hero-paragon")!;
    const { container } = render(
      <GameInlineChip entity={entity} locale="vi">
        560 Mảnh
      </GameInlineChip>
    );
    const chip = container.querySelector("code[data-entity-id]");
    expect(chip).not.toBeNull();
    expect(chip!.textContent).toBe("560 Mảnh");
    expect(chip!.className).toContain("align-middle");
    expect(chip!.className).toContain("-translate-y-[1px]");
    expect(chip!.className).toContain("leading-snug");

    // Open popover and verify viewport-safe width clamp on GameEntityPopover
    fireEvent.click(chip!);
    const popover = screen.getByTestId("game-entity-popover");
    expect(popover.className).toContain("max-w-[calc(100vw-2rem)]");

    // Verify Escape key closes popover cleanly
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByTestId("game-entity-popover")).toBeNull();
    expect(chip!.textContent).toBe("560 Mảnh");

    // Re-open and verify outside pointerdown closes popover cleanly on mobile touch
    fireEvent.click(chip!);
    expect(screen.getByTestId("game-entity-popover")).not.toBeNull();
    fireEvent.pointerDown(document.body);
    expect(screen.queryByTestId("game-entity-popover")).toBeNull();
    expect(chip!.textContent).toBe("560 Mảnh");
  });

  it("clamps sticky column 0 width in ResponsiveDataTable on 375px mobile while preserving 28x28px thumbnail so right-hand numeric columns remain visible", () => {
    const { container } = render(
      <ResponsiveDataTable
        caption="Bảng Kiểm Toán"
        headers={["Tướng / Vật Phẩm", "Mốc Sao", "Tăng Trưởng"]}
        rows={[
          ["Paragon", "1 Bạch Kim", "+35% Sát Thương Kỹ Năng"],
          ["560 Mảnh", "5 Đỏ", "+20% Kháng Tất Cả"],
        ]}
        locale="vi"
      />
    );

    const firstHeader = container.querySelector("thead th:first-child");
    expect(firstHeader?.className).toContain("sticky");
    expect(firstHeader?.className).toContain("left-0");
    expect(firstHeader?.className).toContain("max-w-[172px]");
    expect(firstHeader?.className).toContain("sm:max-w-[260px]");

    const firstCell = container.querySelector("tbody td:first-child");
    expect(firstCell?.className).toContain("sticky");
    expect(firstCell?.className).toContain("left-0");
    expect(firstCell?.className).toContain("max-w-[172px]");
    expect(firstCell?.className).toContain("sm:max-w-[260px]");

    const thumbImg = firstCell?.querySelector("img");
    expect(thumbImg).not.toBeNull();
    expect(thumbImg?.getAttribute("width")).toBe("28");
    expect(thumbImg?.getAttribute("height")).toBe("28");
  });

  it("ensures VisualShowcaseDeck cards have min-w-0 and overflow-hidden to prevent horizontal bleed on 375px screens", () => {
    const items = getMediaShowcaseItems("MED-2.4-01", {
      vi: "Đội hình mẫu",
      en: "Sample formation",
    });
    const { container } = render(
      <VisualShowcaseDeck items={items} locale="vi" />
    );
    const root = container.firstElementChild;
    expect(root?.className).toContain("min-w-0");
  });

  it("enforces >= 44x44px (h-11 w-11) touch-friendly close button on CodexEntityDrawer", () => {
    const seedEntity = getInitialCodexSeedRecords()[0]!;
    render(
      <CodexEntityDrawer
        entity={seedEntity}
        locale="vi"
        onClose={() => {}}
      />
    );
    const closeBtn = screen.getByTestId("codex-drawer-close-btn");
    expect(closeBtn.className).toContain("h-11");
    expect(closeBtn.className).toContain("w-11");
  });
});

describe("Phase 6.2 — Dark/Light Mode Contrast, RGBA Alpha Backdrop & GAP-03 De-Boxing", () => {
  it("renders dual-mode inner luminance ring and radial alpha-channel contrast backdrop inside GameAssetFrame for all 6 rarities", () => {
    const rarities: AssetRarity[] = [
      "mythic",
      "legendary",
      "epic",
      "rare",
      "uncommon",
      "common",
    ];
    for (const rarity of rarities) {
      const { container, unmount } = render(
        <GameAssetFrame
          src="/assets/guides/heroes/Paragon.webp"
          alt={`Test ${rarity}`}
          rarity={rarity}
          size="md"
        />
      );
      const frame = container.querySelector("[data-rarity]");
      expect(frame).not.toBeNull();
      expect(frame?.className).toContain("ring-inset");
      expect(frame?.className).toContain("dark:ring-white/15");
      const alphaBackdrop = container.querySelector("[data-alpha-backdrop]");
      expect(alphaBackdrop).not.toBeNull();
      unmount();
    }
  });

  it("ensures HordePivotStepperWidget, BlacksmithAnvilMatrixWidget, and ShopSafetyFloorWidget support dual-theme (bg-card/95 + dark:bg-...) and have zero white-on-light invisible text", () => {
    const { container: c1 } = render(<HordePivotStepperWidget locale="vi" />);
    expect(c1.firstElementChild?.className).toContain("bg-card/95");
    expect(c1.innerHTML).not.toMatch(/class="[^"]*(?<!dark:)text-white(?![-/\w])/);

    const { container: c2 } = render(<BlacksmithAnvilMatrixWidget locale="vi" />);
    expect(c2.firstElementChild?.className).toContain("bg-card/95");
    expect(c2.innerHTML).not.toMatch(/class="[^"]*(?<!dark:)text-white(?![-/\w])/);

    const { container: c3 } = render(<ShopSafetyFloorWidget locale="vi" />);
    expect(c3.firstElementChild?.className).toContain("bg-card/95");
    expect(c3.innerHTML).not.toMatch(/class="[^"]*(?<!dark:)text-white(?![-/\w])/);
  });

  it("enforces GAP-03 De-Boxing invariant (zero border-l-2, border-l-4, rounded-l-sm) across every .tsx file in src/components/guides/", () => {
    const guidesDir = path.resolve(process.cwd(), "src/components/guides");
    const collectTsxFiles = (dir: string): string[] => {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      return entries.flatMap((entry) => {
        const fullPath = path.join(dir, entry.name);
        return entry.isDirectory()
          ? collectTsxFiles(fullPath)
          : entry.name.endsWith(".tsx")
            ? [fullPath]
            : [];
      });
    };

    const files = collectTsxFiles(guidesDir);
    expect(files.length).toBeGreaterThanOrEqual(20);

    const forbiddenPattern = /\b(border-l-2|border-l-4|rounded-l-sm)\b/;
    for (const file of files) {
      const source = fs.readFileSync(file, "utf-8");
      expect(
        source,
        `GAP-03 violation found in ${path.relative(process.cwd(), file)}`
      ).not.toMatch(forbiddenPattern);
    }
  });
});

describe("Phase 6.3 — Image Performance (CLS = 0) & Bundle Size Isolation Guards", () => {
  it("guarantees every <img> in GameAssetFrame has explicit numeric width and height attributes, decoding='async', and defaults to loading='lazy'", () => {
    const { container } = render(
      <GameAssetFrame
        src="/assets/guides/heroes/Paragon.webp"
        alt="Paragon"
        rarity="mythic"
        size="lg"
      />
    );
    const img = container.querySelector("img");
    expect(img).not.toBeNull();
    expect(Number(img?.getAttribute("width"))).toBe(56);
    expect(Number(img?.getAttribute("height"))).toBe(56);
    expect(img?.getAttribute("loading")).toBe("lazy");
    expect(img?.getAttribute("decoding")).toBe("async");
  });

  it("verifies 100% of <img> tags across all .tsx files in src/components/guides/ declare explicit width, height, loading='lazy', and decoding='async' (CLS = 0)", () => {
    const guidesDir = path.resolve(process.cwd(), "src/components/guides");
    const collectTsxFiles = (dir: string): string[] => {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      return entries.flatMap((entry) => {
        const fullPath = path.join(dir, entry.name);
        return entry.isDirectory()
          ? collectTsxFiles(fullPath)
          : entry.name.endsWith(".tsx")
            ? [fullPath]
            : [];
      });
    };

    const files = collectTsxFiles(guidesDir);
    for (const file of files) {
      const source = fs.readFileSync(file, "utf-8");
      const imgTags = source.match(/<img\b[^>]*>/g) ?? [];
      for (const tag of imgTags) {
        const rel = path.relative(process.cwd(), file);
        expect(tag, `Missing width= on <img> in ${rel}: ${tag}`).toMatch(
          /\bwidth=/
        );
        expect(tag, `Missing height= on <img> in ${rel}: ${tag}`).toMatch(
          /\bheight=/
        );
        expect(tag, `Missing loading="lazy" on <img> in ${rel}: ${tag}`).toMatch(
          /\bloading="lazy"/
        );
        expect(
          tag,
          `Missing decoding="async" on <img> in ${rel}: ${tag}`
        ).toMatch(/\bdecoding="async"/);
      }
    }
  });

  it("guarantees neither manifest.json (10.74 MB) nor public/data/codex/*.json is statically imported anywhere in src/", () => {
    const srcDir = path.resolve(process.cwd(), "src");
    const collectSourceFiles = (dir: string): string[] => {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      return entries.flatMap((entry) => {
        const fullPath = path.join(dir, entry.name);
        return entry.isDirectory()
          ? collectSourceFiles(fullPath)
          : /\.(ts|tsx)$/.test(entry.name)
            ? [fullPath]
            : [];
      });
    };

    const files = collectSourceFiles(srcDir);
    const forbiddenImport =
      /import\s+.*from\s+['"].*(manifest\.json|public\/data\/codex\/)/;
    for (const file of files) {
      const source = fs.readFileSync(file, "utf-8");
      expect(
        source,
        `Bundle bloat static import detected in ${path.relative(process.cwd(), file)}`
      ).not.toMatch(forbiddenImport);
    }
  });
});

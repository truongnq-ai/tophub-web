import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const WEB_ROOT = path.resolve(__dirname, "..");

const TARGET_DIRS = [
  "src/content/guides",
  "src/components/guides",
  "src/config",
  "messages",
  "public/data/codex",
];

/**
 * Các mẫu câu / định hướng "Khởi đầu Liên Minh ➔ Chuyển sang Bộ Lạc / Horde Pivot / Đội hình Lai 4-2"
 * bị nghiêm cấm xuất hiện trong nội dung hiển thị trên tophub-web.
 */
const FORBIDDEN_PIVOT_CONTENT_PATTERNS: readonly RegExp[] = [
  /Khởi đầu bằng.{0,50}Liên Minh/i,
  /Chuyển dịch sang/i,
  /chuyển giao.{0,40}Bộ (Lạc|Tộc)/i,
  /chuyển sang Bộ (Lạc|Tộc)/i,
  /chuyển đổi.{0,30}Bộ (Lạc|Tộc)/i,
  /chuyển hệ/i,
  /bẻ lái/i,
  /xoay trục/i,
  /Horde Pivot/i,
  /pivot.{0,35}Horde/i,
  /\bHorde\s+pivot\b/i,
  /faction pivot/i,
  /4 Liên Minh \+ 2 Bộ/i,
  /4 League \+ 2 Horde/i,
  /4L \+ 2H/i,
  /4[–-]2 Hybrid/i,
  /Lai 4[–-]2/i,
  /Đội hình Lai/i,
  /Hybrid Bridge/i,
  /Zero-Loss Pivot/i,
  /Zero-Power-Drop Pivot/i,
  /dùng tạm Liên Minh/i,
  /Starting with.{0,40}League/i,
  /League.{0,20}bridge/i,
];

function stripAllowedTechnicalIdentifiers(line: string): string {
  return line
    .replaceAll("ssot-meta-horde-pivot", "")
    .replaceAll("meta-horde-pivot", "")
    .replaceAll("horde-pivot-roadmap", "")
    .replaceAll("horde_pivot_stepper", "")
    .replaceAll('id: "horde-pivot"', "");
}

/**
 * Chỉ cho phép giữ lại các định danh kỹ thuật (slug alias, tên biến/hàm/key/file nội bộ)
 * để không làm gãy URL cũ hoặc contract kỹ thuật.
 */
function isTechnicalIdentifierOnlyLine(line: string): boolean {
  const trimmed = line.trim();
  if (
    trimmed.startsWith("import ") ||
    trimmed.startsWith("export {") ||
    trimmed.startsWith("export function HordePivotStepperWidget") ||
    trimmed.startsWith("export interface HordePivotStepperWidgetProps") ||
    trimmed.startsWith("}: HordePivotStepperWidgetProps") ||
    trimmed.startsWith("export const FactionProgressionStepperWidget") ||
    trimmed.startsWith("<HordePivotStepperWidget") ||
    trimmed.includes('widgetType: "horde_pivot_stepper"') ||
    trimmed.includes('case "horde_pivot_stepper":') ||
    trimmed.includes('"horde-pivot-roadmap":') ||
    trimmed.includes('article?.slug === "horde-pivot-roadmap"') ||
    trimmed.includes(": ARTICLE_4_2_HORDE_PIVOT_ROADMAP") ||
    trimmed.includes('data-testid="widget-horde-pivot-stepper"') ||
    trimmed.includes('checklistId: "horde-pivot-readiness-v2"')
  ) {
    return true;
  }
  return false;
}

function collectFiles(dir: string, out: string[] = []): string[] {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      collectFiles(full, out);
    } else if (/\.(ts|tsx|json)$/.test(entry.name)) {
      out.push(full);
    }
  }
  return out;
}

describe("Phase 5 — Global Anti-Pivot Content Audit Gate on tophub-web", () => {
  it("enforces zero 'League Start -> Horde Pivot / 4-2 Hybrid Bridge' prose across all web guides, widgets, i18n, glossary, asset-registry, and codex shards", () => {
    const violations: string[] = [];

    for (const relDir of TARGET_DIRS) {
      const files = collectFiles(path.join(WEB_ROOT, relDir));
      for (const file of files) {
        const relPath = path.relative(WEB_ROOT, file).replace(/\\/g, "/");
        const lines = fs.readFileSync(file, "utf8").split(/\r?\n/);

        lines.forEach((line, idx) => {
          if (isTechnicalIdentifierOnlyLine(line)) return;
          const sanitized = stripAllowedTechnicalIdentifiers(line);
          if (FORBIDDEN_PIVOT_CONTENT_PATTERNS.some((p) => p.test(sanitized))) {
            violations.push(
              `${relPath}:${idx + 1}: ${line.trim().slice(0, 140)}`
            );
          }
        });
      }
    }

    expect(violations).toEqual([]);
  });
});

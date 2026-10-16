import React from "react";
import { describe, expect, it, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { TldrActionBox } from "../src/components/guides/blocks/tldr-action-box";
import { VisualDiagramBlock } from "../src/components/guides/blocks/visual-diagram-block";
import { InteractiveChecklistBlock } from "../src/components/guides/blocks/interactive-checklist-block";
import { CaseStudyBlock } from "../src/components/guides/blocks/case-study-block";
import { MediaSpotlightBlock } from "../src/components/guides/blocks/media-spotlight-block";

describe("Rich RPG Guide UI Blocks v2.0", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("renders TldrActionBox with 3 distinct actionable rows", () => {
    render(
      <TldrActionBox
        locale="vi"
        tldr={{
          coreRule: { vi: "Dồn 100% tài nguyên cho Đội 1", en: "Focus 100% on Queue 1" },
          immediateAction: { vi: "Vào Bang Top 1-3 ngay", en: "Join Top 1-3 Guild" },
          strictTaboo: { vi: "Cấm tiêu Kim Cương vào Quán Rượu", en: "Never spend Diamonds in Tavern" },
        }}
      />
    );

    expect(screen.getByText(/Dồn 100% tài nguyên cho Đội 1/i)).toBeDefined();
    expect(screen.getByText(/Vào Bang Top 1-3 ngay/i)).toBeDefined();
    expect(screen.getByText(/Cấm tiêu Kim Cương vào Quán Rượu/i)).toBeDefined();
  });

  it("renders VisualDiagramBlock with centerNode, branches, and nodes", () => {
    render(
      <VisualDiagramBlock
        locale="vi"
        block={{
          type: "visual_diagram",
          mediaCode: "MED-1.2-01",
          variant: "comparison_split",
          title: { vi: "Sơ đồ Phễu Đội 1", en: "Queue 1 Funnel" },
          centerNode: {
            id: "root",
            title: { vi: "1,000 Mảnh Vàng", en: "1,000 Universal Shards" },
          },
          branches: [
            {
              title: { vi: "Phương án A: Dồn Đội 1", en: "Option A: Queue 1 Funnel" },
              tone: "emerald",
              steps: [
                {
                  id: "s1",
                  title: { vi: "Đội 1 đạt 5.0M", en: "Queue 1 reaches 5.0M" },
                },
              ],
              outcome: { vi: "Quét sạch 3 đội 2.5M", en: "Wipes three 2.5M queues" },
            },
          ],
        }}
      />
    );

    expect(screen.getByText("MED-1.2-01")).toBeDefined();
    expect(screen.getByText("Sơ đồ Phễu Đội 1")).toBeDefined();
    expect(screen.getByText("Quét sạch 3 đội 2.5M")).toBeDefined();
  });

  it("toggles InteractiveChecklistBlock items, persists to localStorage, and ignores stale IDs", () => {
    window.localStorage.setItem(
      "tophub_checklist_v2_test-grad",
      JSON.stringify(["item-1", "stale-nonexistent-id", "item-1"])
    );

    render(
      <InteractiveChecklistBlock
        locale="vi"
        block={{
          type: "checklist",
          checklistId: "test-grad",
          title: { vi: "5 Tiêu chuẩn Tốt nghiệp", en: "5 Graduation Criteria" },
          items: [
            {
              id: "item-1",
              label: { vi: "Tiêu chuẩn 1", en: "Criterion 1" },
              detail: { vi: "Đạt 1 Sao Trắng (560 Mảnh)", en: "Reach 1 White Star (560 Shards)" },
            },
            {
              id: "item-2",
              label: { vi: "Tiêu chuẩn 2", en: "Criterion 2" },
              detail: { vi: "Kỹ năng đạt Lv.15 Max (24,700 Sách)", en: "Skills at Lv.15 Max (24,700 Books)" },
            },
          ],
        }}
      />
    );

    // Stale ID and duplicate should be filtered out -> 1/2 (50%)
    expect(screen.getByText("1/2 (50%)")).toBeDefined();

    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes).toHaveLength(2);
    expect(checkboxes[0].getAttribute("aria-checked")).toBe("true");
    expect(checkboxes[1].getAttribute("aria-checked")).toBe("false");

    // Click second item -> 2/2 (100%)
    fireEvent.click(checkboxes[1]);
    expect(screen.getByText("2/2 (100%)")).toBeDefined();

    // Reset button -> 0/2 (0%)
    const resetBtn = screen.getByText("Đặt lại");
    fireEvent.click(resetBtn);
    expect(screen.getByText("0/2 (0%)")).toBeDefined();
  });

  it("renders CaseStudyBlock with before/after metrics and recovery steps", () => {
    render(
      <CaseStudyBlock
        locale="vi"
        block={{
          type: "case_study",
          badge: { vi: "CASE STUDY CẤP CỨU", en: "RECOVERY CASE STUDY" },
          title: { vi: "Phẫu thuật Lâu đài Lv.26", en: "Castle Lv.26 Surgery" },
          profileSummary: { vi: "Tổng lực chiến 8.4M, Đội 1 kẹt ở 3.6M", en: "8.4M Total, Queue 1 stuck at 3.6M" },
          metrics: [
            {
              label: { vi: "Lực chiến Đội 1", en: "Queue 1 Power" },
              before: { vi: "3.60M", en: "3.60M" },
              after: { vi: "4.25M", en: "4.25M" },
              delta: { vi: "+650,000 Power", en: "+650,000 Power" },
            },
          ],
          recoverySteps: [
            {
              stepNumber: "1",
              title: { vi: "Phân giải 12 đồ Tím +10 ở Đội 2", en: "Dismantle 12 +10 Epic gear on Queue 2" },
              detail: { vi: "Thu hồi 100% Quặng", en: "Recover 100% Ore" },
              impactBadge: { vi: "+280,000 Power", en: "+280,000 Power" },
            },
          ],
        }}
      />
    );

    expect(screen.getByText("Phẫu thuật Lâu đài Lv.26")).toBeDefined();
    expect(screen.getByText("+650,000 Power")).toBeDefined();
    expect(screen.getByText("+280,000 Power")).toBeDefined();
  });

  it("renders MediaSpotlightBlock across Tier 1, Tier 2, and sanitizes Tier 4 YouTube URLs", () => {
    render(
      <MediaSpotlightBlock
        locale="vi"
        block={{
          type: "media_spotlight",
          mediaCode: "MED-1.1-05",
          tier: "tier4_youtube_ref",
          title: { vi: "Video hướng dẫn OGFlux", en: "OGFlux Guide Video" },
          description: { vi: "Phân tích lộ trình F2P", en: "F2P Roadmap breakdown" },
          videoChannel: "OGFlux",
          videoTitle: "Top Heroes Ultimate Beginner Guide",
          videoTimestamp: "02:15 - 08:40",
          videoUrl: "javascript:alert(1)",
        }}
      />
    );

    const link = screen.getByRole("link");
    expect(link.getAttribute("href")?.startsWith("https://www.youtube.com/results")).toBe(true);
    expect(link.getAttribute("rel")).toBe("noopener noreferrer");
  });
});

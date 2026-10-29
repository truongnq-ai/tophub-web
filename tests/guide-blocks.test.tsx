import React from "react";
import { describe, expect, it, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { TldrActionBox } from "../src/components/guides/blocks/tldr-action-box";
import { CalloutBox } from "../src/components/guides/blocks/callout-box";
import { ResponsiveDataTable } from "../src/components/guides/blocks/responsive-data-table";
import { StepRoadmap } from "../src/components/guides/blocks/step-roadmap";
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

  it("toggles collapsible keyTakeaways drawer inside TldrActionBox", () => {
    render(
      <TldrActionBox
        locale="vi"
        tldr={{
          coreRule: { vi: "Luật số 1", en: "Rule 1" },
          immediateAction: { vi: "Làm ngay", en: "Act now" },
          strictTaboo: { vi: "Cấm làm", en: "Forbidden" },
        }}
        keyTakeaways={[
          { vi: "Định mức 560 mảnh vàng", en: "560 Universal Shards" },
          { vi: "Giữ 40,000 Guild Honor", en: "Hold 40,000 Guild Honor" },
        ]}
      />
    );

    const toggleBtn = screen.getByTestId("tldr-takeaways-toggle");
    expect(toggleBtn.getAttribute("aria-expanded")).toBe("false");

    fireEvent.click(toggleBtn);
    expect(toggleBtn.getAttribute("aria-expanded")).toBe("true");
    expect(screen.getByText(/Định mức 560 mảnh vàng/i)).toBeDefined();
    expect(screen.getByText(/Giữ 40,000 Guild Honor/i)).toBeDefined();
  });

  it("renders CalloutBox with semantic pill badges per variant", () => {
    render(
      <div>
        <CalloutBox variant="danger" title="Bẫy Quán Rượu" content="Đừng tiêu kim cương" />
        <CalloutBox variant="tip" title="Mẹo Tối Ưu" content="Mua VIP Shop" />
        <CalloutBox variant="warning" title="Cảnh Báo" content="Chú ý giờ reset" />
        <CalloutBox variant="rule" title="Luật Thép" content="Chỉ nuôi Đội 1" />
      </div>
    );

    expect(screen.getByText("BẪY ĐỎ")).toBeDefined();
    expect(screen.getByText("MẸO TỐI ƯU")).toBeDefined();
    expect(screen.getByText("CẢNH BÁO")).toBeDefined();
    expect(screen.getByText("LUẬT THÉP")).toBeDefined();
  });

  it("supports breakpoint highlighting, >8 row progressive disclosure, and full-row search in ResponsiveDataTable", () => {
    const rows = Array.from({ length: 10 }, (_, idx) => [
      idx === 2 ? `🔥 Mốc ${idx + 1} (Mythic)` : `Mốc ${idx + 1}`,
      `${(idx + 1) * 100} Mảnh`,
    ]);

    const { container } = render(
      <ResponsiveDataTable
        caption="Bảng Mốc Sao"
        headers={["Cấp Sao", "Số Mảnh"]}
        rows={rows}
      />
    );

    // Default: shows first 6 rows when rows.length > 8
    const initialBodyRows = container.querySelectorAll("tbody tr");
    expect(initialBodyRows.length).toBe(6);

    // Row 3 (index 2) has 🔥 and Mythic -> marked as breakpoint row
    expect(initialBodyRows[2].getAttribute("data-breakpoint-row")).toBe("true");
    expect(initialBodyRows[0].getAttribute("data-breakpoint-row")).toBe("false");
    expect(container.innerHTML).not.toContain("border-l-2");
    expect(container.innerHTML).not.toContain("border-l-4");

    // Searching searches across ALL 10 rows (including row 10 which was collapsed)
    const filterInput = screen.getByTestId("table-filter-input");
    fireEvent.change(filterInput, { target: { value: "Mốc 10" } });
    const filteredRows = container.querySelectorAll("tbody tr");
    expect(filteredRows.length).toBe(1);
    expect(screen.getByText("Mốc 10")).toBeDefined();

    // Clear filter and click expand toggle -> shows all 10 rows
    fireEvent.change(filterInput, { target: { value: "" } });
    const expandBtn = screen.getByTestId("table-expand-toggle");
    fireEvent.click(expandBtn);
    expect(container.querySelectorAll("tbody tr").length).toBe(10);
  });

  it("renders visual percentage progress bar in VisualDiagramBlock when variant is metric_bars", () => {
    render(
      <VisualDiagramBlock
        locale="vi"
        block={{
          type: "visual_diagram",
          mediaCode: "MED-2.1-01",
          variant: "metric_bars",
          title: { vi: "Tỷ Trọng Sức Mạnh", en: "Power Share" },
          nodes: [
            {
              id: "n1",
              title: { vi: "Kỹ năng Tướng", en: "Hero Skills" },
              badge: { vi: "65% Tổng Lực", en: "65% Total Power" },
              tone: "gold",
            },
          ],
        }}
      />
    );

    const bar = screen.getByTestId("diagram-metric-bar");
    expect((bar as HTMLElement).style.width).toBe("65%");
  });

  it("supports interactive step filtering and view-all toggle in StepRoadmap", () => {
    render(
      <StepRoadmap
        steps={[
          {
            badge: "Bước 1",
            title: "Mốc Nền Tảng",
            timing: "Ngày 1-7",
            description: "Nuôi Liên Minh",
          },
          {
            badge: "Bước 2",
            title: "Mốc Phá Đảo",
            timing: "Ngày 21+",
            description: "Chuyển sang Bộ Lạc",
          },
        ]}
      />
    );

    const stepItem0 = screen.getByTestId("step-roadmap-item-0");
    const stepItem1 = screen.getByTestId("step-roadmap-item-1");

    // Default: both steps visible (data-step-hidden="false")
    expect(stepItem0.getAttribute("data-step-hidden")).toBe("false");
    expect(stepItem1.getAttribute("data-step-hidden")).toBe("false");

    // Click Step 1 pill -> Step 2 becomes hidden
    fireEvent.click(screen.getByTestId("stepper-pill-0"));
    expect(stepItem0.getAttribute("data-step-hidden")).toBe("false");
    expect(stepItem1.getAttribute("data-step-hidden")).toBe("true");

    // Click View All button -> both steps visible again
    fireEvent.click(screen.getByTestId("stepper-view-all"));
    expect(stepItem0.getAttribute("data-step-hidden")).toBe("false");
    expect(stepItem1.getAttribute("data-step-hidden")).toBe("false");
  });

  it("renders CaseStudyBlock 2-column diagnostic split grid and InteractiveChecklistBlock details toggle and MediaSpotlightBlock numbered pins", () => {
    render(
      <div>
        <CaseStudyBlock
          locale="vi"
          block={{
            type: "case_study",
            badge: { vi: "CA BỆNH", en: "CASE" },
            title: { vi: "Test Split", en: "Test Split" },
            profileSummary: { vi: "Tóm tắt", en: "Summary" },
            diagnostics: [{ vi: "Lỗi nâng dàn trải", en: "Spread upgrades" }],
            recoverySteps: [
              {
                stepNumber: "1",
                title: { vi: "Tái chế đồ", en: "Recycle gear" },
                detail: { vi: "Chi tiết tái chế", en: "Recycle detail" },
              },
            ],
          }}
        />
        <InteractiveChecklistBlock
          locale="vi"
          block={{
            type: "checklist",
            checklistId: "test-compact",
            title: { vi: "Checklist Gọn", en: "Compact Checklist" },
            items: [
              {
                id: "c1",
                label: { vi: "Mục C1", en: "Item C1" },
                detail: { vi: "Giải thích chi tiết C1", en: "Detail C1" },
              },
            ],
          }}
        />
        <MediaSpotlightBlock
          locale="vi"
          block={{
            type: "media_spotlight",
            mediaCode: "MED-UI-01",
            tier: "tier2_annotated_ui",
            title: { vi: "Giao diện Shop", en: "Shop UI" },
            description: { vi: "Chú thích UI", en: "UI annotations" },
            annotations: [
              {
                kind: "do",
                label: { vi: "Ô nên mua", en: "Buy slot" },
                detail: { vi: "Mua Mảnh Vàng", en: "Buy Shards" },
              },
            ],
          }}
        />
      </div>
    );

    expect(screen.getByTestId("case-study-split-grid")).toBeDefined();

    const detailToggle = screen.getByTestId("checklist-details-toggle");
    expect(detailToggle.getAttribute("aria-expanded")).toBe("true");
    fireEvent.click(detailToggle);
    expect(detailToggle.getAttribute("aria-expanded")).toBe("false");

    expect(screen.getByText("#1")).toBeDefined();
  });

  describe("Wave 2 Clean Editorial Gaming UI (DEC-V4-02)", () => {
    it("renders TldrActionBox as a 3-column neutral bento partition grid with zero border-l-4 and zero duplicate emojis", () => {
      const { container } = render(
        <TldrActionBox
          tldr={{
            coreRule: {
              vi: "Dồn 100% tài nguyên cho **Pyromancer** đạt `1★ Trắng`.",
              en: "Focus 100% resources on **Pyromancer** to `1★ White`.",
            },
            immediateAction: {
              vi: "Mua hết đá hồn trong cửa hàng VIP.",
              en: "Buy all soul stones in VIP shop.",
            },
            strictTaboo: {
              vi: "Cấm nâng đều 5 tướng SSR cùng lúc.",
              en: "Never upgrade 5 SSR heroes equally.",
            },
          }}
          keyTakeaways={[
            {
              vi: "Mốc gãy **Pyromancer**: `560 Mảnh`",
              en: "**Pyromancer** breakpoint: `560 Shards`",
            },
          ]}
          locale="vi"
        />
      );

      expect(container.innerHTML).not.toContain("border-l-4");
      expect(container.innerHTML).not.toContain("border-l-2");
      expect(container.textContent).not.toContain("🎯");
      expect(container.textContent).not.toContain("📌");

      const bentoGrid = screen.getByTestId("tldr-bento-grid");
      expect(bentoGrid.className).toContain("md:grid-cols-3");
      expect(bentoGrid.className).toContain("md:divide-x");
    });

    it("renders CalloutBox as a framed editorial card with top gradient glow and zero border-l-4 across all 4 variants", () => {
      const variants = ["danger", "warning", "tip", "rule"] as const;
      for (const variant of variants) {
        const { container, unmount } = render(
          <CalloutBox
            variant={variant}
            title={`Tiêu đề **${variant}**`}
            content="Nội dung định lượng `40.000 Điểm`."
            locale="vi"
          />
        );

        expect(container.innerHTML).not.toContain("border-l-4");
        expect(container.innerHTML).not.toContain("rounded-l-sm");
        expect(
          container.querySelector("[data-testid='callout-top-glow']")
        ).not.toBeNull();
        unmount();
      }
    });
  });

  it("enforces MD3 table text-sm, 44px filter/expand controls, and single-layer StepRoadmap in Task 2", () => {
    const rows = Array.from({ length: 10 }, (_, idx) => [
      `Mốc ${idx + 1}`,
      `${(idx + 1) * 100}`,
      `Tăng kỹ năng chủ động`,
    ]);

    const { container } = render(
      <div>
        <ResponsiveDataTable
          caption="Bảng Mốc Sao"
          headers={["Bậc Sao", "Mảnh", "Hiệu Ứng"]}
          rows={rows}
          locale="vi"
        />
        <StepRoadmap
          steps={[
            {
              badge: "Bước 1",
              title: "Mốc Khởi Đầu",
              timing: "Ngày 1-7",
              description: "Dồn tài nguyên cho Đội 1",
            },
            {
              badge: "Bước 2",
              title: "Mốc Chuyển Hệ",
              timing: "Ngày 21+",
              description: "Chuyển sang Bộ Lạc",
            },
          ]}
        />
      </div>
    );

    const table = container.querySelector("table");
    expect(table?.className).toContain("text-sm");
    expect(table?.className).toContain("font-sans");

    const filterInput = screen.getByTestId("table-filter-input");
    expect(filterInput.className).toContain("min-h-[44px]");
    expect(filterInput.className).toContain("text-base");

    const expandToggle = screen.getByTestId("table-expand-toggle");
    expect(expandToggle.className).toContain("min-h-[44px]");

    const numericCell = screen.getByText("100").closest("td");
    expect(numericCell?.className).toContain("font-mono");

    const textCell = screen.getAllByText("Tăng kỹ năng chủ động")[0].closest("td");
    expect(textCell?.className).not.toContain("font-mono");

    expect(screen.getByTestId("stepper-view-all").className).toContain("min-h-[44px]");
    expect(screen.getByTestId("stepper-pill-0").className).toContain("min-h-[44px]");
    expect(screen.getByTestId("stepper-pill-0").className).toContain("font-sans");
    expect(screen.getByTestId("stepper-pill-0").className).not.toContain("font-mono");
    expect(screen.getByTestId("step-roadmap-item-0").className).not.toMatch(/(^|\s)border(\s|$)/);
  });

  it("enforces MD3 single-layer containment and >= 12px/14px typography in CaseStudyBlock and InteractiveChecklistBlock (Task 3)", () => {
    render(
      <div>
        <CaseStudyBlock
          locale="vi"
          block={{
            type: "case_study",
            badge: { vi: "CA BỆNH MD3", en: "MD3 CASE" },
            title: { vi: "Phẫu thuật Đội 1", en: "Queue 1 Surgery" },
            profileSummary: { vi: "Tóm tắt hồ sơ", en: "Profile summary" },
            metrics: [
              {
                label: { vi: "Lực chiến Đội 1", en: "Queue 1 Power" },
                before: { vi: "3.60M", en: "3.60M" },
                after: { vi: "4.25M", en: "4.25M" },
                delta: { vi: "+650K", en: "+650K" },
              },
            ],
            diagnostics: [{ vi: "Chẩn đoán 1", en: "Diag 1" }],
            recoverySteps: [
              {
                stepNumber: "1",
                title: { vi: "Bước phục hồi 1", en: "Recovery 1" },
                detail: { vi: "Chi tiết phục hồi 1", en: "Detail 1" },
                impactBadge: { vi: "+280K", en: "+280K" },
              },
            ],
          }}
        />
        <InteractiveChecklistBlock
          locale="vi"
          block={{
            type: "checklist",
            checklistId: "md3-task3-check",
            title: { vi: "Checklist Task 3", en: "Task 3 Checklist" },
            items: [
              {
                id: "m1",
                label: { vi: "Mục kiểm tra 1", en: "Check item 1" },
                detail: { vi: "Chi tiết kiểm tra 1", en: "Check detail 1" },
                badge: { vi: "Quan trọng", en: "Critical" },
              },
            ],
          }}
        />
      </div>
    );

    const metricLabel = screen.getByText("Lực chiến Đội 1").closest("span")?.parentElement;
    expect(metricLabel?.className).toContain("text-xs");
    expect(metricLabel?.className).toContain("font-sans");
    expect(metricLabel?.className).not.toContain("text-[11px]");
    expect(metricLabel?.className).not.toContain("font-mono");

    const diagItem = screen.getByText(/Chẩn đoán 1/i).closest("li");
    expect(diagItem?.className).not.toMatch(/(^|\s)border(\s|$)/);

    const detailsToggle = screen.getByTestId("checklist-details-toggle");
    expect(detailsToggle.className).toContain("min-h-[44px]");

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox.className).toContain("min-h-[48px]");
    expect(checkbox.className).not.toMatch(/(^|\s)border(\s|$)/);

    const itemBadge = screen.getByText("Quan trọng").closest("span")?.parentElement;
    expect(itemBadge?.className).toContain("text-xs");
    expect(itemBadge?.className).toContain("font-sans");
    expect(itemBadge?.className).not.toContain("text-[10px]");
  });
});

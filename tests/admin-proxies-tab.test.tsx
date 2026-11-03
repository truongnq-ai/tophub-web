import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { TabProxies } from "@/components/dashboard/admin/tab-proxies";

const actions = vi.hoisted(() => ({
  getAdminProxiesAction: vi.fn(),
  createAdminProxiesAction: vi.fn(),
  updateAdminProxyAction: vi.fn(),
  deleteAdminProxyAction: vi.fn(),
  testAdminProxyAction: vi.fn(),
  updateAdminProxySettingsAction: vi.fn(),
  replayAdminFailedRecordsAction: vi.fn(),
}));
vi.mock("@/actions/admin", () => actions);

const item = {
  id: "px1",
  label: null,
  protocol: "http",
  host: "23.95.159.76",
  port: 39002,
  username: "demoUser",
  has_password: true,
  enabled: true,
  last_status: "HEALTHY",
  last_error: null,
  last_exit_ip: "23.95.159.76",
  last_latency_ms: 420,
  last_checked_at: null,
  runtime_status: "HEALTHY" as const,
  cooldown_until: null,
  success_count: 10,
  failure_count: 0,
  created_at: "2026-11-03T03:00:00Z",
};

describe("TabProxies", () => {
  beforeEach(() => {
    Object.values(actions).forEach((f) => f.mockReset());
    actions.getAdminProxiesAction.mockResolvedValue({
      success: true,
      data: {
        items: [item],
        settings: { allow_direct_fallback: false, min_interval_ms: 8000 },
        pool: { total: 1, healthy: 1, cooling: 0, disabled: 0 },
      },
    });
  });

  it("hiển thị proxy, không hiển thị mật khẩu, báo summary", async () => {
    const onSummary = vi.fn();
    render(<TabProxies onSummaryChange={onSummary} />);
    expect(await screen.findByText("23.95.159.76:39002")).toBeDefined();
    expect(screen.queryByText(/demoPass/)).toBeNull();
    await waitFor(() =>
      expect(onSummary).toHaveBeenCalledWith({ healthy: 1, total: 1 })
    );
  });

  it("bật/tắt gọi updateAdminProxyAction", async () => {
    actions.updateAdminProxyAction.mockResolvedValue({
      success: true,
      data: { ...item, enabled: false },
    });
    render(<TabProxies />);
    fireEvent.click(
      await screen.findByRole("switch", {
        name: "Bật/tắt proxy 23.95.159.76:39002",
      })
    );
    await waitFor(() =>
      expect(actions.updateAdminProxyAction).toHaveBeenCalledWith("px1", {
        enabled: false,
      })
    );
  });

  it("thêm nhiều proxy từ textarea và hiện dòng bị bỏ qua", async () => {
    actions.createAdminProxiesAction.mockResolvedValue({
      success: true,
      data: {
        created: [],
        skipped: [{ line: 1, raw: "127.0.0.1:80", reason: "PRIVATE_HOST" }],
      },
    });
    render(<TabProxies />);
    fireEvent.click(await screen.findByRole("button", { name: /Thêm proxy/ }));
    fireEvent.change(screen.getByLabelText("Danh sách proxy"), {
      target: { value: "127.0.0.1:80" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Lưu proxy" }));
    expect(
      await screen.findByText(/Dòng 1: 127.0.0.1:80 — PRIVATE_HOST/)
    ).toBeDefined();
  });

  it("xoá cần xác nhận", async () => {
    actions.deleteAdminProxyAction.mockResolvedValue({
      success: true,
      data: { id: "px1" },
    });
    render(<TabProxies />);
    fireEvent.click(await screen.findByTitle("Xoá proxy"));
    fireEvent.click(screen.getByRole("button", { name: "Xác nhận xoá" }));
    await waitFor(() =>
      expect(actions.deleteAdminProxyAction).toHaveBeenCalledWith("px1")
    );
  });

  it("replay: xem trước rồi xác nhận", async () => {
    actions.replayAdminFailedRecordsAction
      .mockResolvedValueOnce({
        success: true,
        data: {
          dry_run: true,
          accounts: { restorable: 2, restored: 0, uids: [] },
          redemptions: {
            matched: 430,
            enqueued: 0,
            by_code: { CandyCRAZE: 187 },
          },
          checkins: { game_day: "2026-11-03", failed: 348, triggered: false },
        },
      })
      .mockResolvedValueOnce({
        success: true,
        data: {
          dry_run: false,
          accounts: { restorable: 2, restored: 2, uids: [] },
          redemptions: { matched: 430, enqueued: 430, by_code: {} },
          checkins: { game_day: "2026-11-03", failed: 348, triggered: true },
        },
      });
    render(<TabProxies />);
    fireEvent.click(
      await screen.findByRole("button", { name: /Kích hoạt lại lượt lỗi/ })
    );
    expect(await screen.findByText(/430 lượt đổi mã/)).toBeDefined();
    fireEvent.click(screen.getByRole("button", { name: "Xác nhận chạy lại" }));
    await waitFor(() =>
      expect(actions.replayAdminFailedRecordsAction).toHaveBeenLastCalledWith({
        dry_run: false,
      })
    );
  });
});

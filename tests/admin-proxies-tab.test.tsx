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
  label: "US-ProxyPool",
  protocol: "http",
  host: "23.95.159.76",
  port: 39002,
  username: "demoUser",
  has_password: true,
  enabled: true,
  expires_at: "2026-11-06T02:57:00.000Z", // 2026-11-06 09:57 Giờ VN
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
        pool: { total: 1, healthy: 1, cooling: 0, disabled: 0, expired: 0 },
      },
    });
  });

  it("bỏ 2 cột Tài khoản & IP thoát, thêm cột Ngày hết hạn (yyyy-MM-dd HH:mm) và không lộ mật khẩu", async () => {
    const onSummary = vi.fn();
    render(<TabProxies onSummaryChange={onSummary} />);
    expect(await screen.findByText("23.95.159.76:39002")).toBeDefined();
    expect(screen.queryByRole("columnheader", { name: "Tài khoản" })).toBeNull();
    expect(screen.queryByRole("columnheader", { name: "IP thoát" })).toBeNull();
    expect(screen.getByRole("columnheader", { name: "Ngày hết hạn" })).toBeDefined();
    expect(screen.getByText("2026-11-06 09:57")).toBeDefined();
    expect(screen.queryByText(/demoPass/)).toBeNull();
    await waitFor(() =>
      expect(onSummary).toHaveBeenCalledWith({ healthy: 1, total: 1 })
    );
  });

  it("hiển thị màu xanh (SAFE), vàng (WARNING), đỏ (DANGER) và ẩn countdown + đổi đỏ khi quá hạn (EXPIRED)", async () => {
    const now = Date.now();
    const safeIso = new Date(now + 48 * 3600 * 1000).toISOString();
    const warnIso = new Date(now + 12 * 3600 * 1000).toISOString();
    const dangerIso = new Date(now + 2 * 3600 * 1000).toISOString();
    const expiredIso = "2020-01-01T00:00:00.000Z"; // 2020-01-01 07:00 Giờ VN

    actions.getAdminProxiesAction.mockResolvedValueOnce({
      success: true,
      data: {
        items: [
          { ...item, id: "px-safe", host: "1.1.1.1", expires_at: safeIso },
          { ...item, id: "px-warn", host: "2.2.2.2", expires_at: warnIso },
          { ...item, id: "px-danger", host: "3.3.3.3", expires_at: dangerIso },
          {
            ...item,
            id: "px-exp",
            host: "4.4.4.4",
            expires_at: expiredIso,
            runtime_status: "EXPIRED" as const,
          },
        ],
        settings: { allow_direct_fallback: false, min_interval_ms: 8000 },
        pool: { total: 4, healthy: 3, cooling: 0, disabled: 0, expired: 1 },
      },
    });

    render(<TabProxies />);
    const safeBadge = await screen.findByTestId("proxy-countdown-px-safe");
    const warnBadge = screen.getByTestId("proxy-countdown-px-warn");
    const dangerBadge = screen.getByTestId("proxy-countdown-px-danger");

    expect(safeBadge.className).toContain("emerald");
    expect(warnBadge.className).toContain("amber");
    expect(dangerBadge.className).toContain("rose");

    // Dòng đã quá hạn: không còn countdown và thời gian hết hạn chuyển sang màu đỏ
    expect(screen.queryByTestId("proxy-countdown-px-exp")).toBeNull();
    const expiredDateEl = screen.getByTestId("proxy-expiry-date-px-exp");
    expect(expiredDateEl.textContent).toBe("2020-01-01 07:00");
    expect(expiredDateEl.className).toContain("text-rose-400");
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

  it("thêm nhiều proxy kèm ngày hết hạn (dán chuỗi từ web mua proxy) và hiện dòng bị bỏ qua", async () => {
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
    fireEvent.change(screen.getByLabelText("Ngày hết hạn"), {
      target: { value: "09:57:00 6/11/2026" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Lưu proxy" }));
    await waitFor(() =>
      expect(actions.createAdminProxiesAction).toHaveBeenCalledWith({
        raw: "127.0.0.1:80",
        label: undefined,
        expires_at: "2026-11-06T02:57:00.000Z",
      })
    );
    expect(
      await screen.findByText(/Dòng 1: 127.0.0.1:80 — PRIVATE_HOST/)
    ).toBeDefined();
  });

  it("cập nhật / gia hạn ngày hết hạn cho proxy trên bảng", async () => {
    actions.updateAdminProxyAction.mockResolvedValue({
      success: true,
      data: { ...item, expires_at: "2026-11-09T02:57:00.000Z" },
    });
    render(<TabProxies />);
    fireEvent.click(await screen.findByTitle("Cập nhật ngày hết hạn"));
    const input = await screen.findByLabelText("Ngày hết hạn mới");
    fireEvent.change(input, { target: { value: "09:57:00 9/11/2026" } });
    fireEvent.click(screen.getByRole("button", { name: "Lưu hạn dùng" }));
    await waitFor(() =>
      expect(actions.updateAdminProxyAction).toHaveBeenCalledWith("px1", {
        expires_at: "2026-11-09T02:57:00.000Z",
      })
    );
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

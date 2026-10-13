import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import React from "react";
import { AdminManager } from "../src/components/dashboard/admin-manager";
import type { AdminAccountItem } from "../src/types/api";

const mockPush = vi.fn();
const mockRefresh = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    refresh: mockRefresh,
  }),
}));

const mockUpdateAdminAccountAction = vi.fn().mockResolvedValue({
  success: true,
  data: {},
});

const mockAdminLogoutAction = vi.fn().mockResolvedValue({
  success: true,
});

import { MOCK_GIFT_CODES, MOCK_REDEMPTIONS, MOCK_CHECKINS } from "../src/components/dashboard/admin/mock-data";

const mockGetAdminAccountsAction = vi.fn().mockResolvedValue({ success: true, data: [] });
const mockGetAdminGiftcodesAction = vi.fn().mockResolvedValue({ success: true, data: MOCK_GIFT_CODES });
const mockCreateAdminGiftcodeAction = vi.fn().mockResolvedValue({
  success: true,
  data: {
    id: "new-code-123",
    code: "VALENTINE2026",
    status: "VALID",
    source: "Discord Bot",
    valid_from: "2026-10-12T00:00:00Z",
    valid_to: null,
    rewards: "500 Kim Cương",
    redeemed_count: 0,
    total_accounts: 48,
    created_at: "2026-10-12T00:00:00Z",
  },
});
const mockGetAdminGiftcodeReceiversAction = vi.fn().mockResolvedValue({
  success: true,
  data: [
    {
      account_id: "acc-1",
      uid: "1000000000001",
      nickname: "DragonSlayer",
      server_id: "1024",
      status: "SUCCESS",
      redeemed_at: "2026-10-12T10:00:00Z",
    },
  ],
});
const mockGetAdminRedemptionsAction = vi.fn().mockResolvedValue({ success: true, data: MOCK_REDEMPTIONS });
const mockRetryAdminRedemptionAction = vi.fn().mockResolvedValue({
  success: true,
  data: { queued: 1, message: "Queued retry" },
});
const mockRetryAllAdminRedemptionsAction = vi.fn().mockResolvedValue({
  success: true,
  data: { queued: 5, message: "Queued 5 retries" },
});
const mockGetAdminCheckinsAction = vi.fn().mockResolvedValue({ success: true, data: MOCK_CHECKINS });
const mockRetryAdminCheckinAction = vi.fn().mockResolvedValue({
  success: true,
  data: { queued: 1, message: "Queued checkin retry" },
});
const mockRetryAllAdminCheckinsAction = vi.fn().mockResolvedValue({
  success: true,
  data: { queued: 3, message: "Queued 3 checkin retries" },
});
const mockUpdateAdminGiftcodeAction = vi.fn().mockResolvedValue({
  success: true,
  data: {
    id: "mock-1",
    code: "HERO2026",
    status: "VALID",
    source: "Facebook Fanpage",
    valid_to: "2026-12-31T23:59:59Z",
    rewards: "1000 Kim Cương",
    redeemed_count: 48,
    total_accounts: 48,
    is_public: true,
  },
});

const mockGetAdminWeeklyTimelineAction = vi.fn().mockResolvedValue({
  success: true,
  data: [
    { day_index: 1, day_name: "Thứ 2", game_day: "2026-10-12", count: 42, is_today: false },
    { day_index: 2, day_name: "Thứ 3", game_day: "2026-10-13", count: 38, is_today: true },
    { day_index: 3, day_name: "Thứ 4", game_day: "2026-10-14", count: 0, is_today: false },
    { day_index: 4, day_name: "Thứ 5", game_day: "2026-10-15", count: 0, is_today: false },
    { day_index: 5, day_name: "Thứ 6", game_day: "2026-10-16", count: 0, is_today: false },
    { day_index: 6, day_name: "Thứ 7", game_day: "2026-10-17", count: 0, is_today: false },
    { day_index: 7, day_name: "Chủ Nhật", game_day: "2026-10-18", count: 0, is_today: false },
  ],
});
const mockGetAdminAccountRedemptionsAction = vi.fn().mockResolvedValue({ success: true, data: [] });
const mockGetAdminAccountCheckinsAction = vi.fn().mockResolvedValue({
  success: true,
  data: {
    account_id: "acc-1",
    total_days: 14,
    success_days: 12,
    streak: 5,
    this_week: [],
    last_week: [],
  },
});

vi.mock("@/actions/admin", () => ({
  updateAdminAccountAction: (...args: any[]) => mockUpdateAdminAccountAction(...args),
  adminLogoutAction: () => mockAdminLogoutAction(),
  getAdminAccountsAction: (...args: any[]) => mockGetAdminAccountsAction(...args),
  getAdminGiftcodesAction: (...args: any[]) => mockGetAdminGiftcodesAction(...args),
  createAdminGiftcodeAction: (...args: any[]) => mockCreateAdminGiftcodeAction(...args),
  updateAdminGiftcodeAction: (...args: any[]) => mockUpdateAdminGiftcodeAction(...args),
  getAdminGiftcodeReceiversAction: (...args: any[]) => mockGetAdminGiftcodeReceiversAction(...args),
  getAdminRedemptionsAction: (...args: any[]) => mockGetAdminRedemptionsAction(...args),
  retryAdminRedemptionAction: (...args: any[]) => mockRetryAdminRedemptionAction(...args),
  retryAllAdminRedemptionsAction: (...args: any[]) => mockRetryAllAdminRedemptionsAction(...args),
  getAdminCheckinsAction: (...args: any[]) => mockGetAdminCheckinsAction(...args),
  retryAdminCheckinAction: (...args: any[]) => mockRetryAdminCheckinAction(...args),
  retryAllAdminCheckinsAction: (...args: any[]) => mockRetryAllAdminCheckinsAction(...args),
  getAdminWeeklyTimelineAction: (...args: any[]) => mockGetAdminWeeklyTimelineAction(...args),
  getAdminAccountRedemptionsAction: (...args: any[]) => mockGetAdminAccountRedemptionsAction(...args),
  getAdminAccountCheckinsAction: (...args: any[]) => mockGetAdminAccountCheckinsAction(...args),
}));

vi.mock("@/hooks/use-toast", () => ({
  useToast: () => ({
    toast: vi.fn(),
    toasts: [],
  }),
}));

describe("AdminManager Component", () => {
  const mockAccounts: AdminAccountItem[] = [
    {
      id: "acc-1",
      uid: "1000000000001",
      nickname: "DragonSlayer",
      server_id: "1024",
      active_plan: "PRO",
      ends_at: "2026-12-31T23:59:59Z",
      auto_redeem: true,
      auto_checkin: false,
      token_status: "VALID",
      created_at: "2026-10-10T00:00:00Z",
    },
    {
      id: "acc-2",
      uid: "2446869146317",
      nickname: "ShadowNinja",
      server_id: "1028",
      active_plan: "FREE",
      ends_at: null,
      auto_redeem: false,
      auto_checkin: true,
      token_status: "EXPIRED",
      created_at: "2026-10-11T00:00:00Z",
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderAdminManager = async (props = { initialAccounts: mockAccounts, locale: "vi" }) => {
    let view: any;
    await act(async () => {
      view = render(<AdminManager {...props} />);
    });
    return view;
  };

  it("should render Top Banner and 4 Metrics cards", async () => {
    await renderAdminManager();

    expect(screen.getByText("TopHub Control Center")).toBeDefined();
    expect(screen.getByText("ADMIN HUD")).toBeDefined();
    expect(screen.getByText("Tổng Tài Khoản")).toBeDefined();
    expect(screen.getByText("Tài Khoản PRO")).toBeDefined();
    expect(screen.getByText("Bot Tự Động")).toBeDefined();
    expect(screen.getByText("Giftcode Khả Dụng")).toBeDefined();
  });

  it("should render 4 tabs and switch between them", async () => {
    await renderAdminManager();

    // Tab buttons exist
    const accountsTab = screen.getByRole("tab", { name: /Tài Khoản Game/i });
    const giftcodesTab = screen.getByRole("tab", { name: /Quản Lý Giftcode/i });
    const redemptionsTab = screen.getByRole("tab", { name: /Lịch Sử Đổi Mã/i });
    const checkinsTab = screen.getByRole("tab", { name: /Lịch Sử Điểm Danh/i });

    expect(accountsTab).toBeDefined();
    expect(giftcodesTab).toBeDefined();
    expect(redemptionsTab).toBeDefined();
    expect(checkinsTab).toBeDefined();

    // Accounts tab is active by default
    expect(screen.getByText("DragonSlayer")).toBeDefined();
    expect(screen.getByText("ShadowNinja")).toBeDefined();

    // Switch to Giftcodes Tab
    await act(async () => {
      fireEvent.mouseDown(giftcodesTab, { button: 0 });
    });
    expect(screen.getByText("Kho Quản Lý Giftcode")).toBeDefined();
    expect(screen.getByText("Thêm Mã Mới")).toBeDefined();

    // Switch to Redemptions Tab
    await act(async () => {
      fireEvent.mouseDown(redemptionsTab, { button: 0 });
    });
    expect(screen.getByText("Lịch Sử Đổi Giftcode")).toBeDefined();
    expect(screen.getByText(/Thử Lại Tất Cả Lỗi/i)).toBeDefined();

    // Switch to Checkins Tab
    await act(async () => {
      fireEvent.mouseDown(checkinsTab, { button: 0 });
    });
    expect(screen.getByText("Lịch Sử Điểm Danh Hàng Ngày")).toBeDefined();
    expect(screen.getByText(/Điểm Danh Lại Lỗi/i)).toBeDefined();
  });

  it("should toggle auto_redeem switch and call updateAdminAccountAction", async () => {
    await renderAdminManager();

    const switches = screen.getAllByRole("switch");
    // Switch 0 is DragonSlayer auto_redeem (currently true)
    await act(async () => {
      fireEvent.click(switches[0]);
    });

    expect(mockUpdateAdminAccountAction).toHaveBeenCalledWith("acc-1", {
      auto_redeem: false,
    });
  });

  it("should filter accounts by search input", async () => {
    await renderAdminManager();

    const searchInput = screen.getByPlaceholderText("Tìm UID, tên, máy chủ...");
    await act(async () => {
      fireEvent.change(searchInput, { target: { value: "DragonSlayer" } });
    });

    expect(screen.getByText("DragonSlayer")).toBeDefined();
    expect(screen.queryByText("ShadowNinja")).toBeNull();
  });

  it("should render AccountAvatar, ServerTag, and Token Status Tooltip in Tab Accounts", async () => {
    await renderAdminManager();

    // AccountAvatar initials for DragonSlayer ("DS") and ShadowNinja ("SN")
    expect(screen.getByText("DS")).toBeDefined();
    expect(screen.getByText("SN")).toBeDefined();

    // ServerTag gaming format
    expect(screen.getByText("[S1024]")).toBeDefined();
    expect(screen.getByText("[S1028]")).toBeDefined();

    // Semantic Tooltip for Token status
    expect(
      screen.getByText("Đang kết nối ổn định — Bot hoạt động bình thường")
    ).toBeDefined();
    expect(
      screen.getByText("Phiên hết hạn — Cần người chơi đăng nhập lại game")
    ).toBeDefined();
  });

  it("should open receivers dialog from redeemed count in Tab Giftcodes", async () => {
    await renderAdminManager();

    const giftcodesTab = screen.getByRole("tab", { name: /Quản Lý Giftcode/i });
    await act(async () => {
      fireEvent.mouseDown(giftcodesTab, { button: 0 });
    });

    // Find the interactive redeemed count button for HERO2026 (48/48)
    const receiverBtns = screen.getAllByRole("button", {
      name: /48\/48/i,
    });
    expect(receiverBtns.length).toBeGreaterThan(0);

    await act(async () => {
      fireEvent.click(receiverBtns[0]);
    });

    // Receivers modal should open
    expect(screen.getByText("Danh Sách Người Nhận Mã:")).toBeDefined();
    expect(screen.getAllByText("HERO2026").length).toBeGreaterThanOrEqual(2);
  });

  it("should support retrying failed redemptions in Tab Redemptions", async () => {
    await renderAdminManager();

    const redemptionsTab = screen.getByRole("tab", { name: /Lịch Sử Đổi Mã/i });
    await act(async () => {
      fireEvent.mouseDown(redemptionsTab, { button: 0 });
    });

    // Check that FAILED status exists
    expect(screen.getAllByText(/THẤT BÀI/i).length).toBeGreaterThan(0);

    // Find "Thử Lại Tất Cả Lỗi" button
    const retryAllBtn = screen.getByRole("button", {
      name: /Thử Lại Tất Cả Lỗi/i,
    });
    expect(retryAllBtn).toBeDefined();

    // Click retry single on first failed row with exact regex
    const retrySingleBtns = screen.getAllByRole("button", { name: /^Thử lại$/i });
    expect(retrySingleBtns.length).toBeGreaterThan(0);

    await act(async () => {
      fireEvent.click(retrySingleBtns[0]);
    });
    expect(mockRetryAdminRedemptionAction).toHaveBeenCalled();

    await act(async () => {
      fireEvent.click(retryAllBtn);
    });
    expect(mockRetryAllAdminRedemptionsAction).toHaveBeenCalled();
  });

  it("should support retrying checkins and render Avatar/ServerTag in Tab Checkins", async () => {
    await renderAdminManager();

    const checkinsTab = screen.getByRole("tab", { name: /Lịch Sử Điểm Danh/i });
    await act(async () => {
      fireEvent.mouseDown(checkinsTab, { button: 0 });
    });

    // Check header
    expect(screen.getByText("Lịch Sử Điểm Danh Hàng Ngày")).toBeDefined();

    // Find retry button
    const retryAllBtn = screen.getByRole("button", {
      name: /Điểm Danh Lại Lỗi/i,
    });
    expect(retryAllBtn).toBeDefined();

    // Click retry single on first failed/pending row with exact regex
    const retrySingleBtns = screen.getAllByRole("button", {
      name: /^Điểm danh lại$/i,
    });
    expect(retrySingleBtns.length).toBeGreaterThan(0);

    await act(async () => {
      fireEvent.click(retrySingleBtns[0]);
    });
    expect(mockRetryAdminCheckinAction).toHaveBeenCalled();

    await act(async () => {
      fireEvent.click(retryAllBtn);
    });
    expect(mockRetryAllAdminCheckinsAction).toHaveBeenCalled();
  });

  it("should open Add Giftcode dialog and submit createAdminGiftcodeAction", async () => {
    await renderAdminManager();

    const giftcodesTab = screen.getByRole("tab", { name: /Quản Lý Giftcode/i });
    await act(async () => {
      fireEvent.mouseDown(giftcodesTab, { button: 0 });
    });

    const addBtn = screen.getByRole("button", { name: /Thêm Mã Mới/i });
    await act(async () => {
      fireEvent.click(addBtn);
    });

    expect(screen.getByText("Thêm Mã Giftcode Mới")).toBeDefined();

    const codeInput = screen.getByPlaceholderText("VD: HERO2026, AUTOBOT888...");
    await act(async () => {
      fireEvent.change(codeInput, { target: { value: "VALENTINE2026" } });
    });

    const submitBtn = screen.getByRole("button", { name: /Lưu & Kích Hoạt/i });
    await act(async () => {
      fireEvent.click(submitBtn);
    });

    expect(mockCreateAdminGiftcodeAction).toHaveBeenCalledWith(
      expect.objectContaining({
        code: "VALENTINE2026",
      })
    );
  });

  it("should open Edit Giftcode dialog, show locked code if redeemed > 0, and submit edit", async () => {
    await renderAdminManager();

    const giftcodesTab = screen.getByRole("tab", { name: /Quản Lý Giftcode/i });
    await act(async () => {
      fireEvent.mouseDown(giftcodesTab, { button: 0 });
    });

    const editBtns = screen.getAllByRole("button", { name: /Sửa/i });
    expect(editBtns.length).toBeGreaterThan(0);

    await act(async () => {
      fireEvent.click(editBtns[0]);
    });

    expect(screen.getByText("Chỉnh Sửa Giftcode:")).toBeDefined();

    // Check that code input is disabled for HERO2026 because redeemed_count = 48
    const codeInput = screen.getByPlaceholderText("VD: HERO2026...");
    expect(codeInput.getAttribute("disabled")).not.toBeNull();

    // Change status
    const statusSelect = screen.getByDisplayValue(/VALID \(Khả dụng\)/i);
    await act(async () => {
      fireEvent.change(statusSelect, { target: { value: "EXPIRED" } });
    });

    const submitBtn = screen.getByRole("button", { name: /Lưu Thay Đổi/i });
    await act(async () => {
      fireEvent.click(submitBtn);
    });

    expect(mockUpdateAdminGiftcodeAction).toHaveBeenCalled();
  });
});


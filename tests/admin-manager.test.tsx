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
const mockVerifyAdminGiftcodeAction = vi.fn().mockResolvedValue({
  success: true,
  data: {
    id: "gc-1",
    code: "HERO2026",
    status: "VALID",
    game_status: "VALID",
    upstream_message: "Personal redemption limit reached for this CDKey.",
    message: "Mã HERO2026 đang hoạt động hợp lệ trên máy chủ game!",
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
const mockGetAdminAccountPaymentsAction = vi.fn().mockResolvedValue({
  success: true,
  data: {
    account: { id: "acc-1", uid: "1000000000001", nickname: "DragonSlayer", server_id: "1024", country: "VN" },
    items: [],
    total: 0,
    page: 1,
    limit: 20,
    total_pages: 1,
    summary: {
      total_orders: 0,
      success_orders: 0,
      total_amount_vnd: 0,
      average_amount_vnd: 0,
      max_order_amount_vnd: 0,
      max_order_description: null,
      first_payment_at: null,
      last_payment_at: null,
      spender_tier: "F2P",
      is_partial_history: false,
      methods_breakdown: [],
    },
    fetched_at: "2026-10-27T10:00:00Z",
  },
});
const mockGetAdminWhaleAnalyticsAction = vi.fn().mockResolvedValue({
  success: true,
  data: {
    kpis: {
      total_spent_vnd_est: 27155000,
      funtap_spent_vnd: 20000000,
      store_spent_pts: 28620,
      store_spent_vnd_est: 7155000,
      spent_last_30d_vnd_est: 12500000,
      total_accounts: 48,
      paying_accounts_count: 15,
      conversion_rate_pct: 31.3,
      mega_whale_count: 1,
      whale_count: 3,
      dolphin_count: 5,
      payer_count: 6,
      f2p_count: 33,
      active_spenders_count: 8,
      dormant_whales_count: 1,
      point_to_vnd_rate: 250,
    },
    by_server: [
      {
        server_id: "10758",
        accounts_count: 10,
        paying_count: 5,
        total_spent_vnd_est: 27155000,
        funtap_spent_vnd: 20000000,
        store_spent_pts: 28620,
      },
    ],
    by_country: [
      {
        country: "PH",
        accounts_count: 3,
        paying_count: 2,
        total_spent_vnd_est: 7155000,
        funtap_spent_vnd: 0,
        store_spent_pts: 28620,
      },
    ],
    items: [
      {
        id: "acc-whale-1",
        uid: "2449770492694",
        nickname: "KaelDravos",
        server_id: "10758",
        country: "PH",
        active_plan: "PRO",
        token_status: "VALID",
        funtap_spent_vnd: 0,
        store_spent_pts: 28620,
        store_spent_vnd_est: 7155000,
        total_spent_vnd_est: 7155000,
        spent_last_30d_vnd_est: 7155000,
        total_payment_orders: 13,
        spender_tier: "WHALE",
        activity_status: "ACTIVE_SPENDER",
        first_payment_at: "2026-10-01T00:00:00Z",
        last_payment_at: "2026-10-25T00:00:00Z",
        payments_synced_at: "2026-10-27T08:00:00Z",
      },
    ],
    total: 1,
    page: 1,
    limit: 20,
    total_pages: 1,
    servers: ["10758"],
    countries: ["PH", "VN"],
  },
});
const mockGetAdminPaymentsSyncStatusAction = vi.fn().mockResolvedValue({
  success: true,
  data: {
    status: "IDLE",
    totalAccounts: 0,
    processedAccounts: 0,
    successCount: 0,
    failedCount: 0,
    currentAccountNickname: null,
    startedAt: null,
    finishedAt: null,
    lastError: null,
  },
});
const mockTriggerAdminPaymentsSyncAllAction = vi.fn().mockResolvedValue({
  success: true,
  data: {
    status: "RUNNING",
    totalAccounts: 48,
    processedAccounts: 1,
    successCount: 1,
    failedCount: 0,
    currentAccountNickname: "DragonSlayer",
    startedAt: "2026-10-27T10:00:00Z",
    finishedAt: null,
    lastError: null,
  },
});
const mockGetAdminSystemParamsAction = vi.fn().mockResolvedValue({
  success: true,
  data: {
    items: [
      {
        id: "sp-1",
        group: "PAYMENT_SYNC",
        code: "STORE_POINT_TO_VND_RATE",
        value: "250",
        description: "Tỷ giá quy đổi 1 điểm nạp tại cổng quốc tế sang VNĐ",
        status: "ACTIVE",
        created_at: "2026-10-27T00:00:00Z",
        updated_at: "2026-10-27T00:00:00Z",
      },
    ],
    groups: ["PAYMENT_SYNC", "SPENDER_TIER"],
  },
});
const mockCreateAdminSystemParamAction = vi.fn().mockResolvedValue({
  success: true,
  data: {
    id: "sp-2",
    group: "PAYMENT_SYNC",
    code: "SYNC_DELAY_MS",
    value: "2500",
    description: "Delay",
    status: "ACTIVE",
    created_at: "2026-10-27T00:00:00Z",
    updated_at: "2026-10-27T00:00:00Z",
  },
});
const mockUpdateAdminSystemParamAction = vi.fn().mockResolvedValue({ success: true, data: {} });
const mockDeleteAdminSystemParamAction = vi.fn().mockResolvedValue({ success: true, data: { id: "sp-1" } });

vi.mock("@/actions/admin", () => ({
  updateAdminAccountAction: (...args: any[]) => mockUpdateAdminAccountAction(...args),
  adminLogoutAction: () => mockAdminLogoutAction(),
  getAdminAccountsAction: (...args: any[]) => mockGetAdminAccountsAction(...args),
  getAdminGiftcodesAction: (...args: any[]) => mockGetAdminGiftcodesAction(...args),
  createAdminGiftcodeAction: (...args: any[]) => mockCreateAdminGiftcodeAction(...args),
  updateAdminGiftcodeAction: (...args: any[]) => mockUpdateAdminGiftcodeAction(...args),
  verifyAdminGiftcodeAction: (...args: any[]) => mockVerifyAdminGiftcodeAction(...args),
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
  getAdminAccountPaymentsAction: (...args: any[]) => mockGetAdminAccountPaymentsAction(...args),
  getAdminWhaleAnalyticsAction: (...args: any[]) => mockGetAdminWhaleAnalyticsAction(...args),
  getAdminPaymentsSyncStatusAction: (...args: any[]) => mockGetAdminPaymentsSyncStatusAction(...args),
  triggerAdminPaymentsSyncAllAction: (...args: any[]) => mockTriggerAdminPaymentsSyncAllAction(...args),
  getAdminSystemParamsAction: (...args: any[]) => mockGetAdminSystemParamsAction(...args),
  createAdminSystemParamAction: (...args: any[]) => mockCreateAdminSystemParamAction(...args),
  updateAdminSystemParamAction: (...args: any[]) => mockUpdateAdminSystemParamAction(...args),
  deleteAdminSystemParamAction: (...args: any[]) => mockDeleteAdminSystemParamAction(...args),
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
      country: "VN",
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
      country: "SG",
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

  it("should render 4-group AdminSidebar with 7 screens and switch to Whale Analytics & System Params", async () => {
    await renderAdminManager();

    // Verify 4 Level-1 group headers
    expect(screen.getByText("Tài khoản")).toBeDefined();
    expect(screen.getByText("Gift Code")).toBeDefined();
    expect(screen.getByText("Cẩm nang")).toBeDefined();
    expect(screen.getByText("Cấu hình")).toBeDefined();

    // Verify 7 Level-2 menu tabs
    const whaleTab = screen.getByRole("tab", { name: /Thống Kê Nạp/i });
    const sysParamsTab = screen.getByRole("tab", { name: /Tham Số Hệ Thống/i });
    expect(whaleTab).toBeDefined();
    expect(sysParamsTab).toBeDefined();

    // Switch to Whale Analytics screen
    await act(async () => {
      fireEvent.click(whaleTab);
    });
    expect(
      screen.getByText(/Thống Kê Nạp Đa Kênh \(Funtap VN & Official Store\)/i)
    ).toBeDefined();
    expect(screen.getByText("KaelDravos")).toBeDefined();

    // Switch to System Params screen
    await act(async () => {
      fireEvent.click(sysParamsTab);
    });
    expect(
      screen.getByText(/Tham Số Hệ Thống \(MySQL \+ Redis Write-Through Cache\)/i)
    ).toBeDefined();
    expect(screen.getByText("STORE_POINT_TO_VND_RATE")).toBeDefined();
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

  it("should display global database summary counts in Top HUD cards and support server-side pagination without double-slicing", async () => {
    mockGetAdminAccountsAction.mockResolvedValue({
      success: true,
      data: {
        items: mockAccounts,
        total: 150,
        page: 2,
        limit: 20,
        total_pages: 8,
        summary: {
          total_accounts: 150,
          pro_count: 85,
          active_bots_count: 142,
          servers: ["1024", "1028", "1099"],
        },
      },
    });
    mockGetAdminGiftcodesAction.mockResolvedValue({
      success: true,
      data: {
        items: MOCK_GIFT_CODES,
        total: 35,
        page: 1,
        limit: 20,
        total_pages: 2,
        summary: {
          total_codes: 35,
          active_codes_count: 12,
        },
      },
    });
    mockGetAdminRedemptionsAction.mockResolvedValue({
      success: true,
      data: {
        items: MOCK_REDEMPTIONS,
        total: 500,
        page: 1,
        limit: 20,
        total_pages: 25,
        summary: {
          total_redemptions: 500,
          failed_count: 7,
          distinct_codes: ["HERO2026", "SPRING888"],
        },
      },
    });
    mockGetAdminCheckinsAction.mockResolvedValue({
      success: true,
      data: {
        items: MOCK_CHECKINS,
        total: 300,
        page: 1,
        limit: 20,
        total_pages: 15,
        summary: {
          total_checkins: 300,
          failed_count: 4,
          pending_count: 2,
          already_checked_count: 50,
          success_count: 244,
          distinct_days: ["2026-10-12", "2026-10-11"],
        },
      },
    });

    await act(async () => {
      render(
        <AdminManager
          initialAccounts={mockAccounts}
          initialAccountsSummary={{
            total_accounts: 150,
            pro_count: 85,
            active_bots_count: 142,
            servers: ["1024", "1028", "1099"],
          }}
          locale="vi"
        />
      );
    });

    // Global DB summary metrics in top HUD cards and tab badges:
    // Total accounts = 150, PRO = 85, Active bots = 142, Active codes = 12 (35 tổng), Failed redemptions = 7 lỗi, Total checkins = 300
    expect(screen.getAllByText("150").length).toBeGreaterThan(0);
    expect(screen.getByText(/85 Pro/i)).toBeDefined();
    expect(screen.getByText("142")).toBeDefined();
    expect(screen.getByText("12")).toBeDefined();
    expect(screen.getByText("35 tổng")).toBeDefined();
    expect(screen.getByText("7 lỗi")).toBeDefined();
    expect(screen.getByText("300")).toBeDefined();

    // Navigate to page 2 in TabAccounts and verify items are not double-sliced to empty
    const nextPageBtns = screen.getAllByTitle("Trang sau");
    await act(async () => {
      fireEvent.click(nextPageBtns[0]);
    });

    expect(mockGetAdminAccountsAction).toHaveBeenCalledWith(
      expect.objectContaining({
        page: 2,
        limit: 20,
      })
    );
    expect(screen.getByText("DragonSlayer")).toBeDefined();
    expect(screen.getByText("ShadowNinja")).toBeDefined();
  });

  it("preserves mixed case when adding a giftcode (e.g. St0rmCl4w) and calls verifyAdminGiftcodeAction when clicking 'Kiểm tra trạng thái trên game'", async () => {
    await renderAdminManager();

    const giftcodesTab = screen.getByRole("tab", { name: /Quản Lý Giftcode/i });
    await act(async () => {
      fireEvent.mouseDown(giftcodesTab, { button: 0 });
    });

    // 1. Add mixed-case giftcode St0rmCl4w
    const addBtn = screen.getByRole("button", { name: /Thêm Mã Mới/i });
    await act(async () => {
      fireEvent.click(addBtn);
    });

    const codeInput = screen.getByPlaceholderText("VD: HERO2026, AUTOBOT888...");
    await act(async () => {
      fireEvent.change(codeInput, { target: { value: "St0rmCl4w" } });
    });

    const submitBtn = screen.getByRole("button", { name: /Lưu & Kích Hoạt/i });
    await act(async () => {
      fireEvent.click(submitBtn);
    });

    expect(mockCreateAdminGiftcodeAction).toHaveBeenCalledWith(
      expect.objectContaining({
        code: "St0rmCl4w",
      })
    );

    // 2. Click "Kiểm tra trạng thái trên game" button
    const checkBtns = screen.getAllByTitle("Kiểm tra trạng thái trên game");
    expect(checkBtns.length).toBeGreaterThan(0);

    await act(async () => {
      fireEvent.click(checkBtns[0]);
    });

    expect(mockVerifyAdminGiftcodeAction).toHaveBeenCalled();
  });
});

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import React from "react";
import { TabAccounts } from "../src/components/dashboard/admin/tab-accounts";
import { WeeklyCheckinTimeline } from "../src/components/dashboard/admin/weekly-checkin-timeline";
import { AccountRedemptionsDialog } from "../src/components/dashboard/admin/account-redemptions-dialog";
import { AccountCheckinsDialog } from "../src/components/dashboard/admin/account-checkins-dialog";
import type { AdminAccountItem, AdminWeeklyTimelineItem, AdminAccountCheckinHistory } from "../src/types/api";

const mockGetAdminAccountRedemptionsAction = vi.fn();
const mockGetAdminAccountCheckinsAction = vi.fn();
const mockGetAdminWeeklyTimelineAction = vi.fn();
const mockRetryAdminCheckinAction = vi.fn();

vi.mock("@/actions/admin", () => ({
  getAdminAccountRedemptionsAction: (...args: any[]) => mockGetAdminAccountRedemptionsAction(...args),
  getAdminAccountCheckinsAction: (...args: any[]) => mockGetAdminAccountCheckinsAction(...args),
  getAdminWeeklyTimelineAction: (...args: any[]) => mockGetAdminWeeklyTimelineAction(...args),
  retryAdminCheckinAction: (...args: any[]) => mockRetryAdminCheckinAction(...args),
}));

const mockToast = vi.fn();
vi.mock("@/hooks/use-toast", () => ({
  useToast: () => ({
    toast: (...args: any[]) => mockToast(...args),
    toasts: [],
  }),
}));

describe("Admin Account Actions and Weekly Timeline", () => {
  const mockAccount: AdminAccountItem = {
    id: "acc-test-1",
    uid: "1000000000001",
    nickname: "DragonLord",
    server_id: "1024",
    active_plan: "PRO",
    ends_at: "2026-12-31T23:59:59Z",
    auto_redeem: true,
    auto_checkin: true,
    token_status: "VALID",
    created_at: "2026-10-01T00:00:00Z",
  };

  const createMockHistory = (): AdminAccountCheckinHistory => ({
    account: {
      id: "acc-test-1",
      uid: "1000000000001",
      nickname: "DragonLord",
      server_id: "1024",
    },
    stats: {
      total_days: 14,
      checked_days: 10,
      streak: 3,
    },
    weeks: {
      current_week: [
        {
          game_day: "2026-10-12",
          day_of_week: 1,
          label: "Thứ 2",
          status: "SUCCESS",
          is_today: false,
          is_future: false,
          checked_at: "2026-10-12T01:00:00Z",
        },
        {
          game_day: "2026-10-13",
          day_of_week: 2,
          label: "Thứ 3",
          status: "FAILED",
          is_today: true,
          is_future: false,
          checked_at: "2026-10-13T01:00:00Z",
        },
        {
          game_day: "2026-10-14",
          day_of_week: 3,
          label: "Thứ 4",
          status: "UPCOMING",
          is_today: false,
          is_future: true,
          checked_at: null,
        },
        {
          game_day: "2026-10-15",
          day_of_week: 4,
          label: "Thứ 5",
          status: "UPCOMING",
          is_today: false,
          is_future: true,
          checked_at: null,
        },
        {
          game_day: "2026-10-16",
          day_of_week: 5,
          label: "Thứ 6",
          status: "UPCOMING",
          is_today: false,
          is_future: true,
          checked_at: null,
        },
        {
          game_day: "2026-10-17",
          day_of_week: 6,
          label: "Thứ 7",
          status: "UPCOMING",
          is_today: false,
          is_future: true,
          checked_at: null,
        },
        {
          game_day: "2026-10-18",
          day_of_week: 7,
          label: "Chủ Nhật",
          status: "UPCOMING",
          is_today: false,
          is_future: true,
          checked_at: null,
        },
      ],
      previous_week: [
        {
          game_day: "2026-10-05",
          day_of_week: 1,
          label: "Thứ 2",
          status: "SUCCESS",
          is_today: false,
          is_future: false,
          checked_at: "2026-10-05T01:00:00Z",
        },
        {
          game_day: "2026-10-06",
          day_of_week: 2,
          label: "Thứ 3",
          status: "SUCCESS",
          is_today: false,
          is_future: false,
          checked_at: "2026-10-06T01:00:00Z",
        },
        {
          game_day: "2026-10-07",
          day_of_week: 3,
          label: "Thứ 4",
          status: "SUCCESS",
          is_today: false,
          is_future: false,
          checked_at: "2026-10-07T01:00:00Z",
        },
        {
          game_day: "2026-10-08",
          day_of_week: 4,
          label: "Thứ 5",
          status: "SUCCESS",
          is_today: false,
          is_future: false,
          checked_at: "2026-10-08T01:00:00Z",
        },
        {
          game_day: "2026-10-09",
          day_of_week: 5,
          label: "Thứ 6",
          status: "SUCCESS",
          is_today: false,
          is_future: false,
          checked_at: "2026-10-09T01:00:00Z",
        },
        {
          game_day: "2026-10-10",
          day_of_week: 6,
          label: "Thứ 7",
          status: "SUCCESS",
          is_today: false,
          is_future: false,
          checked_at: "2026-10-10T01:00:00Z",
        },
        {
          game_day: "2026-10-11",
          day_of_week: 7,
          label: "Chủ Nhật",
          status: "SUCCESS",
          is_today: false,
          is_future: false,
          checked_at: "2026-10-11T01:00:00Z",
        },
      ],
    },
  });

  const mockTimelineData: AdminWeeklyTimelineItem[] = [
    { day_of_week: 1, label: "Thứ 2", game_day: "2026-10-12", success_count: 45, total_eligible: 48, is_today: false, is_future: false },
    { day_of_week: 2, label: "Thứ 3", game_day: "2026-10-13", success_count: 40, total_eligible: 48, is_today: true, is_future: false },
    { day_of_week: 3, label: "Thứ 4", game_day: "2026-10-14", success_count: 0, total_eligible: 48, is_today: false, is_future: true },
    { day_of_week: 4, label: "Thứ 5", game_day: "2026-10-15", success_count: 0, total_eligible: 48, is_today: false, is_future: true },
    { day_of_week: 5, label: "Thứ 6", game_day: "2026-10-16", success_count: 0, total_eligible: 48, is_today: false, is_future: true },
    { day_of_week: 6, label: "Thứ 7", game_day: "2026-10-17", success_count: 0, total_eligible: 48, is_today: false, is_future: true },
    { day_of_week: 7, label: "Chủ Nhật", game_day: "2026-10-18", success_count: 0, total_eligible: 48, is_today: false, is_future: true },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("TabAccounts Action Buttons", () => {
    it("should render Gift and CalendarCheck action buttons on each account row", () => {
      render(
        <TabAccounts
          accounts={[mockAccount]}
          onToggle={vi.fn()}
          updatingId={null}
        />
      );

      const giftBtn = screen.getByRole("button", { name: /Lịch sử nhận giftcode/i });
      const checkinBtn = screen.getByRole("button", { name: /Lịch sử điểm danh/i });

      expect(giftBtn).toBeDefined();
      expect(checkinBtn).toBeDefined();
    });

    it("should trigger getAdminAccountRedemptionsAction when clicking Gift action button", async () => {
      mockGetAdminAccountRedemptionsAction.mockResolvedValueOnce({
        success: true,
        data: [],
      });

      render(
        <TabAccounts
          accounts={[mockAccount]}
          onToggle={vi.fn()}
          updatingId={null}
        />
      );

      const giftBtn = screen.getByRole("button", { name: /Lịch sử nhận giftcode/i });
      fireEvent.click(giftBtn);

      await waitFor(() => {
        expect(mockGetAdminAccountRedemptionsAction).toHaveBeenCalledWith("acc-test-1");
      });
    });

    it("should trigger getAdminAccountCheckinsAction when clicking CalendarCheck action button", async () => {
      mockGetAdminAccountCheckinsAction.mockResolvedValueOnce({
        success: true,
        data: createMockHistory(),
      });

      render(
        <TabAccounts
          accounts={[mockAccount]}
          onToggle={vi.fn()}
          updatingId={null}
        />
      );

      const checkinBtn = screen.getByRole("button", { name: /Lịch sử điểm danh/i });
      fireEvent.click(checkinBtn);

      await waitFor(() => {
        expect(mockGetAdminAccountCheckinsAction).toHaveBeenCalledWith("acc-test-1", 2);
      });
    });
  });

  describe("AccountRedemptionsDialog Component", () => {
    it("should render redemptions, allow search and status filtering", async () => {
      mockGetAdminAccountRedemptionsAction.mockResolvedValueOnce({
        success: true,
        data: [
          {
            id: "red-1",
            game_account_id: "acc-test-1",
            uid: "1000000000001",
            nickname: "DragonLord",
            server_id: "1024",
            gift_code: "HERO_SUCCESS",
            status: "SUCCESS",
            api_message: "",
            created_at: "2026-10-12T10:00:00Z",
          },
          {
            id: "red-2",
            game_account_id: "acc-test-1",
            uid: "1000000000001",
            nickname: "DragonLord",
            server_id: "1024",
            gift_code: "HERO_FAILED",
            status: "FAILED",
            api_message: "Code expired",
            created_at: "2026-10-12T11:00:00Z",
          },
        ],
      });

      render(
        <AccountRedemptionsDialog
          account={mockAccount}
          open={true}
          onOpenChange={vi.fn()}
        />
      );

      await waitFor(() => {
        expect(screen.getByText("HERO_SUCCESS")).toBeDefined();
        expect(screen.getByText("HERO_FAILED")).toBeDefined();
      });

      // Filter by "Lỗi" tab
      const failedTab = screen.getByRole("button", { name: /Lỗi/i });
      fireEvent.click(failedTab);

      expect(screen.queryByText("HERO_SUCCESS")).toBeNull();
      expect(screen.getByText("HERO_FAILED")).toBeDefined();
    });
  });

  describe("AccountCheckinsDialog Component", () => {
    it("should display audit metrics, 00:00 UTC notice, and allow retry today if failed", async () => {
      mockGetAdminAccountCheckinsAction.mockResolvedValue({
        success: true,
        data: createMockHistory(),
      });

      render(
        <AccountCheckinsDialog
          account={mockAccount}
          open={true}
          onOpenChange={vi.fn()}
        />
      );

      await waitFor(() => {
        expect(screen.getByText(/3d streak/i)).toBeDefined();
        expect(screen.getByText(/00:00 UTC/i)).toBeDefined();
        expect(screen.getByText(/10\/14 Ngày/i)).toBeDefined();
      });

      // Check retry button for today
      const retryTodayBtn = screen.getByRole("button", { name: /Thử lại hôm nay/i });
      expect(retryTodayBtn).toBeDefined();

      fireEvent.click(retryTodayBtn);

      await waitFor(() => {
        expect(mockToast).toHaveBeenCalledWith(
          expect.objectContaining({
            title: "Đang thử lại điểm danh...",
          })
        );
      });
    });
  });

  describe("WeeklyCheckinTimeline Component", () => {
    it("should render 7 nodes from Monday to Sunday and highlight today", async () => {
      mockGetAdminWeeklyTimelineAction.mockResolvedValueOnce({
        success: true,
        data: mockTimelineData,
      });

      const onSelectDay = vi.fn();

      render(
        <WeeklyCheckinTimeline
          selectedDay={null}
          onSelectDay={onSelectDay}
        />
      );

      await waitFor(() => {
        expect(mockGetAdminWeeklyTimelineAction).toHaveBeenCalled();
      });

      expect(await screen.findByText("Thứ 2")).toBeDefined();
      expect(screen.getByText("Thứ 3")).toBeDefined();
      expect(screen.getByText("Chủ Nhật")).toBeDefined();
      expect(screen.getByText("45")).toBeDefined();
      expect(screen.getByText("Hôm nay")).toBeDefined();
    });

    it("should trigger onSelectDay when clicking a node to filter or unfilter", async () => {
      mockGetAdminWeeklyTimelineAction.mockResolvedValueOnce({
        success: true,
        data: mockTimelineData,
      });

      const onSelectDay = vi.fn();

      render(
        <WeeklyCheckinTimeline
          selectedDay={null}
          onSelectDay={onSelectDay}
        />
      );

      await waitFor(() => {
        expect(screen.getByText("Thứ 2")).toBeDefined();
      });

      const mondayBtn = screen.getByRole("button", { name: /Mốc điểm danh Thứ 2/i });
      fireEvent.click(mondayBtn);

      expect(onSelectDay).toHaveBeenCalledWith("2026-10-12");
    });
  });
});

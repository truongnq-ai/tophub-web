import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import React from "react";
import { AccountCard } from "../src/components/dashboard/account-card";

describe("AccountCard Component", () => {
  const mockAccount = {
    id: "acc-1",
    uid: "2446869146316",
    server_id: "Server 1024",
    nickname: "DragonSlayer",
    auto_redeem: true,
    auto_checkin: false,
    created_at: "2026-10-11T12:00:00Z",
  };

  const mockLabels = {
    autoRedeem: "Tự động săn Giftcode",
    autoCheckin: "Tự động điểm danh hàng ngày",
    unlink: "Hủy liên kết",
    unlinkConfirmTitle: "Xác nhận hủy liên kết",
    unlinkConfirmDesc: "Bạn có chắc chắn muốn hủy liên kết tài khoản này?",
    confirm: "Xác nhận",
    cancel: "Hủy bỏ",
  };

  it("should render nickname and server correctly", () => {
    render(
      <AccountCard
        account={mockAccount}
        onToggle={vi.fn()}
        onUnlink={vi.fn()}
        labels={mockLabels}
      />
    );
    expect(screen.getByText("DragonSlayer")).toBeDefined();
    expect(screen.getByText(/Server 1024/i)).toBeDefined();
  });

  it("should call onToggle callback when switch is toggled", async () => {
    const toggleSpy = vi.fn();
    render(
      <AccountCard
        account={mockAccount}
        onToggle={toggleSpy}
        onUnlink={vi.fn()}
        labels={mockLabels}
      />
    );
    const switches = screen.getAllByRole("switch");
    await act(async () => {
      fireEvent.click(switches[0]);
    });
    expect(toggleSpy).toHaveBeenCalled();
  });
});

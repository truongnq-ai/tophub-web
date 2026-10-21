import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import React from "react";
import { UidControlDashboard } from "../src/components/home/uid-control-dashboard";

const saveAccountMock = vi.fn().mockResolvedValue(undefined);
const logoutMock = vi.fn().mockResolvedValue(undefined);
const getPlayerStatusActionMock = vi.fn();

vi.mock("@/hooks/use-uid-session", () => ({
  useUidSession: () => ({
    saveAccount: saveAccountMock,
    logout: logoutMock,
  }),
}));

vi.mock("@/actions/players", () => ({
  getPlayerStatusAction: (...args: unknown[]) => getPlayerStatusActionMock(...args),
  triggerRunNowAction: vi.fn(),
  updatePlayerSettingsAction: vi.fn(),
}));

vi.mock("@/i18n/routing", () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useFormatter: () => ({
    dateTime: () => "21/10/2026",
  }),
}));

describe("UidControlDashboard — Nickname Auto-Sync to LocalStorage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("syncs updated nickname from getPlayerStatusAction into useUidSession saveAccount and renders new name immediately", async () => {
    getPlayerStatusActionMock.mockResolvedValue({
      success: true,
      data: {
        uid: "2446869146316",
        nickname: "Max",
        server_id: "S10956",
        active_plan: "FREE",
        ends_at: null,
        auto_redeem: true,
        auto_checkin: true,
        token_status: "READY",
        recent_redemptions: [],
      },
    });

    render(
      <UidControlDashboard
        account={{
          uid: "2446869146316",
          nickname: "Min",
          server_id: "S10956",
          added_at: 1700000000000,
          active_plan: "FREE",
        }}
      />
    );

    await waitFor(() => {
      expect(saveAccountMock).toHaveBeenCalledWith(
        expect.objectContaining({
          uid: "2446869146316",
          nickname: "Max",
          server_id: "S10956",
          active_plan: "FREE",
        })
      );
    });

    expect(screen.getByText("Max")).toBeDefined();
  });
});

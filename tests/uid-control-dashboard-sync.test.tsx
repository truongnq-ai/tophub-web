import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import React from "react";
import fs from "node:fs";
import path from "node:path";
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

const FORBIDDEN_MICRO_TEXT_REGEX = /text-\[(?:8|9|10|11)px\]/;

describe("UidControlDashboard — Nickname Auto-Sync & MD3 Containment", () => {
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

  it("Phase 1.2: enforces Single-Layer Containment on mobile (divide-y without nested borders) and >=44px touch targets", async () => {
    const dashboardPath = path.resolve(
      __dirname,
      "../src/components/home/uid-control-dashboard.tsx"
    );
    const dashboardSource = fs.readFileSync(dashboardPath, "utf-8");
    expect(FORBIDDEN_MICRO_TEXT_REGEX.test(dashboardSource)).toBe(false);

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
          nickname: "Max",
          server_id: "S10956",
          added_at: 1700000000000,
          active_plan: "FREE",
        }}
        initialActiveCodes={[{ code: "GIFT2026", status: "VALID" }]}
      />
    );

    await waitFor(() => {
      expect(screen.getByText("Max")).toBeDefined();
    });

    const switchesGroup = screen.getByTestId("bot-automation-switches");
    expect(switchesGroup.className).toContain("divide-y");

    const logoutBtn = screen.getByRole("button", { name: /logoutBtn/i });
    expect(logoutBtn.className).toContain("min-h-[44px]");

    const refreshBtn = screen.getByRole("button", { name: /refreshBtn/i });
    expect(refreshBtn.className).toContain("min-h-[44px]");

    const copyBtn = screen.getByRole("button", { name: "GIFT2026" });
    expect(copyBtn.className).toContain("min-h-[44px]");
  });
});

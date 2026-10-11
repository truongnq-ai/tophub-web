import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  previewPlayerAction,
  enrollPlayerAction,
  triggerRunNowAction,
  updatePlayerSettingsAction,
} from "../src/actions/players";
import { apiClient } from "../src/lib/api-client";

// Mock next/headers
vi.mock("next/headers", () => ({
  cookies: () => ({
    set: vi.fn(),
    get: vi.fn().mockReturnValue({ value: "2446869146316" }),
    delete: vi.fn(),
  }),
}));

describe("Player UID Actions", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("previewPlayerAction should reject invalid UID", async () => {
    const res = await previewPlayerAction("123");
    expect(res.success).toBe(false);
    expect(res.error?.code).toBe("VALIDATION_ERROR");
  });

  it("previewPlayerAction should call apiClient.previewPlayer with valid UID", async () => {
    const spy = vi.spyOn(apiClient, "previewPlayer").mockResolvedValue({
      success: true,
      data: {
        uid: "2446869146316",
        nickname: "HeroDragon",
        server_id: "1045",
        is_enrolled: true,
      },
    });

    const res = await previewPlayerAction("2446869146316");
    expect(res.success).toBe(true);
    expect(res.data?.nickname).toBe("HeroDragon");
    expect(res.data?.is_enrolled).toBe(true);
    expect(spy).toHaveBeenCalledWith("2446869146316");
  });

  it("enrollPlayerAction should call apiClient.enrollPlayer", async () => {
    const spy = vi.spyOn(apiClient, "enrollPlayer").mockResolvedValue({
      success: true,
      data: {
        uid: "2446869146316",
        nickname: "HeroDragon",
        server_id: "1045",
        is_enrolled: true,
        auto_redeem: true,
        auto_checkin: true,
      },
    });

    const res = await enrollPlayerAction("2446869146316");
    expect(res.success).toBe(true);
    expect(res.data?.is_enrolled).toBe(true);
    expect(spy).toHaveBeenCalledWith("2446869146316");
  });

  it("triggerRunNowAction should call apiClient.triggerRunNow", async () => {
    const spy = vi.spyOn(apiClient, "triggerRunNow").mockResolvedValue({
      success: true,
      data: {
        uid: "2446869146316",
        checkin_status: "SUCCESS",
        newly_redeemed: 2,
        message: "Đã nhận thành công 2 mã giftcode mới!",
      },
    });

    const res = await triggerRunNowAction("2446869146316");
    expect(res.success).toBe(true);
    expect(res.data?.newly_redeemed).toBe(2);
    expect(spy).toHaveBeenCalledWith("2446869146316");
  });

  it("updatePlayerSettingsAction should call apiClient.updatePlayerSettings", async () => {
    const spy = vi.spyOn(apiClient, "updatePlayerSettings").mockResolvedValue({
      success: true,
      data: {
        uid: "2446869146316",
        auto_redeem: false,
        auto_checkin: true,
      },
    });

    const res = await updatePlayerSettingsAction("2446869146316", { auto_redeem: false });
    expect(res.success).toBe(true);
    expect(res.data?.auto_redeem).toBe(false);
    expect(spy).toHaveBeenCalledWith("2446869146316", { auto_redeem: false });
  });
});

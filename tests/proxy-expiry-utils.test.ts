import { describe, it, expect } from "vitest";
import {
  formatProxyExpiryDateTime,
  formatProxyExpiryToDatetimeLocal,
  getProxyExpiryCountdown,
  parseProxyExpiryInput,
  buildPresetExpiryInput,
} from "@/components/dashboard/admin/proxy-expiry-utils";

describe("proxy-expiry-utils", () => {
  // 2026-11-06 09:57 Giờ VN (UTC+7) = 2026-11-06T02:57:00.000Z
  const TARGET_ISO = "2026-11-06T02:57:00.000Z";
  const TARGET_MS = new Date(TARGET_ISO).getTime();

  it("formatProxyExpiryDateTime hiển thị chuẩn yyyy-MM-dd HH:mm theo Giờ VN (UTC+7)", () => {
    expect(formatProxyExpiryDateTime(TARGET_ISO)).toBe("2026-11-06 09:57");
    expect(formatProxyExpiryToDatetimeLocal(TARGET_ISO)).toBe("2026-11-06T09:57");
    expect(formatProxyExpiryDateTime(null)).toBeNull();
    expect(formatProxyExpiryDateTime("invalid")).toBeNull();
  });

  it("getProxyExpiryCountdown trả SAFE (màu xanh) khi còn > 24 giờ", () => {
    const nowMs = TARGET_MS - (2 * 86400 + 5 * 3600 + 30 * 60) * 1000;
    const res = getProxyExpiryCountdown(TARGET_ISO, nowMs);
    expect(res.level).toBe("SAFE");
    expect(res.formattedDate).toBe("2026-11-06 09:57");
    expect(res.countdownText).toBe("Còn 2 ngày 5 giờ");
  });

  it("getProxyExpiryCountdown trả WARNING (màu vàng) khi còn từ 6 giờ đến <= 24 giờ", () => {
    const nowMs = TARGET_MS - (11 * 3600 + 49 * 60) * 1000;
    const res = getProxyExpiryCountdown(TARGET_ISO, nowMs);
    expect(res.level).toBe("WARNING");
    expect(res.formattedDate).toBe("2026-11-06 09:57");
    expect(res.countdownText).toBe("Còn 11 giờ 49 phút");
  });

  it("getProxyExpiryCountdown trả DANGER (màu đỏ) khi còn < 6 giờ", () => {
    const nowMs = TARGET_MS - (2 * 3600 + 15 * 60 + 9) * 1000;
    const res = getProxyExpiryCountdown(TARGET_ISO, nowMs);
    expect(res.level).toBe("DANGER");
    expect(res.formattedDate).toBe("2026-11-06 09:57");
    expect(res.countdownText).toBe("Còn 2 giờ 15 phút 09s");
  });

  it("getProxyExpiryCountdown trả EXPIRED và ẩn countdownText khi quá hạn (<= 0)", () => {
    const nowMs = TARGET_MS + 1000;
    const res = getProxyExpiryCountdown(TARGET_ISO, nowMs);
    expect(res.level).toBe("EXPIRED");
    expect(res.formattedDate).toBe("2026-11-06 09:57");
    expect(res.countdownText).toBeNull();
  });

  it("parseProxyExpiryInput hỗ trợ cả chuẩn datetime-local lẫn chuỗi copy từ web mua proxy", () => {
    expect(parseProxyExpiryInput("09:57:00 6/11/2026")).toEqual({
      iso: "2026-11-06T02:57:00.000Z",
      datetimeLocal: "2026-11-06T09:57",
      display: "2026-11-06 09:57",
    });
    expect(parseProxyExpiryInput("2026-11-06T09:57")).toEqual({
      iso: "2026-11-06T02:57:00.000Z",
      datetimeLocal: "2026-11-06T09:57",
      display: "2026-11-06 09:57",
    });
    expect(parseProxyExpiryInput("2026-11-06 09:57")).toEqual({
      iso: "2026-11-06T02:57:00.000Z",
      datetimeLocal: "2026-11-06T09:57",
      display: "2026-11-06 09:57",
    });
    expect(parseProxyExpiryInput("06/11/2026 09:57")).toEqual({
      iso: "2026-11-06T02:57:00.000Z",
      datetimeLocal: "2026-11-06T09:57",
      display: "2026-11-06 09:57",
    });
    expect(parseProxyExpiryInput("không hợp lệ")).toBeNull();
  });

  it("buildPresetExpiryInput cộng thêm số ngày chính xác theo Giờ VN", () => {
    const baseMs = new Date("2026-11-03T02:57:00.000Z").getTime();
    expect(buildPresetExpiryInput(3, baseMs)).toBe("2026-11-06 09:57");
  });
});

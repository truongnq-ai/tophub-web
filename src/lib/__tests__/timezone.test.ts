import { describe, expect, it } from "vitest";
import {
  getCurrentUtcDayIndex,
  convertUtcHourMinuteToLocal,
  convertUtcRangeToLocal,
  getUtcOffsetLabel,
  getBrowserTimeZoneInfo,
  formatUtcClock,
  formatLocalizedDate,
  formatLocalizedDateTime,
  formatLocalizedTimeWithTz,
} from "../timezone";

describe("timezone utility", () => {
  it("computes Monday-first (0..6) index using UTC day rather than local day", () => {
    // Sunday 2026-10-18T23:30:00Z -> UTC is Sunday (index 6), even though UTC+7 is Monday 06:30
    const sundayLateUtc = new Date("2026-10-18T23:30:00.000Z");
    expect(getCurrentUtcDayIndex(sundayLateUtc)).toBe(6);

    // Monday 2026-10-19T00:05:00Z -> UTC is Monday (index 0)
    const mondayEarlyUtc = new Date("2026-10-19T00:05:00.000Z");
    expect(getCurrentUtcDayIndex(mondayEarlyUtc)).toBe(0);
  });

  it("converts a UTC hour:minute into a target offset in minutes", () => {
    // 00:00 UTC in UTC+7 (+420 min) -> 07:00
    expect(convertUtcHourMinuteToLocal(0, 0, 420)).toBe("07:00");
    // 02:00 UTC in UTC-5 (-300 min) -> 21:00
    expect(convertUtcHourMinuteToLocal(2, 0, -300)).toBe("21:00");
    // 14:00 UTC in UTC+7 (+420 min) -> 21:00
    expect(convertUtcHourMinuteToLocal(14, 0, 420)).toBe("21:00");
    // 18:00 UTC in UTC+7 (+420 min) -> 01:00
    expect(convertUtcHourMinuteToLocal(18, 0, 420)).toBe("01:00");
  });

  it("converts a UTC time range into local time range", () => {
    expect(convertUtcRangeToLocal(6, 0, 10, 0, 420)).toBe("13:00–17:00");
    expect(convertUtcRangeToLocal(14, 0, 18, 0, 420)).toBe("21:00–01:00");
  });

  it("formats UTC offset label cleanly", () => {
    expect(getUtcOffsetLabel(0)).toBe("UTC+0");
    expect(getUtcOffsetLabel(420)).toBe("UTC+7");
    expect(getUtcOffsetLabel(-300)).toBe("UTC-5");
    expect(getUtcOffsetLabel(330)).toBe("UTC+5:30");
  });

  it("formats UTC clock and detects browser timezone info", () => {
    const sampleDate = new Date("2026-10-18T02:05:00.000Z");
    expect(formatUtcClock(sampleDate)).toBe("02:05 UTC");
    const tzInfo = getBrowserTimeZoneInfo(sampleDate);
    expect(tzInfo.offsetLabel).toMatch(/^UTC[+-]\d+/);
    expect(typeof tzInfo.timeZone).toBe("string");
  });

  it("formats localized dates and datetimes according to locale ('vi' vs 'en')", () => {
    const sampleIso = "2026-10-18T02:00:00.000Z";
    const viDate = formatLocalizedDate(sampleIso, "vi");
    const enDate = formatLocalizedDate(sampleIso, "en");
    expect(viDate).toBeTruthy();
    expect(enDate).toBeTruthy();

    const viDateTime = formatLocalizedDateTime(sampleIso, "vi");
    const enDateTime = formatLocalizedDateTime(sampleIso, "en");
    expect(viDateTime).toContain("UTC");
    expect(enDateTime).toContain("UTC");

    const viTime = formatLocalizedTimeWithTz(sampleIso, "vi");
    expect(viTime).toContain("UTC");
  });
});

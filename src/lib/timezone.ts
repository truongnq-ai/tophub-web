export interface BrowserTimeZoneInfo {
  timeZone: string;
  offsetMinutes: number;
  offsetLabel: string;
}

const MINUTES_PER_HOUR = 60;
const MINUTES_PER_DAY = 1440;
const SUNDAY_MONDAY_FIRST_INDEX = 6;

/**
 * Returns 0 for Monday .. 6 for Sunday based strictly on UTC day.
 */
export function getCurrentUtcDayIndex(now: Date = new Date()): number {
  const utcDay = now.getUTCDay(); // 0 = Sunday, 1 = Monday, ...
  return utcDay === 0 ? SUNDAY_MONDAY_FIRST_INDEX : utcDay - 1;
}

/**
 * Formats an offset in minutes (where positive = East of UTC, e.g. +420 for UTC+7)
 * into a human-readable "UTC+7", "UTC-5", "UTC+5:30", or "UTC+0" string.
 */
export function getUtcOffsetLabel(offsetMinutesEast: number): string {
  if (offsetMinutesEast === 0) return "UTC+0";
  const sign = offsetMinutesEast > 0 ? "+" : "-";
  const abs = Math.abs(offsetMinutesEast);
  const hours = Math.floor(abs / MINUTES_PER_HOUR);
  const minutes = abs % MINUTES_PER_HOUR;
  if (minutes === 0) {
    return `UTC${sign}${hours}`;
  }
  return `UTC${sign}${hours}:${String(minutes).padStart(2, "0")}`;
}

/**
 * Detects the current browser timezone and its offset east of UTC.
 * Note: Date.prototype.getTimezoneOffset() returns minutes WEST of UTC (e.g., -420 for UTC+7),
 * so we negate it to get minutes EAST of UTC (+420).
 */
export function getBrowserTimeZoneInfo(now: Date = new Date()): BrowserTimeZoneInfo {
  const offsetMinutes = -now.getTimezoneOffset();
  let timeZone = "UTC";
  try {
    timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  } catch {
    timeZone = "UTC";
  }
  return {
    timeZone,
    offsetMinutes,
    offsetLabel: getUtcOffsetLabel(offsetMinutes),
  };
}

/**
 * Converts a UTC hour and minute into a "HH:MM" string at the given offset (minutes east of UTC).
 */
export function convertUtcHourMinuteToLocal(
  utcHour: number,
  utcMinute: number,
  offsetMinutesEast: number
): string {
  const totalMinutes =
    (((utcHour * MINUTES_PER_HOUR + utcMinute + offsetMinutesEast) %
      MINUTES_PER_DAY) +
      MINUTES_PER_DAY) %
    MINUTES_PER_DAY;
  const hh = Math.floor(totalMinutes / MINUTES_PER_HOUR);
  const mm = totalMinutes % MINUTES_PER_HOUR;
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
}

/**
 * Converts a UTC hour:minute range into a "HH:MM–HH:MM" string at the given offset.
 */
export function convertUtcRangeToLocal(
  startUtcHour: number,
  startUtcMinute: number,
  endUtcHour: number,
  endUtcMinute: number,
  offsetMinutesEast: number
): string {
  const start = convertUtcHourMinuteToLocal(
    startUtcHour,
    startUtcMinute,
    offsetMinutesEast
  );
  const end = convertUtcHourMinuteToLocal(
    endUtcHour,
    endUtcMinute,
    offsetMinutesEast
  );
  return `${start}–${end}`;
}

/**
 * Formats the current UTC time as "HH:MM UTC".
 */
export function formatUtcClock(now: Date = new Date()): string {
  const hh = String(now.getUTCHours()).padStart(2, "0");
  const mm = String(now.getUTCMinutes()).padStart(2, "0");
  return `${hh}:${mm} UTC`;
}

function resolveIntlLocale(locale?: string): string {
  return locale === "en" ? "en-US" : "vi-VN";
}

/**
 * Formats a date (without time) using the active next-intl locale ("vi" -> "vi-VN", "en" -> "en-US").
 */
export function formatLocalizedDate(
  value: string | number | Date,
  locale: string = "vi",
  options?: Intl.DateTimeFormatOptions
): string {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  const intlLocale = resolveIntlLocale(locale);
  return date.toLocaleDateString(
    intlLocale,
    options ?? { day: "2-digit", month: "2-digit", year: "numeric" }
  );
}

/**
 * Formats a date + time using the active locale and appends the local UTC offset label
 * (e.g. "18/10/2026, 09:00 (UTC+7)" or "Oct 18, 2026, 09:00 AM (UTC+7)").
 */
export function formatLocalizedDateTime(
  value: string | number | Date,
  locale: string = "vi",
  options?: Intl.DateTimeFormatOptions
): string {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  const intlLocale = resolveIntlLocale(locale);
  const offsetLabel = getUtcOffsetLabel(-date.getTimezoneOffset());
  const formatted = date.toLocaleString(
    intlLocale,
    options ?? {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );
  return `${formatted} (${offsetLabel})`;
}

/**
 * Formats a time of day with explicit UTC offset badge (e.g., "09:00:00 (UTC+7)").
 */
export function formatLocalizedTimeWithTz(
  value: string | number | Date,
  locale: string = "vi",
  options?: Intl.DateTimeFormatOptions
): string {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  const intlLocale = resolveIntlLocale(locale);
  const offsetLabel = getUtcOffsetLabel(-date.getTimezoneOffset());
  const formatted = date.toLocaleTimeString(
    intlLocale,
    options ?? {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }
  );
  return `${formatted} (${offsetLabel})`;
}

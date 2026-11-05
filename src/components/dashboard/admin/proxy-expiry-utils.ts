export type ProxyExpiryLevel = "NONE" | "SAFE" | "WARNING" | "DANGER" | "EXPIRED";

export interface ProxyExpiryCountdownState {
  level: ProxyExpiryLevel;
  formattedDate: string | null;
  countdownText: string | null;
  remainingMs: number | null;
}

const VN_OFFSET_MS = 7 * 3600 * 1000;
const HOUR_MS = 3600 * 1000;
const SAFE_THRESHOLD_MS = 24 * HOUR_MS; // > 24h => Xanh
const WARNING_THRESHOLD_MS = 6 * HOUR_MS; // 6h..24h => Vàng, < 6h => Đỏ

const pad2 = (n: number): string => String(n).padStart(2, "0");

function toVnParts(ms: number): {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
} {
  const vnDate = new Date(ms + VN_OFFSET_MS);
  return {
    year: vnDate.getUTCFullYear(),
    month: vnDate.getUTCMonth() + 1,
    day: vnDate.getUTCDate(),
    hour: vnDate.getUTCHours(),
    minute: vnDate.getUTCMinutes(),
  };
}

/**
 * Định dạng ISO timestamp sang chuỗi "yyyy-MM-dd HH:mm" theo Giờ Việt Nam (UTC+7).
 */
export function formatProxyExpiryDateTime(
  iso: string | null | undefined
): string | null {
  if (!iso) return null;
  const ms = new Date(iso).getTime();
  if (Number.isNaN(ms)) return null;
  const { year, month, day, hour, minute } = toVnParts(ms);
  return `${year}-${pad2(month)}-${pad2(day)} ${pad2(hour)}:${pad2(minute)}`;
}

/**
 * Chuyển ISO timestamp sang giá trị dùng cho <input type="datetime-local" /> ("yyyy-MM-ddTHH:mm" Giờ VN).
 */
export function formatProxyExpiryToDatetimeLocal(
  iso: string | null | undefined
): string {
  const formatted = formatProxyExpiryDateTime(iso);
  return formatted ? formatted.replace(" ", "T") : "";
}

/**
 * Tính trạng thái hiển thị ngày hết hạn và bộ đếm countdown.
 */
export function getProxyExpiryCountdown(
  expiresAtIso: string | null | undefined,
  nowMs: number = Date.now()
): ProxyExpiryCountdownState {
  const formattedDate = formatProxyExpiryDateTime(expiresAtIso);
  if (!expiresAtIso || !formattedDate) {
    return {
      level: "NONE",
      formattedDate: null,
      countdownText: null,
      remainingMs: null,
    };
  }

  const targetMs = new Date(expiresAtIso).getTime();
  const diffMs = targetMs - nowMs;

  if (diffMs <= 0) {
    return {
      level: "EXPIRED",
      formattedDate,
      countdownText: null,
      remainingMs: diffMs,
    };
  }

  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (diffMs > SAFE_THRESHOLD_MS) {
    const countdownText =
      hours > 0
        ? `Còn ${days} ngày ${hours} giờ`
        : `Còn ${days} ngày ${minutes} phút`;
    return {
      level: "SAFE",
      formattedDate,
      countdownText,
      remainingMs: diffMs,
    };
  }

  if (diffMs >= WARNING_THRESHOLD_MS) {
    const totalHours = Math.floor(totalSeconds / 3600);
    return {
      level: "WARNING",
      formattedDate,
      countdownText: `Còn ${totalHours} giờ ${minutes} phút`,
      remainingMs: diffMs,
    };
  }

  const totalHours = Math.floor(totalSeconds / 3600);
  const countdownText =
    totalHours > 0
      ? `Còn ${totalHours} giờ ${minutes} phút ${pad2(seconds)}s`
      : `Còn ${minutes} phút ${pad2(seconds)}s`;

  return {
    level: "DANGER",
    formattedDate,
    countdownText,
    remainingMs: diffMs,
  };
}

function buildResultFromVnComponents(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number
): { iso: string; datetimeLocal: string; display: string } | null {
  if (
    year < 2020 ||
    year > 2100 ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31 ||
    hour < 0 ||
    hour > 23 ||
    minute < 0 ||
    minute > 59
  ) {
    return null;
  }
  const utcMs = Date.UTC(year, month - 1, day, hour, minute, 0, 0) - VN_OFFSET_MS;
  const check = toVnParts(utcMs);
  if (check.year !== year || check.month !== month || check.day !== day) {
    return null;
  }
  const datePart = `${year}-${pad2(month)}-${pad2(day)}`;
  const timePart = `${pad2(hour)}:${pad2(minute)}`;
  return {
    iso: new Date(utcMs).toISOString(),
    datetimeLocal: `${datePart}T${timePart}`,
    display: `${datePart} ${timePart}`,
  };
}

/**
 * Hỗ trợ phân tích cú pháp:
 * 1. Chuỗi datetime-local / ISO: "2026-11-06T09:57" hoặc "2026-11-06 09:57(:00)"
 * 2. Chuỗi copy trực tiếp từ web mua proxy: "09:57:00 6/11/2026" hoặc "09:57 06/11/2026"
 * 3. Chuỗi ngày/tháng/năm trước giờ sau: "6/11/2026 09:57:00" hoặc "06-11-2026 09:57"
 */
export function parseProxyExpiryInput(
  raw: string
): { iso: string; datetimeLocal: string; display: string } | null {
  const s = raw.trim();
  if (!s) return null;

  // 1. yyyy-MM-dd[T ]HH:mm(:ss)?
  const isoLike = /^(\d{4})-(\d{1,2})-(\d{1,2})[T\s]+(\d{1,2}):(\d{2})(?::(\d{2}))?$/.exec(
    s
  );
  if (isoLike) {
    return buildResultFromVnComponents(
      Number(isoLike[1]),
      Number(isoLike[2]),
      Number(isoLike[3]),
      Number(isoLike[4]),
      Number(isoLike[5])
    );
  }

  // 2. HH:mm(:ss)? D/M/YYYY (định dạng trang mua proxy: "09:57:00 6/11/2026")
  const timeFirst = /^(\d{1,2}):(\d{2})(?::\d{2})?\s+(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/.exec(
    s
  );
  if (timeFirst) {
    return buildResultFromVnComponents(
      Number(timeFirst[5]),
      Number(timeFirst[4]),
      Number(timeFirst[3]),
      Number(timeFirst[1]),
      Number(timeFirst[2])
    );
  }

  // 3. D/M/YYYY HH:mm(:ss)?
  const dateFirst = /^(\d{1,2})[/-](\d{1,2})[/-](\d{4})\s+(\d{1,2}):(\d{2})(?::\d{2})?$/.exec(
    s
  );
  if (dateFirst) {
    return buildResultFromVnComponents(
      Number(dateFirst[3]),
      Number(dateFirst[2]),
      Number(dateFirst[1]),
      Number(dateFirst[4]),
      Number(dateFirst[5])
    );
  }

  return null;
}

/**
 * Tạo chuỗi "yyyy-MM-dd HH:mm" (Giờ VN) cộng thêm `days` ngày kể từ `baseMs`.
 */
export function buildPresetExpiryInput(
  days: number,
  baseMs: number = Date.now()
): string {
  const targetMs = baseMs + days * 86400 * 1000;
  const { year, month, day, hour, minute } = toVnParts(targetMs);
  return `${year}-${pad2(month)}-${pad2(day)} ${pad2(hour)}:${pad2(minute)}`;
}

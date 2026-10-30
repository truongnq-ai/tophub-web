export type NumberSuffixUnit = "" | "K" | "M" | "B" | "T";

export interface FormatCompactNumberOptions {
  /**
   * Số chữ số thập phân tối đa khi rút gọn (Mặc định: 2 -> ví dụ 36.16M)
   */
  readonly maxDecimals?: number;
  /**
   * Ngưỡng bắt đầu chuyển sang K/M/B/T (Mặc định: 1_000).
   * Có thể truyền 10_000 nếu muốn các số từ 1,000 -> 9,999 giữ nguyên dạng 3,163.
   */
  readonly threshold?: number;
  /**
   * Giữ lại số 0 ở cuối phần thập phân (Mặc định: false -> "1.5M" thay vì "1.50M")
   */
  readonly keepTrailingZeros?: boolean;
  /**
   * Chế độ làm tròn:
   * - "round": Làm tròn toán học chuẩn (Mặc định cho chi phí cần dùng)
   * - "floor": Làm tròn xuống (Chuẩn game khi hiển thị tài nguyên đang có trong túi)
   */
  readonly roundingMode?: "round" | "floor";
  /**
   * Thêm dấu "+" phía trước nếu là số dương ("auto" | "always")
   */
  readonly signDisplay?: "auto" | "always";
}

export interface FormattedGameNumberParts {
  readonly raw: number;
  readonly compact: string;
  readonly numericPart: string;
  readonly suffix: NumberSuffixUnit;
  readonly exact: string;
  readonly isCompacted: boolean;
}

interface SuffixTier {
  readonly unit: NumberSuffixUnit;
  readonly divisor: number;
}

const SUFFIX_TIERS: readonly SuffixTier[] = [
  { unit: "", divisor: 1 },
  { unit: "K", divisor: 1_000 },
  { unit: "M", divisor: 1_000_000 },
  { unit: "B", divisor: 1_000_000_000 },
  { unit: "T", divisor: 1_000_000_000_000 },
];

const DEFAULT_MAX_DECIMALS = 2;
const DEFAULT_THRESHOLD = 1_000;
const ROLLOVER_BOUNDARY = 1_000;
const BASE_TEN = 10;

const INPUT_MULTIPLIERS: Readonly<Record<string, number>> = {
  k: 1_000,
  m: 1_000_000,
  b: 1_000_000_000,
  t: 1_000_000_000_000,
};

/**
 * Định dạng số nguyên chuẩn với dấu phẩy `,` ngăn cách hàng nghìn (ví dụ: 216,960,000).
 * Độc lập hoàn toàn với locale ngẫu nhiên của trình duyệt.
 */
export function formatExactNumber(value: number): string {
  if (!Number.isFinite(value)) {
    return "0";
  }
  const rounded = Math.round(value);
  if (Object.is(rounded, -0)) {
    return "0";
  }
  const isNegative = rounded < 0;
  const absStr = Math.abs(rounded)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return isNegative ? `-${absStr}` : absStr;
}

function roundToDecimals(
  value: number,
  decimals: number,
  mode: "round" | "floor"
): number {
  const factor = Math.pow(BASE_TEN, decimals);
  if (mode === "floor") {
    return Math.floor((value + Number.EPSILON) * factor) / factor;
  }
  return Math.round((value + Number.EPSILON) * factor) / factor;
}

/**
 * Bóc tách đầy đủ các thành phần số chuẩn Game (K / M / B / T) để phục vụ hiển thị MD3.
 */
export function formatGameNumberParts(
  value: number,
  options?: FormatCompactNumberOptions
): FormattedGameNumberParts {
  if (!Number.isFinite(value)) {
    return {
      raw: 0,
      compact: "0",
      numericPart: "0",
      suffix: "",
      exact: "0",
      isCompacted: false,
    };
  }

  const maxDecimals = Math.max(
    0,
    Math.min(4, options?.maxDecimals ?? DEFAULT_MAX_DECIMALS)
  );
  const threshold = Math.max(
    DEFAULT_THRESHOLD,
    options?.threshold ?? DEFAULT_THRESHOLD
  );
  const keepTrailingZeros = options?.keepTrailingZeros ?? false;
  const roundingMode = options?.roundingMode ?? "round";
  const signDisplay = options?.signDisplay ?? "auto";

  const exact = formatExactNumber(value);
  const absValue = Math.abs(value);
  const signPrefix =
    value < 0 ? "-" : value > 0 && signDisplay === "always" ? "+" : "";

  if (absValue < threshold) {
    const exactAbs = formatExactNumber(absValue);
    const numericPart = `${signPrefix}${exactAbs}`;
    return {
      raw: value,
      compact: numericPart,
      numericPart,
      suffix: "",
      exact,
      isCompacted: false,
    };
  }

  let tierIndex = 0;
  for (let i = SUFFIX_TIERS.length - 1; i >= 1; i--) {
    if (absValue >= SUFFIX_TIERS[i].divisor) {
      tierIndex = i;
      break;
    }
  }

  let scaled = roundToDecimals(
    absValue / SUFFIX_TIERS[tierIndex].divisor,
    maxDecimals,
    roundingMode
  );

  // Chống lỗi Boundary Rollover (VD: 999,999 làm tròn thành 1000.00K -> phải nhảy lên 1M)
  if (
    scaled >= ROLLOVER_BOUNDARY &&
    tierIndex < SUFFIX_TIERS.length - 1
  ) {
    tierIndex += 1;
    scaled = roundToDecimals(
      absValue / SUFFIX_TIERS[tierIndex].divisor,
      maxDecimals,
      roundingMode
    );
  }

  const suffix = SUFFIX_TIERS[tierIndex].unit;
  const fixedStr = scaled.toFixed(maxDecimals);
  const cleanedAbsStr = keepTrailingZeros
    ? fixedStr
    : fixedStr.replace(/\.?0+$/, "");
  const numericPart = `${signPrefix}${cleanedAbsStr}`;

  return {
    raw: value,
    compact: `${numericPart}${suffix}`,
    numericPart,
    suffix,
    exact,
    isCompacted: true,
  };
}

/**
 * Chuyển đổi số lượng lớn sang định dạng chuẩn trong game Top Heroes (K / M / B / T).
 */
export function formatCompactNumber(
  value: number,
  options?: FormatCompactNumberOptions
): string {
  return formatGameNumberParts(value, options).compact;
}

/**
 * Giải mã chuỗi người dùng nhập có hậu tố K / M / B / T (ví dụ: "36.16m", "500k", "58,350,845")
 * thành số nguyên không âm phục vụ các ô Input "Đang có trong túi".
 */
export function parseCompactNumberInput(rawInput: string | number): number {
  if (typeof rawInput === "number") {
    return Number.isFinite(rawInput) && rawInput > 0
      ? Math.round(rawInput)
      : 0;
  }

  const trimmed = rawInput.trim();
  if (!trimmed) {
    return 0;
  }

  const match = trimmed.match(/^([+-]?\d[\d,.]*)\s*([kKmMbBtT])?$/);
  if (!match) {
    return 0;
  }

  const rawNumberText = match[1];
  const suffixChar = (match[2] ?? "").toLowerCase();

  let normalizedNumberText: string;
  if (suffixChar) {
    // Khi có hậu tố (ví dụ "36,16M" hoặc "36.16M"), dấu phẩy được hiểu là dấu thập phân
    normalizedNumberText = rawNumberText.replace(/,/g, ".");
  } else {
    // Khi không có hậu tố (ví dụ "58,350,845"), dấu phẩy là dấu ngăn cách hàng nghìn
    normalizedNumberText = rawNumberText.replace(/,/g, "");
  }

  const parsedFloat = Number(normalizedNumberText);
  if (!Number.isFinite(parsedFloat) || parsedFloat <= 0) {
    return 0;
  }

  const multiplier = suffixChar ? (INPUT_MULTIPLIERS[suffixChar] ?? 1) : 1;
  return Math.round(parsedFloat * multiplier);
}

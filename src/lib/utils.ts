import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Chuẩn hóa mã máy chủ (server_id) về định dạng chuẩn "S<Number>" (ví dụ: "S10957").
 * Xử lý idempotent cho mọi biến thể đầu vào: "S10957", "s10957", "SS10957", "1024", "Server #1028", "ADMIN", hoặc rỗng.
 */
export function formatServerCode(serverId?: string | null): string {
  const trimmed = (serverId ?? "").trim()
  if (!trimmed || trimmed === "?" || /^[sS]+\?$/.test(trimmed)) {
    return "S?"
  }

  if (trimmed.toUpperCase() === "ADMIN") {
    return "ADMIN"
  }

  const withoutPrefix = trimmed
    .replace(/^(?:server|máy\s*chủ)\s*#?\s*/i, "")
    .replace(/^#+/, "")
    .trim()

  if (!withoutPrefix || withoutPrefix === "?" || /^[sS]+\?$/.test(withoutPrefix)) {
    return "S?"
  }

  const numericMatch = withoutPrefix.match(/^[sS]*(\d+[a-zA-Z0-9_-]*)$/)
  if (numericMatch && numericMatch[1]) {
    return `S${numericMatch[1]}`
  }

  return withoutPrefix
}

/**
 * So sánh 2 mã máy chủ theo thứ tự số học tự nhiên (ví dụ: "S999" đứng trước "S10957").
 */
export function compareServerIds(a?: string | null, b?: string | null): number {
  return formatServerCode(a).localeCompare(formatServerCode(b), undefined, {
    numeric: true,
    sensitivity: "base",
  })
}

export {
  formatCompactNumber,
  formatExactNumber,
  formatGameNumberParts,
  parseCompactNumberInput,
  type FormatCompactNumberOptions,
  type FormattedGameNumberParts,
  type NumberSuffixUnit,
} from "./number-format"

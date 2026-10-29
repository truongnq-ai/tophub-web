import React from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * TopHub Calculators — Google Material Design 3 primitives (Track 2 SSoT).
 *
 * Khuôn mẫu bắt buộc cho mọi máy tính 1.1 ➔ 9.2 (design-system/tophub-web/MASTER.md):
 * 1. Tối đa 1 lớp khung có viền trên mobile: dùng `surfaceCard`; nhóm con bên trong
 *    dùng `tonalGroup` / `tonalTile` (không viền) hoặc `dividedList` (hairline 1px).
 * 2. Sàn chữ 12px (`text-xs`) chỉ cho nhãn phụ; dữ liệu 14–16px; kết quả 30–36px (`metricValue`).
 * 3. Vùng chạm ≥ 44×44px: `iconButton`, `chipButton`, `dataInput` (16px chống iOS auto-zoom).
 * 4. `font-mono` chỉ cho số/mã đứng riêng; chữ tiếng Việt dùng `font-sans` / `font-heading`.
 * 5. Popover nổi dùng `overlayCard` + thuộc tính `data-md3-overlay="true"`.
 */
export const CALC_MD3 = {
  surfaceCard:
    "rounded-2xl border border-border/80 bg-card p-3.5 sm:p-5 shadow-sm",
  tonalGroup: "rounded-xl border-0 bg-muted/40 dark:bg-muted/25 p-3 sm:p-4",
  tonalTile:
    "rounded-xl border-0 bg-muted/40 dark:bg-muted/25 transition-colors cursor-pointer hover:bg-amber-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40",
  tileSelected: "bg-amber-500/15 ring-2 ring-amber-500",
  overlayCard:
    "rounded-2xl border border-amber-500/45 bg-card/95 backdrop-blur-md p-3.5 shadow-xl",
  headline:
    "text-xl sm:text-2xl lg:text-3xl font-heading font-black tracking-tight text-foreground leading-tight",
  sectionTitle: "text-base sm:text-lg font-heading font-bold text-foreground",
  eyebrow: "text-xs font-sans font-semibold uppercase tracking-wide",
  metricValue:
    "text-3xl sm:text-4xl font-heading font-black tracking-tight tabular-nums leading-none",
  iconButton:
    "inline-flex h-11 w-11 min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-xl transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40 disabled:cursor-not-allowed disabled:opacity-40",
  chipButton:
    "inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl px-3 text-sm font-semibold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40",
  dataInput: "h-11 min-h-[44px] rounded-xl text-base font-mono font-bold",
  dividedList: "divide-y divide-border/60",
} as const;

export interface CalculatorToolHeaderProps {
  readonly code: string;
  readonly title: string;
  readonly actions?: React.ReactNode;
}

/** Tiêu đề công cụ phẳng (không card viền) — chỉ 1 hairline đáy. */
export function CalculatorToolHeader({
  code,
  title,
  actions,
}: CalculatorToolHeaderProps) {
  return (
    <header
      data-testid="calculator-tool-header"
      className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-3"
    >
      <div className="flex min-w-0 items-center gap-2.5">
        <span className="shrink-0 rounded-lg bg-amber-500 px-2 py-0.5 font-mono text-sm font-black text-slate-950">
          {code}
        </span>
        <h1 className={CALC_MD3.headline}>{title}</h1>
      </div>
      {actions ? (
        <div className="flex flex-wrap items-center gap-2">{actions}</div>
      ) : null}
    </header>
  );
}

export interface CalculatorStepperButtonProps {
  readonly direction: "decrease" | "increase";
  readonly testId: string;
  readonly ariaLabel: string;
  readonly title?: string;
  readonly disabled?: boolean;
  readonly onClick: () => void;
}

/** Nút [-] / [+] chuẩn chạm 44×44px dùng cho mọi slider bậc/cấp. */
export function CalculatorStepperButton({
  direction,
  testId,
  ariaLabel,
  title,
  disabled = false,
  onClick,
}: CalculatorStepperButtonProps) {
  const Icon = direction === "decrease" ? Minus : Plus;
  return (
    <button
      type="button"
      data-testid={testId}
      aria-label={ariaLabel}
      title={title ?? ariaLabel}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        CALC_MD3.iconButton,
        direction === "decrease"
          ? "bg-muted/60 text-foreground hover:bg-muted"
          : "bg-amber-500/15 text-amber-700 hover:bg-amber-500/25 dark:text-amber-300"
      )}
    >
      <Icon className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}

export interface CalculatorMetricValueProps {
  readonly testId: string;
  readonly value: string;
  readonly unit?: string;
  readonly toneClassName?: string;
}

/** Con số kết quả chính (MD3 Display Metric). `data-testid` chỉ bọc phần số. */
export function CalculatorMetricValue({
  testId,
  value,
  unit,
  toneClassName,
}: CalculatorMetricValueProps) {
  return (
    <div className="flex items-baseline gap-1.5">
      <span
        data-testid={testId}
        className={cn(CALC_MD3.metricValue, toneClassName ?? "text-foreground")}
      >
        {value}
      </span>
      {unit ? (
        <span className="text-sm font-sans font-bold text-muted-foreground">
          {unit}
        </span>
      ) : null}
    </div>
  );
}

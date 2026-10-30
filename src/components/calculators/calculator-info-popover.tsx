"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Info, X } from "lucide-react";
import type { CalculatorLocale } from "@/content/calculators/types";
import { cn } from "@/lib/utils";
import { CALC_MD3 } from "./calculator-md3-primitives";

export interface CalculatorInfoPopoverProps {
  readonly title: string;
  readonly subtitle?: string;
  readonly locale?: CalculatorLocale;
  readonly triggerLabel?: string;
  readonly triggerTestId?: string;
  readonly dialogTestId?: string;
  readonly className?: string;
  readonly children: React.ReactNode;
}

export function CalculatorInfoPopover({
  title,
  subtitle,
  locale = "vi",
  triggerLabel,
  triggerTestId = "calculator-info-popover-trigger",
  dialogTestId = "calculator-info-popover-dialog",
  className,
  children,
}: CalculatorInfoPopoverProps) {
  const isVi = locale === "vi";
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleStopPropagation = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
    },
    []
  );

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const ariaLabel =
    triggerLabel ??
    (isVi
      ? "Mở thông tin hướng dẫn và bảng chi tiết"
      : "Open guide and detailed table");

  return (
    <div className={cn("relative inline-flex items-center", className)}>
      <button
        type="button"
        data-testid={triggerTestId}
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-label={ariaLabel}
        title={ariaLabel}
        className={cn(
          CALC_MD3.iconButton,
          isOpen
            ? "bg-amber-500 text-slate-950 shadow-sm"
            : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
        )}
      >
        <Info className="h-5 w-5" aria-hidden="true" />
      </button>

      {isOpen ? (
        <div
          data-testid={`${dialogTestId}-backdrop`}
          data-md3-overlay="true"
          onClick={handleClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4 backdrop-blur-[2px] animate-in fade-in duration-150"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            data-testid={dialogTestId}
            data-md3-overlay="true"
            onClick={handleStopPropagation}
            className={cn(
              CALC_MD3.overlayCard,
              "relative flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden p-4 sm:p-5"
            )}
          >
            <div className="flex items-start justify-between gap-3 border-b border-border/60 pb-3">
              <div className="min-w-0">
                <h4 className="font-heading text-base sm:text-lg font-bold text-foreground">
                  {title}
                </h4>
                {subtitle ? (
                  <p className="mt-0.5 font-sans text-xs text-muted-foreground">
                    {subtitle}
                  </p>
                ) : null}
              </div>
              <button
                type="button"
                data-testid={`${dialogTestId}-close`}
                onClick={handleClose}
                aria-label={isVi ? "Đóng hộp thoại" : "Close dialog"}
                className={cn(
                  CALC_MD3.iconButton,
                  "shrink-0 rounded-full bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-4 space-y-4 overflow-y-auto pr-1">
              {children}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

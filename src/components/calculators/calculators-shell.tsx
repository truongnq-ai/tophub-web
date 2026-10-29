import React from "react";
import type { CalculatorLocale } from "@/content/calculators/types";
import { CalculatorsSidebar } from "./calculators-sidebar";
import { GuidesFeedbackNotice } from "@/components/guides/guides-feedback-notice";

interface CalculatorsShellProps {
  children: React.ReactNode;
  locale?: CalculatorLocale;
}

/**
 * Khung trang Calculators chuẩn MD3 (MASTER.md §2.2): lề ngoài `px-3 sm:px-6`
 * trả lại ~90% chiều ngang màn hình 375px cho nội dung.
 */
export function CalculatorsShell({
  children,
  locale = "vi",
}: CalculatorsShellProps) {
  return (
    <div
      data-testid="calculators-shell"
      className="container mx-auto max-w-[1440px] px-3 sm:px-6 py-5 sm:py-8"
    >
      <div className="flex flex-col lg:flex-row lg:items-start gap-4 sm:gap-6 xl:gap-8">
        <CalculatorsSidebar />
        <div className="flex-1 min-w-0">
          <GuidesFeedbackNotice variant="top-bar" locale={locale} />
          {children}
        </div>
      </div>
    </div>
  );
}

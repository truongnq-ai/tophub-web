import React from "react";
import type { GuideLocale } from "@/content/guides/types";
import { GuidesSidebar } from "./guides-sidebar";
import { GuidesFeedbackNotice } from "./guides-feedback-notice";

interface GuidesShellProps {
  children: React.ReactNode;
  locale?: GuideLocale;
}

export function GuidesShell({ children, locale = "vi" }: GuidesShellProps) {
  return (
    <div className="container mx-auto max-w-[1440px] px-3 sm:px-6 py-6 sm:py-8">
      <div className="flex flex-col lg:flex-row lg:items-start gap-6 xl:gap-8">
        <GuidesSidebar />
        <div className="flex-1 min-w-0">
          <GuidesFeedbackNotice variant="top-bar" locale={locale} />
          {children}
        </div>
      </div>
    </div>
  );
}

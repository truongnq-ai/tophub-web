import React from "react";
import { GuidesSidebar } from "./guides-sidebar";

interface GuidesShellProps {
  children: React.ReactNode;
}

export function GuidesShell({ children }: GuidesShellProps) {
  return (
    <div className="container mx-auto max-w-[1440px] px-4 sm:px-6 py-6 sm:py-8">
      <div className="flex flex-col lg:flex-row lg:items-start gap-6 xl:gap-8">
        <GuidesSidebar />
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </div>
  );
}

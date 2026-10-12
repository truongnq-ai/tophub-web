import React from "react";

interface AdminTooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function AdminTooltip({ content, children, className = "" }: AdminTooltipProps) {
  return (
    <div
      className={`group/tooltip relative inline-flex items-center outline-none ${className}`}
      tabIndex={0}
    >
      {children}
      <div
        role="tooltip"
        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible group-focus-within/tooltip:opacity-100 group-focus-within/tooltip:visible transition-all duration-150 z-50 px-2.5 py-1.5 text-[11px] bg-popover text-popover-foreground border border-border/80 rounded-lg shadow-xl whitespace-nowrap pointer-events-none"
      >
        <span>{content}</span>
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-popover border-r border-b border-border/80" />
      </div>
    </div>
  );
}

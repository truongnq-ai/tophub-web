import React from "react";
import { SearchX, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminEmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  onClearFilters?: () => void;
  clearLabel?: string;
  className?: string;
}

export function AdminEmptyState({
  icon,
  title,
  description,
  onClearFilters,
  clearLabel = "Xóa bộ lọc",
  className = "",
}: AdminEmptyStateProps) {
  return (
    <div
      className={`py-12 px-4 flex flex-col items-center justify-center text-center space-y-3 ${className}`}
    >
      <div className="h-14 w-14 rounded-2xl bg-muted/60 text-muted-foreground flex items-center justify-center border border-border/60 shadow-inner">
        {icon || <SearchX className="h-7 w-7 text-muted-foreground/80" />}
      </div>
      <div className="max-w-sm space-y-1">
        <h4 className="text-sm font-bold text-foreground font-heading tracking-tight">{title}</h4>
        <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
      </div>
      {onClearFilters && (
        <Button
          variant="outline"
          size="sm"
          onClick={onClearFilters}
          className="mt-2 h-9 px-3 border-border/60 text-xs font-semibold gap-1.5 min-h-[38px] hover:border-primary/50 hover:text-foreground"
        >
          <RefreshCcw className="h-3.5 w-3.5" />
          <span>{clearLabel}</span>
        </Button>
      )}
    </div>
  );
}
